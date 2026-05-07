/**
 * useGuestLimit
 * Tracks guest (unauthenticated) access to microlearning modules.
 *
 * Rules:
 *  - Guest may freely browse KursusScreen and pick any ONE module (topic).
 *  - Once a topic is chosen, it becomes the locked "guest topic".
 *    Trying to enter a DIFFERENT topic triggers the gate.
 *  - Within the guest topic, the guest may pick any ONE lesson.
 *    Once chosen, it becomes the locked "guest lesson".
 *    Trying to enter a DIFFERENT lesson triggers the gate.
 *  - Within the guest lesson, only sub-lessons at positions 0, 1, 2
 *    (the first 3) are accessible. Positions 3+ trigger the gate.
 *
 * All state lives in localStorage so it survives page refreshes.
 * Keys: latih_guest_topicId, latih_guest_lessonId
 */

const KEY_TOPIC  = 'latih_guest_topicId';
const KEY_LESSON = 'latih_guest_lessonId';

export const GUEST_MAX_SUBLESSON = 3; // positions 0-2 are free

export function useGuestLimit() {
  // ── Readers ───────────────────────────────────────────────────────
  const getGuestTopic  = () => localStorage.getItem(KEY_TOPIC)  || null;
  const getGuestLesson = () => localStorage.getItem(KEY_LESSON) || null;

  // ── Can the guest enter this topic? ──────────────────────────────
  const canAccessTopic = (topicId) => {
    const locked = getGuestTopic();
    return !locked || locked === topicId;
  };

  // ── Can the guest enter this lesson (within the allowed topic)? ──
  const canAccessLesson = (lessonId) => {
    const locked = getGuestLesson();
    return !locked || locked === lessonId;
  };

  // ── Can the guest access a sub-lesson at a given position? ───────
  // subLessonIndex is 0-based, counting across ALL sub-lessons in
  // the entire topic (matches the flat list in TopicScreen).
  // BUT per the spec, the limit is per-lesson-position: only the
  // first GUEST_MAX_SUBLESSON sub-lessons of the chosen lesson.
  const canAccessSubLesson = (subLessonIndexInLesson) => {
    return subLessonIndexInLesson < GUEST_MAX_SUBLESSON;
  };

  // ── Record that the guest entered a topic ────────────────────────
  const recordTopicAccess = (topicId) => {
    if (!getGuestTopic()) {
      localStorage.setItem(KEY_TOPIC, topicId);
    }
  };

  // ── Record that the guest entered a lesson ───────────────────────
  const recordLessonAccess = (lessonId) => {
    if (!getGuestLesson()) {
      localStorage.setItem(KEY_LESSON, lessonId);
    }
  };

  // ── Reset (used if the guest registers/logs in) ──────────────────
  const resetGuest = () => {
    localStorage.removeItem(KEY_TOPIC);
    localStorage.removeItem(KEY_LESSON);
  };

  return {
    guestTopicId:  getGuestTopic(),
    guestLessonId: getGuestLesson(),
    canAccessTopic,
    canAccessLesson,
    canAccessSubLesson,
    recordTopicAccess,
    recordLessonAccess,
    resetGuest,
  };
}
