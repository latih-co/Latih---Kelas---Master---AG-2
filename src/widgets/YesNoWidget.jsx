import React, { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function YesNoWidget({
  scenario,
  options,
  xp,
  onComplete,
  setScore,
  nextLabel
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setChecked(false);
  }, [options]);

  const handleSelect = (id) => {
    if (checked) return;
    playSound("click");
    setSelectedId(id);
  };

  const selectedData = options.find(o => o.id === selectedId);
  const isCorrect = selectedData?.correct;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Context Area (if provided) */}
      {scenario.htmlContext && (
        <div style={{ marginBottom: -8 }} dangerouslySetInnerHTML={{ __html: scenario.htmlContext }} />
      )}

      {/* Question Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: scenario.labelColor || "#0F766E", // default darker teal
            color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16
          }}>
            {scenario.icon || "5"}
          </div>
          <p style={{ color: scenario.labelColor || "#0F766E", fontSize: 14, fontWeight: 600, margin: 0 }}>
            {scenario.label || "Ya atau Tidak?"}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 18, lineHeight: 1.4 }}>
          {scenario.text}
        </h3>
      </div>

      {/* Yes/No Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          
          let bg = "#F8FAFC";
          let border = "2px solid #E2E8F0";
          let opacity = 1;
          let textColor = COLORS.dark;

          if (!checked) {
            if (isSelected) {
              bg = "#F1F5F9";
              border = "2px solid #94A3B8";
            }
          } else {
            if (isSelected) {
              if (opt.correct) {
                bg = "#D1FAE5";
                border = "2px solid #10B981";
                textColor = "#047857";
              } else {
                bg = "#FEE2E2";
                border = "2px solid #EF4444";
                textColor = "#B91C1C";
              }
            } else {
              opacity = 0.35;
              border = "2px solid #E2E8F0";
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={!checked ? "hover-yesno" : ""}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "24px 16px",
                borderRadius: 16,
                background: bg,
                border,
                opacity,
                cursor: checked ? "default" : "pointer",
                transition: "all 0.2s ease",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 4 }}>
                {opt.icon}
              </div>
              <div style={{ fontSize: 20, fontWeight: "bold", color: textColor }}>
                {opt.label}
              </div>
              <div style={{ fontSize: 13, color: checked && isSelected ? textColor : "#64748B", fontWeight: 500, lineHeight: 1.3 }}>
                {opt.subLabel}
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-yesno:hover {
          border: 2px solid #CBD5E1 !important;
          background: #F1F5F9 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
      `}} />

      {/* Check Button */}
      {!checked && selectedId !== null && (
        <div style={{ marginTop: 8 }}>
          <button
            className="action-btn"
            onClick={() => {
              playSound("click");
              setChecked(true);
              const isCorrect = options.find(o => o.id === selectedId)?.correct;
              if (isCorrect) {
                setScore(s => s + xp);
              }
            }}
            style={{
              padding: "16px", borderRadius: 16,
              background: "#1E293B", color: "#F8FAFC",
              border: "none", fontWeight: "bold", fontSize: 16,
              cursor: "pointer", width: "100%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.1s"
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Periksa
          </button>
        </div>
      )}

      {/* Feedback Bar */}
      {checked && (
        <div style={{ animation: "slideUp 0.3s ease-out" }}>
          <FeedbackBar
            isCorrect={isCorrect}
            xp={isCorrect ? xp : 0}
            explanation={selectedData?.feedback || "Terima kasih atas jawaban Anda."}
            onNext={onComplete}
            nextLabel={nextLabel || "Lanjut →"}
            delayAction={0}
          />
        </div>
      )}
    </div>
  );
}
