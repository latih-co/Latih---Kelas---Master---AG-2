import React, { useEffect, useState, useRef } from 'react';
import { categories } from '../data/courses';
import { useIsMobile } from '../utils/mobile';
import { supabase } from '../lib/supabase';
import LogoWarna from '../assets/Logo Latih Warna.png';

// ── Register Prompt Modal ────────────────────────────────────────
function RegisterModal({ onClose, onNavigate }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: 24, padding: 40, maxWidth: 440, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', margin: '0 0 12px', letterSpacing: '-0.5px' }}>Daftar Akun Gratis</h2>
        <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.6, margin: '0 0 32px' }}>
          Buat akun untuk mendaftar training & webinar. Riwayat, sertifikat, dan link Zoom tersimpan otomatis di satu tempat.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => onNavigate('register')} style={{ padding: '14px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
            Buat Akun Gratis →
          </button>
          <button onClick={() => onNavigate('login')} style={{ padding: '14px 24px', backgroundColor: 'white', color: '#0F172A', border: '1.5px solid #E2E8F0', borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Sudah punya akun? Masuk
          </button>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#94A3B8' }}>Gratis selamanya untuk modul microlearning</div>
      </div>
    </div>
  );
}

const TYPE_CONFIG = {
  training:         { label: 'Training',         color: '#0070F3', bg: '#EFF6FF', emoji: '🏭' },
  webinar_reguler:  { label: 'Webinar Reguler',  color: '#00A878', bg: '#ECFDF5', emoji: '🎙️' },
  webinar_advanced: { label: 'Webinar Advanced', color: '#7C3AED', bg: '#F5F3FF', emoji: '🚀' },
};

export default function LandingScreen({ onNavigate, onTrainingDetail, onWebinarDetail }) {
  const isMobile = useIsMobile();
  const [events, setEvents]           = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const previewRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  const handleSelectProgram = (key) => {
    const next = selectedProgram === key ? null : key;
    setSelectedProgram(next);
    if (next) setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    supabase.from('events').select('*').eq('is_active', true).order('event_date', { ascending: true }).limit(6)
      .then(({ data }) => { setEvents(data || []); setLoadingEvents(false); });
  }, []);

  const handleDetail = (event) => {
    if (event.type === 'training') onTrainingDetail?.(event);
    else onWebinarDetail?.(event);
  };

  return (
    <div style={{ backgroundColor: '#FFFCF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#0F172A' }}>

      {showModal && <RegisterModal onClose={() => setShowModal(false)} onNavigate={(p) => { setShowModal(false); onNavigate(p); }} />}

      {/* ── Navbar ── */}
      <nav style={{ backgroundColor: '#FFFCF8', padding: isMobile ? '16px 24px' : '20px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: scrolled ? '1px solid #EAF0F6' : '1px solid transparent', boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
        <img src={LogoWarna} alt="Latih" style={{ height: isMobile ? 26 : 32, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onNavigate('login')} style={{ padding: '9px 20px', backgroundColor: 'transparent', color: '#0F172A', border: '1px solid #E2E8F0', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Masuk
          </button>
          <button onClick={() => onNavigate('register')} style={{ padding: '9px 20px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 99, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
            Daftar Gratis
          </button>
        </div>
      </nav>
      {/* Spacer kompensasi navbar fixed */}
      <div style={{ height: isMobile ? 60 : 72 }} />

      {/* ── Hero ── */}
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: isMobile ? '40px 24px 80px' : '100px 80px 140px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 64 : 80 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: isMobile ? 42 : 68, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: 24 }}>
            Kuasai Standar & Mutu, <span style={{ color: 'var(--c-teal)' }}>Bukan Menghafal Teori.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 18 : 22, color: '#4B5563', lineHeight: 1.6, marginBottom: 48, fontWeight: 500, maxWidth: 580 }}>
            Cara revolusioner untuk belajar beragam topik Standar & Mutu Industri — pahami konsep melalui metode pemecahan masalah yang interaktif dan visual.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('kursus')} style={{ padding: isMobile ? '18px 32px' : '22px 48px', backgroundColor: 'var(--c-teal)', color: 'white', borderRadius: 20, fontSize: isMobile ? 16 : 18, fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,112,243,0.3)' }}>
              Mulai Belajar Sekarang
            </button>
            <button onClick={() => { const el = document.getElementById('events-section'); el?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: isMobile ? '18px 32px' : '22px 48px', backgroundColor: 'white', color: '#0F172A', borderRadius: 20, fontSize: isMobile ? 16 : 18, fontWeight: 700, border: '2px solid #E2E8F0', cursor: 'pointer' }}>
              Lihat Training & Webinar
            </button>
          </div>
        </div>

        {/* Hero Card Mockup */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? 300 : 500, height: isMobile ? 300 : 500, background: 'radial-gradient(circle, rgba(0,112,243,0.1) 0%, rgba(255,255,255,0) 70%)' }} />
          <div style={{ width: '100%', maxWidth: 480, backgroundColor: 'white', borderRadius: 32, padding: isMobile ? 24 : 40, boxShadow: '0 24px 80px rgba(17,24,39,0.08)', border: '1px solid #EAF0F6', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 56, height: 56, backgroundColor: '#FEF3C7', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 24 }}>🏭</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Root Cause Analysis</div>
            <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.6, marginBottom: 32 }}>Mesin konveyor tiba-tiba berhenti dan produk menumpuk di jalur akhir. Apa langkah investigasi pertama yang benar menurut standar mutu?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: '18px 24px', borderRadius: 16, border: '2px dashed #EAF0F6', display: 'flex', alignItems: 'center', gap: 14, fontWeight: 700, color: '#9CA3AF' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #D1D5DB' }} />
                Cek log parameter suhu
              </div>
              <div style={{ padding: '18px 24px', borderRadius: 16, backgroundColor: 'var(--surf-1)', border: '2px solid var(--c-teal)', color: 'var(--c-teal-dark)', display: 'flex', alignItems: 'center', gap: 14, fontWeight: 800, boxShadow: '0 8px 24px rgba(0,112,243,0.1)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--c-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                Lakukan inspeksi fisik (Gemba)
              </div>
            </div>
          </div>
          {!isMobile && (
            <>
              <div style={{ position: 'absolute', top: -20, right: 20, fontSize: 56, animation: 'bounce 3s infinite ease-in-out', zIndex: 2 }}>💡</div>
              <div style={{ position: 'absolute', bottom: 40, left: -30, fontSize: 64, zIndex: 2, transform: 'rotate(-15deg)' }}>🔬</div>
              <div style={{ position: 'absolute', top: '40%', right: -40, fontSize: 40, zIndex: 2, transform: 'rotate(15deg)' }}>📈</div>
            </>
          )}
        </div>
      </main>


      {/* ── Dua Cara Belajar — Hub ── */}
      <section style={{ backgroundColor: 'white', padding: isMobile ? '72px 24px 64px' : '100px 80px 88px', textAlign: 'center', overflow: 'hidden' }}>
        <style>{`
          @keyframes latihPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0,112,243,0.15), 0 8px 32px rgba(0,112,243,0.12); }
            50%       { box-shadow: 0 0 0 16px rgba(0,112,243,0.04), 0 12px 40px rgba(0,112,243,0.20); }
          }
          @keyframes hubNodeLeft {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-7px); }
          }
          @keyframes hubNodeRight {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(7px); }
          }
          @keyframes dotRipple {
            0%   { transform: scale(1); opacity: 1; }
            70%  { transform: scale(2.4); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
          }
          @keyframes dashLeft {
            from { background-position: 0 0; }
            to   { background-position: -24px 0; }
          }
          @keyframes dashRight {
            from { background-position: 0 0; }
            to   { background-position: 24px 0; }
          }
          .hub-left  { animation: hubNodeLeft  4s ease-in-out infinite; }
          .hub-right { animation: hubNodeRight 4.5s ease-in-out infinite; }
        `}</style>


        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 900, letterSpacing: '-1px', color: '#0F172A', margin: '0 0 10px', lineHeight: 1.2 }}>
          Tersedia Dua Jalur Belajar
        </h2>
        <p style={{ fontSize: isMobile ? 14 : 16, color: '#64748B', fontWeight: 500, margin: '0 0 64px', lineHeight: 1.6 }}>
          Belajar mandiri kapan saja, atau bersama Pelatih secara live.
        </p>

        {/* Diagram */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 24, padding: '24px 28px', border: '1.5px solid #BBF7D0', width: '100%', maxWidth: 320, textAlign: 'left' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>📱</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#15803D' }}>Interactive Microlearning</div>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'white', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,112,243,0.12)' }}>
              <img src={LogoWarna} alt="Latih" style={{ height: 28, objectFit: 'contain' }} />
            </div>
            <div style={{ backgroundColor: '#EFF6FF', borderRadius: 24, padding: '24px 28px', border: '1.5px solid #BFDBFE', width: '100%', maxWidth: 320, textAlign: 'left' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🎓</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#1D4ED8' }}>Live Online Training & Webinar</div>
            </div>
          </div>
        ) : (
          /* Desktop: flex row — kartu + garis + lingkaran sejajar otomatis */
          <div style={{ display: 'flex', alignItems: 'center', maxWidth: 820, margin: '0 auto', gap: 0 }}>

            {/* LEFT CARD — Live Online Training & Webinar */}
            <div className="hub-left" style={{ flex: '0 0 210px', position: 'relative', backgroundColor: 'white', borderRadius: 24, padding: '28px 24px', border: '1.5px solid #BFDBFE', boxShadow: '0 6px 24px rgba(59,130,246,0.10)', textAlign: 'left' }}>
              {/* Ping dot — right center */}
              <div style={{ position: 'absolute', top: '50%', right: -7, transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3B82F6', zIndex: 2 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#3B82F6', animation: 'dotRipple 2.4s infinite' }} />
              </div>
              <div style={{ fontSize: 36, marginBottom: 14 }}>🎓</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>Live Online Training & Webinar</div>
            </div>

            {/* DASHED LINE — left (biru) */}
            <div style={{ flex: 1, height: 2, background: 'repeating-linear-gradient(90deg, #3B82F6 0, #3B82F6 7px, transparent 7px, transparent 12px)', backgroundSize: '24px 2px', animation: 'dashLeft 0.6s linear infinite', opacity: 0.55 }} />

            {/* CENTER CIRCLE */}
            <div style={{ flex: '0 0 100px', height: 100, borderRadius: '50%', backgroundColor: 'white', border: '2px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'latihPulse 3s ease-in-out infinite', boxShadow: '0 8px 32px rgba(0,112,243,0.12)', zIndex: 1 }}>
              <img src={LogoWarna} alt="Latih" style={{ height: 17, objectFit: 'contain' }} />
            </div>

            {/* DASHED LINE — right (hijau) */}
            <div style={{ flex: 1, height: 2, background: 'repeating-linear-gradient(90deg, #22C55E 0, #22C55E 7px, transparent 7px, transparent 12px)', backgroundSize: '24px 2px', animation: 'dashRight 0.6s linear infinite', opacity: 0.55 }} />

            {/* RIGHT CARD — Interactive Microlearning */}
            <div className="hub-right" style={{ flex: '0 0 210px', position: 'relative', backgroundColor: 'white', borderRadius: 24, padding: '28px 24px', border: '1.5px solid #D1FAE5', boxShadow: '0 6px 24px rgba(34,197,94,0.10)', textAlign: 'left' }}>
              {/* Ping dot — left center */}
              <div style={{ position: 'absolute', top: '50%', left: -7, transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E', zIndex: 2 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#22C55E', animation: 'dotRipple 2s infinite' }} />
              </div>
              <div style={{ fontSize: 36, marginBottom: 14 }}>📱</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>Interactive Microlearning</div>
            </div>

          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2+3 — TRAINING & WEBINAR (GABUNGAN)
      ════════════════════════════════════════════════════════ */}
      <section id="events-section" style={{ backgroundColor: 'white', padding: isMobile ? '72px 24px' : '100px 80px', borderTop: '1px solid #EAF0F6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 900, letterSpacing: '-1px', color: '#0F172A', margin: '0 0 16px', lineHeight: 1.15 }}>
              Live Online Training & Webinar
            </h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: '#374151', lineHeight: 1.7, fontWeight: 500, margin: '0 auto', maxWidth: 580 }}>
              Pilih format belajar yang paling sesuai. <strong>Online Training</strong> untuk pelatihan intensif terstruktur, atau <strong>Webinar</strong> untuk sesi berbagi insight profesi dan tips praktis dari para praktisi.
            </p>
          </div>


          {/* Catalog */}
          {loadingEvents ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>⏳ Memuat jadwal...</div>
          ) : events.filter(e => e.type === 'training' || e.type === 'webinar_reguler' || e.type === 'webinar_advanced').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '56px 0', backgroundColor: '#F8FAFC', borderRadius: 24, border: '1px dashed #CBD5E1' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Jadwal segera hadir.</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>Daftarkan email kamu untuk dapat notifikasi program pertama.</div>
              <button onClick={() => setShowModal(true)} style={{ padding: '10px 28px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 99, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>
                Beri Tahu Saya →
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {events.filter(e => e.type === 'training' || e.type === 'webinar_reguler' || e.type === 'webinar_advanced').map(ev => {
                const isTraining = ev.type === 'training';
                const isAdv = ev.type === 'webinar_advanced';
                const accentColor = isTraining ? '#1D4ED8' : isAdv ? '#6D28D9' : '#059669';
                const accentBg = isTraining ? '#DBEAFE' : isAdv ? '#EDE9FE' : '#DCFCE7';
                const cardBg = isTraining ? '#FAFCFF' : isAdv ? '#FDFCFF' : '#FAFFFC';
                const cardBorder = isTraining ? '#DBEAFE' : isAdv ? '#DDD6FE' : '#C7F7E4';
                const emoji = isTraining ? '🏭' : isAdv ? '🚀' : '🎙️';
                const typeLabel = isTraining ? 'Training' : isAdv ? 'Webinar Advanced' : 'Webinar Reguler';
                const handleClick = () => isTraining ? onTrainingDetail?.(ev) : onWebinarDetail?.(ev);
                return (
                  <div key={ev.id} onClick={handleClick} style={{ backgroundColor: 'white', borderRadius: 20, border: `1.5px solid ${cardBorder}`, cursor: 'pointer', boxShadow: `0 2px 12px ${accentColor}18`, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Cover Image */}
                    {ev.image_url ? (
                      <img src={ev.image_url} alt={ev.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', aspectRatio: '1/1', background: isTraining ? 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)' : isAdv ? 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)' : 'linear-gradient(135deg, #059669 0%, #34D399 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
                        {emoji}
                      </div>
                    )}
                    {/* Card Body */}
                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: accentColor, backgroundColor: accentBg, padding: '2px 8px', borderRadius: 99 }}>{typeLabel}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', lineHeight: 1.35 }}>{ev.title}</div>
                      {ev.trainer && <div style={{ fontSize: 11, color: '#64748B' }}>👤 {ev.trainer}</div>}
                      <div style={{ fontSize: 11, color: '#64748B' }}>📅 {ev.event_date ? new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBA'}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 900, color: ev.price_regular === 0 ? '#15803D' : '#0F172A' }}>
                          {ev.price_regular > 0 ? `Rp ${ev.price_regular.toLocaleString('id-ID')}` : 'Gratis'}
                        </span>
                        <button onClick={e => { e.stopPropagation(); setShowModal(true); }} style={{ padding: '6px 12px', backgroundColor: accentColor, color: 'white', border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Daftar</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>


      {/* ── Features Zig-Zag ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '80px 24px' : '140px 40px' }}>

        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 64 : 100 }}>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 900, letterSpacing: '-1.5px', color: '#0F172A', margin: 0, lineHeight: 1.15 }}>
            Interactive Microlearning
          </h2>
        </div>

        {/* Feature 1 — Belajar Lebih Cepat */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 48 : 100, marginBottom: isMobile ? 80 : 160 }}>
          <div style={{ flex: 1, order: isMobile ? 2 : 1 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>Belajar Lebih Cepat, Lebih Dalam.</h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: '#4B5563', lineHeight: 1.7, fontWeight: 500 }}>Tidak ada lagi slide yang bikin ngantuk atau video yang tak kunjung selesai. Setiap sesi dirancang 10 menit — padat, eksploratif, dan langsung ke inti regulasi yang perlu kamu kuasai.</p>
          </div>
          <div style={{ flex: 1, order: isMobile ? 1 : 2, width: '100%' }}>
            <div style={{ padding: isMobile ? '32px 24px' : '48px 40px', backgroundColor: '#F0FDF4', borderRadius: 40, display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: '24px', boxShadow: '0 8px 40px rgba(34,197,94,0.12)', width: '100%', maxWidth: 360 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#15803D', backgroundColor: '#DCFCE7', padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 1 }}>HACCP & Keamanan Pangan</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>⏱️ 8 mnt</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Slide 3 dari 5</span>
                  <span style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>60%</span>
                </div>
                <div style={{ height: 7, backgroundColor: '#F3F4F6', borderRadius: 99, marginBottom: 20, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '60%', backgroundColor: '#22C55E', borderRadius: 99 }} />
                </div>
                <div style={{ fontSize: 14, color: '#1F2937', fontWeight: 600, lineHeight: 1.6, marginBottom: 16 }}>
                  Apa yang harus dilakukan jika titik CCP terlampaui selama produksi?
                </div>
                {[
                  { text: 'Hentikan lini & lakukan tindakan koreksi', correct: true },
                  { text: 'Lanjutkan dan catat di log harian', correct: false },
                  { text: 'Hubungi supervisor besok pagi', correct: false },
                ].map((opt, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 12, border: opt.correct ? '2px solid #22C55E' : '1.5px solid #E5E7EB', backgroundColor: opt.correct ? '#F0FDF4' : 'white', color: opt.correct ? '#15803D' : '#6B7280', fontSize: 13, fontWeight: opt.correct ? 700 : 400, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: opt.correct ? '#22C55E' : '#F3F4F6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: opt.correct ? 'white' : '#9CA3AF', fontWeight: 800, flexShrink: 0 }}>{opt.correct ? '✓' : i + 1}</span>
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 — Asah Naluri */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 48 : 100, marginBottom: isMobile ? 80 : 160 }}>
          <div style={{ flex: 1, order: isMobile ? 1 : 1, width: '100%' }}>
            <div style={{ padding: isMobile ? '32px 24px' : '48px 40px', backgroundColor: '#EFF6FF', borderRadius: 40, display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: '24px', boxShadow: '0 8px 40px rgba(59,130,246,0.12)', width: '100%', maxWidth: 360 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#1D4ED8', backgroundColor: '#DBEAFE', padding: '4px 12px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 1 }}>🔍 Studi Kasus</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.55, marginBottom: 18 }}>
                  Batch #B-2204 tidak memenuhi spesifikasi kadar air. Apa langkah investigasi pertama yang tepat?
                </div>
                {[
                  { text: 'Cek log kondisi penyimpanan gudang', state: 'wrong' },
                  { text: 'Lakukan Gemba ke area produksi', state: 'correct' },
                  { text: 'Karantina batch dan tunggu keputusan', state: 'neutral' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 12, border: item.state === 'correct' ? '2px solid #3B82F6' : item.state === 'wrong' ? '1.5px solid #FCA5A5' : '1.5px solid #E5E7EB', backgroundColor: item.state === 'correct' ? '#EFF6FF' : item.state === 'wrong' ? '#FFF5F5' : 'white', marginBottom: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: item.state === 'correct' ? '#3B82F6' : item.state === 'wrong' ? '#FCA5A5' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: item.state === 'correct' ? 'white' : item.state === 'wrong' ? '#EF4444' : '#9CA3AF', fontWeight: 800, flexShrink: 0 }}>
                      {item.state === 'correct' ? '✓' : item.state === 'wrong' ? '✕' : i + 1}
                    </div>
                    <span style={{ fontSize: 13, color: item.state === 'correct' ? '#1D4ED8' : item.state === 'wrong' ? '#EF4444' : '#374151', fontWeight: item.state === 'correct' ? 700 : 400 }}>{item.text}</span>
                  </div>
                ))}
                <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 12, backgroundColor: '#EFF6FF', border: '1px dashed #93C5FD' }}>
                  <span style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 600 }}>💡 Gemba adalah langkah pertama root cause analysis sesuai ISO 9001 Klausul 10.2</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, order: isMobile ? 2 : 2 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>Asah Naluri, Bukan Sekadar Hafalan.</h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: '#4B5563', lineHeight: 1.7, fontWeight: 500 }}>Di industri nyata, yang membedakan profesional biasa dan yang terbaik adalah kemampuan berpikir taktis saat masalah muncul. Di sini, kamu belajar lewat kasus nyata — temukan sendiri akar masalahnya, bangun sendiri intuisinya.</p>
          </div>
        </div>

        {/* Feature 3 — Kompetensi Terukur */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? 48 : 100 }}>
          <div style={{ flex: 1, order: isMobile ? 2 : 1 }}>
            <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 16 }}>Kompetensi Terukur, Karier Lebih Meyakinkan.</h2>
            <p style={{ fontSize: isMobile ? 15 : 17, color: '#4B5563', lineHeight: 1.7, fontWeight: 500 }}>Setiap studi kasus yang kamu selesaikan mengumpulkan XP. Tuntaskan Kuis Kelulusan dan dapatkan Sertifikat kompetensi resmi yang bisa langsung kamu tampilkan ke rekruter di LinkedIn.</p>
          </div>
          <div style={{ flex: 1, order: isMobile ? 1 : 2, width: '100%' }}>
            <div style={{ padding: isMobile ? '32px 24px' : '48px 40px', backgroundColor: '#FEF2F2', borderRadius: 40, display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: '24px', boxShadow: '0 8px 40px rgba(239,68,68,0.1)', width: '100%', maxWidth: 360 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>👷</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Ahmad Fauzi</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF' }}>QA Specialist · Industri Farmasi</div>
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Level 4 — QA Practitioner</span>
                    <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>820 / 1000 XP</span>
                  </div>
                  <div style={{ height: 8, backgroundColor: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg, #F59E0B, #EF4444)', borderRadius: 99 }} />
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Sertifikat Diraih</div>
                {[
                  { name: 'ISO 9001:2015 Fundamentals', color: '#1D4ED8', bg: '#DBEAFE' },
                  { name: 'HACCP & Food Safety Essentials', color: '#047857', bg: '#DCFCE7' },
                  { name: 'Root Cause Analysis Methods', color: '#7C3AED', bg: '#EDE9FE' },
                ].map((cert) => (
                  <div key={cert.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, backgroundColor: cert.bg, marginBottom: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>🏅</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: cert.color }}>{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA — Pilih Modul */}
        <div style={{ marginTop: isMobile ? 64 : 100, textAlign: 'center' }}>
          <p style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 }}>Pilih Modul Mulai Sekarang</p>
          <h3 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 900, letterSpacing: '-0.5px', color: '#0F172A', margin: '0 0 48px', lineHeight: 1.2 }}>
            Topik apa yang ingin kamu kuasai?
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
            {categories.flatMap(c => c.topics).slice(0, 8).map(t => (
              <div
                key={t.id}
                onClick={() => onNavigate('beranda')}
                style={{ backgroundColor: 'white', borderRadius: 20, padding: '22px 18px', border: '1.5px solid #D1FAE5', cursor: 'pointer', textAlign: 'left', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(34,197,94,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 30, marginBottom: 12 }}>{t.emoji || '📋'}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', lineHeight: 1.35, marginBottom: 10 }}>{t.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#15803D', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: 99 }}>{t.lessons?.length || 0} pelajaran</span>
                  <span style={{ fontSize: 12, color: '#15803D', fontWeight: 700 }}>Mulai →</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('beranda')}
            style={{ padding: isMobile ? '14px 32px' : '16px 40px', backgroundColor: '#15803D', color: 'white', border: 'none', borderRadius: 99, fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(21,128,61,0.25)' }}
          >
            Lihat Semua Modul →
          </button>
        </div>

      </section>


      {/* ── Referensi & Sumber Materi ── */}
      <section style={{ backgroundColor: '#FAFAFA', padding: isMobile ? '56px 24px' : '80px 40px', textAlign: 'center', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ height: 2, width: 40, background: 'linear-gradient(90deg, transparent, #0070F3)', borderRadius: 99 }} />
            <span style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#374151' }}>Referensi &amp; Sumber Materi</span>
            <div style={{ height: 2, width: 40, background: 'linear-gradient(90deg, #0070F3, transparent)', borderRadius: 99 }} />
          </div>
          <p style={{ fontSize: isMobile ? 15 : 16, color: '#9CA3AF', fontWeight: 400, margin: '0 0 48px', lineHeight: 1.6 }}>
            Kurikulum disusun berdasarkan standar dan regulasi resmi yang berlaku di industri.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'ISO',            abbr: 'International Org. for Standardization', color: '#2563EB' },
              { label: 'BPOM RI',        abbr: 'Badan Pengawas Obat & Makanan',          color: '#059669' },
              { label: 'Kemnaker RI',    abbr: 'Kementerian Ketenagakerjaan',             color: '#D97706' },
              { label: 'Kemenkes RI',    abbr: 'Kementerian Kesehatan',                   color: '#0891B2' },
              { label: 'SNI / BSN',      abbr: 'Standar Nasional Indonesia',              color: '#7C3AED' },
              { label: 'WHO / FAO',      abbr: 'World Health & Food Organization',        color: '#0369A1' },
              { label: 'FSSC',           abbr: 'Food Safety System Certification',        color: '#16A34A' },
              { label: 'GMP / CPOB',     abbr: 'Good Manufacturing Practice',            color: '#DB2777' },
              { label: 'HACCP / Codex',  abbr: 'Hazard Analysis Critical Control Points',color: '#EA580C' },
            ].map(({ label, abbr, color }, i, arr) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: isMobile ? '16px 20px' : '20px 32px', textAlign: 'center' }}>
                  <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color, letterSpacing: '-0.3px', marginBottom: 5 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#B0B7C3', fontWeight: 400, letterSpacing: '0.1px', maxWidth: isMobile ? 90 : 130, lineHeight: 1.4 }}>{abbr}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ width: 1, height: 44, backgroundColor: '#E5E7EB', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ backgroundColor: 'white', padding: isMobile ? '80px 24px' : '140px 40px', textAlign: 'center', borderTop: '1px solid #F3F4F6' }}>
        <h2 style={{ fontSize: isMobile ? 36 : 56, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: 700, margin: '0 auto 40px' }}>
          Siap Kuasai Standar & Mutu Industri Hari Ini?
        </h2>
        <button onClick={() => onNavigate('kursus')} style={{ padding: isMobile ? '20px 40px' : '24px 56px', backgroundColor: 'var(--c-dark)', color: 'white', borderRadius: 99, fontSize: isMobile ? 18 : 22, fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 16px 40px rgba(17,24,39,0.25)' }}>
          Mulai Belajar Gratis →
        </button>
        <div style={{ marginTop: 24, fontSize: 15, color: '#9CA3AF', fontWeight: 600 }}>Tanpa komitmen. Belajar kapan saja.</div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', padding: isMobile ? '60px 24px 40px' : '80px 80px 40px', fontSize: 14 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 48, borderBottom: '1px solid #374151', paddingBottom: 56, marginBottom: 32 }}>
            <div style={{ maxWidth: 340 }}>
              <img src="/Logo Latih Putih.png" alt="Latih" style={{ height: 30, objectFit: 'contain', marginBottom: 20 }} />
              <p style={{ lineHeight: 1.7, fontSize: 14 }}>Platform simulasi pembelajaran yang melatih logika, observasi, dan nalar kritis untuk menciptakan profesional Mutu Industri kelas dunia.</p>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? 32 : 80, flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Modul Cepat</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {['ISO 9001:2015 Dasar', 'HACCP & Keamanan Pangan', 'CPOB Farmasi', 'Root Cause Analysis'].map(l => <span key={l} style={{ cursor: 'pointer' }}>{l}</span>)}
                </div>
              </div>
              <div>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 20, fontSize: 15 }}>Dukungan</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <a href="/about" onClick={e => { e.preventDefault(); onNavigate('about'); }} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Tentang Kami</a>
                  <a href="/contact" onClick={e => { e.preventDefault(); onNavigate('contact'); }} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Kontak</a>
                  <a href="/terms" onClick={e => { e.preventDefault(); onNavigate('terms'); }} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Syarat &amp; Ketentuan</a>
                  <a href="/privacy" onClick={e => { e.preventDefault(); onNavigate('privacy'); }} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Kebijakan Privasi</a>
                  <a href="/verify" onClick={e => { e.preventDefault(); onNavigate('cert_verify'); }} style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>Verifikasi Sertifikat</a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 12, fontSize: 13 }}>
            <div>© {new Date().getFullYear()} Latih. Hak cipta dilindungi undang-undang.</div>
            <div style={{ color: '#6B7280' }}>Bukan merupakan anggota badan akreditasi resmi.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
