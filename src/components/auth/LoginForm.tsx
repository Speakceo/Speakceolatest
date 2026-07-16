import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';
import { signIn, ensureDemoUserProfile, ensureAdminUserProfile, createDemoUserAccount, createAdminUserAccount } from '../../lib/supabase';
import { useUserStore } from '../../lib/store';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { initializeAuth } = useUserStore();

  const fillDemoCredentials = () => {
    setEmail('demo@orbitstudent.ai');
    setPassword('Demo123!');
  };

  const fillAdminCredentials = () => {
    setEmail('admin@orbitstudent.ai');
    setPassword('Admin123!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (email === 'demo@orbitstudent.ai') {
        try { await createDemoUserAccount(); } catch (_) {}
      } else if (email === 'admin@orbitstudent.ai') {
        try { await createAdminUserAccount(); } catch (_) {}
      }

      await signIn(email, password);

      if (email === 'demo@orbitstudent.ai') await ensureDemoUserProfile();
      else if (email === 'admin@orbitstudent.ai') await ensureAdminUserProfile();

      await initializeAuth();

      if (email === 'admin@orbitstudent.ai') navigate('/admin', { replace: true });
      else navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please confirm your email address first.');
      } else if (err.message?.includes('too many requests')) {
        setError('Too many attempts. Please wait a moment.');
      } else {
        setError(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue your learning journey">
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-o-1 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-o-3" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-o-3 border border-[var(--o-border-1)] rounded-xl text-o-0 placeholder:text-o-3 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-o-1 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-o-3" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-o-3 border border-[var(--o-border-1)] rounded-xl text-o-0 placeholder:text-o-3 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--o-border-1)] bg-o-3 text-[#1876D2] focus:ring-[#1876D2]/50"
            />
            <label htmlFor="remember-me" className="ml-2 text-sm text-o-2">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-[#00B0FF] hover:text-o-0 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Sign in <ArrowRight className="h-4 w-4" /></>
          )}
        </button>

        {/* Quick access */}
        <div className="pt-4 border-t border-[var(--o-border-1)]">
          <p className="text-xs text-o-3 text-center mb-3">Quick access</p>
          <div className="flex gap-2">
            <button type="button" onClick={fillDemoCredentials} className="flex-1 py-2.5 text-xs font-medium text-o-2 bg-o-3 border border-[var(--o-border-1)] rounded-lg hover:bg-[var(--o-ghost-hover)] hover:text-o-0 transition-all">
              Student Demo
            </button>
            <button type="button" onClick={fillAdminCredentials} className="flex-1 py-2.5 text-xs font-medium text-o-2 bg-o-3 border border-[var(--o-border-1)] rounded-lg hover:bg-[var(--o-ghost-hover)] hover:text-o-0 transition-all">
              Admin Demo
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
