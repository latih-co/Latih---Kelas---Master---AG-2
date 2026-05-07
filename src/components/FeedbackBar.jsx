import { useState, useEffect } from "react";
import { COLORS } from "../data/courses";
import { md } from "../utils/renderMD";
import { useIsMobile } from "../utils/mobile";
import { playSound } from "../utils/sound";

export default function FeedbackBar({ isCorrect, xp, explanation, onNext, nextLabel }) {
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    playSound(isCorrect ? "correct" : "wrong");
  }, [isCorrect]);

  const handleNext = (e) => {
    e.stopPropagation();
    onNext();
  };

  const handleWhy = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const bgColor = isCorrect ? "#d4edda" : "#f8d7da";
  const textColor = isCorrect ? "#155724" : "#721c24";
  const btnColor = isCorrect ? COLORS.correct : COLORS.wrong;
  const icon = isCorrect ? "🎉" : "❌";
  const title = isCorrect ? "Tepat!" : "Kurang Tepat";

  return (
    <>
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: bgColor,
        borderTop: `2px solid ${isCorrect ? COLORS.correct : COLORS.wrong}40`,
        padding: isMobile ? "16px 20px" : "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        animation: "slideUpFeedback 0.3s ease-out"
      }}>
        <div style={{
          width: "100%",
          maxWidth: isMobile ? 480 : 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Left Side: Status & XP */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: isMobile ? 24 : 28 }}>{icon}</span>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 2 : 12 }}>
              <h3 style={{ margin: 0, fontSize: isMobile ? 18 : 20, color: textColor, fontWeight: 900 }}>{title}</h3>
              {isCorrect && xp && (
                <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.correct, display: "flex", alignItems: "center", gap: 4 }}>
                  ✨ +{xp} XP
                </span>
              )}
            </div>
          </div>

          {/* Right Side: Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {explanation && (
              <button
                onClick={handleWhy}
                style={{
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: 99,
                  fontWeight: 700,
                  color: textColor,
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(0,0,0,0.05)"}
              >
                Kenapa?
              </button>
            )}

            <button
              onClick={handleNext}
              style={{
                background: btnColor,
                border: "none",
                padding: "10px 24px",
                borderRadius: 99,
                fontWeight: 800,
                color: "#fff",
                cursor: "pointer",
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >
              {nextLabel || "Lanjut"}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUpFeedback {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />

      {/* Explanation Modal */}
      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24,
            animation: "modalFadeIn 0.2s ease-out"
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "100%", maxWidth: 480,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              animation: "modalPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
          >
            <div style={{ padding: "24px 24px 20px", borderBottom: `1px solid ${COLORS.lightGray}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 18, color: COLORS.dark }}>Penjelasan</h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", fontSize: 24, color: COLORS.gray, cursor: "pointer", padding: 0, lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: "24px" }}>
              {isCorrect ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                   <div style={{ width: 40, height: 40, borderRadius: 20, background: `${COLORS.correct}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎯</div>
                   <div>
                     <p style={{ margin: 0, fontWeight: 800, color: COLORS.correct }}>Pilihan yang Tepat</p>
                     <p style={{ margin: 0, fontSize: 13, color: COLORS.gray }}>Bagus sekali!</p>
                   </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                   <div style={{ width: 40, height: 40, borderRadius: 20, background: `${COLORS.wrong}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💡</div>
                   <div>
                     <p style={{ margin: 0, fontWeight: 800, color: COLORS.wrong }}>Mari Pelajari Kesalahannya</p>
                     <p style={{ margin: 0, fontSize: 13, color: COLORS.gray }}>Tidak apa-apa, ini bagian dari belajar.</p>
                   </div>
                </div>
              )}
              
              <div 
                style={{ fontSize: 15, color: COLORS.dark, lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: md(explanation) }}
              />
            </div>
            
            <div style={{ padding: "16px 24px 24px" }}>
              <button
                onClick={() => { setShowModal(false); onNext(); }}
                style={{
                  width: "100%", background: COLORS.dark, color: "#fff",
                  padding: 16, borderRadius: 16, border: "none",
                  fontWeight: 800, fontSize: 16, cursor: "pointer"
                }}
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
