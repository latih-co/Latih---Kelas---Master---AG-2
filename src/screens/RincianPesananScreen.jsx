import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

const fmtRp = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;
const fmtDate = (ts) => {
  if (!ts) return '-';
  return new Date(ts).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  }) + ' WIB';
};

const STATUS_CONFIG = {
  pending:   { label: 'Menunggu Pembayaran', color: '#F59E0B', bg: '#FEF3C7', emoji: '⏳' },
  paid:      { label: 'Pembayaran Berhasil',  color: '#10B981', bg: '#D1FAE5', emoji: '✅' },
  expired:   { label: 'Kedaluwarsa',          color: '#6B7280', bg: '#F3F4F6', emoji: '⌛' },
  failed:    { label: 'Gagal',                color: '#EF4444', bg: '#FEE2E2', emoji: '❌' },
};

export default function RincianPesananScreen({ paymentRef, onNavigate }) {
  const { user, session } = useUser();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!paymentRef || !session) { setLoading(false); return; }
    loadPayment();
  }, [paymentRef, session]);

  const loadPayment = async () => {
    setLoading(true);
    try {
      // Cari payment berdasarkan merchant_ref
      const { data, error: fetchErr } = await supabase
        .from('payments')
        .select(`
          *,
          registrations (
            id, status, package, event_id,
            events (title, type, event_date, waktu, image_url)
          )
        `)
        .eq('tripay_merchant_ref', paymentRef)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (fetchErr) throw fetchErr;
      if (!data) {
        setError('Data pesanan tidak ditemukan.');
      } else {
        setPayment(data);
      }
    } catch (err) {
      setError('Gagal memuat data pesanan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const st = STATUS_CONFIG[payment?.status] || STATUS_CONFIG.pending;
  const event = payment?.registrations?.events;
  const reg = payment?.registrations;

  const METHOD_LABELS = {
    QRIS: 'QRIS', BRIVA: 'BRI Virtual Account', BNIVA: 'BNI Virtual Account',
    MANDIRIVA: 'Mandiri Virtual Account', BCAVA: 'BCA Virtual Account',
    CIMBVA: 'CIMB Virtual Account', SHOPEEPAY: 'ShopeePay', OVO: 'OVO', DANA: 'DANA',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif', padding: '0 0 80px' }}>
      {/* ── Header ── */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #EAF0F6', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <button
          onClick={() => onNavigate?.('profil')}
          style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #EAF0F6', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
        >←</button>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A' }}>Rincian Pesanan</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>Detail transaksi pembayaran</div>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div style={{ fontSize: 13 }}>Memuat rincian pesanan...</div>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>😕</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Pesanan Tidak Ditemukan</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>{error}</div>
            <button onClick={() => onNavigate?.('profil')} style={{ padding: '10px 24px', borderRadius: 12, background: '#0F172A', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
              Lihat Profil
            </button>
          </div>
        )}

        {!loading && payment && (
          <>
            {/* Status Banner */}
            <div style={{ backgroundColor: st.bg, borderRadius: 16, padding: '20px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 36 }}>{st.emoji}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A', marginBottom: 2 }}>{st.label}</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>No. Invoice: {payment.tripay_merchant_ref}</div>
              </div>
            </div>

            {/* Rincian Produk */}
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                📦 Rincian Pesanan
              </div>
              <div style={{ padding: '16px 20px' }}>
                {/* Event Info */}
                <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  {event?.image_url && (
                    <img src={event.image_url} alt="" style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', lineHeight: 1.4, marginBottom: 4 }}>
                      {event?.title || 'Event'}
                      {reg?.package === 'premium' && (
                        <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: 20, border: '1px solid #FDE68A' }}>⭐ Premium</span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{event?.type?.replace(/_/g, ' ')?.toUpperCase()}</div>
                    {event?.event_date && (
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                        📅 {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })}
                        {event.waktu ? ` pukul ${event.waktu}` : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary rows */}
                {[
                  ['Qty', '1 item'],
                  ['Harga', fmtRp(payment.amount)],
                  ['Metode Bayar', METHOD_LABELS[payment.payment_method] || payment.payment_method],
                  ['No. Referensi', payment.tripay_reference || '-'],
                  ['Tanggal Pesanan', fmtDate(payment.created_at)],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderTop: '1px solid #F1F5F9', gap: 12 }}>
                    <div style={{ fontSize: 12, color: '#64748B', flexShrink: 0 }}>{label}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', textAlign: 'right', wordBreak: 'break-all' }}>{val}</div>
                  </div>
                ))}

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '2px solid #EAF0F6', marginTop: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Total</div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#0F172A' }}>{fmtRp(payment.amount)}</div>
                </div>
              </div>
            </div>

            {/* Info Status Pesanan */}
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #EAF0F6', fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                📋 Status Pendaftaran
              </div>
              <div style={{ padding: '16px 20px' }}>
                {payment.status === 'paid' ? (
                  <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.6 }}>
                    ✅ Pembayaran diterima. Link Zoom dan akses konten tersedia di <strong>Profil → Aktivitas Training & Webinar</strong>.
                  </div>
                ) : payment.status === 'pending' ? (
                  <div style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
                    ⏳ Pembayaran belum dikonfirmasi. Jika sudah bayar, tunggu beberapa saat. Jika belum, buka kembali event dan pilih <strong>Selesaikan Pembayaran</strong>.
                  </div>
                ) : (
                  <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                    Transaksi ini sudah kadaluwarsa atau gagal. Silakan daftar ulang dari halaman event.
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {payment.status === 'pending' && payment.tripay_reference ? (
                <a
                  href={`https://tripay.co.id/checkout/${payment.tripay_reference}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button style={{ width: '100%', padding: '14px', borderRadius: 14, background: 'linear-gradient(135deg, #0070F3, #0050B3)', color: 'white', border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                    💳 Lanjutkan Pembayaran →
                  </button>
                </a>
              ) : null}
              <button
                onClick={() => onNavigate?.('profil')}
                style={{ width: '100%', padding: '14px', borderRadius: 14, background: payment.status === 'pending' ? 'white' : '#0F172A', color: payment.status === 'pending' ? '#0F172A' : 'white', border: payment.status === 'pending' ? '1px solid #EAF0F6' : 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}
              >
                📋 Lihat Aktivitas di Profil →
              </button>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
