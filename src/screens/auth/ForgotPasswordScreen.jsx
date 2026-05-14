import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import LogoWarna from '../../assets/Logo Latih Warna.png';

export default function ForgotPasswordScreen({ onNavigate }) {
  const { resetPassword } = useUser();
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [sent, setSent]       = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email wajib diisi.'); return; }
    setLoading(true); setError('');
    const { error: err } = await resetPassword(email.trim());
    setLoading(false);
    if (err) {
      setError('Gagal mengirim. Pastikan email terdaftar dan coba lagi.');
    } else {
      setSent(true);
    }
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'white', border: '1.5px solid #E2E8F0',
    borderRadius: 12, padding: '13px 16px',
    fontSize: 14, color: '#0F172A', outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFCF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src={LogoWarna} alt="Latih" style={{ height: 36, objectFit: 'contain', marginBottom: 12 }} />
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
            Microlearning untuk profesional industri
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', border: '1px solid #EAF0F6', borderRadius: 24, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {!sent ? (
            <>
              {/* Ikon */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(0,112,243,0.12)' }}>
                  🔑
                </div>
                <h1 style={{ color: '#0F172A', fontSize: 20, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                  Lupa Password?
                </h1>
                <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                  Masukkan email akun kamu. Kami akan kirim link untuk membuat password baru.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, letterSpacing: '0.05em' }}>EMAIL AKUN</label>
                  <input
                    type="email" id="forgot-email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="kamu@email.com" autoComplete="email"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0F172A'}
                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>

                {error && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit" disabled={loading}
                  style={{ width: '100%', padding: '14px', background: loading ? '#94A3B8' : '#0F172A', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: 'white', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
                >
                  {loading ? '⏳ Mengirim...' : '📧 Kirim Link Reset Password'}
                </button>
              </form>
            </>
          ) : (
            /* ── State: Email terkirim ── */
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 20px', boxShadow: '0 4px 20px rgba(34,197,94,0.15)' }}>
                ✉️
              </div>
              <h2 style={{ color: '#0F172A', fontSize: 20, fontWeight: 900, margin: '0 0 8px' }}>
                Email Terkirim!
              </h2>
              <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.7, margin: '0 0 24px' }}>
                Link reset password sudah dikirim ke<br />
                <strong style={{ color: '#0F172A' }}>{email}</strong><br />
                Cek inbox atau folder <strong>Spam</strong> kamu.
              </p>

              <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '14px 18px', marginBottom: 24, textAlign: 'left' }}>
                {[
                  ['1', 'Buka email dari Latih'],
                  ['2', 'Klik link "Reset Password"'],
                  ['3', 'Buat password baru, lalu masuk'],
                ].map(([num, text]) => (
                  <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: num !== '3' ? 10 : 0 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0F172A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{num}</div>
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('login')}
                style={{ width: '100%', padding: '13px', background: '#0F172A', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800, color: 'white', cursor: 'pointer' }}
              >
                Kembali ke Halaman Masuk →
              </button>
            </div>
          )}

          {/* Link kembali */}
          {!sent && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>
                Ingat password?{' '}
                <span onClick={() => onNavigate('login')} style={{ color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>Masuk</span>
              </span>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20 }}>
          <span onClick={() => onNavigate('landing')} style={{ fontSize: 12, color: '#CBD5E1', cursor: 'pointer' }}>
            ← Kembali ke beranda
          </span>
        </p>
      </div>
    </div>
  );
}
