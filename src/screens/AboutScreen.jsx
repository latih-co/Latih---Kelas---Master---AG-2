import React, { useEffect } from 'react';
import { useIsMobile } from '../utils/mobile';
import LogoWarna from '../assets/Logo Latih Warna.png';

export default function AboutScreen({ onBack, onNavigate }) {
  const isMobile = useIsMobile();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const stats = [
    { value: '15+', label: 'Topik Standar Industri' },
    { value: '100+', label: 'Slide Interaktif' },
    { value: '3', label: 'Format Belajar' },
    { value: '100%', label: 'Berbasis Regulasi Resmi' },
  ];

  const values = [
    { emoji: '🎯', title: 'Berbasis Kasus Nyata', desc: 'Setiap modul dirancang dari masalah nyata di lantai produksi — bukan teori abstrak semata. Pemahaman terbaik lahir dari konteks yang relevan.' },
    { emoji: '⚡', title: 'Microlearning 10 Menit', desc: 'Format belajar padat yang menghormati waktu Anda. Tidak ada video panjang yang membosankan — hanya sesi interaktif singkat yang langsung ke inti materi.' },
    { emoji: '🏅', title: 'Sertifikat Terverifikasi', desc: 'Setiap sertifikat memiliki kode QR unik yang dapat diverifikasi oleh siapa saja — siap ditampilkan ke rekruter dan HRD di LinkedIn.' },
    { emoji: '🔬', title: 'Kurikulum Terstandar', desc: 'Materi disusun mengacu pada regulasi resmi: ISO 9001, HACCP, CPOB BPOM, GMP, SNI, dan standar industri internasional lainnya.' },
  ];

  const services = [
    { emoji: '📱', title: 'Interactive Microlearning', desc: 'Modul belajar mandiri berbasis studi kasus. Tersedia gratis untuk semua pengguna terdaftar.', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' },
    { emoji: '🏭', title: 'Live Online Training', desc: 'Pelatihan intensif bersama trainer berpengalaman. Peserta mendapat sertifikat kelulusan resmi.', color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
    { emoji: '🎙️', title: 'Live Webinar', desc: 'Sesi wawasan dari praktisi industri. Format Reguler & Advanced untuk pengembangan profesional.', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  ];

  return (
    <div style={{ backgroundColor: '#FFFCF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#0F172A' }}>
      <nav style={{ padding: isMobile ? '20px 24px' : '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAF0F6', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
        <img src={LogoWarna} alt="Logo Latih" style={{ height: isMobile ? 24 : 32, objectFit: 'contain', cursor: 'pointer' }} onClick={onBack} />
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#0070F3', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>← Kembali</button>
      </nav>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)', padding: isMobile ? '64px 24px' : '100px 80px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
            🏭 Platform Pelatihan Standar & Mutu Industri
          </div>
          <h1 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', margin: '0 0 24px' }}>
            Tentang <span style={{ color: '#38BDF8' }}>Latih</span>
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 20, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
            Latih adalah platform pembelajaran interaktif yang dirancang khusus untuk profesional industri di bidang Kualitas, Manufaktur, dan Keamanan Pangan. Kami membantu Anda menguasai standar regulasi — bukan sekadar menghafalnya.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: 'white', padding: isMobile ? '48px 24px' : '64px 80px', borderBottom: '1px solid #EAF0F6' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, gap: 32, textAlign: 'center' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: isMobile ? 36 : 48, fontWeight: 900, color: '#0070F3', letterSpacing: '-2px', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#64748B', fontWeight: 500, marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Misi & Visi */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '64px 24px' : '100px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32 }}>
          <div style={{ backgroundColor: '#EFF6FF', borderRadius: 28, padding: isMobile ? '32px 28px' : '48px 40px', border: '1px solid #BFDBFE' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🎯</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1E40AF', marginBottom: 16, letterSpacing: '-0.5px' }}>Misi Kami</h2>
            <p style={{ fontSize: 16, color: '#1E3A8A', lineHeight: 1.75, margin: 0 }}>
              Mempercepat pertumbuhan kompetensi profesional industri Indonesia melalui metode pembelajaran interaktif berbasis regulasi nyata — sehingga setiap orang bisa tampil lebih percaya diri dan kompeten di tempat kerja.
            </p>
          </div>
          <div style={{ backgroundColor: '#F0FDF4', borderRadius: 28, padding: isMobile ? '32px 28px' : '48px 40px', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>🌟</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#15803D', marginBottom: 16, letterSpacing: '-0.5px' }}>Visi Kami</h2>
            <p style={{ fontSize: 16, color: '#166534', lineHeight: 1.75, margin: 0 }}>
              Menjadi platform pelatihan standar industri terpercaya nomor satu di Indonesia yang melahirkan generasi profesional QA, QC, dan Manufaktur berkelas dunia.
            </p>
          </div>
        </div>
      </section>

      {/* Mengapa Latih */}
      <section style={{ backgroundColor: '#F8FAFC', padding: isMobile ? '64px 24px' : '100px 80px', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 72 }}>
            <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, letterSpacing: '-1px', color: '#0F172A', margin: '0 0 16px' }}>Mengapa Latih?</h2>
            <p style={{ fontSize: 16, color: '#64748B', margin: 0 }}>Kami bukan kursus biasa — kami adalah simulator karier Anda di industri.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
            {values.map((v) => (
              <div key={v.title} style={{ backgroundColor: 'white', borderRadius: 24, padding: '32px 28px', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '64px 24px' : '100px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 64 }}>
          <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, letterSpacing: '-1px', color: '#0F172A', margin: '0 0 16px' }}>Layanan Kami</h2>
          <p style={{ fontSize: 16, color: '#64748B', margin: 0 }}>Tiga format belajar yang saling melengkapi</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {services.map((s) => (
            <div key={s.title} style={{ backgroundColor: s.bg, borderRadius: 24, padding: '32px 24px', border: `1.5px solid ${s.border}`, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{s.emoji}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: s.color, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legalitas / CTA */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '0 24px 80px' : '0 40px 100px' }}>
        <div style={{ backgroundColor: '#0F172A', borderRadius: 32, padding: isMobile ? '40px 28px' : '56px 64px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 40, marginBottom: 20 }}>🏢</div>
          <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px' }}>Informasi Perusahaan</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 32px' }}>
            Latih dioperasikan sebagai platform edukasi profesional yang berkomitmen pada kualitas dan keandalan layanan digital di Indonesia. Untuk informasi lebih lanjut atau kerja sama, jangan ragu menghubungi kami.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '16px 28px', fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              📧 info@latih.co
            </div>
            <button onClick={() => onNavigate?.('contact')} style={{ backgroundColor: '#0070F3', border: 'none', borderRadius: 16, padding: '16px 28px', fontSize: 14, color: 'white', fontWeight: 700, cursor: 'pointer' }}>
              📞 Hubungi Kami →
            </button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #EAF0F6', padding: isMobile ? '32px 24px' : '32px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, backgroundColor: 'white' }}>
        <img src={LogoWarna} alt="Latih" style={{ height: 24, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748B' }}>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('privacy')}>Kebijakan Privasi</span>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('terms')}>Syarat & Ketentuan</span>
          <span style={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate?.('contact')}>Kontak</span>
        </div>
      </footer>
    </div>
  );
}
