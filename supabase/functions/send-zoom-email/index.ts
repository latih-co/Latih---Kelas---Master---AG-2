// @ts-nocheck
// Supabase Edge Function: send-zoom-email
// Mengirim link Zoom ke user setelah pembayaran berhasil atau verifikasi IG

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const { email, zoom_link, event_title } = await req.json();
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    "Latih <noreply@latih.co>",
      to:      [email],
      subject: `✅ Link Zoom kamu untuk: ${event_title}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
          <div style="background: white; border-radius: 16px; padding: 40px; border: 1px solid #e2e8f0;">
            <div style="margin-bottom: 32px; text-align: center;">
              <div style="font-size: 40px; margin-bottom: 12px;">🎓</div>
              <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0;">Pendaftaran Dikonfirmasi!</h1>
              <p style="color: #64748b; margin: 0;">Berikut link Zoom untuk eventmu</p>
            </div>
            
            <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
              <div style="font-size: 13px; font-weight: 700; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">EVENT</div>
              <div style="font-size: 18px; font-weight: 800; color: #0f172a;">${event_title}</div>
            </div>

            <div style="text-align: center; margin-bottom: 32px;">
              <a href="${zoom_link}" style="display: inline-block; background: linear-gradient(135deg, #00D49D, #0070F3); color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 800; font-size: 16px;">
                🔗 Bergabung via Zoom
              </a>
            </div>

            <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 10px; padding: 16px;">
              <p style="margin: 0; font-size: 13px; color: #92400e;">
                ⚠️ <strong>Jangan bagikan link ini.</strong> Link Zoom ini bersifat personal dan hanya untukmu.
              </p>
            </div>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
              <p>Latih — Microlearning untuk profesional industri</p>
            </div>
          </div>
        </div>
      `,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Resend error:", data);
    return new Response(JSON.stringify({ success: false, error: data }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, id: data.id }), {
    headers: { "Content-Type": "application/json" },
  });
});
