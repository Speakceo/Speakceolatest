// Offline-only stub - no Supabase connections
const createQueryBuilder = () => ({
  select: (columns?: string) => createQueryBuilder(),
  insert: (data: any) => createQueryBuilder(),
  update: (data: any) => createQueryBuilder(),
  delete: () => createQueryBuilder(),
  eq: (column: string, value: any) => createQueryBuilder(),
  order: (column: string, options?: { ascending?: boolean }) => createQueryBuilder(),
  limit: (count: number) => createQueryBuilder(),
  single: () => Promise.resolve({ data: null, error: null }),
  then: (resolve: Function) => resolve({ data: [], error: null })
});

export const supabase = {
  from: (table: string) => createQueryBuilder(),
  channel: (name: string) => ({
    on: () => ({ subscribe: () => Promise.resolve({ error: null }) })
  })
};

export default supabase;
