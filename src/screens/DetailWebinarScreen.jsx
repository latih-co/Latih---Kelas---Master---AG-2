import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Video, CheckCircle } from 'lucide-react';
import { useIsMobile } from '../utils/mobile';
import PaymentModal from '../components/PaymentModal';

// ─── Free vs Premium comparison table (Advanced webinar) ─────────────
const PREMIUM_FEATURES = [
  { label: "Join live Zoom",              free: true,  premium: true  },
  { label: "Soft File materi",            free: false, premium: true  },
  { label: "Sertifikat digital",          free: false, premium: true  },
  { label: "File recording",              free: false, premium: true  },
  { label: "Worksheet & kumpulan studi kasus", free: false, premium: true },
  { label: "1 voucher diskon 10% Online Training Latih", free: false, premium: true },
];

// ─── Reguler registration steps ──────────────────────────────────────
const REGULER_DAFTAR_STEPS = [
  "Follow Instagram @latih.co atau LinkedIn Latih.co dan screenshot.",
  "Like dan Repost poster 'Kenal Profesi' di Instagram Story atau LinkedIn kamu dan tag @latih.co, lalu screenshot.",
  "Kirim bukti screenshot ke Tim Latih melalui WhatsApp (0812-8581-5971).",
  "Lakukan pendaftaran di web kelas.latih.co (atau klik link di bio IG @latih.co).",
  "Link Zoom akan dikirimkan melalui email pada H-1 webinar.",
];

const REGULER_SERTIFIKAT_STEPS = [
  "Kirim bukti share poster kegiatan di Instagram/LinkedIn (screenshot).",
  "Isi form pendaftaran (screenshot).",
  "Ikuti webinar hingga selesai (screenshot/foto selfie).",
  "Isi form evaluasi (link dibagikan via chat Zoom) dan screenshot.",
  "Tulis & bagikan pelajaran yang didapat di Instagram Story/LinkedIn dengan tag @latih.co dan Pelatih, lalu screenshot.",
  "Konfirmasi poin 1–5 dengan kirim semua screenshot ke Admin via WhatsApp +62 812-8581-5971.",
];

// ─── Shared QnA items ─────────────────────────────────────────────────
const makeQna = (webinar) => webinar.kategori === 'reguler' ? [
  {
    q: "Apakah ada rekaman jika saya tidak bisa hadir?",
    a: "Rekaman tidak tersedia untuk Webinar Reguler. Hadir langsung adalah syarat mendapatkan sertifikat.",
  },
  {
    q: "Bagaimana cara bergabung ke sesi Zoom?",
    a: "Link Zoom akan dikirimkan ke email terdaftar pada H-1 sebelum pelaksanaan. Pastikan email yang kamu daftarkan aktif.",
  },
  {
    q: "Apakah sertifikat akan dikirim otomatis?",
    a: "Sertifikat dikirim ke email setelah kamu memenuhi semua 6 tahapan yang disyaratkan. Konfirmasikan melalui WhatsApp Admin.",
  },
] : [
  {
    q: "Saya mendaftar dengan paket Free, apakah setelah Kelas selesai boleh mengubah menjadi Paket Premium?",
    a: "Ya, bisa. Silakan proses di halaman Profil Saya.",
  },
  {
    q: "Apakah sertifikat bisa menjadi dokumen pendukung melamar pekerjaan?",
    a: "Ya, bisa. Sertifikat yang diterbitkan Latih bisa menjadi dokumen pendukung melamar pekerjaan, dengan catatan, kamu sudah memahami semua materi yang disampaikan, agar saat interview kamu bisa menjelaskan dengan baik dan benar.",
  },
  {
    q: "Apakah bisa saya mendapatkan sertifikat tanpa menghadiri Kelas secara live pada waktunya?",
    a: "Tidak bisa. Kamu wajib hadir saat live Zoom untuk mendapatkan sertifikat.",
  },
];


// ─── Format harga ───────────────────────────────────────────────────────
const fmtRp = (val) => {
  if (!val || val === 0) return 'Rp 0';
  if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(val % 1000000 === 0 ? 0 : 1)}jt`;
  if (val >= 1000)    return `Rp ${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k`;
  return `Rp ${val.toLocaleString('id-ID')}`;
};

export default function DetailWebinarScreen({ webinar, onBack, onNavigate, isGuest = false }) {
  const isMobile = useIsMobile();
  const [openQna, setOpenQna] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [initPkg, setInitPkg]         = useState('free'); // package yg dipilih saat buka modal
  const [showGuestModal, setShowGuestModal] = useState(false);

  const handleDaftar = (pkg = 'free') => {
    if (isGuest) setShowGuestModal(true);
    else { setInitPkg(pkg); setShowPayment(true); }
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);
  if (!webinar) return null;

  const isReguler = webinar.kategori === "reguler";
  const qnaItems = makeQna(webinar);
  const accentColor = isReguler ? '#16A34A' : 'var(--c-teal)';
  const accentBg   = isReguler ? '#F0FDF4'  : '#EFF6FF';
  const accentBorder = isReguler ? '#BBF7D0' : '#BFDBFE';

  return (
    <div style={{ padding: isMobile ? "20px 16px 120px" : "32px 40px 100px", fontFamily: "'Inter', sans-serif" }}>

      {/* Back */}
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
        padding: 0, color: 'var(--c-muted)', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginBottom: 32,
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--c-dark)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--c-muted)'}
      >
        <ArrowLeft size={16} /> Kembali ke daftar Webinar
      </button>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 40, alignItems: 'flex-start' }}>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Badge */}
          <div style={{
            display: 'inline-block', padding: '5px 12px', borderRadius: 8,
            fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14,
            backgroundColor: accentBg, color: accentColor, border: `1px solid ${accentBorder}`,
          }}>
            {isReguler ? '🎁 Webinar Reguler' : '⭐ Webinar Advanced'}
          </div>

          {/* Title */}
          <h1 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 900, color: 'var(--c-dark)', lineHeight: 1.15, letterSpacing: '-0.8px', marginBottom: 24 }}>
            {webinar.title}
          </h1>

          {/* Info grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: 16, padding: '20px 0', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6', marginBottom: 32,
          }}>
            {[
              { Icon: Calendar, label: "Tanggal",  value: webinar.stats?.tanggal || "Segera Hadir" },
              { Icon: Clock,    label: "Waktu",    value: webinar.waktu || "09:00 – 11:00 WIB" },
              { Icon: Video,    label: "Platform", value: "Zoom Meeting" },
              { Icon: User,     label: "Narasumber", value: webinar.trainer || "Praktisi Berpengalaman" },
            ].map(({ Icon, label, value }, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: 'var(--surf-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-dark)', flexShrink: 0 }}>
                  <Icon size={17} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--c-dark)', fontWeight: 700 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* ── Deskripsi ───────────────────────────────────────────── */}
            <div style={{ backgroundColor: 'white', borderRadius: 20, padding: isMobile ? 20 : 28, border: '1px solid #EAF0F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 4, height: 22, backgroundColor: 'var(--c-teal)', borderRadius: 4 }} />
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Deskripsi Program</h2>
              </div>
              <p style={{ fontSize: 14, color: 'var(--c-dark)', fontWeight: 500, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
                {webinar.deskripsi || `Bergabunglah dalam sesi interaktif "${webinar.title}" bersama praktisi industri profesional. Webinar ini dirancang khusus untuk membantumu memahami fundamental penting, best practices, dan studi kasus nyata yang langsung dapat diaplikasikan di dunia kerja sebenarnya. Siapkan dirimu untuk berdiskusi, bertanya, dan mendapatkan wawasan baru dari ahlinya!`}
              </p>
            </div>

            {/* ── REGULER: Cara Daftar ───────────────────────────────── */}
            {isReguler && (
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: isMobile ? 20 : 28, border: '1px solid #EAF0F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 22, backgroundColor: '#22C55E', borderRadius: 4 }} />
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>🎁 Cara Mendaftar</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {REGULER_DAFTAR_STEPS.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                        backgroundColor: '#DCFCE7', color: '#16A34A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 12,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: 13, color: 'var(--c-dark)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── REGULER: Cara Dapat Sertifikat ───────────────────── */}
            {isReguler && (
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: isMobile ? 20 : 28, border: '1px solid #EAF0F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 22, backgroundColor: '#F59E0B', borderRadius: 4 }} />
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>🔴 Tahapan Mendapat Sertifikat</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {REGULER_SERTIFIKAT_STEPS.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                        backgroundColor: '#FEF3C7', color: '#D97706',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 12,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: 13, color: 'var(--c-dark)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ADVANCED: Free vs Premium table ──────────────────── */}
            {!isReguler && (
              <div style={{ backgroundColor: 'white', borderRadius: 20, padding: isMobile ? 20 : 28, border: '1px solid #EAF0F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 4, height: 22, backgroundColor: 'var(--c-teal)', borderRadius: 4 }} />
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>Yang akan kamu dapatkan</h2>
                </div>

                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px', gap: 8, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 600 }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, color: 'var(--c-dark)', fontSize: 13 }}>Free</div>
                    <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600 }}>Rp 0</div>
                  </div>
                  <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--c-teal), #6366F1)', borderRadius: 10, padding: '6px 4px' }}>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: 13 }}>Premium</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{fmtRp(webinar.price_premium)}</div>
                  </div>
                </div>

                {/* Rows */}
                <div style={{ borderTop: '1px solid #EAF0F6' }}>
                  {PREMIUM_FEATURES.map((feat, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '1fr 100px 100px',
                      gap: 8, padding: '12px 0',
                      borderBottom: i < PREMIUM_FEATURES.length - 1 ? '1px dashed #EAF0F6' : 'none',
                    }}>
                      <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 600, lineHeight: 1.4, display: 'flex', alignItems: 'center' }}>{feat.label}</div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {feat.free
                          ? <CheckCircle size={18} color="#16A34A" />
                          : <span style={{ fontSize: 16, color: '#CBD5E1', fontWeight: 700 }}>–</span>
                        }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {feat.premium
                          ? <CheckCircle size={18} color="#16A34A" />
                          : <span style={{ fontSize: 16, color: '#CBD5E1', fontWeight: 700 }}>–</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QnA Accordion */}
            <div style={{ backgroundColor: 'white', borderRadius: 20, padding: isMobile ? 20 : 28, border: '1px solid #EAF0F6', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 4, height: 22, backgroundColor: '#8B5CF6', borderRadius: 4 }} />
                <h2 style={{ fontSize: 17, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>QnA</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {qnaItems.map((item, i) => (
                  <div key={i} style={{ border: '1px solid #EAF0F6', borderRadius: 12, overflow: 'hidden' }}>
                    <button
                      onClick={() => setOpenQna(openQna === i ? null : i)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-dark)', flex: 1, lineHeight: 1.4 }}>{item.q}</span>
                      <span style={{ fontSize: 18, color: 'var(--c-muted)', flexShrink: 0, transition: 'transform 0.2s', transform: openQna === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                    </button>
                    {openQna === i && (
                      <div style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.65 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Masih Punya Pertanyaan */}
            <div style={{
              backgroundColor: accentBg, borderRadius: 20, padding: isMobile ? 24 : 36,
              border: `1px solid ${accentBorder}`, display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: accentColor, marginBottom: 10, letterSpacing: '-0.3px' }}>
                Masih Punya Pertanyaan?
              </h2>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.65, marginBottom: 20, maxWidth: 340 }}>
                {isReguler
                  ? "Kirim screenshot konfirmasi pendaftaranmu atau tanya apapun ke Tim Latih melalui WhatsApp."
                  : "Tanyakan detail paket, cara pembayaran, atau info teknis langsung ke Tim Latih."}
              </p>
              <button
                onClick={() => webinar.waLink && window.open(webinar.waLink, '_blank')}
                style={{
                  backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: 12,
                  padding: '13px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 6px 14px rgba(37,211,102,0.25)', transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                💬 WhatsApp Tim Latih
              </button>
            </div>

          </div>
        </div>

        {/* ── SIDEBAR KANAN ── */}
        <div style={isMobile ? {
          position: 'fixed', bottom: 70, left: 0, right: 0,
          backgroundColor: 'white', padding: '14px 20px',
          borderTop: '1px solid #EAF0F6', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100,
        } : {
          width: 280, flexShrink: 0, backgroundColor: 'white', borderRadius: 20,
          boxShadow: '0 12px 32px rgba(0,0,0,0.06)', border: '1px solid #EAF0F6',
          padding: 22, position: 'sticky', top: 32,
        }}>
          {!isMobile && (
            <img
              src={webinar.image || "https://placehold.co/400x400/EAF0F6/94A3B8?text=Webinar"}
              alt={webinar.title}
              style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 14, marginBottom: 18 }}
            />
          )}

          {isReguler ? (
            <>
              <div style={isMobile ? {} : { marginBottom: 14 }}>
                {!isMobile && <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 4 }}>Biaya Registrasi</div>}
                <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 900, color: '#15803D' }}>GRATIS</div>
                {isMobile && <div style={{ fontSize: 10, color: 'var(--c-muted)', fontWeight: 600 }}>Biaya Registrasi</div>}
              </div>
              <button
                onClick={handleDaftar}
                style={{
                  padding: isMobile ? '13px 22px' : '13px 0', width: isMobile ? 'auto' : '100%',
                  backgroundColor: '#22C55E', color: 'white', border: 'none',
                  borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(34,197,94,0.25)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Daftar Gratis 🎁
              </button>
            </>
          ) : (
            <>
              <div style={isMobile ? { display: 'flex', gap: 16 } : { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  {!isMobile && <div style={{ fontSize: 10, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Paket Free</div>}
                  <div style={{ fontSize: isMobile ? 16 : 22, fontWeight: 900, color: 'var(--c-dark)' }}>Rp 0</div>
                  {isMobile && <div style={{ fontSize: 10, color: 'var(--c-muted)', fontWeight: 600 }}>Paket Free</div>}
                </div>
                <div style={{ flex: 1 }}>
                  {!isMobile && <div style={{ fontSize: 10, color: 'var(--c-muted)', fontWeight: 600, marginBottom: 2 }}>Paket Premium</div>}
                  <div style={{ fontSize: isMobile ? 16 : 22, fontWeight: 900, color: 'var(--c-teal-dark)' }}>{fmtRp(webinar.price_premium)}</div>
                  {isMobile && <div style={{ fontSize: 10, color: 'var(--c-teal-dark)', fontWeight: 600 }}>Paket Premium</div>}
                </div>
              </div>
              <div style={isMobile ? { display: 'flex', gap: 8 } : { display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={() => handleDaftar('free')}
                  style={{
                    padding: '12px 0', width: isMobile ? '90px' : '100%',
                    backgroundColor: 'var(--surf-2)', color: 'var(--c-dark)', border: '1px solid #EAF0F6',
                    borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  Daftar Free
                </button>
                <button
                  onClick={() => handleDaftar('premium')}
                  style={{
                    padding: '12px 0', width: isMobile ? '100px' : '100%',
                    background: 'linear-gradient(135deg, var(--c-teal), #6366F1)',
                    color: 'white', border: 'none',
                    borderRadius: 12, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,112,243,0.2)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Pilih Premium ⭐
                </button>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Guest Register Modal */}
      {showGuestModal && (
        <div onClick={() => setShowGuestModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'white', borderRadius: 24, padding: 40, maxWidth: 420, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0F172A', margin: '0 0 10px', letterSpacing: '-0.5px' }}>Bikin Akun Dulu Yuk!</h2>
            <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.65, margin: '0 0 28px' }}>
              Kalau punya akun, sertifikat dan link Zoom tersimpan di satu tempat.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => onNavigate('register')} style={{ padding: '13px 24px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
                Buat Akun Gratis →
              </button>
              <button onClick={() => onNavigate('login')} style={{ padding: '13px 24px', backgroundColor: 'white', color: '#0F172A', border: '1.5px solid #E2E8F0', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Sudah punya akun? Masuk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && webinar && (
        <PaymentModal
          event={{
            id:            webinar.id || webinar.title,
            type:          isReguler ? 'webinar_reguler' : 'webinar_advanced',
            title:         webinar.title,
            price_regular: webinar.price_regular ?? 0,
            price_premium: webinar.price_premium ?? 0,
          }}
          initialPackage={initPkg}
          onClose={() => setShowPayment(false)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
