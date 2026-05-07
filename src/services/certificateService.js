import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { supabase } from '../lib/supabase';

// ── Konfigurasi 4 jenis sertifikat ────────────────────────────
export const CERT_TYPES = {
  modul: {
    key:         'modul',
    label:       'Sertifikat Modul',
    emoji:       '📚',
    headerText:  'SERTIFIKAT PENYELESAIAN MODUL',
    bodyText:    'Telah berhasil menyelesaikan seluruh materi dan kuis pada modul',
    prefix:      'LTC-MOD',
    colorTop:    [0.00, 0.83, 0.62],  // Teal
    colorBot:    [0.00, 0.44, 0.95],  // Blue
    badgeBg:     '#D1FAE5',
    badgeColor:  '#065F46',
  },
  training: {
    key:         'training',
    label:       'Sertifikat Training',
    emoji:       '🎓',
    headerText:  'SERTIFIKAT KELULUSAN TRAINING',
    bodyText:    'Telah berhasil mengikuti dan lulus program training',
    prefix:      'LTC-TRN',
    colorTop:    [0.07, 0.22, 0.48],  // Navy
    colorBot:    [0.00, 0.44, 0.95],  // Blue
    badgeBg:     '#DBEAFE',
    badgeColor:  '#1E40AF',
  },
  webinar_reguler: {
    key:         'webinar_reguler',
    label:       'Sertifikat Webinar Reguler',
    emoji:       '🌐',
    headerText:  'SERTIFIKAT KEHADIRAN WEBINAR',
    bodyText:    'Telah berhasil mengikuti program Webinar Reguler',
    prefix:      'LTC-WBR',
    colorTop:    [0.09, 0.50, 0.26],  // Green
    colorBot:    [0.20, 0.74, 0.44],  // Light green
    badgeBg:     '#D1FAE5',
    badgeColor:  '#065F46',
  },
  webinar_advanced: {
    key:         'webinar_advanced',
    label:       'Sertifikat Webinar Advanced',
    emoji:       '⭐',
    headerText:  'SERTIFIKAT KELULUSAN WEBINAR ADVANCED',
    bodyText:    'Telah berhasil mengikuti dan lulus program Webinar Advanced',
    prefix:      'LTC-WBA',
    colorTop:    [0.49, 0.18, 0.86],  // Purple
    colorBot:    [0.00, 0.83, 0.62],  // Teal
    badgeBg:     '#EDE9FE',
    badgeColor:  '#5B21B6',
  },
};

// ── Generate nomor sertifikat unik ────────────────────────────
export function generateCertNumber(type) {
  const config  = CERT_TYPES[type];
  const year    = new Date().getFullYear();
  const random  = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${config.prefix}-${year}-${random}`;
}

// ── Simpan sertifikat ke Supabase ─────────────────────────────
export async function issueCertificate({ userId, type, eventTitle, registrationId, quizResultId, eventDate, topicId }) {
  // Cek duplikat (jangan terbit dua kali untuk event yang sama)
  const query = supabase.from('certificates').select('id, cert_number, issued_at').eq('user_id', userId).eq('type', type);
  if (registrationId) query.eq('registration_id', registrationId);
  if (topicId)        query.eq('topic_id', topicId);

  const { data: existing } = await query.maybeSingle();
  if (existing) return { data: existing, alreadyExists: true };

  const certNumber = generateCertNumber(type);
  const verifyUrl  = `${window.location.origin}?verify=${certNumber}`;

  // Gunakan tanggal pelaksanaan event jika tersedia, fallback ke sekarang
  const issuedAt = eventDate ? new Date(eventDate).toISOString() : new Date().toISOString();

  const { data, error } = await supabase
    .from('certificates')
    .insert({
      user_id:         userId,
      type,
      cert_number:     certNumber,
      event_title:     eventTitle,
      issued_at:       issuedAt,
      verify_url:      verifyUrl,
      registration_id: registrationId || null,
      quiz_result_id:  quizResultId   || null,
      topic_id:        topicId        || null,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
}

// ── Generate PDF Sertifikat ───────────────────────────────────
// Otomatis coba template PDF dari /public/templates/ dulu.
// Jika file template tidak ditemukan, fallback ke generate programatik.
export async function generateCertPDF({ holderName, eventTitle, certNumber, type, issuedAt, curriculum }) {
  const config = CERT_TYPES[type] || CERT_TYPES.module;

  // ── Coba load template terlebih dahulu ──────────────────────
  try {
    const { CERT_TEMPLATES } = await import('../config/certTemplateCoords.js');
    const tmpl = CERT_TEMPLATES[type];
    if (tmpl?.file) {
      const response = await fetch(tmpl.file);
      if (response.ok) {
        const templateBytes = await response.arrayBuffer();
        return await generateCertFromTemplate({
          templateBytes, tmpl, holderName, eventTitle, certNumber, type, issuedAt, curriculum,
        });
      }
    }
  } catch (_) {
    // Template tidak tersedia — lanjut ke programatik
  }

  // ── Fallback: generate programatik ─────────────────────────
  return await generateCertProgrammatic({ config, holderName, eventTitle, certNumber, type, issuedAt, curriculum });
}

// ── Generate dari template PDF ─────────────────────────────────
// Mendukung 7 field: name, eventTitle, certNumber, date, verifyUrl, qrCode, curriculum
export async function generateCertFromTemplate({
  templateBytes, tmpl, holderName, eventTitle, certNumber, type, issuedAt, curriculum,
}) {
  const doc     = await PDFDocument.load(templateBytes);
  const page    = doc.getPage(0);
  const bold    = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  const dateStr    = issuedAt
    ? new Date(issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const verifyText = `latih.co/verify/${certNumber}`;
  const verifyFull = `https://latih.co/verify/${certNumber}`;

  // ── 1. Field teks biasa ─────────────────────────────────────
  const TEXT_DATA = {
    name:       holderName.toUpperCase(),
    eventTitle: eventTitle || '',
    certNumber: certNumber || '',
    date:       dateStr,
    verifyUrl:  verifyText,
  };

  // Helper: render teks dengan word-wrap, setiap baris di-center terhadap halaman
  const drawCenteredWrapped = (text, { font, size, y, color, maxWidth, lineGap = 4 }) => {
    const pageWidth = page.getWidth();
    const lh = size + lineGap;
    const words = text.split(' ');
    const lines = [];
    let cur = '';
    for (const word of words) {
      const test = cur ? `${cur} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) > maxWidth && cur) {
        lines.push(cur);
        cur = word;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    lines.forEach((line, i) => {
      const lw = font.widthOfTextAtSize(line, size);
      page.drawText(line, {
        x: (pageWidth - lw) / 2,
        y: y - i * lh,
        size, font, color,
      });
    });
  };

  for (const [key, text] of Object.entries(TEXT_DATA)) {
    const fc = tmpl.fields?.[key];
    if (!fc || !text) continue;
    const [r, g, b] = fc.color || [0, 0, 0];
    const font = fc.bold ? bold : regular;
    const size = fc.size || 12;
    const col  = rgb(r, g, b);
    // Hapus kata tertentu jika ada removeWord
    let displayText = text;
    if (fc.removeWord) {
      displayText = displayText.replace(new RegExp(fc.removeWord, 'gi'), '').trim();
    }
    if (fc.align === 'center') {
      // Word-wrap dengan tiap baris di-center terhadap halaman
      drawCenteredWrapped(displayText, {
        font, size, y: fc.y, color: col,
        maxWidth: fc.maxWidth || 600,
        lineGap: fc.lineGap ?? 4,
      });
    } else {
      page.drawText(displayText, {
        x: fc.x, y: fc.y,
        size, font, color: col,
        maxWidth: fc.maxWidth || 600,
      });
    }
  }

  // ── 2. QR Code verifikasi ───────────────────────────────────
  const qcf = tmpl.fields?.qrCode;
  if (qcf) {
    try {
      const QRCode = (await import('qrcode')).default;
      const qrDataUrl = await QRCode.toDataURL(verifyFull, {
        width: 512, margin: 1,
        color: { dark: '#000000', light: '#FFFFFF' },
      });
      const base64   = qrDataUrl.replace('data:image/png;base64,', '');
      const pngBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const qrImg    = await doc.embedPng(pngBytes);
      const sz       = qcf.size || 80;
      page.drawImage(qrImg, { x: qcf.x, y: qcf.y, width: sz, height: sz });
    } catch (err) {
      console.warn('QR Code generation failed:', err);
    }
  }

  // ── 3. Daftar Kurikulum/Lesson ──────────────────────────────
  const ccf = tmpl.fields?.curriculum;
  if (ccf && curriculum?.length) {
    const font    = ccf.bold ? bold : regular;
    const [r,g,b] = ccf.color || [0.07, 0.09, 0.14];
    const lh      = ccf.lineHeight || 16;
    const cols    = ccf.columns || 1;
    const colW    = ccf.columnWidth || 320;
    const maxL    = ccf.maxLines || 12;
    const bullet  = ccf.bullet || '•';
    const items   = curriculum.slice(0, maxL);
    const half    = Math.ceil(items.length / 2);

    items.forEach((lesson, idx) => {
      let lx = ccf.x;
      let ly = ccf.y;

      if (cols === 2) {
        if (idx >= half) {
          lx = ccf.x + colW;
          ly = ccf.y - (idx - half) * lh;
        } else {
          ly = ccf.y - idx * lh;
        }
      } else {
        ly = ccf.y - idx * lh;
      }

      page.drawText(`${bullet} ${lesson}`, {
        x: lx, y: ly,
        size: ccf.size || 10,
        font,
        color: rgb(r, g, b),
        maxWidth: colW || 660,
      });
    });
  }

  return await doc.save();
}

// ── Generate programatik — Desain latih (sidebar navy + cyan, 2-col curriculum, QR) ──
async function generateCertProgrammatic({ config, holderName, eventTitle, certNumber, type, issuedAt, curriculum }) {
  const doc  = await PDFDocument.create();
  const page = doc.addPage([841.89, 595.28]);
  const { width, height } = page.getSize();

  const fBold    = await doc.embedFont(StandardFonts.HelveticaBold);
  const fReg     = await doc.embedFont(StandardFonts.Helvetica);
  const fObl     = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Warna
  const navy  = rgb(0.06, 0.12, 0.25);
  const cyan  = rgb(0.00, 0.74, 0.83);
  const gold  = rgb(0.96, 0.65, 0.14);
  const white = rgb(1, 1, 1);
  const dark  = rgb(0.06, 0.12, 0.25);
  const muted = rgb(0.40, 0.45, 0.55);
  const divC  = rgb(0.88, 0.92, 0.96);

  // Dimensi sidebar
  const sideW = 105;
  const cyanW = 15;
  const navyW = sideW - cyanW;
  const cX    = sideW + 25; // content start X

  // ── Background putih ──────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width, height, color: white });

  // ── Sidebar: navy kiri ────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width: navyW, height, color: navy });
  // Stripe cyan kanan sidebar
  page.drawRectangle({ x: navyW, y: 0, width: cyanW, height, color: cyan });

  // ── Badge gold bulat dengan bintang ───────────────────────────
  const badgeCx = navyW / 2;
  const badgeCy = height / 2;
  page.drawCircle({ x: badgeCx, y: badgeCy, size: 22, color: gold });
  page.drawText('*', { x: badgeCx - 5, y: badgeCy - 6, size: 16, font: fBold, color: white });

  // ── Watermark pattern (sangat tipis) ──────────────────────────
  const wmc = rgb(0.93, 0.96, 0.99);
  for (let wx = cX + 30; wx < width - 20; wx += 50) {
    for (let wy = 10; wy < height - 10; wy += 50) {
      page.drawLine({ start: {x: wx, y: wy+12}, end: {x: wx+10, y: wy+22}, thickness: 0.6, color: wmc });
      page.drawLine({ start: {x: wx+10, y: wy+22}, end: {x: wx+20, y: wy+12}, thickness: 0.6, color: wmc });
    }
  }

  // ── Logo: chevron + 'latih' ───────────────────────────────────
  const logoY = height - 52;
  page.drawLine({ start: {x: cX, y: logoY+2}, end: {x: cX+6, y: logoY+10}, thickness: 2.5, color: cyan });
  page.drawLine({ start: {x: cX+6, y: logoY+10}, end: {x: cX+16, y: logoY-2}, thickness: 2.5, color: cyan });
  page.drawText('latih', { x: cX+20, y: logoY-1, size: 20, font: fBold, color: dark });

  // ── CERTIFICATE OF LEARNING ───────────────────────────────────
  page.drawText('CERTIFICATE OF LEARNING', { x: cX, y: height - 90, size: 10, font: fBold, color: dark });

  // ── Judul modul (eventTitle) ──────────────────────────────────
  page.drawText(eventTitle || 'Nama Modul', {
    x: cX, y: height - 130, size: 24, font: fBold, color: dark, maxWidth: width - sideW - 40,
  });

  // ── PRESENTED TO ─────────────────────────────────────────────
  page.drawText('PRESENTED TO', { x: cX, y: height - 185, size: 9, font: fBold, color: muted });

  // ── Nama penerima ─────────────────────────────────────────────
  page.drawText(holderName || 'Learner', {
    x: cX, y: height - 212, size: 24, font: fBold, color: dark, maxWidth: width - sideW - 40,
  });

  // ── Divider ───────────────────────────────────────────────────
  page.drawLine({ start: {x: cX, y: height - 240}, end: {x: width - 25, y: height - 240}, thickness: 0.7, color: divC });

  // ── Deskripsi italic ─────────────────────────────────────────
  page.drawText(
    'This certificate verifies the holder has demonstrated understanding through assessment of:',
    { x: cX, y: height - 262, size: 9, font: fObl, color: muted, maxWidth: width - sideW - 40, lineHeight: 13 }
  );

  // ── Kurikulum 2 kolom ────────────────────────────────────────
  const items = curriculum?.length ? curriculum : [
    'Materi 1', 'Materi 2', 'Materi 3', 'Materi 4',
    'Materi 5', 'Materi 6', 'Materi 7', 'Materi 8',
  ];
  const listY  = height - 292;
  const lh     = 16;
  const half   = Math.ceil(items.length / 2);
  const col2X  = cX + 355;
  items.slice(0, 12).forEach((item, i) => {
    const lx = i >= half ? col2X : cX;
    const ly = listY - (i >= half ? i - half : i) * lh;
    page.drawText(`\u2022 ${item}`, { x: lx, y: ly, size: 9, font: fReg, color: dark, maxWidth: 330 });
  });

  // ── Bottom: QR + ID Sertifikat + Tanggal ─────────────────────
  const dateStr = issuedAt
    ? new Date(issuedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  try {
    const QRCode   = (await import('qrcode')).default;
    const qrUrl    = await QRCode.toDataURL(`https://latih.co/verify/${certNumber}`, { width: 256, margin: 1 });
    const qrBase64 = qrUrl.replace('data:image/png;base64,', '');
    const qrPng    = Uint8Array.from(atob(qrBase64), c => c.charCodeAt(0));
    const qrImg    = await doc.embedPng(qrPng);
    page.drawImage(qrImg, { x: cX, y: 28, width: 72, height: 72 });
  } catch (_) {
    page.drawRectangle({ x: cX, y: 28, width: 72, height: 72, borderColor: dark, borderWidth: 1 });
    page.drawText('QR', { x: cX+28, y: 60, size: 10, font: fBold, color: dark });
  }

  const idX = cX + 82;
  page.drawText('ID SERTIFIKAT', { x: idX, y: 88, size: 7.5, font: fBold, color: muted });
  page.drawText(certNumber || 'LTC-MOD-XXXX', { x: idX, y: 72, size: 10.5, font: fBold, color: dark });
  page.drawText(dateStr, { x: idX, y: 54, size: 9.5, font: fReg, color: dark });

  // ── Holographic seal (lingkaran stempel) ──────────────────────
  const sealX = width - 65;
  const sealY = 65;
  page.drawCircle({ x: sealX, y: sealY, size: 42, color: rgb(0.87, 0.90, 0.95) });
  page.drawCircle({ x: sealX, y: sealY, size: 37, borderColor: rgb(0.68, 0.72, 0.80), borderWidth: 1 });
  page.drawCircle({ x: sealX, y: sealY, size: 28, borderColor: rgb(0.68, 0.72, 0.80), borderWidth: 0.7 });
  page.drawLine({ start: {x: sealX-9, y: sealY+1}, end: {x: sealX-3, y: sealY+9}, thickness: 2, color: rgb(0.50, 0.55, 0.65) });
  page.drawLine({ start: {x: sealX-3, y: sealY+9}, end: {x: sealX+11, y: sealY-7}, thickness: 2, color: rgb(0.50, 0.55, 0.65) });

  return await doc.save();
}


// ── Download PDF ke browser ────────────────────────────────────
export function downloadCertPDF(pdfBytes, certNumber) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `Sertifikat-${certNumber}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Ambil semua sertifikat user dari Supabase ──────────────────
export async function getUserCertificates(userId) {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .order('issued_at', { ascending: false });

  if (error) return [];
  return data || [];
}

// ── Cek kelayakan sertifikat modul ────────────────────────────
// Cek apakah semua sub-lesson dalam topik sudah selesai
export function checkModuleEligibility(topic, completedQuizzes) {
  if (!topic?.lessons?.length) return false;
  const allSubs = topic.lessons.flatMap(l => l.subLessons || []);
  if (!allSubs.length) return false;
  return allSubs.every(s => completedQuizzes?.[s.id]);
}

// ── Verifikasi sertifikat berdasarkan cert_number (publik) ─────
// Menggunakan 2 query terpisah untuk menghindari FK join error (400)
// saat foreign key certificates.user_id → profiles belum terdefinisi.
export async function verifyCertificate(certNumber) {
  if (!certNumber?.trim()) return { error: 'Nomor sertifikat tidak boleh kosong.' };

  // Step 1 — ambil data sertifikat
  const { data: cert, error: certErr } = await supabase
    .from('certificates')
    .select('cert_number, type, event_title, issued_at, user_id')
    .eq('cert_number', certNumber.trim().toUpperCase())
    .maybeSingle();

  if (certErr) return { error: 'Terjadi kesalahan saat memverifikasi. Coba lagi.' };
  if (!cert)   return { error: 'Sertifikat tidak ditemukan. Pastikan nomor yang dimasukkan sudah benar.' };

  // Step 2 — ambil nama pemilik dari profiles (by user_id)
  let holderName = 'Peserta';
  if (cert.user_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', cert.user_id)
      .maybeSingle();
    if (profile?.name) holderName = profile.name;
  }

  return {
    data: {
      certNumber: cert.cert_number,
      type:       cert.type,
      eventTitle: cert.event_title,
      issuedAt:   cert.issued_at,
      holderName,
    },
  };
}

