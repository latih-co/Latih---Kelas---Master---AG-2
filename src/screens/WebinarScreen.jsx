import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../utils/mobile';
import { api } from '../services/api';

// Shared card renderer — badge kategori ditampilkan di dalam card
function WebinarCard({ item, onSelect, isMobile }) {
  const isReguler = item.kategori === 'reguler';
  const isAdvanced = item.kategori === 'advanced';

  const accentColor  = isReguler ? '#22C55E' : '#0070F3';
  const badgeBg      = isReguler ? '#F0FDF4' : '#EFF6FF';
  const badgeColor   = isReguler ? '#15803D' : '#1D4ED8';
  const badgeBorder  = isReguler ? '#BBF7D0' : '#BFDBFE';
  const badgeLabel   = isReguler ? 'Webinar Reguler' : 'Webinar Advanced';

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      style={{
        display: 'flex', flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #EAF0F6',
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        transition: 'all 0.15s', cursor: 'pointer', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentColor + '80';
        e.currentTarget.style.boxShadow = `0 6px 16px ${accentColor}18`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#EAF0F6';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Cover Image */}
      {item.image ? (
        <img src={item.image} alt="Webinar"
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', backgroundColor: 'var(--surf-2)' }} />
      ) : (
        <div style={{
          width: '100%', aspectRatio: '1/1',
          background: isReguler
            ? 'linear-gradient(135deg, #059669 0%, #34D399 100%)'
            : 'linear-gradient(135deg, #1D4ED8 0%, #60A5FA 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
        }}>
          {isReguler ? '🎙️' : '🚀'}
        </div>
      )}

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Badges row: kategori + sektor */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          {/* Kategori badge — primary */}
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            fontSize: 9, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: 0.8, padding: '2px 7px', borderRadius: 99,
            backgroundColor: badgeBg, color: badgeColor, border: `1px solid ${badgeBorder}`,
          }}>
            {badgeLabel}
          </span>
          {/* Sektor badge — secondary */}
          {item.sektor && (
            <span style={{
              display: 'inline-flex', fontSize: 9, fontWeight: 700,
              padding: '2px 6px', borderRadius: 99,
              backgroundColor: 'var(--surf-2)', color: 'var(--c-muted)',
              border: '1px solid #E2E8F0',
            }}>
              {item.sektor}
            </span>
          )}
        </div>

        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--c-dark)', lineHeight: 1.3, marginBottom: 8 }}>
          {item.title}
        </div>

        <div style={{ fontSize: 11, color: 'var(--c-muted)', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span>📅</span> {item.stats?.tanggal || 'TBA'}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderTop: '1px solid #EAF0F6', paddingTop: 12, gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: isReguler ? '#15803D' : 'var(--c-dark)' }}>
            {isReguler ? 'Gratis' : `${item.priceFree} / ${item.pricePremium}`}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-teal-dark)' }}>
            Lihat detail →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WebinarScreen({ onSelectWebinar }) {
  const isMobile = useIsMobile();
  const [allWebinars, setAllWebinars] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [w, r] = await Promise.all([api.getWebinars(), api.getRecentRecords()]);
        setAllWebinars(w);
        setRecords(r);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter', color: 'var(--c-muted)', fontSize: 14 }}>
        <div style={{ marginBottom: 16 }}>⏳</div>
        <div>Memuat jadwal webinar...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? '20px 16px 56px' : '24px 32px 56px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
        Event live setiap minggu
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--c-dark)', margin: '0 0 28px 0', letterSpacing: '-0.5px' }}>
        Webinar
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: 28, alignItems: 'start' }}>

        {/* KOLOM KIRI — Semua webinar dalam satu grid */}
        <div>
          {allWebinars.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 18 }}>
              {allWebinars.map(item => (
                <WebinarCard key={item.id} item={item} onSelect={onSelectWebinar} isMobile={isMobile} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '48px 24px', backgroundColor: 'var(--surf-2)', borderRadius: 16, border: '1px dashed #CBD5E1', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--c-muted)', fontWeight: 600 }}>Belum ada jadwal webinar untuk saat ini.</p>
              <p style={{ margin: '6px 0 0 0', fontSize: 12, color: 'var(--c-muted)' }}>Nantikan update kelas berikutnya melalui Instagram @latih.co</p>
            </div>
          )}
        </div>

        {/* KOLOM KANAN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Info Webinar Reguler */}
          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#15803D', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              🎁 Webinar Reguler
            </div>
            <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.6 }}>
              Program pengenalan profesi secara menyeluruh, mulai dari gambaran pekerjaan, tanggung jawab, hingga peluang karier. Peserta mendapatkan materi dan sertifikat.
            </div>
          </div>

          {/* Info Webinar Advanced */}
          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#1D4ED8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              ⭐ Webinar Advanced
            </div>
            <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.6 }}>
              Lebih dari sekadar pengenalan — case study relevan, pembahasan mendalam, dan paket free/premium dengan banyak fasilitas eksklusif.
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}
