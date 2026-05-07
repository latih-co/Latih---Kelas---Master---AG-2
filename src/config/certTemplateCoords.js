/**
 * Koordinat field teks yang akan di-overlay ke atas template PDF.
 * Template PDF sudah punya desain penuh (sidebar, logo, label, dll).
 * Hanya field DINAMIS yang perlu diisi di sini:
 *   - eventTitle  : judul modul/training/webinar
 *   - name        : nama penerima
 *   - certNumber  : nomor sertifikat
 *   - date        : tanggal terbit
 *   - verifyUrl   : URL verifikasi (opsional, sudah ada di QR)
 *   - qrCode      : gambar QR verifikasi
 *   - curriculum  : daftar materi/lesson (2 kolom)
 *
 * Satuan: pt (PDF points). (0,0) = pojok kiri BAWAH, y ke atas.
 * A4 Landscape = 841 × 595 pt
 *
 * Gunakan ⚙️ Kalibrasi di app untuk fine-tune jika posisi meleset.
 */

export const CERT_TEMPLATES = {

  // ─── Sertifikat Modul ─────────────────────────────────────────
  modul: {
    file: '/templates/Sertifikat Modul.pdf',
    fields: {
      // Judul modul — baris besar bawah "CERTIFICATE OF LEARNING"
      eventTitle: {
        x: 170, y: 443,
        size: 22, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 610,
      },
      // Nama penerima — bawah label "PRESENTED TO"
      name: {
        x: 170, y: 363,
        size: 22, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 610,
      },
      // Nomor sertifikat — kanan QR Code, bawah label "ID SERTIFIKAT"
      certNumber: {
        x: 252, y: 78,
        size: 11, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 260,
      },
      // Tanggal — di bawah nomor sertifikat
      date: {
        x: 252, y: 40,
        size: 10, bold: false,
        color: [0.06, 0.12, 0.25],
        maxWidth: 200,
      },
      // QR Code — pojok kiri bawah
      qrCode: {
        x: 168, y: 32,
        size: 74,
      },
      // Daftar kurikulum — 2 kolom, mulai bawah garis divider
      curriculum: {
        x: 175, y: 271,
        size: 9.5, bold: false,
        color: [0.06, 0.12, 0.25],
        lineHeight: 18,
        maxLines: 12,
        columns: 2,
        columnWidth: 310,
        bullet: '\u2022',
        maxWidth: 302,
      },
    },
  },

  // ─── Sertifikat Training ──────────────────────────────────────
  training: {
    file: '/templates/Sertifikat Training.pdf',
    fields: {
      eventTitle: {
        x: 255, y: 348,
        size: 22, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 550,
      },
      name: {
        x: 255, y: 448,
        size: 22, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 550,
      },
      certNumber: {
        x: 343, y: 78,
        size: 11, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 260,
      },
      date: {
        x: 80, y: 113,
        size: 10, bold: false,
        color: [0.06, 0.12, 0.25],
        maxWidth: 200,
      },
      qrCode: {
        x: 255, y: 75,
        size: 74,
      },
      curriculum: {
        x: 255, y: 308,
        size: 10.5, bold: false,
        color: [0.06, 0.12, 0.25],
        lineHeight: 20,
        maxLines: 12,
        columns: 2,
        columnWidth: 270,
        bullet: '\u2022',
        maxWidth: 262,
      },
    },
  },

  // ─── Sertifikat Webinar Reguler ───────────────────────────────
  webinar_reguler: {
    file: '/templates/Sertifikat Webinar Reguler.pdf',
    fields: {
      eventTitle: {
        x: 280, y: 273,
        size: 22, bold: true,
        align: 'center',
        removeWord: 'Webinar ',
        color: [0.06, 0.12, 0.25],
        maxWidth: 600,
      },
      name: {
        x: 280, y: 360,
        size: 22, bold: true,
        align: 'center',
        color: [0.06, 0.12, 0.25],
        maxWidth: 600,
      },
      date: {
        x: 380, y: 214,
        size: 13, bold: false,
        align: 'center',
        color: [0.06, 0.12, 0.25],
        maxWidth: 200,
      },
    },
  },

  // ─── Sertifikat Webinar Advanced ──────────────────────────────
  webinar_advanced: {
    file: '/templates/Sertifikat Webinar Advanced.pdf',
    fields: {
      eventTitle: {
        x: 52, y: 290,
        size: 25, bold: true,
        align: 'left',
        removeWord: 'Webinar Advanced ',
        color: [0.06, 0.12, 0.25],
        maxWidth: 600,
      },
      name: {
        x: 52, y: 400,
        size: 25, bold: true,
        align: 'left',
        color: [0.06, 0.12, 0.25],
        maxWidth: 600,
      },
      certNumber: {
        x: 52, y: 505,
        size: 16, bold: true,
        color: [0.06, 0.12, 0.25],
        maxWidth: 260,
      },
      date: {
        x: 52, y: 228,
        size: 13, bold: false,
        color: [0.06, 0.12, 0.25],
        maxWidth: 200,
      },
    },
  },
};
