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
    <header className="sticky top-0 z-30 bg-[#0c1222]/80 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Left - Search */}
          <div className="flex-1 max-w-lg">
            <form onSubmit={handleSearch} className="relative">
              <div className={`relative rounded-xl transition-all duration-200 ${
                searchFocused ? 'ring-1 ring-[#1876D2]/40' : ''
              }`}>
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className={`h-4 w-4 transition-colors ${searchFocused ? 'text-[#00B0FF]' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search courses, tools, tasks..."
                  className="block w-full rounded-xl border-0 py-2 pl-9 pr-3 bg-white/[0.04] text-white text-sm placeholder:text-gray-500 focus:outline-none focus:bg-white/[0.06]"
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
                className="notifications-trigger relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-[18px] w-[18px]" />
                {hasNewNotifications && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#00B0FF] ring-2 ring-[#0c1222]" />
                )}
              </button>
              
              {showNotifications && (
                <div 
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl bg-[#111827]/95 backdrop-blur-xl py-1 shadow-2xl border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/[0.04]">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <button onClick={markAllNotificationsAsRead} className="text-[10px] text-[#00B0FF] hover:underline font-medium">
                      Mark all read
                    </button>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto py-1">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-white/[0.02] transition-colors ${!n.read ? 'bg-[#1876D2]/5' : ''}`}>
                        <div className="flex gap-3">
                          <span className="text-lg">{n.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-medium text-white">{n.title}</p>
                              <span className="text-[10px] text-gray-500 ml-2 flex-shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">{n.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-white/[0.04] px-4 py-2">
                    <button className="text-[11px] text-[#00B0FF] hover:underline w-full text-center font-medium" onClick={() => navigate('/dashboard/notifications')}>
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Settings */}
            <button
              type="button"
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="h-[18px] w-[18px]" />
            </button>

            {/* User Profile */}
            <div className="relative ml-1">
              <button
                type="button"
                className="user-menu-trigger flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/[0.04] transition-colors"
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
                  <span className="text-xs font-medium text-gray-300 truncate max-w-[80px]">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDown className="ml-0.5 h-3 w-3 text-gray-500" />
                </div>
              </button>
              
              {showUserMenu && (
                <div 
                  ref={userMenuRef}
                  className="absolute right-0 mt-2 w-52 origin-top-right rounded-2xl bg-[#111827]/95 backdrop-blur-xl py-1 shadow-2xl border border-white/[0.06]"
                >
                  <div className="px-4 py-3 border-b border-white/[0.04]">
                    <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
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
                    <button className="flex w-full items-center px-4 py-2 text-xs text-gray-300 hover:bg-white/[0.04] transition-colors" onClick={() => navigate('/dashboard/profile')}>
                      <User className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
                      Your Profile
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-xs text-gray-300 hover:bg-white/[0.04] transition-colors" onClick={() => navigate('/dashboard/achievements')}>
                      <Trophy className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
                      Achievements
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-xs text-gray-300 hover:bg-white/[0.04] transition-colors" onClick={() => navigate('/dashboard/settings')}>
                      <Settings className="mr-2.5 h-3.5 w-3.5 text-gray-500" />
                      Settings
                    </button>
                  </div>
                  
                  <div className="border-t border-white/[0.04] pt-1 pb-1">
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
