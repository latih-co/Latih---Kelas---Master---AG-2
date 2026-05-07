import React, { useState, useEffect } from "react";
import { COLORS } from "../data/courses";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

/**
 * MatchLinesWidget
 * Props (spread dari slide data):
 *   scenario   : { icon, label, text }
 *   instruction: string (opsional)
 *   items      : [{ id, icon, label, subLabel, pairId }]   — kolom kiri
 *   targets    : [{ id, icon, label, subLabel }]           — kolom kanan
 *   feedbackCorrect, feedbackWrong
 *   xp, onComplete, setScore
 */
export default function MatchLinesWidget({
  scenario,
  instruction,
  items = [],
  targets = [],
  feedbackCorrect,
  feedbackWrong,
  xp,
  onComplete,
  setScore,
}) {
  // matches: { [itemId]: targetId }
  const [matches, setMatches]       = useState({});
  const [selectedItem, setSelected] = useState(null); // id item kiri yang sedang dipilih
  const [checked, setChecked]       = useState(false);
  const [isCorrect, setIsCorrect]   = useState(false);

  useEffect(() => {
    setMatches({});
    setSelected(null);
    setChecked(false);
    setIsCorrect(false);
  }, [items]);

  const allMatched = items.length > 0 && Object.keys(matches).length === items.length;

  /** Klik item kiri → tandai sebagai "selected" */
  const handleItemClick = (id) => {
    if (checked) return;
    playSound("click");
    setSelected(prev => prev === id ? null : id);
  };

  /** Klik target kanan → pasangkan dengan item yang sedang selected */
  const handleTargetClick = (tid) => {
    if (checked || !selectedItem) return;
    playSound("click");
    setMatches(prev => ({ ...prev, [selectedItem]: tid }));
    setSelected(null);
  };

  /** Hapus pasangan (klik item kiri yang sudah berpasangan) */
  const handleRemoveMatch = (id) => {
    if (checked) return;
    setMatches(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSelected(null);
  };

  /** Cek jawaban */
  const handleCheck = () => {
    playSound("click");
    const correct = items.every(item => matches[item.id] === item.pairId);
    setIsCorrect(correct);
    setChecked(true);
    if (correct) setScore(s => s + xp);
  };

  /** Status tiap item setelah check */
  const itemStatus = (item) => {
    if (!checked) return "idle";
    return matches[item.id] === item.pairId ? "correct" : "wrong";
  };

  /** Nama target dari id */
  const targetById = (tid) => targets.find(t => t.id === tid);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Question Header ──────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "#1E3A8A", color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16, flexShrink: 0,
          }}>
            {scenario?.icon || "1"}
          </div>
          <p style={{ color: "#1E3A8A", fontSize: 13, fontWeight: 700, margin: 0 }}>
            {scenario?.label}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 16, lineHeight: 1.45 }}>
          {scenario?.text}
        </h3>
      </div>

      {/* ── Instruction ──────────────────────────────────────── */}
      {instruction && (
        <div style={{
          background: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: 10, padding: "8px 14px",
          fontSize: 12, color: "#1D4ED8", fontWeight: 600,
        }}>
          💡 {instruction}
        </div>
      )}

      {/* ── Target list (kolom kanan — dipilih pertama supaya terlihat) */}
      <div>
        <div style={{
          fontSize: 11, fontWeight: 800, color: "#64748B",
          textTransform: "uppercase", letterSpacing: 1, marginBottom: 8,
        }}>
          Tindakan yang Tersedia — klik setelah memilih produk
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {targets.map(t => {
            const isUsed = Object.values(matches).includes(t.id);
            const highlight = selectedItem !== null && !isUsed;
            return (
              <div
                key={t.id}
                onClick={() => handleTargetClick(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 12,
                  background: isUsed
                    ? "#F1F5F9"
                    : highlight
                      ? "#DBEAFE"
                      : "#F8FAFC",
                  border: isUsed
                    ? "1.5px solid #CBD5E1"
                    : highlight
                      ? "1.5px solid #3B82F6"
                      : "1.5px solid #E2E8F0",
                  cursor: checked || isUsed ? "default" : selectedItem ? "pointer" : "default",
                  opacity: isUsed ? 0.55 : 1,
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={e => {
                  if (!checked && !isUsed && selectedItem)
                    e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
              >
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.dark }}>{t.label}</div>
                  {t.subLabel && (
                    <div style={{ fontSize: 11, color: "#64748B" }}>{t.subLabel}</div>
                  )}
                </div>
                {isUsed && <span style={{ fontSize: 11, color: "#94A3B8", fontStyle: "italic" }}>terpasang</span>}
                {highlight && <span style={{ fontSize: 14, color: "#3B82F6" }}>← pilih</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, color: "#94A3B8", fontSize: 11,
      }}>
        <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
        PASANGKAN PRODUK DI BAWAH INI
        <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
      </div>

      {/* ── Item list (kolom kiri — produk) ──────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(item => {
          const matchedTarget = targetById(matches[item.id]);
          const isSelected    = selectedItem === item.id;
          const status        = itemStatus(item);
          const isMatched     = !!matches[item.id];

          let bg     = "#F8FAFC";
          let border = "1.5px solid #E2E8F0";
          let badgeColor = "#94A3B8";

          if (isSelected) { bg = "#EFF6FF"; border = "1.5px solid #3B82F6"; }
          else if (isMatched && !checked) { bg = "#F0FDF4"; border = "1.5px solid #4ADE80"; }
          else if (status === "correct") { bg = "#D1FAE5"; border = "1.5px solid #10B981"; badgeColor = "#10B981"; }
          else if (status === "wrong")   { bg = "#FEE2E2"; border = "1.5px solid #EF4444"; badgeColor = "#EF4444"; }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (checked) return;
                if (isMatched) handleRemoveMatch(item.id);
                else handleItemClick(item.id);
              }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "12px 14px", borderRadius: 14,
                background: bg, border,
                cursor: checked ? "default" : "pointer",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={e => {
                if (!checked) e.currentTarget.style.transform = "translateX(3px)";
              }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
            >
              {/* Status badge */}
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: status === "correct" ? "#10B981" : status === "wrong" ? "#EF4444"
                          : isSelected ? "#3B82F6" : isMatched ? "#4ADE80" : "#E2E8F0",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 2,
              }}>
                {status === "correct" ? "✓" : status === "wrong" ? "✗"
                  : isSelected ? "→" : isMatched ? "✓" : "?"}
              </div>

              {/* Product info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.dark }}>{item.label}</div>
                </div>
                {item.subLabel && (
                  <div style={{ fontSize: 11, color: "#64748B", marginBottom: isMatched ? 6 : 0 }}>
                    {item.subLabel}
                  </div>
                )}
                {/* Matched target chip */}
                {matchedTarget && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5, marginTop: 5,
                    background: checked
                      ? status === "correct" ? "#D1FAE5" : "#FEE2E2"
                      : "#DBEAFE",
                    border: checked
                      ? status === "correct" ? "1px solid #10B981" : "1px solid #EF4444"
                      : "1px solid #93C5FD",
                    borderRadius: 99, padding: "3px 10px",
                    fontSize: 11, fontWeight: 700,
                    color: checked
                      ? status === "correct" ? "#047857" : "#B91C1C"
                      : "#1D4ED8",
                  }}>
                    <span>{matchedTarget.icon}</span>
                    <span>{matchedTarget.label}</span>
                    {!checked && (
                      <span style={{ marginLeft: 4, opacity: 0.6, fontSize: 10 }}>✕ hapus</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Status info ──────────────────────────────────────── */}
      {!checked && (
        <div style={{ textAlign: "center", fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>
          {selectedItem
            ? "✅ Sekarang klik tindakan yang sesuai di atas"
            : allMatched
              ? "Semua terpasang! Tekan Periksa bila sudah yakin."
              : `${Object.keys(matches).length}/${items.length} produk terpasang — klik produk untuk memilih`
          }
        </div>
      )}

      {/* ── Check Button ─────────────────────────────────────── */}
      {!checked && allMatched && (
        <button
          className="action-btn"
          onClick={handleCheck}
          style={{
            marginTop: 4, padding: "16px", borderRadius: 16,
            background: "#1E293B", color: "#F8FAFC",
            border: "none", fontWeight: "bold", fontSize: 16,
            cursor: "pointer", width: "100%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.1s",
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          Periksa Pasangan
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
