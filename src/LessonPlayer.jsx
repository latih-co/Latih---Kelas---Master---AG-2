import { useState, useEffect } from "react";
import { COLORS } from "./data/courses";
import { useIsMobile } from "./utils/mobile";

// ─── Fully Implemented Widgets ────────────────────────────────────
import TapSelectWidget      from "./widgets/TapSelectWidget";
import MCQWidget            from "./widgets/MCQWidget";
import ExplorerWidget       from "./widgets/ExplorerWidget";
import ScenarioChaosWidget  from "./widgets/ScenarioChaosWidget";
import DragCategoryWidget   from "./widgets/DragCategoryWidget";
import AnatomyWidget        from "./widgets/AnatomyWidget";
import ComparePickWidget    from "./widgets/ComparePickWidget";
import FlowchartWidget      from "./widgets/FlowchartWidget";
import GridRevealWidget     from "./widgets/GridRevealWidget";
import CardPickRevealWidget from "./widgets/CardPickRevealWidget";
import PhaseJourneyWidget   from "./widgets/PhaseJourneyWidget";
import ScoreScreen          from "./widgets/ScoreScreen";
import MatrixWidget         from "./widgets/MatrixWidget";
import TakeawayWidget       from "./widgets/TakeawayWidget";
import IntroQuizWidget      from "./widgets/IntroQuizWidget";

// ─── Custom Widgets (Acuan Normatif & Beyond) ─────────────────────
import BookSelectWidget      from "./widgets/BookSelectWidget";
import WordChipsWidget       from "./widgets/WordChipsWidget";
import OptionListWidget      from "./widgets/OptionListWidget";
import ClassifyListWidget    from "./widgets/ClassifyListWidget";
import AccordionMateriWidget from "./widgets/AccordionMateriWidget";
import YesNoWidget           from "./widgets/YesNoWidget";
import TapClassifyWidget     from "./widgets/TapClassifyWidget";
import ReorderStepsWidget    from "./widgets/ReorderStepsWidget";
import MatchLinesWidget      from "./widgets/MatchLinesWidget";

// ─── Widget Registry ──────────────────────────────────────────────
// Hanya widget yang sudah fully implemented yang terdaftar di sini.
// Stub "under reconstruction" sudah dihapus.
const WIDGET_MAP = {
  // Core interactive widgets
  tap_classify:    TapClassifyWidget,
  tapselect:       TapSelectWidget,
  mcq:             MCQWidget,
  explorer:        ExplorerWidget,
  scenario_chaos:  ScenarioChaosWidget,
  drag_category:   DragCategoryWidget,
  anatomy:         AnatomyWidget,
  compare_pick:    ComparePickWidget,
  flowchart:       FlowchartWidget,
  grid_reveal:     GridRevealWidget,
  card_pick_reveal: CardPickRevealWidget,
  phase_journey:   PhaseJourneyWidget,
  matrix:          MatrixWidget,
  takeaway:        TakeawayWidget,
  intro_quiz:      IntroQuizWidget,

  // Custom widgets (Acuan Normatif & Beyond)
  book_select:      BookSelectWidget,
  word_chips:       WordChipsWidget,
  option_list:      OptionListWidget,
  classify_list:    ClassifyListWidget,
  accordion_materi: AccordionMateriWidget,
  yes_no:           YesNoWidget,
  reorder_steps:    ReorderStepsWidget,
  match_lines:      MatchLinesWidget,

  // System
  score_screen:    ScoreScreen,
};

// ─── Shared UI ────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <div style={{ flex: 1, height: 8, background: COLORS.lightGray, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${(current / total) * 100}%`,
          background: `linear-gradient(90deg, ${COLORS.plan}, ${COLORS.do})`,
          borderRadius: 99, transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
      <span style={{ fontSize: 13, color: COLORS.gray, fontWeight: 600, minWidth: 32 }}>
        {current}/{total}
      </span>
    </div>
  );
}

function XPBadge({ xp }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      background: COLORS.dark, color: "#fff",
      padding: "5px 12px", borderRadius: 99, fontSize: 14, fontWeight: 700,
    }}>
      <span style={{ fontSize: 16 }}>⚡</span> {xp}
    </div>
  );
}

// ─── Lesson Player Engine ─────────────────────────────────────────
export default function LessonPlayer({ lesson, onFinish, onNextLesson, onLessonComplete }) {
  const [slideIdx, setSlideIdx] = useState(() => {
    const saved = localStorage.getItem(`iso9001_slideIdx_${lesson.id}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem(`iso9001_score_${lesson.id}`);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem(`iso9001_lessonXp_${lesson.id}`);
    return saved ? parseInt(saved, 10) : 1;
  });

  const isMobile = useIsMobile();

  // Reset scroll position to top whenever slide changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slideIdx]);

  useEffect(() => { localStorage.setItem(`iso9001_slideIdx_${lesson.id}`, slideIdx.toString()); }, [slideIdx, lesson.id]);
  useEffect(() => { localStorage.setItem(`iso9001_score_${lesson.id}`, score.toString()); }, [score, lesson.id]);
  useEffect(() => { localStorage.setItem(`iso9001_lessonXp_${lesson.id}`, xp.toString()); }, [xp, lesson.id]);

  const totalSlides = lesson.slides.length;
  const slide       = lesson.slides[slideIdx];

  // Harus dideklarasikan sebelum handleComplete agar bisa dipakai di onLessonComplete
  const maxScore = lesson.slides.reduce((acc, s) => acc + (s.xp || 0), 0);

  const handleComplete = () => {
    setXp(x => x + (lesson.xpPerSlide || 15));
    if (slideIdx + 1 >= totalSlides) {
      if (onLessonComplete) onLessonComplete(lesson.id, score, maxScore);
      if (onNextLesson) onNextLesson();
      else onFinish();
    } else {
      setSlideIdx(i => i + 1);
    }
  };

  const handleRestart = () => {
    setSlideIdx(0);
    setScore(0);
    setXp(1);
  };

  const breakdown = lesson.slides
    .filter(s => s.xp)
    .map(s => ({
      label: s.title || s.type,
      icon:  s.type === "dragdrop" ? "📋" : s.type === "mcq" ? "❓" : s.type === "timeline" ? "📅" : "🔍",
      max:   s.xp,
      earned: score,
    }));

  const Widget = WIDGET_MAP[slide.type];

  return (
    <div className="lesson-player-root" style={{
      minHeight: "100vh", 
      background: isMobile ? COLORS.bg : "#ffffff",
      display: "flex", flexDirection: "column",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Global CSS for Desktop Override */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .lesson-player-root {
             padding-bottom: 100px; 
          }
          .player-content-wrapper > div {
             min-height: calc(100vh - 200px);
          }
          /* Make the action button fixed bottom globally */
          .action-btn {
             position: fixed !important;
             bottom: 16px !important;
             left: 50% !important;
             transform: translateX(-50%) !important;
             width: calc(100% - 32px) !important;
             max-width: 600px !important;
             z-index: 100 !important;
             border-radius: 99px !important;
             box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
             margin-top: 0 !important;
          }
          
          /* Create a faux bottom bar behind the button only if needed */
          .lesson-player-root:has(.action-btn)::after {
             content: '';
             position: fixed;
             bottom: 0; left: 0; right: 0;
             height: 80px;
             background: #fff;
             border-top: 2px solid ${COLORS.lightGray};
             z-index: 90;
          }
        }
      `}} />

      {/* Header */}
      <div style={{
        position: isMobile ? "relative" : "fixed",
        top: 0, left: 0, right: 0,
        height: isMobile ? "auto" : 64,
        padding: isMobile ? "16px 20px" : "0 32px",
        background: isMobile ? "transparent" : "#fff",
        borderBottom: isMobile ? "none" : `1.5px solid ${COLORS.lightGray}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 50,
      }}>
        {/* Left: Close */}
        <div style={{ width: isMobile ? "auto" : 100, display: "flex", gap: 14 }}>
          <button
            onClick={onFinish}
            style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.dark, fontSize: 22, padding: 0, lineHeight: 1 }}
          >✕</button>
          
          {/* Mobile inline back button */}
          {isMobile && slideIdx > 0 && (
            <button
              onClick={() => setSlideIdx(i => Math.max(0, i - 1))}
              style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.dark, fontSize: 20, padding: 0, lineHeight: 1, display: "flex", alignItems: "center" }}
            >
              ←
            </button>
          )}
        </div>
        
        {/* Center: Progress */}
        <div style={{ flex: 1, maxWidth: isMobile ? "none" : 400, padding: isMobile ? "0" : "0 20px", display: "flex", justifyContent: "center" }}>
          <ProgressBar current={slideIdx + 1} total={totalSlides} />
        </div>

        {/* Right: XP Badge */}
        <div style={{ width: isMobile ? "auto" : 100, display: "flex", justifyContent: "flex-end" }}>
          <XPBadge xp={xp} />
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginTop: isMobile ? 0 : 64,
        display: "flex", justifyContent: "center",
        position: "relative",
      }}>
        {/* Desktop floating back button */}
        {!isMobile && slideIdx > 0 && (
           <button
             onClick={() => setSlideIdx(i => Math.max(0, i - 1))}
             style={{
               position: "fixed", left: 32, top: "50%", transform: "translateY(-50%)",
               width: 48, height: 48, borderRadius: "50%",
               background: COLORS.lightGray, border: "none",
               display: "flex", alignItems: "center", justifyContent: "center",
               cursor: "pointer", fontSize: 20, color: COLORS.dark,
               transition: "all 0.2s ease-out",
               zIndex: 40,
             }}
             onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
             title="Kembali"
           >
             ←
           </button>
        )}

        {/* Widget Container */}
        <div className="player-content-wrapper" style={{
           width: "100%", maxWidth: isMobile ? 480 : 600,
           padding: isMobile ? "20px 16px 40px" : "40px 20px 80px",
           display: "flex", flexDirection: "column",
        }}>
          {Widget ? (
            <Widget
              key={slideIdx}
              {...slide}
              score={score}
              xpInfo={xp}
              onComplete={handleComplete}
              setScore={setScore}
              onRestart={handleRestart}
            />
          ) : (
            <p style={{ color: COLORS.wrong }}>Widget type "{slide.type}" belum didaftarkan di WIDGET_MAP.</p>
          )}
        </div>
      </div>
    </div>
  );
}
