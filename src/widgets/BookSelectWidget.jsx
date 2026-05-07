import React, { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function BookSelectWidget({ 
  scenario, 
  books, 
  xp, 
  feedbackCorrect, 
  feedbackWrong, 
  nextLabel, 
  onComplete, 
  setScore 
}) {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Maximum number of books that should be selected (based on true answers in data)
  const maxSelectable = books.filter(b => b.correct).length;

  // Reset state when books change
  useEffect(() => {
    setSelectedBooks([]);
    setChecked(false);
    setIsCorrect(false);
  }, [books]);

  const handleToggleBook = (id) => {
    if (checked) return;
    
    setSelectedBooks(prev => {
      let newSelection;
      if (prev.includes(id)) {
        newSelection = prev.filter(bId => bId !== id);
        playSound("click");
      } else {
        newSelection = [...prev, id];
        playSound("click");
      }
      return newSelection;
    });
  };

  const checkAnswers = (currentSelection) => {
    playSound("click");
    setChecked(true);
    
    // Check if selected matches correct exactly
    const correctIds = books.filter(b => b.correct).map(b => b.id);
    const allCorrect = currentSelection.length === correctIds.length && 
                       currentSelection.every(id => correctIds.includes(id));
                       
    setIsCorrect(allCorrect);
    
    if (allCorrect) {
      setScore(s => s + xp);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header/Question */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: COLORS.dark, color: "#fff",
            width: 32, height: 32, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold", fontSize: 16
          }}>
            {scenario.icon || "1"}
          </div>
          <p style={{ color: COLORS.gray, fontSize: 14, fontWeight: 500, margin: 0 }}>
            {scenario.label || "Tap untuk pilih"}
          </p>
        </div>
        <h3 style={{ margin: 0, color: COLORS.dark, fontSize: 18, lineHeight: 1.4 }}>
          {scenario.text}
        </h3>
      </div>

      {/* Bookshelf Area */}
      <div>
        <div style={{
          background: "linear-gradient(to bottom, #1a1e36 0%, #0d1123 100%)",
          borderRadius: "16px 16px 0 0",
          padding: "40px 16px 0 16px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 12,
          minHeight: 180,
          perspective: 1000
        }}>
          {/* Subtle light effect from bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: "20%", right: "20%",
            height: 80, background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.1) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          {/* Books */}
          {books.map(book => {
            const isSelected = selectedBooks.includes(book.id);
            const isCheckedCorrect = checked && book.correct && isSelected;
            const isCheckedWrong = checked && !book.correct && isSelected;
            const isCheckedMissed = checked && book.correct && !isSelected; // Should have been chosen
            
            // Interaction States
            let transform = "translateY(0)";
            let shadow = "none";
            let opacity = 1;
            let filter = "none";
            let border = "2px solid transparent";

            if (!checked) {
              if (isSelected) {
                transform = "translateY(-14px)";
                shadow = "0 10px 15px -3px rgba(0,0,0,0.5)";
              }
            } else {
              // Revealed
              if (isSelected) {
                if (book.correct) {
                  transform = "translateY(-16px)";
                  shadow = "0 0 20px rgba(45, 212, 191, 0.4)";
                  border = "2px solid #2DD4BF"; // Teal glow
                } else {
                  transform = "translateY(0)";
                  filter = "grayscale(75%)";
                  opacity = 0.4;
                }
              } else {
                if (book.correct) {
                  // Missed correct answer -> highlight slightly to show it was correct
                  transform = "translateY(-4px)";
                  border = "2px dashed #2DD4BF";
                } else {
                  filter = "grayscale(75%)";
                  opacity = 0.4;
                }
              }
            }

            return (
              <div 
                key={book.id}
                onClick={() => handleToggleBook(book.id)}
                style={{
                  width: book.width || 50,
                  height: book.height || 80,
                  background: book.gradient,
                  borderRadius: "4px 6px 6px 4px",
                  position: "relative",
                  transform,
                  boxShadow: shadow,
                  opacity,
                  filter,
                  border,
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  cursor: checked ? "default" : "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  color: "rgba(255,255,255,0.9)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  fontFamily: "monospace",
                  letterSpacing: 2,
                  zIndex: isSelected ? 10 : 1
                }}
                className={!checked ? "hover-up-book" : ""}
              >
                {/* Book styling */}
                <div style={{ position: "absolute", left: 4, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.2)" }} />
                
                {/* Badge for correct confirm */}
                {isCheckedCorrect && (
                  <div style={{
                    position: "absolute", top: -10, right: -10,
                    width: 20, height: 20, borderRadius: 10,
                    background: "#2DD4BF", color: "#1a1e36",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: "bold",
                    writingMode: "horizontal-tb",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}>
                    ✓
                  </div>
                )}
                {isCheckedMissed && (
                  <div style={{
                    position: "absolute", top: -10, right: -10,
                    width: 20, height: 20, borderRadius: 10,
                    background: "transparent", border: "2px dashed #2DD4BF", color: "#2DD4BF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: "bold",
                    writingMode: "horizontal-tb"
                  }}>
                    ✓
                  </div>
                )}

                <span style={{ fontSize: 10, fontWeight: "bold", opacity: 0.7 }}>{book.labelTop}</span>
                <span style={{ fontSize: 14, fontWeight: "bold" }}>{book.labelBottom}</span>
              </div>
            );
          })}
        </div>
        
        {/* Wooden shelf base */}
        <div style={{
          height: 16,
          background: "linear-gradient(to right, #5c3a21 0%, #8b5a33 50%, #5c3a21 100%)",
          borderTop: "2px solid #a67c52",
          borderBottom: "4px solid #3d2616",
          borderRadius: "0 0 16px 16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }} />

        {/* Footer Counter */}
        <div style={{
          background: "#F1F5F9",
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: "12px 16px",
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontSize: 13, color: COLORS.gray, fontWeight: 500 }}>
            Membutuhkan {maxSelectable} pilihan
          </span>
          <div style={{
            background: selectedBooks.length === maxSelectable ? "#E0E7FF" : "#F1F5F9",
            color: selectedBooks.length === maxSelectable ? "#4338CA" : "#64748B",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: "bold",
            border: `1px solid ${selectedBooks.length === maxSelectable ? "#A5B4FC" : "#CBD5E1"}`
          }}>
            {selectedBooks.length} dipilih
          </div>
        </div>
      </div>

      {/* Global CSS for book hover effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-up-book:hover {
          transform: translateY(-10px) !important;
          filter: brightness(1.1) !important;
        }
      `}} />

      {/* Check Button */}
      {!checked && selectedBooks.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            className="action-btn"
            onClick={() => checkAnswers(selectedBooks)}
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
            explanation={isCorrect ? feedbackCorrect : feedbackWrong}
            onNext={onComplete}
            nextLabel={nextLabel || "Lanjut →"}
            delayAction={500}
          />
        </div>
      )}
    </div>
  );
}
