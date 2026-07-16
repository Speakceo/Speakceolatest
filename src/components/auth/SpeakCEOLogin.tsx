import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { loginWithSpeakCEOId, updateStudentName } from '../../lib/offline-auth';
import { useUserStore } from '../../lib/store';
import ThemeToggle from '../ThemeToggle';

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
    const regex = /^speakceo[0-9]{3}$/i;
    return regex.test(id);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!validateSpeakCEOId(speakCeoId)) {
        throw new Error('Invalid format. Please use: SpeakCEO001 to SpeakCEO300');
      }

      const idNumber = parseInt(speakCeoId.replace(/speakceo/i, ''));
      if (idNumber < 1 || idNumber > 300) {
        throw new Error('ID must be between SpeakCEO001 and SpeakCEO300');
      }

      const result = await loginWithSpeakCEOId(speakCeoId);

      if (result.isFirstTime) {
        setShowNameEntry(true);
        setSuccess('Welcome to Orbit Student! Please enter your name to get started.');
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
      setSuccess(`Welcome to Orbit Student, ${studentName}!`);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Orbit Student Login | Portal</title>
        <meta name="description" content="Sign in to your dashboard: courses, AI tools, live classes and scholarship prep for ages 8–18." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.orbitstudent.com/login" />
      </Helmet>

      <div className="min-h-screen bg-o-0 text-o-0 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 glow-o opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-o opacity-40 pointer-events-none" />

        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle size="sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-md"
        >
          <div className="card-o p-8">
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex mb-6">
                <img
                  src="/images/hero/orbit-logo.png"
                  alt="Orbit Student"
                  className="orbit-logo-mark h-9 w-auto opacity-90"
                />
              </Link>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-2xl mb-5 relative">
                <Rocket className="h-7 w-7 text-white" />
                <Sparkles className="absolute -top-1.5 -right-1.5 h-4 w-4 text-[#f59e0b]" />
              </div>
              <h1 className="font-display text-[1.75rem] text-o-0 mb-2 tracking-tight">Student login</h1>
              <p className="text-[14px] text-o-2">Enter your Student ID to open your portal</p>
            </div>

            {!showNameEntry ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-o-1 mb-2">Student ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={speakCeoId}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.toLowerCase().startsWith('speakceo')) {
                          value = 'SpeakCEO' + value.slice(8);
                        }
                        setSpeakCeoId(value);
                      }}
                      placeholder="Your Student ID"
                      autoComplete="username"
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-o-3 border border-[var(--o-border-1)] text-o-0 placeholder:text-o-3 focus:outline-none focus:ring-2 focus:ring-[var(--o-accent-ring)] focus:border-[var(--o-accent)] transition-colors"
                      disabled={loading}
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-o-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !speakCeoId}
                  className="btn-o btn-o-primary btn-o-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in…' : 'Login to dashboard'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleNameSubmit} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-medium text-o-1 mb-2">What's your name?</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-o-3 border border-[var(--o-border-1)] text-o-0 placeholder:text-o-3 focus:outline-none focus:ring-2 focus:ring-[var(--o-accent-ring)] focus:border-[var(--o-accent)] transition-colors"
                    disabled={loading}
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNameEntry(false)}
                    className="btn-o btn-o-ghost flex-1"
                    disabled={loading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !studentName.trim()}
                    className="btn-o btn-o-primary flex-1 disabled:opacity-50"
                  >
                    {loading ? 'Setting up…' : 'Continue'}
                  </button>
                </div>
              </form>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3.5 rounded-xl border border-[rgba(220,38,38,0.25)] bg-[rgba(220,38,38,0.08)] flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-[var(--o-error)] flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-[var(--o-error)]">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3.5 rounded-xl border border-[rgba(5,150,105,0.25)] bg-[rgba(5,150,105,0.08)] flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-[var(--o-success)] flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-[var(--o-success)]">{success}</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
