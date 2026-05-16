import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import LogoWarna from '../../assets/Logo Latih Warna.png';


export default function RegisterScreen({ onNavigate }) {
  const { signUp, resendVerification, signInWithGoogle } = useUser();
  const [step, setStep]         = useState(1);
  const [name, setName]         = useState('');
  const [jobRole, setJobRole]   = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (!name.trim())     { setError('Nama lengkap wajib diisi.'); return; }
    if (!jobRole.trim())  { setError('Peran pekerjaan wajib diisi.'); return; }
    if (!whatsapp.trim()) { setError('Nomor WhatsApp wajib diisi.'); return; }
    setError(''); setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)               { setError('Email wajib diisi.'); return; }
    if (password.length < 8)  { setError('Password minimal 8 karakter.'); return; }
    if (password !== confirm)  { setError('Password dan konfirmasi tidak cocok.'); return; }
    // Validasi OK — tampilkan konfirmasi sebelum buat akun
    setError('');
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    setLoading(true); setError('');
    try {
      const { error, needsVerification } = await signUp(email, password, name, jobRole, whatsapp);
      setLoading(false);
      if (error) {
        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
          setError('Email ini sudah terdaftar. Silakan masuk.');
        } else {
          setError(error.message || 'Terjadi kesalahan. Coba lagi.');
        }
      } else if (needsVerification) {
        setStep(3);
        setResendCooldown(60);
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
      <style>{`
        .reg-notice-bubble {
          position: absolute;
          top: 0;
          left: calc(100% + 44px);
          width: 250px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
          background: #FFFBEB;
          border: 1px solid #FCD34D;
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          z-index: 10;
        }
        .reg-notice-arrow {
          position: absolute;
          top: 16px;
          left: -6px;
          width: 10px;
          height: 10px;
          background: #FFFBEB;
          border-left: 1px solid #FCD34D;
          border-bottom: 1px solid #FCD34D;
          transform: rotate(45deg);
        }
        @media (max-width: 900px) {
          .reg-notice-bubble {
            position: static;
            width: 100%;
            margin-top: 10px;
            box-shadow: none;
            padding: 10px 12px;
          }
          .reg-notice-arrow {
            display: none;
          }
        }
      `}</style>

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
              <h1 style={{ color: '#0F172A', fontSize: 20, fontWeight: 800, margin: '0 0 24px' }}>Perkenalkan diri kamu</h1>

              <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>NAMA LENGKAP</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text" id="reg-name" value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      style={{ ...inputStyle, width: '100%' }}
                      onFocus={e => e.target.style.borderColor = '#0F172A'}
                      onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                    />
                    {/* Notice sertifikat bubble (outside card on desktop) */}
                    <div className="reg-notice-bubble">
                      <div className="reg-notice-arrow" />
                      <span style={{ fontSize: 14, flexShrink: 0, position: 'relative', zIndex: 1 }}>🎓</span>
                      <p style={{ margin: 0, fontSize: 10.5, color: '#92400E', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                        <strong>Akan tercetak di sertifikat.</strong><br/>
                        Pastikan benar (tambahkan gelar jika ada). <strong>Tidak bisa diedit</strong> nanti.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>PERAN / JABATAN PEKERJAAN</label>
                  <input
                    type="text" id="reg-job-role" value={jobRole}
                    onChange={e => setJobRole(e.target.value)}
                    placeholder="Contoh: QA Manager, Production Supervisor, R&D Officer..."
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#0F172A'}
                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>

                  {/* Nomor WhatsApp — opsional */}
                  <div>
                    <label style={labelStyle}>NOMOR WHATSAPP</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, pointerEvents: 'none' }}>📱</span>
                      <input
                        type="tel" id="reg-whatsapp" value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder="Contoh: 08123456789"
                        style={{ ...inputStyle, paddingLeft: 42 }}
                        onFocus={e => e.target.style.borderColor = '#0F172A'}
                        onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                      />
                    </div>
                    <p style={{ fontSize: 11, color: '#94A3B8', margin: '6px 0 0', lineHeight: 1.5 }}>
                      Digunakan jika ada hal penting yang perlu disampaikan via WhatsApp
                    </p>
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

          {/* Google Login — hanya di step 1 */}
          {step === 1 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
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
                style={{ width: '100%', padding: '12px', background: 'white', border: '1.5px solid #EAF0F6', borderRadius: 12, fontSize: 14, fontWeight: 700, color: '#0F172A', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 16, height: 16 }} />
                Daftar dengan Google
              </button>
            </div>
          )}

          {/* Link ke login — hanya di step 1 & 2 */}
          {step < 3 && (
            <div style={{ marginTop: 24, paddingTop: step === 2 ? 24 : 0, borderTop: step === 2 ? '1px solid #F1F5F9' : 'none', textAlign: 'center' }}>
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
      {/* ── Modal Konfirmasi Nama & Email ── */}
      {showConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, fontFamily: "'Inter', sans-serif",
        }}>
          <div style={{
            background: 'white', borderRadius: 24, padding: '32px 28px',
            maxWidth: 400, width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            animation: 'fadeInUp 0.2s ease',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 900, color: '#0F172A' }}>
                Konfirmasi Data Akun
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: '#64748B' }}>
                Pastikan nama dan email sudah benar sebelum akun dibuat.
              </p>
            </div>

            {/* Data konfirmasi */}
            <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '16px 18px', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Nama (tercetak di sertifikat)</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>{name}</div>
              </div>
              <div style={{ height: 1, background: '#EAF0F6' }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Email</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', wordBreak: 'break-all' }}>{email}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 12,
                  background: 'white', border: '1.5px solid #E2E8F0',
                  fontSize: 13, fontWeight: 700, color: '#64748B', cursor: 'pointer',
                }}
              >
                ← Edit Data
              </button>
              <button
                onClick={handleConfirmSubmit}
                style={{
                  flex: 2, padding: '12px', borderRadius: 12,
                  background: '#0F172A', border: 'none',
                  fontSize: 13, fontWeight: 800, color: 'white', cursor: 'pointer',
                }}
              >
                ✅ Ya, Buat Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
