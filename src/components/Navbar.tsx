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
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full relative z-40">
      <div className="fixed z-50 top-0 left-0 right-0 pointer-events-none">
        <div className={`px-3 sm:px-5 pt-3 sm:pt-4 transition-all duration-500 ${scrolled ? 'pt-2.5 sm:pt-3' : ''}`}>
          <nav
            className={`pointer-events-auto mx-auto max-w-5xl nav-island rounded-full transition-all duration-500 ${
              scrolled ? 'shadow-[0_20px_50px_-30px_rgba(0,176,255,0.35)]' : ''
            }`}
          >
            <div className="flex justify-between items-center h-[52px] px-3 sm:px-4">
              <button onClick={handleLogoClick} className="flex items-center flex-shrink-0 gap-2.5 pl-1 group">
                <img
                  src="/images/hero/orbit-logo.png"
                  alt="Orbit Student"
                  className="h-6 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <span className="hidden sm:inline font-display text-[15px] tracking-tight text-o-0">
                  Orbit
                </span>
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
                        style={{ background: 'rgba(255,255,255,0.07)' }}
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

                {isInitialized && (
                  user ? (
                    <button onClick={handleDashboardClick} className="btn-o btn-o-primary ml-1" style={{ height: 34, padding: '0 14px', fontSize: 13 }}>
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
                  )
                )}
              </div>

              <div className="md:hidden flex items-center gap-1.5">
                <ThemeToggle size="sm" />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-full text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden fixed left-3 right-3 top-[72px] z-40 nav-island rounded-[1.25rem] overflow-hidden"
          >
            <div className="px-3 py-3 space-y-0.5">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-o-0 bg-[rgba(255,255,255,0.07)]'
                        : 'text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {isActive(item.href) && <span className="w-1 h-3.5 bg-[#00B0FF] rounded-full flex-shrink-0" />}
                    {t(item.title)}
                  </Link>
                </motion.div>
              ))}

              <button
                onClick={() => { setShowCareerGuide(true); setIsOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-[14px] font-medium text-o-2 hover:text-o-0 hover:bg-[rgba(255,255,255,0.04)] transition-colors"
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
                      <span className="btn-o-icon">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
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
