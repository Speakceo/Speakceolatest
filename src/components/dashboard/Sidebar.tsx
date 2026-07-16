import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Trophy,
  BrainCircuit,
  MessageSquare,
  TrendingUp,
  X,
  Menu,
  Map,
  HelpCircle,
  CheckSquare,
  Settings,
  Sparkles,
  Video,
  BarChart,
  User,
  Award,
  Calendar,
  Rocket,
  LogOut,
  ChevronLeft,
  Zap,
  Gamepad2,
  Crown
} from 'lucide-react';
import { useUserStore } from '../../lib/store';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Game Zone', href: '/dashboard/games', icon: Gamepad2, badge: '🎮' },
  { name: 'Startup Empire', href: '/dashboard/startup-empire', icon: Crown, badge: '🔥' },
  { name: 'Learning Journey', href: '/dashboard/journey', icon: Map, badge: null },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen, badge: '3' },
  { name: 'Live Classes', href: '/dashboard/live-classes', icon: Video, badge: 'LIVE' },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, badge: '2' },
  { name: 'Business Lab', href: '/dashboard/business-lab', icon: BrainCircuit, badge: null },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: Sparkles, badge: 'NEW' },
  { name: 'Community', href: '/dashboard/community', icon: Users, badge: null },
  { name: 'Achievements', href: '/dashboard/achievements', icon: Trophy, badge: null },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp, badge: null },
  { name: 'Ask CEO', href: '/dashboard/messages', icon: MessageSquare, badge: null },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle, badge: null }
];

interface SidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useUserStore();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  useEffect(() => {
    if (!isMobile || !isMobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMobile, isMobileOpen]);

  const handleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (href: string) => 
    location.pathname === href || (href !== '/dashboard' && location.pathname.startsWith(href));

  const NavItem = ({ item, collapsed = false }: { item: typeof navigation[0]; collapsed?: boolean }) => {
    const active = isActive(item.href);
    return (
      <button
        onClick={() => { navigate(item.href); if (isMobile) setIsMobileOpen(false); }}
        className={`group relative flex items-center w-full rounded-[8px] transition-all duration-150 ${
          collapsed ? 'justify-center p-2.5' : 'px-2.5 py-2'
        } ${
          active
            ? 'bg-[var(--o-accent-soft)] text-[var(--o-accent-bright)]'
            : 'text-o-2 hover:bg-[var(--o-ghost-hover)] hover:text-o-0'
        }`}
        title={collapsed ? item.name : ''}
        style={{ minHeight: 36 }}
      >
        {/* Active left accent bar */}
        {active && !collapsed && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full bg-[var(--o-accent-bright)]" />
        )}

        <item.icon className={`flex-shrink-0 transition-colors ${
          collapsed ? 'h-[18px] w-[18px]' : 'h-4 w-4 mr-2.5'
        } ${active ? 'text-[var(--o-accent-bright)]' : 'text-current'}`} />

        {!collapsed && (
          <span className="text-[13px] font-[500] flex-1 text-left leading-none truncate">
            {item.name}
          </span>
        )}

        {/* Badges */}
        {!collapsed && item.badge && (
          <span className={`ml-auto text-[10px] font-bold px-1.5 py-[2px] rounded-[4px] flex-shrink-0 ${
            item.badge === 'LIVE' ? 'bg-red-500/15 text-red-400 animate-pulse' :
            item.badge === 'NEW' ? 'bg-[#00B0FF]/12 text-[#00B0FF]' :
            item.badge === '🔥' ? 'text-[13px] leading-none' :
            item.badge === '🎮' ? 'text-[13px] leading-none' :
            'bg-[rgba(255,255,255,0.06)] text-o-2'
          }`}>
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const LogoSection = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-5`}>
      {collapsed ? (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center shadow-lg shadow-[#1876D2]/20">
          <Rocket className="h-5 w-5 text-white" />
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center shadow-lg shadow-[#1876D2]/20">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-o-0 text-sm tracking-tight">Orbit Student</h2>
            <p className="text-[10px] text-o-3 font-medium">AI Learning Hub</p>
          </div>
        </div>
      )}
    </div>
  );

  const UserSection = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className={`border-t border-[var(--o-border-0)] ${collapsed ? 'p-2 space-y-1.5' : 'p-3 space-y-2'}`}>
      {/* XP level card — gamified-app skill pattern */}
      {!collapsed && (
        <div className="rounded-[10px] p-3 mb-1" style={{ background: 'rgba(24,118,210,0.07)', border: '1px solid rgba(24,118,210,0.12)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-o-0 leading-none">LV 7 · 1,240 XP</p>
              <p className="text-[10px] text-o-2 mt-0.5">760 XP to Level 8</p>
            </div>
            <span className="text-[10px] font-bold text-[#ff9600] bg-[rgba(255,150,0,0.1)] border border-[rgba(255,150,0,0.2)] rounded-full px-1.5 py-0.5 flex-shrink-0">🔥 12d</span>
          </div>
          {/* XP bar */}
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: '62%', background: '#58cc02', boxShadow: '0 0 6px rgba(88,204,2,0.35)' }} />
          </div>
        </div>
      )}

      {/* User info */}
      {!collapsed ? (
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#1876D2]/40 to-[#00B0FF]/40 flex items-center justify-center flex-shrink-0 border border-[rgba(255,255,255,0.06)]">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name || 'User'} className="h-7 w-7 rounded-lg object-cover" />
            ) : (
              <span className="text-[#00B0FF] font-bold text-[10px]">{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-o-0 text-[12px] truncate leading-none">{user?.name || 'Student'}</p>
            <p className="text-[10px] text-o-3 truncate mt-0.5">{user?.email || ''}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 rounded-lg text-o-3 hover:text-red-400 hover:bg-[rgba(239,68,68,0.06)] transition-colors flex-shrink-0" title="Sign Out">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button onClick={handleLogout}
          className="w-full flex justify-center p-2 rounded-lg text-o-3 hover:text-red-400 hover:bg-[rgba(239,68,68,0.06)] transition-colors"
          title="Sign Out">
          <LogOut className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  // ═══ MOBILE SIDEBAR ═══
  if (isMobile) {
    return (
      <>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-[calc(0.75rem+env(safe-area-inset-top))] left-3 z-[35] p-2.5 rounded-xl bg-o-2 backdrop-blur-xl border border-[var(--o-border-1)] shadow-xl min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu className="h-5 w-5 text-o-1" />
        </button>
        
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        
        <aside className={`fixed top-0 left-0 z-50 h-full w-[260px] backdrop-blur-xl transform transition-transform duration-300 ease-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ background: 'var(--o-bg-1)', borderRight: '1px solid var(--o-border-0)' }}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4">
              <LogoSection />
              <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-[var(--o-ghost-hover)]">
                <X className="h-4 w-4 text-o-3" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
              {navigation.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </nav>
            
            <UserSection />
          </div>
        </aside>
      </>
    );
  }

  // ═══ DESKTOP SIDEBAR — Linear dark precision ═══
  return (
    <aside className={`fixed top-0 left-0 h-screen flex flex-col z-10 transition-all duration-300 ease-out ${
      isCollapsed ? 'w-[60px]' : 'w-[240px]'
    }`} style={{ background: 'var(--o-bg-1)', borderRight: '1px solid var(--o-border-0)' }}>
      {/* Logo row */}
      <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--o-border-0)', minHeight: 56 }}>
        <LogoSection collapsed={isCollapsed} />
        {!isCollapsed && (
          <button
            onClick={handleCollapse}
            className="p-1.5 rounded-lg mr-3 text-o-3 hover:text-o-1 hover:bg-[var(--o-ghost-hover)] transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={handleCollapse}
            className="p-1.5 rounded-lg mx-auto text-o-3 hover:text-o-1 hover:bg-[var(--o-ghost-hover)] transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5 rotate-180" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-[2px]"
        style={{ scrollbarWidth: 'none' }}>
        {navigation.map((item) => (
          <NavItem key={item.href} item={item} collapsed={isCollapsed} />
        ))}
      </nav>

      {/* User + XP */}
      <UserSection collapsed={isCollapsed} />
    </aside>
  );
}
