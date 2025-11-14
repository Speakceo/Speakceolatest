// Offline-only stub - no Supabase connections
console.log('🔒 Supabase disabled - using offline mode');

// Create a comprehensive fake supabase object to prevent import errors
const createQueryBuilder = () => ({
  select: (columns?: string) => createQueryBuilder(),
  insert: (data: any) => createQueryBuilder(),
  update: (data: any) => createQueryBuilder(),
  delete: () => createQueryBuilder(),
  eq: (column: string, value: any) => createQueryBuilder(),
  neq: (column: string, value: any) => createQueryBuilder(),
  gt: (column: string, value: any) => createQueryBuilder(),
  gte: (column: string, value: any) => createQueryBuilder(),
  lt: (column: string, value: any) => createQueryBuilder(),
  lte: (column: string, value: any) => createQueryBuilder(),
  like: (column: string, pattern: string) => createQueryBuilder(),
  ilike: (column: string, pattern: string) => createQueryBuilder(),
  is: (column: string, value: any) => createQueryBuilder(),
  in: (column: string, values: any[]) => createQueryBuilder(),
  contains: (column: string, value: any) => createQueryBuilder(),
  containedBy: (column: string, value: any) => createQueryBuilder(),
  rangeGt: (column: string, value: any) => createQueryBuilder(),
  rangeGte: (column: string, value: any) => createQueryBuilder(),
  rangeLt: (column: string, value: any) => createQueryBuilder(),
  rangeLte: (column: string, value: any) => createQueryBuilder(),
  rangeAdjacent: (column: string, value: any) => createQueryBuilder(),
  overlaps: (column: string, value: any) => createQueryBuilder(),
  textSearch: (column: string, query: string) => createQueryBuilder(),
  match: (query: object) => createQueryBuilder(),
  not: (column: string, operator: string, value: any) => createQueryBuilder(),
  or: (filters: string) => createQueryBuilder(),
  filter: (column: string, operator: string, value: any) => createQueryBuilder(),
  order: (column: string, options?: { ascending?: boolean }) => createQueryBuilder(),
  limit: (count: number) => createQueryBuilder(),
  range: (from: number, to: number) => createQueryBuilder(),
  single: () => Promise.resolve({ data: null, error: null }),
  maybeSingle: () => Promise.resolve({ data: null, error: null }),
  csv: () => Promise.resolve({ data: '', error: null }),
  geojson: () => Promise.resolve({ data: null, error: null }),
  explain: () => Promise.resolve({ data: null, error: null }),
  rollback: () => Promise.resolve({ data: null, error: null }),
  returns: () => createQueryBuilder(),
  then: (resolve: Function) => resolve({ data: [], error: null }),
  catch: (reject: Function) => Promise.resolve({ data: [], error: null })
});

export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signIn: () => Promise.resolve({ data: null, error: new Error('Offline mode') }),
    signUp: () => Promise.resolve({ data: null, error: new Error('Offline mode') }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: (table: string) => createQueryBuilder(),
  rpc: (fn: string, params?: any) => Promise.resolve({ data: null, error: new Error('Offline mode') }),
  channel: (name: string) => ({
    on: (event: string, filter: any, callback: Function) => ({
      on: (event: string, filter: any, callback: Function) => ({
        subscribe: () => Promise.resolve({ error: null })
      }),
      subscribe: () => Promise.resolve({ error: null })
    }),
    subscribe: () => Promise.resolve({ error: null }),
    unsubscribe: () => Promise.resolve({ error: null })
  }),
  removeChannel: () => Promise.resolve({ error: null }),
  removeAllChannels: () => Promise.resolve({ error: null }),
  getChannels: () => []
};

// Stub functions to prevent import errors
export const signIn = () => Promise.reject(new Error('Use offline auth system'));
export const signUp = () => Promise.reject(new Error('Use offline auth system'));
export const getCurrentUser = () => Promise.resolve(null);
export const initializeSession = () => Promise.resolve();
export const updateUserProgress = () => Promise.resolve();
export const updateUserPoints = () => Promise.resolve();
export const cleanUserLocalStorage = () => {};
export const ensureDemoUserProfile = () => Promise.resolve();
export const ensureAdminUserProfile = () => Promise.resolve();
export const createDemoUserAccount = () => Promise.resolve();
export const createAdminUserAccount = () => Promise.resolve();
export const checkSupabaseConnection = () => Promise.resolve(false);
export const setupProductionEnvironment = () => Promise.resolve();
export const initializeFreshUser = () => Promise.resolve();
export const getStudentDashboardData = () => Promise.resolve({});
export const getUserBrandData = () => Promise.resolve({});
export const saveUserBrandLogo = () => Promise.resolve();
export const getDashboardStats = () => Promise.resolve({});
export const resetPassword = () => Promise.resolve();
export const checkAndCreateAdminTables = () => Promise.resolve();
export const createSampleAdminData = () => Promise.resolve();
export const createOrbitAccountSeries = () => Promise.resolve();

// Prevent any auto-initialization
export default supabase;
