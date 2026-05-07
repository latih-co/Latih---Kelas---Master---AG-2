// ─── Color Tokens ────────────────────────────────────────────────
export const COLORS = {
  plan: "#4F8EF7",
  do: "#34C98B",
  check: "#F7A134",
  act: "#E05C7A",
  bg: "#F7F8FC",
  card: "#FFFFFF",
  dark: "#1A1D2E",
  gray: "#8A8FA8",
  lightGray: "#ECEEF5",
  correct: "#34C98B",
  wrong: "#E05C7A",
};

// ─── Lesson Data ──────────────────────────────────────────────────
export const lessons = [
  {
    id: "pdca-basics",
    title: "Siklus PDCA",
    icon: "🔄",
    xpPerSlide: 15,
    slides: [
      // Slide 1 — Drag & Drop
      {
        type: "dragdrop",
        title: "Susun Siklus PDCA",
        instruction: "Drag kartu ke urutan yang benar dalam siklus PDCA",
        xp: 30,
        items: [
          { id: "plan",  label: "Plan",  icon: "📋", color: COLORS.plan,  position: 0 },
          { id: "do",    label: "Do",    icon: "⚙️", color: COLORS.do,    position: 1 },
          { id: "check", label: "Check", icon: "🔍", color: COLORS.check, position: 2 },
          { id: "act",   label: "Act",   icon: "🚀", color: COLORS.act,   position: 3 },
        ],
        feedback: {
          correct: "Plan → Do → Check → Act adalah urutan yang benar.",
          wrong: "Urutan PDCA: Plan (rencanakan) → Do (laksanakan) → Check (periksa) → Act (tindaki)",
        },
      },

      // Slide 2 — Tap Select (multi)
      {
        type: "tapselect",
        badge: { icon: "🔍", label: "Fase Check", color: COLORS.check },
        title: "Identifikasi Aktivitas",
        instruction: "Ketuk semua aktivitas yang termasuk fase **Check** dalam PDCA",
        highlightColor: COLORS.check,
        xp: 25,
        items: [
          { id: "a", label: "Laporan keluhan pelanggan", icon: "📊", correct: true },
          { id: "b", label: "Rapat perencanaan produk",  icon: "💬", correct: false },
          { id: "c", label: "Pengukuran suhu mesin",     icon: "🌡️", correct: true },
          { id: "d", label: "Pelatihan karyawan baru",   icon: "👥", correct: false },
          { id: "e", label: "Audit hasil produksi",      icon: "✅", correct: true },
          { id: "f", label: "Pembuatan SOP baru",        icon: "📝", correct: false },
        ],
        feedback: {
          correct: "Tepat! +25 XP",
          wrong: "Hampir! Cek aktivitas yang ditandai ⚠️",
          explanation: "Fase Check = evaluasi & pengukuran hasil aktual vs target.",
        },
      },

      // Slide 3 — MCQ (single choice scenario)
      {
        type: "mcq",
        title: "Skenario Nyata",
        scenario: {
          icon: "⚠️",
          label: "Skenario",
          text: "Saat fase **Check**, tim menemukan **15% produk tidak sesuai** spesifikasi. Apa langkah selanjutnya sesuai PDCA?",
          highlightColor: COLORS.check,
          warnColor: COLORS.wrong,
        },
        xp: 20,
        options: [
          { id: "a", text: "Abaikan dan lanjutkan produksi",      icon: "🚫", correct: false },
          { id: "b", text: "Lakukan analisis akar masalah (Act)", icon: "🔧", correct: true  },
          { id: "c", text: "Langsung kirim ke pelanggan",          icon: "📦", correct: false },
          { id: "d", text: "Tambah target produksi",               icon: "📈", correct: false },
        ],
        explanation: "**💡 Fase Act** — setelah Check menemukan masalah, lakukan analisis akar penyebab dan ambil tindakan korektif untuk mencegah berulang.",
        nextLabel: "Lihat Penjelasan →",
      },

      // Slide 4 — Explorer (tap to reveal info)
      {
        type: "explorer",
        title: "Memahami PDCA",
        instruction: "Ketuk setiap fase untuk melihat penjelasan dan contoh nyata",
        centerLabel: "ISO\n9001",
        phases: [
          {
            id: "plan", label: "Plan", icon: "📋", color: COLORS.plan,
            title: "Rencanakan",
            desc: "Identifikasi masalah, tetapkan tujuan perbaikan, dan susun rencana tindakan berdasarkan data.",
            examples: ["Analisis keluhan pelanggan", "Tetapkan target kualitas", "Buat action plan"],
          },
          {
            id: "do", label: "Do", icon: "⚙️", color: COLORS.do,
            title: "Laksanakan",
            desc: "Jalankan rencana dalam skala kecil (pilot), dokumentasikan proses, dan latih tim.",
            examples: ["Pilot project", "Training karyawan", "Dokumentasi SOP"],
          },
          {
            id: "check", label: "Check", icon: "🔍", color: COLORS.check,
            title: "Periksa",
            desc: "Ukur dan evaluasi hasil aktual dibandingkan target yang sudah ditetapkan di fase Plan.",
            examples: ["Audit internal", "Analisis data", "Review KPI"],
          },
          {
            id: "act", label: "Act", icon: "🚀", color: COLORS.act,
            title: "Tindaki",
            desc: "Jika berhasil: standarisasi dan terapkan secara luas. Jika gagal: mulai siklus baru.",
            examples: ["Update standar", "Corrective action", "Siklus PDCA baru"],
          },
        ],
        nextLabel: "Lihat Hasil →",
      },
    ],
  },

  // ─── Lesson 2: Klausul ISO 9001 ─────────────────────────────
  {
    id: "iso-klausul",
    title: "Klausul ISO 9001",
    icon: "📄",
    xpPerSlide: 15,
    slides: [
      // Slide 1 — Drag & Drop: susun urutan klausul utama
      {
        type: "dragdrop",
        title: "Urutan Klausul Utama",
        instruction: "Susun klausul ISO 9001 dari yang paling awal hingga akhir",
        xp: 30,
        items: [
          { id: "k4", label: "Konteks Organisasi", icon: "🏢", color: COLORS.plan,  position: 0 },
          { id: "k5", label: "Kepemimpinan",        icon: "👤", color: COLORS.do,    position: 1 },
          { id: "k6", label: "Perencanaan",         icon: "📋", color: COLORS.check, position: 2 },
          { id: "k7", label: "Dukungan",            icon: "🤝", color: COLORS.act,   position: 3 },
        ],
        feedback: {
          correct: "Benar! Klausul 4→5→6→7 adalah urutan fondasi ISO 9001.",
          wrong: "Urutan: Konteks (4) → Kepemimpinan (5) → Perencanaan (6) → Dukungan (7)",
        },
      },

      // Slide 2 — Tap Select: pilih yang wajib didokumentasikan
      {
        type: "tapselect",
        badge: { icon: "📝", label: "Dokumentasi Wajib", color: COLORS.plan },
        title: "Dokumen Wajib ISO 9001",
        instruction: "Pilih semua item yang wajib **didokumentasikan** dalam ISO 9001:2015",
        highlightColor: COLORS.plan,
        xp: 25,
        items: [
          { id: "a", label: "Kebijakan Mutu",        icon: "📜", correct: true  },
          { id: "b", label: "Jadwal rapat mingguan", icon: "📅", correct: false },
          { id: "c", label: "Sasaran Mutu",          icon: "🎯", correct: true  },
          { id: "d", label: "Menu kantin",           icon: "🍱", correct: false },
          { id: "e", label: "Prosedur terdokumentasi", icon: "📋", correct: true },
          { id: "f", label: "Rekaman/Bukti aktivitas", icon: "✅", correct: true },
        ],
        feedback: {
          correct: "Tepat! +25 XP",
          wrong: "Hampir! Perhatikan dokumen yang ditandai ⚠️",
          explanation: "ISO 9001 mewajibkan: Kebijakan Mutu, Sasaran Mutu, Prosedur, dan Rekaman sebagai bukti.",
        },
      },

      // Slide 3 — MCQ: studi kasus klausul
      {
        type: "mcq",
        title: "Studi Kasus Klausul",
        scenario: {
          icon: "🏭",
          label: "Situasi",
          text: "Manajemen puncak perusahaan **tidak pernah hadir** dalam tinjauan sistem manajemen mutu. Klausul ISO 9001 mana yang dilanggar?",
          highlightColor: COLORS.plan,
          warnColor: COLORS.wrong,
        },
        xp: 20,
        options: [
          { id: "a", text: "Klausul 4 — Konteks Organisasi", icon: "🏢", correct: false },
          { id: "b", text: "Klausul 5 — Kepemimpinan",       icon: "👤", correct: true  },
          { id: "c", text: "Klausul 7 — Dukungan",           icon: "🤝", correct: false },
          { id: "d", text: "Klausul 9 — Evaluasi Kinerja",   icon: "📊", correct: false },
        ],
        explanation: "**💡 Klausul 5 — Kepemimpinan** mengharuskan manajemen puncak terlibat aktif, termasuk memimpin tinjauan manajemen.",
        nextLabel: "Lanjut →",
      },

      // Slide 4 — Explorer: 4 klausul operasional
      {
        type: "explorer",
        title: "Klausul Operasional",
        instruction: "Ketuk setiap klausul untuk memahami isinya",
        centerLabel: "ISO\n9001",
        phases: [
          {
            id: "k8", label: "Kl. 8", icon: "⚙️", color: COLORS.plan,
            title: "Operasi",
            desc: "Perencanaan dan pengendalian proses, desain produk/jasa, serta pengelolaan penyedia eksternal.",
            examples: ["Kontrol produksi", "Desain & pengembangan", "Pembelian"],
          },
          {
            id: "k9", label: "Kl. 9", icon: "📊", color: COLORS.do,
            title: "Evaluasi Kinerja",
            desc: "Pemantauan, pengukuran, analisis dan evaluasi hasil untuk memastikan efektivitas sistem.",
            examples: ["Audit internal", "Tinjauan manajemen", "Kepuasan pelanggan"],
          },
          {
            id: "k10", label: "Kl. 10", icon: "🔧", color: COLORS.check,
            title: "Peningkatan",
            desc: "Penanganan ketidaksesuaian, tindakan korektif, dan peningkatan berkelanjutan.",
            examples: ["Corrective action", "PDCA cycle", "Continual improvement"],
          },
          {
            id: "k6", label: "Kl. 6", icon: "📋", color: COLORS.act,
            title: "Perencanaan",
            desc: "Tindakan mengatasi risiko & peluang, serta menetapkan sasaran mutu yang terukur.",
            examples: ["Risk assessment", "Sasaran mutu", "Rencana perubahan"],
          },
        ],
        nextLabel: "Lihat Hasil →",
      },
    ],
  },
];
