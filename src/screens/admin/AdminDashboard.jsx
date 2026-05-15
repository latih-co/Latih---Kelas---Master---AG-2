import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../context/UserContext';
import { useIsMobile } from '../../utils/mobile';
import { issueCertificate } from '../../services/certificateService';
import { getAllNameChangeRequests, approveNameChange, rejectNameChange } from '../../services/nameChangeService';
import LogoWarna from '../../assets/Logo Latih Warna.png';

// ─── Sub-components ────────────────────────────────────────────
function StatCard({ emoji, label, value, color }) {
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #EAF0F6', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{emoji}</div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--c-dark)', letterSpacing: '-0.5px' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ────────────────────────────────────────────
export default function AdminDashboard({ onNavigate }) {
  const { user } = useUser();
  const isMobile = useIsMobile();

  const [tab, setTab]         = useState(() => localStorage.getItem('admin_tab') || 'dashboard');
  const [stats, setStats]     = useState({ users: 0, events: 0, registrations: 0, revenue: 0 });
  const [events, setEvents]   = useState([]);
  const [regs, setRegs]       = useState([]);
  const [pendingIG, setPendingIG] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState({}); // { [regId]: true }
  const [nameReqs, setNameReqs]   = useState([]);
  const [rejectTarget, setRejectTarget] = useState(null); // { id, userId, oldName, newName }
  const [rejectNote, setRejectNote]     = useState('');
  const [nameActioning, setNameActioning] = useState('');

  // ── Filter state ───────────────────────────────────────────
  const [filterRegType,   setFilterRegType]   = useState('all');
  const [filterRegStatus, setFilterRegStatus] = useState('all');
  const [filterEvType,    setFilterEvType]    = useState('all');
  const [filterEvActive,  setFilterEvActive]  = useState('all');
  const [userStats,       setUserStats]       = useState([]);
  const [selectedUser,    setSelectedUser]    = useState(null);
  const [userSearch,      setUserSearch]      = useState('');

  // Derived filtered arrays
  const filteredRegs = regs.filter(r => {
    const typeOk   = filterRegType   === 'all' || r.events?.type === filterRegType;
    const statusOk = filterRegStatus === 'all' || r.status       === filterRegStatus;
    return typeOk && statusOk;
  });
  const filteredEvents = events.filter(ev => {
    const typeOk   = filterEvType   === 'all' || ev.type === filterEvType;
    const activeOk = filterEvActive === 'all'
      || (filterEvActive === 'aktif'    &&  ev.is_active)
      || (filterEvActive === 'nonaktif' && !ev.is_active);
    return typeOk && activeOk;
  });

  // Redirect non-admin
  useEffect(() => {
    if (user && user.role !== 'admin') onNavigate('beranda');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('admin_tab', tab);
    loadAll();
  }, [tab]);

  const loadAll = async () => {
    setLoading(true);
    try {
      // ── Query dasar (tanpa join) ────────────────────────────────
      const [
        { count: userCount },
        { count: eventCount },
        { count: regCount },
        { data: eventsData },
        { data: paymentsData },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*').order('event_date', { ascending: false }),
        supabase.from('payments').select('amount').eq('status', 'paid'),
      ]);

      // ── Registrasi terbaru + pending (tanpa join, hindari FK error) ──
      const { data: regsRaw }    = await supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(200);
      const { data: pendingRaw } = await supabase.from('registrations').select('*').eq('status', 'pending').order('created_at', { ascending: true });
      const { data: profilesRaw } = await supabase.from('profiles').select('id, name, job_role, email');

      // Fetch payments untuk join ke registrasi (channel + amount)
      const { data: paymentsRaw } = await supabase.from('payments').select('registration_id, payment_method, amount, status').order('created_at', { ascending: false });
      // Map: registration_id → payment (ambil yang pertama/terbaru)
      const paymentMap = {};
      for (const p of (paymentsRaw || [])) {
        if (!paymentMap[p.registration_id]) paymentMap[p.registration_id] = p;
      }

      // Map profiles dan events by id untuk lookup cepat
      const profileMap = Object.fromEntries((profilesRaw || []).map(p => [p.id, p]));
      const eventMap   = Object.fromEntries((eventsData  || []).map(e => [e.id, e]));

      // Gabungkan manual
      const regsData    = (regsRaw    || []).map(r => ({ ...r, profiles: profileMap[r.user_id], events: eventMap[r.event_id], payment: paymentMap[r.id] || null }));
      const pendingMerged = (pendingRaw || []).map(r => ({ ...r, profiles: profileMap[r.user_id], events: eventMap[r.event_id], payment: paymentMap[r.id] || null }));

      console.log('[Admin] pendingIG:', pendingMerged.length, 'rows', pendingMerged);

      const revenue = (paymentsData || []).reduce((s, p) => s + (p.amount || 0), 0);
      setStats({ users: userCount || 0, events: eventCount || 0, registrations: regCount || 0, revenue });
      setEvents(eventsData || []);
      setRegs(regsData);
      setPendingIG(pendingMerged);

      // ── Agregasi data per user ──
      const userStatsData = (profilesRaw || []).map(profile => {
        const userRegs = regsData.filter(r => r.user_id === profile.id);
        const totalSpend = userRegs.reduce((sum, r) => sum + (r.payment?.amount || 0), 0);
        const channels = [...new Set(userRegs.map(r => r.payment?.payment_method).filter(Boolean))];
        const completedCount = userRegs.filter(r => r.status === 'completed').length;
        return { ...profile, regs: userRegs, totalSpend, channels, completedCount };
      }).sort((a, b) => b.totalSpend - a.totalSpend || b.regs.length - a.regs.length);
      setUserStats(userStatsData);

      // ── Name change requests ──
      const { data: ncrData } = await getAllNameChangeRequests();
      setNameReqs(ncrData || []);
    } catch (err) {
      console.error('[Admin] loadAll error:', err);
    } finally {
      setLoading(false);
    }
  };

  const verifyIgReg = async (reg) => {
    setVerifying(prev => ({ ...prev, [reg.id]: true }));
    // Update status: pending → paid (Zoom link langsung muncul di Profil user)
    const { error } = await supabase
      .from('registrations')
      .update({ status: 'paid' })
      .eq('id', reg.id);
    if (!error) {
      // Coba kirim email Zoom jika edge function sudah di-deploy
      try {
        await supabase.functions.invoke('send-zoom-email', {
          body: {
            email:       reg._email || '',   // akan diisi jika tersedia
            zoom_link:   reg.events?.zoom_link || '',
            event_title: reg.events?.title || 'Webinar',
          },
        });
      } catch (_) { /* edge function belum deploy — skip, user cek Profil */ }
      loadAll();
    }
    setVerifying(prev => ({ ...prev, [reg.id]: false }));
  };

  const unlockQuiz = async (regId) => {
    await supabase.from('registrations').update({ status: 'quiz_unlocked' }).eq('id', regId);
    loadAll();
  };

  // Webinar Advanced paket free — selesai tanpa kuis & tanpa sertifikat
  const completeWithoutCert = async (regId) => {
    await supabase.from('registrations').update({ status: 'completed' }).eq('id', regId);
    loadAll();
  };

  const markAttended = async (regId) => {
    await supabase.from('registrations').update({ status: 'attended' }).eq('id', regId);
    loadAll();
  };

  const toggleEventActive = async (ev) => {
    await supabase.from('events').update({ is_active: !ev.is_active }).eq('id', ev.id);
    loadAll();
  };

  const issueCert = async (reg) => {
    // Map event type ke certificate type
    const typeMap = { training: 'training', webinar_reguler: 'webinar_reguler', webinar_advanced: 'webinar_advanced' };
    const certType = typeMap[reg.events?.type] || 'training';
    await issueCertificate({
      userId:         reg.user_id,
      type:           certType,
      eventTitle:     reg.events?.title || 'Event',
      holderName:     reg.profiles?.name || null,
      registrationId: reg.id,
    });
    // Update status registrasi ke completed
    await supabase.from('registrations').update({ status: 'completed' }).eq('id', reg.id);
    loadAll();
  };

  // ── Download Excel (CSV UTF-8 BOM, kompatibel Excel) ──────────
  const downloadRegsExcel = (rows) => {
    const STATUS_LABEL = { pending: 'Menunggu', verified: 'Terverifikasi', paid: 'Terbayar', attended: 'Hadir', quiz_unlocked: 'Kuis Terbuka', completed: 'Selesai', rejected: 'Ditolak' };
    const headers = ['No','Tanggal Daftar','Waktu','Nama','Email','Event','Jenis Event','Paket','Channel Pembayaran','Nominal (Rp)','Status'];
    const csvRows = [headers.join(';')];
    rows.forEach((reg, i) => {
      const isFree = !reg.events?.price_regular || reg.events.price_regular === 0;
      const nominal = reg.payment?.amount ?? (isFree ? 0 : '');
      const channel = reg.payment?.payment_method || (isFree ? 'Gratis' : '');
      const tgl = new Date(reg.created_at);
      const row = [
        i + 1,
        tgl.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        tgl.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        reg.profiles?.name || '',
        reg.profiles?.email || '',
        `"${(reg.events?.title || '').replace(/"/g,'""')}"`,
        reg.events?.type?.replace(/_/g,' ') || '',
        reg.package || '',
        channel,
        nominal,
        STATUS_LABEL[reg.status] || reg.status || '',
      ];
      csvRows.push(row.join(';'));
    });
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `registrasi-latih-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Download User Data Excel ──
  const downloadUsersExcel = () => {
    const STATUS_LABEL = { pending: 'Menunggu', verified: 'Terverifikasi', paid: 'Terbayar', attended: 'Hadir', quiz_unlocked: 'Kuis Terbuka', completed: 'Selesai', rejected: 'Ditolak' };
    const headers = ['No','Nama','Email','Jabatan','Total Event','Selesai','Channel Pembayaran','Total Pengeluaran (Rp)','Detail Event'];
    const csvRows = [headers.join(';')];
    userStats.forEach((u, i) => {
      const detailEvents = u.regs.map(r =>
        `${r.events?.title || '?'} (${STATUS_LABEL[r.status] || r.status})`
      ).join(' | ');
      const row = [
        i + 1,
        u.name || '',
        u.email || '',
        u.job_role || '',
        u.regs.length,
        u.completedCount,
        u.channels.join(', ') || 'Gratis',
        u.totalSpend,
        `"${detailEvents.replace(/"/g, '""')}"`,
      ];
      csvRows.push(row.join(';'));
    });
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `data-user-latih-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TABS = [
    { id: 'dashboard',     label: '📊 Dashboard' },
    { id: 'events',        label: '📅 Events' },
    { id: 'registrations', label: '📋 Registrasi' },
    { id: 'users',         label: '👥 Data User' },
    { id: 'verify_ig',     label: `⚡ Verifikasi IG${pendingIG.length > 0 ? ` (${pendingIG.length})` : ''}` },
    { id: 'name_changes',  label: `✏️ Koreksi Nama${nameReqs.filter(r => r.status === 'pending').length > 0 ? ` (${nameReqs.filter(r => r.status === 'pending').length})` : ''}` },
  ];

  const STATUS_COLORS = {
    pending:       { bg: '#FEF3C7', color: '#D97706', label: 'Menunggu' },
    verified:      { bg: '#EFF6FF', color: '#1D4ED8', label: 'Terverifikasi' },
    paid:          { bg: '#ECFDF5', color: '#15803D', label: 'Terbayar' },
    attended:      { bg: '#F0FDF4', color: '#15803D', label: 'Hadir' },
    quiz_unlocked: { bg: '#FEE2E2', color: '#DC2626', label: '🎯 Kuis Terbuka' },
    completed:     { bg: '#F0FDF4', color: '#15803D', label: '✅ Selesai' },
  };
  // Helper: label berbeda untuk webinar reguler yang sudah dikonfirmasi admin
  const getS = (reg) => {
    const base = STATUS_COLORS[reg.status] || { bg: '#F1F5F9', color: '#64748B', label: reg.status };
    if (reg.events?.type === 'webinar_reguler' && reg.status === 'paid')
      return { ...base, label: 'Terkonfirmasi' };
    return base;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #EAF0F6', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={LogoWarna} alt="Latih" style={{ height: 28, objectFit: 'contain' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', background: '#F1F5F9', padding: '3px 10px', borderRadius: 6, letterSpacing: '0.03em' }}>Admin</span>
        </div>
        <button onClick={() => onNavigate('beranda')} style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-muted)', background: 'none', border: '1px solid #EAF0F6', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>
          ← Kembali ke App
        </button>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Sidebar */}
        <div style={{ width: 200, backgroundColor: 'white', borderRight: '1px solid #EAF0F6', padding: '16px 0', flexShrink: 0, display: isMobile ? 'none' : 'block' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 20px', fontSize: 13, fontWeight: tab === t.id ? 800 : 600, color: tab === t.id ? '#0070F3' : 'var(--c-muted)', backgroundColor: tab === t.id ? '#EFF6FF' : 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s', borderLeft: tab === t.id ? '3px solid #0070F3' : '3px solid transparent' }}>
              {t.label}
            </button>
          ))}
          <div style={{ height: 1, backgroundColor: '#EAF0F6', margin: '12px 0' }} />
          <button onClick={() => onNavigate('admin_new_event')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 20px', fontSize: 13, fontWeight: 700, color: '#00D49D', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            ＋ Buat Event Baru
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {/* Mobile tabs */}
          {isMobile && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{ flexShrink: 0, padding: '8px 14px', fontSize: 12, fontWeight: 700, borderRadius: 99, border: 'none', cursor: 'pointer', backgroundColor: tab === t.id ? '#0070F3' : 'white', color: tab === t.id ? 'white' : 'var(--c-muted)' }}>
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {loading && <div style={{ textAlign: 'center', padding: 60, color: 'var(--c-muted)', fontSize: 14 }}>⏳ Memuat data...</div>}

          {/* ── TAB: Dashboard ── */}
          {!loading && tab === 'dashboard' && (
            <div>
              <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: '0 0 20px 0', fontSize: 20 }}>Dashboard</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
                <StatCard emoji="👥" label="Total User"       value={stats.users}         color="#0070F3" />
                <StatCard emoji="📅" label="Total Event"      value={stats.events}        color="#00D49D" />
                <StatCard emoji="📋" label="Registrasi"       value={stats.registrations} color="#F7A134" />
                <StatCard emoji="💰" label="Revenue"          value={`Rp ${(stats.revenue/1000).toFixed(0)}k`} color="#E05C7A" />
              </div>

              {/* Recent Registrations */}
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #EAF0F6', fontWeight: 800, fontSize: 14, color: 'var(--c-dark)' }}>Registrasi Terbaru</div>
                {regs.slice(0, 8).map(reg => {
                  const s = getS(reg);
                  return (
                    <div key={reg.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid #F8FAFC', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-dark)' }}>{reg.profiles?.name || '—'}</div>
                        <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>{reg.events?.title} · {reg.events?.type?.replace('_',' ')}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── TAB: Events ── */}
          {!loading && tab === 'events' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: 0, fontSize: 20 }}>Event</h2>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{filteredEvents.length} dari {events.length} event</span>
                  <button onClick={() => onNavigate('admin_new_event')} style={{ backgroundColor: '#0070F3', color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>＋ Buat Event</button>
                </div>
              </div>

              {/* Filter bar Events */}
              <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #EAF0F6', padding: '12px 16px', marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>JENIS:</span>
                  {[['all','Semua'],['training','🏭 Training'],['webinar_reguler','🎁 W. Reguler'],['webinar_advanced','⭐ W. Advanced']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterEvType(v)} style={{
                      padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                      backgroundColor: filterEvType === v ? '#0070F3' : '#F1F5F9',
                      color: filterEvType === v ? 'white' : '#64748B',
                    }}>{l}</button>
                  ))}
                </div>
                <div style={{ width: 1, height: 20, backgroundColor: '#E2E8F0' }} />
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>STATUS:</span>
                  {[['all','Semua'],['aktif','● Aktif'],['nonaktif','○ Nonaktif']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterEvActive(v)} style={{
                      padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                      backgroundColor: filterEvActive === v ? '#0F172A' : '#F1F5F9',
                      color: filterEvActive === v ? 'white' : '#64748B',
                    }}>{l}</button>
                  ))}
                </div>
                {(filterEvType !== 'all' || filterEvActive !== 'all') && (
                  <button onClick={() => { setFilterEvType('all'); setFilterEvActive('all'); }} style={{ fontSize: 11, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                    × Reset
                  </button>
                )}
              </div>

              {/* ── Tabel Events ── */}
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                {filteredEvents.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--c-muted)', fontSize: 13 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
                    {events.length === 0 ? 'Belum ada event. Klik "＋ Buat Event" untuk mulai.' : 'Tidak ada event yang sesuai filter.'}
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EAF0F6' }}>
                          {['No', 'Nama Event', 'Waktu Pelaksanaan', 'Kategori', 'Harga', 'Status', 'Aksi'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: '#64748B', whiteSpace: 'nowrap', fontSize: 11, letterSpacing: '0.04em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.map((ev, idx) => {
                          const TYPE_LABEL = {
                            training:         { label: 'Training',      bg: '#EFF6FF', color: '#1D4ED8' },
                            webinar_reguler:  { label: 'W. Reguler',    bg: '#F0FDF4', color: '#15803D' },
                            webinar_advanced: { label: 'W. Advanced',   bg: '#FFFBEB', color: '#B45309' },
                          };
                          const typeStyle = TYPE_LABEL[ev.type] || { label: ev.type, bg: '#F1F5F9', color: '#64748B' };
                          const harga = ev.price_regular === 0
                            ? 'Gratis'
                            : `Rp ${(ev.price_regular/1000).toFixed(0)}k`
                              + (ev.price_premium > 0 ? ` / Rp ${(ev.price_premium/1000).toFixed(0)}k` : '');
                          return (
                            <tr key={ev.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFBFC'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600, width: 36 }}>{idx + 1}</td>
                              <td style={{ padding: '10px 14px', maxWidth: 240 }}>
                                <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 12, lineHeight: 1.4 }}>{ev.title}</div>
                              </td>
                              <td style={{ padding: '10px 14px', color: '#64748B', whiteSpace: 'nowrap' }}>
                                {ev.event_date
                                  ? new Date(ev.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                                  : <span style={{ color: '#CBD5E1' }}>—</span>}
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, backgroundColor: typeStyle.bg, color: typeStyle.color }}>
                                  {typeStyle.label}
                                </span>
                              </td>
                              <td style={{ padding: '10px 14px', fontWeight: 700, color: ev.price_regular === 0 ? '#15803D' : '#0F172A', whiteSpace: 'nowrap' }}>
                                {harga}
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <button
                                  onClick={() => toggleEventActive(ev)}
                                  title={ev.is_active ? 'Klik untuk Nonaktifkan' : 'Klik untuk Aktifkan'}
                                  style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 5,
                                    fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 99,
                                    border: 'none', cursor: 'pointer',
                                    backgroundColor: ev.is_active ? '#F0FDF4' : '#F8FAFC',
                                    color: ev.is_active ? '#15803D' : '#94A3B8',
                                    transition: 'all 0.15s',
                                  }}
                                >
                                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: ev.is_active ? '#22C55E' : '#CBD5E1', flexShrink: 0 }} />
                                  {ev.is_active ? 'Aktif' : 'Nonaktif'}
                                </button>
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <button
                                  onClick={() => onNavigate('admin_edit_event', ev)}
                                  style={{ fontSize: 11, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  ✏️ Edit
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB: Data User ── */}
          {!loading && tab === 'users' && (() => {
            const STATUS_LABEL = { pending: 'Menunggu', verified: 'Terverifikasi', paid: 'Terbayar', attended: 'Hadir', quiz_unlocked: 'Kuis Terbuka', completed: 'Selesai', rejected: 'Ditolak' };
            const TYPE_ICON = { training: '🏥', webinar_reguler: '🎤', webinar_advanced: '⭐' };
            const filtered = userStats.filter(u => {
              const q = userSearch.toLowerCase();
              return !q || (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.job_role || '').toLowerCase().includes(q);
            });
            return (
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                  <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: 0, fontSize: 20 }}>👥 Data User</h2>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{filtered.length} dari {userStats.length} user</span>
                    <button
                      onClick={() => { loadAll(); }}
                      style={{ fontSize: 12, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}
                    >
                      ↻ Refresh
                    </button>
                    <button
                      onClick={downloadUsersExcel}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#16A34A', color: 'white', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      ⬇ Download Excel
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #EAF0F6', padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#94A3B8', fontSize: 14 }}>🔍</span>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    placeholder="Cari nama, email, atau jabatan..."
                    style={{ border: 'none', outline: 'none', fontSize: 13, color: '#0F172A', flex: 1, fontFamily: "'Inter', sans-serif", backgroundColor: 'transparent' }}
                  />
                  {userSearch && <button onClick={() => setUserSearch('')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: 14 }}>×</button>}
                </div>

                {/* Tabel User */}
                <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                  {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--c-muted)', fontSize: 13 }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>Belum ada data user
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <thead>
                          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EAF0F6' }}>
                            {['No','Nama & Jabatan','Email','Total Event','Selesai','Total Pengeluaran','Channel','Aksi'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: '#64748B', whiteSpace: 'nowrap', fontSize: 11, letterSpacing: '0.04em' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((u, idx) => (
                            <tr key={u.id}
                              style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s', cursor: 'pointer' }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFBFC'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td style={{ padding: '10px 14px', color: '#94A3B8', fontWeight: 600, width: 36 }}>{idx + 1}</td>
                              <td style={{ padding: '10px 14px', minWidth: 160 }}>
                                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 12 }}>{u.name || '—'}</div>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>{u.job_role || 'Profesional Industri'}</div>
                              </td>
                              <td style={{ padding: '10px 14px', color: '#64748B', fontSize: 11 }}>{u.email || '—'}</td>
                              <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                                <span style={{ fontWeight: 800, color: '#0F172A' }}>{u.regs.length}</span>
                              </td>
                              <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                                <span style={{ fontWeight: 800, color: u.completedCount > 0 ? '#15803D' : '#94A3B8' }}>{u.completedCount}</span>
                              </td>
                              <td style={{ padding: '10px 14px', fontWeight: 800, whiteSpace: 'nowrap', color: u.totalSpend > 0 ? '#0F172A' : '#94A3B8' }}>
                                {u.totalSpend > 0 ? `Rp ${u.totalSpend.toLocaleString('id-ID')}` : 'Gratis'}
                              </td>
                              <td style={{ padding: '10px 14px', maxWidth: 120 }}>
                                {u.channels.length > 0
                                  ? u.channels.map(ch => (
                                      <span key={ch} style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, backgroundColor: '#F1F5F9', color: '#475569', marginRight: 4, marginBottom: 2 }}>{ch}</span>
                                    ))
                                  : <span style={{ color: '#94A3B8', fontSize: 11 }}>Gratis</span>
                                }
                              </td>
                              <td style={{ padding: '10px 14px' }}>
                                <button
                                  onClick={() => setSelectedUser(u)}
                                  style={{ fontSize: 11, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                >
                                  🔎 Detail
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── TAB: Registrasi ── */}
          {!loading && tab === 'registrations' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: 0, fontSize: 20 }}>Manajemen Registrasi</h2>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{filteredRegs.length} dari {regs.length} data</span>
                  <button
                    onClick={() => downloadRegsExcel(filteredRegs)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#16A34A', color: 'white', border: 'none', borderRadius: 10, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                  >
                    ⬇ Download Excel
                  </button>
                </div>
              </div>

              {/* Filter bar */}
              <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #EAF0F6', padding: '12px 16px', marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>JENIS:</span>
                  {[['all','Semua'],['training','🏭 Training'],['webinar_reguler','🎁 W. Reguler'],['webinar_advanced','⭐ W. Advanced']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterRegType(v)} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', backgroundColor: filterRegType === v ? '#0070F3' : '#F1F5F9', color: filterRegType === v ? 'white' : '#64748B' }}>{l}</button>
                  ))}
                </div>
                <div style={{ width: 1, height: 20, backgroundColor: '#E2E8F0' }} />
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>STATUS:</span>
                  {[['all','Semua'],['pending','Menunggu'],['paid','Terbayar'],['attended','Hadir'],['quiz_unlocked','Kuis'],['completed','Selesai']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterRegStatus(v)} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', backgroundColor: filterRegStatus === v ? '#0F172A' : '#F1F5F9', color: filterRegStatus === v ? 'white' : '#64748B' }}>{l}</button>
                  ))}
                </div>
                {(filterRegType !== 'all' || filterRegStatus !== 'all') && (
                  <button onClick={() => { setFilterRegType('all'); setFilterRegStatus('all'); }} style={{ fontSize: 11, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>× Reset</button>
                )}
              </div>

              {/* ── Tabel Registrasi ── */}
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                {filteredRegs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--c-muted)', fontSize: 13 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
                    Tidak ada data yang sesuai filter
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EAF0F6' }}>
                          {['No','Tanggal Daftar','Nama','Email','Event','Paket','Channel','Nominal','Status','Aksi'].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, color: '#64748B', whiteSpace: 'nowrap', fontSize: 11, letterSpacing: '0.04em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRegs.map((reg, idx) => {
                          const s = getS(reg);
                          const isFree = !reg.events?.price_regular || reg.events.price_regular === 0;
                          const nominal = reg.payment?.amount ?? (isFree ? 0 : null);
                          const channel = reg.payment?.payment_method || (isFree ? 'Gratis' : '—');
                          const email = reg.profiles?.email || '—';
                          return (
                            <tr key={reg.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }}
                              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAFBFF'}
                              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <td style={{ padding: '12px 14px', color: '#94A3B8', fontWeight: 700 }}>{idx + 1}</td>
                              <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#475569' }}>
                                {new Date(reg.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}<br />
                                <span style={{ color: '#94A3B8', fontSize: 10 }}>{new Date(reg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                              </td>
                              <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>{reg.profiles?.name || '—'}</td>
                              <td style={{ padding: '12px 14px', color: '#475569', maxWidth: 180 }}>
                                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</span>
                              </td>
                              <td style={{ padding: '12px 14px', maxWidth: 200 }}>
                                <div style={{ fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{reg.events?.title || '—'}</div>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{reg.events?.type?.replace(/_/g,' ') || ''}</div>
                              </td>
                              <td style={{ padding: '12px 14px' }}>
                                <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700, backgroundColor: reg.package === 'premium' ? '#EFF6FF' : '#F1F5F9', color: reg.package === 'premium' ? '#1D4ED8' : '#64748B' }}>{reg.package || '—'}</span>
                              </td>
                              <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', fontWeight: 600, color: '#475569' }}>{channel}</td>
                              <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', fontWeight: 800, color: nominal === 0 ? '#16A34A' : '#0F172A' }}>
                                {nominal === null ? '—' : nominal === 0 ? 'Gratis' : `Rp ${nominal.toLocaleString('id-ID')}`}
                              </td>
                              <td style={{ padding: '12px 14px' }}>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, backgroundColor: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
                              </td>
                              <td style={{ padding: '12px 14px' }}>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                  {reg.status === 'paid' && (
                                    <button onClick={() => markAttended(reg.id)} style={{ fontSize: 10, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>✓ Hadir</button>
                                  )}
                                  {reg.status === 'attended' && (() => {
                                    const isAdv = reg.events?.type === 'webinar_advanced';
                                    const isPrem = reg.package === 'premium';
                                    const hasQ = reg.events?.quiz_questions?.length > 0;
                                    if (isAdv && !isPrem) return <button onClick={() => completeWithoutCert(reg.id)} style={{ fontSize: 10, fontWeight: 700, color: '#15803D', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>✓ Selesai</button>;
                                    if (hasQ) return <button onClick={() => unlockQuiz(reg.id)} style={{ fontSize: 10, fontWeight: 700, color: 'white', background: '#E05C7A', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap' }}>🎯 Buka Kuis</button>;
                                    return <span style={{ fontSize: 10, color: '#94A3B8', fontStyle: 'italic' }}>Tidak ada kuis</span>;
                                  })()}
                                  {reg.status === 'quiz_unlocked' && <span style={{ fontSize: 10, fontWeight: 700, color: '#E05C7A', whiteSpace: 'nowrap' }}>🎯 Menunggu</span>}
                                  {reg.status === 'completed' && <span style={{ fontSize: 10, fontWeight: 700, color: '#15803D', whiteSpace: 'nowrap' }}>{reg.events?.type === 'webinar_advanced' && reg.package !== 'premium' ? '✓ Selesai' : '🏅 Sertifikat'}</span>}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* ── TAB: Verifikasi IG ── */}
          {!loading && tab === 'verify_ig' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: '0 0 4px 0', fontSize: 20 }}>Verifikasi Peserta Webinar Reguler</h2>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--c-muted)' }}>Cocokkan kode DM Instagram, lalu klik Konfirmasi untuk mengaktifkan akses Zoom.</p>
                </div>
              </div>

              {pendingIG.length === 0 ? (
                <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: '48px 24px', textAlign: 'center', color: 'var(--c-muted)' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Tidak ada registrasi yang menunggu verifikasi</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {pendingIG.map(reg => (
                    <div key={reg.id} style={{ backgroundColor: 'white', borderRadius: 16, border: '2px solid #FEF3C7', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        {/* User info */}
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--c-dark)', marginBottom: 4 }}>
                          {reg.profiles?.name || '—'}
                        </div>
                        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>
                          📅 Daftar: {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>

                        {/* Kode verifikasi */}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                          {reg.ig_username && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#FDF2F8', border: '1px solid #F0ABFC', borderRadius: 8, padding: '6px 12px' }}>
                              <span style={{ fontSize: 14 }}>📸</span>
                              <span style={{ fontSize: 13, fontWeight: 700, color: '#7E22CE' }}>{reg.ig_username}</span>
                            </div>
                          )}
                          {reg.verify_code && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '6px 12px' }}>
                              <span style={{ fontSize: 14 }}>🔑</span>
                              <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: '#15803D', letterSpacing: 1 }}>{reg.verify_code}</span>
                            </div>
                          )}
                        </div>

                        {/* Event info */}
                        <div style={{ marginTop: 8, fontSize: 11, color: '#94A3B8' }}>
                          📋 {reg.events?.title || 'Webinar'}
                          {!reg.events?.zoom_link && <span style={{ marginLeft: 8, color: '#EF4444', fontWeight: 700 }}>⚠️ Zoom link belum diisi di event!</span>}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => verifyIgReg(reg)}
                          disabled={verifying[reg.id]}
                          style={{
                            padding: '10px 20px', backgroundColor: verifying[reg.id] ? '#94A3B8' : '#15803D',
                            color: 'white', border: 'none', borderRadius: 10,
                            fontSize: 13, fontWeight: 800, cursor: verifying[reg.id] ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s', whiteSpace: 'nowrap',
                          }}
                        >
                          {verifying[reg.id] ? '⏳ Memproses...' : '✅ Konfirmasi & Aktifkan'}
                        </button>
                        <button
                          onClick={() => { if(window.confirm('Tolak pendaftaran ini?')) supabase.from('registrations').update({ status: 'rejected' }).eq('id', reg.id).then(loadAll); }}
                          style={{ padding: '8px 16px', backgroundColor: 'white', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                        >
                          ✕ Tolak
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal Detail User ── */}
      {selectedUser && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) setSelectedUser(null); }}
        >
          <div style={{
            width: '100%', maxWidth: 520,
            backgroundColor: 'white', height: '100%', overflowY: 'auto',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
            fontFamily: "'Inter', sans-serif",
            animation: 'slideIn 0.25s ease',
          }}>
            {/* Header modal */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAF0F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: 16, color: '#0F172A' }}>{selectedUser.name || '—'}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{selectedUser.email} • {selectedUser.job_role || 'Profesional Industri'}</div>
              </div>
              <button onClick={() => setSelectedUser(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 16, cursor: 'pointer', color: '#64748B' }}>×</button>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {[
                  { label: 'Total Event', value: selectedUser.regs.length, color: '#0070F3' },
                  { label: 'Selesai', value: selectedUser.completedCount, color: '#15803D' },
                  { label: 'Pengeluaran', value: selectedUser.totalSpend > 0 ? `Rp ${(selectedUser.totalSpend/1000).toFixed(0)}k` : 'Gratis', color: selectedUser.totalSpend > 0 ? '#B45309' : '#15803D' },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '12px 14px', border: '1px solid #EAF0F6' }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Channel pembayaran */}
              {selectedUser.channels.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Channel Pembayaran</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {selectedUser.channels.map(ch => (
                      <span key={ch} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 8, backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>{ch}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daftar aktivitas event */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Aktivitas Training & Webinar</div>
                {selectedUser.regs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', color: '#94A3B8', fontSize: 12, backgroundColor: '#F8FAFC', borderRadius: 12 }}>Belum ada registrasi</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {selectedUser.regs.map(reg => {
                      const STATUS_LABEL = { pending: 'Menunggu', verified: 'Terverifikasi', paid: 'Terbayar', attended: 'Hadir', quiz_unlocked: 'Kuis Terbuka', completed: 'Selesai', rejected: 'Ditolak' };
                      const STATUS_COLOR = { pending: '#D97706', verified: '#1D4ED8', paid: '#0070F3', attended: '#15803D', quiz_unlocked: '#DC2626', completed: '#15803D', rejected: '#EF4444' };
                      const TYPE_BADGE = { training: { label: 'Training', bg: '#EFF6FF', color: '#1D4ED8' }, webinar_reguler: { label: 'W. Reguler', bg: '#F0FDF4', color: '#15803D' }, webinar_advanced: { label: 'W. Advanced', bg: '#FFFBEB', color: '#B45309' } };
                      const typeBadge = TYPE_BADGE[reg.events?.type] || { label: reg.events?.type || '?', bg: '#F1F5F9', color: '#64748B' };
                      const amount = reg.payment?.amount;
                      return (
                        <div key={reg.id} style={{ border: '1px solid #EAF0F6', borderRadius: 12, padding: '12px 14px', backgroundColor: '#FAFBFC' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                            <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A', lineHeight: 1.4, flex: 1 }}>{reg.events?.title || 'Event tidak ditemukan'}</div>
                            <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 4, backgroundColor: typeBadge.bg, color: typeBadge.color, flexShrink: 0, whiteSpace: 'nowrap' }}>{typeBadge.label}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, backgroundColor: '#F1F5F9', color: STATUS_COLOR[reg.status] || '#64748B' }}>
                              {STATUS_LABEL[reg.status] || reg.status}
                            </span>
                            {reg.events?.event_date && (
                              <span style={{ fontSize: 10, color: '#94A3B8' }}>
                                📅 {new Date(reg.events.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                            {amount > 0 && (
                              <span style={{ fontSize: 10, fontWeight: 700, color: '#B45309', marginLeft: 'auto' }}>Rp {amount.toLocaleString('id-ID')}</span>
                            )}
                            {amount === 0 && <span style={{ fontSize: 10, color: '#15803D', fontWeight: 700, marginLeft: 'auto' }}>Gratis</span>}
                            {reg.payment?.payment_method && (
                              <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }}>{reg.payment.payment_method}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Koreksi Nama ── */}
      {!loading && tab === 'name_changes' && (
        <div style={{ padding: isMobile ? '16px' : '24px 32px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--c-dark)', margin: '0 0 16px' }}>✏️ Permintaan Koreksi Nama</h2>

          {nameReqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: 16, border: '1px solid #EAF0F6', color: 'var(--c-muted)', fontSize: 14 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
              Belum ada permintaan koreksi nama.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {nameReqs.map(req => {
                const statusCfg = {
                  pending:  { bg: '#FEF3C7', color: '#B45309', label: '⏳ Menunggu' },
                  approved: { bg: '#D1FAE5', color: '#065F46', label: '✅ Disetujui' },
                  rejected: { bg: '#FEE2E2', color: '#991B1B', label: '❌ Ditolak' },
                }[req.status] || { bg: '#F1F5F9', color: '#64748B', label: req.status };

                return (
                  <div key={req.id} style={{ background: 'white', borderRadius: 14, border: '1px solid #EAF0F6', padding: '16px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-muted)', marginBottom: 6 }}>
                          👤 {req.profiles?.name || '-'} &nbsp;·&nbsp; {req.profiles?.email || '-'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B', textDecoration: 'line-through' }}>{req.old_name}</span>
                          <span style={{ fontSize: 14, color: '#94A3B8' }}>→</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{req.new_name}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', background: '#F8FAFC', borderRadius: 8, padding: '6px 10px', marginBottom: 6, lineHeight: 1.5 }}>
                          💬 {req.reason}
                        </div>
                        {req.admin_note && (
                          <div style={{ fontSize: 11, color: '#B45309', background: '#FEF3C7', borderRadius: 6, padding: '4px 8px' }}>
                            Catatan admin: {req.admin_note}
                          </div>
                        )}
                        <div style={{ fontSize: 10, color: 'var(--c-muted)', marginTop: 4 }}>
                          {new Date(req.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, backgroundColor: statusCfg.bg, color: statusCfg.color, flexShrink: 0 }}>
                        {statusCfg.label}
                      </span>
                    </div>

                    {req.status === 'pending' && (
                      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          disabled={nameActioning === req.id}
                          onClick={async () => {
                            setNameActioning(req.id);
                            await approveNameChange(
                              req.id,
                              req.user_id,
                              req.new_name,
                              req.profiles?.email,
                              req.old_name,
                              req.profiles?.name
                            );
                            setNameActioning('');
                            await loadAll();
                          }}
                          style={{ padding: '8px 18px', borderRadius: 8, background: '#059669', color: 'white', border: 'none', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
                        >
                          {nameActioning === req.id ? '⏳...' : '✅ Approve'}
                        </button>
                        <button
                          onClick={() => { setRejectTarget(req); setRejectNote(''); }}
                          style={{ padding: '8px 18px', borderRadius: 8, background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                        >
                          ❌ Tolak
                        </button>
                      </div>
                    )}

                    {rejectTarget?.id === req.id && (
                      <div style={{ marginTop: 12, padding: '12px', background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 10 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#B91C1C', marginBottom: 8 }}>Catatan penolakan (opsional)</div>
                        <input
                          type="text" value={rejectNote}
                          onChange={e => setRejectNote(e.target.value)}
                          placeholder="Mis: Nama tidak sesuai identitas resmi"
                          style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: 8, border: '1px solid #FECACA', fontSize: 12, outline: 'none', marginBottom: 8 }}
                        />
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            disabled={nameActioning === req.id}
                            onClick={async () => {
                              setNameActioning(req.id);
                              await rejectNameChange(
                                req.id,
                                rejectNote,
                                req.profiles?.email,
                                req.old_name,
                                req.new_name,
                                req.profiles?.name
                              );
                              setNameActioning('');
                              setRejectTarget(null);
                              await loadAll();
                            }}
                            style={{ padding: '7px 16px', borderRadius: 8, background: '#B91C1C', color: 'white', border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                          >
                            {nameActioning === req.id ? '⏳...' : 'Konfirmasi Tolak'}
                          </button>
                          <button onClick={() => setRejectTarget(null)} style={{ padding: '7px 14px', borderRadius: 8, background: 'white', color: '#64748B', border: '1px solid #E2E8F0', fontSize: 12, cursor: 'pointer' }}>Batal</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
