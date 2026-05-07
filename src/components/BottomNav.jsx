import { COLORS } from "../data/topics";

const NAV_ITEMS = [
  { id: "beranda",           label: "Beranda",  icon: "🏠" },
  { id: "kursus",            label: "Modul",    icon: "📖" },
  { id: "kelas_sertifikasi", label: "Training", icon: "🎓" },
  { id: "profil",            label: "Profil",   icon: "👤" },
];

export default function BottomNav({ activePage, onNavigate, xp, streak }) {
  return (
    <>
      {/* Mini stats bar — appears above bottom nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "8px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <span style={{ fontSize: 17, fontWeight: 900, color: COLORS.dark, letterSpacing: -0.5 }}>
          Quality<span style={{ color: COLORS.plan }}>.</span>
        </span>

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatBadge icon="🔥" value={streak} color="#FF6B00" />
          <StatBadge icon="⚡" value={xp}     color="#F7BE00" />
        </div>
      </div>

      {/* Bottom navigation bar */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}>
        {NAV_ITEMS.map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                flex: 1, background: "none", border: "none",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "10px 0 6px",
                gap: 3, position: "relative",
              }}
            >
              {/* Active pill indicator */}
              {isActive && (
                <span style={{
                  position: "absolute", top: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: 32, height: 3, borderRadius: 99,
                  background: COLORS.dark,
                }} />
              )}
              <span style={{
                fontSize: 22,
                filter: isActive ? "none" : "grayscale(60%)",
                opacity: isActive ? 1 : 0.5,
                transition: "all 0.2s",
                transform: isActive ? "scale(1.1)" : "scale(1)",
              }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: 10, fontWeight: isActive ? 800 : 500,
                color: isActive ? COLORS.dark : COLORS.gray,
                letterSpacing: 0.2,
                transition: "all 0.2s",
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function StatBadge({ icon, value, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      background: "#F7F8FC", borderRadius: 99,
      padding: "4px 10px", fontSize: 13, fontWeight: 700,
      color: "#1A1D2E",
    }}>
      <span style={{ fontSize: 14, color }}>{icon}</span>
      {value}
    </div>
  );
}
