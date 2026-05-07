import { COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";

export default function TakeawayWidget({ title, text, image, onComplete }) {
  const isMobile = useIsMobile();
  
  // Simple markdown parser for **bold** and *italic*
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    return rawText.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 24,
      background: "#fff", borderRadius: 24,
      padding: isMobile ? "24px 20px" : "40px",
      minHeight: isMobile ? "60vh" : "70vh",
      justifyContent: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
      border: `2px solid ${COLORS.lightGray}`,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Top Accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 6,
        background: `linear-gradient(90deg, ${COLORS.plan}, ${COLORS.do})`
      }} />

      {/* Image Optional Container */}
      {image && (
        <div style={{
          width: "100%", height: isMobile ? 180 : 260,
          borderRadius: 16, overflow: "hidden",
          background: COLORS.bg,
          marginTop: 8, marginBottom: 8,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <img src={image} alt="Takeaway Illustration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Main Text Content */}
      <div style={{
        fontSize: isMobile ? 15 : 17,
        color: COLORS.dark,
        lineHeight: 1.7,
        fontWeight: 500,
        whiteSpace: "pre-line",
        background: `${COLORS.lightGray}40`,
        padding: "24px",
        borderRadius: 16,
        borderLeft: `4px solid ${COLORS.do}`
      }}>
        {renderFormattedText(text)}
      </div>

      {/* Proceed Button */}
      <button 
        className="action-btn"
        onClick={onComplete}
        style={{
          marginTop: "auto",
          padding: "16px 0", borderRadius: 18,
          background: COLORS.dark, color: "#fff",
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: "pointer", width: "100%",
          boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        Lanjut
      </button>
    </div>
  );
}
