-- Marketing leads + minimal profiles (self-contained for empty Supabase projects)
-- Run once in: Supabase Dashboard → SQL Editor

-- UUID generation (Supabase/Postgres)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Required by RLS policy "Admins can select all leads" (checks profiles.role)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  role text DEFAULT 'student' NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT profiles_role_check CHECK (role IN ('student', 'admin'))
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Optional: bootstrap row on signup (keeps email in sync with auth.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    COALESCE(new.email, ''),
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(COALESCE(new.email, ''), '@', 1)),
    'student'
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- ---- Leads ----

CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Unknown',
  email text,
  phone text,
  source text NOT NULL DEFAULT 'website',
  status text DEFAULT 'new',
  assigned_to uuid,
  last_contacted timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS source text,
  ADD COLUMN IF NOT EXISTS status text,
  ADD COLUMN IF NOT EXISTS assigned_to uuid,
  ADD COLUMN IF NOT EXISTS last_contacted timestamptz,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz;

ALTER TABLE public.leads ALTER COLUMN name DROP NOT NULL;
UPDATE public.leads SET name = COALESCE(NULLIF(trim(name), ''), 'Unknown') WHERE name IS NULL;
ALTER TABLE public.leads ALTER COLUMN name SET DEFAULT 'Unknown';

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert for marketing leads" ON public.leads;
CREATE POLICY "Allow public insert for marketing leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    source IS NOT NULL
    AND source IN (
      'contact_form',
      'career_guide',
      'website',
      'enrollment_popup',
      'newsletter',
      'demo_request',
      'trial_signup',
      'social_media',
      'paid_ads',
      'organic_search',
      'referral'
    )
  );

DROP POLICY IF EXISTS "Admins can select all leads" ON public.leads;
DROP POLICY IF EXISTS "Allow read leads for anon and authenticated" ON public.leads;

-- Readable with anon/publishable key (used by /admin after shared key unlock)
CREATE POLICY "Allow read leads for anon and authenticated"
  ON public.leads
  FOR SELECT
  TO anon, authenticated
  USING (true);
