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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { event_id, package_type, payment_method, is_upgrade, existing_registration_id } = await req.json();

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

    // ── Tentukan harga ──────────────────────────────────────────
    const amount = package_type === "premium"
      ? event.price_premium
      : event.price_regular;
    if (amount === 0) throw new Error("Event ini gratis, gunakan alur registrasi gratis");

    // ── Cek / buat registrasi ────────────────────────────────────
    let reg;
    if (is_upgrade && existing_registration_id) {
      // Mode upgrade: gunakan registrasi yang sudah ada, jangan buat baru
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

    const merchantRef = `LTC-${Date.now()}`;
    const signature   = await createTripaySignature(TRIPAY_MERCHANT, merchantRef, amount, TRIPAY_PRIV_KEY);
    const expiredTime = Math.floor(Date.now() / 1000) + 86400; // 24 jam

    // ── Hit Tripay API ──────────────────────────────────────────
    const tripayRes = await fetch(`${TRIPAY_BASE}/transaction/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TRIPAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method:         payment_method || "QRIS",
        merchant_ref:   merchantRef,
        amount:         amount,
        customer_name:  profile?.name || user.email,
        customer_email: user.email,
        customer_phone: "",
        order_items: [{
          name:     `${event.title} (${package_type})`,
          price:    amount,
          quantity: 1,
        }],
        callback_url: `${APP_URL}/tripay-callback.php`,
        return_url:   `${APP_URL}`,
        expired_time: expiredTime,
        signature:    signature,
      }),
    });

    const tripayData = await tripayRes.json();
    if (!tripayData.success) {
      // Batalkan registrasi jika Tripay gagal
      await supabase.from("registrations").delete().eq("id", reg.id);
      throw new Error("Tripay error: " + (tripayData.message || "Unknown"));
    }

    // ── Simpan data payment ─────────────────────────────────────
    await supabase.from("payments").insert({
      registration_id:     reg.id,
      user_id:             user.id,
      tripay_reference:    tripayData.data?.reference,
      tripay_merchant_ref: merchantRef,
      amount:              amount,
      payment_method:      payment_method || "QRIS",
      status:              "pending",
      is_upgrade:          is_upgrade === true,
    });

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
