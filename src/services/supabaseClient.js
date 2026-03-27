import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to check if the URL is a valid URL and not a placeholder
const isValidUrl = (url) => {
  try {
    return url && url.startsWith('http') && !url.includes('your-supabase-url');
  } catch {
    return false;
  }
};

let supabaseInstance = null;

if (isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseAnonKey.includes('your-supabase-key')) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
}

export const supabase = supabaseInstance;

if (!supabase) {
  console.warn("Supabase credentials missing or invalid. App will function in fallback mode using mock data.");
}

