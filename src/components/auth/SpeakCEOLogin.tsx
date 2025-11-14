import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginWithSpeakCEOId, updateStudentName } from '../../lib/offline-auth';
import { useUserStore } from '../../lib/store';

export default function SpeakCEOLogin() {
  const [speakCeoId, setSpeakCeoId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { initializeAuth } = useUserStore();

  const validateSpeakCEOId = (id: string) => {
    // Allow case-insensitive matching
    const regex = /^speakceo[0-9]{3}$/i;
    return regex.test(id);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate format
      if (!validateSpeakCEOId(speakCeoId)) {
        throw new Error('Invalid format. Please use: SpeakCEO001 to SpeakCEO300');
      }

      // Extract number and validate range
      const idNumber = parseInt(speakCeoId.replace(/speakceo/i, ''));
      if (idNumber < 1 || idNumber > 300) {
        throw new Error('ID must be between SpeakCEO001 and SpeakCEO300');
      }

      const result = await loginWithSpeakCEOId(speakCeoId);
      
      if (result.isFirstTime) {
        setShowNameEntry(true);
        setSuccess('Welcome to SpeakCEO! Please enter your name to get started.');
      } else {
        await initializeAuth();
        setSuccess(`Welcome back, ${result.studentName}!`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!studentName.trim()) {
        throw new Error('Please enter your name');
      }

      await updateStudentName(speakCeoId, studentName.trim());
      await initializeAuth();
      setSuccess(`Welcome to SpeakCEO, ${studentName}!`);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-purple-500/10 backdrop-blur-3xl"></div>
      </div>
      
      <motion.div 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-md"
      >
        <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 relative">
              <Mic className="h-10 w-10 text-white" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to SpeakCEO</h1>
            <p className="text-purple-200">Enter your SpeakCEO ID to continue</p>
          </div>

          {!showNameEntry ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  SpeakCEO ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={speakCeoId}
                    onChange={(e) => {
                      let value = e.target.value;
                      // Auto-format to correct case
                      if (value.toLowerCase().startsWith('speakceo')) {
                        value = 'SpeakCEO' + value.slice(8);
                      }
                      setSpeakCeoId(value);
                    }}
                    placeholder="SpeakCEO001"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-purple-300" />
                </div>
                <p className="text-xs text-purple-300 mt-1">Format: SpeakCEO001 to SpeakCEO300</p>
              </div>

              <button
                type="submit"
                disabled={loading || !speakCeoId}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          ) : (
            /* Name Entry Form */
            <form onSubmit={handleNameSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={loading}
                  autoFocus
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNameEntry(false)}
                  className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !studentName.trim()}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Setting up...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Messages */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center"
            >
              <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
              <span className="text-red-200 text-sm">{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center"
            >
              <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
              <span className="text-green-200 text-sm">{success}</span>
            </motion.div>
          )}

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-purple-300 text-sm">
              Need help? Contact your instructor for your SpeakCEO ID
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
