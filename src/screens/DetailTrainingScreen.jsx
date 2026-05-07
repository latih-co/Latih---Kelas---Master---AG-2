import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Video, Clock, CheckCircle, User } from 'lucide-react';
import { useIsMobile } from '../utils/mobile';
import PaymentModal from '../components/PaymentModal';

export default function DetailTrainingScreen({ training, onBack, onNavigate, isGuest = false }) {
  const isMobile = useIsMobile();
  const [showPayment, setShowPayment] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleDaftar = () => {
    if (isGuest) setShowGuestModal(true);
    else setShowPayment(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!training) return null;

  const benefits = training.benefits || [
    "Sertifikat kelulusan terverifikasi online",
    "Akses materi PDF & rekaman seumur hidup",
    "Grup diskusi intensif bersama fasilitator",
    "Template dokumen & checklist implementasi"
  ];

  const syllabus = training.silabus || [
    "Pengantar & Pemahaman Konsep Dasar",
    "Bedah Klausul Utama & Persyaratan",
    "Langkah Implementasi di Lapangan",
    "Simulasi Audit & Studi Kasus Internal"
  ];

  const output = training.output || [
    "Mampu merancang sistem manajemen berdasarkan standar",
    "Memahami teknik audit internal yang efektif",
    "Mampu mengidentifikasi risiko dan peluang organisasi"
  ];

  const reasons = training.reasons || [
    "Materi disusun berdasarkan praktik terbaik (best practices) industri",
    "Fasilitator merupakan auditor bersertifikat dengan pengalaman lebih dari 10 tahun",
    "Metode pembelajaran interaktif dengan studi kasus nyata"
  ];

  return (
    <div style={{ padding: isMobile ? "20px 16px 100px" : "32px 40px 100px", fontFamily: "'Inter', sans-serif" }}>
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        style={{ 
          display: 'flex', alignItems: 'center', gap: 8, 
          background: 'none', border: 'none', padding: 0,
          color: 'var(--c-muted)', fontWeight: 600, fontSize: 13,
          cursor: 'pointer', marginBottom: 32
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--c-dark)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--c-muted)'}
      >
        <ArrowLeft size={16} /> Kembali ke daftar Training
      </button>

      {/* Hero Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 40, alignItems: 'flex-start', marginBottom: 48 }}>
        <div style={{ flex: 1, width: '100%' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: 'var(--surf-2)', color: 'var(--c-teal-dark)', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            {training.isFeatured ? "⭐ BATCH TERBARU" : "LIVE SESSION"}
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--c-dark)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 24 }}>
            {training.title}
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, padding: '20px 0', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <Calendar size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Tanggal</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>{training.stats?.tanggal || "Segera Hadir"}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <Video size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Platform</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>Zoom Meeting</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Waktu</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>19:00 - 21:00 WIB</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <User size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Pelatih</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>{training.trainer || "Instruktur Ahli"}</div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* CARD 1: Tentang & Benefit */}
            <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 32, border: '1px solid #EAF0F6', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                 <div style={{ width: 4, height: 24, backgroundColor: 'var(--c-teal)', borderRadius: 4 }} />
                 <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Deskripsi Program</h2>
              </div>
              <p style={{ fontSize: 15, color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: 32 }}>
                {training.deskripsi || `${training.title} dirancang khusus bagi profesional yang ingin memperdalam kompetensi relevan. Dibawakan secara interaktif melalui live-session, Anda akan diajak membedah teori standar, menganalisis studi kasus nyata, dan mensimulasikan praktik audit di lapangan pekerjaan.`}
              </p>

              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                 <span style={{ fontSize: 18 }}>✨</span> Spesial untuk Anda
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                {benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: 'var(--surf-2)', padding: '16px', borderRadius: 16 }}>
                     <CheckCircle size={20} color="var(--c-teal)" style={{ flexShrink: 0 }} />
                     <span style={{ fontSize: 13, color: 'var(--c-dark)', lineHeight: 1.5, fontWeight: 700 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 2: Peserta & Kenapa Harus Ikut */}
            <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 32, border: '1px solid #EAF0F6', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
              {training.targetPeserta && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                     <div style={{ width: 4, height: 24, backgroundColor: '#F59E0B', borderRadius: 4 }} />
                     <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Untuk Siapa Kelas Ini?</h2>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
                    {training.targetPeserta.map((t, i) => (
                      <div key={i} style={{ 
                        display: 'flex', alignItems: 'center', gap: 8, 
                        backgroundColor: '#FFFBEB', color: '#B45309', 
                        padding: '10px 16px', borderRadius: 99, fontWeight: 700, fontSize: 13,
                        border: '1px solid #FEF3C7'
                      }}>
                         <User size={16} style={{ flexShrink: 0 }} />
                         {t}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                 <div style={{ width: 4, height: 24, backgroundColor: 'var(--c-coral)', borderRadius: 4 }} />
                 <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Alasan Wajib Ikut</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                {reasons.map((r, i) => (
                  <div key={i} style={{ 
                    display: 'flex', gap: 16, alignItems: 'center', 
                    border: '1px solid #EAF0F6', padding: '16px 20px', borderRadius: 16,
                    transition: 'all 0.2s', cursor: 'default'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--c-coral)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#EAF0F6'}
                  >
                     <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>
                       {i + 1}
                     </div>
                     <span style={{ fontSize: 14, color: 'var(--c-dark)', lineHeight: 1.5, fontWeight: 600 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: Silabus & Output */}
            <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 32, border: '1px solid #EAF0F6', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                 <div style={{ width: 4, height: 24, backgroundColor: 'var(--c-teal-dark)', borderRadius: 4 }} />
                 <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Kurikulum & Silabus</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, borderLeft: '2px dashed #EAF0F6', marginLeft: 16, paddingLeft: 24, position: 'relative' }}>
                {syllabus.map((s, i) => (
                  <div key={i} style={{ 
                    display: 'flex', alignItems: 'center', gap: 16, 
                    backgroundColor: 'var(--surf-2)', padding: '16px 20px', borderRadius: 16,
                    position: 'relative'
                  }}>
                    {/* Timeline dot connecting to dashed line */}
                    <div style={{
                      position: 'absolute', left: -35, top: '50%', transform: 'translateY(-50%)',
                      width: 18, height: 18, borderRadius: '50%', backgroundColor: 'var(--c-teal-dark)',
                      border: '4px solid white', boxShadow: '0 0 0 1px #EAF0F6'
                    }} />
                    
                    <div style={{ fontSize: 14, color: 'var(--c-dark)', fontWeight: 700 }}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                 <div style={{ width: 4, height: 24, backgroundColor: '#6366F1', borderRadius: 4 }} />
                 <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Target Output Kelulusan</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {output.map((o, i) => (
                  <div key={i} style={{ 
                    display: 'flex', gap: 8, alignItems: 'center',
                    backgroundColor: '#EEF2FF', padding: '12px 16px', borderRadius: 12,
                  }}>
                     <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#6366F1', flexShrink: 0 }} />
                     <span style={{ fontSize: 13, color: '#4338CA', lineHeight: 1.5, fontWeight: 700 }}>{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 4: Galeri — hanya tampil jika ada gambar */}
            {(training.gallery?.length > 0) && (
              <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 32, border: '1px solid #EAF0F6', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                   <div style={{ width: 4, height: 24, backgroundColor: 'var(--c-dark)', borderRadius: 4 }} />
                   <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Galeri Batch Sebelumnya</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                  {training.gallery.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Galeri ${i + 1}`}
                      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 16, backgroundColor: 'var(--surf-2)', border: '1px solid #EAF0F6' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Hubungi Tim WhatsApp */}
            <div style={{ 
              backgroundColor: '#F0FDF8', borderRadius: 24, padding: 40,
              border: '1px solid rgba(0, 212, 157, 0.2)', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#047857', marginBottom: 16, letterSpacing: '-0.5px' }}>Masih Punya Pertanyaan?</h2>
              <p style={{ fontSize: 14, color: '#065F46', lineHeight: 1.6, marginBottom: 24, maxWidth: 380, opacity: 0.9 }}>
                Diskusikan kebutuhan spesifik Anda, request jadwal, atau tanyakan detail kurikulum langsung bersama tim representatif kami.
              </p>
              <button 
                onClick={() => { if (training.waLink) window.open(training.waLink, '_blank'); }}
                style={{
                backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: 12,
                padding: '14px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 16px rgba(37, 211, 102, 0.25)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                💬 Tanya via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Right side action card -> Bottom fixed banner on mobile */}
        <div style={isMobile ? {
          position: 'fixed', bottom: 70, left: 0, right: 0, // Above bottom nav!
          backgroundColor: 'white', padding: '16px 20px',
          borderTop: '1px solid #EAF0F6', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100
        } : { 
          width: 340, backgroundColor: 'white', borderRadius: 24, boxShadow: '0 12px 32px rgba(0,0,0,0.06)', 
          border: '1px solid #EAF0F6', padding: 24, flexShrink: 0, position: 'sticky', top: 32 
        }}>
          {!isMobile && (
            <img src={training.image || "https://placehold.co/400x400/EAF0F6/94A3B8?text=Placeholder"} alt={training.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 16, marginBottom: 24, backgroundColor: 'var(--surf-2)' }} />
          )}
          
          <div style={isMobile ? {} : { marginBottom: 24 }}>
            {!isMobile && <div style={{ fontSize: 13, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 4 }}>Biaya Registrasi</div>}
            <div className="font-mono" style={{ fontSize: isMobile ? 20 : 32, fontWeight: 900, color: 'var(--c-dark)', letterSpacing: '-1px' }}>
              {training.price}
            </div>
            {isMobile && <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600 }}>Biaya Registrasi</div>}
          </div>
          
          <div style={isMobile ? { flexShrink: 0 } : { width: '100%' }}>
            <button
              onClick={handleDaftar}
              style={{
                width: '100%', padding: isMobile ? '14px 24px' : '14px 0', backgroundColor: 'var(--c-teal)', color: 'white',
                border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 112, 243, 0.2)', marginBottom: isMobile ? 0 : 12, transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              💳 Daftar & Bayar Sekarang
            </button>
            
            {!isMobile && (
              <p style={{ fontSize: 11, color: 'var(--c-muted)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                Kapasitas kelas dibatasi maksimal 30 peserta untuk menjaga kualitas interaksi.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Guest Register Modal */}
      {showGuestModal && (
        <div onClick={() => setShowGuestModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: 24, padding: 40, maxWidth: 420, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Bikin Akun Dulu Yuk!</h2>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.65, margin: '0 0 28px' }}>
              Kalau punya akun, sertifikat dan link Zoom tersimpan di satu tempat.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => onNavigate('register')} style={{ padding: '13px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
                Buat Akun Gratis →
              </button>
              <button onClick={() => onNavigate('login')} style={{ padding: '13px 24px', backgroundColor: 'white', color: '#0F172A', border: '1.5px solid #E2E8F0', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Sudah punya akun? Masuk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && training && (
        <PaymentModal
          event={{
            id:            training.id || training._id || training.title,
            type:          'training',
            title:         training.title,
            price_regular: training.priceNum || 0,
            price_premium: 0,
          }}
          onClose={() => setShowPayment(false)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
