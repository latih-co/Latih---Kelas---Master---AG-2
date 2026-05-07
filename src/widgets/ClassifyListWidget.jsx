import React, { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function ClassifyListWidget({
  scenario,
  instruction,
  options,
  xp,
  onComplete,
  setScore,
  nextLabel
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedIds([]);
    setChecked(false);
    setIsCorrect(false);
  }, [options]);

  const handleToggle = (id) => {
    if (checked) return;
    playSound("click");
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCheck = () => {
    playSound("click");
    setChecked(true);
    
    // Valid if every option's selection state matches its 'correct' flag
    const allValid = options.every(opt => {
      const isSelected = selectedIds.includes(opt.id);
      return isSelected === opt.correct;
    });
    
    setIsCorrect(allValid);
    if (allValid) {
      setScore(s => s + xp);
    }
  };

  // Letters mapping A, B, C, D, E
  const letters = ["A", "B", "C", "D", "E", "F"];

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
            background: COLORS.dark, color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16
          }}>
            {scenario.icon || "4"}
          </div>
          <p style={{ color: COLORS.gray, fontSize: 14, fontWeight: 500, margin: 0 }}>
            {scenario.label || "Tap untuk pilih"}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 18, lineHeight: 1.4 }}>
          {scenario.text}
        </h3>
        {instruction && (
          <p style={{ margin: 0, fontSize: 13, color: COLORS.gray, fontStyle: "italic" }}>
            {instruction}
          </p>
        )}
      </div>

      {/* Classify List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((opt, index) => {
          const isSelected = selectedIds.includes(opt.id);
          const isValid = isSelected === opt.correct;
          
          // Default state
          let bg = "#F1F5F9";
          let border = "1px solid #E2E8F0";
          let letterBg = "#E2E8F0";
          let letterColor = "#64748B";
          let textColor = "#334155";
          let showBadge = false;
          let badgeBg = "transparent";
          let badgeColor = "transparent";
          let animation = "none";

          if (!checked) {
            if (isSelected) {
              bg = "#FEF3C7"; // amber light
              border = "1px solid #D97706";
              letterBg = "#FDE68A";
              letterColor = "#D97706";
              textColor = "#D97706";
            }
          } else {
            // Revealed
            if (isValid) {
              border = "1px solid #10B981";
              letterBg = "#D1FAE5";
              letterColor = "#047857";
              bg = isSelected ? "#ECFDF5" : "#F8FAFC"; // Greenish if selected, normal if correctly untouched
              textColor = isSelected ? "#065F46" : "#334155";
              
              if (isSelected && opt.badgeText) {
                showBadge = true;
                badgeBg = "#D1FAE5";
                badgeColor = "#047857";
              }
            } else {
              // Invalid mapping (wrongly selected, or wrongly missed)
              border = "1px solid #EF4444";
              letterBg = "#FEE2E2";
              letterColor = "#B91C1C";
              bg = "#FEF2F2";
              textColor = "#991B1B";
              animation = "shake 0.4s ease-in-out";
              
              if (opt.badgeText) {
                showBadge = true;
                badgeBg = "#FEE2E2";
                badgeColor = "#B91C1C";
              }
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => handleToggle(opt.id)}
              className={!checked && !isSelected ? "hover-classify-item" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 16px",
                borderRadius: 12,
                background: bg,
                border,
                cursor: checked ? "default" : "pointer",
                transition: "all 0.2s ease",
                animation
              }}
            >
              {/* Box Huruf */}
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: letterBg, color: letterColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: "bold", fontSize: 16, flexShrink: 0,
                transition: "all 0.2s ease"
              }}>
                {letters[index] || "•"}
              </div>
              
              <div style={{ flex: 1, color: textColor, fontSize: 14, fontWeight: 500, lineHeight: 1.4, transition: "color 0.2s ease" }}>
                {opt.text}
              </div>
              
              {/* Badge */}
              <div style={{
                opacity: showBadge ? 1 : 0,
                padding: "4px 10px", borderRadius: 12,
                background: badgeBg, color: badgeColor,
                fontSize: 11, fontWeight: "bold", letterSpacing: 0.5,
                transform: showBadge ? "scale(1)" : "scale(0.8)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                whiteSpace: "nowrap"
              }}>
                {opt.badgeText}
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-classify-item:hover {
          border: 1px solid #1E293B !important;
          background: #F8FAFC !important;
          transform: translateX(3px);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }
      `}} />

      {/* Check Button */}
      {!checked && selectedIds.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            className="action-btn"
            onClick={handleCheck}
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

      {checked && (
        <div style={{ animation: "slideUp 0.3s ease-out" }}>
          <FeedbackBar
            isCorrect={isCorrect}
            xp={isCorrect ? xp : 0}
            explanation={isCorrect ? scenario.feedbackCorrect : scenario.feedbackWrong}
            onNext={onComplete}
            nextLabel={nextLabel || "Lanjut ke Materi →"}
            delayAction={500}
          />
        </div>
      )}
    </div>
  );
}
