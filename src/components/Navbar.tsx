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
      {/* ── Linear-grade dark Navbar ─────────────────────────────────────── */}
      <div className="fixed z-50 top-0 left-0 right-0">
        <nav
          className={`w-full transition-all duration-300 ${
            scrolled
              ? 'bg-[rgba(8,9,10,0.85)] backdrop-blur-xl border-b border-[var(--o-border-1)]'
              : 'bg-[rgba(8,9,10,0.65)] backdrop-blur-md border-b border-[var(--o-border-0)]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[56px]">

              {/* Logo */}
              <button onClick={handleLogoClick} className="flex items-center flex-shrink-0">
                <img
                  src="/images/hero/orbit-logo.png"
                  alt="Orbit Student"
                  className="h-7 w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`relative px-3 py-1.5 rounded-md text-[13.5px] font-medium transition-colors duration-150 ${
                      isActive(item.href)
                        ? 'text-o-0'
                        : 'text-o-2 hover:text-o-0'
                    }`}
                    style={{ letterSpacing: '-0.005em' }}
                  >
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-md"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative">{t(item.title)}</span>
                  </Link>
                ))}

                <button
                  onClick={() => setShowCareerGuide(true)}
                  className="relative px-3 py-1.5 rounded-md text-[13.5px] font-medium text-o-2 hover:text-o-0 transition-colors duration-150 flex items-center gap-1.5 ml-0.5"
                  style={{ letterSpacing: '-0.005em' }}
                >
                  <Sparkles className="w-3 h-3 text-[#00B0FF]" />
                  Career Guide
                </button>
              </div>

              {/* Right actions */}
              <div className="hidden md:flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle size="sm" />

                <div className="w-px h-4 mx-1" style={{ background: 'var(--o-border-1)' }} />

                {isInitialized && (
                  user ? (
                    <button onClick={handleDashboardClick} className="btn-o btn-o-primary" style={{ height: 32, padding: '0 12px', fontSize: 13 }}>
                      {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => navigate('/login')}
                        className="btn-o btn-o-link"
                        style={{ height: 32, fontSize: 13 }}
                      >
                        Sign in
                      </button>
                      <button
                        onClick={() => setShowEnrollment(true)}
                        className="btn-o btn-o-primary"
                        style={{ height: 32, padding: '0 14px', fontSize: 13 }}
                      >
                        Get started
                        <ArrowRight className="w-3.5 h-3.5" />
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
                  className="p-2 rounded-md text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
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
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden fixed left-0 right-0 top-[56px] z-40 bg-[rgba(8,9,10,0.95)] backdrop-blur-xl border-b border-[var(--o-border-1)]"
          >
            <div className="px-4 py-3 space-y-0.5">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-[14px] font-medium transition-colors duration-150 ${
                    isActive(item.href)
                      ? 'text-o-0 bg-[rgba(255,255,255,0.06)]'
                      : 'text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ letterSpacing: '-0.005em' }}
                >
                  {isActive(item.href) && <span className="w-1 h-3.5 bg-[#00B0FF] rounded-full flex-shrink-0" />}
                  {t(item.title)}
                </Link>
              ))}

              <button
                onClick={() => { setShowCareerGuide(true); setIsOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-md text-[14px] font-medium text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-150"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00B0FF]" />
                Career Guide
              </button>

              <div className="h-px my-3" style={{ background: 'var(--o-border-0)' }} />

              {isInitialized && (
                user ? (
                  <button onClick={handleDashboardClick} className="btn-o btn-o-primary w-full">
                    {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => { navigate('/login'); setIsOpen(false); }}
                      className="btn-o btn-o-ghost w-full"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => { setShowEnrollment(true); setIsOpen(false); }}
                      className="btn-o btn-o-primary w-full"
                    >
                      Get started
                      <ArrowRight className="w-3.5 h-3.5" />
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
