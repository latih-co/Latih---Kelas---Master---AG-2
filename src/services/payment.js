import { supabase } from '../lib/supabase';

// Payment methods tersedia di Tripay (Indonesia)
export const PAYMENT_METHODS = [
  { code: 'QRIS',      label: 'QRIS',                    brandBg: '#E31836', brandText: 'white',   brandLabel: 'QRIS',    fee: 0,    note: 'Tidak ada biaya admin' },
  { code: 'BRIVA',     label: 'BRI Virtual Account',     brandBg: '#003399', brandText: 'white',   brandLabel: 'BRI',     fee: 4250, note: 'Biaya admin Rp 4.250' },
  { code: 'BNIVA',     label: 'BNI Virtual Account',     brandBg: '#F26522', brandText: 'white',   brandLabel: 'BNI',     fee: 4250, note: 'Biaya admin Rp 4.250' },
  { code: 'MANDIRIVA', label: 'Mandiri Virtual Account', brandBg: '#003F8A', brandText: '#F7941E', brandLabel: 'Mandiri', fee: 4250, note: 'Biaya admin Rp 4.250' },
  { code: 'BCAVA',     label: 'BCA Virtual Account',     brandBg: '#0060AF', brandText: 'white',   brandLabel: 'BCA',     fee: 5500, note: 'Biaya admin Rp 5.500' },
];


// ⚠️⚠️⚠️ DEV ONLY — HAPUS SEBELUM LAUNCH ⚠️⚠️⚠️
// Simulasi pembayaran terbayar tanpa Tripay — hanya untuk testing flow
export async function simulatePayment(eventId, packageType) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  // Cek sudah terdaftar
  const { data: existing } = await supabase
    .from('registrations')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('event_id', eventId)
    .maybeSingle();
  if (existing) return { error: 'Sudah terdaftar di event ini' };

  // Buat registrasi langsung dengan status 'paid'
  const { data: reg, error: regErr } = await supabase
    .from('registrations')
    .insert({ user_id: session.user.id, event_id: eventId, package: packageType, status: 'paid' })
    .select()
    .single();
  if (regErr) return { error: regErr.message };

  // Catat payment simulasi
  await supabase.from('payments').insert({
    registration_id:     reg.id,
    user_id:             session.user.id,
    tripay_merchant_ref: `SIM-${Date.now()}`,
    amount:              0,
    payment_method:      'SIMULASI',
    status:              'paid',
    paid_at:             new Date().toISOString(),
  });

  return { success: true };
}

// ⚠️ DEV ONLY — Simulasi UPGRADE free → premium tanpa bayar
// Membutuhkan policy RLS: jalankan supabase/dev_allow_update_registration.sql dulu
export async function simulateUpgrade(registrationId) {
  const { error } = await supabase
    .from('registrations')
    .update({ package: 'premium', status: 'quiz_unlocked' })
    .eq('id', registrationId);
  if (error) return { error: error.message };
  return { success: true };
}
// ⚠️⚠️⚠️ END DEV ONLY ⚠️⚠️⚠️

/**
 * Membuat transaksi pembayaran via Tripay (melalui Supabase Edge Function)
 * @param {string} eventId - ID event
 * @param {string} packageType - 'free' | 'premium'
 * @param {string} paymentMethod - Kode metode bayar Tripay (QRIS, BRIVA, dll)
 * @returns {{ checkout_url, reference } | { error }}
 */
export async function createPayment(eventId, packageType, paymentMethod = 'QRIS', couponCode = null) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  const body = {
    event_id:       eventId,
    package_type:   packageType,
    payment_method: paymentMethod,
  };
  if (couponCode) body.coupon_code = couponCode.trim().toUpperCase();

  const response = await supabase.functions.invoke('create-payment', { body });

  if (response.error) {
    // Supabase wraps non-2xx as FunctionsHttpError — real message is in response.data
    const actualError = response.data?.error || response.error.message || 'Gagal membuat pembayaran';
    return { error: actualError };
  }

  const data = response.data;
  if (!data?.success) {
    return { error: data?.error || 'Tripay menolak transaksi ini' };
  }

  return {
    checkout_url: data.checkout_url,
    reference:    data.reference,
    pay_url:      data.pay_url,
  };
}

/**
 * Upgrade registrasi dari paket Free → Premium (Webinar Advanced)
 * Membuat payment baru yang terhubung ke registrasi yang sudah ada.
 * Setelah terbayar, webhook otomatis set package=premium & status=quiz_unlocked.
 * @param {string} registrationId - ID registrasi yang sudah ada
 * @param {string} eventId        - ID event
 * @param {string} paymentMethod  - Kode metode bayar Tripay
 */
export async function createUpgradePayment(registrationId, eventId, paymentMethod = 'QRIS') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  const response = await supabase.functions.invoke('create-payment', {
    body: {
      event_id:                 eventId,
      package_type:             'premium',
      payment_method:           paymentMethod,
      is_upgrade:               true,
      existing_registration_id: registrationId,
    },
  });

  if (response.error) return { error: response.data?.error || response.error.message || 'Gagal membuat pembayaran upgrade' };
  const data = response.data;
  if (!data?.success) return { error: data?.error || 'Tripay menolak transaksi upgrade' };
  return { checkout_url: data.checkout_url, pay_url: data.pay_url, reference: data.reference };
}

/**
 * Daftar event gratis (Webinar Reguler) — dengan verifikasi IG
 * @param {string} eventId - ID event
 * @param {string} igUsername - Username Instagram untuk verifikasi
 * @returns {{ success } | { error }}
 */
export async function registerFreeEvent(eventId, igUsername) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  // Cek apakah sudah pernah registrasi
  const { data: existing } = await supabase
    .from('registrations')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('event_id', eventId)
    .maybeSingle();

  if (existing) return { error: 'Kamu sudah mendaftar event ini' };

  // Generate kode verifikasi unik
  const verifyCode = `LATIH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { error } = await supabase.from('registrations').insert({
    user_id:     session.user.id,
    event_id:    eventId,
    package:     'free',
    status:      'pending',
    ig_username: igUsername,
    verify_code: verifyCode,
  });

  if (error) return { error: error.message };
  return { success: true, verify_code: verifyCode };
}

/**
 * Daftar event GRATIS langsung tanpa verifikasi IG (Training/Webinar harga 0)
 * Status langsung menjadi 'paid' agar Zoom link langsung bisa diakses.
 */
export async function registerFreeDirectly(eventId) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  const { data: existing } = await supabase
    .from('registrations')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('event_id', eventId)
    .maybeSingle();

  if (existing) return { error: 'Kamu sudah mendaftar event ini' };

  const { error } = await supabase.from('registrations').insert({
    user_id:  session.user.id,
    event_id: eventId,
    package:  'free',
    status:   'paid',
  });

  if (error) return { error: error.message };
  return { success: true };
}

/**
 * Cek status registrasi user untuk sebuah event
 */
export async function getRegistrationStatus(eventId) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data } = await supabase
    .from('registrations')
    .select('id, status, package, verify_code, ig_verified, zoom_sent')
    .eq('user_id', session.user.id)
    .eq('event_id', eventId)
    .maybeSingle();

  if (!data) return null;

  // Jika pending, ambil tripay_reference dari payment terakhir agar bisa redirect ke halaman Tripay
  if (data.status === 'pending') {
    const { data: latestPay } = await supabase
      .from('payments')
      .select('tripay_reference, payment_method, created_at')
      .eq('registration_id', data.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    // Hitung apakah sudah expired (1 jam = 3.600.000 ms)
    const payCreatedAt = latestPay?.created_at ? new Date(latestPay.created_at).getTime() : null;
    const isExpired = payCreatedAt ? (Date.now() - payCreatedAt > 3600000) : false;

    return {
      ...data,
      tripay_reference:      latestPay?.tripay_reference || null,
      tripay_payment_method: latestPay?.payment_method || null,
      payment_created_at:    latestPay?.created_at || null,
      is_payment_expired:    isExpired,
    };
  }

  return data;
}

/**
 * [ADMIN ONLY] Daftar event gratis dengan akses Premium penuh
 * Digunakan admin untuk test flow sertifikat, kuis, dan konten tanpa bayar.
 * Status langsung 'paid' + package 'premium'.
 */
export async function adminRegisterFree(eventId) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  // Cek apakah sudah terdaftar
  const { data: existing } = await supabase
    .from('registrations')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('event_id', eventId)
    .maybeSingle();

  if (existing) return { error: 'Sudah terdaftar di event ini' };

  const { error } = await supabase.from('registrations').insert({
    user_id:  session.user.id,
    event_id: eventId,
    package:  'premium',
    status:   'paid',
  });

  if (error) return { error: error.message };
  return { success: true };
}

/**
 * Lanjutkan pembayaran yang pending (registrasi sudah ada, buat transaksi baru)
 * Digunakan ketika user sebelumnya sudah mulai bayar tapi belum selesai.
 */
export async function createResumePayment(registrationId, eventId, packageType, paymentMethod = 'QRIS') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'Belum login' };

  const response = await supabase.functions.invoke('create-payment', {
    body: {
      event_id:                 eventId,
      package_type:             packageType,
      payment_method:           paymentMethod,
      is_resume:                true,
      existing_registration_id: registrationId,
    },
  });

  if (response.error) return { error: response.data?.error || response.error.message || 'Gagal membuat pembayaran' };
  const data = response.data;
  if (!data?.success) return { error: data?.error || 'Tripay menolak transaksi ini' };
  return { checkout_url: data.checkout_url, reference: data.reference, pay_url: data.pay_url };
}
