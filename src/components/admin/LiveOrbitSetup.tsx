import React, { useState } from 'react';
import { Database, Users, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createOrbitAccountSeries, checkSupabaseConnection } from '../../lib/supabase';

const LiveOrbitSetup: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'creating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [createdAccounts, setCreatedAccounts] = useState<string[]>([]);

  const handleCreateAccounts = async () => {
    try {
      setStatus('checking');
      setMessage('Checking Supabase connection...');
      
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        throw new Error('Cannot connect to Supabase. Please check your credentials.');
      }

      setStatus('creating');
      setMessage('Creating 300 ORBIT accounts in live database...');
      setProgress(0);

      // Create accounts with progress tracking
      await createOrbitAccountSeries();

      // Generate the list of created account IDs
      const accounts = [];
      for (let i = 1; i <= 300; i++) {
        accounts.push(`Orbit1000${i.toString().padStart(2, '0')}`);
      }
      
      setCreatedAccounts(accounts);
      setStatus('success');
      setMessage('✅ Successfully created 300 ORBIT accounts in live database!');
      setProgress(100);

    } catch (error: any) {
      console.error('Setup error:', error);
      setStatus('error');
      setMessage(`❌ Setup failed: ${error.message}`);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
      case 'creating':
        return <Loader className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'checking':
      case 'creating':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Live ORBIT Database Setup</h2>
              <p className="text-gray-600">Create 300 clean ORBIT accounts in your live Supabase database</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Status Display */}
          <div className={`p-4 rounded-lg border ${getStatusColor()} mb-6`}>
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <span className="font-medium">{message || 'Ready to create accounts'}</span>
            </div>
            
            {(status === 'creating' || status === 'checking') && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          {status !== 'success' && (
            <div className="text-center">
              <button
                onClick={handleCreateAccounts}
                disabled={status === 'checking' || status === 'creating'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'checking' || status === 'creating' ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Setting up...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Create 300 ORBIT Accounts</span>
                  </div>
                )}
              </button>
            </div>
          )}

          {/* Success Display */}
          {status === 'success' && createdAccounts.length > 0 && (
            <div className="mt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  300 ORBIT Accounts Created Successfully!
                </h3>
                
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Available Login IDs:</h4>
                  <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto">
                    {createdAccounts.slice(0, 50).map((accountId) => (
                      <div
                        key={accountId}
                        className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-center hover:bg-purple-100 transition-colors cursor-pointer"
                        title="Click to copy"
                        onClick={() => navigator.clipboard.writeText(accountId)}
                      >
                        {accountId}
                      </div>
                    ))}
                  </div>
                  
                  {createdAccounts.length > 50 && (
                    <div className="mt-3 text-center text-gray-600">
                      <p>... and {createdAccounts.length - 50} more accounts</p>
                      <p className="text-sm">Range: Orbit100001 to Orbit100300</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Test These Login IDs:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Orbit100001', 'Orbit100050', 'Orbit100100', 'Orbit100150', 'Orbit100200', 'Orbit100300'].map((testId) => (
                      <div
                        key={testId}
                        className="bg-blue-100 px-3 py-2 rounded text-center font-mono text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(testId)}
                        title="Click to copy"
                      >
                        {testId}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-blue-600 mt-2 text-center">
                    Click any ID to copy, then test on the login page
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveOrbitSetup;
