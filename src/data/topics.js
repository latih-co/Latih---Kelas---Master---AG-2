// ─── Design Tokens ───────────────────────────────────────────────
export const COLORS = {
  plan:      "#4F8EF7",
  do:        "#34C98B",
  check:     "#F7A134",
  act:       "#E05C7A",
  purple:    "#9B6FE8",
  teal:      "#1EC8C8",
  bg:        "#F0F2FA",
  card:      "#FFFFFF",
  dark:      "#1A1D2E",
  gray:      "#8A8FA8",
  lightGray: "#ECEEF5",
  correct:   "#34C98B",
  wrong:     "#E05C7A",
};

// ─── Topics (Top-level categories) ───────────────────────────────
// Setiap topic berisi banyak lessons.
// Setiap lesson berisi banyak slides (widget types).
export const topics = [

  // ══════════════════════════════════════════════════════════════
  // TOPIC 1: ISO 9001 — Sistem Manajemen Mutu
  // ══════════════════════════════════════════════════════════════
  {
    id:          "iso9001",
    title:       "ISO 9001:2015",
    subtitle:    "Sistem Manajemen Mutu",
    icon:        "📋",
    color:       COLORS.plan,
    totalLessons: 2,
    description: "Pelajari standar internasional untuk sistem manajemen mutu, dari PDCA hingga klausul-klausul utama.",
    lessons: [
      {
        id:         "pdca-basics",
        title:      "Siklus PDCA",
        icon:       "🔄",
        duration:   "5 menit",
        xpPerSlide: 15,
        slides: [
          {
            type:        "dragdrop",
            title:       "Susun Siklus PDCA",
            instruction: "Drag kartu ke urutan yang benar dalam siklus PDCA",
            xp:          30,
            items: [
              { id: "plan",  label: "Plan",  icon: "📋", color: COLORS.plan,  position: 0 },
              { id: "do",    label: "Do",    icon: "⚙️", color: COLORS.do,    position: 1 },
              { id: "check", label: "Check", icon: "🔍", color: COLORS.check, position: 2 },
              { id: "act",   label: "Act",   icon: "🚀", color: COLORS.act,   position: 3 },
            ],
            feedback: {
              correct: "Plan → Do → Check → Act adalah urutan yang benar.",
              wrong:   "Urutan PDCA: Plan → Do → Check → Act",
            },
          },
          {
            type:           "tapselect",
            badge:          { icon: "🔍", label: "Fase Check", color: COLORS.check },
            title:          "Identifikasi Aktivitas",
            instruction:    "Ketuk semua aktivitas yang termasuk fase **Check** dalam PDCA",
            highlightColor: COLORS.check,
            xp:             25,
            items: [
              { id: "a", label: "Laporan keluhan pelanggan", icon: "📊", correct: true  },
              { id: "b", label: "Rapat perencanaan produk",  icon: "💬", correct: false },
              { id: "c", label: "Pengukuran suhu mesin",     icon: "🌡️", correct: true  },
              { id: "d", label: "Pelatihan karyawan baru",   icon: "👥", correct: false },
              { id: "e", label: "Audit hasil produksi",      icon: "✅", correct: true  },
              { id: "f", label: "Pembuatan SOP baru",        icon: "📝", correct: false },
            ],
            feedback: {
              correct:     "Tepat! +25 XP",
              wrong:       "Hampir! Cek aktivitas yang ditandai ⚠️",
              explanation: "Fase Check = evaluasi & pengukuran hasil aktual vs target.",
            },
          },
          {
            type:  "mcq",
            title: "Skenario Nyata",
            scenario: {
              icon:           "⚠️",
              label:          "Skenario",
              text:           "Saat fase **Check**, tim menemukan **15% produk tidak sesuai** spesifikasi. Apa langkah selanjutnya?",
              highlightColor: COLORS.check,
              warnColor:      COLORS.wrong,
            },
            xp:      20,
            options: [
              { id: "a", text: "Abaikan dan lanjutkan produksi",      icon: "🚫", correct: false },
              { id: "b", text: "Lakukan analisis akar masalah (Act)", icon: "🔧", correct: true  },
              { id: "c", text: "Langsung kirim ke pelanggan",          icon: "📦", correct: false },
              { id: "d", text: "Tambah target produksi",               icon: "📈", correct: false },
            ],
            explanation: "**💡 Fase Act** — analisis akar penyebab dan tindakan korektif untuk mencegah berulang.",
            nextLabel:   "Lanjut →",
          },
          {
            type:        "explorer",
            title:       "Memahami PDCA",
            instruction: "Ketuk setiap fase untuk melihat penjelasan dan contoh",
            centerLabel: "ISO\n9001",
            phases: [
              { id: "plan",  label: "Plan",  icon: "📋", color: COLORS.plan,  title: "Rencanakan", desc: "Identifikasi masalah dan susun rencana tindakan.", examples: ["Analisis keluhan", "Target kualitas", "Action plan"] },
              { id: "do",    label: "Do",    icon: "⚙️", color: COLORS.do,    title: "Laksanakan", desc: "Jalankan rencana dalam skala kecil dan dokumentasikan.", examples: ["Pilot project", "Training", "SOP"] },
              { id: "check", label: "Check", icon: "🔍", color: COLORS.check, title: "Periksa",    desc: "Ukur hasil aktual vs target yang ditetapkan.", examples: ["Audit internal", "Analisis data", "KPI"] },
              { id: "act",   label: "Act",   icon: "🚀", color: COLORS.act,   title: "Tindaki",    desc: "Standarisasi jika berhasil, atau perbaiki kembali.", examples: ["Update standar", "Corrective action", "Siklus baru"] },
            ],
            nextLabel: "Lihat Hasil →",
          },
        ],
      },
      {
        id:         "iso-klausul",
        title:      "Klausul ISO 9001",
        icon:       "📄",
        duration:   "6 menit",
        xpPerSlide: 15,
        slides: [
          {
            type:        "dragdrop",
            title:       "Urutan Klausul Utama",
            instruction: "Susun klausul ISO 9001 dari yang paling awal hingga akhir",
            xp:          30,
            items: [
              { id: "k4", label: "Konteks Organisasi", icon: "🏢", color: COLORS.plan,  position: 0 },
              { id: "k5", label: "Kepemimpinan",        icon: "👤", color: COLORS.do,    position: 1 },
              { id: "k6", label: "Perencanaan",         icon: "📋", color: COLORS.check, position: 2 },
              { id: "k7", label: "Dukungan",            icon: "🤝", color: COLORS.act,   position: 3 },
            ],
            feedback: {
              correct: "Klausul 4→5→6→7 adalah urutan fondasi ISO 9001.",
              wrong:   "Konteks (4) → Kepemimpinan (5) → Perencanaan (6) → Dukungan (7)",
            },
          },
          {
            type:           "tapselect",
            badge:          { icon: "📝", label: "Dokumentasi Wajib", color: COLORS.plan },
            title:          "Dokumen Wajib ISO 9001",
            instruction:    "Pilih semua item yang **wajib didokumentasikan** dalam ISO 9001:2015",
            highlightColor: COLORS.plan,
            xp:             25,
            items: [
              { id: "a", label: "Kebijakan Mutu",          icon: "📜", correct: true  },
              { id: "b", label: "Jadwal rapat mingguan",   icon: "📅", correct: false },
              { id: "c", label: "Sasaran Mutu",            icon: "🎯", correct: true  },
              { id: "d", label: "Menu kantin",             icon: "🍱", correct: false },
              { id: "e", label: "Prosedur terdokumentasi", icon: "📋", correct: true  },
              { id: "f", label: "Rekaman / Bukti",         icon: "✅", correct: true  },
            ],
            feedback: {
              correct:     "Tepat! +25 XP",
              wrong:       "Hampir! Perhatikan dokumen yang ditandai ⚠️",
              explanation: "ISO 9001 wajibkan: Kebijakan, Sasaran, Prosedur, dan Rekaman.",
            },
          },
          {
            type:  "mcq",
            title: "Studi Kasus Klausul",
            scenario: {
              icon:           "🏭",
              label:          "Situasi",
              text:           "Manajemen puncak **tidak pernah hadir** dalam tinjauan sistem manajemen mutu. Klausul mana yang dilanggar?",
              highlightColor: COLORS.plan,
              warnColor:      COLORS.wrong,
            },
            xp:      20,
            options: [
              { id: "a", text: "Klausul 4 — Konteks Organisasi", icon: "🏢", correct: false },
              { id: "b", text: "Klausul 5 — Kepemimpinan",       icon: "👤", correct: true  },
              { id: "c", text: "Klausul 7 — Dukungan",           icon: "🤝", correct: false },
              { id: "d", text: "Klausul 9 — Evaluasi Kinerja",   icon: "📊", correct: false },
            ],
            explanation: "**💡 Klausul 5 — Kepemimpinan**: manajemen puncak harus terlibat aktif, termasuk memimpin tinjauan manajemen.",
            nextLabel:   "Lanjut →",
          },
          {
            type:        "explorer",
            title:       "Klausul Operasional",
            instruction: "Ketuk setiap klausul untuk memahami isinya",
            centerLabel: "ISO\n9001",
            phases: [
              { id: "k8",  label: "Kl. 8",  icon: "⚙️", color: COLORS.plan,  title: "Operasi",          desc: "Pengendalian proses, desain produk/jasa, pengelolaan penyedia eksternal.",     examples: ["Kontrol produksi", "Desain & pengembangan", "Pembelian"] },
              { id: "k9",  label: "Kl. 9",  icon: "📊", color: COLORS.do,    title: "Evaluasi Kinerja", desc: "Pemantauan, pengukuran, dan evaluasi efektivitas sistem.",                      examples: ["Audit internal", "Tinjauan manajemen", "Kepuasan pelanggan"] },
              { id: "k10", label: "Kl. 10", icon: "🔧", color: COLORS.check, title: "Peningkatan",      desc: "Penanganan ketidaksesuaian, tindakan korektif, peningkatan berkelanjutan.",    examples: ["Corrective action", "PDCA cycle", "Continual improvement"] },
              { id: "k6",  label: "Kl. 6",  icon: "📋", color: COLORS.act,   title: "Perencanaan",      desc: "Tindakan mengatasi risiko & peluang, serta sasaran mutu yang terukur.",         examples: ["Risk assessment", "Sasaran mutu", "Rencana perubahan"] },
            ],
            nextLabel: "Lihat Hasil →",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // TOPIC 2: ISO 14001 — Lingkungan (Coming Soon)
  // ══════════════════════════════════════════════════════════════
  {
    id:          "iso14001",
    title:       "ISO 14001:2015",
    subtitle:    "Sistem Manajemen Lingkungan",
    icon:        "🌿",
    color:       COLORS.do,
    comingSoon:  true,
    totalLessons: 4,
    description: "Kenali standar internasional untuk pengelolaan lingkungan yang berkelanjutan di organisasi.",
    lessons: [],
  },

  // ══════════════════════════════════════════════════════════════
  // TOPIC 3: ISO 45001 — K3 (Coming Soon)
  // ══════════════════════════════════════════════════════════════
  {
    id:          "iso45001",
    title:       "ISO 45001:2018",
    subtitle:    "Keselamatan & Kesehatan Kerja",
    icon:        "⛑️",
    color:       COLORS.check,
    comingSoon:  true,
    totalLessons: 3,
    description: "Standar K3 internasional untuk menciptakan tempat kerja yang aman dan sehat bagi semua karyawan.",
    lessons: [],
  },

  // ══════════════════════════════════════════════════════════════
  // TOPIC 4: HACCP — Keamanan Pangan (Coming Soon)
  // ══════════════════════════════════════════════════════════════
  {
    id:          "haccp",
    title:       "HACCP",
    subtitle:    "Keamanan Pangan",
    icon:        "🥗",
    color:       COLORS.act,
    comingSoon:  true,
    totalLessons: 5,
    description: "Hazard Analysis Critical Control Points — sistem analisis bahaya dan titik kendali kritis pangan.",
    lessons: [],
  },

  // ══════════════════════════════════════════════════════════════
  // TOPIC 5: Six Sigma (Coming Soon)
  // ══════════════════════════════════════════════════════════════
  {
    id:          "sixsigma",
    title:       "Six Sigma",
    subtitle:    "Peningkatan Proses",
    icon:        "📉",
    color:       COLORS.purple,
    comingSoon:  true,
    totalLessons: 6,
    description: "Metodologi DMAIC untuk mengurangi variasi proses dan meningkatkan kualitas secara sistematis.",
    lessons: [],
  },
];
