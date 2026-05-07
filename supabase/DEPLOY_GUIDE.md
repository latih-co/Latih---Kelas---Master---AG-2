# 🚀 Panduan Deploy Edge Functions + Konfigurasi Tripay

## A. Deploy Edge Functions ke Supabase

### Cara 1: Via Supabase Dashboard (Termudah)

1. Buka https://supabase.com/dashboard → project kamu
2. Klik **Edge Functions** (sidebar kiri)
3. Klik **"Create a new function"**
4. Buat 3 fungsi ini satu per satu:

| Nama Fungsi | File Source |
|---|---|
| `create-payment` | `supabase/functions/create-payment/index.ts` |
| `tripay-webhook` | `supabase/functions/tripay-webhook/index.ts` |
| `send-zoom-email` | `supabase/functions/send-zoom-email/index.ts` |

Untuk setiap fungsi: copy isi file → paste → Save → Deploy.

---

### Cara 2: Via CLI (Lebih Cepat)

```bash
# Login ke Supabase
npx supabase login

# Link ke project
npx supabase link --project-ref SUPABASE_PROJECT_REF_KAMU

# Deploy semua fungsi
npx supabase functions deploy create-payment
npx supabase functions deploy tripay-webhook
npx supabase functions deploy send-zoom-email
```

---

## B. Set Environment Variables / Secrets

Di Supabase Dashboard → **Settings** → **Edge Functions** → **Secrets**

Atau via CLI:

```bash
npx supabase secrets set TRIPAY_API_KEY=your_api_key_here
npx supabase secrets set TRIPAY_PRIVATE_KEY=your_private_key_here
npx supabase secrets set TRIPAY_MERCHANT_CODE=your_merchant_code_here
npx supabase secrets set TRIPAY_SANDBOX=true
npx supabase secrets set APP_URL=http://localhost:5173
npx supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

> ⚠️ Ganti `TRIPAY_SANDBOX=false` jika sudah production

---

## C. Konfigurasi Tripay Dashboard

1. Login ke https://tripay.co.id/member/merchant
2. Pilih merchant kamu
3. Set **Callback URL** (Webhook):\
   `https://SUPABASE_PROJECT_REF.supabase.co/functions/v1/tripay-webhook`
4. Set **Return URL**:\
   `https://latih.co` (atau domain production kamu)

---

## D. Credentials yang Kamu Butuhkan

| Service | Cara Dapat |
|---|---|
| Tripay API Key | Dashboard Tripay → API Key |
| Tripay Private Key | Dashboard Tripay → Merchant → Private Key |
| Tripay Merchant Code | Dashboard Tripay → Merchant Code |
| Resend API Key | https://resend.com → API Keys → Create |
| Supabase Project Ref | Dashboard Supabase → Settings → General |

---

## E. Test Alur Payment (Sandbox)

1. Buka app → pilgim Training/Webinar Advanced
2. Klik "Daftar & Bayar" → pilih paket → pilih metode bayar
3. Akan redirect ke halaman Tripay sandbox
4. Bayar dengan data test Tripay
5. Cek ProfilScreen → status harus berubah jadi "Terbayar"
6. Cek email → harus ada link Zoom

---

## F. Catatan Penting

- **Webinar Reguler** = GRATIS → verifikasi via DM Instagram @latih.co
- **Training** = BERBAYAR → Tripay
- **Webinar Advanced** = ada 2 paket: Free (Rp 0, join Zoom saja) + Premium (Rp 55k, dapat rekaman + sertifikat)
- Link Zoom dikirim otomatis via email (Resend) setelah payment dikonfirmasi
- Admin bisa **Tandai Hadir** → **Buka Kuis** dari AdminDashboard
