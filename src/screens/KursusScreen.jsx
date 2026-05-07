import React, { useState } from 'react';
import { categories } from "../data/courses";
import { Search } from 'lucide-react';
import { useIsMobile } from '../utils/mobile';

export default function KursusScreen({ onSelectTopic }) {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all topics with their category info
  const allTopics = categories.flatMap(c =>
    c.topics.map(t => ({
      ...t,
      categoryTitle: c.title,
      categoryColor: c.color
    }))
  );

  // Build filters dynamically from actual categories + special filters
  const categoryFilters = [...new Set(categories.map(c => c.title))];
  const filters = ['Semua', ...categoryFilters, 'Gratis', 'Segera Hadir'];

  // Apply active filter + search query
  const filteredTopics = allTopics.filter(t => {
    const matchFilter =
      activeFilter === 'Semua' ? true
      : activeFilter === 'Gratis' ? (!t.price || t.price === 0) && !t.comingSoon
      : activeFilter === 'Segera Hadir' ? t.comingSoon
      : t.categoryTitle === activeFilter;
    const matchSearch = searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ padding: isMobile ? "20px 16px 100px" : "24px 32px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
        Belajar industri, kapan saja & di mana saja
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--c-dark)', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
        Jelajahi Modul
      </h1>

      {/* Intro Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
        borderRadius: 20,
        padding: isMobile ? '20px 18px' : '22px 28px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(0,112,243,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -20, left: '40%', width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,112,243,0.08)', pointerEvents: 'none' }} />

        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>
          Mengapa belajar di sini?
        </div>
        <h2 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 900, color: 'white', margin: '0 0 16px 0', lineHeight: 1.3 }}>
          Microlearning interaktif untuk profesional industri 🚀
        </h2>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 10 : 16 }}>
          {[
            { emoji: '⚡', title: 'Belajar 10 Menit', desc: 'Setiap sesi dirancang singkat, padat, dan langsung relevan ke pekerjaan.' },
            { emoji: '🎮', title: 'Gamifikasi XP', desc: 'Kumpulkan XP, jaga streak harian, dan naiki peringkat seperti bermain game.' },
            { emoji: '🏅', title: 'Sertifikat Industri', desc: 'Dapatkan sertifikat resmi setelah menyelesaikan modul dan lulus kuis.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '12px 14px',
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.emoji}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'white', marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', color: 'var(--c-muted)', display: 'flex' }}>
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Cari modul, topik, atau kategori..."
          style={{
            width: '100%', padding: '12px 16px 12px 42px',
            backgroundColor: 'white', border: '1px solid #EAF0F6',
            borderRadius: 12, fontSize: 13, color: 'var(--c-dark)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)', outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {filters.map(f => {
          const isActive = activeFilter === f;
          return (
            <button key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                backgroundColor: isActive ? 'var(--c-dark)' : 'white',
                color: isActive ? 'white' : 'var(--c-muted)',
                border: isActive ? '1px solid var(--c-dark)' : '1px solid #EAF0F6',
                borderRadius: 99, padding: '6px 14px',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                if(!isActive) {
                  e.currentTarget.style.borderColor = 'var(--c-teal)';
                  e.currentTarget.style.color = 'var(--c-teal-dark)';
                }
              }}
              onMouseLeave={(e) => {
                if(!isActive) {
                  e.currentTarget.style.borderColor = '#EAF0F6';
                  e.currentTarget.style.color = 'var(--c-muted)';
                }
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--c-dark)', margin: 0 }}>
          {activeFilter === 'Semua' ? 'Semua modul' : activeFilter} ({filteredTopics.length})
        </h2>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-teal-dark)', cursor: 'pointer' }}>
          Urutkan: Terpopuler
        </div>
      </div>

      {/* Grid Modul */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? 12 : 14
      }}>
        {filteredTopics.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: 'var(--c-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Modul tidak ditemukan</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Coba kata kunci atau filter lain</div>
          </div>
        ) : filteredTopics.map(topic => {
          const isFree = !topic.price || topic.price === 0;
          return (
            <div key={topic.id}
              onClick={() => !topic.comingSoon && onSelectTopic(topic)}
              style={{
                backgroundColor: 'white',
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid #EAF0F6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                cursor: topic.comingSoon ? 'default' : 'pointer',
                transition: 'all 0.15s',
                display: 'flex', flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                if(!topic.comingSoon) {
                  e.currentTarget.style.borderColor = 'var(--c-teal-light)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,212,157,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if(!topic.comingSoon) {
                  e.currentTarget.style.borderColor = '#EAF0F6';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <div style={{
                height: 90,
                backgroundColor: topic.comingSoon ? 'var(--surf-2)' : `${topic.categoryColor}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36
              }}>
                {topic.icon}
              </div>
              <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: 'var(--c-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  {topic.categoryTitle}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-dark)', lineHeight: 1.3, marginBottom: 12 }}>
                  {topic.title}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="font-mono" style={{ fontSize: 11, color: 'var(--c-muted)' }}>
                    {topic.lessons?.length || 0} lesson
                  </div>
                  {topic.comingSoon ? (
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--c-muted)', backgroundColor: 'var(--surf-2)', padding: '4px 8px', borderRadius: 6 }}>
                      Segera
                    </div>
                  ) : (
                    <div style={{
                      fontSize: 11, fontWeight: 800,
                      color: isFree ? 'var(--c-teal-dark)' : 'var(--c-amber-dark)',
                      backgroundColor: isFree ? 'var(--c-teal-light)' : 'var(--c-amber-light)',
                      padding: '4px 8px', borderRadius: 6
                    }}>
                      {isFree ? 'Gratis' : `Rp 49k`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {/* Lebih banyak segera */}
        <div style={{
          backgroundColor: 'var(--surf-2)',
          borderRadius: 16,
          border: '1px dashed #CBD5E1',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: 'var(--c-muted)', padding: 24, minHeight: 180
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>+</div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Lebih banyak segera</div>
        </div>
      </div>
    </div>
  );
}
