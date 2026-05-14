/**
 * Normalize event data dari Supabase ke format yang digunakan
 * oleh DetailTrainingScreen & DetailWebinarScreen.
 *
 * Field Supabase:
 *   title, description, trainer, event_date, type, image_url,
 *   price_regular, price_premium, waktu, wa_link, is_featured,
 *   benefits, silabus, output_list, reasons, target_peserta  (text, newline-separated)
 *
 * Field yang dihasilkan (dipakai oleh detail screens):
 *   title, deskripsi, trainer, stats.tanggal, image, price, priceNum,
 *   pricePremium, waLink, isFeatured, kategori,
 *   benefits[], silabus[], output[], reasons[], targetPeserta[]
 */

const splitLines = (text) =>
  text ? text.split('\n').map(s => s.trim()).filter(Boolean) : [];

const formatPrice = (amount) => {
  if (!amount || amount === 0) return 'Gratis';
  return `Rp${(amount / 1000).toFixed(0)}k`;
};

const formatDate = (isoDate) => {
  if (!isoDate) return 'Segera Hadir';
  return new Date(isoDate).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
};

export function normalizeEvent(event) {
  if (!event) return null;

  const isAdvanced = event.type === 'webinar_advanced';
  const isReguler  = event.type === 'webinar_reguler';

  return {
    // ── identity ─────────────────────────────────
    id:            event.id,
    type:          event.type,

    // ── display ──────────────────────────────────
    title:         event.title,
    deskripsi:     event.description || '',
    trainer:       event.trainer     || '',
    sektor:        event.sektor      || '',
    image:         event.image_url   || null,
    waLink:        event.wa_link     || null,
    isFeatured:    event.is_featured || false,
    waktu:         event.waktu       || '09:00 – 11:00 WIB',

    // ── date ─────────────────────────────────────
    stats: {
      tanggal: formatDate(event.event_date),
    },

    // ── pricing ──────────────────────────────────
    price:           isReguler ? 'Gratis' : `Rp${((event.price_regular || 0) / 1000).toFixed(0)}k`,
    priceNum:        event.price_regular  || 0,
    priceFree:       'Rp 0',
    pricePremium:    formatPrice(event.price_premium),
    pricePremiumNum: event.price_premium  || 0,

    // Passthrough langsung agar semua screen bisa akses tanpa alias
    price_regular:   event.price_regular  ?? 0,
    price_premium:   event.price_premium  ?? 0,

    // ── webinar category ─────────────────────────
    kategori: isReguler ? 'reguler' : (isAdvanced ? 'advanced' : null),

    // ── content arrays (split newline) ───────────
    benefits:      splitLines(event.benefits),
    silabus:       splitLines(event.silabus),
    output:        splitLines(event.output_list),
    reasons:       splitLines(event.reasons),
    targetPeserta: splitLines(event.target_peserta),
    gallery:       splitLines(event.gallery_images),  // array of image URLs
  };
}
