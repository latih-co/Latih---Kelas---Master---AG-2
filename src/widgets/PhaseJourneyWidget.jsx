import { useState } from "react";
import { COLORS } from "../data/courses";

// Phase journey widget — tap nodes on a path
export default function PhaseJourneyWidget({ instruction, phases, feedback, xp, onComplete, setScore }) {
  const [activeId, setActiveId] = useState(null);
  const [opened, setOpened] = useState(new Set());

  const handleTap = (id) => {
    setActiveId(prev => prev === id ? null : id);
    setOpened(prev => new Set([...prev, id]));
  };

  const allOpened = phases.every(p => opened.has(p.id));

  const handleDone = () => {
    setScore(s => s + xp);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* The Journey Path */}
      <div style={{ position: "relative", padding: "10px 0" }}>
        {/* Connecting line */}
        <div style={{
          position: "absolute", top: 10, bottom: 10, left: 32,
          width: 3, background: COLORS.lightGray, borderRadius: 3,
          zIndex: 0
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative", zIndex: 1 }}>
          {phases.map((phase, idx) => {
            const isOpened = opened.has(phase.id);
            const isActive = activeId === phase.id;

            return (
              <div key={phase.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {/* Node */}
                <div
                  onClick={() => handleTap(phase.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "10px 14px", borderRadius: 16,
                    background: isActive ? `${phase.color}15` : "#fff",
                    border: `2px solid ${isActive ? phase.color : isOpened ? `${phase.color}60` : COLORS.lightGray}`,
                    cursor: "pointer", transition: "all 0.25s",
                    boxShadow: isActive ? `0 4px 12px ${phase.color}25` : "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: isOpened ? phase.color : COLORS.lightGray,
                    color: isOpened ? "#fff" : COLORS.gray,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                    transition: "all 0.3s",
                  }}>
                    {phase.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.dark }}>{phase.title}</p>
                    <p style={{ fontSize: 11, color: COLORS.gray, marginTop: 2 }}>{phase.subtitle}</p>
                  </div>
                  {isOpened && (
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: `${phase.color}20`, color: phase.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 900
                    }}>✓</div>
                  )}
                </div>

                {/* Expanded Details */}
                {isActive && (
                  <div style={{
                    marginLeft: 46, padding: "12px 14px",
                    background: `${phase.color}08`, borderLeft: `3px solid ${phase.color}`,
                    borderRadius: "0 12px 12px 0",
                    animation: "expandDown 0.3s ease-out"
                  }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: phase.color, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                      {phase.timeline}
                    </p>
                    
                    <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                      {phase.activities.map((act, i) => (
                        <li key={i} style={{ fontSize: 12.5, color: COLORS.dark, lineHeight: 1.5 }}>
                          {act}
                        </li>
                      ))}
                    </ul>

                    {phase.docs && phase.docs.length > 0 && (
                      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${phase.color}20` }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: COLORS.gray, marginBottom: 6 }}>DOKUMEN TERKAIT:</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {phase.docs.map((doc, i) => (
                            <span key={i} style={{
                              fontSize: 10, background: "#fff", border: `1px solid ${phase.color}40`,
                              padding: "4px 8px", borderRadius: 8, color: COLORS.dark
                            }}>📄 {doc}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button className="action-btn"
        onClick={allOpened ? handleDone : undefined}
        disabled={!allOpened}
        style={{
          padding: "14px 0", borderRadius: 14,
          background: allOpened ? COLORS.dark : COLORS.lightGray,
          color: allOpened ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: allOpened ? "pointer" : "not-allowed", width: "100%",
          marginTop: 10
        }}
      >
        {allOpened ? feedback.next : `Buka ${phases.length - opened.size} tahap lagi`}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expandDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
