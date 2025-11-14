import React, { useState } from 'react';
import { getAllAccounts, resetAllData } from '../../lib/offline-auth';

export default function SetupSpeakCEO() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);

  const handleSetup = async () => {
    setLoading(true);
    setStatus('Creating 300 SpeakCEO accounts locally...');
    
    try {
      // Reset and recreate accounts
      resetAllData();
      setStatus('✅ Successfully created 300 SpeakCEO accounts (SpeakCEO001 to SpeakCEO300)');
      
      // Fetch all accounts to show the list
      const accountList = getAllAccounts();
      setAccounts(accountList);
    } catch (error: any) {
      setStatus('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAccounts = async () => {
    setLoading(true);
    setStatus('Fetching account list...');
    
    try {
      const accountList = getAllAccounts();
      setAccounts(accountList);
      setStatus(`✅ Found ${accountList.length} accounts`);
    } catch (error: any) {
      setStatus('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">SpeakCEO Setup</h1>
      
      <div className="space-y-4 mb-8">
        <button
          onClick={handleSetup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-300"
        >
          {loading ? 'Setting up...' : 'Setup Database & Create 300 Accounts'}
        </button>
        
        <button
          onClick={handleGetAccounts}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all duration-300"
        >
          {loading ? 'Loading...' : 'Show Account List'}
        </button>
      </div>
      
      {status && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p className="text-sm">{status}</p>
        </div>
      )}
      
      {accounts.length > 0 && (
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-green-800">
            🎉 Working SpeakCEO Login IDs ({accounts.length} total)
          </h3>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {accounts.map((account, index) => (
              <div
                key={account.speakCeoId}
                className={`p-2 rounded ${
                  account.studentName 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}
              >
                <div className="font-semibold">{account.speakCeoId}</div>
                {account.studentName && (
                  <div className="text-xs">{account.studentName}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white rounded border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 mb-2">How to use:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Go to <strong>http://localhost:5173/login</strong></li>
              <li>• Enter any ID from <strong>SpeakCEO001</strong> to <strong>SpeakCEO300</strong></li>
              <li>• First-time users will be asked to enter their name</li>
              <li>• Returning users will be logged in directly</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
