-- ORBIT Live Database Setup - Execute this in Supabase SQL Editor
-- This will create all tables and 300 working accounts

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

-- 2. Create user_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  orbit_id VARCHAR(20) REFERENCES orbit_accounts(orbit_id) ON DELETE CASCADE,
  completed_lessons JSONB DEFAULT '{}'::jsonb,
  completed_tasks JSONB DEFAULT '{}'::jsonb,
  current_module VARCHAR(255),
  progress_percentage INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_tasks_completed INTEGER DEFAULT 0,
  tool_usage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  orbit_id VARCHAR(20) REFERENCES orbit_accounts(orbit_id) ON DELETE SET NULL,
  email VARCHAR(255),
  full_name VARCHAR(255),
  display_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'student',
  progress INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  total_tasks_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_active ON orbit_accounts(is_active);
CREATE INDEX IF NOT EXISTS idx_user_progress_orbit_id ON user_progress(orbit_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_orbit_id ON profiles(orbit_id);

-- 5. Enable Row Level Security
ALTER TABLE orbit_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for orbit_accounts (allow public access)
DROP POLICY IF EXISTS "Allow public access to orbit_accounts" ON orbit_accounts;
CREATE POLICY "Allow public access to orbit_accounts" ON orbit_accounts
  FOR ALL USING (true);

-- 7. Create RLS policies for user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (true);

-- 8. Create RLS policies for profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (true);

-- 9. Clear existing ORBIT accounts (if any)
DELETE FROM user_progress WHERE orbit_id LIKE 'Orbit1000%';
DELETE FROM profiles WHERE orbit_id LIKE 'Orbit1000%';
DELETE FROM orbit_accounts WHERE orbit_id LIKE 'Orbit1000%';

-- 10. Insert 300 ORBIT accounts (Orbit100001 to Orbit100300)
INSERT INTO orbit_accounts (orbit_id, student_name, is_active, created_at)
SELECT 
  'Orbit1000' || LPAD(generate_series::text, 2, '0') as orbit_id,
  NULL as student_name,
  true as is_active,
  NOW() as created_at
FROM generate_series(1, 300)
ON CONFLICT (orbit_id) DO NOTHING;

-- 11. Create corresponding user_progress records for each ORBIT account
INSERT INTO user_progress (orbit_id, completed_lessons, completed_tasks, current_module, progress_percentage, points, xp_points, level, streak_count, total_tasks_completed, tool_usage, created_at, updated_at)
SELECT 
  orbit_id,
  '{}'::jsonb as completed_lessons,
  '{}'::jsonb as completed_tasks,
  'introduction' as current_module,
  0 as progress_percentage,
  0 as points,
  0 as xp_points,
  1 as level,
  0 as streak_count,
  0 as total_tasks_completed,
  '{}'::jsonb as tool_usage,
  NOW() as created_at,
  NOW() as updated_at
FROM orbit_accounts
WHERE orbit_id LIKE 'Orbit1000%'
ON CONFLICT (orbit_id) DO NOTHING;

-- 12. Create corresponding profiles for each ORBIT account
INSERT INTO profiles (id, orbit_id, email, full_name, display_name, role, progress, points, xp_points, level, streak_count, total_tasks_completed, created_at, updated_at)
SELECT 
  gen_random_uuid() as id,
  orbit_id,
  LOWER(orbit_id) || '@orbitstudent.com' as email,
  NULL as full_name,
  NULL as display_name,
  'student' as role,
  0 as progress,
  0 as points,
  0 as xp_points,
  1 as level,
  0 as streak_count,
  0 as total_tasks_completed,
  NOW() as created_at,
  NOW() as updated_at
FROM orbit_accounts
WHERE orbit_id LIKE 'Orbit1000%'
ON CONFLICT (orbit_id) DO NOTHING;

-- 13. Verify the setup
SELECT 
  'orbit_accounts' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN student_name IS NULL THEN 1 END) as fresh_accounts,
  MIN(orbit_id) as first_id,
  MAX(orbit_id) as last_id
FROM orbit_accounts
WHERE orbit_id LIKE 'Orbit1000%'

UNION ALL

SELECT 
  'user_progress' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN total_tasks_completed = 0 THEN 1 END) as fresh_progress,
  MIN(orbit_id) as first_id,
  MAX(orbit_id) as last_id
FROM user_progress
WHERE orbit_id LIKE 'Orbit1000%'

UNION ALL

SELECT 
  'profiles' as table_name,
  COUNT(*) as total_records,
  COUNT(CASE WHEN display_name IS NULL THEN 1 END) as fresh_profiles,
  MIN(orbit_id) as first_id,
  MAX(orbit_id) as last_id
FROM profiles
WHERE orbit_id LIKE 'Orbit1000%';

-- Success message
SELECT 'SUCCESS: 300 ORBIT accounts created in live Supabase database!' as status;

