import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useUserStore } from '../lib/store';
import { useLanguage } from '../lib/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import EnrollmentPopup from './EnrollmentPopup';
import CareerGuidePopup from './career/CareerGuidePopup';
import ThemeToggle from './ThemeToggle';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isInitialized } = useUserStore();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleDashboardClick = () => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setShowEnrollment(true);
    }
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleEnrollmentClick = () => {
    setShowEnrollment(true);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full relative z-40">
      {/* Premium Navbar — Dark glassmorphism with scroll-aware effects */}
      <nav className={`fixed w-full z-50 transition-all duration-500 top-0 left-0 ${
        scrolled ? 'py-0' : 'py-1'
      }`}>
        {/* Layered background for depth */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-2xl shadow-lg shadow-black/20'
            : 'bg-slate-950/70 backdrop-blur-xl'
        }`}></div>
        
        {/* Animated gradient accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]">
          <div className="h-full bg-gradient-to-r from-transparent via-[#00B0FF]/40 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with white invert + brand glow */}
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="relative flex items-center group"
              >
                {/* Subtle blue glow behind logo on hover */}
                <div className="absolute -inset-2 bg-[#00B0FF]/0 group-hover:bg-[#00B0FF]/10 rounded-xl transition-all duration-500 blur-lg"></div>
                <img 
                  src="/images/hero/orbit-logo.png" 
                  alt="Orbit Student" 
                  className="relative h-9 w-auto brightness-0 invert opacity-95 group-hover:opacity-100 transform transition-all duration-300 group-hover:scale-105"
                  style={{
                    filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(0, 176, 255, 0.3))',
                  }}
                />
              </button>
            </div>

            {/* Desktop Menu — pill-style navigation */}
            <div className="hidden md:flex items-center space-x-0.5">
              <LanguageToggle />
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 ${
                    isActive(item.href) 
                    ? 'text-white bg-white/[0.1] shadow-inner shadow-[#00B0FF]/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#00B0FF] rounded-full"></span>
                  )}
                  {t(item.title)}
                </Link>
              ))}
              
              {/* Career Guide with sparkle accent */}
              <button
                onClick={() => setShowCareerGuide(true)}
                className="relative px-4 py-2 rounded-full text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00B0FF]" />
                Career Guide
              </button>
              
              <ThemeToggle size="sm" />
              
              {/* Auth Buttons — separated by divider */}
              {isInitialized && (
                <>
                  <div className="w-[1px] h-5 bg-white/[0.1] mx-2"></div>
                  {user ? (
                    <button
                      onClick={handleDashboardClick}
                      className="relative px-5 py-2 rounded-full text-[13px] font-semibold text-white overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00B0FF] to-[#1876D2] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="relative">{user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleLoginClick}
                        className="px-4 py-2 rounded-full text-[13px] font-medium text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
                      >
                        Login
                      </button>
                      <button
                        onClick={handleEnrollmentClick}
                        className="relative px-5 py-2 rounded-full text-[13px] font-semibold text-white overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] transition-all duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00B0FF] to-[#1876D2] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </div>
                        <span className="relative flex items-center gap-1.5">
                          Get Started
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle size="sm" />
              <LanguageToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — dark glass with smooth slide */}
      <div 
        className={`md:hidden fixed w-full bg-slate-950/95 backdrop-blur-2xl border-b border-white/[0.06] transition-all duration-400 transform z-40 ${
          isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <div className="px-4 py-4 space-y-1">
          {menuItems.map((item, idx) => (
            <Link
              key={item.title}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href) 
                ? 'text-white bg-gradient-to-r from-[#1876D2]/20 to-[#00B0FF]/10 border border-[#00B0FF]/20'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {isActive(item.href) && (
                <span className="w-1 h-4 bg-[#00B0FF] rounded-full"></span>
              )}
              {t(item.title)}
            </Link>
          ))}
          <button
            onClick={() => { setShowCareerGuide(true); setIsOpen(false); }}
            className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 text-[#00B0FF]" />
            Career Guide
          </button>
          
          {/* Divider */}
          <div className="h-[1px] bg-white/[0.06] my-2"></div>
          
          {isInitialized && (
            user ? (
              <button
                onClick={handleDashboardClick}
                className="w-full mt-2 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 text-center shadow-lg shadow-[#1876D2]/20"
              >
                {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
              </button>
            ) : (
              <div className="space-y-2 mt-2">
                <button
                  onClick={handleLoginClick}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 border border-white/[0.06]"
                >
                  Login
                </button>
                <button
                  onClick={handleEnrollmentClick}
                  className="w-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 text-center shadow-lg shadow-[#1876D2]/20"
                >
                  Get Started →
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
      {showCareerGuide && <CareerGuidePopup isOpen={showCareerGuide} onClose={() => setShowCareerGuide(false)} />}
    </div>
  );
}