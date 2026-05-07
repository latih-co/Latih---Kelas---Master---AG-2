import { useState } from "react";
import { COLORS } from "../data/courses";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// Scenario / Chaos Widget — Present a situation, user chooses reaction
export default function ScenarioChaosWidget({ instruction, scenario, question, options, xp, onComplete, setScore }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (id) => {
    if (showFeedback) return;
    playSound("click");
    setSelectedId(id);
    setShowFeedback(true);

    const opt = options.find(o => o.id === id);
    if (opt?.isCorrect) {
      setScore(s => s + xp);
    }
  };

  const handleDone = () => {
    onComplete();
  };

  const parseText = (text) => {
    return text.split('\n').map((line, i) => {
      // Bold parsing **text**
      const parts = line.split('**');
      return (
        <span key={i} style={{ display: "block", marginBottom: 8 }}>
          {parts.map((part, j) => 
            j % 2 === 1 ? <strong key={j} style={{ color: COLORS.dark }}>{part}</strong> : part
          )}
        </span>
      );
    });
  };

  const selectedOpt = options.find(o => o.id === selectedId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Instruction */}
      {instruction && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 4, height: 20, background: COLORS.act, borderRadius: 4 }} />
          <p style={{ color: COLORS.gray, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
            {instruction}
          </p>
        </div>
      )}

      {/* Scenario Text Box */}
      <div style={{
        background: "#fff",
        border: `2px solid ${COLORS.lightGray}`,
        borderLeft: `5px solid ${COLORS.act}`,
        borderRadius: 16,
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        position: "relative",
      }}>
        <div style={{
           position: "absolute", top: -16, right: 16,
           fontSize: 32, opacity: 0.2, filter: "grayscale(1)"
        }}>🎭</div>
        
        <div style={{ fontSize: 15, color: COLORS.dark, lineHeight: 1.6 }}>
          {parseText(scenario)}
        </div>
      </div>

      {/* Question */}
      <p style={{ fontSize: 16, fontWeight: 800, color: COLORS.dark, textAlign: "center", margin: "8px 0" }}>
        {question}
      </p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          
          let borderColor = COLORS.lightGray;
          let bgColor = "#fff";
          
          if (showFeedback) {
            if (isSelected) {
               borderColor = opt.isCorrect ? COLORS.correct : COLORS.wrong;
               bgColor = opt.isCorrect ? `${COLORS.correct}10` : `${COLORS.wrong}10`;
            } else if (opt.isCorrect) {
               borderColor = COLORS.correct;
               bgColor = `${COLORS.correct}05`;
            }
          } else if (isSelected) {
            borderColor = COLORS.act;
            bgColor = `${COLORS.act}10`;
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              disabled={showFeedback}
              style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "16px",
                borderRadius: 16,
                border: `2px solid ${borderColor}`,
                background: bgColor,
                cursor: showFeedback ? "default" : "pointer",
                transition: "all 0.3s",
                transform: isSelected && !showFeedback ? "scale(1.02)" : "scale(1)",
                textAlign: "left"
              }}
            >
               <span style={{ fontSize: 24, marginTop: -2 }}>{opt.icon}</span>
               <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: 15, fontWeight: isSelected ? 800 : 700, 
                    color: isSelected ? COLORS.dark : showFeedback ? COLORS.gray : COLORS.dark,
                    lineHeight: 1.4, margin: 0
                  }}>
                    {opt.label}
                  </p>
               </div>
            </button>
          );
        })}
      </div>

      {/* Next Button / Feedback */}
      {showFeedback && (
        <FeedbackBar
          isCorrect={selectedOpt?.isCorrect}
          xp={xp}
          explanation={selectedOpt?.feedback}
          onNext={handleDone}
          nextLabel="Lanjut →"
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
