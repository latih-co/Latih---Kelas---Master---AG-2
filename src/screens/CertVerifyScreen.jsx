import React, { useState, useEffect } from 'react';
import { verifyCertificate, CERT_TYPES } from '../services/certificateService';

/**
 * CertVerifyScreen
 * Halaman publik untuk verifikasi keaslian sertifikat latih.co
 * Dipanggil dari: URL ?verify=LTC-XXX, atau link di PDF sertifikat
 * Props:
 *   initialCode  — string | null  (diisi App.jsx jika URL punya ?verify=)
 *   onNavigate   — (page) => void
 */
export default function CertVerifyScreen({ initialCode = '', onNavigate }) {
  const [code, setCode]     = useState(initialCode || '');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  // Auto-verify jika code sudah ada (dari URL)
  useEffect(() => {
    if (initialCode?.trim()) handleVerify(initialCode.trim());
  }, []); // eslint-disable-line

  const handleVerify = async (overrideCode) => {
    const target = (overrideCode || code).trim().toUpperCase();
    if (!target) return;
    setStatus('loading');
    setResult(null);
    setErrMsg('');
    const res = await verifyCertificate(target);
    if (res.error) {
      setStatus('error');
      setErrMsg(res.error);
    } else {
      setStatus('success');
      setResult(res.data);
    }
  };

  const certConfig  = result ? CERT_TYPES[result.type] : null;
  const dateStr     = result?.issuedAt
    ? new Date(result.issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 100%)',
      fontFamily: "'Inter', sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '48px 24px 80px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Verifikasi Sertifikat
        </h1>
        <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 420, lineHeight: 1.6 }}>
          Masukkan nomor sertifikat latih.co untuk memverifikasi keasliannya.
          HRD dan recruiter dapat menggunakan halaman ini kapan saja.
        </p>
      </div>

      {/* Input box */}
      <div style={{
        width: '100%', maxWidth: 520,
        background: 'white', borderRadius: 20,
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
        padding: 24, marginBottom: 24,
      }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 8, display: 'block' }}>
          Nomor Sertifikat
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && handleVerify()}
            placeholder="Contoh: LTC-MOD-2025-X7K2P"
            style={{
              flex: 1, padding: '12px 16px',
              border: '1.5px solid #E2E8F0', borderRadius: 12,
              fontSize: 14, fontFamily: 'monospace', fontWeight: 700,
              color: '#0F172A', outline: 'none',
              background: '#F8FAFC',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = '#0070F3'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
          <button
            onClick={() => handleVerify()}
            disabled={status === 'loading'}
            style={{
              padding: '12px 20px',
              background: status === 'loading' ? '#94A3B8' : 'linear-gradient(135deg, #0070F3, #0052CC)',
              color: 'white', border: 'none', borderRadius: 12,
              fontSize: 14, fontWeight: 800, cursor: status === 'loading' ? 'wait' : 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: status === 'loading' ? 'none' : '0 4px 14px rgba(0,112,243,0.3)',
              transition: 'all 0.15s',
            }}
          >
            {status === 'loading' ? '⏳' : 'Verifikasi →'}
          </button>
        </div>
      </div>

      {/* Result: SUCCESS */}
      {status === 'success' && result && certConfig && (
        <div style={{
          width: '100%', maxWidth: 520,
          background: 'white', borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
          overflow: 'hidden',
          animation: 'fadeUp 0.3s ease-out',
        }}>
          <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }`}</style>

          {/* Green header */}
          <div style={{
            background: 'linear-gradient(135deg, #059669, #10B981)',
            padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
            }}>✅</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>Sertifikat Terverifikasi</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>
                Dokumen ini asli dan diterbitkan oleh latih.co
              </div>
            </div>
          </div>

          {/* Detail */}
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Cert type badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: certConfig.badgeBg, color: certConfig.badgeColor,
              padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 800,
              width: 'fit-content',
            }}>
              {certConfig.emoji} {certConfig.label}
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                Pemegang Sertifikat
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>{result.holderName}</div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                Program / Modul
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>{result.eventTitle}</div>
            </div>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                  Tanggal Terbit
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{dateStr}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                  Nomor Sertifikat
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B', fontFamily: 'monospace' }}>{result.certNumber}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result: ERROR */}
      {status === 'error' && (
        <div style={{
          width: '100%', maxWidth: 520,
          background: '#FFF1F2', border: '1px solid #FECDD3',
          borderRadius: 20, padding: '20px 24px',
          display: 'flex', alignItems: 'flex-start', gap: 14,
          animation: 'fadeUp 0.25s ease-out',
        }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>❌</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#BE123C', marginBottom: 4 }}>
              Sertifikat Tidak Ditemukan
            </div>
            <div style={{ fontSize: 13, color: '#9F1239', lineHeight: 1.5 }}>{errMsg}</div>
          </div>
        </div>
      )}

      {/* Back link */}
      <button
        onClick={() => onNavigate?.('landing')}
        style={{
          marginTop: 32, background: 'none', border: 'none',
          fontSize: 13, fontWeight: 700, color: '#64748B',
          cursor: 'pointer', textDecoration: 'underline',
        }}
      >
        ← Kembali ke latih.co
      </button>
    </div>
  );
}
