import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../utils/mobile';
import LogoWarna from '../assets/Logo Latih Warna.png';

export default function ContactScreen({ onBack, onNavigate }) {
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const contacts = [
    {
      key: 'email',
      emoji: '📧',
      label: 'Email',
      value: 'info@latih.co',
      sub: 'Untuk pertanyaan umum, kemitraan, dan dukungan teknis',
      color: '#0070F3',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      action: () => window.open('mailto:info@latih.co', '_blank'),
      actionLabel: 'Kirim Email',
    },
    {
      key: 'wa',
      emoji: '💬',
      label: 'WhatsApp',
      value: '+62 812-8581-5971',
      sub: 'Respons cepat pada jam kerja (Senin–Jumat, 08.00–17.00 WIB)',
      color: '#15803D',
      bg: '#F0FDF4',
      border: '#BBF7D0',
      action: () => window.open('https://wa.me/6281285815971?text=Halo%20Latih%2C%20saya%20ingin%20bertanya%20tentang...', '_blank'),
      actionLabel: 'Chat WhatsApp',
    },
    {
      key: 'instagram',
      emoji: '📸',
      label: 'Instagram',
      value: '@latih.co',
      sub: 'Update jadwal training, tips industri, dan konten edukasi harian',
      color: '#DB2777',
      bg: '#FFF0F7',
      border: '#FBCFE8',
      action: () => window.open('https://instagram.com/latih.co', '_blank'),
      actionLabel: 'Buka Instagram',
    },
  ];

  const faqs = [
    { q: 'Apakah modul microlearning benar-benar gratis?', a: 'Ya! Seluruh modul Interactive Microlearning dapat diakses gratis setelah membuat akun. Tidak ada biaya tersembunyi untuk fitur belajar mandiri.' },
    { q: 'Bagaimana cara mendaftar training atau webinar?', a: 'Buat akun atau masuk ke akun Anda, pilih program yang tersedia di halaman Kelas Sertifikasi atau Webinar, lalu klik Daftar. Anda akan dipandu melalui proses pembayaran.' },
    { q: 'Sertifikat apa yang saya dapatkan setelah training?', a: 'Peserta yang menyelesaikan program mendapatkan Sertifikat Kelulusan digital dengan kode QR verifikasi unik, yang dapat diunggah langsung ke LinkedIn.' },
    { q: 'Apakah ada refund jika saya tidak bisa hadir?', a: 'Kebijakan refund berlaku sesuai ketentuan yang tertera pada saat pendaftaran program. Hubungi kami melalui email atau WhatsApp untuk informasi lebih lanjut.' },
    { q: 'Bagaimana jika saya lupa password?', a: 'Klik "Lupa Password" di halaman login. Instruksi reset akan dikirimkan ke alamat email yang terdaftar dalam beberapa menit.' },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ backgroundColor: '#FFFCF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#0F172A' }}>
      <nav style={{ padding: isMobile ? '20px 24px' : '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAF0F6', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
        <img src={LogoWarna} alt="Logo Latih" style={{ height: isMobile ? 24 : 32, objectFit: 'contain', cursor: 'pointer' }} onClick={onBack} />
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#0070F3', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>← Kembali</button>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)', padding: isMobile ? '64px 24px 80px' : '100px 80px 120px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>👋</div>
          <h1 style={{ fontSize: isMobile ? 36 : 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', margin: '0 0 20px' }}>Hubungi Kami</h1>
          <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
            Ada pertanyaan, masukan, atau ingin bermitra dengan Latih? Tim kami siap membantu Anda dengan cepat dan ramah.
          </p>
        </div>
      </section>

      {/* Jam Operasional Banner */}
      <div style={{ backgroundColor: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '14px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 14, color: '#92400E', fontWeight: 600 }}>
          🕐 Jam Layanan: <strong>Senin – Jumat, 08.00 – 17.00 WIB</strong> &nbsp;·&nbsp; Di luar jam kerja, pesan Anda akan dibalas pada hari kerja berikutnya.
        </span>
      </div>

      {/* Contact Cards */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '56px 24px' : '80px 40px' }}>
        <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: isMobile ? 32 : 48, textAlign: 'center' }}>Pilih Cara Menghubungi</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {contacts.map((c) => (
            <div key={c.key} style={{ backgroundColor: c.bg, borderRadius: 24, padding: '32px 28px', border: `1.5px solid ${c.border}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 40 }}>{c.emoji}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>{c.value}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{c.sub}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 8 }}>
                <button
                  onClick={c.action}
                  style={{ flex: 1, padding: '12px 16px', backgroundColor: c.color, color: 'white', border: 'none', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  {c.actionLabel}
                </button>
                <button
                  onClick={() => handleCopy(c.value, c.key)}
                  style={{ padding: '12px 14px', backgroundColor: 'white', color: c.color, border: `1.5px solid ${c.border}`, borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {copied === c.key ? '✓ Disalin!' : 'Salin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Detail */}
      <section style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6', padding: isMobile ? '56px 24px' : '80px 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32 }}>

          {/* Identitas Merchant */}
          <div style={{ backgroundColor: 'white', borderRadius: 24, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 32, marginBottom: 20 }}>🏢</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>Informasi Merchant</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Nama Platform', value: 'Latih' },
                { label: 'Email Resmi', value: 'info@latih.co' },
                { label: 'WhatsApp', value: '+62 812-8581-5971' },
                { label: 'Instagram', value: '@latih.co' },
                { label: 'Bidang Usaha', value: 'Platform Edukasi & Pelatihan Industri' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, paddingBottom: 14, borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 14, color: '#0F172A', fontWeight: 700, textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jam Operasional */}
          <div style={{ backgroundColor: 'white', borderRadius: 24, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 32, marginBottom: 20 }}>🕐</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 20 }}>Jam Layanan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { day: 'Senin – Jumat', time: '08.00 – 17.00 WIB', active: true },
                { day: 'Sabtu', time: '09.00 – 13.00 WIB', active: true },
                { day: 'Minggu & Hari Libur', time: 'Tutup', active: false },
              ].map(({ day, time, active }) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 12, backgroundColor: active ? '#F0FDF4' : '#F8FAFC', border: `1px solid ${active ? '#BBF7D0' : '#E2E8F0'}` }}>
                  <span style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>{day}</span>
                  <span style={{ fontSize: 13, color: active ? '#15803D' : '#94A3B8', fontWeight: 700 }}>{time}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: '#92400E', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                ⚡ <strong>Estimasi respons:</strong> Email 1×24 jam · WhatsApp 2–4 jam di jam kerja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 24px 80px' : '80px 40px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
          <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, letterSpacing: '-1px', color: '#0F172A', margin: '0 0 12px' }}>Pertanyaan Umum (FAQ)</h2>
          <p style={{ fontSize: 15, color: '#64748B', margin: 0 }}>Mungkin jawaban Anda sudah ada di sini.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ backgroundColor: 'white', borderRadius: 16, border: `1.5px solid ${openFaq === i ? '#BFDBFE' : '#E2E8F0'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 16 }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ fontSize: 18, color: '#94A3B8', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, margin: 0, borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center', padding: '32px 28px', backgroundColor: '#EFF6FF', borderRadius: 20, border: '1px solid #BFDBFE' }}>
          <p style={{ fontSize: 15, color: '#1E40AF', fontWeight: 500, margin: '0 0 16px', lineHeight: 1.6 }}>
            Pertanyaan Anda belum terjawab? Langsung hubungi tim kami.
          </p>
          <button
            onClick={() => window.open('mailto:info@latih.co', '_blank')}
            style={{ padding: '12px 28px', backgroundColor: '#0070F3', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            📧 Kirim Email ke info@latih.co
          </button>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #EAF0F6', padding: isMobile ? '32px 24px' : '32px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, backgroundColor: 'white' }}>
        <img src={LogoWarna} alt="Latih" style={{ height: 24, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748B' }}>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('about')}>Tentang Kami</span>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('privacy')}>Kebijakan Privasi</span>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('terms')}>Syarat & Ketentuan</span>
        </div>
      </footer>
    </div>
  );
}
