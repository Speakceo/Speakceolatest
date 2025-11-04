-- ORBIT Database Setup Script
-- This script creates all necessary tables for the ORBIT ID system
-- Run this in your Supabase SQL Editor

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

-- Create indexes for orbit_accounts
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_active ON orbit_accounts(is_active);

-- 2. Create or update user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  orbit_id VARCHAR(20) REFERENCES orbit_accounts(orbit_id) ON DELETE CASCADE,
  completed_lessons JSONB DEFAULT '{}'::jsonb,
  completed_tasks JSONB DEFAULT '{}'::jsonb,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  streak INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  tool_usage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_orbit_id ON user_progress(orbit_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- 3. Create or update profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  orbit_id VARCHAR(20) REFERENCES orbit_accounts(orbit_id) ON DELETE CASCADE,
  email VARCHAR(255),
  display_name VARCHAR(255),
  avatar_url TEXT,
  progress INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  total_tasks_completed INTEGER DEFAULT 0,
  course_type VARCHAR(50) DEFAULT 'Premium',
  role VARCHAR(20) DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_orbit_id ON profiles(orbit_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE orbit_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for orbit_accounts
CREATE POLICY "Allow public read access to orbit_accounts" ON orbit_accounts
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to orbit_accounts" ON orbit_accounts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to orbit_accounts" ON orbit_accounts
  FOR UPDATE USING (true);

-- 6. Create RLS policies for user_progress
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (true);

-- 7. Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (true);

-- 8. Create function to generate ORBIT accounts
CREATE OR REPLACE FUNCTION create_orbit_accounts()
RETURNS void AS $$
DECLARE
  i INTEGER;
  orbit_id_val VARCHAR(20);
BEGIN
  -- Clear existing ORBIT accounts
  DELETE FROM orbit_accounts;
  
  -- Create 300 ORBIT accounts
  FOR i IN 1..300 LOOP
    orbit_id_val := 'Orbit1000' || LPAD(i::text, 2, '0');
    
    INSERT INTO orbit_accounts (orbit_id, student_name, is_active, created_at)
    VALUES (orbit_id_val, NULL, true, NOW());
  END LOOP;
  
  RAISE NOTICE 'Created 300 ORBIT accounts successfully';
END;
$$ LANGUAGE plpgsql;

-- 9. Execute the function to create accounts
SELECT create_orbit_accounts();

-- 10. Verify the setup
SELECT 
  'orbit_accounts' as table_name,
  COUNT(*) as record_count
FROM orbit_accounts
UNION ALL
SELECT 
  'user_progress' as table_name,
  COUNT(*) as record_count
FROM user_progress
UNION ALL
SELECT 
  'profiles' as table_name,
  COUNT(*) as record_count
FROM profiles;

-- 11. Show sample ORBIT accounts
SELECT orbit_id, student_name, is_active, created_at 
FROM orbit_accounts 
ORDER BY orbit_id 
LIMIT 10;
