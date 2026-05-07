import { COLORS } from "../data/courses";
import { useIsMobile } from "../utils/mobile";

export default function IntroQuizWidget({ onComplete }) {
  const isMobile = useIsMobile();
  
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 24,
      background: "#fff",
      borderRadius: 24,
      padding: isMobile ? "40px 24px" : "60px 48px",
      minHeight: isMobile ? "60vh" : "70vh",
      justifyContent: "center", alignItems: "center",
      boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
      border: `2px solid ${COLORS.lightGray}`,
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      color: COLORS.dark
    }}>
      {/* Background accents */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 160, height: 160, borderRadius: "50%",
        background: `${COLORS.plan}20`, filter: "blur(20px)"
      }} />
      <div style={{
        position: "absolute", bottom: -20, left: -20,
        width: 120, height: 120, borderRadius: "50%",
        background: `${COLORS.act}20`, filter: "blur(20px)"
      }} />

      {/* Main Content */}
      <div style={{
        fontSize: 48, marginBottom: 16,
        zIndex: 10,
        animation: "float 4s ease-in-out infinite"
      }}>
        ✍️
      </div>

      <h2 style={{ 
        fontSize: isMobile ? 18 : 22, 
        fontWeight: 800, 
        margin: 0, 
        lineHeight: 1.2,
        zIndex: 10,
      }}>
        Ayo, Cek Pemahamanmu!
      </h2>

      {/* Proceed Button */}
      <button 
        className="action-btn"
        onClick={onComplete}
        style={{
          marginTop: 24,
          padding: "16px 40px", borderRadius: 99,
          background: COLORS.dark, color: "#fff",
          border: "none", fontWeight: 800, fontSize: 16,
          cursor: "pointer",
          boxShadow: `0 8px 24px rgba(0,0,0,0.15)`,
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          zIndex: 10,
          width: isMobile ? "100%" : "auto"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Mulai
      </button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </div>
  );
}
