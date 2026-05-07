import React, { useState } from "react";
import { COLORS } from "../data/lessons";
import { playSound } from "../utils/sound";

export default function AccordionMateriWidget({ scenario, panels: propsPanels, onComplete, nextLabel }) {
  const [openIndex, setOpenIndex] = useState(0);

  const togglePanel = (index) => {
    if (openIndex !== index) {
      playSound("click");
      setOpenIndex(index);
    }
  };

  const panels = propsPanels || [
    {
      numBox: { bg: "#FEF3C7", color: "#D97706" }, // Amber
      title: "'Normatif' = wajib, bukan saran",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>
            Dalam standar ISO, ada dua jenis referensi. <strong>Informatif</strong> = disarankan, boleh diabaikan. <strong>Normatif</strong> = wajib dirujuk untuk menggunakan standar dengan benar.
          </p>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderLeft: "3px solid #D97706",
            padding: "12px 14px",
            borderRadius: "0 8px 8px 0"
          }}>
            <p style={{ margin: 0, color: "#E2E8F0", fontSize: 13, lineHeight: 1.5 }}>
              📌 <strong>ISO 9001:2015 hanya memiliki satu acuan normatif:</strong> ISO 9000:2015 — Quality management systems: Fundamentals and vocabulary.
            </p>
          </div>
        </div>
      )
    },
    {
      numBox: { bg: "#D1FAE5", color: "#047857" }, // Teal
      title: "Satu kamus untuk semua standar ISO",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>
            ISO 9000 adalah kamus bersama yang dipakai oleh semua standar ISO modern. Tujuannya: "pelanggan", "proses", "rekaman" berarti hal yang sama di ISO 9001, 14001, maupun 45001.
          </p>
          <div style={{
            background: "rgba(0, 0, 0, 0.2)",
            padding: 16,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="iso-box">ISO 9001</div>
              <div className="iso-box">ISO 14001</div>
              <div className="iso-box">ISO 45001</div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#64748B" }}>
              <div>↘</div>
              <div>→</div>
              <div>↗</div>
            </div>

            <div style={{
              background: "#D1FAE5", color: "#047857",
              padding: "12px 16px", borderRadius: 8,
              fontWeight: "bold", fontSize: 13,
              textAlign: "center", width: 100, border: "2px solid #10B981"
            }}>
              ISO 9000<br/>
              <span style={{ fontSize: 10, fontWeight: "normal" }}>Kamus Bersama</span>
            </div>
          </div>
        </div>
      )
    },
    {
      numBox: { bg: "#DBEAFE", color: "#047857" }, // Navy muda light, text teal (as requested)
      title: "Praktisnya: ke mana harus merujuk?",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>
            Setiap kali Anda menulis istilah teknis dalam dokumen QMS — prosedur, instruksi, manual mutu — definisinya harus bersumber dari ISO 9000:2015, bukan dari KBBI, kamus internal, atau sumber lain.
          </p>
          <div style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderLeft: "3px solid #047857",
            padding: "12px 14px",
            borderRadius: "0 8px 8px 0"
          }}>
            <p style={{ margin: 0, color: "#F8FAFC", fontSize: 13, lineHeight: 1.5, fontStyle: "italic" }}>
              "Kamus internal perusahaan boleh ada sebagai penyederhanaan bahasa. Tapi isinya harus konsisten dengan ISO 9000 — bukan menggantikannya."
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, #1a1e36 100%)`,
        borderRadius: 20,
        padding: "24px 20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column", gap: 20
      }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ color: "#2DD4BF", fontSize: 12, fontWeight: "bold", letterSpacing: 1 }}>
            {scenario?.label ? scenario.label.toUpperCase() : "📖 MATERI INTI"}
          </div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: 22, lineHeight: 1.3 }}>
            {scenario?.text || "Fungsi Acuan Normatif dalam ISO 9001"}
          </h2>
        </div>

        {/* Accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {panels.map((panel, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: isOpen ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: isOpen ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.05)",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => togglePanel(idx)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: panel.numBox?.bg || "#FEF3C7", color: panel.numBox?.color || "#D97706",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold", fontSize: 13, flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ flex: 1, color: isOpen ? "#fff" : "#CBD5E1", fontSize: 15, fontWeight: isOpen ? 600 : 500, transition: "color 0.2s" }}>
                    {panel.title}
                  </div>
                  <div style={{ color: "#64748B", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                    ▼
                  </div>
                </div>

                {/* Accordion Content */}
                <div style={{
                  maxHeight: isOpen ? 1200 : 0,
                  opacity: isOpen ? 1 : 0,
                  padding: isOpen ? "0 16px 16px 16px" : "0 16px",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden"
                }}>
                  <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    {typeof panel.content === "string" ? (
                      <div className="accordion-html-payload" style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: panel.content }} />
                    ) : (
                      panel.content
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          playSound("click");
          onComplete();
        }}
        style={{
          background: "#2DD4BF", color: "#0F172A",
          padding: "16px", borderRadius: 14,
          border: "none", fontWeight: "bold", fontSize: 16,
          boxShadow: "0 4px 10px rgba(45, 212, 191, 0.3)",
          cursor: "pointer", width: "100%", margin: "0 auto",
          transition: "transform 0.1s"
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {nextLabel || "Paham, lanjut ke soal pemahaman →"}
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        .iso-box {
          background: rgba(255,255,255,0.1);
          color: #E2E8F0;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-family: monospace;
          letter-spacing: 0.5px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .accordion-html-payload p {
          margin-top: 0;
          margin-bottom: 12px;
        }
        .accordion-html-payload ul, .accordion-html-payload ol {
          margin-top: 0;
          margin-bottom: 12px;
        }
        .accordion-html-payload .alert-box,
        .accordion-html-payload .alert-box * {
          color: #1E293B !important;
        }
      `}} />
    </div>
  );
}
