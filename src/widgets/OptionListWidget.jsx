import React, { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function OptionListWidget({
  scenario,
  options,
  xp,
  onComplete,
  setScore,
  nextLabel
}) {
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedOpt(null);
    setChecked(false);
  }, [options]);

  const handleOptionClick = (id) => {
    if (checked) return;
    playSound("click");
    setSelectedOpt(id);
    
    // Auto-check logic if defined in scenario
    if (scenario?.autoCheck) {
      setTimeout(() => {
        playSound("click");
        setChecked(true);
        const isCorrect = options.find(o => o.id === id)?.correct;
        if (isCorrect) setScore(s => s + xp);
      }, 500); // give time for selection to register visually
    }
  };

  const selectedData = options.find(o => o.id === selectedOpt);
  const isCorrect = selectedData?.correct;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Question Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: COLORS.dark, color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16
          }}>
            {scenario.icon || "3"}
          </div>
          <p style={{ color: COLORS.gray, fontSize: 14, fontWeight: 500, margin: 0 }}>
            {scenario.label || "Tap untuk pilih"}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 18, lineHeight: 1.4 }}>
          {scenario.text}
        </h3>
      </div>

      {/* Options List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map(opt => {
          const isSelected = selectedOpt === opt.id;
          // Default styling
          let bg = "#fff";
          let border = "1px solid #E2E8F0";
          let iconRight = null;
          let textColor = "#334155";
          
          if (!checked) {
            if (isSelected) {
              bg = "#FEF3C7"; // amber light
              border = "1px solid #D97706";
              textColor = "#D97706";
            }
          } else {
            // Revealed state depends strictly on the option's intended meaning
            if (opt.revealState === "valid") {
              bg = "#D1FAE5"; // light green
              border = "1px solid #10B981";
              textColor = "#065F46";
              iconRight = <span style={{ color: "#10B981", fontSize: 18, fontWeight: "bold" }}>✓</span>;
            } else if (opt.revealState === "invalid") {
              bg = "#FEE2E2"; // light red
              border = "1px solid #EF4444";
              textColor = "#991B1B";
              iconRight = <span style={{ color: "#EF4444", fontSize: 18, fontWeight: "bold" }}>✗</span>;
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => handleOptionClick(opt.id)}
              className={!checked ? "hover-option-list" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px",
                borderRadius: 12,
                background: bg,
                border,
                cursor: checked ? "default" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</div>
              <div style={{ flex: 1, color: textColor, fontSize: 15, fontWeight: 500 }}>
                {opt.text}
              </div>
              <div style={{ width: 24, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {iconRight}
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-option-list:hover {
          border: 1px solid #94A3B8 !important;
          background: #F8FAFC !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
      `}} />

      {/* Check Button */}
      {!checked && selectedOpt !== null && !scenario?.autoCheck && (
        <div style={{ marginTop: 8 }}>
          <button
            className="action-btn"
            onClick={() => {
              playSound("click");
              setChecked(true);
              const isCorrect = options.find(o => o.id === selectedOpt)?.correct;
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
