import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://duvextmdokvbwbirzpua.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_9QHODrht1B-ZDx_uieJaKQ_bcAlFWB6';

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createSupabaseClient(url, anonKey);
}

