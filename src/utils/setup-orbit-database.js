import { supabase } from '../lib/supabase.js';

// Database setup for ORBIT ID system
export async function setupOrbitDatabase() {
  try {
    console.log('🚀 Setting up ORBIT database...');

    // 1. Create orbit_accounts table
    console.log('Creating orbit_accounts table...');
    const { error: tableError } = await supabase.rpc('create_orbit_accounts_table');
    
    if (tableError && !tableError.message.includes('already exists')) {
      console.error('Error creating table:', tableError);
      throw tableError;
    }

    // 2. Clear existing data
    console.log('Clearing existing ORBIT accounts...');
    const { error: clearError } = await supabase
      .from('orbit_accounts')
      .delete()
      .neq('orbit_id', 'dummy'); // Delete all records

    if (clearError) {
      console.warn('Clear error (might be expected):', clearError.message);
    }

    // 3. Create 300 ORBIT accounts
    console.log('Creating 300 ORBIT accounts...');
    const accounts = [];
    
    for (let i = 1; i <= 300; i++) {
      const orbitId = `Orbit1000${i.toString().padStart(2, '0')}`;
      accounts.push({
        orbit_id: orbitId,
        student_name: null,
        is_active: true,
        created_at: new Date().toISOString(),
        last_login: null
      });
    }

    // Insert in batches of 50
    const batchSize = 50;
    for (let i = 0; i < accounts.length; i += batchSize) {
      const batch = accounts.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(accounts.length / batchSize);
      
      console.log(`Inserting batch ${batchNumber}/${totalBatches}...`);
      
      const { error: insertError } = await supabase
        .from('orbit_accounts')
        .insert(batch);

      if (insertError) {
        console.error(`Error inserting batch ${batchNumber}:`, insertError);
        throw insertError;
      }
      
      console.log(`✅ Batch ${batchNumber}/${totalBatches} inserted successfully`);
    }

    // 4. Update existing tables to support ORBIT IDs
    console.log('Updating existing tables for ORBIT support...');
    
    // Add orbit_id column to user_progress if it doesn't exist
    const { error: progressError } = await supabase.rpc('add_orbit_id_to_user_progress');
    if (progressError && !progressError.message.includes('already exists')) {
      console.warn('Progress table update error:', progressError.message);
    }

    // Add orbit_id column to profiles if it doesn't exist
    const { error: profilesError } = await supabase.rpc('add_orbit_id_to_profiles');
    if (profilesError && !profilesError.message.includes('already exists')) {
      console.warn('Profiles table update error:', profilesError.message);
    }

    console.log('✅ ORBIT database setup completed successfully!');
    console.log('📊 Created 300 ORBIT accounts (Orbit100001 - Orbit100300)');
    
    return {
      success: true,
      accountsCreated: 300,
      message: 'ORBIT database setup completed successfully'
    };

  } catch (error) {
    console.error('❌ ORBIT database setup failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'ORBIT database setup failed'
    };
  }
}

// SQL functions to be created in Supabase
export const orbitDatabaseSQL = `
-- Create orbit_accounts table
CREATE TABLE IF NOT EXISTS orbit_accounts (
  id SERIAL PRIMARY KEY,
  orbit_id VARCHAR(20) UNIQUE NOT NULL,
  student_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_active ON orbit_accounts(is_active);

-- Add orbit_id to user_progress table
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);
CREATE INDEX IF NOT EXISTS idx_user_progress_orbit_id ON user_progress(orbit_id);

-- Add orbit_id to profiles table  
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);
CREATE INDEX IF NOT EXISTS idx_profiles_orbit_id ON profiles(orbit_id);

-- Create RPC functions
CREATE OR REPLACE FUNCTION create_orbit_accounts_table()
RETURNS void AS $$
BEGIN
  -- This function is handled by the table creation above
  RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_orbit_id_to_user_progress()
RETURNS void AS $$
BEGIN
  -- This function is handled by the ALTER TABLE above
  RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_orbit_id_to_profiles()
RETURNS void AS $$
BEGIN
  -- This function is handled by the ALTER TABLE above
  RETURN;
END;
$$ LANGUAGE plpgsql;
`;

// Test function to verify setup
export async function testOrbitDatabase() {
  try {
    console.log('🧪 Testing ORBIT database...');
    
    // Test account creation
    const testId = 'Orbit100001';
    const { data, error } = await supabase
      .from('orbit_accounts')
      .select('*')
      .eq('orbit_id', testId)
      .single();

    if (error) {
      throw new Error(`Test failed: ${error.message}`);
    }

    console.log('✅ Test passed - ORBIT account found:', data.orbit_id);
    return { success: true, testAccount: data };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return { success: false, error: error.message };
  }
}
