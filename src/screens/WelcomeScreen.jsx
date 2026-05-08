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
    gradient: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    accentColor: '#667EEA',
    lightBg: '#F3F0FF',
    textColor: '#4C1D95',
  },
  {
    id: 'kelas_sertifikasi',
    emoji: '🏭',
    title: 'Training Industri',
    subtitle: 'Pelatihan intensif bersertifikat',
    desc: 'Ikuti pelatihan langsung bersama praktisi industri. Dapatkan sertifikat resmi yang diakui perusahaan.',
    tags: ['Live Training', 'Praktisi', 'e-Sertifikat'],
    gradient: 'linear-gradient(135deg, #F7A134 0%, #E05C7A 100%)',
    accentColor: '#F7A134',
    lightBg: '#FFF7ED',
    textColor: '#92400E',
  },
  {
    id: 'webinar',
    emoji: '🎙️',
    title: 'Webinar Online',
    subtitle: 'Belajar bareng via Zoom',
    desc: 'Hadiri webinar interaktif dengan narasumber berpengalaman. Ada sesi tanya jawab langsung.',
    tags: ['Live Zoom', 'Interaktif', 'Recording'],
    gradient: 'linear-gradient(135deg, #00D49D 0%, #0070F3 100%)',
    accentColor: '#00D49D',
    lightBg: '#ECFDF5',
    textColor: '#065F46',
  },
];

export default function WelcomeScreen({ userName, onChoose }) {
  const [hovered, setHovered] = useState(null);
  const [chosen, setChosen]   = useState(null);

  const handleChoose = (pathId) => {
    setChosen(pathId);
    setTimeout(() => onChoose(pathId), 320);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      fontFamily: "'Inter', sans-serif",
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', position: 'relative', overflow: 'hidden',
    }}>

      {/* Background decorative blobs */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,157,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '20%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,161,52,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ width: '100%', maxWidth: 780, position: 'relative', zIndex: 1 }}>

        {/* Logo + greeting */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src={LogoWarna} alt="Latih" style={{ height: 32, objectFit: 'contain', marginBottom: 20, filter: 'brightness(1.1)' }} />

          {/* Welcome badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,212,157,0.15)', border: '1px solid rgba(0,212,157,0.3)', borderRadius: 99, padding: '6px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 14 }}>🎉</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00D49D', letterSpacing: '0.05em' }}>SELAMAT DATANG!</span>
          </div>

          <h1 style={{
            color: 'white', fontSize: 'clamp(24px, 5vw, 38px)',
            fontWeight: 900, margin: '0 0 10px',
            lineHeight: 1.2, letterSpacing: '-0.5px',
          }}>
            Halo, <span style={{ background: 'linear-gradient(90deg, #667EEA, #00D49D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{userName || 'Profesional'}</span>! 👋
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Sebelum mulai, pilih cara belajar yang sesuai dengan kebutuhanmu hari ini.
          </p>
        </div>

        {/* Path cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          {PATHS.map((path) => {
            const isHovered = hovered === path.id;
            const isChosen  = chosen  === path.id;
            return (
              <button
                key={path.id}
                onClick={() => handleChoose(path.id)}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered || isChosen
                    ? path.gradient
                    : 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${isHovered || isChosen ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 20,
                  padding: '28px 22px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: isHovered ? 'translateY(-6px) scale(1.02)' : isChosen ? 'scale(0.97)' : 'none',
                  boxShadow: isHovered
                    ? `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${path.accentColor}40`
                    : '0 4px 16px rgba(0,0,0,0.2)',
                  outline: 'none',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Emoji icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: isHovered || isChosen ? 'rgba(255,255,255,0.2)' : `${path.accentColor}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 16, transition: 'all 0.2s',
                }}>
                  {path.emoji}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 18, fontWeight: 900, marginBottom: 4,
                  color: 'white',
                  letterSpacing: '-0.3px',
                }}>
                  {path.title}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 600, marginBottom: 12,
                  color: isHovered || isChosen ? 'rgba(255,255,255,0.75)' : '#64748B',
                }}>
                  {path.subtitle}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 13, lineHeight: 1.6, margin: '0 0 16px',
                  color: isHovered || isChosen ? 'rgba(255,255,255,0.85)' : '#94A3B8',
                }}>
                  {path.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {path.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                      background: isHovered || isChosen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                      color: isHovered || isChosen ? 'white' : '#64748B',
                      border: `1px solid ${isHovered || isChosen ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
                      letterSpacing: '0.04em',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA arrow */}
                <div style={{
                  marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: isHovered || isChosen ? 'white' : path.accentColor,
                    opacity: isHovered || isChosen ? 1 : 0.7,
                  }}>
                    Mulai sekarang
                  </span>
                  <span style={{
                    fontSize: 18, color: 'white',
                    transform: isHovered ? 'translateX(4px)' : 'none',
                    transition: 'transform 0.2s',
                    opacity: isHovered || isChosen ? 1 : 0.4,
                  }}>
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Skip link */}
        <p style={{ textAlign: 'center', margin: 0 }}>
          <button
            onClick={() => onChoose('beranda')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: '#475569', fontFamily: "'Inter', sans-serif",
              textDecoration: 'underline', textUnderlineOffset: 3,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.target.style.color = '#94A3B8'}
            onMouseLeave={e => e.target.style.color = '#475569'}
          >
            Lewati, langsung ke Beranda →
          </button>
        </p>
      </div>
    </div>
  );
}
