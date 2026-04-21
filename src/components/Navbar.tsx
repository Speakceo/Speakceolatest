import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { useUserStore } from '../lib/store';
import { useLanguage } from '../lib/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import EnrollmentPopup from './EnrollmentPopup';
import CareerGuidePopup from './career/CareerGuidePopup';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { title: 'nav.home', href: '/' },
  { title: 'nav.courses', href: '/courses' },
  { title: 'nav.resources', href: '/resources' },
  { title: 'nav.about', href: '/about' },
  { title: 'nav.contact', href: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showCareerGuide, setShowCareerGuide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isInitialized } = useUserStore();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogoClick = () => { navigate('/'); setIsOpen(false); };
  const handleDashboardClick = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setShowEnrollment(true);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full relative z-40">
      {/* ── Floating Pill Navbar ────────────────────────────────────────── */}
      <div className={`fixed z-50 top-0 left-0 right-0 flex justify-center transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-0'}`}>
        <nav className={`w-full transition-all duration-500 ${
          scrolled
            ? 'max-w-[calc(100%-2rem)] mx-4 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/40'
            : 'max-w-full bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.05]'
        }`}>
          {/* Animated gradient accent line */}
          {scrolled && (
            <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl overflow-hidden">
              <div className="h-full bg-gradient-to-r from-transparent via-[#00B0FF]/50 to-transparent" />
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[60px]">

              {/* Logo */}
              <button onClick={handleLogoClick} className="relative flex items-center group flex-shrink-0">
                <div className="absolute -inset-2 bg-[#00B0FF]/0 group-hover:bg-[#00B0FF]/8 rounded-xl transition-all duration-500 blur-md" />
                <img
                  src="/images/hero/orbit-logo.png"
                  alt="Orbit Student"
                  className="relative h-8 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 6px rgba(0,176,255,0.25))' }}
                />
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-0.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`relative px-3.5 py-2 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-200'
                    }`}
                  >
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-white/[0.08] rounded-xl border border-white/[0.1]"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{t(item.title)}</span>
                  </Link>
                ))}

                {/* Career Guide */}
                <button
                  onClick={() => setShowCareerGuide(true)}
                  className="relative px-3.5 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-gray-200 transition-colors duration-200 flex items-center gap-1.5 ml-1"
                >
                  <Sparkles className="w-3 h-3 text-[#00B0FF]" />
                  Career Guide
                </button>
              </div>

              {/* Right actions */}
              <div className="hidden md:flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle size="sm" />

                <div className="w-[1px] h-4 bg-white/[0.1] mx-1" />

                {isInitialized && (
                  user ? (
                    <button
                      onClick={handleDashboardClick}
                      className="relative px-4 py-2 rounded-xl text-[13px] font-semibold text-white overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00B0FF] to-[#1876D2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <span className="relative">{user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate('/login')}
                        className="px-3.5 py-2 rounded-xl text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setShowEnrollment(true)}
                        className="group relative px-4 py-2 rounded-xl text-[13px] font-semibold text-white overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-xl" />
                        {/* shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xl" />
                        <span className="relative flex items-center gap-1.5">
                          Get Started
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    </div>
                  )
                )}
              </div>

              {/* Mobile button */}
              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle size="sm" />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed w-[calc(100%-2rem)] mx-4 top-[72px] z-40 bg-slate-950/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-white bg-white/[0.08] border border-white/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive(item.href) && <span className="w-1 h-4 bg-[#00B0FF] rounded-full flex-shrink-0" />}
                  {t(item.title)}
                </Link>
              ))}

              <button
                onClick={() => { setShowCareerGuide(true); setIsOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-[#00B0FF]" />
                Career Guide
              </button>

              <div className="h-[1px] bg-white/[0.06] my-2" />

              {isInitialized && (
                user ? (
                  <button
                    onClick={handleDashboardClick}
                    className="w-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white px-4 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#1876D2]/20"
                  >
                    {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => { navigate('/login'); setIsOpen(false); }}
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/[0.08] hover:bg-white/[0.04] transition-all"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { setShowEnrollment(true); setIsOpen(false); }}
                      className="w-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white px-4 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#1876D2]/20"
                    >
                      Get Started →
                    </button>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
      {showCareerGuide && <CareerGuidePopup isOpen={showCareerGuide} onClose={() => setShowCareerGuide(false)} />}
    </div>
  );
}
