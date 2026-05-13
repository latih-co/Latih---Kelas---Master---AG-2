import React, { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '../utils/mobile';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import QuizModal from '../components/QuizModal';
import UpgradeModal from '../components/UpgradeModal';
import { generateCertPDF, downloadCertPDF, CERT_TYPES } from '../services/certificateService';

export default function ProfilScreen({ onNavigate }) {
  const isMobile = useIsMobile();
  const { user, xp, streak, signOut, updateProfile } = useUser();

  const [certificates, setCertificates]     = useState([]);
  const [registrations, setRegistrations]   = useState([]);
  const [payments, setPayments]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [loggingOut, setLoggingOut]         = useState(false);
  const [quizTarget, setQuizTarget]         = useState(null);
  const [upgradeTarget, setUpgradeTarget]   = useState(null);
  const [dlLoading, setDlLoading]           = useState(''); // cert_number sedang didownload
  const [editWa, setEditWa]                 = useState(false);
  const [waInput, setWaInput]               = useState('');
  const [waSaving, setWaSaving]             = useState(false);

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const { data: certs } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      const { data: regs } = await supabase
        .from('registrations')
        .select('*, events(title, type, event_date, waktu, image_url, zoom_link, extra_link, extra_link_label, quiz_questions, quiz_passing_score, silabus, price_premium)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const { data: pays } = await supabase
        .from('payments')
        .select('*, registrations(event_id, events(title, type))')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      setCertificates(certs || []);
      setRegistrations(regs || []);
      setPayments(pays || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    if (onNavigate) onNavigate('landing');
  };

  const handleDownloadCert = async (cert) => {
    if (!user) return;
    setDlLoading(cert.cert_number);
    try {
      const pdfBytes = await generateCertPDF({
        holderName: user.name || 'Peserta',
        eventTitle: cert.event_title || cert.type,
        certNumber: cert.cert_number,
        type:       cert.type,
        issuedAt:   cert.issued_at,
      });
      downloadCertPDF(pdfBytes, cert.cert_number);
    } catch (err) {
      alert('Gagal generate PDF: ' + err.message);
    } finally {
      setDlLoading('');
    }
  };

  // Hitung level dari XP
  const getLevel = (xp) => {
    if (xp >= 5000) return { level: 'Expert', emoji: '🏆', next: null,     target: 5000 };
    if (xp >= 2000) return { level: 'Advanced', emoji: '🥇', next: 'Expert',   target: 5000 };
    if (xp >= 500)  return { level: 'Intermediate', emoji: '🥈', next: 'Advanced', target: 2000 };
    return            { level: 'Beginner', emoji: '🥉', next: 'Intermediate', target: 500  };
  };
  const lvl = getLevel(xp);

  if (loading || !user) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter', color: 'var(--c-muted)', fontSize: 14 }}>
        <div style={{ marginBottom: 16 }}>⏳</div>
        <div>Memuat profil kamu...</div>
      </div>
    );
  }

  const certCount = certificates.length;
  const initials  = (user.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ padding: isMobile ? '20px 16px 100px' : '24px 32px 56px', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
        Pantau perjalanan belajarmu
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--c-dark)', margin: 0, letterSpacing: '-0.5px' }}>
          Profil Saya
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {user.role === 'admin' && (
            <>
              <button
                onClick={() => onNavigate('admin')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: '#1D4ED8', cursor: 'pointer' }}
              >
                ⚙️ Admin Panel
              </button>
              <button
                onClick={() => onNavigate('cert_preview')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: '#15803D', cursor: 'pointer' }}
              >
                🎓 Preview Sertifikat
              </button>
              <button
                onClick={() => onNavigate('cert_calibrator')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: '#C2410C', cursor: 'pointer' }}
              >
                📐 Kalibrasi Template
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              backgroundColor: 'white', border: '1px solid #EAF0F6',
              borderRadius: 10, padding: '8px 14px',
              fontSize: 12, fontWeight: 700, color: '#EF4444',
              cursor: loggingOut ? 'not-allowed' : 'pointer',
              opacity: loggingOut ? 0.6 : 1,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.borderColor = '#FCA5A5'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white';   e.currentTarget.style.borderColor = '#EAF0F6'; }}
        >
          {loggingOut ? '⏳' : '🚪'} {loggingOut ? 'Keluar...' : 'Keluar'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        <div style={{ backgroundColor: 'white', borderRadius: 22, overflow: 'hidden', border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>

          <div style={{ backgroundColor: 'var(--c-dark)', padding: '24px 32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 24, flex: 1 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '4px solid rgba(255,255,255,0.15)', color: 'var(--c-dark)', fontSize: 28, fontWeight: 900 }}>
              {initials}
            </div>

            <div style={{ textAlign: isMobile ? 'center' : 'left', flex: 1 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: '0 0 4px 0' }}>{user.name}</h2>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
                {user.job_role || 'Profesional Industri'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: isMobile ? 20 : 0 }}>
                {user.role === 'admin' ? '⚙️ Administrator' : ''}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              {[
                { label: 'STREAK',     val: `${streak}🔥` },
                { label: 'XP',         val: xp },
                { label: 'SERTIFIKAT', val: certCount },
              ].map(stat => (
                <div key={stat.label} style={{ minWidth: 80, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                  <div className="font-mono" style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 4 }}>{stat.val}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: isMobile ? 'auto' : 280, borderLeft: isMobile ? 'none' : '1px solid #EAF0F6', backgroundColor: '#FAFAFB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 28 }}>{lvl.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 2 }}>Level: {lvl.level}</div>
                <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>
                  {lvl.next ? `${lvl.target - xp} XP lagi → ${lvl.next}` : '🎉 Level tertinggi!'}
                </div>
              </div>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--surf-3)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${Math.min(100, (xp / lvl.target) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--c-teal), #0070F3)', transition: 'width 0.5s ease' }} />
            </div>
            <div className="font-mono" style={{ textAlign: 'right', fontSize: 11, fontWeight: 600, color: 'var(--c-muted)' }}>
              {xp} / {lvl.target} XP
            </div>
          </div>
        </div>

        {/* ── Info Kontak ── */}
        <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 14, fontWeight: 800, color: 'var(--c-dark)' }}>
            📇 Info Kontak
          </div>
          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Email — read only */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>✉️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Email</div>
                <div style={{ fontSize: 13, color: 'var(--c-dark)', fontWeight: 600 }}>{user.email}</div>
              </div>
            </div>

            {/* WhatsApp — editable */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>📱</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>WhatsApp</div>
                {editWa ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="tel"
                      value={waInput}
                      onChange={e => setWaInput(e.target.value)}
                      placeholder="08123456789"
                      autoFocus
                      style={{
                        flex: 1, padding: '7px 12px', borderRadius: 8,
                        border: '1.5px solid #0070F3', outline: 'none',
                        fontSize: 13, color: '#0F172A',
                      }}
                    />
                    <button
                      onClick={async () => {
                        setWaSaving(true);
                        await updateProfile({ whatsapp: waInput.trim() || null });
                        setWaSaving(false); setEditWa(false);
                      }}
                      disabled={waSaving}
                      style={{ padding: '7px 14px', borderRadius: 8, background: '#0070F3', color: 'white', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {waSaving ? '⏳' : '✓ Simpan'}
                    </button>
                    <button
                      onClick={() => setEditWa(false)}
                      style={{ padding: '7px 12px', borderRadius: 8, background: 'white', color: '#64748B', border: '1px solid #EAF0F6', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: user.whatsapp ? 'var(--c-dark)' : 'var(--c-muted)', fontWeight: user.whatsapp ? 600 : 400 }}>
                      {user.whatsapp || 'Belum ditambahkan'}
                    </span>
                    <button
                      onClick={() => { setWaInput(user.whatsapp || ''); setEditWa(true); }}
                      style={{ padding: '4px 10px', borderRadius: 6, background: '#F8FAFC', color: '#64748B', border: '1px solid #EAF0F6', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {user.whatsapp ? '✏️ Edit' : '+ Tambah'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'start' }}>


          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 14, fontWeight: 800, color: 'var(--c-dark)' }}>
              📋 Aktivitas Training & Webinar
            </div>
            {registrations.length === 0 ? (
              <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--c-muted)', fontSize: 13 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
                Belum ada registrasi training atau webinar
              </div>
            ) : registrations.filter(reg => reg.events?.title).map((reg, idx, arr) => {
              const STATUS_LABEL = {
                pending:       { label: 'Menunggu',          color: '#F7A134', bg: '#FEF3C7' },
                verified:      { label: 'Terverifikasi',     color: '#0070F3', bg: '#EFF6FF' },
                paid:          { label: 'Terbayar',          color: '#0070F3', bg: '#EFF6FF' },
                attended:      { label: 'Hadir',             color: '#00D49D', bg: '#D1FAE5' },
                quiz_unlocked: { label: 'Kuis Tersedia 🎯',  color: '#E05C7A', bg: '#FEE2E2' },
                completed:     { label: 'Selesai ✅',        color: '#15803D', bg: '#F0FDF4' },
              };
              const isWebReg = reg.events?.type === 'webinar_reguler';
              const isWebAdvFree = reg.events?.type === 'webinar_advanced' && reg.package === 'free';
              const rawS = STATUS_LABEL[reg.status] || { label: reg.status, color: '#888', bg: '#f5f5f5' };
              const s = (isWebReg && reg.status === 'paid')
                ? { label: 'Terverifikasi ✅', color: '#15803D', bg: '#F0FDF4' }
                : (isWebAdvFree && reg.status === 'paid')
                ? { label: 'Terdaftar', color: '#0070F3', bg: '#EFF6FF' }
                : rawS;
              const showZoom = reg.events?.zoom_link &&
                ['verified','paid','attended','quiz_unlocked'].includes(reg.status);
              const showExtra = reg.events?.extra_link &&
                ['verified','paid','attended','quiz_unlocked'].includes(reg.status);
              const isWebAdv = reg.events?.type === 'webinar_advanced';
              const pkg = reg.package; // 'free' | 'premium' | undefined
              const packageBadge = isWebAdv && pkg
                ? pkg === 'premium'
                  ? { label: '⭐ Premium', color: '#92400E', bg: '#FEF3C7', border: '#FDE68A' }
                  : { label: '🎟️ Free',   color: '#374151', bg: '#F3F4F6', border: '#D1D5DB' }
                : null;

              return (
                <div key={reg.id} style={{ padding: '14px 18px', borderBottom: idx < arr.length - 1 ? '1px solid #EAF0F6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--c-teal-dark)', textTransform: 'uppercase' }}>
                      {reg.events?.type?.replace(/_/g, ' ')}
                    </div>
                    {packageBadge && (
                      <div style={{
                        fontSize: 10, fontWeight: 800,
                        padding: '2px 8px', borderRadius: 20,
                        backgroundColor: packageBadge.bg,
                        color: packageBadge.color,
                        border: `1px solid ${packageBadge.border}`,
                        letterSpacing: '0.02em',
                      }}>
                        {packageBadge.label}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-dark)', marginBottom: 4, lineHeight: 1.3 }}>
                    {reg.events?.title || 'Event'}
                  </div>
                  {reg.events?.event_date && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 6 }}>
                      📅 {new Date(reg.events.event_date).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        timeZone: 'Asia/Jakarta',
                      })}{reg.events.waktu ? ` pukul ${reg.events.waktu}` : ''} WIB
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {reg.status === 'quiz_unlocked' && reg.events?.quiz_questions?.length > 0 ? (
                      <button
                        onClick={() => setQuizTarget({ event: reg.events, registration: reg })}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6,
                          backgroundColor: '#FEE2E2', color: '#DC2626',
                          border: '1px solid #FCA5A5',
                          cursor: 'pointer',
                        }}
                        title="Klik untuk mengerjakan kuis"
                      >
                        🎯 Kuis Tersedia — Kerjakan Sekarang
                      </button>
                    ) : (
                      <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, backgroundColor: s.bg, color: s.color }}>
                        {s.label}
                      </div>
                    )}
                    {showZoom && (
                      <a
                        href={reg.events.zoom_link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 10, fontWeight: 800, padding: '3px 10px',
                          borderRadius: 6, textDecoration: 'none',
                          backgroundColor: '#EFF6FF', color: '#0070F3',
                          border: '1px solid #BFDBFE',
                        }}
                      >
                        🔗 Join Zoom
                      </a>
                    )}
                    {showExtra && (
                      <a
                        href={reg.events.extra_link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 10, fontWeight: 800, padding: '3px 10px',
                          borderRadius: 6, textDecoration: 'none',
                          backgroundColor: '#F0FDF4', color: '#15803D',
                          border: '1px solid #86EFAC',
                        }}
                      >
                        {reg.events.extra_link_label || '📎 Fasilitas'}
                      </a>
                    )}
                    {reg.events?.type === 'webinar_advanced'
                      && reg.package === 'free'
                      && (reg.status === 'paid' || reg.status === 'attended' || reg.status === 'completed')
                      && (
                      <button
                        onClick={() => setUpgradeTarget(reg)}
                        style={{
                          fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 6,
                          backgroundColor: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A',
                          cursor: 'pointer',
                        }}
                      >
                        ⬆️ Upgrade ke Premium
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Riwayat Pesanan ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 14, fontWeight: 800, color: 'var(--c-dark)' }}>
              🧾 Riwayat Pesanan
            </div>
            {payments.length === 0 ? (
              <div style={{ padding: '24px 20px', textAlign: 'center', color: 'var(--c-muted)', fontSize: 13 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>🧾</div>
                Belum ada transaksi pembayaran
              </div>
            ) : payments.map((pay, idx) => {
              // Deteksi expired secara client-side (2 jam = 7.200.000ms)
              const payCreatedMs = pay.created_at ? new Date(pay.created_at).getTime() : 0;
              const isClientExpired = pay.status === 'pending' && payCreatedMs > 0 && (Date.now() - payCreatedMs > 7200000);
              const effectiveStatus = isClientExpired ? 'expired' : pay.status;

              const PAY_STATUS = {
                pending:  { label: 'Menunggu',     color: '#F59E0B', bg: '#FEF3C7' },
                paid:     { label: 'Terdaftar',    color: '#10B981', bg: '#D1FAE5' },
                expired:  { label: 'Kedaluwarsa',  color: '#6B7280', bg: '#F3F4F6' },
                failed:   { label: 'Gagal',        color: '#EF4444', bg: '#FEE2E2' },
              };
              const ps = PAY_STATUS[effectiveStatus] || PAY_STATUS.pending;
              const evTitle = pay.registrations?.events?.title || 'Event';
              const METHOD_SHORT = {
                QRIS: 'QRIS', BRIVA: 'BRI VA', BNIVA: 'BNI VA',
                MANDIRIVA: 'Mandiri VA', BCAVA: 'BCA VA',
              };
              const checkoutUrl = pay.tripay_reference
                ? `https://tripay.co.id/checkout/${pay.tripay_reference}`
                : null;
              return (
                <div key={pay.id} style={{ padding: '12px 18px', borderBottom: idx < payments.length - 1 ? '1px solid #EAF0F6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-dark)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {evTitle}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>
                        {pay.tripay_merchant_ref} · {METHOD_SHORT[pay.payment_method] || pay.payment_method}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--c-muted)' }}>
                        {new Date(pay.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 4 }}>
                        Rp {Number(pay.amount).toLocaleString('id-ID')}
                      </div>
                      <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20, backgroundColor: ps.bg, color: ps.color }}>
                        {ps.label}
                      </div>
                    </div>
                  </div>

                  {/* Tombol untuk pending (belum expired) */}
                  {effectiveStatus === 'pending' && checkoutUrl && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                      <a href={checkoutUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', flex: 1 }}>
                        <button style={{
                          width: '100%', padding: '8px 0', borderRadius: 8,
                          background: 'linear-gradient(135deg, #0070F3, #0050B3)',
                          color: 'white', border: 'none', fontSize: 12, fontWeight: 700,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}>
                          💳 Bayar Sekarang →
                        </button>
                      </a>
                      <button
                        onClick={() => onNavigate?.('pesanan', pay.tripay_merchant_ref)}
                        style={{
                          padding: '8px 14px', borderRadius: 8, flexShrink: 0,
                          background: 'white', color: '#0F172A',
                          border: '1px solid #EAF0F6', fontSize: 12, fontWeight: 700,
                          cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                      >
                        🧾 Rincian
                      </button>
                    </div>
                  )}

                  {/* Tombol untuk expired — arahkan kembali ke event untuk buat pesanan baru */}
                  {isClientExpired && (
                    <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: 11, color: '#6B7280', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span>⌛ Transaksi kedaluwarsa. Daftar ulang untuk membuat pesanan baru.</span>
                    </div>
                  )}


                </div>
              );

            })}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 14, fontWeight: 800, color: 'var(--c-dark)' }}>
              🏅 Sertifikat Saya
            </div>
            {certificates.length === 0 ? (
              <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--c-muted)', fontSize: 13 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🎓</div>
                Selesaikan kuis untuk dapat sertifikat pertamamu!
              </div>
            ) : certificates.map((cert, idx) => {
              const cfg = CERT_TYPES[cert.type] || { label: cert.type, emoji: '🏅', colorTop: [0.1,0.1,0.1], badgeBg: '#F1F5F9', badgeColor: '#64748B' };
              const [r, g, b] = cfg.colorTop;
              const accentRgb = `${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)}`;
              const isDownloading = dlLoading === cert.cert_number;
              const dateStr = cert.issued_at
                ? new Date(cert.issued_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                : '';
              return (
                <div
                  key={cert.id}
                  style={{
                    padding: '14px 18px',
                    borderBottom: idx < certificates.length - 1 ? '1px solid #EAF0F6' : 'none',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surf-2)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Baris 1: emoji + info */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                      background: `linear-gradient(135deg, rgb(${accentRgb}), rgba(${accentRgb},0.6))`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    }}>
                      {cfg.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Badge tipe */}
                      <div style={{
                        display: 'inline-block', fontSize: 9, fontWeight: 800,
                        color: cfg.badgeColor, backgroundColor: cfg.badgeBg,
                        borderRadius: 99, padding: '2px 8px',
                        textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4,
                      }}>
                        {cfg.label}
                      </div>
                      {/* Judul event */}
                      {cert.event_title && (
                        <div style={{
                          fontSize: 13, fontWeight: 700, color: 'var(--c-dark)',
                          lineHeight: 1.3, marginBottom: 4,
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {cert.event_title}
                        </div>
                      )}
                      {/* Tanggal */}
                      {dateStr && (
                        <div style={{ fontSize: 11, color: 'var(--c-muted)', marginBottom: 3 }}>
                          📅 {dateStr}
                        </div>
                      )}
                      {/* Nomor sertifikat */}
                      <div className="font-mono" style={{ fontSize: 10, color: 'var(--c-muted)', opacity: 0.7 }}>
                        {cert.cert_number}
                      </div>
                    </div>
                  </div>

                  {/* Baris 2: tombol aksi */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => handleDownloadCert(cert)}
                      disabled={isDownloading}
                      style={{
                        flex: 1, padding: '7px 0', borderRadius: 8, border: 'none',
                        background: `linear-gradient(135deg, rgb(${accentRgb}), rgba(${accentRgb},0.75))`,
                        color: 'white', fontSize: 11, fontWeight: 800,
                        cursor: isDownloading ? 'wait' : 'pointer',
                        opacity: isDownloading ? 0.7 : 1,
                        transition: 'opacity 0.2s',
                      }}
                    >
                      {isDownloading ? '⏳ Loading...' : '⬇️ Unduh PDF'}
                    </button>
                    <button
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cert.verify_url || window.location.href)}`, '_blank')}
                      style={{
                        padding: '7px 12px', borderRadius: 8,
                        border: '1px solid #DBEAFE', backgroundColor: '#EFF6FF',
                        color: '#1D4ED8', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      title="Bagikan ke LinkedIn"
                    >
                      in
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {quizTarget && (
        <QuizModal
          event={quizTarget.event}
          registration={quizTarget.registration}
          onClose={() => setQuizTarget(null)}
          onComplete={() => loadData()}
        />
      )}

      {/* ── UpgradeModal ── */}
      {upgradeTarget && (
        <UpgradeModal
          registration={upgradeTarget}
          onClose={() => setUpgradeTarget(null)}
          onUpgraded={() => loadData()}
        />
      )}
    </div>
  );
}
