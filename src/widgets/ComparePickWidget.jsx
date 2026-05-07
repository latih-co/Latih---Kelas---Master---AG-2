import { useState } from "react";
import { COLORS } from "../data/courses";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

// Slide 1: Both products can be "quality" — cognitive conflict builder
export default function ComparePickWidget({ scenario, instruction, products, reveal, feedback, xp, onComplete, setScore }) {
  const [picked,    setPicked]    = useState(null);
  const [showReveal, setShowReveal] = useState(false);

  const handlePick = (id) => {
    if (picked) return;
    playSound("click");
    setPicked(id);
    setScore(s => s + xp);
    setTimeout(() => setShowReveal(true), 600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Context Area (if provided) */}
      {scenario?.htmlContext && (
        <div style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: scenario.htmlContext }} />
      )}

      {/* Scenario Header Block */}
      {scenario ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              background: COLORS.dark, color: "#fff",
              width: 32, height: 32, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "bold", fontSize: 16
            }}>
              {scenario.icon || "💡"}
            </div>
            <p style={{ color: COLORS.gray, fontSize: 14, fontWeight: 500, margin: 0 }}>
              {scenario.label || "Tap untuk pilih"}
            </p>
          </div>
          <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 18, lineHeight: 1.4 }}>
            {scenario.text}
          </h3>
        </div>
      ) : instruction ? (
        <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>
          {instruction.split("**").map((p, i) =>
            i % 2 === 1 ? <strong key={i} style={{ color: COLORS.dark }}>{p}</strong> : p
          )}
        </p>
      ) : null}

      {/* Products side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {products.map(prod => {
          const isPicked = picked === prod.id;
          const isOther  = picked && picked !== prod.id;

          return (
            <div
              key={prod.id}
              onClick={() => handlePick(prod.id)}
              style={{
                borderRadius: 20, overflow: "hidden",
                border: `2.5px solid ${isPicked ? prod.color : showReveal ? prod.color + "50" : COLORS.lightGray}`,
                background: isPicked ? `${prod.color}10` : "#fff",
                cursor: picked ? "default" : "pointer",
                transition: "all 0.35s",
                transform: isPicked ? "scale(1.03)" : "scale(1)",
                boxShadow: isPicked ? `0 6px 24px ${prod.color}25` : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Product thumbnail */}
              <div style={{
                height: 120,
                background: `linear-gradient(135deg, ${prod.color}20, ${prod.color}08)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 52, position: "relative",
              }}>
                {prod.emoji}
                {isPicked && (
                  <div style={{
                    position: "absolute", top: 8, right: 8,
                    background: prod.color, color: "#fff",
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 900,
                  }}>✓</div>
                )}
              </div>

              {/* Product info */}
              <div style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.dark, marginBottom: 4 }}>
                  {prod.label}
                </p>
                <p style={{
                  fontSize: 16, fontWeight: 900,
                  color: prod.color, marginBottom: 6,
                }}>
                  {prod.price}
                </p>
                <p style={{ fontSize: 11, color: COLORS.gray, lineHeight: 1.4 }}>
                  {prod.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reveal / FeedbackBar */}
      {showReveal ? (() => {
        const selectedProduct = products.find(p => p.id === picked);
        // Handle correctness based on new explicit flag or legacy color flag
        const isAnswerCorrect = selectedProduct?.correct !== undefined 
            ? selectedProduct.correct 
            : selectedProduct?.color === COLORS.correct;
        
        // Dynamic explanation per card or fallback to legacy reveal object
        const expl = selectedProduct?.feedback 
            || (reveal ? `**${reveal.headline || ''}**\n\n${reveal.body || ''}` : "Terima kasih atas respons Anda.");
        
        return (
          <FeedbackBar
            isCorrect={isAnswerCorrect}
            xp={isAnswerCorrect ? xp : 0}
            explanation={expl}
            onNext={onComplete}
            nextLabel={feedback?.next || 'Lanjut'}
          />
        );
      })() : (
        <button className="action-btn"
          disabled={true}
          style={{
            padding: "14px 0", borderRadius: 14,
            background: COLORS.lightGray,
            color: COLORS.gray,
            border: "none", fontWeight: 800, fontSize: 16,
            cursor: "not-allowed",
            width: "100%",
          }}
        >
          {picked ? "⏳" : "Pilih salah satu"}
        </button>
      )}
    </div>
  );
}
