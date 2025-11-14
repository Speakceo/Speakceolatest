import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../lib/store';

export default function DebugLogin() {
  const [orbitId, setOrbitId] = useState('Orbit100001');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { initializeAuth } = useUserStore();

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login process...\n');
    
    try {
      // Test 1: Validate ORBIT ID format
      const regex = /^Orbit1000[0-9]{2}$/;
      const isValid = regex.test(orbitId);
      setResult(prev => prev + `✅ ID Format Valid: ${isValid}\n`);
      
      if (!isValid) {
        setResult(prev => prev + `❌ Invalid format. Expected: Orbit100001-Orbit100300\n`);
        return;
      }
      
      // Test 2: Check ID range
      const idNumber = parseInt(orbitId.replace('Orbit1000', ''));
      const inRange = idNumber >= 1 && idNumber <= 300;
      setResult(prev => prev + `✅ ID Range Valid: ${inRange} (${idNumber})\n`);
      
      if (!inRange) {
        setResult(prev => prev + `❌ ID out of range. Must be 1-300\n`);
        return;
      }
      
      // Test 3: Try mock database login
      setResult(prev => prev + `🔄 Attempting mock database login...\n`);
      
      // Simulate mock login
      const mockAccount = {
        orbit_id: orbitId,
        student_name: null,
        created_at: new Date().toISOString(),
        is_active: true
      };
      
      // Set session
      localStorage.setItem('orbit_session', JSON.stringify({
        orbitId: mockAccount.orbit_id,
        studentName: mockAccount.student_name,
        createdAt: mockAccount.created_at
      }));
      
      setResult(prev => prev + `✅ Mock session created\n`);
      
      // Test 4: Initialize auth
      setResult(prev => prev + `🔄 Initializing auth...\n`);
      await initializeAuth();
      setResult(prev => prev + `✅ Auth initialized\n`);
      
      // Test 5: Navigate to dashboard
      setResult(prev => prev + `🔄 Navigating to dashboard...\n`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error: any) {
      setResult(prev => prev + `❌ Error: ${error.message}\n`);
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    localStorage.removeItem('orbit_session');
    localStorage.removeItem('user-storage');
    setResult('Session cleared\n');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Debug Login Test</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">ORBIT ID:</label>
          <input
            type="text"
            value={orbitId}
            onChange={(e) => setOrbitId(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Orbit100001"
          />
        </div>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing Login...' : 'Test Login Process'}
        </button>
        
        <button
          onClick={clearSession}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Session
        </button>
      </div>
      
      {result && (
        <div className="bg-gray-100 p-4 rounded border">
          <h3 className="font-semibold mb-2">Debug Log:</h3>
          <pre className="whitespace-pre-wrap text-sm font-mono">{result}</pre>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Current Session:</strong></p>
        <pre className="text-xs bg-gray-50 p-2 rounded mt-1">
          {localStorage.getItem('orbit_session') || 'No session'}
        </pre>
      </div>
    </div>
  );
}
