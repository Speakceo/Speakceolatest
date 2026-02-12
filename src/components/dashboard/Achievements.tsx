import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  Sparkles, 
  Award, 
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Lock,
  Play,
  BrainCircuit,
  Video,
  Clock,
  Zap,
  MessageSquare,
  Share2,
  Download,
  Crown,
  Flame,
  Rocket,
  Gift,
  Shield
} from 'lucide-react';
import { useUserStore, useProgressStore, useUnifiedProgressStore } from '../../lib/store';
import ProgressBar from '../ui/ProgressBar';

const getAchievements = (userProgress: number, completedLessons: number, totalLessons: number) => {
  return [
    {
      id: 1, title: 'First Business Plan', description: 'Created your first complete business plan',
      icon: Target, color: 'from-amber-500 to-orange-500', date: '2 days ago', xp: 100, rarity: 'Common',
      unlocked: userProgress >= 15
    },
    {
      id: 2, title: 'Marketing Master', description: 'Completed all marketing course modules',
      icon: Star, color: 'from-purple-500 to-pink-500', date: '1 week ago', xp: 150, rarity: 'Rare',
      unlocked: userProgress >= 30
    },
    {
      id: 3, title: 'Innovation Award', description: 'Top 3 in monthly pitch competition',
      icon: Trophy, color: 'from-blue-500 to-[#1876D2]', date: '2 weeks ago', xp: 200, rarity: 'Epic',
      unlocked: userProgress >= 45
    },
    {
      id: 4, title: 'Public Speaking Pro', description: 'Delivered 5 successful presentations',
      icon: Video, color: 'from-green-500 to-emerald-500', date: 'Locked', xp: 250, rarity: 'Legendary',
      unlocked: userProgress >= 60,
      progress: Math.min(100, Math.round((userProgress / 60) * 100))
    },
    {
      id: 5, title: 'AI Pioneer', description: 'Used all 5 AI tools to build your brand',
      icon: Sparkles, color: 'from-violet-500 to-indigo-500', date: 'Locked', xp: 300, rarity: 'Legendary',
      unlocked: userProgress >= 75,
      progress: Math.min(100, Math.round((userProgress / 75) * 100))
    },
    {
      id: 6, title: 'Community Leader', description: 'Helped 10 other students with their projects',
      icon: Users, color: 'from-cyan-500 to-blue-500', date: 'Locked', xp: 175, rarity: 'Rare',
      unlocked: userProgress >= 50,
      progress: Math.min(100, Math.round((userProgress / 50) * 100))
    }
  ];
};

const getSkillMasteries = (userProgress: number) => {
  return [
    { name: 'Business Strategy', progress: Math.min(100, Math.round(userProgress * 0.75)), icon: Target, color: 'from-blue-600 to-indigo-600', emoji: '🎯' },
    { name: 'Financial Literacy', progress: Math.min(100, Math.round(userProgress * 0.60)), icon: BrainCircuit, color: 'from-green-600 to-emerald-600', emoji: '💰' },
    { name: 'Public Speaking', progress: Math.min(100, Math.round(userProgress * 0.85)), icon: Video, color: 'from-[#1876D2] to-[#00B0FF]', emoji: '🎤' },
    { name: 'Leadership', progress: Math.min(100, Math.round(userProgress * 0.70)), icon: Users, color: 'from-amber-600 to-orange-600', emoji: '👑' },
    { name: 'AI & Technology', progress: Math.min(100, Math.round(userProgress * 0.55)), icon: Sparkles, color: 'from-violet-600 to-purple-600', emoji: '🤖' },
    { name: 'Marketing', progress: Math.min(100, Math.round(userProgress * 0.65)), icon: Rocket, color: 'from-pink-600 to-rose-600', emoji: '📈' },
  ];
};

const getUpcomingChallenges = (userProgress: number) => {
  return [
    { title: 'Business Pitch Challenge', deadline: '3 days left', reward: '500 XP', participants: 45, emoji: '🎤' },
    { title: 'Marketing Campaign Sim', deadline: '5 days left', reward: '400 XP', participants: 32, emoji: '📊' },
    { title: 'AI Tool Sprint', deadline: '1 week left', reward: '350 XP', participants: 28, emoji: '⚡' }
  ];
};

export default function Achievements() {
  const { user } = useUserStore();
  const { fetchUserProgress, getOverallProgress, getCompletedLessons, getTotalLessons, getLearningStreak } = useProgressStore();
  const { recordActivity } = useUnifiedProgressStore();
  const [selectedTab, setSelectedTab] = useState<'badges' | 'skills' | 'challenges'>('badges');
  
  useEffect(() => {
    if (user) fetchUserProgress(user.id);
  }, [user, fetchUserProgress]);
  
  const overallProgress = getOverallProgress();
  const completedLessons = getCompletedLessons();
  const totalLessons = getTotalLessons();
  const learningStreak = getLearningStreak();
  
  const achievements = getAchievements(overallProgress, completedLessons, totalLessons);
  const skillMasteries = getSkillMasteries(overallProgress);
  const upcomingChallenges = getUpcomingChallenges(overallProgress);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = user?.points || 0;
  const currentLevel = Math.floor(overallProgress / 20) + 1;

  const rarityColors: Record<string, { bg: string; text: string; border: string }> = {
    'Common': { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
    'Rare': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    'Epic': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    'Legendary': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  };
  
  return (
    <div className="space-y-6">
      {/* ═══ HERO STATS BAR ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1a2e] to-[#1a1040] border border-white/[0.04] p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <h1 className="text-xl font-bold text-white">Achievements & Progress</h1>
              </div>
              <p className="text-sm text-gray-400">Track your growth, unlock badges, master skills</p>
            </div>
          </div>

          {/* Stat Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total XP', value: totalXP.toLocaleString(), icon: Zap, color: 'text-[#00B0FF]', bg: 'bg-[#1876D2]/10', border: 'border-[#1876D2]/20' },
              { label: 'Level', value: currentLevel.toString(), icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
              { label: 'Badges', value: `${unlockedCount}/${achievements.length}`, icon: Award, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
              { label: 'Streak', value: `${learningStreak}d`, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-xl p-3 ${stat.bg} border ${stat.border}`}>
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TAB NAVIGATION ═══ */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        {[
          { key: 'badges', label: 'Badges', icon: Award },
          { key: 'skills', label: 'Skills', icon: Target },
          { key: 'challenges', label: 'Challenges', icon: Flame },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as typeof selectedTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              selectedTab === tab.key
                ? 'bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white shadow-lg shadow-[#1876D2]/20'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ BADGES TAB ═══ */}
      {selectedTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const rarity = rarityColors[ach.rarity] || rarityColors['Common'];
            return (
              <div
                key={ach.id}
                className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                  ach.unlocked 
                    ? 'border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02]' 
                    : 'border-white/[0.04] opacity-60 hover:opacity-80'
                }`}
              >
                {/* Glow effect for unlocked */}
                {ach.unlocked && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${ach.color} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
                )}
                
                <div className="relative p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ach.color} flex items-center justify-center shadow-lg ${
                      ach.unlocked ? '' : 'grayscale'
                    }`}>
                      {ach.unlocked ? (
                        <ach.icon className="h-6 w-6 text-white" />
                      ) : (
                        <Lock className="h-5 w-5 text-white/60" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${rarity.bg} ${rarity.text} border ${rarity.border}`}>
                        {ach.rarity}
                      </span>
                      {ach.unlocked && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white mb-1">{ach.title}</h3>
                  <p className="text-[11px] text-gray-500 mb-3">{ach.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-[#00B0FF]" />
                      <span className="text-[11px] font-bold text-[#00B0FF]">+{ach.xp} XP</span>
                    </div>
                    <span className="text-[10px] text-gray-500">{ach.date}</span>
                  </div>
                  
                  {/* Progress bar for locked */}
                  {!ach.unlocked && ach.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500">Progress</span>
                        <span className="text-[10px] font-bold text-gray-400">{ach.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${ach.color} transition-all`}
                          style={{ width: `${ach.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ SKILLS TAB ═══ */}
      {selectedTab === 'skills' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillMasteries.map((skill) => {
            const level = Math.floor(skill.progress / 20) + 1;
            return (
              <div key={skill.name} className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5 hover:border-white/[0.08] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-lg">{skill.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                    <p className="text-[10px] text-gray-500">Level {level} • {skill.progress}% mastery</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-xs font-black text-white">{level}</span>
                  </div>
                </div>
                
                <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-700 relative`}
                    style={{ width: `${skill.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-500">{skill.progress}% to Level {level + 1}</span>
                  <span className="text-[10px] text-gray-500">{100 - skill.progress}% remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ CHALLENGES TAB ═══ */}
      {selectedTab === 'challenges' && (
        <div className="space-y-4">
          {upcomingChallenges.map((challenge, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5 hover:border-white/[0.08] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{challenge.emoji}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{challenge.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span className="text-[11px]">{challenge.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="h-3 w-3" />
                        <span className="text-[11px]">{challenge.participants} joined</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1876D2]/10 border border-[#1876D2]/20">
                  <Zap className="h-3 w-3 text-[#00B0FF]" />
                  <span className="text-[11px] font-bold text-[#00B0FF]">{challenge.reward}</span>
                </div>
              </div>
              
              <button 
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#1876D2]/20 transition-all"
                onClick={() => {
                  try {
                    recordActivity({ type: 'community', title: `Joined ${challenge.title}`, xpEarned: parseInt(challenge.reward.split(' ')[0]) / 10 });
                  } catch {}
                }}
              >
                Join Challenge
              </button>
            </div>
          ))}
          
          {/* More Challenges Coming */}
          <div className="rounded-2xl border border-dashed border-white/[0.06] p-8 text-center">
            <Gift className="h-8 w-8 text-gray-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-gray-400 mb-1">More Challenges Coming</h3>
            <p className="text-[11px] text-gray-500">New weekly challenges drop every Monday!</p>
          </div>
        </div>
      )}
    </div>
  );
}
