import { useState, useEffect } from "react";
import { COLORS } from "../data/lessons";
import { md } from "../utils/renderMD";
import FeedbackBar from "../components/FeedbackBar";
import { playSound } from "../utils/sound";

export default function MCQWidget({ title, scenario, options, xp, explanation, nextLabel, onComplete, setScore }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  // Reset state when the question changes (to prevent leaked state on same widget ref)
  useEffect(() => {
    setSelected(null);
    setChecked(false);
  }, [options, scenario]);

  const handleCheck = () => {
    setChecked(true);
    const opt = options.find(o => o.id === selected);
    if (opt?.correct) setScore(s => s + xp);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>


        {/* Scenario card */}
        {scenario && (
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2D3250 100%)`,
            borderRadius: 16, padding: "20px 18px",
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: `${scenario.warnColor || COLORS.wrong}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
            }}>
              {scenario.icon}
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{scenario.label}</p>
              <p
                style={{ color: "#CBD0E8", fontSize: 14, lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: md(scenario.text) }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map(opt => {
          let bg = "#fff", border = `2px solid ${COLORS.lightGray}`, textColor = COLORS.dark;
          
          const isSelected = selected === opt.id;
          if (isSelected && !checked) { bg = `${COLORS.plan}10`; border = `2px solid ${COLORS.plan}`; }
          if (checked && opt.correct) { bg = `${COLORS.correct}15`; border = `2px solid ${COLORS.correct}`; textColor = COLORS.correct; }
          if (checked && isSelected && !opt.correct) { bg = `${COLORS.wrong}10`; border = `2px solid ${COLORS.wrong}`; textColor = COLORS.wrong; }

          return (
            <div
              key={opt.id}
              onClick={() => {
                if (!checked) {
                  playSound("click");
                  setSelected(opt.id);
                }
              }}
              style={{
                padding: "14px 16px", borderRadius: 14,
                background: bg, border,
                cursor: checked ? "default" : "pointer",
                display: "flex", flexDirection: "column", gap: 8,
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{opt.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: textColor, flex: 1 }}
                      dangerouslySetInnerHTML={{ __html: md(opt.text) }} />
                {checked && opt.correct && <span>✅</span>}
                {checked && isSelected && !opt.correct && <span>❌</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Feedback */}
      {!checked ? (
        <button className="action-btn"
          onClick={handleCheck}
          disabled={!selected}
          style={{
            padding: "14px 0", borderRadius: 14,
            background: !selected ? COLORS.lightGray : COLORS.dark,
            color: !selected ? COLORS.gray : "#fff",
            border: "none", fontWeight: 800, fontSize: 16,
            cursor: !selected ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          Periksa
        </button>
      ) : (
        <FeedbackBar
          isCorrect={options.find(o => o.id === selected)?.correct}
          xp={xp}
          explanation={
            (options.find(o => o.id === selected)?.feedback ? `**Tentang Pilihan Ini:**\n${options.find(o => o.id === selected).feedback}\n\n` : "") +
            (explanation ? `**Konsep Utama:**\n${explanation}` : "")
          }
          onNext={onComplete}
          nextLabel={nextLabel}
        />
      )}
    </div>
  );
}
