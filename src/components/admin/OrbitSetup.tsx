import React, { useState } from 'react';
import { Rocket, Database, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createOrbitAccountSeries } from '../../lib/supabase';

export default function OrbitSetup() {
  const [setupStatus, setSetupStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSetupOrbitAccounts = async () => {
    setSetupStatus('running');
    setMessage('Initializing ORBIT account creation...');
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      await createOrbitAccountSeries();
      
      clearInterval(progressInterval);
      setProgress(100);
      setSetupStatus('success');
      setMessage('✅ Successfully created 300 ORBIT accounts (Orbit100001 - Orbit100300)');
      
    } catch (error: any) {
      setSetupStatus('error');
      setMessage(`❌ Setup failed: ${error.message}`);
      setProgress(0);
    }
  };

  const resetSetup = () => {
    setSetupStatus('idle');
    setMessage('');
    setProgress(0);
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
              <h1 className="text-2xl font-bold text-white">ORBIT System Setup</h1>
              <p className="text-indigo-100">Initialize the new ORBIT ID authentication system</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <Database className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Database Schema</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Creates orbit_accounts table and updates existing tables for ORBIT ID support
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Account Creation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Generates 300 unique ORBIT IDs from Orbit100001 to Orbit100300
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Replaces email/password login with simple ORBIT ID + name system
              </p>
            </div>
          </div>

          {/* Setup Process */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Process</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                <span className="text-gray-700">Clear existing authentication data</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                <span className="text-gray-700">Create orbit_accounts table structure</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                <span className="text-gray-700">Generate 300 ORBIT ID accounts</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</div>
                <span className="text-gray-700">Update existing tables for ORBIT support</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {setupStatus === 'running' && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Setup Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border flex items-center ${
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

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {setupStatus === 'idle' && (
              <button
                onClick={handleSetupOrbitAccounts}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Initialize ORBIT System
              </button>
            )}

            {setupStatus === 'running' && (
              <button
                disabled
                className="flex-1 bg-gray-400 text-white py-4 px-6 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center"
              >
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Setting up ORBIT System...
              </button>
            )}

            {(setupStatus === 'success' || setupStatus === 'error') && (
              <>
                <button
                  onClick={resetSetup}
                  className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
                >
                  Reset Setup
                </button>
                {setupStatus === 'success' && (
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Test ORBIT Login
                  </button>
                )}
              </>
            )}
          </div>

          {/* Warning */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 mb-1">Important Notes:</p>
                <ul className="text-yellow-700 space-y-1">
                  <li>• This will clear all existing user authentication data</li>
                  <li>• Students will need to use their assigned ORBIT ID to login</li>
                  <li>• ORBIT IDs range from Orbit100001 to Orbit100300</li>
                  <li>• First-time users will be prompted to enter their name</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
