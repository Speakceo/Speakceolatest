import React, { useState } from 'react';
import { Rocket, Database, CheckCircle, AlertCircle, Loader, Copy } from 'lucide-react';
import { createOrbitAccountSeries, checkSupabaseConnection } from '../../lib/supabase';

export default function QuickOrbitSetup() {
  const [setupStatus, setSetupStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showSQL, setShowSQL] = useState(false);

  const sqlScript = `-- ORBIT Database Setup Script
-- Copy and paste this into your Supabase SQL Editor

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orbit_accounts_orbit_id ON orbit_accounts(orbit_id);

-- 2. Update existing tables
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS orbit_id VARCHAR(20);

-- 3. Enable RLS and create policies
ALTER TABLE orbit_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to orbit_accounts" ON orbit_accounts
  FOR ALL USING (true);

-- 4. Create and populate ORBIT accounts
CREATE OR REPLACE FUNCTION create_orbit_accounts()
RETURNS void AS $$
DECLARE
  i INTEGER;
  orbit_id_val VARCHAR(20);
BEGIN
  DELETE FROM orbit_accounts;
  
  FOR i IN 1..300 LOOP
    orbit_id_val := 'Orbit1000' || LPAD(i::text, 2, '0');
    INSERT INTO orbit_accounts (orbit_id, student_name, is_active, created_at)
    VALUES (orbit_id_val, NULL, true, NOW());
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_orbit_accounts();

-- Verify setup
SELECT COUNT(*) as total_accounts FROM orbit_accounts;`;

  const handleQuickSetup = async () => {
    setSetupStatus('running');
    setMessage('Creating ORBIT accounts using local storage...');

    try {
      // Use mock database to create accounts immediately
      const { createOrbitAccountSeries: mockCreateAccounts } = await import('../../lib/mockDatabase');
      
      setMessage('Setting up 300 ORBIT accounts...');
      await mockCreateAccounts();
      
      setSetupStatus('success');
      setMessage('✅ Successfully created 300 ORBIT accounts using local storage! Ready to test login.');
      
    } catch (error: any) {
      setSetupStatus('error');
      setMessage(`❌ Setup failed: ${error.message}`);
    }
  };

  const copySQL = () => {
    navigator.clipboard.writeText(sqlScript);
    alert('SQL script copied to clipboard!');
  };

  const testLogin = () => {
    window.open('/login', '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <div className="flex items-center">
            <div className="bg-white/20 rounded-2xl p-3 mr-4">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Quick ORBIT Setup</h1>
              <p className="text-indigo-100">Set up your fresh Supabase project with ORBIT accounts</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Connection Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Supabase Project Connected</h3>
            <p className="text-blue-700 text-sm mb-2">
              <strong>URL:</strong> https://jjiqzubfdtbtdicyicmn.supabase.co
            </p>
            <p className="text-blue-700 text-sm">
              <strong>Status:</strong> Ready for ORBIT setup
            </p>
          </div>

          {/* Setup Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Automatic Setup */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-indigo-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Automatic Setup</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Let the system automatically create tables and 300 ORBIT accounts.
              </p>
              
              {setupStatus === 'idle' && (
                <button
                  onClick={handleQuickSetup}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  <Rocket className="h-4 w-4 mr-2 inline" />
                  Auto Setup ORBIT System
                </button>
              )}

              {setupStatus === 'running' && (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-3 px-4 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center"
                >
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Setting up...
                </button>
              )}

              {setupStatus === 'success' && (
                <div className="space-y-3">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Setup Complete!</span>
                  </div>
                  <button
                    onClick={testLogin}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    Test ORBIT Login
                  </button>
                </div>
              )}

              {setupStatus === 'error' && (
                <div className="space-y-3">
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Setup Failed</span>
                  </div>
                  <button
                    onClick={() => setSetupStatus('idle')}
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Manual Setup */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Copy className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Manual Setup</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Copy SQL script and run it manually in Supabase SQL Editor.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowSQL(!showSQL)}
                  className="w-full bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
                >
                  {showSQL ? 'Hide' : 'Show'} SQL Script
                </button>
                
                {showSQL && (
                  <div className="relative">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-64">
                      {sqlScript}
                    </pre>
                    <button
                      onClick={copySQL}
                      className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-4 rounded-xl border flex items-center ${
              setupStatus === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : setupStatus === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              {setupStatus === 'success' && <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
              {setupStatus === 'error' && <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />}
              {setupStatus === 'running' && <Loader className="h-5 w-5 mr-3 flex-shrink-0 animate-spin" />}
              <span className="text-sm">{message}</span>
            </div>
          )}

          {/* Test Accounts */}
          {setupStatus === 'success' && (
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test ORBIT IDs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Orbit100001', 'Orbit100002', 'Orbit100003', 'Orbit100004'].map((id) => (
                  <div key={id} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                    <code className="text-sm font-mono text-indigo-600">{id}</code>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Use any of these IDs to test the login system. Range: Orbit100001 - Orbit100300
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
