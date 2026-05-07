import React, { useEffect } from 'react';
import { useIsMobile } from '../utils/mobile';
import LogoWarna from '../assets/Logo Latih Warna.png';

export default function TermsScreen({ onBack }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFCF8', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: 'var(--c-dark)' }}>
      {/* Simple Header */}
      <nav style={{ padding: isMobile ? '20px 24px' : '24px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAF0F6', backgroundColor: 'white' }}>
        <img src={LogoWarna} alt="Logo Latih" style={{ height: isMobile ? 24 : 32, objectFit: 'contain', cursor: 'pointer' }} onClick={onBack} />
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--c-teal)', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
          &larr; Kembali
        </button>
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '40px 24px' : '60px 0 100px' }}>
        <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 900, letterSpacing: '-1px', marginBottom: 16 }}>Syarat & Ketentuan</h1>
        <p style={{ color: '#6B7280', marginBottom: 48, fontSize: 15 }}>Terakhir Diperbarui: 12 April 2026</p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 32, lineHeight: 1.7, fontSize: 16, color: '#4B5563' }}>
          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>1. Pengantar</h3>
            <p>Selamat datang di platform Latih. Syarat dan Ketentuan ini mengatur penggunaan layanan pembelajaran interaktif kami. Dengan mengakses aplikasi ini, Anda setuju untuk terikat penuh pada persyaratan yang tertulis.</p>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>2. Kekayaan Intelektual</h3>
            <p>Seluruh materi edukasi, studi kasus manufaktur, kuis kelulusan, rancangan modul ISO dan GMP, desain widget interaktif, beserta kode sumber adalah hak milik eksklusif Latih. Dilarang mendistribusikan ulang atau menyalin kursus kami untuk kepentingan komersial tanpa izin sah.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>3. Akun dan XP Gamifikasi</h3>
            <p>XP (Experience Point) dan Sertifikat yang Anda dapatkan terikat pada akun pribadi. Kami berhak mencabut status kelulusan atau menghapus akun apabila terdeteksi pemalsuan identitas atau manipulasi bot dalam pengerjaan kuis kelulusan.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>4. Tidak Menyediakan Akreditasi Resmi</h3>
            <p>Latih merupakan platform simulasi dan pelatihan profesional. Namun, sertifikat elektronik yang dikeluarkan oleh kami bersikap sebagai bukti penyelesaian (Certificate of Completion) dan pameran *skill portofolio*, BUKAN sertifikat auditor resmi atau surat izin legal dari Komite Akreditasi Nasional Nasional.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--c-dark)', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>5. Perubahan Ketentuan</h3>
            <p>Latih dapat mengubah sewaktu-waktu pedoman persyaratan tanpa pemberitahuan mutlak terlebih dahulu. Harap rutin mengecek modifikasi *Terms of Service* pada halaman ini.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
