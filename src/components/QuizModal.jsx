import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';
import {
  issueCertificate,
  generateCertPDF,
  downloadCertPDF,
  generateCertNumber,
} from '../services/certificateService';

const MAX_ATTEMPTS = 3;

// ── Style helpers ───────────────────────────────────────────────
const overlay = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000, padding: 16,
};
const card = {
  backgroundColor: 'white', borderRadius: 20, padding: 28,
  width: '100%', maxWidth: 520, maxHeight: '90vh',
  overflowY: 'auto', position: 'relative',
  boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
  fontFamily: "'Inter', sans-serif",
};
const btn = (bg, color = 'white') => ({
  display: 'block', width: '100%', padding: '14px 20px',
  backgroundColor: bg, color, border: 'none', borderRadius: 12,
  fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s',
});

export default function QuizModal({ event, registration, onClose, onComplete }) {
  const { user } = useUser();
  const questions      = event?.quiz_questions     || [];
  const passingScore   = event?.quiz_passing_score || 80;

  const [phase,       setPhase]       = useState('intro'); // intro | quiz | result
  const [current,     setCurrent]     = useState(0);
  const [answers,     setAnswers]     = useState(Array(questions.length).fill(null));
  const [attempts,    setAttempts]    = useState(registration?.quiz_attempts || 0);
  const [score,       setScore]       = useState(0);
  const [passed,      setPassed]      = useState(false);
  const [certData,    setCertData]    = useState(null);
  const [certSaveErr, setCertSaveErr] = useState('');  // error menyimpan cert ke DB
  const [submitting,  setSubmitting]  = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadErr, setDownloadErr] = useState('');

  const attemptsLeft = MAX_ATTEMPTS - attempts;
  const allAnswered  = answers.every(a => a !== null);

  // ── Start / Retry ───────────────────────────────────────────
  const handleStart = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setPhase('quiz');
  };

  // ── Pilih jawaban ──────────────────────────────────────────
  const handleAnswer = (optIdx) => {
    const next = [...answers];
    next[current] = optIdx;
    setAnswers(next);
  };

  // ── Submit kuis ─────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!allAnswered) return;
    setSubmitting(true);

    try {
      // Hitung skor
      const correct     = questions.filter((q, i) => answers[i] === q.correct).length;
      const pct         = Math.round((correct / questions.length) * 100);
      const newAttempts = attempts + 1;

      // Update attempts di DB (silent \u2014 kolom mungkin belum ada jika SQL belum dijalankan)
      try {
        await supabase
          .from('registrations')
          .update({ quiz_attempts: newAttempts })
          .eq('id', registration.id);
        setAttempts(newAttempts);
      } catch (e) {
        console.warn('[QuizModal] quiz_attempts update skipped:', e);
      }

      setScore(pct);
      const pass = pct >= passingScore;
      setPassed(pass);

      if (pass) {
        // Auto-terbitkan sertifikat
        const typeMap = {
          training:         'training',
          webinar_reguler:  'webinar_reguler',
          webinar_advanced: 'webinar_advanced',
        };
        const certType = typeMap[event.type] || 'webinar_reguler';

        try {
          const result = await issueCertificate({
            userId:         user.id,
            type:           certType,
            eventTitle:     event.title,
            holderName:     user?.name || null,
            registrationId: registration.id,
            eventDate:      event.event_date || null,
          });
          if (result?.data) {
            setCertData(result.data);
          } else if (result?.error) {
            // Cert tidak tersimpan di DB — kemungkinan masalah RLS
            console.error('[QuizModal] issueCertificate DB error:', result.error);
            setCertSaveErr(result.error);
          }
        } catch (e) {
          console.error('[QuizModal] issueCertificate error:', e);
          setCertSaveErr(e.message || 'Gagal menyimpan sertifikat ke database.');
        }

        // Update status ke completed
        try {
          await supabase
            .from('registrations')
            .update({ status: 'completed' })
            .eq('id', registration.id);
        } catch (e) {
          console.error('[QuizModal] status update error:', e);
        }

        // Refresh ProfilScreen di background (JANGAN await — tidak tutup modal)
        onComplete?.();
      }
    } catch (err) {
      console.error('[QuizModal] handleSubmit error:', err);
    } finally {
      // SELALU tampilkan halaman hasil
      setSubmitting(false);
      setPhase('result');
    }
  };

  // ── Download sertifikat ─────────────────────────────────────
  const handleDownload = async () => {
    setDownloading(true);
    setDownloadErr('');
    try {
      const typeMap = {
        training:         'training',
        webinar_reguler:  'webinar_reguler',
        webinar_advanced: 'webinar_advanced',
      };
      const certType = typeMap[event.type] || 'webinar_reguler';

      // 1. Gunakan certData yang sudah ada
      let cert = certData;

      // 2. Fallback: coba ambil dari DB jika certData kosong
      if (!cert) {
        const { data: dbCert } = await supabase
          .from('certificates')
          .select('*')
          .eq('registration_id', registration.id)
          .maybeSingle();
        if (dbCert) {
          cert = dbCert;
          setCertData(dbCert);
        }
      }

      // 3. Fallback akhir: generate nomor sertifikat lokal
      const certNumber = cert?.cert_number || generateCertNumber(certType);
      // Prioritas tanggal: tanggal pelaksanaan event → issued_at di DB → sekarang
      const issuedAt   = event.event_date || cert?.issued_at || new Date().toISOString();

      const curriculum = event.silabus
        ? event.silabus.split('\n').map(s => s.trim()).filter(Boolean)
        : undefined;

      const pdfBytes = await generateCertPDF({
        holderName: user?.name || 'Peserta',
        eventTitle: event.title,
        certNumber,
        type:       certType,
        issuedAt,
        curriculum,
      });
      downloadCertPDF(pdfBytes, certNumber);
    } catch (err) {
      console.error('[QuizModal] download error:', err);
      setDownloadErr('Gagal membuat PDF. Coba lagi atau hubungi admin.');
    } finally {
      setDownloading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────
  const q = questions[current];

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={card}>

        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8', lineHeight: 1 }}>×</button>

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#0F172A', marginBottom: 6 }}>Kuis Sertifikasi</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 24, lineHeight: 1.6 }}>
              {event.title}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
              {[
                { emoji: '❓', val: questions.length, label: 'Soal' },
                { emoji: '🎯', val: `${passingScore}%`, label: 'Nilai Lulus' },
                { emoji: '🔁', val: attemptsLeft, label: 'Sisa Percobaan' },
              ].map(({ emoji, val, label }) => (
                <div key={label} style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '14px 8px' }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 18, color: '#0F172A' }}>{val}</div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>{label}</div>
                </div>
              ))}
            </div>

            {attempts > 0 && (
              <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 10, padding: '10px 16px', fontSize: 12, color: '#92400E', marginBottom: 20 }}>
                ⚠️ Kamu sudah mencoba {attempts}x. Tersisa <strong>{attemptsLeft}x percobaan</strong>.
              </div>
            )}

            {attemptsLeft <= 0 ? (
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: 20, color: '#DC2626', fontSize: 13, fontWeight: 700 }}>
                ❌ Batas percobaan telah habis ({MAX_ATTEMPTS}x).<br/>
                <span style={{ fontSize: 11, fontWeight: 400, color: '#64748B', display: 'block', marginTop: 6 }}>
                  Hubungi admin untuk membuka kembali akses kuis.
                </span>
              </div>
            ) : (
              <button onClick={handleStart} style={btn('#0F172A')}>
                {attempts === 0 ? '🚀 Mulai Kuis' : '🔁 Coba Lagi'}
              </button>
            )}
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && q && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                <span>Soal {current + 1} dari {questions.length}</span>
                <span>{answers.filter(a => a !== null).length} terjawab</span>
              </div>
              <div style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', backgroundColor: '#0070F3', borderRadius: 99, width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
              </div>
            </div>

            {/* Pertanyaan */}
            <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A', lineHeight: 1.5, marginBottom: 20 }}>
              {q.question}
            </div>

            {/* Pilihan */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {q.options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    style={{
                      padding: '13px 16px', borderRadius: 12, textAlign: 'left',
                      border: selected ? '2px solid #0070F3' : '1.5px solid #E2E8F0',
                      backgroundColor: selected ? '#EFF6FF' : 'white',
                      color: selected ? '#0070F3' : '#0F172A',
                      fontSize: 14, fontWeight: selected ? 700 : 500,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontWeight: 800, marginRight: 8, color: selected ? '#0070F3' : '#94A3B8' }}>
                      {['A','B','C','D'][i]}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigasi */}
            <div style={{ display: 'flex', gap: 10 }}>
              {current > 0 && (
                <button
                  onClick={() => setCurrent(c => c - 1)}
                  style={{ ...btn('#F1F5F9', '#64748B'), flex: 1 }}
                >
                  ← Sebelumnya
                </button>
              )}
              {current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent(c => c + 1)}
                  style={{ ...btn('#0F172A'), flex: 2 }}
                >
                  Selanjutnya →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitting}
                  style={{ ...btn(allAnswered ? '#15803D' : '#94A3B8'), flex: 2 }}
                >
                  {submitting ? '⏳ Menghitung...' : !allAnswered ? 'Jawab semua soal dulu' : '✅ Submit Kuis'}
                </button>
              )}
            </div>

            {/* Soal navigator dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, flexWrap: 'wrap' }}>
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 28, height: 28, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                    backgroundColor: i === current ? '#0070F3' : answers[i] !== null ? '#D1FAE5' : '#F1F5F9',
                    color: i === current ? 'white' : answers[i] !== null ? '#15803D' : '#94A3B8',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>{passed ? '🎉' : '😔'}</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: '#0F172A', marginBottom: 8 }}>
              {passed ? 'Selamat, Kamu Lulus!' : 'Belum Lulus'}
            </div>

            {/* Skor */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 99, backgroundColor: passed ? '#F0FDF4' : '#FEF2F2', marginBottom: 24 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: passed ? '#15803D' : '#DC2626' }}>{score}%</span>
              <span style={{ fontSize: 12, color: passed ? '#15803D' : '#DC2626', fontWeight: 600 }}>
                {passed ? `≥ ${passingScore}% ✓` : `< ${passingScore}% lulus`}
              </span>
            </div>

            {passed ? (
              <>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>
                  {certSaveErr ? (
                    // Cert berhasil diunduh secara lokal tapi tidak tersimpan di DB
                    <>⚠️ Kuis lulus! Namun sertifikat <strong>belum tersimpan di sistem</strong> karena izin akses database.
                    Unduh sekarang, lalu minta admin untuk memeriksa.
                    </>
                  ) : (
                    <>Sertifikat kamu sudah siap! Klik tombol di bawah untuk mengunduhnya.<br />
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>Sertifikat juga tersedia di menu <strong>Sertifikat Saya</strong>.</span></>
                  )}
                </div>
                {certSaveErr && (
                  <div style={{ fontSize: 11, color: '#92400E', background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8, padding: '8px 12px', marginBottom: 16 }}>
                    🔒 Error DB: {certSaveErr}
                  </div>
                )}
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  style={{ ...btn(downloading ? '#94A3B8' : '#15803D'), marginBottom: 12 }}
                >
                  {downloading ? '⏳ Menyiapkan PDF...' : '⬇ Unduh Sertifikat'}
                </button>
                {downloadErr && (
                  <div style={{ fontSize: 12, color: '#DC2626', background: '#FEF2F2', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
                    ⚠️ {downloadErr}
                  </div>
                )}
                {/* Fasilitas Tambahan — tampil jika event punya extra_link */}
                {event?.extra_link && (
                  <a
                    href={event.extra_link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      width: '100%', padding: '12px 0',
                      background: '#F0FDF4', color: '#15803D',
                      border: '1.5px solid #86EFAC', borderRadius: 12,
                      fontSize: 14, fontWeight: 800, textDecoration: 'none',
                      marginBottom: 12, boxSizing: 'border-box',
                      transition: 'background 0.15s',
                    }}
                  >
                    📎 {event.extra_link_label || 'Fasilitas Tambahan'}
                  </a>
                )}
                <button onClick={onClose} style={{ ...btn('white', '#64748B'), border: '1px solid #E2E8F0' }}>
                  Tutup
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                  {attemptsLeft > 0
                    ? `Sisa ${attemptsLeft}x percobaan. Pelajari materi lagi sebelum mencoba ulang.`
                    : 'Batas percobaan habis. Hubungi admin untuk membuka kembali.'}
                </div>
                {attemptsLeft > 0 ? (
                  <button onClick={handleStart} style={{ ...btn('#0F172A'), marginBottom: 12 }}>
                    🔁 Coba Lagi ({attemptsLeft}x tersisa)
                  </button>
                ) : (
                  <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 16, fontSize: 13, color: '#DC2626', marginBottom: 12 }}>
                    ❌ Batas percobaan habis. Hubungi admin.
                  </div>
                )}
                <button onClick={onClose} style={{ ...btn('white', '#64748B'), border: '1px solid #E2E8F0' }}>
                  Tutup
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
