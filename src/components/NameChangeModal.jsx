import React, { useState } from 'react';

export default function NameChangeModal({ currentName, onSubmit, onClose, loading }) {
  const [newName, setNewName] = useState('');
  const [reason, setReason]   = useState('');
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim())           { setError('Nama baru wajib diisi.'); return; }
    if (newName.trim() === currentName) { setError('Nama baru harus berbeda dari nama saat ini.'); return; }
    if (reason.trim().length < 10) { setError('Alasan minimal 10 karakter.'); return; }
    setError('');
    await onSubmit(newName.trim(), reason.trim());
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'white', border: '1.5px solid #E2E8F0',
    borderRadius: 10, padding: '11px 14px',
    fontSize: 13, color: '#0F172A', outline: 'none',
    transition: 'border-color 0.2s', fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '28px 24px',
        maxWidth: 420, width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A' }}>✏️ Ajukan Koreksi Nama</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Permintaan akan direview oleh admin</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#94A3B8', padding: 4 }}>×</button>
        </div>

        {/* Nama saat ini */}
        <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 14px', marginBottom: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Nama Saat Ini</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>🔒 {currentName}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Nama baru */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Nama Baru
            </label>
            <input
              type="text" value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Masukkan nama yang benar (beserta gelar jika ada)"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0F172A'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Alasan */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Alasan Koreksi
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Contoh: Salah ketik nama saat daftar, ingin menambahkan gelar S.T."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
              onFocus={e => e.target.style.borderColor = '#0F172A'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
            <div style={{ fontSize: 10, color: reason.length < 10 ? '#F59E0B' : '#10B981', marginTop: 4, textAlign: 'right' }}>
              {reason.length} karakter {reason.length < 10 ? '(min 10)' : '✓'}
            </div>
          </div>

          {/* Notice */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: 10, padding: '10px 12px', fontSize: 11.5, color: '#92400E', lineHeight: 1.6 }}>
            ⚠️ Permintaan koreksi nama akan diproses oleh admin dalam 1×24 jam. Selama menunggu, kamu tidak bisa mengajukan permintaan baru.
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '9px 12px', fontSize: 12, color: '#EF4444' }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px', borderRadius: 10, background: 'white', border: '1.5px solid #E2E8F0', fontSize: 13, fontWeight: 700, color: '#64748B', cursor: 'pointer' }}>
              Batal
            </button>
            <button type="submit" disabled={loading} style={{ flex: 2, padding: '11px', borderRadius: 10, background: loading ? '#94A3B8' : '#0F172A', border: 'none', fontSize: 13, fontWeight: 800, color: 'white', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? '⏳ Mengirim...' : '📨 Kirim Permohonan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
