import { useState } from "react";
import { COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// Explorer widget — tap category nodes to reveal items and details 
export default function ExplorerWidget({ instruction, categories, feedback, xp, onComplete, setScore }) {
  const [activeCat, setActiveCat] = useState(null);
  const [opened, setOpened]       = useState(new Set());
  const isMobile = useIsMobile();

  const handleTap = (id) => {
    playSound("click");
    setActiveCat(prev => prev === id ? null : id);
    setOpened(prev => new Set([...prev, id]));
  };

  const allOpened = categories.every(c => opened.has(c.id));

  const handleDone = () => {
    setScore(s => s + xp);
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p 
        style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }} 
        dangerouslySetInnerHTML={{
          __html: instruction
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\*(.*?)\*/g, '<i>$1</i>')
            .replace(/\n/g, '<br/>')
        }} 
      />

      {/* Circular/Grid Categories */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : `repeat(${categories.length}, 1fr)`,
        gap: 12,
      }}>
        {categories.map(cat => {
          const isOpened = opened.has(cat.id);
          const isActive = activeCat === cat.id;

          return (
             <div
               key={cat.id}
               onClick={() => handleTap(cat.id)}
               style={{
                 borderRadius: 20,
                 border: `2px solid ${isActive ? cat.color : isOpened ? `${cat.color}50` : COLORS.lightGray}`,
                 background: isActive ? `${cat.color}15` : isOpened ? `${cat.color}05` : "#fff",
                 padding: "16px 12px",
                 display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                 cursor: "pointer", transition: "all 0.3s",
                 boxShadow: isActive ? `0 6px 16px ${cat.color}30` : "0 2px 6px rgba(0,0,0,0.04)",
                 transform: isActive ? "scale(1.02)" : "scale(1)",
               }}
             >
               <div style={{
                 width: 56, height: 56, borderRadius: "50%",
                 background: isOpened ? cat.color : COLORS.lightGray, color: "#fff",
                 display: "flex", alignItems: "center", justifyContent: "center",
                 fontSize: 28, position: "relative"
               }}>
                 {isOpened ? cat.icon : <span style={{ fontSize: 20 }}>?</span>}
                 {isOpened && !isActive && (
                   <div style={{
                     position: "absolute", top: -2, right: -2,
                     width: 18, height: 18, borderRadius: "50%",
                     background: COLORS.dark, border: "2px solid #fff",
                     display: "flex", alignItems: "center", justifyContent: "center",
                     fontSize: 10, fontWeight: 900
                   }}>✓</div>
                 )}
               </div>
               <p style={{
                 fontSize: 13, fontWeight: 800, textAlign: "center",
                 color: isOpened ? cat.color : COLORS.gray, lineHeight: 1.3
               }}>
                 {isOpened ? cat.label : "Kategori Tersembunyi"}
               </p>
             </div>
          );
        })}
      </div>

      {/* Explorer Detail Panel */}
      {activeCat && (() => {
        const cat = categories.find(c => c.id === activeCat);
        return (
          <div style={{
            background: `${cat.color}08`,
            border: `2px solid ${cat.color}30`,
            borderRadius: 20, padding: "20px 20px",
            animation: "slideUp 0.3s ease-out",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
               <div style={{
                 background: cat.color, color: "#fff", width: 48, height: 48,
                 borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                 fontSize: 24, flexShrink: 0
               }}>{cat.icon}</div>
               <div>
                 <p style={{ fontSize: 11, fontWeight: 800, color: cat.color, textTransform: "uppercase", letterSpacing: 1 }}>
                   Kategori
                 </p>
                 <p style={{ fontSize: 18, fontWeight: 900, color: COLORS.dark }}>{cat.label}</p>
               </div>
            </div>

            <p 
              style={{ fontSize: 14, color: COLORS.dark, lineHeight: 1.6, marginBottom: 16 }}
              dangerouslySetInnerHTML={{
                __html: cat.desc
                  .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                  .replace(/\*(.*?)\*/g, '<i>$1</i>')
                  .replace(/\n/g, '<br/>')
              }}
            />

            {/* Examples List */}
            {cat.examples && cat.examples.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 14, padding: "14px", border: `1px solid ${cat.color}20` }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
                  Contoh:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cat.examples.map((ex, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{ex.icon}</span>
                      <span style={{ fontSize: 13, color: COLORS.dark, fontWeight: 500 }}>{ex.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      <button className="action-btn"
        onClick={allOpened ? handleDone : undefined}
        disabled={!allOpened}
        style={{
          padding: "16px 0", borderRadius: 16,
          background: allOpened ? COLORS.dark : COLORS.lightGray,
          color: allOpened ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: allOpened ? "pointer" : "not-allowed", width: "100%",
          marginTop: 10, transition: "background 0.3s"
        }}
      >
        {allOpened ? feedback.next : `Eksplorasi ${categories.length - opened.size} kategori lagi`}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
