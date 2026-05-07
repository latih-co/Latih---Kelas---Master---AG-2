import React, { useEffect } from 'react';
import { useIsMobile } from '../utils/mobile';
import LogoWarna from '../assets/Logo Latih Warna.png';

export default function PrivacyScreen({ onBack }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFCF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: 'var(--c-dark)' }}>
      <nav style={{ padding: isMobile ? '20px 24px' : '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAF0F6', backgroundColor: 'white' }}>
        <img src={LogoWarna} alt="Logo Latih" style={{ height: isMobile ? 24 : 32, objectFit: 'contain', cursor: 'pointer' }} onClick={onBack} />
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--c-teal)', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
          &larr; Kembali
        </button>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '40px 24px' : '60px 0 100px' }}>
        <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 900, letterSpacing: '-1px', marginBottom: 16 }}>Kebijakan Privasi</h1>
        <p style={{ color: '#6B7280', marginBottom: 48, fontSize: 15 }}>Terakhir Diperbarui: 12 April 2026</p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 32, lineHeight: 1.7, fontSize: 16, color: '#4B5563' }}>
          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>1. Pengumpulan Data</h3>
            <p>Privasi Anda adalah prioritas Latih. Kami hanya mengumpulkan informasi minimal yang diperlukan untuk menunjang pengalaman belajar gamifikasi Anda: Nama profil institusi, tingkat keahlian (*Role* Anda), skor XP, dan *local state* pelacakan kuis.</p>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>2. Penggunaan Informasi</h3>
            <p>Data penyelesaian simulasi kasus QA/QC & Manufaktur digunakan secara eksklusif untuk merekomendasikan klaster soal yang sesuai dengan jenjang karir Anda. Kami TIDAK memperjualbelikan rekam jejak sertifikasi atau analitik Anda ke pihak perekrut (HRD) tanpa *consent* langsung via klik "Bagikan LinkedIn" Anda.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>3. Penyimpanan Lokal (*Cookies*)</h3>
            <p>Platform Latih sangat bergantung pada teknologi *Local Storage* di *browser* (seperti sinkronisasi progres halaman, rekap kuis `iso9001_completedQuizzes`, dan histori navigasi). Menolak atau membersihkan *cache browser* berarti mereset data XP dan sertifikat lokal Anda.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>4. Keamanan Data</h3>
            <p>Kami me-lindungi lalu-lintas kredensial edukasi Anda menggunakan protokol enkripsi standar industri. Namun, keamanan perangkat keras yang Anda pakai mengakses Latih berada di luar kendali kami. Gunakan koneksi aman terutama saat berhadapan dengan *payment gateway* kelak.</p>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>5. Kontak Privasi</h3>
            <p>Jika Anda memiliki pertanyaan seputar proteksi data atau ingin meminta ekstraksi salinan profil kursus Anda, hubungi *Data Protection Officer* kami di info@latih.co.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
