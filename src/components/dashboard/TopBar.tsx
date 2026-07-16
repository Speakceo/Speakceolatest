import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  ChevronDown, 
  User, 
  LogOut, 
  HelpCircle,
  Menu,
  X,
  Zap,
  Flame,
  Trophy,
  Star
} from 'lucide-react';
import { useUserStore } from '../../lib/store';
import ThemeToggle from '../ThemeToggle';

export default function TopBar() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const notifications = [
    {
      id: 1,
      title: 'New AI Tool Unlocked!',
      description: 'Business Plan Generator is now available.',
      time: '2h ago',
      read: false,
      type: 'achievement',
      emoji: '🚀'
    },
    {
      id: 2,
      title: 'Task Due Tomorrow',
      description: 'Submit your business model canvas.',
      time: '5h ago',
      read: true,
      type: 'task',
      emoji: '📝'
    },
    {
      id: 3,
      title: '10-Lesson Streak!',
      description: "You've completed 10 lessons in a row!",
      time: '1d ago',
      read: true,
      type: 'achievement',
      emoji: '🔥'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node) && !(event.target as Element).closest('.notifications-trigger')) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node) && !(event.target as Element).closest('.user-menu-trigger')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const markAllNotificationsAsRead = () => {
    setHasNewNotifications(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[color-mix(in_srgb,var(--o-bg-0)_88%,transparent)] backdrop-blur-xl border-b border-[var(--o-border-1)] pt-[env(safe-area-inset-top)]">
      <div className="pl-14 pr-3 sm:px-6 lg:pl-8 lg:pr-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left - Search */}
          <div className="flex-1 max-w-lg">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative rounded-xl transition-all duration-200 ${
                searchFocused ? 'ring-1 ring-[#1876D2]/40' : ''
              }`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className={`h-4 w-4 transition-colors ${searchFocused ? 'text-[#00B0FF]' : 'text-o-3'}`} />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="block w-full rounded-xl border border-[var(--o-border-1)] py-2 pl-9 pr-3 bg-o-2 text-o-0 text-sm placeholder:text-o-3 focus:outline-none focus:border-[var(--o-accent-ring)]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </form>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            {/* XP Quick Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#1876D2]/10 to-[#00B0FF]/10 border border-[#1876D2]/20 mr-1">
              <Zap className="h-3.5 w-3.5 text-[#00B0FF]" />
              <span className="text-xs font-bold text-[#00B0FF]">1,250 XP</span>
            </div>
            
            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 mr-1">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">7</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="notifications-trigger relative p-2 rounded-xl text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-hover)] transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-[18px] w-[18px]" />
                {hasNewNotifications && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#00B0FF] ring-2 ring-[var(--o-bg-0)]" />
                )}
              </button>
              
              {showNotifications && (
                <div 
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-1.5rem))] origin-top-right rounded-2xl bg-o-2 backdrop-blur-xl py-1 shadow-2xl border border-[var(--o-border-1)]"
                >
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-[var(--o-border-1)]">
                    <h3 className="text-sm font-semibold text-o-0">Notifications</h3>
                    <button onClick={markAllNotificationsAsRead} className="text-[10px] text-[#00B0FF] hover:underline font-medium">
                      Mark all read
                    </button>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto py-1">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-[var(--o-ghost-bg)] transition-colors ${!n.read ? 'bg-[#1876D2]/5' : ''}`}>
                        <div className="flex gap-3">
                          <span className="text-lg">{n.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-medium text-o-0">{n.title}</p>
                              <span className="text-[10px] text-o-3 ml-2 flex-shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-o-2 mt-0.5">{n.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-[var(--o-border-1)] px-4 py-2">
                    <button className="text-[11px] text-[#00B0FF] hover:underline w-full text-center font-medium" onClick={() => navigate('/dashboard/notifications')}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <ThemeToggle size="sm" className="mr-0.5" />

            {/* Settings — hide on very small screens */}
            <button
              type="button"
              className="hidden sm:inline-flex p-2 rounded-xl text-o-2 hover:text-o-0 hover:bg-[var(--o-ghost-hover)] transition-colors"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="h-[18px] w-[18px]" />
            </button>

            {/* User Profile */}
            <div className="relative ml-1">
              <button
                type="button"
                className="user-menu-trigger flex items-center gap-2 rounded-xl p-1.5 hover:bg-[var(--o-ghost-hover)] transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name || 'Profile'} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-[11px]">{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="hidden sm:flex sm:items-center">
                  <span className="text-xs font-medium text-o-1 truncate max-w-[80px]">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDown className="ml-0.5 h-3 w-3 text-o-3" />
                </div>
              </button>
              
              {showUserMenu && (
                <div 
                  ref={userMenuRef}
                  className="absolute right-0 mt-2 w-52 origin-top-right rounded-2xl bg-o-2 backdrop-blur-xl py-1 shadow-2xl border border-[var(--o-border-1)]"
                >
                  <div className="px-4 py-3 border-b border-[var(--o-border-1)]">
                    <p className="text-sm font-medium text-o-0">{user?.name || 'User'}</p>
                    <p className="text-[11px] text-o-3 truncate">{user?.email || 'user@example.com'}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-[#00B0FF]" />
                        <span className="text-[10px] text-[#00B0FF] font-bold">1,250 XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-[10px] text-yellow-400 font-bold">Lv 5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button className="flex w-full items-center px-4 py-2 text-xs text-o-1 hover:bg-[var(--o-ghost-hover)] transition-colors" onClick={() => navigate('/dashboard/profile')}>
                      <User className="mr-2.5 h-3.5 w-3.5 text-o-3" />
                      Your Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-xs text-o-1 hover:bg-[var(--o-ghost-hover)] transition-colors" onClick={() => navigate('/dashboard/achievements')}>
                      <Trophy className="mr-2.5 h-3.5 w-3.5 text-o-3" />
                      Achievements
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-xs text-o-1 hover:bg-[var(--o-ghost-hover)] transition-colors" onClick={() => navigate('/dashboard/settings')}>
                      <Settings className="mr-2.5 h-3.5 w-3.5 text-o-3" />
                      Settings
                    </button>
                  </div>
                  
                  <div className="border-t border-[var(--o-border-1)] pt-1 pb-1">
                    <button className="flex w-full items-center px-4 py-2 text-xs text-red-400 hover:bg-red-500/5 transition-colors" onClick={handleLogout}>
                      <LogOut className="mr-2.5 h-3.5 w-3.5" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
