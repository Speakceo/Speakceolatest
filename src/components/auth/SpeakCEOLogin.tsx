import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <Helmet>
        <title>Orbit Student Login | Portal</title>
        <meta name="description" content="Sign in to your dashboard: courses, AI tools, live classes and scholarship prep for ages 8–18." />
        <meta name="keywords" content="Orbit Student login, Orbit Student portal, Orbit Student sign in, Orbit Student dashboard, orbitstudent login, student portal login, AI student login, Orbit Student account, Orbit Student app" />
        <meta property="og:title" content="Orbit Student Login" />
        <meta property="og:description" content="Access your student dashboard, courses and AI tools." />
        <meta property="og:url" content="https://www.orbitstudent.com/login" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Orbit Student Login" />
        <meta name="twitter:description" content="Student portal: dashboard, courses, AI tools and live classes." />
        <link rel="canonical" href="https://www.orbitstudent.com/login" />
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Orbit Student Login",
            "description": "Login to the Orbit Student portal. Access AI learning dashboard, courses, AI tools, live classes, and scholarship prep.",
            "url": "https://www.orbitstudent.com/login",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Orbit Student",
              "url": "https://www.orbitstudent.com"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.orbitstudent.com"
              }, {
                "@type": "ListItem",
                "position": 2,
                "name": "Login",
                "item": "https://www.orbitstudent.com/login"
              }]
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-[#00B0FF]/10 backdrop-blur-3xl"></div>
        </div>
        
        <motion.div 
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="relative w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-2xl mb-6 relative">
                <Rocket className="h-10 w-10 text-white" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Orbit Student Login</h1>
              <p className="text-gray-300">Enter your Student ID to access your portal</p>
            </div>

            {!showNameEntry ? (
              /* Login Form */
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Student ID
                  </label>
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
                      placeholder="SpeakCEO001"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1876D2] focus:border-transparent"
                      disabled={loading}
                    />
                    <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !speakCeoId}
                  className="w-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#1876D2]/25 focus:outline-none focus:ring-2 focus:ring-[#1876D2] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Login to Dashboard'
                  )}
                </button>
              </form>
            ) : (
              /* Name Entry Form */
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What's your name?
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1876D2] focus:border-transparent"
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
                    className="flex-1 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#1876D2]/25 focus:outline-none focus:ring-2 focus:ring-[#1876D2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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

            {/* SEO-friendly hidden content for search engines */}
            <div className="sr-only">
              <h2>Orbit Student Portal Login</h2>
              <p>Login to your Orbit Student account to access the AI learning dashboard, courses, AI tools, and live classes. Orbit Student is the #1 AI-powered learning portal for kids ages 8-18.</p>
              <h3>What you get after Orbit Student login:</h3>
              <ul>
                <li>AI Learning Dashboard with XP tracking</li>
                <li>100+ AI Tools — SpeakSmart, MathMentor, WriteRight</li>
                <li>65+ Interactive Courses</li>
                <li>Live Classes with Real Entrepreneurs</li>
                <li>Scholarship Prep & Roadmap</li>
                <li>Business Simulations & Projects</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
