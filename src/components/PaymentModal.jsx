import React, { useState, useEffect } from 'react';
import { PAYMENT_METHODS, createPayment, registerFreeEvent, registerFreeDirectly, getRegistrationStatus } from '../services/payment';
import { useUser } from '../context/UserContext';

const STATUS_INFO = {
  pending:       { label: 'Menunggu Verifikasi',  emoji: '⏳', color: '#D97706', bg: '#FEF3C7' },
  verified:      { label: 'Terverifikasi',         emoji: '✅', color: '#1D4ED8', bg: '#EFF6FF' },
  paid:          { label: 'Pembayaran Diterima',   emoji: '💚', color: '#15803D', bg: '#F0FDF4' },
  attended:      { label: 'Sudah Hadir',           emoji: '🎓', color: '#15803D', bg: '#F0FDF4' },
  quiz_unlocked: { label: 'Kuis Tersedia',         emoji: '🎯', color: '#DC2626', bg: '#FEE2E2' },
  completed:     { label: 'Selesai',               emoji: '🏅', color: '#15803D', bg: '#F0FDF4' },
};

/**
 * Modal / Section untuk daftar & bayar event
 * Props:
 *   event         - object event (harus punya id, type, title, price_regular, price_premium)
 *   onClose       - callback menutup modal
 *   onNavigate    - callback navigasi
 */
export default function PaymentModal({ event, onClose, onNavigate, initialPackage = 'free' }) {
  const { session } = useUser();

  const [step, setStep]         = useState('status_check');
  const [regStatus, setRegStatus] = useState(null);
  const [selectedPkg, setPkg]   = useState(initialPackage); // pre-set dari tombol yang diklik
  const [selectedMethod, setMethod] = useState('QRIS');
  const [igUsername, setIg]     = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(true);

  const isWebinarReg  = event.type === 'webinar_reguler';
  const isWebinarAdv  = event.type === 'webinar_advanced';
  const isTraining    = event.type === 'training';
  const hasPremium    = event.price_premium > 0;

  // ── Cek status registrasi saat buka ──────────────────────────
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    const status = await getRegistrationStatus(event.id);
    setRegStatus(status);
    setLoading(false);
    if (!status) {
      // Belum pernah daftar
      if (isWebinarReg) {
        setStep('free_register');
      } else if (initialPackage === 'premium' && event.price_premium > 0) {
        // Klik "Pilih Premium" langsung ke pilih metode bayar
        setPkg('premium');
        setStep('choose_method');
      } else if (isWebinarAdv && event.price_regular === 0) {
        // Webinar Advanced paket free (gratis) — HANYA untuk webinar_advanced
        setStep('free_direct');
      } else {
        setStep('choose_package');
      }
    } else {
      setStep('registered');
    }
  };

  const handlePaidRegister = async () => {
    setLoading(true); setError('');
    const result = await createPayment(event.id, selectedPkg, selectedMethod);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    setCheckoutUrl(result.checkout_url || result.pay_url);
    setStep('redirect');
  };


  const handleFreeRegister = async () => {
    if (!igUsername.trim() || !igUsername.startsWith('@')) { setError('Masukkan username Instagram dengan @'); return; }
    setLoading(true); setError('');
    const result = await registerFreeEvent(event.id, igUsername);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    setVerifyCode(result.verify_code);
    setStep('free_pending');
  };

  const handleFreeDirectRegister = async () => {
    setLoading(true); setError('');
    const result = await registerFreeDirectly(event.id);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    setStep('registered_free_done');
  };

  const fmtRp = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

  if (!session) {
    return (
      <ModalWrapper onClose={onClose}>
        <div style={{ textAlign: 'center', padding: '32px 0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
          <div style={{ fontWeight: 800, color: 'var(--c-dark)', marginBottom: 8 }}>Login dulu yuk!</div>
          <div style={{ fontSize: 13, color: 'var(--c-muted)', marginBottom: 20 }}>Kamu perlu login untuk mendaftar event ini</div>
          <button onClick={() => { onClose(); onNavigate?.('login'); }} style={btnStyle('#0070F3')}>Login / Daftar Akun</button>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={onClose} title={event.title}>

      {/* ── Loading ── */}
      {loading && <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--c-muted)' }}>⏳ Memuat...</div>}

      {/* ── Sudah terdaftar ── */}
      {!loading && step === 'registered' && regStatus && (() => {
        const siRaw = STATUS_INFO[regStatus.status] || { label: regStatus.status, emoji: 'ℹ️', color: '#888', bg: '#f5f5f5' };
        // Untuk webinar reguler yg sudah diverifikasi admin, ganti label paid
        const si = (isWebinarReg && regStatus.status === 'paid')
          ? { ...siRaw, label: 'Pendaftaran Diterima' }
          : siRaw;
        return (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{si.emoji}</div>
            <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18, marginBottom: 8 }}>
              Kamu sudah terdaftar!
            </div>
            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 99, backgroundColor: si.bg, color: si.color, fontWeight: 700, fontSize: 13, marginBottom: 20 }}>
              Status: {si.label}
            </div>
            {regStatus.status === 'pending' && isWebinarReg && regStatus.verify_code && (
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 20, marginBottom: 20, textAlign: 'left' }}>
                <div style={{ fontWeight: 800, color: '#15803D', marginBottom: 8 }}>📱 Langkah verifikasi:</div>
                <ol style={{ margin: 0, paddingLeft: 20, color: '#166534', fontSize: 13, lineHeight: 1.8 }}>
                  <li>Follow <strong>@latih.co</strong> di Instagram/LinkedIn <em style={{ fontSize: 11, color: '#4ADE80' }}>(screenshot)</em></li>
                  <li>Like &amp; share poster ke story/feed <em style={{ fontSize: 11, color: '#4ADE80' }}>(screenshot)</em></li>
                  <li>Kirim screenshot dan kirim kode ini ke <strong>WA Admin Latih</strong></li>
                </ol>
                <div style={{ background: '#DCFCE7', borderRadius: 10, padding: '10px 14px', marginTop: 10, textAlign: 'center', fontFamily: 'monospace', fontSize: 15, fontWeight: 900, color: '#166534', letterSpacing: 2 }}>
                  DAFTAR {regStatus.verify_code}
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
                  <button
                    onClick={() => navigator.clipboard.writeText(`DAFTAR ${regStatus.verify_code}`)}
                    style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#15803D', background: 'white', border: '1px solid #86EFAC', borderRadius: 8, cursor: 'pointer' }}
                  >
                    📋 Copy Kode
                  </button>
                  <a
                    href={`https://wa.me/6281285815971?text=${encodeURIComponent(`DAFTAR ${regStatus.verify_code}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <button style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'white', background: '#25D366', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                      💬 WA Admin Latih
                    </button>
                  </a>
                </div>
              </div>
            )}
            {regStatus.status === 'paid' && (
              <div style={{ fontSize: 13, color: 'var(--c-muted)' }}>
                {isWebinarReg
                  ? 'Link Zoom sudah tersedia di Aktivitas Training & Webinar'
                  : 'Link Zoom akan dikirim ke email kamu'}
              </div>
            )}
            {regStatus.status === 'quiz_unlocked' && (
              <button onClick={() => { onClose(); onNavigate?.('profil'); }} style={btnStyle('#DC2626')}>🎯 Kerjakan Kuis di Profil</button>
            )}
          </div>
        );
      })()}

      {/* ── Konfirmasi Daftar Gratis (Training harga 0) ── */}
      {!loading && step === 'free_direct' && (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18, marginBottom: 8 }}>Event Ini Gratis!</div>
          <div style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.6, marginBottom: 24 }}>
            Daftar sekarang — Link Zoom akan tersedia di halaman <strong>Profil</strong> kamu setelah admin mengkonfirmasi kehadiran.
          </div>
          {error && <ErrorBox msg={error} />}
          <button onClick={handleFreeDirectRegister} disabled={loading} style={btnStyle('#15803D')}>
            {loading ? '⏳ Mendaftar...' : '✅ Daftar Sekarang — Gratis'}
          </button>
        </div>
      )}

      {/* ── Sukses daftar gratis langsung ── */}
      {!loading && step === 'registered_free_done' && (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18, marginBottom: 8 }}>Pendaftaran Berhasil!</div>
          <div style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.6, marginBottom: 20 }}>
            Kamu sudah terdaftar. Link Zoom akan muncul di halaman <strong>Profil → Aktivitas</strong> setelah dikonfirmasi.
          </div>
          <button onClick={() => { onClose(); onNavigate?.('profil'); }} style={btnStyle('#0070F3')}>
            Lihat Status di Profil →
          </button>
        </div>
      )}

      {!loading && step === 'free_register' && (
        <div>
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 16, marginBottom: 20, fontSize: 13, color: '#166534' }}>
            🎉 <strong>Gratis!</strong> Cukup follow & share untuk daftar.
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username Instagram kamu</label>
            <input value={igUsername} onChange={e => setIg(e.target.value)} placeholder="@username_kamu" style={{ ...inputStyle, marginTop: 8 }} />
          </div>
          <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 10, padding: 14, fontSize: 12, color: '#92400E', marginBottom: 20 }}>
            Setelah daftar, kamu akan mendapat kode unik untuk WA ke Admin Latih sebagai bukti
          </div>
          {error && <ErrorBox msg={error} />}
          <button onClick={handleFreeRegister} disabled={loading} style={btnStyle('#15803D')}>
            🎓 Daftar Gratis
          </button>
        </div>
      )}

      {/* ── Kode verifikasi IG ── */}
      {!loading && step === 'free_pending' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
            <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18 }}>Pendaftaran Diterima!</div>
          </div>
          <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 800, color: '#15803D', marginBottom: 12 }}>📱 Selesaikan verifikasi:</div>
            <ol style={{ margin: 0, paddingLeft: 20, color: '#166534', fontSize: 13, lineHeight: 2 }}>
              <li>Follow <strong>@latih.co</strong> di Instagram/LinkedIn <em style={{ fontSize: 11, color: '#4ADE80' }}>(screenshot)</em></li>
              <li>Like &amp; share poster event ke story/feed <em style={{ fontSize: 11, color: '#4ADE80' }}>(screenshot)</em></li>
              <li>Kirim screenshot dan kirim kode ini ke <strong>WA Admin Latih</strong></li>
            </ol>
            <div style={{ background: '#DCFCE7', borderRadius: 10, padding: '12px 16px', marginTop: 10, textAlign: 'center', fontFamily: 'monospace', fontSize: 16, fontWeight: 900, color: '#166534', letterSpacing: 2 }}>
              DAFTAR {verifyCode}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
              <button
                onClick={() => { navigator.clipboard.writeText(`DAFTAR ${verifyCode}`); }}
                style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: '#15803D', background: 'white', border: '1px solid #86EFAC', borderRadius: 8, cursor: 'pointer' }}
              >
                📋 Copy Kode
              </button>
              <a
                href={`https://wa.me/6281285815971?text=${encodeURIComponent(`DAFTAR ${verifyCode}`)}`}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'white', background: '#25D366', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                  💬 WA Admin Latih
                </button>
              </a>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--c-muted)', textAlign: 'center' }}>
            Bot kami akan memverifikasi dan menampilkan link Zoom di Aktivitas Training &amp; Webinar
          </div>
        </div>
      )}

      {/* ── Pilih paket (training / webinar adv) ── */}
      {!loading && step === 'choose_package' && (
        <div>
          {hasPremium && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              {[
                { key: 'free',    label: 'Paket Free',    price: event.price_regular, desc: 'Akses recording & sertifikat webinar' },
                { key: 'premium', label: 'Paket Premium', price: event.price_premium, desc: 'Q&A langsung + konsultasi + materi eksklusif' },
              ].map(pkg => (
                <button key={pkg.key} onClick={() => setPkg(pkg.key)} style={{ flex: 1, padding: '16px 12px', borderRadius: 14, border: selectedPkg === pkg.key ? '2px solid #0070F3' : '1px solid #E2E8F0', background: selectedPkg === pkg.key ? '#EFF6FF' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                  <div style={{ fontWeight: 800, color: selectedPkg === pkg.key ? '#1D4ED8' : 'var(--c-dark)', fontSize: 14, marginBottom: 4 }}>{pkg.label}</div>
                  <div style={{ fontWeight: 900, fontSize: 18, color: selectedPkg === pkg.key ? '#0070F3' : 'var(--c-dark)', marginBottom: 6 }}>{pkg.price === 0 ? 'GRATIS' : fmtRp(pkg.price)}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>{pkg.desc}</div>
                </button>
              ))}
            </div>
          )}
          {!hasPremium && (
            <div style={{ textAlign: 'center', padding: '12px 0 24px', color: 'var(--c-dark)', fontWeight: 800, fontSize: 20 }}>
              {fmtRp(event.price_regular)}
            </div>
          )}
          <button onClick={() => setStep('choose_method')} style={btnStyle('#0070F3')}>
            Pilih Metode Bayar →
          </button>

          {/* ⚠️ DEV ONLY */}
          <div style={{ marginTop: 16, borderTop: '1px dashed #E2E8F0', paddingTop: 12 }}>
            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, textAlign: 'center' }}>
              ⚠️ Dev Tools
            </div>
            <button
              onClick={handleSimulate}
              disabled={loading}
              style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: '1.5px dashed #94A3B8', background: '#F8FAFC', color: '#475569', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              {loading ? '⏳ Memproses...' : '🧪 Simulasi Terbayar (Tanpa Bayar)'}
            </button>
          </div>
        </div>
      )}

      {/* ── Pilih metode bayar ── */}
      {!loading && step === 'choose_method' && (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--c-dark)', marginBottom: 12, fontSize: 14 }}>Pilih Metode Pembayaran</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {PAYMENT_METHODS.map(m => (
              <button key={m.code} onClick={() => setMethod(m.code)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, border: selectedMethod === m.code ? '2px solid #0070F3' : '1px solid #E2E8F0', background: selectedMethod === m.code ? '#EFF6FF' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                <span style={{ fontSize: 20 }}>{m.emoji}</span>
                <span style={{ fontWeight: 700, color: selectedMethod === m.code ? '#1D4ED8' : 'var(--c-dark)', fontSize: 13 }}>{m.label}</span>
                {selectedMethod === m.code && <span style={{ marginLeft: 'auto', color: '#0070F3', fontSize: 16 }}>✓</span>}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--c-muted)' }}>Total Pembayaran</span>
            <span style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18 }}>
              {fmtRp(selectedPkg === 'premium' ? event.price_premium : event.price_regular)}
            </span>
          </div>
          {error && <ErrorBox msg={error} />}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setStep('choose_package')} style={{ ...btnStyle('#64748B'), flex: 1 }}>← Kembali</button>
            <button onClick={handlePaidRegister} disabled={loading} style={{ ...btnStyle('#0070F3'), flex: 2 }}>
              {loading ? '⏳ Memproses...' : '💳 Bayar Sekarang'}
            </button>
          </div>
        </div>
      )}

      {/* ── Redirect ke Tripay ── */}
      {!loading && step === 'redirect' && (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💳</div>
          <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 18, marginBottom: 8 }}>Halaman Pembayaran Siap!</div>
          <div style={{ fontSize: 13, color: 'var(--c-muted)', marginBottom: 24 }}>
            Kamu akan diarahkan ke halaman Tripay untuk menyelesaikan pembayaran
          </div>
          <a href={checkoutUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
            <button style={btnStyle('#0070F3')}>🔗 Buka Halaman Bayar</button>
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: 'var(--c-muted)' }}>
            Setelah bayar, cek status di halaman <strong>Profil → Aktivitas</strong>
          </div>
        </div>
      )}

    </ModalWrapper>
  );
}

// ── Sub-components ──────────────────────────────────────────────
function ModalWrapper({ children, onClose, title }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}
      onClick={e => e.target === e.currentTarget && onClose?.()}
    >
      <div style={{ backgroundColor: 'white', borderRadius: 20, padding: '28px 24px', width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0070F3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Pendaftaran Event</div>
            {title && <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 16, lineHeight: 1.3, maxWidth: 340 }}>{title}</div>}
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--c-muted)', flexShrink: 0 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ErrorBox({ msg }) {
  return (
    <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
      ⚠️ {msg}
    </div>
  );
}

const btnStyle = (bg) => ({
  width: '100%', padding: '13px', backgroundColor: bg, color: 'white',
  border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer',
});
const labelStyle = { fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.05em' };
const inputStyle  = { width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 14, fontFamily: "'Inter', sans-serif", outline: 'none' };
