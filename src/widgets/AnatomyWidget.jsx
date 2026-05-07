import { useState } from "react";
import { COLORS } from "../data/courses";

// Slide 4: Interactive code anatomy — tap each segment to expand
export default function AnatomyWidget({ instruction, code, parts, examples, feedback, xp, onComplete, setScore }) {
  const [active,  setActive]  = useState(null);
  const [opened,  setOpened]  = useState(new Set());

  const handleTap = (id) => {
    setActive(prev => (prev === id ? null : id));
    setOpened(prev => new Set([...prev, id]));
  };

  const allOpened = parts.every(p => opened.has(p.id));

  const handleDone = () => {
    setScore(s => s + xp);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* The code display — segmented */}
      <div style={{
        background: COLORS.dark,
        borderRadius: 18, padding: "20px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexWrap: "wrap", gap: 4,
      }}>
        {parts.map((part, idx) => {
          const isActive = active === part.id;
          const isOpened = opened.has(part.id);
          return (
            <div key={part.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {idx > 0 && (
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 24, fontWeight: 300, paddingBottom: 2 }}>
                  {part.separator || ""}
                </span>
              )}
              <button
                onClick={() => handleTap(part.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: `2px solid ${isActive ? part.color : isOpened ? part.color + "60" : "rgba(255,255,255,0.15)"}`,
                  background: isActive ? part.color : isOpened ? part.color + "25" : "rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : isOpened ? part.color : "rgba(255,255,255,0.9)",
                  fontSize: 22, fontWeight: 900,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  letterSpacing: 0.5,
                  fontFamily: "monospace",
                }}
              >
                {part.text}
              </button>
            </div>
          );
        })}
      </div>

      {/* Active part detail */}
      {active && (() => {
        const part = parts.find(p => p.id === active);
        return (
          <div style={{
            background: `${part.color}10`,
            border: `2px solid ${part.color}40`,
            borderRadius: 16, padding: "16px 18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                background: part.color, color: "#fff",
                borderRadius: 10, padding: "4px 12px",
                fontSize: 18, fontWeight: 900, fontFamily: "monospace",
              }}>
                {part.text}
              </div>
              <p style={{ fontSize: 14, fontWeight: 800, color: part.color }}>
                {part.label}
              </p>
            </div>
            <p style={{ fontSize: 13, color: COLORS.dark, lineHeight: 1.65, marginBottom: 10 }}>
              {part.desc}
            </p>
            {part.fun && (
              <p style={{ fontSize: 12, color: COLORS.gray, fontStyle: "italic" }}>
                💡 {part.fun}
              </p>
            )}
          </div>
        );
      })()}

      {/* Other ISO examples */}
      {allOpened && examples && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
            Pola yang sama di standar lain
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {examples.map(ex => (
              <div key={ex.code} style={{
                background: "#fff",
                border: `1.5px solid ${COLORS.lightGray}`,
                borderRadius: 12, padding: "10px 14px",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{
                  fontFamily: "monospace", fontSize: 15, fontWeight: 900,
                  color: COLORS.plan, minWidth: 100,
                }}>{ex.code}</span>
                <span style={{ fontSize: 12, color: COLORS.dark }}>{ex.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress pills */}
      <div style={{ display: "flex", gap: 6 }}>
        {parts.map(p => (
          <div key={p.id} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: opened.has(p.id) ? p.color : COLORS.lightGray,
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      <button className="action-btn"
        onClick={allOpened ? handleDone : undefined}
        disabled={!allOpened}
        style={{
          padding: "14px 0", borderRadius: 14,
          background: allOpened ? COLORS.dark : COLORS.lightGray,
          color: allOpened ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: allOpened ? "pointer" : "not-allowed",
          width: "100%",
        }}
      >
        {allOpened ? feedback.next : `Ketuk ${parts.length - opened.size} bagian lagi`}
      </button>
    </div>
  );
}
