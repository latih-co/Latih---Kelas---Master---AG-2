// @ts-nocheck
// Supabase Edge Function: create-payment
// Deploy via: supabase functions deploy create-payment
// Atau paste via Supabase Dashboard → Edge Functions → New Function

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Buat signature Tripay ──────────────────────────────────────
async function createTripaySignature(merchantCode, merchantRef, amount, privateKey) {
  const message = merchantCode + merchantRef + String(amount);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(privateKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ── Format Rupiah (Deno tidak support id-ID locale) ───────────
function fmtRp(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { event_id, package_type, payment_method, is_upgrade, is_resume, existing_registration_id, coupon_code } = await req.json();

    // ── Inisialisasi Supabase admin client ──────────────────────
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    // ── Ambil user dari token auth ──────────────────────────────
    const authHeader = req.headers.get("Authorization") || "";
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (authError || !user) throw new Error("Unauthorized");

    // ── Ambil data event ────────────────────────────────────────
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id)
      .single();
    if (eventError || !event) throw new Error("Event tidak ditemukan");

    const baseAmount = package_type === "premium"
      ? event.price_premium
      : event.price_regular;
    if (baseAmount === 0) throw new Error("Event ini gratis, gunakan alur registrasi gratis");

    // ── Validasi & hitung diskon kupon ──────────────────────────
    let discountAmount = 0;
    let couponId = null;

    if (coupon_code) {
      const { data: coupon, error: couponErr } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", coupon_code.toUpperCase())
        .eq("is_active", true)
        .single();

      if (couponErr || !coupon) throw new Error("Kode kupon tidak valid atau sudah tidak aktif");
      if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) throw new Error("Kode kupon sudah kadaluarsa");
      if (coupon.valid_from && new Date(coupon.valid_from) > new Date()) throw new Error("Kode kupon belum berlaku");
      if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) throw new Error("Kuota kupon sudah habis");
      if (coupon.min_amount && baseAmount < coupon.min_amount) throw new Error(`Kupon hanya berlaku untuk transaksi minimal Rp ${fmtRp(coupon.min_amount)}`);
      if (coupon.event_ids && coupon.event_ids.length > 0 && !coupon.event_ids.includes(event_id)) throw new Error("Kupon tidak berlaku untuk event ini");

      // Hitung nominal diskon
      if (coupon.discount_type === "percentage") {
        discountAmount = Math.floor(baseAmount * coupon.discount_value / 100);
        if (coupon.max_discount) discountAmount = Math.min(discountAmount, coupon.max_discount);
      } else {
        discountAmount = coupon.discount_value;
      }
      discountAmount = Math.min(discountAmount, baseAmount - 1); // minimal bayar Rp 1
      couponId = coupon.id;
    }

    const amount = baseAmount - discountAmount;

    // ── Cek / buat registrasi ────────────────────────────────────
    let reg;
    if ((is_upgrade || is_resume) && existing_registration_id) {
      // Mode upgrade/resume: gunakan registrasi yang sudah ada, jangan buat baru
      const { data: existReg, error: existErr } = await supabase
        .from("registrations")
        .select("id, status, package")
        .eq("id", existing_registration_id)
        .eq("user_id", user.id)
        .single();
      if (existErr || !existReg) throw new Error("Registrasi tidak ditemukan");
      reg = existReg;
    } else {
      // Mode normal: cek duplikat lalu buat baru
      const { data: existingReg } = await supabase
        .from("registrations")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("event_id", event_id)
        .maybeSingle();
      if (existingReg) throw new Error("Kamu sudah mendaftar event ini");

      const { data: newReg, error: regError } = await supabase
        .from("registrations")
        .insert({
          user_id:  user.id,
          event_id: event_id,
          package:  package_type || "free",
          status:   "pending",
        })
        .select()
        .single();
      if (regError) throw new Error("Gagal membuat registrasi: " + regError.message);
      reg = newReg;
    }

    // ── Ambil profil user (untuk nama di Tripay) ─────────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single();

    // ── Konfigurasi Tripay ──────────────────────────────────────
    const TRIPAY_API_KEY   = Deno.env.get("TRIPAY_API_KEY");
    const TRIPAY_PRIV_KEY  = Deno.env.get("TRIPAY_PRIVATE_KEY");
    const TRIPAY_MERCHANT  = Deno.env.get("TRIPAY_MERCHANT_CODE");
    const IS_SANDBOX       = Deno.env.get("TRIPAY_SANDBOX") === "true";
    const TRIPAY_BASE      = IS_SANDBOX
      ? "https://tripay.co.id/api-sandbox"
      : "https://tripay.co.id/api";
    const APP_URL          = Deno.env.get("APP_URL") || "https://latih.co";
    const PROXY_SECRET     = Deno.env.get("PROXY_SECRET") || "latih-proxy-2026";
    const PROXY_URL        = `${APP_URL}/tripay-proxy.php`;

    const merchantRef = `LTC-${Date.now()}`;
    const signature   = await createTripaySignature(TRIPAY_MERCHANT, merchantRef, amount, TRIPAY_PRIV_KEY);
    const expiredTime = Math.floor(Date.now() / 1000) + 3600; // 1 jam

    const itemLabel = [
      package_type === "premium" ? `${event.title} (Premium)` : event.title,
      discountAmount > 0 ? ` [Diskon Rp ${fmtRp(discountAmount)}]` : "",
    ].join("");

    // ── Hit Tripay via PHP Proxy (IP statis Rumahweb) ────────────
    const tripayRes = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Proxy-Secret": PROXY_SECRET,
      },
      body: JSON.stringify({
        tripay_url: `${TRIPAY_BASE}/transaction/create`,
        api_key:    TRIPAY_API_KEY,
        body: {
          method:         payment_method || "QRIS",
          merchant_ref:   merchantRef,
          amount:         amount,
          customer_name:  profile?.name || user.email,
          customer_email: user.email,
          customer_phone: "",
          order_items: [{
            name:     itemLabel,
            price:    amount,
            quantity: 1,
          }],
          callback_url: `${APP_URL}/tripay-callback.php`,
          return_url:   `${APP_URL}?ref=${merchantRef}`,
          expired_time: expiredTime,
          signature:    signature,
        },
      }),
    });

    const tripayData = await tripayRes.json();
    if (!tripayData.success) {
      // Batalkan registrasi jika Tripay gagal
      await supabase.from("registrations").delete().eq("id", reg.id);
      throw new Error("Tripay error: " + (tripayData.message || "Unknown"));
    }

    await supabase.from("payments").insert({
      registration_id:     reg.id,
      user_id:             user.id,
      tripay_reference:    tripayData.data?.reference,
      tripay_merchant_ref: merchantRef,
      amount:              amount,
      payment_method:      payment_method || "QRIS",
      status:              "pending",
      is_upgrade:          is_upgrade === true,
      coupon_id:           couponId,
      discount_amount:     discountAmount,
    });

    // Jika kupon dipakai, increment current_uses via stored procedure (atomic)
    if (couponId) {
      await supabase.rpc("increment_coupon_uses", { p_coupon_id: couponId });
    }

    // Jika Tripay gagal pada mode normal, hapus registrasi yang baru dibuat
    // (pada mode upgrade, registrasi tidak dihapus karena sudah ada)

    return new Response(
      JSON.stringify({
        success:     true,
        checkout_url: tripayData.data?.checkout_url,
        reference:   tripayData.data?.reference,
        pay_url:     tripayData.data?.pay_url,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("create-payment error:", err.message);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
