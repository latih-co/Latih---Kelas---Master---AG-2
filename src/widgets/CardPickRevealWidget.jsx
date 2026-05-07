import { useState } from "react";
import { COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// Pick cards to reveal details
export default function CardPickRevealWidget({ instruction, items, feedback, xp, onComplete, setScore }) {
  const [opened, setOpened] = useState(new Set());
  const [showNext, setShowNext] = useState(false);
  const isMobile = useIsMobile();

  const handlePick = (id) => {
    playSound("click");
    const next = new Set([...opened, id]);
    setOpened(next);
    
    if (next.size === items.length) {
      setScore(s => s + xp);
      setShowNext(true);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {instruction && (
        <p style={{ color: COLORS.gray, fontSize: 16, lineHeight: 1.5, marginBottom: 8 }}>
          {instruction}
        </p>
      )}

      {/* Cards Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isMobile ? "1fr" : `repeat(${items.length}, 1fr)`, 
        gap: 16 
      }}>
        {items.map(item => {
          const isOpened = opened.has(item.id);
          
          return (
            <div
              key={item.id}
              onClick={() => !isOpened && handlePick(item.id)}
              style={{
                background: isOpened ? `${item.color || COLORS.act}08` : "#fff",
                border: `2px solid ${isOpened ? (item.color || COLORS.act) : COLORS.lightGray}`,
                borderRadius: 20,
                padding: "24px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: isOpened ? "default" : "pointer",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isOpened ? "scale(1)" : "scale(1)",
                boxShadow: isOpened ? "none" : "0 4px 12px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden",
                minHeight: 180, // Ensure consistent height
                justifyContent: "center"
              }}
              onMouseEnter={e => {
                if(!isOpened) e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                if(!isOpened) e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Check Mark when opened */}
              {isOpened && (
                 <div style={{
                   position: "absolute", top: 12, right: 12,
                   background: item.color || COLORS.act, color: "#fff",
                   width: 24, height: 24, borderRadius: "50%",
                   display: "flex", alignItems: "center", justifyContent: "center",
                   fontSize: 12, fontWeight: 900,
                   animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                 }}>✓</div>
              )}

              {/* Icon Container (always visible but smaller when opened) */}
              <div style={{
                width: isOpened ? 48 : 72, 
                height: isOpened ? 48 : 72,
                borderRadius: "50%",
                background: item.color || COLORS.act,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isOpened ? 24 : 36,
                marginBottom: 16,
                transition: "all 0.3s ease",
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Label */}
              <h3 style={{
                fontSize: 16, 
                fontWeight: 900, 
                color: isOpened ? (item.color || COLORS.act) : COLORS.dark,
                margin: 0,
                marginBottom: isOpened ? 12 : 0,
                transition: "all 0.3s ease"
              }}>
                {item.label}
              </h3>

              {/* Revealed Content */}
              {isOpened && (
                <div style={{
                  animation: "fadeInUp 0.4s ease forwards",
                  opacity: 0,
                  transform: "translateY(10px)",
                  borderTop: `1.5px solid ${(item.color || COLORS.act)}30`,
                  paddingTop: 12,
                  marginTop: "auto"
                }}>
                  <p style={{
                    fontSize: 14,
                    color: COLORS.dark,
                    lineHeight: 1.5,
                    margin: 0,
                    fontWeight: 500
                  }}>
                    {item.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Progress or Next Button */}
      {showNext ? (
         <FeedbackBar
           isCorrect={true}
           xp={xp}
           explanation={feedback?.insight}
           onNext={() => onComplete()}
           nextLabel={feedback?.next || "Lanjut"}
         />
      ) : (
         <div style={{
           textAlign: "center",
           padding: "16px 0",
           color: COLORS.gray,
           fontWeight: 600,
           fontSize: 14,
           background: COLORS.lightGray + "50",
           borderRadius: 16
         }}>
           Buka {items.length - opened.size} kartu tersisa untuk melanjutkan
         </div>
      )}
    </div>
  );
}
