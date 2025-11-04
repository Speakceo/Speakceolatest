import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginWithOrbitId as supabaseLoginWithOrbitId, createOrbitAccount as supabaseCreateOrbitAccount, updateStudentName as supabaseUpdateStudentName } from '../../lib/supabase';
import { loginWithOrbitId as mockLoginWithOrbitId, updateStudentName as mockUpdateStudentName } from '../../lib/mockDatabase';
import { useUserStore } from '../../lib/store';

export default function OrbitLoginForm() {
  const [orbitId, setOrbitId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showNameEntry, setShowNameEntry] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { initializeAuth } = useUserStore();

  const validateOrbitId = (id: string) => {
    const regex = /^Orbit1000[0-9]{2}$/;
    return regex.test(id);
  };

  const handleOrbitIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate ORBIT ID format
      if (!validateOrbitId(orbitId)) {
        throw new Error('Invalid ORBIT ID format. Please use format: Orbit100001 to Orbit100300');
      }

      // Extract number from ORBIT ID
      const idNumber = parseInt(orbitId.replace('Orbit1000', ''));
      if (idNumber < 1 || idNumber > 300) {
        throw new Error('ORBIT ID must be between Orbit100001 and Orbit100300');
      }

      // Try Supabase first, fallback to mock database
      let result;
      try {
        result = await supabaseLoginWithOrbitId(orbitId);
      } catch (supabaseError: any) {
        console.log('Supabase failed, using mock database:', supabaseError.message);
        setSuccess('Using offline mode - your data will be saved locally');
        result = await mockLoginWithOrbitId(orbitId);
      }
      
      if (result.isFirstTime) {
        // First time login - show name entry
        setShowNameEntry(true);
        setSuccess('Welcome to ORBIT! Please enter your name to complete setup.');
      } else {
        // Existing user - redirect to dashboard
        await initializeAuth();
        setSuccess(`Welcome back, ${result.studentName}!`);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
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

      if (studentName.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
      }

      // Try Supabase first, fallback to mock database
      try {
        await supabaseUpdateStudentName(orbitId, studentName.trim());
      } catch (supabaseError: any) {
        console.log('Supabase failed, using mock database for name update');
        await mockUpdateStudentName(orbitId, studentName.trim());
      }
      await initializeAuth();
      
      setSuccess(`Welcome to ORBIT, ${studentName}! Setting up your dashboard...`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to save name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-purple-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-400/15 via-purple-400/15 to-indigo-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 rounded-2xl p-3 mr-3">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ORBIT</h1>
                <p className="text-indigo-100 text-sm">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              <span className="text-white/90 text-sm">Future Leaders Start Here</span>
              <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
          </div>

          <div className="p-8">
            {!showNameEntry ? (
              /* ORBIT ID Entry Form */
              <form onSubmit={handleOrbitIdSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Enter Your ORBIT ID</h2>
                  <p className="text-white/70 text-sm">
                    Use your unique student ID (Orbit100001 - Orbit100300)
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      ORBIT Student ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={orbitId}
                        onChange={(e) => setOrbitId(e.target.value)}
                        placeholder="Orbit100001"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                        disabled={loading}
                      />
                      <div className="absolute right-3 top-3">
                        <Rocket className="h-5 w-5 text-white/50" />
                      </div>
                    </div>
                  </div>

                  {/* Example IDs */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-white/70 mb-2">Example IDs:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Orbit100001', 'Orbit100002', 'Orbit100003'].map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setOrbitId(id)}
                          className="px-3 py-1 bg-white/10 text-white/80 rounded-lg text-xs hover:bg-white/20 transition-colors"
                          disabled={loading}
                        >
                          {id}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !orbitId}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </div>
                  ) : (
                    'Access ORBIT Dashboard'
                  )}
                </button>
              </form>
            ) : (
              /* Name Entry Form */
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="bg-green-500/20 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Welcome to ORBIT!</h2>
                  <p className="text-white/70 text-sm">
                    ID: <span className="text-indigo-300 font-mono">{orbitId}</span>
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    Please enter your name to complete your profile setup
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                        disabled={loading}
                        autoFocus
                      />
                      <div className="absolute right-3 top-3">
                        <User className="h-5 w-5 text-white/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !studentName.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Setting up...
                    </div>
                  ) : (
                    'Complete Setup & Enter Dashboard'
                  )}
                </button>
              </form>
            )}

            {/* Error/Success Messages */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center"
              >
                <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                <span className="text-red-200 text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center"
              >
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-green-200 text-sm">{success}</span>
              </motion.div>
            )}

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-xs">
                Don't have an ORBIT ID? Contact your administrator
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-lg animate-bounce">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-3 shadow-lg animate-pulse">
          <Rocket className="h-6 w-6 text-white" />
        </div>
      </motion.div>
    </div>
  );
}
