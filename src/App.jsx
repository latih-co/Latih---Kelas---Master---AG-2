import { useState, useEffect } from "react";
import { categories }   from "./data/courses";
import { useUser }      from "./context/UserContext";
import { useIsMobile }  from "./utils/mobile";
import { normalizeEvent } from "./utils/normalizeEvent";
import { useGuestLimit } from "./hooks/useGuestLimit";
import SidebarLayout    from "./components/SidebarLayout";
import GuestGateModal   from "./components/GuestGateModal";
import BerandaScreen    from "./screens/BerandaScreen";
import KursusScreen     from "./screens/KursusScreen";
import TopicScreen      from "./screens/TopicScreen";
import LessonPlayer     from "./LessonPlayer";
import KelasSertifikasiScreen from "./screens/KelasSertifikasiScreen";
import DetailTrainingScreen   from "./screens/DetailTrainingScreen";
import WebinarScreen    from "./screens/WebinarScreen";
import DetailWebinarScreen from "./screens/DetailWebinarScreen";
import KatalogRekamanScreen from "./screens/KatalogRekamanScreen";
import DetailRekamanScreen from "./screens/DetailRekamanScreen";
import ProfilScreen     from "./screens/ProfilScreen";
import SertifikatScreen from "./screens/SertifikatScreen";
import CertPreviewScreen from "./screens/CertPreviewScreen";
import CertCoordCalibrator from "./screens/CertCoordCalibrator";
import LandingScreen    from "./screens/LandingScreen";
import LoginScreen      from "./screens/auth/LoginScreen";
import RegisterScreen   from "./screens/auth/RegisterScreen";
import TermsScreen      from "./screens/TermsScreen";
import PrivacyScreen    from "./screens/PrivacyScreen";
import AboutScreen      from "./screens/AboutScreen";
import ContactScreen    from "./screens/ContactScreen";
import NotFoundScreen   from "./screens/NotFoundScreen";
import AdminDashboard   from "./screens/admin/AdminDashboard";
import AdminEventForm   from "./screens/admin/AdminEventForm";
import CertVerifyScreen from "./screens/CertVerifyScreen";
import WelcomeScreen    from "./screens/WelcomeScreen";
import RincianPesananScreen from "./screens/RincianPesananScreen";

export default function App() {
  const [page, setPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const verifyCode = urlParams.get('verify');
    if (verifyCode) return 'cert_verify';
    // Detect return dari Tripay (?ref=LTC-xxx)
    const payRef = urlParams.get('ref');
    if (payRef && payRef.startsWith('LTC-')) return 'pesanan';
    return 'landing';
  });

  const [verifyCode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('verify') || '';
  });

  const [paymentRef] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref') || '';
  });
  
  const [activeTopic, setActiveTopic] = useState(() => {
    const savedId = localStorage.getItem("iso9001_topicId");
    if (!savedId) return null;
    return categories.flatMap(c => c.topics).find(t => t.id === savedId) || null;
  });

  const [activeSubLesson, setActiveSubLesson] = useState(() => {
    const savedId = localStorage.getItem("iso9001_subLessonId");
    if (!savedId) return null;
    const topic = categories.flatMap(c => c.topics).find(t => t.lessons?.some(l => l.subLessons?.some(s => s.id === savedId)));
    if (!topic) return null;
    for (const l of topic.lessons) {
      const sub = l.subLessons?.find(s => s.id === savedId);
      if (sub) return sub;
    }
    return null;
  });

  const { session, user, xp, streak, loading, addXp } = useUser();
  const guestLimit = useGuestLimit();
  const [showGuestGate, setShowGuestGate] = useState(false);
  const [guestGateReason, setGuestGateReason] = useState('sublesson');

  const [activeTraining, setActiveTraining] = useState(() => {
    try {
      const saved = localStorage.getItem("iso9001_training");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeWebinar, setActiveWebinar] = useState(() => {
    try {
      const saved = localStorage.getItem("iso9001_webinar");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeRecord, setActiveRecord] = useState(() => {
    try {
      const saved = localStorage.getItem("iso9001_record");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem("iso9001_completedQuizzes");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [activeAdminEvent, setActiveAdminEvent] = useState(null);

  // ── Last Studied state (survives goPage navigation clears) ────────────
  // Resolved topic & sublesson objects read from their own localStorage keys.
  // Only written when the user actually opens a lesson — never deleted.
  const resolveLastStudied = () => {
    const topicId     = localStorage.getItem("ls_topicId");
    const subLessonId = localStorage.getItem("ls_subLessonId");
    if (!topicId || !subLessonId) return { topic: null, subLesson: null };
    const allTopics = categories.flatMap(c => c.topics);
    const topic = allTopics.find(t => t.id === topicId) || null;
    if (!topic) return { topic: null, subLesson: null };
    for (const l of topic.lessons || []) {
      const sub = l.subLessons?.find(s => s.id === subLessonId);
      if (sub) return { topic, subLesson: sub };
    }
    return { topic: null, subLesson: null };
  };

  const [lastStudied, setLastStudied] = useState(resolveLastStudied);

  // Write lastStudied to its own localStorage keys whenever we enter a lesson
  useEffect(() => {
    if (page === "lesson" && activeTopic && activeSubLesson) {
      localStorage.setItem("ls_topicId",     activeTopic.id);
      localStorage.setItem("ls_subLessonId", activeSubLesson.id);
      setLastStudied({ topic: activeTopic, subLesson: activeSubLesson });
    }
  }, [page, activeTopic, activeSubLesson]);

  const isMobile = useIsMobile();

  // 'industrilearn_page' tidak perlu disimpan ke localStorage lagi
  // karena inisialisasi halaman sudah diatur langsung oleh logika session

  useEffect(() => { if (activeTopic) localStorage.setItem("iso9001_topicId", activeTopic.id); else localStorage.removeItem("iso9001_topicId"); }, [activeTopic]);
  useEffect(() => { if (activeSubLesson) localStorage.setItem("iso9001_subLessonId", activeSubLesson.id); else localStorage.removeItem("iso9001_subLessonId"); }, [activeSubLesson]);
  useEffect(() => { if (activeTraining) localStorage.setItem("iso9001_training", JSON.stringify(activeTraining)); else localStorage.removeItem("iso9001_training"); }, [activeTraining]);
  useEffect(() => { if (activeRecord) localStorage.setItem("iso9001_record", JSON.stringify(activeRecord)); else localStorage.removeItem("iso9001_record"); }, [activeRecord]);
  useEffect(() => { if (activeWebinar) localStorage.setItem("iso9001_webinar", JSON.stringify(activeWebinar)); else localStorage.removeItem("iso9001_webinar"); }, [activeWebinar]);
  useEffect(() => { localStorage.setItem("iso9001_completedQuizzes", JSON.stringify(completedQuizzes)); }, [completedQuizzes]);

  // ── Auto-redirect setelah login berhasil ──────────────────────────
  // Hanya redirect jika email sudah dikonfirmasi (bukan signup pending verification)
  useEffect(() => {
    if (session && session.user?.email_confirmed_at && ['login', 'register', 'landing'].includes(page)) {
      guestLimit.resetGuest();
      const isNewUser = !localStorage.getItem('latih_welcomed_' + session.user.id);
      if (isNewUser) {
        // ── Reset semua histori pembelajaran (fresh start untuk user baru) ──
        const LEARNING_KEYS = [
          'iso9001_topicId', 'iso9001_subLessonId',
          'iso9001_training', 'iso9001_record', 'iso9001_webinar',
          'iso9001_completedQuizzes',
          'ls_topicId', 'ls_subLessonId',
          'latih_streak', 'latih_last_active',
          'iso9001_guestTopicIds', 'iso9001_guestLessonId',
        ];
        LEARNING_KEYS.forEach(k => localStorage.removeItem(k));
        // Reset React state
        setActiveTopic(null);
        setActiveSubLesson(null);
        setActiveTraining(null);
        setActiveRecord(null);
        setActiveWebinar(null);
        setCompletedQuizzes({});
        setLastStudied({ topic: null, subLesson: null });
      }
      setPage(isNewUser ? 'welcome' : 'beranda');
    }
  }, [session]);

  const goPage      = (p) => { setPage(p); setActiveTopic(null); setActiveSubLesson(null); setActiveTraining(null); setActiveRecord(null); setActiveWebinar(null); };
  const goRecordDetail = (record) => { setActiveRecord(record); setPage("detail_rekaman"); };

  // Guest-aware topic navigation
  const goTopic = (t) => {
    if (!session && !guestLimit.canAccessTopic(t.id)) {
      setGuestGateReason('topic');
      setShowGuestGate(true);
      return;
    }
    if (!session) guestLimit.recordTopicAccess(t.id);
    setActiveTopic(t);
    setPage("topic");
  };

  // Guest-aware sub-lesson navigation
  // subLessonIndexInLesson: 0-based index within the parent lesson
  const goSubLesson = (sl, lessonId, subLessonIndexInLesson) => {
    if (!session) {
      // Check lesson lock
      if (!guestLimit.canAccessLesson(lessonId)) {
        setGuestGateReason('lesson');
        setShowGuestGate(true);
        return;
      }
      // Check position cap (first 3 only)
      if (!guestLimit.canAccessSubLesson(subLessonIndexInLesson)) {
        setGuestGateReason('sublesson');
        setShowGuestGate(true);
        return;
      }
      // Record lesson access on first entry
      guestLimit.recordLessonAccess(lessonId);
    }
    setActiveSubLesson(sl);
    setPage("lesson");
  };

  const goBack      = ()  => { setPage("topic"); setActiveSubLesson(null); };
  const goTrainingDetail = (training) => { 
    const normalized = ('price_regular' in training) ? normalizeEvent(training) : training;
    setActiveTraining(normalized); 
    setPage("detail_training"); 
  };
  const goWebinarDetail  = (webinar)  => { 
    const normalized = ('price_regular' in webinar) ? normalizeEvent(webinar) : webinar;
    setActiveWebinar(normalized);  
    setPage("detail_webinar"); 
  };

  const showNav    = page !== "lesson";
  const navPage    = page === "topic" ? "kursus" : (page === "detail_training" ? "kelas_sertifikasi" : (page === "detail_rekaman" ? "katalog_rekaman" : (page === "detail_webinar" ? "webinar" : page)));

  // Legacy: compat shim so callers that pass only (sl) still work
  const goSubLessonCompat = (sl) => goSubLesson(sl, null, 0);

  const goToNextSubLesson = () => {
    let foundCurrent = false;
    let nextSl = null;
    if (activeTopic && activeTopic.lessons) {
      for (const lesson of activeTopic.lessons) {
        for (const sub of lesson.subLessons || []) {
          if (foundCurrent) {
            nextSl = sub;
            break;
          }
          if (sub.id === activeSubLesson.id) {
            foundCurrent = true;
          }
        }
        if (nextSl) break;
      }
    }
    
    if (nextSl) {
      setActiveSubLesson(nextSl);
      setPage("lesson");
    } else {
      goBack(); // Jika sudah habis, kembali ke layar topic
    }
  };

  const renderContent = () => {
    // ── Halaman publik (tidak butuh login) ─────────────────────
  const PUBLIC_PAGES = ['landing', 'login', 'register', 'terms', 'privacy', 'about', 'contact', 'detail_training', 'detail_webinar', 'kursus', 'topic', 'cert_verify', 'cert_preview', 'cert_calibrator'];
    if (!session && !PUBLIC_PAGES.includes(page)) {
      return <LoginScreen onNavigate={goPage} />;
    }

    switch (page) {
      case "login":
        return <LoginScreen onNavigate={(p) => {
          if (p === 'beranda') goPage('beranda');
          else goPage(p);
        }} />;
      case "register":
        return <RegisterScreen onNavigate={goPage} />;
      case "terms":
        return <TermsScreen onBack={() => goPage("landing")} />;
      case "privacy":
        return <PrivacyScreen onBack={() => goPage("landing")} />;
      case "about":
        return <AboutScreen onBack={() => goPage("landing")} onNavigate={goPage} />;
      case "contact":
        return <ContactScreen onBack={() => goPage("landing")} onNavigate={goPage} />;
      case "landing":
        return <LandingScreen
          onNavigate={goPage}
          onTrainingDetail={goTrainingDetail}
          onWebinarDetail={goWebinarDetail}
        />;
      case "beranda":
        return (
          <BerandaScreen
            completedQuizzes={completedQuizzes}
            onSelectLesson={(sl) => {
              const topic = categories
                .flatMap(c => c.topics)
                .find(t => t.lessons?.some(l => l.subLessons?.some(s => s.id === sl.id)));
              if (topic) { setActiveTopic(topic); setActiveSubLesson(sl); setPage("lesson"); }
            }}
            onGoToCourses={() => goPage('kursus')}
            lastStudiedTopic={lastStudied.topic}
            lastStudiedSubLesson={lastStudied.subLesson}
            userName={user?.name}
            streak={streak}
            xp={xp}
          />
        );
      case "cert_verify":
        return <CertVerifyScreen initialCode={verifyCode} onNavigate={goPage} />;
      case "kursus":
        return <KursusScreen onSelectTopic={goTopic} />;
      case "topic":
        return activeTopic ? (
          <TopicScreen
            topic={activeTopic}
            onSelectSubLesson={(sl, lessonId, slIdxInLesson) =>
              goSubLesson(sl, lessonId, slIdxInLesson)
            }
            onBack={() => session ? goPage("kursus") : goPage("kursus")}
            completedQuizzes={completedQuizzes}
            isGuest={!session}
            guestLessonId={guestLimit.guestLessonId}
          />
        ) : null;
      case "kelas_sertifikasi":
        return <KelasSertifikasiScreen onSelectTraining={goTrainingDetail} />;
      case "detail_training":
        return activeTraining ? (
          <DetailTrainingScreen
            training={activeTraining}
            onBack={() => session ? setPage("kelas_sertifikasi") : setPage("landing")}
            onNavigate={goPage}
            isGuest={!session}
          />
        ) : null;
      case "webinar":
        return <WebinarScreen onSelectWebinar={goWebinarDetail} />;
      case "detail_webinar":
        return activeWebinar ? (
          <DetailWebinarScreen
            webinar={activeWebinar}
            onBack={() => session ? setPage("webinar") : setPage("landing")}
            onNavigate={goPage}
            isGuest={!session}
          />
        ) : null;
      case "katalog_rekaman":
        return <KatalogRekamanScreen onSelectRecord={goRecordDetail} />;
      case "detail_rekaman":
        return activeRecord ? (
          <DetailRekamanScreen 
            record={activeRecord} 
            onBack={() => setPage("katalog_rekaman")} 
          />
        ) : null;
      case "profil":
        return <ProfilScreen onNavigate={goPage} />;
      case "sertifikat":
        return <SertifikatScreen onNavigate={goPage} />;
      case "cert_preview":
        return <CertPreviewScreen onNavigate={goPage} />;
      case "cert_calibrator":
        return <CertCoordCalibrator onNavigate={goPage} />;
      case "admin":
        return <AdminDashboard onNavigate={(p, data) => { if (p === 'admin_edit_event') setActiveAdminEvent(data); goPage(p); }} />;
      case "admin_new_event":
        return <AdminEventForm onNavigate={goPage} />;
      case "admin_edit_event":
        return <AdminEventForm onNavigate={goPage} existingEvent={activeAdminEvent} />;
      case "pesanan":
        return <RincianPesananScreen paymentRef={paymentRef} onNavigate={goPage} />;
      case "welcome":
        return (
          <WelcomeScreen
            userName={user?.name}
            onChoose={(dest) => {
              // Tandai user sudah melihat welcome screen
              if (session?.user?.id) {
                localStorage.setItem('latih_welcomed_' + session.user.id, '1');
              }
              goPage(dest === 'beranda' ? 'beranda' : dest);
            }}
          />
        );
      default:
        return <NotFoundScreen onGoHome={() => goPage("beranda")} />;
    }
  };

  // Lesson player takes full screen
  if (page === "lesson" && activeSubLesson) {
    return (
      <>
        <LessonPlayer
          key={activeSubLesson.id}
          lesson={activeSubLesson}
          onFinish={goBack}
          onNextLesson={goToNextSubLesson}
          onLessonComplete={(lessonId, score, maxScore) => {
            setCompletedQuizzes(prev => {
              if (!prev[lessonId]) {
                addXp(20);
                return { ...prev, [lessonId]: true };
              }
              return prev;
            });
          }}
        />
        {showGuestGate && (
          <GuestGateModal
            reason={guestGateReason}
            onRegister={() => { setShowGuestGate(false); goPage('register'); }}
            onLogin={() => { setShowGuestGate(false); goPage('login'); }}
            onClose={() => setShowGuestGate(false)}
          />
        )}
      </>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter', color: 'var(--c-muted)', fontSize: 13 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
          <div>Memuat Aplikasi...</div>
        </div>
      </div>
    );
  }

  // Khusus untuk landing, legal, auth, & admin pages → render full tanpa SidebarLayout
  const FULL_SCREEN_PAGES = ['landing', 'terms', 'privacy', 'about', 'contact', 'login', 'register', 'admin', 'admin_new_event', 'admin_edit_event', 'cert_preview', 'cert_calibrator', 'cert_verify', 'welcome', 'pesanan'];
  if (FULL_SCREEN_PAGES.includes(page)) {
    return (
      <>
        {renderContent()}
        {showGuestGate && (
          <GuestGateModal
            reason={guestGateReason}
            onRegister={() => { setShowGuestGate(false); goPage('register'); }}
            onLogin={() => { setShowGuestGate(false); goPage('login'); }}
            onClose={() => setShowGuestGate(false)}
          />
        )}
      </>
    );
  }

  // Regular layout wrapped in Sidebar
  return (
    <SidebarLayout 
      activePage={navPage} 
      onNavigate={goPage}
      user={{ name: user?.name || "User", role: user?.role || "Role", xp: xp }}
    >
      {renderContent()}
      {showGuestGate && (
        <GuestGateModal
          reason={guestGateReason}
          onRegister={() => { setShowGuestGate(false); goPage('register'); }}
          onLogin={() => { setShowGuestGate(false); goPage('login'); }}
          onClose={() => setShowGuestGate(false)}
        />
      )}
    </SidebarLayout>
  );
}
