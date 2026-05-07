import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../context/UserContext';
import { useIsMobile } from '../../utils/mobile';
import { issueCertificate } from '../../services/certificateService';
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

  const [tab, setTab]         = useState('dashboard');
  const [stats, setStats]     = useState({ users: 0, events: 0, registrations: 0, revenue: 0 });
  const [events, setEvents]   = useState([]);
  const [regs, setRegs]       = useState([]);
  const [pendingIG, setPendingIG] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState({}); // { [regId]: true }

  // ── Filter state ───────────────────────────────────────────
  const [filterRegType,   setFilterRegType]   = useState('all');
  const [filterRegStatus, setFilterRegStatus] = useState('all');
  const [filterEvType,    setFilterEvType]    = useState('all');
  const [filterEvActive,  setFilterEvActive]  = useState('all');

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
      const { data: regsRaw }    = await supabase.from('registrations').select('*').order('created_at', { ascending: false }).limit(50);
      const { data: pendingRaw } = await supabase.from('registrations').select('*').eq('status', 'pending').order('created_at', { ascending: true });
      const { data: profilesRaw } = await supabase.from('profiles').select('id, name, job_role');

      // Map profiles dan events by id untuk lookup cepat
      const profileMap = Object.fromEntries((profilesRaw || []).map(p => [p.id, p]));
      const eventMap   = Object.fromEntries((eventsData  || []).map(e => [e.id, e]));

      // Gabungkan manual
      const regsData    = (regsRaw    || []).map(r => ({ ...r, profiles: profileMap[r.user_id], events: eventMap[r.event_id] }));
      const pendingMerged = (pendingRaw || []).map(r => ({ ...r, profiles: profileMap[r.user_id], events: eventMap[r.event_id] }));

      console.log('[Admin] pendingIG:', pendingMerged.length, 'rows', pendingMerged);

      const revenue = (paymentsData || []).reduce((s, p) => s + (p.amount || 0), 0);
      setStats({ users: userCount || 0, events: eventCount || 0, registrations: regCount || 0, revenue });
      setEvents(eventsData || []);
      setRegs(regsData);
      setPendingIG(pendingMerged);
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

  const issueCert = async (reg) => {
    // Map event type ke certificate type
    const typeMap = { training: 'training', webinar_reguler: 'webinar_reguler', webinar_advanced: 'webinar_advanced' };
    const certType = typeMap[reg.events?.type] || 'training';
    await issueCertificate({
      userId:         reg.user_id,
      type:           certType,
      eventTitle:     reg.events?.title || 'Event',
      registrationId: reg.id,
    });
    // Update status registrasi ke completed
    await supabase.from('registrations').update({ status: 'completed' }).eq('id', reg.id);
    loadAll();
  };

  const TABS = [
    { id: 'dashboard',     label: '📊 Dashboard' },
    { id: 'events',        label: '📅 Events' },
    { id: 'registrations', label: '📋 Registrasi' },
    { id: 'verify_ig',     label: `⚡ Verifikasi IG${pendingIG.length > 0 ? ` (${pendingIG.length})` : ''}` },
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

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
                {filteredEvents.length === 0 && (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 20px', color: 'var(--c-muted)', fontSize: 13 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
                    {events.length === 0 ? 'Belum ada event. Klik "＋ Buat Event" untuk mulai.' : 'Tidak ada event yang sesuai filter.'}
                  </div>
                )}
                {filteredEvents.map(ev => (
                  <div key={ev.id} style={{ backgroundColor: 'white', border: '1px solid #EAF0F6', borderRadius: 16, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: '#0070F3', background: '#EFF6FF', padding: '2px 8px', borderRadius: 6, marginBottom: 6 }}>
                          {ev.type?.replace(/_/g, ' ')}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--c-dark)', lineHeight: 1.3, marginBottom: 4 }}>{ev.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--c-muted)' }}>
                          📅 {ev.event_date ? new Date(ev.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal belum diset'}
                        </div>
                      </div>
                      <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', backgroundColor: ev.is_active ? '#22C55E' : '#94A3B8', marginTop: 4 }} title={ev.is_active ? 'Aktif' : 'Nonaktif'} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: 12, gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-dark)' }}>
                        {ev.price_regular === 0 ? 'Gratis' : `Rp ${(ev.price_regular/1000).toFixed(0)}k`}
                        {ev.price_premium > 0 && ` / Rp ${(ev.price_premium/1000).toFixed(0)}k`}
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => onNavigate('admin_edit_event', ev)} style={{ fontSize: 11, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer' }}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB: Registrasi ── */}
          {!loading && tab === 'registrations' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h2 style={{ fontWeight: 900, color: 'var(--c-dark)', margin: 0, fontSize: 20 }}>Manajemen Registrasi</h2>
                <span style={{ fontSize: 12, color: 'var(--c-muted)' }}>{filteredRegs.length} dari {regs.length} registrasi</span>
              </div>

              {/* Filter bar */}
              <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #EAF0F6', padding: '12px 16px', marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                {/* Filter jenis */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>JENIS:</span>
                  {[['all','Semua'],['training','🏭 Training'],['webinar_reguler','🎁 W. Reguler'],['webinar_advanced','⭐ W. Advanced']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterRegType(v)} style={{
                      padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                      backgroundColor: filterRegType === v ? '#0070F3' : '#F1F5F9',
                      color: filterRegType === v ? 'white' : '#64748B',
                    }}>{l}</button>
                  ))}
                </div>
                <div style={{ width: 1, height: 20, backgroundColor: '#E2E8F0' }} />
                {/* Filter status */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginRight: 2 }}>STATUS:</span>
                  {[['all','Semua'],['pending','Menunggu'],['paid','Terbayar'],['attended','Hadir'],['quiz_unlocked','Kuis'],['completed','Selesai']].map(([v, l]) => (
                    <button key={v} onClick={() => setFilterRegStatus(v)} style={{
                      padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                      backgroundColor: filterRegStatus === v ? '#0F172A' : '#F1F5F9',
                      color: filterRegStatus === v ? 'white' : '#64748B',
                    }}>{l}</button>
                  ))}
                </div>
                {(filterRegType !== 'all' || filterRegStatus !== 'all') && (
                  <button onClick={() => { setFilterRegType('all'); setFilterRegStatus('all'); }} style={{ fontSize: 11, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                    × Reset
                  </button>
                )}
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
                {filteredRegs.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--c-muted)', fontSize: 13 }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>💭</div>
                    Tidak ada data yang sesuai filter
                  </div>
                )}
                {filteredRegs.map((reg, idx) => {
                  const s = getS(reg);
                  return (
                    <div key={reg.id} style={{ padding: '16px 20px', borderBottom: idx < filteredRegs.length - 1 ? '1px solid #F8FAFC' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-dark)', marginBottom: 2 }}>{reg.profiles?.name || '—'}</div>
                        <div style={{ fontSize: 11, color: 'var(--c-muted)', marginBottom: 4 }}>
                          {reg.events?.title} · paket <strong>{reg.package}</strong>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
                        {/* Tandai Hadir — berlaku untuk semua jenis event yang sudah paid */}
                        {reg.status === 'paid' && (
                          <button onClick={() => markAttended(reg.id)} style={{ fontSize: 11, fontWeight: 700, color: '#0070F3', background: '#EFF6FF', border: 'none', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}>
                            ✓ Tandai Hadir
                          </button>
                        )}

                        {/* ── Status ATTENDED — logika berbeda per jenis & paket ── */}
                        {reg.status === 'attended' && (() => {
                          const isAdvanced = reg.events?.type === 'webinar_advanced';
                          const isPremium  = reg.package === 'premium';
                          const hasQuiz    = reg.events?.quiz_questions?.length > 0;

                          if (isAdvanced && !isPremium) {
                            // Free package — tidak ada kuis & tidak ada sertifikat
                            return (
                              <button
                                onClick={() => completeWithoutCert(reg.id)}
                                style={{ fontSize: 11, fontWeight: 700, color: '#15803D', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}
                              >
                                ✓ Selesai (Tanpa Sertifikat)
                              </button>
                            );
                          } else if (hasQuiz) {
                            // Premium / training / webinar_reguler dengan kuis
                            return (
                              <button
                                onClick={() => unlockQuiz(reg.id)}
                                style={{ fontSize: 11, fontWeight: 700, color: 'white', background: '#E05C7A', border: 'none', borderRadius: 8, padding: '7px 12px', cursor: 'pointer' }}
                              >
                                🎯 Buka Kuis
                              </button>
                            );
                          } else {
                            return <span style={{ fontSize: 11, color: '#94A3B8', fontStyle: 'italic' }}>Tidak ada kuis</span>;
                          }
                        })()}

                        {reg.status === 'quiz_unlocked' && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#E05C7A' }}>🎯 Menunggu Peserta</span>
                        )}
                        {reg.status === 'completed' && (() => {
                          // Advanced free — selesai tanpa sertifikat
                          if (reg.events?.type === 'webinar_advanced' && reg.package !== 'premium')
                            return <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>✓ Selesai</span>;
                          // Semua yang lain — sertifikat terbit
                          return <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>🏅 Sertifikat Terbit</span>;
                        })()}
                      </div>
                    </div>
                  );
                })}
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
    </div>
  );
}
