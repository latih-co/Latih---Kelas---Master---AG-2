import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function CompleteProfileModal() {
  const { user, updateProfile } = useUser();

  const [name, setName]       = useState(user?.name || '');
  const [jobRole, setJobRole] = useState(user?.job_role || '');
  const [whatsapp, setWhatsapp] = useState(user?.whatsapp || '');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'white', border: '1.5px solid #E2E8F0',
    borderRadius: 12, padding: '13px 16px',
    fontSize: 14, color: '#0F172A', outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = {
    display: 'block', fontSize: 12, fontWeight: 700,
    color: '#64748B', marginBottom: 8, letterSpacing: '0.05em',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim())     { setError('Nama lengkap wajib diisi.'); return; }
    if (!jobRole.trim())  { setError('Peran / jabatan pekerjaan wajib diisi.'); return; }
    if (!whatsapp.trim()) { setError('Nomor WhatsApp wajib diisi.'); return; }

    setLoading(true); setError('');
    const { error: updateErr } = await updateProfile({
      name:     name.trim(),
      job_role: jobRole.trim(),
      whatsapp: whatsapp.trim(),
    });
    setLoading(false);
    if (updateErr) setError('Gagal menyimpan. Coba lagi.');
    // Jika berhasil, UserContext akan update `user` → whatsapp sudah ada →
    // needsProfileCompletion otomatis jadi false di context
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif", padding: 20,
    }}>
      <div style={{
        background: 'white', borderRadius: 24, padding: '36px 32px',
        width: '100%', maxWidth: 460,
        boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
        animation: 'slideUp 0.3s ease',
      }}>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>👋</div>
          <h1 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 900, color: '#0F172A' }}>
            Lengkapi profil kamu
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
            Sebelum mulai, pastikan data di bawah ini sudah benar.
            Nama akan tercetak di sertifikat dan <strong>tidak bisa diubah</strong> nanti.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Nama */}
          <div>
            <label style={labelStyle}>NAMA LENGKAP</label>
            {/* Notice sertifikat */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              background: '#FFFBEB', border: '1px solid #FCD34D',
              borderRadius: 10, padding: '10px 12px', marginBottom: 8,
            }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>🎓</span>
              <p style={{ margin: 0, fontSize: 11.5, color: '#92400E', lineHeight: 1.5 }}>
                <strong>Akan tercetak di sertifikat.</strong> Tambahkan gelar jika perlu (contoh: dr., S.T., M.M.).
              </p>
            </div>
            <input
              type="text" value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nama lengkap sesuai identitas resmi"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0F172A'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Jabatan */}
          <div>
            <label style={labelStyle}>PERAN / JABATAN PEKERJAAN</label>
            <input
              type="text" value={jobRole}
              onChange={e => setJobRole(e.target.value)}
              placeholder="Contoh: QA Manager, Production Supervisor..."
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0F172A'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label style={labelStyle}>NOMOR WHATSAPP</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)', fontSize: 16, pointerEvents: 'none',
              }}>📱</span>
              <input
                type="tel" value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="Contoh: 08123456789"
                style={{ ...inputStyle, paddingLeft: 42 }}
                onFocus={e => e.target.style.borderColor = '#0F172A'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>
            <p style={{ margin: '6px 0 0', fontSize: 11, color: '#94A3B8', lineHeight: 1.5 }}>
              Digunakan untuk informasi penting terkait pelatihan
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#EF4444',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#94A3B8' : '#0F172A',
              border: 'none', borderRadius: 12,
              fontSize: 15, fontWeight: 800, color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4, transition: 'background 0.2s',
            }}
          >
            {loading ? '⏳ Menyimpan...' : 'Simpan & Lanjutkan →'}
          </button>
        </form>
      </div>
    </div>
  );
}
