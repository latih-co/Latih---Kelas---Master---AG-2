import React, { useState } from 'react';
import { CERT_TYPES, generateCertPDF, downloadCertPDF } from '../services/certificateService';

// ── Preview HTML dari desain sertifikat (replika tampilan PDF) ──
function CertificateVisual({ config, holderName, eventTitle, certNumber, issuedAt }) {
  const [r1, g1, b1] = config.colorTop;
  const [r2, g2, b2] = config.colorBot;
  const rgb1 = `rgb(${Math.round(r1*255)},${Math.round(g1*255)},${Math.round(b1*255)})`;
  const rgb2 = `rgb(${Math.round(r2*255)},${Math.round(g2*255)},${Math.round(b2*255)})`;

  const dateStr = issuedAt
    ? new Date(issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{
      width: '100%',
      aspectRatio: '841/595', // A4 landscape ratio
      backgroundColor: '#F9FAFC',
      borderRadius: 12,
      border: `2px solid ${rgb1}`,
      boxShadow: `0 0 0 1px rgba(${Math.round(r1*255)},${Math.round(g1*255)},${Math.round(b1*255)},0.2), 0 12px 40px rgba(0,0,0,0.1)`,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Left accent bar */}
      <div style={{ position: 'absolute', left: '2%', top: '3%', bottom: '3%', width: '1%', backgroundColor: rgb1, borderRadius: 4 }} />
      {/* Right accent bar */}
      <div style={{ position: 'absolute', right: '2%', top: '3%', bottom: '3%', width: '1%', backgroundColor: rgb2, borderRadius: 4 }} />

      {/* Outer border */}
      <div style={{ position: 'absolute', inset: '3%', border: `1.5px solid ${rgb1}`, borderRadius: 8, pointerEvents: 'none' }} />

      {/* Header Strip */}
      <div style={{
        background: `linear-gradient(135deg, ${rgb1}, ${rgb2})`,
        padding: '2.5% 4% 2%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '2.5vw', letterSpacing: -0.5 }}>latih</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 900, fontSize: '2.5vw' }}>+</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2vw', marginLeft: '0.5em' }}>— Platform Microlearning Industri</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 800, fontSize: '1.1vw', letterSpacing: 1, textTransform: 'uppercase' }}>
          {config.headerText}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${rgb1}, ${rgb2})`, margin: '0 4%' }} />

      {/* Body */}
      <div style={{ flex: 1, padding: '3% 4% 2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top area */}
        <div>
          <div style={{ fontSize: '5vw', fontWeight: 900, color: '#0F172A', letterSpacing: -1, marginBottom: '0.5%' }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: '1.3vw', color: '#64748B', fontStyle: 'italic', marginBottom: '3%' }}>
            ini diberikan kepada:
          </div>

          {/* Name */}
          <div style={{ fontSize: '3.5vw', fontWeight: 900, color: rgb1, letterSpacing: -0.5, marginBottom: '0.3%' }}>
            {holderName.toUpperCase()}
          </div>
          <div style={{ height: 2, width: `${holderName.length * 3.5}%`, background: rgb1, borderRadius: 4, marginBottom: '2%' }} />

          {/* Description */}
          <div style={{ fontSize: '1.2vw', color: '#64748B', marginBottom: '0.5%' }}>
            {config.bodyText}:
          </div>
          <div style={{ fontSize: '1.6vw', fontWeight: 800, color: '#0F172A', fontStyle: 'italic' }}>
            "{eventTitle}"
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2%' }}>
          {/* Cert number */}
          <div style={{ backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, padding: '1% 2%' }}>
            <div style={{ fontSize: '0.9vw', color: '#94A3B8', marginBottom: '0.3%' }}>No. Sertifikat:</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 900, color: '#0F172A', fontFamily: 'monospace' }}>{certNumber}</div>
          </div>

          {/* Date */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9vw', color: '#94A3B8', marginBottom: '0.5%' }}>Diterbitkan pada:</div>
            <div style={{ fontSize: '1.1vw', fontWeight: 700, color: '#0F172A' }}>{dateStr}</div>
          </div>

          {/* TTD placeholder */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '15vw', height: 1, backgroundColor: '#0F172A', marginBottom: '0.5%' }} />
            <div style={{ fontSize: '1vw', fontWeight: 700, color: '#0F172A' }}>Pimpinan Latih</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '1% 0', fontSize: '0.8vw', color: '#94A3B8', borderTop: '1px solid #EAF0F6' }}>
        Verifikasi: latih.co/verify/{certNumber}
      </div>
    </div>
  );
}

// ── Main Preview Screen ─────────────────────────────────────────
export default function CertPreviewScreen({ onNavigate }) {
  const [downloadingType, setDownloadingType] = useState('');

  const DEMO_DATA = {
    modul: {
      eventTitle: 'ISO 9001:2015 — Sistem Manajemen Mutu',
      certNumber: 'LTC-MOD-2025-X7K2P',
      curriculum: [
        'Pengantar & Ruang Lingkup ISO 9001',
        'Istilah dan Definisi (ISO 9000)',
        'Konteks Organisasi (Klausa 4)',
        'Kepemimpinan & Kebijakan Mutu',
        'Perencanaan Risiko & Peluang',
        'Dukungan: Sumber Daya & Kompetensi',
        'Operasional Layanan & Produk',
        'Evaluasi Kinerja & Audit Internal',
        'Perbaikan Berkelanjutan',
        'Studi Kasus & Implementasi',
      ],
    },
    training: {
      eventTitle: 'Training ISO 9001:2015 Batch 3',
      certNumber: 'LTC-TRN-2025-B4M9Q',
      curriculum: [
        'Dasar-dasar ISO 9001:2015',
        'Audit Internal Sistem Mutu',
        'Dokumentasi & Rekaman Mutu',
        'Tindakan Korektif & Pencegahan',
        'Pengukuran Kepuasan Pelanggan',
        'Manajemen Risiko Operasional',
      ],
    },
    webinar_reguler: {
      eventTitle: 'Webinar GMP untuk Industri Farmasi',
      certNumber: 'LTC-WBR-2025-C2R8A',
      curriculum: [
        'Prinsip Dasar GMP Farmasi',
        'Sanitasi & Higiene Fasilitas',
        'Dokumentasi CPOB',
        'Pengendalian Kualitas Produk',
      ],
    },
    webinar_advanced: {
      eventTitle: 'Webinar Advanced HACCP & ISO 22000',
      certNumber: 'LTC-WBA-2025-D6N3Z',
      curriculum: [
        'Prinsip HACCP & Analisis Bahaya',
        'Critical Control Points (CCP)',
        'ISO 22000 Food Safety Management',
        'Implementasi FSMS di Industri',
        'Audit & Verifikasi HACCP',
        'Studi Kasus Industri Pangan',
      ],
    },
  };

  const handleDownload = async (type) => {
    setDownloadingType(type);
    try {
      const demo = DEMO_DATA[type];
      const pdfBytes = await generateCertPDF({
        holderName: 'Budi Santoso',
        eventTitle: demo.eventTitle,
        certNumber: demo.certNumber,
        type,
        issuedAt:   new Date().toISOString(),
        curriculum: demo.curriculum,
      });
      downloadCertPDF(pdfBytes, demo.certNumber);
    } catch (err) {
      alert('Gagal generate: ' + err.message);
    } finally {
      setDownloadingType('');
    }
  };

  const HOLDER = 'Budi Santoso';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F5F9', fontFamily: "'Inter', sans-serif", padding: '32px 24px 60px' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto 40px' }}>
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #00D49D, #0070F3)', padding: '4px 14px', borderRadius: 99, fontSize: 12, fontWeight: 800, color: 'white', letterSpacing: 1, marginBottom: 12 }}>
          PREVIEW
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: -1 }}>
          Desain 4 Jenis Sertifikat
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
            Klik "Download Demo PDF" untuk melihat versi PDF A4 Landscape
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onNavigate?.('profil')}
              style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              ← Kembali ke Profil
            </button>
            <button
              onClick={() => onNavigate?.('cert_calibrator')}
              style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid #E2E8F0', backgroundColor: 'white', color: '#0F172A', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            >
              ⚙️ Kalibrasi Template PDF
            </button>
          </div>
        </div>
      </div>

      {/* 4 Certificate Layouts */}
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
        {Object.keys(CERT_TYPES).map((type) => {
          const config  = CERT_TYPES[type];
          const demo    = DEMO_DATA[type];
          const [r,g,b] = config.colorTop;
          const rgb1    = `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
          const isLoading = downloadingType === type;

          return (
            <div key={type}>
              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: config.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {config.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 20, color: '#0F172A' }}>{config.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{config.headerText}</div>
                </div>
                <button
                  onClick={() => handleDownload(type)}
                  disabled={isLoading}
                  style={{
                    marginLeft: 'auto',
                    padding: '10px 22px',
                    background: isLoading ? '#94A3B8' : `linear-gradient(135deg, ${rgb1}, rgb(${Math.round(config.colorBot[0]*255)},${Math.round(config.colorBot[1]*255)},${Math.round(config.colorBot[2]*255)}))`,
                    color: 'white',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: isLoading ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    boxShadow: isLoading ? 'none' : `0 4px 14px rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},0.35)`,
                  }}
                >
                  {isLoading ? '⏳ Generating...' : '⬇️ Download Demo PDF'}
                </button>
              </div>

              {/* Certificate visual */}
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <CertificateVisual
                  config={config}
                  holderName={HOLDER}
                  eventTitle={demo.eventTitle}
                  certNumber={demo.certNumber}
                  issuedAt={new Date().toISOString()}
                />
              </div>

              {/* Info bar */}
              <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, backgroundColor: config.badgeBg, color: config.badgeColor }}>
                  Prefix: {config.prefix}
                </span>
                <span style={{ fontSize: 11, color: '#64748B', padding: '4px 10px', borderRadius: 99, backgroundColor: '#F1F5F9' }}>
                  Format: A4 Landscape (841 × 595 pt)
                </span>
                <span style={{ fontSize: 11, color: '#64748B', padding: '4px 10px', borderRadius: 99, backgroundColor: '#F1F5F9' }}>
                  {config.bodyText}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note bottom */}
      <div style={{ maxWidth: 1200, margin: '48px auto 0', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ fontWeight: 800, color: '#92400E', marginBottom: 4 }}>📝 Catatan pengembang</div>
        <div style={{ fontSize: 12, color: '#B45309', lineHeight: 1.7 }}>
          Desain ini dihasilkan secara programatik menggunakan <strong>pdf-lib</strong>. Untuk menggunakan template PDF kustom (desain dari desainer), 
          ganti fungsi <code>generateCertPDF()</code> di <code>src/services/certificateService.js</code> dengan versi yang memuat file PDF template 
          dan mengisi teks di koordinat yang sudah dipetakan. Koordinat teks (x, y) perlu disesuaikan dengan layout template masing-masing.
        </div>
      </div>
    </div>
  );
}
