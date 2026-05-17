// @ts-nocheck
// Supabase Edge Function: tripay-webhook
// URL webhook ini diberikan ke Tripay Dashboard → Merchant → Callback URL

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Verifikasi signature dari Tripay ──────────────────────────
async function verifyTripaySignature(privateKey, jsonBody) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(privateKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(jsonBody));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  // Webhook dari Tripay selalu POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody   = await req.text();
  const signature = req.headers.get("X-Callback-Signature") || "";
  const TRIPAY_PRIV_KEY = Deno.env.get("TRIPAY_PRIVATE_KEY");

  // ── Verifikasi signature ────────────────────────────────────
  const expectedSig = await verifyTripaySignature(TRIPAY_PRIV_KEY, rawBody);
  if (signature !== expectedSig) {
    console.error("Signature mismatch:", { received: signature, expected: expectedSig });
    return new Response(JSON.stringify({ success: false, message: "Invalid signature" }), { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const {
    merchant_ref,   // Referensi kita (LTC-xxxxx)
    reference,      // Referensi Tripay
    status,         // PAID | UNPAID | FAILED | REFUND
    total_amount,
  } = payload;

  // ── Handle test callback dari Tripay Tester (merchant_ref null) ─
  if (!merchant_ref) {
    console.log("Test callback received (merchant_ref null) — skipping");
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  );

  // ── Cari payment berdasarkan merchant_ref ───────────────────
  const { data: payment, error: payError } = await supabase
    .from("payments")
    .select("*, registrations(id, user_id, event_id, events(zoom_link, title, type))")
    .eq("tripay_merchant_ref", merchant_ref)
    .single();

  if (payError || !payment) {
    // Tetap return 200 agar Tripay tidak melakukan retry
    // (payment mungkin sudah dihapus atau ref tidak valid)
    console.error("Payment not found:", merchant_ref);
    return new Response(JSON.stringify({ success: true, message: "Payment not found, skipped" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Update status payment ───────────────────────────────────
  const newPayStatus = status === "PAID" ? "paid" : status === "FAILED" ? "failed" : status === "REFUND" ? "refunded" : "pending";
  await supabase.from("payments").update({
    status:    newPayStatus,
    paid_at:   status === "PAID" ? new Date().toISOString() : null,
  }).eq("id", payment.id);

  // ── Jika PAID → update registrasi ──────────────────────────
  if (status === "PAID") {
    const reg       = payment.registrations;
    const eventType = reg?.events?.type;  // 'training' | 'webinar_reguler' | 'webinar_advanced'
    const userId    = reg?.user_id;

    if (payment.is_upgrade) {
      // ── Mode Upgrade: ubah paket free → premium & buka kuis ──
      await supabase.from("registrations").update({
        package: "premium",
        status:  "quiz_unlocked",
      }).eq("id", payment.registration_id);
      console.log("Upgrade confirmed: reg", payment.registration_id, "→ premium + quiz_unlocked");
    } else {
      // ── Mode Normal: tandai registrasi sebagai paid ───────────
      await supabase.from("registrations").update({
        status: "paid",
      }).eq("id", payment.registration_id);

      // Trigger kirim email Zoom (panggil edge function send-zoom-email)
      try {
        const event = reg?.events;
        if (event?.zoom_link && userId) {
          // Ambil email user
          const { data: profile } = await supabase.auth.admin.getUserById(userId);
          const userEmail = profile?.user?.email;

          if (userEmail) {
            await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-zoom-email`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
              },
              body: JSON.stringify({
                email:     userEmail,
                zoom_link: event.zoom_link,
                event_title: event.title,
              }),
            });
          }
        }
      } catch (emailErr) {
        console.error("Gagal kirim email Zoom:", emailErr.message);
        // Jangan gagalkan webhook karena gagal email
      }
    } // end else (normal payment)

    // ── Generate kupon loyalty (training & webinar_advanced) ──
    // Berlaku untuk mode normal DAN upgrade
    const LOYALTY_ELIGIBLE_TYPES = ["training", "webinar_advanced"];
    if (userId && eventType && LOYALTY_ELIGIBLE_TYPES.includes(eventType)) {
      try {
        const { data: couponCode, error: couponErr } = await supabase.rpc(
          "generate_loyalty_coupon",
          {
            p_user_id:         userId,
            p_source_event_id: reg?.event_id || null,
          }
        );
        if (couponErr) {
          console.error("Gagal generate kupon loyalty:", couponErr.message);
        } else {
          console.log(`Kupon loyalty '${couponCode}' dibuat untuk user ${userId} (event: ${eventType})`);
        }
      } catch (couponGenErr) {
        console.error("Exception saat generate kupon loyalty:", couponGenErr.message);
        // Jangan gagalkan webhook karena gagal generate kupon
      }
    }
  }

  console.log(`Webhook processed: ${merchant_ref} → ${status}`);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
