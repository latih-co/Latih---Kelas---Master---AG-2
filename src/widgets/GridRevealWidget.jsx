import { useState } from "react";
import { COLORS } from "../data/courses";

// Tap grid of icons — all reveal ✅ ("aha moment")
export default function GridRevealWidget({ instruction, items, reveal, feedback, xp, onComplete, setScore }) {
  const [tapped,    setTapped]    = useState(new Set());
  const [showReveal, setShowReveal] = useState(false);

  const handleTap = (id) => {
    const next = new Set([...tapped, id]);
    setTapped(next);
    if (next.size === items.length) {
      setTimeout(() => setShowReveal(true), 400);
    }
  };

  const handleDone = () => {
    setScore(s => s + xp);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}>
        {items.map(item => {
          const isTapped = tapped.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleTap(item.id)}
              style={{
                borderRadius: 16,
                border: `2px solid ${isTapped ? COLORS.correct : COLORS.lightGray}`,
                background: isTapped ? `${COLORS.correct}10` : "#fff",
                padding: "14px 8px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                cursor: isTapped ? "default" : "pointer",
                transition: "all 0.3s",
                boxShadow: isTapped ? `0 4px 12px ${COLORS.correct}20` : "0 1px 4px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {/* Check badge */}
              {isTapped && (
                <div style={{
                  position: "absolute", top: 6, right: 6,
                  width: 20, height: 20, borderRadius: "50%",
                  background: COLORS.correct, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 900,
                  animation: "popIn 0.25s ease-out",
                }}>✓</div>
              )}
              <span style={{ fontSize: 32 }}>{item.icon}</span>
              <p style={{
                fontSize: 11, fontWeight: 700, textAlign: "center",
                color: isTapped ? COLORS.correct : COLORS.gray,
                lineHeight: 1.3,
              }}>{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, height: 5, background: COLORS.lightGray, borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(tapped.size / items.length) * 100}%`,
            background: COLORS.correct, borderRadius: 99, transition: "width 0.3s",
          }} />
        </div>
        <span style={{ fontSize: 12, color: COLORS.gray, fontWeight: 600 }}>
          {tapped.size}/{items.length}
        </span>
      </div>

      {/* Reveal panel */}
      {showReveal && (
        <div style={{
          background: `${COLORS.correct}08`, border: `2px solid ${COLORS.correct}30`,
          borderRadius: 18, padding: "16px 18px",
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>🎯</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: COLORS.dark, marginBottom: 6 }}>
              {reveal.headline}
            </p>
            <p style={{ fontSize: 13, color: COLORS.gray, lineHeight: 1.6 }}>
              {reveal.body}
            </p>
          </div>
        </div>
      )}

      <button className="action-btn"
        onClick={showReveal ? handleDone : undefined}
        disabled={!showReveal}
        style={{
          padding: "14px 0", borderRadius: 14,
          background: showReveal ? COLORS.dark : COLORS.lightGray,
          color: showReveal ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: showReveal ? "pointer" : "not-allowed", width: "100%",
        }}
      >
        {showReveal ? feedback.next : `Ketuk ${items.length - tapped.size} ikon lagi`}
      </button>
    </div>
  );
}
