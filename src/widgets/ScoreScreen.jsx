import React, { useEffect, useState } from "react";
import { COLORS } from "../data/lessons";
import { playSound } from "../utils/sound";
import confetti from "canvas-confetti";

export default function ScoreScreen({ score, xpInfo, feedback, onComplete, onRestart }) {
  const [ringProgress, setRingProgress] = useState(0);
  const [showIcon, setShowIcon] = useState(false);

  // Parse feedback configs
  const maxScore = feedback?.maxScore || 80;
  const correctCount = feedback?.correctCount;
  const totalCount = feedback?.totalCount;
  const takeaways = feedback?.takeaways || [];
  
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  useEffect(() => {
    // Pop icon animation
    setTimeout(() => setShowIcon(true), 100);

    // Animate ring filling up
    setTimeout(() => {
      setRingProgress(percentage);
      playSound("success");
    }, 400);

    // Confetti logic
    const isSuccess = correctCount !== undefined ? (correctCount >= 6) : (percentage >= 75);
    
    if (isSuccess) {
      const end = Date.now() + 3000;
      const colors = ['#1e3a8a', '#2DD4BF', '#D97706', '#10B981', '#EF4444'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          zIndex: 9999
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          zIndex: 9999
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [percentage, correctCount]);

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (ringProgress / 100) * circumference;

  const headerTitle = feedback?.title || "Lesson Selesai!";
  const motivation = feedback?.insight || "Kerja bagus! Terus tingkatkan pemahamanmu.";
  const nextLabel  = feedback?.next || "Selesai →";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "10px 0", position: "relative" }}>
      
      {/* Target/Trophy Icon */}
      <div style={{
        fontSize: 56, textAlign: "center",
        transform: showIcon ? "scale(1) rotate(0deg)" : "scale(0) rotate(-20deg)",
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}>
        {percentage >= 100 ? "🏆" : "🎯"}
      </div>

      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: COLORS.dark, margin: 0 }}>
          {headerTitle}
        </h2>
        <p style={{ fontSize: 15, color: COLORS.gray, lineHeight: 1.5, margin: 0, padding: "0 10px" }}>
          {motivation}
        </p>
      </div>

      {/* SVG Score Ring */}
      <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
        <div style={{ position: "relative", width: 120, height: 120 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
            {/* Background Ring */}
            <circle
              cx="60" cy="60" r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="12"
            />
            {/* Progress Ring */}
            <circle
              cx="60" cy="60" r={radius}
              fill="transparent"
              stroke="#2DD4BF"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
            />
          </svg>
          {/* Inner Text */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: COLORS.dark, lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: 13, color: COLORS.gray, fontWeight: "bold" }}>XP</span>
          </div>
        </div>
      </div>

      {/* Correct Answers Count */}
      {correctCount !== undefined && totalCount !== undefined && (
        <div style={{ textAlign: "center", fontSize: 15, fontWeight: 600, color: COLORS.dark }}>
          Jawaban benar: <span style={{ color: "#0F766E", fontSize: 18 }}>{correctCount}</span> / {totalCount}
        </div>
      )}

      {/* Key Takeaways Box */}
      {takeaways.length > 0 && (
        <div style={{
          background: "#F8FAFC", border: "1px solid #E2E8F0",
          borderRadius: 20, padding: "20px 16px",
          display: "flex", flexDirection: "column", gap: 12,
          marginTop: 8
        }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: COLORS.gray, letterSpacing: 1, textTransform: "uppercase" }}>
            Yang sudah dipelajari
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {takeaways.map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ color: "#2DD4BF", fontSize: 18, lineHeight: 1 }}>•</div>
                <div style={{ color: "#334155", fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 12 }}>
        {onRestart && (
          <button
            onClick={onRestart}
            style={{
              flex: 1, padding: "14px 0", borderRadius: 16,
              background: "transparent", color: COLORS.gray,
              border: `2px solid #E2E8F0`, fontWeight: 800, fontSize: 14,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: 16 }}>🔄</span> Ulangi
          </button>
        )}

        <button
          onClick={onComplete}
          style={{
            flex: onRestart ? 1 : undefined,
            width: !onRestart ? "100%" : undefined,
            padding: "16px 0", borderRadius: 16,
            background: "#2DD4BF", color: "#0F172A",
            border: "none", fontWeight: 800, fontSize: 16,
            cursor: "pointer",
            boxShadow: `0 4px 14px rgba(45, 212, 191, 0.3)`,
            transition: "transform 0.1s"
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {nextLabel}
        </button>
      </div>

    </div>
  );
}
