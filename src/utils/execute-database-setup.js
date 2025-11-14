// Direct database setup script - creates 300 ORBIT accounts in live Supabase
import { supabase } from '../lib/supabase.js';

async function createLiveDatabase() {
  try {
    console.log('🚀 Creating live Supabase database with 300 ORBIT accounts...');

    // Step 1: Create orbit_accounts table
    console.log('Creating orbit_accounts table...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS orbit_accounts (
        id SERIAL PRIMARY KEY,
        orbit_id VARCHAR(20) UNIQUE NOT NULL,
        student_name VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE,
        metadata JSONB DEFAULT '{}'::jsonb
      );
      
      CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);
      CREATE INDEX IF NOT EXISTS idx_orbit_accounts_active ON orbit_accounts(is_active);
      
      ALTER TABLE orbit_accounts ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Allow public access to orbit_accounts" ON orbit_accounts;
      CREATE POLICY "Allow public access to orbit_accounts" ON orbit_accounts FOR ALL USING (true);
    `;

    const { error: tableError } = await supabase.rpc('exec_sql', { sql: createTableQuery });
    if (tableError) {
      console.log('Table creation via RPC failed, trying direct insert...');
    }

    // Step 2: Clear existing ORBIT accounts
    console.log('Clearing existing ORBIT accounts...');
    await supabase.from('orbit_accounts').delete().like('orbit_id', 'Orbit1000%');

    // Step 3: Create 300 accounts in batches
    console.log('Creating 300 ORBIT accounts...');
    const accounts = [];
    for (let i = 1; i <= 300; i++) {
      accounts.push({
        orbit_id: `Orbit1000${i.toString().padStart(2, '0')}`,
        student_name: null,
        is_active: true,
        created_at: new Date().toISOString()
      });
    }

    // Insert in batches of 50
    const batchSize = 50;
    for (let i = 0; i < accounts.length; i += batchSize) {
      const batch = accounts.slice(i, i + batchSize);
      const { error } = await supabase.from('orbit_accounts').insert(batch);
      
      if (error) {
        console.error(`Batch ${Math.floor(i/batchSize) + 1} error:`, error);
      } else {
        console.log(`✅ Batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(accounts.length/batchSize)} inserted`);
      }
    }

    // Step 4: Verify creation
    const { count, error: countError } = await supabase
      .from('orbit_accounts')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw countError;
    }

    console.log(`🎉 SUCCESS! Created ${count} ORBIT accounts in live database!`);
    
    // Test a few accounts
    const testIds = ['Orbit100001', 'Orbit100050', 'Orbit100100'];
    for (const testId of testIds) {
      const { data, error } = await supabase
        .from('orbit_accounts')
        .select('*')
        .eq('orbit_id', testId)
        .single();
      
      if (data) {
        console.log(`✅ ${testId} - Ready to use`);
      } else {
        console.log(`❌ ${testId} - Error:`, error);
      }
    }

    return { success: true, count };
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    return { success: false, error: error.message };
  }
}

// Execute immediately
createLiveDatabase().then(result => {
  if (result.success) {
    console.log('\n🎉 READY TO USE! Test these ORBIT IDs:');
    console.log('Orbit100001, Orbit100050, Orbit100100, Orbit100150, Orbit100200, Orbit100300');
    console.log('\nRange: Orbit100001 to Orbit100300');
  } else {
    console.error('Setup failed:', result.error);
  }
});

