import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '../lib/store';
import { useLanguage } from '../lib/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import EnrollmentPopup from './EnrollmentPopup';
import CareerGuidePopup from './career/CareerGuidePopup';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { title: 'nav.home', href: '/' },
  { title: 'nav.courses', href: '/courses' },
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

  return (
    <div className="w-full relative z-40">
      {/* Modern Transparent Navbar with Glassmorphism */}
      <nav className="fixed w-full z-50 transition-all duration-300 top-0 left-0">
        {/* Transparent glassmorphism background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Modern Logo Section */}
            <div className="flex items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center group"
              >
                <img 
                  src="/images/hero/orbit-logo.png" 
                  alt="Orbit Logo" 
                  className="h-9 w-auto transform transition-all duration-300 group-hover:scale-110 drop-shadow-md"
                />
              </button>
            </div>

            {/* Modern Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <LanguageToggle />
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href) 
                    ? 'text-[#1876D2] bg-white/60 shadow-sm' 
                    : 'text-gray-700 hover:text-[#1876D2] hover:bg-white/40'
                  }`}
                >
                  {t(item.title)}
                </Link>
              ))}
              
              {/* Career Guide Button */}
              <button
                onClick={() => setShowCareerGuide(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1876D2] hover:bg-[#00B0FF] text-white transition-all duration-200 ml-2"
              >
                Career Guide
              </button>
              
              {/* Theme Toggle */}
              <ThemeToggle size="sm" />
              
              {/* Modern Auth Buttons */}
              {isInitialized && (
                user ? (
                  <button
                    onClick={handleDashboardClick}
                    className="px-5 py-2 rounded-lg text-sm font-medium bg-[#1876D2] hover:bg-[#00B0FF] text-white transition-all duration-200 ml-2"
                  >
                    {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 ml-2">
                    <button
                      onClick={handleLoginClick}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-[#1876D2] hover:bg-white/40 transition-all duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleEnrollmentClick}
                      className="px-5 py-2 rounded-lg text-sm font-medium bg-[#1876D2] hover:bg-[#00B0FF] text-white transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Modern Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle size="sm" />
              <LanguageToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-[#1876D2] hover:bg-white/40 transition-all duration-200"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Mobile Menu */}
      <div 
        className={`md:hidden fixed w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ top: '64px' }}
      >
        <div className="px-4 py-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.href) 
                ? 'text-[#1876D2] bg-white/60' 
                : 'text-gray-700 hover:text-[#1876D2] hover:bg-white/40'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {t(item.title)}
            </Link>
          ))}
          <button
            onClick={() => {
              setShowCareerGuide(true);
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-[#1876D2] hover:bg-[#00B0FF] text-white transition-all duration-200 mt-2"
          >
            Career Guide
          </button>
          {isInitialized && (
            user ? (
              <button
                onClick={handleDashboardClick}
                className="w-full mt-3 bg-[#1876D2] hover:bg-[#00B0FF] text-white px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center"
              >
                {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
              </button>
            ) : (
              <div className="space-y-2 mt-3">
                <button
                  onClick={handleLoginClick}
                  className="w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-[#1876D2] hover:bg-white/40 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleEnrollmentClick}
                  className="w-full bg-[#1876D2] hover:bg-[#00B0FF] text-white px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center"
                >
                  Get Started
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