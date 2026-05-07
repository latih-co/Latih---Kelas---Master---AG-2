import { useState } from "react";
import { COLORS } from "../data/courses";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// Tap Select Widget — Multiple choice picking from a grid of cards
export default function TapSelectWidget({ instruction, options, minSelect = 1, maxSelect = 99, xp, onComplete, setScore, feedback }) {
  const [selected, setSelected] = useState(new Set());
  const [showResult, setShowResult] = useState(false);
  const [isPerfect, setIsPerfect] = useState(false);

  const handleToggle = (id) => {
    if (showResult) return;
    playSound("click");
    
    setSelectedItem(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size < maxSelect) {
          next.add(id);
        }
      }
      return next;
    });
  };

  const setSelectedItem = setSelected; // Alias for the set function inside the handler

  const checkAnswer = () => {
    // If the data structure expects correct items to be a certain way,
    // assuming here standard structure where options have `correct: true/false`
    
    // Validate
    let isAllCorrect = true;
    let anyMissed = false;
    let earnedXp = 0;
    
    options.forEach(opt => {
      const isSelected = selected.has(opt.id);
      if (opt.correct) {
        if (isSelected) {
           earnedXp += Math.floor(xp / options.filter(o => o.correct).length);
        } else {
           anyMissed = true;
        }
      } else {
        if (isSelected) {
           isAllCorrect = false;
        }
      }
    });

    const perfect = isAllCorrect && !anyMissed;
    if (perfect) {
       earnedXp = xp; // Full bonus if perfect
    }
    
    setIsPerfect(perfect);
    setScore(s => s + earnedXp);
    setShowResult(true);
  };

  const handleDone = () => {
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Instruction Box */}
      <div style={{
        background: `${COLORS.dark}05`, border: `2px solid ${COLORS.dark}15`,
        borderRadius: 16, padding: "16px 20px",
        display: "flex", gap: 12, alignItems: "center"
      }}>
        <span style={{ fontSize: 24 }}>👆</span>
        <p style={{ fontSize: 13, color: COLORS.dark, lineHeight: 1.5, fontWeight: 500 }}>
          {instruction}
          {maxSelect < 99 && (
             <span style={{ display: "block", marginTop: 4, fontWeight: 700, color: COLORS.plan }}>
               (Pilih maksimal {maxSelect})
             </span>
          )}
        </p>
      </div>

      {/* Grid of Options */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 10
      }}>
        {options.map(opt => {
          const isSelected = selected.has(opt.id);
          
          let borderColor = isSelected ? COLORS.plan : COLORS.lightGray;
          let bgColor = isSelected ? `${COLORS.plan}10` : "#fff";
          
          if (showResult) {
            if (opt.correct && isSelected) {
              borderColor = COLORS.correct;
              bgColor = `${COLORS.correct}15`;
            } else if (opt.correct && !isSelected) {
              borderColor = COLORS.correct; // missed it
              bgColor = "transparent";
            } else if (!opt.correct && isSelected) {
              borderColor = COLORS.act;
              bgColor = `${COLORS.act}15`;
            } else {
              borderColor = "transparent";
              bgColor = `${COLORS.lightGray}30`;
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleToggle(opt.id)}
              disabled={showResult}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px", borderRadius: 16,
                background: bgColor,
                border: `2px solid ${borderColor}`,
                cursor: showResult ? "default" : "pointer",
                transition: "all 0.25s",
                transform: isSelected && !showResult ? "scale(1.02)" : "scale(1)",
                textAlign: "left"
              }}
            >
              {/* Checkbox circle */}
              <div style={{
                width: 24, height: 24, borderRadius: 8,
                border: `2px solid ${showResult ? (opt.correct ? COLORS.correct : isSelected ? COLORS.act : COLORS.gray) : (isSelected ? COLORS.plan : COLORS.gray)}`,
                background: showResult ? (opt.correct ? COLORS.correct : isSelected ? COLORS.act : "transparent") : (isSelected ? COLORS.plan : "transparent"),
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s"
              }}>
                {showResult ? (
                  opt.correct ? <span style={{fontSize: 14, fontWeight: 900}}>✓</span> 
                  : isSelected ? <span style={{fontSize: 14, fontWeight: 900}}>✕</span> : null
                ) : (
                  isSelected && <span style={{fontSize: 14, fontWeight: 900}}>✓</span>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <p style={{ 
                  fontSize: 15, fontWeight: isSelected ? 800 : 600, 
                  color: showResult ? (opt.correct ? COLORS.correct : isSelected ? COLORS.act : COLORS.gray) : COLORS.dark,
                  lineHeight: 1.4
                }}>
                  {opt.text}
                </p>
                {showResult && opt.explanation && (
                  <p style={{ 
                    fontSize: 13, color: COLORS.gray, marginTop: 6, lineHeight: 1.4,
                    paddingTop: 6, borderTop: `1px solid ${COLORS.lightGray}50`
                  }}>
                    {opt.explanation}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback Bar */}
      {showResult && (
        <FeedbackBar
          isCorrect={isPerfect}
          xp={xp}
          explanation={feedback?.insight}
          onNext={handleDone}
          nextLabel={feedback?.next || "Lanjut →"}
        />
      )}

      {/* Action Button */}
      {!showResult && (
        <button
          onClick={checkAnswer}
          disabled={selected.size < minSelect}
          style={{
            padding: "16px 0", borderRadius: 16,
            background: selected.size >= minSelect ? COLORS.dark : COLORS.lightGray,
            color: selected.size >= minSelect ? "#fff" : COLORS.gray,
            border: "none", fontWeight: 800, fontSize: 16,
            cursor: selected.size >= minSelect ? "pointer" : "not-allowed",
            width: "100%", marginTop: 10,
            transition: "all 0.3s"
          }}
        >
          {selected.size >= minSelect ? "Cek Jawaban" : `Pilih minimal ${minSelect} opsi`}
        </button>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
