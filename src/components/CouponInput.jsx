import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Komponen input kode kupon dengan validasi client-side (preview).
 * Validasi final tetap dilakukan server-side di Edge Function.
 *
 * Props:
 *   eventId     - ID event untuk validasi kupon spesifik event
 *   baseAmount  - Harga asli (untuk menghitung preview diskon)
 *   onApply     - callback(couponCode, discountAmount) saat kupon valid
 *   onRemove    - callback() saat kupon dihapus
 */
export default function CouponInput({ eventId, baseAmount, onApply, onRemove }) {
  const [code, setCode]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [applied, setApplied]     = useState(null); // { code, discountAmount, label }

  const handleApply = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) { setError('Masukkan kode voucher terlebih dahulu.'); return; }

    setLoading(true); setError('');
    try {
      const now = new Date().toISOString();
      const { data: coupon, error: couponErr } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', trimmed)
        .eq('is_active', true)
        .single();

      if (couponErr || !coupon) { setError('Kode voucher tidak ditemukan atau sudah tidak aktif.'); return; }
      if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) { setError('Kode voucher sudah kadaluarsa.'); return; }
      if (coupon.valid_from && new Date(coupon.valid_from) > new Date()) { setError('Kode voucher belum berlaku.'); return; }
      if (coupon.max_uses !== null && coupon.current_uses >= coupon.max_uses) { setError('Kuota voucher sudah habis.'); return; }
      if (coupon.min_amount && baseAmount < coupon.min_amount) {
        setError(`Voucher hanya berlaku untuk transaksi minimal Rp ${coupon.min_amount.toLocaleString('id-ID')}.`);
        return;
      }
      if (coupon.event_ids && coupon.event_ids.length > 0 && !coupon.event_ids.includes(eventId)) {
        setError('Voucher tidak berlaku untuk event ini.');
        return;
      }

      // Hitung diskon
      let discountAmount = 0;
      if (coupon.discount_type === 'percentage') {
        discountAmount = Math.floor(baseAmount * coupon.discount_value / 100);
        if (coupon.max_discount) discountAmount = Math.min(discountAmount, coupon.max_discount);
      } else {
        discountAmount = coupon.discount_value;
      }
      discountAmount = Math.min(discountAmount, baseAmount - 1);

      const label = coupon.discount_type === 'percentage'
        ? `Diskon ${coupon.discount_value}%`
        : `Diskon Rp ${coupon.discount_value.toLocaleString('id-ID')}`;

      setApplied({ code: trimmed, discountAmount, label });
      onApply(trimmed, discountAmount);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setApplied(null);
    setCode('');
    setError('');
    onRemove();
  };

  const fmtRp = (n) => `Rp ${n.toLocaleString('id-ID')}`;

  if (applied) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#F0FDF4', border: '1.5px solid #86EFAC',
        borderRadius: 12, padding: '12px 16px', gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#15803D' }}>
            🎉 Voucher {applied.code} diterapkan
          </div>
          <div style={{ fontSize: 11, color: '#166534', marginTop: 2 }}>
            {applied.label} — hemat {fmtRp(applied.discountAmount)}
          </div>
        </div>
        <button
          onClick={handleRemove}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 18, color: '#15803D', lineHeight: 1, flexShrink: 0,
          }}
        >×</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleApply()}
          placeholder="Kode voucher (contoh: LATIH50)"
          style={{
            flex: 1, padding: '11px 14px', borderRadius: 10, fontSize: 13,
            border: `1.5px solid ${error ? '#FECACA' : '#E2E8F0'}`,
            outline: 'none', fontFamily: 'monospace', fontWeight: 700,
            letterSpacing: '0.05em', color: '#0F172A', background: 'white',
          }}
          onFocus={e => e.target.style.borderColor = error ? '#EF4444' : '#0F172A'}
          onBlur={e => e.target.style.borderColor = error ? '#FECACA' : '#E2E8F0'}
          disabled={loading}
        />
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          style={{
            padding: '11px 16px', borderRadius: 10, fontSize: 13, fontWeight: 800,
            background: loading || !code.trim() ? '#E2E8F0' : '#0F172A',
            color: loading || !code.trim() ? '#94A3B8' : 'white',
            border: 'none', cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}
        >
          {loading ? '...' : 'Terapkan'}
        </button>
      </div>
      {error && (
        <div style={{ fontSize: 11, color: '#EF4444', marginTop: 6, fontWeight: 600 }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
