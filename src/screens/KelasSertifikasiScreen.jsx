import React, { useEffect, useState } from 'react';
import { useIsMobile } from '../utils/mobile';
import { api } from '../services/api';

export default function KelasSertifikasiScreen({ onSelectTraining }) {
  const isMobile = useIsMobile();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTrainings().then(data => {
      setClasses(data);
      setLoading(false);
    });
  }, []);

  // ── Hardcoded fallback (tampil jika Supabase belum ada data) ────
  const FALLBACK = [
    {
      id: "reg-cosmetics-b1",
      isFeatured: true,
      sektor: "Kosmetik",
      title: "Regulatory Affairs in Cosmetic Industry",
      stats: { tanggal: "Minggu, 5 April 2026" },
      image: "/Regulatory Affairs in Cosmetic Industry.webp",
      price: "Rp155.000",
      action: "Daftar Batch 1",
      primaryBtn: true,
      trainer: "Hidayatul Baroroh (Regulatory Consultant)",
      deskripsi: "Industri kosmetik Indonesia terus berkembang pesat dan menjadi salah satu sektor dengan pertumbuhan tertinggi di Asia Tenggara. Di balik peluang besar ini, para pelaku industri — mulai dari produsen lokal, importir, hingga perusahaan maklon — dihadapkan pada tantangan regulasi BPOM yang semakin ketat dan dinamis, mulai dari notifikasi produk, persyaratan bahan, standar penandaan dan klaim, hingga kewajiban sertifikasi halal kosmetik tahun 2026. Pelatihan ini hadir untuk memberikan pemahaman menyeluruh dan panduan praktis yang langsung dapat diterapkan agar peserta mampu mengelola proses regulatory affairs secara mandiri, efisien, dan sesuai ketentuan yang berlaku.",
      output: [
        "Memahami kerangka regulasi kosmetik Indonesia secara komprehensif, termasuk kebijakan terkini BPOM",
        "Mampu melakukan notifikasi kosmetik secara mandiri melalui sistem e-notifkos, OSS, dan e-BPOM",
        "Memahami persyaratan teknis bahan, standar penandaan, klaim, dan cara penyusunan Dokumen Informasi Produk (DIP)",
        "Siap menghadapi kewajiban sertifikasi halal kosmetik tahun 2026",
        "Mampu menyusun regulatory strategy yang efektif dan efisien untuk produk kosmetik"
      ],
      targetPeserta: [
        "Produsen kosmetik lokal",
        "Importir produk kosmetik",
        "Perusahaan maklon (contract manufacturer)",
        "Staf/tim Regulatory Affairs di industri kosmetik",
        "Pemilik brand kosmetik yang ingin memahami proses perizinan BPOM secara mandiri"
      ],
      silabus: [
        "Regulatory Framework Kosmetik di Indonesia",
        "Sistem Notifikasi & Perizinan BPOM",
        "Persyaratan Teknis Bahan Kosmetik",
        "Dokumen Informasi Produk (DIP), Penandaan, Klaim & Iklan",
        "Regulatory Strategy & Wajib Halal 2026"
      ],
      benefits: [
        "e-Sertifikat",
        "File materi",
        "Recording",
        "Live Class dan QnA bersama Profesional",
        "Doorprize",
        "Networking",
        "Ebook ‘Komunikasi Efektif: Seni Berbicara, Mendengar, dan Mempengaruhi’ 🆕🔥",
        "Voucher Diskon 10% Online Training Latih 🆕🔥"
      ],
      reasons: [
        "Memastikan produk kosmetik memenuhi ketentuan BPOM dan dapat beredar secara legal di pasar Indonesia",
        "Menghindari risiko penolakan notifikasi, sanksi hukum, dan penarikan produk dari pasar",
        "Mempercepat proses perizinan dan notifikasi produk secara mandiri dan efisien",
        "Memahami persyaratan teknis bahan kosmetik sesuai standar nasional dan internasional",
        "Menyusun Dokumen Informasi Produk (DIP) yang siap audit oleh BPOM",
        "Memastikan klaim, label, dan iklan produk tidak menyalahi ketentuan yang berlaku",
        "Mempersiapkan diri menghadapi kewajiban sertifikasi halal kosmetik 2026",
        "Merancang strategi regulatory yang tepat untuk mendukung pertumbuhan bisnis"
      ],
      waLink: "https://wa.me/6281285815971"
    },
    {
      id: "cdakb-batch1",
      isFeatured: false,
      sektor: "Alat Kesehatan",
      title: "Cara Distribusi Alat Kesehatan yang Baik (CDAKB)",
      stats: { tanggal: "Minggu, 12 April 2026" },
      image: "/CDAKB.webp",
      price: "Rp155.000",
      action: "Daftar Batch 1",
      primaryBtn: true,
      trainer: "apt. Fairus Zabadi, M.Tech (Medical Device Quality Expert)",
      deskripsi: "Alat kesehatan bukan produk biasa. Di balik setiap jarum suntik, infusion set, hingga alat diagnostik yang digunakan di rumah sakit, ada rantai distribusi panjang yang menentukan apakah produk tersebut sampai ke tangan tenaga medis dalam kondisi aman, steril, dan sesuai spesifikasi. CDAKB (Cara Distribusi Alat Kesehatan yang Baik) adalah pedoman resmi yang ditetapkan oleh Kementerian Kesehatan RI melalui Permenkes No. 4 Tahun 2014, sebagai standar yang wajib diterapkan oleh setiap Penyalur Alat Kesehatan (PAK) dan Cabang PAK di seluruh Indonesia. Pelatihan ini dilaksanakan secara Live Online via Zoom selama 3 jam, mencakup penyampaian materi, exercise/workshop, dan diskusi interaktif.",
      output: [
        "Memahami kerangka regulasi CDAKB dan posisinya dalam sistem kesehatan nasional",
        "Memahami prinsip perencanaan sistem distribusi yang terkendali (manajemen mutu, SDM, fasilitas)",
        "Memahami operasional distribusi sesuai standar (penerimaan, penyimpanan, ketertelusuran produk)",
        "Memahami cara monitoring dan evaluasi kinerja distribusi melalui audit internal dan kajian manajemen",
        "Memahami cara identifikasi risiko dan tindakan korektif dalam situasi keluhan, recall, retur, pemusnahan, maupun temuan alkes ilegal"
      ],
      targetPeserta: [
        "Fresh graduate yang terjun ke industri distribusi alkes",
        "Praktisi yang ingin memahami dasar regulasi distribusi alat kesehatan",
        "Mahasiswa yang ingin melihat bagaimana regulasi bekerja dalam praktik nyata"
      ],
      silabus: [
        "Regulasi & Pemahaman Dasar CDAKB",
        "Perencanaan Sistem Distribusi yang Terkendali",
        "Implementasi Operasional Distribusi",
        "Monitoring & Evaluasi Kinerja Distribusi",
        "Perbaikan & Pengendalian Risiko Distribusi"
      ],
      benefits: [
        "e-Sertifikat",
        "File materi",
        "Recording",
        "Live Class dan QnA bersama Profesional",
        "Doorprize",
        "Networking",
        "Ebook 'Komunikasi Efektif: Seni Berbicara, Mendengar, dan Mempengaruhi'",
        "Voucher Diskon 10% Online Training Latih"
      ],
      reasons: [
        "Memahami \"bahasa\" industri yang digunakan setiap hari di PAK, distributor, dan fasilitas kesehatan",
        "Siap menghadapi audit tanpa panik — karena memahami sistem, bukan sekadar hafal prosedur",
        "Berkontribusi nyata pada keselamatan pasien melalui praktik distribusi yang bertanggung jawab",
        "Meningkatkan nilai profesional di mata perusahaan yang bergerak di sektor alkes, farmasi, dan diagnostik"
      ],
      waLink: "https://wa.me/6281285815971"
    }
  ];

  const displayClasses = classes.length > 0 ? classes : FALLBACK;

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter', color: 'var(--c-muted)', fontSize: 14 }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
        <div>Memuat daftar training...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? "20px 16px 56px" : "24px 32px 56px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
        Pelatihan terstruktur dengan sertifikat
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--c-dark)', margin: '0 0 24px 0', letterSpacing: '-0.5px' }}>
        Training
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
        gap: 24,
        alignItems: 'start'
      }}>
        
        {/* KOLOM KIRI — Daftar Kelas */}
        {displayClasses.length === 0 ? (
          <div style={{ padding: '48px 24px', backgroundColor: 'var(--surf-2)', borderRadius: 16, border: '1px dashed #CBD5E1', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--c-muted)', fontWeight: 600 }}>Belum ada Training yang tersedia saat ini.</p>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--c-muted)' }}>Pantau info terbaru di Instagram @latih.co</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 18 }}>
            {displayClasses.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectTraining && onSelectTraining(item)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  backgroundColor: item.isFeatured ? 'rgba(0, 112, 243, 0.03)' : 'white',
                  border: item.isFeatured ? '1px solid var(--c-teal)' : '1px solid #EAF0F6',
                  borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s', cursor: 'pointer', overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-teal)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,112,243,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = item.isFeatured ? 'var(--c-teal)' : '#EAF0F6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)'; }}
              >
                {/* Cover image */}
                {item.image ? (
                  <img src={item.image} alt={item.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', backgroundColor: 'var(--surf-2)' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏭</div>
                )}

                <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {item.sektor && (
                    <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, backgroundColor: 'var(--surf-2)', color: 'var(--c-muted)', padding: '3px 8px', borderRadius: 6, width: 'fit-content', marginBottom: 8 }}>
                      {item.sektor}
                    </div>
                  )}
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--c-dark)', letterSpacing: '-0.2px', lineHeight: 1.3, marginBottom: 12, minHeight: 36 }}>
                    {item.title}
                  </div>
                  {item.stats?.tanggal && (
                    <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      📅 {item.stats.tanggal}
                    </div>
                  )}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, borderTop: '1px solid #EAF0F6', paddingTop: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--c-dark)' }}>
                      {item.price}
                    </div>
                    <button style={{ backgroundColor: 'var(--c-teal)', color: 'white', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KOLOM KANAN — Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>



          {/* Card 2 — Kurikulum Praktis */}
          <div style={{ backgroundColor: 'white', border: '1px solid #EAF0F6', borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--c-teal)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              📋 Kurikulum Berbasis Dunia Nyata
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Materi dari praktisi aktif di industri',
                'Studi kasus nyata, bukan teori semata',
                'Langsung bisa diterapkan di tempat kerja',
                'Update mengikuti regulasi terkini',
              ].map((point) => (
                <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: 'var(--c-teal)', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 12, color: 'var(--c-dark)', lineHeight: 1.5 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Card 4 — Trainer */}
          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#15803D', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
              👨‍🏫 Trainer Berpengalaman
            </div>
            <p style={{ fontSize: 12, color: '#166534', lineHeight: 1.6, margin: 0 }}>
              Semua trainer adalah praktisi aktif dengan pengalaman lapangan di industri farmasi, pangan, kosmetik, dan alat kesehatan — bukan hanya akademisi.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

