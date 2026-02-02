/**
 * SMADAFESS - Supabase Client Configuration
 * Koneksi ke Supabase untuk penyimpanan data online
 */

import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = 'https://qqawxbgsctgmbvzahvhg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tBpDyj3DTwa7Zy1Tj0Qtng_qHKPJC4K';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
