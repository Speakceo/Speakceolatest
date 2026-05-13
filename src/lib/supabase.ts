import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

function looksPlaceholder(url: string, key: string): boolean {
  if (!url || !key) return true;
  if (/your_supabase|placeholder|changeme/i.test(url) || /your_supabase|placeholder|changeme/i.test(key)) return true;
  return false;
}

/** Browser-safe key only: legacy JWT anon (`eyJ…`) or new publishable (`sb_publishable_…`). Never `sb_secret_`. */
function isValidBrowserSupabaseKey(key: string): boolean {
  if (key.startsWith('sb_secret_')) return false;
  if (key.startsWith('sb_publishable_')) return key.length >= 20;
  if (key.startsWith('eyJ')) return key.length >= 80;
  return key.length >= 80;
}

export function isSupabaseConfigured(): boolean {
  if (!rawUrl || !rawKey) return false;
  if (looksPlaceholder(rawUrl, rawKey)) return false;
  if (!rawUrl.startsWith('https://')) return false;
  if (rawKey.startsWith('sb_secret_')) {
    console.error(
      'Supabase: VITE_SUPABASE_ANON_KEY must be the publishable/anon key, not sb_secret_. Use sb_publishable_… or the JWT anon key from the dashboard.'
    );
    return false;
  }
  if (!isValidBrowserSupabaseKey(rawKey)) return false;
  return true;
}

const configured = isSupabaseConfigured();

if (configured) {
  console.log('Supabase: online (URL configured)');
} else {
  console.log('Supabase: offline stub — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

// --- Offline stub (chainable query builder; no network) ---
const createQueryBuilder = () => ({
  select: () => createQueryBuilder(),
  insert: () => createQueryBuilder(),
  update: () => createQueryBuilder(),
  upsert: () => createQueryBuilder(),
  delete: () => createQueryBuilder(),
  eq: () => createQueryBuilder(),
  neq: () => createQueryBuilder(),
  gt: () => createQueryBuilder(),
  gte: () => createQueryBuilder(),
  lt: () => createQueryBuilder(),
  lte: () => createQueryBuilder(),
  like: () => createQueryBuilder(),
  ilike: () => createQueryBuilder(),
  is: () => createQueryBuilder(),
  in: () => createQueryBuilder(),
  contains: () => createQueryBuilder(),
  containedBy: () => createQueryBuilder(),
  rangeGt: () => createQueryBuilder(),
  rangeGte: () => createQueryBuilder(),
  rangeLt: () => createQueryBuilder(),
  rangeLte: () => createQueryBuilder(),
  rangeAdjacent: () => createQueryBuilder(),
  overlaps: () => createQueryBuilder(),
  textSearch: () => createQueryBuilder(),
  match: () => createQueryBuilder(),
  not: () => createQueryBuilder(),
  or: () => createQueryBuilder(),
  filter: () => createQueryBuilder(),
  order: () => createQueryBuilder(),
  limit: () => createQueryBuilder(),
  range: () => createQueryBuilder(),
  single: () => Promise.resolve({ data: null, error: null }),
  maybeSingle: () => Promise.resolve({ data: null, error: null }),
  csv: () => Promise.resolve({ data: '', error: null }),
  geojson: () => Promise.resolve({ data: null, error: null }),
  explain: () => Promise.resolve({ data: null, error: null }),
  rollback: () => Promise.resolve({ data: null, error: null }),
  returns: () => createQueryBuilder(),
  then: (resolve: (v: unknown) => void) => resolve({ data: [], error: null }),
  catch: () => Promise.resolve({ data: [], error: null }),
});

function createOfflineSupabase() {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Offline mode') }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Offline mode') }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: new Error('Offline mode') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => createQueryBuilder(),
    rpc: () => Promise.resolve({ data: null, error: new Error('Offline mode') }),
    channel: () => ({
      on: () => ({
        on: () => ({ subscribe: () => Promise.resolve({ error: null }) }),
        subscribe: () => Promise.resolve({ error: null }),
      }),
      subscribe: () => Promise.resolve({ error: null }),
      unsubscribe: () => Promise.resolve({ error: null }),
    }),
    removeChannel: () => Promise.resolve({ error: null }),
    removeAllChannels: () => Promise.resolve({ error: null }),
    getChannels: () => [],
  };
}

export const supabase: SupabaseClient = configured
  ? createClient(rawUrl!, rawKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : (createOfflineSupabase() as unknown as SupabaseClient);

export async function signIn(email: string, password: string) {
  if (!configured) throw new Error('Use offline auth system');
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUp(email: string, password: string) {
  if (!configured) throw new Error('Use offline auth system');
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export const getCurrentUser = async () => {
  if (!configured) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const initializeSession = async () => {
  if (!configured) return;
  await supabase.auth.getSession();
};

export const updateUserProgress = async () => Promise.resolve();
export const updateUserPoints = async () => Promise.resolve();
export const cleanUserLocalStorage = () => {};

export async function ensureDemoUserProfile() {
  if (!configured) return;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return;
  await supabase.from('profiles').upsert(
    {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name ?? 'Demo Student',
      role: 'student',
    },
    { onConflict: 'id' }
  );
}

export async function ensureAdminUserProfile() {
  if (!configured) return;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return;
  await supabase.from('profiles').upsert(
    {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name ?? 'Admin',
      role: 'admin',
    },
    { onConflict: 'id' }
  );
}

export async function createDemoUserAccount() {
  if (!configured) return;
  await supabase.auth.signUp({
    email: 'demo@orbitstudent.ai',
    password: 'Demo123!',
    options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
  });
}

export async function createAdminUserAccount() {
  if (!configured) return;
  await supabase.auth.signUp({
    email: 'admin@orbitstudent.ai',
    password: 'Admin123!',
    options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined },
  });
}

export async function checkSupabaseConnection(): Promise<boolean> {
  if (!configured) return false;
  const { error } = await supabase.from('profiles').select('id').limit(1);
  return !error;
}

export async function resetPassword(email: string) {
  if (!configured) throw new Error('Password reset requires Supabase');
  const redirect =
    typeof window !== 'undefined' ? `${window.location.origin}/forgot-password` : undefined;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect });
  if (error) throw error;
}

export const setupProductionEnvironment = () => Promise.resolve();
export const initializeFreshUser = () => Promise.resolve();
export const getStudentDashboardData = () => Promise.resolve({});
export const getUserBrandData = () => Promise.resolve({});
export const saveUserBrandLogo = () => Promise.resolve();
export const getDashboardStats = () => Promise.resolve({});
export const checkAndCreateAdminTables = () => Promise.resolve();
export const createSampleAdminData = () => Promise.resolve();
export const createOrbitAccountSeries = () => Promise.resolve();

export default supabase;
