// @ts-nocheck
// Supabase Edge Function: send-name-change-email
// Mengirim notifikasi email ke user saat permintaan koreksi nama disetujui / ditolak

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const { email, user_name, old_name, new_name, status, admin_note } = await req.json();
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  const isApproved = status === "approved";

  const subjectLine = isApproved
    ? `✅ Permintaan koreksi nama kamu telah disetujui`
    : `❌ Permintaan koreksi nama kamu ditolak`;

  const bodyHtml = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
      <div style="background: white; border-radius: 16px; padding: 40px; border: 1px solid #e2e8f0;">

        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 48px; margin-bottom: 12px;">${isApproved ? "✅" : "❌"}</div>
          <h1 style="font-size: 22px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0;">
            ${isApproved ? "Nama berhasil diperbarui!" : "Permintaan ditolak"}
          </h1>
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            Halo, <strong>${user_name || email}</strong>
          </p>
        </div>

        <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">Detail Perubahan</div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <span style="font-size: 14px; font-weight: 700; color: #94a3b8; text-decoration: line-through;">${old_name}</span>
            <span style="color: #cbd5e1;">→</span>
            <span style="font-size: 15px; font-weight: 800; color: ${isApproved ? "#059669" : "#dc2626"};">${new_name}</span>
          </div>
        </div>

        ${isApproved ? `
        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #065f46; line-height: 1.6;">
            🎓 <strong>Nama baru kamu sudah aktif</strong> dan akan tercetak di semua sertifikat yang diterbitkan mulai sekarang.
            Masuk ke akun Latih kamu untuk melihat perubahan.
          </p>
        </div>
        ` : `
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #991b1b; line-height: 1.6;">
            ${admin_note
              ? `📋 <strong>Alasan penolakan:</strong> ${admin_note}`
              : "Permintaan koreksi nama tidak dapat diproses. Silakan hubungi tim Latih jika kamu memiliki pertanyaan."}
          </p>
        </div>
        `}

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://latih.co/profil"
            style="display: inline-block; background: linear-gradient(135deg, #00D49D, #0070F3); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 800; font-size: 14px;">
            Lihat Profil Saya →
          </a>
        </div>

        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px;">
          <p style="margin: 0;">Latih — Microlearning untuk profesional industri</p>
          <p style="margin: 4px 0 0;">Jangan balas email ini. Hubungi kami melalui <a href="https://latih.co/contact" style="color: #64748b;">latih.co/contact</a></p>
        </div>
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:    "Latih <noreply@latih.co>",
      to:      [email],
      subject: subjectLine,
      html:    bodyHtml,
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
