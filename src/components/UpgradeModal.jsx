import React, { useState } from 'react';
import { PAYMENT_METHODS, createUpgradePayment, simulateUpgrade } from '../services/payment';

/**
 * UpgradeModal — modal upgrade paket Free → Premium untuk Webinar Advanced
 * Props:
 *   registration  - object registrasi user (harus punya id, event_id, events.price_premium)
 *   onClose       - callback menutup modal
 *   onUpgraded    - callback setelah pembayaran dibuat (refresh ProfilScreen)
 */
export default function UpgradeModal({ registration, onClose, onUpgraded }) {
  const event        = registration?.events || {};
  const pricePremium = event.price_premium || 0;

  const [method,    setMethod]  = useState('QRIS');
  const [step,      setStep]    = useState('choose'); // choose | processing | success | sim_success | error
  const [payUrl,    setPayUrl]  = useState('');
  const [errMsg,    setErrMsg]  = useState('');
  const [loading,   setLoading] = useState(false);
  const [simLoading, setSimLoading] = useState(false);

  const fmt = (n) => new Intl.NumberFormat('id-ID').format(n);

  const handleUpgrade = async () => {
    setLoading(true);
    setErrMsg('');
    const result = await createUpgradePayment(registration.id, registration.event_id, method);
    setLoading(false);
    if (result.error) {
      setErrMsg(result.error);
      setStep('error');
      return;
    }
    setPayUrl(result.checkout_url || result.pay_url || '');
    setStep('success');
    onUpgraded?.();
  };

  // ⚠️ DEV ONLY: Simulasi upgrade tanpa bayar
  const handleSimulate = async () => {
    setSimLoading(true);
    const result = await simulateUpgrade(registration.id);
    setSimLoading(false);
    if (result.error) {
      setErrMsg(result.error);
      setStep('error');
      return;
    }
    setStep('sim_success');
    onUpgraded?.();
  };

  // ─── Overlay style ──────────────────────────────────────────────
  const overlay = {
    position: 'fixed', inset: 0, zIndex: 9000,
    backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20, overflowY: 'auto',
  };
  const card = {
    backgroundColor: 'white', borderRadius: 20, width: '100%', maxWidth: 440,
    padding: 28, boxShadow: '0 24px 80px rgba(0,0,0,0.18)', fontFamily: "'Inter', sans-serif",
    maxHeight: '90vh', overflowY: 'auto',
  };
  const btn = (bg, color = 'white') => ({
    width: '100%', padding: '13px 0', borderRadius: 12, border: 'none',
    backgroundColor: bg, color, fontSize: 14, fontWeight: 800, cursor: 'pointer',
  });

  return (
    <div style={overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={card}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              ⭐ Upgrade ke Premium
            </div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', lineHeight: 1.3 }}>
              {event.title}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8', paddingTop: 2 }}>✕</button>
        </div>

        {/* Harga */}
        <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700, marginBottom: 6 }}>Biaya Upgrade Paket Premium</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#B45309' }}>Rp {fmt(pricePremium)}</div>
        </div>

        {/* Info manfaat */}
        <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.9, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#92400E', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Yang kamu dapat di Paket Premium:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
            {[
              'Join live Zoom',
              'Soft File materi',
              'Sertifikat digital resmi',
              'File recording webinar',
              'Worksheet & kumpulan studi kasus',
              '1 voucher diskon 10% Online Training Latih',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, fontSize: 12 }}>
                <span style={{ color: '#15803D', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step: choose */}
        {step === 'choose' && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 10 }}>Pilih Metode Pembayaran</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m.code}
                  onClick={() => setMethod(m.code)}
                  style={{
                    padding: '10px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    border: method === m.code ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                    backgroundColor: method === m.code ? '#FFFBEB' : 'white',
                    color: method === m.code ? '#B45309' : '#475569',
                  }}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
            <button onClick={handleUpgrade} disabled={loading} style={btn(loading ? '#94A3B8' : '#F59E0B', 'white')}>
              {loading ? '⏳ Membuat pembayaran...' : `⬆️ Upgrade & Bayar Rp ${fmt(pricePremium)}`}
            </button>
            <button onClick={onClose} style={{ ...btn('white', '#94A3B8'), border: '1px solid #E2E8F0', marginTop: 8 }}>
              Batal
            </button>

            {/* ⚠️ DEV ONLY */}
            <div style={{ marginTop: 16, borderTop: '1px dashed #E2E8F0', paddingTop: 12 }}>
              <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, textAlign: 'center' }}>
                ⚠️ Dev Tools
              </div>
              <button
                onClick={handleSimulate}
                disabled={simLoading}
                style={{
                  width: '100%', padding: '10px 0', borderRadius: 10,
                  border: '1.5px dashed #94A3B8', backgroundColor: '#F8FAFC',
                  color: '#475569', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {simLoading ? '⏳ Memproses...' : '🧪 Simulasi Upgrade (Tanpa Bayar)'}
              </button>
            </div>
          </>
        )}

        {/* Step: success (bayar normal) */}
        {step === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>Pembayaran Dibuat!</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20, lineHeight: 1.6 }}>
              Selesaikan pembayaran melalui halaman berikut.<br />
              Setelah terbayar, kuis akan <strong>otomatis terbuka</strong> di profilmu.
            </div>
            {payUrl && (
              <a href={payUrl} target="_blank" rel="noreferrer">
                <button style={btn('#F59E0B')}>
                  💳 Lanjut ke Halaman Pembayaran
                </button>
              </a>
            )}
            <button onClick={onClose} style={{ ...btn('white', '#94A3B8'), border: '1px solid #E2E8F0', marginTop: 10 }}>
              Tutup
            </button>
          </div>
        )}

        {/* Step: sim_success (simulasi dev) */}
        {step === 'sim_success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🧪</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#15803D', marginBottom: 8 }}>Simulasi Berhasil!</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8, lineHeight: 1.6 }}>
              Registrasi kamu sudah di-upgrade ke <strong>Premium</strong> dan kuis sudah terbuka.
            </div>
            <div style={{ fontSize: 11, color: '#92400E', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: 8, padding: '8px 12px', marginBottom: 20 }}>
              ⚠️ Mode simulasi — tidak ada transaksi nyata
            </div>
            <button onClick={onClose} style={btn('#15803D')}>
              ✅ Cek Aktivitas di Profil
            </button>
          </div>
        )}

        {/* Step: error */}
        {step === 'error' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>Gagal Membuat Pembayaran</div>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 20 }}>{errMsg}</div>
            <button onClick={() => setStep('choose')} style={btn('#F59E0B')}>Coba Lagi</button>
            <button onClick={onClose} style={{ ...btn('white', '#94A3B8'), border: '1px solid #E2E8F0', marginTop: 8 }}>Tutup</button>
          </div>
        )}
      </div>
    </div>
  );
}
