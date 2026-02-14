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
        className={`group relative flex items-center w-full ${collapsed ? 'justify-center' : ''} px-3 py-2.5 rounded-xl transition-all duration-200 ${
          active
            ? 'bg-gradient-to-r from-[#1876D2]/20 to-[#00B0FF]/10 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
        }`}
        title={collapsed ? item.name : ''}
      >
        {/* Active indicator */}
        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-gradient-to-b from-[#1876D2] to-[#00B0FF]" />
        )}
        
        <item.icon className={`h-[18px] w-[18px] flex-shrink-0 ${
          active ? 'text-[#00B0FF]' : 'text-gray-500 group-hover:text-gray-300'
        } ${collapsed ? '' : 'mr-3'}`} />
        
        {!collapsed && (
          <span className={`text-[13px] font-medium flex-1 text-left ${active ? 'text-white' : ''}`}>
            {item.name}
          </span>
        )}
        
        {/* Badges */}
        {!collapsed && item.badge && (
          <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
            item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400 animate-pulse' :
            item.badge === 'NEW' ? 'bg-[#00B0FF]/15 text-[#00B0FF]' :
            'bg-white/[0.06] text-gray-400'
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
            <h2 className="font-bold text-white text-sm tracking-tight">Orbit Student</h2>
            <p className="text-[10px] text-gray-500 font-medium">AI Learning Hub</p>
          </div>
        </div>
      )}
    </div>
  );

  const UserSection = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className={`border-t border-white/[0.04] ${collapsed ? 'p-2' : 'p-3'}`}>
      {!collapsed && (
        <div className="flex items-center px-3 py-2 rounded-xl mb-2 bg-white/[0.02]">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1876D2]/30 to-[#00B0FF]/30 flex items-center justify-center mr-3 border border-white/[0.06]">
            {user?.avatar ? (
              <img src={user.avatar} alt={user?.name || 'User'} className="h-8 w-8 rounded-lg object-cover" />
            ) : (
              <span className="text-[#00B0FF] font-semibold text-xs">{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white text-xs truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
      )}
      
      <button
        onClick={handleLogout}
        className={`w-full flex items-center ${
          collapsed ? 'justify-center' : 'justify-center'
        } px-3 py-2 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors text-xs`}
        title={collapsed ? 'Sign Out' : ''}
      >
        <LogOut className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
        {!collapsed && <span>Sign Out</span>}
      </button>
    </div>
  );

  // ═══ MOBILE SIDEBAR ═══
  if (isMobile) {
    return (
      <>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] shadow-xl"
        >
          <Menu className="h-5 w-5 text-gray-300" />
        </button>
        
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        
        <aside className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-[#0a0f1e]/95 backdrop-blur-xl border-r border-white/[0.04] transform transition-transform duration-300 ease-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4">
              <LogoSection />
              <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-white/[0.04]">
                <X className="h-4 w-4 text-gray-500" />
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

  // ═══ DESKTOP SIDEBAR ═══
  return (
    <aside className={`fixed top-0 left-0 h-screen bg-[#0a0f1e]/95 backdrop-blur-xl border-r border-white/[0.04] transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-[260px]'
    } flex flex-col z-10`}>
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-white/[0.04]">
        <LogoSection collapsed={isCollapsed} />
        <button 
          onClick={handleCollapse}
          className={`p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
        >
          <ChevronLeft className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} collapsed={isCollapsed} />
          ))}
        </div>
      </nav>
      
      {/* User */}
      <UserSection collapsed={isCollapsed} />
    </aside>
  );
}
