import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../context/UserContext';
import LogoWarna from '../../assets/Logo Latih Warna.png';

const EVENT_TYPES = [
  { value: 'training',           label: '🏭 Training' },
  { value: 'webinar_reguler',    label: '🎁 Webinar Reguler (Gratis)' },
  { value: 'webinar_advanced',   label: '⭐ Webinar Advanced' },
];

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #F1F5F9' }}>{children}</div>;
}

const inputStyle = {
  padding: '11px 14px', borderRadius: 10, border: '1px solid #E2E8F0',
  fontSize: 14, color: '#0F172A', outline: 'none', transition: 'border 0.2s',
  fontFamily: "'Inter', sans-serif", width: '100%', boxSizing: 'border-box',
  backgroundColor: 'white',
};
const taStyle = { ...inputStyle, resize: 'vertical', lineHeight: 1.6 };

export default function AdminEventForm({ onNavigate, existingEvent }) {
  const { user } = useUser();
  const isEdit = !!existingEvent;

  const [form, setForm] = useState({
    // ── Jenis & Status ──
    type:             existingEvent?.type          || 'training',
    is_active:        existingEvent?.is_active     ?? true,
    is_featured:      existingEvent?.is_featured   ?? false,

    // ── Info Dasar ──
    title:            existingEvent?.title         || '',
    description:      existingEvent?.description   || '',
    sektor:           existingEvent?.sektor        || '',
    trainer:          existingEvent?.trainer       || '',
    image_url:        existingEvent?.image_url     || '',

    // ── Jadwal ──
    event_date:       existingEvent?.event_date    ? existingEvent.event_date.slice(0, 16) : '',
    waktu:            existingEvent?.waktu         || '',
    max_participants: existingEvent?.max_participants || '',
    zoom_link:        existingEvent?.zoom_link     || '',
    wa_link:          existingEvent?.wa_link       || '',

    // ── Harga ──
    price_regular:    existingEvent?.price_regular ?? 0,
    price_premium:    existingEvent?.price_premium ?? 0,

    // ── Konten Detail (satu baris = satu item) ──
    benefits:         existingEvent?.benefits       || '',
    silabus:          existingEvent?.silabus        || '',
    output_list:      existingEvent?.output_list    || '',
    reasons:          existingEvent?.reasons        || '',
    target_peserta:   existingEvent?.target_peserta || '',
    // ── Galeri (training saja, satu baris = satu URL) ──
    gallery_images:   existingEvent?.gallery_images || '',
    // ── Fasilitas Tambahan ──
    extra_link:       existingEvent?.extra_link      || '',
    extra_link_label: existingEvent?.extra_link_label || '',
  });

  // ── State Kuis ───────────────────────────────────────────────
  const [quizQuestions, setQuizQuestions] = useState(
    existingEvent?.quiz_questions || []
  );
  const [passingScore, setPassingScore] = useState(
    existingEvent?.quiz_passing_score ?? 80
  );

  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { if (user && user.role !== 'admin') onNavigate('beranda'); }, [user]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Judul event wajib diisi.'); return; }
    if (!form.type)          { setError('Pilih jenis event.'); return; }
    setSaving(true); setError(''); setSuccess('');

    const payload = {
      ...form,
      event_date:          form.event_date       || null,
      zoom_link:           form.zoom_link        || null,
      wa_link:             form.wa_link          || null,
      image_url:           form.image_url        || null,
      waktu:               form.waktu            || null,
      gallery_images:      form.gallery_images   || null,
      extra_link:          form.extra_link       || null,
      extra_link_label:    form.extra_link_label || null,
      price_regular:       Number(form.price_regular) || 0,
      price_premium:       Number(form.price_premium) || 0,
      max_participants:    form.max_participants ? Number(form.max_participants) : null,
      quiz_questions:      quizQuestions,
      quiz_passing_score:  Number(passingScore) || 80,
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from('events').update(payload).eq('id', existingEvent.id));
    } else {
      ({ error } = await supabase.from('events').insert(payload));
    }

    setSaving(false);
    if (error) { setError(error.message); return; }
    setSuccess(isEdit ? 'Event berhasil diperbarui!' : 'Event berhasil dibuat!');
    setTimeout(() => onNavigate('admin'), 1200);
  };

  const handleDelete = async () => {
    if (!confirm('Hapus event ini? Registrasi terkait juga akan terhapus.')) return;
    await supabase.from('events').delete().eq('id', existingEvent.id);
    onNavigate('admin');
  };

  const isWebinarReg = form.type === 'webinar_reguler';
  const isAdvanced   = form.type === 'webinar_advanced';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}>

      {/* Top Bar */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #EAF0F6', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onNavigate('admin')} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}>←</button>
          <div style={{ width: 1, height: 20, backgroundColor: '#E2E8F0' }} />
          <img src={LogoWarna} alt="Latih" style={{ height: 26, objectFit: 'contain' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', background: '#F1F5F9', padding: '3px 10px', borderRadius: 6, letterSpacing: '0.03em' }}>Admin</span>
          <div style={{ width: 1, height: 20, backgroundColor: '#E2E8F0' }} />
          <span style={{ fontWeight: 800, color: '#0F172A', fontSize: 14 }}>{isEdit ? 'Edit Event' : 'Buat Event Baru'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {isEdit && (
            <button onClick={handleDelete} style={{ fontSize: 12, fontWeight: 700, color: '#EF4444', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}>
              🗑 Hapus
            </button>
          )}
          <button onClick={handleSave} disabled={saving} style={{ fontSize: 13, fontWeight: 800, color: 'white', background: saving ? '#94A3B8' : '#0F172A', border: 'none', borderRadius: 10, padding: '8px 20px', cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? '⏳ Menyimpan...' : isEdit ? '💾 Simpan' : '＋ Buat Event'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 24px 80px' }}>
        {error   && <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#DC2626', marginBottom: 20 }}>⚠️ {error}</div>}
        {success && <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#15803D', marginBottom: 20 }}>✅ {success}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ── 1. Jenis Event ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24 }}>
            <SectionTitle>Jenis Event</SectionTitle>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {EVENT_TYPES.map(t => (
                <button key={t.value} type="button" onClick={() => set('type', t.value)} style={{
                  padding: '10px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  border: form.type === t.value ? '2px solid #0F172A' : '1px solid #E2E8F0',
                  backgroundColor: form.type === t.value ? '#0F172A' : 'white',
                  color: form.type === t.value ? 'white' : '#64748B',
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── 2. Informasi Dasar ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionTitle>Informasi Dasar</SectionTitle>

            <Field label="JUDUL EVENT *">
              <input value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="Contoh: Regulatory Affairs in Cosmetic Industry" style={inputStyle} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="TRAINER / NARASUMBER">
                <input value={form.trainer} onChange={e => set('trainer', e.target.value)}
                  placeholder="Nama + gelar / jabatan" style={inputStyle} />
              </Field>
              <Field label="SEKTOR INDUSTRI">
                <input value={form.sektor} onChange={e => set('sektor', e.target.value)}
                  placeholder="Kosmetik, Farmasi, Alkes, dll" style={inputStyle} />
              </Field>
            </div>

            <Field label="DESKRIPSI PROGRAM" hint="Paragraf penjelasan lengkap tentang event ini">
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                rows={5} placeholder="Jelaskan latar belakang, tujuan, dan keunggulan program ini..." style={taStyle} />
            </Field>

            <Field label="URL GAMBAR / COVER EVENT" hint="Gunakan path file dari folder /public atau URL eksternal">
              <input value={form.image_url} onChange={e => set('image_url', e.target.value)}
                placeholder="/Nama-File.webp atau https://..." style={inputStyle} />
            </Field>

            {/* Featured toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: 10, border: '1px solid #EAF0F6' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Tandai sebagai Batch Terbaru ⭐</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Tampil dengan badge "BATCH TERBARU" di halaman detail</div>
              </div>
              <button type="button" onClick={() => set('is_featured', !form.is_featured)} style={{ width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', backgroundColor: form.is_featured ? '#0F172A' : '#CBD5E1', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: 3, left: form.is_featured ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
          </div>

          {/* ── 3. Jadwal & Kontak ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionTitle>Jadwal & Kontak</SectionTitle>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="TANGGAL PELAKSANAAN">
                <input type="datetime-local" value={form.event_date} onChange={e => set('event_date', e.target.value)} style={inputStyle} />
              </Field>
              <Field label="WAKTU" hint="Contoh: 09:00 – 11:00 WIB">
                <input value={form.waktu} onChange={e => set('waktu', e.target.value)}
                  placeholder="09:00 – 11:00 WIB" style={inputStyle} />
              </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="MAKS. PESERTA" hint="Kosongkan = tidak terbatas">
                <input type="number" value={form.max_participants} onChange={e => set('max_participants', e.target.value)}
                  placeholder="30" style={inputStyle} />
              </Field>
              <Field label="LINK WHATSAPP" hint="Untuk tombol 'Tanya via WhatsApp'">
                <input value={form.wa_link} onChange={e => set('wa_link', e.target.value)}
                  placeholder="https://wa.me/628..." style={inputStyle} />
              </Field>
            </div>

            <Field label="LINK ZOOM" hint="Ditampilkan di Profil peserta setelah daftar/bayar">
              <input value={form.zoom_link} onChange={e => set('zoom_link', e.target.value)}
                placeholder="https://us02web.zoom.us/j/..." style={inputStyle} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <Field label="LINK FASILITAS TAMBAHAN" hint="Contoh: link grup WA, Google Drive, e-book, dsb">
                <input value={form.extra_link} onChange={e => set('extra_link', e.target.value)}
                  placeholder="https://drive.google.com/..." style={inputStyle} />
              </Field>
              <Field label="LABEL TOMBOL" hint="Teks tombol yang ditampilkan ke peserta">
                <input value={form.extra_link_label} onChange={e => set('extra_link_label', e.target.value)}
                  placeholder="📂 Materi" style={inputStyle} />
              </Field>
            </div>
          </div>

          {/* ── 4. Harga ── */}
          {!isWebinarReg && (
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SectionTitle>Harga</SectionTitle>
              {isAdvanced ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="HARGA PAKET FREE (Rp)" hint="Isi 0 jika free">
                    <input type="number" value={form.price_regular} onChange={e => set('price_regular', e.target.value)} placeholder="0" style={inputStyle} />
                  </Field>
                  <Field label="HARGA PAKET PREMIUM (Rp)">
                    <input type="number" value={form.price_premium} onChange={e => set('price_premium', e.target.value)} placeholder="55000" style={inputStyle} />
                  </Field>
                </div>
              ) : (
                <Field label="HARGA REGISTRASI (Rp)">
                  <input type="number" value={form.price_regular} onChange={e => set('price_regular', e.target.value)} placeholder="155000" style={inputStyle} />
                </Field>
              )}
            </div>
          )}

          {/* ── 5. Konten Detail ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionTitle>Konten Halaman Detail</SectionTitle>
            <div style={{ fontSize: 12, color: '#94A3B8', backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: 8, marginBottom: 4 }}>
              💡 Setiap baris = satu item. Tekan Enter untuk item berikutnya.
            </div>

            <Field label="BENEFIT / YANG DIDAPAT PESERTA" hint="Contoh: e-Sertifikat\nFile materi\nRecording">
              <textarea value={form.benefits} onChange={e => set('benefits', e.target.value)}
                rows={5} placeholder={"e-Sertifikat\nFile materi\nRecording\nLive Class dan QnA bersama Profesional\nDoorprize"} style={taStyle} />
            </Field>

            <Field label="UNTUK SIAPA (TARGET PESERTA)" hint="Contoh: Staf QA / Quality Control\nRegulatoy Affairs Officer">
              <textarea value={form.target_peserta} onChange={e => set('target_peserta', e.target.value)}
                rows={4} placeholder={"Staf Regulatory Affairs\nProdusen kosmetik lokal\nFresh Graduate yang ingin berkarir di industri"} style={taStyle} />
            </Field>

            <Field label="ALASAN WAJIB IKUT" hint="Poin-poin mengapa peserta harus mendaftar event ini">
              <textarea value={form.reasons} onChange={e => set('reasons', e.target.value)}
                rows={4} placeholder={"Memastikan produk memenuhi regulasi yang berlaku\nMenghindari risiko penolakan dan sanksi hukum\nMempercepat proses perizinan secara mandiri"} style={taStyle} />
            </Field>

            <Field label="KURIKULUM / SILABUS" hint="Urutan materi yang akan diajarkan">
              <textarea value={form.silabus} onChange={e => set('silabus', e.target.value)}
                rows={4} placeholder={"Regulatory Framework\nSistem Notifikasi & Perizinan\nPersyaratan Teknis Bahan\nDokumen Informasi Produk (DIP)"} style={taStyle} />
            </Field>

            <Field label="TARGET OUTPUT / KOMPETENSI KELULUSAN" hint="Kemampuan yang dimiliki peserta setelah mengikuti event">
              <textarea value={form.output_list} onChange={e => set('output_list', e.target.value)}
                rows={4} placeholder={"Memahami kerangka regulasi secara komprehensif\nMampu melakukan notifikasi secara mandiri\nSiap menyusun strategi regulatory yang efektif"} style={taStyle} />
            </Field>

            {/* Galeri — hanya untuk Training */}
            {form.type === 'training' && (
              <Field
                label="GALERI BATCH SEBELUMNYA"
                hint="Satu baris = satu URL gambar. Kosongkan jika tidak ada. Contoh: /foto-batch1.webp"
              >
                <textarea
                  value={form.gallery_images}
                  onChange={e => set('gallery_images', e.target.value)}
                  rows={4}
                  placeholder={"/foto-batch1.webp\n/foto-batch2.webp\nhttps://..."}
                  style={taStyle}
                />
                {/* Preview URL yang sudah diisi */}
                {form.gallery_images && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                    {form.gallery_images.split('\n').map(s => s.trim()).filter(Boolean).map((url, i) => (
                      <div key={i} style={{ position: 'relative', width: 72, height: 72 }}>
                        <img
                          src={url}
                          alt={`Galeri ${i + 1}`}
                          style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}
                          onError={e => { e.target.style.opacity = 0.3; }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            )}
          </div>

          {/* ── 5b. Kuis Sertifikasi ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SectionTitle>🎯 Kuis Sertifikasi <span style={{ fontSize: 12, fontWeight: 400, color: '#94A3B8' }}>(opsional — jika diisi, peserta harus lulus kuis untuk mendapat sertifikat)</span></SectionTitle>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.5)', letterSpacing: '0.05em' }}>NILAI LULUS (%)</label>
              <input
                type="number" min={50} max={100} value={passingScore}
                onChange={e => setPassingScore(e.target.value)}
                style={{ ...inputStyle, width: 80 }}
              />
            </div>

            {quizQuestions.map((q, qi) => (
              <div key={q.id} style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: 16, backgroundColor: '#F8FAFC' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>Soal {qi + 1}</span>
                  <button
                    type="button"
                    onClick={() => setQuizQuestions(qs => qs.filter((_, i) => i !== qi))}
                    style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', background: '#FEF2F2', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
                  >🗑 Hapus</button>
                </div>
                <textarea
                  value={q.question}
                  onChange={e => setQuizQuestions(qs => qs.map((x, i) => i === qi ? { ...x, question: e.target.value } : x))}
                  placeholder="Tulis pertanyaan di sini..."
                  rows={2}
                  style={{ ...taStyle, marginBottom: 10 }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {q.options.map((opt, oi) => (
                    <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="radio"
                        name={`correct_${qi}`}
                        checked={q.correct === oi}
                        onChange={() => setQuizQuestions(qs => qs.map((x, i) => i === qi ? { ...x, correct: oi } : x))}
                        style={{ cursor: 'pointer', accentColor: '#0070F3' }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', width: 20 }}>{['A','B','C','D'][oi]}.</span>
                      <input
                        value={opt}
                        onChange={e => setQuizQuestions(qs => qs.map((x, i) => {
                          if (i !== qi) return x;
                          const opts = [...x.options];
                          opts[oi] = e.target.value;
                          return { ...x, options: opts };
                        }))}
                        placeholder={`Pilihan ${['A','B','C','D'][oi]}`}
                        style={{ ...inputStyle, flex: 1, padding: '8px 12px', fontSize: 13 }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>🟢 Pilihan benar: <strong>{['A','B','C','D'][q.correct] || '—'}</strong></div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setQuizQuestions(qs => [...qs, {
                id: Date.now(),
                question: '',
                options: ['', '', '', ''],
                correct: 0,
              }])}
              style={{ padding: '11px 16px', borderRadius: 10, border: '1.5px dashed #CBD5E1', backgroundColor: 'white', color: '#64748B', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              ＋ Tambah Soal
            </button>
          </div>

          {/* ── 6. Status ── */}
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #EAF0F6', padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: 14 }}>Status Event</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Event nonaktif tidak tampil di landing page & halaman user</div>
              </div>
              <button type="button" onClick={() => set('is_active', !form.is_active)} style={{ width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', backgroundColor: form.is_active ? '#22C55E' : '#CBD5E1', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: 3, left: form.is_active ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
            <div style={{ marginTop: 12, display: 'inline-block', padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700, backgroundColor: form.is_active ? '#F0FDF4' : '#F8FAFC', color: form.is_active ? '#15803D' : '#94A3B8', border: `1px solid ${form.is_active ? '#86EFAC' : '#E2E8F0'}` }}>
              {form.is_active ? '● Aktif — tampil di platform' : '○ Nonaktif — disembunyikan'}
            </div>
          </div>

        </div>

        {/* ── Bottom CTA ── */}
        <div style={{
          marginTop: 32, padding: '24px 28px',
          backgroundColor: 'white', borderRadius: 16,
          border: '1px solid #EAF0F6',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.04)',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 16px', fontSize: 13, color: '#DC2626' }}>⚠️ {error}</div>
          )}
          {success && (
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10, padding: '10px 16px', fontSize: 13, color: '#15803D' }}>✅ {success}</div>
          )}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={handleSave} disabled={saving}
              style={{
                flex: 1, padding: '16px 24px',
                background: saving ? '#94A3B8' : '#0F172A',
                color: 'white', border: 'none', borderRadius: 12,
                fontSize: 16, fontWeight: 800,
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {saving ? '⏳ Menyimpan...' : isEdit ? '💾 Simpan Perubahan' : '＋ Buat Event Sekarang'}
            </button>
            {isEdit && (
              <button
                onClick={handleDelete}
                style={{ padding: '16px 20px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                🗑 Hapus
              </button>
            )}
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8' }}>
            Event akan langsung tampil di landing page dan aplikasi setelah disimpan (jika status Aktif)
          </div>
        </div>

      </div>
    </div>
  );
}
