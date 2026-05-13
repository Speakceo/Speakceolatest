-- Marketing / contact leads: table + safe public insert + admin read
-- Aligns with CareerGuidePopup and site-wide lead capture.

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
CREATE POLICY "Admins can select all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
