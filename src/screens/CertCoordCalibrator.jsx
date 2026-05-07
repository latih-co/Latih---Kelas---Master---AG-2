import React, { useState, useRef, useCallback } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import { CERT_TYPES } from '../services/certificateService';

// ── Semua field yang bisa dikalibrasi ──────────────────────────
const FIELDS = [
  { key: 'name',       label: 'Nama Penerima',      emoji: '👤', type: 'text' },
  { key: 'eventTitle', label: 'Judul Event/Modul',  emoji: '📌', type: 'text' },
  { key: 'certNumber', label: 'Nomor Sertifikat',   emoji: '🔢', type: 'text' },
  { key: 'date',       label: 'Tanggal Terbit',     emoji: '📅', type: 'text' },
  { key: 'verifyUrl',  label: 'URL Verifikasi',     emoji: '🔗', type: 'text' },
  { key: 'qrCode',     label: 'QR Code Verifikasi', emoji: '🔲', type: 'qr'   },
  { key: 'curriculum', label: 'Daftar Kurikulum',   emoji: '📋', type: 'curriculum' },
];

const FIELD_COLORS = {
  name:       '#0070F3',
  eventTitle: '#E05C7A',
  certNumber: '#F59E0B',
  date:       '#10B981',
  verifyUrl:  '#8B5CF6',
  qrCode:     '#0F172A',
  curriculum: '#0891B2',
};

// Default konfigurasi per field
const DEFAULT_COORDS = {
  name:       { x: 80,  y: 320, size: 28, bold: true  },
  eventTitle: { x: 80,  y: 270, size: 14, bold: false },
  certNumber: { x: 80,  y: 75,  size: 10, bold: true  },
  date:       { x: 360, y: 75,  size: 10, bold: false },
  verifyUrl:  { x: 200, y: 35,  size: 8,  bold: false },
  qrCode:     { x: 710, y: 55,  size: 80 },
  curriculum: { x: 80,  y: 230, size: 10, bold: false, lineHeight: 16, maxLines: 12, columns: 1, columnWidth: 320 },
};

// ── Panel kiri: kontrol field spesifik ─────────────────────────
function FieldControls({ field, coords, onChange }) {
  const fc = coords[field.key] || {};
  const set = (key, val) => onChange({ ...fc, [key]: val });

  if (field.type === 'qr') {
    return (
      <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: FIELD_COLORS.qrCode, marginBottom: 10 }}>
          🔲 QR Code Verifikasi
        </div>
        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 10px', lineHeight: 1.5 }}>
          QR Code akan otomatis berisi URL verifikasi sertifikat.<br />
          Klik pada PDF untuk menentukan posisi pojok kiri bawah QR.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {['x','y','size'].map(axis => (
            <div key={axis}>
              <label style={labelStyle}>{axis.toUpperCase()} {axis === 'size' ? '(ukuran pt)' : '(pt)'}</label>
              <input type="number" value={fc[axis] ?? 0}
                onChange={e => set(axis, parseInt(e.target.value) || 0)}
                style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, padding: '8px 10px', backgroundColor: '#EFF6FF', borderRadius: 8, fontSize: 11, color: '#1D4ED8' }}>
          💡 Rekomendasi size: 60–100 pt. Pojok kiri bawah = titik (x, y).
        </div>
      </div>
    );
  }

  if (field.type === 'curriculum') {
    return (
      <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: FIELD_COLORS.curriculum, marginBottom: 10 }}>
          📋 Daftar Kurikulum/Lesson
        </div>
        <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 10px', lineHeight: 1.5 }}>
          Klik pada PDF untuk menentukan posisi baris pertama daftar materi.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
          {[
            { k: 'x',          label: 'X (pt)' },
            { k: 'y',          label: 'Y mulai (pt)' },
            { k: 'size',       label: 'Font Size (pt)' },
            { k: 'lineHeight', label: 'Jarak Baris (pt)' },
            { k: 'maxLines',   label: 'Maks Baris' },
            { k: 'columns',    label: 'Kolom (1 atau 2)' },
            { k: 'columnWidth',label: 'Lebar Kolom (pt)' },
          ].map(({ k, label }) => (
            <div key={k}>
              <label style={labelStyle}>{label}</label>
              <input type="number" value={fc[k] ?? DEFAULT_COORDS.curriculum[k] ?? 0}
                onChange={e => set(k, parseInt(e.target.value) || 0)}
                style={inputStyle} />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={fc.bold || false}
                onChange={e => set('bold', e.target.checked)} />
              Bold
            </label>
          </div>
        </div>
      </div>
    );
  }

  // Default: text field
  return (
    <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 14, marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: FIELD_COLORS[field.key], marginBottom: 10 }}>
        ✏️ {field.label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        {['x', 'y'].map(axis => (
          <div key={axis}>
            <label style={labelStyle}>{axis.toUpperCase()} (pt)</label>
            <input type="number" value={fc[axis] ?? 0}
              onChange={e => set(axis, parseInt(e.target.value) || 0)}
              style={inputStyle} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <label style={labelStyle}>Size (pt)</label>
          <input type="number" value={fc.size || 12}
            onChange={e => set('size', parseInt(e.target.value) || 12)}
            style={inputStyle} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={fc.bold || false}
              onChange={e => set('bold', e.target.checked)} />
            Bold
          </label>
        </div>
      </div>
    </div>
  );
}

// ── Main calibrator ─────────────────────────────────────────────
export default function CertCoordCalibrator({ onNavigate }) {
  const [certType,     setCertType]     = useState('modul');
  const [pdfFile,      setPdfFile]      = useState(null);
  const [pdfUrl,       setPdfUrl]       = useState('');
  const [pdfDims,      setPdfDims]      = useState({ width: 841.89, height: 595.28 });
  const [activeField,  setActiveField]  = useState('name');
  const [coords,       setCoords]       = useState(DEFAULT_COORDS);
  const [markers,      setMarkers]      = useState({});
  const [generating,   setGenerating]   = useState(false);

  const overlayRef   = useRef(null);

  // ── Upload PDF ──────────────────────────────────────────────
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    const url  = URL.createObjectURL(file);
    setPdfUrl(url);
    setPdfFile(file);
    try {
      const bytes = await file.arrayBuffer();
      const doc   = await PDFDocument.load(bytes);
      const { width, height } = doc.getPage(0).getSize();
      setPdfDims({ width, height });
    } catch { /* ignore */ }
  };

  // ── Klik pada overlay PDF ───────────────────────────────────
  const handleOverlayClick = useCallback((e) => {
    const rect    = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX  = e.clientX - rect.left;
    const clickY  = e.clientY - rect.top;
    const scale   = rect.width / pdfDims.width;
    const pdfX    = Math.round(clickX / scale);
    const pdfY    = Math.round((rect.height - clickY) / scale); // flip Y

    setCoords(prev => ({
      ...prev,
      [activeField]: { ...prev[activeField], x: pdfX, y: pdfY },
    }));
    setMarkers(prev => ({
      ...prev,
      [activeField]: { screenX: clickX, screenY: clickY, pdfX, pdfY },
    }));
  }, [activeField, pdfDims]);

  // ── Test PDF: generate dengan semua field + QR + kurikulum ─
  const handleTestPDF = async () => {
    if (!pdfFile) return;
    setGenerating(true);
    try {
      const DEMO_CURRICULUM = [
        'Pengantar dan Ruang Lingkup',
        'Istilah dan Definisi (ISO 9000)',
        'Konteks Organisasi (Klausa 4)',
        'Kepemimpinan & Kebijakan Mutu',
        'Perencanaan Risiko & Peluang',
        'Dukungan: Sumber Daya & Kompetensi',
        'Operasional Layanan & Produk',
        'Evaluasi Kinerja & Audit Internal',
        'Perbaikan Berkelanjutan',
        'Studi Kasus & Implementasi',
      ];

      const verifyUrlDemo = 'https://latih.co/verify/LTC-TEST-001';
      const bytes  = await pdfFile.arrayBuffer();
      const doc    = await PDFDocument.load(bytes);
      const page   = doc.getPage(0);
      const bold   = await doc.embedFont(StandardFonts.HelveticaBold);
      const regular = await doc.embedFont(StandardFonts.Helvetica);

      const DEMO_TEXT = {
        name:       'BUDI SANTOSO',
        eventTitle: `"${CERT_TYPES[certType]?.label || certType}"`,
        certNumber: 'LTC-TEST-001',
        date:       new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        verifyUrl:  verifyUrlDemo,
      };

      // ── Draw teks fields ────────────────────────────────────
      for (const field of FIELDS.filter(f => f.type === 'text')) {
        const fc   = coords[field.key];
        if (!fc) continue;
        const font = fc.bold ? bold : regular;
        const [r, g, b] = hexToRgb(FIELD_COLORS[field.key]);
        // Guide dot
        page.drawCircle({ x: fc.x, y: fc.y, size: 4, color: rgb(r, g, b) });
        page.drawText(DEMO_TEXT[field.key] || field.label, {
          x: fc.x, y: fc.y, size: fc.size || 12, font, color: rgb(r, g, b),
          maxWidth: fc.maxWidth || 680,
        });
        // Label koordinat
        page.drawText(`(${fc.x}, ${fc.y})`, {
          x: fc.x, y: fc.y - (fc.size || 12) - 2,
          size: 7, font: regular, color: rgb(0.5, 0.5, 0.5),
        });
      }

      // ── Draw QR Code ────────────────────────────────────────
      const qcf = coords.qrCode;
      if (qcf) {
        try {
          const qrDataUrl = await QRCode.toDataURL(verifyUrlDemo, {
            width: 256, margin: 1,
            color: { dark: '#000000', light: '#FFFFFF' },
          });
          const base64 = qrDataUrl.replace('data:image/png;base64,', '');
          const pngBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
          const qrImg = await doc.embedPng(pngBytes);
          page.drawImage(qrImg, {
            x: qcf.x, y: qcf.y,
            width: qcf.size || 80, height: qcf.size || 80,
          });
          // Guide: border merah
          page.drawRectangle({
            x: qcf.x - 2, y: qcf.y - 2,
            width: (qcf.size || 80) + 4, height: (qcf.size || 80) + 4,
            borderColor: rgb(...hexToRgb(FIELD_COLORS.qrCode)), borderWidth: 1.5,
          });
          page.drawText(`QR (${qcf.x}, ${qcf.y}) size=${qcf.size}`, {
            x: qcf.x, y: qcf.y - 10, size: 7, font: regular, color: rgb(0.3, 0.3, 0.3),
          });
        } catch (qrErr) {
          console.error('QR error:', qrErr);
        }
      }

      // ── Draw Curriculum ─────────────────────────────────────
      const ccf = coords.curriculum;
      if (ccf) {
        const font = ccf.bold ? bold : regular;
        const [cr, cg, cb] = hexToRgb(FIELD_COLORS.curriculum);
        const half = Math.ceil(DEMO_CURRICULUM.length / 2);

        DEMO_CURRICULUM.slice(0, ccf.maxLines || 12).forEach((lesson, idx) => {
          let lx = ccf.x;
          let ly = ccf.y;

          if ((ccf.columns || 1) === 2) {
            // 2 kolom: kolom 2 mulai dari item ke-(half)
            if (idx >= half) {
              lx = ccf.x + (ccf.columnWidth || 320);
              ly = ccf.y - (idx - half) * (ccf.lineHeight || 16);
            } else {
              ly = ccf.y - idx * (ccf.lineHeight || 16);
            }
          } else {
            ly = ccf.y - idx * (ccf.lineHeight || 16);
          }

          page.drawText(`${ccf.bullet || '•'} ${lesson}`, {
            x: lx, y: ly,
            size: ccf.size || 10, font, color: rgb(cr, cg, cb),
            maxWidth: ccf.columnWidth || 660,
          });
        });

        // Guide: garis awal
        page.drawLine({
          start: { x: ccf.x - 4, y: ccf.y + 2 },
          end:   { x: ccf.x + 20, y: ccf.y + 2 },
          thickness: 1, color: rgb(cr, cg, cb),
        });
        page.drawText(`CURRICULUM (${ccf.x}, ${ccf.y})`, {
          x: ccf.x, y: ccf.y + 6, size: 7, font: regular,
          color: rgb(cr, cg, cb),
        });
      }

      const testBytes = await doc.save();
      const blob = new Blob([testBytes], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `KALIBRASI-${certType}-test.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error: ' + err.message);
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  // ── Copy konfigurasi ke clipboard ──────────────────────────
  const handleCopyConfig = () => {
    const out = {};
    for (const f of FIELDS) {
      const base = coords[f.key] || DEFAULT_COORDS[f.key] || {};
      if (f.type === 'qr') {
        out[f.key] = { x: base.x, y: base.y, size: base.size ?? 80 };
      } else if (f.type === 'curriculum') {
        out[f.key] = {
          x: base.x, y: base.y, size: base.size ?? 10, bold: base.bold ?? false,
          color: [0.07, 0.09, 0.14],
          lineHeight: base.lineHeight ?? 16,
          maxLines: base.maxLines ?? 12,
          columns: base.columns ?? 1,
          columnWidth: base.columnWidth ?? 320,
          bullet: '•', maxWidth: 660,
        };
      } else {
        out[f.key] = {
          x: base.x, y: base.y, size: base.size ?? 12, bold: base.bold ?? false,
          color: [0.07, 0.09, 0.14], maxWidth: 680,
        };
      }
    }
    const str = `  // Koordinat untuk "${certType}" — Paste ke certTemplateCoords.js\n  fields: ${JSON.stringify(out, null, 4)},`;
    navigator.clipboard.writeText(str);
    alert('✅ Konfigurasi disalin! Paste ke src/config/certTemplateCoords.js di bagian "' + certType + '".');
  };

  const activeFieldDef = FIELDS.find(f => f.key === activeField);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F5F9', fontFamily: "'Inter', sans-serif" }}>
      {/* ── Header ── */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #EAF0F6', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNavigate?.('profil')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', fontSize: 13, fontWeight: 600 }}>
            ← Kembali ke Profil
          </button>
          <div style={{ width: 1, height: 20, backgroundColor: '#EAF0F6' }} />
          <span style={{ fontWeight: 900, color: 'var(--c-dark)', fontSize: 15 }}>⚙️ Kalibrasi Koordinat Template PDF</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleCopyConfig} disabled={!pdfFile} style={{ padding: '7px 14px', borderRadius: 9, fontSize: 12, fontWeight: 700, border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF', color: '#1D4ED8', cursor: pdfFile ? 'pointer' : 'not-allowed', opacity: pdfFile ? 1 : 0.5 }}>
            📋 Copy Config
          </button>
          <button onClick={handleTestPDF} disabled={!pdfFile || generating} style={{ padding: '7px 14px', borderRadius: 9, fontSize: 12, fontWeight: 700, border: 'none', backgroundColor: '#0070F3', color: 'white', cursor: pdfFile && !generating ? 'pointer' : 'not-allowed', opacity: pdfFile ? 1 : 0.5 }}>
            {generating ? '⏳ Generating...' : '⬇️ Test PDF'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
        {/* ── Left panel ── */}
        <div style={{ width: 300, backgroundColor: 'white', borderRight: '1px solid #EAF0F6', overflowY: 'auto', padding: 20, flexShrink: 0 }}>

          {/* Jenis sertifikat */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Jenis Sertifikat</label>
            <select value={certType} onChange={e => setCertType(e.target.value)} style={selectStyle}>
              {Object.keys(CERT_TYPES).map(t => (
                <option key={t} value={t}>{CERT_TYPES[t].label}</option>
              ))}
            </select>
          </div>

          {/* Upload */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Upload Template PDF</label>
            <label style={{ display: 'block', marginTop: 8, padding: 14, border: '2px dashed #BFDBFE', borderRadius: 12, textAlign: 'center', cursor: 'pointer', backgroundColor: '#F8FBFF' }}>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
              <div style={{ fontSize: 22, marginBottom: 4 }}>📄</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D4ED8' }}>{pdfFile ? pdfFile.name : 'Klik untuk pilih PDF'}</div>
              {pdfFile && <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{pdfDims.width.toFixed(0)} × {pdfDims.height.toFixed(0)} pt</div>}
            </label>
          </div>

          {/* Field selector */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Field yang dikalibrasi ({FIELDS.length} field)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
              {FIELDS.map(f => (
                <button key={f.key} onClick={() => setActiveField(f.key)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', borderRadius: 10,
                  border: `2px solid ${activeField === f.key ? FIELD_COLORS[f.key] : '#E2E8F0'}`,
                  backgroundColor: activeField === f.key ? `${FIELD_COLORS[f.key]}12` : 'white',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: 16 }}>{f.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: activeField === f.key ? FIELD_COLORS[f.key] : '#0F172A' }}>{f.label}</div>
                    <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#64748B' }}>
                      {f.type === 'qr'
                        ? `x=${coords[f.key]?.x}, y=${coords[f.key]?.y}, size=${coords[f.key]?.size}`
                        : `x=${coords[f.key]?.x}, y=${coords[f.key]?.y}`}
                    </div>
                  </div>
                  {markers[f.key] && <span style={{ fontSize: 13, color: '#10B981' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Detail kontrol field aktif */}
          <FieldControls
            field={activeFieldDef || FIELDS[0]}
            coords={coords}
            onChange={(val) => setCoords(p => ({ ...p, [activeField]: val }))}
          />

          {/* Instruksi */}
          <div style={{ backgroundColor: '#FEF3C7', borderRadius: 10, padding: 12, fontSize: 11, color: '#92400E', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>📖 Cara pakai:</div>
            <ol style={{ margin: 0, paddingLeft: 14 }}>
              <li>Pilih jenis sertifikat & upload PDF</li>
              <li>Pilih field di atas (termasuk QR & Kurikulum)</li>
              <li>Klik pada area PDF untuk set posisi</li>
              <li>Klik "⬇️ Test PDF" untuk cek hasilnya</li>
              <li>Sesuaikan hingga tepat</li>
              <li>Klik "📋 Copy Config" → paste ke certTemplateCoords.js</li>
            </ol>
          </div>
        </div>

        {/* ── Right panel: PDF + overlay ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!pdfFile ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#64748B' }}>
              <div style={{ fontSize: 56 }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Upload template PDF untuk mulai kalibrasi</div>
              <div style={{ fontSize: 13 }}>Gunakan panel kiri untuk upload file</div>
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: 900 }}>
              {/* Info bar aktif */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, padding: '8px 14px', backgroundColor: `${FIELD_COLORS[activeField]}15`, borderRadius: 10, border: `1px solid ${FIELD_COLORS[activeField]}50` }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: FIELD_COLORS[activeField] }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: FIELD_COLORS[activeField] }}>
                  {activeFieldDef?.emoji} Klik PDF untuk set: <strong>{activeFieldDef?.label}</strong>
                  {activeFieldDef?.type === 'qr' && ' (pojok kiri bawah QR)'}
                  {activeFieldDef?.type === 'curriculum' && ' (baris pertama daftar)'}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'monospace', color: '#64748B' }}>
                  x={coords[activeField]?.x}, y={coords[activeField]?.y}
                  {activeFieldDef?.type === 'qr' && `, size=${coords[activeField]?.size}`}
                </span>
              </div>

              {/* PDF viewer + overlay */}
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  style={{ width: '100%', height: '635px', display: 'block', border: 'none' }}
                  title="PDF Template"
                />
                {/* Transparent click overlay */}
                <div ref={overlayRef} onClick={handleOverlayClick} style={{ position: 'absolute', inset: 0, cursor: 'crosshair', backgroundColor: 'transparent' }}>
                  {/* Text markers */}
                  {Object.entries(markers).filter(([k]) => FIELDS.find(f=>f.key===k)?.type === 'text').map(([fieldKey, m]) => (
                    <React.Fragment key={fieldKey}>
                      <div style={{ position: 'absolute', left: m.screenX - 6, top: m.screenY - 6, width: 12, height: 12, borderRadius: '50%', backgroundColor: FIELD_COLORS[fieldKey], border: '2px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', left: m.screenX + 10, top: m.screenY - 10, backgroundColor: FIELD_COLORS[fieldKey], color: 'white', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                        {FIELDS.find(f=>f.key===fieldKey)?.label} ({m.pdfX},{m.pdfY})
                      </div>
                    </React.Fragment>
                  ))}
                  {/* QR placeholder */}
                  {markers.qrCode && (
                    <div style={{ position: 'absolute', left: markers.qrCode.screenX, top: markers.qrCode.screenY - (coords.qrCode?.size || 80) * (overlayRef.current?.getBoundingClientRect().width || 900) / pdfDims.width, width: (coords.qrCode?.size || 80) * (overlayRef.current?.getBoundingClientRect().width || 900) / pdfDims.width, height: (coords.qrCode?.size || 80) * (overlayRef.current?.getBoundingClientRect().width || 900) / pdfDims.width, border: '2px dashed #0F172A', backgroundColor: 'rgba(15,23,42,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, pointerEvents: 'none' }}>
                      🔲
                    </div>
                  )}
                  {/* Curriculum placeholder */}
                  {markers.curriculum && (
                    <div style={{ position: 'absolute', left: markers.curriculum.screenX, top: markers.curriculum.screenY - 4, pointerEvents: 'none' }}>
                      {['Materi 1','Materi 2','Materi 3'].map((l,i) => (
                        <div key={i} style={{ fontSize: 9, color: FIELD_COLORS.curriculum, fontWeight: 700, lineHeight: 1.8 }}>• {l}</div>
                      ))}
                      <div style={{ fontSize: 9, color: FIELD_COLORS.curriculum, opacity: 0.5 }}>• ...</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Koordinat ringkasan */}
              <div style={{ marginTop: 14, backgroundColor: 'white', borderRadius: 12, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #EAF0F6', fontWeight: 800, fontSize: 12, color: '#0F172A' }}>📍 Ringkasan Koordinat ({FIELDS.length} field)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', overflowX: 'auto' }}>
                  {FIELDS.map((f, i) => (
                    <div key={f.key} style={{ padding: '8px 10px', borderRight: i < FIELDS.length-1 ? '1px solid #F1F5F9' : 'none', minWidth: 90 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: FIELD_COLORS[f.key], marginBottom: 2 }}>{f.emoji} {f.label}</div>
                      <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#0F172A' }}>x: {coords[f.key]?.x}</div>
                      <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#0F172A' }}>y: {coords[f.key]?.y}</div>
                      {f.type === 'qr' && <div style={{ fontSize: 9, color: '#64748B' }}>sz: {coords[f.key]?.size}</div>}
                      {f.type === 'curriculum' && <div style={{ fontSize: 9, color: '#64748B' }}>lh: {coords[f.key]?.lineHeight}</div>}
                      {f.type === 'text' && <div style={{ fontSize: 9, color: '#64748B' }}>sz: {coords[f.key]?.size}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;
  const b = parseInt(hex.slice(5,7), 16) / 255;
  return [r, g, b];
}

const labelStyle = { display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.43)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 };
const selectStyle = { width: '100%', padding: '8px 10px', borderRadius: 9, border: '1px solid #E2E8F0', fontSize: 13, fontFamily: "'Inter',sans-serif", marginTop: 4 };
const inputStyle  = { width: '100%', boxSizing: 'border-box', padding: '6px 8px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12, fontFamily: "'Inter',sans-serif" };
