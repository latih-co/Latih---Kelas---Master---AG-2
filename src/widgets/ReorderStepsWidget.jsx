import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "../data/courses";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// ─── Helper: shuffle array ────────────────────────────────────────
function shuffleOnce(arr) {
  const a = [...arr];
  // Simple deterministic shuffle: rotate by 1 so display ≠ answer
  if (a.length > 1) {
    const last = a.pop();
    a.unshift(last);
  }
  return a;
}

export default function ReorderStepsWidget({
  scenario,
  instruction,
  cards = [],
  feedbackCorrect,
  feedbackWrong,
  xp,
  onComplete,
  setScore,
}) {
  const [items, setItems] = useState(() => shuffleOnce(cards));
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  // Drag state
  const dragIdx = useRef(null);
  const dragOverIdx = useRef(null);

  // Reset on new slide
  useEffect(() => {
    setItems(shuffleOnce(cards));
    setChecked(false);
    setIsCorrect(false);
    setHasChanged(false);
  }, [cards]);

  // ── Move helpers (tap arrows) ─────────────────────────────────
  const moveUp = (i) => {
    if (i === 0 || checked) return;
    playSound("click");
    setItems(prev => {
      const a = [...prev];
      [a[i - 1], a[i]] = [a[i], a[i - 1]];
      return a;
    });
    setHasChanged(true);
  };

  const moveDown = (i) => {
    if (i === items.length - 1 || checked) return;
    playSound("click");
    setItems(prev => {
      const a = [...prev];
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      return a;
    });
    setHasChanged(true);
  };

  // ── Drag handlers (desktop) ───────────────────────────────────
  const handleDragStart = (i) => { dragIdx.current = i; };
  const handleDragEnter = (i) => { dragOverIdx.current = i; };
  const handleDragEnd   = () => {
    if (checked) return;
    const from = dragIdx.current;
    const to   = dragOverIdx.current;
    if (from === null || to === null || from === to) return;
    setItems(prev => {
      const a = [...prev];
      const item = a.splice(from, 1)[0];
      a.splice(to, 0, item);
      return a;
    });
    setHasChanged(true);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  // ── Check answer ──────────────────────────────────────────────
  const handleCheck = () => {
    playSound("click");
    // correctPos is 1-indexed; current position is index+1
    const allCorrect = items.every((item, idx) => item.correctPos === idx + 1);
    setIsCorrect(allCorrect);
    setChecked(true);
    if (allCorrect) setScore(s => s + xp);
  };

  // ── Card status after check ───────────────────────────────────
  const cardStatus = (item, idx) => {
    if (!checked) return "idle";
    return item.correctPos === idx + 1 ? "correct" : "wrong";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Question Header ──────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "#1E3A8A",
            color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16, flexShrink: 0,
          }}>
            {scenario?.icon || "1"}
          </div>
          <p style={{ color: "#1E3A8A", fontSize: 13, fontWeight: 700, margin: 0 }}>
            {scenario?.label || "Urutkan dari yang paling cepat expired"}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 17, lineHeight: 1.45 }}>
          {scenario?.text}
        </h3>
      </div>

      {/* ── Instruction pill ─────────────────────────────────── */}
      {instruction && (
        <div style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: 10,
          padding: "8px 14px",
          fontSize: 12,
          color: "#1D4ED8",
          fontWeight: 600,
        }}>
          💡 {instruction}
        </div>
      )}

      {/* ── Rank label ───────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", paddingInline: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: 1 }}>
          🔝 Paling Cepat Expired
        </span>
        <span style={{ fontSize: 10, fontWeight: 800, color: "#16A34A", textTransform: "uppercase", letterSpacing: 1 }}>
          Paling Lama 🔚
        </span>
      </div>

      {/* ── Card List ────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, idx) => {
          const status = cardStatus(item, idx);
          let bg     = "#F8FAFC";
          let border = "2px solid #E2E8F0";
          let badge  = String(idx + 1);

          if (status === "correct") {
            bg     = "#D1FAE5";
            border = "2px solid #10B981";
          } else if (status === "wrong") {
            bg     = "#FEE2E2";
            border = "2px solid #EF4444";
          }

          return (
            <div
              key={item.id}
              draggable={!checked}
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 14,
                background: bg,
                border,
                transition: "all 0.2s ease",
                cursor: checked ? "default" : "grab",
                userSelect: "none",
              }}
            >
              {/* Rank badge */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: status === "correct" ? "#10B981"
                          : status === "wrong"   ? "#EF4444"
                          : "#94A3B8",
                color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, flexShrink: 0,
              }}>
                {status === "correct" ? "✓" : status === "wrong" ? "✗" : badge}
              </div>

              {/* Emoji + text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.dark, lineHeight: 1.3 }}>
                      {item.text}
                    </div>
                    {item.dateText && (
                      <div style={{
                        fontSize: 11, fontWeight: 600,
                        color: status === "correct" ? "#047857"
                              : status === "wrong"   ? "#B91C1C"
                              : "#64748B",
                        marginTop: 2,
                      }}>
                        📅 Exp: {item.dateText}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Up/Down arrows for mobile interaction */}
              {!checked && (
                <div style={{ display: "flex", flexDirection: "column", gap: 2, flexShrink: 0 }}>
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    style={{
                      width: 28, height: 28, border: "1px solid #E2E8F0",
                      background: idx === 0 ? "#F1F5F9" : "white",
                      borderRadius: 6, cursor: idx === 0 ? "default" : "pointer",
                      fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
                      color: idx === 0 ? "#CBD5E1" : "#475569",
                      padding: 0,
                    }}
                  >▲</button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === items.length - 1}
                    style={{
                      width: 28, height: 28, border: "1px solid #E2E8F0",
                      background: idx === items.length - 1 ? "#F1F5F9" : "white",
                      borderRadius: 6, cursor: idx === items.length - 1 ? "default" : "pointer",
                      fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
                      color: idx === items.length - 1 ? "#CBD5E1" : "#475569",
                      padding: 0,
                    }}
                  >▼</button>
                </div>
              )}

              {/* Drag handle (desktop hint) */}
              {!checked && (
                <div style={{
                  fontSize: 16, color: "#CBD5E1", flexShrink: 0,
                  cursor: "grab", paddingLeft: 2,
                }}>
                  ⠿
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Check Button ─────────────────────────────────────── */}
      {!checked && (
        <button
          className="action-btn"
          onClick={handleCheck}
          style={{
            marginTop: 8,
            padding: "16px",
            borderRadius: 16,
            background: "#1E293B",
            color: "#F8FAFC",
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.1s",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Periksa Urutan
        </button>
      )}

      {/* ── Feedback Bar ─────────────────────────────────────── */}
      {checked && (
        <div style={{ animation: "slideUp 0.3s ease-out" }}>
          <FeedbackBar
            isCorrect={isCorrect}
            xp={isCorrect ? xp : 0}
            explanation={isCorrect ? feedbackCorrect : feedbackWrong}
            onNext={onComplete}
            nextLabel="Lanjut →"
            delayAction={0}
          />
        </div>
      )}
    </div>
  );
}
