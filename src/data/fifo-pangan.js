// ─── Modul: FIFO di Industri Pangan ──────────────────────────────

export const fifoPanganCategory = {
  id: "fifo-pangan",
  title: "FIFO di Industri Pangan",
  subtitle: "Kuasai sistem pengelolaan stok pangan yang aman & tepat",
  icon: "📦",
  color: "#F97316",
  topics: [
    {
      id: "fifo-pangan-topic",
      title: "FIFO di Industri Pangan",
      subtitle: "Pengelolaan stok berbasis FIFO & FEFO",
      icon: "📦",
      color: "#F97316",
      description: "Memahami dan menerapkan FIFO & FEFO dalam pengelolaan bahan baku dan produk jadi di industri pangan.",
      lessons: [
        {
          id: "konsep-dasar-fifo-fefo",
          title: "Konsep Dasar FIFO & FEFO",
          icon: "📦",
          color: "#F97316",
          subLessons: [
            {
              id: "mendefinisikan-fifo-vs-fefo",
              title: "Mendefinisikan FIFO vs FEFO",
              icon: "📋",
              duration: "20 menit",
              slides: [

                // ── SLIDE 1: TAP CLASSIFY — Prinsip FIFO vs FEFO ─────────
                {
                  type: "tap_classify",
                  xp: 20,
                  scenario: {
                    icon: "1",
                    label: "Tap kartu, lalu tap zona tujuannya",
                    labelColor: "#F97316",
                    text: "Klasifikasikan: Manakah yang merupakan patokan atau prinsip dari FIFO dan mana yang FEFO?",
                    htmlContext: `<div style="background:#FFF7ED;border:1px solid #FED7AA;padding:10px 14px;border-radius:8px;font-size:13px;color:#9A3412;">Aturan pengeluaran barang sangat bergantung pada jenis data yang kita jadikan acuan utama.</div>`
                  },
                  instruction: "Tap kartu, lalu tap zona tujuannya.",
                  zones: [
                    { id: "fifo", label: "📦 Sistem FIFO (First-In)", subLabel: "Patokan: Waktu kedatangan" },
                    { id: "fefo", label: "⏳ Sistem FEFO (First-Expired)", subLabel: "Patokan: Batas kedaluwarsa" }
                  ],
                  cards: [
                    { id: "c1", icon: "🚚", text: "Patokan utama adalah Tanggal Terima Gudang (Receiving Date)", targetZone: "fifo" },
                    { id: "c2", icon: "⚠️", text: "Patokan utama adalah Tanggal Kedaluwarsa (Expiry Date / ED)", targetZone: "fefo" },
                    { id: "c3", icon: "🗓️", text: "Barang yang datang bulan Januari dikeluarkan lebih dulu dari barang bulan Februari", targetZone: "fifo" },
                    { id: "c4", icon: "📅", text: "Barang yang Expired bulan Maret dikeluarkan lebih dulu dari yang Expired bulan Mei", targetZone: "fefo" },
                    { id: "c5", icon: "📦", text: "\"Yang Masuk Duluan, Keluar Duluan\"", targetZone: "fifo" },
                    { id: "c6", icon: "⏳", text: "\"Yang Kedaluwarsa Duluan, Keluar Duluan\"", targetZone: "fefo" }
                  ],
                  feedbackCorrect: "Tepat sekali! FIFO (First-In, First-Out) murni melihat kapan barang masuk ke gudang. Sedangkan FEFO (First-Expired, First-Out) melihat kapan barang tersebut akan rusak/basi, terlepas dari kapan barang itu masuk gudang.",
                  feedbackWrong: "Ada yang tertukar. Ingat kepanjangannya: FIFO fokus pada kata 'IN' (kapan barang masuk/diterima). FEFO fokus pada kata 'EXPIRED' (kapan barang kedaluwarsa)."
                },

                // ── SLIDE 2: TAP CLASSIFY — Barang mana wajib FEFO/FIFO ──
                {
                  type: "tap_classify",
                  xp: 20,
                  scenario: {
                    icon: "2",
                    label: "Tap kartu, lalu tap zona tujuannya",
                    labelColor: "#F97316",
                    text: "Klasifikasikan: Untuk barang-barang berikut di pabrik pangan, sistem mana yang paling WAJIB digunakan?"
                  },
                  instruction: "Tap kartu, lalu tap zona tujuannya.",
                  zones: [
                    { id: "fifo", label: "📦 Sistem FIFO (First-In)", subLabel: "Patokan: Waktu kedatangan" },
                    { id: "fefo", label: "⏳ Sistem FEFO (First-Expired)", subLabel: "Patokan: Batas kedaluwarsa" }
                  ],
                  cards: [
                    { id: "c1", icon: "🥛", text: "Susu Segar (Fresh Milk) yang cepat basi", targetZone: "fefo" },
                    { id: "c2", icon: "🧻", text: "Karton Boks (Kardus kemasan luar) tanpa expired date", targetZone: "fifo" },
                    { id: "c3", icon: "🥩", text: "Daging Sapi Beku dengan shelf-life ketat", targetZone: "fefo" },
                    { id: "c4", icon: "🔧", text: "Suku cadang mesin (sparepart) conveyor", targetZone: "fifo" },
                    { id: "c5", icon: "🧪", text: "Ragi / Yeast aktif untuk pembuatan roti", targetZone: "fefo" },
                    { id: "c6", icon: "🏷️", text: "Label stiker kemasan", targetZone: "fifo" }
                  ],
                  feedbackCorrect: "Sempurna! Barang yang mudah rusak (perishable) atau memiliki shelf-life kritis WAJIB menggunakan FEFO untuk keamanan pangan. Sedangkan barang kemas (karton, stiker) atau sparepart yang tidak punya masa kedaluwarsa cukup dikontrol dengan FIFO agar tidak berdebu/lapuk karena disimpan terlalu lama.",
                  feedbackWrong: "Perhatikan jenis barangnya. Jika barang itu bisa basi/rusak (seperti susu, daging, ragi), kita wajib memprioritaskan FEFO. Jika barang itu tidak bisa basi (seperti kardus, sparepart), kita gunakan FIFO."
                },

                // ── SLIDE 3: TAP CLASSIFY — Skenario FIFO atau FEFO ─────
                {
                  type: "tap_classify",
                  xp: 20,
                  scenario: {
                    icon: "3",
                    label: "Tap kartu, lalu tap zona tujuannya",
                    labelColor: "#F97316",
                    text: "Klasifikasikan: Skenario ini menggambarkan praktik FIFO atau FEFO?"
                  },
                  instruction: "Tap kartu, lalu tap zona tujuannya.",
                  zones: [
                    { id: "fifo", label: "📦 Sistem FIFO (First-In)", subLabel: "Patokan: Waktu kedatangan" },
                    { id: "fefo", label: "⏳ Sistem FEFO (First-Expired)", subLabel: "Patokan: Batas kedaluwarsa" }
                  ],
                  cards: [
                    { id: "c1", icon: "📋", text: "Mengambil tepung terigu Batch A (Exp: Okt) padahal baru datang hari ini, membiarkan Batch B (Exp: Des) yang datang kemarin", targetZone: "fefo" },
                    { id: "c2", icon: "🚛", text: "Memakai botol kaca dari kiriman Supplier X (tiba Senin), menunda botol dari Supplier Y (tiba Rabu)", targetZone: "fifo" },
                    { id: "c3", icon: "🔍", text: "Operator melihat label bertuliskan 'Use By: 10 Nov' dan langsung memprioritaskannya", targetZone: "fefo" },
                    { id: "c4", icon: "📝", text: "Operator melihat dokumen Good Receipt Note bertanggal 1 Juli dan mengeluarkannya lebih dulu", targetZone: "fifo" },
                    { id: "c5", icon: "🔄", text: "Mengeluarkan sisa perisa vanila return produksi kemarin yang expired-nya tinggal 1 bulan lagi", targetZone: "fefo" },
                    { id: "c6", icon: "🏭", text: "Merakit mesin menggunakan baut yang sudah dibeli dari tahun lalu", targetZone: "fifo" }
                  ],
                  feedbackCorrect: "Tepat! Pada Kartu 1, operator mengambil barang yang baru datang karena ED-nya lebih dekat — ini adalah esensi FEFO (FEFO mengalahkan FIFO). Jika operator hanya melihat dokumen kedatangan atau kiriman Senin vs Rabu tanpa melihat ED, itu adalah murni FIFO.",
                  feedbackWrong: "Masih ada yang keliru. Jika keputusan pengambilan barang didasarkan pada tanggal ED/Use By/Best Before, itu adalah FEFO. Jika didasarkan pada tanggal kedatangan/pembelian, itu FIFO."
                },

                // ── SLIDE 4: ACCORDION MATERI ────────────────────────────
                {
                  type: "accordion_materi",
                  xp: 0,
                  scenario: {
                    icon: "📖",
                    labelColor: "#F59E0B",
                    label: "MATERI INTI",
                    text: "Di Industri Pangan, FEFO adalah Panglima",
                    style: { background: "#7C2D12", color: "white", borderRadius: "16px" }
                  },
                  panels: [
                    {
                      id: "pnl-fifo-1",
                      numBox: { bg: "#FED7AA", color: "#C2410C" },
                      title: "Apa Perbedaannya?",
                      color: "#EA580C",
                      content: "<div style='color:#CBD5E1;line-height:1.7;font-size:14px;'><p style='margin-bottom:12px;'><strong style='color:#FED7AA;'>FIFO (First-In, First-Out):</strong> Barang yang pertama kali masuk gudang, harus pertama kali keluar. Sederhana, logis, dan memastikan stok tidak mengendap.</p><p><strong style='color:#FED7AA;'>FEFO (First-Expired, First-Out):</strong> Barang dengan tanggal kedaluwarsa paling dekat, harus pertama kali keluar. Tidak peduli apakah barang itu baru datang kemarin sore — jika umurnya paling pendek, ia harus segera diproses.</p></div>"
                    },
                    {
                      id: "pnl-fifo-2",
                      numBox: { bg: "#FEF08A", color: "#A16207" },
                      title: "Mengapa Industri Pangan Pakai FEFO?",
                      color: "#CA8A04",
                      content: "<div style='color:#CBD5E1;line-height:1.7;font-size:14px;'><p style='margin-bottom:10px;'>Di dunia nyata, FIFO murni berbahaya untuk produk perishable:</p><ul style='padding-left:16px;margin-bottom:12px;'><li style='margin-bottom:6px;'>Supplier bisa mengirim barang sisa stok (barang baru tiba, tapi umur simpannya pendek).</li><li style='margin-bottom:6px;'>Ada barang sisa dari produksi (return to store) yang harus segera dihabiskan.</li><li>Jika gudang memaksakan FIFO pada barang perishable, risiko barang expired di rak sangat tinggi — berujung pada pemusnahan barang (kerugian finansial) atau kebocoran ke pasar (skandal BPOM).</li></ul></div>"
                    },
                    {
                      id: "pnl-fifo-3",
                      numBox: { bg: "#BBF7D0", color: "#15803D" },
                      title: "Aturan Emas Pergudangan Pangan",
                      color: "#16A34A",
                      content: "<div style='color:#CBD5E1;line-height:1.7;font-size:14px;'><div style='margin-bottom:10px;'><strong style='color:#86EFAC;'>Bahan baku/ingredients & produk jadi</strong> ➡️ <strong style='color:#FCD34D;'>WAJIB FEFO.</strong> (Batas aman konsumsi adalah prioritas mutlak).</div><div style='margin-bottom:14px;'><strong style='color:#86EFAC;'>Bahan kemas & suku cadang</strong> ➡️ Gunakan FIFO. (Mencegah debu, kusam, atau penurunan kualitas material).</div><div style='background:#1E293B;padding:12px;border-radius:8px;border-left:4px solid #F97316;font-size:13px;'><span style='color:#FED7AA;font-weight:700;'>💡 FEFO Overrides FIFO.</span> <span style='color:#CBD5E1;'>Jika tanggal kedatangan berbeda dengan urutan kedaluwarsa, maka di industri pangan/farmasi, tanggal kedaluwarsa (FEFO) yang HARUS dimenangkan.</span></div></div>"
                    }
                  ]
                },

                // ── SLIDE 5: MCQ — Pilih Palet ──────────────────────────
                {
                  type: "mcq",
                  xp: 20,
                  scenario: {
                    icon: "5",
                    label: "Analisis Label Palet",
                    labelColor: "#F97316",
                    text: "Anda mendapat Perintah Kerja untuk mengambil 1 Palet Gula Pasir. Di depan Anda ada 3 palet. Palet mana yang harus Anda tarik pertama kali?",
                    htmlContext: `<div style="background:#F8FAFC;border:1px solid #E2E8F0;padding:12px;border-radius:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:12px;"><div style="background:#EFF6FF;padding:8px;border-radius:6px;"><div style="font-weight:700;color:#1D4ED8;margin-bottom:4px;">🟦 PALET A</div><div>Inbound: 10 Agu 2026</div><div style="color:#64748B;">Expiry: 05 Des 2026</div></div><div style="background:#F0FDF4;padding:8px;border-radius:6px;"><div style="font-weight:700;color:#15803D;margin-bottom:4px;">🟩 PALET B</div><div>Inbound: 12 Agu 2026</div><div style="color:#DC2626;font-weight:700;">Expiry: 01 Des 2026</div></div><div style="background:#F5F3FF;padding:8px;border-radius:6px;"><div style="font-weight:700;color:#7C3AED;margin-bottom:4px;">🟪 PALET C</div><div>Inbound: 08 Agu 2026</div><div style="color:#64748B;">Expiry: 15 Des 2026</div></div></div>`
                  },
                  options: [
                    { id: "A", icon: "🟩", text: "Palet B (Karena Expiry Date paling dekat: 01 Des 2026)", correct: true, feedback: "Luar biasa! Ini adalah jebakan klasik. Palet C memang datang paling awal (8 Agustus - FIFO), TETAPI Palet B memiliki Expired Date paling dekat (1 Desember). Karena Gula adalah bahan baku pangan, Anda wajib menerapkan FEFO. Palet B harus ditarik lebih dulu!" },
                    { id: "B", icon: "🟪", text: "Palet C (Karena datang paling awal: 08 Agu 2026)", correct: false, feedback: "Belum tepat. Anda menggunakan prinsip FIFO (menarik Palet C karena datang tanggal 8 Agustus). Ingat, untuk bahan baku pangan, kita WAJIB menggunakan FEFO. Cari palet dengan tanggal kedaluwarsa paling dekat." },
                    { id: "C", icon: "🟦", text: "Palet A (Karena berada di tengah-tengah)", correct: false, feedback: "Belum tepat. Tidak ada aturan mengambil palet dari nilai tengah. Gunakan prinsip FEFO untuk bahan baku pangan: cari palet dengan tanggal kedaluwarsa (Expiry Date) yang paling dekat dengan hari ini." }
                  ]
                },

                // ── SLIDE 6: MCQ — Penataan Stok Baru ───────────────────
                {
                  type: "mcq",
                  xp: 20,
                  scenario: {
                    icon: "6",
                    label: "Pilih Keputusan yang Tepat",
                    labelColor: "#F97316",
                    text: "Gudang menerima Susu Bubuk baru dengan Expiry: 20 Oktober 2026. Di rak masih ada stok lama Expiry: 15 November 2026. Bagaimana Anda menata palet yang baru datang ini?",
                    htmlContext: `<div style="background:#F8FAFC;border:1px solid #E2E8F0;padding:12px;border-radius:10px;font-size:13px;display:flex;flex-direction:column;gap:8px;"><div style="background:white;padding:8px;border-radius:6px;border-left:3px solid #94A3B8;"><strong>📦 Stok Lama di Rak:</strong> Exp Date = 15 Nov 2026</div><div style="background:#FEF2F2;padding:8px;border-radius:6px;border-left:3px solid #DC2626;"><strong>🚛 Barang Baru Turun Truk:</strong> Exp Date = 20 Okt 2026 ⚠️ (lebih dekat!)</div></div>`
                  },
                  options: [
                    { id: "A", icon: "🛑", text: "Taruh barang baru di rak paling depan agar terpakai lebih dulu (Terapkan FEFO).", correct: true, feedback: "Keputusan yang sangat tepat! Ini kasus di mana Supplier mengirim barang dengan shelf-life lebih pendek dari stok yang kita miliki. Sesuai FEFO, barang baru (Exp: 20 Okt) harus ditaruh di depan agar dipakai lebih dulu, mengalahkan stok lama (Exp: 15 Nov)." },
                    { id: "B", icon: "🔙", text: "Taruh barang baru di rak paling belakang karena ia baru saja datang (Terapkan FIFO).", correct: false, feedback: "Hati-hati! Jika Anda menaruhnya di belakang (FIFO), stok baru ini berisiko kedaluwarsa. Ingat, Expired barang baru adalah 20 Okt, sedangkan stok lama 15 Nov. Kita harus menggunakan FEFO." },
                    { id: "C", icon: "🤷", text: "Taruh bersebelahan saja, biarkan operator produksi yang memilih.", correct: false, feedback: "Salah! Menaruh barang tanpa urutan yang jelas akan merusak traceability dan pasti akan menyebabkan operator mengambil barang yang salah. Gudang wajib mengatur fisik barang sesuai kaidah FEFO." }
                  ]
                },

                // ── SLIDE 7: MCQ — Bahan Kemas Non-Expired ───────────────
                {
                  type: "mcq",
                  xp: 20,
                  scenario: {
                    icon: "7",
                    label: "Analisis Bahan Kemas",
                    labelColor: "#F97316",
                    text: "Departemen produksi meminta Botol Kaca Kosong (Bahan Kemas Primer — tidak memiliki masa kedaluwarsa). Palet mana yang Anda kirim ke produksi?",
                    htmlContext: `<div style="background:#F8FAFC;border:1px solid #E2E8F0;padding:12px;border-radius:10px;font-size:13px;display:flex;flex-direction:column;gap:8px;"><div style="font-weight:700;margin-bottom:2px;">🍾 Material: Botol Kaca 250ml (Tidak memiliki masa kedaluwarsa)</div><div style="background:#FEF2F2;padding:8px;border-radius:6px;">🟥 <strong>Palet Merah:</strong> GRN Date (Tanggal Terima) = 02 Februari 2026</div><div style="background:#FEFCE8;padding:8px;border-radius:6px;">🟨 <strong>Palet Kuning:</strong> GRN Date (Tanggal Terima) = 18 Februari 2026</div></div>`
                  },
                  options: [
                    { id: "A", icon: "🟥", text: "Palet Merah (Gunakan FIFO karena material ini tidak memiliki Expired Date).", correct: true, feedback: "Tepat! Untuk material non-pangan atau bahan kemas yang tidak memiliki masa kedaluwarsa, prinsip FEFO tidak bisa diterapkan. Oleh karena itu, kita kembali menggunakan standar dasar yaitu FIFO. Palet Merah datang lebih dulu (02 Feb), maka ia yang dikeluarkan." },
                    { id: "B", icon: "🟨", text: "Palet Kuning (Gunakan Last-In, First-Out agar barang baru langsung terpakai).", correct: false, feedback: "Belum tepat. Menggunakan LIFO (Last-In, First-Out) di gudang manufaktur sangat tidak disarankan karena akan membuat barang lama (Palet Merah) menjadi berdebu, lapuk, atau rusak karena tidak pernah tersentuh." },
                    { id: "C", icon: "🚫", text: "Tolak permintaan produksi karena sistem FEFO tidak bisa diterapkan pada botol kaca.", correct: false, feedback: "Belum tepat. Jika FEFO tidak bisa diterapkan (karena tidak ada Expired Date), bukan berarti barang tidak bisa dikeluarkan. Cukup beralih gunakan sistem FIFO berdasarkan tanggal terima barang." }
                  ]
                },

                // ── SLIDE 8: MCQ — Return Produksi ───────────────────────
                {
                  type: "mcq",
                  xp: 20,
                  scenario: {
                    icon: "8",
                    label: "Problem Solving Produksi",
                    labelColor: "#F97316",
                    text: "Mesin rusak. Sisa 10 kg Cokelat Bubuk (Exp: 10 Jan 2027) dari produksi dikembalikan ke gudang. Di rak gudang ada stok Cokelat Bubuk dengan Exp: 25 Des 2026. Apa status 10 kg returan ini?",
                    htmlContext: `<div style="background:#F8FAFC;border:1px solid #E2E8F0;padding:12px;border-radius:10px;font-size:13px;display:flex;flex-direction:column;gap:8px;"><div style="background:#FEF9C3;padding:8px;border-radius:6px;border-left:3px solid #CA8A04;">🏭 <strong>Cokelat Retur dari Produksi:</strong> Exp 10 Jan 2027</div><div style="background:#DCFCE7;padding:8px;border-radius:6px;border-left:3px solid #16A34A;">📦 <strong>Cokelat Stok Gudang (Utuh):</strong> Exp 25 Des 2026 ⚠️ lebih dekat!</div></div>`
                  },
                  options: [
                    { id: "A", icon: "⚠️", text: "Harus dipakai SETELAH stok gudang habis (Karena Exp-nya lebih panjang dari stok gudang).", correct: true, feedback: "Analisis yang tajam! Mentang-mentang barang returan, bukan berarti ia harus selalu dipakai paling pertama. Kita tetap harus tunduk pada FEFO. Karena stok gudang memiliki Expired lebih dekat (25 Des 2026) dibandingkan barang retur (10 Jan 2027), maka stok gudang utuhlah yang harus dihabiskan lebih dulu." },
                    { id: "B", icon: "🛑", text: "Harus langsung dipakai untuk batch besok (Karena ini barang sisa produksi).", correct: false, feedback: "Hati-hati, ini kesalahan yang sering terjadi di lapangan! Banyak operator langsung memakai barang sisa returan untuk batch besoknya. Padahal, stok utuh di gudang (Exp 25 Des 2026) akan kedaluwarsa lebih cepat dari barang retur (Exp 10 Jan 2027). Tetap patuhi FEFO!" },
                    { id: "C", icon: "🗑️", text: "Harus langsung dibuang karena barang retur produksi merusak sistem FIFO/FEFO gudang.", correct: false, feedback: "Belum tepat. Selama bahan baku sisa produksi masih bagus, disegel dengan benar, dan belum expired, ia tidak boleh dibuang karena akan menjadi waste. Kembalikan ke gudang, beri label Return, dan atur pengeluarannya berdasarkan prinsip FEFO." }
                  ]
                },

                // ── SLIDE 9: SCORE SCREEN ────────────────────────────────
                {
                  type: "score_screen",
                  xp: 0,
                  feedback: {
                    title: "Unit 1-N01 Selesai!",
                    insight: "Anda sudah membuktikan mampu menjaga keamanan pangan dengan keputusan FIFO/FEFO yang tepat.",
                    icon: "🏭",
                    maxScore: 160,
                    totalCount: 8,
                    takeaways: [
                      "FIFO: Berdasarkan tanggal kedatangan (Receiving Date). Cocok untuk bahan kemas & sparepart.",
                      "FEFO: Berdasarkan tanggal kedaluwarsa (Expiry Date). Wajib untuk bahan baku & produk jadi pangan.",
                      "FEFO > FIFO: Di industri pangan, jika tanggal kedatangan berbenturan dengan tanggal kedaluwarsa, ikuti FEFO.",
                      "Penataan fisik palet di rak harus mencerminkan sistem ini agar operator tidak salah ambil."
                    ],
                    next: "Selesai",
                    colorMode: "orange"
                  }
                }

              ]
            },
            // ← TAMBAHKAN MULAI DARI SINI ↓
            {
              id: "mengapa-fifo-krusial",
              title: "Mengapa FIFO Krusial untuk Pangan?",
              icon: "⚠️",
              duration: "3 menit",
              slides: [

                // ── SLIDE 1: tap_classify (Dampak) ─────────────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Analisis Krisis Rotasi Stok',
                    labelColor: '#F39C12',
                    text: 'Gagal rotasi stok memicu dua krisis berbeda. Kenali dampaknya.\n\nKlasifikasikan dampak gagal FIFO/FEFO berikut!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'kesehatan', label: '☠️ Bahaya Kesehatan', subLabel: 'Dampak fatal ke konsumen' },
                    { id: 'bisnis', label: '💸 Kerugian Bisnis', subLabel: 'Dampak finansial ke pabrik' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🥛', text: 'Konsumen keracunan susu basi', targetZone: 'kesehatan' },
                    { id: 'c2', icon: '📉', text: '1 Ton tepung kedaluwarsa di gudang', targetZone: 'bisnis' },
                    { id: 'c3', icon: '🦠', text: 'Bakteri E. coli tumbuh di daging lama', targetZone: 'kesehatan' },
                    { id: 'c4', icon: '🤝', text: 'Supermarket menolak produk karena ED dekat', targetZone: 'bisnis' },
                    { id: 'c5', icon: '🤮', text: 'Kaleng saus meledak karena fermentasi', targetZone: 'kesehatan' },
                    { id: 'c6', icon: '🔥', text: 'Biaya pemusnahan limbah barang expired', targetZone: 'bisnis' },
                  ],
                  feedbackCorrect: 'Tepat! Gagal FIFO memicu dua krisis: bahaya fatal bagi konsumen (keracunan) dan pemborosan uang pabrik (dead stock).',
                  feedbackWrong: 'Tertukar. Keracunan/bakteri = Bahaya Kesehatan. Ditolak toko/barang dibuang = Kerugian Bisnis.',
                },

                // ── SLIDE 2: tap_classify (Kerusakan) ──────────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Identifikasi Jenis Kerusakan',
                    labelColor: '#F39C12',
                    text: 'Kerusakan material memiliki karakteristik yang berbeda-beda.\n\nKenali tanda bahan baku terlalu lama di gudang!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'biologis', label: '🔬 Rusak Biologis', subLabel: 'Bakteri/Jamur' },
                    { id: 'fisik', label: '👁️ Rusak Fisik/Rasa', subLabel: 'Kualitas turun' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧀', text: 'Tumbuh jamur di keju', targetZone: 'biologis' },
                    { id: 'c2', icon: '🎨', text: 'Warna saus tomat memudar', targetZone: 'fisik' },
                    { id: 'c3', icon: '🤢', text: 'Bau busuk menyengat dari ayam', targetZone: 'biologis' },
                    { id: 'c4', icon: '🍪', text: 'Biskuit menjadi alot (melempem)', targetZone: 'fisik' },
                    { id: 'c5', icon: '🫧', text: 'Kemasan menggembung karena gas', targetZone: 'biologis' },
                    { id: 'c6', icon: '🧂', text: 'Gula pasir menggumpal keras', targetZone: 'fisik' },
                  ],
                  feedbackCorrect: 'Betul! Kerusakan biologis sangat berbahaya (beracun). Kerusakan fisik/rasa tidak selalu beracun, tapi merusak standar mutu produk.',
                  feedbackWrong: 'Cek lagi. Yang berbau, berjamur, atau bergas itu biologis. Perubahan tekstur dan warna itu fisik/rasa.',
                },

                // ── SLIDE 3: tap_classify (Status Barang) ──────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Tindak Lanjut Temuan Gudang',
                    labelColor: '#F39C12',
                    text: 'Tentukan tindak lanjut material yang ditemukan di gudang.\n\nPisahkan barang sesuai kondisinya!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'buang', label: '🚫 WAJIB Buang', subLabel: 'Tidak bisa diselamatkan' },
                    { id: 'karantina', label: '⚠️ Karantina & Cek QA', subLabel: 'Masih ada harapan' },
                  ],
                  cards: [
                    { id: 'c1', icon: '❌', text: 'Barang sudah lewat masa kedaluwarsa', targetZone: 'buang' },
                    { id: 'c2', icon: '📦', text: 'Kardus penyok tapi expired date aman', targetZone: 'karantina' },
                    { id: 'c3', icon: '🐀', text: 'Kemasan sobek digigit tikus', targetZone: 'buang' },
                    { id: 'c4', icon: '🏷️', text: 'Label pudar, tanggal tidak terbaca jelas', targetZone: 'karantina' },
                    { id: 'c5', icon: '🌡️', text: 'Es krim cair karena tertinggal di luar chiller', targetZone: 'buang' },
                    { id: 'c6', icon: '⏳', text: 'Barang tinggal 1 minggu sebelum expired', targetZone: 'karantina' },
                  ],
                  feedbackCorrect: 'Tepat! Barang expired, rusak suhu, atau kena hama WAJIB buang. Barang mencurigakan (label hilang/penyok) wajib dikarantina untuk dicek QA.',
                  feedbackWrong: 'Tertukar. Ingat: expired dan kontaminasi hama tidak bisa ditoleransi. Label rusak masih bisa ditelusuri QA.',
                },

                // ── SLIDE 4: tap_classify (Tanggung Jawab) ─────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Analisis Akar Masalah',
                    labelColor: '#F39C12',
                    text: 'Analisis sumber masalah dari temuan di lapangan.\n\nSiapa pemicu utama kegagalan rotasi barang ini?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'gudang', label: '🏢 Kesalahan Gudang', subLabel: 'Inbound/Penyimpanan' },
                    { id: 'produksi', label: '⚙️ Kesalahan Produksi', subLabel: 'Outbound/Pemakaian' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧻', text: 'Menumpuk palet baru menutupi palet lama', targetZone: 'gudang' },
                    { id: 'c2', icon: '🏭', text: 'Malas jalan, mengambil bahan paling dekat pintu', targetZone: 'produksi' },
                    { id: 'c3', icon: '🔴', text: 'Lupa menempel label tanggal datang di karung', targetZone: 'gudang' },
                    { id: 'c4', icon: '🗑️', text: 'Tidak mengembalikan sisa bahan retur dengan rapi', targetZone: 'produksi' },
                    { id: 'c5', icon: '🧊', text: 'Menata kulkas tanpa melihat sistem FIFO/FEFO', targetZone: 'gudang' },
                    { id: 'c6', icon: '🙈', text: 'Abaikan label Use By karena buru-buru kejar target', targetZone: 'produksi' },
                  ],
                  feedbackCorrect: 'Luar biasa! Gudang bertugas MENATA sesuai FEFO. Produksi bertugas MENGAMBIL sesuai FEFO. Kerja sama keduanya wajib hukumnya.',
                  feedbackWrong: 'Ada yang salah posisi. Menata dan melabeli adalah tugas gudang. Mengambil dan meretur adalah tugas produksi.',
                },

                // ── SLIDE 5: accordion_materi ──────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: '3 Alasan FIFO/FEFO itu Harga Mati',
                    style: { background: '#C0392B', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Keamanan Konsumen (Safety)',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Bahan kedaluwarsa memicu tumbuhnya bakteri patogen (keracunan). <br><br><b>Ingat:</b> Nyawa konsumen ada di tangan Anda.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Menjaga Mutu (Quality)',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Barang lama akan turun rasa, warna pudar, atau menggumpal. <br><br><b>Ingat:</b> Resep yang sama bisa gagal jika bahannya layu.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#E8DAEF', color: '#633974' },
                      title: '3. Mencegah Kerugian (Cost)',
                      color: '#8E44AD',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Barang tidak terpakai hingga expired = Uang pabrik dibakar. <br><br><b>Ingat:</b> Makin banyak dibuang, bonus tahunan makin terancam.<br><br><span style="background:#FDF2E9;color:#C0392B;padding:6px 10px;border-radius:6px;display:inline-block;margin-top:10px;">💡 <b>Aturan BPOM:</b> Menjual/menggunakan bahan kedaluwarsa = Izin edar dicabut & sanksi pidana.</span></p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: mcq (Skenario Kualitas) ───────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Analisis Skenario Produksi',
                    labelColor: '#F39C12',
                    text: 'Tepung Maizena\nSisa Umur: 2 Hari sebelum Kedaluwarsa.\nKondisi: Agak menggumpal.\n\nApa yang harus operator produksi lakukan?',
                  },
                  options: [
                    { id: 'A', icon: '🛑', text: 'Setop pakai, isolasi, panggil QA untuk cek mutu.', correct: true, feedback: 'Tepat! Meski belum expired, jika fisik mencurigakan (menggumpal), wajib panggil QA. Kualitas turun = produk akhir gagal.' },
                    { id: 'B', icon: '🥣', text: 'Langsung pakai saja karena belum lewat tanggal expired.', correct: false, feedback: 'Salah. Jangan abaikan kondisi fisik. Menggumpal bisa berarti ada kebocoran air/kelembaban yang memicu kontaminasi.' },
                    { id: 'C', icon: '🗑️', text: 'Langsung buang ke tempat sampah.', correct: false, feedback: 'Salah. Operator tidak boleh membuang material tanpa otorisasi/verifikasi dari tim QA terlebih dahulu.' },
                  ],
                },

                // ── SLIDE 7: mcq (Skenario Keuangan) ───────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Analisis Skenario Gudang',
                    labelColor: '#F39C12',
                    text: 'Stok Gudang: 500 Dus Biskuit\nStatus: Expired kemarin akibat tertumpuk di sudut.\n\nApa dampak finansial langsung bagi pabrik?',
                  },
                  options: [
                    { id: 'A', icon: '💸', text: 'Rugi 2x lipat: Harga barang hangus + biaya musnahkan limbah.', correct: true, feedback: 'Tepat! Barang expired tidak hanya menghilangkan modal, tapi pabrik juga harus BAYAR jasa pihak ketiga untuk memusnahkan limbah pangan dengan aman.' },
                    { id: 'B', icon: '📉', text: 'Rugi 1x lipat: Hanya kehilangan harga barang saja.', correct: false, feedback: 'Belum tepat. Limbah pangan industri tidak boleh dibuang sembarangan, ada biaya ekstra untuk pemusnahannya.' },
                    { id: 'C', icon: '💰', text: 'Tidak rugi jika diam-diam dijual diskon ke pasar.', correct: false, feedback: 'Sangat fatal! Menjual barang expired adalah tindak pidana dan melanggar hukum keamanan pangan.' },
                  ],
                },

                // ── SLIDE 8: mcq (Skenario BPOM) ───────────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Inspeksi',
                    labelColor: '#F39C12',
                    text: 'Inspeksi BPOM Dadakan\nTemuan: Daging kedaluwarsa bercampur dengan daging segar di chiller.\n\nRisiko terbesar apa yang menanti perusahaan?',
                  },
                  options: [
                    { id: 'A', icon: '⚖️', text: 'Sanksi hukum, penarikan produk (recall), pabrik disegel.', correct: true, feedback: 'Tepat! Temuan fatal seperti ini membuktikan sistem manajemen mutu (CPOB/CPPOB) gagal total. Pabrik bisa ditutup seketika oleh otoritas.' },
                    { id: 'B', icon: '📝', text: 'Sekadar teguran lisan untuk merapikan kulkas.', correct: false, feedback: 'Salah. Pelanggaran batas kedaluwarsa yang bercampur dengan bahan segar adalah temuan kritikal (critical finding), bukan sekadar teguran lisan.' },
                    { id: 'C', icon: '🗑️', text: 'BPOM hanya menyita daging yang basi tersebut.', correct: false, feedback: 'Salah. BPOM akan mempertanyakan seluruh sistem traceability dan keamanan pangan pabrik, berujung pada sanksi berat.' },
                  ],
                },

                // ── SLIDE 9: mcq (Skenario Supply Chain) ───────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Pengiriman',
                    labelColor: '#F39C12',
                    text: 'Kirim ke Supermarket\nSyarat Toko: Sisa umur barang minimal 6 bulan.\nBarang dikirim: Sisa umur 2 bulan (karena gudang telat FEFO).\n\nApa yang akan terjadi di area penerimaan supermarket?',
                  },
                  options: [
                    { id: 'A', icon: '🔙', text: 'Barang diretur 100%, pabrik kena denda penalti.', correct: true, feedback: 'Betul! Telat FEFO = telat kirim. Supermarket menolak keras barang berumur pendek. Barang diretur, pabrik rugi ongkos kirim dan kena denda.' },
                    { id: 'B', icon: '🛒', text: 'Diterima tapi ditaruh di rak paling depan (diskon).', correct: false, feedback: 'Salah. Supermarket memiliki SLA (Service Level Agreement) penerimaan barang yang ketat dan otomatis menolak sistem jika tidak sesuai.' },
                    { id: 'C', icon: '🤝', text: 'Diterima asalkan ada surat negosiasi dari sales.', correct: false, feedback: 'Salah. Di industri retail modern, penolakan sistem otomatis terjadi di gudang (DC) mereka, surat sales tidak berlaku di lapangan penerimaan.' },
                  ],
                },

                // ── SLIDE TERAKHIR: score_screen ───────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Unit Selesai!',
                    insight: 'Anda sudah membuktikan mampu membedakan risiko keamanan pangan dengan keputusan FIFO/FEFO yang tepat.',
                    icon: '🛡️',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'FEFO cegah racun (Safety).',
                      'FEFO jaga rasa (Quality).',
                      'FEFO selamatkan uang pabrik (Cost).',
                      'Gagal FEFO = Sanksi BPOM & Retur Supermarket.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }
              ]
            },
            // ← SAMPAI SINI
            // ← TAMBAHKAN MULAI DARI SINI ↓
            {
              id: "dampak-finansial-kegagalan-fifo",
              title: "Dampak Finansial dari Kegagalan FIFO",
              icon: "💸",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Dampak Kesehatan vs Bisnis) ───────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Analisis Dampak Gagal FIFO',
                    labelColor: '#F39C12',
                    text: 'Klasifikasikan dampak gagal FIFO/FEFO berikut!',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Gagal rotasi stok memicu dua krisis berbeda. Kenali dampaknya.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'kesehatan', label: '☠️ Bahaya Kesehatan', subLabel: 'Dampak fatal ke konsumen' },
                    { id: 'bisnis', label: '💸 Kerugian Bisnis', subLabel: 'Dampak finansial ke pabrik' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🥛', text: 'Konsumen keracunan susu basi', targetZone: 'kesehatan' },
                    { id: 'c2', icon: '📉', text: '1 Ton tepung kedaluwarsa di gudang', targetZone: 'bisnis' },
                    { id: 'c3', icon: '🦠', text: 'Bakteri E. coli tumbuh di daging lama', targetZone: 'kesehatan' },
                    { id: 'c4', icon: '🤝', text: 'Supermarket menolak produk karena ED dekat', targetZone: 'bisnis' },
                    { id: 'c5', icon: '🤮', text: 'Kaleng saus meledak karena fermentasi', targetZone: 'kesehatan' },
                    { id: 'c6', icon: '🔥', text: 'Biaya pemusnahan limbah barang expired', targetZone: 'bisnis' },
                  ],
                  feedbackCorrect: 'Tepat! Gagal FIFO memicu dua krisis: bahaya fatal bagi konsumen (keracunan) dan pemborosan uang pabrik (dead stock).',
                  feedbackWrong: 'Tertukar. Keracunan/bakteri = Bahaya Kesehatan. Ditolak toko/barang dibuang = Kerugian Bisnis.',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Biaya Langsung vs Tersembunyi) ────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Identifikasi Jenis Biaya',
                    labelColor: '#F39C12',
                    text: 'Pilih mana yang Biaya Langsung vs Biaya Tersembunyi!',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Kerugian finansial pabrik ada yang terlihat di laporan, ada yang jadi hantu.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'langsung', label: '📉 Biaya Langsung', subLabel: 'Kelihatan di struk/laporan' },
                    { id: 'tersembunyi', label: '👻 Biaya Tersembunyi', subLabel: 'Efek domino tak terlihat' },
                  ],
                  cards: [
                    { id: 'c1', icon: '💰', text: 'Harga beli 1 ton bahan baku yang hangus', targetZone: 'langsung' },
                    { id: 'c2', icon: '🤝', text: 'Hilangnya kepercayaan dari Supermarket', targetZone: 'tersembunyi' },
                    { id: 'c3', icon: '🔥', text: 'Tagihan dari vendor pemusnah limbah B3', targetZone: 'langsung' },
                    { id: 'c4', icon: '⏳', text: 'Waktu kerja operator terbuang mensortir barang', targetZone: 'tersembunyi' },
                    { id: 'c5', icon: '🚚', text: 'Membayar ongkos kirim truk retur barang', targetZone: 'langsung' },
                    { id: 'c6', icon: '📉', text: 'Citra merek hancur di mata konsumen', targetZone: 'tersembunyi' },
                  ],
                  feedbackCorrect: 'Luar biasa! Harga barang dan ongkos kirim adalah kerugian langsung. Tapi waktu yang terbuang dan reputasi hancur adalah "hantu" yang diam-diam menggerus profit.',
                  feedbackWrong: 'Ada yang tertukar. Uang fisik yang hilang/dibayar = Langsung. Waktu, tenaga, reputasi, dan kepercayaan = Tersembunyi.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Pencegahan vs Pemborosan) ─────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Evaluasi Aktivitas Operasional',
                    labelColor: '#F39C12',
                    text: 'Klasifikasikan aktivitas operasional ini!',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Mencegah selalu lebih murah daripada menanggung pemborosan.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'cegah', label: '🛡️ Biaya Pencegahan', subLabel: 'Investasi positif' },
                    { id: 'rugi', label: '💸 Biaya Pemborosan', subLabel: 'Akibat gagal FIFO' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🏷️', text: 'Membeli stiker label warna-warni untuk FIFO', targetZone: 'cegah' },
                    { id: 'c2', icon: '🗑️', text: 'Membuang 50kg ayam potong yang busuk', targetZone: 'rugi' },
                    { id: 'c3', icon: '👨‍🏫', text: 'Training FEFO untuk operator gudang baru', targetZone: 'cegah' },
                    { id: 'c4', icon: '🚚', text: 'Menyewa truk ekstra akibat retur barang expired', targetZone: 'rugi' },
                    { id: 'c5', icon: '⏱️', text: 'Membayar lembur tim untuk opname stok berkala', targetZone: 'cegah' },
                    { id: 'c6', icon: '⚖️', text: 'Membayar denda penalti ke pihak Supermarket', targetZone: 'rugi' },
                  ],
                  feedbackCorrect: 'Tepat! Mengeluarkan biaya untuk stiker, training, dan opname stok jauh lebih murah dibandingkan menanggung denda retur dan membuang bahan baku.',
                  feedbackWrong: 'Cek lagi. Aktivitas proaktif (training, label, opname) adalah Pencegahan. Kerugian, denda, dan barang dibuang adalah Pemborosan.',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Aksi Menyelamatkan vs Merusak) ───
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Penilaian Tindakan di Lapangan',
                    labelColor: '#F39C12',
                    text: 'Tindakan mana yang menyelamatkan uang pabrik?',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Keputusan harian di lantai produksi bernilai puluhan juta rupiah.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'selamat', label: '🟢 Menyelamatkan', subLabel: 'Aksi Positif' },
                    { id: 'rusak', label: '🔴 Merusak Nilai', subLabel: 'Aksi Negatif' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📢', text: 'Proaktif melapor jika ada stok yang Expired dekat', targetZone: 'selamat' },
                    { id: 'c2', icon: '🙈', text: 'Menyembunyikan tepung basi di sudut rak', targetZone: 'rusak' },
                    { id: 'c3', icon: '📋', text: 'Mengecek Kartu Stok setiap kali ambil barang', targetZone: 'selamat' },
                    { id: 'c4', icon: '🧱', text: 'Menumpuk barang baru di depan barang lama', targetZone: 'rusak' },
                    { id: 'c5', icon: '🛑', text: 'Mengkarantina bahan kemas yang rusak fisiknya', targetZone: 'selamat' },
                    { id: 'c6', icon: '🤫', text: 'Memakai barang sisa kemarin tanpa mengecek label', targetZone: 'rusak' },
                  ],
                  feedbackCorrect: 'Sempurna! Kejujuran dan kedisiplinan (melapor, karantina, lapor kartu stok) adalah kunci menyelamatkan uang perusahaan.',
                  feedbackWrong: 'Ada yang tertukar. Menyembunyikan kesalahan atau menumpuk barang sembarangan adalah aksi merusak (Negatif).',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: 'Piramida Kerugian FEFO',
                    style: { background: '#C0392B', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Puncak Es (Direct Cost)',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Kerugian yang langsung terlihat di laporan keuangan bulanan.<br><br>👉 <b>Contoh:</b> Nilai modal pembelian bahan baku yang hangus karena expired.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Badan Es (Operational Cost)',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Biaya tambahan yang harus dikeluarkan pabrik untuk "membersihkan" masalah.<br><br>👉 <b>Contoh:</b> Biaya ongkos kirim truk saat retur barang, biaya sewa gudang karantina, dan tarif pemusnahan limbah B3.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#E8DAEF', color: '#633974' },
                      title: '3. Dasar Es (Hidden/Reputation Cost)',
                      color: '#8E44AD',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Kerugian tak kasat mata namun paling mematikan bagi bisnis jangka panjang.<br><br>👉 <b>Contoh:</b> Kepercayaan B2B (Supermarket) turun, produk diboikot konsumen, atau pabrik dicabut izin operasionalnya oleh BPOM.</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Kalkulasi Limbah) ─────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Kalkulasi Kerugian Total',
                    labelColor: '#F39C12',
                    text: 'Kasus Daging Busuk:\n200 kg Daging Sapi (Harga: Rp 100.000/kg) membusuk karena gagal FEFO di Chiller.\nBiaya jasa musnahkan limbah: Rp 10.000/kg.\n\nBerapa total uang perusahaan yang "dibakar" karena kelalaian ini?',
                  },
                  options: [
                    { id: 'A', icon: '🥩', text: 'Rp 20.000.000 (Hanya menghitung harga beli daging yang busuk).', correct: false, feedback: 'Belum tepat. Anda lupa memasukkan biaya pemusnahan (200 kg x 10.000 = 2 juta). Limbah daging tidak boleh dibuang sembarangan.' },
                    { id: 'B', icon: '🔥', text: 'Rp 22.000.000 (Rugi modal daging 20 juta + Biaya limbah 2 juta).', correct: true, feedback: 'Luar biasa tepat! Perusahaan rugi modal daging (200kg x 100rb = 20 Jt), PLUS ditarik biaya pemusnahan limbah (200kg x 10rb = 2 Jt). Kerugian total Rp 22 Juta hanya karena salah ambil barang!' },
                    { id: 'C', icon: '🗑️', text: 'Rp 2.000.000 (Hanya biaya buang limbah, dagingnya kan sudah lunas).', correct: false, feedback: 'Salah besar. Meskipun daging sudah lunas, itu adalah aset (uang perusahaan) yang berubah menjadi sampah. Modal 20 jutanya tetap hangus.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Retur Toko) ───────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Analisis Biaya Tersembunyi',
                    labelColor: '#F39C12',
                    text: 'Kasus Retur Toko:\nKarena gagal FEFO, 50 karton susu dikirim ke Supermarket dengan sisa umur tinggal 1 bulan.\nToko menolak dan meretur semuanya.\n\nMana yang BUKAN merupakan kerugian pabrik di kasus ini?',
                  },
                  options: [
                    { id: 'A', icon: '🚚', text: 'Biaya ongkos truk ekspedisi bolak-balik yang sia-sia.', correct: false, feedback: 'Salah. Ini ADALAH kerugian pabrik. Pabrik tetap harus membayar uang bensin dan sewa truk meskipun barangnya ditolak.' },
                    { id: 'B', icon: '🤝', text: 'Kehilangan kepercayaan (trust) dan denda dari Supermarket.', correct: false, feedback: 'Salah. Ini ADALAH kerugian pabrik. Trust yang hilang adalah "Hidden Cost" yang paling berbahaya.' },
                    { id: 'C', icon: '✨', text: 'Kualitas gizi susu yang makin bertambah saat perjalanan retur.', correct: true, feedback: 'Betul (Ini jawaban yang tepat karena ini TIDAK MUNGKIN terjadi). Gizi susu justru bisa rusak, dan pabrik menanggung banyak biaya tersembunyi.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Keputusan Produksi) ───────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Analisis Skenario Produksi',
                    labelColor: '#F39C12',
                    text: 'Tepung Maizena\nSisa Umur: 2 Hari sebelum Kedaluwarsa.\nKondisi: Agak menggumpal.\n\nApa yang harus operator produksi lakukan?',
                  },
                  options: [
                    { id: 'A', icon: '🗑️', text: 'Langsung buang ke tempat sampah.', correct: false, feedback: 'Salah. Operator tidak boleh membuang material tanpa otorisasi/verifikasi dari tim QA terlebih dahulu.' },
                    { id: 'B', icon: '🛑', text: 'Setop pakai, isolasi, panggil QA untuk cek mutu.', correct: true, feedback: 'Tepat! Meski belum expired, jika fisik mencurigakan (menggumpal), wajib panggil QA. Kualitas turun = produk akhir gagal.' },
                    { id: 'C', icon: '🥣', text: 'Langsung pakai saja karena belum lewat tanggal expired.', correct: false, feedback: 'Salah. Jangan abaikan kondisi fisik. Menggumpal bisa berarti ada kebocoran air/kelembaban yang memicu kontaminasi.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Pencegahan Proaktif) ──────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Pengambilan Keputusan Cepat',
                    labelColor: '#F39C12',
                    text: 'Temuan Lapangan:\nAnda melihat sisa stok Bumbu Sapi tinggal 2 MINGGU sebelum expired.\nPadahal, jadwal pemakaian bumbu tersebut baru bulan depan.\n\nTindakan apa yang paling menyelamatkan uang pabrik?',
                  },
                  options: [
                    { id: 'A', icon: '🤫', text: 'Diamkan saja di rak, toh tugas orang gudang hanya menyimpan barang.', correct: false, feedback: 'Salah. Sikap masa bodoh (apatis) seperti ini adalah penyebab utama pemborosan miliaran rupiah di industri.' },
                    { id: 'B', icon: '🗑️', text: 'Buang ke tempat sampah sekarang agar rak terlihat rapi saat diaudit.', correct: false, feedback: 'Salah. Bumbu tersebut belum expired, masih bisa dipakai! Membuang barang bagus adalah pelanggaran fatal.' },
                    { id: 'C', icon: '📢', text: 'Segera lapor PPIC/Supervisor agar jadwal produksi bumbu dimajukan.', correct: true, feedback: 'Tepat! Proaktif melapor memungkinkan manajemen mengubah jadwal (re-schedule) untuk menyelamatkan bumbu tersebut sebelum benar-benar expired.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Unit Selesai!',
                    insight: 'Anda kini sadar bahwa gagal FIFO/FEFO adalah mesin pembakar uang perusahaan paling cepat.',
                    icon: '📉',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      '1 Palet Expired = Rugi Material + Biaya Pemusnahan Limbah.',
                      'Barang yang nyaris Expired adalah bom waktu, segera laporkan.',
                      'Retur toko = Rugi ongkos kirim + Denda + Reputasi hancur.',
                      'Pencegahan selalu lebih murah daripada pemborosan.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            }
            // ← SAMPAI SINI
          ]
        },
        {
          id: "eksekusi-fifo-di-gudang-penyimpanan",
          title: "Eksekusi FIFO di Gudang Penyimpanan",
          icon: "🏢",
          color: "#C0392B",
          subLessons: [

            // Sub-lesson untuk Modul 2 nanti dimasukkan ke sini
            // ← PASTE MULAI DARI SINI ↓
            {
              id: "labeling-identifikasi-kedatangan",
              title: "Labeling & Identifikasi Kedatangan",
              icon: "🏷️",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Status Label Karantina vs Rilis) ───
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Pahami Status Label QA (Quality Assurance)',
                    labelColor: '#F39C12',
                    text: 'Tentukan status yang tepat untuk kondisi barang berikut!',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Di industri tersertifikasi, setiap barang datang belum tentu boleh langsung dipakai.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'karantina', label: '🟡 Label Karantina (Hold)', subLabel: 'Belum bisa dipakai' },
                    { id: 'rilis', label: '🟢 Label Rilis (Released)', subLabel: 'Siap untuk produksi' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🚛', text: 'Barang baru saja turun dari truk ekspedisi', targetZone: 'karantina' },
                    { id: 'c2', icon: '🔬', text: 'Sampel sedang diuji oleh tim Laboratorium', targetZone: 'karantina' },
                    { id: 'c3', icon: '✅', text: 'Sertifikat Analisis (CoA) sudah disetujui QA', targetZone: 'rilis' },
                    { id: 'c4', icon: '📝', text: 'Manajer QA sudah menempelkan stiker hijau', targetZone: 'rilis' },
                    { id: 'c5', icon: '⏳', text: 'Menunggu proses pengecekan fisik oleh QC', targetZone: 'karantina' },
                    { id: 'c6', icon: '🏭', text: 'Barang diizinkan masuk ke ruang penimbangan', targetZone: 'rilis' },
                  ],
                  feedbackCorrect: 'Sempurna! Aturan emasnya: Semua barang yang baru datang WAJIB dikarantina (Label Kuning) sampai tim QA/QC selesai menguji dan memberikan status Rilis (Label Hijau).',
                  feedbackWrong: 'Ada yang tertukar. Barang baru turun atau sedang diuji = Karantina (Kuning). Hanya yang sudah disetujui QA = Rilis (Hijau).',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Sistem Rotasi: FIFO vs FEFO) ───────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Identifikasi Sistem Rotasi',
                    labelColor: '#F39C12',
                    text: 'Sistem rotasi apa yang wajib digunakan untuk material ini?',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Setiap jenis barang memiliki prioritas rotasi yang berbeda di gudang.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'fifo', label: '📦 Gunakan FIFO', subLabel: 'Berdasarkan Tanggal Datang' },
                    { id: 'fefo', label: '⏳ Gunakan FEFO', subLabel: 'Berdasarkan Expired Date' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧻', text: 'Kardus kemasan sekunder (polos)', targetZone: 'fifo' },
                    { id: 'c2', icon: '🥛', text: 'Susu UHT / Bahan baku perishable', targetZone: 'fefo' },
                    { id: 'c3', icon: '💊', text: 'Bahan Aktif Farmasi (API) yang punya batas ED', targetZone: 'fefo' },
                    { id: 'c4', icon: '🔩', text: 'Suku cadang (sparepart) mesin produksi', targetZone: 'fifo' },
                    { id: 'c5', icon: '🥩', text: 'Daging sapi beku di dalam Cold Storage', targetZone: 'fefo' },
                    { id: 'c6', icon: '🏷️', text: 'Stiker label botol cetakan baru', targetZone: 'fifo' },
                  ],
                  feedbackCorrect: 'Tepat sekali! Barang yang bisa kedaluwarsa/membusuk WAJIB FEFO. Barang non-perishable (kemasan, sparepart) menggunakan FIFO berdasarkan tanggal penerimaan.',
                  feedbackWrong: 'Cek lagi. Bahan baku yang bisa basi/expired (susu, daging, bahan aktif) wajib FEFO. Kardus dan sparepart cukup FIFO.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Prioritas Penanganan Kedatangan) ───
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Prioritas Penanganan di Loading Dock',
                    labelColor: '#F39C12',
                    text: 'Bagaimana kecepatan respon Anda untuk barang-barang ini?',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Tidak semua barang bisa dibiarkan antre lama di area penerimaan.</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'kritis', label: '❄️ Prioritas Kritis', subLabel: 'Segera masukkan ke Chiller/Freezer' },
                    { id: 'standar', label: '📝 Prioritas Standar', subLabel: 'Bisa antre cek dokumen di Suhu Ruang' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧊', text: 'Vaksin atau bahan aktif sensitif suhu (2-8°C)', targetZone: 'kritis' },
                    { id: 'c2', icon: '🧂', text: 'Garam industri dalam karung 50kg', targetZone: 'standar' },
                    { id: 'c3', icon: '🥩', text: 'Ayam potong segar dari supplier', targetZone: 'kritis' },
                    { id: 'c4', icon: '📦', text: 'Botol kaca kosong untuk sirup', targetZone: 'standar' },
                    { id: 'c5', icon: '🍦', text: 'Bahan dasar es krim yang mulai mencair', targetZone: 'kritis' },
                    { id: 'c6', icon: '🌾', text: 'Biji kopi kering dalam karung goni', targetZone: 'standar' },
                  ],
                  feedbackCorrect: 'Sangat baik! Menjaga "Cold Chain" (rantai dingin) adalah prioritas absolut. Bahan sensitif suhu tidak boleh dibiarkan menganggur di Loading Dock yang bersuhu ruang.',
                  feedbackWrong: 'Ada yang salah. Vaksin, daging, dan es krim butuh penanganan kritis secepat kilat (masuk chiller). Garam dan kemasan bisa antre normal.',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Keputusan Tolak vs Terima) ─────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Keputusan Inspeksi Fisik Awal',
                    labelColor: '#F39C12',
                    text: 'Anda bertugas di penerimaan. Mana yang Anda Tolak vs Terima (Karantina)?',
                    htmlContext: `<div style="background:#FDF2E9;border:1px solid #E67E22;padding:10px 14px;border-radius:8px;font-size:13px;color:#C0392B;">Garis pertahanan pertama pabrik ada di tangan tim penerimaan gudang (Inbound).</div>`,
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'terima', label: '✅ Terima & Karantina', subLabel: 'Fisik & Dokumen OK' },
                    { id: 'tolak', label: '❌ Tolak (Retur)', subLabel: 'Pelanggaran Kritis' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🐀', text: 'Kemasan sobek dan ada bekas gigitan tikus', targetZone: 'tolak' },
                    { id: 'c2', icon: '📄', text: 'Jumlah fisik cocok dengan Surat Jalan & PO', targetZone: 'terima' },
                    { id: 'c3', icon: '🌡️', text: 'Suhu truk pendingin 15°C (Standar: Max 4°C)', targetZone: 'tolak' },
                    { id: 'c4', icon: '☔', text: 'Kardus terluar basah kuyup terkena hujan', targetZone: 'tolak' },
                    { id: 'c5', icon: '🏷️', text: 'Label pabrikan utuh dan tersegel rapat', targetZone: 'terima' },
                    { id: 'c6', icon: '📅', text: 'Barang datang dengan sisa Expired tinggal 1 minggu', targetZone: 'tolak' },
                  ],
                  feedbackCorrect: 'Luar biasa! Barang rusak, kontaminasi hama, pelanggaran suhu, dan expired dekat WAJIB ditolak langsung di Loading Dock. Jangan sampai masuk ke sistem gudang!',
                  feedbackWrong: 'Tertukar. Jika kemasan rusak, basah, suhu bocor, atau sisa expired sangat pendek, Anda wajib menolaknya (Retur) hari itu juga.',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: 'SOP Penerimaan & Labeling Gudang',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Garis Pertahanan Pertama',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Kesalahan di <i>Loading Dock</i> akan menular ke seluruh proses produksi. Jika fisik barang mencurigakan, dokumen tidak sesuai, atau suhu truk melanggar SLA, <b>langsung tolak</b>.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Prinsip Karantina Universal',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Semua material yang lolos fisik <b>WAJIB</b> dilabeli Karantina (Kuning) terlebih dahulu. Material tidak boleh dipakai produksi sebelum tim QC memeriksa <i>Certificate of Analysis</i> (CoA) dan mengubah statusnya menjadi Rilis (Hijau).</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Aturan Identitas Palet',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Setiap palet yang masuk gudang harus memiliki <b>Label Kedatangan</b> yang mencakup:<br>• Nama Bahan & Kode Item<br>• Nomor Batch/Lot<br>• Tanggal Datang (Untuk FIFO)<br>• Tanggal Expired (Untuk FEFO)</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Truk Pendingin) ───────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Audit Suhu',
                    labelColor: '#F39C12',
                    // Konteks dimasukkan langsung ke text menggunakan \n\n untuk enter
                    text: 'Truk supplier membawa 5 ton daging sapi mentah tiba. Standar penerimaan: Suhu maksimal 4°C.\n\nHasil cek Thermo-gun: Suhu permukaan daging 12°C, es di dalam truk mencair.\n\nApa keputusan terbaik di Loading Dock?',
                  },
                  options: [
                    { id: 'A', icon: '🥶', text: 'Terima saja, lalu segera masukkan ke freezer pabrik agar kembali beku.', correct: false, feedback: 'Sangat berbahaya! Daging yang sempat memanas sudah terkontaminasi bakteri. Membekukannya kembali tidak akan membunuh bakteri tersebut.' },
                    { id: 'B', icon: '❌', text: 'Tolak (Retur) seluruh pengiriman dan buat Laporan Ketidaksesuaian (NCR).', correct: true, feedback: 'Keputusan Tepat! Suhu 12°C adalah pelanggaran kritis rantai dingin. Mengembalikan barang adalah langkah krusial untuk mencegah keracunan konsumen.' },
                    { id: 'C', icon: '⏱️', text: 'Tahan truknya di lokasi sampai suhunya turun sendiri ke 4°C.', correct: false, feedback: 'Salah. Suhu daging yang sudah naik tidak bisa di-reset begitu saja. Kerusakan biologis sudah terjadi.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Kelengkapan Label) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Identitas Hilang',
                    labelColor: '#F39C12',
                    text: '20 Jerigen Perisa Sintetik tiba. Dokumen Surat Jalan lengkap, TAPI tidak ada cetakan Tanggal Kedaluwarsa (Expired Date) di fisik jerigen dari pabriknya.\n\nTindakan apa yang sesuai dengan GMP (Good Manufacturing Practice)?',
                  },
                  options: [
                    { id: 'A', icon: '✍️', text: 'Tulis sendiri tanggal expired-nya pakai spidol berdasarkan dokumen PO.', correct: false, feedback: 'Pelanggaran berat! Operator tidak boleh mengarang atau menulis identitas kritis secara sepihak tanpa verifikasi QA.' },
                    { id: 'B', icon: '✅', text: 'Terima saja, anggap barang tersebut FIFO karena dokumennya lengkap.', correct: false, feedback: 'Salah. Perisa sintetik adalah barang yang memiliki batas masa pakai. Jika Anda tidak tahu kapan kadaluwarsanya, sistem FEFO akan hancur.' },
                    { id: 'C', icon: '🛑', text: 'Tahan di Loading Dock, minta supplier menerbitkan Surat Keterangan / CoA resmi.', correct: true, feedback: 'Sangat Tepat! Tanpa bukti tertulis resmi dari produsen (CoA), barang ini buta identitas dan merupakan bom waktu bagi keamanan produk.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Pemisahan Batch) ──────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Penyusunan Palet',
                    labelColor: '#F39C12',
                    text: 'Supplier mengirim 20 karung dari Batch A dan 10 karung dari Batch B dalam satu truk yang sama.\n\nBagaimana cara menyusun barang ini sebelum masuk rak?',
                  },
                  options: [
                    { id: 'A', icon: '🧱', text: 'Pisahkan secara fisik; Batch A di palet sendiri, Batch B di palet berbeda.', correct: true, feedback: 'Sempurna! Pemisahan per Batch (Lot) sangat krusial agar tidak tertukar saat rotasi FEFO dan memudahkan pelacakan (traceability) jika ada penarikan produk.' },
                    { id: 'B', icon: '🏗️', text: 'Tumpuk saja jadi satu palet untuk menghemat ruang gudang.', correct: false, feedback: 'Salah. Mencampur batch dalam satu palet adalah larangan keras di gudang industri karena merusak traceability (keterlacakan).' },
                    { id: 'C', icon: '🏷️', text: 'Campur saja, tapi pasang dua label identitas di satu palet tersebut.', correct: false, feedback: 'Membingungkan! Satu palet = Satu Batch = Satu Label Identitas. Pasang dua label akan memicu human error saat pengambilan.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Paksaan Produksi) ─────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Krisis Antar-Departemen',
                    labelColor: '#F39C12',
                    text: 'Garam baru saja tiba 1 jam lalu dan masih berlabel KUNING (Karantina). Tiba-tiba Supervisor Produksi datang marah-marah memaksa meminta garam itu karena mesin harus jalan sekarang.\n\nSebagai Kepala Gudang, apa respon Anda?',
                  },
                  options: [
                    { id: 'A', icon: '🤝', text: 'Berikan saja setengahnya untuk membantu kelancaran operasional produksi.', correct: false, feedback: 'Salah! Aturan kualitas tidak mengenal kompromi "setengah-setengah".' },
                    { id: 'B', icon: '🛑', text: 'Tolak tegas. Produksi tidak boleh menyentuh barang sebelum dilabeli HIJAU oleh QA.', correct: true, feedback: 'Tepat! Anda baru saja menyelamatkan pabrik. Jika garam karantina itu ternyata gagal uji lab dan terlanjur dipakai, seluruh produk jadi hari itu wajib dibuang!' },
                    { id: 'C', icon: '✍️', text: 'Minta Supervisor Produksi tanda tangan surat pernyataan bertanggung jawab, lalu berikan.', correct: false, feedback: 'Salah. Keselamatan konsumen tidak bisa digantikan oleh selembar surat pernyataan. Prosedur rilis QA adalah harga mati (GMP).' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Unit Selesai!',
                    insight: 'Anda telah menguasai pertahanan pertama gudang. Penerimaan yang benar akan mengunci sistem FIFO/FEFO agar berjalan sempurna.',
                    icon: '🛡️',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Barang baru datang = Karantina (Label Kuning).',
                      'Lolos QA = Rilis (Label Hijau).',
                      'Jangan campur beda Nomor Batch dalam 1 palet.',
                      'Tolak mentah-mentah barang yang melanggar standar suhu/fisik di Loading Dock.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            },
            // ← PASTE MULAI DARI SINI ↓ (Di bawah penutup sub-lesson 2-N01)
            {
              id: "strategi-penataan-penyimpanan-rak",
              title: "Strategi Penataan & Penyimpanan Rak",
              icon: "🏗️",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Zona Penyimpanan Suhu) ────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Pemetaan Zona Suhu Gudang',
                    labelColor: '#F39C12',
                    text: 'Klasifikasikan material berikut ke zona penyimpanan suhu yang tepat!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'ambient', label: '🌡️ Suhu Ruang (Ambient)', subLabel: 'Max 30°C / Kering' },
                    { id: 'cold', label: '❄️ Cold Storage', subLabel: 'Chiller / Freezer' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🥩', text: 'Daging potong segar', targetZone: 'cold' },
                    { id: 'c2', icon: '🧻', text: 'Kardus kemasan sekunder (karton)', targetZone: 'ambient' },
                    { id: 'c3', icon: '🧈', text: 'Mentega / Margarin balok', targetZone: 'cold' },
                    { id: 'c4', icon: '🧊', text: 'Vaksin atau Bahan Aktif sensitif (2-8°C)', targetZone: 'cold' },
                    { id: 'c5', icon: '🌾', text: 'Karung tepung terigu 25kg', targetZone: 'ambient' },
                    { id: 'c6', icon: '🧂', text: 'Garam industri', targetZone: 'ambient' },
                  ],
                  feedbackCorrect: 'Sempurna! Menyimpan barang di zona suhu yang salah, meskipun FIFO-nya benar, akan tetap membuat barang tersebut rusak sebelum tanggal kedaluwarsanya.',
                  feedbackWrong: 'Ada yang tertukar. Barang yang mudah meleleh atau membusuk (daging, mentega, vaksin) wajib masuk Cold Storage. Bahan kering cukup di Suhu Ruang.',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Ergonomi & Letak Rak) ─────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Ergonomi & Manajemen Risiko Fisik',
                    labelColor: '#F39C12',
                    text: 'Tentukan posisi rak yang paling aman untuk kondisi barang ini!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'bawah', label: '⬇️ Rak Bawah / Lantai', subLabel: 'Aman untuk benda berat/cair' },
                    { id: 'atas', label: '⬆️ Rak Atas', subLabel: 'Untuk benda ringan/kering' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🛢️', text: 'Drum berisi cairan minyak sayur 200 Liter', targetZone: 'bawah' },
                    { id: 'c2', icon: '🏷️', text: 'Gulungan stiker label kemasan (ringan)', targetZone: 'atas' },
                    { id: 'c3', icon: '⚖️', text: 'Palet berisi karung gula total 1 Ton', targetZone: 'bawah' },
                    { id: 'c4', icon: '📦', text: 'Kardus kosong belum dirakit', targetZone: 'atas' },
                    { id: 'c5', icon: '🧪', text: 'Bahan kimia cair pembersih mesin (CIP)', targetZone: 'bawah' },
                    { id: 'c6', icon: '🪶', text: 'Plastik pembungkus palet (Stretch film)', targetZone: 'atas' },
                  ],
                  feedbackCorrect: 'Tepat sekali! Cairan dan barang sangat berat WAJIB di rak bawah. Jika cairan ditaruh di atas dan bocor, ia akan menetes (kontaminasi silang) ke barang di bawahnya.',
                  feedbackWrong: 'Cek lagi. Barang berat dan CAIRAN harus selalu di bawah. Menaruh drum cairan di atas sangat berbahaya jika terjadi kebocoran atau gempa.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Aturan GMP di Gudang) ─────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Audit Cara Penyimpanan (GMP)',
                    labelColor: '#F39C12',
                    text: 'Berdasarkan standar GMP, mana cara penataan yang Benar vs Pelanggaran?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'benar', label: '✅ Standar GMP', subLabel: 'Aman & Sesuai Aturan' },
                    { id: 'salah', label: '❌ Pelanggaran', subLabel: 'Risiko Kontaminasi' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📏', text: 'Memberi jarak minimal 15cm antara palet dan dinding tembok', targetZone: 'benar' },
                    { id: 'c2', icon: '🧱', text: 'Menempelkan tumpukan karton rapat ke dinding agar gudang muat banyak', targetZone: 'salah' },
                    { id: 'c3', icon: '🛑', text: 'Meletakkan karung bahan langsung di atas lantai (tanpa alas palet)', targetZone: 'salah' },
                    { id: 'c4', icon: '📦', text: 'Menumpuk palet sesuai batas maksimal yang ada di simbol kardus', targetZone: 'benar' },
                    { id: 'c5', icon: '🥜', text: 'Menaruh bahan bubuk kacang (alergen) di rak paling atas', targetZone: 'salah' },
                    { id: 'c6', icon: '🧹', text: 'Memberikan lorong yang cukup untuk jalur jalan dan inspeksi hama', targetZone: 'benar' },
                  ],
                  feedbackCorrect: 'Sangat baik! Menyimpan barang menempel dinding atau langsung di lantai adalah pelanggaran fatal karena mencegah inspeksi hama dan memicu kelembaban.',
                  feedbackWrong: 'Ada yang keliru. Ingat: Barang tidak boleh sentuh lantai langsung, tidak boleh menempel tembok, dan alergen (kacang) tidak boleh di atas karena serbuknya bisa jatuh.',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Mekanik Fisik FEFO) ───────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Visualisasi Fisik FEFO di Rak',
                    labelColor: '#F39C12',
                    text: 'Jika Anda menyusun barang di lorong rak, di mana posisi barang-barang ini?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'depan', label: '🟢 Posisi Depan', subLabel: 'Paling mudah diambil' },
                    { id: 'belakang', label: '🟠 Posisi Belakang', subLabel: 'Ditimbun lebih dalam' },
                  ],
                  cards: [
                    { id: 'c1', icon: '⏳', text: 'Bahan baku yang sisa expired-nya tinggal 1 bulan', targetZone: 'depan' },
                    { id: 'c2', icon: '📅', text: 'Barang yang expired-nya masih 2 tahun lagi', targetZone: 'belakang' },
                    { id: 'c3', icon: '🚛', text: 'Palet yang baru saja datang pagi ini dari supplier', targetZone: 'belakang' },
                    { id: 'c4', icon: '📦', text: 'Sisa stok gudang dari penerimaan bulan lalu', targetZone: 'depan' },
                    { id: 'c5', icon: '🅰️', text: 'Batch A (Tanggal Kedaluwarsa: 10 November)', targetZone: 'depan' },
                    { id: 'c6', icon: '🅱️', text: 'Batch B (Tanggal Kedaluwarsa: 30 November)', targetZone: 'belakang' },
                  ],
                  feedbackCorrect: 'Sempurna! Esensi dari FEFO adalah visibilitas. Barang dengan masa hidup paling pendek (expired terdekat) harus diletakkan paling depan agar diambil duluan oleh operator.',
                  feedbackWrong: 'Tertukar posisinya. Barang yang mau expired atau stok lama harus ditaruh paling depan agar selamat. Barang yang baru datang taruh di belakang/atas.',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: '3 Hukum Penyimpanan Gudang Industri',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Aturan Clearance (Jarak Bebas)',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Barang tidak boleh menyentuh dinding, lantai, atau atap secara langsung.<br><br>👉 <b>Minimal jarak 15 cm</b> dari dinding (untuk jalur tikus/hama agar bisa diinspeksi) dan selalu gunakan palet kayu/plastik.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Hirarki Rak (Atas-Bawah)',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p><b>Benda Cair & Berat</b> = Rak Paling Bawah.<br><b>Alergen (Susu, Kacang)</b> = Rak Paling Bawah.<br><br>👉 Tujuannya: Jika kemasan bocor/serbuk tumpah, tidak akan mengontaminasi barang lain di bawahnya.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Visual FEFO (Hadap Depan)',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Jangan biarkan operator mencari-cari tanggal expired seperti mencari harta karun.<br><br>👉 Label identitas dan tanggal expired <b>WAJIB dihadapkan ke lorong (depan)</b> agar langsung terbaca dari atas forklift.</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Rak Penuh) ────────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Rak Penuh',
                    labelColor: '#F39C12',
                    text: 'Tugas Anda adalah menempatkan 10 palet Tepung Tapioka ke dalam rak Blok A (Khusus Tepung).\n\nNamun, setelah memasukkan 8 palet, rak Blok A sudah penuh total. Sisa 2 palet lagi.\n\nApa tindakan yang paling sesuai prosedur?',
                  },
                  options: [
                    { id: 'A', icon: '📢', text: 'Letakkan sisa 2 palet di rak kosong blok lain (misal Blok Kemasan), pastikan label FEFO terlihat, dan update lokasi di Kartu Stok / Sistem ERP.', correct: true, feedback: 'Keputusan brilian! Di gudang yang padat, fleksibilitas lokasi diizinkan asalkan sistem pencatatan (bin card/ERP) langsung di-update agar barang tidak "hilang" dari pantauan FEFO.' },
                    { id: 'B', icon: '🚧', text: 'Taruh saja 2 palet tersebut di lorong jalan raya gudang sementara waktu.', correct: false, feedback: 'Salah. Menaruh barang di lorong akan menghalangi jalur evakuasi (safety hazard) dan lalu lintas forklift. Ini pelanggaran HSE yang berat.' },
                    { id: 'C', icon: '🧪', text: 'Tumpuk di atas rak bahan kimia karena kebetulan rak tersebut sedang kosong.', correct: false, feedback: 'Sangat fatal! Bahan baku pangan TIDAK BOLEH pernah disatukan di rak yang sama dengan bahan kimia pembersih/pelumas mesin.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Kontaminasi Silang) ───────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Risiko Tumpahan',
                    labelColor: '#F39C12',
                    text: 'Anda sedang membawa forklift berisi 1 Palet Drum Minyak Goreng dan 1 Palet Karung Gula Pasir.\n\nAnda tiba di rak vertikal tingkat 3 yang sedang kosong di lantai dasar dan lantai 2.\n\nBagaimana susunan rak yang paling aman?',
                  },
                  options: [
                    { id: 'A', icon: '🤷', text: 'Bebas ditaruh di mana saja asalkan label FIFO-nya menghadap ke depan.', correct: false, feedback: 'Salah. Meskipun label FEFO/FIFO penting, keselamatan dan pencegahan kontaminasi fisik harus didahulukan.' },
                    { id: 'B', icon: '❌', text: 'Drum minyak ditaruh di lantai 2, dan karung gula di lantai dasar.', correct: false, feedback: 'Sangat berbahaya! Jika drum minyak di lantai 2 bocor, minyaknya akan mengucur ke bawah dan merusak seluruh karung gula.' },
                    { id: 'C', icon: '✅', text: 'Drum minyak ditaruh di lantai dasar, dan karung gula ditaruh di lantai 2.', correct: true, feedback: 'Tepat sekali! Aturan baku pergudangan: Bahan cair harus selalu berada di rak paling bawah untuk mencegah kontaminasi jika terjadi kebocoran.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Lorong & Inspeksi) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Jarak Aman (Clearance)',
                    labelColor: '#F39C12',
                    text: 'Menjelang akhir tahun, stok bahan baku sangat melimpah.\n\nUntuk memaksimalkan ruang, Kepala Gudang memerintahkan agar palet-palet didorong mundur sampai menempel rapat ke dinding tembok pabrik.\n\nApakah instruksi ini bisa dibenarkan?',
                  },
                  options: [
                    { id: 'A', icon: '👍', text: 'Ya, ini inisiatif yang bagus agar lorong depan menjadi lebih luas untuk forklift.', correct: false, feedback: 'Salah. Kelonggaran lorong depan tidak boleh mengorbankan standar jarak aman dinding.' },
                    { id: 'B', icon: '🛑', text: 'Tidak. Palet wajib diberi jarak minimal 15-30cm dari dinding agar tikus tidak bersarang dan tim pest control bisa patroli.', correct: true, feedback: 'Jawaban sempurna! Garis putih di lantai (clearance line) dekat dinding berfungsi untuk jalur inspeksi hama dan sirkulasi udara (mencegah jamur).' },
                    { id: 'C', icon: '🧹', text: 'Ya, asalkan dinding temboknya baru saja dicat dan dipastikan bersih.', correct: false, feedback: 'Salah. Dinding bersih pun bisa mengembun (kondensasi) dan membuat kardus bahan baku lembab jika menempel langsung.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Visual Labeling) ──────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Visibilitas Label',
                    labelColor: '#F39C12',
                    text: 'Anda sedang melakukan patroli rutin di gudang.\n\nAnda melihat sebuah palet bahan aktif (API) di rak tinggi, namun label identitas dan tanggal expired-nya menghadap ke arah dinding belakang (tidak terlihat dari lorong).\n\nApa tindakan yang benar?',
                  },
                  options: [
                    { id: 'A', icon: '📄', text: 'Biarkan saja, selama data di sistem komputer sudah sesuai, barang tidak akan tertukar.', correct: false, feedback: 'Salah. Sistem sehebat apa pun akan gagal jika eksekusi fisik di lapangan buta visual. Operator bisa mengambil batch yang salah.' },
                    { id: 'B', icon: '✍️', text: 'Tulis ulang tanggal expired-nya di secarik kertas, lalu tempel di rak.', correct: false, feedback: 'Salah. Label tidak resmi (kertas coretan) tidak valid secara dokumen kualitas (GMP) dan mudah hilang tertiup angin.' },
                    { id: 'C', icon: '🔄', text: 'Minta operator forklift untuk menurunkan palet tersebut dan memutarnya agar label resmi menghadap ke lorong.', correct: true, feedback: 'Sangat tepat! Visual Management adalah kunci FEFO. Label harus langsung terbaca oleh mata tanpa operator harus memanjat rak atau menebak-nebak.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Penyimpanan Fisik Berhasil!',
                    insight: 'Kini Anda paham bahwa FEFO bukan hanya soal angka di komputer, melainkan posisi, tata letak, dan visibilitas di lantai gudang.',
                    icon: '🏗️',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Bahan cair & berat WAJIB di rak paling bawah.',
                      'Jangan tempelkan palet ke dinding (Jarak min 15 cm).',
                      'Barang yang mau Expired harus ditaruh paling depan.',
                      'Label identitas harus selalu menghadap ke lorong luar.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            },
            // ← PASTE MULAI DARI SINI ↓ (Di bawah penutup sub-lesson 2-N02)
            {
              id: "eksekusi-picking-outbound",
              title: "Eksekusi Picking & Outbound",
              icon: "🛒",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Prioritas Pengambilan) ────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Tentukan Prioritas Picking',
                    labelColor: '#F39C12',
                    text: 'Jika ada permintaan dari bagian Produksi, palet mana yang harus Anda ambil lebih dulu?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'ambil', label: '🟢 Ambil Duluan (FEFO)', subLabel: 'Prioritas Utama' },
                    { id: 'tahan', label: '🟠 Ambil Belakangan', subLabel: 'Simpan di Rak' },
                  ],
                  cards: [
                    { id: 'c1', icon: '⏳', text: 'Stok dengan sisa masa expired tinggal 1 bulan', targetZone: 'ambil' },
                    { id: 'c2', icon: '🚛', text: 'Barang yang baru saja datang dari supplier hari ini', targetZone: 'tahan' },
                    { id: 'c3', icon: '🅰️', text: 'Batch A (Diproduksi Januari 2026)', targetZone: 'ambil' },
                    { id: 'c4', icon: '🅱️', text: 'Batch B (Diproduksi Maret 2026)', targetZone: 'tahan' },
                    { id: 'c5', icon: '🔙', text: 'Barang retur dari produksi (kondisi utuh & Rilis QA)', targetZone: 'ambil' },
                    { id: 'c6', icon: '📦', text: 'Stok cadangan di area paling belakang (Expired masih lama)', targetZone: 'tahan' },
                  ],
                  feedbackCorrect: 'Sempurna! Barang yang sisa umurnya pendek, batch produksi lama, atau barang sisa produksi yang masih layak (rilis QA) harus segera diprioritaskan agar tidak jadi limbah.',
                  feedbackWrong: 'Ada yang terbalik. Ingat, FEFO berarti barang lama atau yang umurnya pendek harus keluar gudang duluan. Jangan simpan barang sisa terlalu lama.',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Validasi Dokumen Picking) ─────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Validasi Fisik vs Dokumen',
                    labelColor: '#F39C12',
                    text: 'Saat melakukan picking, pastikan fisik barang sesuai dengan "Picking List". Mana yang valid?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'valid', label: '✅ Valid (Siap Pick)', subLabel: 'Fisik = Dokumen' },
                    { id: 'invalid', label: '❌ Invalid (Stop!)', subLabel: 'Ada Ketidaksesuaian' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📄', text: 'Nomor Batch di fisik sama dengan yang tercetak di Picking List', targetZone: 'valid' },
                    { id: 'c2', icon: '❓', text: 'Sistem meminta Batch A, tapi Anda mengambil Batch C karena lebih dekat', targetZone: 'invalid' },
                    { id: 'c3', icon: '🏷️', text: 'Barang berlabel Hijau (Rilis QA) sesuai permintaan PO', targetZone: 'valid' },
                    { id: 'c4', icon: '🛑', text: 'Kemasan terlihat sobek saat akan diangkat forklift', targetZone: 'invalid' },
                    { id: 'c5', icon: '📅', text: 'Tanggal kedaluwarsa di fisik sesuai dengan data sistem ERP', targetZone: 'valid' },
                    { id: 'c6', icon: '🤷', text: 'Mengambil barang tanpa mengecek nomor Batch karena buru-buru', targetZone: 'invalid' },
                  ],
                  feedbackCorrect: 'Sangat teliti! Picking bukan sekadar ambil barang, tapi proses verifikasi. Jika ada ketidaksesuaian (beda batch, kemasan rusak), jangan diteruskan ke produksi.',
                  feedbackWrong: 'Ada yang salah. Mengabaikan dokumen atau mengambil barang secara acak adalah pelanggaran berat dalam sistem manajemen gudang.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Aksi Saat Fisik Terhalang) ────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Solusi Hambatan Lapangan',
                    labelColor: '#F39C12',
                    text: 'Seringkali barang ber-FEFO ada di belakang barang baru. Apa keputusan Anda?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'gmp', label: '🟢 Solusi Sesuai GMP', subLabel: 'Disiplin FEFO' },
                    { id: 'fatal', label: '🔴 Pelanggaran', subLabel: 'Cara Pintas (Jalan Tikus)' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🏗️', text: 'Pindahkan sementara palet di depan untuk mengambil palet lama di belakang', targetZone: 'gmp' },
                    { id: 'c2', icon: '🙈', text: 'Ambil saja palet terdepan (barang baru) supaya tidak repot', targetZone: 'fatal' },
                    { id: 'c3', icon: '📝', text: 'Coret Picking List secara sepihak dan ganti dengan nomor batch yang mudah diambil', targetZone: 'fatal' },
                    { id: 'c4', icon: '🧹', text: 'Kembalikan posisi palet depan ke tempat semula setelah palet belakang terambil', targetZone: 'gmp' },
                    { id: 'c5', icon: '⚖️', text: 'Paksa bagian produksi menerima barang umur panjang walau minta yang pendek', targetZone: 'fatal' },
                    { id: 'c6', icon: '📢', text: 'Lapor ke atasan jika lorong terlalu padat untuk melakukan manuver FIFO', targetZone: 'gmp' },
                  ],
                  feedbackCorrect: 'Luar biasa! Disiplin adalah kunci. Meskipun repot harus menurunkan palet lain terlebih dahulu, prosedur FEFO tidak boleh dilanggar demi alasan "menghemat waktu".',
                  feedbackWrong: 'Hati-hati. Cara pintas (mengganti dokumen sendiri atau mengambil barang terdepan yang salah) akan merusak keakuratan stok sistem pabrik Anda.',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Persiapan Pengiriman / Outbound) ──
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Inspeksi Final di Pintu Outbound',
                    labelColor: '#F39C12',
                    text: 'Sebelum barang dimuat ke truk pelanggan, inspeksi apa saja yang Anda lakukan?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'lolos', label: '✅ Lolos Cek (Muat)', subLabel: 'Kondisi Sempurna' },
                    { id: 'tahan', label: '❌ Tahan (Jangan Muat)', subLabel: 'Risiko Selama Transit' },
                  ],
                  cards: [
                    { id: 'c1', icon: '✨', text: 'Boks truk bersih, kering, dan bebas dari bau menyengat', targetZone: 'lolos' },
                    { id: 'c2', icon: '🐟', text: 'Truk ekspedisi bau amis bekas mengangkut ikan laut kemarin', targetZone: 'tahan' },
                    { id: 'c3', icon: '🧊', text: 'Suhu chiller truk sudah mencapai 4°C sebelum barang dimasukkan', targetZone: 'lolos' },
                    { id: 'c4', icon: '☔', text: 'Kanopi truk bocor saat hujan turun dengan lebat', targetZone: 'tahan' },
                    { id: 'c5', icon: '📝', text: 'Dokumen pengiriman (Surat Jalan/DO) sudah ditandatangani Checker', targetZone: 'lolos' },
                    { id: 'c6', icon: '📦', text: 'Palet kayu terlihat patah di bagian bawahnya', targetZone: 'tahan' },
                  ],
                  feedbackCorrect: 'Tepat! Tanggung jawab FEFO dan Kualitas bukan hanya di dalam rak, tapi sampai barang masuk ke truk dengan aman. Truk bau dan bocor akan merusak produk.',
                  feedbackWrong: 'Ada yang tertukar. Jangan pernah memuat barang pangan ke truk yang bau, kotor, atau memiliki suhu yang belum sesuai standar (chiller).',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: '3 Langkah Emas Picking (Pengambilan)',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Verifikasi Data (Scan/Cek Fisik)',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Jangan cuma melihat merek/nama barang. <b>Wajib cocokkan Nomor Batch dan Tanggal Expired</b> antara Picking List dengan fisik barang. Jika beda 1 angka, itu adalah barang yang salah!</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Inspeksi Visual Terakhir',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Operator Picking adalah benteng pertahanan terakhir. Walaupun barang itu FEFO-nya benar, jika saat mau diambil kemasannya ternyata bocor/rusak, <b>tahan barang tersebut dan ganti dengan stok sebelahnya</b>.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Penanganan Sisa Material',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Jika produksi hanya meminta 10kg dari sak ukuran 25kg, <b>segel ulang sisa barang dengan rapat</b>, tempelkan label "Sisa" lengkap dengan nomor Batch aslinya, lalu kembalikan ke rak.</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Akses Fisik Terhalang) ────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Dilema Operator',
                    labelColor: '#F39C12',
                    text: 'Anda membawa Picking List yang meminta Batch X (Sisa umur 1 bulan).\n\nNamun, di lorong rak, Palet Batch X berada terhalang di belakang 2 Palet Batch Y (Barang baru tiba, sisa umur 2 tahun).\n\nApa tindakan yang paling sesuai prosedur?',
                  },
                  options: [
                    { id: 'A', icon: '🤷', text: 'Ambil saja Batch Y yang di depan agar cepat selesai, lalu lapor atasan belakangan.', correct: false, feedback: 'Salah. Ini adalah pelanggaran FEFO. Memilih cara mudah akan membuat Batch X membusuk di gudang karena tidak pernah terambil.' },
                    { id: 'B', icon: '🏗️', text: 'Turunkan sementara 2 Palet Batch Y, ambil Palet Batch X, lalu kembalikan Batch Y ke posisinya semula.', correct: true, feedback: 'Tepat sekali! Meskipun membutuhkan waktu dan usaha ekstra (double handling), ini adalah eksekusi FEFO yang profesional dan menyelamatkan aset perusahaan.' },
                    { id: 'C', icon: '📞', text: 'Hubungi tim Produksi untuk memaksa mereka menggunakan Batch Y saja hari ini.', correct: false, feedback: 'Salah. Produksi tidak memiliki otoritas untuk melanggar aturan FEFO Gudang hanya demi kenyamanan fisik.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Selisih Sistem) ───────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Error Dokumen',
                    labelColor: '#F39C12',
                    text: 'Dokumen Picking meminta Anda mengambil Susu Bubuk Batch 001 (sesuai arahan komputer ERP).\n\nNamun, saat tiba di rak, Anda melihat secara fisik masih ada Batch 000 (lebih lama) yang tersisa 3 sak dan belum diambil.\n\nApa tindakan Anda?',
                  },
                  options: [
                    { id: 'A', icon: '👀', text: 'Abaikan temuan fisik, tetap ambil Batch 001 karena itu yang tertulis di dokumen.', correct: false, feedback: 'Kurang tepat. Meskipun secara administratif Anda "benar mengikuti kertas", secara kualitas Anda membiarkan Batch 000 expired.' },
                    { id: 'B', icon: '🤫', text: 'Ambil Batch 000 secara diam-diam, tidak usah mengubah dokumen apa pun agar cepat.', correct: false, feedback: 'Pelanggaran Fatal! Fisik dan dokumen akan selisih. Ini akan menghancurkan traceability (keterlacakan) produk secara sistem.' },
                    { id: 'C', icon: '🛑', text: 'Stop picking sementara, lapor Admin Gudang/PPIC agar sistem ERP dikoreksi dan mencetak ulang kertas untuk Batch 000.', correct: true, feedback: 'Jawaban Emas! Jika komputer salah, betulkan komputernya. Selalu gunakan barang terlama (Batch 000) dan pastikan data sistem dikoreksi agar sinkron dengan fisik (GMP).' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Permintaan Eceran) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Eceran (Parsial)',
                    labelColor: '#F39C12',
                    text: 'Produksi meminta Bumbu Kari sebanyak 5 kg. Di gudang, bumbu tersebut dikemas dalam karung tersegel pabrik berukuran 25 kg.\n\nSetelah Anda menimbang dan memberikan 5 kg, apa yang harus dilakukan pada sisa 20 kg bumbu di karung?',
                  },
                  options: [
                    { id: 'A', icon: '🏷️', text: 'Segel ulang (seal) karungnya, beri label identitas parsial/sisa yang memuat no batch & expired asli, lalu simpan kembali.', correct: true, feedback: 'Sangat Tepat! Bahan yang sudah dibuka (open shelf-life) wajib disegel ulang dan dilabeli agar tidak terkontaminasi dan FEFO tetap bisa dilacak.' },
                    { id: 'B', icon: '🗑️', text: 'Buang saja sisa 20 kg tersebut, karena kemasan pabrik sudah terlanjur dibuka/rusak.', correct: false, feedback: 'Salah. Membuang bahan baku bagus yang masih bisa dipakai adalah pemborosan fatal bernilai jutaan rupiah.' },
                    { id: 'C', icon: '💨', text: 'Lipat saja mulut karungnya seadanya dan taruh kembali di rak agar cepat.', correct: false, feedback: 'Sangat berbahaya! Lipatan seadanya membuat bumbu terekspos udara (menggumpal/lembab) dan mengundang tikus/serangga.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Pintu Pengiriman) ─────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Kualitas Truk Ekspedisi',
                    labelColor: '#F39C12',
                    text: 'Barang sudah 100% FEFO dan akan dimuat (Outbound) ke truk untuk dikirim ke Supermarket.\n\nSaat pintu boks truk dibuka, Anda mencium bau sangat amis (bekas angkutan ikan laut) dan lantainya basah tergenang air.\n\nApa keputusan Anda?',
                  },
                  options: [
                    { id: 'A', icon: '🌬️', text: 'Minta sopir membuka pintu truk lebar-lebar selama 10 menit agar baunya hilang, lalu muat barang.', correct: false, feedback: 'Salah. Bau menyengat dan genangan air berpotensi membawa bakteri berbahaya yang tidak akan hilang hanya dengan diangin-anginkan 10 menit.' },
                    { id: 'B', icon: '🛑', text: 'Tolak (Reject) truk tersebut secara tegas. Minta Vendor Ekspedisi mengirimkan armada pengganti yang bersih dan kering.', correct: true, feedback: 'Keputusan Integritas! Jangan biarkan kerja keras Anda menjaga kualitas dan FEFO di gudang hancur gara-gara produk terkontaminasi silang di dalam truk yang kotor.' },
                    { id: 'C', icon: '📦', text: 'Bungkus palet barang Anda dengan plastik stretch-film ekstra tebal lalu paksakan muat.', correct: false, feedback: 'Risiko terlalu tinggi. Plastik wrap memiliki pori mikro; bau amis ikan sangat mungkin menembus kardus dan mencemari produk Anda.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Picking & Outbound Selesai!',
                    insight: 'Anda telah berhasil mengeksekusi langkah paling kritis. Ketelitian saat Picking adalah jaminan mutu produk yang sampai di tangan konsumen.',
                    icon: '🛒',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Picking adalah verifikasi: Cocokkan Fisik dengan Dokumen.',
                      'Jangan malas membongkar palet demi mengambil barang FEFO.',
                      'Jika sistem dan fisik selisih, koreksi sistemnya.',
                      'Tolak truk pengiriman jika kotor, bau, atau bocor.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            }
            // ← SAMPAI SINI

          ]
        },
        {
          id: "fifo-di-area-produksi",
          title: "FIFO di Area Produksi",
          icon: "🏭",
          color: "#D35400",
          subLessons: [

            // Sub-lesson untuk Modul 3 nanti dimasukkan ke sini
            // ← PASTE MULAI DARI SINI ↓
            {
              id: "verifikasi-serah-terima-bahan",
              title: "Verifikasi & Serah Terima Bahan Baku",
              icon: "🤝",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Keputusan Terima vs Tolak) ────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Audit Serah Terima dari Gudang',
                    labelColor: '#F39C12',
                    text: 'Tim Gudang membawa palet bahan baku ke pintu Produksi. Mana yang Anda Terima vs Tolak?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'terima', label: '✅ Terima & Proses', subLabel: 'Sesuai Standar Produksi' },
                    { id: 'tolak', label: '❌ Tolak (Retur Gudang)', subLabel: 'Ada Ketidaksesuaian' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🟢', text: 'Barang berlabel Hijau (Rilis QA) utuh', targetZone: 'terima' },
                    { id: 'c2', icon: '❓', text: 'Nomor Batch di dokumen BEDA dengan fisik barang', targetZone: 'tolak' },
                    { id: 'c3', icon: '📅', text: 'Sisa expired 1 hari, padahal proses fermentasi butuh 3 hari', targetZone: 'tolak' },
                    { id: 'c4', icon: '📄', text: 'Fisik bersih, segel rapat, dan dokumen serah terima lengkap', targetZone: 'terima' },
                    { id: 'c5', icon: '🟡', text: 'Gudang membawa barang yang masih berlabel Kuning (Karantina)', targetZone: 'tolak' },
                    { id: 'c6', icon: '⚖️', text: 'Jumlah fisik yang dibawa sesuai dengan formulir permintaan produksi', targetZone: 'terima' },
                  ],
                  feedbackCorrect: 'Luar biasa! Produksi adalah pertahanan terakhir. Jangan pernah menerima barang beda batch, berlabel kuning (belum lulus QA), atau yang usianya lebih pendek dari siklus produksi Anda.',
                  feedbackWrong: 'Ada yang keliru. Ingat, operator produksi berhak menolak bahan jika dokumen/batch tidak cocok atau barang belum berstatus RILIS (Hijau).',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Line Clearance / Kesiapan Area) ───
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Status Kesiapan Ruang Produksi',
                    labelColor: '#F39C12',
                    text: 'Sebelum barang dari gudang boleh masuk, cek area produksi Anda!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'clear', label: '🟢 Line Clearance OK', subLabel: 'Siap Produksi' },
                    { id: 'stop', label: '🔴 STOP Proses', subLabel: 'Risiko Kontaminasi Silang' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧹', text: 'Mesin sudah dibersihkan & ada label "Bersih" dari shift lalu', targetZone: 'clear' },
                    { id: 'c2', icon: '🗑️', text: 'Sisa produk dari batch sebelumnya masih tertinggal di meja', targetZone: 'stop' },
                    { id: 'c3', icon: '⚖️', text: 'Timbangan digital belum dikalibrasi pagi ini', targetZone: 'stop' },
                    { id: 'c4', icon: '📝', text: 'Dokumen Batch Record (Catatan Pengolahan) sudah disiapkan', targetZone: 'clear' },
                    { id: 'c5', icon: '🏷️', text: 'Ada bahan baku tepung tidak berlabel tertinggal di sudut ruangan', targetZone: 'stop' },
                    { id: 'c6', icon: '✨', text: 'Lantai dan area kerja bebas dari sampah atau tumpahan air', targetZone: 'clear' },
                  ],
                  feedbackCorrect: 'Sangat teliti! Memastikan area bersih dari sisa produk sebelumnya (Line Clearance) sangat vital untuk mencegah kontaminasi silang dan campur baur batch.',
                  feedbackWrong: 'Cek lagi. Area tidak boleh ada sisa bahan lama, timbangan belum kalibrasi, atau material tanpa label. Itu semua risiko fatal penolakan produk.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Bahan Baku vs WIP) ────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Klasifikasi Jenis Material',
                    labelColor: '#F39C12',
                    text: 'Bedakan mana yang Bahan Baku murni dan mana Bahan Antara (WIP/Work in Progress)!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'baku', label: '📦 Bahan Baku (Raw Material)', subLabel: 'Dari Gudang/Supplier' },
                    { id: 'wip', label: '🥣 Bahan Antara (WIP)', subLabel: 'Sedang Diproses/Dirakit' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🥛', text: 'Susu cair segar baru turun dari truk gudang', targetZone: 'baku' },
                    { id: 'c2', icon: '🍞', text: 'Adonan roti yang sedang diistirahatkan (proofing) 2 jam', targetZone: 'wip' },
                    { id: 'c3', icon: '💊', text: 'Granul obat yang menunggu jadwal pencetakan tablet', targetZone: 'wip' },
                    { id: 'c4', icon: '🌾', text: 'Tepung terigu di dalam karung segel pabrik', targetZone: 'baku' },
                    { id: 'c5', icon: '🍯', text: 'Gula cair (sirup) hasil pelarutan oleh shift pagi', targetZone: 'wip' },
                    { id: 'c6', icon: '🧂', text: 'Garam industri 50kg dari vendor', targetZone: 'baku' },
                  ],
                  feedbackCorrect: 'Tepat! WIP (Work in Progress) adalah bahan baku yang sudah Anda buka, campur, atau olah sebagian. WIP memiliki batas kedaluwarsa yang jauh lebih singkat dari bahan baku utuh!',
                  feedbackWrong: 'Ada yang terbalik. Jika barang sudah diolah/dicampur di area produksi (seperti adonan atau larutan), statusnya berubah menjadi WIP (Bahan Antara).',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Integritas Shift) ─────────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Etika Pergantian Shift',
                    labelColor: '#F39C12',
                    text: 'Tindakan apa yang aman saat serah terima WIP ke shift berikutnya?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'aman', label: '🟢 Aman & Profesional', subLabel: 'Sesuai SOP Produksi' },
                    { id: 'bahaya', label: '🔴 Bahaya / Pelanggaran', subLabel: 'Risiko Kerusakan' },
                  ],
                  cards: [
                    { id: 'c1', icon: '✍️', text: 'Menandatangani logbook serah terima sisa bahan dengan jelas', targetZone: 'aman' },
                    { id: 'c2', icon: '🙈', text: 'Meninggalkan sisa adonan cair tanpa menempelkan label waktu', targetZone: 'bahaya' },
                    { id: 'c3', icon: '🗣️', text: 'Menginformasikan batas jam tunggu WIP kepada operator shift baru', targetZone: 'aman' },
                    { id: 'c4', icon: '🤫', text: 'Membuang adonan gagal ke tong sampah diam-diam agar tidak ditegur', targetZone: 'bahaya' },
                    { id: 'c5', icon: '🛑', text: 'Menutup wadah sisa bahan dengan rapat sebelum pulang', targetZone: 'aman' },
                    { id: 'c6', icon: '🌪️', text: 'Mencampur sisa adonan shift pagi ke adonan baru shift sore', targetZone: 'bahaya' },
                  ],
                  feedbackCorrect: 'Sempurna! Komunikasi (Logbook & Labeling) adalah kunci. Jangan pernah meninggalkan bahan setengah jadi (WIP) tanpa identitas dan waktu pembuatan yang jelas.',
                  feedbackWrong: 'Tertukar. Meninggalkan WIP tanpa label waktu dan mencampur adonan lama ke baru adalah penyebab utama keracunan dan kegagalan FEFO di lantai produksi.',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: 'Aturan Verifikasi Lantai Produksi',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Line Clearance (Pembersihan Jalur)',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Sebelum bahan baku baru masuk, mesin dan meja <b>WAJIB 100% bersih</b> dari sisa produk sebelumnya.<br><br>👉 Tujuannya: Mencegah tercampurnya dua produk berbeda atau tereksposnya alergen (mix-up).</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Verifikasi 3 Titik',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Saat menerima dari Gudang, Operator Produksi wajib mencocokkan:<br>1. Dokumen Permintaan Produksi<br>2. Label Identitas/Batch di Fisik<br>3. Status Rilis QA (Label Hijau)<br><br>👉 Jika 1 saja tidak cocok, <b>TOLAK</b>.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Aturan Usia WIP (Work in Progress)',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Bahan baku yang kadaluwarsanya 2 tahun, jika sudah dilarutkan air/dicampur, kadaluwarsanya bisa berubah menjadi hanya <b>4 Jam</b>.<br><br>👉 WIP WAJIB diberi label jam pembuatan (Use-by Time).</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Serah Terima Beda Batch) ──────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Error Serah Terima',
                    labelColor: '#F39C12',
                    text: 'Proses Serah Terima Bahan:\n\nTim Gudang mengantar 5 sak Gula Pasir ke ruang penimbangan Produksi. Saat Anda cek, dokumen meminta Batch 001, tapi fisik yang dibawa Gudang adalah Batch 002.\n\nApa tindakan Anda sebagai operator produksi?',
                  },
                  options: [
                    { id: 'A', icon: '🤷', text: 'Pakai saja, sifat dan rasa gula kan sama saja dari batch mana pun.', correct: false, feedback: 'Salah. Ini merusak sistem pelacakan (traceability). Jika suatu saat ada komplain dari konsumen, data produksi dan gudang akan bertabrakan.' },
                    { id: 'B', icon: '✍️', text: 'Coret nomor batch di dokumen kertasnya dan ganti menjadi 002 agar sesuai fisik.', correct: false, feedback: 'Pelanggaran Fatal! Memanipulasi dokumen resmi CPOB/CPOB adalah fraud. Anda tidak boleh mengubah perintah produksi tanpa izin Manajer.' },
                    { id: 'C', icon: '🛑', text: 'Tolak penerimaan, minta Gudang mengambilkan Batch 001 sesuai dokumen.', correct: true, feedback: 'Jawaban Emas! Jika fisik dan dokumen berbeda, produksi berhak menolak. Ini adalah fungsi Verifikasi Ganda (Double Check) yang menyelematkan pabrik.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Pelabelan WIP) ────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Manajemen WIP',
                    labelColor: '#F39C12',
                    text: 'Manajemen Work in Progress (WIP):\n\nAnda baru saja mencairkan mentega cair dalam panci besar pada pukul 08:00 pagi. Menurut SOP, mentega cair hanya bertahan maksimal 4 jam di suhu ruang sebelum kualitasnya turun dan tengik.\n\nBagaimana cara pelabelan yang paling tepat?',
                  },
                  options: [
                    { id: 'A', icon: '🏷️', text: 'Tempel label identitas yang memuat tulisan "Dibuat: 08:00, Gunakan Sebelum: 12:00".', correct: true, feedback: 'Sangat Tepat! Ini disebut pelabelan "Use-by Time". Memberikan batas waktu pemakaian akan mencegah shift berikutnya memakai mentega yang sudah tengik.' },
                    { id: 'B', icon: '📝', text: 'Cukup beri label "Mentega Cair Pagi" agar shift selanjutnya tahu kalau itu sisa shift pagi.', correct: false, feedback: 'Salah. Kata "Pagi" sangat ambigu. Jam berapa tepatnya pagi itu? 07.00 atau 11.00? Standar mutu harus menggunakan angka spesifik.' },
                    { id: 'C', icon: '🧠', text: 'Tidak perlu label khusus, karena operator di area tersebut pasti ingat kalau itu mentega cair buatan pagi.', correct: false, feedback: 'Sangat berbahaya. Mengandalkan ingatan manusia adalah sumber error terbesar di pabrik. Bukti harus selalu tertulis.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Pencampuran Batch) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Dilema Pencampuran',
                    labelColor: '#F39C12',
                    text: 'Pencampuran Adonan:\n\nAnda sedang membuat adonan. Di meja terdapat sisa sedikit adonan (WIP) dari Batch A buatan 2 jam lalu, dan Anda baru saja selesai mengadon Batch B yang baru.\n\nApa yang boleh Anda lakukan berdasarkan standar keamanan pangan?',
                  },
                  options: [
                    { id: 'A', icon: '🌪️', text: 'Campur saja sisa Batch A dan Batch B agar mempercepat kerja dan tidak ada yang mubazir.', correct: false, feedback: 'Salah besar! Jika Anda mencampur WIP lama ke WIP baru, seluruh Batch B Anda akan "tertular" umur kedaluwarsa Batch A yang lebih pendek.' },
                    { id: 'B', icon: '🧱', text: 'Jangan dicampur! Proses sisa Batch A sampai habis, lalu bersihkan alat, baru mulai proses Batch B.', correct: true, feedback: 'Keputusan Tepat! Pemisahan batch (Clearance) mencegah kontaminasi silang umur produk. Habiskan yang lama (FEFO), baru mulai yang baru.' },
                    { id: 'C', icon: '🗑️', text: 'Buang saja Batch A karena jumlahnya tanggung, langsung operasikan Batch B.', correct: false, feedback: 'Pemborosan! Jika Batch A masih dalam rentang waktu yang diizinkan (belum expired), wajib diproses sampai habis agar perusahaan tidak rugi.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Retur Produksi) ───────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Retur Sisa Bahan',
                    labelColor: '#F39C12',
                    text: 'Retur Bahan ke Gudang:\n\nProduksi hari ini sudah selesai. Anda masih memiliki sisa 10 kg Bumbu Tabur di dalam kantong plastik sekunder (dipindahkan dari karung aslinya yang besar).\n\nAnda ingin meretur bumbu ini ke Gudang. Apa syarat utamanya?',
                  },
                  options: [
                    { id: 'A', icon: '🏃', text: 'Tinggal taruh saja di lorong gudang agar besok pagi diambil orang gudang.', correct: false, feedback: 'Salah. Meninggalkan bahan di lorong tanpa serah terima resmi berpotensi hilang atau terekspos hama tikus malam hari.' },
                    { id: 'B', icon: '🤷', text: 'Bawa kembali ke gudang tanpa identitas, toh orang gudang sudah tahu itu bumbu tabur.', correct: false, feedback: 'Salah. Bumbu tanpa identitas batch dan expired adalah "Barang Liar". Gudang akan kebingungan mem-FEFO-kan barang ini besok.' },
                    { id: 'C', icon: '📋', text: 'Masukkan ke wadah tertutup, tempel Label Retur (berisi Nama Bahan & No Batch asli), lalu serah terima resmi ke Gudang.', correct: true, feedback: 'Luar biasa! Identitas asal (Batch) wajib dipertahankan sampai sisa bahan yang terkecil. Serah terima resmi menjaga stok sistem dan fisik tetap sinkron.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Verifikasi Produksi Selesai!',
                    insight: 'Anda telah memahami bahwa Operator Produksi adalah filter terakhir sebelum bahan diubah menjadi produk siap jual.',
                    icon: '🏭',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Produksi berhak MENOLAK barang gudang yang beda dokumen/batch.',
                      'Line Clearance (Area Bersih) wajib dilakukan sebelum produksi mulai.',
                      'WIP memiliki umur jauh lebih pendek dari bahan baku mentah.',
                      'Jangan campur dua batch adonan/WIP yang berbeda waktu pembuatannya.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            },
            // ← PASTE MULAI DARI SINI ↓ (Di bawah penutup sub-lesson 3-N01)
            {
              id: "manajemen-wip-ketelusuran-batch",
              title: "Manajemen WIP & Ketelusuran Batch",
              icon: "🔄",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Kelayakan WIP) ────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Audit Kelayakan WIP (Bahan Antara)',
                    labelColor: '#F39C12',
                    text: 'Anda melihat kondisi bahan setengah jadi (WIP) di area kerja. Tentukan mana yang boleh diproses!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'aman', label: '🟢 Aman Diproses', subLabel: 'Sesuai Standar Mutu' },
                    { id: 'bahaya', label: '🔴 Tahan / Buang', subLabel: 'Risiko Kualitas Fatal' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📝', text: 'WIP memiliki label lengkap dengan batas Jam Pakai (Use-By)', targetZone: 'aman' },
                    { id: 'c2', icon: '🌬️', text: 'Adonan sisa shift kemarin dibiarkan terbuka di atas meja', targetZone: 'bahaya' },
                    { id: 'c3', icon: '⏳', text: 'WIP yang batas waktu pakainya (Use-By) sudah lewat 15 menit', targetZone: 'bahaya' },
                    { id: 'c4', icon: '🥣', text: 'Campuran basah yang baru dibuat 1 jam lalu & tertutup rapat', targetZone: 'aman' },
                    { id: 'c5', icon: '🌪️', text: 'Dua batch WIP berbeda dicampur agar wadahnya cukup', targetZone: 'bahaya' },
                    { id: 'c6', icon: '🧊', text: 'WIP disimpan di chiller sesuai SOP sambil menunggu antrean mesin', targetZone: 'aman' },
                  ],
                  feedbackCorrect: 'Luar biasa! WIP (bahan yang sudah diolah/dicampur) sangat rentan rusak. Jika lewat batas waktu (Use-By), dibiarkan terbuka, atau dicampur beda batch, barang tersebut sudah cacat mutu.',
                  feedbackWrong: 'Ada yang terbalik. WIP yang lewat jam pakai atau dibiarkan terbuka adalah tempat berkembang biaknya bakteri. Jangan pernah diproses!',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Kontaminasi Silang) ─────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Pencegahan Kontaminasi Silang (Mix-Up)',
                    labelColor: '#F39C12',
                    text: 'Evaluasi kebiasaan kerja di lantai produksi ini!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'benar', label: '✅ Standar GMP', subLabel: 'Mencegah Mix-Up' },
                    { id: 'salah', label: '❌ Pelanggaran', subLabel: 'Memicu Mix-Up' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🧹', text: 'Membersihkan meja dan mesin secara total sebelum ganti varian', targetZone: 'benar' },
                    { id: 'c2', icon: '🥄', text: 'Memakai sekop (scoop) yang sama untuk menimbang 3 bumbu berbeda', targetZone: 'salah' },
                    { id: 'c3', icon: '📏', text: 'Memberi jarak fisik yang jauh antar wadah jika ada 2 varian di satu ruangan', targetZone: 'benar' },
                    { id: 'c4', icon: '🧂', text: 'Meletakkan 2 jenis bubuk putih yang mirip tanpa label bersebelahan', targetZone: 'salah' },
                    { id: 'c5', icon: '📋', text: 'Memastikan hanya ada SATU dokumen Batch Record di atas meja kerja', targetZone: 'benar' },
                    { id: 'c6', icon: '🏷️', text: 'Meninggalkan tumpukan label kemasan dari produk shift kemarin', targetZone: 'salah' },
                  ],
                  feedbackCorrect: 'Sangat teliti! Mencampur alat (sekop), meletakkan bahan tanpa label bersebelahan, dan meninggalkan sisa kemasan lama adalah penyebab utama produk salah kemas atau alergen tercampur.',
                  feedbackWrong: 'Cek lagi. Alat (seperti sekop) harus beda untuk tiap bahan. Label/kemasan sisa harus disingkirkan (Line Clearance) agar tidak tertukar.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Perlakuan Material Sisa) ─────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'Pengelolaan Sisa Bahan di Akhir Shift',
                    labelColor: '#F39C12',
                    text: 'Di akhir produksi, ada sisa bahan. Ke mana arah yang benar?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'retur', label: '🔙 Retur Gudang', subLabel: 'Dikembalikan Resmi' },
                    { id: 'buang', label: '🗑️ Masukkan Limbah', subLabel: 'Jangan Dipakai Lagi' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📦', text: 'Sisa botol kemasan kosong yang bersih dan belum terpakai', targetZone: 'retur' },
                    { id: 'c2', icon: '🧹', text: 'Tepung yang tumpah berserakan di atas lantai', targetZone: 'buang' },
                    { id: 'c3', icon: '🔒', text: 'Sisa karung gula yang sudah disegel ulang, bersih, dan berlabel', targetZone: 'retur' },
                    { id: 'c4', icon: '💦', text: 'Sisa pewarna makanan yang tanpa sengaja kecipratan air keran', targetZone: 'buang' },
                    { id: 'c5', icon: '🧂', text: 'Bumbu utuh dalam kemasan pabrik yang belum dibuka sama sekali', targetZone: 'retur' },
                    { id: 'c6', icon: '⏳', text: 'Sisa adonan basah yang sudah melewati batas waktu aman (Use-by)', targetZone: 'buang' },
                  ],
                  feedbackCorrect: 'Tepat sekali! Hanya barang bersih, tersegel utuh, dan beridentitas jelas yang boleh kembali ke gudang. Barang yang jatuh, terkontaminasi air, atau expired wajib dibuang.',
                  feedbackWrong: 'Ada yang salah. Jika barang menyentuh lantai (tumpah) atau terkontaminasi cipratan, ia sudah menjadi limbah pangan. Dilarang mereturnya!',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Keputusan Berhenti / Lanjut) ───────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Keputusan Kritis Operator',
                    labelColor: '#F39C12',
                    text: 'Sebagai operator di lini mesin, apa tindakan Anda terhadap anomali ini?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'lanjut', label: '🟢 Lanjut Proses', subLabel: 'Kondisi Normal' },
                    { id: 'stop', label: '🛑 Hentikan Mesin', subLabel: 'Segera Lapor Atasan' },
                  ],
                  cards: [
                    { id: 'c1', icon: '⚙️', text: 'Terdengar bunyi gesekan logam yang kasar dari dalam mesin mixer', targetZone: 'stop' },
                    { id: 'c2', icon: '✅', text: 'Semua bahan sesuai resep dan Line Clearance sudah disetujui QA', targetZone: 'lanjut' },
                    { id: 'c3', icon: '🌡️', text: 'Suhu ruangan produksi tiba-tiba sangat panas karena AC sentral mati', targetZone: 'stop' },
                    { id: 'c4', icon: '📊', text: 'Parameter kecepatan mesin pemotong sudah sesuai lembar validasi', targetZone: 'lanjut' },
                    { id: 'c5', icon: '🧩', text: 'Menemukan serpihan plastik biru di dalam tangki adonan', targetZone: 'stop' },
                    { id: 'c6', icon: '🎨', text: 'Warna campuran bahan tiba-tiba terlihat jauh lebih gelap dari standar', targetZone: 'stop' },
                  ],
                  feedbackCorrect: 'Sempurna! Anda memiliki *Quality Awareness* yang tinggi. Jika ada anomali mesin, suhu ekstrem, apalagi benda asing (plastik/logam), JANGAN diteruskan. Hentikan dan lapor!',
                  feedbackWrong: 'Hati-hati. Jika mesin bunyi aneh (potensi gram besi jatuh), warna beda, atau ada plastik, itu adalah kontaminasi fisik yang sangat berbahaya. Wajib STOP mesin!',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: '3 Aturan Emas Traceability (Ketelusuran)',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Identitas Tidak Boleh Putus',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Saat Anda mengeluarkan tepung dari karung aslinya dan memindahkannya ke ember plastik, <b>Ember tersebut WAJIB diberi label Identitas & Nomor Batch</b> yang menyalin dari karung aslinya.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Hukum Larangan "Oplosan"',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p><b>Satu Wadah = Satu Batch.</b><br>Jangan pernah menuangkan sisa bahan dari Batch A ke dalam wadah yang berisi bahan Batch B hanya untuk menghemat tempat. Ini menghancurkan silsilah produk!</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Batas Waktu WIP Terbuka',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Garam dalam kemasan pabrik bisa tahan 2 tahun. Tapi jika karungnya sudah Anda buka di suhu ruang yang lembab, <i>Open Shelf Life</i>-nya mungkin berubah menjadi hitungan hari. Patoki standar Use-By perusahaan Anda.</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Waktu Tunggu WIP) ────────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Waktu Tunggu WIP',
                    labelColor: '#F39C12',
                    text: 'Susu cair segar sudah dikeluarkan dari kemasannya dan dimasukkan ke tangki antrean (WIP). Standar batas amannya di suhu ruang adalah 2 Jam.\n\nNamun, karena mesin pengemas mendadak rusak, susu tersebut sudah tertahan di tangki selama 3 Jam.\n\nApa tindakan Anda selanjutnya?',
                  },
                  options: [
                    { id: 'A', icon: '🤷', text: 'Pakai saja segera setelah mesin menyala, tambahkan sedikit ekstra perisa menutupi rasa asam.', correct: false, feedback: 'Pelanggaran Fatal! Menutupi rasa rusak dengan perisa adalah pemalsuan (fraud) dan tidak akan membunuh bakteri yang sudah berkembang biak.' },
                    { id: 'B', icon: '❄️', text: 'Segera pindahkan susu itu ke dalam Freezer agar bakterinya mati, lalu pakai besok.', correct: false, feedback: 'Salah. Suhu dingin/freezer TIDAK membunuh bakteri, hanya menidurkannya. Karena susu sudah lewat batas aman, racun mikrobanya sudah terbentuk.' },
                    { id: 'C', icon: '🗑️', text: 'Lapor QA dan buang susu tersebut sebagai limbah produksi (Reject).', correct: true, feedback: 'Tepat dan Berintegritas! Susu yang melewati Open Shelf-life (batas aman WIP terbuka) sudah menjadi sarang patogen. Jangan ambil risiko keracunan massal.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Penggunaan Alat) ───────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Alat Penimbangan',
                    labelColor: '#F39C12',
                    text: 'Anda bertugas menimbang 3 jenis bahan untuk resep: Gula Halus, Susu Bubuk, dan Bubuk Ekstrak Kacang (Alergen).\n\nNamun, hanya ada 1 buah sekop (scoop) plastik bersih di meja timbangan.\n\nApa yang harus Anda lakukan?',
                  },
                  options: [
                    { id: 'A', icon: '✋', text: 'Stop aktivitas, pergi ke ruang alat dan minta 2 sekop tambahan agar setiap bahan punya sekop sendiri.', correct: true, feedback: 'Sempurna! Standar GMP adalah "Satu Alat untuk Satu Bahan". Apalagi ada Alergen (Kacang). Memakai sekop bergantian akan memicu Kontaminasi Silang yang sangat berbahaya.' },
                    { id: 'B', icon: '💨', text: 'Pakai 1 sekop itu bergantian, asalkan ditiup atau dilap dengan tisu kering setiap kali ganti bahan.', correct: false, feedback: 'Sangat salah! Debu mikroskopis alergen kacang tidak akan hilang hanya dengan ditiup atau dilap tisu kering.' },
                    { id: 'C', icon: '🧤', text: 'Pakai tangan kosong yang sudah memakai sarung tangan karet agar tidak repot membasuh alat.', correct: false, feedback: 'Salah. Menjumput bahan curah langsung dengan tangan (meski pakai sarung tangan) tidak higienis dan takarannya tidak akan presisi.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Dokumen Meja) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Transisi Produk',
                    labelColor: '#F39C12',
                    text: 'Produksi Varian Cokelat baru saja selesai. Sepuluh menit lagi Anda akan memulai proses untuk Varian Stroberi.\n\nDokumen instruksi kerja (Batch Record) Varian Cokelat beserta pulpennya masih tergeletak di atas meja Anda.\n\nLangkah pertama apa yang wajib dilakukan?',
                  },
                  options: [
                    { id: 'A', icon: '📄', text: 'Biarkan saja di situ, tumpuk langsung dokumen Varian Stroberi di atasnya.', correct: false, feedback: 'Pelanggaran! Memiliki dua dokumen produk yang berbeda di satu meja sangat berisiko membuat Anda salah membaca resep (Mix-Up dokumen).' },
                    { id: 'B', icon: '🧹', text: 'Tutup dokumen Cokelat, serahkan ke atasan, bersihkan meja 100%, baru siapkan dokumen Stroberi.', correct: true, feedback: 'Tepat Sekali! Ini disebut Line Clearance (Pembersihan Jalur). Area fisik dan meja dokumen harus bersih total dari sisa produk lama sebelum memulai produk baru.' },
                    { id: 'C', icon: '🗑️', text: 'Buang dokumen Varian Cokelat ke tempat sampah agar meja terlihat bersih.', correct: false, feedback: 'Salah besar. Dokumen Batch Record adalah dokumen legal penjamin mutu produk. Itu wajib disimpan puluhan tahun, bukan dibuang!' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Insiden Tumpahan) ──────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Insiden Spill',
                    labelColor: '#F39C12',
                    text: 'Seorang operator tidak sengaja menyenggol meja. Satu ember berisi Bumbu Balado murni seberat 5 kg jatuh dan isinya tumpah berserakan ke lantai produksi.\n\nPadahal, lantai tersebut kebetulan baru saja dipel dengan disinfektan 30 menit yang lalu (terlihat sangat bersih).\n\nApa tindakan yang diperbolehkan?',
                  },
                  options: [
                    { id: 'A', icon: '🥄', text: 'Ambil bagian bumbu yang paling atas (yang tidak menyentuh lantai langsung) untuk diselamatkan.', correct: false, feedback: 'Salah. Kontaminasi bisa menyebar secara kasat mata. Jangan korbankan keselamatan konsumen demi menutupi kesalahan kerja.' },
                    { id: 'B', icon: '🧹', text: 'Sapu bersih kembali ke embernya agar perusahaan tidak rugi bahan mahal.', correct: false, feedback: 'Pelanggaran Fatal Keamanan Pangan! Barang jatuh = Limbah. Disinfektan lantai itu beracun (kimiawi) jika termakan, belum lagi kotoran telapak sepatu.' },
                    { id: 'C', icon: '🗑️', text: 'Segera sapu bumbu tersebut dan buang ke tong sampah limbah. Jangan dipakai lagi!', correct: true, feedback: 'Keputusan Emas! Bumbu sudah terkontaminasi bahaya fisik (kotoran sepatu) dan kimia (residu cairan pel lantai). Apapun alasannya, bahan jatuh wajib dibuang.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Manajemen Lini Produksi Selesai!',
                    insight: 'Anda telah berhasil melindungi produk dari risiko Mix-Up dan Kontaminasi Silang yang sangat mematikan di lantai produksi.',
                    icon: '🏭',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Barang setengah jadi (WIP) wajib pakai label Use-By.',
                      'Jangan campur/tuang sisa batch lama ke wadah batch baru.',
                      'Bersihkan total meja & mesin (Line Clearance) saat ganti varian.',
                      'Bahan pangan yang jatuh ke lantai = Limbah pasti.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            },
            // ← PASTE MULAI DARI SINI ↓ (Di bawah penutup sub-lesson 3-N02)
            {
              id: "pengemasan-serah-terima-barang-jadi",
              title: "Eksekusi Pengemasan & Barang Jadi",
              icon: "📦",
              duration: "5 menit",
              slides: [

                // ── SLIDE 1: TAP_CLASSIFY (Risiko Material Kemas) ────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '1',
                    label: 'Klasifikasi Material Kemas',
                    labelColor: '#F39C12',
                    text: 'Pengemasan punya tingkat risiko kontaminasi berbeda. Klasifikasikan kemasan berikut!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'primer', label: '🟢 Kemasan Primer', subLabel: 'Kontak Langsung Makanan' },
                    { id: 'sekunder', label: '📦 Kemasan Sekunder', subLabel: 'Kardus / Pelindung Luar' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🥫', text: 'Kaleng aluminium untuk daging sosis', targetZone: 'primer' },
                    { id: 'c2', icon: '🧻', text: 'Kardus luar pelindung botol sirup', targetZone: 'sekunder' },
                    { id: 'c3', icon: '🥤', text: 'Botol plastik PET untuk minuman', targetZone: 'primer' },
                    { id: 'c4', icon: '🏷️', text: 'Stiker label yang ditempel di luar kardus', targetZone: 'sekunder' },
                    { id: 'c5', icon: '🥡', text: 'Plastik vakum untuk membungkus sosis', targetZone: 'primer' },
                    { id: 'c6', icon: '🪶', text: 'Plastik stretch-film pembungkus palet', targetZone: 'sekunder' },
                  ],
                  feedbackCorrect: 'Tepat! Kemasan Primer menyentuh langsung makanan, jadi wajib diperlakukan higienis persis seperti bahan baku. Kemasan Sekunder hanya pelindung luar yang tidak bersentuhan dengan produk.',
                  feedbackWrong: 'Ada yang tertukar. Botol, plastik vakum, dan kaleng bersentuhan langsung dengan produk (Primer). Kardus dan stiker luar tidak (Sekunder).',
                },

                // ── SLIDE 2: TAP_CLASSIFY (Validasi Cetakan Inkjet) ──────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '2',
                    label: 'Validasi Cetakan Coding (Batch & ED)',
                    labelColor: '#F39C12',
                    text: 'Anda bertugas mengecek hasil cetakan tanggal kedaluwarsa di kemasan. Mana yang lolos?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'lolos', label: '✅ Lolos Cek (Pass)', subLabel: 'Boleh Masuk Kardus' },
                    { id: 'tolak', label: '❌ Tolak (Reject)', subLabel: 'Pisahkan / Karantina' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🖨️', text: 'Tanggal terbaca jelas, tebal, dan tinta tidak luntur', targetZone: 'lolos' },
                    { id: 'c2', icon: '🌫️', text: 'Tinta putus-putus, angka tahun (2026) terbaca seperti 2025', targetZone: 'tolak' },
                    { id: 'c3', icon: '📅', text: 'Nomor Batch yang tercetak sesuai dengan Dokumen Produksi hari ini', targetZone: 'lolos' },
                    { id: 'c4', icon: '💧', text: 'Tinta cetakan bleber (melebar) karena kemasan berminyak', targetZone: 'tolak' },
                    { id: 'c5', icon: '🔍', text: 'Posisi cetakan sedikit miring tapi semua angka terbaca 100% utuh', targetZone: 'lolos' },
                    { id: 'c6', icon: '✂️', text: 'Angka bulan terpotong di tepi kemasan (tidak terbaca penuh)', targetZone: 'tolak' },
                  ],
                  feedbackCorrect: 'Sangat teliti! Konsumen (dan BPOM) hanya percaya pada apa yang bisa mereka baca. Cetakan buram, terpotong, atau luntur adalah cacat mutu yang sangat fatal.',
                  feedbackWrong: 'Hati-hati. Walaupun isinya bagus, jika cetakan expired-nya luntur, terpotong, atau samar, produk tersebut wajib ditolak dan dikemas ulang.',
                },

                // ── SLIDE 3: TAP_CLASSIFY (Penanganan Sisa Kemasan) ──────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '3',
                    label: 'SOP Retur Sisa Bahan Kemas',
                    labelColor: '#F39C12',
                    text: 'Produksi selesai. Bagaimana perlakuan untuk kemasan yang tersisa?',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'gudang', label: '🔙 Retur ke Gudang', subLabel: 'Aman dipakai besok' },
                    { id: 'musnah', label: '✂️ Wajib Dirusak / Buang', subLabel: 'Risiko Pemalsuan' },
                  ],
                  cards: [
                    { id: 'c1', icon: '📦', text: 'Kardus luar polos tanpa cetakan apa pun', targetZone: 'gudang' },
                    { id: 'c2', icon: '🏷️', text: 'Stiker label yang SUDAH TERCETAK No. Batch hari ini', targetZone: 'musnah' },
                    { id: 'c3', icon: '🧻', text: 'Plastik botol kosong segel pabrik yang belum dipakai', targetZone: 'gudang' },
                    { id: 'c4', icon: '🥫', text: 'Kaleng yang penyok saat masuk rel mesin conveyor', targetZone: 'musnah' },
                    { id: 'c5', icon: '📜', text: 'Sisa plastik kemasan yang sudah ter-stempel Expired Date', targetZone: 'musnah' },
                    { id: 'c6', icon: '🧵', text: 'Sisa lakban bening untuk menutup kardus', targetZone: 'gudang' },
                  ],
                  feedbackCorrect: 'Sempurna! Aturan emasnya: Segala bentuk kemasan yang SUDAH TERCETAK identitas (Batch/Expired) wajib dihancurkan jika berlebih, agar tidak dipakai untuk mengemas barang kadaluwarsa (pemalsuan).',
                  feedbackWrong: 'Ada pelanggaran GMP. Kemasan polos boleh diretur ke gudang. Kemasan yang sudah tercetak Batch/Expired dilarang keras diretur, wajib dirusak/dibuang!',
                },

                // ── SLIDE 4: TAP_CLASSIFY (Status Barang Jadi) ───────────────
                {
                  type: 'tap_classify',
                  xp: 10,
                  scenario: {
                    icon: '4',
                    label: 'Status Serah Terima ke Gudang',
                    labelColor: '#F39C12',
                    text: 'Produk sudah dikarduskan dan ditaruh di atas palet. Tentukan statusnya!',
                  },
                  instruction: 'Tap kartu, lalu tap zona tujuannya.',
                  zones: [
                    { id: 'karantina', label: '🟡 Karantina FG (Gudang)', subLabel: 'Menunggu Rilis QA' },
                    { id: 'rilis', label: '🟢 Siap Jual (Gudang FG)', subLabel: 'Boleh Dikirim ke Toko' },
                  ],
                  cards: [
                    { id: 'c1', icon: '🏭', text: 'Produk yang baru saja keluar dari mesin packing sore ini', targetZone: 'karantina' },
                    { id: 'c2', icon: '✅', text: 'Sertifikat Analisis akhir sudah ditandatangani Manajer QA', targetZone: 'rilis' },
                    { id: 'c3', icon: '🔬', text: 'Sampel produk masih ditahan 3 hari di inkubator lab mikrobiologi', targetZone: 'karantina' },
                    { id: 'c4', icon: '🚛', text: 'Produk diizinkan masuk ke truk ekspedisi pengiriman', targetZone: 'rilis' },
                    { id: 'c5', icon: '📦', text: 'Palet serah terima dari Tim Produksi ke Tim Gudang (baru tiba)', targetZone: 'karantina' },
                    { id: 'c6', icon: '📝', text: 'Sistem ERP menunjukkan status Batch telah diubah ke "Released"', targetZone: 'rilis' },
                  ],
                  feedbackCorrect: 'Luar biasa! Siklus Karantina terjadi 2 kali: Saat bahan baku baru datang, dan saat Barang Jadi (Finished Goods/FG) baru selesai. Gudang FG harus menyimpannya di area karantina dulu.',
                  feedbackWrong: 'Cek lagi alurnya. Barang yang baru selesai diproduksi TIDAK BOLEH langsung dijual. Harus berstatus Karantina sampai QA/Lab selesai memeriksa sampel akhirnya.',
                },

                // ── SLIDE 5: MATERI SINGKAT ──────────────────────────────────
                {
                  type: 'accordion_materi',
                  xp: 0,
                  scenario: {
                    icon: '📖',
                    labelColor: '#F39C12',
                    label: 'MATERI INTI',
                    text: '3 SOP Pengemasan & Barang Jadi',
                    style: { background: '#2C3E50', color: 'white', borderRadius: '16px' },
                  },
                  panels: [
                    {
                      id: 'pnl-1',
                      numBox: { bg: '#FADBD8', color: '#922B21' },
                      title: '1. Verifikasi Coding Pertama',
                      color: '#E74C3C',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Sebelum produksi jalan penuh, <b>cetakan pertama (First Piece)</b> wajib diperiksa ketajamannya, kebenaran nomor Batch, dan Tanggal Kedaluwarsanya oleh bagian QA/QC.</p></div>`,
                    },
                    {
                      id: 'pnl-2',
                      numBox: { bg: '#FCF3CF', color: '#B9770E' },
                      title: '2. Rekonsiliasi Kemasan',
                      color: '#F39C12',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Hitung semua sisa bahan kemas yang sudah <b>tercetak</b> Batch hari ini.<br>Jika ada sisa 10 lembar kemasan tercetak, <b>WAJIB dirobek/digunting</b>. Jangan biarkan sisa kemasan tercetak tercecer agar tidak disalahgunakan orang tak bertanggung jawab.</p></div>`,
                    },
                    {
                      id: 'pnl-3',
                      numBox: { bg: '#D5F5E3', color: '#1E8449' },
                      title: '3. Aturan Handover ke Gudang',
                      color: '#27AE60',
                      content: `<div style='color:#FDF2E9;line-height:1.7;font-size:14px;'><p>Produk jadi diserahterimakan dari Produksi ke Gudang menggunakan <b>Label Karantina (Kuning)</b>. Gudang wajib menempatkannya di zona Karantina (Hold Area) sampai hasil lab keluar (Rilis).</p></div>`,
                    },
                  ],
                },

                // ── SLIDE 6: MCQ (Skenario Mesin Coding) ─────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '5',
                    label: 'Skenario Error Mesin Inkjet',
                    labelColor: '#F39C12',
                    text: 'Anda sedang mengawasi mesin conveyor botol sirup.\n\nTiba-tiba Anda melihat botol ke-100 sampai botol ke-120 memiliki cetakan Expired Date yang tintanya luntur/samar akibat nozzle printer tersumbat kotoran.\n\nApa tindakan cepat Anda?',
                  },
                  options: [
                    { id: 'A', icon: '🤷', text: 'Biarkan saja lewat masuk ke kardus, toh isi botolnya masih bagus dan aman dikonsumsi.', correct: false, feedback: 'Pelanggaran Fatal! Konsumen mengandalkan tanggal tersebut. Jika buram, supermarket akan meretur produk dan BPOM akan menuduh pabrik Anda mencoba memalsukan umur produk.' },
                    { id: 'B', icon: '✍️', text: 'Tahan botol-botol tersebut, lalu tebalkan angka yang buram menggunakan spidol permanen secara manual.', correct: false, feedback: 'Salah. Memanipulasi dokumen/kemasan menggunakan alat tulis manual (spidol) sangat dilarang di industri manufaktur tersertifikasi GMP.' },
                    { id: 'C', icon: '🛑', text: 'Stop mesin. Singkirkan dan karantina botol ke-100 s/d 120. Bersihkan nozzle printer, lakukan tes cetak ulang.', correct: true, feedback: 'Keputusan Tepat! Stop proses agar cacat tidak bertambah. Pisahkan (karantina) produk cacat, lalu produk tersebut bisa dibuka kembali kemasannya (Rework) setelah disetujui atasan.' },
                  ],
                },

                // ── SLIDE 7: MCQ (Skenario Sisa Kemasan) ─────────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '6',
                    label: 'Skenario Rekonsiliasi (Sisa Cetak)',
                    labelColor: '#F39C12',
                    text: 'Shift produksi Anda telah selesai dan target tercapai 100%.\n\nNamun, di meja mesin masih ada sisa 50 lembar stiker label yang SUDAH TERCETAK dengan Nomor Batch hari ini dan Expired Date hari ini.\n\nApa yang wajib Anda lakukan?',
                  },
                  options: [
                    { id: 'A', icon: '🔙', text: 'Kembalikan stiker tersebut utuh ke gudang agar bisa dipakai besok untuk menghemat biaya.', correct: false, feedback: 'Sangat dilarang! Kemasan yang sudah tercetak batch hari ini tidak boleh dipakai besok. Jika besok dipakai, umur kedaluwarsa produk besok akan salah (maju 1 hari).' },
                    { id: 'B', icon: '✂️', text: 'Coret, gunting, atau hancurkan 50 stiker tersebut, lalu catat jumlah yang dirusak pada dokumen pelaporan (Batch Record).', correct: true, feedback: 'Sempurna! Prosedur ini disebut Rekonsiliasi. Menghancurkan kemasan tercetak mencegah risiko pemalsuan dan tercampurnya batch di hari berikutnya.' },
                    { id: 'C', icon: '🤫', text: 'Buang saja ke tempat sampah tanpa perlu dicatat di laporan agar tidak memicu pertanyaan atasan.', correct: false, feedback: 'Salah. Di pabrik berstandar ISO/GMP, setiap lembar label tercetak diaudit. Jika ada selisih jumlah cetak dengan jumlah produk jadi tanpa penjelasan, akan jadi temuan besar.' },
                  ],
                },

                // ── SLIDE 8: MCQ (Skenario Tumpukan Palet FG) ────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '7',
                    label: 'Skenario Serah Terima ke Gudang',
                    labelColor: '#F39C12',
                    text: 'Anda akan mengirim Barang Jadi (Finished Goods) ke gudang menggunakan palet kayu.\n\nProduksi Batch A menghasilkan sisa akhir 5 kardus (sangat sedikit, tidak menutupi 1 palet penuh). Anda juga baru memulai Batch B dan sudah dapat 10 kardus.\n\nBagaimana cara menyusunnya?',
                  },
                  options: [
                    { id: 'A', icon: '🧱', text: 'Pisahkan! Batch A di atas palet sendiri, Batch B di palet terpisah meskipun paletnya terlihat melompong.', correct: true, feedback: 'Keputusan Tepat! Aturan "Satu Palet, Satu Batch" adalah harga mati. Menggabungkan kardus beda batch di satu palet akan menghancurkan sistem FEFO gudang.' },
                    { id: 'B', icon: '🏗️', text: 'Gabungkan saja 5 kardus Batch A dan 10 kardus Batch B dalam satu palet agar hemat tempat di gudang.', correct: false, feedback: 'Salah. Mencampur batch (Mix-Up) sangat dilarang. Gudang akan kesulitan membedakan dan bisa salah mengambil produk yang umurnya lebih panjang.' },
                    { id: 'C', icon: '🏷️', text: 'Gabungkan di satu palet, tapi tempelkan dua label identitas (Label A dan Label B) secara bersamaan di palet tersebut.', correct: false, feedback: 'Salah. Dua label di satu palet akan membingungkan sistem ERP (Scanner Barcode) dan memicu human error dari operator forklift gudang.' },
                  ],
                },

                // ── SLIDE 9: MCQ (Skenario Status Karantina) ─────────────────
                {
                  type: 'mcq',
                  xp: 10,
                  scenario: {
                    icon: '8',
                    label: 'Skenario Keputusan Rilis',
                    labelColor: '#F39C12',
                    text: 'Sebanyak 10 Palet Barang Jadi (FG) sudah diserahkan ke Gudang sore ini.\n\nTiba-tiba ada tim ekspedisi mendadak datang memaksa membawa barang tersebut untuk dikirim ke pelanggan. Padahal, status barang di sistem masih "Karantina (Hold)" karena lab QA baru bisa mengeluarkan hasil tes besok pagi.\n\nApa tindakan Gudang?',
                  },
                  options: [
                    { id: 'A', icon: '🤝', text: 'Bolehkan dibawa asalkan sopir ekspedisi menandatangani surat pernyataan serah terima.', correct: false, feedback: 'Salah. Keselamatan pangan tidak bisa dinegosiasikan dengan surat dari sopir. Jika barang tersebut ternyata positif bakteri (esok paginya), pabrik akan dituntut.' },
                    { id: 'B', icon: '🛑', text: 'Tolak keras! Barang berstatus Karantina belum aman. Tunggu sampai QA mengubah statusnya menjadi Rilis (Hijau).', correct: true, feedback: 'Sangat Integritas! Karantina barang jadi berfungsi mengunci pergerakan fisik sampai dipastikan bebas cemaran biologis. Tidak ada yang boleh mengalahkan otoritas rilis QA.' },
                    { id: 'C', icon: '📞', text: 'Izinkan barang dibawa jalan oleh truk, tapi instruksikan sopir untuk menunggunya di depan pintu pabrik.', correct: false, feedback: 'Berbahaya. Barang belum Rilis (Hold) tidak boleh keluar dari zona karantina fisik pabrik sedikit pun.' },
                  ],
                },

                // ── SLIDE 10: SCORE SCREEN ───────────────────────────────────
                {
                  type: 'score_screen',
                  xp: 0,
                  feedback: {
                    title: 'Modul Produksi Selesai!',
                    insight: 'Selamat! Anda telah mengawal perjalanan FIFO dari hulu ke hilir. Pengemasan dan serah terima yang disiplin akan memastikan produk sampai ke konsumen dengan sempurna.',
                    icon: '📦',
                    maxScore: 80,
                    totalCount: 8,
                    takeaways: [
                      'Cetakan Expired Date (Coding) harus 100% tebal dan jelas terbaca.',
                      'Hancurkan/robek sisa kemasan tercetak untuk mencegah pemalsuan.',
                      'Jangan pernah mencampur kardus beda batch dalam satu palet.',
                      'Produk jadi yang baru diproduksi wajib di-Karantina (Hold) di gudang.',
                    ],
                    next: 'Selesai',
                    colorMode: 'orange',
                  },
                }

              ]
            }
            // ← SAMPAI SINI
          ]
        }
      ]
    }
  ]
};
