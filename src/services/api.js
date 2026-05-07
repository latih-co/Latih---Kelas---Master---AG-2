import { userProfile, userCertificates, userEnrolledClasses } from '../data/user';
import { recordsCatalog, recentRecordsSidebar } from '../data/records';
import { categories } from '../data/courses';
import { supabase } from '../lib/supabase';
import { normalizeEvent } from '../utils/normalizeEvent';

// Simulasi network delay (e.g. 800ms)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // User API
  getUserProfile: async () => {
    await delay(600);
    return userProfile;
  },
  getUserCertificates: async () => {
    await delay(700);
    return userCertificates;
  },
  getUserEnrolledClasses: async () => {
    await delay(800);
    return userEnrolledClasses;
  },

  // ── Webinar API (Supabase) ──────────────────────────────────────
  getWebinars: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .in('type', ['webinar_reguler', 'webinar_advanced'])
      .eq('is_active', true)
      .order('event_date', { ascending: true });

    if (error) { console.error('getWebinars:', error); return []; }
    return (data || []).map(normalizeEvent);
  },

  // ── Training API (Supabase) ─────────────────────────────────────
  getTrainings: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('type', 'training')
      .eq('is_active', true)
      .order('event_date', { ascending: true });

    if (error) { console.error('getTrainings:', error); return []; }
    return (data || []).map(normalizeEvent);
  },

  // Records API
  getRecordsCatalog: async () => {
    await delay(700);
    return recordsCatalog;
  },
  getRecentRecords: async () => {
    await delay(600);
    return recentRecordsSidebar;
  },

  // Courses API
  getCategories: async () => {
    await delay(500);
    return categories;
  }
};
