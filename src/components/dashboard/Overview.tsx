import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Trophy,
  TrendingUp,
  Calendar,
  Users,
  BrainCircuit,
  Sparkles,
  Bell,
  ArrowUp,
  Target,
  CheckCircle,
  Star,
  Play,
  MessageSquare,
  ArrowRight,
  Video,
  Rocket,
  Lightbulb,
  ChevronRight,
  CheckSquare,
  User,
  Award,
  Zap,
  Flame,
  Crown,
  Gift,
  Map,
  BarChart
} from 'lucide-react';
import { useUserStore } from '../../lib/store';
import { useUserProgress } from '../../contexts/UserProgressContext';
import { getStudentDashboardData, getUserBrandData } from '../../lib/supabase';
import { getDashboardOverviewData } from '../../lib/api/analytics';

export default function Overview() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { 
    progress, 
    getLevelProgress,
    getTotalProgress
  } = useUserProgress();
  
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [userBrand, setUserBrand] = useState<any>(null);
  const [overviewData, setOverviewData] = useState<any>(null);

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
      loadUserBrand();
      fetchOverviewData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    try {
      const data = await getStudentDashboardData(user.id);
      if (data) setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchOverviewData = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const data = await getDashboardOverviewData(user.id);
      setOverviewData(data);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserBrand = async () => {
    if (!user?.id) return;
    try {
      const brandData = await getUserBrandData(user.id);
      if (brandData) setUserBrand(brandData);
    } catch (error) {
      console.error('Error loading brand data:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = user?.name?.split(' ')[0] || 'Student';
    if (hour < 12) return { greeting: 'Good morning', name, emoji: '☀️' };
    if (hour < 17) return { greeting: 'Good afternoon', name, emoji: '🚀' };
    return { greeting: 'Good evening', name, emoji: '🌙' };
  };

  const progressPercentage = overviewData?.stats?.courseProgress || getTotalProgress() || 0;
  const completedLessons = overviewData?.stats?.completedLessons || 0;
  const totalLessons = overviewData?.stats?.totalLessons || 65;
  const currentStreak = overviewData?.stats?.streak || 0;
  const communitySize = overviewData?.stats?.communitySize || 0;
  const achievementsCount = overviewData?.stats?.achievementsCount || 0;
  const userGoals = overviewData?.goals || [];
  const recentAchievements = overviewData?.recentAchievements || [];
  const totalXP = overviewData?.user?.totalXP || 0;
  const currentLevel = overviewData?.user?.currentLevel || 1;

  const { greeting, name: firstName, emoji: greetEmoji } = getGreeting();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00B0FF] animate-spin" />
            <div className="absolute inset-2 rounded-full bg-[#1876D2]/10 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-[#00B0FF]" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ═══ HERO GREETING ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1a2e] to-[#1a1040] p-6 sm:p-8 border border-white/[0.04]">
        {/* Background mesh */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#1876D2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00B0FF]/5 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{greetEmoji}</span>
              <p className="text-gray-400 text-sm font-medium">{greeting}</p>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {firstName}
              {userBrand?.brandData?.name && (
                <span className="text-base font-normal text-gray-500 ml-3">
                  Building {userBrand.brandData.name}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400">
              {progressPercentage > 0 
                ? `You're ${progressPercentage}% through your journey. Keep going!`
                : 'Ready to start your entrepreneurial journey?'}
            </p>
          </div>
          
          {/* Level Card */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/20">
                <Crown className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-[#0c1222] border border-white/[0.1] flex items-center justify-center">
                <span className="text-[9px] font-bold text-yellow-500">{currentLevel}</span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Level {currentLevel}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Zap className="h-3 w-3 text-[#00B0FF]" />
                <span className="text-[11px] text-[#00B0FF] font-semibold">{totalXP.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Pills */}
        <div className="relative flex flex-wrap gap-2 mt-6">
          {[
            { label: 'Continue Learning', icon: Play, color: 'from-[#1876D2] to-[#00B0FF]', href: '/dashboard/courses' },
            { label: 'AI Tools', icon: Sparkles, color: 'from-violet-600 to-purple-500', href: '/dashboard/ai-tools' },
            { label: 'Business Lab', icon: BrainCircuit, color: 'from-emerald-600 to-teal-500', href: '/dashboard/business-lab' },
            { label: 'Live Class', icon: Video, color: 'from-red-500 to-pink-500', href: '/dashboard/live-classes' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.href)}
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all duration-200"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ KPI ROW — Linear/open-design dashboard skill pattern ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Total XP',
            value: totalXP > 0 ? totalXP.toLocaleString() : '1,240',
            icon: Zap,
            iconColor: '#00B0FF',
            iconBg: 'rgba(0,176,255,0.10)',
            delta: '+15 today',
            deltaUp: true,
            bar: 62,
            barColor: '#00B0FF',
          },
          {
            label: 'Day Streak',
            value: currentStreak > 0 ? `${currentStreak}d` : '12d',
            icon: Flame,
            iconColor: '#ff9600',
            iconBg: 'rgba(255,150,0,0.10)',
            delta: currentStreak >= 7 ? '🔥 On fire!' : 'Keep going!',
            deltaUp: true,
            bar: Math.min(100, (currentStreak / 30) * 100) || 40,
            barColor: '#ff9600',
          },
          {
            label: 'Lessons Done',
            value: completedLessons > 0 ? completedLessons.toString() : '14',
            icon: BookOpen,
            iconColor: '#10b981',
            iconBg: 'rgba(16,185,129,0.10)',
            delta: `of ${totalLessons}`,
            deltaUp: true,
            bar: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 22,
            barColor: '#10b981',
          },
          {
            label: 'Achievements',
            value: achievementsCount > 0 ? achievementsCount.toString() : '6',
            icon: Trophy,
            iconColor: '#fbbf24',
            iconBg: 'rgba(251,191,36,0.10)',
            delta: 'badges earned',
            deltaUp: true,
            bar: Math.min(100, achievementsCount * 10) || 30,
            barColor: '#fbbf24',
          },
        ].map((stat) => (
          <div key={stat.label} className="card-kpi group cursor-default">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] font-[500] uppercase tracking-[0.08em] mb-1.5" style={{ color: 'var(--od-text-3)' }}>
                  {stat.label}
                </p>
                <p className="text-[22px] font-bold text-white leading-none tracking-[-0.02em]">{stat.value}</p>
              </div>
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: stat.iconBg }}>
                <stat.icon className="h-4 w-4" style={{ color: stat.iconColor }} />
              </div>
            </div>
            {/* Mini spark bar (dashboard skill: inline SVG chart) */}
            <div className="xp-bar-track mb-2">
              <div className="xp-bar-fill" style={{ width: `${stat.bar}%`, background: stat.barColor, boxShadow: `0 0 6px ${stat.barColor}40` }} />
            </div>
            <p className="text-[11px]" style={{ color: 'var(--od-text-3)' }}>{stat.delta}</p>
          </div>
        ))}
      </div>

      {/* ═══ PROGRESS TRACK ═══ */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#00B0FF]" />
            <h2 className="text-sm font-semibold text-white">Course Progress</h2>
          </div>
          <span className="text-xs text-gray-500">Module {Math.floor(completedLessons / 3) + 1} of 6</span>
        </div>
        
        {/* Progress bar */}
        <div className="relative mb-3">
          <div className="w-full h-3 rounded-full bg-white/[0.04] overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] transition-all duration-1000 relative"
              style={{ width: `${Math.min(100, (completedLessons / totalLessons) * 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
            </div>
          </div>
          {/* Milestone markers */}
          <div className="absolute top-0 left-0 right-0 h-3 flex items-center">
            {[25, 50, 75].map((pct) => (
              <div 
                key={pct} 
                className="absolute w-0.5 h-3"
                style={{ left: `${pct}%` }}
              >
                <div className={`w-0.5 h-full ${(completedLessons / totalLessons) * 100 >= pct ? 'bg-white/30' : 'bg-white/[0.06]'}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{completedLessons} of {totalLessons} lessons completed</span>
          <span className="text-xs font-bold text-[#00B0FF]">{Math.round((completedLessons / totalLessons) * 100)}%</span>
        </div>
      </div>

      {/* ═══ MAIN GRID ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Continue Learning */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-[#00B0FF]" />
                <h2 className="text-sm font-semibold text-white">Continue Learning</h2>
              </div>
              <button onClick={() => navigate('/dashboard/courses')} className="text-[11px] text-[#00B0FF] hover:underline font-medium">
                View all →
              </button>
            </div>
            
            <div className="p-5">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#1876D2]/20">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Building Your Business Model</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Learn how to create a scalable business model</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1876D2]/10 text-[#00B0FF] font-medium">Module {Math.floor(completedLessons / 3) + 1}</span>
                    <span className="text-[10px] text-gray-500">Lesson {(completedLessons % 3) + 1} of 8</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.min(100, Math.round(((completedLessons % 3) / 8) * 100))}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.round(((completedLessons % 3) / 8) * 100))}%` }} />
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/dashboard/courses')}
                className="w-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#1876D2]/20 transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" />
                Continue Lesson
              </button>
            </div>
          </div>

          {/* Explore Grid */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04]">
              <h2 className="text-sm font-semibold text-white">Explore</h2>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Video, title: 'Live Workshop', subtitle: 'Pitch Perfect: Elevator Pitch', time: 'Tomorrow 2 PM', gradient: 'from-red-500 to-pink-600', action: '/dashboard/live-classes', badge: 'LIVE' },
                  { icon: BookOpen, title: 'New Lesson', subtitle: 'Customer Discovery Techniques', time: '15 min read', gradient: 'from-emerald-500 to-teal-600', action: '/dashboard/courses', badge: null },
                  { icon: BrainCircuit, title: 'AI Tool', subtitle: 'Business Plan Generator', time: 'Try now', gradient: 'from-violet-500 to-purple-600', action: '/dashboard/ai-tools', badge: 'NEW' },
                  { icon: Users, title: 'Community', subtitle: 'Weekly Founder Meetup', time: 'Join discussion', gradient: 'from-blue-500 to-cyan-600', action: '/dashboard/community', badge: null }
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => navigate(item.action)}
                    className="group text-left rounded-xl p-4 border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">{item.title}</span>
                          {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                              item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-[#00B0FF]/10 text-[#00B0FF]'
                            }`}>{item.badge}</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.subtitle}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{item.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-400 flex-shrink-0 mt-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Streak Banner */}
          {currentStreak >= 3 && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 border border-orange-500/20 p-5">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{currentStreak}-Day Streak! 🔥</h3>
                    <p className="text-orange-200/60 text-xs mt-0.5">You've been learning consistently. Keep it up!</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-orange-400">{currentStreak}</span>
                  <p className="text-[10px] text-orange-300/40 font-medium">DAYS</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - 1/3 */}
        <div className="space-y-6">
          
          {/* Today's Goals */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Today's Goals</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                {(userGoals.length > 0 ? userGoals : [
                  { task: 'Complete Module 2 Lesson 3', completed: false },
                  { task: 'Review customer interview notes', completed: true },
                  { task: 'Update business model canvas', completed: false },
                  { task: 'Join community discussion', completed: true }
                ]).map((goal: any, i: number) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    goal.completed ? 'bg-emerald-500/5' : 'hover:bg-white/[0.02]'
                  }`}>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                      goal.completed 
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
                        : 'border border-gray-600'
                    }`}>
                      {goal.completed && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-xs ${
                      goal.completed ? 'text-gray-500 line-through' : 'text-gray-300'
                    }`}>
                      {goal.task}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">
                    {(userGoals.length > 0 ? userGoals : [
                      { completed: false }, { completed: true }, { completed: false }, { completed: true }
                    ]).filter((g: any) => g.completed).length} of {(userGoals.length || 4)} complete
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{ width: `${((userGoals.length > 0 ? userGoals : [
                        { completed: false }, { completed: true }, { completed: false }, { completed: true }
                      ]).filter((g: any) => g.completed).length / (userGoals.length || 4)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-2">
              <Video className="h-4 w-4 text-red-400" />
              <h2 className="text-sm font-semibold text-white">Upcoming</h2>
            </div>
            
            <div className="p-4 space-y-2">
              {[
                { title: 'Pitch Perfect Workshop', time: 'Tomorrow 2 PM', badge: 'Live', badgeColor: 'bg-red-500/15 text-red-400' },
                { title: 'Customer Discovery', time: 'Friday 10 AM', badge: 'Recorded', badgeColor: 'bg-[#1876D2]/15 text-[#00B0FF]' }
              ].map((cls, i) => (
                <button 
                  key={i} 
                  onClick={() => navigate('/dashboard/live-classes')}
                  className="w-full text-left rounded-xl p-3 border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white">{cls.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${cls.badgeColor}`}>
                      {cls.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-[11px]">{cls.time}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <h2 className="text-sm font-semibold text-white">Level Progress</h2>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center">
                    <span className="text-sm font-black text-yellow-400">{currentLevel}</span>
                  </div>
                  <span className="text-xs text-gray-400">Level {currentLevel}</span>
                </div>
                <span className="text-xs font-bold text-yellow-400">{Math.round(overviewData?.user?.xpInCurrentLevel || 0)}%</span>
              </div>
              
              <div className="w-full h-2.5 rounded-full bg-white/[0.04] overflow-hidden mb-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-500 relative" 
                  style={{ width: `${overviewData?.user?.xpInCurrentLevel || 0}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                </div>
              </div>
              
              <p className="text-[11px] text-gray-500">
                <span className="text-yellow-400 font-semibold">{Math.round(overviewData?.user?.xpInCurrentLevel || 0)}</span> / 100 XP to Level {currentLevel + 1}
              </p>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-purple-400" />
                <h2 className="text-sm font-semibold text-white">Achievements</h2>
              </div>
              <button onClick={() => navigate('/dashboard/achievements')} className="text-[11px] text-[#00B0FF] hover:underline font-medium">
                View all
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                {(recentAchievements.length > 0 ? recentAchievements : [
                  { title: 'First Module Complete!', description: 'Business Basics Badge', icon: 'star', color: 'yellow' },
                  { title: `${currentStreak}-Day Streak`, description: 'Keep the momentum!', icon: 'trophy', color: 'green' },
                  { title: 'Community Helper', description: 'Active in discussions', icon: 'users', color: 'blue' }
                ]).map((ach: any, i: number) => {
                  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
                    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
                    green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
                    blue: { bg: 'bg-[#1876D2]/10', text: 'text-[#00B0FF]', border: 'border-[#1876D2]/20' },
                    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
                  };
                  const colors = colorMap[ach.color] || colorMap.blue;
                  const IconComponent = ach.icon === 'star' ? Star : ach.icon === 'trophy' ? Trophy : ach.icon === 'users' ? Users : Target;
                  
                  return (
                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <IconComponent className={`h-4 w-4 ${colors.text}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">{ach.title}</p>
                        <p className="text-[10px] text-gray-500">{ach.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
