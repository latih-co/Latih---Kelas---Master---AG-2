import React, { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function WordChipsWidget({
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

  const isMulti = options.filter(opt => opt.correct).length > 1;

  useEffect(() => {
    setSelectedIds([]);
    setChecked(false);
  }, [options]);

  const handleChipClick = (id) => {
    if (checked) return;
    playSound("click");
    setSelectedIds(prev => {
      if (isMulti) {
        return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      } else {
        return [id];
      }
    });
  };

  const isCorrect = isMulti
    ? options.filter(o => o.correct).every(o => selectedIds.includes(o.id)) &&
      selectedIds.every(id => options.find(o => o.id === id)?.correct)
    : options.find(o => o.id === selectedIds[0])?.correct;

  let explanation = "Terima kasih atas jawaban Anda.";
  if (isMulti) {
    if (isCorrect) {
      explanation = scenario.feedbackCorrect || "Tepat sekali! Seluruh pilihan Anda sudah benar.";
    } else {
      const wrongSelected = selectedIds.find(id => !options.find(o => o.id === id)?.correct);
      if (wrongSelected) {
        explanation = options.find(o => o.id === wrongSelected)?.feedback || scenario.feedbackWrong || "Ada pilihan yang kurang tepat. Coba perhatikan lagi.";
      } else {
        explanation = scenario.feedbackWrong || "Belum lengkap, masih ada yang perlu dipilih.";
      }
    }
  } else {
    const selectedData = options.find(o => o.id === selectedIds[0]);
    explanation = selectedData?.feedback || "Terima kasih atas jawaban Anda.";
  }

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
            {scenario.icon || "2"}
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

      {/* Chips Area */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12
      }}>
        {options.map(opt => {
          const isSelected = selectedIds.includes(opt.id);
          
          // Default state
          let bg = "#F1F5F9";
          let border = "1px solid #E2E8F0";
          let color = "#334155";
          let opacity = 1;
          let dotColor = "#94A3B8";

          // Interactivity states
          if (!checked) {
            if (isSelected) {
              bg = "#FEF3C7"; // amber light
              border = "1px solid #D97706";
              color = "#D97706";
              dotColor = "#D97706";
            }
          } else {
            // Revealed
            if (opt.correct && isSelected) {
              bg = "#D1FAE5";
              border = "1px solid #10B981";
              color = "#047857";
              dotColor = "#10B981";
            } else if (!opt.correct && isSelected) {
              // Selected but wrong
              bg = "#FEE2E2";
              border = "1px solid #EF4444";
              color = "#B91C1C";
              dotColor = "#EF4444";
            } else if (opt.correct && !isSelected) {
              // Missed correct option
              bg = "#FEF2F2";
              border = "1px solid #FCA5A5";
              color = "#991B1B";
              dotColor = "#FCA5A5";
            } else {
              // Not selected, not correct
              bg = "#F1F5F9";
              border = "1px solid #A7F3D0";
              opacity = 1;
            }
          }

          return (
            <div
              key={opt.id}
              onClick={() => handleChipClick(opt.id)}
              className={!checked && !isSelected ? "hover-chip" : ""}
              style={{
                padding: "10px 16px",
                borderRadius: 20,
                background: bg,
                border,
                color,
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                cursor: checked ? "default" : "pointer",
                transition: "all 0.2s ease",
                userSelect: "none"
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: 4, background: dotColor,
                transition: "background 0.2s"
              }} />
              {opt.text}
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-chip:hover {
          border: 1px solid #1E293B !important;
          background: #F8FAFC !important;
          color: #1E293B !important;
        }
        .hover-chip:hover div {
          background: #1E293B !important;
        }
      `}} />

      {/* Check Button */}
      {!checked && selectedIds.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            className="action-btn"
            onClick={() => {
              playSound("click");
              setChecked(true);
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
            explanation={explanation}
            onNext={onComplete}
            nextLabel={nextLabel || "Lanjut →"}
            delayAction={0}
          />
        </div>
      )}
    </div>
  );
}
