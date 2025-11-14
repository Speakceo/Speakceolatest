// Direct account creation - paste this in browser console at localhost:5173
// This will create 300 ORBIT accounts in your live Supabase database

async function createOrbitAccounts() {
  console.log('🚀 Creating 300 ORBIT accounts in live Supabase database...');
  
  try {
    // Import Supabase client (assuming it's available globally or via window)
    const { supabase } = await import('./lib/supabase.js');
    
    // Step 1: Clear existing accounts
    console.log('Clearing existing ORBIT accounts...');
    await supabase.from('orbit_accounts').delete().like('orbit_id', 'Orbit1000%');
    
    // Step 2: Create 300 accounts
    console.log('Creating 300 fresh accounts...');
    const accounts = [];
    for (let i = 1; i <= 300; i++) {
      accounts.push({
        orbit_id: `Orbit1000${i.toString().padStart(2, '0')}`,
        student_name: null,
        is_active: true,
        created_at: new Date().toISOString()
      });
    }
    
    // Step 3: Insert in batches of 50
    const batchSize = 50;
    const totalBatches = Math.ceil(accounts.length / batchSize);
    
    for (let i = 0; i < accounts.length; i += batchSize) {
      const batch = accounts.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      
      console.log(`Inserting batch ${batchNumber}/${totalBatches}...`);
      
      const { error } = await supabase.from('orbit_accounts').insert(batch);
      
      if (error) {
        console.error(`Batch ${batchNumber} error:`, error);
        throw error;
      }
      
      console.log(`✅ Batch ${batchNumber}/${totalBatches} completed`);
    }
    
    // Step 4: Verify
    const { count, error: countError } = await supabase
      .from('orbit_accounts')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
    console.log(`🎉 SUCCESS! Created ${count} ORBIT accounts!`);
    console.log('Ready to test: Orbit100001, Orbit100050, Orbit100100, Orbit100150, Orbit100200, Orbit100300');
    console.log('Full range: Orbit100001 to Orbit100300');
    
    return { success: true, count };
    
  } catch (error) {
    console.error('❌ Account creation failed:', error);
    return { success: false, error: error.message };
  }
}

// Execute the function
createOrbitAccounts();

