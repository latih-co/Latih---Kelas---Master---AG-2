import React, { useState } from 'react';
import LogoWarna from '../assets/Logo Latih Warna.png';

const PATHS = [
  {
    id: 'kursus',
    emoji: '🧠',
    title: 'Microlearning',
    subtitle: 'Belajar mandiri kapan saja',
    desc: 'Pelajari materi industri lewat modul interaktif singkat. Cocok untuk upgrade skill sehari-hari.',
    tags: ['Self-paced', 'Gratis', 'Sertifikat Modul'],
    accent: '#6366F1',
    lightBg: '#EEF2FF',
    border: '#C7D2FE',
  },
  {
    id: 'kelas_sertifikasi',
    emoji: '🏭',
    title: 'Training Industri',
    subtitle: 'Pelatihan intensif bersertifikat',
    desc: 'Ikuti pelatihan langsung bersama praktisi industri. Dapatkan sertifikat resmi yang diakui perusahaan.',
    tags: ['Live Training', 'Praktisi', 'e-Sertifikat'],
    accent: '#F59E0B',
    lightBg: '#FFFBEB',
    border: '#FDE68A',
  },
  {
    id: 'webinar',
    emoji: '🎙️',
    title: 'Webinar Online',
    subtitle: 'Belajar bareng via Zoom',
    desc: 'Hadiri webinar interaktif dengan narasumber berpengalaman. Ada sesi tanya jawab langsung.',
    tags: ['Live Zoom', 'Interaktif', 'Recording'],
    accent: '#10B981',
    lightBg: '#ECFDF5',
    border: '#A7F3D0',
  },
];

export default function WelcomeScreen({ userName, onChoose }) {
  const [hovered, setHovered] = useState(null);
  const [chosen, setChosen]   = useState(null);

  const handleChoose = (pathId) => {
    setChosen(pathId);
    setTimeout(() => onChoose(pathId), 280);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 760 }}>

        {/* Logo + Greeting — center aligned */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src={LogoWarna} alt="Latih" style={{ height: 30, objectFit: 'contain', marginBottom: 16 }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#F0FDF4', border: '1px solid #BBF7D0',
            borderRadius: 99, padding: '5px 14px', marginBottom: 14,
          }}>
            <span style={{ fontSize: 13 }}>🎉</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D', letterSpacing: '0.06em' }}>
              SELAMAT DATANG
            </span>
          </div>

          <h1 style={{
            color: '#0F172A', fontSize: 'clamp(20px, 4vw, 30px)',
            fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.5px', lineHeight: 1.2,
          }}>
            Halo, {userName || 'Profesional'}! 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Pilih cara belajar yang sesuai dengan kebutuhanmu hari ini.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#F1F5F9', marginBottom: 20 }} />

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 14,
          marginBottom: 20,
        }}>
          {PATHS.map((path) => {
            const isHovered = hovered === path.id;
            const isChosen  = chosen  === path.id;
            const active    = isHovered || isChosen;
            return (
              <button
                key={path.id}
                onClick={() => handleChoose(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: active ? path.lightBg : '#FAFAFA',
                  border: `1.5px solid ${active ? path.border : '#E2E8F0'}`,
                  borderRadius: 18,
                  padding: '24px 20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.22s ease',
                  transform: isHovered ? 'translateY(-4px)' : isChosen ? 'scale(0.98)' : 'none',
                  boxShadow: active
                    ? `0 8px 24px ${path.accent}18`
                    : '0 1px 4px rgba(0,0,0,0.04)',
                  outline: 'none',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: active ? `${path.accent}18` : '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, marginBottom: 16, transition: 'all 0.2s',
                }}>
                  {path.emoji}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 16, fontWeight: 800, color: '#0F172A',
                  marginBottom: 3, letterSpacing: '-0.2px',
                }}>
                  {path.title}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 10 }}>
                  {path.subtitle}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 13, color: '#64748B', lineHeight: 1.6,
                  margin: '0 0 14px',
                }}>
                  {path.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {path.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, fontWeight: 700,
                      padding: '3px 8px', borderRadius: 6,
                      background: active ? `${path.accent}12` : '#F1F5F9',
                      color: active ? path.accent : '#94A3B8',
                      border: `1px solid ${active ? path.border : 'transparent'}`,
                      letterSpacing: '0.03em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: 12, borderTop: `1px solid ${active ? path.border : '#F1F5F9'}`,
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: active ? path.accent : '#94A3B8',
                  }}>
                    Mulai sekarang
                  </span>
                  <span style={{
                    fontSize: 16,
                    color: active ? path.accent : '#CBD5E1',
                    transform: isHovered ? 'translateX(3px)' : 'none',
                    transition: 'transform 0.2s',
                  }}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onChoose('beranda')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: '#94A3B8', fontFamily: "'Inter', sans-serif",
              padding: '8px 16px', borderRadius: 8,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#64748B'}
            onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
          >
            Lewati, langsung ke Beranda →
          </button>
        </div>

      </div>
    </div>
  );
}
