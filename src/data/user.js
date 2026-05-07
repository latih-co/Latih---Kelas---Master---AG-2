export const userProfile = {
  name: "Pengguna Demo",
  role: "Profesional Industri",
  streak: 0,
  xp: 0,
  certs: 0,
  level: "Pelajar Industri",
  xpTarget: 500,
  xpToNext: 500
};

export const userCertificates = [
  { id: 1, title: "ISO 9001:2015 — Sistem Manajemen Mutu", ref: "Selesaikan kelas lengkap untuk mendapat sertifikat", date: "", isLocked: true, icon: "🔒" },
  { id: 2, title: "Shelf Life vs Expiry Date", ref: "Selesaikan kelas lengkap untuk mendapat sertifikat", date: "", isLocked: true, icon: "🔒" }
];

export const userEnrolledClasses = [
  {
    id: "enr-1",
    title: "ISO 9001:2015 — Dasar Sistem Manajemen Mutu",
    type: "Kursus Online",
    status: "Dalam Progres",
    date: "Mulai belajar sekarang",
    action: "Lanjutkan Belajar",
    btnPrimary: true,
    icon: "🎓"
  },
  {
    id: "enr-2",
    title: "K3 di Tempat Kerja: Dasar Hukum",
    type: "Webinar",
    status: "Menunggu Jadwal",
    date: "Live 20 Ags, 10:00",
    action: "Lihat Detail",
    btnPrimary: false,
    icon: "🎙️"
  }
];
