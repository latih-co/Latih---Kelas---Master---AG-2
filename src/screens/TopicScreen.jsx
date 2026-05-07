import React, { useState } from "react";
import { COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";
import { useUser } from "../context/UserContext";
import {
  issueCertificate, generateCertPDF, downloadCertPDF,
  generateCertNumber, checkModuleEligibility,
} from "../services/certificateService";

// ─── Helpers ──────────────────────────────────────────────────────
const LEVEL_LABELS = ["Pemula", "Dasar", "Menengah", "Mahir", "Expert"];
const LEVEL_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#f43f5e", "#a855f7"];

function darkenHex(hex, amount = 40) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ─── Main Screen ─────────────────────────────────────────────────
export default function TopicScreen({ topic, onSelectSubLesson, onBack, completedQuizzes = {}, isGuest = false, guestLessonId = null }) {
  const isMobile = useIsMobile();
  const { user } = useUser();

  const [certModal,    setCertModal]    = useState(false);
  const [certData,     setCertData]     = useState(null);   // { cert_number, issued_at } dari DB
  const [certLoading,  setCertLoading]  = useState(false);
  const [certErr,      setCertErr]      = useState('');
  const [pdfLoading,   setPdfLoading]   = useState(false);
  const allSubLessons = topic.lessons.flatMap(l => l.subLessons || []);
  const totalSlides   = allSubLessons.reduce((a, sl) => a + (sl.slides?.length || 0), 0);
  const totalXP       = allSubLessons.reduce((a, sl) => a + (sl.slides?.reduce((b, s) => b + (s.xp || 0), 0) || 0), 0);
  const totalSubs     = allSubLessons.length;
  const completedSubs = allSubLessons.filter(sl => completedQuizzes[sl.id]).length;
  const progressPct   = Math.round((completedSubs / Math.max(totalSubs, 1)) * 100);
  const isEligible    = checkModuleEligibility(topic, completedQuizzes);

  const accentColor = topic.color || "#0070F3";
  const darkAccent  = darkenHex(accentColor.replace("#", "").length === 6 ? accentColor : "#0070F3", 30);

  return (
    <>
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "white",
    }}>

      {/* ── Sticky Top Bar ─────────────────────────────── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(15,23,42,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: isMobile ? "10px 16px" : "12px 32px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.9)", padding: "8px 16px",
          borderRadius: 99, cursor: "pointer", fontSize: 13, fontWeight: 700,
          display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
        >
          ← {isMobile ? "Kembali" : "Kembali ke Modul"}
        </button>

        {/* Progress bar in top bar */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              width: `${progressPct}%`, height: "100%", borderRadius: 3,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}CC)`,
              transition: "width 1s ease",
              boxShadow: `0 0 8px ${accentColor}80`,
            }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: accentColor, whiteSpace: "nowrap" }}>
            {progressPct}% ✦
          </span>
        </div>

        {/* XP badge */}
        <div style={{
          background: "linear-gradient(135deg, #F59E0B, #D97706)",
          borderRadius: 99, padding: "6px 14px",
          fontSize: 12, fontWeight: 800, color: "#fff",
          display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
          boxShadow: "0 2px 12px rgba(245,158,11,0.4)",
        }}>
          ⚡ {totalXP} XP
        </div>
      </div>

      {/* ── Hero Section ─────────────────────────────────── */}
      <div style={{
        position: "relative", overflow: "hidden",
        padding: isMobile ? "32px 20px 48px" : "48px 40px 64px",
        textAlign: "center",
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: isMobile ? "5%" : "15%",
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Course icon / image */}
        <div className="animate-float" style={{ display: "inline-block", marginBottom: 20 }}>
          {topic.thumb ? (
            <img src={topic.thumb} alt={topic.title} style={{
              width: isMobile ? 90 : 110, height: isMobile ? 90 : 110,
              objectFit: "contain", borderRadius: 24,
              background: `${accentColor}18`,
              padding: 12,
              border: `2px solid ${accentColor}40`,
              boxShadow: `0 8px 40px ${accentColor}40`,
            }} />
          ) : (
            <div style={{
              width: isMobile ? 90 : 110, height: isMobile ? 90 : 110,
              borderRadius: 24, background: `${accentColor}20`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 52, border: `2px solid ${accentColor}40`,
              boxShadow: `0 8px 40px ${accentColor}40`,
            }}>
              {topic.icon || "📘"}
            </div>
          )}
        </div>

        {/* Category pill */}
        <div style={{ marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, color: accentColor,
            textTransform: "uppercase", letterSpacing: 2,
            background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
            padding: "4px 14px", borderRadius: 99,
          }}>
            {topic.title}
          </span>
        </div>

        {/* Course title */}
        <h1 style={{
          fontSize: isMobile ? 22 : 30, fontWeight: 900,
          color: "white", lineHeight: 1.2,
          margin: "0 auto 16px",
          maxWidth: 600,
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {topic.subtitle}
        </h1>

        {/* Stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: isMobile ? 8 : 16,
          flexWrap: "wrap", marginBottom: 28,
        }}>
          {[
            { emoji: "📚", value: topic.lessons.length, label: "Lesson" },
            { emoji: "🎯", value: totalSlides,          label: "Aktivitas" },
            { emoji: "⚡", value: totalXP,              label: "XP" },
            { emoji: "🏆", value: totalSubs,            label: "Sub-materi" },
          ].map((stat, i) => (
            <div key={i} className="animate-xp-pop" style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: isMobile ? "10px 14px" : "12px 20px",
              textAlign: "center", backdropFilter: "blur(4px)",
              animationDelay: `${i * 0.08}s`,
              minWidth: isMobile ? 70 : 90,
            }}>
              <div style={{ fontSize: isMobile ? 18 : 22 }}>{stat.emoji}</div>
              <div style={{ fontSize: isMobile ? 16 : 20, fontWeight: 900, color: "white", marginTop: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button style={{
          background: `linear-gradient(135deg, ${accentColor}, ${darkAccent})`,
          border: "none", borderRadius: 99,
          padding: isMobile ? "14px 32px" : "16px 40px",
          fontSize: isMobile ? 15 : 16, fontWeight: 800, color: "white",
          cursor: "pointer", letterSpacing: 0.3,
          boxShadow: `0 8px 32px ${accentColor}60`,
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 12px 40px ${accentColor}80`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 32px ${accentColor}60`; }}
        onClick={() => {
          const firstSub = topic.lessons[0]?.subLessons?.[0];
          if (firstSub && !firstSub.comingSoon) onSelectSubLesson(firstSub);
        }}
        >
          🚀 Mulai Belajar Sekarang
        </button>
      </div>

      {/* ── Skill Path ───────────────────────────────────── */}
      <div style={{
        maxWidth: 700, margin: "0 auto",
        padding: isMobile ? "0 16px 120px" : "0 24px 80px",
      }}>
        {/* Section label */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 2 }}>
            Jalur Belajar
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Lessons as path nodes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {topic.lessons.map((lesson, lIdx) => (
            <LessonPathNode
              key={lesson.id}
              lesson={lesson}
              lessonIndex={lIdx}
              totalLessons={topic.lessons.length}
              accentColor={accentColor}
              onSelectSubLesson={onSelectSubLesson}
              isMobile={isMobile}
              completedQuizzes={completedQuizzes}
              isGuest={isGuest}
              guestLessonId={guestLessonId}
            />
          ))}
        </div>

        {/* Completion CTA — dinamis berdasarkan eligibility */}
        <div style={{
          marginTop: 32,
          background: isEligible
            ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}0A)`
            : "rgba(255,255,255,0.03)",
          border: isEligible
            ? `1.5px solid ${accentColor}50`
            : "1px dashed rgba(255,255,255,0.12)",
          borderRadius: 20, padding: 28, textAlign: "center",
          transition: "all 0.4s",
        }}>

          {/* ── Sudah punya sertifikat ── */}
          {certData ? (
            <>
              <div style={{ fontSize: 44, marginBottom: 10 }}>🏅</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "white", marginBottom: 6 }}>
                Sertifikat Modul Diterbitkan!
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: 'monospace', marginBottom: 18 }}>
                {certData.cert_number}
              </div>
              <button
                onClick={async () => {
                  setPdfLoading(true);
                  try {
                    const curriculum = topic.lessons
                      .flatMap(l => (l.subLessons || []).map(sl => sl.title))
                      .filter(Boolean);
                    const pdfBytes = await generateCertPDF({
                      holderName: user?.name || 'Peserta',
                      eventTitle: topic.subtitle || topic.title,
                      certNumber: certData.cert_number,
                      type: 'modul',
                      issuedAt: certData.issued_at,
                      curriculum,
                    });
                    downloadCertPDF(pdfBytes, certData.cert_number);
                  } catch(e) { console.error(e); }
                  finally { setPdfLoading(false); }
                }}
                disabled={pdfLoading}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${darkAccent})`,
                  border: "none", borderRadius: 12, padding: "12px 28px",
                  color: "white", fontSize: 14, fontWeight: 800, cursor: "pointer",
                }}
              >
                {pdfLoading ? "⏳ Menyiapkan PDF..." : "⬇️ Unduh Sertifikat PDF"}
              </button>
            </>

          /* ── Eligible → tampilkan tombol klaim ── */
          ) : isEligible ? (
            <>
              <div style={{ fontSize: 44, marginBottom: 10 }}>🏆</div>
              <div style={{ fontSize: 15, fontWeight: 900, color: "white", marginBottom: 8 }}>
                Semua materi selesai!
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>
                Kamu berhak mendapatkan Sertifikat Modul ini
              </div>
              <button
                onClick={() => setCertModal(true)}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, ${darkAccent})`,
                  border: "none", borderRadius: 12, padding: "14px 32px",
                  color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer",
                  boxShadow: `0 8px 24px ${accentColor}60`,
                  transition: "transform 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                🏆 Klaim Sertifikat Modul
              </button>
            </>

          /* ── Belum selesai → tampilkan progress ── */
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.4 }}>🏆</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                Selesaikan semua materi untuk mendapat sertifikat
              </div>
              <div style={{ fontSize: 12, color: `${accentColor}80`, marginBottom: 16 }}>
                {completedSubs} / {totalSubs} sub-materi selesai
              </div>
              <div style={{
                height: 6, background: "rgba(255,255,255,0.08)",
                borderRadius: 99, overflow: "hidden", maxWidth: 240, margin: "0 auto",
              }}>
                <div style={{
                  width: `${progressPct}%`, height: "100%", borderRadius: 99,
                  background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* ── Modal Konfirmasi Klaim Sertifikat ── */}
    {certModal && (
      <div
        onClick={e => e.target === e.currentTarget && !certLoading && setCertModal(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{
          background: "#0F172A", border: `1px solid ${accentColor}40`,
          borderRadius: 24, padding: 32, maxWidth: 420, width: "100%",
          textAlign: "center", fontFamily: "'Inter', sans-serif",
          boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}20`,
        }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🎓</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "white", marginBottom: 8 }}>
            Terbitkan Sertifikat Modul
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 8 }}>
            {topic.subtitle || topic.title}
          </div>
          <div style={{
            background: `${accentColor}15`, border: `1px solid ${accentColor}30`,
            borderRadius: 12, padding: "12px 16px", marginBottom: 24,
            fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6,
          }}>
            Sertifikat akan disimpan ke akun kamu dan bisa diunduh kapan saja dari halaman <strong style={{ color: "white" }}>Profil → Sertifikat Saya</strong>.
          </div>

          {certErr && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#DC2626", marginBottom: 16 }}>
              ⚠️ {certErr}
            </div>
          )}

          <button
            disabled={certLoading}
            onClick={async () => {
              if (!user) { setCertErr('Kamu harus login'); return; }
              setCertLoading(true); setCertErr('');
              try {
                const curriculum = topic.lessons
                  .flatMap(l => (l.subLessons || []).map(sl => sl.title))
                  .filter(Boolean);
                // Terbitkan ke Supabase
                const result = await issueCertificate({
                  userId:    user.id,
                  type:      'modul',
                  eventTitle: topic.subtitle || topic.title,
                  registrationId: null,
                  topicId:   topic.id,
                });
                const cert = result?.data || { cert_number: generateCertNumber('modul'), issued_at: new Date().toISOString() };
                setCertData(cert);
                // Generate & download PDF
                const pdfBytes = await generateCertPDF({
                  holderName: user.name || 'Peserta',
                  eventTitle: topic.subtitle || topic.title,
                  certNumber: cert.cert_number,
                  type: 'modul',
                  issuedAt: cert.issued_at,
                  curriculum,
                });
                downloadCertPDF(pdfBytes, cert.cert_number);
                setCertModal(false);
              } catch(e) {
                setCertErr(e.message || 'Gagal menerbitkan sertifikat');
              } finally {
                setCertLoading(false);
              }
            }}
            style={{
              width: "100%", padding: "14px 0",
              background: certLoading ? "#334155" : `linear-gradient(135deg, ${accentColor}, ${darkAccent})`,
              border: "none", borderRadius: 12,
              color: "white", fontSize: 15, fontWeight: 800, cursor: certLoading ? "not-allowed" : "pointer",
              marginBottom: 10, transition: "all 0.2s",
            }}
          >
            {certLoading ? "⏳ Menerbitkan..." : "🏆 Terbitkan & Unduh Sertifikat"}
          </button>
          {!certLoading && (
            <button
              onClick={() => setCertModal(false)}
              style={{
                width: "100%", padding: "12px 0",
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12, color: "rgba(255,255,255,0.5)",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}
            >
              Nanti Saja
            </button>
          )}
        </div>
      </div>
    )}
    </>
  );
}

// ─── Lesson Path Node ─────────────────────────────────────────────
function LessonPathNode({ lesson, lessonIndex, totalLessons, accentColor, onSelectSubLesson, isMobile, completedQuizzes, isGuest = false, guestLessonId = null }) {
  const isLast = lessonIndex === totalLessons - 1;
  const levelLabel = LEVEL_LABELS[Math.min(lessonIndex, LEVEL_LABELS.length - 1)];
  const levelColor = LEVEL_COLORS[Math.min(lessonIndex, LEVEL_COLORS.length - 1)];

  // For a guest, determine if this lesson is the locked lesson or a different one
  const isGuestLockedLesson = isGuest && guestLessonId && guestLessonId !== lesson.id;

  return (
    <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
      {/* Left: connector line + node circle */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
        {/* Circle node */}
        <div style={{
          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: "white",
          boxShadow: `0 0 0 4px ${accentColor}20, 0 4px 16px ${accentColor}40`,
          border: `2px solid ${accentColor}60`,
          zIndex: 1, position: "relative",
        }}>
          {lesson.icon || (lessonIndex + 1)}
        </div>
        {/* Connector */}
        {!isLast && (
          <div style={{
            width: 2, flex: 1, minHeight: 20,
            background: `linear-gradient(to bottom, ${accentColor}60, rgba(255,255,255,0.06))`,
            margin: "4px 0",
          }} />
        )}
      </div>

      {/* Right: lesson content */}
      <div style={{ flex: 1, paddingLeft: 16, paddingBottom: isLast ? 0 : 24, paddingTop: 4 }}>
        {/* Lesson header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <span style={{
                fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5,
                color: "rgba(255,255,255,0.35)",
              }}>
                Lesson {lessonIndex + 1}
              </span>
              <span style={{
                fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.8,
                color: levelColor, background: `${levelColor}20`,
                border: `1px solid ${levelColor}40`,
                padding: "1px 7px", borderRadius: 99,
              }}>
                {levelLabel}
              </span>
            </div>
            <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 900, color: "white", lineHeight: 1.3 }}>
              {lesson.title}
            </div>
          </div>
        </div>

        {/* Sub-lesson cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(lesson.subLessons || []).map((sl, slIdx) => {
            // Guest lock: sub-lessons at position >= 3 within the selected lesson,
            // or any sub-lesson inside a different lesson
            const isGuestSubLocked = isGuest && (
              isGuestLockedLesson || slIdx >= 3
            );
            return (
              <SubLessonGameCard
                key={sl.id}
                subLesson={sl}
                index={slIdx}
                lessonIdx={lessonIndex}
                accentColor={accentColor}
                onClick={() => {
                  if (!sl.comingSoon) {
                    onSelectSubLesson(sl, lesson.id, slIdx);
                  }
                }}
                isMobile={isMobile}
                isCompleted={!!completedQuizzes[sl.id]}
                animDelay={slIdx * 0.06}
                isGuestLocked={isGuestSubLocked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Lesson Game Card ─────────────────────────────────────────
function SubLessonGameCard({ subLesson, index, lessonIdx, accentColor, onClick, isMobile, isCompleted, animDelay, isGuestLocked = false }) {
  const xp = subLesson.slides?.reduce((a, s) => a + (s.xp || 0), 0) || 0;
  const slides = subLesson.slides?.length || 0;
  const isLocked = subLesson.comingSoon;
  // Guest-locked behaves like a locked card but with a distinct visual cue
  const effectiveLocked = isLocked || isGuestLocked;

  return (
    <div
      onClick={effectiveLocked ? undefined : onClick}
      className="animate-slide-up"
      style={{
        background: isCompleted
          ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}0A)`
          : isGuestLocked
            ? 'rgba(245,158,11,0.06)'
            : isLocked
              ? 'rgba(255,255,255,0.03)'
              : 'rgba(255,255,255,0.05)',
        border: isCompleted
          ? `1.5px solid ${accentColor}50`
          : isGuestLocked
            ? '1.5px solid rgba(245,158,11,0.25)'
            : isLocked
              ? '1.5px solid rgba(255,255,255,0.06)'
              : '1.5px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: isMobile ? '14px 14px' : '14px 18px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: effectiveLocked ? 'default' : 'pointer',
        opacity: isLocked ? 0.45 : isGuestLocked ? 0.75 : 1,
        transition: 'transform 0.15s, background 0.15s, border-color 0.15s',
        animationDelay: `${animDelay}s`,
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!effectiveLocked) {
          e.currentTarget.style.transform = 'translateX(4px)';
          e.currentTarget.style.background = `linear-gradient(135deg, ${accentColor}28, ${accentColor}10)`;
          e.currentTarget.style.borderColor = `${accentColor}60`;
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.background = isCompleted
          ? `linear-gradient(135deg, ${accentColor}22, ${accentColor}0A)`
          : isGuestLocked ? 'rgba(245,158,11,0.06)'
          : isLocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)';
        e.currentTarget.style.borderColor = isCompleted
          ? `${accentColor}50`
          : isGuestLocked ? 'rgba(245,158,11,0.25)'
          : isLocked ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.1)';
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: isMobile ? 44 : 48, height: isMobile ? 44 : 48, borderRadius: 14, flexShrink: 0,
        background: isCompleted
          ? `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`
          : isGuestLocked
            ? 'rgba(245,158,11,0.15)'
            : isLocked
              ? 'rgba(255,255,255,0.06)'
              : `${accentColor}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, position: 'relative',
        border: isCompleted ? 'none' : `1px solid rgba(255,255,255,0.1)`,
        boxShadow: isCompleted ? `0 4px 16px ${accentColor}50` : 'none',
      }}>
        {isGuestLocked ? '🔐' : isLocked ? '🔒' : isCompleted ? '✅' : subLesson.icon || '📖'}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: isMobile ? 13 : 14, fontWeight: 800,
          color: isLocked ? 'rgba(255,255,255,0.4)' : isGuestLocked ? 'rgba(245,158,11,0.8)' : 'white',
          marginBottom: 6, lineHeight: 1.3,
        }}>
          {subLesson.title}
        </div>

        {/* Metadata pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {!isLocked && slides > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "2px 8px", borderRadius: 99,
            }}>
              🎯 {slides} aktivitas
            </span>
          )}
          {xp > 0 && !isLocked && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "2px 8px", borderRadius: 99,
            }}>
              ⚡ {xp} XP
            </span>
          )}
          {isGuestLocked && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: '#F59E0B',
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
              padding: '2px 8px', borderRadius: 99,
              textTransform: 'uppercase', letterSpacing: 0.8,
            }}>
              🔐 Daftar untuk Akses
            </span>
          )}
          {!isGuestLocked && isLocked && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.05)',
              padding: '2px 8px', borderRadius: 99,
              textTransform: 'uppercase', letterSpacing: 0.8,
            }}>
              Segera Hadir
            </span>
          )}
          {isCompleted && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: accentColor,
              background: `${accentColor}20`,
              border: `1px solid ${accentColor}40`,
              padding: "2px 8px", borderRadius: 99,
            }}>
              ✦ Selesai
            </span>
          )}
        </div>
      </div>

      {/* Right: arrow only */}
      {!effectiveLocked && (
        <span style={{
          color: `${accentColor}80`, fontSize: 20, fontWeight: 700, flexShrink: 0, alignSelf: 'center',
        }}>›</span>
      )}
      {isGuestLocked && (
        <span style={{
          color: 'rgba(245,158,11,0.6)', fontSize: 16, fontWeight: 700, flexShrink: 0, alignSelf: 'center',
        }}>›</span>
      )}
    </div>
  );
}
