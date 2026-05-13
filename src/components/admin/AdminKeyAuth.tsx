import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Key } from 'lucide-react';

interface AdminKeyAuthProps {
  onAuthenticated: () => void;
}

/** Env overrides default; empty / placeholder keeps default `arpitadmin`. */
function expectedAdminKey(): string {
  const raw = import.meta.env.VITE_ADMIN_ACCESS_KEY;
  if (raw === undefined || raw === null) return 'arpitadmin';
  let t = String(raw).trim();
  if (t === '' || /^your_|^changeme|^placeholder/i.test(t)) return 'arpitadmin';
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    t = t.slice(1, -1).trim();
  }
  return t || 'arpitadmin';
}

function normalizeKeyInput(s: string): string {
  return s.trim().toLowerCase();
}

const AdminKeyAuth: React.FC<AdminKeyAuthProps> = ({ onAuthenticated }) => {
  const [secretKey, setSecretKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated');
    if (isAuthenticated === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expected = expectedAdminKey();
    if (normalizeKeyInput(secretKey) === normalizeKeyInput(expected)) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
      onAuthenticated();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setSecretKey('');
      if (next >= 3) {
        setError('Too many failed attempts. Refresh the page to try again.');
        setTimeout(() => window.location.reload(), 3000);
      } else {
        setError(
          'Invalid access key. If you set VITE_ADMIN_ACCESS_KEY on your host, use that exact value (or remove it to use the default: arpitadmin).'
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-o-0 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-o-2 border border-[var(--o-border-1)] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md"
      >
        <div className="text-center mb-7">
          <div
            className="rounded-2xl p-3 w-14 h-14 mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--o-accent-soft)', border: '1px solid var(--o-border-1)' }}
          >
            <Shield className="h-7 w-7 text-[#00B0FF]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-o-0 mb-1.5" style={{ letterSpacing: '-0.02em' }}>
            Admin access
          </h1>
          <p className="text-[13px] sm:text-sm text-o-2">Enter your access key to open the panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-key" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
              Access key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-o-3 pointer-events-none" />
              <input
                id="admin-key"
                type={showKey ? 'text' : 'password'}
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full min-h-[48px] pl-10 pr-11 py-3 bg-o-1 border border-[var(--o-border-1)] rounded-xl text-[16px] sm:text-[15px] text-o-0 placeholder:text-o-3 focus:outline-none focus:border-[#1876D2] transition-colors"
                placeholder="Key"
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-o-2 hover:text-o-0 rounded-lg"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5"
            >
              <p className="text-red-400 text-[13px] text-center">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={attempts >= 3}
            className="w-full min-h-[48px] rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] shadow-lg shadow-[#1876D2]/20 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Continue
          </button>
        </form>

        <p className="mt-5 text-center text-[11px] text-o-3 tabular-nums">Attempts: {attempts}/3</p>
      </motion.div>
    </div>
  );
};

export default AdminKeyAuth;
