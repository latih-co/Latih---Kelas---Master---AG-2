import { useState, useEffect } from "react";
import { COLORS } from "../data/courses";
import { playSound } from "../utils/sound";

// Drag and drop / Tap to sort widget
export default function DragCategoryWidget({ instruction, categories, items, insight, feedback, xp, onComplete, setScore }) {
  const [sorted, setSorted] = useState({});
  const [activeItem, setActiveItem] = useState(0);
  const [showInsight, setShowInsight] = useState(false);

  // For touch devices, we'll use a tap-to-select approach rather than true drag-and-drop
  // as it's more reliable across different mobile browsers
  
  const currentItem = items[activeItem];
  const isFinished = activeItem >= items.length;

  useEffect(() => {
    if (isFinished) {
      setTimeout(() => setShowInsight(true), 500);
    }
  }, [isFinished]);

  const handleSort = (categoryId) => {
    if (isFinished) return;
    playSound("click");

    const isCorrect = currentItem.targets.includes(categoryId);
    
    setSorted(prev => ({
      ...prev,
      [currentItem.id]: {
        categoryId,
        isCorrect
      }
    }));

    if (isCorrect) {
      setScore(s => s + Math.floor(xp / items.length));
    }

    setActiveItem(a => a + 1);
  };

  const handleDone = () => {
    onComplete();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.6 }}>{instruction}</p>

      {/* Categories Zone */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: 10 }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleSort(cat.id)}
            disabled={isFinished}
            style={{
              padding: "16px 8px",
              borderRadius: 16,
              background: `${cat.color}15`,
              border: `2px dashed ${cat.color}40`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              cursor: isFinished ? "default" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 28 }}>{cat.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: cat.color, textAlign: "center" }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Current Item to Sort */}
      {!isFinished && currentItem && (
        <div style={{
          background: "#fff",
          border: `2px solid ${COLORS.dark}`,
          borderRadius: 20,
          padding: "24px 20px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          boxShadow: `0 8px 24px rgba(0,0,0,0.12)`,
          transform: "translateY(-10px)",
          margin: "10px 0",
          animation: "slideIn 0.3s ease-out",
        }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: COLORS.gray, textTransform: "uppercase", letterSpacing: 1 }}>
            Ketuk Kategori Di Atas ⬆️
          </p>
          <span style={{ fontSize: 48 }}>{currentItem.icon}</span>
          <p style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: COLORS.dark }}>
            {currentItem.label}
          </p>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {items.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: i === activeItem ? COLORS.dark : i < activeItem ? COLORS.lightGray : "#eee"
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Sorted Results History */}
      {activeItem > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, paddingBottom: 4, borderBottom: `1px solid ${COLORS.lightGray}` }}>
            Riwayat Klasifikasi
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 180, overflowY: "auto", paddingRight: 4 }}>
            {items.slice(0, activeItem).map(item => {
              const sortData = sorted[item.id];
              if (!sortData) return null;
              
              const cat = categories.find(c => c.id === sortData.categoryId);
              
              return (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: sortData.isCorrect ? `${COLORS.correct}10` : `${COLORS.act}10`,
                  padding: "10px 12px", borderRadius: 12,
                }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, color: COLORS.dark, lineHeight: 1.3 }}>{item.label}</p>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: "#fff", padding: "4px 8px", borderRadius: 8,
                    border: `1px solid ${sortData.isCorrect ? COLORS.correct : COLORS.act}30`
                  }}>
                    <span style={{ fontSize: 12 }}>{cat?.icon}</span>
                    <span style={{ fontSize: 12 }}>{sortData.isCorrect ? "✅" : "❌"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Insight Panel */}
      {showInsight && (
        <div style={{
          background: `${COLORS.plan}08`, border: `2px solid ${COLORS.plan}30`,
          borderRadius: 18, padding: "16px 18px",
          display: "flex", gap: 12, alignItems: "flex-start",
          animation: "fadeIn 0.5s",
        }}>
          <span style={{ fontSize: 28, flexShrink: 0 }}>💡</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: COLORS.dark, marginBottom: 6 }}>
              Kesimpulan
            </p>
            <p style={{ fontSize: 13, color: COLORS.gray, lineHeight: 1.6 }}>
              {insight}
            </p>
          </div>
        </div>
      )}

      <button className="action-btn"
        onClick={showInsight ? handleDone : undefined}
        disabled={!showInsight}
        style={{
          padding: "14px 0", borderRadius: 14,
          background: showInsight ? COLORS.dark : COLORS.lightGray,
          color: showInsight ? "#fff" : COLORS.gray,
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: showInsight ? "pointer" : "not-allowed", width: "100%",
          marginTop: 10
        }}
      >
        {showInsight ? feedback.next : isFinished ? "Menyiapkan kesimpulan..." : `Selesaikan ${items.length - activeItem} item lagi`}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );
}
