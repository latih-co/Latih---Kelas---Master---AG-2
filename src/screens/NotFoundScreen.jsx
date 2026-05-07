import React from 'react';
import { useIsMobile } from '../utils/mobile';

export default function NotFoundScreen({ onGoHome }) {
  const isMobile = useIsMobile();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '40px 24px' : '60px 40px',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
    }}>
      {/* Animated icon */}
      <div style={{
        fontSize: 72, marginBottom: 24,
        animation: 'floatBob 3s ease-in-out infinite',
      }}>
        🗺️
      </div>

      {/* Error code */}
      <div style={{
        fontSize: isMobile ? 64 : 96,
        fontWeight: 900,
        letterSpacing: '-4px',
        lineHeight: 1,
        background: 'linear-gradient(135deg, var(--c-teal), #6366F1)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 16,
      }}>
        404
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: isMobile ? 20 : 24,
        fontWeight: 800,
        color: 'var(--c-dark)',
        margin: '0 0 12px 0',
        letterSpacing: '-0.5px',
      }}>
        Halaman tidak ditemukan
      </h1>

      {/* Subtext */}
      <p style={{
        fontSize: 14,
        color: 'var(--c-muted)',
        lineHeight: 1.65,
        maxWidth: 320,
        marginBottom: 36,
      }}>
        Sepertinya halaman yang kamu cari sudah dipindahkan, dihapus, atau memang tidak pernah ada.
        Yuk kembali ke Dashboard dan lanjutkan belajar!
      </p>

      {/* CTA */}
      <button
        onClick={onGoHome}
        style={{
          backgroundColor: 'var(--c-teal)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          padding: '14px 32px',
          fontSize: 14,
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,112,243,0.25)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        🏠 Kembali ke Dashboard
      </button>

      {/* Brand watermark */}
      <div style={{
        marginTop: 48,
        fontSize: 11,
        color: 'var(--c-muted)',
        fontWeight: 600,
        letterSpacing: 1,
        opacity: 0.5,
        textTransform: 'uppercase',
      }}>
        Latih — Platform Belajar Industri
      </div>
    </div>
  );
}
