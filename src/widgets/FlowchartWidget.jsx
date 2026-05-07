import { useState } from "react";
import { COLORS } from "../data/courses";

// Slide 4: Horizontal certification process flowchart — tap steps to expand
export default function FlowchartWidget({ instruction, steps, feedback, xp, onComplete, setScore }) {
  const [active, setActive] = useState(null);
  const [opened, setOpened] = useState(new Set());

  const handleTap = (id) => {
    setActive(prev => prev === id ? null : id);
    setOpened(prev => new Set([...prev, id]));
  };

  const allOpened = steps.every(s => opened.has(s.id));

  const handleDone = () => {
    setScore(s => s + xp);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* Horizontal scrollable flowchart */}
      <div style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: "max-content", padding: "4px 0" }}>
          {steps.map((step, idx) => {
            const isOpen   = opened.has(step.id);
            const isActive = active === step.id;

            return (
              <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
                {/* Step node */}
                <div
                  onClick={() => handleTap(step.id)}
                  style={{
                    width: 90, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  }}
                >
                  {/* Circle */}
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: isActive ? step.color : isOpen ? `${step.color}25` : COLORS.lightGray,
                    border: `2.5px solid ${isOpen ? step.color : "transparent"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, transition: "all 0.25s",
                    boxShadow: isActive ? `0 4px 14px ${step.color}40` : "none",
                  }}>
                    {isOpen && !isActive
                      ? <span style={{ fontSize: 18, color: step.color }}>✓</span>
                      : step.icon}
                  </div>

                  {/* Step number */}
                  <span style={{
                    fontSize: 9, fontWeight: 900,
                    color: isOpen ? step.color : COLORS.gray,
                    textTransform: "uppercase", letterSpacing: 0.5,
                  }}>
                    {idx + 1}
                  </span>

                  {/* Label */}
                  <p style={{
                    fontSize: 10, fontWeight: 700, textAlign: "center",
                    color: isOpen ? step.color : COLORS.gray,
                    lineHeight: 1.3, maxWidth: 80,
                    transition: "color 0.25s",
                  }}>
                    {step.label}
                  </p>
                </div>

                {/* Arrow connector */}
                {idx < steps.length - 1 && (
                  <div style={{
                    width: 24, height: 2, flexShrink: 0,
                    background: opened.has(step.id) && opened.has(steps[idx + 1]?.id)
                      ? COLORS.plan
                      : COLORS.lightGray,
                    position: "relative",
                    transition: "background 0.3s",
                  }}>
                    <div style={{
                      position: "absolute", right: -4, top: -4,
                      width: 10, height: 10,
                      borderTop: `2px solid ${COLORS.lightGray}`,
                      borderRight: `2px solid ${COLORS.lightGray}`,
                      transform: "rotate(45deg)",
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active step detail */}
      {active && (() => {
        const step = steps.find(s => s.id === active);
        return (
          <div style={{
            background: `${step.color}08`, border: `2px solid ${step.color}30`,
            borderRadius: 18, padding: "16px 18px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                fontSize: 22, width: 44, height: 44,
                background: step.color, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{step.icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 900, color: step.color, textTransform: "uppercase", letterSpacing: 1 }}>
                  Langkah {steps.findIndex(s => s.id === step.id) + 1}
                </p>
                <p style={{ fontSize: 15, fontWeight: 800, color: COLORS.dark }}>{step.label}</p>
              </div>
            </div>

            <p style={{ fontSize: 13, color: COLORS.dark, lineHeight: 1.6, marginBottom: 12 }}>{step.desc}</p>

            {/* Meta chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {step.meta.map((m, i) => (
                <div key={i} style={{
                  background: "#fff", border: `1.5px solid ${step.color}25`,
                  borderRadius: 10, padding: "6px 12px",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ fontSize: 14 }}>{m.icon}</span>
                  <div>
                    <p style={{ fontSize: 10, color: COLORS.gray }}>{m.label}</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: step.color }}>{m.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, height: 5, background: COLORS.lightGray, borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(opened.size / steps.length) * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.plan}, ${COLORS.do})`,
            borderRadius: 99, transition: "width 0.4s",
          }} />
        </div>
        <span style={{ fontSize: 12, color: COLORS.gray, fontWeight: 600, minWidth: 60 }}>
          {opened.size}/{steps.length} langkah
        </span>
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
        }}
      >
        {allOpened ? feedback.next : `Jelajahi ${steps.length - opened.size} langkah lagi`}
      </button>
    </div>
  );
}
