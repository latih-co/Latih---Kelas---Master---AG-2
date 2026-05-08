import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import LogoWarna from '../../assets/Logo Latih Warna.png';

const JOB_ROLES = [
  'QA / Quality Control', 'Regulatory Affairs', 'Production / Operasional',
  'R&D / Formulasi', 'Supply Chain / Logistik', 'HSE / K3',
  'Marketing / Product Manager', 'Fresh Graduate / Mahasiswa', 'Lainnya',
];

export default function RegisterScreen({ onNavigate }) {
  const { signUp, resendVerification } = useUser();
  const [step, setStep]         = useState(1);
  const [name, setName]         = useState('');
  const [jobRole, setJobRole]   = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);

  // Resend countdown
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMsg, setResendMsg]           = useState('');

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Nama lengkap wajib diisi.'); return; }
    if (!jobRole)     { setError('Pilih peran pekerjaan kamu.'); return; }
    setError(''); setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)               { setError('Email wajib diisi.'); return; }
    if (password.length < 8)  { setError('Password minimal 8 karakter.'); return; }
    if (password !== confirm)  { setError('Password dan konfirmasi tidak cocok.'); return; }
    setLoading(true); setError('');
    try {
      const { error, needsVerification } = await signUp(email, password, name, jobRole);
      setLoading(false);
      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
          setError('Email ini sudah terdaftar. Silakan masuk.');
        } else {
          setError(error.message || 'Terjadi kesalahan. Coba lagi.');
        }
      } else if (needsVerification) {
        // Email confirmation required → tampilkan layar cek email
        setStep(3);
        setResendCooldown(60);
      } else {
        // Email confirmation OFF → user langsung login, App.jsx akan redirect ke beranda
        // Tidak perlu lakukan apapun di sini
      }
    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan tidak terduga: ' + (err.message || 'Coba lagi.'));
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendMsg('');
    const { error } = await resendVerification(email);
    if (error) {
      setResendMsg('Gagal mengirim ulang. Coba beberapa saat lagi.');
    } else {
      setResendMsg('Email verifikasi berhasil dikirim ulang! Cek inbox kamu.');
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
  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 700,
    color: '#64748B', marginBottom: 8, letterSpacing: '0.05em',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFCF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>

      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src={LogoWarna} alt="Latih" style={{ height: 36, objectFit: 'contain', marginBottom: 12 }} />
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>Buat akun gratis — belajar mulai hari ini</p>
        </div>

        {/* Stepper — hanya tampil di step 1 & 2 */}
        {step < 3 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: s <= step ? '#0F172A' : '#E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800,
                  color: s <= step ? 'white' : '#94A3B8',
                  transition: 'all 0.3s',
                }}>{s}</div>
                {s < 2 && <div style={{ width: 40, height: 2, background: s < step ? '#0F172A' : '#E2E8F0', transition: 'background 0.3s' }} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Card */}
        <div style={{ background: 'white', border: '1px solid #EAF0F6', borderRadius: 24, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <h1 style={{ color: '#0F172A', fontSize: 20, fontWeight: 800, margin: '0 0 6px' }}>Perkenalkan diri kamu</h1>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 24px' }}>Agar materi lebih relevan dengan pekerjaanmu</p>

              <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>NAMA LENGKAP</label>
                  <input
                    type="text" id="reg-name" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0F172A'}
                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>PERAN PEKERJAAN</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {JOB_ROLES.map(role => (
                      <button
                        key={role} type="button" onClick={() => setJobRole(role)}
                        style={{
                          padding: '7px 13px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                          border: jobRole === role ? '1.5px solid #0F172A' : '1.5px solid #E2E8F0',
                          background: jobRole === role ? '#0F172A' : 'white',
                          color: jobRole === role ? 'white' : '#64748B',
                          transition: 'all 0.15s',
                        }}
                      >{role}</button>
                    ))}
                  </div>
                </div>

                {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>⚠️ {error}</div>}

                <button type="submit" style={{ width: '100%', padding: '14px', background: '#0F172A', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: 'white', cursor: 'pointer', marginTop: 4 }}>
                  Lanjut →
                </button>
              </form>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <button onClick={() => { setStep(1); setError(''); }} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 18 }}>←</button>
                <h1 style={{ color: '#0F172A', fontSize: 20, fontWeight: 800, margin: 0 }}>Buat akun kamu</h1>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 24px' }}>
                Halo, <strong style={{ color: '#0F172A' }}>{name}</strong> 👋 Atur email dan password
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>EMAIL</label>
                  <input
                    type="email" id="reg-email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="kamu@email.com" autoComplete="email"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0F172A'}
                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>PASSWORD</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'} id="reg-password"
                      value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter" autoComplete="new-password"
                      style={{ ...inputStyle, paddingRight: 44 }}
                      onFocus={e => e.target.style.borderColor = '#0F172A'}
                      onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 16, padding: 0 }}>
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: password.length >= i * 4 ? (i === 3 ? '#22C55E' : i === 2 ? '#F7A134' : '#EF4444') : '#E2E8F0' }} />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>KONFIRMASI PASSWORD</label>
                  <input
                    type="password" id="reg-confirm"
                    value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="Ulangi password" autoComplete="new-password"
                    style={{ ...inputStyle, borderColor: confirm && confirm !== password ? '#FCA5A5' : '#E2E8F0' }}
                    onFocus={e => e.target.style.borderColor = '#0F172A'}
                    onBlur={e => e.target.style.borderColor = confirm && confirm !== password ? '#FCA5A5' : '#E2E8F0'}
                  />
                </div>

                {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444' }}>⚠️ {error}</div>}

                <button
                  type="submit" id="reg-submit" disabled={loading}
                  style={{ width: '100%', padding: '14px', background: loading ? '#94A3B8' : '#0F172A', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: 'white', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}
                >
                  {loading ? '⏳ Membuat akun...' : '🎓 Buat Akun Gratis'}
                </button>

                <p style={{ textAlign: 'center', margin: 0, fontSize: 11, color: '#CBD5E1', lineHeight: 1.6 }}>
                  Dengan mendaftar kamu menyetujui{' '}
                  <span style={{ color: '#64748B', cursor: 'pointer' }} onClick={() => onNavigate('terms')}>Syarat & Ketentuan</span>
                  {' '}dan{' '}
                  <span style={{ color: '#64748B', cursor: 'pointer' }} onClick={() => onNavigate('privacy')}>Kebijakan Privasi</span>
                </p>
              </form>
            </>
          )}

          {/* ── STEP 3: Cek Email ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              {/* Ikon amplop */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 38, margin: '0 auto 20px',
                boxShadow: '0 4px 20px rgba(0,112,243,0.15)',
              }}>
                ✉️
              </div>

              <h1 style={{ color: '#0F172A', fontSize: 22, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.3px' }}>
                Cek email kamu!
              </h1>
              <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 4px', lineHeight: 1.6 }}>
                Kami telah mengirimkan link verifikasi ke
              </p>
              <p style={{ color: '#0F172A', fontSize: 15, fontWeight: 800, margin: '0 0 24px', wordBreak: 'break-all' }}>
                {email}
              </p>

              {/* Steps */}
              <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '16px 18px', marginBottom: 24, textAlign: 'left' }}>
                {[
                  ['1', 'Buka email dari Latih'],
                  ['2', 'Klik link "Konfirmasi Email"'],
                  ['3', 'Kamu langsung bisa masuk dan belajar!'],
                ].map(([num, text]) => (
                  <div key={num} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: num !== '3' ? 10 : 0 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0F172A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{num}</div>
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Resend */}
              <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 10px' }}>
                Tidak menemukan email? Cek folder <strong>Spam</strong> atau kirim ulang.
              </p>
              <button
                id="resend-verification"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                style={{
                  padding: '11px 24px', borderRadius: 10,
                  background: resendCooldown > 0 ? '#F1F5F9' : 'white',
                  border: `1.5px solid ${resendCooldown > 0 ? '#E2E8F0' : '#0F172A'}`,
                  color: resendCooldown > 0 ? '#94A3B8' : '#0F172A',
                  fontSize: 13, fontWeight: 700,
                  cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                  marginBottom: 8, transition: 'all 0.2s',
                }}
              >
                {resendCooldown > 0 ? `⏱ Kirim ulang dalam ${resendCooldown}s` : '🔄 Kirim ulang email verifikasi'}
              </button>
              {resendMsg && (
                <p style={{ fontSize: 12, margin: '0 0 16px', color: resendMsg.includes('berhasil') ? '#16A34A' : '#EF4444' }}>
                  {resendMsg}
                </p>
              )}

              <div style={{ height: 1, background: '#F1F5F9', margin: '16px 0' }} />

              <button
                onClick={() => onNavigate('login')}
                style={{ width: '100%', padding: '13px', background: '#0F172A', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800, color: 'white', cursor: 'pointer' }}
              >
                Sudah verifikasi? Masuk →
              </button>
            </div>
          )}

          {/* Link ke login — hanya di step 1 & 2 */}
          {step < 3 && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: '#94A3B8' }}>
                Sudah punya akun?{' '}
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
