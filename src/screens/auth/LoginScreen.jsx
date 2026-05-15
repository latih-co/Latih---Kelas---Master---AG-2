import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import LogoWarna from '../../assets/Logo Latih Warna.png';

export default function LoginScreen({ onNavigate }) {
  const { signIn, resendVerification, signInWithGoogle } = useUser();
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendCooldown, setResendCooldown]   = useState(0);
  const [resendMsg, setResendMsg]             = useState('');

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Email dan password wajib diisi.'); return; }
    setLoading(true);
    setError('');
    setUnverifiedEmail('');
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      if (error.message.includes('Invalid login') || error.message.includes('invalid_credentials')) {
        setError('Email atau password salah.');
      } else if (error.message.includes('Email not confirmed') || error.message.includes('email_not_confirmed')) {
        setUnverifiedEmail(email);
        setResendCooldown(0);
      } else {
        setError(error.message);
      }
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendMsg('');
    const { error } = await resendVerification(unverifiedEmail);
    if (error) {
      setResendMsg('Gagal mengirim ulang. Coba beberapa saat lagi.');
    } else {
      setResendMsg('Email verifikasi berhasil dikirim! Cek inbox kamu.');
      setResendCooldown(60);
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
          <h1 style={{ color: '#0F172A', fontSize: 22, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
            Selamat datang kembali
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 28px' }}>
            Masuk ke akun Latih kamu
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, letterSpacing: '0.05em' }}>EMAIL</label>
              <input
                type="email" id="login-email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="kamu@email.com" autoComplete="email"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#0F172A'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', letterSpacing: '0.05em' }}>PASSWORD</label>
                <span style={{ fontSize: 11, color: '#0F172A', cursor: 'pointer', fontWeight: 600 }} onClick={() => onNavigate('forgot_password')}>
                  Lupa password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} id="login-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = '#0F172A'}
                  onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 16, padding: 0 }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Banner email belum terverifikasi */}
            {unverifiedEmail && (
              <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>📧</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#92400E', marginBottom: 2 }}>Email belum diverifikasi</div>
                    <div style={{ fontSize: 12, color: '#B45309', lineHeight: 1.5 }}>Cek inbox atau folder Spam untuk email verifikasi dari Latih.</div>
                  </div>
                </div>
                <button
                  id="resend-from-login"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  style={{ width: '100%', padding: '9px', borderRadius: 8, border: 'none', background: resendCooldown > 0 ? '#FEF3C7' : '#F59E0B', color: resendCooldown > 0 ? '#B45309' : 'white', fontSize: 12, fontWeight: 700, cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer' }}
                >
                  {resendCooldown > 0 ? `⏱ Kirim ulang dalam ${resendCooldown}s` : '🔄 Kirim ulang email verifikasi'}
                </button>
                {resendMsg && (
                  <p style={{ fontSize: 11, margin: '6px 0 0', color: resendMsg.includes('berhasil') ? '#16A34A' : '#EF4444', textAlign: 'center' }}>{resendMsg}</p>
                )}
              </div>
            )}

            <button
              type="submit" id="login-submit" disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#94A3B8' : '#0F172A', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: 'white', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
            >
              {loading ? '⏳ Memproses...' : 'Masuk →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#EAF0F6' }} />
            <span style={{ fontSize: 12, color: '#CBD5E1' }}>atau</span>
            <div style={{ flex: 1, height: 1, background: '#EAF0F6' }} />
          </div>

          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              const { error } = await signInWithGoogle();
              if (error) {
                setError(error.message);
                setLoading(false);
              }
            }}
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: 'white', border: '1.5px solid #EAF0F6', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#0F172A', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, transition: 'background-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 16, height: 16 }} />
            Lanjutkan dengan Google
          </button>

          <p style={{ textAlign: 'center', margin: 0, fontSize: 13, color: '#94A3B8' }}>
            Belum punya akun?{' '}
            <span onClick={() => onNavigate('register')} style={{ color: '#0F172A', fontWeight: 700, cursor: 'pointer' }}>
              Daftar gratis
            </span>
          </p>
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
