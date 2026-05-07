import React from 'react';
import { categories, COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";
import { Play } from 'lucide-react';

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const today = new Date().getDay();

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

function getNudge(streak, xp) {
  const hour = new Date().getHours();
  if (streak === 0) return { emoji: "🌱", title: "Mulai streak belajarmu hari ini!", message: "Belajar 10 menit saja sudah cukup untuk menjaga konsistensi. Yuk mulai!", color: "#059669", bg: "#ECFDF5", border: "#6EE7B7" };
  if (streak >= 7) return { emoji: "🔥", title: `${streak} hari streak — luar biasa!`, message: "Konsistensimu sudah terbukti. Jangan biarkan streak ini berhenti sekarang!", color: "#DC2626", bg: "#FFF5F5", border: "#FCA5A5" };
  if (hour >= 20) return { emoji: "🌙", title: "Jangan lupa belajar malam ini!", message: "Hari hampir selesai. Luangkan 10 menit untuk menjaga streakmu tetap hidup.", color: "#7C3AED", bg: "#F5F3FF", border: "#C4B5FD" };
  if (hour >= 12 && hour < 14) return { emoji: "☀️", title: "Manfaatkan waktu istirahat siangmu!", message: "10 menit belajar di jam siang terbukti meningkatkan daya ingat hingga 30%.", color: "#D97706", bg: "#FFFBEB", border: "#FCD34D" };
  return { emoji: "⚡", title: "Lanjutkan pelajaranmu — kamu sudah mulai!", message: "Konsistensi kecil setiap hari lebih kuat dari belajar marathon seminggu sekali.", color: "#0070F3", bg: "#EFF6FF", border: "#93C5FD" };
}

export default function BerandaScreen({
  onSelectLesson,
  onGoToCourses,
  lastStudiedTopic,
  lastStudiedSubLesson,
  userName,
  streak,
  xp,
  completedQuizzes = {}
}) {
  const isMobile = useIsMobile();

  // Fallback: first available topic/sub-lesson if nothing was studied yet
  const fallbackTopic = categories.flatMap(c => c.topics).find(t => !t.comingSoon && t.lessons?.length > 0);
  const fallbackSubLesson = fallbackTopic?.lessons?.[0]?.subLessons?.[0] ?? null;

  const displayTopic     = lastStudiedTopic     || fallbackTopic;
  const displaySubLesson = lastStudiedSubLesson  || fallbackSubLesson;

  const parentCategory = categories.find(c => c.topics.some(t => t.id === displayTopic?.id));
  const parentLesson   = displayTopic?.lessons?.find(l => l.subLessons?.some(s => s.id === displaySubLesson?.id));
  const displayName    = userName || "Pengguna";

  const nudge = getNudge(streak, xp);

  return (
    <div style={{ padding: isMobile ? "20px 16px 32px" : "24px 32px 32px", fontFamily: "'Inter', sans-serif" }}>

      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'flex-start', marginBottom: 24, gap: isMobile ? 16 : 0 }}>
        <div>
          <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 900, color: 'var(--c-dark)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            {getGreeting()}, {displayName}! 👋
          </h1>
          <div style={{ fontSize: 13, color: 'var(--c-muted)', fontWeight: 500 }}>
            Yuk lanjutkan perjalanan belajarmu hari ini
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'white', padding: '6px 14px', borderRadius: 99, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', fontWeight: 700, fontSize: 13, color: 'var(--c-dark)' }}>
            <span style={{ fontSize: 16 }}>🔥</span> {streak} hari streak
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'white', padding: '6px 14px', borderRadius: 99, border: '1px solid #EAF0F6', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', fontWeight: 700, fontSize: 13, color: 'var(--c-dark)' }}>
            <span style={{ fontSize: 16, color: '#F59E0B' }}>⚡</span>
            <span className="font-mono">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Smart Nudge Banner */}
      <div style={{ backgroundColor: nudge.bg, border: `1px solid ${nudge.border}`, borderRadius: 16, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, animation: 'fadeInDown 0.4s ease' }}>
        <div style={{ fontSize: 28, flexShrink: 0 }}>{nudge.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: nudge.color, marginBottom: 2 }}>{nudge.title}</div>
          <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>{nudge.message}</div>
        </div>
      </div>

      {/* ── Sedang Kamu Pelajari Card ───────────────────────────── */}
      {displayTopic && displaySubLesson && (
        <div style={{ backgroundColor: 'white', borderRadius: 22, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: 20 }}>

          {/* Card header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>
              Sedang Kamu Pelajari
            </h3>
            <div
              role="button"
              tabIndex={0}
              style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-teal-dark)', cursor: 'pointer' }}
              onClick={() => onGoToCourses && onGoToCourses()}
              onKeyDown={e => e.key === 'Enter' && onGoToCourses && onGoToCourses()}
            >
              Lihat semua →
            </div>
          </div>

          {/* Card body */}
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'space-between',
            padding: '16px', borderRadius: 16,
            border: '1px solid #EAF0F6', backgroundColor: 'var(--surf-2)',
            gap: 16
          }}>
            {/* Left: icon + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                backgroundColor: displayTopic.color || '#0F766E',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}>
                {displayTopic.icon || '📋'}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Category */}
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--c-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                  {parentCategory?.title || 'Kursus'}
                </div>
                {/* Topic */}
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--c-dark)', lineHeight: 1.3, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {displayTopic.title}
                </div>
                {/* Sub-lesson */}
                {parentLesson && (
                  <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {parentLesson.title} · {displaySubLesson.title}
                  </div>
                )}
                {/* Progress bar */}
                <div style={{ width: '100%', maxWidth: 220 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-muted)' }}>
                      {completedQuizzes[displaySubLesson.id] ? 'Sub-lesson selesai ✓' : 'Sedang berjalan'}
                    </span>
                  </div>
                  <div style={{ height: 6, backgroundColor: 'var(--surf-3)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: completedQuizzes[displaySubLesson.id] ? '100%' : '40%',
                      height: '100%',
                      backgroundColor: displayTopic.color || 'var(--c-teal)',
                      borderRadius: 3, transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <button
              onClick={() => onSelectLesson && onSelectLesson(displaySubLesson)}
              style={{
                backgroundColor: 'var(--c-dark)', color: 'white', border: 'none',
                borderRadius: 10, padding: '10px 18px',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap', width: isMobile ? '100%' : 'auto',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#334155'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--c-dark)'}
            >
              <Play size={14} fill="white" />
              {completedQuizzes[displaySubLesson.id] ? 'Ulang Pelajaran' : 'Lanjut Belajar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
