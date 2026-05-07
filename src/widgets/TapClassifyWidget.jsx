import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { playSound } from "../utils/sound";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";

export default function TapClassifyWidget({ 
  scenario, 
  instruction, 
  cards = [], 
  zones = [], 
  feedbackCorrect, 
  feedbackWrong,
  onComplete,
  xp = 40
}) {
  const [pool, setPool] = useState(cards.map(c => c.id));
  const [placements, setPlacements] = useState({}); // { cardId: zoneId }
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shakeCards, setShakeCards] = useState([]);

  // Default color themes if not provided
  const zoneColors = {
    "org": { main: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" }, // Navy / Blue
    "pihak": { main: "#0F766E", bg: "#F0FDFA", border: "#99F6E4" }, // Teal
    "top": { main: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" }, // Navy
    "bukan": { main: "#64748B", bg: "#F8FAFC", border: "#E2E8F0" }, // Slate
    "sistem": { main: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" }, // Navy
    "proses": { main: "#0F766E", bg: "#F0FDFA", border: "#99F6E4" }, // Teal
    "prosedur": { main: "#D97706", bg: "#FFFBEB", border: "#FDE68A" }, // Amber
    "input": { main: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" }, // Navy
    "aktivitas": { main: "#0F766E", bg: "#F0FDFA", border: "#99F6E4" }, // Teal
    "output": { main: "#D97706", bg: "#FFFBEB", border: "#FDE68A" }, // Amber
    "fungsi": { main: "#1E3A8A", bg: "#EFF6FF", border: "#BFDBFE" }, // Navy / Blue
    "departemen": { main: "#B45309", bg: "#FEF3C7", border: "#FDE68A" }, // Amber
    "realtime": { main: "#166534", bg: "#F0FDF4", border: "#BBF7D0" }, // Green
    "accelerated": { main: "#C2410C", bg: "#FFF7ED", border: "#FFEDD5" }, // Orange
    "suhu": { main: "#DC2626", bg: "#FEF2F2", border: "#FECACA" }, // Red
    "kelembapan": { main: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" }, // Blue
    "cahaya": { main: "#D97706", bg: "#FFFBEB", border: "#FDE68A" }, // Amber
    "kemasan": { main: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" }, // Purple
    "bukanFaktor": { main: "#64748B", bg: "#F8FAFC", border: "#E2E8F0" } // Slate/Abu
  };

  const handleCardTapInPool = (cardId) => {
    if (isRevealed) return;
    playSound("pop");
    setSelectedCardId(prev => prev === cardId ? null : cardId);
  };

  const handleZoneTap = (zoneId) => {
    if (isRevealed) return;
    if (selectedCardId) {
      playSound("pop");
      setPlacements(prev => ({ ...prev, [selectedCardId]: zoneId }));
      setPool(prev => prev.filter(id => id !== selectedCardId));
      setSelectedCardId(null);
    }
  };

  const handleCardTapInZone = (cardId) => {
    if (isRevealed) return;
    playSound("pop");
    // Move back to pool
    const newPlacements = { ...placements };
    delete newPlacements[cardId];
    setPlacements(newPlacements);
    setPool(prev => [...prev, cardId]);
  };

  const handleCheck = () => {
    if (pool.length > 0 || isRevealed) return;
    
    let allCorrect = true;
    const wrongIds = [];
    
    cards.forEach(c => {
      if (placements[c.id] !== c.targetZone) {
        allCorrect = false;
        wrongIds.push(c.id);
      }
    });

    setIsRevealed(true);
    setIsCorrect(allCorrect);
    
    if (allCorrect) {
      playSound("correct");
      // Meneruskan onComplete akan dilakukan melalui komponen FeedbackBar
    } else {
      playSound("wrong");
      setShakeCards(wrongIds);
      setTimeout(() => setShakeCards([]), 600); // Remove shake class after 600ms
    }
  };

  const handleRetry = () => {
    setIsRevealed(false);
    setIsCorrect(false);
    // Put wrong cards back to pool
    const wrongIds = cards.filter(c => placements[c.id] !== c.targetZone).map(c => c.id);
    const newPlacements = { ...placements };
    wrongIds.forEach(id => delete newPlacements[id]);
    
    setPlacements(newPlacements);
    setPool(prev => [...prev, ...wrongIds]);
  };

  // Styles
  const cardStyle = (cardId, isPool = true, parentZoneId = null) => {
    const isSelected = selectedCardId === cardId;
    const isShake = shakeCards.includes(cardId);
    
    let bg = "#FFFFFF";
    let border = "1px solid #E2E8F0";
    let transform = "scale(1)";
    let zIndex = 1;
    let textColor = "#0F172A";

    if (isPool && isSelected) {
      bg = "#FEF3C7"; // Amber lightest
      border = "2px solid #D97706"; // Amber main
      transform = "scale(1.05)";
      zIndex = 10;
    } else if (!isPool && parentZoneId) {
      const zColor = zoneColors[parentZoneId] || zoneColors.org;
      bg = zColor.bg; // Even lighter than zone
      border = `1px solid ${zColor.main}`;
    }

    // Reveal states
    let badge = null;
    if (isRevealed && !isPool) {
      const cardData = cards.find(c => c.id === cardId);
      const isCardCorrect = placements[cardId] === cardData.targetZone;
      
      if (isCardCorrect) {
        bg = "#DCFCE7";
        border = "2px solid #22C55E";
        badge = <div style={{position: 'absolute', top: -6, right: -6, background: '#22C55E', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CheckCircle2 size={12} /></div>;
      } else {
        bg = "#FEE2E2";
        border = "2px solid #EF4444";
        badge = <div style={{position: 'absolute', top: -6, right: -6, background: '#EF4444', color: 'white', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><XCircle size={12} /></div>;
      }
    }

    return {
      position: "relative",
      background: bg,
      border: border,
      borderRadius: "8px",
      padding: "8px 10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: (isPool && !isSelected) ? "0 1px 3px rgba(0,0,0,0.1)" : (isSelected ? "0 4px 12px rgba(217, 119, 6, 0.2)" : "none"),
      cursor: isRevealed ? "default" : "pointer",
      transform: transform,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: zIndex,
      animation: isShake ? "shake 0.5s cubic-bezier(.36,.07,.19,.97) both" : "none",
      color: textColor,
    };
  };

  return (
    <div className="tap-classify-widget" style={{ paddingBottom: "24px" }}>
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .classify-pool {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (min-width: 640px) {
          .classify-pool {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      
      {/* Header / Context */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{
            background: "#0F766E",
            color: "white",
            width: "32px", height: "32px",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold",
            paddingTop: "2px"
          }}>
            {scenario?.icon || "📝"}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#0F766E" }}>
              {scenario?.label || "Tap & Tempatkan"}
            </div>
          </div>
        </div>

        {scenario?.text && (
          <div style={{ fontSize: "15px", color: "#334155", fontWeight: "500", marginBottom: "12px" }}>
            {scenario.text}
          </div>
        )}

        {scenario?.htmlContext && (
          <div dangerouslySetInnerHTML={{ __html: scenario.htmlContext }} />
        )}
      </div>

      {/* Instruction */}
      {!isRevealed && (
        <div style={{ 
          background: "#F8FAFC", border: "1px dashed #CBD5E1", borderRadius: "8px", 
          padding: "10px 12px", fontSize: "12px", color: "#475569", 
          marginBottom: "16px", display: "flex", gap: "8px", alignItems: "flex-start"
        }}>
          💡 <span>{instruction || "Tap satu kartu untuk memilihnya (berpendar amber), lalu tap zona tujuannya. Tap kartu di zona untuk membatalkan."}</span>
        </div>
      )}

      {/* Card Pool */}
      {pool.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", fontWeight: "bold", color: "#64748B", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Tersedia ({pool.length})
          </div>
          <div className="classify-pool">
            {pool.map(id => {
              const cardData = cards.find(c => c.id === id);
              return (
                <div 
                  key={id} 
                  style={cardStyle(id, true)} 
                  onClick={() => handleCardTapInPool(id)}
                >
                  <div style={{ fontSize: "20px" }}>{cardData.icon}</div>
                  <div style={{ fontSize: "12px", fontWeight: "600", lineHeight: "1.3" }}>{cardData.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Zones */}
      <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
        {zones.map((zone) => {
          const zColor = zoneColors[zone.id] || zoneColors.org;
          const zoneCards = cards.filter(c => placements[c.id] === zone.id);
          const isTargeted = selectedCardId !== null;

          return (
            <div 
              key={zone.id}
              onClick={() => handleZoneTap(zone.id)}
              style={{
                background: zColor.bg,
                border: `2px dashed ${isTargeted ? zColor.main : zColor.border}`,
                borderRadius: "12px",
                padding: "16px",
                minHeight: "120px",
                cursor: (isTargeted && !isRevealed) ? "pointer" : "default",
                transition: "all 0.2s ease",
                opacity: (isRevealed && isCorrect) ? 0.8 : 1,
                boxShadow: (isTargeted && !isRevealed) ? `0 0 0 2px ${zColor.bg}, 0 0 0 4px ${zColor.main}33` : "none"
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "12px" }}>
                <div style={{ color: zColor.main, fontWeight: "900", fontSize: "14px", letterSpacing: "0.5px" }}>{zone.label}</div>
                <div style={{ color: zColor.main, opacity: 0.7, fontSize: "11px" }}>{zone.subLabel}</div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {zoneCards.length === 0 ? (
                  <div style={{ textAlign: "center", color: zColor.main, opacity: 0.5, fontSize: "12px", padding: "16px 0", fontStyle: "italic" }}>
                    {isTargeted ? "Tap di sini untuk menaruh" : "Kosong"}
                  </div>
                ) : (
                  zoneCards.map(c => (
                    <div 
                      key={c.id} 
                      style={cardStyle(c.id, false, zone.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardTapInZone(c.id);
                      }}
                    >
                      <div style={{ fontSize: "20px" }}>{c.icon}</div>
                      <div style={{ fontSize: "12px", fontWeight: "600", lineHeight: "1.3" }}>{c.text}</div>
                      {cardStyle(c.id, false, zone.id).badge}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Feedback Area */}
      <div style={{ marginTop: "24px" }}>
        {pool.length === 0 && !isRevealed && (
          <button 
            onClick={handleCheck}
            style={{
              width: "100%", background: "#0F766E", color: "white",
              padding: "16px", borderRadius: "12px", fontWeight: "bold", fontSize: "16px",
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px"
            }}
          >
            Cek Jawaban
          </button>
        )}

        {isRevealed && (
          <div style={{ animation: "slideUp 0.3s ease-out" }}>
            <FeedbackBar
              isCorrect={isCorrect}
              xp={isCorrect ? xp : 0}
              explanation={isCorrect ? feedbackCorrect : feedbackWrong}
              onNext={() => {
                if (isCorrect) {
                  if (onComplete) onComplete(true, xp);
                } else {
                  handleRetry();
                }
              }}
              nextLabel={isCorrect ? "Lanjut →" : "Coba Ulangi"}
              delayAction={200}
            />
          </div>
        )}
      </div>
      
      {/* Cek Button overlay for empty pool is handled inline above */}
    </div>
  );
}
