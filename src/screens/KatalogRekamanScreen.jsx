import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';
import { useIsMobile } from '../utils/mobile';
import { api } from '../services/api';

export default function KatalogRekamanScreen({ onSelectRecord }) {
  const isMobile = useIsMobile();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRecordsCatalog().then(data => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter', color: 'var(--c-muted)', fontSize: 14 }}>
        <div style={{ marginBottom: 16 }}>⏳</div>
        <div>Memuat katalog rekaman...</div>
      </div>
    );
  }


  return (
    <div style={{ padding: isMobile ? "20px 16px 56px" : "24px 32px 56px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ fontSize: 12, color: 'var(--c-muted)', fontWeight: 500, marginBottom: 4 }}>
        Akses rekaman & materi kapan saja
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--c-dark)', margin: '0 0 24px 0', letterSpacing: '-0.5px' }}>
        Katalog Rekaman
      </h1>

      {/* Grid 4 Kolom */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 20 }}>
        {records.map(item => (
          <div key={item.id} onClick={() => onSelectRecord && onSelectRecord(item)} style={{
            display: 'flex', flexDirection: 'column',
            backgroundColor: 'white',
            border: '1px solid #EAF0F6',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            transition: 'all 0.15s', cursor: 'pointer', overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--c-teal)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,112,243,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#EAF0F6';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
          }}
          >
            <div style={{ position: 'relative' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', backgroundColor: 'var(--surf-2)' }} />
              <div style={{
                position: 'absolute', bottom: 10, right: 10,
                backgroundColor: 'rgba(0,0,0,0.7)', color: 'white',
                padding: '4px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <PlayCircle size={12} /> {item.duration}
              </div>
            </div>
            
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--c-dark)', letterSpacing: '-0.2px', lineHeight: 1.4, marginBottom: 16, minHeight: 40 }}>
                {item.title}
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #EAF0F6', paddingTop: 16 }}>
                <div className="font-mono" style={{ fontSize: 16, fontWeight: 800, color: 'var(--c-dark)' }}>
                  {item.price}
                </div>
                <button style={{
                  backgroundColor: 'var(--surf-2)',
                  color: 'var(--c-dark)',
                  border: 'none',
                  borderRadius: 8, padding: '8px 12px',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--c-teal-light)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--surf-2)'}
                >
                  Beli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
