import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../utils/mobile';
import { useUser } from '../context/UserContext';
import {
  CERT_TYPES,
  getUserCertificates,
  generateCertPDF,
  downloadCertPDF,
} from '../services/certificateService';

// ── Status badge per jenis ──────────────────────────────────────
const HOW_TO_EARN = {
  module:          'Selesaikan semua materi & kuis dalam satu topik modul',
  training:        'Ikuti Training → Hadir → Lewati Kuis Akhir',
  webinar_reguler: 'Ikuti Webinar Reguler → Selesaikan 6 tahap verifikasi',
  webinar_advanced:'Ikuti Webinar Advanced → Hadir → Lewati Kuis Akhir',
};

// ── CertCard ──────────────────────────────────────────────────
function CertCard({ type, cert, onDownload, loading }) {
  const config     = CERT_TYPES[type];
  const isUnlocked = !!cert;
  const [r, g, b]  = config.colorTop;

  return (
    <div style={{
      borderRadius: 20,
      border: isUnlocked ? `2px solid rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})` : '1px solid #E2E8F0',
      overflow: 'hidden',
      boxShadow: isUnlocked ? `0 8px 32px rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},0.15)` : '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.3s',
      opacity: isUnlocked ? 1 : 0.7,
      backgroundColor: 'white',
    }}>
      {/* Header strip dengan warna tipe */}
      <div style={{
        height: 8,
        background: `linear-gradient(90deg, rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)}), rgb(${Math.round(config.colorBot[0]*255)},${Math.round(config.colorBot[1]*255)},${Math.round(config.colorBot[2]*255)}))`,
      }} />

      <div style={{ padding: '20px 20px 20px' }}>
        {/* Top row: emoji + status */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            backgroundColor: config.badgeBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
          }}>
            {isUnlocked ? config.emoji : '🔒'}
          </div>
          <div style={{
            fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 99,
            backgroundColor: isUnlocked ? config.badgeBg : '#F1F5F9',
            color: isUnlocked ? config.badgeColor : '#94A3B8',
            textTransform: 'uppercase', letterSpacing: 0.5,
          }}>
            {isUnlocked ? '✓ Diperoleh' : 'Belum Diperoleh'}
          </div>
        </div>

        {/* Label */}
        <div style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 15, marginBottom: 6, lineHeight: 1.3 }}>
          {config.label}
        </div>

        {/* Cert number if unlocked */}
        {isUnlocked ? (
          <>
            <div style={{ fontSize: 11, color: 'var(--c-muted)', fontFamily: 'monospace', marginBottom: 10 }}>
              {cert.cert_number}
            </div>
            {cert.event_title && (
              <div style={{ fontSize: 12, color: 'var(--c-dark)', fontWeight: 600, backgroundColor: '#F8FAFC', borderRadius: 8, padding: '6px 10px', marginBottom: 10, lineHeight: 1.4 }}>
                "{cert.event_title}"
              </div>
            )}
            <div style={{ fontSize: 11, color: 'var(--c-muted)', marginBottom: 14 }}>
              📅 {new Date(cert.issued_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => onDownload(cert)}
                disabled={loading}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: loading ? 'wait' : 'pointer',
                  background: `linear-gradient(135deg, rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)}), rgb(${Math.round(config.colorBot[0]*255)},${Math.round(config.colorBot[1]*255)},${Math.round(config.colorBot[2]*255)}))`,
                  color: 'white', fontSize: 12, fontWeight: 800,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? '⏳ Loading...' : '⬇️ Unduh PDF'}
              </button>
              <button
                onClick={() => {
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cert.verify_url || window.location.href)}`;
                  window.open(url, '_blank');
                }}
                style={{ padding: '9px 12px', borderRadius: 10, border: '1px solid #DBEAFE', backgroundColor: '#EFF6FF', color: '#1D4ED8', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                title="Bagikan ke LinkedIn"
              >
                in
              </button>
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--c-muted)', lineHeight: 1.6, marginTop: 4 }}>
            🎯 {HOW_TO_EARN[type]}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Screen ────────────────────────────────────────────────
export default function SertifikatScreen({ onNavigate }) {
  const isMobile = useIsMobile();
  const { user }  = useUser();

  const [certs, setCerts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [dlLoading, setDlLoading] = useState(''); // cert_number being downloaded

  useEffect(() => {
    if (!user) return;
    loadCerts();
  }, [user]);

  const loadCerts = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('../lib/supabase');
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });
      if (error) console.error('[SertifikatScreen] loadCerts error:', error);
      setCerts(data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (cert) => {
    if (!user) return;
    setDlLoading(cert.cert_number);
    try {
      const pdfBytes = await generateCertPDF({
        holderName: user.name || 'Peserta',
        eventTitle: cert.event_title || cert.type,
        certNumber: cert.cert_number,
        type:       cert.type,
        issuedAt:   cert.issued_at,
      });
      downloadCertPDF(pdfBytes, cert.cert_number);
    } catch (err) {
      alert('Gagal generate PDF: ' + err.message);
    } finally {
      setDlLoading('');
    }
  };

  // Map cert array ke object { type: certData }
  const certMap = {};
  certs.forEach(c => {
    if (!certMap[c.type]) certMap[c.type] = c; // ambil yang pertama per type
  });

  const totalEarned = Object.keys(certMap).length;

  return (
    <div style={{ padding: isMobile ? '20px 16px 100px' : '24px 32px 56px', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
          Pencapaian belajarmu
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--c-dark)', margin: 0, letterSpacing: '-0.5px' }}>
            🏅 Sertifikat Saya
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {user?.role === 'admin' && (
              <button
                onClick={() => onNavigate?.('cert_preview')}
                style={{ fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 99, border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1D4ED8', cursor: 'pointer' }}
              >
                🖼️ Lihat Desain
              </button>
            )}
            <button
              onClick={loadCerts}
              disabled={loading}
              style={{ fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 99, border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? '⏳' : '🔄 Refresh'}
            </button>
            <div style={{ backgroundColor: '#FEF3C7', color: '#D97706', fontWeight: 800, fontSize: 13, padding: '6px 14px', borderRadius: 99 }}>
              {totalEarned} / 4 Diperoleh
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar overall */}
      <div style={{ backgroundColor: 'white', border: '1px solid #EAF0F6', borderRadius: 14, padding: '16px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-dark)' }}>Progress Sertifikasi</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#D97706' }}>{totalEarned}/4</span>
          </div>
          <div style={{ height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(totalEarned / 4) * 100}%`,
              background: 'linear-gradient(90deg, #00D49D, #0070F3)',
              borderRadius: 4,
              transition: 'width 0.8s ease',
            }} />
          </div>
        </div>
        <div style={{ fontSize: 28 }}>
          {totalEarned === 4 ? '🏆' : totalEarned >= 2 ? '🥈' : totalEarned >= 1 ? '🥉' : '🎯'}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--c-muted)', fontSize: 14 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⏳</div>
          Memuat sertifikat...
        </div>
      )}

      {/* 4 Certificate Cards — 2 kolom */}
      {!loading && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {Object.keys(CERT_TYPES).map(type => (
            <CertCard
              key={type}
              type={type}
              cert={certMap[type] || null}
              onDownload={handleDownload}
              loading={dlLoading === certMap[type]?.cert_number}
            />
          ))}
        </div>
      )}

      {/* Info note */}
      {!loading && totalEarned === 0 && (
        <div style={{ marginTop: 28, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '20px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
          <div style={{ fontWeight: 800, color: '#1E40AF', marginBottom: 4 }}>Mulai raih sertifikatmu!</div>
          <div style={{ fontSize: 13, color: '#3B82F6', lineHeight: 1.6 }}>
            Selesaikan modul belajar, ikuti Training & Webinar untuk mendapatkan sertifikat terverifikasi.
          </div>
          <button
            onClick={() => onNavigate?.('kursus')}
            style={{ marginTop: 16, padding: '10px 24px', backgroundColor: '#0070F3', color: 'white', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
          >
            Mulai Belajar →
          </button>
        </div>
      )}

      {/* Multiple certs note (jika punya lebih dari 1 jenis yang sama) */}
      {!loading && certs.length > Object.keys(certMap).length && (
        <div style={{ marginTop: 20, backgroundColor: 'white', borderRadius: 14, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #EAF0F6', fontWeight: 800, fontSize: 13, color: 'var(--c-dark)' }}>
            📋 Semua Sertifikat ({certs.length})
          </div>
          {certs.map((cert, idx) => (
            <div key={cert.id} style={{ padding: '12px 20px', borderBottom: idx < certs.length - 1 ? '1px solid #F8FAFC' : 'none', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--c-dark)', marginBottom: 2 }}>
                  {CERT_TYPES[cert.type]?.label || cert.type}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--c-muted)' }}>{cert.cert_number}</div>
              </div>
              <button
                onClick={() => handleDownload(cert)}
                disabled={dlLoading === cert.cert_number}
                style={{ fontSize: 11, fontWeight: 700, padding: '6px 14px', borderRadius: 8, border: '1px solid #EAF0F6', backgroundColor: dlLoading === cert.cert_number ? '#F8FAFC' : 'white', color: 'var(--c-teal-dark)', cursor: 'pointer' }}
              >
                {dlLoading === cert.cert_number ? '⏳' : '⬇️ Unduh'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
