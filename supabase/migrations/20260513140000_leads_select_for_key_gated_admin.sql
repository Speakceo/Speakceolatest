-- Admin UI is protected only by a shared browser key (VITE_ADMIN_ACCESS_KEY / session).
-- Leads must be readable with the Supabase anon/publishable key so SimpleLeadsViewer works
-- without profiles.role = 'admin'.
--
-- Security: anyone who has your project's anon key can list leads via PostgREST (same key ships
-- in the public app). Accept only if that tradeoff is OK for you.

DROP POLICY IF EXISTS "Admins can select all leads" ON public.leads;

CREATE POLICY "Allow read leads for anon and authenticated"
  ON public.leads
  FOR SELECT
  TO anon, authenticated
  USING (true);
