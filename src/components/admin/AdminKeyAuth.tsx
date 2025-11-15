import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Key } from 'lucide-react';

interface AdminKeyAuthProps {
  onAuthenticated: () => void;
}

const AdminKeyAuth: React.FC<AdminKeyAuthProps> = ({ onAuthenticated }) => {
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Your secret admin key - SAVE THIS SOMEWHERE SAFE!
  const ADMIN_SECRET_KEY = 'SPEAKCEO_ADMIN_2024_SECURE_ACCESS_KEY_789';

  useEffect(() => {
    // Check if already authenticated in this session
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (isAuthenticated === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (secretKey.trim() === ADMIN_SECRET_KEY) {
      // Store authentication in session (not localStorage for security)
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
      onAuthenticated();
    } else {
      setAttempts(prev => prev + 1);
      setError('Invalid secret key. Access denied.');
      setSecretKey('');
      
      // Lock out after 3 failed attempts
      if (attempts >= 2) {
        setError('Too many failed attempts. Please refresh the page and try again.');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">Enter your secret key to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showKey ? 'text' : 'password'}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your secret key"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={attempts >= 3}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Access Admin Panel
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Attempts: {attempts}/3
          </p>
        </div>
      </motion.div>

      {/* Security Notice */}
      <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-sm">
        <div className="flex items-start space-x-2">
          <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-xs text-yellow-800 font-medium">Security Notice</p>
            <p className="text-xs text-yellow-700">
              This admin panel is protected. Only authorized access is permitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminKeyAuth;
