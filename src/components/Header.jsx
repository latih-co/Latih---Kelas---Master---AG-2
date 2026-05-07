import { COLORS } from "../data/topics";

export default function Header({ activePage, onNavigate, xp, streak }) {
  const navItems = [
    { id: "beranda", label: "Beranda", icon: "🏠" },
    { id: "kursus",  label: "Modul",  icon: "📖" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff",
      borderBottom: "1.5px solid #ECEEF5",
      padding: "0 24px", height: 60,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Inner wrapper — aligned to same max-width as page content */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", height: "100%",
        display: "flex", alignItems: "center", gap: 32,
      }}>
        {/* Logo */}
        <div
          onClick={() => onNavigate("beranda")}
          style={{ cursor: "pointer", flexShrink: 0 }}
        >
          <span style={{ fontSize: 20, fontWeight: 900, color: COLORS.dark, letterSpacing: -0.5 }}>
            Quality<span style={{ color: COLORS.plan }}>.</span>
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background: "none", border: "none",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.dark : COLORS.gray,
                  position: "relative",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
                {/* Active underline */}
                {isActive && (
                  <span style={{
                    position: "absolute", bottom: -17, left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%", height: 2,
                    background: COLORS.dark,
                    borderRadius: 2,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* Streak */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "5px 12px", borderRadius: 99,
            border: `1.5px solid ${COLORS.lightGray}`,
            fontSize: 13, fontWeight: 700, color: COLORS.dark,
          }}>
            <span style={{ fontSize: 15 }}>🔥</span>
            {streak}
          </div>

          {/* XP */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "5px 12px", borderRadius: 99,
            border: `1.5px solid ${COLORS.lightGray}`,
            fontSize: 13, fontWeight: 700, color: COLORS.dark,
          }}>
            <span style={{ fontSize: 15, color: "#F7BE00" }}>⚡</span>
            {xp}
          </div>

          {/* Hamburger */}
          <button style={{
            background: "none", border: "none",
            cursor: "pointer", padding: "4px 6px",
            color: COLORS.gray, fontSize: 18,
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 20, height: 2, background: COLORS.gray, borderRadius: 2 }} />
            ))}
          </button>
        </div>
      </div>
    </header>
  );
}
