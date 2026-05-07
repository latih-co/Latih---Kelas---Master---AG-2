import React, { useEffect } from 'react';
import { ArrowLeft, PlayCircle, FileText, CheckCircle, Clock } from 'lucide-react';
import { useIsMobile } from '../utils/mobile';

export default function DetailRekamanScreen({ record, onBack }) {
  const isMobile = useIsMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!record) return null;

  const includes = [
    "Akses rekaman video seumur hidup",
    "Materi presentasi PDF lengkap (unduh)",
    "Contoh dokumen & template (jika ada)",
    "E-Sertifikat kehadiran khusus"
  ];

  const chapters = [
    "Pendahuluan & Pemahaman Konsep Dasar Panduan",
    "Analisis Akar Masalah (Root Cause)",
    "Contoh Implementasi dan Studi Kasus",
    "Sesi Tanya Jawab (Q&A) Terpilih"
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
        <ArrowLeft size={16} /> Kembali ke Katalog Rekaman
      </button>

      {/* Hero Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 40, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, width: '100%' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: 'var(--surf-2)', color: 'var(--c-teal-dark)', borderRadius: 8, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            VIDEO ON-DEMAND
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--c-dark)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 16 }}>
            {record.title}
          </h1>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', lineHeight: 1.5, marginBottom: 24, maxWidth: 600 }}>
            Dapatkan rekaman komprehensif dari webinar edukatif kami. Tonton ulang kapan saja, di mana saja, dan jadikan referensi utama pekerjaan Anda bertahun-tahun ke depan.
          </p>
          
          <div style={{ display: 'flex', gap: 24, padding: '20px 0', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Durasi Video</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>{record.duration}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)' }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Materi</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 700 }}>PDF Download</div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 16 }}>Deskripsi Rekaman</h2>
            <p style={{ fontSize: 15, color: 'var(--c-muted)', lineHeight: 1.6, marginBottom: 40 }}>
              Video ini merupakan dokumentasi dari kelas eksklusif kami. Dengan membeli akses ke laman ini, Anda akan dapat memutar ulang seluruh materi presentasi secara utuh tanpa batasan waktu akses, serta mengunduh dokumen pelengkap terkait untuk keperluan studi.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 20 }}>Apa yang termasuk di dalam paket ini?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 40 }}>
              {includes.map((inc, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                   <CheckCircle size={20} color="var(--c-teal)" style={{ flexShrink: 0 }} />
                   <span style={{ fontSize: 14, color: 'var(--c-dark)', lineHeight: 1.4, fontWeight: 600 }}>{inc}</span>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 20 }}>Daftar Isi Video (Bab)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chapters.map((chap, i) => (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, 
                  padding: '16px 20px', backgroundColor: 'var(--surf-2)', borderRadius: 12 
                }}>
                  <div style={{ 
                    width: 28, height: 28, borderRadius: '50%', backgroundColor: 'white', 
                    color: 'var(--c-teal-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    flexShrink: 0, border: '1px solid #EAF0F6'
                  }}>
                    <PlayCircle size={14} />
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--c-dark)', fontWeight: 600 }}>{chap}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side floating action card */}
        <div style={isMobile ? {
          position: 'fixed', bottom: 70, left: 0, right: 0,
          backgroundColor: 'white', padding: '16px 20px',
          borderTop: '1px solid #EAF0F6', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100
        } : { 
          width: 340, backgroundColor: 'white', borderRadius: 24, boxShadow: '0 12px 32px rgba(0,0,0,0.06)', 
          border: '1px solid #EAF0F6', padding: 24, flexShrink: 0, position: 'sticky', top: 32 
        }}>
          {!isMobile && (
            <div style={{ position: 'relative', width: '100%', marginBottom: 24 }}>
              <img src={record.image || "https://placehold.co/400x300/EAF0F6/94A3B8?text=Placeholder"} alt={record.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 16, backgroundColor: 'var(--surf-2)' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--c-teal)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <PlayCircle size={24} />
                </div>
              </div>
            </div>
          )}
          
          <div style={isMobile ? {} : { marginBottom: 24 }}>
            {!isMobile && <div style={{ fontSize: 13, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 4 }}>Akses Seumur Hidup (Lifetime)</div>}
            <div className="font-mono" style={{ fontSize: isMobile ? 20 : 32, fontWeight: 900, color: 'var(--c-dark)', letterSpacing: '-1px' }}>
              {record.price}
            </div>
            {isMobile && <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600 }}>Akses Lifetime</div>}
          </div>
          
          <div style={isMobile ? { flexShrink: 0 } : { width: '100%' }}>
            <button style={{
              width: '100%', padding: isMobile ? '14px 24px' : '14px 0', backgroundColor: 'var(--c-teal)', color: 'white',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 112, 243, 0.2)', marginBottom: isMobile ? 0 : 12, transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Beli Akses
            </button>
            
            {!isMobile && (
              <p style={{ fontSize: 11, color: 'var(--c-muted)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                Rekaman dapat diakses instan melalui dashboard setelah proses pembayaran diverifikasi.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
