import React from 'react';
import { useIsMobile } from '../utils/mobile';

/**
 * GuestGateModal
 * Full-screen overlay shown when a guest tries to exceed their free quota.
 *
 * Props:
 *  onRegister  — () => void  : navigate to register screen
 *  onLogin     — () => void  : navigate to login screen
 *  onClose     — () => void  : dismiss (guest stays on current screen)
 *  reason      — 'sublesson' | 'lesson' | 'topic'  (optional, for copy)
 */
export default function GuestGateModal({ onRegister, onLogin, onClose, reason = 'sublesson' }) {
  const isMobile = useIsMobile();

  const copy = {
    sublesson: {
      emoji: '🔓',
      title: 'Buka Semua Materi',
      highlight: 'Kamu sudah selesai 3 sub-materi gratis!',
      body: 'Daftar gratis untuk melanjutkan semua sub-materi, menyimpan progres belajar, dan mendapatkan XP serta sertifikat modul.',
    },
    lesson: {
      emoji: '📚',
      title: 'Akses Semua Lesson',
      highlight: 'Mode coba terbatas pada 1 lesson.',
      body: 'Buat akun gratis untuk mengakses semua lesson dalam modul ini dan modul lainnya.',
    },
    topic: {
      emoji: '🗺️',
      title: 'Jelajahi Semua Modul',
      highlight: 'Mode coba terbatas pada 1 modul.',
      body: 'Daftar gratis untuk mengakses seluruh kurikulum — lebih dari 10 modul interaktif siap dipelajari.',
    },
  }[reason] || {};

  const BENEFITS = [
    { emoji: '⚡', text: 'Semua sub-materi & lesson terbuka' },
    { emoji: '🏆', text: 'XP & progres tersimpan otomatis' },
    { emoji: '🎓', text: 'Sertifikat modul setelah selesai' },
    { emoji: '📱', text: 'Akses dari perangkat mana saja' },
  ];

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'gateIn 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes gateIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gateCardIn {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        background: 'white',
        borderRadius: 28,
        padding: isMobile ? '32px 24px' : '44px 40px',
        maxWidth: 480, width: '100%',
        boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
        animation: 'gateCardIn 0.3s ease-out',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Decorative gradient blob */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,112,243,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            background: '#F1F5F9', border: 'none',
            cursor: 'pointer', fontSize: 16, color: '#64748B',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}
        >×</button>

        {/* Emoji */}
        <div style={{ fontSize: 52, marginBottom: 16, textAlign: 'center' }}>
          {copy.emoji}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: isMobile ? 22 : 26, fontWeight: 900,
          color: '#0F172A', textAlign: 'center',
          margin: '0 0 10px', letterSpacing: '-0.5px',
          fontFamily: "'Inter', sans-serif",
        }}>
          {copy.title}
        </h2>

        {/* Highlight pill */}
        <div style={{
          background: '#FEF3C7', border: '1px solid #FCD34D',
          borderRadius: 99, padding: '6px 16px',
          fontSize: 13, fontWeight: 700, color: '#92400E',
          textAlign: 'center', marginBottom: 16,
          display: 'inline-block', width: '100%',
          boxSizing: 'border-box',
        }}>
          ⚠️ {copy.highlight}
        </div>

        {/* Body */}
        <p style={{
          fontSize: 14, color: '#374151', lineHeight: 1.65,
          textAlign: 'center', margin: '0 0 24px',
          fontFamily: "'Inter', sans-serif",
        }}>
          {copy.body}
        </p>

        {/* Benefits list */}
        <div style={{
          background: '#F8FAFC', borderRadius: 16, padding: '16px 20px',
          marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {BENEFITS.map((b) => (
            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{b.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{b.text}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onRegister}
            style={{
              width: '100%', padding: '15px 0',
              background: 'linear-gradient(135deg, #0070F3, #0052CC)',
              color: 'white', border: 'none', borderRadius: 14,
              fontSize: 15, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,112,243,0.35)',
              fontFamily: "'Inter', sans-serif",
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Daftar Akun Gratis →
          </button>

          <button
            onClick={onLogin}
            style={{
              width: '100%', padding: '13px 0',
              background: 'white', color: '#0F172A',
              border: '1.5px solid #E2E8F0', borderRadius: 14,
              fontSize: 14, fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Sudah punya akun? Masuk
          </button>
        </div>


      </div>
    </div>
  );
}
