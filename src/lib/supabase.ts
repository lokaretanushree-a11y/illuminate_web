import { createClient } from '@supabase/supabase-js';

export type PaymentStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  payment_status: PaymentStatus;
  payment_reference: string | null;
  created_at?: string;
  updated_at?: string;
}

export type NewRegistrationPayload = {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  payment_status: 'pending';
};

/**
 * Format and sanitize the Supabase URL.
 * Ensures the full URL format: https://YOUR_PROJECT_ID.supabase.co
 */
function sanitizeSupabaseUrl(rawUrl: string | undefined): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();

  // If only project ID is given (e.g. "levoxmsoajqjnkbxccrm")
  if (/^[a-z0-9]{20}$/i.test(url)) {
    return `https://${url}.supabase.co`;
  }

  // If protocol is missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  // If URL has a typo like "https://project_id.co" missing ".supabase"
  const parsed = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const parts = parsed.split('.');
  if (parts.length === 2 && parts[1] === 'co' && parts[0].length === 20) {
    return `https://${parts[0]}.supabase.co`;
  }

  return url;
}

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseUrl = sanitizeSupabaseUrl(rawSupabaseUrl);
export const supabaseAnonKey =
  typeof rawSupabaseAnonKey === 'string' ? rawSupabaseAnonKey.trim() : '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.includes('.supabase.co') &&
    supabaseAnonKey.length > 20
);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Warning: Missing or invalid Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.'
  );
} else {
  console.log('[Supabase] Initialized with endpoint:', supabaseUrl);
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * Robust UUID generator compatible with modern browsers and fallbacks.
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
