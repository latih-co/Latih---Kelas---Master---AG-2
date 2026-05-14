import React from 'react';
import { Home, Search, GraduationCap, Radio, User, Video, ShieldCheck } from 'lucide-react';
import LogoWarna from '../assets/Logo Latih Warna.png';
import { useIsMobile } from '../utils/mobile';

export default function SidebarLayout({ children, activePage, onNavigate, user }) {
  const isMobile = useIsMobile();

  // Use provided user or fallback to mock
  const currentUser = user || {
    name: "Rizky Pratama",
    role: "Fresh Graduate",
    xp: 240
  };

  const navGroups = [
    {
      label: "Belajar",
      items: [
        { id: "beranda", icon: <Home size={18} />, label: "Dashboard" },
        { id: "kursus", icon: <Search size={18} />, label: "Jelajahi Modul" },
      ]
    },
    {
      label: "Program",
      items: [
        { id: "kelas_sertifikasi", icon: <GraduationCap size={18} />, label: "Training" },
        { id: "webinar", icon: <Radio size={18} />, label: "Webinar" },
      ]
    },
    {
      label: "Akun",
      items: [
        { id: "profil", icon: <User size={18} />, label: "Profil Saya" },
        { id: "cert_verify", icon: <ShieldCheck size={18} />, label: "Verifikasi Sertifikat", mobileHide: true },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--c-bg)' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div style={{
          width: 220,
          backgroundColor: 'white',
          borderRight: '1px solid #EAF0F6',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
          flexShrink: 0,
          zIndex: 50
        }}>
          {/* Logo */}
          <div style={{ padding: '0 10px', marginBottom: 40, display: 'flex', alignItems: 'center' }}>
            <img src={LogoWarna} alt="Logo Latih" style={{ height: 32, objectFit: 'contain' }} />
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
            {navGroups.map((group, idx) => (
              <div key={idx}>
                <div style={{ 
                  fontSize: 9, 
                  textTransform: 'uppercase', 
                  color: 'var(--c-muted)', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em', 
                  marginBottom: 8,
                  padding: '0 10px'
                }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {group.items.map(item => {
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '9px 10px', borderRadius: 10,
                          backgroundColor: isActive ? 'var(--c-teal-light)' : 'transparent',
                          color: isActive ? 'var(--c-teal-dark)' : 'var(--c-gray)',
                          border: 'none', cursor: 'pointer',
                          fontWeight: isActive ? 700 : 600,
                          fontSize: 13,
                          transition: 'all 0.15s',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if(!isActive) {
                            e.currentTarget.style.backgroundColor = 'var(--surf-2)';
                            e.currentTarget.style.color = 'var(--c-dark)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if(!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--c-gray)';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ color: isActive ? "var(--c-teal)" : "var(--c-muted)", display: "flex" }}>{item.icon}</span>
                          {item.label}
                        </div>
                        {item.badge && (
                          <div style={{
                            backgroundColor: 'var(--c-coral)', color: 'white',
                            fontSize: 10, fontWeight: 800, padding: '2px 6px',
                            borderRadius: 99
                          }}>
                            {item.badge}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* User Card */}
          <div style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 10px',
            backgroundColor: 'var(--surf-2)', borderRadius: 12,
            cursor: 'pointer', transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surf-3)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--surf-2)'}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              backgroundColor: 'var(--c-dark)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, flexShrink: 0
            }}>
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ 
                color: 'var(--c-dark)', fontWeight: 700, fontSize: 12, 
                whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' 
              }}>
                {currentUser.name}
              </div>
              <div style={{ color: 'var(--c-gray)', fontSize: 10 }}>
                {currentUser.xp} XP
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Floating Verifikasi Sertifikat shortcut */}
      {isMobile && activePage !== 'cert_verify' && (
        <button
          onClick={() => onNavigate('cert_verify')}
          style={{
            position: 'fixed',
            bottom: 85,
            right: 16,
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 14px',
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            color: 'white',
            border: 'none',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            transition: 'all 0.2s',
            letterSpacing: 0.2,
          }}
        >
          <ShieldCheck size={14} />
          Verifikasi Sertifikat
        </button>
      )}

      {/* Main Area */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', paddingBottom: isMobile ? 80 : 0 }}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 75,
          backgroundColor: 'white', borderTop: '1px solid #EAF0F6',
          display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
          padding: '12px 10px 0', zIndex: 100, boxShadow: '0 -4px 20px rgba(0,0,0,0.03)'
        }}>
          {navGroups.flatMap(g => g.items).filter(item => !item.mobileHide).map(item => {
            const isActive = activePage === item.id;
            let displayLabel = item.label.split(' ')[0]; // Shortcut words
            if (item.id === "kelas_sertifikasi") displayLabel = "Training";
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', padding: 0, minWidth: 64,
                  color: isActive ? 'var(--c-teal-dark)' : 'var(--c-muted)',
                  cursor: 'pointer', position: 'relative'
                }}
              >
                <div style={{ 
                  color: isActive ? 'var(--c-teal)' : 'var(--c-muted)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s'
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: isActive ? 800 : 600 }}>{displayLabel}</span>
                {item.badge && (
                  <div style={{
                    position: 'absolute', top: -6, right: 10,
                    backgroundColor: 'var(--c-coral)', color: 'white',
                    fontSize: 9, fontWeight: 900, padding: '2px 5px',
                    borderRadius: 99, border: '2px solid white'
                  }}>
                    {item.badge}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
