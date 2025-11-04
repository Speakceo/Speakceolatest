-- ORBIT Database Setup Script
-- Run this in your Supabase SQL Editor if automatic setup fails

-- 1. Create orbit_accounts table
CREATE TABLE IF NOT EXISTS orbit_accounts (
  id SERIAL PRIMARY KEY,
  orbit_id VARCHAR(20) UNIQUE NOT NULL,
  student_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_active ON orbit_accounts(is_active);

-- 3. Enable Row Level Security
ALTER TABLE orbit_accounts ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies (allow public access for now)
DROP POLICY IF EXISTS "Allow public access to orbit_accounts" ON orbit_accounts;
CREATE POLICY "Allow public access to orbit_accounts" ON orbit_accounts
  FOR ALL USING (true);

-- 5. Update existing tables to support ORBIT IDs
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);

-- 6. Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_user_progress_orbit_id ON user_progress(orbit_id);
CREATE INDEX IF NOT EXISTS idx_profiles_orbit_id ON profiles(orbit_id);

-- 7. Insert 300 ORBIT accounts
INSERT INTO orbit_accounts (orbit_id, student_name, is_active, created_at)
SELECT 
  'Orbit1000' || LPAD(generate_series::text, 2, '0') as orbit_id,
  NULL as student_name,
  true as is_active,
  NOW() as created_at
FROM generate_series(1, 300)
ON CONFLICT (orbit_id) DO NOTHING;

-- 8. Verify the setup
SELECT 
  COUNT(*) as total_accounts,
  COUNT(CASE WHEN student_name IS NULL THEN 1 END) as fresh_accounts,
  MIN(orbit_id) as first_id,
  MAX(orbit_id) as last_id
FROM orbit_accounts;
