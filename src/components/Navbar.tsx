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
  { title: 'nav.courses', href: '/courses/' },
  { title: 'nav.resources', href: '/resources/' },
  { title: 'nav.about', href: '/about/' },
  { title: 'nav.contact', href: '/contact/' },
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

  const handleLogoClick = () => {
    navigate('/');
    setIsOpen(false);
  };
  const handleDashboardClick = () => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setShowEnrollment(true);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <div className="w-full relative z-40">
      <div className="fixed z-50 top-0 left-0 right-0 pointer-events-none pt-[env(safe-area-inset-top)]">
        <div
          className={`px-3 sm:px-5 pt-3 sm:pt-4 transition-all duration-500 ${
            scrolled ? 'pt-2.5 sm:pt-3' : ''
          }`}
        >
          <nav
            className={`pointer-events-auto mx-auto max-w-5xl nav-island rounded-full transition-all duration-500 ${
              scrolled ? 'shadow-[0_20px_50px_-30px_rgba(0,176,255,0.35)]' : ''
            }`}
          >
            <div className="flex justify-between items-center h-[52px] px-3 sm:px-4">
              <button
                onClick={handleLogoClick}
                className="flex items-center flex-shrink-0 pl-1 group min-h-[44px]"
                aria-label="Orbit Student home"
              >
                <img
                  src="/images/hero/orbit-logo.png"
                  alt="Orbit Student"
                  className="orbit-logo-mark h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                />
              </button>

              <div className="hidden md:flex items-center gap-0.5">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                      isActive(item.href) ? 'text-o-0' : 'text-o-2 hover:text-o-0'
                    }`}
                  >
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--o-ghost-hover)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t(item.title)}</span>
                  </Link>
                ))}

                <button
                  onClick={() => setShowCareerGuide(true)}
                  className="relative px-3 py-1.5 rounded-full text-[13px] font-medium text-o-2 hover:text-o-0 transition-colors duration-200 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#00B0FF]" />
                  Guide
                </button>
              </div>

              <div className="hidden md:flex items-center gap-1.5">
                <LanguageToggle />
                <ThemeToggle size="sm" />

                {isInitialized &&
                  (user ? (
                    <button
                      onClick={handleDashboardClick}
                      className="btn-o btn-o-primary ml-1"
                      style={{ height: 34, padding: '0 14px', fontSize: 13 }}
                    >
                      {user.role === 'admin' ? 'Admin' : t('nav.dashboard')}
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 ml-1">
                      <button
                        onClick={() => navigate('/login')}
                        className="btn-o btn-o-link"
                        style={{ height: 34, fontSize: 13 }}
                      >
                        Sign in
                      </button>
                      <button
                        onClick={() => setShowEnrollment(true)}
                        className="btn-o btn-o-primary"
                        style={{ height: 34, padding: '0 12px 0 14px', fontSize: 13 }}
                      >
                        Get started
                        <span className="btn-o-icon">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  ))}
              </div>

              <div className="md:hidden flex items-center gap-1">
                <ThemeToggle size="sm" />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-full text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-hover)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed left-3 right-3 top-[calc(72px+env(safe-area-inset-top))] z-40 nav-island rounded-[1.25rem] overflow-hidden max-h-[min(78dvh,640px)] flex flex-col"
            >
              <div className="px-3 py-3 space-y-0.5 overflow-y-auto overscroll-contain">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-[15px] font-medium transition-colors min-h-[44px] ${
                        isActive(item.href)
                          ? 'text-o-0 bg-[var(--o-ghost-hover)]'
                          : 'text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-bg)]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {isActive(item.href) && (
                        <span className="w-1 h-3.5 bg-[#00B0FF] rounded-full flex-shrink-0" />
                      )}
                      {t(item.title)}
                    </Link>
                  </motion.div>
                ))}

                <button
                  onClick={() => {
                    setShowCareerGuide(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-3 rounded-xl text-[15px] font-medium text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-bg)] transition-colors min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00B0FF]" />
                  Career Guide
                </button>

                <div className="px-2 py-2">
                  <LanguageToggle />
                </div>

                <div className="h-px my-2" style={{ background: 'var(--o-border-0)' }} />

                {isInitialized &&
                  (user ? (
                    <button onClick={handleDashboardClick} className="btn-o btn-o-primary w-full min-h-[48px]">
                      {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                    </button>
                  ) : (
                    <div className="space-y-2 pb-1">
                      <button
                        onClick={() => {
                          navigate('/login');
                          setIsOpen(false);
                        }}
                        className="btn-o btn-o-ghost w-full min-h-[48px]"
                      >
                        Sign in
                      </button>
                      <button
                        onClick={() => {
                          setShowEnrollment(true);
                          setIsOpen(false);
                        }}
                        className="btn-o btn-o-primary w-full min-h-[48px]"
                      >
                        Get started
                        <span className="btn-o-icon">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showEnrollment && (
        <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />
      )}
      {showCareerGuide && (
        <CareerGuidePopup isOpen={showCareerGuide} onClose={() => setShowCareerGuide(false)} />
      )}
    </div>
  );
}
