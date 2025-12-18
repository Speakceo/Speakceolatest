import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, Sparkles } from 'lucide-react';
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
      {/* Enhanced Navbar with Glass-morphism Effect */}
      <nav className="fixed w-full z-50 transition-all duration-300 top-0 left-0 min-h-[80px]">
        {/* Light background with clean design */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-b border-blue-100 min-h-[80px] shadow-sm"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-3 py-3">
              <button 
                onClick={handleLogoClick}
                className="flex items-center space-x-3 group"
              >
                <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-[#1876D2] to-[#00B0FF] text-white shadow-lg transform transition-all duration-300 group-hover:scale-105">
                  <GraduationCap className="h-8 w-8 z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#1876D2] transition-all duration-300">
                    ORBIT
                  </span>
                  <span className="text-xs text-[#00B0FF] font-medium tracking-wider">
                    FUTURE ACADEMY
                  </span>
                </div>
              </button>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <LanguageToggle />
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    isActive(item.href) 
                    ? 'bg-[#E3F2FD] text-[#1876D2] shadow-sm' 
                    : 'text-gray-700 hover:bg-[#E3F2FD] hover:text-[#1876D2]'
                  }`}
                >
                  <span className="relative z-10">{t(item.title)}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 rounded-xl bg-blue-50"></div>
                  )}
                </Link>
              ))}
              
              {/* Career Guide Button */}
              <button
                onClick={() => setShowCareerGuide(true)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#1876D2] hover:bg-[#1565C0] text-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                Career Guide
              </button>
              
              {/* Theme Toggle */}
              <ThemeToggle size="sm" />
              
              {/* Enhanced Auth Buttons */}
              {isInitialized && (
                user ? (
                  <button
                    onClick={handleDashboardClick}
                    className="relative px-6 py-3 rounded-full text-sm font-semibold bg-[#1876D2] hover:bg-[#1565C0] text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10">
                      {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLoginClick}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-[#1876D2] hover:bg-[#E3F2FD] transition-all duration-300"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleEnrollmentClick}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:shadow-lg text-center shadow-xl"
                    >
                      Get Started
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle size="sm" />
              <LanguageToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#1876D2] transition-all duration-300 p-2 rounded-xl hover:bg-[#E3F2FD]"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed w-full bg-white/95 backdrop-blur-md border-b border-[#E3F2FD] shadow-lg transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ top: '80px' }}
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`block px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                isActive(item.href) 
                ? 'bg-[#E3F2FD] text-[#1876D2]' 
                : 'text-gray-700 hover:bg-[#E3F2FD] hover:text-[#1876D2]'
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
            className="block w-full text-left px-5 py-4 rounded-xl text-base font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
          >
            Career Guide
          </button>
          {isInitialized && (
            user ? (
              <button
                onClick={handleDashboardClick}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg text-center shadow-md"
              >
                {user.role === 'admin' ? 'Admin Panel' : t('nav.dashboard')}
              </button>
            ) : (
              <div className="space-y-3 mt-4">
                <button
                  onClick={handleLoginClick}
                  className="w-full px-5 py-4 rounded-xl text-base font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={handleEnrollmentClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 text-center shadow-sm"
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