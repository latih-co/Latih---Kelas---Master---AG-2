import { fifoPanganCategory } from './fifo-pangan';
// ─── Design Tokens ───────────────────────────────────────────────
export const COLORS = {
  plan:      "#4F8EF7",
  do:        "#34C98B",
  check:     "#F7A134",
  act:       "#E05C7A",
  purple:    "#9B6FE8",
  teal:      "#1EC8C8",
  indigo:    "#5C6BC0",
  bg:        "#F7F8FC",
  card:      "#FFFFFF",
  dark:      "#1A1D2E",
  gray:      "#8A8FA8",
  lightGray: "#ECEEF5",
  correct:   "#34C98B",
  wrong:     "#E05C7A",
};

// ─── Thumbnail map ────────────────────────────────────────────────
export const THUMB_MAP = {
  iso9001:  "/thumb_iso9001.png",
  iso14001: "/thumb_iso14001.png",
  emas:     "/thumb_iso14001.png",
  iso45001: "/thumb_iso45001.png",
  haccp:    "/thumb_haccp.png",
  sixsigma: "/thumb_sixsigma.png",
};

// ═══════════════════════════════════════════════════════════════
// 4-LEVEL HIERARCHY:
//   Kategori → Topik → Lesson → Sub-Lesson → Slide
//
//   KursusScreen  : Kategori + Topik cards
//   TopicScreen   : Lesson groups + Sub-Lesson cards (clickable)
//   LessonPlayer  : Slides (widget interaktif)
// ═══════════════════════════════════════════════════════════════
export const categories = [

  // ───────────────────────────────────────────────────────────
  // KATEGORI 1: Sistem Manajemen Mutu
  // ───────────────────────────────────────────────────────────
  {
    id:       "smm",
    title:    "Sistem Manajemen Mutu",
    subtitle: "Pastikan produk & jasa memenuhi standar kualitas",
    icon:     "🏆",
    color:    COLORS.plan,
    topics: [
      {
        id:          "iso9001",
        title:       "ISO 9001:2015",
        subtitle:    "Sistem Manajemen Mutu",
        icon:        "📋",
        color:       COLORS.plan,
        thumb:       THUMB_MAP.iso9001,
        description: "Standar internasional untuk sistem manajemen mutu, dari PDCA hingga klausul-klausul utama.",

        // ── Lessons ──────────────────────────────────────────
        lessons: [
          {
            id:    "ruang-lingkup",
            title: "Ruang Lingkup Standar ISO 9001:2015 (Klausul 1)",
            icon:  "🎯",
            color: COLORS.plan,

            subLessons: [
              {
                id:       "membaca-scope",
                title:    "Membaca dan menginterpretasikan pernyataan scope ISO 9001",
                icon:     "📖",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario Chaos 
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Anda membeli laptop dari toko online yang sama dua kali. \n\n**Pesanan Pertama:** Tepat waktu, mulus, sesuai spesifikasi.\n**Pesanan Kedua:** Terlambat 5 hari, charger tidak ada, buku garansi hilang.",
                    question: "Apakah menurut Anda toko ini sudah 'memenuhi standar mutu'?",
                    options: [
                      { id: "ya", label: "Ya, karena pesanan pertama sempurna", icon: "✅", isCorrect: false, feedback: "Mutu bukan sekadar tentang bisa memproduksi barang bagus sekali waktu." },
                      { id: "tidak", label: "Tidak, karena layanannya tidak konsisten", icon: "❌", isCorrect: true, feedback: "Tepat! Standar mutu sejati adalah tentang **konsistensi**—kemampuan menghasilkan kualitas yang sama setiap saat." }
                    ]
                  },

                  // 2. COBA DULU: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🔍",
                      label: "Analisis Kalimat",
                      text: "Mari kita bedah Scope ISO 9001:2015.\n\n\"ISO 9001 membantu organisasi secara **[ ? ]** menyediakan produk dan jasa yang memenuhi persyaratan pelanggan.\"\n\nKata apa yang paling KRITIS untuk mengisi bagian yang rumpang tersebut?",
                      highlightColor: COLORS.plan
                    },
                    xp: 25,
                    options: [
                      { id: "a", text: "CEPAT", icon: "⚡", correct: false, feedback: "Mutu bukan sekadar tentang seberapa cepat diserahkan, apabila akhirnya terdapat banyak cacat/kesalahan." },
                      { id: "b", text: "KONSISTEN", icon: "🔄", correct: true },
                      { id: "c", text: "MURAH", icon: "💰", correct: false, feedback: "Produk/jasa yang bermutu tidak selalu identik dengan label harga yang paling murah, melainkan nilai pemenuhan janjinya." },
                      { id: "d", text: "SEMPURNA", icon: "✨", correct: false, feedback: "Mengharapkan kesempurnaan 100% setiap detik itu mustahil. ISO lebih fokus ke kemampuan pengendalian agar proses selalu konsisten pada rentang spesifikasi." }
                    ],
                    explanation: "Kejadian yang 'baik sekali' BUKAN standar mutu sejati. Mutu yang dianut ISO 9001 adalah kemampuan menghasilkan output yang taat spesifikasi **setiap kali (konsisten)**, tak memedulikan siapa yang mengerjakan atau kondisi sistem saat itu.",
                    nextLabel: "Lanjut →"
                  },
                  // 3. KONSEP: Explorer (Dua Frasa Kunci)
                  {
                    type: "explorer",
                    instruction: "Ketuk dua pilar utama dalam Scope ISO 9001:2015 ini untuk memahami maknanya secara operasional:",
                    xp: 25,
                    categories: [
                      { 
                        id: "consistently", label: "Consistently Provide", icon: "🔁", color: COLORS.plan,
                        desc: "Kemampuan menghasilkan output yang sama baiknya secara berulang, terlepas dari siapa staf yang bertugas, kapan waktunya, atau di kondisi seperti apa.",
                        examples: [
                          { icon: "🍔", text: "Restoran fast-food yang rasa burgernya persis sama mau dibeli pagi atau malam hari." }
                        ]
                      },
                      { 
                        id: "enhance", label: "Enhance Satisfaction", icon: "📈", color: COLORS.do,
                        desc: "Bukan sekadar 'tidak ada komplain' — tapi aktif meningkatkan kepuasan pelanggan dari waktu ke waktu melalui sistem yang terus diperbaiki.",
                        examples: [
                          { icon: "⭐", text: "Hotel yang tak hanya bersih, tapi mencatat preferensi bantal tamu untuk kunjungan berikutnya." }
                        ]
                      }
                    ],
                    feedback: { next: "Lanjut" }
                  },
                  // 4. SOAL + FEEDBACK: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🏭",
                      label: "Studi Kasus: PT Maju Bersama",
                      text: "PT Maju Bersama mengirim **98%** pesanan tepat waktu selama 3 tahun terakhir. \n\nTapi **2%** sisanya *selalu terlambat* dengan alasan yang sama terus-menerus: \"gangguan sistem logistik lokal yang belum teratasi\".\n\nApakah mereka sudah menerapkan prinsip *'consistently provide'*?",
                      highlightColor: COLORS.act
                    },
                    xp: 30,
                    options: [
                      { id: "a", text: "Ya — 98% sudah angka pencapaian yang luar biasa bagus", icon: "🏆", correct: false, feedback: "Mutu bukan sekadar angka akhir, melainkan apakah sistem dirancang untuk menjamin hasil tanpa mengandalkan kebetulan/keberuntungan semata." },
                      { id: "b", text: "Tidak — masalah dibiarkan berulang menunjukkan sistem belum konsisten", icon: "🔧", correct: true },
                      { id: "c", text: "Ya — tidak ada sistem nyata yang bisa 100% sempurna", icon: "🤷", correct: false, feedback: "Memang tidak ada yang 100% sempurna, tetapi membiarkan masalah berulang dengan alasan yang sama *tanpa tindakan perbaikan* melanggar prinsip konsistensi." },
                      { id: "d", text: "Tidak — karena standar ISO 9001 mewajibkan angka keberhasilan harus selalu 100%", icon: "📏", correct: false, feedback: "ISO 9001 tidak mensyaratkan tingkat kesempurnaan 100%, melainkan komitmen pada perbaikan berkelanjutan (continuous improvement)." }
                    ],
                    explanation: "*Consistently provide* bukan sekadar soal angka performa, tapi soal apakah ada **sistem** untuk mencegah kegagalan berulang.\n\nMasalah yang sama terus muncul dan tidak diselesaikan = sistem belum konsisten terbangun, meskipun angkanya terlihat sangat bagus.",
                    nextLabel: "Selesai"
                  },

                  // 5. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Membaca Scope",
                    text: "• **Mutu bukan kejadian sesaat**, melainkan kemampuan sistem mencetak *output* yang konsisten setiap saat.\n\n• **Continuous Improvement** (Perbaikan Berkesinambungan) adalah kewajiban jika terjadi masalah agar tidak terulang kembali.\n\n• ISO 9001 dirancang untuk membantu organisasi men-**sistematis-kan** konsistensi tersebut tanpa bertumpu pada kebetulan.",
                    xp: 0
                  },
                  // 6. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 7. QUIZ 1
                  {
                    type: "mcq",
                    scenario: { icon: "1️⃣", label: "Kuis 1 / 3", text: "Apa kata kunci terpenting dalam komitmen mutu standar ISO 9001?", highlightColor: COLORS.plan },
                    xp: 40,
                    options: [
                      { id: "a", text: "Cepat dan Akurat", icon: "⚡", correct: false },
                      { id: "b", text: "Consistently (Konsisten)", icon: "🔁", correct: true },
                      { id: "c", text: "Sempurna 100%", icon: "✨", correct: false }
                    ],
                    explanation: "Fokus utama ISO 9001 adalah kemampuan organisasi menghasilkan mutu secara **konsisten**, karena tidak ada sistem buatan manusia yang sempurna 100%.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 8. QUIZ 2
                  {
                    type: "mcq",
                    scenario: { icon: "2️⃣", label: "Kuis 2 / 3", text: "Jika sebuah proses pengiriman terlambat, pendekatan ISO 9001 yang benar adalah:", highlightColor: COLORS.do },
                    xp: 40,
                    options: [
                      { id: "a", text: "Mencatat akar masalah dan mengubah sistem pengiriman agar hal serupa tercegah", icon: "⚙️", correct: true },
                      { id: "b", text: "Memberi hukuman seberat-beratnya pada kurir pengantar", icon: "👨‍⚖️", correct: false },
                      { id: "c", text: "Membiarkan saja, karena kesalahan satu-dua kali adalah wajar", icon: "🤷", correct: false }
                    ],
                    explanation: "Pendekatan mutu berbasis sistem akan senantiasa melakukan _Continuous Improvement_ (Perbaikan) pada akar masalah sistemik, bukan hanya mengambinghitamkan individu.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 9. QUIZ 3 (True/False representation)
                  {
                    type: "mcq",
                    scenario: { icon: "3️⃣", label: "Kuis 3 / 3", text: "**Benar atau Salah:**\n\nISO 9001 mensyaratkan setiap perusahaan untuk *tidak pernah* melakukan kesalahan sama sekali di saat implementasi awalnya.", highlightColor: COLORS.check },
                    xp: 40,
                    options: [
                      { id: "true", text: "Benar", icon: "✅", correct: false },
                      { id: "false", text: "Salah", icon: "❌", correct: true }
                    ],
                    explanation: "Kesalahan/ketidaksesuaian itu wajar terjadi. ISO 9001 difokuskan pada **sistem evaluasi** yang belajar dari kesalahan tersebut untuk menjadi lebih baik secara proaktif.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 10. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Hebat! Kamu sudah menuntaskan materi dan kuis mengenai arti hakiki 'Scope' Mutu dan Konsistensi.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "berlaku-untuk-kita",
                title:    "Menentukan apakah ISO 9001 berlaku untuk jenis organisasi kita",
                icon:     "🏢",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario Chaos 
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Teman Anda berkata:\n\n**\"ISO 9001 kan untuk pabrik-pabrik manufaktur besar saja? Kita kan cuma klinik gigi kecil, jadi tidak perlu standar seperti itu.\"**",
                    question: "Apakah pernyataan teman Anda tersebut benar?",
                    options: [
                      { id: "ya", label: "Ya, ISO 9001 terlalu kompleks untuk klinik kecil", icon: "✅", isCorrect: false, feedback: "Banyak yang salah paham bahwa ISO 9001 eksklusif untuk industri raksasa." },
                      { id: "tidak", label: "Tidak, ukuran dan jenis bisnis tidak masalah", icon: "❌", isCorrect: true, feedback: "Tepat sekali! ISO 9001 dirancang untuk **semua skala dan jenis organisasi**, mulai dari warung kopi hingga pabrik pesawat." }
                    ]
                  },
                  // 2. COBA DULU: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🤔",
                      label: "Teka-teki Organisasi",
                      text: "Dari pilihan di bawah ini, mana yang **TIDAK** bisa atau tidak boleh menggunakan sertifikasi ISO 9001:2015?",
                      highlightColor: COLORS.check
                    },
                    xp: 25,
                    options: [
                      { id: "a", text: "Pabrik tekstil multinasional dengan 2.000 karyawan", icon: "🏭", correct: false },
                      { id: "b", text: "Klinik gigi keluarga dengan hanya 3 orang dokter", icon: "🦷", correct: false },
                      { id: "c", text: "Konsultan IT freelance yang bekerja sendirian (1 orang)", icon: "💻", correct: false },
                      { id: "d", text: "Semua daftar di atas BISA menggunakan ISO 9001", icon: "✅", correct: true }
                    ],
                    explanation: "Kalimat asli di klausul mengatakan bahwa ISO 9001:2015 berlaku untuk **\"any organization, regardless of its type or size, or the products and services it provides.\"**\n\nTidak ada batasan sektor, ukuran, atau jenis output.",
                    nextLabel: "Lanjut →"
                  },
                  // 3. KONSEP: Explorer (3 Kriteria)
                  {
                    type: "explorer",
                    instruction: "Syarat 3 Kriteria Utama: Buka setiap kartu untuk melihat kapan ISO 9001 relevan bagi sebuah organisasi:",
                    xp: 25,
                    categories: [
                      { 
                        id: "output", label: "1. Ada Output", icon: "📦", color: COLORS.plan,
                        desc: "Organisasi tersebut harus menghasilkan sesuatu, baik berupa produk fisik maupun jasa layanan.",
                        examples: [
                          { icon: "☕", text: "Menyeduh kopi (produk)" },
                          { icon: "🎨", text: "Desain logo (jasa)" }
                        ]
                      },
                      { 
                        id: "pelanggan", label: "2. Ada Pelanggan", icon: "🤝", color: COLORS.do,
                        desc: "Harus ada entitas atau orang lain yang menerima output tersebut (pelanggan).",
                        examples: [
                          { icon: "👨‍👩‍👧", text: "Masyarakat umum" },
                          { icon: "🏢", text: "Perusahaan klien (B2B)" }
                        ]
                      },
                      { 
                        id: "konsisten", label: "3. Niat Konsisten", icon: "🎯", color: COLORS.act,
                        desc: "Ada keinginan dan intensi yang kuat untuk memenuhi persyaratan mutu secara repititif / terus-menerus.",
                        examples: [
                          { icon: "🛡️", text: "Bukan proyek sekali jalan yang besoknya bubar." }
                        ]
                      }
                    ],
                    feedback: { next: "Uji Pemahaman →" }
                  },
                  // 4. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Untuk Siapa ISO 9001?",
                    text: "• ISO 9001 dirancang secara **universal**, tidak dibatasi oleh sektor industri atau skala bisnis.\n\n• Klausul ini menyebut *\"any organization\"* yang berarti warung, klinik, sekolah, instansi pemerintah, hingga tukang cukur rambut pun berhak asalkan komitmen.\n\n• Syarat dasarnya hanya ada 3: punya **Output** (Produk/Jasa), punya **Pelanggan** penerima, dan berniat menjaga **Konsistensi** mutunya.",
                    xp: 0
                  },
                  // 5. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 6. QUIZ 1
                  {
                    type: "mcq",
                    scenario: {
                      icon: "☕",
                      label: "Kuis 1 / 3",
                      text: "Sebuah **koperasi petani kopi di Toraja** berniat menerapkan ISO 9001 agar kopi mereka diakui dan bisa diekspor ke Jepang.\n\nKoperasi ini beranggotakan 47 petani, **tidak punya gedung kantor formal**, dan proses sangrai-nya masih **semi-manual**.\n\nApakah secara standar mereka *eligible* (memenuhi syarat) untuk disertifikasi?",
                      highlightColor: COLORS.act
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "Tidak — belum punya kantor operasional yang formal", icon: "🏢", correct: false, feedback: "ISO 9001 tidak mensyaratkan perusahaan harus memiliki wujud kantor yang megah atau gedung fisik berlantai tingkat." },
                      { id: "b", text: "Tidak — karena koperasi bukan 'organisasi perusahaan' dalam teori ISO", icon: "🚫", correct: false, feedback: "ISO 9001 berlaku untuk *segala bentuk organisasi*, tak memandang status badan hukumnya (PT, CV, Koperasi, Yayasan, atau institusi pemerintah)." },
                      { id: "c", text: "Ya — karena punya produk output, pelanggan, dan niat konsistensi", icon: "✅", correct: true },
                      { id: "d", text: "Ya — asalkan proses sangrai diubah menjadi 100% full-otomatis pakai mesin", icon: "⚙️", correct: false, feedback: "ISO 9001 tidak pernah mewajibkan otomatisasi mesin. Proses yang 100% manual dengan tangan manusia pun bisa disertifikasi selama standar mutu dan panduannya ditaati dan dijaga konsistensinya." }
                    ],
                    explanation: "Koperasi adalah organisasi yang sah! Mereka punya **output** (kopi berkualitas), punya **pelanggan** (importir Jepang), dan punya komitmen **konsistensi** mutu.\n\nISO 9001 sama sekali tidak mensyaratkan organisasi harus punya *gedung megah* atau *mesin serba otomatis*. Sistem manual yang terkontrol tetap bisa diakui.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 7. QUIZ 2
                  {
                    type: "mcq",
                    scenario: { icon: "2️⃣", label: "Kuis 2 / 3", text: "Apakah seorang **pekerja lepas (freelancer)** tunggal di bidang desain grafis diperbolehkan mengadopsi ISO 9001 sistemik untuk operasionalnya?", highlightColor: COLORS.do },
                    xp: 35,
                    options: [
                      { id: "a", text: "Boleh, asalkan memiliki portofolio lebih dari 100 klien", icon: "📚", correct: false },
                      { id: "b", text: "Boleh, ISO 9001 berlaku tanpa batas ukuran karyawan", icon: "🧑‍💻", correct: true },
                      { id: "c", text: "Tidak, batas minimal organisasi standar mutu adalah 10 staf", icon: "👥", correct: false }
                    ],
                    explanation: "Benar sekali! Skala organisasi mulai dari 1 orang pekerja lepas mandiri hingga 100.000 karyawan bisa mengadopsi standar kontrol konsistensi ISO.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 8. QUIZ 3 (True/False)
                  {
                    type: "mcq",
                    scenario: { icon: "3️⃣", label: "Kuis 3 / 3", text: "**Benar atau Salah:**\n\nInstansi nirlaba (Yayasan) dan Pemerintahan (Puskesmas/Kelurahan) **TIDAK TERMASUK** dalam entitas yang disyaratkan oleh parameter ISO 9001 karena mereka bukan korporat komersial.", highlightColor: COLORS.plan },
                    xp: 35,
                    options: [
                      { id: "true", text: "Benar", icon: "✅", correct: false },
                      { id: "false", text: "Salah", icon: "❌", correct: true }
                    ],
                    explanation: "Salah! Entitas Non-Profit (sekolah, LSM) maupun Layanan Publik Milik Negara (Kelurahan, Rumah Sakit Umum Daerah) sama-sama memiliki 'Pelanggan' (yakni masyarakat) dan sangat didorong untuk memiliki manajemen mutu konsisten melalui ISO 9001.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 9. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Sempurna! Kamu telah membongkar mitos bahwa ISO 9001 hanya untuk industri raksasa. Mutu bisa dan harus diterapkan di semua skala organisasi.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "produk-vs-jasa",
                title:    "Membedakan 'produk' vs 'jasa' dalam konteks ISO 9001",
                icon:     "📦",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario Chaos 
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Anda pesan pizza delivery online.\n\nYang Anda terima:\n- Pizza (**produk**)\n- Pengiriman ke rumah (**jasa**)\n- Aplikasi untuk pesan (**jasa digital**)",
                    question: "Jadi, bisnis pizza ini sebenarnya menjual produk atau jasa?",
                    options: [
                      { id: "produk", label: "Murni Produk (karena intinya jualan makanan)", icon: "🍕", isCorrect: false, feedback: "Jika hanya produk, Anda harus mendatangi toko dan memasaknya sendiri." },
                      { id: "jasa", label: "Murni Jasa (karena intinya pelayanan delivery)", icon: "🛵", isCorrect: false, feedback: "Jika hanya jasa murni, kurirnya datang ke rumah Anda tanpa membawa pizza." },
                      { id: "keduanya", label: "Kombinasi Produk dan Jasa", icon: "🤝", isCorrect: true, feedback: "Tepat! Sebagian besar bisnis modern menawarkan perpaduan keduanya." }
                    ]
                  },
                  // 2. COBA DULU: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🤔",
                      label: "Evolusi Standar",
                      text: "Mengapa ISO 9001:2015 secara eksplisit menggunakan istilah **\"products AND services\"** — berbeda dari versi ISO 9001 tahun 2008 yang dulunya hanya menyebut \"product\"?",
                      highlightColor: COLORS.plan
                    },
                    xp: 25,
                    options: [
                      { id: "a", text: "Karena jasa dianggap lebih penting dari produk di era modern", icon: "📈", correct: false, feedback: "Produk fisik pun masih krusial di era modern. ISO tidak mendiskriminasi mana yang 'lebih penting'." },
                      { id: "b", text: "Karena mayoritas organisasi riil menghasilkan kombinasi keduanya, bukan cuma salah satu", icon: "✅", correct: true },
                      { id: "c", text: "Karena produk fisik diprediksi tidak lagi relevan dalam ekonomi digital", icon: "📱", correct: false, feedback: "Ekonomi digital juga butuh perangkat keras (server, hp, laptop). Konsep produk fisik tidak akan pernah punah." },
                      { id: "d", text: "Karena ISO ingin memperluas sertifikasi khusus ke sektor layanan publik", icon: "🏛️", correct: false, feedback: "Layanan publik (seperti kantor instansi/surat menyurat) sudah bisa memakai ISO jauh sebelum edisi 2015 direvisi." }
                    ],
                    explanation: "Revisi 2015 mengakui realitas bisnis modern — hampir semua organisasi menghasilkan **campuran produk dan jasa**.\n\nPabrik mobil besar juga pasti menjual layanan purna jual. Rumah sakit menyediakan jasa medis sekaligus memberikan produk fisik (obat dan perban).",
                    nextLabel: "Lanjut →"
                  },
                  // 3. KONSEP: MatrixWidget
                  {
                    type: "matrix",
                    instruction: "Perbandingan Karakteristik: Tap setiap (?) untuk melihat perbedaan mendasar antara Produk dan Jasa.",
                    xp: 40,
                    rows: [
                      { id: "produk", label: "Produk", icon: "📦", color: COLORS.plan },
                      { id: "jasa", label: "Jasa", icon: "🤝", color: COLORS.do }
                    ],
                    columns: [
                      { id: "wujud", label: "Wujud", icon: "👁️" },
                      { id: "cek", label: "Pemeriksaan", icon: "🔍" },
                      { id: "kendali", label: "Kendali Mutu", icon: "⚙️" }
                    ],
                    cells: [
                      { rowId: "produk", colId: "wujud", preview: "Berwujud fisik", detail: "Biasanya memiliki wujud fisik yang bisa dilihat, disentuh, disimpan sebagai stok, atau dihitung." },
                      { rowId: "jasa", colId: "wujud", preview: "Tidak berwujud", detail: "Sifatnya intangible (tak berwujud). Kesalahan / cacat pada jasa sering tidak bisa 'dilihat wujudnya' sebelum terjadi." },
                      { rowId: "produk", colId: "cek", preview: "Bisa dicek sebelum diserahkan", detail: "Jika ada yang cacat, produk bisa disortir, diganti, atau diperbaiki SEBELUM sampai ke tangan pelanggan." },
                      { rowId: "jasa", colId: "cek", preview: "Diproduksi & dikonsumsi bersamaan", detail: "Anda tidak bisa 'memeriksa' jasa potong rambut sebelum dikerjakan. Pelanggan langsung merasakan hasilnya." },
                      { rowId: "produk", colId: "kendali", preview: "Fokus pada hasil akhir", detail: "Sistem manajemen mutu bisa sangat fokus pada inspeksi produk jadi sebelum rilis (meskipun prosesnya tetap penting)." },
                      { rowId: "jasa", colId: "kendali", preview: "Fokus pada proses", detail: "Karena tidak bisa dicek di akhir, maka QMS untuk penyedia jasa harus sangat ketat mengendalikan PROSES layanannya agar tidak meleset sejak awal." }
                    ],
                    feedback: { next: "Uji Pemahaman →" }
                  },
                  // 4. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Dua Sisi Koin Output Organisasi",
                    text: "• Menilik era modern, ISO 9001 merevisi istilahnya menjadi **'Products and Services'** untuk menegaskan bahwa jaminan mutu tidak melulu soal barang pabrikasi.\n\n• **Produk fisik** bersifat *tangible*, bisa disimpan, dan cacatnya bisa dicegah sebelum dikirim (`Quality Control` inspeksi akhir sangat mungkin).\n\n• **Layanan Jasa** bersifat *intangible*, dikerjakan dan dinikmati di waktu bersamaan. Cacat tidak bisa dicegah di akhir proses, sehingga **pengawasan pada tahapan di tengah proses** sangat krusial.",
                    xp: 0
                  },
                  // 5. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 6. QUIZ 1
                  {
                    type: "mcq",
                    scenario: {
                      icon: "☁️",
                      label: "Kuis 1 / 3",
                      text: "Perusahaan perangkat lunak menjual aplikasi HR berbasis *cloud* dengan biaya langganan bulanan. \n\nPelanggan mengakses via browser internet, **tidak** mendownload file aplikasi, dan **tidak** memiliki (*own*) aset software-nya.\n\nBagaimana seyogyanya mengklasifikasikan output organisasi ini menurut kacamata ISO 9001?",
                      highlightColor: COLORS.act
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "Murni Produk — karena pada dasarnya itu adalah software (baris kode yang dirakit)", icon: "💻", correct: false, feedback: "Jika skemanya beli putus installer fisik/lisensi lifetime baru bisa disebut produk yang dibeli. Tetapi SaaS ini dijual akses bulanannya (langganan)." },
                      { id: "b", text: "Condong ke Jasa — karena pelanggan tidak memiliki asetnya, melainkan hanya mengakses layanan komputasi", icon: "✅", correct: true },
                      { id: "c", text: "Bukan keduanya — hukum aset digital masuk kategori hak kekayaan intelektual tersoal ISO", icon: "⚖️", correct: false, feedback: "ISO 9001 membawahi seluruh output organisasi, baik wujud aset fisik, jasa, maupun aset digital." },
                      { id: "d", text: "Murni Produk — asalkan dijanjikan software tersebut belum pernah down / error", icon: "🔒", correct: false, feedback: "Menjamin ketersediaan sistem tetap bagian dari sebuah kesepakatan tingkat *layanan* (Service-Level Agreement)." }
                    ],
                    explanation: "Model *SaaS* (Software as a Service) umumnya diklasifikasikan sebagai **Jasa layanan IT**.\n\n*Catatan:* ISO 9001 tidak kaku harus A atau B mutlak. Yang terpenting organisasi mampu mengidentifikasi output-nya lalu menerapkan metode pengendalian mutu (proses vs inspeksi produk) yang teramat tepat.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 7. QUIZ 2
                  {
                    type: "mcq",
                    scenario: { icon: "2️⃣", label: "Kuis 2 / 3", text: "Sebuah perusahaan taksi berhadapan dengan masalah mobil yang kotor menjijikkan saat dinaiki pelanggan.\nKarakteristik alamiah manakah dari \"Manajemen Jasa\" yang membuatnya sulit memastikan kebersihan taksi **sebelum** pelanggan sudah terlanjur duduk?", highlightColor: COLORS.do },
                    xp: 35,
                    options: [
                      { id: "a", text: "Jasa tidak berwujud fisik yang nyata", icon: "👻", correct: false },
                      { id: "b", text: "Jasa diproduksi dan dikonsumsi dalam waktu yang amat bersamaan", icon: "⏱️", correct: true },
                      { id: "c", text: "Jasa tidak bisa disimpan di dalam gudang inventaris", icon: "📦", correct: false }
                    ],
                    explanation: "Karena penjemputan layanan taksi terjadi langsung (real-time) antara supir dan penumpang, tak bisa ada pemeriksa ('QC') yang mencegat di pertengahan jalan untuk mengecek kebersihan taksi itu. Pemecahannya harus berupa sistem *briefing* dan pemeriksaan di pool *sebelum* mobil itu dinas ke jalan.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 8. QUIZ 3
                  {
                    type: "mcq",
                    scenario: { icon: "3️⃣", label: "Kuis 3 / 3", text: "**Benar atau Salah:**\n\nUntuk sebuah toko retail ponsel *smartphone*, seluruh pedoman manajemen mutu mereka harus difokuskan 100% pada *Produk (HP)* karena wujud utamanya adalah menjual barang fisik.", highlightColor: COLORS.plan },
                    xp: 35,
                    options: [
                      { id: "true", text: "Benar", icon: "✅", correct: false },
                      { id: "false", text: "Salah", icon: "❌", correct: true }
                    ],
                    explanation: "Salah! Toko retail pun sarat akan jasa. Mulai dari kebersihan toko, keramahan frontliner/staf penjualan, garansi pasca-pembelian, hingga *after-sales service*. Mayoritas bisnis selalu membaurkan penawaran produk dan jasa.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 9. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Pemahaman luar biasa! Kamu sudah bisa membedakan karakteristik produk dan jasa, serta mengerti implikasi peraturannya terhadap cara menyusun Strategi Kendali Mutu di lapangan.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "makna-consistently",
                title:    "Memahami makna 'consistently' sebagai inti QMS",
                icon:     "🔁",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Kedai kopi favorit Anda punya barista jagoan bernama Budi. Kalau Budi yang menyeduh, rasa kopinya **luar biasa enak**. Tapi kalau Budi sedang libur, rasa kopinya **sangat hambar** dan sering salah pesanan.",
                    question: "Apakah kedai kopi ini memiliki Sistem Manajemen Mutu yang baik?",
                    options: [
                      { id: "a", label: "Ya, karena mereka punya Budi si barista bintang", icon: "⭐", isCorrect: false, feedback: "Ketergantungan pada satu 'bintang' justru merupakan kelemahan sistem." },
                      { id: "b", label: "Tidak, karena kualitasnya bergantung pada individu, bukan sistem", icon: "❌", isCorrect: true, feedback: "Tepat! Mutu yang baik harus bisa dipertahankan siapapun yang sedang bertugas." }
                    ]
                  },
                  // 2. CONCEPT: Compare
                  {
                    type: "compare_pick",
                    instruction: "Pilih pendekatan mana yang mencerminkan **cara kerja ISO 9001**:",
                    xp: 25,
                    products: [
                      { id: "hero", label: "Pendekatan Pahlawan", icon: "🦸", color: COLORS.wrong, desc: "Mengandalkan karyawan senior yang hafal semua resep di luar kepala tanpa catatan.", emoji: "🧠" },
                      { id: "system", label: "Pendekatan Sistem", icon: "⚙️", color: COLORS.correct, desc: "Membuat resep tertulis (SOP) dan menakar gramasi dengan timbangan digital agar fix.", emoji: "📐" }
                    ],
                    reveal: {
                      headline: "Sistem mengalahkan Pahlawan",
                      body: "ISO 9001 membangun sistem. Jika Budi si barista *resign*, kedai kopi tidak boleh bangkrut karena resep dan standar pelatihannya sudah terdokumentasi dengan baik."
                    },
                    feedback: { next: "Lanjut →" }
                  },
                  // 3. EXPLORE: Grid Reveal
                  {
                    type: "grid_reveal",
                    instruction: "Ketuk 3 pondasi utama yang membuat sebuah perusahaan bisa menghasilkan mutu yang 'Konsisten':",
                    xp: 30,
                    items: [
                      { id: "sop", label: "Prosedur Baku (SOP)", icon: "📋", detail: "Panduan jelas agar cara kerja seragam." },
                      { id: "train", label: "Pelatihan Karyawan", icon: "🎓", detail: "Memastikan semua orang kompeten." },
                      { id: "audit", label: "Pemeriksaan Rutin", icon: "🔍", detail: "Mengecek apakah SOP benar-benar dijalankan." }
                    ],
                    reveal: {
                      headline: "Formula Konsistensi",
                      body: "Konsistensi tidak terjadi secara ajaib. Ia adalah hasil dari Standar (SOP) + Kompetensi (Pelatihan) + Pengawasan (Audit)."
                    },
                    feedback: { next: "Uji Pemahaman →" }
                  },
                  // 4. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Sistem Kalahkan Pahlawan",
                    text: "• **Mutu Konsisten** mendambakan sistem yang kokoh berjalan sendiri (SOP, Training, Audit), bukan bertumpu pada \"pahlawan / bintang\" yang ingatan dan performanya bisa fluktuatif.\n\n• Pekerjaan ISO 9001 adalah merubah kemampuan hebat individu *menjadi* kemampuan kuat sistem organisasi.\n\n• Membuktikan konsistensi bukan sekadar mengeliminasi / menyortir defect (Quality Control), tetapi menghilangkan **akar masalah** agar tidak muncul lagi kelak (Quality Assurance).",
                    xp: 0
                  },
                  // 5. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 6. QUIZ 1
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🏭",
                      label: "Kuis 1 / 3",
                      text: "Sebuah pabrik roti mendapatkan komplain karena roti terbakarnya (gosong) masuk ke pasaran.\nUntuk memastikan hal ini **tidak terjadi lagi secara konsisten**, tindakan apa yang paling tepat sesuai prinsip ISO 9001?",
                      highlightColor: COLORS.plan
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "Memecat karyawan yang bertugas membakar roti", icon: "👞", correct: false, feedback: "Menghukum orang tidak memperbaiki sistem oven yang mungkin rusak." },
                      { id: "b", text: "Menambah 5 orang inspektur untuk menyortir roti gosong", icon: "👀", correct: false, feedback: "Ini hanya Quality Control (inspeksi). Konsistensi ISO 9001 menuntut pencegahan (Quality Assurance)." },
                      { id: "c", text: "Memasang alarm suhu otomatis pada oven dan melatih ulang operator", icon: "⏲️", correct: true }
                    ],
                    explanation: "Menyortir barang cacat (inspeksi) itu amat mahal dan tidak awet. Memperbaiki **sistem** (pasang alarm suhu) memastikan proses terkunci konsisten dan cacat bisa dicegah sejak awal sebelum ia terjadi.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 7. QUIZ 2
                  {
                    type: "mcq",
                    scenario: { icon: "2️⃣", label: "Kuis 2 / 3", text: "Rumah sakit kita memiliki Dokter Jaga bedah ternama yang super hebat bernama Dr. Tono. \nSemua operasi berat selalu sukses 100% bila ditangani olehnya. Sayangnya bulan lalu dia *resign* dan tiba-tiba rasio pasien gagal operasi mencuat 30%. \n\nHal manakah di bawah ini yang mengindikasikan kelalaian implementasi ISO 9001?", highlightColor: COLORS.do },
                    xp: 35,
                    options: [
                      { id: "a", text: "Kurangnya gaji retensi untuk menahan Dr. Tono pergi", icon: "💰", correct: false },
                      { id: "b", text: "Ketiadaan dokumentasi pengetahuan (SOP) dan transfer keahlian dari sang \"bintang\" ke rekan sesama dokter sistem.", icon: "📝", correct: true },
                      { id: "c", text: "Rumah sakit kurang rajin dalam melakukan perekrutan eksternal", icon: "🤝", correct: false }
                    ],
                    explanation: "Ketergantungan fatal pada 'pendekatan pahlawan tunggal' adalah penyakit laten kualitas. Sistem manajemen mutu yang benar (ISO 9001) memaksa organisasi **membuat standarisasi kompetensi**, jadi ketika satu orang luar biasa gugur/pergi, kualitas tetap bisa distabilkan oleh individu lain.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 8. QUIZ 3
                  {
                    type: "mcq",
                    scenario: { icon: "3️⃣", label: "Kuis 3 / 3", text: "**Benar atau Salah:**\n\nManajemen organisasi Anda menemukan bahwa 1 mesin rusak, jadi mereka memanggil montir dan mesin berfungsi kembali. Langkah tuntas perbaikan mesin itu secara teoretis 'sudah sejalan dan cukup' dengan apa yang ISO 9001 maknai sebagai tindakan kolektif berkelanjutan.", highlightColor: COLORS.plan },
                    xp: 35,
                    options: [
                      { id: "true", text: "Benar", icon: "✅", correct: false },
                      { id: "false", text: "Salah", icon: "❌", correct: true }
                    ],
                    explanation: "Salah! Karena montir hanya memperbaiki insiden saat itu (Problem Solving singkat). Untuk sejalan dengan prinsip mutu 'Consistently' (Continuous Improvement), Manajemen harus melacak **mengapa mesin itu awalnya bisa rusak**—apakah karena tidak ada jadwal Maintenance bulanan? Lalu mereka menciptakan SOP Rawatan Baru agar mesin lain tidak ikut rusak berkelanjutan.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 9. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Sangat baik! Kamu memahami roh mendasar dari 'Konsisten'—bahwa ia berarti membangun sistem tangguh berbasis _Assurance_ yang tidak bergantung pada pesona dan insting satu pahlawan mutlak.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "manfaat-qms",
                title:    "Menjelaskan manfaat QMS kepada stakeholder non-teknis",
                icon:     "🤝",
                duration: "5 menit",
                slides: [
                  // 1. HOOK
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Direktur Anda bertanya dengan nada skeptis:\n\n**\"Buat apa kita repot-repot bayar sertifikasi ISO 9001? Toh pelanggan kita selama ini tidak ada yang minta sertifikat itu. Ini cuma buang-buang uang untuk kertas dokumen!\"**",
                    question: "Sebagai penggerak mutu, bagaimana respons terbaik Anda?",
                    options: [
                      { id: "a", label: "Kita butuh sertifikatnya untuk pajangan di lobi kantor", icon: "🖼️", isCorrect: false, feedback: "Jika sekadar untuk dipajang, tidak ada gunanya mengeluarkan energi besar untuk sertifikat." },
                      { id: "b", label: "ISO membantu kita mengurangi pemborosan dan kerja ulang (rework)", icon: "📉", isCorrect: true, feedback: "Tepat! Bagi manajemen atas, bahasa yang paling dipahami adalah bahasa efisiensi dan penghematan biaya." }
                    ]
                  },
                  // 2. TAP SELECT
                  {
                    type: "tapselect",
                    instruction: "Pilih 3 manfaat internal terbesar dari penerapan ISO 9001 (selain urusan marketing / sertifikat):",
                    minSelect: 3,
                    maxSelect: 3,
                    xp: 25,
                    options: [
                      { id: "1", text: "Mengurangi produk cacat (Defect)", icon: "📉", correct: true, explanation: "Proses yang terstandarisasi mencegah terjadinya kesalahan berulang." },
                      { id: "2", text: "Menjamin keuntungan perusahaan naik 100%", icon: "💰", correct: false, explanation: "ISO 9001 tidak menggaransi lonjakan profit mutlak, melainkan efisiensi operasional." },
                      { id: "3", text: "Proses serah terima karyawan baru (Onboarding) lebih cepat", icon: "🤝", correct: true, explanation: "Karena semua tugas sudah memiliki instruksi kerja (SOP) yang jelas." },
                      { id: "4", text: "Karyawan bisa libur lebih panjang", icon: "🌴", correct: false, explanation: "Penerapan sistem mutu tidak berhubungan langsung dengan jatah cuti." },
                      { id: "5", text: "Komplain pelanggan lebih cepat tertangani secara sistematis", icon: "📞", correct: true, explanation: "ISO 9001 mewajibkan adanya prosedur penanganan keluhan dan perbaikan berkesinambungan." }
                    ],
                    feedback: { insight: "ISO 9001 bukan sekadar stempel. Ia adalah alat untuk mengendalikan biaya operasional, merapikan birokrasi, dan membangun fondasi perusahaan yang bisa ditinggal 'auto-pilot'.", next: "Lanjut →" }
                  },
                  // 3. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Manfaat Real ISO 9001",
                    text: "• **Efisiensi Internal:** Standar Mutu berarti memangkas *rework* (kerja ulang karena salah) dan *defect* secara drastis.\n\n• **Pemindahan Pengetahuan:** Lewat SOP dan *best practice*, performa cemerlang individu bisa diduplikasi menjadi performa kuat organisasi yang tidak gampang goyah saat staf *resign*.\n\n• **Kepuasan Pelanggan:** Ujung tombak dari efisiensi adalah kepastian pelanggan menerima produk/jasa yang mutunya terjaga secara *konsisten*.",
                    xp: 0
                  },
                  // 4. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 5. QUIZ 1
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🗣️",
                      label: "Kuis 1 / 3",
                      text: "Saat berbicara menjelaskan pentingnya ISO pada Manager Tim *Sales* (Penjualan), manfaat QMS (Quality Management System) mana yang sebaiknya Anda jadikan *highlight* utama agar ia tergerak mendukung?",
                      highlightColor: COLORS.do
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "ISO 9001 mewajibkan banyak checklist audit internal yang harus diisi", icon: "📝", correct: false, feedback: "Bicara pasal prosedur yang berbelit malah membuat personil Sales kabur." },
                      { id: "b", text: "ISO 9001 memastikan pengiriman konsisten tepat spesifikasi, membuat klien Sales mudah loyal", icon: "🤝", correct: true },
                      { id: "c", text: "ISO 9001 menekan inovasi liar tim produksi agar Sales mudah menjual tipe lama", icon: "🔒", correct: false, feedback: "Membatasi inovasi adalah persepsi kolot tentang ISO sekaligus hal buruk bagi tim penjualan." }
                    ],
                    explanation: "Setiap *Stakeholder* punya bahasa kepentingan yang berbeda. Tim Sales selalu lapar akan **kepuasan dan keloyalan klien**. QMS memastikan janji manis yang diucap Sales ke klien sungguh bisa dipenuhi oleh tim Operasional di belakang panggung secara konsisten.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 6. QUIZ 2
                  {
                    type: "mcq",
                    scenario: { icon: "2️⃣", label: "Kuis 2 / 3", text: "Manager HRD (Sumber Daya Manusia) di fasilitas Anda mengeluhkan lamanya waktu untuk melatih rekrutan karyawan mesin jahit yang baru. Manfaat nyata mana dari ISO 9001 yang wajib Anda tunjukkan padanya?", highlightColor: COLORS.plan },
                    xp: 35,
                    options: [
                      { id: "a", text: "Penekanan pada kewajiban Standar Prosedur Operasi & Dokumentasi (SOP) yang mempermudah Transfer Pengetahuan.", icon: "📚", correct: true },
                      { id: "b", text: "Doktrin audit eksternal tahunan yang memaksa karyawan lembur.", icon: "😰", correct: false },
                      { id: "c", text: "Sistem teguran (CAPA) yang mudah dipakai untuk mencari-cari kesalahan pemula.", icon: "📑", correct: false }
                    ],
                    explanation: "Bagi Divisi SDM / HRD, **Transfer Pengetahuan** adalah urat nadi perekrutan. Dengan menjalankan QMS, segala proses teknis dijabarkan secara gamblang lewat pedoman Standar Mutu, sehingga orientasi staf baru *onboarding* bisa cepat dan seragam.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 7. QUIZ 3
                  {
                    type: "mcq",
                    scenario: { icon: "3️⃣", label: "Kuis 3 / 3", text: "**Benar atau Salah:**\n\nDirektur Keuangan (CFO) perusahaan sebaiknya dibujuk mendukung sertifikasi ISO 9001 *hanya semata-mata* dengan alasan \"kita akan dapat plakat sertifikat emas untuk promosi di koran lokal\".", highlightColor: COLORS.act },
                    xp: 35,
                    options: [
                      { id: "true", text: "Benar", icon: "✅", correct: false },
                      { id: "false", text: "Salah", icon: "❌", correct: true }
                    ],
                    explanation: "Salah Mutlak! Menjual ISO 9001 ke Direktur Keuangan paling presisi menggunakan bahasa 'Rework/Pemborosan'. QMS yang baik akan menurunkan tingkat produk cacat dan inefisiensi jam kerja (Rework/Scrap). Ini menghasilkan nilai efisiensi Moneter Ratusan Juta rupiah tiap tahun yang sangat relevan untuk seorang CFO.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 8. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Sangat brilian! Menjual ide ISO 9001 ke departemen internal yang berbeda memang seninya membungkus manfaat universal ISO ke dalam bahasa kepentingannya masing-masing.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "beda-std-mutu",
                title:    "Membedakan ISO 9001 dengan standar mutu lain (GMP, HACCP, ISO 22000)",
                icon:     "⚖️",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario Chaos
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Perusahaan makanan Anda sudah punya HACCP dan GMP secara ketat bertahun-tahun.\nTiba-tiba seorang Klien eksportir besar dari luar negeri meminta pabrik Anda mempunyai sertifikat ISO 9001 bulan depan.\n\nStaf produksi kebingungan lalu mengeluh: **\"Bukannya ini sama saja? Kita kan sudah jaga kualitas pangan pakai HACCP! Kenapa standar ruwet ini harus diulang-ulang?\"**",
                    question: "Apakah tuntutan klien terhadap ISO 9001 tersebut sekadar 'pengulangan basi' dari apa yang distandarkan oleh HACCP dan GMP?",
                    options: [
                      { id: "ya", label: "Ya, pada dasarnya ketiganya adalah doktrin kualitas produk yang diulang", icon: "✅", isCorrect: false, feedback: "Kelihatannya memang redundan bicara 'mutu', tapi ruang lingkupnya sangat berbeda." },
                      { id: "tidak", label: "Tidak, ruang lingkup sasaran dan cakupannya berbeda secara fundamental", icon: "❌", isCorrect: true, feedback: "Tepat sekali! ISO 9001 tidak hanya peduli pada dapur produksi steril (seperti HACCP), melainkan seluruh tubuh organisasi." }
                    ]
                  },
                  // 2. COBA DULU: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🕵️",
                      label: "Analisis Fundamental",
                      text: "Dari kacamata regulasi makro industri, apa perbedaan spesifik paling mendasar antara implementasi operasional **ISO 9001** jika dibandingkan dengan **HACCP**?",
                      highlightColor: COLORS.check
                    },
                    xp: 25,
                    options: [
                      { id: "a", text: "ISO 9001 diciptakan untuk manufaktur mesin logam, HACCP hanya spesifik komersil", icon: "🏭", correct: false },
                      { id: "b", text: "HACCP fokus menjaga keamanan pangan (biologis/kimia/fisik), ISO 9001 mengelola mutu bisnis menyeluruh", icon: "🛡️", correct: true },
                      { id: "c", text: "ISO 9001 jauh lebih kaku & ketat murni demi urusan regulasi dokumen dibanding HACCP", icon: "📄", correct: false },
                      { id: "d", text: "Keduanya terlahir sama namun dibedakan oleh gengsi badan sertifikasinya", icon: "🏷️", correct: false }
                    ],
                    explanation: "**HACCP** didesain khusus mendeteksi bahaya kontaminasi akut agar bisa dicerna tenggorokan konsumen dengan aman.\n\nSementara **ISO 9001** adalah instrumen Kerangka Administrasi generik yang meliputi kepuasan pelanggan dari aspek penjualan, administrasi rekruitmen HR, pembelanjaan logistik, dan respon garansi keluhan.",
                    nextLabel: "Lanjut →"
                  },
                  // 3. KONSEP: Explorer
                  {
                    type: "explorer",
                    instruction: "Peta Navigasi Mutu: Klik setiap kartu spesifik untuk meraba batas spesialisasi antar standar ternama pada industri makanan/kesehatan:",
                    xp: 30,
                    categories: [
                      {
                        id: "iso9001",
                        label: "ISO 9001 (QMS)",
                        icon: "🏢",
                        color: COLORS.primary,
                        desc: "Fokus Utuh: Sistem Manajemen Mutu Global secara komprehensif mengawal proses berkelanjutan.",
                        examples: [
                          { icon: "🌍", text: "Relevan bagi seluruh entitas/industri manufaktur & jasa." },
                          { icon: "📊", text: "Menyoroti interaksi makro lintas-divisi dan PDCA." }
                        ]
                      },
                      {
                        id: "gmp",
                        label: "GMP / CPOTB",
                        icon: "🥼",
                        color: COLORS.plan,
                        desc: "Good Manufacturing Practice. Fokus Utuh: Tata Cara Produksi Bersih yang Menjamin Mutu Dasar.",
                        examples: [
                          { icon: "🏭", text: "Ketentuan higienitas sarana prasarana lantai pabrik." },
                          { icon: "🧼", text: "Standarisasi seragam karyawan pekerja kontak langsung." }
                        ]
                      },
                      {
                        id: "haccp",
                        label: "HACCP",
                        icon: "🔬",
                        color: COLORS.do,
                        desc: "Fokus Utuh: Pertahanan Keamanan Pangan Khusus untuk meredam bahaya konsumsi.",
                        examples: [
                          { icon: "🧪", text: "Identifikasi racun (Biologi, Kimia, Fisik)." },
                          { icon: "🛑", text: "Pencegahan dan eliminasi ke Titik Kritis Penentu (CCP)." }
                        ]
                      },
                      {
                        id: "iso22000",
                        label: "ISO 22000",
                        icon: "🍽️",
                        color: COLORS.check,
                        desc: "Food Safety Management System. Fokus Utuh: Sistem Manajemen Keamanan Skala Atas.",
                        examples: [
                          { icon: "🧩", text: "Mengintegrasikan HACCP ke dalam kerangka ISO makro." },
                          { icon: "🛡️", text: "Manajemen rantai pasok dan kebersihan pangan holistik." }
                        ]
                      }
                    ],
                    feedback: {
                      insight: "Sangat baik memahami batas kompetensi masing-masing sertifikat di rantai distribusi organisasi.",
                      next: "Uji Pemahaman Kasus →"
                    }
                  },
                  // 4. SOAL PENGUATAN: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "💊",
                      label: "Studi Kasus Farmasi",
                      text: "Produsen obat-obatan 'PT Sehat Selalu' secara heroik sukses merengkuh ISO 9001. Saat ditinjau setahun berselang oleh wakil BPOM, Auditor tetap merekomendasikan perusahaan mendirikan landasan regulasi operasional merujuk sertifikasi GMP.\n\nRespons tata kelola terbijaksana manajemen?",
                      highlightColor: COLORS.do
                    },
                    xp: 35,
                    options: [
                      { id: "a", text: "\"Tidak perlu disegerakan, kami bersertifikat ISO 9001 yang telah mem-bypass kewajiban GMP secara hierarki.\"", icon: "🙅", correct: false, feedback: "Sangat salah. ISO 9001 tidak mengajarkan cara menyaring kontaminan kapsul farmasi sedalam anjuran praktis GMP." },
                      { id: "b", text: "\"Kami akan menelaah GMP dan mengintegrasikannya ke urat nadi QMS yang beroperasi, keduanya menyelaraskan kinerja yang harmoni.\"", icon: "🤝", correct: true },
                      { id: "c", text: "\"GMP akan segera memberangus sisa tata kelola ISO 9001 kita besok, karena ini farmasi, mari singkirkan ISO sepenuhnya.\"", icon: "🔄", correct: false, feedback: "Meskipun GMP esensial mengatur obat, mereka sama sekali tak membicarakan sistem komersial penentuan klausal pelanggan seefektif pedoman ISO." },
                      { id: "d", text: "\"Derajat ISO 9001 ini mahkota pergaulan internasional pak, tidak elok digeneralisir sekelas GMP lokal.\"", icon: "📉", correct: false, feedback: "Ini argumentasi yang amat berbahaya dari sudut pandang ketaatan hukum." }
                    ],
                    explanation: "Di ranah sensitif seperti farmasi, **GMP (CPOTB/CPOB)** merupakan elemen kemestian regulasi *mandatory* dari tata aturan Negara / Institusi pengawas obat.\n\nStandar-standar ini memberikan batasan teknik *apa saja detail yang secara praktis dieksekusi steril*. Kemudian, **ISO 9001** memberikan rancang bangun manajemennya berupa fondasi berfikir *bagaimana cara mengontrol, mencatat, melatihkan, serta mengevaluasi GMP kita agar abadi dan konsisten*.",
                    nextLabel: "Temukan Resolusi Analogi →"
                  },
                  // 5. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman Analogi (Fondasi & Ruangan)",
                    text: "• **Analogi Penguatan Rumah:** Mari bersepakat membayangkan ISO 9001 adalah fondasi cor beton pilar infrastruktur dari rumah itu. Sementara kehadiran standar spesialis lainnya layaknya HACCP / GMP adalah *Ruang Tindakan Bedah Rumah Sakit* atau *Dapur Bersih Restoran* yang didirikan di atas fondasi beton tersebut.\n\n• **Dua Kutub Bersinergi:** ISO 9001 menjaga navigasi *sustainability* dan kelangsungan efektivitas internal jangka panjang organisasi. Sedangkan GMP memplot perlakuan sterilisasi fasilitas yang tepat untuk produk rentan pada satu titik saat spesifik.\n\n• **Kesimpulan Universal:** Kemunculan norma teknis dan regulasi per-industeri mana pun ada **untuk dibaurkan / melengkapi** instrumen pengokohan QMS, *bukan saling mengunci apalagi saling eksklusif untuk dipolarkan*. Sangat logis organisasi menyandang multipel sertifikasi ini sekaligus.",
                    xp: 0
                  },
                  // 6. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 7. QUIZ 1
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🕵️",
                      label: "Kuis Analisis 1 / 3",
                      text: "Pabrik sari apel telah membuahkan rekor tidak ada patogen dan nol kontaminasi toksik kimia lewat validasi penerapan sertifikat **HACCP** murni seratus persen.\nNamun, akhir-akhir ini gudang kelabakan akibat faktur kiriman sering nyangkut, pelaporan dokumen audit finansial compang-camping, dan HRD lupa memproses kenaikan jenjang karir manajer QA.\n\nMengapa selimut dewa pengaman dari metode HACCP itu terkesan tidak bekerja di ranah krusial luar ini?",
                      highlightColor: COLORS.plan
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "Karena HACCP itu spesialis *Food Safety Protection*, radiusnya hanya berada pada urusan menjamin agar perut pelanggan konsumen tidak keracunan", icon: "🎯", correct: true },
                      { id: "b", text: "Karena mereka keliru menganggap HACCP butuh standar pelengkap GMP yang belum lulus sertifikasi", icon: "🔗", correct: false },
                      { id: "c", text: "Manajemen perlu memperketat Titik Pengendalian Kritis (CCP) agar rekrutmen staff HRD tunduk terhadap tes biologis HACCP", icon: "🌡️", correct: false }
                    ],
                    explanation: "Kelemahan peruntukan instrumen spesifik adalah daya redam vertikal. Meskipun apelnya dijamin brilian dan tak mematikan pelanggan (HACCP), tatkala instrumen layanan aduan dan pendistribusian tidak diorkestrasi standar (absennya QMS / ISO 9001), maka bisnis itu secara makro tidak kompeten melangkahi disrupsi dan rentan kekacauan logistik administrasi.",
                    nextLabel: "Soal Berikutnya →"
                  },
                  // 8. QUIZ 2
                  {
                    type: "mcq",
                    scenario: {
                      icon: "2️⃣",
                      label: "Kuis Analisis 2 / 3",
                      text: "Manakah perumpamaan di bawah ini yang paling tepat menggambarkan **perbedaan peran** antara ISO 9001 dan GMP?",
                      highlightColor: COLORS.do
                    },
                    xp: 35,
                    options: [
                      { id: "a", text: "ISO 9001 ibarat *Sistem Jantung & Darah* yang mengatur perputaran seluruh organisasi, sedangkan GMP adalah *Kulit Pelindung Luar* yang bertugas mensterilkan lingkungan produksi", icon: "🧠", correct: true },
                      { id: "b", text: "ISO 9001 diciptakan khusus menangani standar pabrik alat medis, dan GMP diperuntukkan bagi prosedur bengkel komponen kapal terbang", icon: "🛩️", correct: false },
                      { id: "c", text: "Keduanya cuman beda nama, murni akal-akalan peristilahan barat saja untuk menyamai Standar Nasional Indonesia (SNI)", icon: "🇮🇩", correct: false }
                    ],
                    explanation: "**Sistem Manajemen Mutu (ISO 9001)** fokus membangun napas *sistem penggerak internal* (seperti mesin/organ vital) yang menyatukan alur kerja semua divisi perusahaan secara administratif.\n\nSebaliknya, **GMP** adalah lapisan luar pelindung pabrik (kulit), berfokus khusus pada tindakan fisik dan higienitas pekerja agar debu/kuman tidak mencemari fasilitas harian.",
                    nextLabel: "Soal Terakhir →"
                  },
                  // 9. QUIZ 3
                  {
                    type: "mcq",
                    scenario: {
                      icon: "3️⃣",
                      label: "Kuis Analisis 3 / 3",
                      text: "Sesaat pasca keberhasilan rumah sakit meraih status kualifikasi ISO 9001 terkini, majelis direksi lalu merilis surat keputusan bernada provokatif yang memerintahkan:\n**\"Seluruh aktivitas tenaga perawat dibebastugaskan secara serentak dari kepatuhan kode UU Kesehatan Negara, dikarenakan ISO 9001 telah melegitimasi seluruh otoritas kualitas internal hierarki kita secara privat!\"**\n\nBagaimana prespektif landasan pedoman rujukan sistem ISO sendiri memandang kebijakan aneh ini?",
                      highlightColor: COLORS.check
                    },
                    xp: 35,
                    options: [
                      { id: "a", text: "Skenario valid & legal secara hukum tata negara di era persaingan global", icon: "📉", correct: false },
                      { id: "b", text: "Pelanggaran radikal! ISO 9001 menegaskan kepatuhan asasi terhadap persayaratan regulasi pemerintah yang tunduk (Statutory & Regulatory Requirements)", icon: "🛡️", correct: true }
                    ],
                    explanation: "Kepatuhan mutlak! Klausul ISO 9001 sedari era pendiriannya justru menuntut secara esensial bahwasanya segala kebijakan organisasi mutlak menjamin pemeliharan persyaratan undang-undang, hukum dan tata negara berdasar regulasi kementrian manapun yang merantai kegiatan produksi (CPKB, CPOB, CPHB, dll). Sertifikasi mandiri adalah aliansi harmonis birokrasi, sama sekali bukan dokumen pemberontak / superior lepas hukum dari kedaulatan peraturan pemerintahan RI.",
                    nextLabel: "Lihat Hasil Akhir"
                  },
                  // 10. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Pencapaian sempurna yang krusial! Pemahaman berkaliber ini membekalimu visi tajam sebagai ahli penggerak arsitektur keorganisasian untuk mampu dengan tanggap mencegah benturan kesalahpahaman standardisasi silang pada saat kelak bertugas langsung meracik kualitas proses di Industri yang memiliki kompleksitas birokrasi tinggi.",
                      next: "Lanjut",
                    }
                  }
                ],
              },
              {
                id:       "pengecualian-syarat",
                title:    "Mengidentifikasi persyaratan yang dapat dikecualikan (exclusion)",
                icon:     "✂️",
                duration: "5 menit",
                slides: [
                  // 1. HOOK: Scenario Chaos
                  {
                    type: "scenario_chaos",
                    xp: 20,
                    scenario: "Perusahaan konsultan Anda tidak punya proses desain produk — semua layanan standar, tidak ada kustomisasi.\n\n**Bolehkah Anda \"skip\" klausul tentang desain saat implementasi ISO 9001? Apakah semua klausul wajib untuk semua organisasi?**",
                    question: "Bagaimana menurut Anda?",
                    options: [
                      { id: "ya", label: "Ya, saya bisa \"skip\" (mengecualikan) yang tidak relevan", icon: "✂️", isCorrect: true, feedback: "Tepat! ISO 9001 itu realistis. Jika memang tidak ada prosesnya, Anda wajar untuk mengecualikannya." },
                      { id: "tidak", label: "Tidak, semua klausul ISO 9001 itu harga mati wajib", icon: "🔒", isCorrect: false, feedback: "Miskonsepsi besar. ISO 9001 bukanlah jaket yang memaksakan satu ukuran untuk semua tubuh." }
                    ]
                  },
                  // 2. COBA DULU: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "🤔",
                      label: "Coba Dulu",
                      text: "Klausul mana dalam ISO 9001:2015 yang **BISA** dikecualikan?",
                      highlightColor: COLORS.plan
                    },
                    xp: 25,
                    options: [
                      { id: "a", text: "Klausul 4 (Konteks Organisasi) — jika masih baru berdiri", icon: "🏢", correct: false },
                      { id: "b", text: "Klausul 6 (Perencanaan) — jika skala kecil", icon: "📉", correct: false },
                      { id: "c", text: "Sebagian Klausul 8 (Operasional) — jika persyaratan tertentu tidak relevan prosesnya", icon: "✅", correct: true },
                      { id: "d", text: "Klausul 9 (Evaluasi) — jika kinerja sudah baik", icon: "📊", correct: false }
                    ],
                    explanation: "Hanya persyaratan dalam **Klausul 8 (Operasional)** yang dapat dikecualikan.\n\nKlausul 4, 5, 6, 7, 9, dan 10 adalah kerangka sistem akar yang mutlak **WAJIB** dibangun oleh semua organisasi tanpa pengecualian.",
                    nextLabel: "Pelajari Konsepnya →"
                  },
                  // 3. KONSEP: Explorer (3 Syarat)
                  {
                    type: "explorer",
                    instruction: "Klausul 8 yang tidak relevan dengan ruang lingkup QMS bisa dikecualikan — bukan karena *tidak ingin*, melainkan *faktual tidak ada aktivitasnya*.\\n\\*(Contoh: Perusahaan jasa murni mengecualikan **8.3 Desain & Pengembangan**)*\\n\\n**Buka setiap kartu 3 Syarat Exclusion yang sah:**",
                    xp: 25,
                    categories: [
                      { 
                        id: "scope", label: "1. Dinyatakan di Scope", icon: "📝", color: COLORS.plan,
                        desc: "Harus dideklarasikan dengan formal dan tegas dalam dokumen Lingkup (Scope) QMS perusahaan.",
                        examples: [
                          { icon: "📄", text: "Tertulis hitam di atas putih dalam Manual Mutu: \"Klausul 8.3 dikecualikan karena pabrik memproduksi barang murni berdasarkan blue-print klien.\"" }
                        ]
                      },
                      { 
                        id: "impact", label: "2. Tak Berdampak Negatif", icon: "🛡️", color: COLORS.do,
                        desc: "Terbukti **tidak mempengaruhi** kemampuan organisasi untuk memenuhi persyaratan dan ekspektasi pelanggan.",
                        examples: [
                          { icon: "🚚", text: "Meniadakan riset desain produk di sebuah distributor obat tidak akan mengebiri kecepatan dan akurasi layanan armada kurir mereka." }
                        ]
                      },
                      { 
                        id: "justify", label: "3. Ada Justifikasi", icon: "⚖️", color: COLORS.act,
                        desc: "Ada justifikasi terdokumentasi akal sehat, bukan sekadar pelarian 'tidak mau ribet' dari tanggung jawab.",
                        examples: [
                          { icon: "🏢", text: "Log pengecualian mencatat: \"Organisasi adalah agen franchise ritel yang seluruh layanannya didekte kantor pusat, sehingga kuasa mendesain fitur ditiadakan.\"" }
                        ]
                      }
                    ],
                    feedback: { next: "Lihat Rangkuman →" }
                  },
                  // 4. TAKEAWAY
                  {
                    type: "takeaway",
                    title: "Rangkuman: Syarat Pengecualian Klausul",
                    text: "• **Realita Bisnis:** Klausul ISO dilarang dicoret sekadar karena segan atau dirasa merepotkan. Pengecualian mutlak didasarkan alasan karena memang iklim proses spesifik tersebut 100% absen di lantai kerja bisnis Anda.\n\n• **Terbatas di Operasional:** Pengecualian cuma sah diterapkan pada poin-poin teknikal di **Klausul 8 (Operasional)**. Poin evaluasi kinerja internal (Klausul 9) adalah tiang agama perusahaan yang tidak bisa gugur.\n\n• **Tiga Pilar Eksklusi Paten:** Anda wajib mengetikkannya ke dalam Dokumen *Scope*, menjaminkan pemotongan syarat itu tidak melukai kepuasan *customer*, dan terakhir menyertakan *Justifikasi Operasional* di atas kertas tebal.",
                    xp: 0
                  },
                  // 5. INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // 6. SOAL + FEEDBACK: MCQ
                  {
                    type: "mcq",
                    scenario: {
                      icon: "💊",
                      label: "Studi Kasus Eksekusi",
                      text: "Perusahaan distributor obat mengecualikan **Klausul 8.3 (Design and Development)** karena beralasan: \n\n*\"Kami 100% tidak melakukan desain produk baru. Secara spesifik kami hanya mendistribusikan produk kardus yang sudah ada rupa fisiknya.\"*\n\nApakah langkah pengecualian (*exclusion*) ini legal dan sah di mata auditor?",
                      highlightColor: COLORS.do
                    },
                    xp: 40,
                    options: [
                      { id: "a", text: "Tidak sah — distributor di skena industri logistik medis tetap diwajibkan menyertakan proses perancangan desain", icon: "❌", correct: false },
                      { id: "b", text: "Sah — justifikasi riil, kemandekan merancang tidak mengebiri kemampuan kepuasan pendelegasian barang", icon: "✅", correct: true },
                      { id: "c", text: "Tidak sah — tiada persyaratan Klausul 8 yang bersifat kondusional *optional* untuk korporasi kritikal farmasi", icon: "⚠️", correct: false },
                      { id: "d", text: "Sah — manajemen puncak terbukti pada hakikatnya memegang kuasa bebas untuk mencoret klausul apa saja selama didokumentasikan", icon: "🤷", correct: false }
                    ],
                    explanation: "Pembebasan klausul 8.3 ini **SAH**. Keputusan direksi berhasil memenuhi trinitas bersyarat secara utuh: terdokumentasi secara spesifik dalam klausul dokumen ruang lingkup *(Scope)*, alasannya dihidupi fakta yang relevan operasional, dan manuver ini nihil memangkas garansi memuaskan kebutuhan logistik harian *customer*.\n\nIni bukan manipulasi pencarian celah hukum, tetapi **pengakuan realita dan kejujuran operasional**.",
                    nextLabel: "Selesaikan Pelajaran →"
                  },
                  // 7. SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      insight: "Sempurna! Kamu telah khatam dan menyerap habis seluk-beluk pembedahan klausul ISO 9001 ala *Master Auditor* mutahir. Lencana Kelulusan ada di tanganmu!",
                      next: "Selesai",
                    }
                  }
                ],
              },
            ],
          },
          // ───────────────────────────────────────────────────────────
          // LESSON 2: Acuan Normatif
          // ───────────────────────────────────────────────────────────
          {
            id:    "acuan-normatif",
            title: "Acuan Normatif (Klausul 2)",
            icon:  "📚",
            color: COLORS.do,
            subLessons: [
              {
                id:       "memahami-fungsi-acuan-normatif",
                title:    "Memahami fungsi acuan normatif dalam sebuah standar",
                icon:     "🔍",
                duration: "5 menit",
                slides: [
                  // SLIDE 1: BookSelectWidget
                  {
                    type: "book_select",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Tap untuk pilih",
                      text: "Tap buku yang WAJIB ada untuk mengimplementasikan ISO 9001"
                    },
                    books: [
                      { id: "9001", labelTop: "ISO", labelBottom: "9001", width: 64, height: 100, gradient: "linear-gradient(to top, #1e3a8a, #3b82f6)", correct: true },
                      { id: "9000", labelTop: "ISO", labelBottom: "9000", width: 54, height: 84, gradient: "linear-gradient(to top, #064e3b, #10b981)", correct: true },
                      { id: "31000", labelTop: "ISO", labelBottom: "31000", width: 46, height: 72, gradient: "linear-gradient(to top, #4c1d95, #8b5cf6)", correct: false },
                      { id: "19011", labelTop: "ISO", labelBottom: "19011", width: 50, height: 78, gradient: "linear-gradient(to top, #78350f, #f59e0b)", correct: false },
                      { id: "14001", labelTop: "ISO", labelBottom: "14001", width: 44, height: 68, gradient: "linear-gradient(to top, #14532d, #22c55e)", correct: false }
                    ],
                    feedbackCorrect: "Tepat! ISO 9001 (standar utama yang disertifikasi) dan ISO 9000 (satu-satunya acuan normatif — kamus resmi istilah QMS). Standar lain berguna tapi bukan acuan normatif ISO 9001.",
                    feedbackWrong: "Yang wajib: ISO 9001 sebagai standar utama dan ISO 9000 sebagai acuan normatifnya. Keduanya tidak bisa dipisahkan."
                  },
                  // SLIDE 2: WordChipsWidget
                  {
                    type: "word_chips",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Tap untuk pilih",
                      text: "Tap satu kata yang tepat menggambarkan status ISO 9000 dalam ISO 9001"
                    },
                    instruction: "Hanya satu jawaban yang benar.",
                    options: [
                      { id: "w1", text: "Normatif", correct: true, feedback: "Tepat! 'Normatif' artinya wajib dirujuk — bukan sekadar rekomendasi. Ini kata resmi yang digunakan ISO 9001 untuk mendeskripsikan status ISO 9000." },
                      { id: "w2", text: "Opsional", correct: false, feedback: "ISO 9000 bukan sekadar pilihan — statusnya lebih kuat dari itu." },
                      { id: "w3", text: "Informatif", correct: false, feedback: "Informatif berarti disarankan, bukan wajib. Status ISO 9000 lebih kuat dari ini." },
                      { id: "w4", text: "Komplementer", correct: false, feedback: "Komplementer berarti pelengkap opsional. ISO 9000 posisinya lebih dari sekadar pelengkap." },
                      { id: "w5", text: "Suplemental", correct: false, feedback: "Suplemental berarti tambahan opsional — bukan istilah resmi ISO untuk menggambarkan status ISO 9000." },
                      { id: "w6", text: "Wajib beli", correct: false, feedback: "Ini bukan istilah teknis standar ISO. Ada kata yang lebih tepat dan resmi." }
                    ]
                  },
                  // SLIDE 3: OptionListWidget
                  {
                    type: "option_list",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Tap untuk pilih",
                      text: "Tap satu yang BUKAN sumber definisi yang sah untuk dokumen QMS"
                    },
                    options: [
                      { id: "o1", icon: "📖", text: "ISO 9000:2015 — definisi klausul 3.x.x", correct: false, revealState: "valid", feedback: "Belum tepat. Yang bukan sumber sah adalah KBBI. Istilah teknis ISO punya makna khusus dalam ISO 9000 yang bisa berbeda dari penggunaan sehari-hari di KBBI." },
                      { id: "o2", icon: "🌐", text: "Website resmi ISO — mengutip definisi dari ISO 9000:2015", correct: false, revealState: "valid", feedback: "Belum tepat. Yang bukan sumber sah adalah KBBI." },
                      { id: "o3", icon: "📚", text: "Kamus Besar Bahasa Indonesia (KBBI)", correct: true, revealState: "invalid", feedback: "Tepat! KBBI bukan sumber yang sah untuk istilah teknis ISO. Istilah seperti 'rekaman' atau 'ketidaksesuaian' punya makna teknis khusus dalam ISO 9000 yang berbeda dari penggunaan sehari-hari." },
                      { id: "o4", icon: "🎓", text: "Pelatihan ISO resmi yang bersumber dari ISO 9000:2015", correct: false, revealState: "valid", feedback: "Belum tepat. Yang bukan sumber sah adalah KBBI." }
                    ]
                  },
                  // SLIDE 4: ClassifyListWidget
                  {
                    type: "classify_list",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Tap untuk pilih",
                      text: "Tap semua situasi yang MEMBUTUHKAN rujukan ke ISO 9000:2015",
                      feedbackCorrect: "Sempurna! ISO 9000 wajib dirujuk saat menggunakan atau mendefinisikan istilah teknis QMS (rekaman, proses, dll). Tidak diperlukan untuk keputusan operasional yang tidak menyangkut terminologi standar.",
                      feedbackWrong: "Ada yang terlewat. ISO 9000 wajib dirujuk saat mendefinisikan atau menggunakan istilah teknis QMS (A, C, E). Untuk keputusan operasional umum seperti jadwal rapat atau warna seragam, tidak perlu."
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "A", text: "Menulis definisi \"rekaman\" di prosedur pengendalian dokumen", correct: true, badgeText: "WAJIB RUJUK" },
                      { id: "B", text: "Menentukan jadwal rapat tinjauan manajemen", correct: false },
                      { id: "C", text: "Menjelaskan arti \"proses\" kepada tim operasional baru", correct: true, badgeText: "WAJIB RUJUK" },
                      { id: "D", text: "Memilih warna seragam karyawan untuk SOP visual", correct: false },
                      { id: "E", text: "Menulis klausul definisi di Manual Mutu perusahaan", correct: true, badgeText: "WAJIB RUJUK" }
                    ]
                  },
                  // SLIDE 5: MATERI INTI (Accordion)
                  {
                    type: "accordion_materi",
                    xp: 0
                  },
                  // SLIDE 5.5: PEMISAH
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6: YesNoWidget 5
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0F766E",
                      label: "Ya atau Tidak?",
                      text: "Membuat kamus istilah internal QMS otomatis melanggar acuan normatif ISO 9000?",
                      htmlContext: `
                        <div style="background: #F1F5F9; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 16px;">
                          <div style="font-size: 40px; margin-bottom: 8px;">📝</div>
                          <div style="font-weight: bold; font-size: 16px; color: #1E293B;">Kamus Istilah Internal QMS</div>
                          <div style="font-size: 13px; color: #64748B; margin-top: 4px;">Dibuat tim sendiri untuk memudahkan karyawan</div>
                        </div>
                      `
                    },
                    options: [
                      { id: "no", icon: "🙅", label: "Tidak", subLabel: "Kamus internal boleh ada", correct: true, feedback: "Tepat! Kamus internal boleh dibuat — bahkan dianjurkan untuk memudahkan karyawan. Yang tidak boleh: jika definisi di kamus internal berbeda dengan ISO 9000. Kamus internal harus membangun di atas ISO 9000, bukan menggantikannya." },
                      { id: "yes", icon: "✋", label: "Ya", subLabel: "Kamus internal dilarang", correct: false, feedback: "Belum tepat. Kamus internal boleh dibuat dan bahkan membantu. Yang melanggar bukan pembuatannya, tapi jika isinya berbeda dari atau menggantikan definisi di ISO 9000." }
                    ]
                  },
                  // SLIDE 7: YesNoWidget 6
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0F766E",
                      label: "Ya atau Tidak?",
                      text: "Apakah semua klausul definisi di atas sudah menggunakan sumber yang benar?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; margin-bottom: 16px;">
                          <div style="background: #334155; padding: 8px 16px; display: flex; align-items: center; gap: 8px;">
                            <div style="display: flex; gap: 4px;">
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EF4444;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EAB308;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #22C55E;"></div>
                            </div>
                            <div style="color: #CBD5E1; font-size: 12px; font-weight: 500; margin-left: 8px;">Prosedur PM-012 · Klausul 3 — Definisi</div>
                          </div>
                          <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
                            <div><span style="color: #2563EB; font-weight: bold;">3.1</span> "Keluhan" mengacu pada <span style="color: #166534; font-weight: bold;">ISO 9000:2015 klausul 3.9.3</span></div>
                            <div><span style="color: #2563EB; font-weight: bold;">3.2</span> "Rekaman" mengacu pada <span style="color: #B91C1C; text-decoration: underline wavy;">KBBI edisi terbaru</span></div>
                            <div><span style="color: #2563EB; font-weight: bold;">3.3</span> "Proses" mengacu pada <span style="color: #166534; font-weight: bold;">ISO 9000:2015 klausul 3.4.1</span></div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "no", icon: "🙅", label: "Tidak", subLabel: "Ada klausul yang salah", correct: true, feedback: "Tepat! Klausul 3.2 bermasalah — mendefinisikan 'rekaman' dari KBBI, bukan dari ISO 9000:2015. Istilah teknis ISO punya makna khusus yang bisa berbeda dari penggunaan sehari-hari dalam KBBI." },
                      { id: "yes", icon: "👍", label: "Ya", subLabel: "Semua sudah benar", correct: false, feedback: "Belum tepat. Perhatikan klausul 3.2 — menggunakan KBBI sebagai sumber definisi 'rekaman'. Istilah teknis ISO harus selalu merujuk ke ISO 9000:2015, bukan kamus bahasa umum." }
                    ]
                  },
                  // SLIDE 8: YesNoWidget 7
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0F766E",
                      label: "Ya atau Tidak?",
                      text: "ISO 19011 bisa menggantikan peran ISO 9000 karena sama-sama dokumen resmi ISO?",
                      htmlContext: `
                        <div style="background: #F1F5F9; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                          <div style="background: #CCFBF1; padding: 12px 16px; border-radius: 12px; text-align: center; width: 40%;">
                            <div style="font-size: 10px; color: #0F766E; font-weight: bold; letter-spacing: 1px;">ACUAN NORMATIF</div>
                            <div style="font-size: 18px; color: #0F766E; font-weight: 900;">ISO 9000</div>
                          </div>
                          <div style="font-size: 24px; color: #94A3B8; font-weight: bold;">≠</div>
                          <div style="background: #E2E8F0; padding: 12px 16px; border-radius: 12px; text-align: center; width: 40%;">
                            <div style="font-size: 10px; color: #475569; font-weight: bold; letter-spacing: 1px;">PANDUAN AUDIT</div>
                            <div style="font-size: 18px; color: #475569; font-weight: 900;">ISO 19011</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "no", icon: "🙅", label: "Tidak bisa", subLabel: "Fungsi dan statusnya berbeda", correct: true, feedback: "Tepat! ISO 9001 secara eksplisit hanya mencantumkan ISO 9000 sebagai acuan normatif — bukan ISO 19011. ISO 19011 adalah panduan audit sistem manajemen, fungsinya berbeda. Tidak semua dokumen ISO bisa saling menggantikan." },
                      { id: "yes", icon: "👍", label: "Bisa", subLabel: "Sama-sama dokumen ISO", correct: false, feedback: "Belum tepat. ISO 19011 adalah panduan untuk melakukan audit — bukan kamus istilah. Hanya ISO 9000 yang secara resmi ditetapkan sebagai acuan normatif ISO 9001. Status normatif tidak otomatis berlaku untuk semua dokumen ISO." }
                    ]
                  },
                  // SLIDE 9: YesNoWidget 8
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0F766E",
                      label: "Ya atau Tidak?",
                      text: "Apakah kondisi di atas merupakan temuan yang valid dalam audit ISO 9001?",
                      htmlContext: `
                        <div style="background: #EFF6FF; border-left: 4px solid #1E3A8A; padding: 16px; border-radius: 0 12px 12px 0; margin-bottom: 16px; font-size: 13px; line-height: 1.5; color: #1E293B;">
                          <span style="font-weight: bold; color: #1E3A8A;">Kondisi:</span> Kamus Internal QMS mendefinisikan <span style="font-style: italic;">"rekaman"</span> sebagai <span style="font-style: italic;">"semua berkas yang disimpan oleh departemen QMS"</span> — lebih luas dari definisi ISO 9000 yang menyatakan rekaman adalah bukti spesifik dari kegiatan yang dilakukan.
                        </div>
                      `
                    },
                    options: [
                      { id: "yes", icon: "✅", label: "Ya, valid", subLabel: "Definisi tidak selaras ISO 9000", correct: true, feedback: "Tepat! Ini temuan yang valid. Kamus internal mendefinisikan 'rekaman' lebih luas dari ISO 9000 — ini bisa menyebabkan inkonsistensi implementasi. Misalnya: item yang seharusnya bukan rekaman diperlakukan seperti rekaman, atau sebaliknya. Definisi di kamus internal harus selaras dengan ISO 9000." },
                      { id: "no", icon: "🙅", label: "Tidak valid", subLabel: "Kamus internal boleh berbeda", correct: false, feedback: "Belum tepat. Kamus internal yang mendefinisikan istilah secara berbeda dari ISO 9000 adalah temuan yang valid — karena bisa menyebabkan implementasi QMS yang tidak konsisten dengan standar. Kamus internal boleh ada, tapi harus selaras dengan ISO 9000, bukan berbeda." }
                    ]
                  },
                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai",
                      insight: "Anda sudah memahami fungsi acuan normatif dan cara menerapkannya dalam dokumen QMS.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "\"Normatif\" = wajib dirujuk, bukan opsional",
                        "ISO 9000:2015 adalah satu-satunya acuan normatif ISO 9001",
                        "Sumber definisi istilah teknis QMS harus ISO 9000, bukan KBBI",
                        "Kamus internal boleh ada — tapi harus selaras, bukan menggantikan ISO 9000"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              // ───────────────────────────────────────────────────────────
              // SUB-LESSON 2: Mengenal ISO 9000:2015
              // ───────────────────────────────────────────────────────────
              {
                id:       "mengenal-iso-9000-kamus-resmi",
                title:    "Mengenal ISO 9000:2015 sebagai kamus resmi QMS",
                icon:     "📘",
                duration: "6 menit",
                slides: [
                  // SLIDE 1: ClassifyListWidget
                  {
                    type: "classify_list",
                    xp: 30,
                    scenario: {
                      icon: "1",
                      label: "Tap untuk pilih",
                      text: "Tap semua yang termasuk isi dari ISO 9000:2015",
                      feedbackCorrect: "Sempurna! ISO 9000:2015 berisi: prinsip manajemen mutu, konsep dasar sistem manajemen, hubungan antar konsep, dan 130+ definisi istilah teknis. Langkah audit ada di ISO 19011, persyaratan wajib ada di ISO 9001, metode statistik ada di ISO/TR 10017.",
                      feedbackWrong: "Ada yang terlewat. ISO 9000 berisi fondasi dan kosakata — bukan persyaratan (itu ISO 9001), bukan langkah audit (itu ISO 19011), bukan metode statistik (itu ISO/TR 10017)."
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "opt1", text: "7 Prinsip Manajemen Mutu", correct: true, badgeText: "TERMASUK" },
                      { id: "opt2", text: "Definisi 130+ istilah teknis QMS", correct: true, badgeText: "TERMASUK" },
                      { id: "opt3", text: "Langkah-langkah melakukan audit sertifikasi", correct: false, badgeText: "Bukan" },
                      { id: "opt4", text: "Konsep dasar tentang sistem manajemen", correct: true, badgeText: "TERMASUK" },
                      { id: "opt5", text: "Persyaratan wajib QMS yang harus dipenuhi", correct: false, badgeText: "Bukan" },
                      { id: "opt6", text: "Hubungan antar konsep dalam sistem mutu", correct: true, badgeText: "TERMASUK" },
                      { id: "opt7", text: "Metode statistik untuk analisis data mutu", correct: false, badgeText: "Bukan" },
                      { id: "opt8", text: "Fondasi dan kosakata yang berlaku lintas standar ISO", correct: true, badgeText: "TERMASUK" }
                    ]
                  },
                  // SLIDE 2: WordChipsWidget
                  {
                    type: "word_chips",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Tap untuk pilih",
                      text: "Tap semua istilah yang PASTI ada definisinya di ISO 9000:2015"
                    },
                    instruction: "Bisa lebih dari satu.",
                    options: [
                      { id: "wc1", text: "Pelanggan (customer)", correct: true },
                      { id: "wc2", text: "Rekaman (record)", correct: true },
                      { id: "wc3", text: "Tarif bea cukai", correct: false, feedback: "Tarif bea cukai bukan ranah QMS." },
                      { id: "wc4", text: "Ketidaksesuaian (nonconformity)", correct: true },
                      { id: "wc5", text: "Indeks harga konsumen", correct: false, feedback: "Indeks harga tidak masuk ranah QMS." },
                      { id: "wc6", text: "Proses (process)", correct: true },
                      { id: "wc7", text: "Rasio keuangan perusahaan", correct: false, feedback: "Standar ini tak mengatur keuangan finansial." },
                      { id: "wc8", text: "Audit", correct: true },
                      { id: "wc9", text: "Prosedur (procedure)", correct: true }
                    ]
                  },
                  // SLIDE 3: ClassifyListWidget
                  {
                    type: "classify_list",
                    xp: 30,
                    scenario: {
                      icon: "3",
                      label: "Tap untuk pilih",
                      text: "Tap semua yang termasuk dalam kelompok '7 Prinsip Manajemen Mutu' di ISO 9000:2015",
                      feedbackCorrect: "Sempurna! 7 Prinsip Manajemen Mutu ISO 9000: Fokus pelanggan, Kepemimpinan, Keterlibatan orang, Pendekatan proses, Perbaikan berkelanjutan, Pengambilan keputusan berbasis bukti, Manajemen hubungan. Ketiga yang salah bukan prinsip QMS — sertifikasi adalah hasil, bukan tujuan.",
                      feedbackWrong: "Belum semua tepat. 7 prinsip ISO 9000 berfokus pada bagaimana organisasi berjalan dengan baik untuk pelanggan dan stakeholder — bukan pada target finansial, sertifikasi, atau efisiensi biaya semata."
                    },
                    instruction: "Ada 7 prinsip. Tap semua yang benar.",
                    options: [
                      { id: "p1", text: "Fokus pada pelanggan", correct: true, badgeText: "PRINSIP" },
                      { id: "p2", text: "Kepemimpinan", correct: true, badgeText: "PRINSIP" },
                      { id: "p3", text: "Maksimalkan keuntungan finansial", correct: false, badgeText: "Bukan" },
                      { id: "p4", text: "Keterlibatan orang", correct: true, badgeText: "PRINSIP" },
                      { id: "p5", text: "Pendekatan proses", correct: true, badgeText: "PRINSIP" },
                      { id: "p6", text: "Perbaikan berkelanjutan", correct: true, badgeText: "PRINSIP" },
                      { id: "p7", text: "Pengambilan keputusan berbasis bukti", correct: true, badgeText: "PRINSIP" },
                      { id: "p8", text: "Manajemen hubungan", correct: true, badgeText: "PRINSIP" },
                      { id: "p9", text: "Sertifikasi sebagai tujuan utama", correct: false, badgeText: "Bukan" },
                      { id: "p10", text: "Efisiensi biaya operasional", correct: false, badgeText: "Bukan" }
                    ]
                  },
                  // SLIDE 4: ClassifyListWidget
                  {
                    type: "classify_list",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Tap untuk pilih",
                      text: "Tap semua kelompok istilah yang ADA dalam struktur kamus ISO 9000:2015",
                      feedbackCorrect: "Tepat! ISO 9000 mengelompokkan istilahnya dalam 5 kategori besar: tentang orang, organisasi, aktivitas, hasil, dan data/informasi. Kelompok keuangan, biologi, dan geografi tidak ada — ISO 9000 khusus untuk sistem manajemen mutu.",
                      feedbackWrong: "Belum tepat. ISO 9000 hanya mendefinisikan istilah yang relevan dengan sistem manajemen mutu. Istilah keuangan, biologi, dan geografi berada di luar cakupannya."
                    },
                    instruction: "ISO 9000 mengelompokkan definisinya berdasarkan topik. Tap semua kelompok yang benar.",
                    options: [
                      { id: "k1", text: "👤 Istilah tentang Orang (pelanggan, pemasok, auditor)", correct: true, badgeText: "ADA" },
                      { id: "k2", text: "🏢 Istilah tentang Organisasi (konteks, lingkup, fungsi)", correct: true, badgeText: "ADA" },
                      { id: "k3", text: "💰 Istilah tentang Keuangan (aset, liabilitas, ekuitas)", correct: false, badgeText: "Bukan" },
                      { id: "k4", text: "⚙️ Istilah tentang Aktivitas (proses, prosedur, audit)", correct: true, badgeText: "ADA" },
                      { id: "k5", text: "📦 Istilah tentang Hasil (produk, jasa, output)", correct: true, badgeText: "ADA" },
                      { id: "k6", text: "🧬 Istilah tentang Biologi & Kimia (gen, molekul, reaksi)", correct: false, badgeText: "Bukan" },
                      { id: "k7", text: "📄 Istilah tentang Data & Informasi (dokumen, rekaman, informasi)", correct: true, badgeText: "ADA" },
                      { id: "k8", text: "🌍 Istilah tentang Geografi & Wilayah (negara, provinsi, koordinat)", correct: false, badgeText: "Bukan" }
                    ]
                  },
                  // SLIDE 5: AccordionMateriWidget
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Mengenal ISO 9000:2015 sebagai Kamus Resmi QMS"
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        title: "Dua bagian utama ISO 9000:2015",
                        numBox: { bg: "#FEF3C7", color: "#D97706" }, // Kotak amber muda, angka amber
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000:2015 terdiri dari dua bagian besar yang saling melengkapi.</p>
                            <p style="margin-top: 8px;"><strong style="color: #FFFFFF;">Bagian 1 — Konsep dan Prinsip:</strong> Berisi 7 Prinsip Manajemen Mutu yang menjadi fondasi filosofis mengapa QMS perlu ada dan bagaimana seharusnya dijalankan.</p>
                            <p style="margin-top: 8px;"><strong style="color: #FFFFFF;">Bagian 2 — Istilah dan Definisi:</strong> Berisi lebih dari 130 istilah teknis yang diorganisir dalam kelompok-kelompok konsep: orang, organisasi, aktivitas, hasil, dan data.</p>
                            <div style="background: #FEF3C7; color: #334155; padding: 12px 16px; border-left: 4px solid #D97706; margin-top: 16px; border-radius: 4px;">
                              <strong>📌 Tips navigasi:</strong> Setiap definisi di ISO 9000 diikuti "NOTE" (catatan). Jangan lewatkan — catatan sering lebih menjelaskan dari definisi utamanya.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        title: "Apa yang TIDAK ada di ISO 9000",
                        numBox: { bg: "#CCFBF1", color: "#0F766E" }, // Kotak teal muda, angka teal
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000 bukan ensiklopedia umum — cakupannya sangat spesifik. Tiga hal yang sering dicari orang tapi tidak ada di ISO 9000:</p>
                            <ul style="padding-left: 20px; margin-top: 8px; font-size: 13px;">
                              <li style="margin-bottom: 6px;"><strong style="color: #FFFFFF;">Langkah-langkah audit</strong> → Ada di ISO 19011 (Panduan Audit Sistem Manajemen)</li>
                              <li style="margin-bottom: 6px;"><strong style="color: #FFFFFF;">Persyaratan wajib QMS</strong> → Ada di ISO 9001 (Standar persyaratan)</li>
                              <li><strong style="color: #FFFFFF;">Metode statistik</strong> → Ada di ISO/TR 10017 (Panduan teknik statistik)</li>
                            </ul>
                            <div style="background: #E0F2FE; color: #0284C7; padding: 12px 16px; border-left: 4px solid #0284C7; border-radius: 8px; margin-top: 16px; font-weight: bold;">
                              ISO 9000 hanya menjawab satu pertanyaan: "Apa artinya kata ini dalam konteks QMS?" — tidak lebih, tidak kurang.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        title: "Cara menggunakan ISO 9000 dalam praktik",
                        numBox: { bg: "#EFF6FF", color: "#0F766E" }, // Kotak navy lebih terang, angka teal
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Dua situasi paling umum di mana Anda perlu membuka ISO 9000:</p>
                            <ol style="padding-left: 20px; font-size: 13px; margin-top: 8px;">
                              <li style="margin-bottom: 8px;"><strong style="color: #FFFFFF;">Saat menulis dokumen QMS:</strong> Sebelum menggunakan istilah teknis seperti "rekaman", "ketidaksesuaian", atau "proses" — cari dulu di indeks ISO 9000. Pakai definisi persis, jangan parafrase.</li>
                              <li><strong style="color: #FFFFFF;">Saat membaca ISO 9001 dan ada kata yang membingungkan:</strong> Cari di indeks ISO 9000 → baca definisi → baca NOTE-nya → baru lanjutkan membaca ISO 9001.</li>
                            </ol>
                            <div style="background: #F1F5F9; color: #334155; padding: 12px 16px; border-left: 4px solid #64748B; margin-top: 16px; border-radius: 4px;">
                              <strong>Kamus internal perusahaan</strong> boleh dibuat untuk menyederhanakan bahasa. Tapi isinya harus merujuk ke ISO 9000 — bukan mendefinisikan ulang dengan kata-kata sendiri.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },
                  // SLIDE 6: Intro Quiz Widget
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 7: OptionListWidget (Soal 5)
                  {
                    type: "option_list",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih tindakan yang tepat",
                      text: "Pak Doni sedang menulis Prosedur Penanganan Keluhan. Ia ragu definisi 'keluhan' yang tepat. Apa yang sebaiknya ia lakukan?"
                    },
                    options: [
                      { id: "a", icon: "📱", text: "Cari di Google: 'definisi keluhan dalam ISO'", correct: false, revealState: "invalid", feedback: "Hasil Google bisa tidak akurat, sudah ketinggalan versi, atau dari sumber yang tidak resmi. Untuk dokumen QMS yang akan diaudit, sumbernya harus ISO 9000:2015 langsung." },
                      { id: "b", icon: "📖", text: "Buka ISO 9000:2015, cari 'complaint' atau 'keluhan' di indeks, baca definisi + NOTE", correct: true, revealState: "valid", feedback: "Tepat! Ini prosedur yang benar: buka ISO 9000:2015 → cari di indeks → baca definisi → jangan lupa baca NOTE-nya. Catatan (NOTE) di ISO 9000 sering memberikan konteks penting yang tidak ada di definisi utama." },
                      { id: "c", icon: "📚", text: "Gunakan definisi dari KBBI karena lebih mudah dipahami karyawan", correct: false, revealState: "invalid", feedback: "KBBI bukan referensi yang diakui untuk istilah teknis ISO. Auditor akan menggunakan definisi ISO 9000 sebagai acuan — bukan KBBI." },
                      { id: "d", icon: "🤔", text: "Tulis saja definisi sendiri yang logis dan mudah dimengerti", correct: false, revealState: "invalid", feedback: "Definisi buatan sendiri tidak memiliki dasar standar internasional. Saat diaudit, auditor akan menanyakan sumber definisi yang dipakai." }
                    ]
                  },
                  // SLIDE 8: OptionListWidget (Soal 6)
                  {
                    type: "option_list",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih tindakan yang tepat",
                      text: "Bu Sari menemukan kalimat ini di ISO 9001: 'organisasi harus menetapkan informasi terdokumentasi.' Ia tidak tahu apa artinya 'informasi terdokumentasi'. Ke mana ia harus mencari?"
                    },
                    options: [
                      { id: "a", icon: "📖", text: "Buka ISO 9000:2015, cari 'documented information' di indeks", correct: true, revealState: "valid", feedback: "Tepat! ISO 9000:2015 adalah tempat pertama yang harus dibuka saat menemukan istilah teknis yang tidak dimengerti di ISO 9001. Definisi 'documented information' ada di ISO 9000 klausul 3.8.6." },
                      { id: "b", icon: "🌐", text: "Cari di forum QMS online atau blog konsultan ISO", correct: false, revealState: "invalid", feedback: "Forum dan blog bisa membantu sebagai pengantar, tapi tidak bisa dijadikan acuan resmi di dokumen QMS. Auditor akan meminta sumber resmi, bukan blog." },
                      { id: "c", icon: "📞", text: "Telepon konsultan ISO dan tanyakan", correct: false, revealState: "invalid", feedback: "Konsultan bisa membantu, tapi sebaiknya Anda tahu cara menemukannya sendiri dulu di ISO 9000. Kemandirian dalam menavigasi standar adalah keterampilan penting bagi staf QMS." },
                      { id: "d", icon: "➡️", text: "Terus baca ISO 9001 — pasti akan dijelaskan di klausul berikutnya", correct: false, revealState: "invalid", feedback: "ISO 9001 tidak mendefinisikan istilah-istilahnya sendiri — itulah alasan ISO 9000 ada sebagai acuan normatif terpisah. Istilah teknis tidak akan dijelaskan ulang di klausul berikutnya." }
                    ]
                  },
                  // SLIDE 9: OptionListWidget (Soal 7)
                  {
                    type: "option_list",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih tindakan yang tepat",
                      text: "Tim QMS PT Andalan sedang membuat kamus istilah internal untuk karyawan baru. Mana pendekatan yang paling tepat?"
                    },
                    options: [
                      { id: "a", icon: "📝", text: "Tulis definisi sendiri menggunakan bahasa sehari-hari yang mudah dipahami karyawan", correct: false, revealState: "invalid", feedback: "Definisi buatan sendiri berisiko berbeda dari ISO 9000. Saat diaudit, perbedaan ini bisa menjadi temuan. Kamus internal harus membangun di atas definisi ISO 9000, bukan menggantinya." },
                      { id: "b", icon: "📖", text: "Salin persis semua 130+ definisi dari ISO 9000:2015 tanpa perubahan", correct: false, revealState: "invalid", feedback: "Menyalin 130+ definisi teknis tanpa konteks tidak akan membantu karyawan memahaminya. Kamus internal yang baik adalah yang relevan untuk operasional perusahaan, bukan sekedar salinan standar." },
                      { id: "c", icon: "🔗", text: "Ambil definisi resmi dari ISO 9000, lalu tambahkan penjelasan konteks operasional pabrik", correct: true, revealState: "valid", feedback: "Tepat! Ini pendekatan yang ideal: definisi resmi dari ISO 9000 sebagai fondasi + konteks operasional perusahaan sebagai penjelas. Hasilnya: akurat secara standar sekaligus relevan untuk karyawan." },
                      { id: "d", icon: "🚫", text: "Tidak perlu buat kamus internal — cukup minta semua karyawan membaca ISO 9000", correct: false, revealState: "invalid", feedback: "Meminta semua karyawan membaca ISO 9000 langsung tidak realistis dan tidak efektif. Kamus internal yang dibangun di atas ISO 9000 adalah solusi praktis yang justru dianjurkan." }
                    ]
                  },
                  // SLIDE 10: OptionListWidget (Soal 8)
                  {
                    type: "option_list",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih tindakan yang tepat",
                      text: "Auditor menemukan definisi 'proses' di Manual PT Gemilang berbunyi: 'urutan kegiatan yang dilakukan karyawan'. Apa yang sebaiknya dilakukan manajer QMS agar sejalan secara definitif?"
                    },
                    options: [
                      { id: "a", icon: "🙈", text: "Biarkan saja — definisi yang ada sudah cukup dipahami karyawan", correct: false, revealState: "invalid", feedback: "Definisi yang berbeda dari ISO 9000 adalah temuan audit yang valid. Membiarkannya akan menimbulkan masalah di audit berikutnya dan berpotensi memengaruhi sertifikasi." },
                      { id: "b", icon: "✏️", text: "Revisi agar sesuai prinsip ISO 9000 ('mengubah input menjadi output'), lalu tambahkan contoh di sebelahnya", correct: true, revealState: "valid", feedback: "Tepat! Langkah yang benar: revisi definisi agar selaras dengan ISO 9000, lalu tambahkan konteks operasional sebagai penjelasan tambahan. Dengan cara ini, dokumen akurat secara standar sekaligus tetap mudah dipahami." },
                      { id: "c", icon: "🔄", text: "Ganti seluruh Manual Mutu dengan salinan ISO 9000:2015 agar aman", correct: false, revealState: "invalid", feedback: "Mengganti seluruh Manual Mutu dengan ISO 9000 tidak tepat — Manual Mutu harus berisi konteks spesifik perusahaan, bukan hanya salinan standar. Yang perlu diselaraskan hanya definisi istilah teknisnya." },
                      { id: "d", icon: "💬", text: "Jelaskan ke auditor bahwa definisi perusahaan lebih mudah dipahami audien internal", correct: false, revealState: "invalid", feedback: "Auditor tidak akan menerima alasan ini. Persyaratan standar tidak bisa dinegosiasi dengan alasan kemudahan pemahaman. Solusinya adalah selaraskan definisi, bukan berargumen." }
                    ]
                  },
                  // SLIDE 11: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai",
                      insight: "Anda sudah memahami struktur ISO 9000:2015 dan cara menggunakannya sebagai referensi dalam pekerjaan QMS sehari-hari.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "ISO 9000:2015 berisi 2 bagian: 7 prinsip manajemen mutu + 130+ definisi istilah",
                        "Istilah dikelompokkan dalam 5 kategori: orang, organisasi, aktivitas, hasil, data",
                        "Jangan lewatkan NOTE — sering lebih menjelaskan dari definisi utama",
                        "Kamus internal yang ideal: definisi ISO 9000 + konteks operasional perusahaan"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              // ───────────────────────────────────────────────────────────
              // SUB-LESSON 3: Menggunakan definisi resmi
              // ───────────────────────────────────────────────────────────
              {
                id:       "menggunakan-definisi-resmi",
                title:    "Menggunakan definisi resmi ISO 9000 dalam dokumen QMS",
                icon:     "🔖",
                duration: "6 menit",
                slides: [
                  // SLIDE 1: SOAL 1 (YA/TIDAK)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Dokumen atau Rekaman?",
                      text: "Formulir inspeksi bahan baku yang sudah diisi dan ditandatangani oleh kepala gudang — ini termasuk apa?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px; margin-bottom: 16px; position: relative; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                          <div style="text-align: right; font-size: 10px; color: #94A3B8; font-weight: bold; margin-bottom: 12px;">FORMULIR INSPEKSI BAHAN BAKU</div>
                          <div style="height: 1px; background: #E2E8F0; margin-bottom: 16px;"></div>
                          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                            <div style="width: 20%; height: 8px; background: #CBD5E1; border-radius: 4px;"></div>
                            <div style="width: 70%; height: 8px; background: #94A3B8; border-radius: 4px;"></div>
                          </div>
                          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                            <div style="width: 20%; height: 8px; background: #CBD5E1; border-radius: 4px;"></div>
                            <div style="width: 50%; height: 8px; background: #94A3B8; border-radius: 4px;"></div>
                          </div>
                          <div style="display: flex; gap: 8px; margin-bottom: 24px;">
                            <div style="width: 20%; height: 8px; background: #CBD5E1; border-radius: 4px;"></div>
                            <div style="width: 60%; height: 8px; background: #94A3B8; border-radius: 4px;"></div>
                          </div>
                          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                            <div style="border: 2px solid #10B981; color: #10B981; font-weight: bold; font-size: 12px; padding: 4px 8px; border-radius: 4px; transform: rotate(-5deg);">SELESAI</div>
                            <div style="text-align: right;">
                              <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #1E293B; line-height: 1;">Ahmad</div>
                              <div style="width: 60px; height: 1px; background: #94A3B8; margin-top: 4px; display: inline-block;"></div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "dokumen", icon: "📄", label: "Dokumen", subLabel: "Bisa direvisi kapanpun", correct: false, feedback: "Belum tepat. Formulir kosong memang dokumen. Tapi begitu diisi dan ditandatangani, ia berubah menjadi rekaman — bukti bahwa kegiatan inspeksi sudah terjadi. Rekaman tidak boleh direvisi." },
                      { id: "rekaman", icon: "🗂️", label: "Rekaman", subLabel: "Bukti permanen kegiatan", correct: true, feedback: "Tepat! Formulir yang sudah diisi dan ditandatangani adalah rekaman — ia menjadi bukti bahwa inspeksi sudah dilakukan. Rekaman tidak boleh diubah setelah dibuat karena fungsinya sebagai bukti kegiatan." }
                    ]
                  },
                  // SLIDE 2: SOAL 2 (YA/TIDAK)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Dokumen atau Rekaman?",
                      text: "SOP Penanganan Produk Tidak Sesuai versi 3.0 yang baru saja disetujui manajer — ini termasuk apa?",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 0; border-radius: 8px; margin-bottom: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                          <div style="background: #1E293B; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; gap: 6px;">
                              <div style="width: 24px; height: 24px; background: #3B82F6; border-radius: 12px;"></div>
                              <div style="font-size: 12px; font-weight: bold;">PT BERKAH JAYA</div>
                            </div>
                            <div style="font-size: 10px; color: #94A3B8;">SOP-QC-007</div>
                          </div>
                          <div style="padding: 24px 20px;">
                            <div style="font-size: 16px; font-weight: 800; color: #0F172A; margin-bottom: 4px; text-align: center;">SOP Penanganan Produk Tidak Sesuai</div>
                            <div style="font-size: 11px; color: #64748B; text-align: center; margin-bottom: 24px;">Versi 3.0 | Tgl Efektif: 1 Okt 2024</div>
                            <div style="width: 100%; height: 6px; background: #E2E8F0; border-radius: 3px; margin-bottom: 8px;"></div>
                            <div style="width: 85%; height: 6px; background: #E2E8F0; border-radius: 3px; margin-bottom: 8px;"></div>
                            <div style="width: 95%; height: 6px; background: #E2E8F0; border-radius: 3px; margin-bottom: 24px;"></div>
                            <div style="display: flex; justify-content: flex-end;">
                              <div style="text-align: center;">
                                <div style="font-size: 9px; color: #64748B; margin-bottom: 4px;">Disetujui Oleh:</div>
                                <div style="font-family: 'Caveat', cursive; font-size: 18px; color: #1D4ED8; font-weight: bold; line-height: 1;">Budi S.</div>
                                <div style="width: 80px; height: 1px; background: #CBD5E1; margin: 2px auto;"></div>
                                <div style="font-size: 9px; color: #475569;">Manajer QA</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "dokumen", icon: "📄", label: "Dokumen", subLabel: "Bisa direvisi kapanpun", correct: true, feedback: "Tepat! SOP adalah panduan tentang apa yang harus dilakukan — bukan bukti bahwa sesuatu sudah dilakukan. SOP bisa direvisi kapanpun ada perubahan proses. Ini adalah dokumen, bukan rekaman." },
                      { id: "rekaman", icon: "🗂️", label: "Rekaman", subLabel: "Bukti permanen kegiatan", correct: false, feedback: "Belum tepat. SOP menjelaskan bagaimana suatu kegiatan harus dilakukan — ia adalah panduan ke depan, bukan bukti kejadian di masa lalu. Karena bisa direvisi kapanpun, SOP adalah dokumen." }
                    ]
                  },
                  // SLIDE 3: SOAL 3 (YA/TIDAK)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Prosedur atau Instruksi Kerja?",
                      text: "Dokumen yang menjelaskan langkah demi langkah cara mengoperasikan mesin jahit model X-200, termasuk posisi tangan, kecepatan putaran, dan cara mengganti benang — ini termasuk apa?",
                      htmlContext: `
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                          <div style="flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 12px;">
                            <div style="font-weight: 800; color: #334155; font-size: 13px; margin-bottom: 4px;">Prosedur</div>
                            <div style="font-size: 11px; color: #64748B; margin-bottom: 8px; line-height: 1.3;">Siapa mengerjakan apa + lintas departemen</div>
                            <div style="background: #FFFFFF; padding: 8px; border-radius: 6px; border: 1px solid #F1F5F9; font-size: 10px; color: #475569; font-style: italic;">Contoh: "Prosedur Pengendalian Produk Tidak Sesuai (QC, Produksi, Gudang)"</div>
                          </div>
                          <div style="flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 12px;">
                            <div style="font-weight: 800; color: #334155; font-size: 13px; margin-bottom: 4px;">Instruksi Kerja</div>
                            <div style="font-size: 11px; color: #64748B; margin-bottom: 8px; line-height: 1.3;">Bagaimana caranya + satu tugas spesifik</div>
                            <div style="background: #FFFFFF; padding: 8px; border-radius: 6px; border: 1px solid #F1F5F9; font-size: 10px; color: #475569; font-style: italic;">Contoh: "IK-001: Cara Kalibrasi Timbangan Digital"</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "prosedur", icon: "📋", label: "Prosedur", subLabel: "Lintas fungsi / departemen", correct: false, feedback: "Belum tepat. Prosedur biasanya menjelaskan alur yang melibatkan beberapa orang atau departemen — siapa melakukan apa dan kapan. Dokumen yang menjelaskan cara mengerjakan satu tugas sangat spesifik adalah instruksi kerja." },
                      { id: "ik", icon: "🔧", label: "Instruksi Kerja", subLabel: "Satu tugas, sangat spesifik", correct: true, feedback: "Tepat! Dokumen yang menjelaskan cara mengerjakan satu tugas spesifik secara sangat detail — termasuk posisi tangan dan kecepatan putaran — adalah instruksi kerja. Semakin operasional dan spesifik, semakin mengarah ke instruksi kerja." }
                    ]
                  },
                  // SLIDE 4: SOAL 4 (YA/TIDAK)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Ketidaksesuaian atau Cacat?",
                      text: "Sebuah laporan audit internal menemukan bahwa perusahaan tidak memiliki prosedur tertulis untuk pengendalian alat ukur, padahal ISO 9001 mensyaratkannya. Ini termasuk apa?",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <div>
                              <div style="font-size: 14px; font-weight: bold; color: #0F172A;">Laporan Audit Internal</div>
                              <div style="font-size: 10px; color: #64748B;">Temuan Audit Lapangan</div>
                            </div>
                            <div style="font-size: 24px;">🔍</div>
                          </div>
                          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; overflow: hidden; margin-bottom: 16px;">
                            <div style="display: flex; background: #F1F5F9; padding: 6px 8px; font-size: 9px; font-weight: bold; color: #475569; border-bottom: 1px solid #E2E8F0;">
                              <div style="flex: 1;">No.</div>
                              <div style="flex: 4;">Deskripsi Temuan</div>
                              <div style="flex: 1; text-align: center;">Klausul</div>
                            </div>
                            <div style="display: flex; padding: 8px; font-size: 10px; color: #334155;">
                              <div style="flex: 1;">01</div>
                              <div style="flex: 4; font-weight: 500;">Tidak ditemukan adanya prosedur tertulis pengendalian alat ukur di fasilitas produksi.</div>
                              <div style="flex: 1; text-align: center;">7.1.5</div>
                            </div>
                          </div>
                          
                          <div style="display: flex; gap: 8px;">
                            <div style="flex: 1; background: #FEF3C7; padding: 10px; border-radius: 8px; border-left: 3px solid #D97706;">
                              <div style="font-weight: bold; font-size: 11px; color: #92400E; margin-bottom: 4px;">Ketidaksesuaian</div>
                              <div style="font-size: 10px; color: #B45309; line-height: 1.3;">Tidak memenuhi persyaratan (standar, pelanggan, internal).</div>
                            </div>
                            <div style="flex: 1; background: #FEE2E2; padding: 10px; border-radius: 8px; border-left: 3px solid #EF4444;">
                              <div style="font-weight: bold; font-size: 11px; color: #991B1B; margin-bottom: 4px;">Cacat</div>
                              <div style="font-size: 10px; color: #B91C1C; line-height: 1.3; margin-bottom: 4px;">Produk/jasa tidak bisa digunakan sesuai tujuan.</div>
                              <div style="font-size: 9px; font-weight: bold; color: #EF4444;">⚠️ Istilah sensitif secara hukum</div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "ketidaksesuaian", icon: "⚠️", label: "Ketidaksesuaian", subLabel: "Tidak memenuhi persyaratan", correct: true, feedback: "Tepat! Tidak adanya prosedur yang dipersyaratkan ISO 9001 adalah ketidaksesuaian — tidak memenuhi persyaratan standar. Kata 'cacat' khusus digunakan untuk produk/jasa yang tidak bisa digunakan sesuai tujuannya, dan punya implikasi hukum — hindari penggunaannya sembarangan di dokumen QMS." },
                      { id: "cacat", icon: "🚫", label: "Cacat", subLabel: "Produk tidak bisa digunakan", correct: false, feedback: "Belum tepat. 'Cacat' dalam ISO 9000 punya makna spesifik: ketidaksesuaian yang berkaitan dengan penggunaan yang dimaksud — dan punya implikasi hukum. Untuk temuan audit seperti ini, istilah yang tepat adalah 'ketidaksesuaian'." }
                    ]
                  },
                  // SLIDE 5: MATERI
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Menggunakan Definisi Resmi ISO 9000 dalam Dokumen QMS"
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        title: "Dokumen vs Rekaman — perbedaan yang menentukan",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Ini adalah pasangan istilah yang paling sering tertukar dalam QMS. ISO 9000 membedakannya dengan jelas berdasarkan fungsi, bukan formatnya.</p>
                            
                            <div style="background: #F8FAFC; color: #334155; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; margin-top: 12px; margin-bottom: 16px;">
                              <div style="display: flex; background: #F1F5F9; padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold; font-size: 12px; color: #475569;">
                                <div style="flex: 1;"></div>
                                <div style="flex: 2; color: #2563EB;">DOKUMEN</div>
                                <div style="flex: 2; color: #166534;">REKAMAN</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 12px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1; font-weight: bold; color: #64748B;">Fungsi:</div>
                                <div style="flex: 2;">Panduan ke depan</div>
                                <div style="flex: 2;">Bukti masa lalu</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 12px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1; font-weight: bold; color: #64748B;">Diubah:</div>
                                <div style="flex: 2;">Ya, bisa direvisi</div>
                                <div style="flex: 2; color: #DC2626; font-weight: bold;">Tidak boleh diubah</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 12px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1; font-weight: bold; color: #64748B;">Contoh:</div>
                                <div style="flex: 2;">SOP, Kebijakan, IK</div>
                                <div style="flex: 2;">Laporan insp, Hasil uji, Notulen</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 12px; background: #F8FAFC;">
                                <div style="flex: 1; font-weight: bold; color: #64748B;">ISO sebut:</div>
                                <div style="flex: 2; font-style: italic;">"dipelihara"</div>
                                <div style="flex: 2; font-style: italic;">"disimpan"</div>
                              </div>
                            </div>

                            <div style="background: #FEF3C7; color: #334155; padding: 12px 16px; border-left: 4px solid #D97706; border-radius: 4px;">
                              <strong>📌 Cara mudah membedakan:</strong> tanya "apakah ini panduan tentang apa yang HARUS dilakukan, atau bukti bahwa sesuatu SUDAH dilakukan?" — jika panduan = dokumen, jika bukti = rekaman.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        title: "Prosedur vs Instruksi Kerja — soal cakupan",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Keduanya adalah dokumen — perbedaannya ada di level detail dan cakupan.</p>
                            <ul style="padding-left: 20px;">
                              <li><strong style="color: #FFFFFF;">Prosedur:</strong> Menjelaskan <em>siapa melakukan apa</em> dalam suatu alur — biasanya melibatkan lebih dari satu fungsi atau departemen.<br/>
                              <span style="font-style: italic; color: #94A3B8; font-size: 13px;">Contoh: Prosedur Penanganan Keluhan (melibatkan Customer Service, QC, dan Manajemen).</span></li>
                              <li style="margin-top: 8px;"><strong style="color: #FFFFFF;">Instruksi Kerja:</strong> Menjelaskan <em>bagaimana caranya</em> secara sangat detail untuk satu tugas spesifik.<br/>
                              <span style="font-style: italic; color: #94A3B8; font-size: 13px;">Contoh: Instruksi Kerja Kalibrasi Timbangan Digital (hanya untuk operator kalibrasi).</span></li>
                            </ul>
                            <div style="background: #E0F2FE; color: #0284C7; padding: 12px 16px; border-left: 4px solid #0284C7; border-radius: 4px; margin-top: 16px;">
                              <strong>Aturan praktis:</strong> semakin spesifik dan operasional sebuah dokumen, semakin mengarah ke instruksi kerja. Semakin lintas fungsi, semakin mengarah ke prosedur.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        title: "Ketidaksesuaian vs Cacat — mengapa ini penting",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p><strong style="color: #FFFFFF;">Ketidaksesuaian</strong> adalah istilah umum untuk segala kondisi yang tidak memenuhi persyaratan — bisa persyaratan standar ISO, persyaratan pelanggan, atau persyaratan internal perusahaan.</p>
                            <p><strong style="color: #FFFFFF;">Cacat</strong> adalah istilah yang jauh lebih spesifik: ketidaksesuaian yang berkaitan dengan penggunaan yang dimaksud dari produk atau jasa. ISO 9000 secara eksplisit mencatat bahwa istilah ini <em>memiliki implikasi hukum</em> — karena berkaitan langsung dengan klaim garansi, tanggung jawab produk, dan tuntutan konsumen.</p>
                            
                            <div style="background: #FEE2E2; color: #B91C1C; padding: 12px 16px; border-left: 4px solid #EF4444; border-radius: 4px; margin-top: 16px;">
                              <strong style="color: #991B1B;">⚠️ Hindari menulis kata "cacat" sembarangan di dokumen QMS.</strong> Gunakan "ketidaksesuaian" untuk temuan audit dan laporan QMS. Simpan kata "cacat" hanya untuk konteks produk yang benar-benar tidak bisa digunakan sesuai tujuannya.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },
                  // SLIDE 5.5: PEMISAH
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6: SOAL 5 (FIND THE ERROR)
                  {
                    type: "classify_list",
                    xp: 40,
                    scenario: {
                      icon: "5",
                      label: "Temukan kesalahan",
                      text: "Tap semua kalimat yang menggunakan istilah ISO secara SALAH dalam prosedur ini",
                      feedbackCorrect: "Tepat! Klausul 3.1 salah karena memasukkan rekaman (laporan inspeksi, notulen) ke dalam definisi dokumen. Klausul 3.3 salah karena mendefinisikan instruksi kerja dengan ciri-ciri prosedur — seharusnya instruksi kerja menjelaskan cara melakukan satu tugas spesifik.",
                      feedbackWrong: "Belum tepat. Yang bermasalah: klausul 3.1 (mencampur rekaman ke dalam definisi dokumen) dan klausul 3.3 (mendefinisikan instruksi kerja dengan ciri prosedur). Klausul 3.2 dan 3.4 sudah benar.",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 8px;">
                          <div style="background: #334155; padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
                            <div style="display: flex; gap: 4px;">
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EF4444;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EAB308;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #22C55E;"></div>
                            </div>
                            <div style="color: #CBD5E1; font-size: 11px; font-weight: 500; margin-left: auto;">PM-003-Pengendalian-Dokumen-v2.docx</div>
                          </div>
                          <div style="padding: 16px;">
                            <div style="font-weight: 800; text-align: center; color: #0F172A; font-size: 14px;">Prosedur Pengendalian Dokumen dan Rekaman</div>
                            <div style="text-align: center; color: #64748B; font-size: 11px; margin-bottom: 24px;">Nomor: PM-003 | Versi: 2.0</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px; margin-bottom: 12px;">3. DEFINISI</div>
                          </div>
                        </div>
                      `
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "3.1", text: "3.1 Dokumen adalah semua berkas yang dibuat dan disimpan oleh departemen QMS, termasuk laporan hasil inspeksi dan notulen rapat.", correct: true, badgeText: "SALAH ✗" },
                      { id: "3.2", text: "3.2 Rekaman adalah catatan resmi yang menunjukkan hasil yang dicapai atau bukti kegiatan yang dilakukan, dan tidak boleh diubah setelah dibuat.", correct: false, badgeText: "BENAR ✓" },
                      { id: "3.3", text: "3.3 Instruksi Kerja adalah dokumen yang menjelaskan alur kerja yang melibatkan lebih dari satu departemen dalam perusahaan.", correct: true, badgeText: "SALAH ✗" },
                      { id: "3.4", text: "3.4 Ketidaksesuaian adalah kondisi yang tidak memenuhi persyaratan yang berlaku, baik persyaratan standar, pelanggan, maupun internal.", correct: false, badgeText: "BENAR ✓" }
                    ]
                  },
                  // SLIDE 7: SOAL 6 (FIND THE ERROR)
                  {
                    type: "classify_list",
                    xp: 40,
                    scenario: {
                      icon: "6",
                      label: "Temukan kesalahan",
                      text: "Tap semua kalimat yang bermasalah dalam instruksi kerja ini",
                      feedbackCorrect: "Tepat! Klausul 4.2 salah karena menggunakan 'cacat' — seharusnya 'ketidaksesuaian' untuk produk yang tidak lolos pemeriksaan. Klausul 4.3 salah karena menyebut formulir terisi sebagai 'dokumen' — seharusnya 'rekaman' karena ia adalah bukti permanen.",
                      feedbackWrong: "Belum tepat. Yang bermasalah: klausul 4.2 (pakai 'cacat' untuk ketidaksesuaian produk) dan klausul 4.3 (menyebut rekaman sebagai dokumen). Klausul 4.1 dan 4.4 sudah menggunakan istilah dengan tepat.",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 8px;">
                          <div style="background: #334155; padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
                            <div style="display: flex; gap: 4px;">
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EF4444;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EAB308;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #22C55E;"></div>
                            </div>
                            <div style="color: #CBD5E1; font-size: 11px; font-weight: 500; margin-left: auto;">IK-QC-012-Pemeriksaan-Produk-Jadi.docx</div>
                          </div>
                          <div style="padding: 16px;">
                            <div style="font-weight: 800; text-align: center; color: #0F172A; font-size: 14px;">Instruksi Kerja Pemeriksaan Produk Jadi</div>
                            <div style="text-align: center; color: #64748B; font-size: 11px; margin-bottom: 24px;">Nomor: IK-QC-012 | Versi: 1.0</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px; margin-bottom: 12px;">4. LANGKAH KERJA</div>
                          </div>
                        </div>
                      `
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "4.1", text: "4.1 Operator QC mengambil sampel produk sesuai rencana pengambilan sampel yang tertera di Tabel Sampling QC-T-001.", correct: false, badgeText: "BENAR ✓" },
                      { id: "4.2", text: "4.2 Jika ditemukan produk cacat selama pemeriksaan, operator segera mengisi Formulir Laporan Cacat dan melaporkan ke supervisor.", correct: true, badgeText: "SALAH ✗" },
                      { id: "4.3", text: "4.3 Semua hasil pemeriksaan dicatat dalam Formulir QC-F-007 sebagai dokumen bukti pemeriksaan yang telah dilakukan.", correct: true, badgeText: "SALAH ✗" },
                      { id: "4.4", text: "4.4 Produk yang tidak memenuhi spesifikasi dipisahkan dan diberi label \"DITOLAK\" sebelum dilaporkan sebagai ketidaksesuaian.", correct: false, badgeText: "BENAR ✓" }
                    ]
                  },
                  // SLIDE 8: SOAL 7 (FIND THE ERROR)
                  {
                    type: "classify_list",
                    xp: 40,
                    scenario: {
                      icon: "7",
                      label: "Temukan kesalahan",
                      text: "Tap semua kalimat yang bermasalah dalam Manual Mutu ini",
                      feedbackCorrect: "Tepat! Klausul 4.2 salah karena prosedur dan instruksi kerja adalah dokumen yang 'dipelihara' — bukan rekaman yang 'disimpan'. Klausul 4.4 salah karena Kebijakan Mutu bukan instruksi kerja — ia adalah dokumen kebijakan tingkat atas.",
                      feedbackWrong: "Belum tepat. Yang bermasalah: klausul 4.2 (menyebut dokumen sebagai rekaman) dan klausul 4.4 (menyebut Kebijakan Mutu sebagai instruksi kerja). Klausul 4.1 dan 4.3 sudah benar.",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 8px;">
                          <div style="background: #334155; padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
                            <div style="display: flex; gap: 4px;">
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EF4444;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EAB308;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #22C55E;"></div>
                            </div>
                            <div style="color: #CBD5E1; font-size: 11px; font-weight: 500; margin-left: auto;">Manual-Mutu-PT-Berkah-Jaya-v4.docx</div>
                          </div>
                          <div style="padding: 16px;">
                            <div style="font-weight: 800; text-align: center; color: #0F172A; font-size: 14px;">Manual Mutu PT Berkah Jaya</div>
                            <div style="text-align: center; color: #64748B; font-size: 11px; margin-bottom: 24px;">Bab 4: Sistem Manajemen Mutu</div>
                          </div>
                        </div>
                      `
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "4.1", text: "4.1 Perusahaan menetapkan, mendokumentasikan, dan memelihara Sistem Manajemen Mutu sesuai persyaratan ISO 9001:2015.", correct: false, badgeText: "BENAR ✓" },
                      { id: "4.2", text: "4.2 Seluruh prosedur dan instruksi kerja perusahaan disimpan sebagai rekaman dan dikontrol menggunakan sistem penomoran dokumen.", correct: true, badgeText: "SALAH ✗" },
                      { id: "4.3", text: "4.3 Laporan hasil audit internal disimpan sebagai rekaman selama minimal 3 tahun sesuai kebijakan retensi perusahaan.", correct: false, badgeText: "BENAR ✓" },
                      { id: "4.4", text: "4.4 Kebijakan Mutu Perusahaan ditetapkan oleh Top Management dan dipelihara sebagai instruksi kerja yang berlaku untuk semua fungsi dalam organisasi.", correct: true, badgeText: "SALAH ✗" }
                    ]
                  },
                  // SLIDE 9: SOAL 8 (FIND THE ERROR)
                  {
                    type: "classify_list",
                    xp: 40,
                    scenario: {
                      icon: "8",
                      label: "Temukan kesalahan",
                      text: "Tap semua kalimat yang bermasalah dalam laporan audit internal ini",
                      feedbackCorrect: "Tepat! TM-01 salah karena menggunakan 'cacat' — untuk laporan audit QMS gunakan 'ketidaksesuaian'. TM-03 salah karena menyebut rekaman 'direvisi' — rekaman tidak boleh direvisi. Temuan yang tepat: rekaman tidak tersedia atau hilang.",
                      feedbackWrong: "Belum tepat. Yang bermasalah: TM-01 (pakai 'cacat' alih-alih 'ketidaksesuaian') dan TM-03 (rekaman tidak bisa 'direvisi' — itu melanggar prinsip dasar rekaman). TM-02 dan TM-04 sudah menggunakan istilah dengan benar.",
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); margin-bottom: 8px;">
                          <div style="background: #334155; padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
                            <div style="display: flex; gap: 4px;">
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EF4444;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #EAB308;"></div>
                              <div style="width: 10px; height: 10px; border-radius: 5px; background: #22C55E;"></div>
                            </div>
                            <div style="color: #CBD5E1; font-size: 11px; font-weight: 500; margin-left: auto;">Laporan-Audit-Internal-Q3-2024.docx</div>
                          </div>
                          <div style="padding: 16px;">
                            <div style="font-weight: 800; text-align: center; color: #0F172A; font-size: 14px;">Laporan Audit Internal Kuartal 3 — 2024</div>
                            <div style="text-align: center; color: #64748B; font-size: 11px; margin-bottom: 24px;">Auditor: Tim QC Internal</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px; margin-bottom: 12px;">TEMUAN AUDIT:</div>
                          </div>
                        </div>
                      `
                    },
                    instruction: "Bisa lebih dari satu. Tap lagi untuk batal.",
                    options: [
                      { id: "TM01", text: "TM-01 Ditemukan 3 unit produk yang cacat di area packing — produk tidak sesuai dengan spesifikasi warna yang ditetapkan pelanggan.", correct: true, badgeText: "SALAH ✗" },
                      { id: "TM02", text: "TM-02 Instruksi Kerja IK-PRD-005 tidak tersedia di area kerja operator mesin pressing — merupakan ketidaksesuaian terhadap klausul 7.5.1 ISO 9001:2015.", correct: false, badgeText: "BENAR ✓" },
                      { id: "TM03", text: "TM-03 Rekaman hasil kalibrasi alat ukur untuk periode Januari–Juni 2024 tidak dapat ditemukan — diduga telah direvisi.", correct: true, badgeText: "SALAH ✗" },
                      { id: "TM04", text: "TM-04 Operator tidak mengikuti prosedur penanganan bahan berbahaya sesuai IK-HSE-002 — merupakan ketidaksesuaian.", correct: false, badgeText: "BENAR ✓" }
                    ]
                  },
                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai",
                      insight: "Anda sudah mampu membedakan istilah-istilah kritis QMS dan mendeteksi kesalahan penggunaannya dalam dokumen nyata.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Dokumen = panduan ke depan (bisa direvisi) · Rekaman = bukti masa lalu (tidak boleh diubah)",
                        "Prosedur = lintas fungsi, siapa-apa · Instruksi Kerja = satu tugas spesifik, bagaimana caranya",
                        "Ketidaksesuaian = tidak memenuhi persyaratan · Cacat = istilah khusus produk, sensitif secara hukum",
                        "ISO 9001 menyebut dokumen sebagai yang \"dipelihara\" dan rekaman sebagai yang \"disimpan\""
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              // ───────────────────────────────────────────────────────────
              // SUB-LESSON 4: Menghindari kesalahan interpretasi
              // ───────────────────────────────────────────────────────────
              {
                id:       "menghindari-kesalahan-interpretasi",
                title:    "Menghindari kesalahan interpretasi istilah umum dalam ISO",
                icon:     "🧠",
                duration: "6 menit",
                slides: [
                  // SLIDE 1: SOAL 1 (PILIH MAKNA)
                  {
                    type: "compare_pick",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Pilih makna ISO",
                      text: "Dalam ISO 9000, apa yang dimaksud dengan kata PRODUK?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 8px;">
                          <div style="font-weight: 900; font-size: 20px; color: #0F172A; letter-spacing: 1px;">PRODUK</div>
                          <div style="font-size: 11px; color: #64748B; font-weight: 500;">Cari tahu artinya dalam ISO 9000</div>
                        </div>
                      `
                    },
                    products: [
                      { id: "p1_awam", color: "#94A3B8", label: "Makna sehari-hari", emoji: "📦", price: "Barang fisik yang diproduksi dan dijual", desc: "Contoh: sepatu, smartphone, mobil", correct: false, feedback: "Belum tepat. Dalam ISO 9000, 'produk' tidak terbatas pada barang fisik. Produk adalah semua output dari proses — termasuk jasa, perangkat lunak, dan material hasil proses. ISO 9001:2015 bahkan selalu menulis 'produk dan jasa' berdampingan untuk menekankan hal ini." },
                      { id: "p1_iso",  color: "#1E3A8A", label: "Makna dalam ISO 9000", emoji: "📦 + 💻 + 🤝", price: "Semua output dari proses — termasuk barang, jasa, dan perangkat lunak", desc: "Contoh: laporan konsultasi, aplikasi software, jasa pengiriman", correct: true, feedback: "Tepat! Dalam ISO 9000, 'produk' mencakup semua output dari proses — barang fisik, jasa, perangkat lunak, bahkan material hasil proses. Ini jauh lebih luas dari arti sehari-hari. Artinya laporan konsultasi, aplikasi SaaS, dan jasa catering semuanya adalah 'produk' dalam konteks ISO." }
                    ]
                  },
                  // SLIDE 2: SOAL 2 (PILIH MAKNA)
                  {
                    type: "compare_pick",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Pilih makna ISO",
                      text: "Dalam ISO 9000, apa yang dimaksud dengan kata PROSES?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 8px;">
                          <div style="font-weight: 900; font-size: 20px; color: #0F172A; letter-spacing: 1px;">PROSES</div>
                        </div>
                      `
                    },
                    products: [
                      { id: "p2_awam", color: "#94A3B8", label: "Makna sehari-hari", emoji: "⏳", price: "Cara kerja atau urutan langkah-langkah dalam mengerjakan sesuatu", desc: "Contoh: 'proses pembuatan kue itu lama'", correct: false, feedback: "Belum tepat. Arti sehari-hari 'proses' memang mirip, tapi definisi ISO lebih spesifik: harus ada input yang jelas, aktivitas yang mengubahnya, dan output yang terukur. Tanpa ketiga elemen ini, itu bukan 'proses' dalam pengertian ISO 9000." },
                      { id: "p2_iso",  color: "#1E3A8A", label: "Makna dalam ISO 9000", emoji: "⚙️", price: "Sekumpulan aktivitas yang saling terkait yang menggunakan input untuk menghasilkan output yang direncanakan", desc: "Harus ada: input yang jelas + aktivitas yang mengubahnya + output yang terukur", correct: true, feedback: "Tepat! Dalam ISO 9000, proses selalu memiliki tiga elemen: input, aktivitas yang mengubah input tersebut, dan output. Tanpa ketiga elemen ini, sesuatu tidak bisa disebut 'proses' dalam konteks QMS. Ini penting karena ISO 9001 mensyaratkan pendekatan proses (process approach) dalam membangun QMS." }
                    ]
                  },
                  // SLIDE 3: SOAL 3 (PILIH MAKNA)
                  {
                    type: "compare_pick",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Pilih makna ISO",
                      text: "Dalam ISO 9000, apa yang dimaksud dengan kata SISTEM?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 8px;">
                          <div style="font-weight: 900; font-size: 20px; color: #0F172A; letter-spacing: 1px;">SISTEM</div>
                        </div>
                      `
                    },
                    products: [
                      { id: "p3_awam", color: "#94A3B8", label: "Makna sehari-hari", emoji: "💻", price: "Perangkat lunak, teknologi, atau infrastruktur IT", desc: "Contoh: 'sistem ERP kita sudah diperbarui', 'sistem komputer mati'", correct: false, feedback: "Belum tepat. Di dunia IT memang 'sistem' sering berarti software atau hardware. Tapi dalam ISO 9000, sistem adalah sekumpulan elemen yang saling terkait untuk mencapai tujuan — tidak harus berkaitan dengan teknologi sama sekali. QMS, sistem manajemen lingkungan, sistem K3 — semuanya adalah 'sistem' dalam pengertian ISO." },
                      { id: "p3_iso",  color: "#1E3A8A", label: "Makna dalam ISO 9000", emoji: "🔗", price: "Sekumpulan elemen yang saling terkait dan berinteraksi untuk mencapai satu tujuan", desc: "QMS adalah sistem — terdiri dari proses, orang, dokumen, dan kebijakan yang bekerja bersama", correct: true, feedback: "Tepat! Dalam ISO 9000, 'sistem' bukan tentang teknologi — melainkan tentang kumpulan elemen yang bekerja bersama. QMS (Quality Management System) adalah sistem dalam pengertian ini: proses, orang, dokumen, infrastruktur, dan kebijakan yang saling berinteraksi untuk menghasilkan mutu yang konsisten." }
                    ]
                  },
                  // SLIDE 4: SOAL 4 (PILIH MAKNA)
                  {
                    type: "compare_pick",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Pilih makna ISO",
                      text: "Dalam ISO 9000, apa yang dimaksud dengan kata OUTPUT?",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 8px;">
                          <div style="font-weight: 900; font-size: 20px; color: #0F172A; letter-spacing: 1px;">OUTPUT</div>
                        </div>
                      `
                    },
                    products: [
                      { id: "p4_awam", color: "#94A3B8", label: "Makna sehari-hari", emoji: "✅", price: "Hasil akhir yang diinginkan dan bernilai dari sebuah proses", desc: "Contoh: produk jadi yang siap dikirim ke pelanggan", correct: false, feedback: "Belum tepat. Secara sehari-hari memang output sering diasosiasikan dengan hasil yang positif. Tapi ISO 9000 mendefinisikan output sebagai semua hasil proses — termasuk yang tidak diinginkan. Implikasinya: sistem QMS Anda harus mencakup pengendalian scrap dan reject, bukan hanya produk bagus." },
                      { id: "p4_iso",  color: "#1E3A8A", label: "Makna dalam ISO 9000", emoji: "✅ + ⚠️", price: "Semua hasil dari proses — termasuk yang tidak diinginkan seperti scrap, reject, dan limbah", desc: "Proses produksi menghasilkan: produk jadi (output diinginkan) + scrap + reject (output tidak diinginkan)", correct: true, feedback: "Tepat! Dalam ISO 9000, output adalah semua hasil proses — tanpa kualifikasi bahwa hasilnya harus bagus atau diinginkan. Ini penting untuk QMS karena artinya scrap, reject, dan limbah produksi juga harus diidentifikasi, dikendalikan, dan dikelola — bukan diabaikan karena 'bukan produk sungguhan'." }
                    ]
                  },
                  // SLIDE 5: MATERI
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Mengapa Istilah Sehari-hari Bisa Menyesatkan dalam QMS"
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        title: "Lima kata yang artinya berbeda di ISO",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Lima kata ini digunakan setiap hari oleh semua orang — tapi dalam konteks ISO 9000, artinya lebih spesifik dan sering berbeda dari penggunaan umum.</p>
                            
                            <div style="background: #F8FAFC; color: #334155; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; margin-top: 12px; margin-bottom: 16px;">
                              <div style="display: flex; background: #F1F5F9; padding: 8px; border-bottom: 1px solid #E2E8F0; font-weight: bold; font-size: 11px; color: #475569;">
                                <div style="flex: 1.5;">KATA</div>
                                <div style="flex: 2.5;">ARTI SEHARI-HARI</div>
                                <div style="flex: 3;">ARTI DALAM ISO 9000</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 11px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1.5; font-weight: bold; color: #1E293B;">Produk</div>
                                <div style="flex: 2.5;">Barang fisik</div>
                                <div style="flex: 3;">Semua output proses (barang, jasa, SW)</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 11px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1.5; font-weight: bold; color: #1E293B;">Proses</div>
                                <div style="flex: 2.5;">Cara/urutan kerja</div>
                                <div style="flex: 3;">Input → Aktivitas → Output (terukur)</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 11px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1.5; font-weight: bold; color: #1E293B;">Sistem</div>
                                <div style="flex: 2.5;">Software/IT</div>
                                <div style="flex: 3;">Kumpulan elemen yang saling terkait</div>
                              </div>
                              <div style="display: flex; padding: 8px; font-size: 11px; border-bottom: 1px solid #E2E8F0;">
                                <div style="flex: 1.5; font-weight: bold; color: #1E293B;">Output</div>
                                <div style="flex: 2.5;">Hasil yang baik</div>
                                <div style="flex: 3;">Semua hasil proses (termasuk scrap)</div>
                              </div>
                            </div>

                            <div style="background: #FEF3C7; color: #334155; padding: 12px 16px; border-left: 4px solid #D97706; border-radius: 4px;">
                              <strong>📌 Saat menulis dokumen QMS, selalu tanya:</strong> "Apakah saya menggunakan kata ini dengan arti ISO atau arti sehari-hari?" Perbedaan kecil dalam kata bisa mengubah cakupan implementasi secara signifikan.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        title: "Dampak nyata salah interpretasi",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Salah mengartikan satu kata dalam dokumen QMS bukan sekadar masalah semantik — ia bisa berdampak langsung pada implementasi.</p>
                            
                            <div style="display: flex; gap: 12px; margin-top: 16px; margin-bottom: 12px;">
                              <div style="font-size: 20px;">⚠️</div>
                              <div>
                                <strong style="color: #EAB308;">Kasus 1 — "Produk":</strong><br/>
                                <span style="font-size: 12px;">Jika Anda mengartikan "produk" hanya sebagai barang fisik, prosedur pengendalian produk tidak sesuai tidak akan Anda terapkan pada jasa.</span>
                              </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                              <div style="font-size: 20px;">⚠️</div>
                              <div>
                                <strong style="color: #EAB308;">Kasus 2 — "Sistem":</strong><br/>
                                <span style="font-size: 12px;">Jika manajer berkata "sistem kita sudah bagus" dan yang dimaksud adalah software ERP-nya, tim QMS mungkin salah mengira yang dimaksud adalah QMS keseluruhan.</span>
                              </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px;">
                              <div style="font-size: 20px;">⚠️</div>
                              <div>
                                <strong style="color: #EAB308;">Kasus 3 — "Output":</strong><br/>
                                <span style="font-size: 12px;">Jika prosedur produksi hanya mengidentifikasi produk jadi sebagai output, scrap dan reject tidak akan masuk dalam sistem pengendalian.</span>
                              </div>
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        title: "Cara menghindari jebakan ini",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Tiga kebiasaan sederhana yang mencegah kesalahan interpretasi istilah:</p>
                            <ol style="padding-left: 20px; font-size: 13px;">
                              <li style="margin-bottom: 8px;"><strong style="color: #FFFFFF;">Saat membaca ISO 9001</strong> dan menemukan kata yang terasa familiar: jangan langsung asumsikan artinya sama dengan penggunaan sehari-hari. Cek dulu di ISO 9000.</li>
                              <li style="margin-bottom: 8px;"><strong style="color: #FFFFFF;">Saat menulis dokumen QMS:</strong> gunakan istilah teknis ISO persis seperti yang ada di ISO 9000.</li>
                              <li><strong style="color: #FFFFFF;">Saat berkomunikasi dengan tim non-QMS:</strong> jelaskan bahwa ada istilah yang artinya berbeda dalam konteks QMS. Miskomunikasi paling sering terjadi di sini.</li>
                            </ol>
                            
                            <div style="background: #E0F2FE; color: #0284C7; padding: 12px 16px; border-left: 4px solid #0284C7; border-radius: 4px; margin-top: 16px;">
                              <strong>Kalau ragu</strong> — buka ISO 9000:2015, cari di indeks, baca definisi + NOTE. Ini akan selalu menjadi panduan yang aman.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },
                  // SLIDE 5.5: PEMISAH
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6: SOAL 5 (PILIH LANGKAH)
                  {
                    type: "option_list",
                    xp: 40,
                    scenario: {
                      icon: "5",
                      label: "Pilih respons yang tepat",
                      text: "Direktur Operasional berkata dalam rapat: 'Kita tidak perlu khawatir soal klausul output — kita kan bukan pabrik, tidak ada produk fisik yang kita hasilkan.' Apa yang sebaiknya disampaikan Manajer QMS?",
                      autoCheck: true,
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                          <div style="width: 48px; height: 48px; border-radius: 24px; background: #E2E8F0; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">👨‍💼</div>
                          <div style="flex: 1; background: #F8FAFC; padding: 12px; border-radius: 12px; border-top-left-radius: 0; position: relative;">
                            <div style="font-weight: bold; font-size: 11px; color: #64748B; margin-bottom: 4px;">Direktur Operasional</div>
                            <div style="color: #0F172A; font-size: 13px; font-weight: 500; font-style: italic;">"Kita tidak perlu khawatir soal klausul output — kita kan bukan pabrik, tidak ada produk fisik yang kita hasilkan."</div>
                          </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; align-items: flex-start; gap: 12px; opacity: 0.8;">
                          <div style="font-size: 28px; line-height: 1;">❓</div>
                          <div style="width: 40px; height: 40px; border-radius: 20px; background: #1E293B; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;">👩‍💼</div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", icon: "🤐", text: "Diam saja — direktur mungkin benar, perusahaan jasa memang berbeda", correct: false, revealState: "invalid", feedback: "Diam bukan pilihan yang baik — ini akan menyebabkan gap implementasi yang akan muncul saat audit. Manajer QMS punya tanggung jawab untuk meluruskan interpretasi yang salah, termasuk di hadapan direktur." },
                      { id: "b", icon: "📖", text: "\"Pak, dalam ISO 9000, 'output' dan 'produk' mencakup semua hasil proses termasuk jasa. Jadi klausul tersebut tetap berlaku untuk kita.\"", correct: true, revealState: "valid", feedback: "Tepat! Ini respons yang tepat — langsung merujuk ke definisi ISO 9000 dan menjelaskan implikasinya. Dalam ISO 9000, 'output' dan 'produk' mencakup semua hasil proses termasuk jasa, laporan, dan layanan. Perusahaan jasa tetap harus menerapkan klausul pengendalian output tidak sesuai." },
                      { id: "c", icon: "📋", text: "\"Baik Pak, saya akan kaji ulang apakah klausul ini relevan untuk kita.\"", correct: false, revealState: "invalid", feedback: "Mengkaji ulang relevansi klausul bukan jawaban yang tepat — relevansinya sudah jelas. Yang perlu dilakukan adalah menjelaskan bahwa definisi ISO 9000 untuk 'output' dan 'produk' mencakup jasa, sehingga klausul tersebut memang berlaku." }
                    ]
                  },
                  // SLIDE 7: SOAL 6 (PILIH LANGKAH)
                  {
                    type: "option_list",
                    xp: 40,
                    scenario: {
                      icon: "6",
                      label: "Pilih respons yang tepat",
                      text: "Staf baru di tim QMS bertanya: 'Di prosedur ini ada kata proses, tapi saya bingung — bedanya apa dengan kegiatan atau aktivitas biasa?' Apa jawaban paling tepat?",
                      autoCheck: true,
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                          <div style="width: 48px; height: 48px; border-radius: 24px; background: #DBEAFE; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">👦</div>
                          <div style="flex: 1; background: #F8FAFC; padding: 12px; border-radius: 12px; border-top-left-radius: 0; position: relative;">
                            <div style="font-weight: bold; font-size: 11px; color: #3B82F6; margin-bottom: 4px;">Staf Baru QMS</div>
                            <div style="color: #0F172A; font-size: 13px; font-weight: 500; font-style: italic;">"Di prosedur ini ada kata proses, tapi saya bingung — bedanya apa dengan kegiatan atau aktivitas biasa?"</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", icon: "📖", text: "\"Dalam ISO 9000, proses adalah aktivitas yang punya input jelas, mengubah input itu menjadi output, dan outputnya terukur. Kalau tidak ada ketiga elemen itu, itu bukan proses.\"", correct: true, revealState: "valid", feedback: "Tepat! Jawaban ini langsung menyebutkan tiga elemen kunci yang membedakan 'proses' dalam ISO 9000: input yang jelas, aktivitas yang mengubahnya, dan output yang terukur. Dengan penjelasan ini, staf baru bisa langsung mengenali apakah sesuatu bisa disebut proses atau bukan." },
                      { id: "b", icon: "🤷", text: "\"Proses itu ya sama saja dengan kegiatan — hanya istilah formalnya saja yang berbeda dalam dokumen ISO.\"", correct: false, revealState: "invalid", feedback: "Ini penjelasan yang menyesatkan. Proses dalam ISO 9000 bukan sekadar istilah formal untuk kegiatan biasa — ia punya definisi spesifik dengan tiga elemen yang harus ada. Menyamakannya dengan kegiatan biasa akan membuat staf salah mengidentifikasi proses dalam QMS." },
                      { id: "c", icon: "🌐", text: "\"Cari saja di Google, banyak penjelasan tentang perbedaan proses dan aktivitas dalam ISO.\"", correct: false, revealState: "invalid", feedback: "Mengarahkan ke Google berisiko — hasil pencarian bisa tidak akurat, sudah usang, atau dari sumber yang tidak resmi. Untuk pertanyaan tentang definisi istilah ISO, sumbernya harus ISO 9000:2015 langsung." }
                    ]
                  },
                  // SLIDE 8: SOAL 7 (PILIH LANGKAH)
                  {
                    type: "option_list",
                    xp: 40,
                    scenario: {
                      icon: "7",
                      label: "Pilih respons yang tepat",
                      text: "Kepala IT berkata: 'Sistem kita sudah sangat bagus — server baru sudah terpasang, ERP sudah diperbarui.' Manajer QMS menerima laporan ini untuk tinjauan manajemen QMS. Apa yang sebaiknya dilakukan?",
                      autoCheck: true,
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; padding: 12px; border-radius: 12px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                          <div style="width: 40px; height: 40px; border-radius: 20px; background: #E2E8F0; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;">👨‍💻</div>
                          <div style="flex: 1; background: #F1F5F9; padding: 10px; border-radius: 10px; border-top-left-radius: 0;">
                            <div style="font-weight: bold; font-size: 10px; color: #475569; margin-bottom: 2px;">Kepala IT</div>
                            <div style="color: #334155; font-size: 12px; font-style: italic;">"Sistem kita sudah sangat bagus — server baru sudah terpasang, ERP sudah diperbarui."</div>
                          </div>
                        </div>
                        
                        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                          <div style="flex: 1; border: 1px solid #CBD5E1; border-radius: 6px; padding: 8px;">
                            <div style="font-weight: bold; font-size: 9px; color: #64748B; margin-bottom: 2px;">Yang dimaksud Kepala IT</div>
                            <div style="font-size: 11px; color: #0F172A;">Sistem = infrastruktur IT</div>
                          </div>
                          <div style="flex: 1; border: 1px solid #6366F1; border-radius: 6px; padding: 8px; background: #EEF2FF;">
                            <div style="font-weight: bold; font-size: 9px; color: #4F46E5; margin-bottom: 2px;">Yang relevan untuk QMS</div>
                            <div style="font-size: 11px; color: #1E3A8A;">Sistem = QMS secara keseluruhan</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Mencatat laporan Kepala IT sebagai bukti bahwa 'sistem QMS sudah bagus' dan memasukkannya ke dalam notulen", correct: false, revealState: "invalid", feedback: "Ini kesalahan serius. Laporan tentang kondisi IT bukan data kinerja QMS. Memasukkannya sebagai bukti kondisi QMS akan menghasilkan tinjauan manajemen yang tidak akurat dan bisa menyembunyikan masalah nyata dalam sistem mutu." },
                      { id: "b", icon: "📋", text: "Meminta klarifikasi dulu: \"Yang Bapak maksud sistem di sini adalah infrastruktur IT atau kondisi QMS secara keseluruhan?\" — lalu meminta data kinerja QMS", correct: true, revealState: "valid", feedback: "Tepat! Ini respons yang benar — meminta klarifikasi terlebih dahulu sebelum mengambil kesimpulan. 'Sistem' dalam konteks tinjauan manajemen ISO 9001 merujuk ke QMS secara keseluruhan, bukan infrastruktur IT. Data kinerja QMS yang sesungguhnya (capaian sasaran mutu, hasil audit, kepuasan pelanggan) adalah yang dibutuhkan." },
                      { id: "c", icon: "🔄", text: "Menggabungkan laporan IT dengan data QMS lainnya dan menyimpulkan bahwa sistem secara keseluruhan sudah baik", correct: false, revealState: "invalid", feedback: "Menggabungkan data IT dengan data QMS dan menyimpulkan semuanya baik adalah logika yang cacat. Kondisi infrastruktur IT dan kondisi QMS adalah dua hal berbeda — keduanya tidak bisa digabung untuk menghasilkan kesimpulan tentang salah satunya." }
                    ]
                  },
                  // SLIDE 9: SOAL 8 (PILIH LANGKAH)
                  {
                    type: "option_list",
                    xp: 40,
                    scenario: {
                      icon: "8",
                      label: "Pilih respons yang tepat",
                      text: "Dalam prosedur baru, staf QC menulis: 'Output proses produksi adalah produk jadi yang siap dikirim.' Auditor mempertanyakan kalimat ini. Apa yang harus dilakukan?",
                      autoCheck: true,
                      htmlContext: `
                        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; margin-bottom: 12px; position: relative;">
                          <div style="font-weight: 800; font-size: 12px; color: #0F172A; margin-bottom: 8px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">PRD-01: Prosedur Produksi</div>
                          <div style="font-size: 12px; color: #334155; line-height: 1.5;">
                            4.3 Penyerahan Hasil<br/>
                            <span style="background: #FEF08A; padding: 2px 4px; border-radius: 2px; font-weight: bold;">Output dari proses produksi adalah produk jadi yang siap dikirim ke pelanggan.</span> 
                            Proses serah terima dilakukan oleh...
                          </div>
                          
                          <div style="position: absolute; right: -8px; top: 16px; background: #1E293B; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 140px;">
                            <div style="margin-bottom: 2px;">🔍 <strong>Auditor:</strong></div>
                            "Apakah hanya ini output-nya?"
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", icon: "✏️", text: "Revisi kalimat menjadi: \"Output dari proses produksi mencakup produk jadi, produk reject, dan scrap...\"", correct: true, revealState: "valid", feedback: "Tepat! Dalam ISO 9000, output proses mencakup semua hasil — termasuk yang tidak diinginkan. Merevisi kalimat untuk mencakup produk reject dan scrap juga menunjukkan bahwa sistem QMS Anda mengendalikan semua output, bukan hanya yang bagus. Ini yang diharapkan ISO 9001 klausul 8.7." },
                      { id: "b", icon: "💬", text: "Jelaskan ke auditor bahwa scrap dan reject tidak perlu disebutkan karena sudah diketahui semua orang di pabrik", correct: false, revealState: "invalid", feedback: "Alasan 'sudah diketahui semua orang' tidak diterima dalam audit. Dokumen QMS harus eksplisit dan tidak bergantung pada asumsi pengetahuan bersama. Auditor mengevaluasi apa yang tertulis, bukan apa yang diasumsikan." },
                      { id: "c", icon: "🗑️", text: "Hapus kalimat tersebut dari prosedur agar tidak menimbulkan pertanyaan lebih lanjut", correct: false, revealState: "invalid", feedback: "Menghapus kalimat bermasalah bukan solusi — justru akan menghilangkan informasi penting tentang output proses yang seharusnya ada di prosedur. Solusi yang benar adalah merevisi kalimat agar sesuai dengan definisi ISO 9000." }
                    ]
                  },
                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai",
                      insight: "Anda sudah menguasai perbedaan makna sehari-hari vs makna teknis ISO — dan tahu cara menerapkannya dalam situasi nyata.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Produk dalam ISO = semua output proses, bukan hanya barang fisik",
                        "Proses dalam ISO = input + aktivitas + output terukur — tiga elemen wajib",
                        "Sistem dalam ISO = kumpulan elemen yang saling terkait, bukan software/IT",
                        "Output dalam ISO = semua hasil proses termasuk scrap dan reject — semua harus dikendalikan"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              }
            ],
          },
          // ───────────────────────────────────────────────────────────
          // LESSON 3: Istilah Tentang Organisasi (Klausul 3)
          // ───────────────────────────────────────────────────────────
          {
            id:    "istilah-organisasi",
            title: "Istilah Tentang Organisasi (Klausul 3)",
            icon:  "🏢",
            color: COLORS.plan,

            subLessons: [
              {
                id:       "organisasi-vs-pihak-berkepentingan",
                title:    "Organisasi vs pihak berkepentingan (interested party)",
                icon:     "🤝",
                duration: "8 menit",
                slides: [
                  // SLIDE 1: TAP CLASSIFY 1
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Pihak",
                      text: "",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">
                          PT Makmur Sejahtera adalah perusahaan manufaktur yang memproduksi spare part otomotif.
                        </div>
                      `
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "org", label: "🏢 Organisasi", subLabel: "Menjalankan QMS" },
                      { id: "pihak", label: "🌐 Pihak Berkepentingan", subLabel: "Dipengaruhi atau mempengaruhi" }
                    ],
                    cards: [
                      { id: "c1", icon: "👷", text: "Karyawan produksi PT Makmur", targetZone: "org" },
                      { id: "c2", icon: "🚗", text: "PT Toyota — pembeli spare part", targetZone: "pihak" },
                      { id: "c3", icon: "👨‍💼", text: "Manajer QC PT Makmur", targetZone: "org" },
                      { id: "c4", icon: "🏛️", text: "Dinas Ketenagakerjaan setempat", targetZone: "pihak" },
                      { id: "c5", icon: "🏭", text: "Direktur Utama PT Makmur", targetZone: "org" },
                      { id: "c6", icon: "🤝", text: "Pemasok bahan baku baja", targetZone: "pihak" }
                    ],
                    feedbackCorrect: "Sempurna! Organisasi mencakup semua orang yang bekerja di bawah kendali perusahaan (karyawan, manajer, direktur). Pihak berkepentingan adalah pihak luar yang dapat mempengaruhi atau dipengaruhi QMS — pelanggan, pemasok, regulator.",
                    feedbackWrong: "Ada yang tertukar. Organisasi = semua pihak yang bekerja di bawah kendali PT Makmur. Pihak berkepentingan = pihak luar yang hubungannya mempengaruhi atau dipengaruhi oleh QMS perusahaan."
                  },
                  // SLIDE 2: TAP CLASSIFY 2
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Pihak",
                      text: "",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">
                          RS Sehat Bersama adalah rumah sakit swasta yang sedang mengimplementasikan ISO 9001.
                        </div>
                      `
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "org", label: "🏢 Organisasi", subLabel: "Menjalankan QMS" },
                      { id: "pihak", label: "🌐 Pihak Berkepentingan", subLabel: "Dipengaruhi atau mempengaruhi" }
                    ],
                    cards: [
                      { id: "c1", icon: "👨‍⚕️", text: "Dokter spesialis RS Sehat Bersama", targetZone: "org" },
                      { id: "c2", icon: "🤒", text: "Pasien rawat inap", targetZone: "pihak" },
                      { id: "c3", icon: "💊", text: "PT Kimia Farma — pemasok obat", targetZone: "pihak" },
                      { id: "c4", icon: "👩‍💼", text: "Manajer Mutu RS", targetZone: "org" },
                      { id: "c5", icon: "🏛️", text: "Kementerian Kesehatan", targetZone: "pihak" },
                      { id: "c6", icon: "🧹", text: "Staf kebersihan outsourcing", targetZone: "pihak" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan staf outsourcing — meski bekerja di dalam rumah sakit, mereka tidak berada di bawah kendali langsung RS sehingga termasuk pihak berkepentingan eksternal. ISO 9001 klausul 4.2 mewajibkan organisasi mengidentifikasi semua pihak berkepentingan yang relevan, termasuk penyedia jasa outsourcing.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan terutama staf outsourcing — mereka bekerja di lokasi RS tapi bukan karyawan RS. Organisasi = pihak yang berada di bawah kendali langsung RS. Pihak berkepentingan = semua pihak lain yang relevan, termasuk outsourcing, pemasok, regulator, dan pasien."
                  },
                  // SLIDE 3: TAP CLASSIFY 3
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Pihak",
                      text: "",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">
                          CV Rasa Nusantara adalah usaha katering yang menyuplai makanan ke 5 perusahaan di kawasan industri.
                        </div>
                      `
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "org", label: "🏢 Organisasi", subLabel: "Menjalankan QMS" },
                      { id: "pihak", label: "🌐 Pihak Berkepentingan", subLabel: "Dipengaruhi atau mempengaruhi" }
                    ],
                    cards: [
                      { id: "c1", icon: "👨‍🍳", text: "Chef kepala CV Rasa Nusantara", targetZone: "org" },
                      { id: "c2", icon: "🏭", text: "PT Tekstil Maju — klien katering", targetZone: "pihak" },
                      { id: "c3", icon: "🌾", text: "Pak Budi — petani sayur langganan", targetZone: "pihak" },
                      { id: "c4", icon: "🚗", text: "Pengemudi delivery CV Rasa (karyawan tetap)", targetZone: "org" },
                      { id: "c5", icon: "⭐", text: "Reviewer di Google Maps yang sering memberi ulasan", targetZone: "pihak" },
                      { id: "c6", icon: "📦", text: "PT Plastindo — pemasok kemasan", targetZone: "pihak" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan reviewer Google Maps — meski bukan pelanggan langsung, ulasan mereka mempengaruhi reputasi dan keputusan calon klien CV Rasa. ISO 9001 mendefinisikan pihak berkepentingan sebagai siapapun yang dapat mempengaruhi atau dipengaruhi oleh organisasi — termasuk publik dan media.",
                    feedbackWrong: "Ada yang tertukar. Reviewer online termasuk pihak berkepentingan karena ulasan mereka mempengaruhi reputasi bisnis. Pihak berkepentingan tidak hanya pelanggan resmi — siapapun yang dapat mempengaruhi atau dipengaruhi oleh organisasi masuk kategori ini."
                  },
                  // SLIDE 4: TAP CLASSIFY 4
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Pihak",
                      text: "",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">
                          PT Bangunan Kokoh adalah kontraktor konstruksi yang sedang membangun gedung perkantoran untuk klien swasta.
                        </div>
                      `
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "org", label: "🏢 Organisasi", subLabel: "Menjalankan QMS" },
                      { id: "pihak", label: "🌐 Pihak Berkepentingan", subLabel: "Dipengaruhi atau mempengaruhi" }
                    ],
                    cards: [
                      { id: "c1", icon: "👷", text: "Mandor lapangan PT Bangunan Kokoh", targetZone: "org" },
                      { id: "c2", icon: "🏢", text: "PT Office Prima — pemilik gedung (klien)", targetZone: "pihak" },
                      { id: "c3", icon: "🧱", text: "CV Bata Merah — subkontraktor pasangan bata", targetZone: "pihak" },
                      { id: "c4", icon: "👩‍💼", text: "Site Manager PT Bangunan Kokoh", targetZone: "org" },
                      { id: "c5", icon: "🏘️", text: "Warga RT 05 di sekitar lokasi proyek", targetZone: "pihak" },
                      { id: "c6", icon: "🏛️", text: "Dinas Pekerjaan Umum — penerbit IMB", targetZone: "pihak" }
                    ],
                    feedbackCorrect: "Sempurna! Subkontraktor bekerja di lokasi proyek tapi tetap pihak eksternal yang independen — mereka adalah pihak berkepentingan, bukan bagian dari organisasi. Warga sekitar yang terdampak kebisingan dan debu juga merupakan pihak berkepentingan yang perlu diidentifikasi dalam konteks ISO 9001 klausul 4.2.",
                    feedbackWrong: "Ada yang perlu diperbaiki. Subkontraktor dan warga sekitar keduanya adalah pihak berkepentingan eksternal — bukan bagian dari organisasi PT Bangunan Kokoh meski berada di lokasi proyek."
                  },
                  // SLIDE 5: MATERI INTI
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Organisasi vs Pihak Berkepentingan dalam ISO 9001"
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        title: "Definisi resmi dari ISO 9000:2015",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000 mendefinisikan dua istilah ini dengan tegas:</p>
                            <ul style="padding-left: 20px;">
                              <li><strong style="color: #FFFFFF;">Organisasi:</strong> Seseorang atau sekelompok orang yang memiliki fungsi dengan tanggung jawab, wewenang, dan hubungan untuk mencapai tujuannya. Dalam konteks ISO 9001 — ini adalah pihak yang menjalankan QMS, yang berada di bawah kendali langsung manajemen.</li>
                              <li style="margin-top: 8px;"><strong style="color: #FFFFFF;">Pihak Berkepentingan (Interested Party):</strong> Orang atau organisasi yang dapat mempengaruhi, dipengaruhi, atau merasa dipengaruhi oleh suatu keputusan atau aktivitas organisasi.</li>
                            </ul>
                            
                            <div style="background: #FEF3C7; color: #334155; padding: 12px 16px; border-left: 4px solid #D97706; border-radius: 4px; margin-top: 16px;">
                              <strong>📌 Kata kunci pembeda: "kendali langsung".</strong> Jika seseorang berada di bawah kendali langsung manajemen organisasi → bagian dari organisasi. Jika tidak → pihak berkepentingan.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        title: "Mengapa ISO 9001 mensyaratkan identifikasi keduanya?",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9001:2015 Klausul 4.2 secara eksplisit mensyaratkan organisasi untuk:</p>
                            <ul style="padding-left: 20px; color: #94A3B8;">
                              <li>Menentukan pihak-pihak berkepentingan yang relevan</li>
                              <li>Menentukan persyaratan pihak-pihak tersebut yang relevan dengan QMS</li>
                            </ul>
                            
                            <div style="font-family: monospace; background: #0F172A; color: #38BDF8; padding: 16px; border-radius: 8px; font-size: 11px; white-space: pre; overflow-x: auto; margin-top: 16px; margin-bottom: 16px; border: 1px solid #1E293B;">
┌─────────────────────────────────────┐
│   LINGKUNGAN EKSTERNAL              │
│  ┌───────────────────────────────┐  │
│  │  PIHAK BERKEPENTINGAN         │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │     ORGANISASI          │  │  │
│  │  │   (menjalankan QMS)     │  │  │
│  │  └─────────────────────────┘  │  │
│  │  pelanggan, pemasok,          │  │
│  │  regulator, masyarakat        │  │
│  └───────────────────────────────┘  │
│  kompetitor, tren industri          │
└─────────────────────────────────────┘
                            </div>
                            <p style="font-size: 13px;">Organisasi berada di dalam — menjalankan QMS. Pihak berkepentingan berada di lapisan luar — mempengaruhi dan dipengaruhi oleh apa yang organisasi lakukan.</p>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        title: "Kategori pihak berkepentingan yang sering terlupakan",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Pelanggan dan pemasok mudah diingat. Yang sering terlupakan:</p>
                            
                            <div style="display: flex; gap: 12px; margin-top: 16px; margin-bottom: 12px; font-size: 13px;">
                              <div style="font-size: 20px;">🏛️</div>
                              <div>
                                <strong style="color: #FFFFFF;">Regulator dan pemerintah</strong> — Dinas Ketenagakerjaan, BPOM, Dinas Lingkungan Hidup. Persyaratan mereka harus dipertimbangkan dalam QMS.
                              </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 13px;">
                              <div style="font-size: 20px;">🏘️</div>
                              <div>
                                <strong style="color: #FFFFFF;">Masyarakat sekitar</strong> — Warga yang terdampak operasional: kebisingan, polusi, kemacetan. Relevan terutama untuk industri manufaktur dan konstruksi.
                              </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 13px;">
                              <div style="font-size: 20px;">💼</div>
                              <div>
                                <strong style="color: #FFFFFF;">Pemilik / investor</strong> — Mereka memiliki kepentingan terhadap kinerja dan keberlanjutan QMS karena berdampak ke nilai bisnis.
                              </div>
                            </div>
                            
                            <div style="display: flex; gap: 12px; font-size: 13px;">
                              <div style="font-size: 20px;">🌐</div>
                              <div>
                                <strong style="color: #FFFFFF;">Publik dan media</strong> — Ulasan online, liputan media, opini publik. Mempengaruhi reputasi dan kepercayaan pelanggan terhadap organisasi.
                              </div>
                            </div>

                            <div style="background: #1E3A8A; color: #DBEAFE; padding: 12px 16px; border-left: 4px solid #3B82F6; border-radius: 4px; margin-top: 16px;">
                              <strong>ISO 9001 tidak mewajibkan Anda melayani semua pihak berkepentingan</strong> — tapi mewajibkan Anda mengidentifikasi mana yang relevan dan memahami persyaratan mereka yang berdampak ke QMS.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },
                  // SLIDE 5.5: INTRO QUIZ
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6: KUIS YA/TIDAK 1
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Seorang konsultan ISO yang bekerja paruh waktu untuk PT Maju membantu menyusun Manual Mutu. Ia termasuk bagian dari ORGANISASI PT Maju dalam konteks ISO 9001.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; text-align: center; width: 45%; border: 1px solid #CBD5E1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="font-size: 24px; margin-bottom: 4px;">👨‍💼</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px;">Konsultan ISO</div>
                            <div style="font-size: 10px; color: #64748B;">Paruh waktu, kontrak proyek</div>
                          </div>
                          
                          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="width: 24px; height: 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: #E2E8F0; color: #475569; font-weight: bold; font-size: 14px; position: relative; z-index: 2;">+</div>
                            <div style="position: absolute; width: 80px; height: 0; border-top: 2px dashed #CBD5E1; z-index: 1;"></div>
                          </div>
                          
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; text-align: center; width: 45%; border: 1px solid #CBD5E1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="font-size: 24px; margin-bottom: 4px;">🏢</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px;">PT Maju</div>
                            <div style="font-size: 10px; color: #64748B;">Sedang implementasi ISO 9001</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "wrong_choice", icon: "✅", label: "Benar", subLabel: "Ia menjalankan QMS bersama", correct: false, feedback: "Belum tepat. Konsultan paruh waktu tetap pihak eksternal meskipun pekerjaannya sangat dekat dengan inti QMS. Ia tidak berada di bawah kendali langsung manajemen PT Maju — hubungannya bersifat kontraktual, bukan organisasional. Dalam ISO 9001, ia termasuk penyedia eksternal." },
                      { id: "correct_choice", icon: "❌", label: "Salah", subLabel: "Ia pihak eksternal", correct: true, feedback: "Tepat! Konsultan eksternal — meskipun membantu menyusun dokumen QMS — tidak berada di bawah kendali langsung PT Maju. Ia adalah pihak berkepentingan eksternal (penyedia jasa), bukan bagian dari organisasi. Yang menentukan bukan seberapa dalam keterlibatannya, tapi apakah ia berada di bawah kendali manajemen PT Maju." }
                    ]
                  },
                  // SLIDE 7: KUIS YA/TIDAK 2
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "ISO 9001 klausul 4.2 hanya mewajibkan organisasi untuk mengidentifikasi pelanggan dan pemasok sebagai pihak berkepentingan.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; justify-content: space-around; margin-bottom: 16px;">
                          <div style="text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">👥</div>
                            <div style="font-size: 11px; font-weight: bold; color: #334155;">Pelanggan</div>
                            <div style="color: #10B981; font-weight: bold; font-size: 14px;">✓</div>
                          </div>
                          <div style="text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🚚</div>
                            <div style="font-size: 11px; font-weight: bold; color: #334155;">Pemasok</div>
                            <div style="color: #10B981; font-weight: bold; font-size: 14px;">✓</div>
                          </div>
                          <div style="text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🏛️</div>
                            <div style="font-size: 11px; font-weight: bold; color: #334155;">Regulator</div>
                            <div style="color: #EAB308; font-weight: bold; font-size: 14px;">❓</div>
                          </div>
                          <div style="text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🏘️</div>
                            <div style="font-size: 11px; font-weight: bold; color: #334155;">Masyarakat</div>
                            <div style="color: #EAB308; font-weight: bold; font-size: 14px;">❓</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "wrong_choice", icon: "✅", label: "Benar", subLabel: "Cukup pelanggan & pemasok", correct: false, feedback: "Belum tepat. ISO 9001 klausul 4.2 menggunakan frasa 'pihak berkepentingan yang relevan' — tanpa membatasinya hanya pada pelanggan dan pemasok. Regulator yang menerbitkan izin, masyarakat yang terdampak operasional, dan investor yang menentukan kebijakan bisnis semuanya bisa menjadi pihak berkepentingan yang relevan." },
                      { id: "correct_choice", icon: "❌", label: "Salah", subLabel: "Cakupannya lebih luas", correct: true, feedback: "Tepat! Klausul 4.2 tidak membatasi pihak berkepentingan hanya pada pelanggan dan pemasok. Setiap pihak yang dapat mempengaruhi atau dipengaruhi oleh QMS harus diidentifikasi — termasuk regulator, karyawan, investor, masyarakat sekitar, bahkan media. Yang menentukan adalah relevansinya terhadap QMS, bukan jenisnya." }
                    ]
                  },
                  // SLIDE 8: KUIS YA/TIDAK 3
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "PT Segar Alami mengidentifikasi 47 pihak berkepentingan dalam dokumen konteks organisasinya. Ini menunjukkan implementasi klausul 4.2 yang lebih baik dibanding perusahaan yang hanya mengidentifikasi 8 pihak berkepentingan.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: stretch; gap: 12px; margin-bottom: 12px;">
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #3B82F6; padding: 12px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(59,130,246,0.1); position: relative;">
                            <div style="position: absolute; top: 4px; right: 6px; font-size: 14px;">⭐</div>
                            <div style="font-weight: bold; font-size: 11px; color: #1E3A8A; margin-bottom: 8px;">PT Segar Alami</div>
                            <div style="font-weight: 900; font-size: 32px; color: #2563EB; line-height: 1;">47</div>
                            <div style="font-size: 9px; color: #64748B; margin-top: 8px;">Pihak berkepentingan teridentifikasi</div>
                          </div>
                          
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <div style="font-weight: bold; font-size: 11px; color: #475569; margin-bottom: 8px;">Perusahaan B</div>
                            <div style="font-weight: 900; font-size: 32px; color: #64748B; line-height: 1;">8</div>
                            <div style="font-size: 9px; color: #94A3B8; margin-top: 8px;">Pihak berkepentingan teridentifikasi</div>
                          </div>
                        </div>
                        <div style="text-align: center; font-size: 12px; color: #64748B; font-style: italic;">Apakah lebih banyak = lebih baik?</div>
                      `
                    },
                    options: [
                      { id: "wrong_choice", icon: "📈", label: "Benar", subLabel: "Makin banyak makin baik", correct: false, feedback: "Belum tepat. ISO 9001 tidak meminta daftar pihak berkepentingan yang panjang — ia meminta daftar yang relevan. Jumlah besar bisa jadi tanda bahwa organisasi memasukkan pihak yang tidak benar-benar relevan dengan QMS-nya. Yang diuji auditor bukan jumlahnya, tapi apakah organisasi bisa menjelaskan mengapa setiap pihak dianggap relevan." },
                      { id: "correct_choice", icon: "🎯", label: "Salah", subLabel: "Yang penting relevansinya", correct: true, feedback: "Tepat! ISO 9001 klausul 4.2 menggunakan kata kunci 'relevan' — bukan 'semua'. Mengidentifikasi 47 pihak berkepentingan tidak otomatis lebih baik jika sebagian besar tidak relevan dengan QMS. Sebaliknya, 8 pihak berkepentingan yang tepat dan relevan lebih bernilai. Kualitas identifikasi lebih penting dari kuantitas." }
                    ]
                  },
                  // SLIDE 9: KUIS YA/TIDAK 4
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Daftar pihak berkepentingan yang dibuat saat implementasi awal ISO 9001 cukup digunakan selamanya — tidak perlu ditinjau ulang.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 6px; text-align: center; width: 40%;">
                              <div style="font-size: 20px; margin-bottom: 4px;">📄</div>
                              <div style="font-size: 10px; font-weight: bold; color: #475569;">Daftar Pihak Berkepentingan</div>
                              <div style="font-size: 14px; font-weight: 900; color: #2563EB; margin-top: 4px;">2019</div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; align-items: center;">
                              <div style="color: #64748B; font-size: 10px; font-weight: bold; margin-bottom: 4px;">5 tahun berlalu</div>
                              <div style="width: 40px; height: 2px; background: #CBD5E1; position: relative;">
                                <div style="position: absolute; right: -4px; top: -4px; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 5px solid #CBD5E1;"></div>
                              </div>
                            </div>
                            
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 6px; text-align: center; width: 40%;">
                              <div style="font-size: 20px; margin-bottom: 4px;">📅</div>
                              <div style="font-size: 10px; font-weight: bold; color: #475569;">Kalender Sekarang</div>
                              <div style="font-size: 14px; font-weight: 900; color: #EAB308; margin-top: 4px;">2024</div>
                            </div>
                          </div>
                          
                          <div style="display: flex; justify-content: space-around; background: #F1F5F9; padding: 8px; border-radius: 8px;">
                            <div style="display: flex; flex-direction: column; alignItems: center; text-align: center; gap: 4px;">
                              <div style="font-size: 16px;">🔄</div>
                              <div style="font-size: 9px; color: #475569; font-weight: 500;">Regulasi<br/>berubah</div>
                            </div>
                            <div style="display: flex; flex-direction: column; alignItems: center; text-align: center; gap: 4px;">
                              <div style="font-size: 16px;">👥</div>
                              <div style="font-size: 9px; color: #475569; font-weight: 500;">Pelanggan<br/>baru</div>
                            </div>
                            <div style="display: flex; flex-direction: column; alignItems: center; text-align: center; gap: 4px;">
                              <div style="font-size: 16px;">🌐</div>
                              <div style="font-size: 9px; color: #475569; font-weight: 500;">Pasar<br/>bergeser</div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "wrong_choice", icon: "📄", label: "Benar", subLabel: "Sekali buat, berlaku terus", correct: false, feedback: "Belum tepat. Konteks organisasi dan pihak berkepentingan bersifat dinamis. Daftar yang dibuat tahun 2019 mungkin sudah tidak relevan di 2024 — pelanggan berubah, regulasi baru terbit, mitra baru masuk. ISO 9001 mengharapkan organisasi secara aktif memantau dan memperbarui pemahaman tentang pihak berkepentingannya." },
                      { id: "correct_choice", icon: "🔄", label: "Salah", subLabel: "Perlu ditinjau berkala", correct: true, feedback: "Tepat! Pihak berkepentingan berubah seiring waktu — pelanggan baru masuk, regulasi berubah, kondisi pasar bergeser, kompetitor baru muncul. ISO 9001 klausul 4.2 harus ditinjau ulang secara berkala — biasanya dalam siklus tinjauan manajemen atau saat ada perubahan signifikan dalam konteks organisasi." }
                    ]
                  },
                  // SLIDE 10: FINISH
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai",
                      insight: "Anda sudah mampu membedakan organisasi dan pihak berkepentingan, termasuk kasus-kasus yang tidak jelas batasnya.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Organisasi = pihak yang berada di bawah kendali langsung manajemen dan menjalankan QMS",
                        "Pihak berkepentingan = siapapun yang dapat mempengaruhi atau dipengaruhi oleh QMS — termasuk regulator, masyarakat, dan media",
                        "Subkontraktor, konsultan, dan outsourcing adalah pihak berkepentingan eksternal — bukan bagian dari organisasi",
                        "ISO 9001 mensyaratkan identifikasi pihak berkepentingan yang relevan — kualitas identifikasi lebih penting dari kuantitas"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              {
                id:       "pelanggan-siapa-dimaksud",
                title:    "Pelanggan (customer) — siapa yang dimaksud standar?",
                icon:     "🤝",
                duration: "10 menit",
                slides: [
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Pelanggan",
                      text: "Klasifikasikan setiap pihak: pelanggan INTERNAL atau EKSTERNAL?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Garuda Tekstil memproduksi kain dan menjualnya ke berbagai pihak.</div>`
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "internal", label: "🏢 Pelanggan Internal", subLabel: "Menerima output dari dalam organisasi", color: COLORS.dark },
                      { id: "eksternal", label: "🌐 Pelanggan Eksternal", subLabel: "Di luar organisasi", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "✂️", text: "Departemen Penjahitan PT Garuda — menerima kain dari Departemen Weaving", targetZone: "internal" },
                      { id: "c2", icon: "🏬", text: "Toko Baju Modis — membeli kain untuk dijual eceran", targetZone: "eksternal" },
                      { id: "c3", icon: "🧵", text: "Tim Finishing — menerima kain mentah dari tim Dyeing", targetZone: "internal" },
                      { id: "c4", icon: "👗", text: "Brand fashion Batik Nusantara — pesan kain motif batik", targetZone: "eksternal" },
                      { id: "c5", icon: "🏭", text: "Divisi Ekspor PT Garuda — menerima kain jadi dari produksi", targetZone: "internal" },
                      { id: "c6", icon: "🇸🇬", text: "Importir tekstil di Singapura", targetZone: "eksternal" }
                    ],
                    feedbackCorrect: "Sempurna! Pelanggan internal adalah pihak di dalam organisasi yang menerima output dari proses atau departemen lain — seperti departemen berikutnya dalam lini produksi. Mereka juga punya 'persyaratan' yang harus dipenuhi oleh departemen sebelumnya.",
                    feedbackWrong: "Ada yang tertukar. Pelanggan internal = menerima output dari dalam organisasi yang sama (antar departemen/divisi). Pelanggan eksternal = di luar organisasi — bisa pembeli langsung, distributor, atau importir."
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Pelanggan",
                      text: "Klasifikasikan: pelanggan LANGSUNG atau pelanggan AKHIR?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Farmasi Prima memproduksi obat generik yang didistribusikan melalui apotek ke pasien.</div>`
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "langsung", label: "🤝 Pelanggan Langsung", subLabel: "Bertransaksi langsung dengan organisasi", color: COLORS.dark },
                      { id: "akhir", label: "🏁 Pelanggan Akhir", subLabel: "Pengguna terakhir produk/jasa", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🏥", text: "RS Harapan Sehat — membeli obat langsung dari PT Farmasi", targetZone: "langsung" },
                      { id: "c2", icon: "👴", text: "Pak Hendra — pasien yang minum obat tersebut", targetZone: "akhir" },
                      { id: "c3", icon: "💊", text: "Apotek Kimia Farma — distributor resmi obat PT Farmasi", targetZone: "langsung" },
                      { id: "c4", icon: "👩", text: "Ibu Sari — membeli obat di apotek untuk anaknya", targetZone: "akhir" },
                      { id: "c5", icon: "🏪", text: "PT Distribusi Medika — grosir alkes & farmasi", targetZone: "langsung" },
                      { id: "c6", icon: "🧒", text: "Anak Ibu Sari — yang benar-benar mengonsumsi obatnya", targetZone: "akhir" }
                    ],
                    feedbackCorrect: "Tepat! Pelanggan langsung bertransaksi secara komersial dengan PT Farmasi. Pelanggan akhir adalah pengguna sesungguhnya produk — meski tidak membeli langsung dari PT Farmasi. ISO 9000 mendefinisikan pelanggan akhir sebagai 'end user' — fokus QMS harus pada keamanan dan manfaat untuk mereka, bukan hanya kepuasan pelanggan langsung.",
                    feedbackWrong: "Ada yang tertukar. Pelanggan langsung = bertransaksi langsung dengan organisasi (RS, apotek, distributor). Pelanggan akhir = pengguna terakhir produk (pasien, konsumen) — tidak harus yang membayar."
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Pelanggan",
                      text: "Klasifikasikan: pelanggan INTERNAL atau EKSTERNAL?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">Bank Maju Bersama memiliki berbagai departemen yang saling melayani dalam memberikan layanan perbankan kepada nasabah.</div>`
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "internal", label: "🏢 Pelanggan Internal", subLabel: "Menerima output dari dalam organisasi", color: COLORS.dark },
                      { id: "eksternal", label: "🌐 Pelanggan Eksternal", subLabel: "Di luar organisasi", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "💼", text: "Departemen Kredit — menerima data nasabah dari Departemen Akuisisi", targetZone: "internal" },
                      { id: "c2", icon: "🏠", text: "Nasabah KPR yang mengajukan pinjaman", targetZone: "eksternal" },
                      { id: "c3", icon: "📊", text: "Divisi Manajemen Risiko — menerima laporan dari Divisi Kredit", targetZone: "internal" },
                      { id: "c4", icon: "🏢", text: "PT Sentosa — nasabah korporat yang membuka rekening giro", targetZone: "eksternal" },
                      { id: "c5", icon: "🖨️", text: "Tim Back Office — memproses dokumen dari Tim Teller", targetZone: "internal" },
                      { id: "c6", icon: "👶", text: "Orang tua yang membuka tabungan pendidikan untuk anak", targetZone: "eksternal" }
                    ],
                    feedbackCorrect: "Sempurna! Dalam industri jasa seperti perbankan, konsep pelanggan internal sangat nyata — setiap departemen adalah 'pelanggan' dari departemen sebelumnya dalam alur proses. Memahami ini penting karena ISO 9001 mensyaratkan mutu di setiap tahap proses, bukan hanya di ujung rantai.",
                    feedbackWrong: "Ada yang tertukar. Di bank, banyak 'pelanggan internal' yang tidak terlihat — departemen yang menerima output dari departemen lain. Mereka sama pentingnya dengan nasabah eksternal dalam memastikan kualitas layanan akhir."
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Pelanggan",
                      text: "Klasifikasikan: pelanggan LANGSUNG atau pelanggan AKHIR?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">CV Buku Pintar menerbitkan buku pelajaran yang dijual melalui toko buku dan platform digital ke sekolah-sekolah.</div>`
                    },
                    instruction: "Ketuk kartu, lalu ketuk zona tujuannya.",
                    zones: [
                      { id: "langsung", label: "🤝 Pelanggan Langsung", subLabel: "Bertransaksi langsung dengan organisasi", color: COLORS.dark },
                      { id: "akhir", label: "🏁 Pelanggan Akhir", subLabel: "Pengguna terakhir produk/jasa", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🏫", text: "SMA Negeri 1 Bandung — membeli 200 buku dari CV Buku Pintar", targetZone: "langsung" },
                      { id: "c2", icon: "📚", text: "Gramedia — distributor buku nasional", targetZone: "langsung" },
                      { id: "c3", icon: "👦", text: "Siswa kelas 10 yang membaca bukunya di kelas", targetZone: "akhir" },
                      { id: "c4", icon: "🖥️", text: "Platform Tokopedia — menjual buku CV di marketplace", targetZone: "langsung" },
                      { id: "c5", icon: "👩‍🏫", text: "Guru yang menggunakan buku sebagai bahan ajar", targetZone: "akhir" },
                      { id: "c6", icon: "👧", text: "Siswi yang membuat ringkasan dari buku tersebut untuk ujian", targetZone: "akhir" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan guru — ia adalah pelanggan akhir yang punya persyaratan kuat (buku harus sesuai kurikulum, mudah diajarkan) meski tidak membeli buku langsung dari CV Buku Pintar. ISO 9001 mendorong organisasi mempertimbangkan persyaratan pelanggan akhir, tidak hanya pelanggan langsung.",
                    feedbackWrong: "Ada yang tertukar. Pelanggan langsung = bertransaksi dengan CV (sekolah, Gramedia, marketplace). Pelanggan akhir = pengguna sesungguhnya buku tersebut (siswa, guru) — mereka punya persyaratan yang perlu dipertimbangkan meski tidak membayar langsung ke CV."
                  },
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Pelanggan dalam ISO 9000 — Lebih Luas dari yang Anda Kira",
                      highlightColor: COLORS.plan
                    },
                    panels: [
                      {
                        title: "Definisi resmi dan empat jenisnya",
                        color: "#F59E0B",
                        content: `
                          <p>ISO 9000:2015 mendefinisikan pelanggan sebagai: "orang atau organisasi yang dapat menerima atau yang menerima produk atau jasa yang dimaksudkan untuk atau diminta oleh orang atau organisasi tersebut."</p>
                          <p>Dari definisi ini, ISO 9000 mengakui empat jenis pelanggan:</p>
                          <ul style="padding-left: 20px;">
                            <li style="margin-bottom:8px;"><strong>🏢 Internal</strong> — pihak dalam organisasi yang menerima output dari proses atau departemen lain. Contoh: departemen perakitan menerima komponen dari departemen machining.</li>
                            <li style="margin-bottom:8px;"><strong>🌐 Eksternal</strong> — pihak di luar organisasi yang menerima produk atau jasa. Contoh: distributor, pengecer, konsumen akhir.</li>
                            <li style="margin-bottom:8px;"><strong>🤝 Langsung</strong> — bertransaksi secara komersial langsung dengan organisasi. Contoh: toko yang membeli dari pabrik.</li>
                            <li><strong>🏁 Akhir (End User)</strong> — pengguna terakhir produk atau jasa, tidak harus yang membayar. Contoh: pasien yang meminum obat yang dibeli apotek dari pabrik farmasi.</li>
                          </ul>
                          <div class="alert-box" style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 12px; margin-top: 12px; border-radius: 4px;">
                            📌 Satu pihak bisa masuk lebih dari satu kategori. Apotek bisa sekaligus pelanggan eksternal dan pelanggan langsung. Pasien bisa pelanggan eksternal sekaligus pelanggan akhir.
                          </div>
                        `
                      },
                      {
                        title: "Mengapa pelanggan akhir penting untuk QMS?",
                        color: "#0F766E",
                        content: `
                          <p>Banyak organisasi hanya fokus pada kepuasan pelanggan langsung — yang membayar tagihan. Tapi ISO 9001 klausul 8.2.2 secara eksplisit menyebut persyaratan yang terkait dengan "intended use" (penggunaan yang dimaksud) — artinya organisasi harus mempertimbangkan siapa yang benar-benar menggunakan produk atau jasa.</p>

                          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 11px; white-space: pre; overflow-x: auto; line-height: 1.4; color: #334155; margin: 12px 0;">Pabrik Ban → Pabrikan Mobil → Dealer → Pembeli Mobil → Pengemudi
     ↑              ↑            ↑            ↑              ↑
  Membuat       Pelanggan    Pelanggan    Pelanggan      Pelanggan
                Langsung     Langsung     Langsung        Akhir
                Pabrik Ban   Pabrikan     Dealer         (End User)</div>

                          <p>Pabrik ban harus memastikan bannya aman untuk pengemudi — bahkan meski pengemudi tidak pernah berhubungan langsung dengan pabrik ban. Inilah alasan standar keamanan produk dan persyaratan intended use menjadi bagian dari QMS.</p>
                        `
                      },
                      {
                        title: "Pelanggan internal — sering diabaikan, selalu penting",
                        color: COLORS.dark,
                        content: `
                          <p>Konsep pelanggan internal mengubah cara kita memandang alur kerja di dalam organisasi. Setiap departemen yang menerima output dari departemen lain adalah "pelanggan" — dengan persyaratan yang sama validnya seperti pelanggan eksternal.</p>
                          <p>Tiga implikasi praktis:</p>
                          <ol style="padding-left: 20px;">
                            <li><strong>Persyaratan antar departemen perlu didefinisikan</strong> — Departemen Penjahitan perlu menetapkan standar kain yang diterimanya dari Departemen Weaving, seperti halnya pelanggan eksternal menetapkan spesifikasinya.</li>
                            <li><strong>Ketidaksesuaian internal tetap perlu dilaporkan</strong> — Produk yang tidak memenuhi persyaratan departemen berikutnya adalah ketidaksesuaian, meski belum sampai ke pelanggan eksternal.</li>
                            <li><strong>Kepuasan pelanggan internal adalah bagian dari mutu</strong> — QMS yang baik memastikan alur kerja internal berjalan lancar, bukan hanya output akhirnya.</li>
                          </ol>
                          <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; margin-top: 12px; border-radius: 4px;">
                            ISO 9001 tidak menggunakan istilah "pelanggan internal" secara eksplisit — tapi konsepnya tersirat dalam persyaratan process approach (klausul 4.4) yang mewajibkan organisasi mendefinisikan input, output, dan persyaratan antar proses.
                          </div>
                        `
                      }
                    ],
                    nextLabel: "Paham, lanjut ke soal pemahaman →"
                  },
                  {
                    type: "mcq",
                    xp: 30,
                    title: "Siapa pelanggannya di sini?",
                    scenario: {
                      icon: "5",
                      label: "Pilih Langkah",
                      text: "PT Kemasan Jaya memproduksi botol plastik. Botol dijual ke PT Minuman Segar, yang mengisinya dengan air mineral, lalu menjualnya ke supermarket, yang kemudian dibeli konsumen untuk diminum. Dalam konteks QMS PT Kemasan Jaya — siapa yang paling tepat disebut pelanggan AKHIR?",
                      highlightColor: COLORS.plan,
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: space-between; text-align: center;">
                          <div style="background: #1E3A8A; color: white; padding: 8px; border-radius: 6px; width: 22%;">🏭<br/>Kemasan Jaya</div>
                          <div>👉</div>
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; color: #1E293B; padding: 8px; border-radius: 6px; width: 22%;">🥤<br/>Minuman Segar</div>
                          <div>👉</div>
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; color: #1E293B; padding: 8px; border-radius: 6px; width: 22%;">🛒<br/>Supermarket</div>
                          <div>👉</div>
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; color: #1E293B; padding: 8px; border-radius: 6px; width: 22%;">🧑<br/>Konsumen</div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", text: "PT Minuman Segar — karena mereka yang membeli botol langsung", icon: "🏭", correct: false },
                      { id: "b", text: "Supermarket — karena mereka menjual produk ke konsumen akhir", icon: "🛒", correct: false },
                      { id: "c", text: "Konsumen yang meminum air mineral dari botol tersebut", icon: "🧑", correct: true }
                    ],
                    explanation: "**💡 Jawaban Benar (C)**: Pelanggan akhir adalah pengguna terakhir produk — dalam hal ini konsumen yang meminum air dari botol. ISO 9001 mensyaratkan PT Kemasan mempertimbangkan intended use, yaitu botol yang aman bagi konsumen (kontak makanan). PT Minuman Segar adalah pelanggan langsung.",
                    nextLabel: "Lanjut →",
                  },
                  {
                    type: "mcq",
                    xp: 30,
                    title: "Siapa pelanggannya di sini?",
                    scenario: {
                      icon: "6",
                      label: "Pilih Langkah",
                      text: "Di PT Tekstil Indah, Departemen Quality Control memeriksa kain hasil produksi sebelum diserahkan ke Departemen Finishing. Dalam konteks ini, siapa yang menjadi PELANGGAN dari Departemen Produksi?",
                      highlightColor: COLORS.plan,
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: space-between; text-align: center;">
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 6px; border-radius: 4px; flex: 1; margin: 0 4px;">Bahan Baku</div>
                          <div>👉</div>
                          <div style="background: #1E3A8A; color: white; padding: 6px; border-radius: 4px; flex: 1; margin: 0 4px;">Dept. Produksi</div>
                          <div>👉</div>
                          <div style="background: #0F766E; color: white; padding: 6px; border-radius: 4px; flex: 1; margin: 0 4px;">Dept. QC<div style="font-size: 8px; font-weight: normal; margin-top:2px;">Menerima kain</div></div>
                          <div>👉</div>
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 6px; border-radius: 4px; flex: 1; margin: 0 4px;">Dept. Finishing</div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", text: "Departemen QC — karena mereka yang menerima hasil produksi", icon: "🔍", correct: true },
                      { id: "b", text: "Departemen Finishing — karena mereka mengolah kain lebih lanjut", icon: "✂️", correct: false },
                      { id: "c", text: "Pelanggan eksternal — karena tujuan akhir dari seluruh proses", icon: "🛍️", correct: false }
                    ],
                    explanation: "**💡 Jawaban Benar (A)**: Dalam alur proses, Departemen QC adalah pelanggan langsung (internal) dari Departemen Produksi — pihak pertama penerima outputnya. Departemen QC berhak menetapkan spesifikasi agar kain layak diperiksa. Inilah konsep pelanggan internal.",
                    nextLabel: "Lanjut →",
                  },
                  {
                    type: "mcq",
                    xp: 30,
                    title: "Siapa pelanggannya di sini?",
                    scenario: {
                      icon: "7",
                      label: "Pilih Langkah",
                      text: "Sekolah Coding Maju menjual kursus pemrograman online. Orang tua membayar biaya kursus untuk anak usia 12 tahun. Anak inilah yang mengikuti kursus tiap minggu. Untuk keperluan QMS, persyaratan siapa yang PALING KRITIS untuk dipahami & dipenuhi?",
                      highlightColor: COLORS.plan,
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                          <div style="text-align: center; width: 33%;">
                            <div style="font-size: 24px; margin-bottom: 4px;">👨‍👩‍👦</div>
                            <div style="font-weight: bold; font-size: 11px;">Orang Tua</div>
                            <div style="font-size: 9px; color: #64748B;">Yang membayar</div>
                          </div>
                          <div><strong style="font-size: 11px; color:#1E3A8A;">💳 bayar 👉</strong></div>
                          <div style="text-align: center; width: 33%;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🏫</div>
                            <div style="font-weight: bold; font-size: 11px;">Sekolah Coding</div>
                            <div style="font-size: 9px; color: #64748B;">Penyedia</div>
                          </div>
                          <div><strong style="font-size: 11px; color:#1E3A8A;">📚 layanan 👉</strong></div>
                          <div style="text-align: center; width: 33%;">
                            <div style="font-size: 24px; margin-bottom: 4px;">👦</div>
                            <div style="font-weight: bold; font-size: 11px;">Anak (12 thn)</div>
                            <div style="font-size: 9px; color: #64748B;">Yang ikut kursus</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", text: "Orang tua — karena mereka yang membayar", icon: "👨‍👩‍👦", correct: false },
                      { id: "b", text: "Anak — pengguna layanan kursus sesungguhnya", icon: "👦", correct: true },
                      { id: "c", text: "Keduanya sama pentingnya dan tidak bisa diprioritaskan", icon: "🤝", correct: false }
                    ],
                    explanation: "**💡 Jawaban Benar (B)**: Anak adalah pelanggan akhir (pengguna layanan langsung). Persyaratan materi agar mudah dipahami usia 12 tahun adalah persyaratan desain kritis. Orang tua adalah pelanggan langsung (membayar), tapi kualitas inti harus didesain untuk pengguna layanan.",
                    nextLabel: "Lanjut →",
                  },
                  {
                    type: "mcq",
                    xp: 30,
                    title: "Siapa pelanggannya di sini?",
                    scenario: {
                      icon: "8",
                      label: "Pilih Langkah",
                      text: "PT Konstruksi Andalan mendapat proyek membangun gedung kantor untuk Pemkot Surabaya. Gedung akan digunakan oleh 500 pegawai Pemkot. Dalam QMS PT Konstruksi Andalan, siapa yang dimaksud sebagai 'pelanggan' menurut ISO 9000?",
                      highlightColor: COLORS.plan,
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px;">
                          <div style="display:flex; gap:12px; align-items: flex-start;">
                            <div style="font-size:24px;">🏛️</div>
                            <div>
                               <div style="font-weight:bold; font-size:13px;">Pemkot Surabaya</div>
                               <div style="font-size:11px; color:#64748B;">Klien yang mengontrak dan membayar proyek</div>
                            </div>
                          </div>
                          <div style="display:flex; gap:12px; align-items: flex-start; margin-top:8px;">
                            <div style="font-size:24px;">👩‍💼</div>
                            <div>
                               <div style="font-weight:bold; font-size:13px;">500 Pegawai Pemkot</div>
                               <div style="font-size:11px; color:#64748B;">Yang akan bekerja di gedung setiap hari</div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "a", text: "Hanya Pemkot Surabaya — karena mereka yang membayar", icon: "🏛️", correct: false },
                      { id: "b", text: "Hanya pegawai Pemkot — karena pengguna gedung", icon: "👩‍💼", correct: false },
                      { id: "c", text: "Keduanya — Pemkot (pelanggan langsung), pegawai (pelanggan akhir)", icon: "🤝", correct: true }
                    ],
                    explanation: "**💡 Jawaban Benar (C)**: ISO 9000 mendefinisikan pelanggan mencakup pelanggan langsung dan pelanggan akhir/end user. Pemkot menentukan syarat kontraktual, sementara Pegawai sebagai pelanggan akhir menyaratkan kenyamanan & fungsi.",
                    nextLabel: "Lihat Hasil →",
                  },
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-A-N02 Selesai!",
                      insight: "Anda sudah mampu mengidentifikasi berbagai jenis pelanggan dalam rantai nilai dan memahami mengapa setiap jenisnya relevan untuk QMS.",
                      maxScore: 280,
                      totalCount: 8,
                      takeaways: [
                        "Pelanggan internal = penerima output dari proses atau departemen lain dalam organisasi",
                        "Pelanggan eksternal = di luar organisasi — bisa langsung (bertransaksi) atau akhir (pengguna sesungguhnya)",
                        "Pelanggan akhir tidak harus yang membayar — yang menentukan adalah siapa yang benar-benar menggunakan produk/jasa",
                        "QMS harus mempertimbangkan persyaratan pelanggan langsung sekaligus pelanggan akhir — keduanya relevan untuk intended use"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              {
                id: "penyedia-eksternal-lingkup",
                title: "Penyedia eksternal (external provider) — lingkup dan implikasinya",
                slides: [
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Eksternal",
                      text: "Klasifikasikan setiap penyedia eksternal ke dalam tipe yang tepat",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Furnitur Prima memproduksi meja dan kursi kantor untuk dijual ke perusahaan-perusahaan.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "supplier", label: "📦 Supplier Produk", subLabel: "Menyediakan barang/material", color: COLORS.dark },
                      { id: "jasa", label: "🔧 Penyedia Jasa", subLabel: "Menyediakan layanan", color: COLORS.plan },
                      { id: "subkontraktor", label: "🏗️ Subkontraktor", subLabel: "Mengerjakan bagian dari proses inti", color: COLORS.warn }
                    ],
                    cards: [
                      { id: "c1", icon: "🪵", text: "CV Kayu Jati — memasok papan kayu jati untuk bahan baku meja", targetZone: "supplier" },
                      { id: "c2", icon: "🎨", text: "PT Cat Warna — memasok cat finishing untuk kursi", targetZone: "supplier" },
                      { id: "c3", icon: "🚛", text: "Jasa Ekspedisi Cepat — mengirim furnitur ke klien", targetZone: "jasa" },
                      { id: "c4", icon: "🔩", text: "Pak Udin & Tim — tukang las yang mengerjakan rangka besi kursi di pabrik PT Furnitur", targetZone: "subkontraktor" },
                      { id: "c5", icon: "🧹", text: "CV Bersih Selalu — jasa kebersihan pabrik harian", targetZone: "jasa" },
                      { id: "c6", icon: "✂️", text: "UD Jok Makmur — mengerjakan pelapisan jok kursi sesuai spesifikasi PT Furnitur", targetZone: "subkontraktor" }
                    ],
                    feedbackCorrect: "Sempurna! Perbedaan kuncinya: supplier produk menyediakan material/barang, penyedia jasa menyediakan layanan pendukung, subkontraktor mengerjakan bagian dari proses inti produksi atau jasa utama. Pak Udin yang mengerjakan rangka kursi di dalam pabrik tetap subkontraktor meski bekerja di lokasi PT Furnitur.",
                    feedbackWrong: "Ada yang tertukar. Kunci pembeda: apakah mereka menyediakan material (supplier), layanan pendukung non-inti (penyedia jasa), atau mengerjakan bagian dari proses inti produksi/jasa Anda (subkontraktor)?"
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Eksternal",
                      text: "Klasifikasikan setiap penyedia eksternal ke dalam tipe yang tepat",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">RS Prima Medika adalah rumah sakit swasta yang memberikan layanan kesehatan komprehensif.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "supplier", label: "📦 Supplier Produk", subLabel: "Menyediakan barang/material", color: COLORS.dark },
                      { id: "jasa", label: "🔧 Penyedia Jasa", subLabel: "Menyediakan layanan", color: COLORS.plan },
                      { id: "subkontraktor", label: "🏗️ Subkontraktor", subLabel: "Mengerjakan bagian dari proses inti", color: COLORS.warn }
                    ],
                    cards: [
                      { id: "c1", icon: "💊", text: "PT Kimia Farma — pemasok obat-obatan dan alat kesehatan", targetZone: "supplier" },
                      { id: "c2", icon: "🧪", text: "Lab Klinik Sehat — mengerjakan pemeriksaan laboratorium untuk pasien RS", targetZone: "subkontraktor" },
                      { id: "c3", icon: "🍱", text: "Katering Gizi Seimbang — menyediakan makanan untuk pasien dan staff", targetZone: "jasa" },
                      { id: "c4", icon: "🩻", text: "Klinik Radiologi Mitra — melakukan pemeriksaan rontgen atas rujukan RS", targetZone: "subkontraktor" },
                      { id: "c5", icon: "🛏️", text: "CV Linen Bersih — menyediakan linen (sprei, sarung bantal) yang sudah dicuci", targetZone: "supplier" },
                      { id: "c6", icon: "🔒", text: "PT Satpam Andalan — menyediakan jasa keamanan gedung RS", targetZone: "jasa" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan lab klinik dan klinik radiologi — mereka mengerjakan bagian inti dari layanan medis RS (diagnosis) meski berlokasi di luar. Dalam ISO 9001, subkontraktor seperti ini mendapat tingkat pengawasan paling ketat karena kualitas kerja mereka langsung mempengaruhi output utama yang diterima pasien.",
                    feedbackWrong: "Ada yang tertukar. Lab klinik dan klinik radiologi adalah subkontraktor — mereka mengerjakan bagian dari layanan medis inti RS, bukan sekadar layanan pendukung. Ini berbeda dari katering atau keamanan gedung yang merupakan penyedia jasa pendukung."
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Eksternal",
                      text: "Klasifikasikan setiap penyedia eksternal ke dalam tipe yang tepat",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Aplikasi Digital mengembangkan aplikasi mobile untuk klien korporat.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "supplier", label: "📦 Supplier Produk", subLabel: "Menyediakan barang/material", color: COLORS.dark },
                      { id: "jasa", label: "🔧 Penyedia Jasa", subLabel: "Menyediakan layanan", color: COLORS.plan },
                      { id: "subkontraktor", label: "🏗️ Subkontraktor", subLabel: "Mengerjakan bagian dari proses inti", color: COLORS.warn }
                    ],
                    cards: [
                      { id: "c1", icon: "☁️", text: "AWS (Amazon Web Services) — infrastruktur cloud server", targetZone: "supplier" },
                      { id: "c2", icon: "👨‍💻", text: "Freelancer UI/UX — merancang tampilan aplikasi sesuai brief PT Aplikasi", targetZone: "subkontraktor" },
                      { id: "c3", icon: "🔐", text: "PT Keamanan Siber — audit keamanan sistem setelah aplikasi jadi", targetZone: "jasa" },
                      { id: "c4", icon: "💬", text: "Sendbird — layanan API chat yang diintegrasikan ke aplikasi", targetZone: "supplier" },
                      { id: "c5", icon: "👩‍💻", text: "Tim Developer outsource — menulis kode fitur tertentu sesuai spesifikasi klien", targetZone: "subkontraktor" },
                      { id: "c6", icon: "📋", text: "Konsultan Manajemen Proyek — membantu PT Aplikasi mengelola timeline proyek", targetZone: "jasa" }
                    ],
                    feedbackCorrect: "Tepat! Di era digital, 'produk' bisa berupa layanan SaaS atau API standar seperti AWS dan Sendbird — mereka adalah supplier produk digital. Freelancer UI/UX dan tim developer outsource yang mengerjakan bagian spesifik dari produk klien adalah subkontraktor. Konsultan PM dan auditor keamanan adalah penyedia jasa pendukung.",
                    feedbackWrong: "Ada yang tertukar. AWS dan Sendbird adalah supplier produk — mereka menyediakan layanan/infrastruktur standar yang sama untuk semua pengguna, bukan mengerjakan sesuatu khusus untuk PT Aplikasi. Freelancer yang mengerjakan fitur spesifik adalah subkontraktor."
                  },
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Eksternal",
                      text: "Klasifikasikan setiap penyedia eksternal ke dalam tipe yang tepat",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Konstruksi Kokoh sedang mengerjakan proyek pembangunan jembatan untuk Dinas PU.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "supplier", label: "📦 Supplier Produk", subLabel: "Menyediakan barang/material", color: COLORS.dark },
                      { id: "jasa", label: "🔧 Penyedia Jasa", subLabel: "Menyediakan layanan", color: COLORS.plan },
                      { id: "subkontraktor", label: "🏗️ Subkontraktor", subLabel: "Mengerjakan bagian dari proses inti", color: COLORS.warn }
                    ],
                    cards: [
                      { id: "c1", icon: "🏗️", text: "CV Beton Kuat — memasok beton ready-mix sesuai spesifikasi teknis", targetZone: "supplier" },
                      { id: "c2", icon: "⚡", text: "PT Elektrika Andal — mengerjakan instalasi listrik jembatan", targetZone: "subkontraktor" },
                      { id: "c3", icon: "🔬", text: "Lab Uji Material — menguji kekuatan sampel beton dari CV Beton Kuat", targetZone: "jasa" },
                      { id: "c4", icon: "🪜", text: "PT Baja Struktur — memasok baja tulangan untuk pondasi", targetZone: "supplier" },
                      { id: "c5", icon: "🎨", text: "Tim Cat Jembatan outsource — mengerjakan pengecatan seluruh badan jembatan", targetZone: "subkontraktor" },
                      { id: "c6", icon: "📐", text: "Konsultan Pengawas — memantau kesesuaian pekerjaan dengan gambar teknis", targetZone: "jasa" }
                    ],
                    feedbackCorrect: "Sempurna! Lab uji material adalah penyedia jasa — mereka menguji kualitas material yang sudah ada, bukan mengerjakan bagian dari konstruksi. Konsultan pengawas juga penyedia jasa — memantau, bukan membangun. PT Elektrika dan tim cat mengerjakan bagian fisik jembatan — subkontraktor.",
                    feedbackWrong: "Ada yang tertukar. Kunci pembeda di konstruksi: siapa yang secara fisik mengerjakan bagian dari struktur bangunan (subkontraktor) vs yang menyediakan material (supplier) vs yang memberikan jasa profesional pendukung seperti uji lab dan konsultasi (penyedia jasa)."
                  },
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      label: "Materi Inti",
                      text: "Penyedia Eksternal dalam ISO 9001 — Lingkup dan Kewajiban",
                      highlightColor: COLORS.plan
                    },
                    panels: [
                      {
                        title: "Tiga tipe dan mengapa dibedakan",
                        color: "#F59E0B",
                        content: `
                          <p>ISO 9000 mendefinisikan penyedia eksternal sebagai: "organisasi atau orang yang menyediakan produk atau jasa." ISO 9001 klausul 8.4 kemudian mewajibkan pengendalian atas semua penyedia eksternal — tapi tingkat pengendaliannya berbeda tergantung tipe dan dampaknya.</p>
                          
                          <div style="background: #1E293B; border-radius: 8px; padding: 1px; margin: 16px 0; overflow-x: auto;">
                            <table style="width: 100%; min-width: 400px; border-collapse: separate; border-spacing: 0; font-size: 13px; color: #F8FAFC; text-align: left;">
                              <thead>
                                <tr style="background: rgba(255,255,255,0.05);">
                                  <th style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); width: 25%;">TIPE</th>
                                  <th style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); width: 45%;">DEFINISI</th>
                                  <th style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); width: 30%;">CONTOH</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 600; color: #94A3B8;">Supplier Produk</td>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Menyediakan produk/material yang digunakan dalam proses organisasi</td>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Pemasok bahan baku, vendor SaaS/API</td>
                                </tr>
                                <tr>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 600; color: #38BDF8;">Penyedia Jasa</td>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Menyediakan layanan pendukung yang tidak langsung ke output inti</td>
                                  <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">Jasa kebersihan, konsultan, jasa keamanan</td>
                                </tr>
                                <tr>
                                  <td style="padding: 12px; font-weight: 600; color: #F59E0B;">Subkontraktor</td>
                                  <td style="padding: 12px;">Mengerjakan bagian dari proses inti atau output utama organisasi</td>
                                  <td style="padding: 12px;">Tim las outsource, lab diagnostik, developer freelance</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div class="alert-box" style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px;">
                            📌 Yang menentukan kategori bukan lokasi kerja — bukan apakah mereka bekerja di dalam atau luar gedung Anda. Yang menentukan adalah apakah pekerjaan mereka langsung menjadi bagian dari output utama yang Anda berikan ke pelanggan.
                          </div>
                        `
                      },
                      {
                        title: "Tingkat pengendalian yang berbeda",
                        color: "#0F766E",
                        content: `
                          <p>ISO 9001 klausul 8.4.1 mewajibkan pengendalian atas semua penyedia eksternal, tapi klausul 8.4.2 memperjelas bahwa jenis dan tingkat pengendalian harus ditentukan berdasarkan dampak terhadap kemampuan organisasi memenuhi persyaratan pelanggan.</p>
                          
                          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
                            <div class="alert-box" style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; border-radius: 6px;">
                              <div style="font-weight: 700; color: #B91C1C; margin-bottom: 4px;">🔴 Pengendalian Ketat — Subkontraktor</div>
                              Karna mereka mengerjakan bagian dari output utama, pengendalian paling ketat diperlukan: audit penyedia, inspeksi hasil kerja di lapangan, persyaratan mutu tertulis, dan verifikasi sebelum diterima.
                            </div>
                            
                            <div class="alert-box" style="background: #FFFBEB; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 6px;">
                              <div style="font-weight: 700; color: #B45309; margin-bottom: 4px;">🟡 Pengendalian Sedang — Supplier Produk</div>
                              Inspeksi penerimaan, sertifikat conformance, evaluasi kinerja berkala, dan persyaratan spesifikasi jelas. Tidak harus diaudit perwakilan mutu pabrik namun dipantau kinerja suplai.
                            </div>
                            
                            <div class="alert-box" style="background: #F0FDFA; border-left: 4px solid #10B981; padding: 12px; border-radius: 6px;">
                              <div style="font-weight: 700; color: #047857; margin-bottom: 4px;">🟢 Pengendalian Ringan — Penyedia Jasa Pendukung</div>
                              Evaluasi kinerja sederhana, kontrak yang jelas, dan pemantauan kepuasan pengguna layanan. Tidak memerlukan pengendalian mutu produk karena tidak langsung ke output inti.
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Implikasi yang sering terlupakan",
                        color: COLORS.dark,
                        content: `
                          <p>Dua hal yang sering diabaikan organisasi terkait penyedia eksternal:</p>
                          <ol style="padding-left: 20px;">
                            <li style="margin-bottom: 8px;"><strong>Tanggung jawab tidak berpindah ke penyedia eksternal.</strong><br/>Jika subkontraktor Anda mengerjakan sesuatu yang buruk, ISO 9001 tetap menganggap itu tanggung jawab organisasi Anda — bukan subkontraktor. Anda yang menjawab kepada pelanggan.</li>
                            <li><strong>"Outsourcing" bukan berarti "lepas tangan".</strong><br/>Klausul 8.4 secara eksplisit mengatur pengendalian proses yang di-outsource. Semakin besar porsi yang di-outsource, semakin ketat pengendalian yang diperlukan.</li>
                          </ol>

                          <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; margin-top: 16px; border-radius: 4px;">
                            ⚠️ Kesalahan umum: menganggap bahwa karena pekerjaan dikerjakan pihak luar, QMS tidak perlu mencakupnya. ISO 9001 justru sebaliknya — semua output yang diterima pelanggan harus bisa dijamin mutunya, terlepas dari siapa yang mengerjakannya.
                          </div>
                        `
                      }
                    ],
                    nextLabel: "Paham, lanjut ke soal pemahaman →"
                  },
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0F766E",
                      label: "Benar atau Salah?",
                      text: "PT Konstruksi Andalan men-outsource pekerjaan pengecatan gedung ke CV Cat Profesional. Jika hasil pengecatan buruk dan pelanggan komplain, itu adalah tanggung jawab CV Cat — bukan PT Konstruksi.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 16px; display: flex; flex-direction: column; align-items: center; text-align: center;">
                          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 320px; margin-bottom: 16px;">
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                              <span style="font-size: 32px;">🏗️</span>
                              <span style="font-size: 11px; font-weight: 600; color: #334155;">PT Konstruksi</span>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; color: #64748B;">
                              <span style="font-size: 11px;">outsource pengecatan</span>
                              <span>→</span>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                              <span style="font-size: 32px;">🎨</span>
                              <span style="font-size: 11px; font-weight: 600; color: #334155;">CV Cat Profesional</span>
                            </div>
                          </div>
                          <div style="border-top: 1px dashed #CBD5E1; padding-top: 12px; width: 100%;">
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; color: #EF4444;">
                              <span style="font-size: 24px;">😠</span>
                              <span style="font-size: 12px; font-weight: 600;">Pelanggan komplain: "Siapa yang bertanggung jawab?"</span>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "🎨", label: "Benar", subLabel: "CV Cat yang bertanggung jawab", correct: false, feedback: "Belum tepat. Dari perspektif ISO 9001 dan perspektif pelanggan, PT Konstruksi-lah yang bertanggung jawab atas kualitas seluruh output — termasuk yang dikerjakan subkontraktor. Inilah mengapa klausul 8.4 mewajibkan pengendalian atas penyedia eksternal: untuk memastikan tanggung jawab mutu tidak hilang di tangan pihak luar." },
                      { id: "salah", icon: "🏗️", label: "Salah", subLabel: "PT Konstruksi tetap bertanggung jawab", correct: true, feedback: "Tepat! ISO 9001 sangat jelas: tanggung jawab atas output yang diterima pelanggan tidak berpindah ke penyedia eksternal. PT Konstruksi yang menerima kontrak dari pelanggan — PT Konstruksi yang menjawab kepada pelanggan. CV Cat adalah subkontraktor yang dikendalikan PT Konstruksi, bukan pihak yang punya hubungan kontraktual dengan pelanggan." }
                    ]
                  },
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0F766E",
                      label: "Benar atau Salah?",
                      text: "Jasa kebersihan pabrik yang di-outsource ke perusahaan cleaning service tidak perlu dikendalikan dalam QMS karena tidak langsung mempengaruhi kualitas produk.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                          <div style="flex: 1; background: #FFF; padding: 12px; border: 1px solid #E2E8F0; border-radius: 6px; text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🧹</div>
                            <div style="font-weight: 600; font-size: 12px; color: #334155;">Penyedia Jasa Pendukung</div>
                            <div style="font-size: 10px; color: #64748B;">Membersihkan lantai, toilet, area umum</div>
                          </div>
                          <div style="font-size: 12px; font-weight: 600; color: #94A3B8; display: flex; flex-direction: column; align-items: center;">
                            <span>→</span>
                            <span style="font-size: 10px;">ada hubungannya?</span>
                          </div>
                          <div style="flex: 1; background: #FFF; padding: 12px; border: 1px solid #E2E8F0; border-radius: 6px; text-align: center;">
                            <div style="font-size: 24px; margin-bottom: 4px;">📦</div>
                            <div style="font-weight: 600; font-size: 12px; color: #334155;">Output ke Pelanggan</div>
                            <div style="font-size: 10px; color: #64748B;">Tidak berhubungan langsung?</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Tidak perlu dikendalikan", correct: false, feedback: "Belum tepat. Meski kebersihan tidak langsung menghasilkan produk, ia bisa mempengaruhi kualitas secara tidak langsung — terutama di industri pangan, farmasi, dan elektronik di mana kontaminasi adalah risiko nyata. ISO 9001 mewajibkan pengendalian atas semua penyedia eksternal yang relevan, dengan tingkat pengendalian yang proporsional." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Tetap perlu dikendalikan", correct: true, feedback: "Tepat! ISO 9001 klausul 8.4.1 mewajibkan pengendalian atas semua penyedia eksternal yang relevan — termasuk penyedia jasa pendukung. Kebersihan pabrik bisa sangat mempengaruhi kualitas produk: kontaminasi, produk rusak akibat area kotor, atau ketidaksesuaian dengan regulasi higiene. Tingkat pengendaliannya memang lebih ringan, tapi tidak berarti nol." }
                    ]
                  },
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0F766E",
                      label: "Benar atau Salah?",
                      text: "PT Farmasi Sehat menggunakan API data cuaca dari penyedia SaaS untuk fitur notifikasi aplikasinya. Karena ini hanya fitur kecil, penyedia SaaS ini tidak perlu masuk dalam daftar penyedia eksternal yang dikendalikan QMS.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 16px; text-align: center;">
                          <div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
                            <div style="font-size: 24px;">💊</div>
                            <span style="color: #64748B;">→</span>
                            <div style="font-size: 24px;">🌤️</div>
                            <span style="color: #64748B;">→</span>
                            <div style="font-size: 24px;">📱</div>
                            <span style="color: #64748B;">→</span>
                            <div style="font-size: 24px;">👤</div>
                          </div>
                          <div style="margin-top: 12px; font-size: 12px; color: #475569; font-weight: 500;">
                            Fitur notifikasi: "Jangan lupa minum obat saat hujan"
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Fitur kecil, tidak perlu dikendalikan", correct: false, feedback: "Belum tepat. ISO 9001 tidak memberikan pengecualian berdasarkan 'ukuran' fitur atau layanan. Semua penyedia eksternal yang relevan dengan produk/jasa yang diterima pelanggan harus diidentifikasi. Tingkat pengendaliannya bisa ringan — tapi tidak berarti diabaikan sama sekali." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Tetap perlu diidentifikasi", correct: true, feedback: "Tepat! Semua penyedia eksternal yang outputnya menjadi bagian dari produk/jasa yang diterima pelanggan perlu diidentifikasi dan dikendalikan secara proporsional. Meski API cuaca adalah fitur kecil, jika ia gagal berfungsi dan mempengaruhi pengalaman pengguna aplikasi farmasi — itu mempengaruhi kepuasan pelanggan. Pengendaliannya memang ringan (SLA kontrak, monitoring uptime), tapi harus ada." }
                    ]
                  },
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0F766E",
                      label: "Benar atau Salah?",
                      text: "Semakin besar porsi pekerjaan yang di-outsource ke penyedia eksternal, semakin ketat pengendalian QMS yang diperlukan oleh ISO 9001.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                          <div style="margin-bottom: 16px;">
                            <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Porsi Outsource:</div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                              <span style="font-size: 11px; color: #64748B;">Kecil</span>
                              <div style="flex: 1; height: 12px; background: #E2E8F0; border-radius: 6px; overflow: hidden; position: relative;">
                                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 80%; background: linear-gradient(90deg, #3B82F6, #1D4ED8);"></div>
                              </div>
                              <span style="font-size: 11px; font-weight: 600; color: #1E3A8A;">Besar</span>
                            </div>
                          </div>
                          <div>
                            <div style="font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">Pengendalian QMS yang diperlukan:</div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                              <span style="font-size: 11px; color: #64748B;">Ringan</span>
                              <div style="flex: 1; height: 12px; border: 1px dashed #94A3B8; border-radius: 6px; position: relative;">
                                <div style="position: absolute; left: 50%; transform: translateX(-50%); top: -20px; font-size: 12px;">👆 ?</div>
                              </div>
                              <span style="font-size: 11px; font-weight: 600; color: #EF4444;">Ketat</span>
                            </div>
                          </div>
                          <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 11px; color: #475569; border-top: 1px solid #E2E8F0; padding-top: 12px;">
                            <div style="display: flex; align-items: center; gap: 4px;"><span style="font-size: 16px;">🏭</span> <span>Dikerjakan sendiri</span></div>
                            <div style="display: flex; align-items: center; gap: 4px; text-align: right;"><span>Full outsource</span> <span style="font-size: 16px;">🌐</span></div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "📈", label: "Benar", subLabel: "Makin besar outsource = makin ketat", correct: true, feedback: "Tepat! ISO 9001 klausul 8.4 secara implisit mengakui prinsip ini: semakin besar porsi yang di-outsource, semakin besar risiko kehilangan kendali atas mutu output. Organisasi yang hampir seluruh produksinya di-outsource harus memiliki sistem pengendalian penyedia eksternal yang jauh lebih ketat dibanding yang hanya meng-outsource sebagian kecil." },
                      { id: "salah", icon: "📉", label: "Salah", subLabel: "Tidak ada hubungannya", correct: false, feedback: "Belum tepat. Ada hubungan langsung antara porsi outsourcing dan kebutuhan pengendalian. Semakin banyak yang dikerjakan pihak luar, semakin banyak titik risiko yang harus dikendalikan. Organisasi yang sangat bergantung pada penyedia eksternal perlu sistem evaluasi, audit, dan komunikasi persyaratan yang lebih ketat." }
                    ]
                  },
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-A-N03 Selesai!",
                      insight: "Anda sudah mampu membedakan tiga tipe penyedia eksternal dan memahami implikasi pengendaliannya dalam QMS.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Tiga tipe: Supplier Produk (material/barang), Penyedia Jasa (layanan pendukung), Subkontraktor (mengerjakan bagian dari output inti)",
                        "Tanggung jawab mutu tidak berpindah ke penyedia eksternal — organisasi tetap bertanggung jawab kepada pelanggan",
                        "Semua penyedia eksternal yang relevan perlu dikendalikan — tingkat pengendalian proporsional dengan dampak dan risiko",
                        "Semakin besar porsi outsourcing, semakin ketat pengendalian yang diperlukan ISO 9001"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              {
                id: "top-management-siapa-dan-batasan",
                title: "Top management — siapa yang dimaksud dan apa batasannya",
                icon: "👔",
                duration: "10 menit",
                slides: [
                  // SLIDE 1
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasikan setiap jabatan: Top Management atau Bukan?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Manufaktur Jaya adalah perusahaan menengah dengan 300 karyawan, memproduksi komponen elektronik.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "top", label: "👔 Top Management", subLabel: "Mengarahkan dan mengendalikan organisasi", color: COLORS.dark },
                      { id: "bukan", label: "👷 Bukan Top Management", subLabel: "Menjalankan, mendukung, atau mengawasi", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "👑", text: "Direktur Utama", targetZone: "top" },
                      { id: "c2", icon: "💼", text: "Direktur Operasional", targetZone: "top" },
                      { id: "c3", icon: "📊", text: "Manajer QC", targetZone: "bukan" },
                      { id: "c4", icon: "💰", text: "Direktur Keuangan", targetZone: "top" },
                      { id: "c5", icon: "🏭", text: "Supervisor Produksi", targetZone: "bukan" },
                      { id: "c6", icon: "📋", text: "Staff Administrasi QMS", targetZone: "bukan" }
                    ],
                    feedbackCorrect: "Sempurna! Di perusahaan PT Manufaktur Jaya, top management adalah para direktur yang mengarahkan dan mengendalikan organisasi secara keseluruhan. Manajer QC dan supervisor produksi menjalankan fungsi tertentu tapi tidak mengarahkan organisasi secara keseluruhan — mereka bukan top management.",
                    feedbackWrong: "Ada yang tertukar. Top management dalam ISO 9000 adalah orang atau kelompok orang yang mengarahkan dan mengendalikan organisasi pada level tertinggi. Di perusahaan biasa, ini adalah para direktur — bukan manajer atau supervisor yang mengelola fungsi atau tim tertentu."
                  },
                  // SLIDE 2
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasikan setiap peran: Top Management atau Bukan?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">Klinik Pratama Sehat Mandiri adalah klinik swasta kecil milik seorang dokter yang dijalankan bersama 8 staf.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "top", label: "👔 Top Management", subLabel: "Mengarahkan dan mengendalikan", color: COLORS.dark },
                      { id: "bukan", label: "👷 Bukan Top Management", subLabel: "Peran teknis atau pelaksana", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "👨‍⚕️", text: "dr. Andi — pemilik sekaligus dokter penanggung jawab klinik", targetZone: "top" },
                      { id: "c2", icon: "👩‍💼", text: "Bu Rini — manajer operasional klinik yang ditunjuk dr. Andi", targetZone: "bukan" },
                      { id: "c3", icon: "💊", text: "Apoteker klinik", targetZone: "bukan" },
                      { id: "c4", icon: "📱", text: "dr. Andi dalam kapasitasnya memeriksa pasien sehari-hari", targetZone: "bukan" },
                      { id: "c5", icon: "🏥", text: "dr. Andi dalam kapasitasnya membuat kebijakan dan strategi klinik", targetZone: "top" },
                      { id: "c6", icon: "🧹", text: "Petugas kebersihan klinik", targetZone: "bukan" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan dr. Andi — ia bisa masuk dua zona berbeda tergantung kapasitasnya. Saat membuat kebijakan klinik, ia adalah top management. Saat memeriksa pasien, ia menjalankan peran teknis — bukan kapasitas top management-nya. ISO 9000 mendefinisikan top management sebagai peran mengarahkan dan mengendalikan, bukan sekadar orangnya.",
                    feedbackWrong: "Ada yang perlu diperbaiki. Perhatikan kartu 4 dan 5 — keduanya tentang dr. Andi tapi kapasitasnya berbeda. Top management adalah peran mengarahkan dan mengendalikan organisasi, bukan jabatan atau nama orang. Seseorang bisa menjadi top management dalam satu kapasitas dan bukan top management dalam kapasitas lain."
                  },
                  // SLIDE 3
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasikan setiap peran: Top Management atau Bukan?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Teknologi Maju adalah anak perusahaan dari PT Grup Andalan. PT Teknologi Maju memiliki ISO 9001 untuk scope bisnisnya sendiri.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "top", label: "👔 Top Management", subLabel: "Mengarahkan organisasi dalam scope ini", color: COLORS.dark },
                      { id: "bukan", label: "👷 Bukan Top Management", subLabel: "Tidak mengarahkan operasional scope ini", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "👑", text: "CEO PT Grup Andalan (perusahaan induk)", targetZone: "bukan" },
                      { id: "c2", icon: "👔", text: "Direktur Utama PT Teknologi Maju", targetZone: "top" },
                      { id: "c3", icon: "💼", text: "Direktur Bisnis PT Teknologi Maju", targetZone: "top" },
                      { id: "c4", icon: "📊", text: "Manajer IT PT Teknologi Maju", targetZone: "bukan" },
                      { id: "c5", icon: "🌐", text: "Komisaris PT Teknologi Maju (dari pemegang saham)", targetZone: "bukan" },
                      { id: "c6", icon: "⚙️", text: "COO PT Teknologi Maju", targetZone: "top" }
                    ],
                    feedbackCorrect: "Sempurna! Top management dalam konteks ISO 9001 PT Teknologi Maju adalah siapa yang mengarahkan dan mengendalikan PT Teknologi Maju — bukan PT Grup Andalan. CEO grup adalah top management untuk scope grup, bukan untuk scope ISO 9001 anak perusahaan. Komisaris mengawasi tapi tidak mengarahkan operasional — bukan top management.",
                    feedbackWrong: "Ada yang tertukar. Kunci pentingnya: top management selalu didefinisikan dalam konteks scope ISO 9001 yang berlaku. Untuk ISO 9001 PT Teknologi Maju, yang relevan adalah siapa yang mengarahkan PT Teknologi Maju — bukan siapa yang mengendalikan grupnya."
                  },
                  // SLIDE 4
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasikan setiap peran: Top Management atau Bukan?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">CV Kreatif Bersama adalah perusahaan desain grafis dengan 12 orang, dikelola oleh 3 partner pendiri yang semuanya aktif bekerja.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "top", label: "👔 Top Management", subLabel: "Mengarahkan dan mengendalikan CV", color: COLORS.dark },
                      { id: "bukan", label: "👷 Bukan Top Management", subLabel: "Staf pelaksana atau manajer fungsi", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🎨", text: "Partner A — menentukan arah bisnis dan strategi CV", targetZone: "top" },
                      { id: "c2", icon: "💻", text: "Partner B — memimpin tim desain dan mengerjakan proyek klien", targetZone: "top" },
                      { id: "c3", icon: "💰", text: "Partner C — mengelola keuangan dan administrasi CV", targetZone: "top" },
                      { id: "c4", icon: "✏️", text: "Senior Designer — memimpin 3 junior designer", targetZone: "bukan" },
                      { id: "c5", icon: "📱", text: "Account Manager — mengelola hubungan dengan klien", targetZone: "bukan" },
                      { id: "c6", icon: "🖨️", text: "Staf Produksi — mencetak dan finishing materi desain", targetZone: "bukan" }
                    ],
                    feedbackCorrect: "Tepat! Di CV kecil, ketiga partner pendiri semuanya adalah top management meski salah satunya aktif mengerjakan proyek desain. ISO 9000 tidak mensyaratkan top management harus 'hanya mengelola' — yang penting mereka mengarahkan dan mengendalikan organisasi. Ini umum di usaha kecil dan menengah di mana pemilik juga pelaksana.",
                    feedbackWrong: "Ada yang tertukar. Di organisasi kecil, top management bisa merangkap sebagai pelaksana teknis. Ketiganya adalah top management karena mereka yang bersama-sama mengarahkan dan mengendalikan CV — terlepas dari apakah mereka juga mengerjakan desain atau keuangan secara langsung."
                  },
                  // SLIDE 5
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      labelColor: "#0D9488",
                      label: "Materi Inti",
                      text: "Top Management dalam ISO 9001 — Definisi, Batas, dan Kewajiban"
                    },
                    panels: [
                      {
                        title: "Definisi resmi dan satu prinsip kunci",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000:2015 mendefinisikan top management sebagai: "orang atau kelompok orang yang mengarahkan dan mengendalikan organisasi pada level tertinggi."</p>
                            <p>Tiga kata kunci dalam definisi ini:</p>
                            <ul style="padding-left: 20px;">
                              <li><strong>"Orang atau kelompok"</strong> — top management bisa satu orang (pemilik tunggal) atau beberapa orang (dewan direksi, komite eksekutif).</li>
                              <li><strong>"Mengarahkan dan mengendalikan"</strong> — ini adalah fungsi, bukan jabatan. Seseorang yang secara de facto mengarahkan organisasi adalah top management, terlepas dari gelar formalnya.</li>
                              <li><strong>"Level tertinggi"</strong> — dalam konteks scope ISO 9001 yang berlaku, bukan dalam konteks grup atau holding.</li>
                            </ul>
                            <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; margin-top: 12px; border-radius: 4px; color: #1E293B;">
                              📌 Top management adalah peran, bukan orang. Orang yang sama bisa menjadi top management dalam kapasitas tertentu dan bukan top management dalam kapasitas lain — seperti pemilik klinik yang juga dokter pemeriksa.
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Kewajiban top management dalam ISO 9001",
                        color: "#0D9488",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9001:2015 menempatkan sejumlah kewajiban spesifik yang hanya bisa dipenuhi oleh top management — tidak bisa didelegasikan sepenuhnya ke level di bawahnya.</p>
                            
                            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">📋</div><div><strong>Menetapkan kebijakan mutu</strong> — Kebijakan mutu harus ditetapkan dan dikomunikasikan oleh top management (klausul 5.2).</div></div>
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">🎯</div><div><strong>Menetapkan sasaran mutu</strong> — Top management memastikan sasaran mutu ditetapkan pada fungsi dan level yang relevan (klausul 6.2).</div></div>
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">🔗</div><div><strong>Mengintegrasikan QMS ke proses bisnis</strong> — Bukan membuat QMS terpisah dari bisnis, tapi memastikan keduanya menyatu (klausul 5.1.1).</div></div>
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">🌐</div><div><strong>Fokus pada pelanggan</strong> — Memastikan persyaratan pelanggan dipahami dan dipenuhi (klausul 5.1.2).</div></div>
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">📣</div><div><strong>Mengomunikasikan pentingnya QMS</strong> — Kepada seluruh organisasi (klausul 5.1.1).</div></div>
                              <div style="display: flex; gap: 12px;"><div style="font-size: 16px;">🔄</div><div><strong>Melakukan tinjauan manajemen</strong> — Secara berkala mengevaluasi kinerja QMS (klausul 9.3).</div></div>
                            </div>

                            <div class="alert-box" style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; margin-top: 16px; border-radius: 4px; color: #991B1B;">
                              ⚠️ ISO 9001 membolehkan top management mendelegasikan pelaksanaan kewajiban ini. Tapi tanggung jawab dan akuntabilitas-nya tetap ada pada top management — tidak bisa didelegasikan.
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Tiga situasi yang sering membingungkan",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p><strong>Situasi 1 — Anak perusahaan dengan ISO 9001 sendiri:</strong><br/>Top management adalah siapa yang mengarahkan anak perusahaan tersebut — bukan top management perusahaan induk. CEO holding bukan top management untuk scope ISO 9001 anak perusahaan.</p>
                            
                            <p><strong>Situasi 2 — Komisaris atau Dewan Pengawas:</strong><br/>Komisaris mengawasi manajemen tapi tidak mengarahkan operasional sehari-hari. Dalam ISO 9001, mereka biasanya bukan top management — kecuali dalam struktur tertentu di mana mereka terlibat langsung dalam pengarahan operasional.</p>
                            
                            <p><strong>Situasi 3 — Manajer QMS / Wakil Manajemen:</strong><br/>Meski bertanggung jawab atas sistem QMS, Manajer QMS bukan top management — ia menjalankan dan memelihara QMS, tapi bukan yang mengarahkan dan mengendalikan organisasi secara keseluruhan.</p>
                            
                            <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #64748B; padding: 12px; margin-top: 16px; border-radius: 4px; color: #1E293B;">
                              ISO 9001:2015 sengaja menghapus persyaratan "Management Representative" (Wakil Manajemen) yang ada di versi 2008. Ini bukan berarti peran itu tidak diperlukan — tapi untuk menegaskan bahwa tanggung jawab QMS harus ada pada top management itu sendiri, bukan didelegasikan penuh ke satu orang.
                            </div>
                          </div>
                        `
                      }
                    ],
                    nextLabel: "Paham, lanjut ke soal pemahaman →"
                  },
                  // SLIDE 5.5 (Transisi / Intro Quiz)
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Direktur Utama PT Maju Bersama menunjuk Manajer QMS untuk bertanggung jawab penuh atas semua kewajiban top management dalam ISO 9001. Dengan demikian, Direktur Utama tidak lagi memiliki kewajiban apapun terkait QMS.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap;">
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; text-align: center; width: 42%; border: 1px solid #CBD5E1; box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: relative;">
                            <div style="position: absolute; top: -10px; right: -10px; background: #EF4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">?</div>
                            <div style="font-size: 24px; margin-bottom: 4px;">👔</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 12px;">Top Management</div>
                            <div style="font-size: 10px; color: #64748B;">Kewajiban ISO 9001 kl. 5</div>
                            <div style="font-size: 10px; color: #EF4444; margin-top: 4px; font-weight: bold;">Masih ada kewajiban?</div>
                          </div>
                          
                          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 16%;">
                            <div style="font-size: 10px; color: #64748B; font-weight: bold; text-align: center; margin-bottom: 2px;">mendelegasikan semua kewajiban QMS</div>
                            <div style="color: #475569; font-weight: bold; font-size: 18px;">→</div>
                          </div>
                          
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; text-align: center; width: 42%; border: 1px solid #CBD5E1; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                            <div style="font-size: 24px; margin-bottom: 4px;">📋</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 12px;">Manajer QMS</div>
                            <div style="font-size: 10px; color: #2563EB;">Bertanggung jawab penuh atas QMS</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Direktur tidak perlu terlibat lagi", correct: false, feedback: "Belum tepat. Mendelegasikan pelaksanaan berbeda dengan melepaskan tanggung jawab. ISO 9001 klausul 5.1 secara eksplisit menetapkan kewajiban yang harus dipenuhi top management — bukan stafnya. Manajer QMS bisa membantu pelaksanaan, tapi akuntabilitas tetap ada pada Direktur Utama." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Tanggung jawab tidak bisa didelegasikan", correct: true, feedback: "Tepat! ISO 9001 membolehkan top management mendelegasikan pelaksanaan — tapi tanggung jawab dan akuntabilitas atas QMS tetap melekat pada top management. Direktur Utama masih harus menetapkan kebijakan mutu, memastikan QMS terintegrasi dengan bisnis, dan melakukan tinjauan manajemen. Ini tidak bisa didelegasikan penuh ke Manajer QMS." }
                    ]
                  },
                  // SLIDE 7
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "PT Nusantara Indah adalah anak perusahaan dari Grup Nusantara. Dalam sertifikasi ISO 9001 PT Nusantara Indah, CEO Grup Nusantara otomatis menjadi bagian dari top management yang memiliki kewajiban ISO 9001.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                          <div style="font-weight: bold; font-size: 13px; color: #1E293B; margin-bottom: 4px;">CEO Grup Nusantara</div>
                          <div style="color: #64748B; font-size: 18px; margin-bottom: 4px;">⬇️</div>
                          <div style="background: #FFFFFF; border: 2px dashed #3B82F6; padding: 12px; border-radius: 8px; display: inline-block;">
                            <div style="font-weight: bold; font-size: 13px; color: #3B82F6; margin-bottom: 4px;">PT Nusantara Indah</div>
                            <div style="font-size: 11px; color: #64748B;">Direktur Utama</div>
                          </div>
                          <div style="font-size: 11px; color: #1E3A8A; font-weight: bold; margin-top: 8px;">Scope ISO 9001 hanya berlaku untuk PT Nusantara Indah</div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "CEO grup otomatis terlibat", correct: false, feedback: "Belum tepat. ISO 9001 tidak berjalan berdasarkan struktur kepemilikan — tapi berdasarkan scope sertifikasi. Kewajiban top management ISO 9001 berlaku untuk siapa yang mengarahkan entitas yang disertifikasi, bukan siapa yang mengendalikan grup atau holding-nya." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Bergantung scope ISO 9001", correct: true, feedback: "Tepat! Top management dalam ISO 9001 selalu didefinisikan dalam konteks scope sertifikasi yang berlaku. Scope ISO 9001 adalah PT Nusantara Indah — bukan Grup Nusantara. CEO Grup adalah top management untuk Grup, tapi tidak otomatis menjadi top management untuk scope ISO 9001 PT Nusantara Indah. Yang relevan adalah siapa yang mengarahkan dan mengendalikan PT Nusantara Indah." }
                    ]
                  },
                  // SLIDE 8
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Di ISO 9001:2015, jabatan 'Management Representative' (Wakil Manajemen) tidak lagi diwajibkan — artinya tidak boleh ada sama sekali di perusahaan yang mengimplementasikan ISO 9001:2015.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; justify-content: space-between; margin-bottom: 16px;">
                          <div style="width: 45%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; text-align: center; background: #FFFFFF;">
                            <div style="font-size: 10px; font-weight: bold; color: #64748B; margin-bottom: 8px;">ISO 9001:2008</div>
                            <div style="font-size: 12px; font-weight: bold; color: #1E293B;">✓ Management Representative wajib ada</div>
                            <div style="font-size: 10px; color: #475569; margin-top: 4px;">Satu orang ditunjuk sebagai wakil manajemen</div>
                          </div>
                          
                          <div style="display: flex; align-items: center; justify-content: center; font-size: 24px;">❓</div>
                          
                          <div style="width: 45%; padding: 12px; border: 1px solid #3B82F6; border-radius: 8px; text-align: center; background: #EEF2FF;">
                            <div style="font-size: 10px; font-weight: bold; color: #1E3A8A; margin-bottom: 8px;">ISO 9001:2015</div>
                            <div style="font-size: 12px; font-weight: bold; color: #1E293B;">? Management Representative...</div>
                            <div style="font-size: 10px; color: #475569; margin-top: 4px;">Tidak lagi disebutkan sebagai persyaratan</div>
                          </div>
                        </div>
                        <div style="text-align: center; font-size: 12px; font-weight: bold; color: #B45309;">Boleh ada atau tidak?</div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "🚫", label: "Benar", subLabel: "Tidak boleh ada lagi", correct: false, feedback: "Belum tepat. 'Tidak diwajibkan' tidak sama dengan 'tidak boleh ada'. ISO 9001:2015 menghapus kewajiban menunjuk satu orang sebagai wakil manajemen — tapi tidak melarang organisasi mempertahankan peran tersebut jika dianggap membantu. Perbedaannya ada pada siapa yang memegang akuntabilitas: kini harus top management, bukan wakil manajemen." },
                      { id: "salah", icon: "✅", label: "Salah", subLabel: "Boleh ada, tapi tidak wajib", correct: true, feedback: "Tepat! ISO 9001:2015 menghapus persyaratan wajib Management Representative — tapi tidak melarang keberadaannya. Banyak organisasi tetap mempertahankan peran ini karena membantu koordinasi QMS. Yang berubah adalah: tanggung jawab QMS kini harus ada pada top management sendiri, bukan didelegasikan penuh ke satu orang wakil. Management Representative boleh ada sebagai peran pendukung, bukan sebagai pemegang tanggung jawab utama." }
                    ]
                  },
                  // SLIDE 9
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Komisaris PT Sejahtera Abadi tidak pernah terlibat dalam keputusan operasional sehari-hari. Berdasarkan kondisi ini, Komisaris tidak termasuk top management dalam konteks ISO 9001 PT Sejahtera Abadi.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
                            <div style="font-size: 24px;">🏛️</div>
                            <div>
                              <div style="font-size: 12px; font-weight: bold; color: #1E293B;">Dewan Komisaris (Pengawas)</div>
                              <div style="font-size: 11px; color: #475569;">✓ Mengawasi manajemen<br/>✓ Menyetujui kebijakan besar<br/><span style="color: #EF4444;">✗ Tidak terlibat operasional harian</span></div>
                            </div>
                          </div>
                          
                          <div style="border-top: 2px dashed #94A3B8; margin: 4px 0 12px 0;"></div>
                          
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; display: flex; align-items: flex-start; gap: 12px;">
                            <div style="font-size: 24px;">👔</div>
                            <div>
                              <div style="font-size: 12px; font-weight: bold; color: #1E293B;">Direksi (Pengelola)</div>
                              <div style="font-size: 11px; color: #475569;">✓ Mengarahkan operasional<br/>✓ Membuat keputusan bisnis harian<br/>✓ Bertanggung jawab atas kinerja</div>
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Komisaris bukan top management", correct: true, feedback: "Tepat! Komisaris yang hanya berperan mengawasi — tanpa terlibat dalam pengarahan dan pengendalian operasional — biasanya bukan top management dalam konteks ISO 9001. Top management adalah siapa yang mengarahkan dan mengendalikan organisasi. Jika Komisaris tidak melakukan itu, mereka tidak masuk definisi ISO 9000. Yang menjadi top management adalah Direksi yang menjalankan pengarahan operasional." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Komisaris tetap top management", correct: false, feedback: "Belum tepat. ISO 9000 mendefinisikan top management berdasarkan fungsi: mengarahkan dan mengendalikan. Komisaris yang hanya mengawasi — tanpa mengarahkan operasional — tidak memenuhi kriteria ini. Berbeda jika komisaris secara aktif terlibat dalam pengarahan operasional, tapi dalam kondisi yang digambarkan, mereka bukan top management." }
                    ]
                  },
                  // SLIDE 10
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-A-N04 Selesai!",
                      insight: "Anda sudah mampu mengidentifikasi top management dalam berbagai struktur organisasi — termasuk kasus-kasus yang tidak jelas batasannya.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Top management = orang/kelompok yang mengarahkan dan mengendalikan organisasi pada level tertinggi dalam scope ISO 9001",
                        "Top management adalah peran, bukan jabatan — satu orang bisa top management dalam satu kapasitas dan tidak dalam kapasitas lain",
                        "Tanggung jawab QMS tidak bisa didelegasikan penuh — top management tetap akuntabel meski pelaksanaannya didelegasikan",
                        "ISO 9001:2015 menghapus kewajiban Management Representative — bukan melarangnya, tapi menggeser akuntabilitas ke top management sendiri"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              }
            ],
          },
          // ------------------------------------------
          // LESSON 4: Istilah Tentang Sistem dan Proses
          // ------------------------------------------
          {
            id: "sistem-dan-proses",
            title: "Istilah Tentang Sistem dan Proses",
            icon: "⚙️",
            duration: "40 menit",
            subLessons: [
              {
                id: "sistem-vs-proses-vs-prosedur",
                title: "Sistem vs proses vs prosedur — perbedaan yang sering tertukar",
                icon: "🔄",
                duration: "10 menit",
                slides: [
                  // SLIDE 1
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasikan setiap item: Sistem, Proses, atau Prosedur?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Sari Roti adalah pabrik roti yang sudah bersertifikat ISO 9001. Berikut sejumlah hal yang ada di pabriknya.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "sistem", label: "🔗 Sistem", subLabel: "Kumpulan elemen yang saling terkait", color: COLORS.dark },
                      { id: "proses", label: "⚙️ Proses", subLabel: "Input → Aktivitas → Output", color: COLORS.do },
                      { id: "prosedur", label: "📋 Prosedur", subLabel: "Cara yang ditentukan untuk melakukan aktivitas", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🏭", text: "Keseluruhan QMS — mencakup proses, dokumen, dan orang yang bekerja terintegrasi", targetZone: "sistem" },
                      { id: "c2", icon: "🌾", text: "Penerimaan bahan baku — dari supplier datang, dicek, hingga disimpan", targetZone: "proses" },
                      { id: "c3", icon: "📄", text: "Langkah tertulis cara inspeksi bahan baku (atur suhu, cek CoA, catat)", targetZone: "prosedur" },
                      { id: "c4", icon: "🔥", text: "Pemanggangan — adonan masuk oven diproses menjadi roti matang", targetZone: "proses" },
                      { id: "c5", icon: "📑", text: "SOP atau dokumen tata cara pengemasan roti secara spesifik", targetZone: "prosedur" },
                      { id: "c6", icon: "🔗", text: "Keseluruhan rantai operasional (penerimaan hingga kirim) yang saling terkait", targetZone: "sistem" }
                    ],
                    feedbackCorrect: "Sempurna! Sistem adalah keseluruhan yang saling terkait. Proses adalah satu rangkaian aktivitas yang mengubah input menjadi output. Prosedur adalah dokumen atau cara yang ditentukan untuk melakukan aktivitas — 'cara tertulis bagaimana proses dijalankan'. Ketiganya saling berhubungan tapi berbeda levelnya.",
                    feedbackWrong: "Ada yang tertukar. Sistem = keseluruhan QMS yang saling terkait. Proses = satu rangkaian input-aktivitas-output (pemanggangan, penerimaan bahan baku). Prosedur = cara tertulis yang menjelaskan bagaimana proses atau aktivitas dilakukan."
                  },
                  // SLIDE 2
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasikan setiap item: Sistem, Proses, atau Prosedur?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Kemasan Prima memproduksi kemasan plastik untuk industri makanan dan minuman.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "sistem", label: "🔗 Sistem", subLabel: "Kumpulan elemen yang saling terkait", color: COLORS.dark },
                      { id: "proses", label: "⚙️ Proses", subLabel: "Input → Aktivitas → Output", color: COLORS.do },
                      { id: "prosedur", label: "📋 Prosedur", subLabel: "Cara yang ditentukan untuk melakukan aktivitas", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "⚗️", text: "Pencampuran — resin dan aditif diproses hingga menjadi compound siap cetak", targetZone: "proses" },
                      { id: "c2", icon: "📋", text: "Instruksi kerja mesin injection molding (cara set suhu, masuk material, dll)", targetZone: "prosedur" },
                      { id: "c3", icon: "🏗️", text: "Perpaduan kebijakan, proses, dan inspeksi yang terintegrasi di PT Kemasan", targetZone: "sistem" },
                      { id: "c4", icon: "🔬", text: "Pengujian mutu — sampel lab dites hingga hasilnya siap dicatat", targetZone: "proses" },
                      { id: "c5", icon: "📄", text: "Dokumen tertulis panduan langkah-langkah menangani produk reject", targetZone: "prosedur" },
                      { id: "c6", icon: "🌐", text: "Interaksi antar departemen (Produksi, QC, Gudang) dalam mencapai satu tujuan", targetZone: "sistem" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan kartu 6 — interaksi antar departemen yang bekerja bersama untuk satu tujuan adalah sistem. Setiap aktivitas individual yang mengubah input menjadi output adalah proses. Dokumen tertulis yang menjelaskan cara melakukan aktivitas adalah prosedur.",
                    feedbackWrong: "Ada yang tertukar. Sistem bukan hanya satu departemen atau satu proses — ia adalah keseluruhan jaringan yang saling terkait. Proses adalah satu rangkaian input-aktivitas-output yang terdefinisi. Prosedur adalah panduan tertulis cara menjalankan aktivitas tersebut."
                  },
                  // SLIDE 3
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasikan setiap item: Sistem, Proses, atau Prosedur?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Otomotif Jaya merakit kendaraan roda dua. Semua aktivitas berikut berlangsung di pabrik mereka.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "sistem", label: "🔗 Sistem", subLabel: "Kumpulan elemen saling terkait", color: COLORS.dark },
                      { id: "proses", label: "⚙️ Proses", subLabel: "Input → Aktivitas → Output", color: COLORS.do },
                      { id: "prosedur", label: "📋 Prosedur", subLabel: "Cara menentukan aktivitas", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🔧", text: "Perakitan rangka — pipa dilas dan dirakit mengubahnya menjadi rangka siap cat", targetZone: "proses" },
                      { id: "c2", icon: "📑", text: "SOP instruksi pengecatan (cara preparasi hingga inspeksi hasil)", targetZone: "prosedur" },
                      { id: "c3", icon: "🏭", text: "Seluruh QMS PT Otomotif Jaya — dari pengadaan, produksi, hingga after-sales", targetZone: "sistem" },
                      { id: "c4", icon: "🎨", text: "Pengecatan — rangka mentah disemprot hingga keluar terang bercat", targetZone: "proses" },
                      { id: "c5", icon: "📋", text: "Petunjuk kerja tertulis langkah-langkah merakit dan menguji sistem rem", targetZone: "prosedur" },
                      { id: "c6", icon: "⚙️", text: "Keseluruhan alur pabrik perakitan yang saling bergantung dan dikendalikan bersama", targetZone: "sistem" }
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan pola yang sama di setiap industri: Sistem = keseluruhan yang terintegrasi. Proses = satu rangkaian yang mengubah input (rangka mentah, rangka siap cat) menjadi output (rangka siap cat, rangka bercat). Prosedur = panduan cara melakukan aktivitas di dalam proses.",
                    feedbackWrong: "Ada yang tertukar. Pola yang sama berlaku di semua industri: sistem mencakup segalanya, proses adalah satu rangkaian input-output, prosedur adalah panduan tertulis untuk melakukan aktivitas dalam proses."
                  },
                  // SLIDE 4
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasikan setiap item: Sistem, Proses, atau Prosedur?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; color: #475569;">PT Garmen Mandiri memproduksi seragam kerja untuk berbagai perusahaan. Perhatikan berbagai hal yang ada di operasional mereka.</div>`
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya. Ada tiga zona.",
                    zones: [
                      { id: "sistem", label: "🔗 Sistem", subLabel: "Keseluruhan berintegrasi", color: COLORS.dark },
                      { id: "proses", label: "⚙️ Proses", subLabel: "Input → Aktivitas → Output", color: COLORS.do },
                      { id: "prosedur", label: "📋 Prosedur", subLabel: "Dokumen pedoman aktivitas", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "✂️", text: "Pemotongan kain — dari kain utuh dipotong mengikuti pola siap jahit", targetZone: "proses" },
                      { id: "c2", icon: "🪡", text: "Penjahitan — menyatukan potongan-potongan kain hingga menjadi seragam utuh", targetZone: "proses" },
                      { id: "c3", icon: "📄", text: "Langkah tertulis inspeksi jahitan (cara ukur, tes tarik, isi form QC)", targetZone: "prosedur" },
                      { id: "c4", icon: "🌐", text: "Seluruh operasional PT Garmen Mandiri yang dikendalikan satu sistem mutu", targetZone: "sistem" },
                      { id: "c5", icon: "📋", text: "SOP penanganan klaim (panduan tata cara merespon hingga menutup klaim)", targetZone: "prosedur" },
                      { id: "c6", icon: "🔗", text: "Hubungan timbal-balik antar departemen yang memastikan pesanan sesuai spek", targetZone: "sistem" }
                    ],
                    feedbackCorrect: "Sempurna! Di soal ini ada dua proses produksi (cutting dan penjahitan) dan dua prosedur yang berbeda konteksnya (inspeksi QC dan penanganan klaim). Prosedur bisa mendokumentasikan aktivitas apapun — tidak hanya produksi. Yang konsisten: prosedur selalu berupa panduan tertulis tentang cara melakukan sesuatu.",
                    feedbackWrong: "Ada yang tertukar. Ingat: prosedur tidak selalu tentang produksi — SOP penanganan klaim juga prosedur. Sistem adalah keseluruhan yang terintegrasi. Proses adalah rangkaian input-aktivitas-output yang spesifik."
                  },
                  // SLIDE 5
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      labelColor: "#0D9488",
                      label: "Materi Inti",
                      text: "Sistem, Proses, Prosedur — Tiga Level yang Berbeda"
                    },
                    panels: [
                      {
                        title: "Definisi resmi ketiganya dari ISO 9000",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000:2015 mendefinisikan ketiganya dengan jelas:</p>
                            <ul style="padding-left: 20px; list-style-type: disc;">
                              <li><strong>Sistem</strong> — sekumpulan elemen yang saling terkait dan berinteraksi. QMS adalah sistem: proses, orang, infrastruktur, dokumen, kebijakan, dan sumber daya yang semuanya bekerja bersama untuk menghasilkan mutu yang konsisten.</li>
                              <li><strong>Proses</strong> — sekumpulan aktivitas yang saling terkait yang menggunakan input untuk menghasilkan output yang direncanakan. Setiap proses punya tiga elemen wajib: input yang jelas, aktivitas yang mengubah input, dan output yang terukur.</li>
                              <li><strong>Prosedur</strong> — cara yang ditentukan untuk melakukan suatu aktivitas atau proses. Prosedur bisa terdokumentasi (tertulis) atau tidak — ISO 9000 tidak mewajibkan semua prosedur harus tertulis, tapi ISO 9001 mewajibkan beberapa prosedur spesifik dalam bentuk informasi terdokumentasi.</li>
                            </ul>
                            <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; margin-top: 12px; border-radius: 4px; color: #1E293B;">
                              📌 <strong>Hubungan hirarkis:</strong> Sistem terdiri dari banyak proses yang saling terkait. Setiap proses dijalankan dengan cara tertentu yang disebut prosedur. Sistem → Proses → Prosedur: dari yang terluas ke yang paling spesifik.
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Analogi pabrik yang memudahkan",
                        color: "#0D9488",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Bayangkan sebuah pabrik roti:</p>
                            <div style="background: #1E293B; border: 1px dashed #475569; padding: 16px; border-radius: 8px; margin-top: 12px; margin-bottom: 12px; font-family: monospace; white-space: pre; font-size: 11px; overflow-x: auto; color: #94A3B8;">
┌─────────────────────────────────────────────────┐
│  SISTEM — QMS Pabrik Roti                       │
│  Semua yang bekerja bersama: orang, mesin,      │
│  dokumen, kebijakan, proses                     │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │  PROSES 1    │  │  PROSES 2    │  ...        │
│  │  Penerimaan  │  │Pemanggangan  │             │
│  │  Bahan Baku  │  │              │             │
│  │              │  │              │             │
│  │ ┌──────────┐ │  │ ┌──────────┐ │             │
│  │ │PROSEDUR  │ │  │ │PROSEDUR  │ │             │
│  │ │Cara cek  │ │  │ │Cara atur │ │             │
│  │ │bahan baku│ │  │ │suhu oven │ │             │
│  │ └──────────┘ │  │ └──────────┘ │             │
│  └──────────────┘  └──────────────┘             │
└─────────────────────────────────────────────────┘
                            </div>
                            <p>Sistem adalah "pabrik roti secara keseluruhan". Proses adalah "penerimaan bahan baku" atau "pemanggangan" — masing-masing punya input, aktivitas, dan output sendiri. Prosedur adalah "cara memeriksa bahan baku" atau "cara mengatur suhu oven" — panduan spesifik bagaimana aktivitas di dalam proses dilakukan.</p>
                          </div>
                        `
                      },
                      {
                        title: "Tiga kesalahan yang paling umum",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p><strong>Kesalahan 1 — Menyamakan prosedur dengan proses:</strong><br/>
                            "Proses pengiriman kami ada di prosedur ini." Yang dimaksud biasanya adalah bahwa <em>cara</em> melakukan pengiriman ada di prosedur tersebut — bukan bahwa proses dan prosedur adalah hal yang sama. Proses adalah aktivitasnya, prosedur adalah panduannya.</p>

                            <p><strong>Kesalahan 2 — Menganggap sistem = software:</strong><br/>
                            Dalam bahasa sehari-hari, "sistem" sering berarti software atau IT. Dalam ISO 9000, sistem adalah jaringan proses, orang, dan sumber daya yang saling terkait — tidak harus berhubungan dengan teknologi.</p>

                            <p><strong>Kesalahan 3 — Mengira satu proses = satu departemen:</strong><br/>
                            Satu proses bisa melibatkan lebih dari satu departemen. Proses "pemenuhan pesanan pelanggan" bisa melibatkan Sales, Produksi, Gudang, dan Pengiriman — tapi tetap satu proses dengan input (pesanan masuk) dan output (produk diterima pelanggan) yang jelas.</p>

                            <div class="alert-box" style="background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; margin-top: 12px; border-radius: 4px; color: #1E293B;">
                              <strong>Cara cepat membedakan:</strong> tanya "apa yang berubah?" — jika ada input yang berubah jadi output, itu proses. Tanya "bagaimana caranya?" — jika itu panduan cara melakukan, itu prosedur. Tanya "apa yang bekerja bersama?" — jika itu kumpulan elemen yang saling terkait, itu sistem.
                            </div>
                          </div>
                        `
                      }
                    ],
                    nextLabel: "Paham, lanjut ke soal pemahaman →"
                  },
                  // SLIDE 5.5
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "ISO 9001 mengizinkan sebuah proses berjalan tanpa dokumen prosedur (SOP) tertulis, asalkan proses tersebut dapat dijalankan secara terkendali dan hasilnya konsisten.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; text-align: center;">
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; width: 40%; border: 1px solid #CBD5E1;">
                            <div style="font-size: 24px; margin-bottom: 4px;">⚙️</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px;">Proses Produksi</div>
                            <div style="font-size: 10px; color: #64748B;">Input → Aktivitas → Output</div>
                          </div>
                          <div style="width: 15%; display: flex; flex-direction: column; align-items: center;">
                            <div style="font-weight: bold; color: #475569; font-size: 18px;">→</div>
                            <div style="font-size: 10px; font-weight: bold; color: #64748B; margin-top: -4px;">harus<br/>punya?</div>
                          </div>
                          <div style="background: #FFFFFF; padding: 12px; border-radius: 8px; width: 40%; border: 1px dashed #3B82F6;">
                            <div style="font-size: 24px; margin-bottom: 4px;">📄</div>
                            <div style="font-weight: bold; color: #1E3A8A; font-size: 13px;">Dokumen SOP</div>
                            <div style="font-size: 10px; color: #64748B;">Panduan tertulis tata cara</div>
                          </div>
                        </div>
                        <div style="text-align: center; color: #EF4444; font-weight: 800; font-size: 16px;">Wajib atau Tidak?</div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Tidak semua proses wajib tertulis", correct: true, feedback: "Tepat! Seringkali orang mengira ISO 9001 gila dokumen. Padahal, ISO 9000 mendefinisikan prosedur sebagai cara melakukan suatu aktivitas — yang sifatnya tidak harus tertulis. Jika karyawan sudah sangat terlatih dan hasilnya konsisten, Anda tidak wajib punya prosedur tertulis." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Setiap proses wajib punya SOP tertulis", correct: false, feedback: "Belum tepat. Justru banyak proses di perusahaan tidak perlu didokumentasikan jika memang rutin, berisiko rendah, dan pekerjanya sudah kompeten. ISO 9001 hanya mewajibkan informasi terdokumentasi (dokumen tertulis) pada klausul-klausul spesifik saja." }
                    ]
                  },
                  // SLIDE 7
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Satu proses dapat melintasi beberapa departemen yang berbeda sekaligus (misalnya dari Sales, ke Produksi, lalu ke Gudang), asalkan rangkaian aktivitas tersebut memiliki input dan output keseluruhan yang jelas.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                          <div style="font-size: 11px; font-weight: bold; color: #64748B; text-align: center; margin-bottom: 8px;">Contoh: Rantai Pemenuhan Pesanan</div>
                          
                          <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
                              <div style="font-weight: bold; color: #1E293B; font-size: 11px;">Sales</div>
                              <div style="font-size: 9px; color: #64748B;">Terima pesanan</div>
                            </div>
                            <span style="color: #94A3B8; font-size: 10px;">➔</span>
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
                              <div style="font-weight: bold; color: #1E293B; font-size: 11px;">Produksi</div>
                              <div style="font-size: 9px; color: #64748B;">Buat produk</div>
                            </div>
                            <span style="color: #94A3B8; font-size: 10px;">➔</span>
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
                              <div style="font-weight: bold; color: #1E293B; font-size: 11px;">Gudang</div>
                              <div style="font-size: 9px; color: #64748B;">Kemas produk</div>
                            </div>
                            <span style="color: #94A3B8; font-size: 10px;">➔</span>
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
                              <div style="font-weight: bold; color: #1E293B; font-size: 11px;">Kirim</div>
                              <div style="font-size: 9px; color: #64748B;">Ke pelanggan</div>
                            </div>
                          </div>
                          
                          <div style="margin-top: 12px; border-top: 1px dashed #94A3B8; padding-top: 8px; text-align: center;">
                            <span style="font-size: 11px; font-weight: bold; color: #3B82F6; letter-spacing: 1px;">← ─ MUNGKINKAH INI HANYA SATU PROSES? ─ →</span>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Batas proses ditentukan arah operasionalnya", correct: true, feedback: "Tepat sekali! ISO 9001 mendorong pendekatan lintas sektoral. Proses 'pemenuhan pesanan' ini melintasi Sales, Produksi, dan Gudang, tetapi akan dihitung sebagai satu proses tunggal karena ia punya satu titik awal (pesanan diterima) dan titik akhir spesifik (produk terkirim)." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Setiap departemen tentu punya proses masing-masing", correct: false, feedback: "Belum tepat. Anda masih memandang perusahaan berdasarkan batas departemen/sekat jabatan. Dalam ISO 9001 (pendekatan proses), batas dari sebuah proses sangat fleksibel dan tidak dibatasi sekat departemen! Seluruh lajur operasional dari terima pesanan hingga ke pelanggan bisa dilihat sebagai SATU proses." }
                    ]
                  },
                  // SLIDE 8
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "QMS yang baik adalah QMS yang memiliki prosedur tertulis untuk setiap aktivitas di seluruh organisasi — semakin banyak prosedur tertulis, semakin baik QMS-nya.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; gap: 12px; margin-bottom: 16px;">
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 12px; font-weight: bold; color: #1E293B; margin-bottom: 8px;">QMS A</div>
                            <div style="font-size: 24px; margin-bottom: 4px;">📚</div>
                            <div style="font-weight: bold; color: #1E3A8A; font-size: 12px;">500 SOP tertulis</div>
                            <div style="font-size: 10px; color: #64748B;">Setiap aktivitas terdokumentasi</div>
                            <div style="margin-top: 8px; color: #D97706; font-size: 11px; font-weight: 800;">⭐ Lebih baik? 🤔</div>
                          </div>
                          
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 12px; font-weight: bold; color: #1E293B; margin-bottom: 8px;">QMS B</div>
                            <div style="font-size: 24px; margin-bottom: 4px;">📄</div>
                            <div style="font-weight: bold; color: #0F766E; font-size: 12px;">50 SOP tertulis</div>
                            <div style="font-size: 10px; color: #64748B;">Hanya yang diperlukan</div>
                            <div style="margin-top: 8px; color: #64748B; font-size: 11px; font-weight: 800;">❓ Kurang baik?</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "📈", label: "Benar", subLabel: "Makin banyak prosedur = makin baik", correct: false, feedback: "Belum tepat. Banyaknya prosedur tertulis bukan indikator kualitas QMS. ISO 9001 hanya mewajibkan dokumentasi tertulis untuk hal-hal spesifik. QMS yang efektif adalah yang prosesnya berjalan terkendali — bukan yang punya SOP terbanyak." },
                      { id: "salah", icon: "🎯", label: "Salah", subLabel: "Kualitas lebih penting dari kuantitas", correct: true, feedback: "Tepat! ISO 9001 tidak mengukur kualitas QMS dari jumlah prosedur tertulis. Yang dinilai adalah apakah proses berjalan terkendali dan menghasilkan output yang konsisten. Terlalu banyak prosedur justru bisa membuat QMS tidak praktis — dokumen yang tidak dibaca dan tidak diikuti tidak memberikan nilai apapun. Prosedur yang tepat untuk aktivitas yang tepat lebih baik dari ribuan SOP yang tidak digunakan." }
                    ]
                  },
                  // SLIDE 9
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Ketika ISO 9001 menyebut 'pendekatan proses' (process approach), yang dimaksud adalah organisasi harus mendokumentasikan setiap proses dalam bentuk flowchart.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                              <div style="font-size: 20px;">🔄</div>
                              <div style="font-weight: bold; color: #1E293B; font-size: 12px;">Pendekatan Proses</div>
                            </div>
                            <div style="font-size: 11px; color: #3B82F6; font-weight: 600; margin-bottom: 4px;">Klausul 4.4 ISO 9001</div>
                            <div style="font-size: 10px; color: #64748B;">Memahami dan mengelola proses yang saling terkait sebagai sebuah sistem</div>
                          </div>
                          
                          <div style="font-size: 24px; color: #94A3B8;">=</div>
                          
                          <div style="flex: 1; background: #EEF2FF; border: 1px dashed #3B82F6; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 20px; margin-bottom: 4px;">📊</div>
                            <div style="font-weight: bold; color: #1E3A8A; font-size: 12px;">Flowchart / Diagram Alir</div>
                            <div style="font-size: 10px; color: #64748B;">Salah satu cara dokumentasi</div>
                            <div style="margin-top: 6px; font-weight: bold; color: #EF4444; font-size: 11px;">Wajib? ❓</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "📊", label: "Benar", subLabel: "Flowchart wajib untuk setiap proses", correct: false, feedback: "Belum tepat. ISO 9001 mewajibkan process approach sebagai cara berpikir dan mengelola — bukan format dokumentasi tertentu. Flowchart adalah alat bantu yang berguna tapi tidak diwajibkan. Yang diwajibkan adalah bahwa proses dipahami, dikelola, dan menghasilkan output yang konsisten." },
                      { id: "salah", icon: "🎯", label: "Salah", subLabel: "Flowchart hanya salah satu cara", correct: true, feedback: "Tepat! Process approach adalah cara berpikir — memahami dan mengelola proses-proses yang saling terkait sebagai sebuah sistem, bukan mendokumentasikannya dalam format tertentu. ISO 9001 tidak mewajibkan flowchart. Proses bisa didokumentasikan dengan flowchart, narasi, tabel, atau format lain — atau bahkan tidak terdokumentasi sama sekali jika prosesnya sudah cukup terkendali." }
                    ]
                  },
                  // SLIDE 10
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-B-N01 Selesai!",
                      insight: "Anda sudah mampu membedakan sistem, proses, dan prosedur — dan memahami hubungan hirarkis di antara ketiganya.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Sistem = kumpulan elemen saling terkait · Proses = input → aktivitas → output · Prosedur = cara yang ditentukan untuk melakukan aktivitas",
                        "Hubungan hirarkis: Sistem terdiri dari Proses, Proses dijalankan dengan Prosedur",
                        "Proses bisa lintas departemen — batas proses ditentukan oleh input-output, bukan batas organisasi",
                        "Prosedur tidak harus tertulis — ISO 9001 hanya mewajibkan dokumentasi tertulis untuk hal-hal yang disebutkan eksplisit"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              // ------------------------------------------
              // SUB-LESSON 2: Proses (process) — definisi dan elemen pembentuknya
              // ------------------------------------------
              {
                id: "proses-definisi-dan-elemen",
                title: "Proses (process) — definisi dan elemen pembentuknya",
                icon: "⚙️",
                duration: "10 menit",
                slides: [
                  // SLIDE 1
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "1",
                      label: "Proses: Penggilingan Biji Kopi. Klasifikasikan setiap item ke elemen yang tepat.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: bold; color: #475569; margin-bottom: 12px; font-size: 13px;">
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">INPUT</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">AKTIVITAS</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">OUTPUT</span>
                          </div>
                          <div style="font-size: 12px; color: #64748B;">PT Kopi Prima menggiling biji kopi arabika menjadi kopi bubuk siap kemas.</div>
                        </div>
                      `
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "input", label: "📥 Input", subLabel: "Apa yang masuk ke proses", color: COLORS.dark },
                      { id: "aktivitas", label: "⚙️ Aktivitas", subLabel: "Apa yang dilakukan dalam proses", color: COLORS.do },
                      { id: "output", label: "📤 Output", subLabel: "Apa yang keluar dari proses", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "☕", text: "Biji kopi arabika yang sudah disangrai dari proses sebelumnya", targetZone: "input" },
                      { id: "c2", icon: "⚙️", text: "Mengatur tingkat kehalusan gilingan sesuai spesifikasi produk", targetZone: "aktivitas" },
                      { id: "c3", icon: "💨", text: "Menghidupkan mesin penggiling dan memasukkan biji kopi", targetZone: "aktivitas" },
                      { id: "c4", icon: "🧂", text: "Kopi bubuk dengan tingkat kehalusan sesuai standar, siap dikemas", targetZone: "output" },
                      { id: "c5", icon: "💧", text: "Energi listrik yang menggerakkan mesin penggiling", targetZone: "input" },
                      { id: "c6", icon: "🌡️", text: "Debu halus kopi yang keluar sebagai sisa proses penggilingan", targetZone: "output" }
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan dua hal penting: energi listrik adalah input — bukan hanya bahan baku fisik. Debu kopi adalah output — meski tidak diinginkan. Dalam ISO 9000, output mencakup semua hasil proses, termasuk yang tidak direncanakan. QMS yang baik mengidentifikasi dan mengendalikan semua output, bukan hanya produk bagusnya.",
                    feedbackWrong: "Ada yang tertukar. Input = semua yang dibutuhkan proses untuk berjalan (bahan baku, energi, informasi). Aktivitas = yang dikerjakan di dalam proses. Output = semua yang keluar dari proses — termasuk produk bagus, reject, dan waste."
                  },
                  // SLIDE 2
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "2",
                      label: "Proses: Penerimaan dan Inspeksi Bahan Baku. Klasifikasikan setiap item.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: bold; color: #475569; margin-bottom: 12px; font-size: 13px;">
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">INPUT</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">AKTIVITAS</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">OUTPUT</span>
                          </div>
                          <div style="font-size: 12px; color: #64748B;">PT Semen Kokoh menerima pasir kwarsa dari supplier, memeriksa kualitasnya, lalu menyimpannya di gudang.</div>
                        </div>
                      `
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "input", label: "📥 Input", subLabel: "Apa yang masuk ke proses", color: COLORS.dark },
                      { id: "aktivitas", label: "⚙️ Aktivitas", subLabel: "Apa yang dilakukan dalam proses", color: COLORS.do },
                      { id: "output", label: "📤 Output", subLabel: "Apa yang keluar dari proses", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "🪨", text: "Pasir kwarsa yang dikirim supplier, tiba di pintu gudang", targetZone: "input" },
                      { id: "c2", icon: "📄", text: "Sertifikat analisa (CoA) dari supplier — dokumen spesifikasi pasir", targetZone: "input" },
                      { id: "c3", icon: "🔬", text: "Mengambil sampel pasir dari setiap karung dan menguji kemurniannya", targetZone: "aktivitas" },
                      { id: "c4", icon: "⚖️", text: "Menimbang total berat pasir yang diterima dan mencocokkan dengan surat jalan", targetZone: "aktivitas" },
                      { id: "c5", icon: "✅", text: "Pasir kwarsa yang sudah diverifikasi dan disimpan di area gudang bahan baku", targetZone: "output" },
                      { id: "c6", icon: "❌", text: "Pasir kwarsa yang tidak lolos inspeksi — dikembalikan ke supplier", targetZone: "output" }
                    ],
                    feedbackCorrect: "Tepat! Sertifikat CoA dari supplier adalah input berupa informasi — bukan hanya bahan fisik. Pasir yang ditolak adalah output yang tidak diinginkan — tetap merupakan output proses yang perlu dicatat dan ditangani. Setiap proses penerimaan material punya dua kemungkinan output: diterima atau ditolak.",
                    feedbackWrong: "Ada yang tertukar. Ingat: input bisa berupa benda fisik (pasir), dokumen (CoA), atau informasi. Output mencakup semua hasil proses — pasir yang diterima ke gudang dan pasir yang dikembalikan ke supplier sama-sama merupakan output."
                  },
                  // SLIDE 3
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "3",
                      label: "Proses: Penanganan Keluhan Pelanggan. Klasifikasikan setiap item.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: bold; color: #475569; margin-bottom: 12px; font-size: 13px;">
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">INPUT</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">AKTIVITAS</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">OUTPUT</span>
                          </div>
                          <div style="font-size: 12px; color: #64748B;">PT Elektronik Prima menerima, menginvestigasi, dan menyelesaikan keluhan dari pelanggan yang membeli produk cacat.</div>
                        </div>
                      `
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "input", label: "📥 Input", subLabel: "Apa yang masuk ke proses", color: COLORS.dark },
                      { id: "aktivitas", label: "⚙️ Aktivitas", subLabel: "Apa yang dilakukan dalam proses", color: COLORS.do },
                      { id: "output", label: "📤 Output", subLabel: "Apa yang keluar dari proses", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "😠", text: "Keluhan tertulis dari pelanggan beserta foto produk yang bermasalah", targetZone: "input" },
                      { id: "c2", icon: "📋", text: "Data historis keluhan serupa dari database QMS", targetZone: "input" },
                      { id: "c3", icon: "🔍", text: "Menginvestigasi penyebab akar masalah (root cause analysis)", targetZone: "aktivitas" },
                      { id: "c4", icon: "📞", text: "Menghubungi pelanggan untuk konfirmasi dan klarifikasi masalah", targetZone: "aktivitas" },
                      { id: "c5", icon: "📝", text: "Laporan penyelesaian keluhan yang sudah ditandatangani pelanggan", targetZone: "output" },
                      { id: "c6", icon: "🔧", text: "Tindakan perbaikan yang dilakukan untuk mencegah keluhan serupa", targetZone: "output" }
                    ],
                    feedbackCorrect: "Tepat! Data historis keluhan adalah input dari dalam sistem — proses bisa menggunakan informasi dari database internal sebagai inputnya. Tindakan perbaikan adalah output yang tidak diterima langsung oleh pelanggan yang mengadu, tapi merupakan output penting bagi sistem QMS untuk mencegah pengulangan. Output proses tidak harus selalu 'untuk pelanggan'.",
                    feedbackWrong: "Ada yang tertukar. Input bisa datang dari internal (database historis) maupun eksternal (keluhan pelanggan). Output mencakup semua hasil — baik yang diterima pelanggan (laporan penyelesaian) maupun yang digunakan secara internal (tindakan perbaikan)."
                  },
                  // SLIDE 4
                  {
                    type: "tap_classify",
                    xp: 40,
                    scenario: {
                      icon: "4",
                      label: "Proses: Kalibrasi Alat Ukur. Klasifikasikan setiap item.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: bold; color: #475569; margin-bottom: 12px; font-size: 13px;">
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">INPUT</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">AKTIVITAS</span>
                            <span style="color: #94A3B8; font-size: 18px;">➔</span>
                            <span style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px;">OUTPUT</span>
                          </div>
                          <div style="font-size: 12px; color: #64748B;">Laboratorium kalibrasi PT Instrumen Presisi melakukan kalibrasi timbangan digital yang digunakan di lini produksi.</div>
                        </div>
                      `
                    },
                    instruction: "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
                    zones: [
                      { id: "input", label: "📥 Input", subLabel: "Apa yang masuk ke proses", color: COLORS.dark },
                      { id: "aktivitas", label: "⚙️ Aktivitas", subLabel: "Apa yang dilakukan dalam proses", color: COLORS.do },
                      { id: "output", label: "📤 Output", subLabel: "Apa yang keluar dari proses", color: COLORS.plan }
                    ],
                    cards: [
                      { id: "c1", icon: "⚖️", text: "Timbangan digital yang belum dikalibrasi, dibawa dari lini produksi", targetZone: "input" },
                      { id: "c2", icon: "📏", text: "Standar berat referensi yang sudah tersertifikasi (anak timbangan OIML)", targetZone: "input" },
                      { id: "c3", icon: "🔧", text: "Menyetel dan mengatur timbangan hingga pembacaannya sesuai standar", targetZone: "aktivitas" },
                      { id: "c4", icon: "📊", text: "Mencatat semua hasil pengukuran sebelum dan sesudah penyetelan", targetZone: "aktivitas" },
                      { id: "c5", icon: "✅", text: "Timbangan yang sudah dikalibrasi dan siap digunakan kembali di produksi", targetZone: "output" },
                      { id: "c6", icon: "📜", text: "Sertifikat kalibrasi yang mencatat hasil, ketidakpastian pengukuran, dan tanggal berikutnya", targetZone: "output" }
                    ],
                    feedbackCorrect: "Sempurna! Standar berat referensi adalah input berupa alat bantu — ia digunakan dalam proses tapi tidak 'habis' diproses. Sertifikat kalibrasi adalah output berupa dokumen rekaman — output proses tidak selalu produk fisik, bisa juga dokumen, laporan, atau rekaman. Ini pola yang sama dengan proses-proses di klausul 7.1.5 ISO 9001 tentang alat ukur.",
                    feedbackWrong: "Ada yang tertukar. Input bisa berupa alat bantu/referensi (standar berat) yang digunakan tapi tidak habis dalam proses. Output bisa berupa dokumen (sertifikat kalibrasi) bukan hanya produk fisik."
                  },
                  // SLIDE 5
                  {
                    type: "accordion_materi",
                    scenario: {
                      icon: "📖",
                      labelColor: "#0D9488",
                      label: "Materi Inti",
                      text: "Lima Elemen Pembentuk Proses dalam ISO 9000"
                    },
                    panels: [
                      {
                        title: "Definisi resmi dan tiga elemen dasar",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>ISO 9000:2015 mendefinisikan proses sebagai: <em style="color: #F1F5F9;">"sekumpulan aktivitas yang saling terkait atau berinteraksi yang mengubah input menjadi output."</em></p>
                            <p>Tiga elemen wajib yang harus ada dalam setiap proses:</p>
                            
                            <div style="display: flex; flex-direction: column; gap: 12px; justify-content: center; background: #0F172A; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin: 16px 0;">
                              <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; width: 100%;">
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">INPUT</div>
                                <div style="color: #64748B; font-size: 14px;">➔</div>
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">AKTIVITAS</div>
                                <div style="color: #64748B; font-size: 14px;">➔</div>
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">OUTPUT</div>
                              </div>
                              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 4px; width: 100%; font-size: 10px; color: #94A3B8;">
                                <div style="flex: 1; text-align: center;">Contoh:<br/><span style="color: #cbd5e1;">Biji kopi<br/>Energi listrik</span></div>
                                <div style="width: 14px;"></div>
                                <div style="flex: 1; text-align: center;">Contoh:<br/><span style="color: #cbd5e1;">Giling, atur kehalusan</span></div>
                                <div style="width: 14px;"></div>
                                <div style="flex: 1; text-align: center;">Contoh:<br/><span style="color: #cbd5e1;">Kopi bubuk<br/>Debu kopi</span></div>
                              </div>
                            </div>
                            
                            <p>Jika salah satu dari tiga elemen ini tidak terdefinisi dengan jelas, aktivitas tersebut belum bisa disebut proses dalam pengertian ISO 9000.</p>
                            
                            <div style="background: rgba(59, 130, 246, 0.1) !important; border-left: 4px solid #3B82F6 !important; padding: 12px !important; margin-top: 12px !important; border-radius: 4px !important;">
                              <span style="color: #E2E8F0 !important;">📌 <strong style="color: #93C5FD !important;">Input dan output tidak harus fisik.</strong> Input bisa berupa informasi, data, dokumen, energi, atau instruksi. Output bisa berupa produk, jasa, keputusan, rekaman, atau laporan.</span>
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Dua elemen tambahan: sumber daya dan kendali",
                        color: "#0D9488",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Selain tiga elemen dasar, model proses ISO 9001 (yang digambarkan dalam Annex A standar) juga mencakup dua elemen penting:</p>
                            
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: center; background: #0F172A; padding: 16px; border-radius: 8px; border: 1px solid #334155; margin: 16px 0;">
                              <div style="text-align: center; font-size: 11px; color: #94A3B8; margin-bottom: 4px;">
                                <strong style="color: #E2E8F0;">KENDALI</strong><br/>(Persyaratan, standar, prosedur, regulasi)<br/>⬇
                              </div>
                              <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; width: 100%;">
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">INPUT</div>
                                <div style="color: #64748B; font-size: 14px;">➔</div>
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">AKTIVITAS</div>
                                <div style="color: #64748B; font-size: 14px;">➔</div>
                                <div style="flex: 1; text-align: center; background: #1E293B; border: 1px solid #475569; padding: 10px 4px; border-radius: 6px; color: #E2E8F0; font-weight: bold; font-size: 11px;">OUTPUT</div>
                              </div>
                              <div style="text-align: center; font-size: 11px; color: #94A3B8; margin-top: 4px;">
                                ⬆<br/><strong style="color: #E2E8F0;">SUMBER DAYA</strong><br/>(Orang, mesin, infrastruktur, lingkungan)
                              </div>
                            </div>
                            
                            <ul style="padding-left: 20px; list-style-type: disc;">
                              <li><strong style="color: #E2E8F0;">Kendali</strong> — persyaratan, standar, regulasi, atau prosedur yang menentukan bagaimana aktivitas harus dilakukan. Contoh: spesifikasi suhu oven (kendali untuk proses pemanggangan), standar ISO 9001.</li>
                              <li><strong style="color: #E2E8F0;">Sumber Daya</strong> — semua yang dibutuhkan untuk menjalankan proses. Berbeda dari input — sumber daya digunakan dalam proses tapi tidak menjadi bagian dari output.</li>
                            </ul>
                            
                            <div style="background: rgba(13, 148, 136, 0.1) !important; border-left: 4px solid #0D9488 !important; padding: 12px !important; margin-top: 12px !important; border-radius: 4px !important;">
                              <span style="color: #E2E8F0 !important;"><strong style="color: #5EEAD4 !important;">Perbedaan input vs sumber daya:</strong> tepung yang masuk ke adonan adalah input (menjadi bagian dari produk akhir). Oven yang memanggang adonan adalah sumber daya (digunakan tapi tidak menjadi bagian dari roti).</span>
                            </div>
                          </div>
                        `
                      },
                      {
                        title: "Output yang tidak diinginkan — tetap harus diidentifikasi",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6;">
                            <p>Setiap proses menghasilkan output yang diinginkan — dan hampir semua proses juga menghasilkan output yang tidak diinginkan. ISO 9001 mewajibkan organisasi mengidentifikasi dan mengendalikan keduanya.</p>
                            
                            <p><strong style="color: #E2E8F0;">Tiga contoh berpasangan:</strong></p>
                            
                            <div style="background: #1E293B; border-radius: 6px; padding: 12px; margin-bottom: 8px; border: 1px solid #334155; font-size: 13px;">
                              <strong style="color: #E2E8F0;">Proses Produksi Roti:</strong><br/>
                              <span style="color: #4ADE80;">✓ Output diinginkan: roti matang sesuai spesifikasi</span><br/>
                              <span style="color: #F87171;">✗ Output tidak diinginkan: roti gosong (reject), remahan, panas sisa oven</span>
                            </div>
                            
                            <div style="background: #1E293B; border-radius: 6px; padding: 12px; margin-bottom: 8px; border: 1px solid #334155; font-size: 13px;">
                              <strong style="color: #E2E8F0;">Proses Inspeksi Bahan Baku:</strong><br/>
                              <span style="color: #4ADE80;">✓ Output diinginkan: material diterima ke gudang</span><br/>
                              <span style="color: #F87171;">✗ Output tidak diinginkan: material ditolak yang harus dikembalikan</span>
                            </div>
                            
                            <div style="background: #1E293B; border-radius: 6px; padding: 12px; border: 1px solid #334155; font-size: 13px;">
                              <strong style="color: #E2E8F0;">Proses Kalibrasi:</strong><br/>
                              <span style="color: #4ADE80;">✓ Output diinginkan: alat ukur terkalibrasi + sertifikat</span><br/>
                              <span style="color: #F87171;">✗ Output tidak diinginkan: alat yang tidak bisa dikalibrasi (harus dinonaktifkan)</span>
                            </div>
                            
                            <div style="background: rgba(239, 68, 68, 0.1) !important; border-left: 4px solid #EF4444 !important; padding: 12px !important; margin-top: 12px !important; border-radius: 4px !important;">
                              <span style="color: #E2E8F0 !important;">ISO 9001 klausul 8.7 secara khusus mengatur <strong style="color: #FCA5A5 !important;">pengendalian output tidak sesuai</strong>. Langkah pertama pengendalian adalah mengidentifikasinya — yang berarti setiap proses harus didefinisikan termasuk output yang tidak diinginkannya.</span>
                            </div>
                          </div>
                        `
                      }
                    ],
                    nextLabel: "Paham, lanjut ke soal pemahaman →"
                  },
                  // SLIDE 5.5
                  {
                    type: "intro_quiz",
                    xp: 0
                  },
                  // SLIDE 6
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Energi listrik yang menggerakkan mesin produksi termasuk input dari proses produksi tersebut.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
                              <div style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #475569;">Bahan Baku</div>
                              <div style="background: #FEF08A; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #B45309; border: 2px dashed #F59E0B; display: flex; align-items: center; gap: 4px;">Energi <span style="font-size: 14px;">⚡</span></div>
                            </div>
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                              <div style="color: #64748B; font-size: 20px;">➔</div>
                            </div>
                            <div style="background: #1E3A8A; color: white; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 13px; text-align: center;">PROSES<br/>PRODUKSI</div>
                            <div style="color: #64748B; font-size: 20px;">➔</div>
                            <div style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #475569;">Produk Jadi</div>
                          </div>
                          
                          <div style="margin-top: 16px; text-align: center; color: #EF4444; font-weight: bold; background: #FEE2E2; padding: 6px 12px; border-radius: 8px;">
                            ❓ Apakah energi termasuk input?
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "⚡", label: "Benar", subLabel: "Energi termasuk input", correct: true, feedback: "Tepat! ISO 9000 mendefinisikan input proses secara luas — tidak terbatas pada bahan baku fisik. Energi listrik, air, udara bertekanan, dan bahan bakar semuanya bisa menjadi input proses karena dibutuhkan dan dikonsumsi agar proses bisa berjalan. Pemahaman ini penting untuk manajemen sumber daya dan analisis biaya proses." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Input hanya bahan baku fisik", correct: false, feedback: "Belum tepat. Input proses mencakup semua yang dibutuhkan dan dikonsumsi agar proses bisa menghasilkan outputnya — termasuk energi, tidak hanya bahan baku fisik. ISO 9000 tidak membatasi input hanya pada material." }
                    ]
                  },
                  // SLIDE 7
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Oven yang digunakan untuk memanggang roti adalah INPUT dari proses pemanggangan karena tanpa oven, proses tidak bisa berjalan.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; gap: 12px; margin-bottom: 16px; align-items: stretch;">
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center; position: relative;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🌾</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px;">Tepung/Adonan</div>
                            <div style="font-size: 10px; color: #64748B;">Masuk → berubah → menjadi roti</div>
                            <div style="position: absolute; top: -8px; right: -8px; background: #22C55E; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 12px;">INPUT ✓</div>
                          </div>
                          
                          <div style="flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center; position: relative;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🔥</div>
                            <div style="font-weight: bold; color: #1E293B; font-size: 13px;">Oven Mesin</div>
                            <div style="font-size: 10px; color: #64748B;">Digunakan tapi tidak berubah jadi roti</div>
                            <div style="position: absolute; top: -8px; right: -8px; background: #EF4444; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 12px;">INPUT?</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Oven adalah input proses", correct: false, feedback: "Belum tepat. Oven adalah sumber daya — ia digunakan untuk menjalankan proses tapi tidak menjadi bagian dari output. Input adalah yang masuk dan diubah: adonan masuk → roti keluar. Oven tidak 'masuk' dan tidak 'keluar' — ia tetap ada di dapur setelah proses selesai." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Oven adalah sumber daya", correct: true, feedback: "Tepat! Ini perbedaan penting: oven adalah sumber daya, bukan input. Input adalah sesuatu yang masuk ke proses dan berubah menjadi bagian dari output — seperti adonan yang menjadi roti. Oven digunakan dalam proses tapi tidak berubah menjadi bagian dari roti. Sumber daya digunakan oleh proses, input diubah oleh proses." }
                    ]
                  },
                  // SLIDE 8
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Sebuah aktivitas bisa disebut proses meski outputnya tidak terdefinisi dengan jelas, selama inputnya jelas.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                            <div>
                              <div style="font-weight: bold; color: #1E293B; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                                <span>✅</span> Proses Terdefinisi
                              </div>
                              <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Input jelas + Output jelas</div>
                              <div style="font-size: 10px; color: #475569; margin-top: 4px;"><i>Biji kopi → giling → kopi bubuk</i></div>
                            </div>
                            <div style="background: #DCFCE7; color: #166534; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 12px;">✓ Proses</div>
                          </div>
                          
                          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 10px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                            <div>
                              <div style="font-weight: bold; color: #1E293B; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                                <span>❓</span> Aktivitas Tidak Lengkap
                              </div>
                              <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Input jelas + Output tidak jelas</div>
                              <div style="font-size: 10px; color: #475569; margin-top: 4px;"><i>Biji kopi → giling → ???</i></div>
                            </div>
                            <div style="background: #FEE2E2; color: #991B1B; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 12px;">Proses?</div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "✅", label: "Benar", subLabel: "Input jelas sudah cukup", correct: false, feedback: "Belum tepat. Output yang jelas adalah syarat mutlak sebuah aktivitas disebut proses dalam ISO 9000. Tanpa output yang terdefinisi, tidak ada cara untuk mengukur efektivitas proses atau menentukan apakah proses menghasilkan mutu yang dipersyaratkan." },
                      { id: "salah", icon: "❌", label: "Salah", subLabel: "Output harus terdefinisi", correct: true, feedback: "Tepat! Definisi ISO 9000 sangat eksplisit: proses adalah aktivitas yang 'mengubah input menjadi output'. Jika outputnya tidak terdefinisi, kita tidak bisa mengetahui apakah proses berhasil atau tidak, tidak bisa mengukur kinerjanya, dan tidak bisa menentukan apakah hasilnya sesuai persyaratan. Output yang tidak terdefinisi adalah sinyal bahwa proses belum dirancang dengan baik." }
                    ]
                  },
                  // SLIDE 9
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#0D9488",
                      label: "Benar atau Salah?",
                      text: "Output yang tidak diinginkan dari sebuah proses — seperti produk reject atau limbah produksi — tidak perlu dicantumkan dalam definisi proses karena bukan tujuan proses tersebut.",
                      htmlContext: `
                        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
                            <div style="background: #E2E8F0; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #475569;">Bahan Baku</div>
                            <div style="color: #64748B; font-size: 20px;">➔</div>
                            <div style="background: #475569; color: white; padding: 10px 16px; border-radius: 8px; font-weight: bold; font-size: 14px; text-align: center;">PRODUKSI</div>
                            
                            <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                              <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="color: #64748B; font-size: 20px;">➔</div>
                                <div style="background: #DCFCE7; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #166534; border: 1px solid #86EFAC;">Produk Jadi ✓</div>
                              </div>
                              <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="color: #64748B; font-size: 20px;">➔</div>
                                <div style="background: #FEE2E2; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; color: #991B1B; border: 2px dashed #FCA5A5; position: relative;">
                                  Reject / Limbah ✗
                                  <div style="position: absolute; bottom: -24px; left: 50%; transform: translateX(-50%); width:max-content; color: #D97706; font-size: 10px; font-weight: bold; background: #FEF3C7; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">⬆ Perlu dicatat?</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div style="display: flex; gap: 8px; justify-content: space-between; font-size: 11px; font-weight: bold; margin-top: 32px;">
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1; color: #64748B;">
                              "Hanya catat yang diinginkan saja"
                            </div>
                            <div style="background: #FFFFFF; border: 1px solid #CBD5E1; padding: 8px; border-radius: 6px; text-align: center; flex: 1; color: #64748B;">
                              "Catat juga output yang tidak diinginkan"
                            </div>
                          </div>
                        </div>
                      `
                    },
                    options: [
                      { id: "benar", icon: "📋", label: "Benar", subLabel: "Hanya output yang diinginkan", correct: false, feedback: "Belum tepat. Jika output yang tidak diinginkan tidak dicantumkan dalam definisi proses, sistem QMS tidak akan memiliki mekanisme untuk mendeteksi dan mengendalikannya. ISO 9001 klausul 8.7 secara eksplisit mewajibkan pengendalian output tidak sesuai — yang berarti output tersebut harus teridentifikasi lebih dulu." },
                      { id: "salah", icon: "🔍", label: "Salah", subLabel: "Semua output harus diidentifikasi", correct: true, feedback: "Tepat! ISO 9001 klausul 8.7 mewajibkan pengendalian output yang tidak sesuai — dan pengendalian tidak mungkin dilakukan tanpa identifikasi terlebih dahulu. Reject dan limbah yang tidak diidentifikasi dalam definisi proses akan lolos tanpa pengendalian. Mendefinisikan proses secara lengkap termasuk output yang tidak diinginkan adalah fondasi dari sistem pengendalian mutu yang efektif." }
                    ]
                  },
                  // SLIDE 10
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-B-N02 Selesai!",
                      insight: "Anda sudah menguasai lima elemen proses dan bisa mengidentifikasinya dalam situasi nyata dari berbagai industri.",
                      maxScore: 240,
                      totalCount: 8,
                      takeaways: [
                        "Tiga elemen wajib: Input (yang masuk dan diubah) · Aktivitas (yang mengubah) · Output (yang keluar)",
                        "Dua elemen tambahan: Sumber Daya (digunakan tapi tidak menjadi output) · Kendali (persyaratan yang mengatur cara proses)",
                        "Input dan output tidak harus fisik — bisa berupa informasi, dokumen, energi, atau keputusan",
                        "Output yang tidak diinginkan (reject, waste) tetap harus diidentifikasi — dasar dari pengendalian mutu ISO 9001 klausul 8.7"
                      ],
                      next: "Selesai"
                    }
                  }
                ]
              },
              {
                id: "fungsi-vs-dept",
                title: "Fungsi vs departemen dalam bahasa ISO 9001",
                type: "interactive",
                status: "locked",
                slides: [
  {
    "type": "tap_classify",
    "xp": 20,
    "instruction": "Tap satu kartu untuk memilihnya, lalu tap zona tujuannya.",
    "zones": [
      {
        "id": "fungsi",
        "bgColor": "#EFF6FF",
        "borderColor": "#3B82F6",
        "labelColor": "#1E3A8A",
        "label": "⚙️ Bahasa Fungsi",
        "subLabel": "Cara ISO 9001 berbicara"
      },
      {
        "id": "departemen",
        "bgColor": "#FEF3C7",
        "borderColor": "#F59E0B",
        "labelColor": "#B45309",
        "label": "🏢 Bahasa Departemen",
        "subLabel": "Cara struktur organisasi berbicara"
      }
    ],
    "cards": [
      {
        "id": "c1",
        "icon": "📋",
        "text": "\"Fungsi yang bertanggung jawab atas pengendalian dokumen harus memastikan versi terbaru tersedia di seluruh titik penggunaan.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c2",
        "icon": "🏢",
        "text": "\"Departemen QC bertanggung jawab atas pengendalian dokumen.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c3",
        "icon": "⚙️",
        "text": "\"Sasaran mutu harus ditetapkan pada fungsi, tingkat, dan proses yang relevan dalam organisasi.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c4",
        "icon": "👥",
        "text": "\"Departemen HRD wajib mengikuti pelatihan ISO 9001 terlebih dahulu.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c5",
        "icon": "🔗",
        "text": "\"Orang yang melakukan pekerjaan di bawah kendali organisasi yang mempengaruhi kinerja QMS harus kompeten.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c6",
        "icon": "📊",
        "text": "\"Divisi Produksi harus membuat laporan bulanan kepada Manajer QC.\"",
        "targetZone": "departemen"
      }
    ],
    "scenario": {
      "icon": "1",
      "label": "Klasifikasi: Fungsi atau Departemen?",
      "text": "Klasifikasikan: apakah kalimat ini berbicara dalam bahasa FUNGSI atau bahasa DEPARTEMEN?",
      "htmlContext": "\n                        <div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;\">\n                          <div style=\"font-size: 13px; color: #475569;\">\n                            PT Sinar Abadi sedang mendokumentasikan persyaratan QMS mereka. Perhatikan berbagai kalimat yang muncul dalam proses tersebut.\n                          </div>\n                        </div>\n                      "
    },
    "feedbackCorrect": "Sempurna! Perhatikan pola bahasa fungsi: ia berbicara tentang apa yang perlu dilakukan dan oleh siapa yang relevan — tanpa menyebut nama departemen. Bahasa departemen mengikat tanggung jawab pada struktur organisasi yang bisa berubah sewaktu-waktu. ISO 9001 sengaja menggunakan bahasa fungsi agar QMS tetap berlaku meski struktur organisasi berubah.",
    "feedbackWrong": "Ada yang tertukar. Bahasa fungsi berbicara tentang peran, tanggung jawab, dan kompetensi — tanpa menyebut nama departemen. Bahasa departemen menyebutkan nama unit organisasi (HRD, QC, Produksi) secara eksplisit. ISO 9001 hampir selalu menggunakan bahasa fungsi."
  },
  {
    "type": "tap_classify",
    "xp": 20,
    "zones": [
      {
        "id": "fungsi",
        "bgColor": "#EFF6FF",
        "borderColor": "#3B82F6",
        "labelColor": "#1E3A8A",
        "label": "⚙️ Bahasa Fungsi",
        "subLabel": "Cara ISO 9001 berbicara"
      },
      {
        "id": "departemen",
        "bgColor": "#FEF3C7",
        "borderColor": "#F59E0B",
        "labelColor": "#B45309",
        "label": "🏢 Bahasa Departemen",
        "subLabel": "Cara struktur organisasi berbicara"
      }
    ],
    "cards": [
      {
        "id": "c1",
        "icon": "🎯",
        "text": "\"Top management harus memastikan bahwa tanggung jawab dan wewenang untuk peran yang relevan ditetapkan, dikomunikasikan, dan dipahami.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c2",
        "icon": "📌",
        "text": "\"Direktur Operasional bertanggung jawab atas semua keputusan terkait QMS.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c3",
        "icon": "🔄",
        "text": "\"Mereka yang melakukan audit internal tidak boleh mengaudit pekerjaan mereka sendiri.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c4",
        "icon": "🗂️",
        "text": "\"Departemen Administrasi menyimpan semua rekaman mutu di lemari arsip lantai 2.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c5",
        "icon": "✅",
        "text": "\"Orang yang relevan harus menyadari kebijakan mutu, sasaran mutu yang relevan, dan kontribusi mereka terhadap efektivitas QMS.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c6",
        "icon": "📞",
        "text": "\"Jika ada keluhan pelanggan, Departemen Customer Service yang pertama menangani.\"",
        "targetZone": "departemen"
      }
    ],
    "scenario": {
      "icon": "2",
      "label": "Klasifikasi: Fungsi atau Departemen?",
      "text": "Klasifikasikan: bahasa FUNGSI atau bahasa DEPARTEMEN?",
      "htmlContext": "\n                        <div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;\">\n                          <div style=\"font-size: 13px; color: #475569;\">\n                            Tim QMS PT Maju Jaya sedang menulis Manual Mutu baru. Berikut sejumlah kalimat yang diusulkan oleh berbagai anggota tim.\n                          </div>\n                        </div>\n                      "
    },
    "feedbackCorrect": "Tepat! Perhatikan kartu 3 — 'mereka yang melakukan audit internal' adalah bahasa fungsi yang sangat bersih: tidak ada nama departemen, tidak ada jabatan spesifik. Hanya fungsi yang dijelaskan. Ini memungkinkan siapapun yang menjalankan fungsi audit internal di organisasi untuk terikat dengan persyaratan tersebut — terlepas dari struktur departemennya.",
    "feedbackWrong": "Ada yang tertukar. Cari polanya: bahasa fungsi menggunakan kata-kata seperti 'mereka yang...', 'orang yang relevan', 'top management', 'fungsi yang...'. Bahasa departemen menyebut nama unit atau jabatan spesifik."
  },
  {
    "type": "tap_classify",
    "xp": 20,
    "zones": [
      {
        "id": "fungsi",
        "bgColor": "#EFF6FF",
        "borderColor": "#3B82F6",
        "labelColor": "#1E3A8A",
        "label": "⚙️ Bahasa Fungsi",
        "subLabel": "Cara ISO 9001 berbicara"
      },
      {
        "id": "departemen",
        "bgColor": "#FEF3C7",
        "borderColor": "#F59E0B",
        "labelColor": "#B45309",
        "label": "🏢 Bahasa Departemen",
        "subLabel": "Cara struktur organisasi berbicara"
      }
    ],
    "cards": [
      {
        "id": "c1",
        "icon": "🔍",
        "text": "\"Orang yang menemukan ketidaksesuaian harus segera memberi label 'DITAHAN' pada produk yang bersangkutan.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c2",
        "icon": "🏭",
        "text": "\"Supervisor Produksi Line A yang bertanggung jawab mengisi Formulir Laporan Ketidaksesuaian.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c3",
        "icon": "📊",
        "text": "\"Keputusan disposisi produk tidak sesuai harus dilakukan oleh orang yang berwenang.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c4",
        "icon": "🚛",
        "text": "\"Bagian Gudang yang mengirimkan produk ditolak ke area karantina.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c5",
        "icon": "🔄",
        "text": "\"Fungsi yang relevan harus diberitahu jika ketidaksesuaian ditemukan setelah pengiriman ke pelanggan.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c6",
        "icon": "📋",
        "text": "\"Manajer QC harus menandatangani semua laporan ketidaksesuaian sebelum diarsipkan.\"",
        "targetZone": "departemen"
      }
    ],
    "scenario": {
      "icon": "3",
      "label": "Klasifikasi: Fungsi atau Departemen?",
      "text": "Klasifikasikan: bahasa FUNGSI atau bahasa DEPARTEMEN?",
      "htmlContext": "\n                        <div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;\">\n                          <div style=\"font-size: 13px; color: #475569;\">\n                            Berikut sejumlah kalimat dari Prosedur Pengendalian Produk Tidak Sesuai milik PT Garmen Indah.\n                          </div>\n                        </div>\n                      "
    },
    "feedbackCorrect": "Sempurna! Perhatikan kartu 5 — 'fungsi yang relevan' adalah ungkapan yang sangat khas ISO 9001. Ia tidak menentukan siapa atau departemen mana yang harus diberitahu — itu tergantung konteks dan struktur organisasi masing-masing. Fleksibilitas ini membuat standar bisa diterapkan di perusahaan dengan berbagai bentuk struktur organisasi.",
    "feedbackWrong": "Ada yang tertukar. Ungkapan seperti 'fungsi yang relevan', 'orang yang berwenang', 'orang yang menemukan' adalah tanda bahasa fungsi. Menyebut nama jabatan atau unit spesifik (Supervisor Produksi, Bagian Gudang, Manajer QC) adalah tanda bahasa departemen."
  },
  {
    "type": "tap_classify",
    "xp": 20,
    "zones": [
      {
        "id": "fungsi",
        "bgColor": "#EFF6FF",
        "borderColor": "#3B82F6",
        "labelColor": "#1E3A8A",
        "label": "⚙️ Bahasa Fungsi",
        "subLabel": "Cara ISO 9001 berbicara"
      },
      {
        "id": "departemen",
        "bgColor": "#FEF3C7",
        "borderColor": "#F59E0B",
        "labelColor": "#B45309",
        "label": "🏢 Bahasa Departemen",
        "subLabel": "Cara struktur organisasi berbicara"
      }
    ],
    "cards": [
      {
        "id": "c1",
        "icon": "📋",
        "text": "\"Sasaran mutu proyek harus dikomunikasikan kepada semua orang yang terlibat dalam pekerjaan terkait.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c2",
        "icon": "🏗️",
        "text": "\"Divisi Engineering bertanggung jawab membuat sasaran mutu untuk setiap proyek.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c3",
        "icon": "🔗",
        "text": "\"Pihak yang bertanggung jawab atas tinjauan manajemen harus memastikan agenda mencakup semua poin klausul 9.3.2.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c4",
        "icon": "👥",
        "text": "\"Departemen HRD wajib memperbarui matriks kompetensi setiap 6 bulan sekali.\"",
        "targetZone": "departemen"
      },
      {
        "id": "c5",
        "icon": "📌",
        "text": "\"Kompetensi yang diperlukan untuk setiap pekerjaan yang mempengaruhi kinerja QMS harus ditentukan.\"",
        "targetZone": "fungsi"
      },
      {
        "id": "c6",
        "icon": "💼",
        "text": "\"General Manager yang menetapkan kebijakan mutu dan menandatanganinya.\"",
        "targetZone": "departemen"
      }
    ],
    "scenario": {
      "icon": "4",
      "label": "Klasifikasi: Fungsi atau Departemen?",
      "text": "Klasifikasikan: bahasa FUNGSI atau bahasa DEPARTEMEN?",
      "htmlContext": "\n                        <div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 16px; text-align: center;\">\n                          <div style=\"font-size: 13px; color: #475569;\">\n                            PT Konstruksi Prima baru saja melakukan restrukturisasi organisasi. Tim QMS sedang meninjau ulang dokumen QMS mereka.\n                          </div>\n                        </div>\n                      "
    },
    "feedbackCorrect": "Tepat! Perhatikan konteksnya: PT Konstruksi Prima baru restrukturisasi. Dokumen yang menggunakan bahasa departemen (kartu 2, 4, 6) sekarang harus direvisi karena nama departemennya mungkin berubah. Dokumen yang menggunakan bahasa fungsi (kartu 1, 3, 5) masih valid — tidak perlu disentuh. Inilah alasan praktis mengapa ISO 9001 menggunakan bahasa fungsi.",
    "feedbackWrong": "Ada yang tertukar. Dan perhatikan konteks soal ini: karena ada restrukturisasi, dokumen yang menyebut nama departemen spesifik harus direvisi ulang. Dokumen yang menggunakan bahasa fungsi bertahan dari perubahan struktur."
  },
  {
    "type": "accordion_materi",
    "xp": 0,
    "materi": {
      "title": "Mengapa ISO 9001 Berbicara tentang Fungsi, Bukan Departemen",
      "icon": "📖",
      "panels": [
        {
          "title": "Apa yang dimaksud 'fungsi' dalam ISO 9001",
          "color": "#F59E0B",
          "content": "<div style=\"color: #CBD5E1; line-height: 1.6;\"><p>ISO 9000 mendefinisikan fungsi sebagai: <strong>\"peran atau tanggung jawab yang dapat ditugaskan kepada seseorang atau kelompok.\"</strong> Berbeda dari departemen yang merupakan unit struktural dalam bagan organisasi, fungsi adalah tentang <em>apa yang dilakukan</em> — bukan siapa atau unit mana yang melakukannya.</p><p><strong>Contoh konkret perbedaannya:</strong></p><div style=\"display: flex; flex-direction: column; gap: 8px; margin: 16px 0;\"><div style=\"display: flex; gap: 12px; background: #0F172A; padding: 12px; border-radius: 8px; border: 1px solid #334155;\"><div style=\"flex: 1;\"><div style=\"font-weight: bold; color: #3B82F6; font-size: 11px; margin-bottom: 4px;\">FUNGSI (cara ISO 9001 berbicara)</div><ul style=\"margin: 0; padding-left: 16px; font-size: 13px; color: #E2E8F0;\"><li>\"Fungsi yang melakukan audit internal\"</li><li>\"Orang yang bertanggung jawab atas output proses\"</li><li>\"Mereka yang pekerjaannya mempengaruhi QMS\"</li><li>\"Fungsi yang relevan dalam organisasi\"</li></ul></div><div style=\"width: 1px; background: #334155;\"></div><div style=\"flex: 1;\"><div style=\"font-weight: bold; color: #F59E0B; font-size: 11px; margin-bottom: 4px;\">DEPARTEMEN (cara struktur org berbicara)</div><ul style=\"margin: 0; padding-left: 16px; font-size: 13px; color: #E2E8F0;\"><li>\"Departemen QC\"</li><li>\"Manajer Produksi\"</li><li>\"Tim HRD dan Administrasi\"</li><li>\"Divisi Engineering dan R&D\"</li></ul></div></div></div><div style=\"background: rgba(13, 148, 136, 0.1) !important; border-left: 4px solid #0D9488 !important; padding: 12px !important; border-radius: 4px !important;\"><span style=\"color: #E2E8F0 !important;\">📌 Satu fungsi bisa dijalankan oleh banyak departemen. Satu departemen bisa menjalankan banyak fungsi. Tidak ada hubungan satu-ke-satu antara fungsi dan departemen — inilah mengapa ISO 9001 tidak menyebut departemen.</span></div></div>"
        },
        {
          "title": "Tiga alasan ISO 9001 memilih bahasa fungsi",
          "color": "#0D9488",
          "content": "<div style=\"color: #CBD5E1; line-height: 1.6;\"><div style=\"background: #1E293B; border-radius: 6px; padding: 12px; margin-bottom: 12px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Alasan 1 — Berlaku universal lintas jenis organisasi:</strong><br/><span style=\"font-size: 13px;\">ISO 9001 digunakan oleh perusahaan kecil 5 orang hingga korporasi multinasional. Perusahaan kecil mungkin tidak punya \"Departemen QC\" — satu orang merangkap semua fungsi. Bahasa fungsi tetap berlaku untuk keduanya.</span></div><div style=\"background: #1E293B; border-radius: 6px; padding: 12px; margin-bottom: 12px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Alasan 2 — Tahan terhadap restrukturisasi:</strong><br/><span style=\"font-size: 13px;\">Departemen bisa digabung, dipisah, atau diubah namanya kapanpun. Jika QMS ditulis dalam bahasa departemen, setiap restrukturisasi berarti revisi besar-besaran seluruh dokumen. QMS yang ditulis dalam bahasa fungsi tetap valid meski struktur berubah.</span></div><div style=\"background: #1E293B; border-radius: 6px; padding: 12px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Alasan 3 — Mendorong process approach:</strong><br/><span style=\"font-size: 13px;\">Satu proses sering melintasi banyak departemen. Dengan berbicara dalam bahasa fungsi, ISO 9001 mendorong organisasi berpikir tentang alur proses — bukan batas departemen. Ini sejalan dengan klausul 4.4 tentang process approach.</span></div></div>"
        },
        {
          "title": "Implikasi praktis untuk dokumen QMS",
          "color": "#3B82F6",
          "content": "<div style=\"color: #CBD5E1; line-height: 1.6;\"><p>Saat menulis dokumen QMS — prosedur, instruksi kerja, manual mutu — ada pilihan yang perlu dibuat:</p><div style=\"display: flex; flex-direction: column; gap: 8px; font-size: 13px;\"><div style=\"background: #1E293B; padding: 10px; border-radius: 6px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Contoh 1 — Tanggung jawab audit:</strong><br/><span style=\"color: #F87171;\">❌ \"Manajer QC melakukan audit internal setiap kuartal.\"</span><br/><span style=\"color: #4ADE80;\">✓ \"Orang yang kompeten dan tidak mengaudit pekerjaannya sendiri melakukan audit internal setiap kuartal.\"</span></div><div style=\"background: #1E293B; padding: 10px; border-radius: 6px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Contoh 2 — Pengendalian dokumen:</strong><br/><span style=\"color: #F87171;\">❌ \"Departemen Administrasi menyimpan semua dokumen QMS.\"</span><br/><span style=\"color: #4ADE80;\">✓ \"Fungsi yang ditunjuk bertanggung jawab atas penyimpanan dan pengendalian informasi terdokumentasi.\"</span></div><div style=\"background: #1E293B; padding: 10px; border-radius: 6px; border: 1px solid #334155;\"><strong style=\"color: #E2E8F0;\">Contoh 3 — Sasaran mutu:</strong><br/><span style=\"color: #F87171;\">❌ \"Departemen Produksi, QC, dan Sales masing-masing menetapkan sasaran mutu.\"</span><br/><span style=\"color: #4ADE80;\">✓ \"Sasaran mutu ditetapkan pada fungsi, tingkat, dan proses yang relevan.\"</span></div></div><div style=\"background: rgba(59, 130, 246, 0.1) !important; border-left: 4px solid #3B82F6 !important; padding: 12px !important; margin-top: 12px !important; border-radius: 4px !important;\"><span style=\"color: #E2E8F0 !important;\">Menggunakan bahasa fungsi bukan berarti tidak boleh menyebut jabatan sama sekali. Dalam konteks tertentu — seperti matriks tanggung jawab internal — menyebut jabatan adalah wajar. Yang perlu dihindari adalah menjadikan nama departemen sebagai satu-satunya pemegang tanggung jawab dalam dokumen QMS formal.</span></div></div>"
        }
      ],
      "nextLabel": "Paham, lanjut ke soal pemahaman →"
    }
  },
  {
    "type": "yes_no",
    "xp": 20,
    "scenario": {
      "icon": "5",
      "labelColor": "#0D9488",
      "label": "Benar atau Salah?",
      "text": "PT Maju Bersama memiliki satu orang yang merangkap sebagai Manajer Produksi sekaligus Manajer QC. Kondisi ini melanggar persyaratan ISO 9001 karena satu orang tidak bisa menjalankan dua fungsi berbeda.",
      "htmlContext": "<div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center; position: relative;\"><div style=\"display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px; margin-top: 16px;\"><div style=\"background: #EFF6FF; border: 1px solid #3B82F6; color: #1E3A8A; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 13px;\">🏭 Fungsi Produksi</div><div style=\"font-size: 40px; color: #0D9488;\">👤</div><div style=\"background: #FEF3C7; border: 1px solid #F59E0B; color: #B45309; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 13px;\">🔍 Fungsi QC</div></div><div style=\"background: #1E293B; color: white; display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: bold;\">Satu orang, dua fungsi</div><div style=\"position: absolute; top: -10px; right: -10px; background: #EF4444; color: white; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; transform: rotate(5deg); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);\">❓ Melanggar ISO 9001?</div></div>"
    },
    "options": [
      {
        "id": "benar",
        "icon": "🚫",
        "label": "Benar",
        "subLabel": "Melanggar — satu orang satu fungsi",
        "correct": false,
        "feedback": "Belum tepat. ISO 9001 tidak melarang satu orang menjalankan dua fungsi. Justru dengan berbicara dalam bahasa fungsi, standar ini mengakui bahwa satu orang bisa bertanggung jawab atas banyak fungsi — terutama di organisasi kecil di mana sumber daya terbatas."
      },
      {
        "id": "salah",
        "icon": "✅",
        "label": "Salah",
        "subLabel": "ISO 9001 tidak melarang ini",
        "correct": true,
        "feedback": "Tepat! ISO 9001 tidak mensyaratkan satu fungsi = satu orang atau satu departemen. Satu orang bisa menjalankan banyak fungsi — ini sangat umum di organisasi kecil. Yang ISO 9001 persyaratkan adalah bahwa fungsi-fungsi tersebut dijalankan oleh orang yang kompeten, dan ada ketentuan khusus tentang independensi — misalnya auditor internal tidak boleh mengaudit pekerjaannya sendiri. Merangkap dua fungsi boleh selama tidak ada konflik persyaratan."
      }
    ]
  },
  {
    "type": "yes_no",
    "xp": 20,
    "scenario": {
      "icon": "6",
      "labelColor": "#0D9488",
      "label": "Benar atau Salah?",
      "text": "PT Berkembang Pesat baru melakukan merger dan restrukturisasi besar — beberapa departemen digabung dan beberapa dipisah. Manual Mutu mereka yang ditulis dalam bahasa fungsi tidak perlu direvisi akibat restrukturisasi ini.",
      "htmlContext": "<div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;\"><div style=\"display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;\"><div style=\"font-size: 12px; font-weight: bold; color: #64748B;\">Sebelum (struktur lama):</div><div style=\"display: flex; gap: 4px; font-size: 10px;\"><span style=\"background: #E2E8F0; padding: 4px 8px; border-radius: 4px;\">[QC]</span><span style=\"background: #E2E8F0; padding: 4px 8px; border-radius: 4px;\">[Produksi]</span><span style=\"background: #E2E8F0; padding: 4px 8px; border-radius: 4px;\">[Gudang]</span><span style=\"background: #E2E8F0; padding: 4px 8px; border-radius: 4px;\">[Sales]</span></div><div style=\"font-size: 12px; font-weight: bold; color: #64748B; margin-top: 8px;\">Sesudah merger (struktur baru):</div><div style=\"display: flex; gap: 4px; font-size: 10px;\"><span style=\"background: #DBEAFE; padding: 4px 8px; border-radius: 4px; border: 1px solid #93C5FD;\">[Ops & Quality]</span><span style=\"background: #FEF3C7; padding: 4px 8px; border-radius: 4px; border: 1px solid #FCD34D;\">[Commercial]</span></div></div><div style=\"display: flex; gap: 8px; justify-content: space-between;\"><div style=\"flex: 1; background: #FEF2F2; border: 1px solid #FECACA; padding: 10px; border-radius: 8px; font-size: 11px; text-align: center;\"><strong>Manual Mutu — Bahasa Departemen</strong><br/><br/><span style=\"color: #EF4444; font-weight: bold;\">⚠️ Perlu revisi besar</span></div><div style=\"flex: 1; background: #ECFCCB; border: 1px solid #BEF264; padding: 10px; border-radius: 8px; font-size: 11px; text-align: center;\"><strong>Manual Mutu — Bahasa Fungsi</strong><br/><br/><span style=\"color: #4D7C0F; font-weight: bold;\">❓ Perlu revisi?</span></div></div></div>"
    },
    "options": [
      {
        "id": "benar",
        "icon": "✅",
        "label": "Benar",
        "subLabel": "Bahasa fungsi tahan restrukturisasi",
        "correct": true,
        "feedback": "Tepat! Ini adalah salah satu keuntungan paling praktis dari bahasa fungsi: dokumen QMS yang ditulis dalam bahasa fungsi tidak perlu direvisi hanya karena nama atau struktur departemen berubah. Selama fungsinya masih ada dan dijalankan oleh orang yang kompeten — QMS tetap valid. Ini menghemat waktu dan biaya revisi dokumen yang signifikan."
      },
      {
        "id": "salah",
        "icon": "❌",
        "label": "Salah",
        "subLabel": "Tetap perlu direvisi",
        "correct": false,
        "feedback": "Belum tepat. Bahasa fungsi memang dirancang untuk tahan terhadap perubahan struktural. Jika Manual Mutu tidak menyebut nama departemen manapun — hanya fungsi dan tanggung jawab — maka restrukturisasi tidak mempengaruhi validitas dokumen tersebut. Yang perlu direvisi hanyalah pemetaan internal siapa yang sekarang menjalankan fungsi apa."
      }
    ]
  },
  {
    "type": "yes_no",
    "xp": 20,
    "scenario": {
      "icon": "7",
      "labelColor": "#0D9488",
      "label": "Benar atau Salah?",
      "text": "Ketika ISO 9001 klausul 6.2 menyebut 'sasaran mutu harus ditetapkan pada fungsi, tingkat, dan proses yang relevan' — artinya setiap departemen dalam organisasi wajib memiliki sasaran mutu sendiri.",
      "htmlContext": "<div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;\"><div style=\"display: flex; gap: 8px;\"><div style=\"flex: 1; background: #FEF2F2; border: 1px solid #FECACA; padding: 12px; border-radius: 8px; text-align: center;\"><div style=\"font-weight: bold; font-size: 11px; color: #991B1B; margin-bottom: 8px;\">Interpretasi A</div><div style=\"font-size: 10px; color: #7F1D1D; margin-bottom: 8px;\">\"Setiap departemen wajib punya sasaran mutu\"</div><div style=\"display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; justify-items: center;\"><div style=\"width: 30px; height: 30px; background: #FCA5A5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div><div style=\"width: 30px; height: 30px; background: #FCA5A5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div><div style=\"width: 30px; height: 30px; background: #FCA5A5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div><div style=\"width: 30px; height: 30px; background: #FCA5A5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div></div><div style=\"font-size: 10px; color: #EF4444; margin-top: 8px; font-weight: bold;\">\"Apakah ini yang dimaksud?\"</div></div><div style=\"flex: 1; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 12px; border-radius: 8px; text-align: center;\"><div style=\"font-weight: bold; font-size: 11px; color: #166534; margin-bottom: 8px;\">Interpretasi B</div><div style=\"font-size: 10px; color: #14532D; margin-bottom: 8px;\">\"Fungsi yang relevan saja yang perlu punya sasaran mutu\"</div><div style=\"display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; justify-items: center;\"><div style=\"width: 30px; height: 30px; background: #86EFAC; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div><div style=\"width: 30px; height: 30px; border: 1px dashed #A3E635; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #65A30D;\">-</div><div style=\"width: 30px; height: 30px; border: 1px dashed #A3E635; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #65A30D;\">-</div><div style=\"width: 30px; height: 30px; background: #86EFAC; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px;\">🎯</div></div><div style=\"font-size: 10px; color: #22C55E; margin-top: 8px; font-weight: bold;\">\"Atau ini?\"</div></div></div></div>"
    },
    "options": [
      {
        "id": "benar",
        "icon": "📊",
        "label": "Benar",
        "subLabel": "Semua departemen wajib",
        "correct": false,
        "feedback": "Belum tepat. ISO 9001 menggunakan kata 'relevan' — artinya hanya fungsi dan proses yang mempengaruhi kemampuan organisasi memenuhi persyaratan pelanggan yang perlu memiliki sasaran mutu. Memaksakan sasaran mutu ke semua departemen tanpa memandang relevansinya justru menciptakan beban administratif tanpa nilai tambah."
      },
      {
        "id": "salah",
        "icon": "🎯",
        "label": "Salah",
        "subLabel": "Hanya yang relevan",
        "correct": true,
        "feedback": "Tepat! Kata kunci di klausul 6.2 adalah 'yang relevan' — bukan 'semua'. ISO 9001 tidak mewajibkan setiap departemen memiliki sasaran mutu. Fungsi yang tidak berhubungan langsung dengan QMS tidak perlu dipaksakan memiliki sasaran mutu QMS. Ini juga konsisten dengan bahasa fungsi: yang perlu punya sasaran mutu adalah fungsi, tingkat, dan proses yang mempengaruhi kualitas output."
      }
    ]
  },
  {
    "type": "yes_no",
    "xp": 20,
    "scenario": {
      "icon": "8",
      "labelColor": "#0D9488",
      "label": "Benar atau Salah?",
      "text": "Prosedur QMS yang menyebut nama jabatan spesifik (seperti 'Manajer Produksi' atau 'Supervisor QC') otomatis tidak sesuai dengan semangat ISO 9001 dan harus ditulis ulang menggunakan bahasa fungsi.",
      "htmlContext": "<div style=\"background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;\"><div style=\"display: flex; gap: 8px;\"><div style=\"flex: 1; background: #FFFFFF; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px;\"><div style=\"font-weight: bold; font-size: 11px; margin-bottom: 8px; color: #475569; border-bottom: 1px dashed #CBD5E1; padding-bottom: 4px;\">Prosedur dengan Jabatan</div><div style=\"font-size: 11px; color: #1E293B;\">\"Manajer Produksi menyetujui perubahan proses. Supervisor QC melakukan verifikasi akhir.\"</div><div style=\"font-size: 10px; color: #EF4444; font-weight: bold; margin-top: 8px; text-align: center;\">Apakah ini otomatis salah?</div></div><div style=\"flex: 1; background: #FFFFFF; border: 1px solid #0D9488; padding: 12px; border-radius: 8px;\"><div style=\"font-weight: bold; font-size: 11px; margin-bottom: 8px; color: #0D9488; border-bottom: 1px dashed #99F6E4; padding-bottom: 4px;\">Prosedur dengan Fungsi</div><div style=\"font-size: 11px; color: #1E293B;\">\"Fungsi yang berwenang menyetujui perubahan proses. Fungsi QC melakukan verifikasi akhir.\"</div><div style=\"font-size: 10px; color: #059669; font-weight: bold; margin-top: 8px; text-align: center;\">Selalu lebih baik?</div></div></div></div>"
    },
    "options": [
      {
        "id": "benar",
        "icon": "🔄",
        "label": "Benar",
        "subLabel": "Harus ditulis ulang semua",
        "correct": false,
        "feedback": "Belum tepat. ISO 9001 tidak melarang penggunaan nama jabatan dalam dokumen QMS — terutama di level operasional di mana kejelasan siapa melakukan apa sangat penting. Yang perlu dijaga adalah agar dokumen level tinggi (kebijakan, prosedur utama) cukup fleksibel menggunakan bahasa fungsi sehingga tidak harus direvisi setiap ada perubahan struktur."
      },
      {
        "id": "salah",
        "icon": "🤝",
        "label": "Salah",
        "subLabel": "Konteks menentukan mana yang lebih tepat",
        "correct": true,
        "feedback": "Tepat! Menyebut jabatan spesifik dalam prosedur tidak otomatis salah — terkadang malah lebih jelas dan operasional. Yang perlu dihindari adalah ketergantungan penuh pada nama departemen sehingga setiap perubahan struktur mengharuskan revisi dokumen. Prinsipnya: dokumen QMS formal level tinggi (kebijakan, manual mutu) sebaiknya menggunakan bahasa fungsi. Dokumen operasional level bawah (instruksi kerja, formulir) bisa lebih spesifik ke jabatan jika membantu kejelasan."
      }
    ]
  },
  {
    "type": "score_screen",
    "xp": 0,
    "feedback": {
      "title": "Unit 3-B-N03 Selesai!",
      "insight": "Anda sudah memahami mengapa ISO 9001 berbicara tentang fungsi — dan bagaimana menerapkan prinsip ini dalam penulisan dokumen QMS.",
      "maxScore": 160,
      "totalCount": 8,
      "takeaways": [
        "Fungsi = peran atau tanggung jawab · Departemen = unit struktural — keduanya berbeda dan tidak selalu satu-ke-satu",
        "ISO 9001 menggunakan bahasa fungsi agar berlaku universal dan tahan terhadap restrukturisasi organisasi",
        "Satu orang bisa menjalankan banyak fungsi — ISO 9001 tidak mensyaratkan satu fungsi satu departemen",
        "Dokumen QMS level tinggi sebaiknya menggunakan bahasa fungsi; dokumen operasional bisa lebih spesifik ke jabatan"
      ],
      "next": "Selesai"
    }
  }
]
              }
            ],
          },
        ],
      },
    ]
  },

  // ───────────────────────────────────────────────────────────
  // KATEGORI 2: Farmasi & Pangan
  // ───────────────────────────────────────────────────────────
  {
    id:       "farmasi-pangan",
    title:    "Farmasi & Pangan",
    subtitle: "Regulasi, Mutu dan Sains Terapan",
    icon:     "🏭",
    color:    COLORS.teal,
    topics: [
      {
        id:          "shelf-life-expiry",
        title:       "Shelf Life vs Expiry Date",
        subtitle:    "Memahami Umur Simpan",
        icon:        "📦",
        color:       COLORS.teal,
        thumb:       THUMB_MAP.iso9001,
        description: "Pelajari perbedaan mendasar antara Shelf Life dan Expiry Date serta pentingnya di industri farmasi dan pangan.",
        
        // ── Lessons ──────────────────────────────────────────
        lessons: [
          {
            id:    "konsep-dasar",
            title: "Memahami Konsep Dasar",
            icon:  "🔬",
            color: COLORS.teal,

            subLessons: [
              {
                id:       "mendefinisikan-shelf-life",
                title:    "Mendefinisikan Shelf Life dan Expiry Date",
                icon:     "📅",
                duration: "15 menit",
                slides: [
                  // SLIDE 1: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan: menggambarkan SHELF LIFE atau EXPIRY DATE?",
                      text: "",
                                          },
                    zones: [
                      { id: "shelf_life", label: "📦 Shelf Life", subLabel: "Jangka waktu / durasi", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "📅 Expiry Date", subLabel: "Tanggal / titik waktu", bg: "#EFF6FF", border: "#1D4ED8" }
                    ],
                    cards: [
                      { id: "i1", text: "Produk ini bertahan selama 24 bulan sejak tanggal produksi", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i2", text: "Jangan gunakan setelah 31 Oktober 2026", icon: "📅", targetZone: "expiry_date" },
                      { id: "i3", text: "Masa simpan tablet paracetamol ini adalah 3 tahun", icon: "🕐", targetZone: "shelf_life" },
                      { id: "i4", text: "EXP: 12/2025 — tertera di bagian bawah kemasan", icon: "🗓️", targetZone: "expiry_date" },
                      { id: "i5", text: "Produk tetap aman dan efektif selama 18 bulan dalam kondisi penyimpanan yang tepat", icon: "📦", targetZone: "shelf_life" },
                      { id: "i6", text: "Setelah tanggal ini, produsen tidak menjamin keamanan produk", icon: "⚠️", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Sempurna! Shelf Life adalah durasi — berapa lama produk bisa bertahan. Expiry Date adalah titik waktu — kapan batas akhir penggunaan yang aman. Keduanya berkaitan erat: Expiry Date biasanya dihitung dari tanggal produksi ditambah Shelf Life-nya.",
                    feedbackWrong: "Ada yang tertukar. Shelf Life = durasi waktu (24 bulan, 3 tahun, 18 bulan). Expiry Date = tanggal spesifik di kalender (31 Oktober 2026, 12/2025). Shelf Life adalah panjangnya waktu, Expiry Date adalah ujungnya."
                  },

                  // SLIDE 2: TAP/CLASSIFY LABEL KEMASAN
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Perhatikan label kemasan di bawah. Klasifikasikan setiap informasi: menggambarkan SHELF LIFE atau EXPIRY DATE?",
                      text: "",
                      htmlContext: `<div style="background: white; border: 2px solid #000; padding: 16px; border-radius: 8px; margin-bottom: 12px; font-family: monospace;">
                        <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">🧴 KRIM PELEMBAB WAJAH</div>
                        <div style="font-size: 13px; color: #555; margin-bottom: 12px; border-bottom: 1px dashed #000; padding-bottom: 8px;">PT Cantik Alami — 50g</div>
                        <div style="font-size: 13px; line-height: 1.6;">
                          <div>MFD: 01 Januari 2024</div>
                          <div>EXP: 01 Januari 2026</div>
                          <div>Simpan di tempat sejuk & kering</div>
                          <div>Gunakan dalam 6 bulan setelah dibuka</div>
                        </div>
                      </div>
                      <div style="font-size: 12px; color: #475569; text-align: center;">Produk ini memiliki beberapa informasi tanggal. Klasifikasikan masing-masing.</div>`,
                    },
                    zones: [
                      { id: "shelf_life", label: "📦 Shelf Life", subLabel: "Jangka waktu / durasi", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "📅 Expiry Date", subLabel: "Tanggal / titik waktu", bg: "#EFF6FF", border: "#1D4ED8" }
                    ],
                    cards: [
                      { id: "i1", text: "MFD: 01 Januari 2024 — tanggal krim ini dibuat", icon: "🏭", targetZone: "expiry_date" },
                      { id: "i2", text: "EXP: 01 Januari 2026 — batas akhir penggunaan", icon: "📅", targetZone: "expiry_date" },
                      { id: "i3", text: "Produk ini bertahan 2 tahun sejak diproduksi (dihitung dari MFD ke EXP)", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i4", text: "Gunakan dalam 6 bulan setelah dibuka — masa simpan setelah kemasan terbuka", icon: "🔓", targetZone: "shelf_life" },
                      { id: "i5", text: "Masih bisa digunakan selama belum melewati 01 Januari 2026", icon: "❄️", targetZone: "expiry_date" },
                      { id: "i6", text: "Krim ini punya masa simpan 2 tahun dalam kemasan tersegel", icon: "📦", targetZone: "shelf_life" },
                    ],
                    feedbackCorrect: "Tepat! Perhatikan kartu 4 — 'gunakan dalam 6 bulan setelah dibuka' adalah Shelf Life khusus untuk produk yang sudah dibuka (dalam industri kosmetik disebut PAO — Period After Opening). Shelf Life produk tersegel (2 tahun) bisa berbeda dari Shelf Life setelah dibuka (6 bulan). Ini penting di industri kosmetik dan farmasi.",
                    feedbackWrong: "Ada yang tertukar. Tanggal spesifik di kalender = Expiry Date. Durasi berapa lama = Shelf Life. Perhatikan juga: produk yang sudah dibuka bisa punya Shelf Life yang lebih pendek dari produk tersegel."
                  },

                  // SLIDE 3: TAP/CLASSIFY INDUSTRI
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap informasi dari konteks industri farmasi dan pangan ini.",
                      text: "",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;"><div style="font-size: 13px; color: #475569;">Berikut berbagai informasi yang biasa ditemukan di pabrik farmasi dan pabrik makanan.</div></div>`,
                    },
                    zones: [
                      { id: "shelf_life", label: "📦 Shelf Life", subLabel: "Jangka waktu / durasi", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "📅 Expiry Date", subLabel: "Tanggal / titik waktu", bg: "#EFF6FF", border: "#1D4ED8" }
                    ],
                    cards: [
                      { id: "i1", text: "Tim R&D menguji sampel tablet selama 36 bulan untuk membuktikan stabilitasnya", icon: "💊", targetZone: "shelf_life" },
                      { id: "i2", text: "Hasil uji stabilitas menunjukkan tablet masih memenuhi spesifikasi hingga 31 Maret 2027", icon: "🧪", targetZone: "expiry_date" },
                      { id: "i3", text: "Susu UHT ini bertahan 9 bulan dalam kemasan tertutup tanpa pendingin", icon: "🥛", targetZone: "shelf_life" },
                      { id: "i4", text: "BAIK DIGUNAKAN SEBELUM: 15 Agustus 2025", icon: "🗓️", targetZone: "expiry_date" },
                      { id: "i5", text: "Vaksin ini hanya efektif selama 18 bulan sejak tanggal produksi", icon: "🔬", targetZone: "shelf_life" },
                      { id: "i6", text: "Setelah tanggal yang tertera, kandungan aktif obat ini bisa berkurang di bawah 90% dari kadar yang dijanjikan", icon: "⚗️", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Tepat! Perhatikan kartu 1 — di industri farmasi, Shelf Life tidak ditentukan sembarangan. Tim R&D harus membuktikannya melalui uji stabilitas selama berbulan-bulan. Kartu 6 menjelaskan mengapa Expiry Date penting untuk obat: bukan hanya soal 'rusak atau tidak', tapi kandungan aktifnya bisa menurun sehingga obat tidak lagi bekerja sesuai dosis yang dijanjikan.",
                    feedbackWrong: "Ada yang tertukar. Ingat: Shelf Life = berapa lama (36 bulan, 9 bulan, 18 bulan). Expiry Date = kapan batasnya (31 Maret 2027, 15 Agustus 2025). Di farmasi, keduanya sangat kritis karena berkaitan langsung dengan efektivitas dan keamanan obat."
                  },

                  // SLIDE 4: TAP/CLASSIFY SITUASI
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap situasi ini: berkaitan dengan SHELF LIFE atau EXPIRY DATE?",
                      text: "",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;"><div style="font-size: 13px; color: #475569;">Bu Ani bekerja di bagian QC sebuah pabrik biskuit. Berikut berbagai situasi yang ia hadapi setiap hari.</div></div>`,
                    },
                    zones: [
                      { id: "shelf_life", label: "📦 Shelf Life", subLabel: "Jangka waktu / durasi", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "📅 Expiry Date", subLabel: "Tanggal / titik waktu", bg: "#EFF6FF", border: "#1D4ED8" }
                    ],
                    cards: [
                      { id: "i1", text: 'Bu Ani mengisi dokumen: "Produk ini harus digunakan sebelum 30 Juni 2025"', icon: "📋", targetZone: "expiry_date" },
                      { id: "i2", text: "Bu Ani memeriksa apakah kemasan biskuit yang baru jadi masih akan baik selama 12 bulan ke depan", icon: "🔍", targetZone: "shelf_life" },
                      { id: "i3", text: "Bu Ani menemukan biskuit di gudang yang sudah melewati tanggal yang tertera di kemasannya", icon: "❌", targetZone: "expiry_date" },
                      { id: "i4", text: 'Bu Ani menulis laporan: "Pada suhu 30°C dan kelembapan 75%, biskuit bertahan baik selama 10 bulan"', icon: "🌡️", targetZone: "shelf_life" },
                      { id: "i5", text: 'Bu Ani menyortir produk: "Ini boleh dikirim — batas waktunya masih 3 bulan lagi"', icon: "📦", targetZone: "expiry_date" },
                      { id: "i6", text: "Bu Ani merancang uji simpan selama 1 tahun untuk membuktikan daya tahan produk baru", icon: "🧪", targetZone: "shelf_life" },
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan kartu 4 — uji Shelf Life selalu mencantumkan kondisi penyimpanan (suhu, kelembapan). Ini penting: Shelf Life hanya berlaku dalam kondisi penyimpanan yang ditetapkan. Produk yang disimpan di kondisi yang berbeda bisa punya Shelf Life yang lebih pendek — ini mengapa label produk selalu menyertakan instruksi penyimpanan.",
                    feedbackWrong: "Ada yang tertukar. Situasi yang bicara tentang tanggal spesifik atau 'sudah lewat' = Expiry Date. Situasi yang bicara tentang berapa lama bertahan atau membuktikan daya tahan = Shelf Life."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#166534",
                      label: "Materi Inti",
                      text: "Shelf Life dan Expiry Date — Definisi, Hubungan, dan Mengapa Penting"
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF3C7", color: "#D97706" },
                        title: "Apa itu Shelf Life?",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p><strong>Shelf Life (masa simpan)</strong> adalah jangka waktu selama produk diperkirakan tetap aman, efektif, dan dalam kondisi yang dapat diterima — jika disimpan sesuai kondisi yang ditetapkan.</p>
                            <p><em>Kata kunci: jangka waktu (durasi, bukan tanggal), kondisi yang ditetapkan (suhu, cahaya, kelembapan).</em></p>
                            <br>
                            <p><strong>Tiga contoh konkret:</strong></p>
                            <ul style="padding-left: 20px; list-style-type: disc;">
                              <li>🍪 Biskuit: "Shelf life 12 bulan pada suhu ≤30°C, kelembapan ≤75%"</li>
                              <li>💊 Tablet paracetamol: "Shelf life 36 bulan pada suhu kamar, terlindung dari cahaya"</li>
                              <li>🧴 Krim wajah: "Shelf life 24 bulan tersegel, 6 bulan setelah dibuka"</li>
                            </ul>
                            <div style="background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; margin-top: 16px; border-radius: 4px; color: #1E293B; font-weight: 500;">
                              📌 Shelf Life di industri farmasi tidak ditentukan sembarangan. Tim R&D harus membuktikannya melalui uji stabilitas yang bisa memakan waktu bertahun-tahun — dengan menyimpan sampel dalam berbagai kondisi dan mengecek apakah kandungan aktifnya masih memenuhi spesifikasi.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Apa itu Expiry Date?",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p><strong>Expiry Date (tanggal kedaluwarsa)</strong> adalah tanggal spesifik batas akhir yang ditetapkan oleh produsen, di mana produk masih dijamin aman dan efektif jika disimpan sesuai ketentuan.</p>
                            <p><em>Kata kunci: tanggal spesifik (bukan durasi), masih dijamin (produsen tidak lagi bertanggung jawab setelah tanggal ini).</em></p>
                            <br>
                            <p><strong>Cara menghitung Expiry Date:</strong></p>
                            <div style="background: #1E293B; padding: 16px; border-radius: 8px; color: #E2E8F0; font-family: monospace; font-size: 13px; margin: 12px 0;">
                              Tanggal Produksi  +  Shelf Life  =  Expiry Date<br>
                              01 Januari 2024   +  24 bulan    =  01 Januari 2026
                            </div>
                            <p>Ini mengapa Expiry Date selalu bisa dihitung dari tanggal produksi (MFD) dan Shelf Life — ketiganya saling terkait.</p>
                            <br>
                            <p><strong>Berbagai cara penulisan Expiry Date di kemasan:</strong></p>
                            <ul style="padding-left: 20px; list-style-type: disc;">
                              <li><strong>EXP 12/2025</strong> → kadaluarsa Desember 2025</li>
                              <li><strong>EXP DATE: 31-12-2025</strong> → kadaluarsa 31 Desember 2025</li>
                              <li><strong>BAIK DIGUNAKAN SEBELUM 31 DESEMBER 2025</strong></li>
                              <li><strong>USE BEFORE DEC 2025</strong></li>
                              <li><strong>BBD: DEC 2025</strong> → Best Before Date</li>
                            </ul>
                            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; margin-top: 16px; border-radius: 4px; color: #7F1D1D; font-weight: 500;">
                              ⚠️ Jika tertulis "EXP 12/2025" — artinya produk masih bisa digunakan sampai akhir bulan Desember 2025, bukan hanya sampai tanggal 1 Desember 2025. Ini sering disalahpahami.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#DCFCE7", color: "#166534" },
                        title: "Mengapa keduanya penting di farmasi dan pangan?",
                        color: "#22C55E",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Di industri pangan dan farmasi, Shelf Life dan Expiry Date bukan sekadar formalitas — keduanya adalah jaminan keamanan dan efektivitas yang punya konsekuensi hukum.</p>
                            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
                              <div style="display: flex; gap: 12px;">
                                <div style="font-size: 18px;">🛡️</div>
                                <div><strong>Keamanan konsumen:</strong> Produk kedaluwarsa bisa mengandung bakteri berbahaya, toksin, atau zat hasil degradasi yang membahayakan. Di farmasi, obat yang sudah lewat Expiry Date bisa kehilangan efektivitasnya atau bahkan berubah menjadi zat berbahaya.</div>
                              </div>
                              <div style="display: flex; gap: 12px;">
                                <div style="font-size: 18px;">💊</div>
                                <div><strong>Efektivitas obat:</strong> Kandungan aktif obat (misalnya antibiotik atau vaksin) menurun seiring waktu. Obat kedaluwarsa mungkin tidak lagi mampu mengobati penyakit dengan dosis yang tertera — ini berbahaya terutama untuk kondisi serius.</div>
                              </div>
                              <div style="display: flex; gap: 12px;">
                                <div style="font-size: 18px;">⚖️</div>
                                <div><strong>Kewajiban hukum:</strong> Di Indonesia, BPOM mewajibkan pencantuman tanggal kedaluwarsa pada semua produk pangan olahan dan obat-obatan. Melanggar ketentuan ini bisa berujung pada sanksi pencabutan izin edar.</div>
                              </div>
                              <div style="display: flex; gap: 12px;">
                                <div style="font-size: 18px;">🏭</div>
                                <div><strong>Manajemen rantai pasok:</strong> Shelf Life menentukan bagaimana produk harus ditangani dalam distribusi — berapa lama bisa disimpan di gudang, berapa lama di rak toko, dan berapa lama tersisa untuk konsumen saat dibeli.</div>
                              </div>
                            </div>

                          </div>
                        `
                      }
                    ]
                  },

                  // SLIDE 6: TRUE/FALSE 1
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Pak Budi menemukan obat batuk di kotak P3K rumahnya. Tertera 'EXP 08/2024'. Sekarang bulan Maret 2025. Pak Budi berpikir: 'Obatnya masih ada isinya, baunya normal, warnanya tidak berubah — berarti masih aman diminum.' Apakah pemikiran Pak Budi benar?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 20px;">
                        <div style="padding: 12px; background: white; border: 2px solid #94A3B8; border-radius: 8px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 4px;">💊</div>
                          <div style="font-weight: bold; font-size: 14px; color: #EF4444;">EXP 08/2024</div>
                        </div>
                        <div style="font-size: 24px;">➡️</div>
                        <div style="text-align: center;">
                          <div style="font-size: 24px;">📅</div>
                          <div style="font-size: 12px; font-weight: bold; color: #475569;">Maret 2025</div>
                        </div>
                      </div>
                      <div style="text-align: center; border: 1px dashed #CBD5E1; padding: 12px; border-radius: 8px; background: #F1F5F9; font-style: italic; color: #64748B; font-size: 13px;">
                        💭 "Terlihat normal = masih aman?"
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Terlihat normal = masih aman",
                        correct: false,
                        feedback: "Belum tepat. Produk farmasi yang sudah melewati Expiry Date tidak bisa dinilai keamanannya hanya dari penampilan luar. Kandungan aktif obat bisa sudah terdegradasi meski warna dan bau masih normal. Expiry Date justru ada untuk melindungi konsumen dari kondisi yang tidak terdeteksi secara visual."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Tampilan tidak menjamin keamanan",
                        correct: true,
                        feedback: "Tepat! Obat yang sudah melewati Expiry Date tidak selalu terlihat berbeda — tapi kandungan aktifnya bisa sudah menurun secara signifikan atau berubah menjadi zat lain. Penampilan normal tidak menjamin keamanan atau efektivitas. Obat batuk yang sudah 7 bulan lewat Expiry Date sebaiknya tidak dikonsumsi dan harus dibuang dengan benar."
                      }
                    ]
                  },

                  // SLIDE 7: TRUE/FALSE 2
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Sebuah biskuit berlabel 'EXP 31/12/2025'. Pada 1 Januari 2026, biskuit ini sudah melewati Expiry Date dan tidak boleh dijual lagi — meskipun kondisinya masih baik secara visual dan tidak berbau.",
                      htmlContext: `<div style="display: flex; gap: 8px; margin-bottom: 16px;">
                        <div style="flex: 1; background: white; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 4px;">🍪</div>
                          <div style="font-weight: 900; font-size: 14px; color: #1E293B;">EXP 31/12/2025</div>
                          <div style="font-size: 10px; color: #16A34A; margin-top: 8px; font-weight: bold;">✓ Terlihat baik, tidak berbau</div>
                        </div>
                        <div style="flex: 1; background: #FEF2F2; border: 1px solid #FECACA; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 4px;">📅</div>
                          <div style="font-weight: 900; font-size: 14px; color: #991B1B;">1 Januari 2026</div>
                          <div style="font-size: 10px; color: #EF4444; margin-top: 8px; font-weight: bold;">Masih boleh dijual?</div>
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "🚫",
                        label: "Benar",
                        subLabel: "1 Jan sudah melewati batas",
                        correct: true,
                        feedback: "Tepat! Expiry Date adalah batas yang tegas — bukan panduan. Setelah 31 Desember 2025, produk ini secara resmi sudah melewati batas jaminan produsen. Di Indonesia, menjual produk pangan yang sudah melewati tanggal kedaluwarsa melanggar Peraturan BPOM dan bisa dikenai sanksi. Kondisi visual tidak bisa dijadikan alasan untuk tetap menjual produk kedaluwarsa."
                      },
                      {
                        id: "salah",
                        icon: "🤔",
                        label: "Salah",
                        subLabel: "Kalau masih baik boleh dijual",
                        correct: false,
                        feedback: "Belum tepat. Expiry Date 31/12/2025 berarti produk masih dijamin sampai akhir hari itu. Mulai 1 Januari 2026, jaminan produsen sudah tidak berlaku. Tidak ada 'kelonggaran' — Expiry Date adalah batas yang tegas secara hukum dan regulasi."
                      }
                    ]
                  },

                  // SLIDE 8: TRUE/FALSE 3
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Produk yang sama bisa memiliki Shelf Life yang berbeda tergantung kondisi penyimpanannya — misalnya susu UHT yang disimpan di suhu kamar punya Shelf Life lebih panjang dibanding susu UHT yang sudah masuk kulkas dan dibuka.",
                      htmlContext: `<div style="display: flex; gap: 8px; margin-bottom: 16px;">
                        <div style="flex: 1; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 4px;">📦</div>
                          <div style="font-weight: bold; font-size: 12px; color: #166534;">Susu UHT tersegel</div>
                          <div style="font-size: 10px; color: #14532D; margin: 6px 0;">Suhu kamar, belum dibuka</div>
                          <div style="font-size: 13px; font-weight: 900; color: #15803D; background: white; border-radius: 4px; padding: 4px;">Shelf Life: 9 bln</div>
                        </div>
                        <div style="flex: 1; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 12px; border-radius: 8px; text-align: center;">
                          <div style="font-size: 24px; margin-bottom: 4px;">🥛</div>
                          <div style="font-weight: bold; font-size: 12px; color: #1D4ED8;">Susu UHT sudah dibuka</div>
                          <div style="font-size: 10px; color: #1E40AF; margin: 6px 0;">Dalam kulkas, sudah dibuka</div>
                          <div style="font-size: 13px; font-weight: 900; color: #2563EB; background: white; border-radius: 4px; padding: 4px;">Shelf Life: 3-5 hr</div>
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Kondisi mempengaruhi Shelf Life",
                        correct: true,
                        feedback: "Tepat! Shelf Life sangat dipengaruhi oleh kondisi penyimpanan. Susu UHT tersegel bisa bertahan 9 bulan di suhu kamar — tapi begitu dibuka, udara dan bakteri masuk, dan masa simpannya turun drastis menjadi 3–5 hari meski disimpan di kulkas. Inilah mengapa instruksi penyimpanan di label produk sama pentingnya dengan Expiry Date."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Shelf Life selalu sama",
                        correct: false,
                        feedback: "Belum tepat. Shelf Life tidak bersifat tetap — ia sangat bergantung pada kondisi penyimpanan. Produk yang sama bisa bertahan jauh lebih lama atau lebih singkat tergantung suhu, cahaya, kelembapan, dan apakah kemasannya sudah dibuka atau belum."
                      }
                    ]
                  },

                  // SLIDE 9: TRUE/FALSE 4
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Seorang staf gudang menemukan obat sirup dengan tanggal produksi 1 Januari 2023 dan Shelf Life 2 tahun. Ia menyimpulkan bahwa Expiry Date obat tersebut adalah 1 Januari 2025. Apakah kesimpulannya benar?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                        <div style="font-size: 11px; font-weight: bold; color: #64748B; margin-bottom: 12px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">📝 Perhitungan staf gudang:</div>
                        <div style="font-family: monospace; font-size: 13px; color: #1E293B; line-height: 1.8;">
                          <div style="display: flex; justify-content: space-between;"><span>Tanggal Produksi (MFD):</span><span>1 Jan 2023</span></div>
                          <div style="display: flex; justify-content: space-between;"><span>Shelf Life:</span><span>2 tahun +</span></div>
                          <div style="width: 100%; height: 1px; border-top: 1px dashed #94A3B8; margin: 4px 0;"></div>
                          <div style="display: flex; justify-content: space-between; font-weight: bold; color: #0F172A;"><span>Expiry Date:</span><span>1 Jan 2025 <span style="color: #059669;">✓?</span></span></div>
                        </div>
                        <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #64748B; font-style: italic;">
                          👷‍♂️ "Apakah hitungan saya benar?"
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Hitungannya sudah tepat",
                        correct: true,
                        feedback: "Tepat! Hitungan staf gudang benar: MFD + Shelf Life = Expiry Date. 1 Januari 2023 + 2 tahun = 1 Januari 2025. Ini adalah cara standar menghitung Expiry Date. Dalam praktik QC di pabrik, kemampuan menghitung dan memverifikasi Expiry Date dari MFD dan Shelf Life adalah keterampilan dasar yang wajib dikuasai semua staf yang menangani produk."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Hitungannya keliru",
                        correct: false,
                        feedback: "Belum tepat. Hitungan staf gudang justru sudah benar. Rumusnya sederhana: Tanggal Produksi + Shelf Life = Expiry Date. 1 Januari 2023 + 2 tahun = 1 Januari 2025. Ini adalah cara standar menghitung Expiry Date yang digunakan di seluruh industri farmasi dan pangan."
                      }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 1-N01 Selesai!",
                      insight: "Anda sudah bisa membedakan Shelf Life dan Expiry Date — dan memahami mengapa keduanya penting di industri farmasi dan pangan.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Shelf Life = durasi waktu produk bertahan dalam kondisi penyimpanan yang ditetapkan",
                        "Expiry Date = tanggal spesifik batas akhir jaminan produsen, dihitung dari MFD + Shelf Life",
                        "Penampilan normal tidak menjamin produk aman — Expiry Date harus selalu diperiksa",
                        "Shelf Life bisa berbeda tergantung kondisi penyimpanan dan apakah kemasan sudah dibuka"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "membedakan-ketiganya",
                title:    "Membedakan Shelf Life vs Expiry Date vs Best Before",
                icon:     "⚖️",
                duration: "20 menit",
                slides: [
                  // SLIDE 1: TAP/CLASSIFY - 3 ZONES
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan: menggambarkan SHELF LIFE, EXPIRY DATE, atau BEST BEFORE?",
                      text: "",
                                          },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life", label: "⏳ Shelf Life", subLabel: "Durasi ketahanan produk", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "🚫 Expiry Date", subLabel: "Batas mutlak — tidak boleh dilewati", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "best_before", label: "⭐ Best Before", subLabel: "Batas kualitas terbaik", bg: "#FFFBEB", border: "#D97706" }
                    ],
                    cards: [
                      { id: "i1", text: "Produk ini bertahan selama 24 bulan dalam kondisi penyimpanan yang tepat", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i2", text: "EXP 06/2026 — setelah tanggal ini, produsen tidak menjamin keamanan dan efektivitas obat", icon: "🚫", targetZone: "expiry_date" },
                      { id: "i3", text: "BBD: 31 Des 2025 — produk masih bisa dikonsumsi setelah tanggal ini tapi kualitasnya mungkin menurun", icon: "⭐", targetZone: "best_before" },
                      { id: "i4", text: "Masa simpan minyak goreng ini adalah 18 bulan sejak tanggal produksi", icon: "📦", targetZone: "shelf_life" },
                      { id: "i5", text: "Gunakan sebelum tanggal ini untuk hasil terbaik — setelah itu masih aman tapi rasa bisa berubah", icon: "⭐", targetZone: "best_before" },
                      { id: "i6", text: "Antibiotik ini tidak boleh digunakan setelah tanggal yang tertera — kandungan aktifnya bisa berubah menjadi berbahaya", icon: "🚫", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan perbedaan kritis kartu 5 dan 6: Best Before adalah soal kualitas ('masih aman tapi rasa bisa berubah'), Expiry Date adalah soal keamanan ('tidak boleh digunakan'). Ini perbedaan yang paling penting — produk yang sudah lewat Best Before mungkin masih bisa dikonsumsi, tapi produk yang sudah lewat Expiry Date tidak boleh digunakan sama sekali.",
                    feedbackWrong: "Ada yang tertukar. Tiga zona berbeda: Shelf Life = durasi ketahanan. Expiry Date = batas mutlak keamanan (terutama obat dan produk berisiko tinggi). Best Before = batas kualitas optimal — setelah itu masih aman tapi kualitas mungkin turun."
                  },

                  // SLIDE 2: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Perhatikan label-label produk ini. Klasifikasikan informasi dari masing-masing label.",
                      text: "",
                      htmlContext: `<div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 12px; font-family: monospace; font-size: 11px;">
                        <div style="border: 2px solid #000; padding: 8px; border-radius: 4px; text-align: center; flex: 1; background: white;">
                          <div style="font-weight: bold; margin-bottom: 4px; font-size: 12px;">💊 TABLET</div>
                          <div style="margin-bottom: 8px; font-size: 10px;">VITAMIN C</div>
                          <div style="border-top: 1px dashed #000; padding-top: 4px;">EXP: 08/26</div>
                          <div style="font-size: 9px;">Simpan &lt;30°C</div>
                        </div>
                        <div style="border: 2px solid #000; padding: 8px; border-radius: 4px; text-align: center; flex: 1; background: white;">
                          <div style="font-weight: bold; margin-bottom: 4px; font-size: 12px;">🍫 COKELAT</div>
                          <div style="margin-bottom: 8px; font-size: 10px;">BATANGAN</div>
                          <div style="border-top: 1px dashed #000; padding-top: 4px;">BBD: Mar 26</div>
                          <div style="font-size: 9px;">Simpan &lt;25°C</div>
                        </div>
                        <div style="border: 2px solid #000; padding: 8px; border-radius: 4px; text-align: center; flex: 1; background: white;">
                          <div style="font-weight: bold; margin-bottom: 4px; font-size: 12px;">🥚 TELUR</div>
                          <div style="margin-bottom: 8px; font-size: 10px;">SEGAR</div>
                          <div style="border-top: 1px dashed #000; padding-top: 4px; font-size: 10px;">BEST BEFORE</div>
                          <div style="font-weight: bold;">28 Feb 2025</div>
                        </div>
                      </div>
                      <div style="font-size: 12px; color: #475569; text-align: center;">Tiga produk, tiga jenis label. Klasifikasikan setiap karakteristik berikut.</div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life", label: "⏳ Shelf Life", subLabel: "Durasi ketahanan produk", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "🚫 Expiry Date", subLabel: "Batas mutlak — tidak boleh dilewati", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "best_before", label: "⭐ Best Before", subLabel: "Batas kualitas terbaik", bg: "#FFFBEB", border: "#D97706" }
                    ],
                    cards: [
                      { id: "i1", text: "Label 'EXP: 08/26' pada tablet vitamin C — batas penggunaan yang tidak boleh dilewati", icon: "💊", targetZone: "expiry_date" },
                      { id: "i2", text: "Label 'BBD: Mar 26' pada cokelat — cokelat masih bisa dimakan setelah ini tapi tekstur mungkin berubah", icon: "🍫", targetZone: "best_before" },
                      { id: "i3", text: "Label 'BEST BEFORE 28 Feb 2025' pada telur — kualitas dan kesegaran optimal sebelum tanggal ini", icon: "🥚", targetZone: "best_before" },
                      { id: "i4", text: "Tablet vitamin C dirancang bertahan 2 tahun sejak tanggal produksi", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i5", text: "Cokelat batangan bertahan optimal selama 12 bulan dalam kondisi penyimpanan yang tepat", icon: "🔬", targetZone: "shelf_life" },
                      { id: "i6", text: "Setelah 08/26, kandungan vitamin C dalam tablet bisa sudah tidak memenuhi kadar yang tertera", icon: "⚠️", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Tepat! Perhatikan pola yang muncul: produk farmasi (tablet vitamin C) menggunakan EXP — batas mutlak. Produk makanan ringan dan segar (cokelat, telur) menggunakan BBD/Best Before — batas kualitas. Pilihan antara EXP dan BBD bukan kebetulan: regulator mewajibkan EXP untuk produk yang risikonya tinggi jika kedaluwarsa.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan label yang digunakan: EXP pada obat-obatan = Expiry Date (batas mutlak). BBD/Best Before pada makanan = kualitas optimal, bukan batas mutlak. Shelf Life = durasi ketahanan yang mendasari perhitungan kedua jenis tanggal itu."
                  },

                  // SLIDE 3: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan dari konteks industri pangan dan farmasi ini.",
                      text: "",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;"><div style="font-size: 13px; color: #475569;">PT Pangan Sehat sedang memproduksi dua produk: yoghurt (produk pangan segar) dan tablet antasida (produk farmasi). Tim QC mereka membuat berbagai catatan berikut.</div></div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life", label: "⏳ Shelf Life", subLabel: "Durasi ketahanan produk", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "🚫 Expiry Date", subLabel: "Batas mutlak — tidak boleh dilewati", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "best_before", label: "⭐ Best Before", subLabel: "Batas kualitas terbaik", bg: "#FFFBEB", border: "#D97706" }
                    ],
                    cards: [
                      { id: "i1", text: "Yoghurt ini paling baik dikonsumsi sebelum 14 hari sejak produksi — setelah itu rasa dan teksturnya mulai berubah meski belum tentu berbahaya", icon: "🥛", targetZone: "best_before" },
                      { id: "i2", text: "Tablet antasida tidak boleh digunakan setelah bulan keenam sejak produksi — kandungan aktifnya menurun di bawah batas minimum efektif", icon: "💊", targetZone: "expiry_date" },
                      { id: "i3", text: "Yoghurt bertahan secara optimal selama 14 hari dalam suhu 2–8°C", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i4", text: "Madu ini masih sangat baik dimakan sebelum Desember 2026 — setelah itu mungkin mulai mengkristal dan warnanya menggelap tapi masih aman", icon: "⭐", targetZone: "best_before" },
                      { id: "i5", text: "Tablet antasida dirancang mempertahankan efektivitasnya selama 36 bulan dalam suhu kamar", icon: "⏳", targetZone: "shelf_life" },
                      { id: "i6", text: "Vaksin ini tidak boleh digunakan setelah 30 Juni 2025 — efektivitas proteksinya tidak dapat dijamin setelah tanggal tersebut", icon: "🚫", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Tepat! Perhatikan madu di kartu 4 — madu secara ilmiah hampir tidak pernah rusak karena kandungan gulanya sangat tinggi, tapi kualitasnya berubah (mengkristal, warna menggelap). Regulasi mewajibkan Best Before pada madu, bukan Expiry Date. Vaksin di kartu 6 sebaliknya — harus pakai Expiry Date karena efektivitas proteksinya benar-benar berakhir setelah tanggal tertentu.",
                    feedbackWrong: "Ada yang tertukar. Kunci pembedanya: apakah yang berubah setelah tanggal itu adalah KUALITAS (BBD) atau KEAMANAN/EFEKTIVITAS yang tidak bisa dikompromikan (EXP)? Farmasi dan vaksin hampir selalu pakai EXP. Makanan dengan risiko rendah sering pakai BBD."
                  },

                  // SLIDE 4: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap item: SHELF LIFE, EXPIRY DATE, atau BEST BEFORE?",
                      text: "",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px;"><div style="font-size: 13px; color: #475569;">Pak Dani adalah inspector di sebuah supermarket besar. Ia bertugas memeriksa produk di rak setiap hari. Berikut berbagai catatan dan situasi yang ia temui.</div></div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life", label: "⏳ Shelf Life", subLabel: "Durasi ketahanan produk", bg: "#F0FDF4", border: "#166534" },
                      { id: "expiry_date", label: "🚫 Expiry Date", subLabel: "Batas mutlak — tidak boleh dilewati", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "best_before", label: "⭐ Best Before", subLabel: "Batas kualitas terbaik", bg: "#FFFBEB", border: "#D97706" }
                    ],
                    cards: [
                      { id: "i1", text: 'Pak Dani menemukan keju di rak berlabel "BBD: 15 Jan 2026" — keju ini mungkin masih bisa dimakan setelah tanggal itu tapi rasanya sudah tidak optimal', icon: "🛒", targetZone: "best_before" },
                      { id: "i2", text: 'Pak Dani menyingkirkan obat tetes mata berlabel "EXP 03/2025" dari rak karena sudah Maret 2025', icon: "💊", targetZone: "expiry_date" },
                      { id: "i3", text: 'Pak Dani mencatat: "Roti tawar ini hanya tahan 5 hari sejak diproduksi sebelum mulai berjamur"', icon: "🍞", targetZone: "shelf_life" },
                      { id: "i4", text: 'Pak Dani melihat kaleng sarden berlabel "Best Before End: Dec 2027" — artinya kualitas terbaik dijamin sampai akhir Desember 2027', icon: "🥫", targetZone: "best_before" },
                      { id: "i5", text: 'Pak Dani membaca spesifikasi: "Minuman energi ini dirancang stabil selama 24 bulan"', icon: "⏳", targetZone: "shelf_life" },
                      { id: "i6", text: 'Pak Dani meneruskan ke manajer: "Susu formula bayi ini sudah melewati tanggal yang tertera — harus segera ditarik dari rak"', icon: "🚫", targetZone: "expiry_date" },
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan kartu 6 — susu formula bayi menggunakan Expiry Date meski itu produk pangan, bukan farmasi. Ini karena konsumennya adalah bayi dengan sistem imun belum sempurna — risikonya terlalu tinggi untuk menggunakan Best Before. Pilihan EXP vs BBD selalu mempertimbangkan siapa konsumennya dan seberapa besar risikonya jika produk digunakan setelah tanggal tersebut.",
                    feedbackWrong: "Ada yang tertukar. Tidak semua makanan pakai BBD — produk berisiko tinggi seperti susu formula bayi pakai EXP. Ingat: EXP = keamanan tidak terjamin, BBD = kualitas mungkin menurun tapi masih aman, Shelf Life = durasi ketahanan yang mendasari keduanya."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#166534",
                      label: "Materi Inti",
                      text: "Shelf Life vs Expiry Date vs Best Before — Tabel Perbandingan Lengkap",
                      style: {
                        background: "#166534", 
                        color: "white", 
                        borderRadius: "16px"
                      }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF3C7", color: "#D97706" },
                        title: "Tabel perbandingan ketiga istilah",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Tiga istilah ini berbeda dalam hal apa yang dijamin, siapa yang memutuskan, dan apa konsekuensi jika dilewati.</p>
                            <div style="overflow-x: auto; margin-top: 12px; margin-bottom: 16px;">
                              <table style="width: 100%; min-width: 500px; border-collapse: collapse; font-size: 13px; text-align: left;">
                                <thead>
                                  <tr style="border-bottom: 1px solid #475569;">
                                    <th style="padding: 8px;">ATRIBUT</th>
                                    <th style="padding: 8px;">SHELF LIFE</th>
                                    <th style="padding: 8px;">EXPIRY DATE</th>
                                    <th style="padding: 8px;">BEST BEFORE</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Jenis info</td>
                                    <td style="padding: 8px;">Durasi (waktu)</td>
                                    <td style="padding: 8px;">Tanggal spesifik</td>
                                    <td style="padding: 8px;">Tanggal spesifik</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Yang dijamin</td>
                                    <td style="padding: 8px;">Ketahanan produk</td>
                                    <td style="padding: 8px;">Keamanan & efek.</td>
                                    <td style="padding: 8px;">Kualitas optimal</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Boleh dilewati?</td>
                                    <td style="padding: 8px;">—</td>
                                    <td style="padding: 8px; color: #FCA5A5; font-weight: bold;">TIDAK (buang)</td>
                                    <td style="padding: 8px;">Mungkin aman (cek)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Produk tipikal</td>
                                    <td style="padding: 8px;">Dasar hitungan semua</td>
                                    <td style="padding: 8px;">Obat, susu bayi</td>
                                    <td style="padding: 8px;">Keju, telur, madu</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Penulisan label</td>
                                    <td style="padding: 8px;">Tidak langsung</td>
                                    <td style="padding: 8px;">EXP, Exp Date</td>
                                    <td style="padding: 8px;">BBD, Best Before</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 8px; font-weight: bold;">Risiko jika lewat</td>
                                    <td style="padding: 8px;">—</td>
                                    <td style="padding: 8px;">Tidak aman</td>
                                    <td style="padding: 8px;">Kualitas kurang</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style="background: #1E293B; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; font-weight: 500;">
                              📌 <strong>Aturan praktis:</strong> Jika label produk bertuliskan EXP atau Use Before — itu batas mutlak, jangan dilewati. Jika BBD atau Best Before — setelah tanggal itu cek kondisi dulu sebelum memutuskan.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Mengapa ada dua jenis tanggal di label?",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Pilihan antara Expiry Date dan Best Before bukan keputusan produsen semata — regulasi menentukan mana yang harus digunakan berdasarkan jenis dan risiko produk.</p>
                            <div style="overflow-x: auto; margin-top: 12px; margin-bottom: 16px;">
                              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                                <thead>
                                  <tr style="border-bottom: 1px solid #475569;">
                                    <th style="padding: 8px; width: 50%;">WAJIB EXPIRY DATE</th>
                                    <th style="padding: 8px; width: 50%;">WAJIB/LAZIM BEST BEFORE</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style="padding: 8px; vertical-align: top;">
                                      <ul style="padding-left: 16px; margin: 0;">
                                        <li>Semua produk farmasi dan obat</li>
                                        <li>Vaksin dan produk biologis</li>
                                        <li>Susu formula bayi & makanan khusus bayi</li>
                                        <li>Produk dengan kandungan aktif yang terdegradasi seiring waktu</li>
                                      </ul>
                                    </td>
                                    <td style="padding: 8px; vertical-align: top;">
                                      <ul style="padding-left: 16px; margin: 0;">
                                        <li>Makanan kering (tepung, beras, mie instan)</li>
                                        <li>Makanan kaleng & avetan</li>
                                        <li>Cokelat, permen, kue kering</li>
                                        <li>Madu, selai, saus botolan</li>
                                        <li>Telur & produk segar berisiko rendah</li>
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <p>Dasar pemikirannya sederhana: seberapa berbahaya produk ini jika digunakan setelah tanggal tersebut?<br/>
                            Jika <strong>"sangat berbahaya"</strong> → Expiry Date.<br/>
                            Jika <strong>"kualitas menurun tapi tidak berbahaya"</strong> → Best Before.</p>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#DCFCE7", color: "#166534" },
                        title: "Konteks Indonesia: regulasi BPOM",
                        color: "#22C55E",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Di Indonesia, pencantuman tanggal kedaluwarsa diatur oleh BPOM (Badan Pengawas Obat dan Makanan):</p>
                            <ul style="padding-left: 20px; list-style-type: disc;">
                              <li><strong>Untuk produk pangan olahan:</strong> Wajib mencantumkan tanggal kedaluwarsa. Boleh menggunakan "Baik Digunakan Sebelum" (Best Before) atau "Kadaluarsa" tergantung jenis produk.</li>
                              <li><strong>Untuk produk farmasi:</strong> Wajib mencantumkan Expiry Date. Tanpa Expiry Date, obat tidak mendapat izin edar.</li>
                            </ul>
                            <div style="background: #1E293B; padding: 12px; border-radius: 8px; margin: 16px 0;">
                              <div style="font-weight: bold; margin-bottom: 8px;">📋 Format yang sah di label produk Indonesia:</div>
                              <ul style="padding-left: 20px; list-style-type: disc; margin: 0; font-family: monospace; font-size: 13px;">
                                <li>"Baik Digunakan Sebelum: 31 Desember 2025"</li>
                                <li>"Kadaluarsa: 12/2025"</li>
                                <li>"EXP: 12 2025"</li>
                                <li>"Gunakan Sebelum: Des 2025"</li>
                              </ul>
                            </div>
                            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; border-radius: 4px; color: #7F1D1D; font-weight: 500;">
                              ⚠️ <strong>Produk tanpa tanggal kedaluwarsa yang jelas</strong> di label adalah produk yang tidak memenuhi regulasi BPOM — di industri, ini adalah temuan mayor dalam audit regulasi.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },

                  // SLIDE 6: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Ibu Rina menemukan tepung terigu di dapurnya berlabel 'Best Before: 30 November 2024'. Sekarang Januari 2025. Ibu Rina langsung membuangnya karena sudah melewati tanggal di label. Apakah tindakan Ibu Rina sudah tepat?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 12px; align-items: center;">
                          <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #CBD5E1;">
                            <div style="font-size: 24px; margin-bottom: 4px;">🌾</div>
                            <div style="font-size: 11px; font-weight: bold; color: #475569;">Best Before:</div>
                            <div style="font-weight: 900; color: #D97706; font-size: 14px;">30 Nov 2024</div>
                          </div>
                          <div style="font-size: 20px; color: #94A3B8;">VS</div>
                          <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #CBD5E1;">
                            <div style="font-size: 24px; margin-bottom: 4px;">📅</div>
                            <div style="font-size: 11px; font-weight: bold; color: #475569;">Saat Ini:</div>
                            <div style="font-weight: 900; color: #334155; font-size: 14px;">Januari 2025</div>
                          </div>
                        </div>
                        <div style="font-weight: bold; color: #EF4444; display: flex; align-items: center; justify-content: center; gap: 8px;">
                          <span>👩🗑️</span> <span>Langsung dibuang?</span>
                        </div>
                        <div style="font-size: 12px; color: #64748B; margin-top: 8px; font-style: italic;">Tepat atau berlebihan?</div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Sudah lewat harus dibuang",
                        correct: false,
                        feedback: "Belum tepat. Best Before bukan Expiry Date — keduanya berbeda. Tepung terigu berlabel 'Best Before' yang sudah melewati tanggal tersebut belum tentu harus dibuang. Cek kondisinya: bau, warna, ada tidaknya kutu atau kelembapan. Jika masih baik, masih bisa digunakan — meski kualitasnya mungkin tidak seoptimal sebelum tanggal Best Before."
                      },
                      {
                        id: "salah",
                        icon: "🤔",
                        label: "Salah",
                        subLabel: "Best Before bukan batas mutlak",
                        correct: true,
                        feedback: "Tepat! Best Before berbeda dari Expiry Date. Tepung terigu yang sudah melewati Best Before tidak otomatis harus dibuang — perlu dicek kondisinya terlebih dahulu: apakah ada bau tengik, kutu, atau gumpalan basah? Jika tidak ada tanda-tanda kerusakan dan disimpan dengan baik (tertutup rapat, kering), tepung mungkin masih bisa digunakan. Best Before adalah batas kualitas optimal, bukan batas keamanan mutlak seperti Expiry Date."
                      }
                    ]
                  },

                  // SLIDE 7: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Sebuah toko apotek menjual obat antibiotik yang berlabel 'EXP 01/2025'. Sekarang Februari 2025. Pelanggan meminta diskon karena 'obatnya masih terlihat baik'. Apoteker boleh menjualnya dengan harga diskon karena kondisi fisik obatnya masih baik.",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                          <div style="background: #F1F5F9; padding: 12px; border-radius: 8px; text-align: left; font-size: 13px; color: #334155; position: relative;">
                            🙋 <strong>Pelanggan:</strong> "Obatnya masih terlihat baik — bisa dapat diskon?"
                          </div>
                          <div style="background: #E0F2FE; padding: 12px; border-radius: 8px; text-align: right; font-size: 13px; color: #0284C7;">
                            🧑‍⚕️ <strong>Apoteker:</strong> "???" 
                          </div>
                        </div>
                        <div style="margin-top: 16px; display: inline-block; background: white; border: 2px solid #EF4444; padding: 8px 16px; border-radius: 8px;">
                          <div style="font-weight: bold; color: #EF4444; font-size: 14px;">💊 EXP 01/2025</div>
                          <div style="font-size: 11px; color: #64748B;">Sekarang: Feb 2025</div>
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "💰",
                        label: "Benar",
                        subLabel: "Boleh dijual — kondisi fisik masih baik",
                        correct: false,
                        feedback: "Belum tepat. EXP pada obat adalah batas yang tidak bisa dinegosiasi — tidak ada pengecualian, tidak ada diskon untuk obat kedaluwarsa. Berbeda dari Best Before pada makanan, Expiry Date pada obat menyangkut keamanan dan efektivitas medis. Menjual obat kedaluwarsa adalah pelanggaran serius yang bisa berujung pencabutan izin apotek."
                      },
                      {
                        id: "salah",
                        icon: "🚫",
                        label: "Salah",
                        subLabel: "EXP adalah batas mutlak — tidak boleh dijual",
                        correct: true,
                        feedback: "Tepat! Expiry Date pada obat adalah batas mutlak yang tidak bisa dikompromikan dengan alasan apapun — termasuk kondisi fisik yang masih baik atau permintaan diskon. Antibiotik yang sudah melewati EXP tidak boleh dijual, diberikan, atau digunakan. Antibiotik kedaluwarsa bisa kehilangan efektivitasnya — ini berbahaya karena bisa menyebabkan resistensi antibiotik jika dikonsumsi dalam dosis yang tidak efektif. Apoteker yang menjual obat kedaluwarsa bisa dikenai sanksi hukum."
                      }
                    ]
                  },

                  // SLIDE 8: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Produk pangan yang menggunakan label 'Best Before' selalu lebih aman untuk dikonsumsi setelah tanggal tersebut dibandingkan produk berlabel 'Expiry Date' — karena Best Before hanya soal kualitas.",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                        <div style="font-size: 12px; font-weight: bold; color: #334155; margin-bottom: 8px;">Selalu aman setelah tanggal berlalu?</div>
                        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                          <div style="background: white; border-radius: 6px; padding: 8px; font-size: 13px; display: flex; justify-content: space-between;"><span>🧀 Keju berlabel BBD</span> <span style="color: #16A34A; font-weight: bold;">✓ mungkin</span></div>
                          <div style="background: white; border-radius: 6px; padding: 8px; font-size: 13px; display: flex; justify-content: space-between;"><span>🥛 Yoghurt berlabel BBD</span> <span style="color: #D97706; font-weight: bold;">? tergantung</span></div>
                          <div style="background: white; border-radius: 6px; padding: 8px; font-size: 13px; display: flex; justify-content: space-between;"><span>🥚 Telur berlabel BBD</span> <span style="color: #EF4444; font-weight: bold;">⚠️ cek!</span></div>
                        </div>
                        <div style="font-size: 12px; font-weight: bold; color: #334155; margin-bottom: 8px;">Tidak boleh digunakan setelah berlalu:</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                          <div style="background: #FEF2F2; border-radius: 6px; padding: 8px; font-size: 13px; display: flex; justify-content: space-between;"><span>💊 Antibiotik berlabel EXP</span> <span style="color: #EF4444; font-weight: bold;">✗ dilarang</span></div>
                          <div style="background: #FEF2F2; border-radius: 6px; padding: 8px; font-size: 13px; display: flex; justify-content: space-between;"><span>💉 Vaksin berlabel EXP</span> <span style="color: #EF4444; font-weight: bold;">✗ dilarang</span></div>
                        </div>
                      </div>
                      <div style="text-align: center; font-style: italic; font-size: 13px; color: #64748B;">Apakah BBD selalu lebih aman untuk dilewati?</div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "BBD = selalu boleh lewat",
                        correct: false,
                        feedback: "Belum tepat. Best Before bukan jaminan otomatis bahwa produk selalu aman dikonsumsi setelah tanggal tersebut. Untuk produk berisiko tinggi seperti produk susu segar dan telur, melewati Best Before terlalu jauh bisa tetap berbahaya. Yang membedakan BBD dan EXP bukan bahwa BBD 'lebih aman dilewati' — tapi bahwa Best Before fokus pada kualitas optimal, sedangkan Expiry Date fokus pada batas keamanan minimum yang dijamin produsen."
                      },
                      {
                        id: "salah",
                        icon: "⚠️",
                        label: "Salah",
                        subLabel: "Tergantung produk dan kondisi",
                        correct: true,
                        feedback: "Tepat! Pernyataan ini terlalu menyederhanakan. Best Before memang batas kualitas, bukan batas keamanan absolut — tapi tidak berarti semua produk BBD selalu aman dikonsumsi setelah tanggal tersebut. Yoghurt atau produk susu yang sudah jauh melewati BBD bisa mengandung bakteri berbahaya. Telur yang sudah 2 minggu melewati BBD bisa sudah rusak. Kunci utama tetap: cek kondisi fisik produk dan pertimbangkan jenis produknya."
                      }
                    ]
                  },

                  // SLIDE 9: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Sebuah pabrik biskuit menggunakan label 'Shelf Life: 12 bulan' langsung di kemasannya — tanpa mencantumkan tanggal spesifik Best Before atau Expiry Date. Apakah label ini sudah memenuhi ketentuan regulasi?",
                      htmlContext: `<div style="display: flex; gap: 12px; margin-bottom: 16px;">
                        <div style="flex: 1; background: #FFF1F2; border: 1px solid #FECDD3; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px;">
                          <div style="font-weight: bold; margin-bottom: 8px; color: #E11D48;">Versi A (Bermasalah)</div>
                          <div>🍪 BISKUIT KELAPA</div>
                          <div>PT Roti Makmur</div>
                          <div style="background: white; padding: 4px; border: 1px dashed #E11D48; margin: 4px 0; font-weight: bold;">Shelf Life: 12 bulan</div>
                          <div>MFD: 01/01/2025</div>
                        </div>
                        <div style="flex: 1; background: #ECFCCB; border: 1px solid #D9F99D; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px;">
                          <div style="font-weight: bold; margin-bottom: 8px; color: #4D7C0F;">Versi B (Benar)</div>
                          <div>🍪 BISKUIT KELAPA</div>
                          <div>PT Roti Makmur</div>
                          <div>MFD: 01/01/2025</div>
                          <div style="background: white; padding: 4px; border: 1px dashed #4D7C0F; margin: 4px 0; font-weight: bold;">BBD: 01/01/2026</div>
                        </div>
                      </div>
                      <div style="text-align: center; font-style: italic; font-size: 13px; color: #64748B;">Versi A — cukup atau tidak?</div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Shelf Life sudah cukup",
                        correct: false,
                        feedback: "Belum tepat. Shelf Life adalah durasi — bukan tanggal yang bisa langsung dibaca konsumen. Regulasi mewajibkan label mencantumkan tanggal spesifik (BBD atau EXP) agar konsumen bisa langsung mengecek apakah produk masih layak digunakan tanpa harus menghitung sendiri dari tanggal produksi."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Tanggal spesifik tetap diperlukan",
                        correct: true,
                        feedback: "Tepat! Mencantumkan 'Shelf Life: 12 bulan' saja tidak cukup untuk memenuhi regulasi — karena konsumen tidak bisa langsung tahu kapan batas penggunaannya tanpa mengetahui tanggal produksi dan menghitungnya sendiri. Regulasi BPOM mewajibkan tanggal yang bisa langsung dibaca oleh konsumen awam: Best Before atau Expiry Date dalam format tanggal yang jelas. Shelf Life adalah informasi internal industri — bukan pengganti tanggal di label."
                      }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Pelajaran Selesai!",
                      insight: "Anda sudah bisa membedakan Shelf Life, Expiry Date, dan Best Before — dan memahami implikasi praktis dari setiap jenis label.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Shelf Life = durasi ketahanan (dasar perhitungan) · Expiry Date = batas mutlak keamanan · Best Before = batas kualitas optimal",
                        "Lewat Expiry Date = tidak boleh digunakan sama sekali · Lewat Best Before = cek kondisi dulu",
                        "Pilihan EXP vs BBD berdasarkan risiko produk — farmasi dan produk berisiko tinggi wajib EXP",
                        "Shelf Life saja tidak cukup di label — regulasi mewajibkan tanggal spesifik yang bisa langsung dibaca konsumen"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "mengidentifikasi-istilah-kedaluwarsa",
                title:    "Mengidentifikasi istilah kedaluwarsa di label produk",
                icon:     "🏷️",
                duration: "20 menit",
                slides: [
                  // SLIDE 1
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Perhatikan label obat batuk ini. Tap setiap elemen yang merupakan INFORMASI KEDALUWARSA.",
                      text: "",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 12px; font-family: monospace; font-size: 11px;">
                        <div style="font-weight: bold; margin-bottom: 4px; font-size: 13px;">💊 SIRUP BATUK ANAK</div>
                        <div style="margin-bottom: 2px;">PT Farma Sehat Indonesia</div>
                        <div style="margin-bottom: 8px; border-bottom: 1px dashed #000; padding-bottom: 4px;">Rasa: Jeruk | 60 mL</div>
                        <div>Komposisi: Dekstrometorfan HBr 7,5 mg/5 mL</div>
                        <div>Reg. BPOM: DTL 1234567890A1</div>
                        <div style="margin: 8px 0; font-weight: bold;">MFD: Jan 2024 &nbsp; &nbsp; EXP: Jan 2026</div>
                        <div>Batch No: SB240101</div>
                        <div>Simpan di bawah 30°C, terlindung cahaya</div>
                        <div>Hanya untuk anak 6–12 tahun</div>
                      </div>
                      <div style="font-size: 12px; color: #475569; text-align: center;">Dari semua elemen di label ini, mana yang merupakan informasi kedaluwarsa?</div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "info_kedaluwarsa", label: "📅 Informasi Kedaluwarsa", subLabel: "Berkaitan dengan tanggal atau masa simpan", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "bukan_info", label: "📋 Bukan Informasi", subLabel: "Informasi lain pada label", bg: "#F1F5F9", border: "#94A3B8" }
                    ],
                    cards: [
                      { id: "i1", text: "MFD: Jan 2024 — tanggal produksi sirup", icon: "🏭", targetZone: "info_kedaluwarsa" },
                      { id: "i2", text: "EXP: Jan 2026 — batas penggunaan sirup", icon: "🚫", targetZone: "info_kedaluwarsa" },
                      { id: "i3", text: "Batch No: SB240101 — nomor bets produksi", icon: "🔢", targetZone: "bukan_info" },
                      { id: "i4", text: "Reg. BPOM: DTL 1234567890A1 — nomor izin edar", icon: "📋", targetZone: "bukan_info" },
                      { id: "i5", text: "Simpan di bawah 30°C, terlindung cahaya — instruksi penyimpanan", icon: "❄️", targetZone: "info_kedaluwarsa" },
                      { id: "i6", text: "Dekstrometorfan HBr 7,5 mg/5 mL — kandungan aktif", icon: "💊", targetZone: "bukan_info" }
                    ],
                    feedbackCorrect: "Sempurna! MFD (tanggal produksi) termasuk informasi kedaluwarsa karena ia adalah titik awal perhitungan — tanpa MFD, EXP tidak bisa diverifikasi. Instruksi penyimpanan juga termasuk karena ia syarat berlakunya EXP: jika sirup disimpan di atas 30°C, Expiry Date Jan 2026 tidak lagi berlaku — produk bisa rusak lebih cepat.",
                    feedbackWrong: "Ada yang tertukar. Informasi kedaluwarsa mencakup: tanggal produksi (MFD), tanggal kedaluwarsa (EXP), dan kondisi penyimpanan yang harus dipenuhi agar EXP berlaku. Nomor batch, nomor BPOM, dan komposisi adalah informasi lain yang tidak berkaitan langsung dengan kapan produk kedaluwarsa."
                  },

                  // SLIDE 2
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Perhatikan label produk makanan ini. Tap setiap elemen yang merupakan INFORMASI KEDALUWARSA.",
                      text: "",
                      htmlContext: `<div style="background: white; border: 2px solid #000; padding: 16px; border-radius: 8px; margin-bottom: 12px; font-family: monospace; font-size: 11px;">
                        <div style="font-weight: bold; margin-bottom: 4px; font-size: 13px;">🍪 BISKUIT BUTTER PREMIUM</div>
                        <div style="margin-bottom: 2px;">Made in Netherlands</div>
                        <div style="margin-bottom: 8px; border-bottom: 1px dashed #000; padding-bottom: 4px;">Netto: 454g / 16 oz</div>
                        <div>INGREDIENTS: Wheat flour, butter (28%),</div>
                        <div>sugar, eggs, salt, vanilla extract</div>
                        <div style="margin-top: 8px;">Allergen: Contains WHEAT, EGGS, MILK</div>
                        <div style="margin-top: 8px; font-weight: bold;">Store in a cool dry place (&lt;25°C)</div>
                        <div style="font-weight: bold;">Best Before End: see bottom of tin</div>
                        <div style="font-weight: bold;">BBE: 03/2026</div>
                        <div style="font-weight: bold;">MFG: 03/2024 &nbsp; &nbsp; LOT: NL240312</div>
                      </div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "info_kedaluwarsa", label: "📅 Informasi Kedaluwarsa", subLabel: "Berkaitan dengan tanggal atau masa simpan", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "bukan_info", label: "📋 Bukan Informasi", subLabel: "Informasi lain pada label", bg: "#F1F5F9", border: "#94A3B8" }
                    ],
                    cards: [
                      { id: "i1", text: "Best Before End: see bottom of tin — petunjuk lokasi tanggal kedaluwarsa", icon: "⭐", targetZone: "info_kedaluwarsa" },
                      { id: "i2", text: "BBE: 03/2026 — batas kualitas terbaik biskuit ini", icon: "📅", targetZone: "info_kedaluwarsa" },
                      { id: "i3", text: "MFG: 03/2024 — tanggal diproduksi di pabrik Belanda", icon: "🏭", targetZone: "info_kedaluwarsa" },
                      { id: "i4", text: "LOT: NL240312 — nomor lot produksi untuk traceability", icon: "🔢", targetZone: "bukan_info" },
                      { id: "i5", text: "Contains WHEAT, EGGS, MILK — informasi alergen", icon: "🌾", targetZone: "bukan_info" },
                      { id: "i6", text: "Store in a cool dry place (<25°C) — kondisi penyimpanan yang harus dipenuhi agar BBE berlaku", icon: "❄️", targetZone: "info_kedaluwarsa" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan dua hal baru di soal ini: 'Best Before End' dan 'BBE' adalah variasi penulisan Best Before yang umum di produk impor Eropa — artinya sama persis. 'MFG' adalah singkatan Manufacturing Date, sama dengan MFD. Petunjuk 'see bottom of tin' juga termasuk informasi kedaluwarsa karena tanpa mengikutinya, Anda tidak bisa menemukan tanggal yang sebenarnya.",
                    feedbackWrong: "Ada yang tertukar. Di soal ini ada lebih banyak informasi kedaluwarsa dari soal sebelumnya: BBE, MFG, instruksi penyimpanan, dan petunjuk lokasi tanggal semuanya termasuk. Nomor LOT dan informasi alergen adalah informasi terpisah."
                  },

                  // SLIDE 3
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Perhatikan label obat tetes mata ini. Tap setiap elemen yang merupakan INFORMASI KEDALUWARSA.",
                      text: "",
                      htmlContext: `<div style="background: white; border: 1px solid #1E293B; padding: 12px; border-radius: 4px; margin-bottom: 12px; font-family: monospace; font-size: 10px; width: 100%; max-width: 250px; margin-left: auto; margin-right: auto;">
                        <div style="font-weight: bold; margin-bottom: 4px; font-size: 12px; color: #1E293B;">👁️ TETES MATA CHLORAMPHENICOL 0,5%</div>
                        <div style="margin-bottom: 6px; border-bottom: 1px dashed #1E293B; padding-bottom: 4px;">PT Indo Farma Tbk</div>
                        <div>Reg. BPOM: GKL 1234500145A1</div>
                        <div>Netto: 5 mL steril</div>
                        <div style="margin-top: 6px; font-weight: bold;">Lot: IF2401A &nbsp; Mfg: 01-2024</div>
                        <div style="font-weight: bold;">Exp: 01-2026</div>
                        <div style="margin-top: 6px; font-weight: bold; background: #FEF2F2; padding: 2px;">GUNAKAN DALAM 30 HARI SETELAH DIBUKA</div>
                        <div style="margin-top: 6px;">Simpan pada 15–25°C</div>
                        <div style="color: #DC2626;">Jangan digunakan jika warna berubah</div>
                      </div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "info_kedaluwarsa", label: "📅 Informasi Kedaluwarsa", subLabel: "Berkaitan dengan tanggal atau masa simpan", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "bukan_info", label: "📋 Bukan Informasi", subLabel: "Informasi lain pada label", bg: "#F1F5F9", border: "#94A3B8" }
                    ],
                    cards: [
                      { id: "i1", text: "Mfg: 01-2024 — tanggal produksi obat tetes mata", icon: "🏭", targetZone: "info_kedaluwarsa" },
                      { id: "i2", text: "Exp: 01-2026 — batas penggunaan dalam kemasan tersegel", icon: "🚫", targetZone: "info_kedaluwarsa" },
                      { id: "i3", text: "GUNAKAN DALAM 30 HARI SETELAH DIBUKA — shelf life setelah kemasan terbuka", icon: "🔓", targetZone: "info_kedaluwarsa" },
                      { id: "i4", text: "Lot: IF2401A — nomor lot untuk keperluan traceability dan recall", icon: "🔢", targetZone: "bukan_info" },
                      { id: "i5", text: "Simpan pada 15–25°C — rentang suhu penyimpanan yang harus dipenuhi", icon: "❄️", targetZone: "info_kedaluwarsa" },
                      { id: "i6", text: "Jangan digunakan jika warna berubah — indikator kerusakan visual", icon: "👁️", targetZone: "info_kedaluwarsa" }
                    ],
                    feedbackCorrect: "Tepat! Tiga hal baru di soal ini: pertama, 'Mfg' (huruf kapital tidak konsisten) tetap berarti Manufacturing/tanggal produksi. Kedua, '30 hari setelah dibuka' adalah In-Use Shelf Life — masa simpan berbeda yang berlaku setelah kemasan terbuka, dan ini bisa jauh lebih pendek dari EXP. Ketiga, indikator perubahan warna juga termasuk informasi kedaluwarsa — cara lain mendeteksi produk yang tidak layak digunakan.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan kartu 3 dan 6 — keduanya termasuk informasi kedaluwarsa meski tidak berbentuk tanggal. '30 hari setelah dibuka' adalah masa simpan tersendiri, dan 'jangan digunakan jika warna berubah' adalah indikator kerusakan yang sama pentingnya dengan tanggal EXP."
                  },

                  // SLIDE 4
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Perhatikan label produk susu formula bayi ini. Tap setiap elemen yang merupakan INFORMASI KEDALUWARSA.",
                      text: "",
                      htmlContext: `<div style="background: white; border: 2px solid #000; padding: 16px; border-radius: 8px; margin-bottom: 12px; font-family: monospace; font-size: 11px;">
                        <div style="font-weight: bold; margin-bottom: 4px; font-size: 13px; color: #1D4ED8;">🍼 SUSU FORMULA LANJUTAN</div>
                        <div style="margin-bottom: 2px;">Usia 6–12 Bulan | 800g</div>
                        <div style="margin-bottom: 8px; border-bottom: 1px dashed #000; padding-bottom: 4px;">PT Nutrisi Prima Indonesia</div>
                        <div>Reg. BPOM: MD 123456789012</div>
                        <div style="margin-top: 8px; font-weight: bold;">Diproduksi: 15 Januari 2024</div>
                        <div style="font-weight: bold;">Baik Digunakan Sebelum: 15 Jan 2026</div>
                        <div>No. Produksi: NPI240115-A</div>
                        <div style="margin-top: 8px; font-weight: bold; background: #FEF2F2; padding: 2px;">GUNAKAN DALAM 4 MINGGU SETELAH DIBUKA</div>
                        <div style="margin-top: 8px;">Simpan dalam wadah tertutup rapat</div>
                        <div style="font-weight: bold;">Simpan di tempat sejuk dan kering (&lt;25°C)</div>
                        <div>Setelah dibuka, simpan di tempat kering</div>
                        <div>Jangan simpan di kulkas setelah dibuka</div>
                      </div>`
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "info_kedaluwarsa", label: "📅 Informasi Kedaluwarsa", subLabel: "Berkaitan dengan tanggal atau masa simpan", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "bukan_info", label: "📋 Bukan Informasi", subLabel: "Informasi lain pada label", bg: "#F1F5F9", border: "#94A3B8" }
                    ],
                    cards: [
                      { id: "i1", text: "Diproduksi: 15 Januari 2024 — tanggal produksi dalam Bahasa Indonesia", icon: "🏭", targetZone: "info_kedaluwarsa" },
                      { id: "i2", text: "Baik Digunakan Sebelum: 15 Jan 2026 — penulisan Best Before dalam Bahasa Indonesia", icon: "⭐", targetZone: "info_kedaluwarsa" },
                      { id: "i3", text: "GUNAKAN DALAM 4 MINGGU SETELAH DIBUKA — In-Use Shelf Life susu formula", icon: "🔓", targetZone: "info_kedaluwarsa" },
                      { id: "i4", text: "Reg. BPOM: MD 123456789012 — nomor registrasi produk di BPOM", icon: "📋", targetZone: "bukan_info" },
                      { id: "i5", text: "No. Produksi: NPI240115-A — nomor produksi untuk traceability", icon: "🔢", targetZone: "bukan_info" },
                      { id: "i6", text: "Simpan di tempat sejuk dan kering (<25°C) — kondisi penyimpanan wajib", icon: "❄️", targetZone: "info_kedaluwarsa" }
                    ],
                    feedbackCorrect: "Sempurna! Di soal ini semua istilah dalam Bahasa Indonesia: 'Diproduksi' = MFD, 'Baik Digunakan Sebelum' = BBD/Best Before. Ini adalah format yang diakui resmi oleh BPOM dan wajib tersedia dalam Bahasa Indonesia untuk produk yang beredar di Indonesia. Perhatikan juga bahwa susu formula bayi menggunakan 'Baik Digunakan Sebelum' (Best Before) — bukan EXP, karena produk ini adalah pangan, meski untuk konsumen berisiko tinggi (bayi).",
                    feedbackWrong: "Ada yang tertukar. Di label ini semua kata kunci dalam Bahasa Indonesia: 'Diproduksi' adalah tanggal produksi, 'Baik Digunakan Sebelum' adalah Best Before. Keduanya adalah informasi kedaluwarsa bersama instruksi penyimpanan dan masa simpan setelah dibuka."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#166534",
                      label: "Materi Inti",
                      text: "Panduan Lengkap Membaca Informasi Kedaluwarsa di Label",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF3C7", color: "#D97706" },
                        title: "Kamus singkatan kedaluwarsa di label produk",
                        color: "#F59E0B",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Label produk di Indonesia bisa menggunakan singkatan Bahasa Inggris, Bahasa Indonesia, atau keduanya. Berikut semua variasi yang perlu Anda kenali:</p>
                            <div style="overflow-x: auto; margin-top: 12px; margin-bottom: 16px;">
                              <table style="width: 100%; min-width: 400px; border-collapse: collapse; font-size: 13px; text-align: left;">
                                <thead>
                                  <tr style="border-bottom: 1px solid #475569;">
                                    <th style="padding: 8px;">SINGKATAN</th>
                                    <th style="padding: 8px;">KEPANJANGAN</th>
                                    <th style="padding: 8px;">ARTINYA</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">EXP</td>
                                    <td style="padding: 8px;">Expiry Date /<br/>Expiration Date</td>
                                    <td style="padding: 8px;">Tanggal kedaluwarsa<br/>(batas mutlak)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">BBD<br/>BBE</td>
                                    <td style="padding: 8px;">Best Before Date<br/>Best Before End</td>
                                    <td style="padding: 8px;">Tanggal terbaik<br/>digunakan sebelum<br/>(batas kualitas)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Use By</td>
                                    <td style="padding: 8px;">Use By Date</td>
                                    <td style="padding: 8px;">Gunakan sebelum<br/>(setara EXP untuk<br/>beberapa produk)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">MFD<br/>MFG / Mfg</td>
                                    <td style="padding: 8px;">Manufacturing Date<br/>Manufacturing<br/>Diproduksi (BI)<br/>Tanggal Produksi (BI)</td>
                                    <td style="padding: 8px;">Tanggal produksi</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">LOT / Lot<br/>Batch No</td>
                                    <td style="padding: 8px;">Lot Number<br/>Batch Number</td>
                                    <td style="padding: 8px;">Nomor lot/batch<br/>(bukan kedaluwarsa)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">PAO</td>
                                    <td style="padding: 8px;">Period After Opening<br/>(simbol tutup krim<br/>+ angka bulan)</td>
                                    <td style="padding: 8px;">Masa simpan setelah<br/>kemasan dibuka</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Baik<br/>Digunakan<br/>Sebelum</td>
                                    <td style="padding: 8px;">Best Before<br/>(Bahasa Indonesia)</td>
                                    <td style="padding: 8px;">Versi resmi<br/>Bahasa Indonesia</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 8px; font-weight: bold;">Kadaluarsa /<br/>Kedaluwarsa</td>
                                    <td style="padding: 8px;">Expiry Date<br/>(Bahasa Indonesia)</td>
                                    <td style="padding: 8px;">Versi resmi<br/>Bahasa Indonesia</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style="background: #1E293B; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; font-weight: 500;">
                              📌 <strong>Penting:</strong> Satu produk bisa memiliki semua atribut ini sekaligus: <strong>MFD</strong> (dari mana dihitung), <strong>EXP atau BBD</strong> (sampai kapan berlaku), <strong>LOT</strong> (untuk traceability), dan <strong>instruksi penyimpanan</strong> (syarat berlakunya tanggal tersebut).
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Format penulisan tanggal yang sering membingungkan",
                        color: "#3B82F6",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Format penulisan tanggal bisa bervariasi. Berikut contoh penulisannya untuk tanggal 31 Desember 2025:</p>
                            <div style="overflow-x: auto; margin-top: 12px; margin-bottom: 16px;">
                              <table style="width: 100%; min-width: 400px; border-collapse: collapse; font-size: 13px; text-align: left;">
                                <thead>
                                  <tr style="border-bottom: 1px solid #475569;">
                                    <th style="padding: 8px;">FORMAT</th>
                                    <th style="padding: 8px;">CONTOH</th>
                                    <th style="padding: 8px;">ARTINYA</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Bulan/Tahun</td>
                                    <td style="padding: 8px;">12/2025</td>
                                    <td style="padding: 8px;">Desember 2025<br/>(berlaku sampai<br/>akhir bulan)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Tahun/Bulan</td>
                                    <td style="padding: 8px;">2025/12<br/>25/12</td>
                                    <td style="padding: 8px;">Sama dengan atas<br/>(2 digit tahun)</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Tanggal/<br/>Bulan/Tahun</td>
                                    <td style="padding: 8px;">31/12/2025<br/>31-12-2025<br/>31.12.2025</td>
                                    <td style="padding: 8px;">31 Desember 2025</td>
                                  </tr>
                                  <tr style="border-bottom: 1px solid #334155;">
                                    <td style="padding: 8px; font-weight: bold;">Bulan Tahun<br/>(singkatan)</td>
                                    <td style="padding: 8px;">DEC 2025<br/>Des 2025<br/>DEZ 2025 (Jerman)<br/>DÉC 2025 (Prancis)</td>
                                    <td style="padding: 8px;">Desember 2025</td>
                                  </tr>
                                  <tr>
                                    <td style="padding: 8px; font-weight: bold;">Tanggal lengkap</td>
                                    <td style="padding: 8px;">31 December 2025<br/>31 Desember 2025</td>
                                    <td style="padding: 8px;">31 Desember 2025</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; border-radius: 4px; color: #7F1D1D; font-weight: 500;">
                              ⚠️ <strong>Perhatian khusus format MM/YY:</strong> Jika tertulis "EXP 12/25" — ini bisa berarti Desember 2025 (format Eropa) ATAU 12 Mei 2025 (format US). Dalam konteks produk farmasi dan pangan di Indonesia, format MM/YY lebih umum.
                            </div>
                          </div>
                        `
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#DCFCE7", color: "#166534" },
                        title: "Dua jenis masa simpan dalam satu produk",
                        color: "#22C55E",
                        content: `
                          <div style="color: #CBD5E1; line-height: 1.6; font-size: 14px;">
                            <p>Banyak produk — terutama farmasi dan kosmetik — memiliki dua masa simpan yang berbeda:</p>
                            
                            <div style="background: #1E293B; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #3B82F6;">
                              <div style="font-weight: bold; margin-bottom: 4px; color: #93C5FD; font-size: 12px;">FASE 1: SEBELUM DIBUKA</div>
                              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px;">
                                <span style="background: #475569; padding: 4px 8px; border-radius: 4px;">Produksi</span>
                                <span style="flex: 1; height: 2px; background: #64748B;"></span>
                                <span style="background: #475569; padding: 4px 8px; border-radius: 4px;">EXP/BBD</span>
                              </div>
                              <div style="font-size: 11px; color: #94A3B8; text-align: center;">Shelf Life penuh (Contoh: 24 bulan)</div>
                            </div>
                            
                            <div style="background: #1E293B; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #F59E0B;">
                              <div style="font-weight: bold; margin-bottom: 4px; color: #FCD34D; font-size: 12px;">FASE 2: SETELAH DIBUKA</div>
                              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px;">
                                <span style="background: #B45309; padding: 4px 8px; border-radius: 4px;">Dibuka</span>
                                <span style="flex: 1; height: 2px; background: #D97706;"></span>
                                <span style="background: #B45309; padding: 4px 8px; border-radius: 4px;">Gunakan sebelum ini</span>
                              </div>
                              <div style="font-size: 11px; color: #FDE68A; text-align: center;">In-Use Shelf Life / PAO<br/>Biasanya jauh lebih pendek<br/>Contoh: obat tetes mata (30 hari), susu formula (4 minggu)</div>
                            </div>
                            <p>Setelah kemasan dibuka, masa simpan yang berlaku adalah In-Use Shelf Life — bukan lagi EXP di label. Produk yang dibuka 1 tahun sebelum EXP tapi tidak dihabiskan dalam 30 hari sudah tidak layak digunakan meski belum mencapai tanggal EXP.</p>
                            <div style="background: #F0FDF4; border-left: 4px solid #22C55E; padding: 12px; border-radius: 4px; color: #14532D; font-weight: 500; font-size: 13px;">
                              💡 <strong>Simbol PAO</strong> pada produk kosmetik berupa gambar tutup krim terbuka dengan angka di dalamnya — misalnya "12M" berarti 12 bulan setelah dibuka.
                            </div>
                          </div>
                        `
                      }
                    ]
                  },

                  // SLIDE 6: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Pak Rudi membaca label obat tetes mata: 'EXP 06/25'. Ia menyimpulkan bahwa obat ini kedaluwarsa pada tanggal 6 bulan Mei tahun 2025. Apakah interpretasi Pak Rudi benar?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                        <div style="display: inline-block; background: white; border: 2px solid #000; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
                          <div style="font-weight: bold; font-family: monospace; font-size: 13px;">TETES MATA</div>
                          <div style="font-weight: bold; color: #DC2626; font-family: monospace; font-size: 18px;">EXP 06/25</div>
                        </div>
                        <div style="background: #EFF6FF; padding: 12px; border-radius: 8px; border: 1px dashed #3B82F6; position: relative; margin-bottom: 12px;">
                          <div style="font-size: 24px; position: absolute; left: 10px; top: 10px;">💭</div>
                          <div style="font-style: italic; font-weight: bold; color: #1E3A8A; font-size: 13px; padding-left: 30px;">
                            "EXP 06/25 = Tanggal 6, Bulan Mei Tahun 25"
                          </div>
                        </div>
                        <div style="font-size: 12px; color: #64748B; font-weight: bold;">Interpretasi ini benar?</div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "6 Mei 2025",
                        correct: false,
                        feedback: "Belum tepat. Format 'EXP 06/25' menggunakan konvensi MM/YY yang umum di industri farmasi — 06 adalah bulan (Juni), 25 adalah tahun 2025. Bukan tanggal 6 bulan Mei. Produk ini kedaluwarsa pada akhir bulan Juni 2025."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Artinya Juni 2025",
                        correct: true,
                        feedback: "Tepat! 'EXP 06/25' menggunakan format MM/YY — artinya bulan ke-6 (Juni) tahun 2025, bukan tanggal 6 bulan Mei. Ini adalah format yang paling umum digunakan di label produk farmasi: angka pertama adalah bulan, angka kedua adalah tahun (2 digit). Artinya produk ini masih berlaku sampai akhir Juni 2025."
                      }
                    ]
                  },

                  // SLIDE 7: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Bu Dewi membeli obat tetes mata dengan label 'EXP: 03-2026'. Ia membuka segelnya hari ini (Januari 2025) dan berencana menggunakannya sampai Maret 2026 karena 'masih sebelum EXP'. Di label juga tertulis 'Gunakan dalam 30 hari setelah dibuka'. Apakah rencana Bu Dewi benar?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                        <div style="display: flex; justify-content: space-between; position: relative; margin-bottom: 40px; margin-top: 10px;">
                          <div style="position: absolute; top: 10px; left: 10%; right: 10%; height: 2px; background: #CBD5E1; z-index: 1;"></div>
                          
                          <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                            <div style="font-size: 11px; font-weight: bold; color: #64748B; position: absolute; top: -20px;">Jan 2025</div>
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: #3B82F6; border: 2px solid white;"></div>
                            <div style="font-size: 10px; background: #DBEAFE; padding: 2px 6px; border-radius: 4px; color: #1E40AF; border: 1px solid #BFDBFE;">Dibuka</div>
                          </div>
                          
                          <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; padding: 0 10px;">
                            <div style="font-size: 10px; background: #FEF3C7; padding: 2px 6px; border-radius: 4px; color: #92400E; border: 1px solid #FDE68A;">Seharusnya habis</div>
                          </div>
                          
                          <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                            <div style="font-size: 11px; font-weight: bold; color: #64748B; position: absolute; top: -20px;">Mar 2026</div>
                            <div style="width: 12px; height: 12px; border-radius: 50%; background: #EF4444; border: 2px solid white;"></div>
                            <div style="font-size: 10px; background: #FEF2F2; padding: 2px 6px; border-radius: 4px; color: #991B1B; border: 1px solid #FECACA;">EXP Label</div>
                          </div>
                        </div>
                        
                        <div style="font-size: 11px; font-weight: bold; color: #DC2626; display: flex; align-items: center; justify-content: center; gap: 8px;">
                          <span>👩 Rencana Bu Dewi:</span>
                          <span style="background: #FEE2E2; padding: 4px 8px; border-radius: 4px;">⚠️ Pakai s/d Mar 2026</span>
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Masih sebelum EXP = masih boleh",
                        correct: false,
                        feedback: "Belum tepat. EXP pada kemasan berlaku untuk produk tersegel. Begitu kemasan dibuka, masa simpan yang berlaku adalah 30 hari — bukan EXP di label. Ini adalah kesalahan yang sangat umum terjadi dengan obat tetes mata, tetes telinga, dan produk steril lain yang punya batas penggunaan ketat setelah dibuka."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "30 hari setelah buka adalah batasnya",
                        correct: true,
                        feedback: "Tepat! Setelah obat tetes mata dibuka, yang berlaku bukan lagi EXP di label — melainkan masa simpan setelah dibuka (In-Use Shelf Life) yaitu 30 hari. Setelah 30 hari dari tanggal dibuka, obat tetes mata sudah tidak steril dan tidak aman digunakan meski secara tanggal belum mencapai EXP Maret 2026. Bu Dewi seharusnya menghabiskan atau membuang obat ini paling lambat awal Februari 2025."
                      }
                    ]
                  },

                  // SLIDE 8: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Label sebuah produk vitamin impor hanya mencantumkan 'BBE: END 09 26' tanpa tanggal produksi (MFD). Staf gudang menyimpulkan bahwa produk ini boleh disimpan dan dijual sampai akhir September 2026. Apakah kesimpulan ini benar?",
                      htmlContext: `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                        <div style="display: flex; gap: 12px; align-items: center;">
                          <div style="flex: 1; background: white; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px;">
                            <div style="font-weight: bold; margin-bottom: 4px; font-size: 12px;">🌿 VITAMIN D3 1000 IU</div>
                            <div style="margin-bottom: 8px;">Supplement Facts: ...</div>
                            <div style="font-weight: bold; margin-bottom: 8px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 4px;">BBE: END 09 26</div>
                            <div>Manufactured in: Germany</div>
                            <div>Distributed by: PT Indo Health</div>
                          </div>
                          <div style="flex: 1; background: #FDE68A; border: 1px solid #F59E0B; padding: 12px; border-radius: 8px; position: relative;">
                            <div style="font-size: 20px; position: absolute; top: -10px; left: -10px;">💭</div>
                            <div style="font-size: 11px; font-weight: bold; color: #92400E; text-align: center;">
                              "BBE END 09 26 = Boleh jual sampai akhir Sep 2026" ✓
                            </div>
                          </div>
                        </div>
                      </div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "BBE END 09 26 = Sept 2026",
                        correct: true,
                        feedback: "Tepat! 'BBE: END 09 26' adalah format yang umum digunakan di produk Eropa — Best Before End (BBE) bulan September (09) tahun 2026 (26). Kata 'END' menegaskan bahwa tanggal yang dimaksud adalah akhir bulan September 2026, bukan awal. Interpretasi staf gudang sudah benar. Untuk produk suplemen seperti vitamin, BBE adalah format yang tepat karena yang berubah setelah tanggal itu adalah kualitas/potensi, bukan keamanan."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Format ini tidak valid",
                        correct: false,
                        feedback: "Belum tepat. Format 'BBE: END 09 26' memang tidak umum di Indonesia tapi valid di produk impor Eropa. BBE = Best Before End, 09 = September, 26 = 2026, END = sampai akhir bulan tersebut. Staf gudang sudah menginterpretasikannya dengan benar."
                      }
                    ]
                  },

                  // SLIDE 9: TRUE/FALSE
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Sebuah produk susu UHT berlabel 'Baik Digunakan Sebelum: 15 Agustus 2025' dan 'Simpan pada suhu 2–8°C setelah dibuka'. Produk ini disimpan di suhu kamar sejak dibuka 5 hari lalu. Pemilik warung berpendapat bahwa susu ini masih aman dijual karena belum melewati 15 Agustus 2025. Apakah pendapat ini benar?",
                      htmlContext: `<div style="display: flex; gap: 12px; margin-bottom: 16px;">
                        <div style="flex: 1; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 12px; border-radius: 8px; font-size: 11px;">
                          <div style="font-weight: bold; text-align: center; margin-bottom: 8px; color: #166534; font-size: 11px;">Yang tertera di label</div>
                          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                            <span>📅</span> <span>BBD: 15 Agustus 2025 ✓</span>
                          </div>
                          <div style="display: flex; align-items: flex-start; gap: 6px; color: #065F46;">
                            <span>❄️</span> <span>Simpan 2–8°C setelah dibuka</span>
                          </div>
                        </div>
                        <div style="flex: 1; background: #FEF2F2; border: 1px solid #FECACA; padding: 12px; border-radius: 8px; font-size: 11px;">
                          <div style="font-weight: bold; text-align: center; margin-bottom: 8px; color: #991B1B; font-size: 11px;">Kondisi nyata</div>
                          <div style="display: flex; align-items: flex-start; gap: 6px; margin-bottom: 4px; color: #B91C1C;">
                            <span>🌡️</span> <span>Disimpan ±30°C</span>
                          </div>
                          <div style="display: flex; align-items: flex-start; gap: 6px; color: #7F1D1D; font-weight: bold;">
                            <span>⚠️</span> <span>Sudah dibuka 5 hari</span>
                          </div>
                        </div>
                      </div>
                      <div style="text-align: center; font-style: italic; font-size: 13px; color: #64748B; font-weight: bold;">BBD masih berlaku, kondisi tak terpenuhi — aman?</div>`
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Belum lewat BBD = masih aman",
                        correct: false,
                        feedback: "Belum tepat. Tanggal di label (BBD atau EXP) hanya valid jika instruksi penyimpanannya diikuti. Susu yang disimpan di suhu kamar setelah dibuka — padahal label mensyaratkan 2–8°C — sudah kehilangan jaminan tanggalnya. Pemilik warung tidak boleh menggunakan tanggal label sebagai satu-satunya acuan jika kondisi penyimpanannya dilanggar."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Kondisi penyimpanan tidak terpenuhi",
                        correct: true,
                        feedback: "Tepat! Tanggal Best Before hanya berlaku jika syarat penyimpanannya terpenuhi. Susu UHT yang sudah dibuka harus disimpan di kulkas (2–8°C) — bukan suhu kamar. Disimpan di luar kulkas selama 5 hari setelah dibuka, susu ini kemungkinan besar sudah rusak dan berbahaya dikonsumsi, meski secara kalender belum melewati 15 Agustus 2025. Kondisi penyimpanan adalah bagian integral dari jaminan tanggal — tidak bisa dipisahkan."
                      }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 1-N03 Selesai!",
                      insight: "Anda sudah bisa membaca dan menginterpretasikan semua variasi penulisan informasi kedaluwarsa di label produk farmasi dan pangan.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "EXP/Kadaluarsa = batas mutlak · BBD/BBE/Best Before/Baik Digunakan Sebelum = batas kualitas · MFD/MFG/Diproduksi = tanggal produksi",
                        "Format MM/YY yang paling umum: angka pertama = bulan, angka kedua = tahun (bukan tanggal/bulan)",
                        "Produk yang sudah dibuka punya masa simpan tersendiri (In-Use Shelf Life) — bisa jauh lebih pendek dari EXP di label",
                        "Tanggal di label hanya berlaku jika kondisi penyimpanan yang tertera diikuti — instruksi penyimpanan adalah syarat, bukan saran"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              }
            ]
          },
          {
            id:    "bagaimana-shelf-life-ditentukan",
            title: "Bagaimana Shelf Life Ditentukan",
            icon:  "🔬",
            color: COLORS.teal,

            subLessons: [
              {
                id:       "uji-stabilitas-dasar-shelf-life",
                title:    "Menjelaskan uji stabilitas sebagai dasar Shelf Life",
                icon:     "🧪",
                duration: "20 menit",
                slides: [
                  // SLIDE 1
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Pilih jawaban yang paling tepat",
                      text: "Mengapa PT Farma Prima harus menjalankan uji stabilitas sebelum bisa mencantumkan 'Shelf Life: 24 bulan' di label tablet vitamin C mereka?",
                      htmlContext: "<div style='display: flex; gap: 8px; margin-bottom: 16px; background: #F8FAFC; padding: 16px; border-radius: 12px; align-items: center; justify-content: center;'><div style='flex: 1; background: white; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🏭</div><div style='font-weight: bold; font-size: 13px; color: #1E293B;'>PT Farma Prima</div><div style='font-size: 11px; color: #64748B;'>Ingin mencantumkan<br>Shelf Life 24 bulan</div></div><div style='font-size: 24px; color: #94A3B8; font-weight: bold;'>?</div><div style='flex: 1; background: white; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🔬</div><div style='font-weight: bold; font-size: 13px; color: #1E293B;'>Uji Stabilitas</div><div style='font-size: 11px; color: #64748B;'>Harus dilakukan<br>dulu?</div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "👁️", text: "Karena BPOM ingin melihat apakah kemasan produknya menarik sebelum diizinkan beredar", correct: false, feedback: "Penampilan kemasan dinilai terpisah dari uji stabilitas. Uji stabilitas adalah tentang membuktikan kualitas produk di dalam kemasan — bukan penampilan luarnya." },
                      { id: "b", icon: "🔬", text: "Karena klaim Shelf Life harus didukung data ilmiah yang membuktikan produk masih memenuhi spesifikasi setelah 24 bulan — bukan asumsi atau tebakan", correct: true, feedback: "Tepat! Uji stabilitas adalah bukti ilmiah wajib di balik klaim Shelf Life. BPOM tidak akan mengizinkan produk beredar dengan klaim Shelf Life yang tidak didukung data terukur. Tanpa uji stabilitas, angka '24 bulan' di label hanya tebakan yang bisa membahayakan konsumen." },
                      { id: "c", icon: "💰", text: "Karena biaya produksi perlu diverifikasi sebelum harga jual bisa ditetapkan", correct: false, feedback: "Penetapan harga adalah keputusan bisnis yang terpisah dari uji stabilitas. Uji stabilitas berkaitan dengan keamanan dan kualitas produk, bukan struktur biaya." }
                    ]
                  },

                  // SLIDE 2
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Pilih jawaban yang paling tepat",
                      text: "Tim R&D PT Pangan Lestari mengambil sampel biskuit gandum setiap 3 bulan selama setahun dan mengukur kadar airnya. Di bulan ke-9, kadar air mulai mendekati batas maksimum yang memicu pertumbuhan jamur. Di bulan ke-12, batas terlampaui. Apa kesimpulan yang paling tepat dari data ini?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; font-family: monospace; font-size: 11px; margin-bottom: 12px;'><table style='width: 100%; border-collapse: collapse;'><tr style='background: #F1F5F9; border-bottom: 1px solid #CBD5E1;'><th style='padding: 6px; text-align: left;'>Waktu</th><th style='padding: 6px; text-align: center;'>Kadar Air</th><th style='padding: 6px; text-align: left;'>Status</th></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px;'>Bulan 0</td><td style='padding: 6px; text-align: center;'>2,1%</td><td style='padding: 6px; color: #16A34A;'>✓ Aman</td></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px;'>Bulan 3</td><td style='padding: 6px; text-align: center;'>2,4%</td><td style='padding: 6px; color: #16A34A;'>✓ Aman</td></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px;'>Bulan 6</td><td style='padding: 6px; text-align: center;'>2,8%</td><td style='padding: 6px; color: #16A34A;'>✓ Aman</td></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px;'>Bulan 9</td><td style='padding: 6px; text-align: center; font-weight: bold; color: #D97706;'>3,4%</td><td style='padding: 6px; color: #D97706;'>✓ Aman (mendekati batas)</td></tr><tr><td style='padding: 6px;'>Bulan 12</td><td style='padding: 6px; text-align: center; font-weight: bold; color: #DC2626;'>4,2%</td><td style='padding: 6px; color: #DC2626;'>✗ Melewati batas (≤4%)</td></tr></table><div style='background: #FEF2F2; padding: 6px; text-align: center; border-top: 1px solid #CBD5E1; font-weight: bold; color: #991B1B;'>Batas maksimum: 4,0%</div></div>"
                    },
                    options: [
                      { id: "a", icon: "📦", text: "Shelf Life biskuit ini adalah 9 bulan — titik terakhir di mana kadar air masih di bawah batas", correct: true, feedback: "Tepat! Shelf Life ditetapkan pada titik waktu terakhir di mana semua parameter masih memenuhi spesifikasi. Bulan ke-9: kadar air 3,4% masih di bawah batas 4,0% — masih aman. Bulan ke-12: 4,2% sudah melewati batas. Maka Shelf Life = 9 bulan. Bukan bulan ke-12 meski data tersedia sampai sana." },
                      { id: "b", icon: "📊", text: "Shelf Life biskuit ini adalah 12 bulan karena data tersedia sampai bulan ke-12", correct: false, feedback: "Shelf Life bukan ditentukan oleh seberapa jauh data tersedia, tapi oleh titik terakhir yang masih memenuhi spesifikasi. Di bulan ke-12, kadar air sudah melewati batas — artinya produk sudah tidak memenuhi standar keamanan, sehingga tidak bisa diklaim sebagai bagian dari Shelf Life." },
                      { id: "c", icon: "🔄", text: "Data ini belum cukup untuk menetapkan Shelf Life — harus diuji ulang dari awal", correct: false, feedback: "Data ini justru sudah cukup dan valid untuk menetapkan Shelf Life. Uji stabilitas yang menghasilkan titik kegagalan di bulan ke-12 adalah uji yang berhasil — karena sekarang tim tahu persis di mana batasnya. Tidak perlu diulang dari awal." }
                    ]
                  },

                  // SLIDE 3
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Pilih jawaban yang paling tepat",
                      text: "Sebuah label obat tetes mata mencantumkan 'Simpan pada suhu 15–25°C, terlindung dari cahaya'. Dari mana ketentuan penyimpanan ini berasal?",
                      htmlContext: "<div style='background: white; border: 2px solid #334155; border-radius: 8px; padding: 12px; margin-bottom: 12px; font-family: monospace; font-size: 11px; max-width: 250px; margin-left: auto; margin-right: auto;'><div style='font-weight: bold; font-size: 13px;'>TETES MATA STERIL</div><div>PT Indo Farma</div><div>EXP: 06/2026</div><div style='background: #FEF08A; padding: 4px; margin: 4px 0; border: 1px dashed #A16207; font-weight: bold;'>⬛ Simpan pada 15–25°C<br>💡 Terlindung dari cahaya</div><div>📦 Jauhkan dari jangkauan anak</div></div><div style='text-align: center; font-weight: bold; color: #475569; font-size: 12px; margin-bottom: 8px;'>Dari mana ketentuan ini berasal?</div>"
                    },
                    options: [
                      { id: "a", icon: "🎨", text: "Tim desain label memilih instruksi penyimpanan yang terlihat profesional dan mudah dipahami konsumen", correct: false, feedback: "Instruksi penyimpanan bukan keputusan desain — ia adalah hasil ilmiah dari uji stabilitas. Tim desain tidak bisa sembarangan memilih rentang suhu; mereka harus mencantumkan persis apa yang dibuktikan oleh data stabilitas." },
                      { id: "b", icon: "📜", text: "BPOM menetapkan instruksi penyimpanan standar yang sama untuk semua produk tetes mata", correct: false, feedback: "BPOM tidak menetapkan instruksi penyimpanan generik untuk semua produk sejenis. Setiap produk memiliki karakteristik kimia dan fisik yang berbeda, sehingga kondisi penyimpanan optimalnya pun berbeda — dan harus dibuktikan melalui uji stabilitas masing-masing produk." },
                      { id: "c", icon: "🔬", text: "Data uji stabilitas membuktikan produk hanya stabil dalam rentang suhu 15–25°C dan terdegradasi jika terpapar cahaya langsung", correct: true, feedback: "Tepat! Setiap instruksi penyimpanan di label adalah konsekuensi langsung dari data uji stabilitas. Jika label mencantumkan '15–25°C', artinya uji stabilitas menunjukkan produk mulai rusak di bawah 15°C atau di atas 25°C. Instruksi ini bukan pilihan estetika atau standar generik — ia spesifik untuk produk ini berdasarkan bukti ilmiah." }
                    ]
                  },

                  // SLIDE 4
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Pilih jawaban yang paling tepat",
                      text: "PT Vaksin Nusantara memiliki data uji stabilitas vaksin campak sampai bulan ke-18 — semua parameter memenuhi spesifikasi. Direktur pemasaran mengusulkan agar Shelf Life diklaim 24 bulan dengan alasan 'tren datanya stabil, pasti masih oke 6 bulan lagi'. Apa yang seharusnya dilakukan tim QA?",
                      htmlContext: "<div style='display: flex; gap: 8px; margin-bottom: 12px;'><div style='flex: 1; background: #FFFBEB; border: 1px solid #FDE68A; padding: 12px; border-radius: 8px; font-size: 11px;'><div style='font-size: 20px; margin-bottom: 4px;'>💼</div><div style='font-style: italic; color: #92400E;'>&quot;Data stabil sampai bulan 18. Trendnya bagus. Kita klaim saja 24 bulan — pasti masih oke!&quot;</div></div><div style='flex: 1; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 8px; font-size: 11px;'><div style='font-size: 20px; margin-bottom: 4px;'>🔬</div><div style='font-weight: bold; color: #334155;'>Tim QA</div><div style='font-size: 14px; font-weight: bold; color: #DC2626;'>???</div></div></div><div style='background: white; border: 1px solid #CBD5E1; padding: 8px; border-radius: 8px; text-align: center; font-family: monospace; font-size: 11px;'>Bulan 0 ----- 6 ----- 12 ----- 18 - - - 24<br>✅ OK      ✅ OK    ✅ OK     ✅ OK   <span style='color:red; font-weight:bold;'>❓ TANDA TANYA</span></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Setuju — tren data yang stabil cukup sebagai dasar untuk mengekstrapolasi Shelf Life lebih panjang", correct: false, feedback: "Ekstrapolasi berdasarkan tren tidak diizinkan sebagai dasar klaim Shelf Life dalam regulasi farmasi. Setiap titik klaim harus didukung data terukur. Kondisi kimiawi bisa berubah secara non-linear — tren yang 'terlihat stabil' tidak menjamin produk masih memenuhi spesifikasi di titik yang belum diuji." },
                      { id: "b", icon: "🔬", text: "Menolak — klaim Shelf Life 24 bulan harus didukung data aktual sampai bulan ke-24, bukan ekstrapolasi dari tren", correct: true, feedback: "Tepat! Tim QA harus menolak usulan ini. Klaim Shelf Life tidak boleh melebihi batas data yang tersedia — tidak ada pengecualian, tidak ada kompromi berdasarkan 'tren kelihatan bagus'. Untuk mengklaim 24 bulan, PT Vaksin Nusantara harus melanjutkan uji stabilitas sampai bulan ke-24 dan mendapatkan data aktual yang membuktikannya. Mengekstrapolasi tanpa data adalah pelanggaran regulasi yang serius untuk produk vaksin." },
                      { id: "c", icon: "🤝", text: "Kompromi — klaim 21 bulan sebagai titik tengah antara data yang ada (18 bulan) dan usulan direktur (24 bulan)", correct: false, feedback: "Tidak ada 'kompromi' dalam penetapan Shelf Life berdasarkan data ilmiah. Klaim 21 bulan pun tetap tidak valid karena data hanya tersedia sampai bulan ke-18. Satu-satunya klaim yang valid adalah 18 bulan — sesuai batas data yang ada — sampai uji lanjutan selesai." }
                    ]
                  },

                  // SLIDE 5: MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Uji Stabilitas — Dasar Ilmiah di Balik Angka Shelf Life",
                      style: {
                        background: "#064E3B",
                        color: "white",
                        borderRadius: "16px"
                      }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Apa itu uji stabilitas dan mengapa wajib?",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p><strong>Stability testing (uji stabilitas)</strong> adalah serangkaian pengujian ilmiah yang dilakukan untuk membuktikan bagaimana kualitas suatu produk berubah seiring waktu ketika disimpan dalam kondisi penyimpanan yang ditetapkan.</p><p>Tanpa uji stabilitas, angka Shelf Life di label hanyalah tebakan. Regulasi di seluruh dunia — termasuk BPOM di Indonesia — mewajibkan produsen farmasi dan pangan untuk memiliki data uji stabilitas sebelum boleh mencantumkan Shelf Life di label dan mendaftarkan produk.</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 16px 0; text-align: center; font-family: monospace; font-size: 11px;'>Produk baru  →  Uji stabilitas<br>dikembangkan    (berbulan-bulan)<br>                      ↓<br>Label produk ←  Shelf Life<br>(&quot;24 bulan&quot;)    ditetapkan<br></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500;'>📌 Uji stabilitas bukan hanya untuk menentukan berapa lama produk bertahan — ia juga menentukan kondisi penyimpanan yang harus tercantum di label dan bagaimana produk harus didistribusikan agar Shelf Life yang diklaim tetap valid.</div></div>"
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#BAE6FD", color: "#0369A1" },
                        title: "Apa yang diuji dan bagaimana caranya?",
                        color: "#0284C7",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Dalam uji stabilitas, sampel produk disimpan dalam kondisi yang dikontrol ketat, lalu diambil dan dianalisis pada interval waktu tertentu.</p><table style='width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px;'><tr style='border-bottom: 1px solid #475569;'><th style='padding: 6px; text-align: left;'>PARAMETER YANG DIUJI</th><th style='padding: 6px; text-align: left;'>CONTOH SPESIFIK</th></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 6px;'>Kandungan zat aktif</td><td style='padding: 6px;'>Kadar vitamin C: masih ≥90% dari label?</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 6px;'>Tampilan fisik</td><td style='padding: 6px;'>Warna, tekstur, ada tidak kristalisasi?</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 6px;'>Sifat fisikokimia</td><td style='padding: 6px;'>pH, viskositas, kekerasan tablet</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 6px;'>Kontaminasi mikroba</td><td style='padding: 6px;'>Jumlah bakteri, jamur masih dalam batas?</td></tr><tr><td style='padding: 6px;'>Kemasan (integritas)</td><td style='padding: 6px;'>Apakah kemasan masih melindungi produk?</td></tr></table><p>Pengambilan sampel dilakukan pada titik-titik waktu yang telah ditentukan — misalnya: bulan ke-0, 3, 6, 9, 12, 18, dan 24. Setiap titik waktu menghasilkan satu paket data. Semua paket data ini kemudian dianalisis bersama untuk menentukan kapan pertama kali ada parameter yang mulai tidak memenuhi spesifikasi — itulah batas Shelf Life.</p></div>"
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Hubungan langsung: data stabilitas → angka Shelf Life",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Cara Shelf Life ditetapkan dari data uji stabilitas:</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 12px 0; font-family: monospace; font-size: 11px;'><div style='text-align: center; font-weight: bold; margin-bottom: 8px; color: #F8FAFC;'>CONTOH: Tablet antibiotik — uji kadar zat aktif</div><table style='width: 100%; border-collapse: collapse;'><tr style='border-bottom: 1px dashed #475569;'><td style='padding: 4px;'>Waktu</td><td style='padding: 4px;'>Kadar aktif</td><td style='padding: 4px;'>Status</td></tr><tr><td style='padding: 4px;'>Bulan 0</td><td style='padding: 4px;'>102%</td><td style='padding: 4px; color: #4ADE80;'>✓ Memenuhi (min 90%)</td></tr><tr><td style='padding: 4px;'>Bulan 12</td><td style='padding: 4px;'>92%</td><td style='padding: 4px; color: #4ADE80;'>✓ Memenuhi</td></tr><tr><td style='padding: 4px;'>Bulan 18</td><td style='padding: 4px;'>88%</td><td style='padding: 4px; color: #4ADE80;'>✓ Memenuhi</td></tr><tr><td style='padding: 4px; font-weight: bold; color: #60A5FA;'>Bulan 24</td><td style='padding: 4px; font-weight: bold; color: #60A5FA;'>85%</td><td style='padding: 4px; font-weight: bold; color: #60A5FA;'>✓ Memenuhi</td></tr><tr><td style='padding: 4px; color: #F87171;'>Bulan 30</td><td style='padding: 4px; color: #F87171;'>81%</td><td style='padding: 4px; color: #F87171;'>✗ DI BAWAH BATAS (min 90%)</td></tr><tr><td style='padding: 4px; color: #F87171;'>Bulan 36</td><td style='padding: 4px; color: #F87171;'>76%</td><td style='padding: 4px; color: #F87171;'>✗ Di bawah batas</td></tr></table></div><p><strong>Kesimpulan:</strong> Shelf Life = 24 bulan (Bulan terakhir semua parameter masih memenuhi spesifikasi minimum yang ditetapkan).</p><div style='background: #F8FAFC; border-left: 4px solid #16A34A; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 12px;'>💡 Shelf Life selalu ditetapkan pada titik waktu terakhir di mana semua parameter masih memenuhi spesifikasi — bukan rata-rata, bukan perkiraan. Jika di bulan ke-24 semua masih oke tapi di bulan ke-30 ada yang gagal, maka Shelf Life adalah 24 bulan.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: TRUE/FALSE 1
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "PT Herbal Nusantara baru saja meluncurkan jamu instan tanpa melakukan uji stabilitas terlebih dahulu. Mereka mencantumkan 'Shelf Life: 12 bulan' di label berdasarkan pengalaman bertahun-tahun membuat jamu secara tradisional. Tindakan ini sudah cukup dan tidak bermasalah secara regulasi.",
                      htmlContext: "<div style='display: flex; gap: 8px; margin-bottom: 16px;'><div style='flex: 1; background: #FFFBEB; border: 1px solid #FDE68A; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>👴</div><div style='font-weight: bold; font-size: 12px; color: #92400E;'>Dasar Klaim PT Herbal</div><div style='font-size: 10px; color: #B45309; margin: 6px 0;'>Pengalaman Tradisional</div><div style='font-size: 10px; background: white; border: 1px dashed #D97706; padding: 4px; border-radius: 4px;'>Cukup sbg dasar?</div></div><div style='flex: 1; background: #EEF2FF; border: 1px solid #C7D2FE; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🔬</div><div style='font-weight: bold; font-size: 12px; color: #3730A3;'>Diminta Regulasi (BPOM)</div><div style='font-size: 10px; color: #4338CA; margin: 6px 0;'>Uji stabilitas ilmiah</div><div style='font-size: 10px; background: white; border: 1px dashed #4F46E5; padding: 4px; border-radius: 4px;'>Wajib utk klaim</div></div></div>"
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Pengalaman sudah cukup",
                        correct: false,
                        feedback: "Belum tepat. Pengalaman tradisional tidak memenuhi persyaratan regulasi sebagai dasar klaim Shelf Life. BPOM mensyaratkan data uji stabilitas yang terukur dan terdokumentasi. Produksi skala industri juga berbeda dari skala tradisional dalam hal kondisi penyimpanan, kemasan, dan eksposur."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Uji stabilitas tetap wajib",
                        correct: true,
                        feedback: "Tepat! Pengalaman tradisional tidak bisa menggantikan data uji stabilitas yang terukur. BPOM mewajibkan data stabilitas sebagai syarat registrasi produk pangan olahan dan farmasi. Tanpa data ilmiah, klaim Shelf Life tidak bisa dipertanggungjawabkan — kondisi pabrik berbeda dari industri rumahan."
                      }
                    ]
                  },

                  // SLIDE 7: TRUE/FALSE 2
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Data uji stabilitas sebuah sirup obat batuk menunjukkan bahwa pada bulan ke-18, kadar zat aktifnya masih 94% (spesifikasi minimum: 90%). Pada bulan ke-24, kadarnya turun menjadi 87%. Berdasarkan data ini, Shelf Life yang tepat untuk ditetapkan adalah 18 bulan.",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; border-radius: 8px; overflow: hidden; font-family: monospace; font-size: 11px; margin-bottom: 12px;'><table style='width: 100%; border-collapse: collapse;'><tr style='background: #F1F5F9; border-bottom: 1px solid #CBD5E1;'><th style='padding: 6px;'>Waktu</th><th style='padding: 6px;'>Kadar Aktif</th><th style='padding: 6px;'>Status</th></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px; text-align: center;'>Bln 12</td><td style='padding: 6px; text-align: center;'>97%</td><td style='padding: 6px; color: #16A34A;'>✓ Memenuhi</td></tr><tr style='border-bottom: 1px solid #E2E8F0;'><td style='padding: 6px; text-align: center;'>Bln 18</td><td style='padding: 6px; text-align: center; font-weight: bold; color: #16A34A;'>94%</td><td style='padding: 6px; color: #16A34A;'>✓ Memenuhi</td></tr><tr><td style='padding: 6px; text-align: center;'>Bln 24</td><td style='padding: 6px; text-align: center; font-weight: bold; color: #DC2626;'>87%</td><td style='padding: 6px; color: #DC2626;'>✗ Di bawah batas</td></tr></table><div style='background: #FEF2F2; padding: 6px; text-align: center; border-top: 1px solid #CBD5E1; font-weight: bold; color: #991B1B;'>Batas minimum: 90%</div></div><div style='text-align: center; font-size: 13px; font-weight: bold; color: #334155;'>Shelf Life yang tepat = ?</div>"
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "18 bulan adalah Shelf Life yang tepat",
                        correct: true,
                        feedback: "Tepat! Shelf Life ditetapkan pada titik waktu terakhir di mana semua parameter masih memenuhi spesifikasi minimum. Bulan ke-18: kadar 94% masih di atas batas minimum 90% — masih memenuhi. Bulan ke-24: kadar 87% sudah di bawah 90% — tidak memenuhi. Maka Shelf Life adalah 18 bulan — titik terakhir yang masih aman dan efektif."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Shelf Life-nya bukan 18 bulan",
                        correct: false,
                        feedback: "Belum tepat. Cara menetapkan Shelf Life: cari titik waktu terakhir di mana semua parameter masih memenuhi spesifikasi. Bulan ke-18 masih oke (94% ≥ 90%), bulan ke-24 sudah gagal (87% < 90%). Jadi Shelf Life = 18 bulan. Ini adalah prinsip dasar interpretasi data stabilitas."
                      }
                    ]
                  },

                  // SLIDE 8: TRUE/FALSE 3
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Sebuah pabrik farmasi menjalankan uji stabilitas selama 24 bulan untuk tablet antibiotik. Semua data menunjukkan hasil yang baik. Pabrik ini kemudian boleh menetapkan Shelf Life 36 bulan dengan alasan 'produknya masih terlihat stabil di bulan ke-24, jadi pasti masih bagus 12 bulan lagi'.",
                      htmlContext: "<div style='display: flex; gap: 8px; margin-bottom: 16px;'><div style='flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🏭</div><div style='font-size: 11px; color: #475569; margin-bottom: 6px;'>&quot;Data bagus s/d bulan 24 → pasti oke s/d bulan 36&quot;</div><div style='font-size: 10px; background: #FEF08A; padding: 4px; border-radius: 4px; font-weight: bold; color: #A16207;'>Logis?</div></div><div style='flex: 1; background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🔬</div><div style='font-size: 11px; color: #475569; margin-bottom: 6px;'>&quot;Shelf Life hanya bisa diklaim sampai batas data yang ada&quot;</div><div style='font-size: 10px; background: #BBF7D0; padding: 4px; border-radius: 4px; font-weight: bold; color: #166534;'>Yang benar</div></div></div>"
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Terlihat stabil = boleh klaim panjang",
                        correct: false,
                        feedback: "Belum tepat. Mengekstrapolasi Shelf Life tanpa data adalah pelanggaran serius dalam regulasi farmasi dan pangan. Klaim Shelf Life harus didukung oleh data aktual, bukan asumsi. 'Terlihat stabil' bukan pengganti data terukur — perubahan kimiawi yang tidak terlihat secara visual bisa sudah terjadi."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Hanya klaim s/d batas data",
                        correct: true,
                        feedback: "Tepat! Shelf Life tidak bisa diklaim melebihi batas data uji stabilitas yang tersedia. Jika data hanya ada sampai bulan ke-24, Shelf Life maksimal yang bisa diklaim adalah 24 bulan — tidak boleh mengekstrapolasi 'pasti masih bagus' tanpa data pendukung. Pabrik harus menguji sampai 36 bulan dulu."
                      }
                    ]
                  },

                  // SLIDE 9: TRUE/FALSE 4
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      labelColor: "#16A34A",
                      label: "Benar atau Salah?",
                      text: "Instruksi penyimpanan yang tertera di label produk — seperti 'Simpan di tempat sejuk dan kering, suhu ≤25°C' — adalah hasil langsung dari uji stabilitas, bukan keputusan desain label yang bisa ditentukan sembarangan.",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 12px; margin-bottom: 16px; font-family: monospace; font-size: 11px;'><div style='font-weight: bold; margin-bottom: 8px; color: #334155;'>🔬 Uji stabilitas:</div><div style='margin-bottom: 4px;'>Sampel A (25°C) → <span style='color: #16A34A;'>✓ Stabil 24 bulan</span></div><div style='margin-bottom: 4px;'>Sampel B (30°C) → <span style='color: #16A34A;'>✓ Stabil 18 bulan</span></div><div style='margin-bottom: 8px;'>Sampel C (40°C) → <span style='color: #DC2626;'>✗ Rusak bulan ke-6</span></div><div style='text-align: center; color: #64748B;'>↓</div><div style='text-align: center; margin: 4px 0; font-weight: bold; color: #0284C7; font-size: 10px;'>Kesimpulan data:<br>Suhu ≤25°C dibutuhkan utk stabil 24 bln</div><div style='text-align: center; color: #64748B;'>↓</div><div style='background: white; border: 1px dashed #475569; padding: 8px; margin-top: 8px; text-align: center; font-weight: bold;'>🏷️ Label: &quot;Simpan pada suhu ≤25°C&quot;</div></div>"
                    },
                    options: [
                      {
                        id: "benar",
                        icon: "✅",
                        label: "Benar",
                        subLabel: "Instruksi penyimpanan dari data uji",
                        correct: true,
                        feedback: "Tepat! Instruksi penyimpanan di label adalah hasil langsung dari uji stabilitas — bukan dekorasi atau saran tambahan. Jika data menunjukkan produk stabil 24 bulan hanya pada suhu ≤25°C, maka instruksi penyimpanan wajib mencantumkan batas suhu itu. Konsumen yang tidak mengikuti instruksi sebenarnya sedang membatalkan jaminan Shelf Life."
                      },
                      {
                        id: "salah",
                        icon: "❌",
                        label: "Salah",
                        subLabel: "Instruksi penyimpanan bebas ditentukan",
                        correct: false,
                        feedback: "Belum tepat. Instruksi penyimpanan bukan pilihan desain — ia adalah konsekuensi langsung dari data uji stabilitas. Setiap kata dalam instruksi penyimpanan ('sejuk', 'kering', 'suhu ≤25°C', 'terlindung cahaya') berkorespondensi dengan kondisi yang terbukti dari uji stabilitas mempengaruhi kualitas produk."
                      }
                    ]
                  },

                  // SLIDE 10: FINISH
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 2-N01 Selesai!",
                      insight: "Anda sudah memahami mengapa uji stabilitas adalah fondasi ilmiah di balik setiap angka Shelf Life yang tertera di label produk.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Uji stabilitas = pengujian ilmiah yang membuktikan bagaimana kualitas produk berubah seiring waktu dalam kondisi penyimpanan tertentu",
                        "Shelf Life ditetapkan pada titik waktu terakhir di mana semua parameter masih memenuhi spesifikasi minimum",
                        "Instruksi penyimpanan di label adalah hasil langsung dari uji stabilitas — bukan saran, tapi syarat berlakunya Shelf Life",
                        "Klaim Shelf Life tidak boleh melebihi batas data uji stabilitas yang tersedia — ekstrapolasi tanpa data adalah pelanggaran regulasi"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }

                  }
                ]
              },
              {
                id:       "membedakan-realtime-vs-accelerated",
                title:    "Membedakan real-time vs accelerated stability study",
                icon:     "⏱️",
                duration: "25 menit",
                slides: [
                  // SLIDE 1 (TAP/CLASSIFY)
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap kartu ke zona yang tepat",
                      text: "Klasifikasikan setiap karakteristik: milik Real-Time Study atau Accelerated Study?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-size: 14px; text-align: center;'>Berikut berbagai karakteristik dari dua metode uji stabilitas. Klasifikasikan masing-masing.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "realtime", label: "🕐 Real-Time Study", subLabel: "Disimpan dalam kondisi normal" },
                      { id: "accelerated", label: "⚡ Accelerated Study", subLabel: "Kondisi dipercepat / ekstrem" }
                    ],
                    cards: [
                      { id: "c1", icon: "🕐", text: "Sampel disimpan persis pada kondisi penyimpanan yang akan berlaku di pasaran — suhu kamar, kelembapan normal", targetZone: "realtime" },
                      { id: "c2", icon: "🔥", text: "Sampel sengaja disimpan pada suhu jauh lebih tinggi dari normal — misalnya 40°C padahal suhu penyimpanan normal 25°C", targetZone: "accelerated" },
                      { id: "c3", icon: "📅", text: "Uji berlangsung selama durasi yang sama dengan Shelf Life yang diklaim — ingin klaim 24 bulan, uji jalan 24 bulan", targetZone: "realtime" },
                      { id: "c4", icon: "⏩", text: "Memperkirakan ketahanan produk selama 2 tahun hanya dari data uji selama 6 bulan", targetZone: "accelerated" },
                      { id: "c5", icon: "✅", text: "Hasil uji ini adalah bukti langsung yang paling kuat untuk registrasi produk ke BPOM", targetZone: "realtime" },
                      { id: "c6", icon: "💧", text: "Selain suhu tinggi, kelembapan juga dinaikkan jauh di atas normal untuk mempercepat proses degradasi", targetZone: "accelerated" }
                    ],
                    feedbackCorrect: "Sempurna! Perbedaan inti: Real-Time Study menyimpan produk dalam kondisi nyata selama waktu nyata — hasilnya adalah bukti langsung. Accelerated Study menyimpan produk dalam kondisi ekstrem (suhu dan kelembapan tinggi) untuk mempercepat proses degradasi — dari situ diestimasi ketahanan di kondisi normal.",
                    feedbackWrong: "Ada yang tertukar. Real-Time = kondisi nyata, durasi nyata, bukti langsung. Accelerated = kondisi ekstrem dipercepat, durasi lebih pendek, hasil berupa estimasi. Yang membedakan bukan hanya durasi, tapi terutama kondisi penyimpanan yang digunakan."
                  },

                  // SLIDE 2 (TAP/CLASSIFY)
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap kartu ke zona yang tepat",
                      text: "Klasifikasikan setiap pernyataan: menggambarkan kelebihan atau keterbatasan dari metode yang mana?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-size: 14px; text-align: center;'>Setiap metode uji stabilitas memiliki kelebihan dan keterbatasan. Tentukan setiap pernyataan ini milik metode yang mana.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "realtime", label: "🕐 Real-Time Study", subLabel: "Bukti pasti, tapi lama" },
                      { id: "accelerated", label: "⚡ Accelerated Study", subLabel: "Cepat, tapi estimasi" }
                    ],
                    cards: [
                      { id: "c1", icon: "✅", text: "Kelebihan: Hasilnya mencerminkan kondisi penyimpanan yang sesungguhnya dialami produk di rak toko dan di tangan konsumen", targetZone: "realtime" },
                      { id: "c2", icon: "✅", text: "Kelebihan: Bisa memberikan estimasi Shelf Life dalam hitungan bulan — sangat berguna saat produk baru perlu didaftarkan segera", targetZone: "accelerated" },
                      { id: "c3", icon: "⚠️", text: "Keterbatasan: Butuh waktu bertahun-tahun — tidak cocok jika perusahaan perlu data cepat untuk keperluan registrasi atau peluncuran produk", targetZone: "realtime" },
                      { id: "c4", icon: "⚠️", text: "Keterbatasan: Hasilnya adalah estimasi, bukan bukti langsung — kondisi ekstrem di laboratorium tidak selalu memprediksi degradasi nyata dengan akurat", targetZone: "accelerated" },
                      { id: "c5", icon: "✅", text: "Kelebihan: Regulasi seperti BPOM dan ICH menerimanya sebagai bukti definitif dan tidak memerlukan konfirmasi tambahan", targetZone: "realtime" },
                      { id: "c6", icon: "⚠️", text: "Keterbatasan: Tidak cocok untuk semua jenis produk — beberapa produk seperti protein biologis dan vaksin tidak mengikuti pola degradasi yang bisa dipercepat secara linear", targetZone: "accelerated" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan trade-off yang jelas: Real-Time memberikan bukti definitif tapi butuh waktu lama. Accelerated memberikan hasil cepat tapi hanya estimasi dan tidak valid untuk semua jenis produk — terutama produk biologis kompleks seperti vaksin dan protein terapeutik.",
                    feedbackWrong: "Ada yang tertukar. Bayangkan trade-off utamanya: waktu vs kepastian. Real-Time butuh waktu lama tapi hasilnya definitif. Accelerated cepat tapi hanya estimasi dengan keterbatasan untuk produk tertentu."
                  },

                  // SLIDE 3 (TAP/CLASSIFY)
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap kartu ke zona yang tepat",
                      text: "Klasifikasikan setiap kondisi pengujian: digunakan dalam Real-Time Study atau Accelerated Study?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-size: 14px; text-align: center;'>PT Farma Prima sedang merancang uji stabilitas untuk dua produk: tablet antibiotik dan krim antiseptik. Berikut berbagai kondisi penyimpanan yang akan digunakan dalam pengujian.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "realtime", label: "🕐 Real-Time Study", subLabel: "Kondisi penyimpanan aktual" },
                      { id: "accelerated", label: "⚡ Accelerated Study", subLabel: "Kondisi stres intensif" }
                    ],
                    cards: [
                      { id: "c1", icon: "🌡️", text: "Suhu 25°C ± 2°C, Kelembapan Relatif 60% ± 5% — kondisi iklim zona II (sesuai ICH Q1A)", targetZone: "realtime" },
                      { id: "c2", icon: "🔥", text: "Suhu 40°C ± 2°C, Kelembapan Relatif 75% ± 5% — kondisi stres untuk mempercepat degradasi", targetZone: "accelerated" },
                      { id: "c3", icon: "❄️", text: "Suhu 5°C ± 3°C — kondisi penyimpanan normal untuk produk yang harus disimpan di kulkas", targetZone: "realtime" },
                      { id: "c4", icon: "☀️", text: "Paparan cahaya intensitas tinggi (ICH Q1B) — untuk mempercepat uji fotostabilitas dalam waktu singkat", targetZone: "accelerated" },
                      { id: "c5", icon: "🌡️", text: "Suhu 30°C ± 2°C, Kelembapan Relatif 65% ± 5% — kondisi iklim zona IVb (tropis, termasuk Indonesia)", targetZone: "realtime" },
                      { id: "c6", icon: "💧", text: "Suhu 40°C ± 2°C dengan siklus freeze-thaw berulang — mensimulasikan kondisi distribusi buruk secara dipercepat", targetZone: "accelerated" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan kartu 5 — kondisi 30°C/65% RH adalah kondisi zona IVb yang wajib digunakan untuk uji Real-Time produk yang beredar di negara tropis seperti Indonesia. Jika produsen hanya melakukan uji di kondisi Eropa (25°C/60% RH) dan produknya dijual di Indonesia, data stabilitasnya mungkin tidak valid untuk kondisi nyata di sini.",
                    feedbackWrong: "Ada yang tertukar. Kondisi Real-Time mencerminkan suhu dan kelembapan yang sesungguhnya dialami produk saat beredar — termasuk kondisi tropis untuk Indonesia. Kondisi Accelerated selalu jauh lebih ekstrem dari kondisi nyata penyimpanan."
                  },

                  // SLIDE 4 (TAP/CLASSIFY)
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap kartu ke zona yang tepat",
                      text: "Klasifikasikan setiap situasi: menggambarkan penggunaan Real-Time Study atau Accelerated Study?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #CBD5E1; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-size: 14px; text-align: center;'>Berikut berbagai situasi dari pabrik farmasi dan pangan yang menggambarkan kapan dan bagaimana masing-masing metode digunakan.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "realtime", label: "🕐 Real-Time Study", subLabel: "Konfirmasi & Monitoring" },
                      { id: "accelerated", label: "⚡ Accelerated Study", subLabel: "Screening & Estimasi awal" }
                    ],
                    cards: [
                      { id: "c1", icon: "📅", text: "PT Nutrisi Prima membutuhkan data untuk registrasi BPOM dalam 6 bulan — tim memilih uji yang bisa memberikan estimasi Shelf Life 2 tahun dalam waktu tersebut", targetZone: "accelerated" },
                      { id: "c2", icon: "🏆", text: "PT Farma Andal menyerahkan laporan uji yang menunjukkan produknya stabil selama 36 bulan berturut-turut — data ini langsung diterima BPOM sebagai bukti definitif", targetZone: "realtime" },
                      { id: "c3", icon: "🔬", text: "Tim R&D menggunakan data dari 6 bulan pengujian kondisi ekstrem untuk memperkirakan apakah formulasi baru layak dilanjutkan ke tahap pengembangan berikutnya", targetZone: "accelerated" },
                      { id: "c4", icon: "📋", text: "Setelah produk beredar, produsen tetap menyimpan sampel pada kondisi normal selama 24 bulan untuk mengkonfirmasi bahwa klaim Shelf Life di label memang valid", targetZone: "realtime" },
                      { id: "c5", icon: "⚡", text: "Dalam fase screening formulasi, tim membandingkan 5 kandidat formula dengan mengeksposnya pada kondisi stres selama 4 minggu untuk melihat mana yang paling stabil", targetZone: "accelerated" },
                      { id: "c6", icon: "🌍", text: "Untuk produk yang akan diekspor ke negara tropis, sampel disimpan pada 30°C/65% RH selama 12 bulan untuk membuktikan ketahanannya di kondisi nyata tujuan ekspor", targetZone: "realtime" }
                    ],
                    feedbackCorrect: "Sempurna! Kartu 4 memperkenalkan sesuatu yang penting: uji Real-Time sering berlanjut bahkan setelah produk sudah beredar di pasar. Ini disebut on-going stability study — kewajiban regulasi untuk memastikan klaim Shelf Life tetap valid sepanjang produk masih diproduksi. Uji stabilitas bukan satu kali saja di awal.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan tujuan penggunaan: Accelerated digunakan saat butuh data cepat — screening formula, estimasi awal, registrasi mendesak. Real-Time digunakan untuk konfirmasi definitif, pembuktian ke regulator, dan on-going monitoring setelah produk beredar."
                  },

                  // SLIDE 5: MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Real-Time vs Accelerated Stability Study — Kapan dan Mengapa",
                      style: {
                        background: "#064E3B",
                        color: "white",
                        borderRadius: "16px"
                      }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Prinsip dasar masing-masing metode",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p><strong>Real-Time Stability Study</strong> adalah uji stabilitas yang menyimpan produk dalam kondisi penyimpanan yang sesungguhnya akan dialami produk di pasaran — dan memantaunya selama durasi yang sama dengan Shelf Life yang diklaim.</p><p><strong>Accelerated Stability Study</strong> adalah uji yang menyimpan produk dalam kondisi yang jauh lebih ekstrem (suhu dan kelembapan lebih tinggi) untuk mempercepat proses degradasi kimia dan fisik, sehingga estimasi ketahanan jangka panjang bisa diperoleh dalam waktu yang lebih singkat.</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 16px 0;'><table style='width: 100%; border-collapse: collapse; font-family: monospace; font-size: 12px; text-align: left;'><tr style='border-bottom: 2px solid #475569;'><th style='padding: 6px;'></th><th style='padding: 6px; color: #4ADE80;'>REAL-TIME</th><th style='padding: 6px; color: #F87171;'>ACCELERATED</th></tr><tr><td style='padding: 6px;'>Suhu</td><td style='padding: 6px;'>25°C atau 30°C</td><td style='padding: 6px;'>40°C</td></tr><tr><td style='padding: 6px;'>Kelembapan</td><td style='padding: 6px;'>60% atau 65% RH</td><td style='padding: 6px;'>75% RH</td></tr><tr><td style='padding: 6px;'>Durasi uji</td><td style='padding: 6px;'>= Shelf Life yang diklaim</td><td style='padding: 6px;'>Lebih pendek (biasanya 6 bln)</td></tr><tr><td style='padding: 6px;'>Hasilnya</td><td style='padding: 6px;'>Bukti langsung</td><td style='padding: 6px;'>Estimasi</td></tr></table></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500;'>📌 Prinsip Accelerated Study menggunakan Arrhenius equation — hukum kimia yang menyatakan bahwa setiap kenaikan suhu 10°C kira-kira menggandakan kecepatan reaksi kimia. Jadi 6 bulan di 40°C diperkirakan setara dengan ~24 bulan di 25°C. Tapi ini adalah perkiraan, bukan kepastian.</div></div>"
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#BAE6FD", color: "#0369A1" },
                        title: "Kapan masing-masing digunakan?",
                        color: "#0284C7",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Dalam praktik industri, kedua metode tidak bersaing — mereka saling melengkapi. Berikut pola penggunaannya:</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 16px 0; font-family: monospace; font-size: 11px; white-space: pre; overflow-x: auto;'>FASE PENGEMBANGAN PRODUK\n────────────────────────────────────────────────────────────\nFormulasi  →  Screening  →  Registrasi  →  Beredar  →  Monitoring\n   baru         formula      BPOM           di pasar    berkelanjutan\n\n                  ↑              ↑               ↑            ↑\n             Accelerated    Accelerated      Real-Time    Real-Time\n             (pilih formula  (data awal      (konfirmasi  (on-going\n             terbaik, cepat) sambil tunggu   definitif)   stability)\n                            real-time)</div><p><strong>Accelerated digunakan untuk:</strong><br/>Screening formula di tahap awal, mendapatkan data awal untuk registrasi sementara, memperkirakan Shelf Life sebelum data Real-Time tersedia.</p><p><strong>Real-Time digunakan untuk:</strong><br/>Konfirmasi definitif Shelf Life, bukti utama untuk registrasi penuh, on-going stability monitoring setelah produk beredar.</p></div>"
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Keterbatasan kritis Accelerated Study",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Accelerated Study bukan solusi ajaib — ada keterbatasan penting yang harus dipahami:</p><div style='display: flex; flex-direction: column; gap: 12px; margin-top: 12px;'><div><strong>⚠️ Hanya estimasi, bukan kepastian:</strong><br/>Accelerated Study menghasilkan perkiraan, bukan bukti langsung. Regulasi seperti ICH mensyaratkan Real-Time Study sebagai konfirmasi akhir — Accelerated tidak bisa sepenuhnya menggantikannya.</div><div><strong>⚗️ Tidak valid untuk semua produk:</strong><br/>Produk biologis seperti vaksin, antibodi monoklonal, dan insulin tidak mengikuti pola degradasi Arrhenius yang linear. Suhu tinggi bisa merusak struktur protein dengan cara yang berbeda dari yang terjadi di kondisi normal. Untuk produk ini, Accelerated Study sangat terbatas validitasnya.</div><div><strong>📦 Kemasan bisa berperilaku berbeda:</strong><br/>Interaksi antara produk dan kemasan di suhu ekstrem bisa berbeda dari kondisi normal. Migrasi plasticizer dari kemasan plastik, misalnya, bisa lebih cepat di 40°C tapi tidak proporsional dengan 25°C.</div><div><strong>🔄 Tetap harus dikonfirmasi Real-Time:</strong><br/>BPOM dan ICH menerima data Accelerated untuk registrasi awal, tapi produsen tetap wajib melanjutkan Real-Time Study dan menyerahkan datanya saat tersedia. Jika Real-Time data nantinya tidak mendukung klaim yang dibuat berdasarkan Accelerated, Shelf Life harus direvisi.</div></div><div style='background: #F8FAFC; border-left: 4px solid #16A34A; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 16px;'>💡 Dalam praktik industri, produsen yang baik selalu menjalankan keduanya secara paralel: Accelerated untuk keperluan cepat, Real-Time untuk konfirmasi jangka panjang. Keduanya bukan pilihan — keduanya kewajiban.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6 (MCQ)
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih pendekatan yang paling tepat",
                      text: "PT Farma Baru harus mendaftarkan produk obat sakit kepala baru ke BPOM dalam 8 bulan. Data Real-Time mereka baru berjalan 4 bulan. Apa yang paling tepat dilakukan?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 13px; text-align: center; margin-bottom: 12px;'><div style='display: flex; justify-content: space-between; position: relative;'><span>Sekarang</span><span>8 bulan lagi</span></div><div style='display: flex; justify-content: space-between; position: relative;'><span>│</span><span>│</span></div><div style='display: flex; justify-content: space-between; position: relative;'><span style='background: #E2E8F0; padding: 4px; border-radius: 4px;'>[Real-Time<br>baru 4 bln]</span><span style='background: #FECACA; padding: 4px; border-radius: 4px; color: #991B1B;'>[Deadline<br>BPOM]</span></div><div style='display: flex; justify-content: space-between; position: relative;'><span>│</span><span>│</span></div><div style='position: relative;'><div style='border-top: 1px dashed #94A3B8; position: absolute; left: 0; right: 0; top: 10px;'></div><div style='display: flex; justify-content: center; position: relative; z-index: 1;'><span style='background: white; padding: 0 8px; color: #64748B;'>4 bulan</span></div></div><div style='margin-top: 8px;'>↑<br><span style='font-weight: bold; color: #DC2626;'>Real-Time belum selesai</span></div></div><div style='text-align: center; font-weight: bold; color: #1E293B;'>Deadline registrasi tidak bisa diundur. Apa yang harus dilakukan?</div>"
                    },
                    options: [
                      { id: "a", icon: "⏸️", text: "Tunda pendaftaran sampai Real-Time Study selesai — tidak ada jalan pintas untuk keamanan produk", correct: false, feedback: "Menunda registrasi memang aman secara saintifik, tapi tidak realistis — dan sebenarnya tidak perlu. Regulasi memang mengizinkan penggunaan data Accelerated untuk registrasi awal, justru untuk situasi seperti ini. Yang penting: Real-Time Study tetap harus dijalankan dan dilaporkan." },
                      { id: "b", icon: "⚡", text: "Gunakan data Accelerated Study yang sudah disiapkan paralel sebagai data awal untuk registrasi, sambil tetap melanjutkan Real-Time Study untuk konfirmasi", correct: true, feedback: "Tepat! Ini adalah praktik industri yang lazim dan diizinkan regulasi: gunakan data Accelerated untuk registrasi awal, tapi tetap wajib melanjutkan Real-Time Study. Saat Real-Time data tersedia, diserahkan ke BPOM sebagai konfirmasi. Jika Real-Time data nantinya tidak mendukung klaim, Shelf Life harus direvisi. Kuncinya: Accelerated dan Real-Time harus berjalan paralel sejak awal, bukan Accelerated menggantikan Real-Time." },
                      { id: "c", icon: "📋", text: "Daftarkan produk tanpa data stabilitas apapun dan jelaskan ke BPOM bahwa datanya menyusul", correct: false, feedback: "Mendaftarkan produk tanpa data stabilitas sama sekali tidak mungkin diizinkan BPOM. Data stabilitas adalah syarat wajib registrasi — minimal data Accelerated Study harus tersedia." }
                    ]
                  },

                  // SLIDE 7 (MCQ)
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih pendekatan yang paling tepat",
                      text: "Tim R&D PT Nutrisi Prima sedang mengembangkan 6 kandidat formula biskuit baru. Mereka ingin memilih 1–2 formula terbaik untuk dikembangkan lebih lanjut. Anggaran dan waktu terbatas. Metode uji stabilitas mana yang paling tepat untuk tahap ini?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 12px;'><div style='display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px;'><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula A]</div><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula B]</div><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula C]</div><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula D]</div><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula E]</div><div style='background: #F1F5F9; border: 1px solid #94A3B8; border-radius: 4px; padding: 4px;'>[Formula F]</div></div><div style='font-size: 20px; color: #64748B;'>↓</div><div style='font-weight: bold; color: #0284C7; margin-bottom: 4px;'>Pilih 1–2 terbaik</div><div style='color: #DC2626; font-size: 12px; font-weight: bold;'>⚠️ Anggaran & waktu terbatas</div></div><div style='text-align: center; font-weight: bold; color: #1E293B;'>Dari 6 kandidat, perlu dipilih yang paling stabil. Metode mana yang dipakai?</div>"
                    },
                    options: [
                      { id: "a", icon: "🕐", text: "Real-Time Study untuk semua 6 formula — hasilnya paling akurat untuk membuat keputusan yang tepat", correct: false, feedback: "Real-Time Study untuk 6 formula sekaligus akan memakan waktu bertahun-tahun dan biaya sangat besar — tidak efisien untuk tahap screening. Real-Time Study lebih tepat digunakan setelah formula sudah dipersempit ke 1–2 kandidat final." },
                      { id: "b", icon: "⚡", text: "Accelerated Study untuk semua 6 formula — hasil cepat, cukup untuk screening awal di tahap ini", correct: true, feedback: "Tepat! Accelerated Study adalah pilihan ideal untuk screening formula. Dalam hitungan minggu hingga bulan, tim bisa melihat formula mana yang paling tahan terhadap kondisi stres — sebagai indikator awal stabilitas jangka panjang. Menjalankan Real-Time Study pada 6 formula sekaligus tidak realistis dari segi waktu dan biaya. Setelah 1–2 formula terpilih, barulah Real-Time Study dijalankan untuk konfirmasi." },
                      { id: "c", icon: "🎲", text: "Pilih formula berdasarkan pengalaman tim R&D tanpa uji stabilitas di tahap ini — uji stabilitas baru dilakukan setelah formula final dipilih", correct: false, feedback: "Memilih formula tanpa data uji sama sekali di tahap ini berisiko — bisa saja formula yang dipilih ternyata sangat tidak stabil dan baru ketahuan setelah investasi pengembangan yang besar sudah dikeluarkan. Accelerated Study di tahap screening justru menghemat waktu dan biaya jangka panjang." }
                    ]
                  },

                  // SLIDE 8 (MCQ)
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih pendekatan yang paling tepat",
                      text: "PT Bio Farma sedang mengembangkan vaksin baru. Tim ingin menggunakan Accelerated Study untuk menetapkan Shelf Life vaksin secara definitif karena lebih cepat. Apa yang perlu dipahami tim sebelum mengambil keputusan ini?",
                      htmlContext: "<div style='display: flex; gap: 8px; margin-bottom: 12px;'><div style='flex: 1; background: #FFF7ED; border: 1px solid #FFEDD5; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-weight: bold; color: #9A3412; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;'>Rencana tim</div><div style='font-size: 24px; margin-bottom: 4px;'>⚡</div><div style='font-weight: bold; color: #1E293B;'>Accelerated Study</div><div style='font-size: 11px; color: #64748B; margin-bottom: 8px;'>Cepat, estimasi 2 thn<br>dari 6 bln data</div><div style='background: #FEF08A; border: 1px dashed #D97706; padding: 4px; border-radius: 4px; font-weight: bold; color: #A16207; font-size: 10px;'>Apakah tepat untuk vaksin?</div></div><div style='flex: 1; background: #F0FDF4; border: 1px solid #BBF7D0; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-weight: bold; color: #166534; font-size: 11px; margin-bottom: 8px; text-transform: uppercase;'>Karakteristik vaksin</div><div style='font-size: 24px; margin-bottom: 4px;'>💉</div><div style='font-weight: bold; color: #1E293B;'>Produk biologis kompleks</div><div style='font-size: 11px; color: #64748B; margin-bottom: 8px;'>Protein, virus dilemahkan,<br>adjuvan</div><div style='background: #FECACA; border: 1px dashed #DC2626; padding: 4px; border-radius: 4px; font-weight: bold; color: #991B1B; font-size: 10px;'>Ikuti hukum Arrhenius?</div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Lanjutkan rencana — Accelerated Study berlaku universal untuk semua jenis produk farmasi termasuk vaksin", correct: false, feedback: "Accelerated Study tidak berlaku universal. Untuk produk biologis seperti vaksin, protein terapeutik, dan antibodi monoklonal, metode ini sangat terbatas validitasnya. Degradasi protein di suhu ekstrem mengikuti jalur yang berbeda dari kondisi penyimpanan normal." },
                      { id: "b", icon: "⚠️", text: "Pertimbangkan ulang — vaksin adalah produk biologis yang struktur proteinnya bisa rusak secara berbeda di suhu ekstrem, sehingga Accelerated Study tidak bisa diandalkan sebagai dasar klaim Shelf Life definitif", correct: true, feedback: "Tepat! Vaksin adalah produk biologis yang sangat berbeda dari obat kimia. Protein dan virus yang dilemahkan dalam vaksin tidak mengikuti degradasi Arrhenius yang linear — paparan suhu tinggi bisa merusak struktur 3D protein dengan cara yang tidak proporsional dengan degradasi di suhu normal. Untuk vaksin, Real-Time Study dalam kondisi cold chain (2–8°C) adalah satu-satunya cara yang valid untuk menetapkan Shelf Life secara definitif." },
                      { id: "c", icon: "🔄", text: "Gunakan Accelerated Study tapi naikkan suhunya lebih tinggi lagi agar hasilnya lebih cepat dan lebih akurat", correct: false, feedback: "Menaikkan suhu lebih tinggi justru semakin tidak valid untuk produk biologis — semakin jauh dari kondisi nyata, semakin tidak bisa diekstrapolasi. Untuk vaksin, solusinya bukan mengubah parameter Accelerated Study, tapi mengakui bahwa Real-Time Study adalah pendekatan yang tepat." }
                    ]
                  },

                  // SLIDE 9 (MCQ)
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih pendekatan yang paling tepat",
                      text: "PT Farma Prima sudah mendapatkan izin edar untuk tablet antibiotiknya berdasarkan data Accelerated Study. Produk sudah beredar di pasaran 1 tahun. Real-Time Study yang berjalan paralel kini menunjukkan data yang mengejutkan: di bulan ke-18, kadar zat aktif turun lebih cepat dari yang diprediksi Accelerated Study. Apa yang harus dilakukan?",
                      htmlContext: "<div style='background: #1E293B; border: 1px solid #334155; padding: 16px; border-radius: 12px; font-family: monospace; font-size: 12px; margin-bottom: 12px; color: #F8FAFC;'><div style='color: #94A3B8; margin-bottom: 4px;'>Prediksi dari Accelerated:</div><div style='margin-bottom: 12px;'>Bulan 18 → kadar aktif ~92% → <span style='color: #4ADE80;'>masih oke</span></div><div style='color: #94A3B8; margin-bottom: 4px;'>Kenyataan Real-Time:</div><div style='margin-bottom: 12px;'>Bulan 18 → kadar aktif ~84% → <span style='color: #F87171; font-weight: bold;'>di bawah batas 90%!</span></div><div style='text-align: center; color: #FBBF24;'>↑<br>Berbeda dari prediksi</div></div><div style='text-align: center; font-weight: bold; color: #1E293B;'>Produk sudah di pasaran. Real-Time data berbeda dari prediksi Accelerated. Apa yang dilakukan?</div>"
                    },
                    options: [
                      { id: "a", icon: "🙈", text: "Abaikan data Real-Time yang baru — produk sudah beredar dan konsumen tidak mengeluh", correct: false, feedback: "Mengabaikan data Real-Time yang menunjukkan kegagalan adalah pelanggaran regulasi serius. Produsen bertanggung jawab atas keamanan dan efektivitas produk selama masih beredar di pasaran. 'Tidak ada keluhan' bukan standar keamanan yang valid — terutama untuk antibiotik yang ketidakefektifannya bisa menyebabkan resistensi bakteri." },
                      { id: "b", icon: "📋", text: "Laporkan temuan ke BPOM dan revisi Shelf Life berdasarkan data Real-Time yang lebih akurat — ini mungkin berarti menarik produk dengan tanggal kedaluwarsa yang terlalu jauh", correct: true, feedback: "Tepat! Ini adalah situasi yang justru membuktikan mengapa Real-Time Study tidak bisa diabaikan. Ketika Real-Time data menunjukkan perbedaan signifikan dari prediksi Accelerated, produsen wajib melaporkan ke regulator dan merevisi Shelf Life sesuai data yang lebih akurat. Konsumen yang tidak mengeluh bukan berarti produknya aman — mereka mungkin tidak menyadari bahwa obatnya sudah tidak efektif pada dosis yang tertera." },
                      { id: "c", icon: "🔄", text: "Jalankan ulang Accelerated Study dengan kondisi yang berbeda untuk mendapatkan prediksi yang sesuai dengan klaim awal", correct: false, feedback: "Menjalankan ulang Accelerated Study untuk 'mencocokkan' klaim awal adalah manipulasi data ilmiah — pelanggaran integritas saintifik dan regulasi yang sangat serius. Data Real-Time yang ada justru lebih akurat dari Accelerated — bukan sebaliknya. Real-Time adalah ground truth yang harus diterima." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 2-N02 Selesai!",
                      insight: "Anda sudah memahami perbedaan, kelebihan, dan keterbatasan Real-Time vs Accelerated Stability Study — dan kapan masing-masing digunakan.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Real-Time = kondisi nyata, durasi nyata, bukti definitif tapi butuh waktu lama",
                        "Accelerated = kondisi ekstrem, durasi pendek, estimasi cepat tapi hanya perkiraan dan tidak valid untuk semua produk",
                        "Accelerated tidak berlaku untuk produk biologis (vaksin, protein) yang degradasinya tidak mengikuti pola linear",
                        "Keduanya wajib berjalan paralel — Accelerated untuk keperluan cepat, Real-Time untuk konfirmasi definitif yang tidak bisa digantikan"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "faktor-yang-memengaruhi-shelf-life",
                title:    "Mengidentifikasi faktor yang memengaruhi Shelf Life",
                icon:     "🔍",
                duration: "25 menit",
                slides: [
                  // SLIDE 1 (TAP/CLASSIFY) - SUHU
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "🌡️ FAKTOR: SUHU",
                      text: "Klasifikasikan setiap pernyataan di bawah ini berdasarkan pengaruh suhu terhadap Shelf Life."
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "suhu", label: "🌡️ Pengaruh Suhu", subLabel: "Berkaitan dengan suhu sebagai faktor" },
                      { id: "bukanFaktor", label: "❌ Bukan Pengaruh Suhu", subLabel: "Faktor lain atau bukan faktor" }
                    ],
                    cards: [
                      { id: "c1", icon: "🔥", text: "Antibiotik yang disimpan di dalam mobil parkir di bawah terik matahari seharian mengalami degradasi zat aktif lebih cepat dari yang tersimpan di apotek ber-AC", targetZone: "suhu" },
                      { id: "c2", icon: "🧊", text: "Es krim yang disimpan pada -18°C memiliki Shelf Life 12 bulan, tapi jika freezer sering dibuka-tutup sehingga suhunya naik ke -10°C, Shelf Life turun drastis", targetZone: "suhu" },
                      { id: "c3", icon: "💧", text: "Biskuit yang kemasannya berlubang menyerap uap air dari udara dan menjadi lembek dalam 2 hari", targetZone: "bukanFaktor" },
                      { id: "c4", icon: "🌡️", text: "Setiap kenaikan suhu 10°C kira-kira menggandakan kecepatan reaksi kimia yang merusak produk", targetZone: "suhu" },
                      { id: "c5", icon: "☀️", text: "Minyak zaitun yang botolnya bening terpapar cahaya matahari langsung di rak toko berubah tengik lebih cepat", targetZone: "bukanFaktor" },
                      { id: "c6", icon: "🔄", text: "Vaksin yang sempat terpapas suhu 25°C selama 4 jam saat distribusi kehilangan sebagian potensi protektifnya", targetZone: "suhu" }
                    ],
                    feedbackCorrect: "Sempurna! Suhu adalah faktor paling kritis dalam Shelf Life — setiap kenaikan 10°C kira-kira menggandakan kecepatan kerusakan. Tapi perhatikan kartu 3 dan 5: biskuit yang lembek karena kelembapan, dan minyak tengik karena cahaya, adalah contoh faktor lain yang akan kita pelajari di soal berikutnya.",
                    feedbackWrong: "Ada yang tertukar. Fokus pada suhu: apakah pernyataan ini menggambarkan suhu yang terlalu tinggi atau perubahan suhu sebagai penyebab kerusakan? Kartu 3 berkaitan dengan kelembapan (uap air), kartu 5 berkaitan dengan cahaya — keduanya faktor berbeda dari suhu."
                  },

                  // SLIDE 2 (TAP/CLASSIFY) - KELEMBAPAN
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#2563EB",
                      label: "💧 FAKTOR: KELEMBAPAN",
                      text: "Klasifikasikan setiap pernyataan di bawah ini berdasarkan pengaruh kelembapan terhadap Shelf Life."
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "kelembapan", label: "💧 Pengaruh Kelembapan", subLabel: "Uap air sebagai penyebab kerusakan" },
                      { id: "bukanFaktor", label: "❌ Bukan Pengaruh Kelembapan", subLabel: "Faktor lain atau bukan faktor" }
                    ],
                    cards: [
                      { id: "c1", icon: "💊", text: "Tablet salut yang disimpan di kamar mandi (area lembap) mulai lengket satu sama lain setelah seminggu karena lapisan salutnya menyerap air", targetZone: "kelembapan" },
                      { id: "c2", icon: "🧂", text: "Garam dapur yang disimpan di dekat kompor menggumpal karena uap air dari masakan menempel di kristal garam", targetZone: "kelembapan" },
                      { id: "c3", icon: "🔥", text: "Sirup obat batuk yang lupa ditutup rapat di mobil yang terparkir di bawah sinar matahari berubah warnanya menjadi lebih gelap", targetZone: "bukanFaktor" },
                      { id: "c4", icon: "🍪", text: "Kue kering yang terbuat dari tepung dan mentega menjadi bau tengik setelah 3 bulan di suhu kamar meski kemasannya tidak berlubang", targetZone: "bukanFaktor" },
                      { id: "c5", icon: "🧪", text: "Serbuk antibiotik yang disimpan di daerah pesisir pantai (udara sangat lembap) mengalami hidrolisis lebih cepat dari yang disimpan di daerah pegunungan", targetZone: "kelembapan" },
                      { id: "c6", icon: "📦", text: "Kemasan aluminium foil dirancang untuk produk biskuit agar uap air dari luar tidak bisa masuk dan memengaruhi kerenyahan", targetZone: "kelembapan" }
                    ],
                    feedbackCorrect: "Tepat! Kelembapan merusak produk melalui dua mekanisme utama: fisik (tablet lengket, garam menggumpal, biskuit melempem) dan kimia (hidrolisis — reaksi antara zat aktif dengan air yang merusaknya). Kartu 6 memperlihatkan bahwa kemasan aluminium foil dirancang khusus untuk menahan kelembapan — ini bukan kebetulan, tapi hasil uji stabilitas.",
                    feedbackWrong: "Ada yang tertukar. Fokus pada kelembapan: apakah uap air atau kandungan air menjadi penyebab kerusakan? Kartu 3 menggambarkan kerusakan akibat panas (suhu). Kartu 4 menggambarkan kerusakan akibat oksidasi lemak — faktor formulasi dan paparan udara."
                  },

                  // SLIDE 3 (TAP/CLASSIFY) - CAHAYA
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#D97706",
                      label: "☀️ FAKTOR: CAHAYA",
                      text: "Klasifikasikan setiap pernyataan di bawah ini berdasarkan pengaruh cahaya terhadap Shelf Life."
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "cahaya", label: "☀️ Pengaruh Cahaya", subLabel: "Cahaya sebagai pemicu kerusakan" },
                      { id: "bukanFaktor", label: "❌ Bukan Pengaruh Cahaya", subLabel: "Faktor lain atau bukan faktor" }
                    ],
                    cards: [
                      { id: "c1", icon: "🟤", text: "Botol obat tetes mata dibuat dari kaca atau plastik berwarna cokelat/amber — warna ini menyerap dan memblokir sinar UV", targetZone: "cahaya" },
                      { id: "c2", icon: "💊", text: "Tablet nifedipin (obat jantung) yang terpapar cahaya lampu selama 2 minggu mengalami perubahan warna dari kuning menjadi oranye gelap — tanda degradasi fotokimia", targetZone: "cahaya" },
                      { id: "c3", icon: "💧", text: "Bedak tabur yang tersimpan di kamar mandi bergumpal karena menyerap uap air dari shower", targetZone: "bukanFaktor" },
                      { id: "c4", icon: "☀️", text: "Minyak goreng kemasan bening yang diletakkan di dekat jendela menjadi lebih cepat berbau tengik dibanding yang disimpan dalam lemari gelap", targetZone: "cahaya" },
                      { id: "c5", icon: "🔥", text: "Cokelat yang disimpan di mobil siang hari meleleh dan berubah tekstur — terjadi fat bloom saat mengeras kembali", targetZone: "bukanFaktor" },
                      { id: "c6", icon: "📦", text: "Label obat-obatan sering mencantumkan 'Terlindung dari cahaya' atau 'Simpan di tempat gelap' sebagai instruksi penyimpanan wajib", targetZone: "cahaya" }
                    ],
                    feedbackCorrect: "Tepat! Cahaya — terutama UV — memicu reaksi fotodegradasi yang merusak zat aktif (tablet nifedipin berubah warna) dan mengoksidasi lemak (minyak tengik). Dua hal penting: botol gelap dan instruksi 'terlindung dari cahaya' di label adalah hasil langsung dari uji stabilitas fotodegradasi yang membuktikan produk rusak saat terpapar cahaya.",
                    feedbackWrong: "Ada yang tertukar. Fokus pada cahaya sebagai pemicunya: apakah cahaya UV atau sinar langsung yang menyebabkan kerusakan? Bedak bergumpal (kartu 3) adalah kelembapan. Cokelat meleleh (kartu 5) adalah suhu — panas dari matahari, bukan cahaya itu sendiri."
                  },

                  // SLIDE 4 (TAP/CLASSIFY) - KEMASAN & FORMULASI
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#7C3AED",
                      label: "📦 FAKTOR: KEMASAN & FORMULASI",
                      text: "Klasifikasikan setiap pernyataan di bawah ini berdasarkan peran kemasan atau formulasi terhadap Shelf Life."
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "kemasan", label: "📦 Kemasan & Formulasi", subLabel: "Desain produk dan pelindungnya" },
                      { id: "bukanFaktor", label: "❌ Bukan Kemasan/Formulasi", subLabel: "Faktor eksternal lain" }
                    ],
                    cards: [
                      { id: "c1", icon: "📦", text: "Biskuit yang dikemas dengan nitrogen flushing (udara dalam kemasan diganti gas nitrogen) bertahan lebih lama karena tidak ada oksigen yang memicu oksidasi", targetZone: "kemasan" },
                      { id: "c2", icon: "🧪", text: "Produsen menambahkan antioksidan alami (vitamin E) ke dalam formulasi minyak goreng untuk memperlambat proses ketengikan", targetZone: "kemasan" },
                      { id: "c3", icon: "🔥", text: "Sirup obat yang disimpan di gudang tanpa pendingin di iklim tropis rusak 3 bulan lebih cepat dari yang disimpan di gudang ber-AC", targetZone: "bukanFaktor" },
                      { id: "c4", icon: "💊", text: "Tablet salut enterik dirancang agar lapisan luarnya tidak larut di lambung — formulasi ini juga melindungi zat aktif dari asam dan memperpanjang Shelf Life", targetZone: "kemasan" },
                      { id: "c5", icon: "💧", text: "Serbuk kopi yang disimpan di toples kaca terbuka di dapur menjadi klumped dan kehilangan aroma dalam seminggu", targetZone: "bukanFaktor" },
                      { id: "c6", icon: "🫙", text: "Kemasan blister (alu-alu) untuk tablet lebih mahal dari botol plastik biasa, tapi memberikan perlindungan jauh lebih baik terhadap kelembapan dan oksigen", targetZone: "kemasan" }
                    ],
                    feedbackCorrect: "Sempurna! Kemasan dan formulasi adalah dua faktor yang bisa dikendalikan oleh produsen dari dalam — berbeda dari suhu, kelembapan, dan cahaya yang merupakan faktor lingkungan eksternal. Nitrogen flushing, antioksidan dalam formulasi, tablet salut enterik, dan blister alu-alu adalah contoh bagaimana produsen secara aktif memperpanjang Shelf Life melalui desain produk dan kemasannya.",
                    feedbackWrong: "Ada yang tertukar. Kemasan dan formulasi adalah faktor internal yang dikendalikan produsen. Kartu 3 (gudang tanpa AC) adalah faktor suhu — lingkungan eksternal. Kartu 5 (toples terbuka kehilangan aroma) menggambarkan efek dari tidak adanya kemasan yang baik — penyebab utamanya adalah kelembapan dan oksigen dari lingkungan."
                  },

                  // SLIDE 5: MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Lima Faktor yang Menentukan Seberapa Cepat Produk Rusak",
                      style: {
                        background: "#064E3B",
                        color: "white",
                        borderRadius: "16px"
                      }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Peta lima faktor dan mekanisme kerusakannya",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Lima faktor utama yang memengaruhi Shelf Life bisa dibagi menjadi dua kelompok:</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 16px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap;'>FAKTOR LINGKUNGAN (dari luar produk)\n────────────────────────────────────────\n🌡️ SUHU          Mempercepat reaksi kimia\n                  dan fisik. Tiap +10°C\n                  ≈ degradasi 2× lebih cepat\n\n💧 KELEMBAPAN    Memicu hidrolisis (reaksi\n                  kimia dengan air) dan\n                  kerusakan fisik (menggumpal,\n                  melempem, lengket)\n\n☀️ CAHAYA        Memicu fotodegradasi —\n                  reaksi kimia yang dipicu\n                  oleh energi foton UV/cahaya\n                  tampak\n\nFAKTOR PRODUK (dari dalam produk)\n────────────────────────────────────────\n📦 KEMASAN       Penghalang antara produk\n                  dan lingkungan. Menentukan\n                  seberapa banyak suhu,\n                  kelembapan, dan cahaya\n                  bisa masuk\n\n🧪 FORMULASI     Komposisi produk itu sendiri\n                  — bahan apa yang ditambahkan\n                  untuk memperlambat kerusakan\n                  (antioksidan, pengawet,\n                  stabilizer)</div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500;'>📌 Kelima faktor ini tidak berdiri sendiri — mereka saling berinteraksi. Produk yang disimpan di suhu tinggi DAN kelembapan tinggi rusak jauh lebih cepat dari yang hanya mengalami salah satunya. Inilah mengapa uji stabilitas menguji kombinasi kondisi, bukan satu faktor saja.</div></div>"
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#FFEDD5", color: "#C2410C" },
                        title: "Suhu: faktor paling kritis",
                        color: "#EA580C",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Suhu adalah faktor yang paling dominan karena mempengaruhi hampir semua jenis reaksi kimia dan fisik yang merusak produk.</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 16px 0;'><table style='width: 100%; border-collapse: collapse; font-family: monospace; font-size: 12px; text-align: left;'><tr style='border-bottom: 2px solid #475569;'><th style='padding: 6px;'>KONDISI SUHU</th><th style='padding: 6px;'>DAMPAK PADA SHELF LIFE</th></tr><tr><td style='padding: 6px;'>Di bawah suhu yang<br/>ditetapkan</td><td style='padding: 6px;'>Shelf Life bisa jauh lebih panjang — tapi bisa juga merusak (pembekuan merusak emulsi krim, vaksin)</td></tr><tr><td style='padding: 6px;'>Sesuai suhu yang<br/>ditetapkan</td><td style='padding: 6px; color: #4ADE80;'>Shelf Life sesuai klaim di label</td></tr><tr><td style='padding: 6px;'>+10°C dari normal</td><td style='padding: 6px; color: #FBBF24;'>Shelf Life kira-kira berkurang setengahnya</td></tr><tr><td style='padding: 6px;'>+20°C dari normal</td><td style='padding: 6px; color: #EF4444;'>Shelf Life bisa berkurang menjadi ¼ dari klaim</td></tr></table></div><p><strong>Implikasi praktis:</strong> obat yang seharusnya disimpan di 15–25°C, jika tersimpan di dalam mobil yang suhunya mencapai 50–60°C di siang hari, Shelf Life efektifnya bisa berkurang menjadi hanya beberapa minggu — meski EXP di label masih 2 tahun lagi.</p></div>"
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Kemasan: tameng antara produk dan dunia luar",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>Kemasan bukan sekadar wadah — ia adalah sistem perlindungan yang dirancang berdasarkan ancaman spesifik terhadap setiap produk.</p><div style='display: flex; flex-direction: column; gap: 12px; margin-top: 12px;'><div><strong>🟤 Botol kaca/plastik cokelat (amber):</strong><br/>Memblokir sinar UV dan cahaya tampak. Digunakan untuk obat tetes mata, sirup, dan produk yang sensitif cahaya.</div><div><strong>🔲 Blister alu-alu (aluminium-aluminium):</strong><br/>Penghalang sempurna terhadap kelembapan dan oksigen. Lebih mahal dari plastik biasa, tapi memberikan perlindungan jauh lebih baik untuk tablet dan kapsul.</div><div><strong>💨 Nitrogen flushing:</strong><br/>Udara dalam kemasan (yang mengandung oksigen) diganti dengan gas nitrogen inert. Mencegah oksidasi pada produk berminyak dan makanan kering.</div><div><strong>🧊 Sachet silica gel:</strong><br/>Menyerap sisa kelembapan di dalam kemasan. Sering ditemukan dalam kemasan obat dan produk elektronik.</div></div><div style='background: #F8FAFC; border-left: 4px solid #16A34A; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 16px;'>Setiap keputusan desain kemasan di atas bukan pilihan estetika atau biaya semata — melainkan hasil dari uji stabilitas yang membuktikan bahwa tanpa perlindungan tersebut, produk tidak bisa bertahan sesuai Shelf Life yang diklaim.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6 (MCQ) - SOAL 5
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Identifikasi penyebabnya",
                      text: "Pak Hendra, staf QC sebuah apotek, menemukan bahwa tablet vitamin C yang baru diterima dari distributor sudah berubah warna menjadi kekuningan — padahal EXP masih 18 bulan lagi. Kemasan masih tersegel dan tidak rusak. Faktor apa yang paling mungkin menjadi penyebab?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; display: flex; gap: 16px; align-items: center; margin-bottom: 12px;'><div style='flex: 1; text-align: center;'><div style='font-size: 32px; border: 2px solid #CBD5E1; display: inline-block; padding: 8px; border-radius: 8px; background: #F8FAFC;'>💊✨</div><div style='font-size: 11px; font-weight: bold; margin-top: 4px;'>Masih Tersegel</div><div style='font-size: 11px; color: #64748B;'>EXP: 18 bln lagi</div></div><div style='font-size: 24px; color: #94A3B8;'>→</div><div style='flex: 1; text-align: center;'><div style='font-size: 32px; border: 2px solid #FCD34D; display: inline-block; padding: 8px; border-radius: 8px; background: #FEF3C7;'>🟡</div><div style='font-size: 11px; font-weight: bold; margin-top: 4px; color: #B45309;'>Mulai Kekuningan</div></div><div style='font-size: 24px; color: #94A3B8;'>+</div><div style='flex: 1.5; background: #FFF7ED; padding: 8px; border-radius: 8px; border: 1px dashed #FDBA74; font-size: 11px;'><span style='font-weight: bold; color: #9A3412;'>Kondisi Distribusi:</span><br/>Via ekspedisi reguler, di gudang distributor 3 bln.</div></div><div style='text-align: center; font-weight: bold; color: #1E293B;'>Kemasan tersegel, EXP masih jauh, tapi warna sudah berubah. Penyebabnya?</div>"
                    },
                    options: [
                      { id: "a", icon: "💧", text: "Kelembapan — uap air masuk ke dalam botol dan merusak tablet", correct: false, feedback: "Kemasan masih tersegel — kelembapan dari luar tidak bisa masuk. Perubahan warna menjadi kekuningan pada vitamin C adalah tanda khas fotodegradasi dan oksidasi, bukan kerusakan akibat air." },
                      { id: "b", icon: "☀️", text: "Cahaya dan/atau suhu — tablet vitamin C sangat sensitif terhadap paparan cahaya dan suhu tinggi selama distribusi dan penyimpanan di gudang", correct: true, feedback: "Tepat! Vitamin C (asam askorbat) adalah zat yang sangat sensitif terhadap cahaya dan suhu — perubahan warna menjadi kekuningan adalah tanda khas fotodegradasi atau oksidasi yang dipercepat oleh suhu tinggi. Botol plastik bening adalah bagian masalahnya: ia tidak memblokir cahaya. Untuk vitamin C, kemasan yang tepat adalah botol amber atau kemasan opak. Ditambah kemungkinan suhu tinggi di gudang distributor — kombinasi keduanya mempercepat degradasi." },
                      { id: "c", icon: "🧪", text: "Formulasi — produsen menggunakan bahan baku yang kurang berkualitas sehingga tablet tidak stabil", correct: false, feedback: "Mungkin saja, tapi bukan penyebab paling mungkin dari petunjuk yang ada. Perubahan warna kekuningan pada vitamin C adalah tanda spesifik fotodegradasi dan oksidasi akibat cahaya/suhu — bukan indikator kualitas bahan baku yang buruk. Penyebab formulasi biasanya menghasilkan masalah yang terdeteksi sejak batch produksi, bukan setelah beberapa bulan distribusi." }
                    ]
                  },

                  // SLIDE 7 (MCQ) - SOAL 6
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Tentukan tindakan yang tepat",
                      text: "PT Snack Prima menerima laporan bahwa produk keripik kentang mereka menjadi tengik dan melempem lebih cepat dari Shelf Life yang diklaim. Setelah diselidiki: produk disimpan dengan benar oleh retailer, suhu gudang normal, kemasan tidak rusak. Tapi retailer di kota pesisir mengeluh lebih banyak dari retailer di kota pegunungan. Apa yang paling tepat diinvestigasi PT Snack Prima?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; margin-bottom: 12px;'><div style='display: flex; gap: 16px;'><div style='flex: 1; background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🏔️</div><div style='font-weight: bold; font-size: 13px;'>Retailer Kota Pegunungan</div><div style='font-size: 12px; color: #2563EB; margin: 4px 0;'>Kelembapan: ~60% RH</div><div style='font-size: 12px; background: #DCFCE7; color: #166534; padding: 2px 4px; border-radius: 4px; display: inline-block;'>Keluhan: sedikit</div></div><div style='flex: 1; background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 12px; border-radius: 8px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🌊</div><div style='font-weight: bold; font-size: 13px;'>Retailer Kota Pesisir</div><div style='font-size: 12px; color: #2563EB; margin: 4px 0; font-weight: bold;'>Kelembapan: ~85% RH</div><div style='font-size: 12px; background: #FEE2E2; color: #991B1B; padding: 2px 4px; border-radius: 4px; display: inline-block; font-weight: bold;'>Keluhan: banyak</div></div></div><div style='background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E3A8A; padding: 8px; text-align: center; border-radius: 6px; margin-top: 12px; font-size: 12px;'>Suhu, kemasan, penyimpanan → <strong>SAMA</strong><br>Yang berbeda → <strong>?</strong></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🌡️", text: "Investigasi suhu — mungkin ada perbedaan suhu di rantai distribusi antara dua kota", correct: false, feedback: "Perbedaan suhu antara dua kota pesisir dan pegunungan di Indonesia umumnya tidak signifikan — dan sudah disebutkan bahwa suhu gudang normal. Petunjuk paling kuat di sini adalah perbedaan kelembapan relatif yang sangat signifikan (60% vs 85% RH)." },
                      { id: "b", icon: "💧", text: "Investigasi kemasan terhadap kelembapan tinggi — kemasan mungkin tidak cukup kuat menahan uap air di kondisi pesisir yang sangat lembap", correct: true, feedback: "Tepat! Pola keluhan yang jelas berbeda antara kota pesisir (lembap) dan pegunungan (lebih kering) — dengan semua faktor lain sama — menunjuk langsung ke kelembapan sebagai penyebab. Keripik yang tengik bisa berarti oksidasi lemak yang dipercepat oleh kelembapan tinggi. Yang melempem berarti kemasan tidak cukup kuat sebagai penghalang uap air di lingkungan 85% RH. Solusinya kemungkinan ada di upgrade kemasan — bukan ganti formulasi." },
                      { id: "c", icon: "🧪", text: "Ganti seluruh formulasi keripik dengan resep baru yang lebih stabil", correct: false, feedback: "Mengganti seluruh formulasi adalah langkah drastis yang membutuhkan waktu dan biaya besar — dan belum tentu menjadi akar masalah. Jika penyebabnya adalah kemasan yang tidak cukup menahan kelembapan, upgrade kemasan jauh lebih efisien dari reformulasi total." }
                    ]
                  },

                  // SLIDE 8 (MCQ) - SOAL 7
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Identifikasi penyebabnya",
                      text: "Seorang ibu membeli sirup obat batuk untuk anaknya. Botolnya bening, disimpan di atas meja dapur dekat jendela yang sering terkena sinar matahari pagi. Setelah 3 minggu (sebelum EXP dan sebelum 30 hari setelah dibuka), warna sirup berubah lebih gelap dan baunya sedikit berbeda. Faktor dominan apa yang paling mungkin menyebabkan ini?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; text-align: center; font-family: monospace; font-size: 13px; margin-bottom: 12px;'><div style='font-size: 24px; color: #EAB308;'>☀️</div><div style='color: #CA8A04;'>Sinar matahari pagi</div><div style='margin: 4px 0;'>↓</div><div style='font-size: 20px;'>🪟 Jendela dapur</div><div style='margin: 4px 0;'>↓</div><div>🍶 <strong>Botol bening berisi sirup</strong></div><div style='font-size: 11px; color: #64748B;'>(di atas meja, 3 minggu)</div><div style='margin: 4px 0;'>↓</div><div style='background: #FECACA; padding: 4px 12px; display: inline-block; border-radius: 4px; color: #991B1B; font-weight: bold;'>Warna lebih gelap, bau berubah</div></div><div style='display: flex; gap: 8px; justify-content: center;'><span style='background: #DCFCE7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 11px;'>✓ EXP masih jauh</span><span style='background: #DCFCE7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 11px;'>✓ Belum 30 hari</span></div>"
                    },
                    options: [
                      { id: "a", icon: "💧", text: "Kelembapan — tutup botol tidak rapat sehingga uap air dari udara dapur masuk dan mengencerkan sirup", correct: false, feedback: "Jika tutup tidak rapat, kelembapan bisa masuk — tapi ini akan mengencerkan atau mengubah konsistensi sirup, bukan mengubah warnanya menjadi lebih gelap. Perubahan warna menggelap adalah indikator khas reaksi kimia, bukan pengenceran fisik." },
                      { id: "b", icon: "☀️", text: "Cahaya — paparan sinar matahari langsung setiap pagi memicu fotodegradasi zat aktif dalam sirup, dipercepat karena botolnya bening tidak memblokir UV", correct: true, feedback: "Tepat! Perubahan warna menjadi lebih gelap dan perubahan bau pada sirup adalah tanda khas fotodegradasi — reaksi kimia yang dipicu oleh energi cahaya UV. Botol bening adalah masalah utamanya: ia tidak memblokir cahaya. Sirup obat seharusnya disimpan dalam botol gelap dan dijauhkan dari paparan cahaya langsung — instruksi yang sering ada di label tapi sering diabaikan. Ini juga alasan mengapa kebanyakan botol sirup obat berwarna gelap." },
                      { id: "c", icon: "🌡️", text: "Suhu — dapur panas dari aktivitas memasak meningkatkan suhu di sekitar botol dan mempercepat degradasi", correct: false, feedback: "Suhu dapur dari memasak memang bisa mempengaruhi, tapi petunjuk paling kuat adalah posisi di dekat jendela yang terkena sinar matahari langsung setiap pagi. Perubahan warna menggelap adalah tanda spesifik fotodegradasi — bukan hanya kerusakan termal yang umumnya menghasilkan pola kerusakan berbeda." }
                    ]
                  },

                  // SLIDE 9 (MCQ) - SOAL 8
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Tentukan tindakan yang tepat",
                      text: "PT Farma Andal ingin memperpanjang Shelf Life tablet antibiotiknya dari 24 bulan menjadi 36 bulan tanpa mengubah zat aktifnya. Data uji stabilitas menunjukkan bahwa penyebab utama penurunan kualitas adalah masuknya kelembapan ke dalam kemasan blister plastik biasa setelah bulan ke-24. Apa solusi yang paling tepat?",
                      htmlContext: "<div style='display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;'><div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 12px; border-radius: 8px;'><div style='font-size: 11px; font-weight: bold; color: #DC2626; margin-bottom: 4px;'>MASALAH:</div><div style='font-size: 13px;'>Tablet antibiotik → degradasi mulai bulan ke-24</div><div style='font-size: 12px; color: #991B1B; font-weight: bold;'>Penyebab terbukti: kelembapan masuk lewat kemasan</div></div><div style='background: #EFF6FF; border: 1px solid #BFDBFE; padding: 12px; border-radius: 8px;'><div style='font-size: 11px; font-weight: bold; color: #2563EB; margin-bottom: 4px;'>TUJUAN:</div><div style='font-size: 13px; font-weight: bold;'>Perpanjang Shelf Life → 36 bulan</div><div style='font-size: 12px; color: #1E3A8A;'>Syarat: tanpa mengubah zat aktif</div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🌡️", text: "Ubah instruksi penyimpanan — rekomendasikan suhu lebih rendah (di bawah 15°C) agar reaksi degradasi melambat", correct: false, feedback: "Mengubah suhu penyimpanan ke di bawah 15°C memang bisa memperlambat degradasi, tapi ini menciptakan masalah baru: produk menjadi memerlukan cold chain yang jauh lebih mahal untuk distribusi dan penyimpanan. Lagi pula, penyebab utamanya adalah kelembapan — bukan suhu. Solusi yang tepat menyerang akar masalah, bukan faktor lain." },
                      { id: "b", icon: "📦", text: "Upgrade kemasan dari blister plastik biasa ke blister alu-alu yang hampir impermeabel terhadap kelembapan", correct: true, feedback: "Tepat! Jika penyebab terbukti adalah kelembapan yang masuk lewat kemasan, solusi langsung dan paling efisien adalah upgrade kemasan. Blister alu-alu (aluminium-aluminium) memiliki barrier kelembapan hampir sempurna — jauh lebih baik dari blister plastik biasa. Ini adalah solusi yang langsung menyerang akar masalah tanpa mengubah formulasi zat aktif." },
                      { id: "c", icon: "🧪", text: "Tambahkan lebih banyak zat aktif dalam setiap tablet sebagai 'cadangan' — meski yang 24 bulan turun 10%, masih di atas batas minimum", correct: false, feedback: "Menambahkan overdose zat aktif sebagai 'cadangan' bukan solusi yang diizinkan regulasi — dosis dalam obat harus dalam rentang yang ditetapkan. Selain itu, ini tidak menyelesaikan masalah kelembapan; tablet tetap akan terdegradasi, hanya saja butuh lebih lama untuk turun di bawah batas minimum. Solusi yang benar menyerang penyebab, bukan menutupinya." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 2-N03 Selesai!",
                      insight: "Anda sudah menguasai lima faktor yang memengaruhi Shelf Life dan bisa mengidentifikasi penyebab masalah stabilitas dalam situasi nyata.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Tiga faktor lingkungan: Suhu (tiap +10°C ≈ degradasi 2× lebih cepat) · Kelembapan (hidrolisis dan kerusakan fisik) · Cahaya (fotodegradasi)",
                        "Dua faktor produk yang bisa dikendalikan produsen: Kemasan (penghalang dari luar) · Formulasi (perlindungan dari dalam)",
                        "Kelima faktor berinteraksi — kombinasi suhu tinggi + kelembapan tinggi jauh lebih merusak dari masing-masing faktor saja",
                        "Setiap keputusan kemasan (botol gelap, blister alu-alu, nitrogen flushing) adalah hasil uji stabilitas — bukan pilihan estetika"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              }

            ]
          },

          {
            id:    "shelf-life-industri-farmasi",
            title: "Shelf Life di Industri Farmasi",
            icon:  "🏛️",
            color: COLORS.teal,

            subLessons: [
              {
                id:       "regulasi-shelf-life-bpom",
                title:    "Menjelaskan regulasi Shelf Life menurut BPOM",
                icon:     "🏛️",
                duration: "20 menit",
                slides: [
                  // SLIDE 1 (YES/NO) - Soal 1
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Sesuai ketentuan BPOM atau tidak?",
                      text: "PT Farma Baru ingin mendaftarkan tablet antipiretik baru ke BPOM. Mereka menyerahkan data uji stabilitas yang berlangsung 6 bulan dalam kondisi accelerated (40°C/75% RH) sebagai satu-satunya bukti untuk mengklaim Shelf Life 24 bulan. Apakah ini memenuhi ketentuan BPOM?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; display: flex; gap: 12px; align-items: center; margin-bottom: 12px;'><div style='flex: 1; background: #FFF7ED; border: 1px solid #FDBA74; border-radius: 8px; padding: 12px; text-align: center;'><div style='font-size: 28px;'>⚡</div><div style='font-weight: 800; font-size: 13px; margin: 4px 0; color: #9A3412;'>Data Accelerated Study</div><div style='font-size: 11px; color: #7C2D12;'>6 bulan, 40°C/75% RH</div><div style='font-size: 10px; color: #9A3412; margin-top: 4px; font-style: italic;'>Satu-satunya data yang diserahkan</div></div><div style='font-size: 22px; color: #94A3B8; font-weight: 800;'>?</div><div style='flex: 1; background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 12px; text-align: center;'><div style='font-size: 28px;'>📅</div><div style='font-weight: 800; font-size: 13px; margin: 4px 0; color: #166534;'>Shelf Life: 24 bulan</div><div style='font-size: 11px; color: #15803D;'>Untuk label produk</div></div></div><div style='text-align: center; font-size: 12px; color: #64748B; font-weight: 600;'>Cukup?</div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, memenuhi",
                        subLabel: "Data accelerated cukup untuk klaim 24 bulan",
                        correct: false,
                        feedback: "Belum tepat. Meski data accelerated study diizinkan untuk registrasi awal, BPOM — mengikuti pedoman ICH — mensyaratkan real-time study sebagai konfirmasi definitif. Produsen yang hanya menyerahkan data accelerated tanpa rencana melanjutkan real-time study tidak memenuhi persyaratan registrasi yang lengkap."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak memenuhi",
                        subLabel: "Perlu data pendukung tambahan",
                        correct: true,
                        feedback: "Tepat! BPOM mengikuti pedoman ICH Q1A yang mensyaratkan data real-time study sebagai konfirmasi akhir. Data accelerated study boleh digunakan untuk registrasi awal, tapi produsen wajib melanjutkan real-time study dan menyerahkan datanya secara berkala. Mengajukan accelerated study sebagai satu-satunya bukti tanpa komitmen melanjutkan real-time study tidak memenuhi ketentuan registrasi lengkap."
                      }
                    ]
                  },

                  // SLIDE 2 (YES/NO) - Soal 2
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Sesuai ketentuan BPOM atau tidak?",
                      text: "Label obat batuk produksi PT Farma Sehat hanya mencantumkan nomor batch dan tanggal produksi (MFD), tapi tidak mencantumkan tanggal kedaluwarsa (Expiry Date). Produsen berargumen bahwa konsumen bisa menghitung sendiri: MFD + Shelf Life 24 bulan = Expiry Date. Apakah label ini memenuhi ketentuan BPOM?",
                      htmlContext: "<div style='background: white; border: 2px solid #1E293B; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; margin-bottom: 12px;'><div style='font-weight: bold; font-size: 14px; margin-bottom: 4px;'>💊 SIRUP OBAT BATUK</div><div style='font-size: 11px; color: #555; margin-bottom: 8px; border-bottom: 1px dashed #CBD5E1; padding-bottom: 8px;'>PT Farma Sehat | 100 mL</div><div style='line-height: 2;'><div>Reg. BPOM: DTL 1234567890</div><div>Batch: FS240101</div><div>MFD: Januari 2024</div><div>Shelf Life: 24 bulan</div><div style='background: #FEF2F2; color: #DC2626; padding: 4px 8px; border-radius: 4px; margin-top: 8px; text-align: center; font-weight: bold;'>← Tidak ada Expiry Date →</div></div></div><div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #92400E;'>💬 Argumen produsen: <em>'Konsumen bisa hitung sendiri: Jan 2024 + 24 bulan = Jan 2026'</em></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, memenuhi",
                        subLabel: "MFD + Shelf Life sudah cukup",
                        correct: false,
                        feedback: "Belum tepat. Regulasi BPOM — mengacu Peraturan BPOM tentang label — mewajibkan pencantuman tanggal kedaluwarsa yang eksplisit dan langsung bisa dibaca. Alasan 'konsumen bisa hitung sendiri' tidak diterima secara regulasi. Label yang tidak mencantumkan Expiry Date secara langsung tidak memenuhi ketentuan dan bisa menjadi dasar penolakan izin edar."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak memenuhi",
                        subLabel: "Expiry Date wajib tercantum eksplisit",
                        correct: true,
                        feedback: "Tepat! BPOM mewajibkan pencantuman tanggal kedaluwarsa secara eksplisit di label — tidak bisa digantikan dengan MFD + perhitungan. Ini bukan soal kemampuan konsumen berhitung, tapi soal perlindungan konsumen: konsumen awam tidak boleh dibebani kewajiban menghitung tanggal kedaluwarsa sendiri. Expiry Date harus langsung terbaca tanpa kalkulasi apapun."
                      }
                    ]
                  },

                  // SLIDE 3 (YES/NO) - Soal 3
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Sesuai ketentuan BPOM atau tidak?",
                      text: "PT Bio Vaksin memiliki data real-time study vaksin influenza yang berlangsung 18 bulan dan semua parameter masih memenuhi spesifikasi. Mereka ingin menetapkan Shelf Life 24 bulan dengan dasar bahwa 'tren data stabil dan proyeksi statistik menunjukkan produk masih akan oke di bulan ke-24'. Apakah penetapan Shelf Life ini sesuai ketentuan BPOM?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; margin-bottom: 12px; font-family: monospace; font-size: 12px;'><div style='display: flex; gap: 12px;'><div style='flex: 1; background: #F0FDF4; border: 1px solid #86EFAC; padding: 10px; border-radius: 8px;'><div style='font-weight: bold; color: #166534; margin-bottom: 6px;'>DATA YANG ADA:</div><div>Real-time 18 bulan ✓</div><div>Semua parameter oke ✓</div><div style='margin-top: 8px; color: #6B7280; font-size: 11px;'>Proyeksi statistik:</div><div style='color: #6B7280; font-size: 11px; font-style: italic;'>Estimasi masih oke di bulan ke-24</div></div><div style='flex: 1; background: #FEF2F2; border: 1px solid #FECACA; padding: 10px; border-radius: 8px;'><div style='font-weight: bold; color: #991B1B; margin-bottom: 6px;'>KLAIM YANG DIAJUKAN:</div><div style='font-weight: bold;'>Shelf Life 24 bulan</div><div style='margin-top: 8px; background: #FEE2E2; padding: 4px 6px; border-radius: 4px; font-size: 11px; color: #991B1B;'>GAP: 6 bulan tanpa data aktual</div></div></div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, sesuai",
                        subLabel: "Proyeksi statistik cukup sebagai dasar",
                        correct: false,
                        feedback: "Belum tepat. Proyeksi statistik tidak bisa menggantikan data aktual dalam penetapan Shelf Life. BPOM mengikuti ICH Q1A yang mensyaratkan data uji stabilitas yang mencakup seluruh periode klaim. Data 18 bulan hanya bisa mendukung klaim Shelf Life 18 bulan — tidak lebih."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak sesuai",
                        subLabel: "Klaim harus didukung data aktual",
                        correct: true,
                        feedback: "Tepat! Klaim Shelf Life harus didukung oleh data aktual yang mencakup seluruh periode yang diklaim. Data real-time yang ada hanya sampai 18 bulan — mengklaim 24 bulan berdasarkan proyeksi statistik tidak memenuhi ketentuan BPOM dan ICH. Untuk mengklaim 24 bulan, PT Bio Vaksin harus melanjutkan uji sampai bulan ke-24 dan mendapatkan data aktual yang membuktikannya."
                      }
                    ]
                  },

                  // SLIDE 4 (YES/NO) - Soal 4
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Sesuai ketentuan BPOM atau tidak?",
                      text: "PT Generik Prima memproduksi obat generik yang sudah mendapat izin edar. Setelah produk beredar 2 tahun, mereka menghentikan on-going stability study dengan alasan 'produknya sudah terbukti stabil selama registrasi, tidak perlu data tambahan'. Apakah keputusan ini sesuai ketentuan BPOM?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 16px; border-radius: 12px; margin-bottom: 12px; font-size: 12px;'><div style='display: flex; gap: 0; align-items: center; overflow-x: auto;'><div style='text-align: center; min-width: 70px; padding: 0 4px;'><div style='font-size: 20px;'>📋</div><div style='font-size: 10px; font-weight: 700; color: #166534; margin-top: 4px;'>Registrasi</div><div style='font-size: 9px; color: #6B7280;'>Data uji diserahkan</div></div><div style='color: #94A3B8; font-size: 18px;'>→</div><div style='text-align: center; min-width: 70px; padding: 0 4px;'><div style='font-size: 20px;'>✅</div><div style='font-size: 10px; font-weight: 700; color: #2563EB; margin-top: 4px;'>Izin Edar</div><div style='font-size: 9px; color: #6B7280;'>Produk beredar</div></div><div style='color: #94A3B8; font-size: 18px;'>→</div><div style='text-align: center; min-width: 70px; padding: 0 4px;'><div style='font-size: 20px;'>🔬</div><div style='font-size: 10px; font-weight: 700; color: #D97706; margin-top: 4px;'>Beredar 2 thn</div><div style='font-size: 9px; color: #6B7280;'>On-going berjalan</div></div><div style='color: #94A3B8; font-size: 18px;'>→</div><div style='text-align: center; min-width: 70px; padding: 0 4px;'><div style='font-size: 20px;'>⛔</div><div style='font-size: 10px; font-weight: 700; color: #DC2626; margin-top: 4px;'>Sekarang</div><div style='font-size: 9px; color: #DC2626; font-weight: 600;'>Dihentikan?</div></div></div><div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 8px 12px; border-radius: 8px; margin-top: 12px; font-size: 11px; color: #92400E;'>💬 <em>'Sudah terbukti stabil saat registrasi — on-going study tidak perlu lagi'</em></div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, sesuai",
                        subLabel: "Bukti saat registrasi sudah cukup",
                        correct: false,
                        feedback: "Belum tepat. Data stabilitas saat registrasi hanya membuktikan batch tertentu yang diuji. CPOB dan ketentuan BPOM mewajibkan on-going stability study yang berkelanjutan untuk memastikan setiap batch produksi rutin konsisten dengan klaim Shelf Life yang sudah diregistrasikan."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak sesuai",
                        subLabel: "On-going study wajib selama produk beredar",
                        correct: true,
                        feedback: "Tepat! BPOM mewajibkan produsen menjalankan on-going stability study selama produk masih beredar di pasaran — bukan hanya saat registrasi. Tujuannya adalah memastikan bahwa produk yang diproduksi secara rutin (bukan hanya batch registrasi) tetap memenuhi spesifikasi Shelf Life yang diklaim. Menghentikan on-going study adalah pelanggaran CPOB (Cara Pembuatan Obat yang Baik) yang bisa berujung pada pencabutan izin edar."
                      }
                    ]
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Ketentuan BPOM tentang Penetapan dan Pencantuman Expiry Date",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-bpom-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Tiga kewajiban utama produsen farmasi ke BPOM",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>BPOM mengatur Shelf Life produk farmasi melalui dua instrumen utama: Peraturan BPOM tentang Registrasi Obat dan CPOB (Cara Pembuatan Obat yang Baik). Dari keduanya, ada tiga kewajiban inti:</p><div style='display: flex; flex-direction: column; gap: 14px; margin-top: 14px;'><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #FDE047;'><div style='font-weight: 800; color: #FDE047; margin-bottom: 6px;'>1️⃣ Data uji stabilitas wajib diserahkan saat registrasi</div><div style='font-size: 13px;'>Setiap produk farmasi baru yang didaftarkan ke BPOM harus disertai data uji stabilitas. Data accelerated study diizinkan untuk registrasi awal, tapi produsen wajib berkomitmen menyerahkan data real-time study secara bertahap saat tersedia.</div></div><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #60A5FA;'><div style='font-weight: 800; color: #60A5FA; margin-bottom: 6px;'>2️⃣ Expiry Date wajib tercantum eksplisit di label</div><div style='font-size: 13px;'>Semua produk farmasi wajib mencantumkan tanggal kedaluwarsa secara langsung dan terbaca. Format yang diakui: EXP, Exp Date, Kadaluarsa, atau Kedaluwarsa. Tidak bisa digantikan dengan MFD + perhitungan.</div></div><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #4ADE80;'><div style='font-weight: 800; color: #4ADE80; margin-bottom: 6px;'>3️⃣ On-going stability study wajib dilanjutkan selama produk beredar</div><div style='font-size: 13px;'>Setelah produk mendapat izin edar, produsen wajib menjalankan program stabilitas berkelanjutan untuk setiap tahun produksi. Data ini harus tersedia untuk diperiksa auditor BPOM kapanpun.</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 16px; font-size: 13px;'>📌 Ketiga kewajiban ini adalah bagian dari CPOB yang merupakan standar wajib bagi semua industri farmasi di Indonesia. Pelanggaran terhadap ketentuan ini bisa berujung pada peringatan, pembekuan, hingga pencabutan izin edar.</div></div>"
                      },
                      {
                        id: "pnl-bpom-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Format dan ketentuan pencantuman Expiry Date",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>BPOM mengatur format pencantuman Expiry Date agar konsumen bisa membacanya dengan mudah dan tidak ambigu.</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; margin: 14px 0; font-family: monospace; font-size: 12px; white-space: pre-wrap;'>FORMAT YANG DIAKUI BPOM\n──────────────────────────────────────\n✓ EXP: 12/2026\n✓ EXP DATE: 12 2026\n✓ Kadaluarsa: Desember 2026\n✓ Kedaluwarsa: 12/2026\n✓ Exp: Dec 2026\n\nFORMAT YANG TIDAK MEMADAI\n──────────────────────────────────────\n✗ Hanya MFD tanpa EXP\n✗ Shelf Life: 24 bulan (tanpa EXP)\n✗ Tanggal terlalu kecil hingga tidak terbaca\n✗ EXP tanpa bulan: EXP 2026 (hanya tahun)\n✗ Format ambigu: 06/26</div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 13px;'>⚠️ Untuk EXP yang tertulis hanya bulan/tahun (misal EXP 12/2026), produk masih boleh digunakan sampai akhir bulan Desember 2026 — bukan hanya sampai tanggal 1 Desember. Ini adalah ketentuan interpretasi standar yang berlaku di seluruh industri.</div></div>"
                      },
                      {
                        id: "pnl-bpom-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Apa yang terjadi jika ketentuan dilanggar?",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p>BPOM memiliki kewenangan penuh untuk menindak produsen yang melanggar ketentuan Shelf Life dan pencantuman Expiry Date.</p><div style='display: flex; flex-direction: column; gap: 10px; margin-top: 12px;'><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #94A3B8;'><div style='font-weight: 700; color: #94A3B8; margin-bottom: 4px;'>📋 Surat peringatan</div><div style='font-size: 13px;'>Untuk pelanggaran pertama yang tidak membahayakan secara langsung — misalnya format EXP kurang jelas atau dokumentasi on-going study tidak lengkap.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #FBBF24;'><div style='font-weight: 700; color: #FBBF24; margin-bottom: 4px;'>🔒 Pembekuan izin edar sementara</div><div style='font-size: 13px;'>Produk ditarik dari peredaran sampai produsen memperbaiki ketidaksesuaian. Berlaku untuk pelanggaran berulang atau berpotensi membahayakan konsumen.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #F87171;'><div style='font-weight: 700; color: #F87171; margin-bottom: 4px;'>❌ Pencabutan izin edar</div><div style='font-size: 13px;'>Untuk pelanggaran serius — memalsukan data stabilitas, mencantumkan Expiry Date yang tidak didukung data ilmiah, atau tidak memiliki data on-going stability study sama sekali.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #C084FC;'><div style='font-weight: 700; color: #C084FC; margin-bottom: 4px;'>⚖️ Sanksi pidana</div><div style='font-size: 13px;'>Dalam kasus pemalsuan data atau pengedaran produk kedaluwarsa yang disengaja, pelaku bisa dijerat UU Kesehatan dan UU Perlindungan Konsumen dengan ancaman hukuman hingga 15 tahun penjara dan denda miliaran rupiah.</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #16A34A; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 14px; font-size: 13px;'>Konsumen dan tenaga kesehatan bisa melaporkan produk yang diduga melanggar melalui HALOBPOM 1500533 atau aplikasi BPOM Mobile.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6 (MCQ) - Soal 5
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih tindakan yang paling sesuai regulasi",
                      text: "Tim QA PT Farma Andal sedang menyiapkan dokumen registrasi produk baru — kapsul suplemen vitamin D. Real-time study baru berjalan 3 bulan. Accelerated study 6 bulan sudah selesai dengan hasil baik. Apa yang harus dilakukan tim QA untuk memenuhi ketentuan BPOM?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #CBD5E1; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='font-weight: 800; color: #1E293B; margin-bottom: 10px;'>STATUS DOKUMEN REGISTRASI:</div><div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: flex; align-items: center; gap: 10px; background: #F0FDF4; padding: 8px 12px; border-radius: 6px;'><span>✓</span><span>Accelerated study 6 bulan — <strong>SELESAI</strong>, hasil baik</span></div><div style='display: flex; align-items: center; gap: 10px; background: #FFFBEB; padding: 8px 12px; border-radius: 6px;'><span>⏳</span><span>Real-time study — baru 3 bulan, sedang berjalan</span></div><div style='display: flex; align-items: center; gap: 10px; background: #FEF2F2; padding: 8px 12px; border-radius: 6px;'><span>?</span><span>Data yang diserahkan ke BPOM → <strong>???</strong></span></div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "⏸️", text: "Tunda registrasi sampai real-time study selesai penuh sesuai Shelf Life yang akan diklaim", correct: false, feedback: "Menunda registrasi sampai real-time study selesai penuh tidak diharuskan oleh BPOM — justru regulasi memang mengizinkan penggunaan data accelerated untuk registrasi awal. Menunda bertahun-tahun tanpa perlu adalah kerugian bisnis yang tidak perlu." },
                      { id: "b", icon: "📋", text: "Serahkan data accelerated study sebagai data awal, sertakan protocol dan komitmen tertulis bahwa real-time study akan dilanjutkan dan datanya diserahkan secara berkala ke BPOM", correct: true, feedback: "Tepat! Ini adalah prosedur yang benar sesuai ketentuan BPOM: data accelerated boleh digunakan untuk registrasi awal, tapi harus disertai protocol real-time study yang sedang berjalan dan komitmen tertulis untuk menyerahkan data secara berkala. BPOM menerima pendekatan ini karena mengakui realita bahwa menunggu real-time study selesai penuh sebelum registrasi tidak praktis untuk industri." },
                      { id: "c", icon: "🗑️", text: "Serahkan hanya data accelerated study tanpa menyebut real-time study — BPOM pasti menerima karena hasilnya sudah bagus", correct: false, feedback: "Menyerahkan data accelerated tanpa menyebut atau berkomitmen melanjutkan real-time study akan membuat registrasi dianggap tidak lengkap. BPOM akan meminta klarifikasi dan komitmen program stabilitas jangka panjang — bukan sekadar menerima data accelerated begitu saja." }
                    ]
                  },

                  // SLIDE 7 (MCQ) - Soal 6
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih tindakan yang paling sesuai regulasi",
                      text: "PT Herbal Prima baru saja mendapat hasil on-going stability study yang mengejutkan: tablet herbal mereka yang sudah beredar 2 tahun menunjukkan penurunan kadar zat aktif yang lebih cepat dari perkiraan. Di bulan ke-20, kadarnya sudah mendekati batas minimum, padahal Shelf Life yang diklaim di label adalah 24 bulan. Apa yang harus dilakukan PT Herbal Prima?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='font-weight: 800; color: #991B1B; margin-bottom: 8px;'>🚨 SITUASI KRITIS:</div><div style='display: flex; flex-direction: column; gap: 6px; font-family: monospace; font-size: 12px;'><div>Label produk: Shelf Life <strong>24 bulan</strong></div><div>On-going data bulan ke-20:</div><div style='padding-left: 12px;'>Kadar zat aktif: <strong>91%</strong> (batas min: 90%)</div><div style='padding-left: 12px;'>Tren: turun ~1% per bulan</div><div style='background: #DC2626; color: white; padding: 4px 8px; border-radius: 4px; margin-top: 6px; font-weight: bold;'>Proyeksi bulan ke-24: ~87% → DI BAWAH BATAS!</div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🙈", text: "Tunggu sampai bulan ke-24 untuk melihat data aktual sebelum mengambil tindakan apapun", correct: false, feedback: "Menunggu data aktual bulan ke-24 saat proyeksi sudah jelas menunjukkan kegagalan adalah tindakan yang tidak dapat dibenarkan. Jika proyeksi benar dan produk mencapai bulan ke-24 di bawah batas minimum — sementara sudah ada di tangan konsumen — risikonya adalah obat tidak efektif yang sudah dikonsumsi." },
                      { id: "b", icon: "📋", text: "Segera laporkan temuan ke BPOM, ajukan revisi Shelf Life, dan koordinasikan dengan tim distribusi untuk menarik produk yang masa berlakunya melebihi Shelf Life yang direvisi", correct: true, feedback: "Tepat! Ini adalah kewajiban regulasi yang tidak bisa ditunda. Begitu data on-going study menunjukkan bahwa Shelf Life yang diklaim tidak akan bisa dipertahankan, produsen wajib segera melapor ke BPOM dan mengambil tindakan koreksi. Menunda pelaporan sambil menunggu data aktual bulan ke-24 adalah risiko keamanan publik dan pelanggaran CPOB." },
                      { id: "c", icon: "🔬", text: "Jalankan accelerated study baru dengan formulasi yang sama untuk membuktikan ulang stabilitasnya sebelum melapor ke BPOM", correct: false, feedback: "Menjalankan uji baru sebelum melapor ke BPOM bukan langkah yang tepat — dan bisa dianggap sebagai upaya menunda kewajiban pelaporan. CPOB mengharuskan produsen melaporkan temuan signifikan dari on-going stability study kepada BPOM. Data tren yang ada sudah cukup untuk memicu kewajiban pelaporan." }
                    ]
                  },

                  // SLIDE 8 (MCQ) - Soal 7
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih tindakan yang paling sesuai regulasi",
                      text: "Seorang apoteker di sebuah apotek menemukan 50 boks obat antidiabetes dalam stok yang Expiry Date-nya tertulis 'EXP 03/2025'. Sekarang sudah bulan April 2025. Obat-obat ini tidak sempat terjual. Apa yang harus dilakukan apoteker tersebut sesuai ketentuan?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: flex; align-items: center; gap: 10px;'><span style='font-size: 20px;'>📦</span><span>50 boks obat antidiabetes | <strong style='color: #DC2626;'>EXP: 03/2025</strong></span></div><div style='display: flex; align-items: center; gap: 10px;'><span style='font-size: 20px;'>📅</span><span>Sekarang: <strong>April 2025</strong> → Sudah 1 bulan melewati EXP</span></div><div style='display: flex; align-items: center; gap: 10px;'><span style='font-size: 20px;'>💊</span><span>Obat tidak sempat terjual — kondisi fisik terlihat normal</span></div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "💰", text: "Jual dengan harga diskon besar kepada pasien yang membutuhkan — sayang dibuang, kondisi fisik masih baik", correct: false, feedback: "Menjual obat kedaluwarsa — dalam kondisi apapun dan dengan alasan apapun — adalah pelanggaran serius terhadap UU Kesehatan, Permenkes, dan ketentuan BPOM. Apoteker yang melakukannya berisiko kehilangan SIPA dan bisa dijerat sanksi pidana. Kondisi fisik yang 'masih terlihat normal' tidak relevan — Expiry Date adalah batas hukum yang tidak bisa dikompromikan." },
                      { id: "b", icon: "📋", text: "Pisahkan dari stok aktif, tandai sebagai 'KEDALUWARSA — JANGAN DIJUAL', catat dalam buku stok, dan kembalikan ke distributor atau musnahkan sesuai prosedur pemusnahan obat yang berlaku", correct: true, feedback: "Tepat! Ini adalah prosedur standar penanganan obat kedaluwarsa di apotek sesuai ketentuan BPOM dan Permenkes. Obat yang sudah melewati EXP harus segera dipisahkan dari stok aktif, ditandai jelas, dan diproses sesuai ketentuan pemusnahan — tidak boleh dijual dengan alasan apapun. Pencatatan dalam buku stok penting untuk keperluan audit dan traceability." },
                      { id: "c", icon: "🏠", text: "Simpan dulu — tunggu 3 bulan lagi untuk memastikan apakah kondisinya benar-benar berubah sebelum memutuskan", correct: false, feedback: "Tidak ada 'masa tunggu' setelah produk melewati Expiry Date. Begitu EXP terlampaui, produk tersebut secara hukum dan regulasi sudah tidak boleh berada di stok aktif apotek. Menunggu kondisi fisik berubah sebelum bertindak adalah pemahaman yang salah tentang apa yang dimaksud Expiry Date." }
                    ]
                  },

                  // SLIDE 9 (MCQ) - Soal 8
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih tindakan yang paling sesuai regulasi",
                      text: "PT Farma Maju berencana mengekspor produk sirup antibiotiknya ke Vietnam. Di Indonesia, mereka menggunakan data uji stabilitas pada kondisi zona IVb (30°C/65% RH) sesuai iklim tropis. Tim regulatory affairs bertanya: apakah data ini cukup untuk registrasi di Vietnam, atau perlu uji stabilitas tambahan?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; padding: 14px; border-radius: 10px; margin-bottom: 12px;'><div style='display: flex; gap: 12px; font-size: 12px;'><div style='flex: 1; background: #F0FDF4; border: 1px solid #86EFAC; padding: 10px; border-radius: 8px;'><div style='font-weight: 800; color: #166534; margin-bottom: 6px;'>🇮🇩 INDONESIA</div><div>Iklim: Tropis</div><div>Zona: IVb</div><div>30°C / 65% RH</div><div style='margin-top: 8px; background: #DCFCE7; padding: 4px 6px; border-radius: 4px; color: #166534; font-size: 11px;'>Data yang ada: uji zona IVb ✓</div></div><div style='flex: 1; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 10px; border-radius: 8px;'><div style='font-weight: 800; color: #1D4ED8; margin-bottom: 6px;'>🇻🇳 VIETNAM</div><div>Iklim: Tropis</div><div>Zona: IVb</div><div>30°C / 65% RH</div><div style='margin-top: 8px; background: #EFF6FF; padding: 4px 6px; border-radius: 4px; color: #1D4ED8; font-size: 11px;'>Perlu: verifikasi persyaratan NRA Vietnam</div></div></div><div style='text-align: center; font-size: 12px; color: #64748B; margin-top: 10px; font-weight: 600;'>Zona iklim sama — apakah data otomatis berlaku?</div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Data zona IVb yang sudah ada otomatis berlaku untuk Vietnam karena kedua negara beriklim tropis yang sama", correct: false, feedback: "Kesamaan zona iklim tidak berarti kesamaan persyaratan regulasi. Setiap negara memiliki NRA (National Regulatory Authority) yang independen — Vietnam Pharmacy Authority punya persyaratan sendiri yang mungkin memiliki ketentuan tambahan atau format laporan yang berbeda. Asumsi tanpa verifikasi bisa menyebabkan penolakan registrasi." },
                      { id: "b", icon: "🔍", text: "Verifikasi persyaratan regulasi Vietnam terlebih dahulu — meski zona iklimnya sama, setiap negara memiliki otoritas regulasi dan persyaratan spesifik tersendiri yang mungkin berbeda", correct: true, feedback: "Tepat! Meski kondisi iklim (zona IVb) sama, setiap negara memiliki otoritas regulasi yang independen. Data zona IVb yang disetujui BPOM mungkin bisa digunakan kembali — tapi tim regulatory affairs harus memverifikasi persyaratan NRA Vietnam terlebih dahulu. Asumsi 'otomatis berlaku' tanpa verifikasi adalah risiko regulasi yang tidak perlu." },
                      { id: "c", icon: "🔬", text: "Jalankan ulang uji stabilitas lengkap khusus untuk Vietnam menggunakan sampel produksi di sana", correct: false, feedback: "Menjalankan ulang uji stabilitas dari awal tidak diperlukan jika data zona IVb yang ada sudah valid dan bisa diterima oleh regulator Vietnam. Langkah yang benar adalah verifikasi persyaratan dulu, lalu tentukan apakah data yang ada sudah cukup atau perlu tambahan spesifik." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-N01 Selesai!",
                      insight: "Anda sudah memahami ketentuan BPOM tentang penetapan dan pencantuman Expiry Date — dan tahu bagaimana menerapkannya dalam situasi nyata di industri farmasi.",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Tiga kewajiban utama ke BPOM: data uji stabilitas saat registrasi · Expiry Date eksplisit di label · On-going stability study selama produk beredar",
                        "Data accelerated boleh untuk registrasi awal, tapi wajib dilanjutkan dengan real-time study sebagai konfirmasi",
                        "Klaim Shelf Life tidak boleh melebihi batas data aktual yang tersedia — proyeksi statistik tidak cukup",
                        "Obat kedaluwarsa wajib dipisahkan dan dimusnahkan sesuai prosedur — tidak boleh dijual dengan alasan apapun"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "shelf-life-vs-retest-date",
                title:    "Membedakan Shelf Life produk jadi vs Retest Date bahan baku",
                icon:     "🧪",
                duration: "20 menit",
                slides: [
                  // SLIDE 1: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan: menggambarkan SHELF LIFE PRODUK JADI atau RETEST DATE BAHAN BAKU?",
                      text: "",
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life_produk", label: "💊 Shelf Life Produk Jadi", subLabel: "Batas final — tidak bisa digunakan setelah ini", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "retest_date", label: "🧪 Retest Date Bahan Baku", subLabel: "Batas untuk diuji ulang — belum tentu harus dibuang", bg: "#EFF6FF", border: "#2563EB" }
                    ],
                    cards: [
                      { id: "c1", icon: "🚫", text: "Setelah tanggal ini terlampaui, produk tidak boleh digunakan, dijual, atau didistribusikan dalam kondisi apapun", targetZone: "shelf_life_produk" },
                      { id: "c2", icon: "🔬", text: "Setelah tanggal ini terlampaui, material harus diambil sampelnya dan diuji ulang di laboratorium sebelum boleh digunakan untuk produksi", targetZone: "retest_date" },
                      { id: "c3", icon: "📋", text: "Jika uji ulang menunjukkan material masih memenuhi spesifikasi, batas waktunya bisa diperpanjang", targetZone: "retest_date" },
                      { id: "c4", icon: "⏰", text: "Tanggal ini adalah titik akhir yang ditetapkan berdasarkan uji stabilitas produk dan tidak bisa diperpanjang dengan pengujian tambahan", targetZone: "shelf_life_produk" },
                      { id: "c5", icon: "🏭", text: "Berlaku untuk tablet, kapsul, sirup, injeksi, dan semua bentuk sediaan yang sudah melewati proses produksi", targetZone: "shelf_life_produk" },
                      { id: "c6", icon: "🧂", text: "Berlaku untuk API (Active Pharmaceutical Ingredient), eksipien, pelarut, dan bahan pengemas yang digunakan dalam proses pembuatan obat", targetZone: "retest_date" }
                    ],
                    feedbackCorrect: "Sempurna! Perbedaan paling kritis: Shelf Life produk jadi adalah batas final yang tidak bisa diubah — setelah terlampaui, selesai. Retest Date bahan baku adalah undangan untuk menguji ulang — setelah terlampaui, bahan harus diuji dulu sebelum diputuskan nasibnya. Bahan yang lulus uji ulang bisa tetap digunakan dengan Retest Date baru.",
                    feedbackWrong: "Ada yang tertukar. Kunci utama: Shelf Life = FINAL, tidak bisa diperpanjang. Retest Date = SINYAL untuk menguji ulang, bisa diperpanjang jika lulus uji. Ini perbedaan yang menentukan bagaimana gudang farmasi mengelola stok materialnya."
                  },

                  // SLIDE 2: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap situasi di gudang farmasi ini: mencerminkan pengelolaan SHELF LIFE PRODUK JADI atau RETEST DATE BAHAN BAKU?",
                      text: "",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 10px; font-size: 13px; color: #475569;'>Bu Sari adalah kepala gudang PT Farma Prima. Berikut berbagai situasi yang ia hadapi setiap hari.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life_produk", label: "💊 Shelf Life Produk Jadi", subLabel: "Batas final — tidak bisa digunakan setelah ini", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "retest_date", label: "🧪 Retest Date Bahan Baku", subLabel: "Batas untuk diuji ulang — belum tentu harus dibuang", bg: "#EFF6FF", border: "#2563EB" }
                    ],
                    cards: [
                      { id: "s1", icon: "📦", text: "Bu Sari menemukan 200 boks tablet antihipertensi yang Expiry Date-nya sudah terlampaui 2 minggu lalu — ia langsung memindahkannya ke area karantina untuk dimusnahkan", targetZone: "shelf_life_produk" },
                      { id: "s2", icon: "🧪", text: "Bu Sari menerima alert dari sistem: drum asam stearate (eksipien) sudah melewati tanggal yang tertera — ia mengambil sampel dan mengirimnya ke lab untuk diuji ulang", targetZone: "retest_date" },
                      { id: "s3", icon: "✅", text: "Lab melaporkan bahwa asam sitrat yang sudah melewati batas tanggalnya masih memenuhi semua spesifikasi — Bu Sari memperbarui tanggal di sistem dan material bisa lanjut digunakan", targetZone: "retest_date" },
                      { id: "s4", icon: "🚫", text: "Meski kondisi fisik sirup vitamin C masih terlihat jernih dan tidak berbau, Bu Sari tidak memperbolehkan produk yang sudah melewati Expiry Date-nya masuk kembali ke stok aktif", targetZone: "shelf_life_produk" },
                      { id: "s5", icon: "📋", text: "Tim QC menetapkan jadwal pengujian ulang untuk semua drum talk (bahan pengisi tablet) yang akan mencapai batas tanggalnya dalam 3 bulan ke depan", targetZone: "retest_date" },
                      { id: "s6", icon: "⚠️", text: "Bu Sari menolak permintaan bagian produksi untuk menggunakan batch tablet amoksisilin yang EXP-nya terlampaui kemarin — meski 'hanya 1 hari'", targetZone: "shelf_life_produk" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan kartu 3 — asam sitrat yang sudah melewati Retest Date-nya ternyata masih layak pakai setelah diuji ulang. Ini tidak mungkin terjadi pada produk jadi: tablet amoksisilin di kartu 6 yang baru 1 hari melewati EXP langsung ditolak tanpa perlu uji tambahan. Satu konsep punya escape route (uji ulang), yang lain tidak.",
                    feedbackWrong: "Ada yang tertukar. Escape route adalah kata kuncinya: Retest Date punya escape route — jika lulus uji ulang, material bisa dilanjutkan. Shelf Life produk jadi tidak punya escape route — tidak ada pengujian yang bisa menyelamatkan produk yang sudah melewati EXP."
                  },

                  // SLIDE 3: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan: menggambarkan karakteristik SHELF LIFE PRODUK JADI atau RETEST DATE BAHAN BAKU?",
                      text: "",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 10px; font-size: 13px; color: #475569;'>Berikut berbagai karakteristik tentang bagaimana dua jenis batas waktu ini ditetapkan dan dikelola.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life_produk", label: "💊 Shelf Life Produk Jadi", subLabel: "Batas final — tidak bisa digunakan setelah ini", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "retest_date", label: "🧪 Retest Date Bahan Baku", subLabel: "Batas untuk diuji ulang — belum tentu harus dibuang", bg: "#EFF6FF", border: "#2563EB" }
                    ],
                    cards: [
                      { id: "k1", icon: "📊", text: "Ditetapkan berdasarkan data uji stabilitas produk akhir — mencakup semua tahap produksi, pengemasan, dan kondisi penyimpanan distribusi", targetZone: "shelf_life_produk" },
                      { id: "k2", icon: "🧪", text: "Ditetapkan oleh supplier bahan baku berdasarkan data uji stabilitas material tersebut, dan dikonfirmasi oleh produsen obat melalui pengujian saat penerimaan", targetZone: "retest_date" },
                      { id: "k3", icon: "🏷️", text: "Tercantum di label produk yang beredar di pasar — bisa dibaca oleh konsumen, apoteker, dan tenaga kesehatan", targetZone: "shelf_life_produk" },
                      { id: "k4", icon: "📁", text: "Tercantum di Certificate of Analysis (CoA) dan label drum/kantong material di gudang — bukan untuk konsumen akhir", targetZone: "retest_date" },
                      { id: "k5", icon: "🔄", text: "Bisa diperpanjang secara bertahap selama material terus lulus uji ulang dan masih dalam kondisi penyimpanan yang tepat", targetZone: "retest_date" },
                      { id: "k6", icon: "🔒", text: "Tidak bisa diperpanjang dengan pengujian ulang — satu-satunya cara mendapatkan produk dengan tanggal lebih panjang adalah memproduksi batch baru", targetZone: "shelf_life_produk" }
                    ],
                    feedbackCorrect: "Tepat! Kartu 4 memperkenalkan CoA — Certificate of Analysis. Ini adalah dokumen yang menyertai setiap pengiriman bahan baku dari supplier dan berisi, antara lain, Retest Date material tersebut. Staf QC gudang harus selalu memeriksa CoA saat menerima bahan baku dan memastikan Retest Date yang tertera sudah dimasukkan ke dalam sistem manajemen gudang.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan siapa yang bisa melihat informasi ini: Shelf Life ada di label produk yang bisa dibaca konsumen. Retest Date ada di CoA dan label drum/kantong internal gudang — hanya untuk pengguna profesional di industri."
                  },

                  // SLIDE 4: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      labelColor: "#166534",
                      label: "Klasifikasikan setiap pernyataan: berkaitan dengan SHELF LIFE PRODUK JADI atau RETEST DATE BAHAN BAKU?",
                      text: "",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px 16px; border-radius: 10px; font-size: 13px; color: #475569;'>PT Generik Prima sedang menghadapi berbagai situasi di departemen QC dan gudangnya. Perhatikan setiap situasi berikut.</div>"
                    },
                    instruction: "Tap kartu, lalu tap zona tujuannya.",
                    zones: [
                      { id: "shelf_life_produk", label: "💊 Shelf Life Produk Jadi", subLabel: "Batas final — tidak bisa digunakan setelah ini", bg: "#FEF2F2", border: "#DC2626" },
                      { id: "retest_date", label: "🧪 Retest Date Bahan Baku", subLabel: "Batas untuk diuji ulang — belum tentu harus dibuang", bg: "#EFF6FF", border: "#2563EB" }
                    ],
                    cards: [
                      { id: "g1", icon: "🌡️", text: "Manajer QC menetapkan bahwa laktosa monohidrat yang disimpan pada kondisi di luar spesifikasi (kelembapan tinggi) harus segera diuji ulang meski belum mencapai tanggal yang tertera di CoA-nya", targetZone: "retest_date" },
                      { id: "g2", icon: "📦", text: "Bagian distribusi memastikan bahwa setiap produk yang dikirim ke apotek memiliki sisa masa pakai minimal 6 bulan dari tanggal pengiriman", targetZone: "shelf_life_produk" },
                      { id: "g3", icon: "🔬", text: "Setelah diuji ulang dan dinyatakan tidak memenuhi spesifikasi, magnesium stearat (pelicin tablet) langsung diberi label REJECT dan dijadwalkan untuk dimusnahkan", targetZone: "retest_date" },
                      { id: "g4", icon: "📋", text: "Auditor BPOM memeriksa apakah semua produk yang berada di rak apotek mitra masih memiliki tanggal yang valid dan tidak ada yang sudah terlampaui", targetZone: "shelf_life_produk" },
                      { id: "g5", icon: "⏳", text: "Staf gudang mencatat bahwa PVP (polivinilpirolidon — pengikat tablet) yang baru tiba dari supplier memiliki batas tanggal 24 bulan dari tanggal produksinya", targetZone: "retest_date" },
                      { id: "g6", icon: "🏷️", text: "Customer service menerima keluhan dari apoteker bahwa produk yang diterima hanya punya sisa masa pakai 2 bulan — terlalu pendek untuk dijual habis sebelum kedaluwarsa", targetZone: "shelf_life_produk" }
                    ],
                    feedbackCorrect: "Sempurna! Kartu 1 memperkenalkan prinsip penting: Retest Date bisa dipercepat jika kondisi penyimpanan tidak terpenuhi. Sama seperti Shelf Life produk jadi yang bisa 'habis lebih cepat' jika obat disimpan di tempat panas, bahan baku yang tersimpan dalam kondisi salah perlu diuji ulang lebih awal dari jadwalnya. Kondisi penyimpanan adalah syarat berlakunya kedua jenis batas waktu ini.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan kata kunci: 'sisa masa pakai', 'tanggal valid di apotek', 'keluhan apoteker tentang tanggal pendek' = Shelf Life produk jadi. 'Uji ulang', 'CoA', 'eksipien/API', 'batas di gudang' = Retest Date bahan baku."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Shelf Life Produk Jadi vs Retest Date Bahan Baku — Perbedaan yang Menentukan",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-rt-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Definisi dan perbedaan fundamental",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Dua konsep ini sering dianggap sama padahal mekanismenya berbeda secara fundamental:</p><div style='background: #1E293B; border-radius: 8px; overflow: hidden; font-size: 12px; font-family: monospace;'><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; background: #334155; padding: 8px 12px; font-weight: 700; color: #94A3B8; font-size: 11px;'><div></div><div style='color: #FCA5A5;'>SHELF LIFE<br/>PRODUK JADI</div><div style='color: #93C5FD;'>RETEST DATE<br/>BAHAN BAKU</div></div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px; border-top: 1px solid #334155; gap: 4px; align-items: start;'><div style='color: #94A3B8; font-size: 11px;'>Apa itu?</div><div style='color: #E2E8F0;'>Batas waktu final penggunaan produk jadi</div><div style='color: #E2E8F0;'>Batas waktu untuk dilakukan pengujian ulang</div></div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px; border-top: 1px solid #334155; gap: 4px; align-items: start; background: #1A2535;'><div style='color: #94A3B8; font-size: 11px;'>Berlaku untuk</div><div style='color: #E2E8F0;'>Tablet, kapsul, sirup, injeksi</div><div style='color: #E2E8F0;'>API, eksipien, pelarut, bahan pengemas</div></div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px; border-top: 1px solid #334155; gap: 4px; align-items: start;'><div style='color: #94A3B8; font-size: 11px;'>Setelah terlampaui</div><div style='color: #FCA5A5; font-weight: 700;'>Tidak boleh digunakan dalam kondisi apapun</div><div style='color: #93C5FD;'>Harus diuji ulang di lab sebelum diputuskan</div></div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px; border-top: 1px solid #334155; gap: 4px; align-items: start; background: #1A2535;'><div style='color: #94A3B8; font-size: 11px;'>Bisa diperpanjang?</div><div style='color: #FCA5A5; font-weight: 700;'>TIDAK</div><div style='color: #4ADE80; font-weight: 700;'>YA — jika lulus uji ulang</div></div><div style='display: grid; grid-template-columns: 1fr 1fr 1fr; padding: 8px 12px; border-top: 1px solid #334155; gap: 4px; align-items: start;'><div style='color: #94A3B8; font-size: 11px;'>Tertera di</div><div style='color: #E2E8F0;'>Label produk untuk konsumen</div><div style='color: #E2E8F0;'>CoA dan label drum/kantong di gudang</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 16px; font-size: 13px;'>📌 Analogi: Shelf Life produk jadi seperti kontrak sewa yang tidak bisa diperpanjang — setelah habis, selesai. Retest Date bahan baku seperti SIM yang perlu diperpanjang — setelah habis, perlu diperbarui, tapi bisa tetap berlaku jika lolos ujian perpanjangan.</div></div>"
                      },
                      {
                        id: "pnl-rt-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Bagaimana Retest Date bekerja dalam praktik",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Retest Date bukan &quot;tanggal kadaluwarsa bahan baku&quot; — ini adalah kesalahpahaman yang sangat umum. Mekanisme yang benar:</p><div style='background: #1E293B; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px; line-height: 2;'><div style='text-align: center; color: #94A3B8;'>Bahan baku tiba di gudang<br/>↓<br/>Ditetapkan Retest Date (dari CoA supplier)<br/>↓<br/>Retest Date terlampaui<br/>↓<br/><span style='color: #FBBF24; font-weight: bold;'>BAHAN DIKARANTINA</span><br/>↓<br/>Sampel diambil &amp; diuji di lab<br/>↓<br/><div style='display: inline-flex; gap: 40px;'><div><span style='color: #4ADE80;'>LULUS SPEK</span><br/>↓<br/>Retest Date baru<br/>(+12 atau +24 bulan)<br/>↓<br/>Bisa digunakan</div><div><span style='color: #F87171;'>GAGAL SPEK</span><br/>↓<br/>REJECT &amp;<br/>Dimusnahkan</div></div></div></div><p style='margin-top: 14px; font-size: 13px;'>Satu material bisa melewati beberapa siklus Retest Date — diuji ulang, lulus, Retest Date diperpanjang, diuji ulang lagi — sampai akhirnya tidak lulus atau habis digunakan.</p></div>"
                      },
                      {
                        id: "pnl-rt-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Dokumen kunci: Certificate of Analysis (CoA)",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>CoA adalah dokumen yang menyertai setiap pengiriman bahan baku dari supplier. Ini adalah sumber informasi utama Retest Date di gudang farmasi.</p><div style='background: #1E293B; border: 1px solid #334155; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; margin-bottom: 14px; white-space: pre-wrap; line-height: 1.8;'>CERTIFICATE OF ANALYSIS&#10;PT Bahan Kimia Prima — Supplier API&#10;────────────────────────────────────────&#10;Material    : Paracetamol API&#10;Batch No    : PC240101&#10;Quantity    : 500 kg&#10;MFG Date    : 15 January 2024&#10;<span style='background: #1D4ED8; color: white; padding: 1px 4px; border-radius: 3px;'>RETEST DATE : 15 January 2026</span>&#10;────────────────────────────────────────&#10;Test Results:&#10;Assay       : 99.8% (Spec: 98.0%–101.0%)  PASS&#10;Moisture    : 0.12% (Spec: ≤0.5%)          PASS&#10;Heavy Metal : &lt;10 ppm (Spec: ≤20 ppm)      PASS&#10;────────────────────────────────────────&#10;Conclusion: APPROVED FOR USE</div><div style='display: flex; flex-direction: column; gap: 10px;'><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #60A5FA;'><div style='font-weight: 700; color: #60A5FA; margin-bottom: 4px; font-size: 13px;'>📋 CoA harus diperiksa saat penerimaan</div><div style='font-size: 12px;'>Setiap pengiriman bahan baku harus disertai CoA asli. Staf QC harus memverifikasi bahwa Retest Date di CoA sudah dimasukkan ke sistem manajemen gudang.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #FBBF24;'><div style='font-weight: 700; color: #FBBF24; margin-bottom: 4px; font-size: 13px;'>🔍 CoA harus diverifikasi keasliannya</div><div style='font-size: 12px;'>CPOB mengharuskan produsen memverifikasi bahwa CoA yang diterima benar-benar dikeluarkan oleh supplier yang sah — bukan dokumen palsu.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #4ADE80;'><div style='font-weight: 700; color: #4ADE80; margin-bottom: 4px; font-size: 13px;'>📅 Retest Date di CoA adalah titik awal, bukan titik akhir</div><div style='font-size: 12px;'>Jika material diuji ulang dan lulus, Retest Date baru ditetapkan oleh tim QC produsen — bukan lagi dari CoA supplier.</div></div></div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: MCQ - Soal 5
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih tindakan yang paling tepat",
                      text: "Staf gudang PT Farma Prima menemukan bahwa drum API paracetamol yang tersimpan di gudang sudah melewati Retest Date-nya 2 minggu lalu. Besok tim produksi berencana menggunakan material ini untuk batch produksi tablet paracetamol. Apa yang harus dilakukan staf gudang?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: flex; align-items: flex-start; gap: 10px;'><span style='font-size: 20px;'>📦</span><div><strong>Drum API Paracetamol</strong><br/><span style='color: #DC2626;'>Retest Date: 2 minggu lalu (sudah lewat)</span><br/><span style='color: #6B7280;'>Kondisi fisik: terlihat normal</span></div></div><div style='display: flex; align-items: flex-start; gap: 10px;'><span style='font-size: 20px;'>🏭</span><div><strong>Rencana produksi besok:</strong><br/>Gunakan API ini untuk batch tablet</div></div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Izinkan digunakan — Retest Date hanya estimasi dan kondisi fisik API masih terlihat normal", correct: false, feedback: "Kondisi fisik yang 'terlihat normal' bukan pengganti data uji laboratorium. Retest Date bukan 'estimasi' — ia adalah batas setelah mana material wajib diverifikasi ulang kualitasnya sebelum boleh digunakan. Kerusakan kimia pada API sering tidak terlihat secara visual." },
                      { id: "b", icon: "🔬", text: "Karantina drum API tersebut segera, informasikan tim produksi bahwa material tidak bisa digunakan sebelum hasil uji ulang laboratorium tersedia, lalu ambil sampel untuk diuji", correct: true, feedback: "Tepat! Material yang sudah melewati Retest Date-nya tidak boleh digunakan dalam produksi sebelum lulus uji ulang — tanpa pengecualian. Langkah yang benar: karantina segera, informasikan tim produksi, lalu proses uji ulang. Menggunakan material yang belum lulus uji ulang berarti menggunakan material yang status kualitasnya tidak diketahui — ini pelanggaran CPOB yang serius." },
                      { id: "c", icon: "⏸️", text: "Tunda uji ulang dulu sampai tim produksi selesai menggunakan sebagian material, baru sisanya diuji ulang", correct: false, feedback: "Menggunakan sebagian material yang belum lulus uji ulang sama berisikonya dengan menggunakan semuanya. CPOB tidak mengizinkan penggunaan material yang sudah melewati Retest Date-nya dalam kondisi apapun sebelum hasil uji ulang tersedia. Produksi harus dijadwalkan ulang." }
                    ]
                  },

                  // SLIDE 7: MCQ - Soal 6
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih tindakan yang paling tepat",
                      text: "Lab QC PT Farma Andal baru selesai menguji ulang 3 drum eksipien laktosa yang sudah melewati Retest Date-nya. Hasil: Drum A lulus semua spesifikasi. Drum B lulus semua spesifikasi. Drum C gagal uji kadar air — kadar airnya 1,5% padahal spesifikasi maksimum 0,5%. Apa tindakan yang tepat untuk masing-masing drum?",
                      htmlContext: "<div style='background: white; border: 1px solid #CBD5E1; border-radius: 10px; overflow: hidden; margin-bottom: 12px; font-size: 12px;'><div style='display: grid; grid-template-columns: 60px 1fr 1fr; background: #F1F5F9; padding: 8px 12px; font-weight: 700; color: #475569; font-size: 11px;'><div>Drum</div><div>Hasil Uji Ulang</div><div>Status</div></div><div style='display: grid; grid-template-columns: 60px 1fr 1fr; padding: 8px 12px; border-top: 1px solid #E2E8F0; align-items: center;'><div style='font-weight: 700;'>A</div><div style='color: #475569;'>Semua parameter memenuhi spek</div><div style='color: #16A34A; font-weight: 700;'>✓ LULUS</div></div><div style='display: grid; grid-template-columns: 60px 1fr 1fr; padding: 8px 12px; border-top: 1px solid #E2E8F0; align-items: center; background: #F8FAFC;'><div style='font-weight: 700;'>B</div><div style='color: #475569;'>Semua parameter memenuhi spek</div><div style='color: #16A34A; font-weight: 700;'>✓ LULUS</div></div><div style='display: grid; grid-template-columns: 60px 1fr 1fr; padding: 8px 12px; border-top: 1px solid #E2E8F0; align-items: center;'><div style='font-weight: 700;'>C</div><div style='color: #475569;'>Kadar air 1,5% (maks 0,5%)</div><div style='color: #DC2626; font-weight: 700;'>✗ GAGAL</div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🔄", text: "Uji ulang Drum C sekali lagi — mungkin ada kesalahan pengujian, sayang jika langsung direject", correct: false, feedback: "Menguji ulang material yang gagal tidak diizinkan kecuali ada investigasi terdokumentasi yang membuktikan bahwa kegagalan disebabkan oleh error pengujian. 'Sayang jika direject' bukan alasan yang valid dalam konteks CPOB. Drum C harus di-REJECT berdasarkan data yang ada." },
                      { id: "b", icon: "✅", text: "Tetapkan Retest Date baru untuk Drum A dan B sehingga bisa digunakan kembali, sementara Drum C langsung diberi status REJECT dan diproses untuk pemusnahan", correct: true, feedback: "Tepat! Prosedur yang benar setelah uji ulang: material yang lulus (Drum A dan B) mendapat Retest Date baru dan bisa dilepas ke produksi. Material yang gagal (Drum C) langsung mendapat status REJECT — tidak ada opsi 'coba lagi' kecuali ada bukti kuat bahwa ada kesalahan prosedur pengujian yang terdokumentasi. Keputusan harus berdasarkan data." },
                      { id: "c", icon: "🤔", text: "Tunda keputusan untuk semua drum sampai ada konfirmasi dari supplier tentang kondisi awal material", correct: false, feedback: "Menunggu konfirmasi supplier tidak diperlukan — tim QC PT Farma Andal sudah memiliki data uji ulang yang valid. Keputusan berdasarkan hasil uji internal adalah tanggung jawab dan kewenangan tim QC, bukan kewenangan supplier." }
                    ]
                  },

                  // SLIDE 8: MCQ - Soal 7
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih tindakan yang paling tepat",
                      text: "Manager produksi PT Farma Maju menemukan bahwa satu batch tablet antidiabetes yang sudah selesai diproduksi ternyata menggunakan API yang sudah 3 hari melewati Retest Date-nya tanpa diuji ulang terlebih dahulu — karena ada miscommunication di gudang. Produk sudah dikemas tapi belum dikirim. Apa yang harus dilakukan?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px; font-family: monospace; line-height: 2; color: #1E293B;'><div>API melewati Retest Date</div><div style='color: #94A3B8;'>↓</div><div>Miscommunication di gudang</div><div style='color: #94A3B8;'>↓</div><div style='color: #DC2626; font-weight: bold;'>API digunakan produksi (TANPA uji ulang)</div><div style='color: #94A3B8;'>↓</div><div>Batch tablet selesai diproduksi + dikemas</div><div style='color: #94A3B8;'>↓</div><div style='color: #D97706; font-weight: bold;'>Ditemukan kesalahan sekarang</div><div style='color: #94A3B8;'>↓</div><div style='color: #16A34A;'>Produk belum dikirim ke pasaran ✓</div></div>"
                    },
                    options: [
                      { id: "a", icon: "🚀", text: "Kirim produk sesuai jadwal — API kemungkinan masih baik karena hanya 3 hari lewat Retest Date, dan produk sudah jadi", correct: false, feedback: "Merilis produk yang dibuat dari material dengan status kualitas tidak diketahui adalah pelanggaran CPOB yang serius dan bisa membahayakan pasien. Fakta bahwa produk sudah jadi tidak menghilangkan kewajiban memastikan semua input produksi memenuhi spesifikasi." },
                      { id: "b", icon: "🔒", text: "Karantina seluruh batch, buka investigasi (deviation report), lakukan pengujian API sisa dan uji produk jadi dari batch tersebut secara komprehensif, keputusan rilis atau pemusnahan berdasarkan hasil investigasi", correct: true, feedback: "Tepat! Ini adalah skenario deviasi serius dalam CPOB. Karantina batch segera, buat deviation report, uji sisa API dan produk jadi dari batch tersebut secara komprehensif, lalu ambil keputusan rilis atau pemusnahan berdasarkan data. Jika investigasi menunjukkan API ternyata masih memenuhi spesifikasi, batch mungkin bisa dirilis dengan justifikasi yang kuat." },
                      { id: "c", icon: "🤫", text: "Dokumentasikan sebagai temuan internal saja, rilis produk, dan perbaiki prosedur gudang ke depannya tanpa melaporkan ke BPOM", correct: false, feedback: "Menyembunyikan deviasi serius dari BPOM adalah pelanggaran yang jauh lebih berat dari deviasi itu sendiri. CPOB mewajibkan transparansi dan pelaporan deviasi signifikan. Deviasi yang ditemukan kemudian saat inspeksi BPOM — dan terbukti disembunyikan — bisa berujung pada pencabutan izin edar dan sanksi pidana." }
                    ]
                  },

                  // SLIDE 9: MCQ - Soal 8
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih tindakan yang paling tepat",
                      text: "Staf QC PT Herbal Prima sedang mereview stok bahan baku. Ia menemukan kantong titanium dioksida (eksipien untuk coating tablet) yang Retest Date-nya masih 6 bulan lagi — tapi kantongnya sudah pernah dibuka dan ditutup kembali 8 bulan yang lalu. Selama itu, kantong disimpan di gudang ber-AC standar. Apa yang paling tepat dilakukan?",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='display: flex; flex-direction: column; gap: 8px;'><div style='display: flex; align-items: flex-start; gap: 10px;'><span style='font-size: 20px;'>📦</span><div><strong>Titanium Dioksida (eksipien coating)</strong><br/><span style='color: #16A34A;'>Retest Date: masih 6 bulan lagi ✓</span></div></div><div style='background: #FEF2F2; padding: 10px; border-radius: 8px; border-left: 3px solid #DC2626;'><div style='font-weight: 700; color: #DC2626; margin-bottom: 4px;'>⚠️ Kondisi khusus:</div><div style='color: #7C2D12; font-size: 12px;'>• Pernah dibuka 8 bulan lalu<br/>• Ditutup kembali (tidak vacuum-sealed)<br/>• Disimpan di gudang AC standar selama itu</div></div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Gunakan langsung — Retest Date masih 6 bulan lagi, kondisi penyimpanan sudah sesuai", correct: false, feedback: "Retest Date yang belum terlampaui bukan jaminan otomatis bahwa material masih layak jika kondisi penyimpanannya berubah. Kemasan yang sudah pernah dibuka selama 8 bulan mengubah asumsi yang mendasari penetapan Retest Date. Menggunakan material ini tanpa pengujian tambahan adalah risiko kualitas yang tidak perlu." },
                      { id: "b", icon: "🔬", text: "Lakukan pengujian ulang lebih awal dari jadwal Retest Date — kemasan yang sudah pernah dibuka mengubah kondisi penyimpanan material dan bisa mempercepat degradasi", correct: true, feedback: "Tepat! Retest Date yang tertera di CoA dihitung berdasarkan asumsi kemasan tersegel penuh. Begitu kemasan dibuka, kondisi penyimpanan berubah. Uji ulang lebih awal sangat dianjurkan — bukan karena Retest Date sudah terlampaui, tapi karena kondisi penyimpanan aktualnya berbeda dari yang diasumsikan. Jika lulus, material bisa digunakan. Jika gagal, di-REJECT." },
                      { id: "c", icon: "🗑️", text: "Buang seluruh kantong — material yang sudah dibuka tidak bisa digunakan lagi dalam produksi farmasi", correct: false, feedback: "Membuang material tanpa data tidak efisien dan tidak diharuskan CPOB. Material yang kemasannya pernah dibuka tidak otomatis reject — ia perlu diuji ulang untuk menentukan kondisinya. Jika lulus spesifikasi, material masih bisa digunakan. Keputusan harus berdasarkan data, bukan asumsi." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-N02 Selesai!",
                      insight: "Anda sudah memahami perbedaan fundamental antara Shelf Life produk jadi dan Retest Date bahan baku — dan tahu bagaimana mengambil keputusan yang tepat berdasarkan status keduanya.",
                      icon: "🧪",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Shelf Life produk jadi = batas final, tidak bisa diperpanjang — setelah terlampaui tidak ada opsi kecuali pemusnahan",
                        "Retest Date bahan baku = batas untuk uji ulang — setelah terlampaui material dikarantina dan diuji, bisa dilanjutkan jika lulus",
                        "Material yang melewati Retest Date wajib dikarantina dulu — tidak boleh digunakan sebelum hasil uji ulang tersedia",
                        "Kondisi penyimpanan yang berubah (kemasan terbuka, suhu tidak terjaga) bisa memicu uji ulang lebih awal dari jadwal Retest Date"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },

              {
                id:       "dampak-penyimpanan-tidak-sesuai",
                title:    "Menjelaskan dampak penyimpanan tidak sesuai terhadap Shelf Life",
                icon:     "🌡️",
                duration: "20 menit",
                slides: [

                  // SLIDE 1: MCQ - Soal 1
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Apa dampak paling mungkin?",
                      text: "Tablet metformin (obat diabetes) dikemas dalam blister plastik biasa dan disimpan di laci meja kerja di ruang kantor tanpa AC selama 4 bulan. Suhu ruangan berkisar 32–38°C siang hari. Label menyatakan 'Simpan di bawah 30°C'. Apa dampak yang paling mungkin terjadi?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: flex; gap: 16px; flex-wrap: wrap;'><div><span style='font-size: 18px;'>🌡️</span> <strong>Suhu: 32–38°C</strong> (siang hari)</div><div><span style='font-size: 18px;'>💧</span> Tanpa AC</div><div><span style='font-size: 18px;'>🗄️</span> Laci meja kerja</div><div><span style='font-size: 18px;'>📦</span> Blister plastik biasa</div></div><div style='margin-top: 10px; background: white; padding: 8px 12px; border-radius: 6px; border-left: 3px solid #DC2626;'><strong>Label:</strong> &quot;Simpan di bawah 30°C&quot; &nbsp;|&nbsp; <strong>Durasi:</strong> 4 bulan</div><div style='margin-top: 8px; font-size: 11px; color: #6B7280; font-style: italic;'>Tablet masih terlihat normal secara visual. Tapi apa yang terjadi di dalamnya?</div></div>"
                    },
                    options: [
                      { id: "a", icon: "👁️", text: "Tidak ada dampak signifikan — tablet masih terlihat normal dan EXP belum terlampaui", correct: false, feedback: "Penampilan visual tidak mencerminkan kondisi kimia obat. Degradasi zat aktif akibat suhu tinggi hampir selalu terjadi secara kimiawi dulu — jauh sebelum ada perubahan fisik yang terlihat. EXP yang belum terlampaui juga tidak relevan karena EXP hanya berlaku jika syarat penyimpanan terpenuhi." },
                      { id: "b", icon: "📉", text: "Kadar metformin dalam tablet kemungkinan sudah menurun lebih cepat dari yang diperkirakan uji stabilitas — efektivitas obat untuk mengontrol gula darah bisa sudah berkurang", correct: true, feedback: "Tepat! Suhu di atas 30°C mempercepat degradasi kimia zat aktif. Tablet yang disimpan di 32–38°C selama 4 bulan bisa mengalami penurunan kadar metformin yang jauh lebih cepat dari yang diprediksi uji stabilitas. Yang berbahaya: secara visual tablet masih normal, tapi efektivitasnya bisa sudah berkurang. Pasien yang mengonsumsinya mungkin tidak menyadari gula darahnya tidak terkontrol dengan baik." },
                      { id: "c", icon: "🦠", text: "Tablet pasti terkontaminasi bakteri karena suhu tinggi mendukung pertumbuhan mikroba", correct: false, feedback: "Suhu tinggi (32–38°C) bukan kondisi optimal untuk pertumbuhan semua bakteri — dan tablet padat yang kering umumnya tidak rentan kontaminasi bakteri hanya karena suhu. Dampak utama dari suhu tinggi pada tablet adalah degradasi kimia zat aktif, bukan kontaminasi mikroba." }
                    ]
                  },

                  // SLIDE 2: MCQ - Soal 2
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Apa dampak paling mungkin?",
                      text: "Sirup antibiotik amoksisilin yang sudah dilarutkan (reconstituted) seharusnya disimpan di kulkas (2–8°C) dan habis dalam 7 hari. Karena lupa, botol disimpan di suhu kamar (28–30°C) selama 5 hari. Pasiennya adalah anak usia 4 tahun. Apa dampak paling mungkin yang perlu dipahami?",
                      htmlContext: "<div style='background: #EFF6FF; border: 1px solid #BFDBFE; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;'><div style='background: #F0FDF4; padding: 10px; border-radius: 8px; border: 1px solid #86EFAC;'><div style='font-weight: 800; color: #166534; margin-bottom: 4px;'>SEHARUSNYA:</div><div>🧊 Kulkas 2–8°C</div><div>⏱️ Habis dalam 7 hari</div></div><div style='background: #FEF2F2; padding: 10px; border-radius: 8px; border: 1px solid #FECACA;'><div style='font-weight: 800; color: #DC2626; margin-bottom: 4px;'>YANG TERJADI:</div><div>🌡️ Suhu kamar 28–30°C</div><div>📅 Sudah 5 hari di luar kulkas</div></div></div><div style='font-size: 11px; color: #1E293B;'>PASIEN: 👶 Anak 4 tahun &nbsp;|&nbsp; OBAT: Sirup Amoksisilin (antibiotik)</div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Masih aman — sirup baru 5 hari, belum melebihi batas 7 hari yang tertera", correct: false, feedback: "Batas 7 hari hanya berlaku jika disimpan di kulkas (2–8°C). Di suhu kamar, batas efektifnya jauh lebih pendek. Menggunakan batas '7 hari' sebagai acuan tanpa mempertimbangkan kondisi penyimpanan aktual adalah kesalahan yang berpotensi membahayakan." },
                      { id: "b", icon: "⚠️", text: "Potensi aktivitas antibiotik sudah berkurang signifikan karena suhu kamar mempercepat degradasi amoksisilin — mengonsumsinya berisiko dosis tidak efektif yang bisa memicu resistensi antibiotik pada anak", correct: true, feedback: "Tepat! Amoksisilin yang sudah dilarutkan sangat sensitif terhadap suhu — batas 7 hari di kulkas ditetapkan berdasarkan uji stabilitas di kondisi tersebut. Di suhu kamar (28–30°C), degradasi amoksisilin bisa 3–4 kali lebih cepat. Artinya 5 hari di suhu kamar bisa setara dengan 15–20 hari di kulkas dalam hal penurunan kadar aktif. Konsumsi antibiotik yang sudah berkurang efektivitasnya berbahaya karena bisa gagal membunuh bakteri dan memicu resistensi — sangat serius untuk anak kecil." },
                      { id: "c", icon: "🤒", text: "Sirup sudah pasti berbahaya dan akan menyebabkan keracunan pada anak", correct: false, feedback: "Amoksisilin yang terdegradasi tidak secara langsung menyebabkan keracunan akut — risikonya adalah ketidakefektifan, bukan toksisitas. Namun ketidakefektifan antibiotik pada anak tetap merupakan risiko medis yang serius karena infeksi bakteri yang tidak terobati bisa berkembang menjadi kondisi yang mengancam jiwa." }
                    ]
                  },

                  // SLIDE 3: MCQ - Soal 3
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Apa dampak paling mungkin?",
                      text: "Sebuah apotek menyimpan obat tetes mata kloramfenikol dalam lemari kaca yang terkena sinar matahari langsung setiap hari antara pukul 10.00–14.00. Label menyatakan 'Terlindung dari cahaya, simpan di bawah 25°C'. Botolnya bening (tidak berwarna). Kondisi ini berlangsung selama 2 bulan. Apa dampak paling mungkin?",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 10px;'><div>🏪 Lemari kaca apotek</div><div>☀️ Sinar matahari langsung</div><div>⏰ Pkl 10.00–14.00/hari</div><div>🍶 Botol bening</div><div>📅 2 bulan</div></div><div style='background: #FEF2F2; padding: 8px 12px; border-radius: 6px; border-left: 3px solid #DC2626; font-size: 11px;'><strong>Label:</strong> &quot;Terlindung dari cahaya, simpan di bawah 25°C&quot; — <strong style='color: #DC2626;'>Dua ketentuan dilanggar sekaligus</strong></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🎨", text: "Warna cairan tetes mata mungkin sedikit berubah, tapi efektivitasnya masih terjaga karena botol kaca melindungi isinya", correct: false, feedback: "Botol kaca tidak melindungi dari cahaya — cahaya UV menembus kaca biasa dengan mudah. Justru botol kaca bening adalah masalah utamanya: produk ini seharusnya dikemas dalam botol berwarna gelap (amber) untuk memblokir cahaya. Dan efektivitas bukan satu-satunya risiko — produk degradasi kloramfenikol bisa aktif berbahaya." },
                      { id: "b", icon: "⚗️", text: "Kloramfenikol mengalami fotodegradasi dan degradasi termal secara bersamaan — kadar zat aktif kemungkinan sudah turun signifikan dan produk degradasinya bisa bersifat toksik bagi mata", correct: true, feedback: "Tepat! Ini adalah kasus di mana dua faktor merusak bekerja bersamaan: cahaya UV memicu fotodegradasi kloramfenikol, dan suhu tinggi (di balik kaca yang terkena matahari bisa mencapai 40°C+) mempercepat degradasi termal. Yang sangat berbahaya: produk degradasi kloramfenikol bisa bersifat toksik dan iritan bagi mata. Botol bening memperparah masalah karena tidak memblokir cahaya sama sekali." },
                      { id: "c", icon: "💧", text: "Kelembapan dari udara masuk melalui botol dan mengencerkan tetes mata", correct: false, feedback: "Botol tetes mata yang tersegel rapat tidak bisa dimasuki uap air dari luar — desain kemasannya justru untuk mencegah kontaminasi eksternal. Kelembapan bukan mekanisme kerusakan yang relevan di sini. Cahaya dan suhu adalah faktor dominannya." }
                    ]
                  },

                  // SLIDE 4: MCQ - Soal 4
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Apa dampak paling mungkin?",
                      text: "Gudang distributor farmasi mengalami kerusakan AC selama 3 hari di musim kemarau. Suhu gudang mencapai 38–42°C. Stok yang tersimpan: (1) tablet antihipertensi dalam blister alu-alu, (2) krim antibiotik dalam tube aluminium, (3) sirup parasetamol dalam botol plastik bening, (4) suppositoria glycerin. Mana yang paling mungkin mengalami dampak paling parah?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='text-align: center; font-weight: 700; color: #DC2626; margin-bottom: 10px; font-size: 13px;'>Suhu gudang: 38–42°C selama 3 hari</div><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: white; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px;'><div>💊 <strong>Tablet antihipertensi</strong></div><div style='color: #6B7280; font-size: 11px; margin-top: 2px;'>Blister alu-alu</div></div><div style='background: white; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px;'><div>🧴 <strong>Krim antibiotik</strong></div><div style='color: #6B7280; font-size: 11px; margin-top: 2px;'>Tube aluminium</div></div><div style='background: white; border: 1px solid #E2E8F0; padding: 10px; border-radius: 8px;'><div>🍶 <strong>Sirup parasetamol</strong></div><div style='color: #6B7280; font-size: 11px; margin-top: 2px;'>Botol plastik bening</div></div><div style='background: #FEF2F2; border: 2px solid #FECACA; padding: 10px; border-radius: 8px;'><div>🕯️ <strong>Suppositoria glycerin</strong></div><div style='color: #DC2626; font-size: 11px; margin-top: 2px;'>Basis meleleh di ~37°C</div></div></div></div>"
                    },
                    options: [
                      { id: "a", icon: "💊", text: "Tablet antihipertensi — karena blister alu-alu tidak bisa menahan panas", correct: false, feedback: "Blister alu-alu justru adalah kemasan dengan perlindungan terbaik — aluminium memblokir cahaya, kelembapan, dan memberikan barrier termal yang lebih baik dari plastik. Tablet antihipertensi mungkin terdampak secara kimia oleh suhu tinggi, tapi tidak separah suppositoria yang rusak secara fisik instan." },
                      { id: "b", icon: "🕯️", text: "Suppositoria glycerin — basisnya (cocoa butter atau PEG) mulai meleleh pada suhu sekitar 37°C, sehingga bentuk sediaannya akan rusak secara fisik pada 38–42°C", correct: true, feedback: "Tepat! Suppositoria adalah sediaan yang paling rentan terhadap suhu tinggi karena basisnya dirancang untuk meleleh di suhu tubuh (±37°C). Di suhu 38–42°C, basis ini sudah mulai atau bahkan sudah sepenuhnya meleleh. Kerusakan fisik ini tidak bisa diperbaiki — suppositoria yang sudah meleleh dan mengeras kembali kehilangan homogenitas distribusi zat aktifnya. Produk lain mungkin juga terdampak, tapi kerusakannya lebih lambat secara kimia — bukan kerusakan fisik instan dan irreversible seperti pada suppositoria." },
                      { id: "c", icon: "🍶", text: "Sirup parasetamol — karena botol plastik bening tidak bisa menahan panas", correct: false, feedback: "Sirup parasetamol memang dalam kemasan yang kurang ideal, tapi parasetamol relatif stabil terhadap suhu dalam jangka pendek 3 hari. Dampak kimianya ada tapi lebih lambat dibandingkan kerusakan fisik instan pada suppositoria yang sudah melewati titik lelehnya." }
                    ]
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Dampak Penyimpanan Tidak Sesuai — Mekanisme dan Konsekuensinya",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-dp-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Prinsip utama: EXP hanya berlaku jika syarat penyimpanan terpenuhi",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Ini adalah prinsip yang paling sering disalahpahami: Expiry Date di label adalah <strong style='color: #FDE68A;'>jaminan bersyarat</strong>, bukan jaminan mutlak. Jaminan tersebut hanya berlaku selama produk disimpan sesuai instruksi yang tertera.</p><div style='background: #1E293B; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 12px; line-height: 2; margin-bottom: 14px; text-align: center;'><div style='color: #4ADE80; font-weight: 700;'>EXP yang valid =</div><div style='color: #CBD5E1;'>Shelf Life dari uji stabilitas</div><div style='color: #94A3B8;'>+</div><div style='color: #CBD5E1;'>Kondisi penyimpanan <strong style='color: #4ADE80;'>SESUAI</strong> instruksi</div><hr style='border-color: #334155; margin: 10px 0;'/><div style='color: #F87171; font-size: 11px;'>Jika kondisi penyimpanan TIDAK SESUAI:</div><div style='color: #FCA5A5; font-size: 11px;'>→ Produk bisa &quot;kedaluwarsa lebih cepat&quot; dari tanggal di label</div><div style='color: #FCA5A5; font-size: 11px;'>→ EXP di label tidak lagi berlaku sebagai jaminan</div></div><div style='display: flex; flex-direction: column; gap: 10px;'><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #F87171;'><div style='font-weight: 700; color: #FCA5A5; margin-bottom: 4px; font-size: 13px;'>📉 Penurunan kadar zat aktif lebih cepat</div><div style='font-size: 12px;'>Degradasi kimia yang seharusnya terjadi dalam 24 bulan bisa terjadi dalam 6–12 bulan jika suhu terus-menerus di atas yang ditetapkan. Produk terlihat normal tapi kandungannya sudah tidak memenuhi spesifikasi.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #FBBF24;'><div style='font-weight: 700; color: #FCD34D; margin-bottom: 4px; font-size: 13px;'>⚗️ Terbentuknya produk degradasi berbahaya</div><div style='font-size: 12px;'>Beberapa obat ketika terdegradasi tidak hanya menjadi tidak efektif — tapi menghasilkan zat baru yang bisa berbahaya. Contoh: tetracycline yang terdegradasi menghasilkan senyawa nefrotoksik.</div></div><div style='background: #1E293B; padding: 10px 12px; border-radius: 8px; border-left: 3px solid #60A5FA;'><div style='font-weight: 700; color: #93C5FD; margin-bottom: 4px; font-size: 13px;'>🧊 Kerusakan fisik ireversibel</div><div style='font-size: 12px;'>Emulsi yang berpisah, suppositoria yang meleleh, tablet yang lengket, kapsul gelatin yang mengeras — kerusakan fisik akibat suhu atau kelembapan tidak bisa diperbaiki dengan menyimpan kembali di kondisi yang benar.</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; margin-top: 16px; font-size: 12px;'>📌 Dua tipe kerusakan: Kerusakan kimia (penurunan kadar, produk degradasi) sering tidak terlihat secara visual. Kerusakan fisik (meleleh, berpisah, lengket) terlihat jelas. Keduanya menyebabkan produk tidak layak — tapi kerusakan kimia lebih berbahaya karena tidak terdeteksi tanpa pengujian laboratorium.</div></div>"
                      },
                      {
                        id: "pnl-dp-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Empat skenario penyimpanan salah yang paling umum",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Dari pengalaman inspeksi BPOM dan audit distribusi farmasi, empat skenario ini adalah yang paling sering ditemukan:</p><div style='display: flex; flex-direction: column; gap: 10px;'><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #F87171;'><div style='font-weight: 700; color: #FCA5A5; margin-bottom: 4px; font-size: 13px;'>🚗 Obat tertinggal di dalam mobil</div><div style='font-size: 12px;'>Suhu di dalam mobil yang terparkir di siang hari bisa mencapai 60–70°C. Hanya 2–4 jam di kondisi ini bisa setara dengan berbulan-bulan degradasi di suhu normal. Obat dalam glove compartment atau bagasi adalah pelanggaran penyimpanan yang sangat umum tapi sering tidak disadari.</div></div><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #FBBF24;'><div style='font-weight: 700; color: #FCD34D; margin-bottom: 4px; font-size: 13px;'>🚿 Obat disimpan di kamar mandi</div><div style='font-size: 12px;'>Kamar mandi adalah lingkungan yang sangat tidak cocok untuk penyimpanan obat — kelembapan tinggi dari shower, fluktuasi suhu yang besar, dan sering terpapar uap air langsung. Tablet yang lembap bisa hancur dan terpapar bakteri. Lemari obat di kamar mandi adalah pilihan terburuk.</div></div><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #60A5FA;'><div style='font-weight: 700; color: #93C5FD; margin-bottom: 4px; font-size: 13px;'>🌊 Pemutusan cold chain selama distribusi</div><div style='font-size: 12px;'>Produk yang memerlukan penyimpanan dingin (vaksin, insulin, suppositoria) paling rentan terhadap pemutusan cold chain. Satu kali paparan suhu di luar rentang yang diizinkan bisa mendiskualifikasi seluruh batch — bahkan jika paparan hanya beberapa jam dan produk terlihat tidak berubah.</div></div><div style='background: #1E293B; padding: 12px; border-radius: 8px; border-left: 3px solid #A78BFA;'><div style='font-weight: 700; color: #C4B5FD; margin-bottom: 4px; font-size: 13px;'>☀️ Penyimpanan dekat jendela atau sumber cahaya</div><div style='font-size: 12px;'>Produk yang sensitif cahaya (tetes mata, beberapa sirup, kapsul gelatin) yang terpapar cahaya matahari langsung bisa mengalami fotodegradasi yang signifikan dalam hitungan minggu.</div></div></div></div>"
                      },
                      {
                        id: "pnl-dp-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Cold chain — rantai dingin yang tidak boleh putus",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Cold chain adalah sistem distribusi yang memastikan produk yang memerlukan penyimpanan dingin selalu berada dalam rentang suhu yang ditetapkan — dari pabrik hingga ke tangan pasien.</p><div style='background: #1E293B; border-radius: 8px; padding: 14px; font-family: monospace; font-size: 11px; line-height: 1.9; margin-bottom: 14px; text-align: center; color: #94A3B8;'><div style='display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; text-align: center;'><div><div style='color: #4ADE80; font-weight: 700;'>[Pabrik]</div><div>2–8°C</div></div><div style='align-self: center;'>→</div><div><div style='color: #4ADE80; font-weight: 700;'>[Gudang Nasional]</div><div>2–8°C</div></div><div style='align-self: center;'>→</div><div><div style='color: #4ADE80; font-weight: 700;'>[Gudang Regional]</div><div>2–8°C</div></div></div><div style='margin: 8px 0; color: #475569; font-size: 10px;'>▼ Kendaraan Berpendingin ▼</div><div style='color: #4ADE80; font-weight: 700;'>[Apotek / RS] ← ← ← [Sub-distributor]</div><div style='font-size: 10px;'>2–8°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2–8°C</div><div style='margin-top: 8px; color: #FBBF24; font-size: 10px; font-weight: 700;'>Semua titik harus terjaga 2–8°C — tidak ada toleransi</div></div><p style='font-size: 13px; margin-bottom: 12px;'>Vaksin yang pernah membeku atau terpapar suhu terlalu tinggi kehilangan efektivitas proteksinya secara permanen — tanpa perubahan penampilan yang terlihat. Seorang anak yang divaksin dengan vaksin yang cold chain-nya pernah terputus bisa tidak terlindungi sama sekali.</p><div style='background: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px; border-radius: 4px; color: #1E293B; font-size: 12px;'><strong style='color: #DC2626;'>⚠️ Tanda-tanda cold chain violation:</strong> suhu logger menunjukkan excursion, indikator VVM (Vaccine Vial Monitor) berubah warna lebih gelap, atau kondensor kulkas ada bunga es berlebihan. Staf yang menangani produk cold chain wajib tahu cara membaca tanda-tanda ini.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: MCQ - Soal 5
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Apa tindakan yang paling tepat?",
                      text: "Seorang pasien membeli insulin pen di apotek dan pulang naik motor selama 45 menit di siang hari. Insulin disimpan dalam tas plastik di bagasi motor. Suhu udara luar 35°C — suhu bagasi motor bisa mencapai 50–55°C. Pasien baru menyadari ini saat sampai di rumah. Insulin belum dibuka. Apa yang paling tepat dilakukan pasien?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: flex; align-items: center; gap: 12px; margin-bottom: 10px; flex-wrap: wrap;'><div style='text-align: center;'><div>🏪 Apotek</div></div><div style='font-size: 18px; color: #9CA3AF;'>→</div><div style='text-align: center; background: #FEF2F2; padding: 8px; border-radius: 6px;'><div>🛵 45 menit</div><div style='font-size: 10px; color: #DC2626; font-weight: 700;'>Bagasi motor ☀️ ~50–55°C</div></div><div style='font-size: 18px; color: #9CA3AF;'>→</div><div style='text-align: center;'><div>🏠 Rumah</div></div></div><div style='background: white; padding: 8px 12px; border-radius: 6px; border-left: 3px solid #DC2626; font-size: 11px;'><strong>💉 Insulin pen (belum dibuka)</strong><br/>Seharusnya: 2–8°C atau maks 30°C &nbsp;|&nbsp; <strong style='color: #DC2626;'>Terpapar: ~50–55°C selama 45 menit</strong></div></div>"
                    },
                    options: [
                      { id: "a", icon: "💉", text: "Langsung gunakan insulin — belum dibuka berarti masih steril dan aman", correct: false, feedback: "Sterilitas dan efektivitas adalah dua hal yang berbeda. Insulin yang belum dibuka memang masih steril, tapi bukan berarti masih efektif setelah terpapar suhu tinggi. Protein insulin bisa sudah terdenaturasi — kehilangan struktur tiga dimensinya yang dibutuhkan untuk berikatan dengan reseptor dan menurunkan gula darah." },
                      { id: "b", icon: "📞", text: "Jangan gunakan dulu — hubungi apoteker atau dokter untuk mendapat panduan, karena paparan suhu tinggi bisa sudah merusak potensi insulin meski belum dibuka dan tidak ada perubahan visual", correct: true, feedback: "Tepat! Insulin adalah produk biologis yang sangat sensitif suhu. Paparan 50–55°C selama 45 menit bisa sudah merusak struktur protein insulin secara signifikan — dan tidak ada cara memulihkannya. Yang membuatnya berbahaya: insulin yang rusak tidak selalu terlihat berbeda, tapi efektivitasnya dalam menurunkan gula darah sudah berkurang. Pasien diabetes yang menyuntikkan insulin yang rusak bisa mengalami hiperglikemia yang tidak terkontrol." },
                      { id: "c", icon: "🧊", text: "Masukkan segera ke freezer selama 1 jam untuk 'memulihkan' kondisi insulin", correct: false, feedback: "Membekukan insulin yang sudah pernah terpapar suhu tinggi tidak memulihkan kerusakan yang sudah terjadi — kerusakan protein tidak reversibel. Selain itu, membekukan insulin justru bisa merusak lebih lanjut: pembekuan menyebabkan kristalisasi yang merusak struktur protein. Insulin tidak boleh dibekukan." }
                    ]
                  },

                  // SLIDE 7: MCQ - Soal 6
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Apa tindakan yang paling tepat?",
                      text: "Manajer gudang distributor farmasi mendapati bahwa suhu logger menunjukkan temperature excursion: suhu mencapai 34°C selama 6 jam kemarin malam karena AC mati. Stok yang ada adalah tablet amoksisilin 500mg dengan instruksi 'di bawah 25°C'. Total stok: 50.000 tablet dari 3 batch berbeda. Apa tindakan yang paling tepat?",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='font-weight: 700; color: #DC2626; margin-bottom: 10px; font-size: 13px;'>📊 DATA SUHU LOGGER</div><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: #F0FDF4; padding: 8px; border-radius: 6px;'><div style='font-size: 10px; color: #166534; font-weight: 700;'>Suhu normal</div><div style='font-weight: 800; color: #166534;'>22–24°C ✓</div></div><div style='background: #FEF2F2; padding: 8px; border-radius: 6px;'><div style='font-size: 10px; color: #DC2626; font-weight: 700;'>Excursion</div><div style='font-weight: 800; color: #DC2626;'>34°C selama 6 jam ✗</div></div></div><div style='margin-top: 8px; font-size: 11px; color: #1E293B;'>Produk: Tablet amoksisilin 500mg &nbsp;|&nbsp; Instruksi: &lt;25°C &nbsp;|&nbsp; Selisih: <strong style='color: #DC2626;'>+9°C</strong></div></div>"
                    },
                    options: [
                      { id: "a", icon: "🚀", text: "Distribusikan seperti biasa — excursion hanya 6 jam dan tablet masih terlihat baik", correct: false, feedback: "Mendistribusikan produk yang mengalami temperature excursion sebelum ada evaluasi QA adalah pelanggaran serius terhadap CPOB dan CDOB. 'Hanya 6 jam' dan 'masih terlihat baik' bukan dasar yang valid untuk keputusan keamanan produk farmasi." },
                      { id: "b", icon: "🔒", text: "Karantina seluruh stok terdampak, buat laporan deviasi suhu, laporkan ke QA dan principal farmasi, tunggu keputusan disposition dari tim QA berdasarkan data excursion dan karakteristik produk", correct: true, feedback: "Tepat! Temperature excursion — meskipun hanya 6 jam — adalah kejadian serius yang membutuhkan proses formal sesuai CPOB. Langkah yang benar: karantina dulu, buat deviation report, dan serahkan keputusan disposition ke tim QA. Tim QA akan mengevaluasi berdasarkan karakteristik spesifik amoksisilin pada suhu 34°C selama 6 jam. Keputusan ini tidak bisa dibuat unilateral oleh manajer gudang." },
                      { id: "c", icon: "🧊", text: "Pindahkan semua tablet ke ruang bersuhu lebih rendah sekarang — pendinginan cepat akan mengkompensasi paparan panas yang terjadi", correct: false, feedback: "Memindahkan tablet ke suhu lebih rendah setelah excursion tidak mengkompensasi kerusakan yang mungkin sudah terjadi. Kerusakan kimia akibat paparan panas tidak reversibel dengan pendinginan. Dan mendistribusikan produk tanpa evaluasi QA tetap tidak diizinkan terlepas dari tindakan kompensasi apapun." }
                    ]
                  },

                  // SLIDE 8: MCQ - Soal 7
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Apa tindakan yang paling tepat?",
                      text: "Seorang apoteker menerima keluhan dari pasien: tablet salut yang dibeli seminggu lalu sudah menempel satu sama lain dan permukaannya terlihat lengket. Pasien mengaku menyimpannya di kamar mandi. Obat masih dalam blister asli, EXP masih 18 bulan lagi. Apa yang paling tepat dilakukan apoteker?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 10px;'><div>📍 <strong>Lokasi:</strong> Kamar mandi</div><div>💧 <strong>Kondisi:</strong> Lembap, fluktuasi suhu</div></div><div style='background: #FEF2F2; padding: 10px; border-radius: 8px; border-left: 3px solid #DC2626; margin-bottom: 8px;'><div style='font-weight: 700; color: #DC2626; margin-bottom: 4px;'>💊 Kondisi Tablet:</div><div>• Menempel satu sama lain</div><div>• Permukaan lengket</div><div>• Masih dalam blister asli</div></div><div style='font-size: 11px; color: #475569;'>📅 EXP: masih <strong>18 bulan</strong> lagi</div></div>"
                    },
                    options: [
                      { id: "a", icon: "💊", text: "Yakinkan pasien bahwa tablet masih aman — EXP masih 18 bulan lagi dan blister masih utuh", correct: false, feedback: "EXP yang masih jauh tidak menjamin keamanan produk yang sudah rusak secara fisik akibat penyimpanan salah. Kerusakan fisik pada lapisan salut bisa memengaruhi cara dan kecepatan pelepasan zat aktif yang dirancang untuk terkontrol melalui lapisan tersebut." },
                      { id: "b", icon: "🔄", text: "Jelaskan kepada pasien bahwa kondisi fisik tablet yang sudah berubah (lengket, menempel) adalah tanda kerusakan akibat penyimpanan tidak sesuai — tablet tidak boleh dikonsumsi dan perlu diganti, serta edukasi cara penyimpanan yang benar", correct: true, feedback: "Tepat! Tablet salut yang sudah lengket dan menempel adalah tanda jelas bahwa lapisan salut telah menyerap kelembapan dan mulai hancur. Ini adalah kerusakan fisik yang tidak bisa diperbaiki dan menandakan integritas produk sudah terganggu. EXP yang masih 18 bulan tidak relevan karena EXP hanya berlaku jika penyimpanan sesuai ketentuan. Apoteker memiliki kewajiban profesional untuk tidak memperbolehkan konsumsi produk yang sudah rusak." },
                      { id: "c", icon: "👁️", text: "Minta pasien mencoba memisahkan tablet dulu — jika bisa dipisahkan, masih bisa dikonsumsi", correct: false, feedback: "Kemampuan memisahkan tablet secara fisik tidak ada hubungannya dengan kelayakan konsumsinya. Tablet yang sudah lengket berarti lapisan salutnya sudah rusak dan terpapar kelembapan berlebih — kondisi ini tidak bisa dinilai hanya dari apakah tablet masih bisa dipisahkan secara fisik." }
                    ]
                  },

                  // SLIDE 9: MCQ - Soal 8
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Apa tindakan yang paling tepat?",
                      text: "Tim QC PT Farma Andal sedang melakukan audit rutin di gudang. Mereka menemukan bahwa termometer di ruang penyimpanan utama sudah rusak — tidak ada yang tahu sejak kapan — sehingga tidak ada data suhu selama minimal 3 minggu terakhir. Stok di ruang itu senilai Rp 2 miliar. Apa tindakan yang paling tepat?",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px; font-family: monospace; line-height: 2;'><div>🔍 Audit rutin tim QC</div><div style='color: #94A3B8;'>↓</div><div style='color: #DC2626; font-weight: bold;'>Temuan: Termometer rusak</div><div style='color: #94A3B8;'>↓</div><div style='color: #D97706; font-weight: bold;'>Gap data suhu: minimal 3 minggu</div><div style='color: #94A3B8;'>↓</div><div>Stok terdampak: <strong>Rp 2 miliar</strong></div><div style='margin-top: 8px; font-family: sans-serif; color: #7C2D12; font-size: 11px;'>Suhu aktual 3 minggu: tidak diketahui — tidak bisa diverifikasi</div></div>"
                    },
                    options: [
                      { id: "a", icon: "✅", text: "Segera ganti termometer dan lanjutkan operasional normal — gudang sudah berjalan dengan baik selama ini, kemungkinan besar suhu aman", correct: false, feedback: "Asumsi 'kemungkinan besar aman' tidak bisa menggantikan data aktual dalam sistem manajemen mutu farmasi. CPOB mensyaratkan monitoring suhu yang kontinu dan terdokumentasi — gap 3 minggu tanpa data adalah deviasi serius yang membutuhkan penanganan formal, tidak bisa diabaikan." },
                      { id: "b", icon: "🔒", text: "Karantina seluruh stok di ruangan tersebut, buka investigasi untuk memperkirakan kondisi suhu selama gap, evaluasi risiko setiap produk berdasarkan sensitivitas suhunya, lalu buat keputusan disposition berdasarkan hasil investigasi", correct: true, feedback: "Tepat! Tidak adanya data monitoring suhu selama 3 minggu adalah gap kontrol kritis dalam CPOB. Stok yang kondisi penyimpanannya tidak bisa diverifikasi tidak boleh dirilis begitu saja. Langkah yang benar: karantina dulu, lakukan investigasi untuk merekonstruksi kondisi suhu selama gap, evaluasi setiap produk berdasarkan sensitivitasnya, baru buat keputusan berbasis data. Nilai stok Rp 2 miliar tidak bisa menjadi alasan untuk memotong proses keamanan." },
                      { id: "c", icon: "📊", text: "Ambil sampel acak dari setiap produk dan uji di laboratorium — jika hasil uji baik, semua stok bisa dirilis", correct: false, feedback: "Uji laboratorium sampel acak tidak bisa menjamin kondisi seluruh batch — sampling memiliki keterbatasan statistik dan tidak bisa mendeteksi semua kerusakan yang mungkin terjadi. Selain itu, investigasi gap data suhu tetap harus dilakukan sebagai persyaratan dokumentasi CPOB, terlepas dari hasil uji laboratorium." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 3-N03 Selesai!",
                      insight: "Anda sudah mampu menganalisis dampak penyimpanan tidak sesuai dan mengambil keputusan yang tepat ketika kondisi penyimpanan bermasalah ditemukan.",
                      icon: "🌡️",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "EXP adalah jaminan bersyarat — hanya berlaku jika produk disimpan sesuai instruksi yang tertera di label",
                        "Kerusakan kimia (penurunan kadar, produk degradasi berbahaya) sering tidak terlihat secara visual — lebih berbahaya dari kerusakan fisik yang kasat mata",
                        "Temperature excursion dan kondisi penyimpanan yang tidak terverifikasi memerlukan karantina dan investigasi formal — tidak bisa diabaikan meski produk terlihat normal",
                        "Cold chain yang putus — bahkan hanya beberapa jam — bisa mendiskualifikasi produk sensitif suhu seperti vaksin dan insulin secara permanen"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              }
            ]
          },
          {
            id:          "shelf-life-industri-pangan",
            title:       "Shelf Life di Industri Pangan",
            description: "Memahami batas waktu keamanan dan kualitas produk makanan serta regulasi terkait",
            icon:        "🍎",
            subLessons: [
              {
                id:       "use-by-vs-best-before",
                title:    "Membedakan Use By vs Best Before pada pangan",
                icon:     "🏷️",
                duration: "15 menit",
                slides: [

                  // SLIDE 1: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Pangan",
                      text: "Klasifikasikan setiap produk pangan: lebih tepat menggunakan label USE BY atau BEST BEFORE?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>Pilihan label Use By atau Best Before ditentukan oleh tingkat risiko produk — seberapa berbahaya jika dikonsumsi setelah tanggal tersebut. Klasifikasikan setiap produk berikut.</div>"
                    },
                    zones: [
                      {
                        id: "use-by",
                        icon: "🚫",
                        label: "Use By",
                        subLabel: "Batas keamanan — tidak boleh dikonsumsi setelah ini",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-300"
                      },
                      {
                        id: "best-before",
                        icon: "⭐",
                        label: "Best Before",
                        subLabel: "Batas kualitas — mungkin masih bisa dikonsumsi",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-300"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🥩", text: "Daging sapi segar giling — berisiko tinggi pertumbuhan bakteri patogen (E. coli, Salmonella) jika melewati batas", targetZone: "use-by" },
                      { id: "c2", icon: "🍫", text: "Cokelat batangan — mengandung gula dan lemak kakao, kualitas menurun tapi tidak berbahaya setelah batas", targetZone: "best-before" },
                      { id: "c3", icon: "🥛", text: "Susu pasteurisasi segar — berisiko tinggi pertumbuhan Listeria dan bakteri patogen lain setelah batas", targetZone: "use-by" },
                      { id: "c4", icon: "🍚", text: "Beras putih kering — kadar air sangat rendah, tidak ada risiko keamanan signifikan setelah batas", targetZone: "best-before" },
                      { id: "c5", icon: "🧀", text: "Keju lunak (soft cheese) segar tanpa proses penuaan — rentan pertumbuhan Listeria monocytogenes", targetZone: "use-by" },
                      { id: "c6", icon: "🍪", text: "Biskuit kering kemasan — kerenyahan menurun setelah batas tapi tidak ada risiko keamanan", targetZone: "best-before" }
                    ],
                    feedbackCorrect: "Sempurna! Pola yang jelas: Use By untuk produk yang berisiko menimbulkan penyakit jika dikonsumsi setelah batas (daging segar, susu pasteurisasi, keju lunak). Best Before untuk produk yang kualitasnya menurun tapi tidak berbahaya (cokelat, beras, biskuit). Satu kata yang menentukan: RISIKO KEAMANAN.",
                    feedbackWrong: "Ada yang tertukar. Kunci pembedanya bukan jenis produknya, tapi risikonya: apakah mengonsumsi produk ini setelah tanggal batas bisa menyebabkan penyakit (Use By) atau hanya penurunan kualitas (Best Before)?"
                  },

                  // SLIDE 2: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Pangan",
                      text: "Klasifikasikan setiap produk: lebih tepat menggunakan label USE BY atau BEST BEFORE?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>Perhatikan berbagai produk pangan yang umum ditemukan di pasar swalayan Indonesia.</div>"
                    },
                    zones: [
                      {
                        id: "use-by",
                        icon: "🚫",
                        label: "Use By",
                        subLabel: "Batas keamanan — tidak boleh dikonsumsi setelah ini",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-300"
                      },
                      {
                        id: "best-before",
                        icon: "⭐",
                        label: "Best Before",
                        subLabel: "Batas kualitas — mungkin masih bisa dikonsumsi",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-300"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🍱", text: "Nasi kotak siap makan dari catering — lingkungan lembap dan berprotein tinggi, ideal untuk bakteri", targetZone: "use-by" },
                      { id: "c2", icon: "🫙", text: "Madu murni — kandungan gula sangat tinggi, bersifat antibakteri alami, hampir tidak bisa rusak", targetZone: "best-before" },
                      { id: "c3", icon: "🥗", text: "Salad buah potong segar tanpa pengawet — aktivitas air tinggi, dipotong membuka peluang kontaminasi", targetZone: "use-by" },
                      { id: "c4", icon: "🥫", text: "Sarden kaleng — proses sterilisasi komersial, vakum, risiko mikrobiologis sangat rendah", targetZone: "best-before" },
                      { id: "c5", icon: "🐟", text: "Ikan segar fillet tanpa tulang — sangat mudah terkontaminasi bakteri Listeria dan botulinum", targetZone: "use-by" },
                      { id: "c6", icon: "🍜", text: "Mie instan kering — kadar air sangat rendah, risiko utama adalah ketengikan bukan keamanan", targetZone: "best-before" }
                    ],
                    feedbackCorrect: "Tepat! Perhatikan madu di kartu 2 — madu adalah salah satu produk yang hampir tidak bisa rusak secara mikrobiologis. Meski demikian, regulasi tetap mewajibkan Best Before karena kualitasnya berubah seiring waktu. Ini contoh bahwa Best Before bukan berarti 'tidak ada risiko sama sekali' — tapi risikonya adalah kualitas, bukan keamanan.",
                    feedbackWrong: "Ada yang tertukar. Produk dengan kadar air tinggi dan protein tinggi (nasi, salad segar, ikan segar) → Use By karena berisiko tinggi. Produk kering, kaleng, atau dengan perlindungan alami (madu) → Best Before karena risiko utamanya kualitas."
                  },

                  // SLIDE 3: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Pangan",
                      text: "Klasifikasikan: USE BY atau BEST BEFORE? Kali ini fokus pada produk olahan susu dan telur.",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>Produk turunan susu dan telur memiliki variasi risiko yang sangat luas — dari yang sangat aman hingga yang sangat berisiko tinggi. Klasifikasikan dengan cermat.</div>"
                    },
                    zones: [
                      {
                        id: "use-by",
                        icon: "🚫",
                        label: "Use By",
                        subLabel: "Batas keamanan — tidak boleh dikonsumsi setelah ini",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-300"
                      },
                      {
                        id: "best-before",
                        icon: "⭐",
                        label: "Best Before",
                        subLabel: "Batas kualitas — mungkin masih bisa dikonsumsi",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-300"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🥚", text: "Telur ayam segar — risiko Salmonella di permukaan cangkang dan dalam kuning telur jika lama", targetZone: "use-by" },
                      { id: "c2", icon: "🧀", text: "Keju parmesan keras (aged 24 bulan) — kadar air sangat rendah, proses penuaan membunuh patogen", targetZone: "best-before" },
                      { id: "c3", icon: "🍦", text: "Yoghurt probiotik segar tanpa pengawet — mengandung bakteri hidup, rentan perubahan pH", targetZone: "use-by" },
                      { id: "c4", icon: "🥛", text: "Susu UHT kemasan karton tersegel — proses UHT membunuh semua bakteri, kemasan aseptik", targetZone: "best-before" },
                      { id: "c5", icon: "🍮", text: "Puding custard siap makan (fresh) — protein tinggi, kelembapan tinggi, ideal untuk bakteri", targetZone: "use-by" },
                      { id: "c6", icon: "🧈", text: "Mentega salted (asin) — kandungan garam dan lemak tinggi menghambat pertumbuhan bakteri", targetZone: "best-before" }
                    ],
                    feedbackCorrect: "Tepat! Kontras yang paling menarik di soal ini: susu UHT (Best Before) vs yoghurt segar (Use By) — perbedaannya ada di proses. UHT membunuh semua bakteri, sedangkan yoghurt mengandung bakteri hidup dan rentan perubahan. Proses pengolahan, bukan hanya bahan baku, menentukan pilihan label.",
                    feedbackWrong: "Ada yang tertukar. Perhatikan pengaruh proses pengolahan: susu UHT yang sudah disterilisasi berbeda risiko dari yoghurt segar yang mengandung bakteri hidup. Keju keras yang sudah 'aged' bertahun-tahun berbeda dari puding segar."
                  },

                  // SLIDE 4: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Pangan",
                      text: "Klasifikasikan: USE BY atau BEST BEFORE? Fokus pada produk siap saji dan produk olahan.",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>Produk siap saji dan makanan olahan memiliki karakteristik yang sangat bervariasi. Perhatikan karakteristik kunci setiap produk.</div>"
                    },
                    zones: [
                      {
                        id: "use-by",
                        icon: "🚫",
                        label: "Use By",
                        subLabel: "Batas keamanan — tidak boleh dikonsumsi setelah ini",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-300"
                      },
                      {
                        id: "best-before",
                        icon: "⭐",
                        label: "Best Before",
                        subLabel: "Batas kualitas — mungkin masih bisa dikonsumsi",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-300"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🥪", text: "Sandwich siap makan dari convenience store — daging dingin, sayuran segar, mayones, tanpa pengawet", targetZone: "use-by" },
                      { id: "c2", icon: "🧃", text: "Jus buah UHT kemasan karton tersegel — dipasteurisasi, kemasan aseptik, degradasi vitamin", targetZone: "best-before" },
                      { id: "c3", icon: "🍗", text: "Ayam goreng siap makan tanpa refrigerasi di warung — protein tinggi, suhu penyimpanan tak terkontrol", targetZone: "use-by" },
                      { id: "c4", icon: "🥜", text: "Selai kacang (peanut butter) — kadar gula dan lemak tinggi, aktivitas air rendah, awet alami", targetZone: "best-before" },
                      { id: "c5", icon: "🫕", text: "Sup krim segar kemasan plastik (fresh, refrigerated) — produk berbasis susu segar, protein tinggi", targetZone: "use-by" },
                      { id: "c6", icon: "🍯", text: "Sirup gula cair (simple syrup) botolan — konsentrasi gula sangat tinggi, hambat pertumbuhan mikroba", targetZone: "best-before" }
                    ],
                    feedbackCorrect: "Sempurna! Pola yang konsisten: konsentrasi gula tinggi dan proses sterilisasi → Best Before. Produk segar berprotein tinggi tanpa pengawet (sandwich, ayam goreng, sup segar) → Use By. Protein matang di suhu ruangan adalah lingkungan yang sangat ideal untuk pertumbuhan bakteri.",
                    feedbackWrong: "Ada yang tertukar. Konsentrasi gula tinggi adalah perlindungan alami yang signifikan. Sebaliknya, protein matang (ayam, daging) di suhu ruangan adalah kondisi ideal untuk bakteri berkembang cepat."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Use By vs Best Before — Dasar Pemilihan dan Implikasi Praktis",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Definisi resmi dan perbedaan fundamental",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Di industri pangan, dua jenis label tanggal ini dipilih berdasarkan satu pertanyaan kunci: apa yang terjadi jika produk dikonsumsi setelah tanggal tersebut?</p><div style='background: #1E293B; border-radius: 8px; padding: 12px; margin-bottom: 14px;'><table style='width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;'><tr style='border-bottom: 1px solid #334155;'><th style='padding: 8px; color: #94A3B8;'></th><th style='padding: 8px; color: #FCA5A5;'>USE BY</th><th style='padding: 8px; color: #86EFAC;'>BEST BEFORE</th></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px; color: #94A3B8;'>Makna</td><td style='padding: 8px; color: white;'>Batas KEAMANAN pangan</td><td style='padding: 8px; color: white;'>Batas KUALITAS optimal</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px; color: #94A3B8;'>Setelah lewat</td><td style='padding: 8px; color: #FCA5A5;'>Tidak boleh dikonsumsi</td><td style='padding: 8px; color: #86EFAC;'>Mungkin masih bisa</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px; color: #94A3B8;'>Risiko utama</td><td style='padding: 8px; color: white;'>Pertumbuhan bakteri patogen</td><td style='padding: 8px; color: white;'>Penurunan rasa, tekstur, warna</td></tr><tr style='border-bottom: 1px solid #334155;'><td style='padding: 8px; color: #94A3B8;'>Produk tipikal</td><td style='padding: 8px; color: white;'>Daging, susu berpasteurisasi, keju lunak</td><td style='padding: 8px; color: white;'>Beras, biskuit, susu UHT, madu</td></tr><tr><td style='padding: 8px; color: #94A3B8;'>Regulasi</td><td style='padding: 8px; color: white;'>Dilarang dijual setelah lewat</td><td style='padding: 8px; color: white;'>Berlaku utk produk olahan</td></tr></table></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px;'>📌 Di Indonesia: Regulasi BPOM menggunakan istilah &quot;Baik Digunakan Sebelum&quot; (setara Best Before) dan &quot;Gunakan Sebelum&quot; (setara Use By) untuk label pangan.</div></div>"
                      },
                      {
                        id: "pnl-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Faktor yang menentukan pilihan Use By vs Best Before",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Lima faktor utama penentu:</p><div style='display: flex; flex-direction: column; gap: 8px;'><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #60A5FA; font-weight: 700; font-size: 13px;'>💧 Aktivitas air (aw)</div><div style='font-size: 12px;'>aw tinggi (&gt;0,85) mendukung patogen → Use By. aw rendah (&lt;0,60) → Best Before.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #F87171; font-weight: 700; font-size: 13px;'>🧬 Kandungan protein</div><div style='font-size: 12px;'>Tinggi (daging, susu, ikan) ideal utk bakteri → Use By. Rendah (beras, gula) → Best Before.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #A78BFA; font-weight: 700; font-size: 13px;'>🔬 Proses pengolahan</div><div style='font-size: 12px;'>Sterilisasi (UHT/Retort) membunuh bakteri → Best Before. Segar/pasteurisasi ringan → Use By.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #FBBF24; font-weight: 700; font-size: 13px;'>🧂 Pengawet alami</div><div style='font-size: 12px;'>Gula tinggi, garam tinggi, asam tinggi menghambat bakteri → cenderung Best Before.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #94A3B8; font-weight: 700; font-size: 13px;'>📦 Sistem pengemasan</div><div style='font-size: 12px;'>Kemasan vakum/MAP memperpanjang umur produk segar. Kemasan aseptik mendukung Best Before.</div></div></div></div>"
                      },
                      {
                        id: "pnl-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Yang sering disalahpahami tentang Best Before",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Best Before bukan izin untuk mengabaikan kondisi produk setelah tanggal berlalu.</p><ul style='padding-left: 20px; font-size: 12px; display: flex; flex-direction: column; gap: 8px;'><li style='padding-bottom: 4px; border-bottom: 1px solid #334155;'>✅ <strong>Bukan berarti aman selamanya:</strong> Jika sudah jauh melewati tanggal/disimpan salah, bisa berbahaya krn oksidasi. Selalu cek kondisi fisik.</li><li style='padding-bottom: 4px; border-bottom: 1px solid #334155;'>🔍 <strong>Cara menilai produk lewat BB:</strong> Periksa bau, warna, tekstur. Jika tengik/ada jamur — jangan dikonsumsi.</li><li style='padding-bottom: 4px; border-bottom: 1px solid #334155;'>🚫 <strong>Use By tidak punya ruang negosiasi:</strong> Berbeda dari BB, produk Use By lewat batas tidak bisa diselamatkan dgn 'cek kondisi'. Bakteri tidak mengubah bau/rasa ttp tetap bahaya.</li><li>⚖️ <strong>Implikasi hukum berbeda:</strong> Menjual produk Use By kedaluwarsa adalah pelanggaran hukum yg sangat serius (sanksi pidana).</li></ul></div>"
                      }
                    ]
                  },

                  // SLIDE 6: MCQ
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih keputusan yang paling tepat",
                      text: "Bu Tari, manajer QC di pabrik deli meat, ingin menentukan label untuk produk baru: irisan ham matang tanpa pengawet, dikemas vakum, disimpan 0–4°C. Rekan kerjanya menyarankan Best Before karena 'ham sudah dimasak, bukan daging mentah'. Keputusan yang tepat?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 10px;'><div style='background: white; padding: 8px; border-radius: 6px; border-left: 3px solid #60A5FA;'>🥩 <strong>Irisan Ham Matang</strong><br/>Tanpa pengawet<br/>Kemasan vakum<br/>Simpan: 0–4°C</div><div style='background: white; padding: 8px; border-radius: 6px; border-left: 3px solid #F59E0B;'><strong style='color:#D97706'>Argumen:</strong><br/>&quot;Sudah dimasak → bukan daging mentah → pakai Best Before saja&quot;</div></div><div style='margin-top: 8px; text-align: center; font-weight: bold; color: #1E293B;'>❓ Tepat atau tidak?</div></div>"
                    },
                    options: [
                      { id: "a", icon: "⭐", text: "Setuju dengan rekan — ham sudah dimasak sehingga tidak berisiko seperti daging mentah, Best Before sudah tepat", correct: false, feedback: "Proses pemasakan membunuh bakteri yang ada, tapi tidak mencegah rekontaminasi setelah proses — terutama Listeria yang bisa masuk kembali saat slicing. Ham matang tanpa pengawet kemasan vakum masih berisiko tinggi yang membutuhkan Use By." },
                      { id: "b", icon: "🚫", text: "Gunakan Use By — ham matang tanpa pengawet masih berisiko pertumbuhan Listeria di suhu dingin, berisiko keracunan", correct: true, feedback: "Tepat! Ham matang bukan berarti bebas risiko — justru deli meat kategori produk berisiko tinggi untuk Listeria monocytogenes. Listeria bisa tumbuh bahkan di suhu 0–4°C dan sangat berbahaya. Di banyak negara, deli meat diwajibkan Use By. Argumen 'sudah dimasak' tidak cukup untuk Best Before." },
                      { id: "c", icon: "🤔", text: "Gunakan keduanya — cantumkan Best Before untuk kondisi tersegel dan Use By setelah kemasan dibuka", correct: false, feedback: "Satu produk hanya boleh memiliki satu jenis label tanggal — tidak ada aturan 'dua label berbeda untuk kondisi berbeda'. Untuk produk Use By, batas waktu setelah dibuka biasanya dicantumkan sebagai instruksi tambahan (misal: 'Setelah dibuka, habiskan dalam 3 hari')." }
                    ]
                  },

                  // SLIDE 7: MCQ
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih keputusan yang paling tepat",
                      text: "Pak Rendi, manajer supermarket menemukan dua situasi sore hari: (A) 12 boks susu pasteurisasi segar dengan Use By kemarin, dan (B) 20 bungkus mie instan dengan Best Before 2 minggu lalu. Apa tindakan yang paling tepat?",
                      htmlContext: "<div style='background: #EFF6FF; border: 1px solid #BFDBFE; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: white; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0;'><div style='color: #DC2626; font-weight: 700; margin-bottom: 4px;'>SITUASI A</div><div>🥛 <strong>Susu Pasteurisasi</strong></div><div style='color: #DC2626; font-size: 11px; margin-top: 4px;'>Use By: KEMARIN<br/>Kondisi: normal</div></div><div style='background: white; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0;'><div style='color: #D97706; font-weight: 700; margin-bottom: 4px;'>SITUASI B</div><div>🍜 <strong>Mie instan kering</strong></div><div style='color: #6B7280; font-size: 11px; margin-top: 4px;'>Best Before: 2 minggu lalu<br/>Kondisi: utuh, tak berubah</div></div></div><div style='text-align: center; margin-top: 8px; font-weight: bold;'>❓ Tindakan?</div></div>"
                    },
                    options: [
                      { id: "a", icon: "💰", text: "Jual keduanya dengan diskon besar — kondisi fisik keduanya masih baik dan sayang dibuang", correct: false, feedback: "Susu pasteurisasi yang melewati Use By tidak boleh dijual dengan alasan apapun. Penjualan produk Use By kedaluwarsa adalah pelanggaran hukum. Sementara mie instan memang bisa didiskon, tapi harus ada penjelasan dan evaluasi." },
                      { id: "b", icon: "⚖️", text: "Tarik susu (Use By terlampaui = tidak boleh dijual), sementara mie instan dievaluasi kondisinya — jika baik, masih bisa dijual diskon dengan penandaan jelas", correct: true, feedback: "Tepat! Susu (Use By) wajib ditarik dan tidak boleh dijual — batas hukum tak bisa ditawar. Mie instan (Best Before) 2 minggu lalu tidak otomatis dibuang. Jika utuh dan tak berbau tengik, masih bisa dijual dengan harga diskon dan diberi penandaan jelas sudah lewat Best Before." },
                      { id: "c", icon: "🗑️", text: "Buang keduanya segera — semua produk yang sudah melewati tanggal labelnya tidak boleh dijual", correct: false, feedback: "Membuang semua produk melewati tanggal labelnya adalah pemborosan — dan salah secara prinsip untuk Best Before. Melewati Best Before bukan berarti otomatis dibuang jika kondisi fisiknya masih baik." }
                    ]
                  },

                  // SLIDE 8: MCQ
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih keputusan yang paling tepat",
                      text: "Seorang ibu membuka kulkasnya dan menemukan: (A) yoghurt segar berlabel 'Gunakan Sebelum: 3 hari lalu', dan (B) keju parmesan keras berlabel 'Baik Digunakan Sebelum: 1 bulan lalu'. Keduanya terlihat dan berbau normal. Apa keputusan yang paling tepat?",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='font-family: monospace;'>[Kulkas]<br/>├── 🥛 <strong>Yoghurt segar</strong><br/>│&nbsp;&nbsp;&nbsp;&quot;Gunakan Sebelum: 3 hari lalu&quot;<br/>│&nbsp;&nbsp;&nbsp;Kondisi: normal<br/>│<br/>└── 🧀 <strong>Keju Parmesan keras</strong><br/>&nbsp;&nbsp;&nbsp;&nbsp;&quot;Baik Digunakan Sebelum: 1 bln lalu&quot;<br/>&nbsp;&nbsp;&nbsp;&nbsp;Kondisi: normal</div></div>"
                    },
                    options: [
                      { id: "a", icon: "🍽️", text: "Konsumsi keduanya — keduanya terlihat dan berbau normal, jadi masih aman", correct: false, feedback: "Yoghurt melewati Use By-nya bisa berisiko. Patogen seperti Listeria tidak selalu mengubah penampilan yoghurt. Keju parmesan bisa jadi aman, tapi yoghurt tidak." },
                      { id: "b", icon: "⚖️", text: "Buang yoghurt (Use By), tapi keju parmesan (Best Before) mungkin masih bisa dikonsumsi setelah dicek kondisi lebih teliti", correct: true, feedback: "Tepat! Yoghurt (Use By) lewat 3 hari harus dibuang meski terlihat normal, karena bakteri patogen tidak selalu mengubah bentuk/rasa. Keju parmesan keras (Best Before) lewat 1 bulan kemungkinan besar masih sangat baik karena kadar air rendah dan tinggi garam. Cek fisik: jika tidak ada jamur/perubahan rasa, aman!" },
                      { id: "c", icon: "🗑️", text: "Buang keduanya — sudah melewati tanggal label berarti keduanya tidak layak konsumsi", correct: false, feedback: "Membuang keju keras yang lewat Best Before 1 bulan adalah pemborosan. Keju aged bisa bertahan jauh dari Best Before-nya jika disimpan dengan benar." }
                    ]
                  },

                  // SLIDE 9: MCQ
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih keputusan yang paling tepat",
                      text: "Tim pengembang produk sedang merancang produk baru: nasi goreng siap makan yang dimasak fresh setiap pagi, dikemas dalam cup plastik, dijual tanpa freezer. Suhu penyimpanan kulkas 4°C. Target habis dalam 1 hari. Jenis label apa yang paling tepat?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='line-height: 1.6;'>🍳 <strong>Nasi Goreng Siap Makan</strong><br/>• Dimasak fresh setiap pagi<br/>• Dikemas cup plastik<br/>• Dijual di convenience store<br/>• Penyimpanan: kulkas 4°C<br/>• Target habis: 1 hari</div><div style='margin-top: 10px; color: #D97706; font-weight: bold;'>❓ Use By atau Best Before? Dan berapa batas waktunya?</div></div>"
                    },
                    options: [
                      { id: "a", icon: "⭐", text: "Best Before 3 hari — nasi goreng sudah dimasak sehingga bakteri mati, cukup aman untuk 3 hari", correct: false, feedback: "Nasi matang adalah media ideal untuk bakteri umum (Bacillus cereus) yang bisa membentuk spora tahan panas. 3 hari di kulkas untuk nasi segar tanpa pengawet sangat berisiko." },
                      { id: "b", icon: "🚫", text: "Use By dengan batas maksimal 24 jam — nasi goreng adalah produk berisiko tinggi (nasi matang, protein, kelembapan) yang ideal untuk bakteri", correct: true, feedback: "Tepat! Nasi matang + protein telur/daging + kondisi lembap cup plastik = media ideal untuk bakteri seperti Bacillus cereus dan Staphylococcus aureus. Use By 24 jam adalah pilihan tepat dan umum untuk produk RTE segar. Jenis label bukan sekadar waktu, tapi pesan 'ini batas keamanan'." },
                      { id: "c", icon: "⭐", text: "Best Before 1 hari — karena targetnya memang habis dalam 1 hari, jenis label tidak terlalu penting", correct: false, feedback: "Jenis label sangat penting! Best Before 1 hari memberi kesan setelah lewat 1 hari masih aman dikonsumsi asalkan kondisinya baik. Use By 24 jam memberi pesan tepat: ini batas keamanan. Untuk RTE berisiko tinggi, harus tegas menetapkan Use By." }
                    ]
                  },

                  // SLIDE 10: SCORE
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 4-N01 Selesai!",
                      insight: "Anda sudah mampu membedakan Use By dan Best Before berdasarkan profil risiko produk pangan — dan mengambil keputusan yang tepat sebagai konsumen, retailer, maupun produsen.",
                      icon: "🏷️",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Use By = batas keamanan (produk berisiko tinggi: daging segar, susu pasteurisasi, keju lunak, RTE segar)",
                        "Best Before = batas kualitas optimal (produk kering, kaleng, UHT, terlindung alami) — masih bisa digunakan setelah cek kondisi",
                        "Faktor penentu: aktivitas air, protein, proses pengolahan, pengawet alami, kemasan",
                        "Use By tak punya kompromi — bakteri patogen tidak mengubah bau/bentuk produk"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "faktor-shelf-life-segar-vs-olahan",
                title:    "Mengidentifikasi faktor Shelf Life pangan segar vs olahan",
                icon:     "🌿",
                duration: "20 menit",
                slides: [

                  // SLIDE 1: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Faktor",
                      text: "Klasifikasikan: faktor ini lebih dominan pada PANGAN SEGAR atau PANGAN OLAHAN?",
                      
                    },
                    zones: [
                      {
                        id: "segar",
                        icon: "🥬",
                        label: "Pangan Segar",
                        subLabel: "Belum melalui proses pengolahan signifikan",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-600"
                      },
                      {
                        id: "olahan",
                        icon: "🏭",
                        label: "Pangan Olahan",
                        subLabel: "Sudah melalui proses pengolahan",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🌡️", text: "Suhu cold chain sejak dipanen hingga ke konsumen", targetZone: "segar" },
                      { id: "c2", icon: "🧂", text: "Kadar garam atau gula yang ditambahkan sebagai pengawet", targetZone: "olahan" },
                      { id: "c3", icon: "🌬️", text: "Laju respirasi seluler produk setelah dipanen", targetZone: "segar" },
                      { id: "c4", icon: "🔥", text: "Suhu dan durasi proses pemanasan (pasteurisasi/sterilisasi)", targetZone: "olahan" },
                      { id: "c5", icon: "💧", text: "Kadar air alami dalam jaringan sel produk", targetZone: "segar" },
                      { id: "c6", icon: "📦", text: "Jenis kemasan dan sistem modified atmosphere", targetZone: "olahan" }
                    ],
                    feedbackCorrect: "Sempurna! Pangan segar masih 'hidup' secara biologis setelah dipanen — ia masih bernapas, menggunakan energi, dan berubah aktif. Faktor dominannya adalah kondisi biologis alami ini. Pangan olahan sudah diintervensi oleh manusia — pemanasan, pengawet, dan kemasan khusus penentu utamanya.",
                    feedbackWrong: "Ada yang tertukar. Kunci pembedanya: pangan segar masih memiliki proses biologis aktif (respirasi, perubahan sel). Pangan olahan Shelf Life-nya ditentukan oleh intervensi manusia (panas, garam, gula, kemasan)."
                  },

                  // SLIDE 2: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Faktor",
                      text: "Klasifikasikan: faktor ini lebih dominan pada PANGAN SEGAR atau PANGAN OLAHAN?",
                      
                    },
                    zones: [
                      {
                        id: "segar",
                        icon: "🥬",
                        label: "Pangan Segar",
                        subLabel: "Belum melalui proses pengolahan signifikan",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-600"
                      },
                      {
                        id: "olahan",
                        icon: "🏭",
                        label: "Pangan Olahan",
                        subLabel: "Sudah melalui proses pengolahan",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🦠", text: "Populasi awal mikroba alami di permukaan produk saat panen", targetZone: "segar" },
                      { id: "c2", icon: "⚗️", text: "Jenis dan konsentrasi pengawet kimia yang ditambahkan", targetZone: "olahan" },
                      { id: "c3", icon: "🌿", text: "Varietas tanaman — varietas tertentu secara alami lebih tahan lama", targetZone: "segar" },
                      { id: "c4", icon: "🔢", text: "Nilai pH produk yang diatur selama proses formulasi", targetZone: "olahan" },
                      { id: "c5", icon: "🌦️", text: "Kondisi cuaca dan musim saat produk dipanen", targetZone: "segar" },
                      { id: "c6", icon: "🫙", text: "Aktivitas air (aw) yang dikontrol melalui proses pengeringan", targetZone: "olahan" }
                    ],
                    feedbackCorrect: "Tepat! Varietas tanaman dan kondisi cuaca saat panen adalah faktor yang sepenuhnya unik untuk pangan segar — tidak ada padanannya di pangan olahan. Sebaliknya, pH yang diatur dan nilai aw yang dikontrol adalah hasil keputusan formulasi manusia — domain pangan olahan. Pangan segar bergantung pada alam; pangan olahan pada rekayasa.",
                    feedbackWrong: "Ada yang tertukar. Varietas tanaman dan kondisi panen adalah faktor alam yang hanya relevan untuk pangan segar. pH yang diatur dan aw yang dikontrol adalah keputusan formulasi — hanya relevan untuk pangan olahan."
                  },

                  // SLIDE 3: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Faktor",
                      text: "Klasifikasikan: faktor ini lebih dominan pada PANGAN SEGAR atau PANGAN OLAHAN?",
                      
                    },
                    zones: [
                      {
                        id: "segar",
                        icon: "🥬",
                        label: "Pangan Segar",
                        subLabel: "Belum melalui proses pengolahan signifikan",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-600"
                      },
                      {
                        id: "olahan",
                        icon: "🏭",
                        label: "Pangan Olahan",
                        subLabel: "Sudah melalui proses pengolahan",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "⏱️", text: "Waktu antara panen dan masuk ke cold storage", targetZone: "segar" },
                      { id: "c2", icon: "🏭", text: "Sanitasi mesin dan lini produksi selama proses", targetZone: "olahan" },
                      { id: "c3", icon: "🤕", text: "Kerusakan fisik (memar, lecet) saat penanganan pasca panen", targetZone: "segar" },
                      { id: "c4", icon: "🔒", text: "Integritas segel kemasan setelah proses produksi", targetZone: "olahan" },
                      { id: "c5", icon: "🌡️", text: "Suhu pre-cooling segera setelah panen (field heat removal)", targetZone: "segar" },
                      { id: "c6", icon: "🧪", text: "Konsistensi batch produksi — variasi antar batch", targetZone: "olahan" }
                    ],
                    feedbackCorrect: "Tepat! Field heat removal (pre-cooling) adalah salah satu faktor paling kritis untuk pangan segar — semakin cepat panas dikeluarkan setelah panen, semakin panjang Shelf Life-nya. Integritas segel kemasan adalah padanannya di pangan olahan — kemasan bocor membatalkan semua perlindungan proses.",
                    feedbackWrong: "Ada yang tertukar. Kecepatan pre-cooling dan kerusakan fisik saat penanganan adalah faktor unik pangan segar. Sanitasi mesin dan integritas segel kemasan adalah faktor kritis pangan olahan yang tidak ada padanannya di sisi segar."
                  },

                  // SLIDE 4: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Faktor",
                      text: "Klasifikasikan: faktor ini lebih dominan pada PANGAN SEGAR atau PANGAN OLAHAN?",
                      
                    },
                    zones: [
                      {
                        id: "segar",
                        icon: "🥬",
                        label: "Pangan Segar",
                        subLabel: "Belum melalui proses pengolahan signifikan",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-600"
                      },
                      {
                        id: "olahan",
                        icon: "🏭",
                        label: "Pangan Olahan",
                        subLabel: "Sudah melalui proses pengolahan",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🧬", text: "Aktivitas enzim alami dalam jaringan sel pasca panen", targetZone: "segar" },
                      { id: "c2", icon: "☢️", text: "Dosis dan jenis radiasi ionisasi yang digunakan untuk sterilisasi", targetZone: "olahan" },
                      { id: "c3", icon: "🌸", text: "Tingkat kematangan saat dipanen — terlalu matang memperpendek Shelf Life", targetZone: "segar" },
                      { id: "c4", icon: "🫧", text: "Konsentrasi gas CO₂ dan O₂ dalam kemasan modified atmosphere", targetZone: "olahan" },
                      { id: "c5", icon: "🌡️", text: "Fluktuasi suhu selama distribusi di rantai pasok", targetZone: "segar" },
                      { id: "c6", icon: "🔬", text: "Angka total bakteri dalam produk akhir setelah proses produksi", targetZone: "olahan" }
                    ],
                    feedbackCorrect: "Sempurna! Aktivitas enzim alami adalah faktor biologis yang terus bekerja di pangan segar — memecah sel, melunak, mengubah warna. Proses pengolahan seperti blanching dan pasteurisasi menonaktifkan enzim ini, sehingga tidak relevan untuk olahan. Sebaliknya, angka total bakteri akhir adalah parameter QC pangan olahan.",
                    feedbackWrong: "Ada yang tertukar. Enzim alami aktif, kematangan panen, dan fluktuasi suhu distribusi adalah faktor khas pangan segar. Radiasi ionisasi, komposisi gas kemasan, dan angka bakteri uji lab akhir adalah domain teknologi pangan olahan."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Mengapa Faktor Shelf Life Segar dan Olahan Berbeda Fundamental",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-fs-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Satu perbedaan mendasar yang menjelaskan segalanya",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Satu fakta yang menjelaskan mengapa faktor Shelf Life keduanya sangat berbeda:</p><ul style='margin-bottom: 14px;'><li style='margin-bottom: 8px;'><strong>Pangan segar masih hidup secara biologis setelah dipanen.</strong> Buah, sayur, dan produk segar lainnya masih bernapas, aktif enzimatis, dan berubah biologis sampai membusuk.</li><li><strong>Pangan olahan telah diintervensi untuk memperpanjang umur simpan.</strong> Proses menonaktifkan enzim, membunuh bakteri, mengurangi aw, dan menciptakan barier kemasan.</li></ul><table style='width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 14px; background: #1E293B; border-radius: 8px; overflow: hidden;'><tr style='background: #334155;'><th style='padding: 8px; text-align: left; color: #86EFAC;'>PANGAN SEGAR</th><th style='padding: 8px; text-align: left; color: #93C5FD;'>PANGAN OLAHAN</th></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>Masih bernapas</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Enzim dinonaktifkan</td></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>Enzim masih aktif</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Bakteri dikurangi</td></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>Sel masih hidup</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Aw dikontrol</td></tr><tr><td style='padding: 8px; color: #FCA5A5;'><strong>Faktor dominan:</strong><br/>→ Biologis & lingkungan<br/>→ Suhu, kelembapan, fisik</td><td style='padding: 8px; color: #93C5FD;'><strong>Faktor dominan:</strong><br/>→ Teknologi & formulasi<br/>→ Panas, pengawet, kemasan</td></tr></table><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px;'>📌 Implikasi praktis: memperpanjang Shelf Life pangan segar = mengelola kondisi biologis (cooling, atmosphere). Memperpanjang Shelf Life pangan olahan = mengoptimalkan teknologi pengolahan dan formulasi.</div></div>"
                      },
                      {
                        id: "pnl-fs-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Faktor kritis pangan segar: empat yang paling menentukan",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Empat faktor yang paling menentukan Shelf Life pangan segar:</p><div style='display: flex; flex-direction: column; gap: 8px;'><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #F87171; font-weight: 700; font-size: 13px;'>🌡️ 1. Suhu — faktor paling kritis</div><div style='font-size: 12px;'>Setiap kenaikan 10°C kira-kira menggandakan laju respirasi dan aktivitas enzim. Pre-cooling segera setelah panen (menghilangkan field heat) adalah langkah terpenting dalam rantai pasok pangan segar.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #60A5FA; font-weight: 700; font-size: 13px;'>🌬️ 2. Komposisi atmosfer</div><div style='font-size: 12px;'>Mengurangi O₂ dan meningkatkan CO₂ di sekitar produk memperlambat respirasi. MAP dan CA storage adalah teknologi utama berbasis prinsip ini.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #A78BFA; font-weight: 700; font-size: 13px;'>🤕 3. Integritas fisik produk</div><div style='font-size: 12px;'>Memar dan lecet membuka portal masuk bakteri dan mempercepat respirasi lokal. Penanganan hati-hati sangat menentukan.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #34D399; font-weight: 700; font-size: 13px;'>🦠 4. Beban mikroba awal</div><div style='font-size: 12px;'>Produk dipanen dengan beban bakteri tinggi (kondisi kebun buruk) akan membusuk jauh lebih cepat meski disimpan dengan baik.</div></div></div></div>"
                      },
                      {
                        id: "pnl-fs-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Faktor kritis pangan olahan: lima teknologi utama",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Lima faktor teknologi yang menentukan Shelf Life pangan olahan:</p><div style='display: flex; flex-direction: column; gap: 8px;'><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #F87171; font-weight: 700; font-size: 13px;'>🔥 1. Intensitas proses thermal</div><div style='font-size: 12px;'>Pasteurisasi, sterilisasi, dan blanching — suhu dan durasi proses menentukan berapa banyak mikroba tersisa.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #38BDF8; font-weight: 700; font-size: 13px;'>💧 2. Aktivitas air (aw)</div><div style='font-size: 12px;'>Menurunkan aw melalui pengeringan atau penambahan gula/garam efektif hambat pertumbuhan mikroba.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #FBBF24; font-weight: 700; font-size: 13px;'>⚗️ 3. pH dan keasaman</div><div style='font-size: 12px;'>Produk dengan pH rendah (&lt; 4.6, misal yoghurt/acar) secara alami hambat pertumbuhan Clostridium botulinum.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #A3E635; font-weight: 700; font-size: 13px;'>🧂 4. Pengawet dan antioksidan</div><div style='font-size: 12px;'>Pengawet kimia dan antioksidan cegah mikroba dan oksidasi/ketengikan.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #C084FC; font-weight: 700; font-size: 13px;'>📦 5. Teknologi kemasan</div><div style='font-size: 12px;'>Kemasan vakum, MAP olahan, aseptik dirancang untuk masalah spesifik berbeda.</div></div></div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: YES/NO (Pendekatan Pengawet)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Sudah tepat atau belum?",
                      text: "Distributor buah mangga memutuskan untuk memperpanjang Shelf Life dengan meningkatkan dosis pengawet kimia dalam larutan perendaman pasca panen. Apakah ini pendekatan yang tepat untuk pangan segar?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px;'><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: white; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0;'><div style='font-size: 24px; text-align: center;'>⚗️</div><div style='text-align: center; font-weight: bold; font-size: 12px; margin-top: 4px;'>Tambah pengawet kimia</div><div style='text-align: center; color: #64748B; font-size: 10px;'>Strategi pangan olahan</div></div><div style='background: white; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0;'><div style='font-size: 24px; text-align: center;'>🥭</div><div style='text-align: center; font-weight: bold; font-size: 12px; margin-top: 4px;'>Mangga segar</div><div style='text-align: center; color: #64748B; font-size: 10px;'>Pangan segar — bernapas</div></div></div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "Pengawet perpanjang Shelf Life",
                        correct: false,
                        feedback: "Belum tepat. Memperpanjang Shelf Life pangan segar membutuhkan pendekatan yang berbeda dari pangan olahan. Pengawet kimia bekerja pada produk yang sudah diintervensi proses pengolahan — bukan pada produk segar yang masih hidup secara biologis. Faktor kritis mangga segar adalah suhu, atmosfer, dan penanganan fisik."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "Pendekatan tak sesuai faktor",
                        correct: true,
                        feedback: "Tepat! Pengawet kimia adalah pendekatan pangan olahan — bekerja pada produk yang sel-selnya sudah mati. Pada mangga segar yang masih bernapas, pengawet kimia tidak menyentuh faktor kritis utama: laju respirasi, aktivitas enzim, dan beban mikroba awal. Pendekatan tepat untuk segar adalah suhu (cold chain), atmosfer, dan fisik."
                      }
                    ]
                  },

                  // SLIDE 7: YES/NO (Investigasi Biskuit)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Sudah tepat atau belum?",
                      text: "Tim QC pabrik biskuit menemukan Shelf Life biskuit batch terbaru lebih pendek. Mereka langsung memeriksa kondisi penyimpanan bahan baku segar (tepung, telur) yang digunakan. Apakah ini langkah investigasi yang tepat?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-family: monospace; font-size: 12px;'><div style='color: #DC2626; font-weight: bold;'>Masalah: Shelf Life biskuit pendek</div><div style='color: #94A3B8; margin: 4px 0;'>↓ Tim QC memeriksa:</div><div>🥚 Penyimpanan telur segar</div><div>🌾 Penyimpanan tepung segar</div><div style='margin-top: 8px; font-family: sans-serif; font-weight: bold; text-align: center;'>❓ Tepat sebagai langkah utama?</div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "Bahan baku pengaruhi Life",
                        correct: false,
                        feedback: "Belum tepat. Faktor kritis Shelf Life biskuit (pangan olahan) adalah aw, kemasan, pH, dan proses thermal — bukan kondisi bahan baku segar. Meski kualitas bahan baku penting, investigasi Shelf Life yang pendek sebaiknya dimulai dari faktor yang paling langsung mempengaruhi stabilitas produk jadi (proses & kemasan)."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "Faktor utamanya di proses",
                        correct: true,
                        feedback: "Tepat! Untuk pangan olahan seperti biskuit, faktor kritis Shelf Life ada di proses pengolahan dan formulasi (aw, integritas segel kemasan, pemanggangan) — bukan kondisi bahan baku. Kondisi bahan segar penting untuk kualitas awal, tapi bukan faktor stabilitas biskuit ke depannya."
                      }
                    ]
                  },

                  // SLIDE 8: YES/NO (Strawberry MAP)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Sudah tepat atau belum?",
                      text: "Petani strawberry menggunakan kemasan MAP (Modified Atmosphere Packaging) dengan CO₂ tinggi untuk memperpanjang Shelf Life strawberry segar. Apakah ini pendekatan yang tepat?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; line-height: 1.6; font-size: 12px;'>🍓 <strong>Strawberry segar</strong><br/>📦 Dikemas MAP (CO₂ tinggi, O₂ rendah)<br/>⏳ <em>Tujuan: perpanjang Shelf Life</em><br/><div style='margin-top: 8px; font-weight: bold; text-align: center; color: #0F766E;'>❓ Tepat untuk pangan segar?</div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "MAP perlambat respirasi",
                        correct: true,
                        feedback: "Tepat! MAP adalah teknologi yang sangat cocok untuk pangan segar karena langsung menyentuh faktor biologisnya — mengurangi O₂ memperlambat respirasi, CO₂ memperlambat pematangan. Strawberry MAP bisa bertahan 2–3× lebih lama. Berbeda dari MAP di pangan olahan yang tujuannya hambat oksidasi lemak."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "MAP hanya untuk olahan",
                        correct: false,
                        feedback: "Belum tepat. MAP bukan hanya untuk pangan olahan — ia sangat efektif untuk segar. Mengontrol udara (mengurangi O₂, menambah CO₂) secara efektif melambatkan proses pernapasan buah dan menghambat bakteri."
                      }
                    ]
                  },

                  // SLIDE 9: YES/NO (Saus Sambal pH)
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Sudah tepat atau belum?",
                      text: "Produsen saus sambal menaikkan Shelf Life dari 12 bln menjadi 18 bln dengan menurunkan pH dari 4.2 menjadi 3.8 melalui penambahan cuka. Tepat secara prinsip?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #FEF2F2; border: 1px solid #FECACA; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='text-align: center; font-weight: bold; color: #DC2626; margin-bottom: 8px;'>🌶️ Saus Sambal Kemasan</div><div style='display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: #FFF; padding: 8px; border-radius: 6px;'><div style='font-size: 10px; color: #64748B;'>Sebelum:</div><div><strong>pH: 4.2</strong><br/>12 bln</div></div><div style='background: #FEE2E2; padding: 8px; border-radius: 6px;'><div style='font-size: 10px; color: #DC2626;'>Sesudah (target):</div><div><strong>pH: 3.8</strong><br/>18 bln</div></div></div><div style='margin-top: 8px; font-size: 11px; text-align: center; font-style: italic;'>+ tambah lebih banyak cuka</div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "pH rendah hambat mikroba",
                        correct: true,
                        feedback: "Tepat! Menurunkan pH (menambahkan asam) secara umum dan sangat efektif untuk pangan olahan. Semakin rendah pH, semakin sedikit bakteri tumbuh (terutama di bawah 4.6 yang hambat C. botulinum). Asam memperkuat hambatan mikrobiologis secara signifikan. Harus diverifikasi uji stabilitas lagi."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "pH tak pengaruhi Life",
                        correct: false,
                        feedback: "Belum tepat. pH adalah salah satu faktor kritis terpenting dalam Shelf Life pangan olahan. Menurunkan pH dengan penambahan cuka (asam asetat) terbukti ampuh mencegah tumbuhnya patogen dan pembusuk."
                      }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 4-N02 Selesai!",
                      insight: "Anda sudah bisa membedakan faktor Shelf Life pangan segar dan olahan — dan mengevaluasi apakah pendekatan yang diambil sudah sesuai dengan karakteristik produknya.",
                      icon: "🌿",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "Pangan segar masih hidup — faktor kritis: suhu, respirasi, atmosfer, integritas fisik, beban mikroba awal",
                        "Pangan olahan telah diintervensi manusia — faktor kritis: aw, pH, proses thermal, pengawet, kemasan",
                        "Strategi perpanjang Shelf Life harus sesuai jenis produk — pengawet kimia tak sentuh faktor biologis segar",
                        "MAP bisa untuk keduanya tapi tujuan berbeda: mengelola respirasi (segar) vs oksidasi (olahan)"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              },
              {
                id:       "peran-water-activity-aw",
                title:    "Menjelaskan peran water activity (aw) terhadap Shelf Life",
                icon:     "💧",
                duration: "20 menit",
                slides: [

                  // SLIDE 1: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Klasifikasi Produk",
                      text: "Klasifikasikan produk ini: risiko utama yang membatasi Shelf Life-nya adalah MIKROBIOLOGIS atau KIMIA (oksidasi/ketengikan)?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>💡 Nilai water activity (aw) menentukan jenis kerusakan yang paling cepat terjadi.</div>"
                    },
                    zones: [
                      {
                        id: "mikrobiologis",
                        icon: "🦠",
                        label: "Risiko Mikrobiologis",
                        subLabel: "aw tinggi → jamur, bakteri, ragi cepat tumbuh",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-400"
                      },
                      {
                        id: "kimia",
                        icon: "🧪",
                        label: "Risiko Kimia",
                        subLabel: "aw rendah → oksidasi lemak, ketengikan, reaksi Maillard",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🥛", text: "Susu segar pasteurisasi (aw ~0.99)", targetZone: "mikrobiologis" },
                      { id: "c2", icon: "🍪", text: "Biskuit kering (aw ~0.30)", targetZone: "kimia" },
                      { id: "c3", icon: "🧀", text: "Keju lunak (aw ~0.95)", targetZone: "mikrobiologis" },
                      { id: "c4", icon: "🥜", text: "Kacang tanah sangrai (aw ~0.40)", targetZone: "kimia" },
                      { id: "c5", icon: "🥫", text: "Saus tomat kaleng (aw ~0.93)", targetZone: "mikrobiologis" },
                      { id: "c6", icon: "🍚", text: "Kerupuk mentah (aw ~0.35)", targetZone: "kimia" }
                    ],
                    feedbackCorrect: "Sempurna! Produk dengan aw > 0.85–0.90 umumnya dibatasi Shelf Life-nya oleh pertumbuhan mikroba (jamur, bakteri, ragi). Produk dengan aw < 0.60 justru lebih rentan terhadap kerusakan kimia: oksidasi lemak (ketengikan) dan reaksi pencoklatan non-enzimatis. Inilah sebabnya biskuit kadaluwarsa karena tengik, bukan karena basi.",
                    feedbackWrong: "Ada yang tertukar. Produk berair tinggi (susu, keju lunak, saus tomat) punya aw tinggi → risiko mikroba lebih cepat muncul. Produk kering (biskuit, kacang, kerupuk) punya aw rendah → risiko kimia (oksidasi) yang menentukan expiry date-nya."
                  },

                  // SLIDE 2: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Klasifikasi Faktor",
                      text: "Klasifikasikan: faktor utama yang menyebabkan produk ini HARUS dicantumkan 'Use By' (bukan 'Best Before') adalah karena?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>💡 Regulasi pangan mewajibkan 'Use By' untuk produk dengan risiko mikroba tinggi, 'Best Before' untuk produk dengan risiko penurunan kualitas non-mikroba.</div>"
                    },
                    zones: [
                      {
                        id: "use-by",
                        icon: "⚠️",
                        label: "Wajib 'Use By'",
                        subLabel: "Risiko mikroba (aw tinggi)",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-400"
                      },
                      {
                        id: "best-before",
                        icon: "📅",
                        label: "Cukup 'Best Before'",
                        subLabel: "Risiko kimia/sensoris (aw rendah)",
                        colorUrl: "bg-green-50",
                        borderColor: "border-green-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🧃", text: "Jus buah segar tanpa pengawet (aw ~0.98)", targetZone: "use-by" },
                      { id: "c2", icon: "🥨", text: "Pretzel kemasan (aw ~0.35)", targetZone: "best-before" },
                      { id: "c3", icon: "🥩", text: "Daging giling segar (aw ~0.99)", targetZone: "use-by" },
                      { id: "c4", icon: "🍿", text: "Popcorn kemasan (aw ~0.40)", targetZone: "best-before" },
                      { id: "c5", icon: "🥗", text: "Salad sayur dengan dressing (aw ~0.96)", targetZone: "use-by" },
                      { id: "c6", icon: "🍫", text: "Cokelat batangan (aw ~0.50)", targetZone: "best-before" }
                    ],
                    feedbackCorrect: "Tepat! Produk dengan aw tinggi (>0.90) memungkinkan pertumbuhan patogen dan pembusuk mikroba — karena itu wajib mencantumkan 'Use By' (batas aman konsumsi). Produk dengan aw rendah (<0.60) kerusakannya bersifat gradual (tengik, hilang rasa) — cukup 'Best Before' yang menandakan penurunan kualitas, bukan bahaya.",
                    feedbackWrong: "Tertukar. Daging segar, jus, dan salad basah punya aw tinggi → risiko mikroba → wajib 'Use By'. Produk kering (pretzel, popcorn, cokelat) aw rendah → cukup 'Best Before'."
                  },

                  // SLIDE 3: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Klasifikasi Kerusakan",
                      text: "Klasifikasikan: penurunan kualitas apa yang PALING CEPAT terjadi pada produk dengan nilai aw ini?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>💡 Nilai aw yang berbeda memicu mekanisme kerusakan yang berbeda.</div>"
                    },
                    zones: [
                      {
                        id: "mikroba",
                        icon: "🧫",
                        label: "Pertumbuhan mikroba",
                        subLabel: "(aw > 0.85)",
                        colorUrl: "bg-red-50",
                        borderColor: "border-red-400"
                      },
                      {
                        id: "oksidasi",
                        icon: "🔥",
                        label: "Oksidasi / ketengikan",
                        subLabel: "(aw < 0.60)",
                        colorUrl: "bg-orange-50",
                        borderColor: "border-orange-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "💧", text: "aw = 0.98 (daging segar)", targetZone: "mikroba" },
                      { id: "c2", icon: "🍪", text: "aw = 0.30 (biskuit)", targetZone: "oksidasi" },
                      { id: "c3", icon: "🧀", text: "aw = 0.92 (keju lunak)", targetZone: "mikroba" },
                      { id: "c4", icon: "🥨", text: "aw = 0.45 (kerupuk)", targetZone: "oksidasi" },
                      { id: "c5", icon: "🥫", text: "aw = 0.95 (saus dalam kaleng)", targetZone: "mikroba" },
                      { id: "c6", icon: "🥜", text: "aw = 0.50 (selai kacang)", targetZone: "oksidasi" }
                    ],
                    feedbackCorrect: "Sempurna! Semakin tinggi aw (>0.85), air bebas tersedia untuk mikroba — mereka tumbuh cepat dan membatasi Shelf Life. Semakin rendah aw (<0.60), air terlalu sedikit untuk mikroba, tapi oksigen lebih mudah mengoksidasi lemak — ketengikan menjadi musuh utama.",
                    feedbackWrong: "Perhatikan batas aw ~0.85. Di atasnya, mikroba dominan. Di bawahnya, oksidasi dan reaksi kimia lain yang lebih cepat merusak produk."
                  },

                  // SLIDE 4: TAP/CLASSIFY
                  {
                    type: "tap_classify",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Klasifikasi Strategi",
                      text: "Klasifikasikan: strategi memperpanjang Shelf Life yang paling EFEKTIF untuk produk ini adalah?",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px dashed #CBD5E1; padding: 10px 12px; border-radius: 8px; font-size: 12px; color: #475569;'>💡 Menurunkan aw atau mengendalikan oksidasi — tergantung profil produk.</div>"
                    },
                    zones: [
                      {
                        id: "turunkan-aw",
                        icon: "💧",
                        label: "Turunkan aw",
                        subLabel: "(keringkan, tambah garam/gula)",
                        colorUrl: "bg-blue-50",
                        borderColor: "border-blue-400"
                      },
                      {
                        id: "cegah-oksidasi",
                        icon: "🧪",
                        label: "Cegah oksidasi",
                        subLabel: "(kemasan kedap udara, antioksidan)",
                        colorUrl: "bg-purple-50",
                        borderColor: "border-purple-400"
                      }
                    ],
                    cards: [
                      { id: "c1", icon: "🥩", text: "Dendeng sapi (aw awal ~0.99)", targetZone: "turunkan-aw" },
                      { id: "c2", icon: "🍪", text: "Biskuit cokelat (aw awal ~0.30)", targetZone: "cegah-oksidasi" },
                      { id: "c3", icon: "🥫", text: "Saus sambal basah (aw ~0.95)", targetZone: "turunkan-aw" },
                      { id: "c4", icon: "🥜", text: "Kacang mede panggang", targetZone: "cegah-oksidasi" },
                      { id: "c5", icon: "🧀", text: "Keju segar (aw ~0.98)", targetZone: "turunkan-aw" },
                      { id: "c6", icon: "🍿", text: "Kerupuk udang mentah", targetZone: "cegah-oksidasi" }
                    ],
                    feedbackCorrect: "Tepat! Produk basah/lembab harus diturunkan aw-nya (pengeringan, penggaraman, pemanisan) agar Shelf Life-nya tidak dibatasi mikroba. Produk yang sudah kering justru perlu dilindungi dari oksigen (kemasan vakum, nitrogen, antioksidan) karena risiko utamanya adalah ketengikan.",
                    feedbackWrong: "Tertukar. Dendeng, saus, keju basah — prioritas turunkan aw. Biskuit, kacang, kerupuk — prioritas cegah oksidasi."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#16A34A",
                      label: "Materi Inti",
                      text: "Water Activity (aw) — Pembatas Shelf Life yang Tersembunyi",
                      style: { background: "#064E3B", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-aw-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Apa itu water activity (aw) dan mengapa penting?",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Water activity (aw) adalah ukuran air bebas dalam produk yang tersedia untuk reaksi kimia dan pertumbuhan mikroba — berbeda dari kadar air total. Nilai aw berkisar dari 0 (kering sempurna) hingga 1 (air murni).</p><table style='width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 14px; background: #1E293B; border-radius: 8px; overflow: hidden;'><tr style='background: #334155;'><th style='padding: 8px; text-align: left; color: #93C5FD;'>Nilai aw</th><th style='padding: 8px; text-align: left; color: #93C5FD;'>Contoh produk</th><th style='padding: 8px; text-align: left; color: #93C5FD;'>Risiko utama</th></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>&gt; 0.95</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Susu segar, daging, ikan</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Mikroba (bakteri, ragi) tumbuh cepat — Shelf Life sangat pendek</td></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>0.85–0.95</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Keju lunak, sosis, selai</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Jamur dan khamir masih bisa tumbuh — perlu pendinginan</td></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>0.60–0.85</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Tepung, kue kering, madu</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Mikroba terhambat, oksidasi mulai signifikan</td></tr><tr><td style='padding: 8px;'>&lt; 0.60</td><td style='padding: 8px;'>Biskuit, kerupuk, kacang sangrai</td><td style='padding: 8px;'>Mikroba hampir tidak tumbuh — ketengikan oksidatif pembatas utama</td></tr></table><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px;'>📌 <strong>Kunci:</strong> aw menentukan jenis kerusakan yang akan terjadi pertama kali. Jika aw tinggi → mikroba; jika aw rendah → oksidasi/kimia.</div></div>"
                      },
                      {
                        id: "pnl-aw-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "aw dan konsekuensi ke Expiry Date vs Use By",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 12px;'>Regulasi pangan (termasuk BPOM RI) membedakan dua jenis label kadaluwarsa berdasarkan risiko:</p><table style='width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 14px; background: #1E293B; border-radius: 8px; overflow: hidden;'><tr style='background: #334155;'><th style='padding: 8px; text-align: left; color: #93C5FD;'>Label</th><th style='padding: 8px; text-align: left; color: #93C5FD;'>Kapan digunakan</th><th style='padding: 8px; text-align: left; color: #93C5FD;'>Hubungan dengan aw</th></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'><strong>Use By</strong></td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Produk dengan risiko mikroba tinggi. Tidak aman dikonsumsi setelah tanggal tersebut.</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>aw &gt; 0.90 (daging segar, susu pasteurisasi, salad basah)</td></tr><tr><td style='padding: 8px;'><strong>Best Before</strong></td><td style='padding: 8px;'>Produk dengan risiko penurunan kualitas (tengik, hilang rasa, tekstur berubah). Masih aman dikonsumsi setelah tanggal, tapi kualitas menurun.</td><td style='padding: 8px;'>aw &lt; 0.65 (biskuit, kerupuk, cokelat, kopi bubuk)</td></tr></table><div style='background: #1E293B; padding: 10px; border-radius: 8px; margin-bottom: 12px;'><div style='font-size: 13px; font-weight: bold; margin-bottom: 4px; color: #FCA5A5;'>Contoh nyata:</div><div style='font-size: 12px; margin-bottom: 4px;'>🥛 Susu segar (aw~0.99) → <strong>Use By 7 hari</strong>. Setelah itu, bakteri patogen bisa tumbuh.</div><div style='font-size: 12px;'>🍪 Biskuit (aw~0.30) → <strong>Best Before 12 bulan</strong>. Setelah itu masih aman, tapi mungkin sudah tengik.</div></div><div style='background: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px; border-radius: 4px; color: #7F1D1D; font-weight: 500; font-size: 12px;'>⚠️ <strong>Kesalahan umum:</strong> Mengira semua produk pangan pakai 'Expiry Date' yang sama. Faktanya, produk aw rendah bisa bertahan bertahun-tahun tanpa bahaya mikroba — yang berkurang hanya rasa dan aroma.</div></div>"
                      },
                      {
                        id: "pnl-aw-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Strategi memperpanjang Shelf Life berdasarkan aw",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 12px;'>Dua strategi besar yang saling berlawanan:</p><div style='display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;'><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #93C5FD; font-weight: 700; font-size: 13px; margin-bottom: 6px;'>Untuk produk aw tinggi (&gt;0.85):</div><div style='font-size: 12px; margin-bottom: 4px;'>🎯 <strong>Tujuan:</strong> turunkan aw ke zona aman</div><div style='font-size: 12px; margin-bottom: 4px;'>🛠️ <strong>Cara:</strong> pengeringan, penambahan garam/gula, fermentasi, atau pengentalan (saus, selai)</div><div style='font-size: 12px;'>💡 <strong>Contoh:</strong> dendeng (aw turun dari 0.99 ke 0.70), manisan (aw ~0.75)</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #FCA5A5; font-weight: 700; font-size: 13px; margin-bottom: 6px;'>Untuk produk aw rendah (&lt;0.65):</div><div style='font-size: 12px; margin-bottom: 4px;'>🎯 <strong>Tujuan:</strong> cegah oksidasi dan reaksi kimia lain</div><div style='font-size: 12px; margin-bottom: 4px;'>🛠️ <strong>Cara:</strong> kemasan kedap oksigen (vakum, nitrogen flush), tambah antioksidan (BHA, BHT, vitamin E), simpan di suhu rendah</div><div style='font-size: 12px;'>💡 <strong>Contoh:</strong> kemasan biskuit dengan aluminium foil, kacang tanah dalam kemasan vakum</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px;'>📦 <strong>Fakta menarik:</strong> Biskuit yang dibuka kemasannya lalu dibiarkan terbuka akan menyerap uap air dari udara (aw naik). Akibatnya, risikonya berubah: dari ketengikan menjadi pertumbuhan jamur. Ini sebabnya biskuit yang sudah lembab cepat berjamur.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: YES/NO 
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Sudah tepat atau belum?",
                      text: "Produsen keripik singkong menuliskan 'Best Before 6 bulan' pada kemasan. Apakah label ini sudah tepat secara prinsip?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🍠</div><div style='font-weight: bold; margin-bottom: 8px;'>Keripik singkong (aw ~0.35)</div><div style='background: white; padding: 8px; border-radius: 6px; border: 1px dashed #CBD5E1; display: inline-block;'>Label: <strong>Best Before 6 bulan</strong></div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "Keripik termasuk produk aw rendah",
                        correct: true,
                        feedback: "Tepat! Keripik singkong memiliki aw sangat rendah (~0.35). Risiko utamanya adalah ketengikan (oksidasi lemak), bukan pertumbuhan mikroba patogen. Karena itu label 'Best Before' sudah sesuai — konsumen masih aman makan setelah tanggal lewat, hanya kualitas (kerenyahan, rasa) yang menurun."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "Harusnya Use By",
                        correct: false,
                        feedback: "Belum tepat. Produk aw rendah seperti keripik tidak menumbuhkan bakteri berbahaya dengan cepat. Regulasi tidak mewajibkan 'Use By' untuk produk ini. 'Best Before' adalah label yang tepat."
                      }
                    ]
                  },

                  // SLIDE 7: YES/NO
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Sudah tepat atau belum?",
                      text: "Seorang konsumen menemukan biskuit yang sudah lewat tanggal 'Best Before'-nya 3 bulan. Ia memutuskan untuk membuangnya karena takut keracunan. Apakah keputusan ini tepat berdasarkan prinsip aw?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px;'><div style='display: flex; align-items: center; gap: 8px; margin-bottom: 8px;'><div style='font-size: 24px;'>🍪</div><div><div style='font-weight: bold;'>Biskuit (aw ~0.30)</div><div style='font-size: 12px; color: #475569;'>Best Before: 3 bulan lalu</div></div></div><div style='background: #FEF2F2; color: #DC2626; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: bold; display: flex; align-items: center; gap: 6px;'><span style='font-size: 16px;'>🗑️</span> Tindakan konsumen: Buang karena takut keracunan</div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat buang",
                        subLabel: "Sudah lewat = tidak aman",
                        correct: false,
                        feedback: "Belum tepat. 'Best Before' berbeda dengan 'Use By'. Produk aw rendah tidak menjadi berbahaya setelah tanggal lewat — yang terjadi adalah penurunan kualitas sensoris. Konsumen sebaiknya mengecek bau dan penampilan, tidak langsung membuang."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "Masih aman, hanya kualitas turun",
                        correct: true,
                        feedback: "Tepat — keputusan konsumen tidak tepat berdasarkan prinsip aw. Biskuit dengan aw rendah (<0.60) tidak mendukung pertumbuhan bakteri patogen. Lewat 'Best Before' berarti rasa, tekstur, atau aroma mungkin sudah berkurang, tapi produk masih aman dikonsumsi. Membuangnya karena takut keracunan adalah pemborosan yang tidak berdasar."
                      }
                    ]
                  },

                  // SLIDE 8: YES/NO
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Sudah tepat atau belum?",
                      text: "Sebuah pabrik selai kacang ingin memperpanjang Shelf Life dari 12 bulan menjadi 18 bulan. Mereka memutuskan untuk menambahkan lebih banyak gula (menurunkan aw dari 0.55 ke 0.45). Apakah ini strategi yang efektif untuk selai kacang?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px;'><div style='display: flex; align-items: center; gap: 8px; margin-bottom: 8px;'><div style='font-size: 24px;'>🥜</div><div><div style='font-weight: bold;'>Selai kacang</div><div style='font-size: 12px; color: #475569;'>aw awal 0.55 → target aw 0.45</div></div></div><div style='background: white; padding: 8px; border-radius: 6px; border: 1px solid #CBD5E1; font-size: 12px; font-weight: bold;'>🎯 Strategi: Tambah gula (turunkan aw)</div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, efektif",
                        subLabel: "Menurunkan aw menghambat oksidasi",
                        correct: false,
                        feedback: "Belum tepat. Setelah aw di bawah 0.60, mikroba sudah hampir tidak tumbuh. Memperkecil aw lebih lanjut tidak memberikan manfaat signifikan terhadap ketengikan. Untuk selai kacang, fokusnya harus pada pengendalian oksidasi."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak efektif",
                        subLabel: "Risiko utama selai kacang adalah oksidasi, bukan mikroba",
                        correct: true,
                        feedback: "Tepat — strategi ini tidak efektif untuk selai kacang. Selai kacang sudah memiliki aw rendah (<0.60). Risiko utama pembatas Shelf Life-nya adalah oksidasi lemak (ketengikan) karena kandungan minyak tinggi. Menurunkan aw lebih lanjut dari 0.55 ke 0.45 tidak akan menghentikan oksidasi. Strategi yang tepat: tambah antioksidan (vitamin E), kemasan kedap oksigen, atau simpan di suhu lebih rendah."
                      }
                    ]
                  },

                  // SLIDE 9: YES/NO
                  {
                    type: "yes_no",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Sudah tepat atau belum?",
                      text: "Restoran membuat salad sayur dengan dressing. Mereka menyimpannya di kulkas dan menulis label 'Best Before 3 hari'. Apakah label ini sudah tepat?",
                      labelColor: "#059669",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 10px; margin-bottom: 12px; text-align: center;'><div style='font-size: 24px; margin-bottom: 4px;'>🥗</div><div style='font-weight: bold; margin-bottom: 8px;'>Salad sayur + dressing (aw ~0.96)</div><div style='background: white; padding: 8px; border-radius: 6px; border: 1px dashed #CBD5E1; display: inline-block;'>Label: <strong>Best Before 3 hari (simpan di kulkas)</strong></div></div>"
                    },
                    options: [
                      {
                        id: "yes",
                        icon: "✅",
                        label: "Ya, tepat",
                        subLabel: "Best Before umum untuk semua makanan",
                        correct: false,
                        feedback: "Belum tepat. Produk aw tinggi seperti salad basah memiliki potensi pertumbuhan patogen. Label yang benar adalah 'Use By' — bukan 'Best Before'. Restoran berisiko memberikan informasi yang salah kepada konsumen."
                      },
                      {
                        id: "no",
                        icon: "❌",
                        label: "Tidak tepat",
                        subLabel: "Harusnya 'Use By' karena aw tinggi",
                        correct: true,
                        feedback: "Tepat — label ini tidak tepat. Salad dengan dressing memiliki aw sangat tinggi (~0.96). Risiko utamanya adalah pertumbuhan bakteri patogen (seperti Listeria atau Salmonella), bukan sekadar penurunan kualitas. Regulasi pangan mewajibkan produk berisiko mikroba tinggi menggunakan label 'Use By'. Setelah tanggal 'Use By', produk tidak aman dikonsumsi bahkan jika disimpan di kulkas."
                      }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 4-N03 Selesai!",
                      insight: "Anda sekarang bisa mengaitkan nilai aw dengan jenis risiko kerusakan produk — dan memahami mengapa label kadaluwarsa berbeda untuk produk basah vs kering.",
                      icon: "💧",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "aw tinggi (>0.85) → risiko mikroba → wajib 'Use By'",
                        "aw rendah (<0.60) → risiko oksidasi/ketengikan → cukup 'Best Before'",
                        "Menurunkan aw efektif untuk produk basah; untuk produk kering, fokus cegah oksidasi",
                        "'Best Before' lewat ≠ tidak aman — hanya kualitas menurun"
                      ],
                      next: "Selesai",
                      colorMode: "green"
                    }
                  }
                ]
              }

            ]
          },
          {
            id:          "penerapan-di-lapangan",
            title:       "Penerapan di Lapangan",
            description: "Studi kasus, simulasi audit, dan pemecahan masalah riil terkait umur simpan di industri",
            icon:        "🏭",
            subLessons: [
              {
                id:       "menerapkan-fefo-expiry",
                title:    "Menerapkan FEFO berdasarkan Expiry Date",
                duration: "20 menit",
                icon:     "🔄",
                slides: [

                  // SLIDE 1: REORDER STEPS
                  {
                    type: "reorder_steps",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Urutkan dari yang PALING CEPAT EXPIRED ke PALING LAMA",
                      text: "Drag & drop produk berikut ke dalam urutan yang benar berdasarkan tanggal Expiry Date-nya (dari yang paling segera kedaluwarsa ke yang paling lama)."
                    },
                    instruction: "Seret kartu ke atas atau bawah untuk mengubah urutan. Urutan paling atas = paling cepat expired.",
                    cards: [
                      { id: "A", icon: "🥛", text: "Susu UHT", dateText: "15/05/2026", correctPos: 3 },
                      { id: "B", icon: "🧃", text: "Jus buah segar", dateText: "10/04/2026", correctPos: 1 },
                      { id: "C", icon: "🥫", text: "Saus tomat kaleng", dateText: "20/06/2026", correctPos: 4 },
                      { id: "D", icon: "🧀", text: "Keju parut", dateText: "01/05/2026", correctPos: 2 }
                    ],
                    feedbackCorrect: "Sempurna! Urutan yang benar: Jus buah segar (10/04) → Keju parut (01/05) → Susu UHT (15/05) → Saus tomat (20/06). FEFO berarti produk dengan expiry paling dekat harus keluar (dijual/digunakan) lebih dulu, apapun waktu kedatangannya.",
                    feedbackWrong: "Belum tepat. Perhatikan tanggal expiry-nya. Yang paling cepat expired harus berada di urutan paling atas. Urutan yang benar: Jus buah segar (10/04) → Keju parut (01/05) → Susu UHT (15/05) → Saus tomat (20/06)."
                  },

                  // SLIDE 2: REORDER STEPS
                  {
                    type: "reorder_steps",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Urutkan dari yang PALING CEPAT EXPIRED ke PALING LAMA",
                      text: "Drag & drop produk berikut berdasarkan tanggal Expiry Date-nya. Perhatikan format tanggal yang berbeda-beda."
                    },
                    cards: [
                      { id: "A", icon: "🍪", text: "Biskuit cokelat", dateText: "30/11/2026", correctPos: 4 },
                      { id: "B", icon: "🥩", text: "Daging sapi segar", dateText: "10/08/2026", correctPos: 2 },
                      { id: "C", icon: "🥛", text: "Yogurt drink", dateText: "25/07/2026", correctPos: 1 },
                      { id: "D", icon: "🥫", text: "Kornet sapi", dateText: "05/09/2026", correctPos: 3 }
                    ],
                    feedbackCorrect: "Tepat! Urutan FEFO: Yogurt (25/07) → Daging sapi (10/08) → Kornet (05/09) → Biskuit (30/11). Yogurt memiliki sisa Shelf Life paling pendek, harus diprioritaskan.",
                    feedbackWrong: "Perhatikan bulan dan tanggal. Yang paling cepat expired adalah 25 Juli (yogurt), lalu 10 Agustus (daging), lalu 5 September (kornet), terakhir 30 November (biskuit)."
                  },

                  // SLIDE 3: REORDER STEPS
                  {
                    type: "reorder_steps",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Urutkan dari yang PALING CEPAT EXPIRED ke PALING LAMA",
                      text: "Drag & drop produk berikut. Beberapa produk memiliki tanggal yang sama — urutkan berdasarkan abjad nama produk jika tanggalnya identik."
                    },
                    cards: [
                      { id: "A", icon: "🧃", text: "Jus apel", dateText: "15/09/2026", correctPos: 2 },
                      { id: "B", icon: "🧃", text: "Jus jeruk", dateText: "15/09/2026", correctPos: 1 },
                      { id: "C", icon: "🥫", text: "Kacang kaleng", dateText: "01/10/2026", correctPos: 3 },
                      { id: "D", icon: "🥫", text: "Sarden kaleng", dateText: "01/10/2026", correctPos: 4 }
                    ],
                    feedbackCorrect: "Tepat! Jus jeruk dan apel sama-sama expired 15 September — urutkan berdasarkan abjad: jeruk (J) sebelum apel (A). Kacang dan sarden expired 1 Oktober — kacang (K) sebelum sarden (S).",
                    feedbackWrong: "Tanggal expiry yang sama diurutkan berdasarkan nama produk (A-Z). Urutan yang benar: Jus jeruk → Jus apel → Kacang kaleng → Sarden kaleng."
                  },

                  // SLIDE 4: REORDER STEPS
                  {
                    type: "reorder_steps",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Urutkan dari yang PALING CEPAT EXPIRED ke PALING LAMA",
                      text: "Drag & drop produk berikut. Perhatikan tahun yang berbeda-beda."
                    },
                    cards: [
                      { id: "A", icon: "🥜", text: "Selai kacang", dateText: "15/03/2025", correctPos: 2 },
                      { id: "B", icon: "🍯", text: "Madu", dateText: "10/10/2027", correctPos: 4 },
                      { id: "C", icon: "🍚", text: "Beras kemasan", dateText: "20/12/2025", correctPos: 3 },
                      { id: "D", icon: "🥫", text: "Ikan kaleng", dateText: "05/01/2025", correctPos: 1 }
                    ],
                    feedbackCorrect: "Sempurna! Ikan kaleng expired Januari 2025, selai kacang Maret 2025, beras Desember 2025, madu Oktober 2027. Tahun menentukan prioritas utama.",
                    feedbackWrong: "Perhatikan tahun expiry. Ikan kaleng (2025-01) paling cepat, lalu selai kacang (2025-03), beras (2025-12), terakhir madu (2027-10)."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#3B82F6",
                      label: "Materi Inti",
                      text: "FEFO (First Expired First Out) — Aturan Dasar Pengelolaan Stok",
                      style: { background: "#1E3A8A", color: "white", borderRadius: "16px" }
                    },
                    panels: [
                      {
                        id: "pnl-fefo-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Apa itu FEFO dan mengapa penting?",
                        color: "#CA8A04",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'><strong>FEFO (First Expired First Out)</strong> adalah metode pengelolaan stok di mana produk dengan tanggal kedaluwarsa paling dekat harus dikeluarkan (dijual, digunakan, atau didistribusikan) lebih dulu — terlepas dari urutan kedatangannya.</p><p style='margin-bottom: 8px;'>Mengapa FEFO lebih unggul dari FIFO (First In First Out) untuk produk pangan?</p><ul style='margin-bottom: 14px;'><li style='margin-bottom: 4px;'>FIFO hanya melihat waktu masuk gudang</li><li style='margin-bottom: 4px;'>FEFO melihat sisa umur simpan (Shelf Life)</li><li style='margin-bottom: 4px;'>Dua produk yang sama bisa punya expiry berbeda karena batch produksi berbeda</li></ul><div style='background: #1E293B; padding: 12px; border-radius: 8px; margin-bottom: 14px; font-family: monospace; font-size: 13px; color: #E2E8F0;'><div style='margin-bottom: 4px;'><span style='color: #94A3B8;'>FIFO:</span> Masuk duluan → Keluar duluan (abaikan expiry)</div><div><span style='color: #60A5FA;'>FEFO:</span> Expiry paling dekat → Keluar duluan (abaikan urutan masuk)</div></div><div style='background: #F8FAFC; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px;'>📌 <strong>Ingat:</strong> FEFO menyelamatkan produk dari kedaluwarsa sia-sia. Tanpa FEFO, produk dengan expiry dekat bisa teronggok di belakang rak sementara produk baru di depan terus laku.</div></div>"
                      },
                      {
                        id: "pnl-fefo-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Cara menerapkan FEFO di gudang dan rak",
                        color: "#2563EB",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Empat langkah praktis:</p><div style='display: flex; flex-direction: column; gap: 8px;'><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #60A5FA; font-weight: 700; font-size: 13px;'>1. Label expiry harus terbaca</div><div style='font-size: 12px;'>Pastikan setiap produk punya label tanggal kadaluwarsa yang jelas (bisa dibaca tanpa memindahkan produk).</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #34D399; font-weight: 700; font-size: 13px;'>2. Sortir saat penyimpanan</div><div style='font-size: 12px;'>Setiap kali menerima barang baru, bandingkan expiry-nya dengan stok lama. Produk dengan expiry lebih dekat diletakkan di depan (atau zona akses cepat).</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #A78BFA; font-weight: 700; font-size: 13px;'>3. Rotasi rutin</div><div style='font-size: 12px;'>Lakukan pengecekan berkala (mingguan atau bulanan) untuk memastikan produk dengan expiry dekat tidak terbenam.</div></div><div style='background: #1E293B; padding: 10px; border-radius: 8px;'><div style='color: #F87171; font-weight: 700; font-size: 13px;'>4. Gunakan sistem peringatan</div><div style='font-size: 12px;'>Untuk produk dengan expiry &lt;30 hari, beri tanda warna (merah, kuning) atau pindahkan ke area prioritas.</div></div></div><div style='background: #F8FAFC; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 4px; color: #1E293B; font-weight: 500; font-size: 12px; margin-top: 14px;'>📦 <strong>Peralatan bantu:</strong> Rak miring (gravity flow rack), rak putar, atau sistem WMS (Warehouse Management System) dengan fitur FEFO otomatis.</div></div>"
                      },
                      {
                        id: "pnl-fefo-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Kesalahan umum dalam FEFO dan dampaknya",
                        color: "#16A34A",
                        content: "<div style='color: #CBD5E1; line-height: 1.6; font-size: 14px;'><p style='margin-bottom: 14px;'>Tiga kesalahan yang sering terjadi:</p><table style='width: 100%; font-size: 12px; border-collapse: collapse; margin-bottom: 14px; background: #1E293B; border-radius: 8px; overflow: hidden;'><tr style='background: #334155;'><th style='padding: 8px; text-align: left; color: #FCA5A5;'>Kesalahan</th><th style='padding: 8px; text-align: left; color: #FCA5A5;'>Dampak</th></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>Menganggap FIFO = FEFO</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Produk dengan expiry dekat terabaikan, akhirnya kadaluwarsa di gudang → kerugian finansial</td></tr><tr><td style='padding: 8px; border-bottom: 1px solid #334155;'>Tidak mengecek expiry saat rotasi</td><td style='padding: 8px; border-bottom: 1px solid #334155;'>Stok lama tetap teronggok meskipun expiry-nya masih lama, tapi produk baru dengan expiry lebih dekat malah diprioritaskan</td></tr><tr><td style='padding: 8px;'>Mengabaikan produk dengan expiry sama</td><td style='padding: 8px;'>Jika expiry sama, tidak masalah urutannya. Tapi jika tidak konsisten, bisa membingungkan operator</td></tr></table><div style='background: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px; border-radius: 4px; color: #7F1D1D; font-weight: 500; font-size: 12px;'>⚠️ <strong>Dampak nyata:</strong> Restoran yang tidak menerapkan FEFO bisa menggunakan bahan baku yang sudah mendekati expiry untuk menu yang seharusnya menggunakan bahan baru — berisiko pada konsistensi rasa dan keamanan pangan.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: MCQ / PILIH LANGKAH
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih tindakan FEFO yang tepat",
                      text: "Di gudang dingin, terdapat dua palet susu UHT: Palet A (masuk 2 minggu lalu) dan Palet B (masuk kemarin). Manakah yang harus diprioritaskan untuk dikirim ke toko hari ini?",
                      labelColor: "#3B82F6",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 10px; margin-bottom: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'><div style='background: white; padding: 10px; border-radius: 8px; border: 1px dashed #CBD5E1;'><div style='font-weight: bold; margin-bottom: 4px;'>🥛 Palet A</div><div style='font-size: 12px; color: #475569;'>Exp: 15/08/2026<br/>Masuk: 2 minggu lalu</div></div><div style='background: white; padding: 10px; border-radius: 8px; border: 1px dashed #CBD5E1;'><div style='font-weight: bold; margin-bottom: 4px;'>🥛 Palet B</div><div style='font-size: 12px; color: #DC2626;'>Exp: 10/08/2026</div><div style='font-size: 12px; color: #475569;'>Masuk: kemarin</div></div></div>"
                    },
                    options: [
                      { id: "A", icon: "📦", text: "Palet A (masuk lebih dulu) — karena FIFO", correct: false, feedback: "Belum tepat. FIFO (masuk duluan keluar duluan) tidak selalu tepat untuk produk ber-expiry. Palet A expired-nya lebih lama (15/08), sementara Palet B sudah akan expired 10/08. FEFO mengharuskan Palet B didahulukan." },
                      { id: "B", icon: "🔄", text: "Ambil setengah dari masing-masing palet, gabung dalam satu kiriman", correct: false, feedback: "Mencampur kedua palet justru memperumit. FEFO yang benar: kirim seluruh Palet B dulu karena expiry-nya lebih dekat. Setelah habis, baru Palet A." },
                      { id: "C", icon: "⏰", text: "Palet B (expiry lebih dekat, 10/08) — karena FEFO", correct: true, feedback: "Tepat! FEFO mengutamakan expiry, bukan waktu kedatangan. Palet B expired 10/08 (lebih dekat dari 15/08) harus dikirim lebih dulu meskipun baru masuk kemarin. Ini mencegah produk kadaluwarsa di gudang." }
                    ]
                  },

                  // SLIDE 7: MCQ / PILIH LANGKAH
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih tindakan FEFO yang tepat",
                      text: "Karyawan sedang merapikan rak daging segar. Ada 3 bungkus daging sapi dengan letak berbeda. Apa yang harus dilakukan?",
                      labelColor: "#3B82F6",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 14px; border-radius: 10px; margin-bottom: 12px; font-size: 12px;'><div style='font-weight: bold; margin-bottom: 8px;'>Susunan Rak (Depan ➜ Belakang):</div><div style='background: white; padding: 8px; border-radius: 6px; margin-bottom: 4px; border-left: 3px solid #60A5FA;'>[Depan] <strong>Bungkus X:</strong> Exp 05/04/2026</div><div style='background: white; padding: 8px; border-radius: 6px; margin-bottom: 4px; border-left: 3px solid #60A5FA;'>[Tengah] <strong>Bungkus Y:</strong> Exp 12/04/2026</div><div style='background: white; padding: 8px; border-radius: 6px; border-left: 3px solid #DC2626;'>[Belakang] <strong>Bungkus Z:</strong> Exp 28/03/2026 <span style='color: #DC2626; font-weight: bold;'>(Terdekat!)</span></div></div>"
                    },
                    options: [
                      { id: "A", icon: "📦", text: "Pindahkan Z ke posisi paling depan, X dan Y ke belakang", correct: true, feedback: "Tepat! FEFO mengharuskan produk dengan expiry paling dekat (Z, 28/03) berada di posisi paling depan agar cepat laku. X (05/04) dan Y (12/04) dipindah ke belakang. Ini rotasi rak yang benar." },
                      { id: "B", icon: "🔄", text: "Biarkan saja — pelanggan biasanya memilih produk paling dekat expired sendiri", correct: false, feedback: "Membiarkan produk dengan expiry dekat terhalang di belakang adalah kesalahan umum. Pelanggan akan mengambil yang di depan (expiry lebih lama) dan produk yang mendekati expiry akan kadaluwarsa di rak." },
                      { id: "C", icon: "🗑️", text: "Buang Z — sudah terlalu dekat expiry, tidak layak dijual", correct: false, feedback: "Produk dengan expiry 28/03 masih 3 hari lagi (asumsi hari ini 25/03). Belum perlu dibuang. FEFO justru memberinya kesempatan untuk laku dengan memindahkannya ke depan." }
                    ]
                  },

                  // SLIDE 8: MCQ / PILIH LANGKAH
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih tindakan FEFO yang tepat",
                      text: "Gudang menerima 2 batch produk baru. Saat akan menyimpan, apa urutan penyimpanan yang benar (dari posisi termudah dijangkau ke tersulit)?",
                      labelColor: "#3B82F6",
                      htmlContext: "<div style='background: #F8FAFC; border: 1px solid #E2E8F0; padding: 12px; border-radius: 10px; margin-bottom: 12px; font-size: 13px;'><div style='font-weight: bold; margin-bottom: 8px; color: #1E293B;'>Daftar Stok:</div><div style='margin-bottom: 4px;'><span style='color: #DC2626; font-weight: bold;'>Stok Lama:</span> Exp 20/10/2026</div><div style='margin-bottom: 4px;'><span style='color: #60A5FA; font-weight: bold;'>Batch 1:</span> Exp 30/11/2026</div><div><span style='color: #3B82F6; font-weight: bold;'>Batch 2:</span> Exp 15/12/2026</div></div>"
                    },
                    options: [
                      { id: "A", icon: "📦", text: "Batch 1 → Stok lama → Batch 2", correct: false, feedback: "Batch 1 (30/11) tidak boleh didahulukan dari stok lama (20/10) karena expiry stok lama lebih dekat. Stok lama harus paling depan, bukan di tengah." },
                      { id: "B", icon: "📦", text: "Batch 2 → Batch 1 → Stok lama", correct: false, feedback: "Ini urutan terbalik dari FEFO. Stok lama (20/10) punya expiry paling dekat — ia harus di posisi paling mudah dijangkau (paling depan), bukan di belakang." },
                      { id: "C", icon: "📦", text: "Stok lama → Batch 1 → Batch 2", correct: true, feedback: "Tepat! Urutan FEFO dari expiry paling dekat ke paling jauh: Stok lama (20/10) → Batch 1 (30/11) → Batch 2 (15/12). Stok lama harus di posisi paling mudah dijangkau, Batch 2 di posisi tersulit karena expiry-nya paling lama." }
                    ]
                  },

                  // SLIDE 9: MCQ / PILIH LANGKAH
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih tindakan FEFO yang tepat",
                      text: "Saat barista akan membuat kopi pagi ini (tanggal 01/04/2026), susu mana yang harus digunakan terlebih dahulu?",
                      labelColor: "#3B82F6",
                      htmlContext: "<div style='background: #FFFBEB; border: 1px solid #FDE68A; padding: 10px; border-radius: 8px; margin-bottom: 12px;'><table style='width: 100%; font-size: 12px; text-align: left;'><tr style='border-bottom: 1px solid #FCD34D;'><th style='padding: 4px;'>Kemasan</th><th style='padding: 4px;'>Exp</th><th style='padding: 4px;'>Status</th></tr><tr style='border-bottom: 1px dashed #FDE68A;'><td style='padding: 4px;'>Kemasan 1</td><td style='padding: 4px;'>10/04/2026</td><td style='padding: 4px; color: #D97706;'>Dibuka kemarin</td></tr><tr style='border-bottom: 1px dashed #FDE68A;'><td style='padding: 4px;'>Kemasan 2</td><td style='padding: 4px;'>15/04/2026</td><td style='padding: 4px;'>Belum dibuka</td></tr><tr><td style='padding: 4px;'>Kemasan 3</td><td style='padding: 4px; color: #DC2626; font-weight: bold;'>05/04/2026</td><td style='padding: 4px;'>Belum dibuka</td></tr></table></div>"
                    },
                    options: [
                      { id: "A", icon: "🥛", text: "Kemasan 3 — expiry paling dekat (05/04), walaupun belum dibuka", correct: true, feedback: "Tepat! FEFO tetap berlaku meskipun ada kemasan yang sudah dibuka. Kemasan 3 expired 05/04 (paling dekat) harus digunakan dulu. Kemasan 1 yang sudah dibuka memang perlu cepat habis, tapi expiry-nya masih 10/04 — masih lebih panjang dari kemasan 3. Prioritas tetap pada expiry terdekat." },
                      { id: "B", icon: "🥛", text: "Kemasan 2 — masih segel, kualitas terjamin (expiry 15/04)", correct: false, feedback: "Kemasan 2 expiry 15/04 adalah yang paling lama di antara ketiganya. Menggunakannya sekarang akan meninggalkan kemasan 3 (05/04) yang hampir kadaluwarsa. Itu melanggar FEFO." },
                      { id: "C", icon: "🥛", text: "Kemasan 1 — sudah dibuka, harus segera habis sebelum rusak", correct: false, feedback: "Kemasan 1 sudah dibuka, tapi expiry-nya 10/04. Kemasan 3 expired 05/04 lebih dekat dan belum dibuka — jika tidak segera digunakan, akan kadaluwarsa lebih dulu. FEFO tetap mengutamakan expiry terdekat, bukan status terbuka/tertutupnya." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 5-N01 Selesai!",
                      insight: "Anda sekarang bisa menerapkan FEFO dengan benar — mengurutkan, merotasi, dan memprioritaskan stok berdasarkan expiry date.",
                      icon: "⏳",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        "FEFO = First Expired First Out — prioritas pada expiry terdekat, bukan waktu masuk",
                        "Setiap menerima stok baru, bandingkan expiry dengan stok lama, tempatkan yang paling cepat expired di depan",
                        "Rotasi rak berkala: pindahkan produk dengan expiry dekat ke posisi paling mudah dijangkau",
                        "FEFO berbeda dari FIFO — jangan tertukar, terutama untuk produk dengan masa simpan pendek"
                      ],
                      next: "Selesai",
                      colorMode: "blue"
                    }
                  }
                ]
              },
              {
                id:       "menangani-produk-mendekati-expiry",
                title:    "Menangani produk yang mendekati atau melewati Expiry Date",
                duration: "20 menit",
                icon:     "🗑️",
                slides: [

                  // SLIDE 1: MATCH LINES
                  {
                    type: "match_lines",
                    xp: 20,
                    scenario: {
                      icon: "1",
                      label: "Hubungkan produk dengan tindakan yang tepat",
                      text: "Tarik garis dari setiap produk ke tindakan yang paling sesuai berdasarkan sisa waktu menuju expiry date-nya (hari ini = 1 April 2026)."
                    },
                    instruction: "Klik pada produk, lalu klik pada tindakan. Ulangi untuk semua produk.",
                    items: [
                      { id: "p1", icon: "🥛", label: "Susu segar",    subLabel: "Exp: 5 Apr 2026 — sisa 4 hari",    pairId: "t3" },
                      { id: "p2", icon: "🥫", label: "Kacang kaleng", subLabel: "Exp: 1 Okt 2026 — sisa ~6 bulan",  pairId: "t1" },
                      { id: "p3", icon: "🧃", label: "Jus buah",      subLabel: "Exp: 15 Apr 2026 — sisa 14 hari",  pairId: "t2" },
                      { id: "p4", icon: "🥩", label: "Daging sapi",   subLabel: "Exp: 28 Mar 2026 — sudah lewat!",  pairId: "t4" }
                    ],
                    targets: [
                      { id: "t1", icon: "🛒", label: "Simpan di rak biasa",      subLabel: "Expiry >30 hari" },
                      { id: "t2", icon: "🔔", label: "Pindah ke area prioritas", subLabel: "Expiry 7-30 hari" },
                      { id: "t3", icon: "🏷️", label: "Beri diskon / bundling",  subLabel: "Expiry <7 hari (masih aman)" },
                      { id: "t4", icon: "🗑️", label: "Musnahkan / buang",       subLabel: "Produk sudah lewat expiry" }
                    ],
                    feedbackCorrect: "Sempurna! Produk dengan sisa >30 hari simpan normal. Sisa 7-30 hari prioritas. Sisa <7 hari diskon atau bundling. Produk sudah lewat expiry wajib dimusnahkan.",
                    feedbackWrong: "Ada yang belum tepat. Jus buah sisa 14 hari harus masuk area prioritas, bukan diskon. Produk lewat expiry harus dimusnahkan, bukan dijual."
                  },

                  // SLIDE 2: MATCH LINES
                  {
                    type: "match_lines",
                    xp: 20,
                    scenario: {
                      icon: "2",
                      label: "Hubungkan produk dengan tindakan yang tepat",
                      text: "Hari ini = 10 Juni 2026. Hubungkan setiap produk ke tindakan yang benar."
                    },
                    instruction: "Klik pada produk, lalu klik pada tindakan. Ulangi untuk semua produk.",
                    items: [
                      { id: "p1", icon: "🍪", label: "Biskuit cokelat",      subLabel: "Exp: 15 Jun 2026 — sisa 5 hari",    pairId: "t3" },
                      { id: "p2", icon: "🥛", label: "Yogurt drink",         subLabel: "Exp: 20 Jun 2026 — sisa 10 hari",   pairId: "t2" },
                      { id: "p3", icon: "🥜", label: "Kacang tanah sangrai", subLabel: "Exp: 10 Des 2026 — sisa ~6 bulan",  pairId: "t1" },
                      { id: "p4", icon: "🧀", label: "Keju parut",           subLabel: "Exp: 5 Jun 2026 — sudah lewat!",   pairId: "t4" }
                    ],
                    targets: [
                      { id: "t1", icon: "🛒", label: "Simpan di rak biasa",      subLabel: "Expiry >30 hari" },
                      { id: "t2", icon: "🔔", label: "Pindah ke area prioritas", subLabel: "Expiry 7-30 hari" },
                      { id: "t3", icon: "🏷️", label: "Beri diskon / bundling",  subLabel: "Expiry <7 hari (masih aman)" },
                      { id: "t4", icon: "🗑️", label: "Musnahkan / buang",       subLabel: "Produk sudah lewat expiry" }
                    ],
                    feedbackCorrect: "Tepat! Biskuit sisa 5 hari diskon. Yogurt sisa 10 hari prioritas. Kacang masih lama simpan biasa. Keju sudah lewat musnahkan.",
                    feedbackWrong: "Periksa lagi. Yogurt sisa 10 hari belum perlu diskon, cukup pindah ke area prioritas. Keju yang sudah lewat tidak boleh dijual meskipun terlihat baik."
                  },

                  // SLIDE 3: MATCH LINES
                  {
                    type: "match_lines",
                    xp: 20,
                    scenario: {
                      icon: "3",
                      label: "Hubungkan produk dengan tindakan yang tepat",
                      text: "Hari ini = 20 Maret 2026. Beberapa produk sudah lewat, beberapa mendekati."
                    },
                    instruction: "Klik pada produk, lalu klik pada tindakan. Ulangi untuk semua produk.",
                    items: [
                      { id: "p1", icon: "🥫", label: "Sarden kaleng", subLabel: "Exp: 1 Apr 2026 — sisa 12 hari",   pairId: "t2" },
                      { id: "p2", icon: "🥛", label: "Susu UHT",      subLabel: "Exp: 25 Mar 2026 — sisa 5 hari",  pairId: "t3" },
                      { id: "p3", icon: "🍚", label: "Beras kemasan", subLabel: "Exp: 15 Mar 2026 — sudah lewat!", pairId: "t4" },
                      { id: "p4", icon: "🍯", label: "Madu",          subLabel: "Exp: 1 Jan 2027 — sisa ~9 bulan", pairId: "t1" }
                    ],
                    targets: [
                      { id: "t1", icon: "🛒", label: "Simpan di rak biasa",      subLabel: "Expiry >30 hari" },
                      { id: "t2", icon: "🔔", label: "Pindah ke area prioritas", subLabel: "Expiry 7-30 hari" },
                      { id: "t3", icon: "🏷️", label: "Beri diskon / bundling",  subLabel: "Expiry <7 hari (masih aman)" },
                      { id: "t4", icon: "🗑️", label: "Musnahkan / buang",       subLabel: "Produk sudah lewat expiry" }
                    ],
                    feedbackCorrect: "Sempurna! Perhatikan bahwa beras yang sudah lewat expiry (15 Maret) tetap harus dimusnahkan. Secara regulasi produk pangan kemasan yang lewat expiry tidak boleh diedarkan. Madu aman disimpan biasa.",
                    feedbackWrong: "Beras yang sudah lewat expiry tidak bisa disimpan atau dijual meskipun terlihat baik. Wajib musnahkan. Sarden sisa 12 hari masuk prioritas, belum perlu diskon."
                  },

                  // SLIDE 4: MATCH LINES
                  {
                    type: "match_lines",
                    xp: 20,
                    scenario: {
                      icon: "4",
                      label: "Hubungkan produk dengan tindakan yang tepat",
                      text: "Hari ini = 5 Mei 2026. Perhatikan batas tepat 7 hari dan 31 hari."
                    },
                    instruction: "Klik pada produk, lalu klik pada tindakan. Ulangi untuk semua produk.",
                    items: [
                      { id: "p1", icon: "🧃", label: "Jus jeruk",         subLabel: "Exp: 12 Mei 2026 — sisa 7 hari",  pairId: "t2" },
                      { id: "p2", icon: "🥛", label: "Susu pasteurisasi", subLabel: "Exp: 8 Mei 2026 — sisa 3 hari",   pairId: "t3" },
                      { id: "p3", icon: "🥫", label: "Kornet sapi",       subLabel: "Exp: 12 Mei 2026 — sisa 7 hari",  pairId: "t2" },
                      { id: "p4", icon: "🥜", label: "Selai kacang",      subLabel: "Exp: 5 Jun 2026 — sisa 31 hari",  pairId: "t1" }
                    ],
                    targets: [
                      { id: "t1", icon: "🛒", label: "Simpan di rak biasa",      subLabel: "Expiry >30 hari" },
                      { id: "t2", icon: "🔔", label: "Pindah ke area prioritas", subLabel: "Expiry 7-30 hari" },
                      { id: "t3", icon: "🏷️", label: "Beri diskon / bundling",  subLabel: "Expiry <7 hari (masih aman)" },
                      { id: "t4", icon: "🗑️", label: "Musnahkan / buang",       subLabel: "Produk sudah lewat expiry" }
                    ],
                    feedbackCorrect: "Tepat! >30 hari simpan biasa, 7-30 hari prioritas, <7 hari diskon, lewat expiry musnahkan. Jus dan kornet sisa 7 hari masuk prioritas (bukan diskon). Susu 3 hari diskon. Selai 31 hari simpan biasa.",
                    feedbackWrong: "Perhatikan batas 7 hari. Jus dan kornet sisa 7 hari masih masuk kategori prioritas, bukan diskon. Diskon untuk yang <7 hari seperti susu. Selai 31 hari aman simpan biasa."
                  },

                  // SLIDE 5: ACCORDION MATERI
                  {
                    type: "accordion_materi",
                    xp: 0,
                    scenario: {
                      icon: "📖",
                      labelColor: "#3B82F6",
                      label: "Materi Inti",
                      text: "Prosedur Penanganan Produk Berdasarkan Sisa Expiry"
                    },
                    panels: [
                      {
                        id: "pnl-exp-1",
                        numBox: { bg: "#FEF08A", color: "#A16207" },
                        title: "Empat zona kritis sisa expiry",
                        color: "#CA8A04",
                        content: "<div style='color:#CBD5E1;line-height:1.6;font-size:14px;'><p style='margin-bottom:12px;'>Tindakan yang tepat ditentukan oleh berapa hari lagi menuju tanggal expiry. Berikut zona standar yang digunakan di industri ritel dan gudang:</p><table style='width:100%;font-size:12px;border-collapse:collapse;margin-bottom:14px;background:#1E293B;border-radius:8px;overflow:hidden;'><tr style='background:#334155;'><th style='padding:8px;text-align:left;color:#93C5FD;'>Zona</th><th style='padding:8px;text-align:left;color:#93C5FD;'>Sisa hari</th><th style='padding:8px;text-align:left;color:#93C5FD;'>Tindakan</th><th style='padding:8px;text-align:left;color:#93C5FD;'>Contoh</th></tr><tr><td style='padding:8px;border-bottom:1px solid #334155;'>🟢 Hijau</td><td style='padding:8px;border-bottom:1px solid #334155;'>&gt;30 hari</td><td style='padding:8px;border-bottom:1px solid #334155;'>Simpan di rak biasa, rotasi FEFO normal</td><td style='padding:8px;border-bottom:1px solid #334155;'>Kacang kaleng, biskuit, madu</td></tr><tr><td style='padding:8px;border-bottom:1px solid #334155;'>🟡 Kuning</td><td style='padding:8px;border-bottom:1px solid #334155;'>7-30 hari</td><td style='padding:8px;border-bottom:1px solid #334155;'>Pindah ke area prioritas / segera dijual</td><td style='padding:8px;border-bottom:1px solid #334155;'>Jus buah, sarden, keju parut</td></tr><tr><td style='padding:8px;border-bottom:1px solid #334155;'>🔴 Merah</td><td style='padding:8px;border-bottom:1px solid #334155;'>&lt;7 hari (masih aman)</td><td style='padding:8px;border-bottom:1px solid #334155;'>Beri diskon, bundling, atau pindah ke rak depan</td><td style='padding:8px;border-bottom:1px solid #334155;'>Susu segar, daging segar, yogurt</td></tr><tr><td style='padding:8px;'>⚫ Hitam</td><td style='padding:8px;'>Sudah lewat</td><td style='padding:8px;'>Musnahkan (tidak boleh dijual, didonasikan, atau digunakan)</td><td style='padding:8px;'>Produk lewat expiry apapun</td></tr></table><div style='background:#F8FAFC;border-left:4px solid #F59E0B;padding:12px;border-radius:4px;color:#1E293B;font-weight:500;font-size:12px;'>📌 <strong>Prinsip:</strong> Semakin dekat expiry, semakin agresif tindakan penjualan. Tapi setelah lewat, satu-satunya pilihan adalah pemusnahan sesuai prosedur.</div></div>"
                      },
                      {
                        id: "pnl-exp-2",
                        numBox: { bg: "#DBEAFE", color: "#1D4ED8" },
                        title: "Kesalahan umum yang merugikan",
                        color: "#2563EB",
                        content: "<div style='color:#CBD5E1;line-height:1.6;font-size:14px;'><p style='margin-bottom:12px;'>Tiga kesalahan fatal dalam menangani produk mendekati expiry:</p><div style='display:flex;flex-direction:column;gap:8px;'><div style='background:#1E293B;padding:10px;border-radius:8px;'><div style='color:#F87171;font-weight:700;font-size:13px;margin-bottom:4px;'>1. Menunggu sampai lewat expiry untuk diskon</div><div style='font-size:12px;'>Produk yang sudah lewat tidak boleh dijual. Diskon hanya efektif pada zona merah (&lt;7 hari).</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;'><div style='color:#F87171;font-weight:700;font-size:13px;margin-bottom:4px;'>2. Memindahkan produk lewat expiry ke rak diskon</div><div style='font-size:12px;'>Ini ilegal dan berbahaya. Produk lewat expiry tidak boleh diedarkan dalam bentuk apapun.</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;'><div style='color:#FCD34D;font-weight:700;font-size:13px;margin-bottom:4px;'>3. Mencampur produk prioritas dengan produk biasa</div><div style='font-size:12px;'>Produk zona kuning dan merah harus mudah diidentifikasi (label warna, rak khusus, atau stiker). Jika tercampur, karyawan dan pelanggan akan mengambil yang expiry-nya lebih lama.</div></div></div><div style='background:#FEF2F2;border-left:4px solid #DC2626;padding:12px;border-radius:4px;color:#7F1D1D;font-weight:500;font-size:12px;margin-top:12px;'>⚠️ <strong>Donasi:</strong> Beberapa negara mengizinkan donasi produk yang masih aman meskipun mendekati expiry, asalkan belum lewat. Tapi produk yang sudah lewat expiry tidak boleh didonasikan karena risiko hukum dan kesehatan.</div></div>"
                      },
                      {
                        id: "pnl-exp-3",
                        numBox: { bg: "#BBF7D0", color: "#15803D" },
                        title: "Prosedur pemusnahan produk kedaluwarsa",
                        color: "#16A34A",
                        content: "<div style='color:#CBD5E1;line-height:1.6;font-size:14px;'><p style='margin-bottom:12px;'>Saat produk sudah melewati expiry date, ikuti langkah berikut:</p><div style='display:flex;flex-direction:column;gap:6px;margin-bottom:12px;'><div style='background:#1E293B;padding:10px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;'><span style='color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;'>1</span><div style='font-size:12px;'><strong>Pisahkan dari stok yang masih baik.</strong> Beri tanda Kedaluwarsa - Tidak untuk dijual.</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;'><span style='color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;'>2</span><div style='font-size:12px;'><strong>Catat dalam log pemusnahan:</strong> nama produk, jumlah, tanggal expiry, alasan.</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;'><span style='color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;'>3</span><div style='font-size:12px;'><strong>Rusak kemasan</strong> (buka, tuang, atau sobek) agar tidak dipungut oleh pihak tidak bertanggung jawab.</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;'><span style='color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;'>4</span><div style='font-size:12px;'><strong>Buang sesuai kategori sampah</strong> (organik, anorganik, B3 jika ada).</div></div><div style='background:#1E293B;padding:10px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;'><span style='color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;'>5</span><div style='font-size:12px;'><strong>Dokumentasikan</strong> jika diperlukan untuk audit.</div></div></div><div style='background:#F8FAFC;border-left:4px solid #3B82F6;padding:12px;border-radius:4px;color:#1E293B;font-weight:500;font-size:12px;'>📋 <strong>Untuk audit:</strong> Sertifikasi ISO 9001 dan sistem keamanan pangan (HACCP, FSSC 22000) mensyaratkan bukti pemusnahan produk kedaluwarsa. Simpan foto atau tanda tangan saksi.</div></div>"
                      }
                    ]
                  },

                  // SLIDE 6: MCQ — jawaban BENAR di A
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "5",
                      label: "Pilih tindakan yang tepat",
                      labelColor: "#3B82F6",
                      text: "Karyawan supermarket menemukan 10 bungkus daging ayam segar dengan expiry date besok (sisa 1 hari). Semua masih dalam kondisi baik. Apa yang paling tepat dilakukan?",
                      htmlContext: "<div style='background:#FEF2F2;border:1px solid #FECACA;padding:12px;border-radius:10px;margin-bottom:12px;text-align:center;'><div style='font-size:28px;margin-bottom:6px;'>🍗</div><div style='font-weight:bold;margin-bottom:4px;'>Daging Ayam Segar x10 bungkus</div><div style='background:#DC2626;color:white;display:inline-block;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:bold;'>Expiry: Besok (sisa 1 hari)</div><div style='font-size:12px;color:#475569;margin-top:6px;'>Kondisi: normal, segar, kemasan utuh</div></div>"
                    },
                    options: [
                      { id: "A", icon: "🏷️", text: "Beri diskon 50% dan pindahkan ke rak depan", correct: true,  feedback: "Tepat! Produk dengan sisa <7 hari masih aman dan bisa dijual dengan diskon agresif. Ini cara terbaik mengurangi kerugian sekaligus memberi manfaat ke pelanggan. Membuangnya sekarang adalah pemborosan." },
                      { id: "B", icon: "🔄", text: "Kembalikan ke gudang untuk disimpan lebih aman", correct: false, feedback: "Menyimpannya kembali di gudang tidak menyelesaikan masalah. Produk tetap akan expired besok, dan justru terlewat dari kesempatan dijual." },
                      { id: "C", icon: "🗑️", text: "Langsung buang karena besok expired", correct: false, feedback: "Produk yang masih aman (belum lewat expiry) tidak perlu dibuang. Diskon adalah tindakan yang benar untuk mendorong penjualan cepat." }
                    ]
                  },

                  // SLIDE 7: MCQ — jawaban BENAR di B
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "6",
                      label: "Pilih tindakan yang tepat",
                      labelColor: "#3B82F6",
                      text: "Di gudang pendingin, ada 50 kemasan susu pasteurisasi yang sudah lewat expiry 2 hari. Manajer meminta karyawan memberi stempel tanggal baru agar bisa dijual. Apa yang harus dilakukan karyawan?",
                      htmlContext: "<div style='background:#FEF3C7;border:1px solid #FDE68A;padding:12px;border-radius:10px;margin-bottom:12px;'><div style='display:flex;align-items:center;gap:10px;margin-bottom:8px;'><span style='font-size:28px;'>🥛</span><div><div style='font-weight:bold;'>Susu Pasteurisasi x50</div><div style='font-size:12px;color:#DC2626;font-weight:bold;'>Sudah lewat expiry 2 hari</div></div></div><div style='background:white;padding:8px 12px;border-radius:6px;border:1px solid #E2E8F0;font-size:12px;'>Perintah manajer: Beri stempel tanggal baru agar masih bisa dijual</div></div>"
                    },
                    options: [
                      { id: "A", icon: "📝", text: "Mengikuti perintah manajer — dia yang bertanggung jawab", correct: false, feedback: "Mengikuti perintah manajer untuk memalsu expiry adalah tindakan ilegal. Karyawan bisa ikut bertanggung jawab secara hukum." },
                      { id: "B", icon: "🚫", text: "Menolak dan melaporkan ke atasan yang lebih tinggi atau bagian kepatuhan", correct: true,  feedback: "Tepat! Memalsu expiry date adalah pelanggaran hukum (UU Pangan, UU Perlindungan Konsumen). Karyawan wajib menolak perintah ilegal dan melaporkan ke manajemen yang lebih tinggi." },
                      { id: "C", icon: "🗑️", text: "Diam-diam membuang semua susu tanpa memberi tahu siapa pun", correct: false, feedback: "Membuang diam-diam tanpa melaporkan tidak menyelesaikan akar masalah. Manajer yang memberi perintah ilegal masih bisa mengulanginya." }
                    ]
                  },

                  // SLIDE 8: MCQ — jawaban BENAR di A
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "7",
                      label: "Pilih tindakan yang tepat",
                      labelColor: "#3B82F6",
                      text: "Toko roti memiliki 20 bungkus roti tawar dengan expiry hari ini. Roti masih segar (tidak berjamur). Apa yang sebaiknya dilakukan?",
                      htmlContext: "<div style='background:#FFFBEB;border:1px solid #FDE68A;padding:12px;border-radius:10px;margin-bottom:12px;text-align:center;'><div style='font-size:28px;margin-bottom:6px;'>🍞</div><div style='font-weight:bold;margin-bottom:4px;'>Roti Tawar x20 bungkus</div><div style='background:#F59E0B;color:white;display:inline-block;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:bold;'>Expiry: Hari ini</div><div style='font-size:12px;color:#475569;margin-top:6px;'>Kondisi: masih segar, tidak berjamur</div></div>"
                    },
                    options: [
                      { id: "A", icon: "🏷️", text: "Jual dengan diskon besar, beri tahu pembeli bahwa expired hari ini", correct: true,  feedback: "Tepat! Produk yang expired hari ini masih boleh dijual hingga akhir hari. Diskon dan transparansi kepada pembeli adalah praktik yang baik. Membuangnya sekarang adalah pemborosan." },
                      { id: "B", icon: "🔄", text: "Simpan untuk besok, masih bisa dijual tanpa diskon", correct: false, feedback: "Menyimpan untuk besok setelah expiry date lewat adalah ilegal. Roti tidak boleh dijual besok. Harus habis hari ini atau dibuang." },
                      { id: "C", icon: "🗑️", text: "Buang semua sekarang karena expired hari ini", correct: false, feedback: "Produk yang expired hari ini masih aman dikonsumsi pada hari itu juga. Membuangnya sebelum toko tutup adalah kerugian yang tidak perlu." }
                    ]
                  },

                  // SLIDE 9: MCQ — jawaban BENAR di A
                  {
                    type: "mcq",
                    xp: 20,
                    scenario: {
                      icon: "8",
                      label: "Pilih tindakan yang tepat",
                      labelColor: "#3B82F6",
                      text: "Rumah sakit memiliki 200 botol suplemen nutrisi cair untuk pasien dengan expiry minggu depan. Konsumsi rata-rata 50 botol per minggu. Apa tindakan terbaik?",
                      htmlContext: "<div style='background:#F0F9FF;border:1px solid #BAE6FD;padding:12px;border-radius:10px;margin-bottom:12px;'><div style='font-size:24px;text-align:center;margin-bottom:8px;'>💊</div><div style='display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;'><div style='background:white;padding:8px;border-radius:6px;text-align:center;'><div style='font-weight:bold;'>200 botol</div><div style='color:#64748B;'>Stok tersedia</div></div><div style='background:white;padding:8px;border-radius:6px;text-align:center;'><div style='font-weight:bold;color:#DC2626;'>1 minggu lagi</div><div style='color:#64748B;'>Expiry date</div></div><div style='background:white;padding:8px;border-radius:6px;text-align:center;'><div style='font-weight:bold;'>50/minggu</div><div style='color:#64748B;'>Kebutuhan</div></div><div style='background:#FEF2F2;padding:8px;border-radius:6px;text-align:center;'><div style='font-weight:bold;color:#DC2626;'>150 botol</div><div style='color:#64748B;'>Sisa tak terpakai</div></div></div></div>"
                    },
                    options: [
                      { id: "A", icon: "📦", text: "Gunakan stok ini lebih dulu (FEFO) lalu hubungi pemasok untuk retur atau tukar batch baru", correct: true,  feedback: "Tepat! Rumah sakit harus menerapkan FEFO. Sisa 150 botol tidak akan habis sebelum expiry. Hubungi pemasok untuk retur atau tukar batch baru. Membuang adalah pemborosan, mengabaikan expiry berbahaya bagi pasien." },
                      { id: "B", icon: "🗑️", text: "Buang 150 botol karena tidak mungkin habis sebelum expiry", correct: false, feedback: "Membuang 150 botol tanpa mencoba retur adalah pemborosan. Pemasok biasanya bersedia menukar produk mendekati expiry dengan batch baru." },
                      { id: "C", icon: "📅", text: "Abaikan expiry, tetap simpan dan gunakan — suplemen cair masih aman", correct: false, feedback: "Mengabaikan expiry date untuk produk kesehatan pasien sangat berbahaya dan melanggar standar medis. Suplemen yang lewat expiry bisa berubah komposisinya." }
                    ]
                  },

                  // SLIDE 10: SCORE SCREEN
                  {
                    type: "score_screen",
                    xp: 0,
                    feedback: {
                      title: "Unit 5-N02 Selesai!",
                      insight: "Anda sekarang tahu cara menangani produk berdasarkan sisa expiry — dari prioritas, diskon, hingga pemusnahan, serta bagaimana merespon perintah ilegal.",
                      icon: "🗑️",
                      maxScore: 160,
                      totalCount: 8,
                      takeaways: [
                        ">30 hari simpan biasa; 7-30 hari prioritas; <7 hari diskon; lewat expiry musnahkan",
                        "Produk expired hari ini masih boleh dijual hingga akhir hari (dengan transparansi)",
                        "Memalsu expiry date adalah ilegal — wajib menolak dan melaporkan",
                        "Untuk stok besar yang mendekati expiry, retur ke pemasok lebih baik dari membuang"
                      ],
                      next: "Selesai",
                      colorMode: "blue"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // ─── Modul: FIFO di Industri Pangan ─────────────────────────
  fifoPanganCategory,


  // ───────────────────────────────────────────────────────────
  ];


// ─── Helper ───────────────────────────────────────────────────────
export const allTopics = categories.flatMap(cat => cat.topics);
