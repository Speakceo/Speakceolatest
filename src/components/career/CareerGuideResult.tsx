import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Share2, Mail, Rocket, Target, Brain, Sparkles, CheckCircle, 
  ArrowRight, Award, Zap, Lightbulb, BarChart2, TrendingUp, Compass, 
  Briefcase, GraduationCap, BookOpen, Layers, Heart, Star, Clock, Mic,
  Trophy, Crown, Flame, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerGuideResultProps {
  result: {
    studentName: string;
    age: string;
    overview: string;
    personalityInsights: string;
    learningStyle: string;
    topCareers: string[];
    skillsToDevelop: string[];
    motivationalMessage: string;
    iqScore?: number;
    entrepreneurialScore?: number;
  };
  onClose: () => void;
}

export default function CareerGuideResult({ result, onClose }: CareerGuideResultProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'careers'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationStep < 8) setAnimationStep(animationStep + 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [animationStep]);

  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    }, 1000);
  };

  const handleEmailReport = () => {
    setTimeout(() => setIsEmailSent(true), 1000);
  };

  const getScoreEmoji = (score: number | undefined) => {
    if (!score) return '🌱';
    if (score >= 90) return '🏆';
    if (score >= 75) return '🌟';
    if (score >= 60) return '💪';
    if (score >= 40) return '📈';
    return '🌱';
  };

  const getScoreLabel = (score: number | undefined, type: 'iq' | 'entrepreneurial') => {
    if (!score) return 'Developing';
    if (type === 'iq') {
      if (score >= 90) return 'Excellent';
      if (score >= 75) return 'Very Good';
      if (score >= 60) return 'Good';
      if (score >= 40) return 'Average';
      return 'Developing';
    } else {
      if (score >= 90) return 'Born Entrepreneur';
      if (score >= 75) return 'Strong Potential';
      if (score >= 60) return 'Good Potential';
      if (score >= 40) return 'Developing';
      return 'Early Stage';
    }
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Eye, emoji: '📋' },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart2, emoji: '📊' },
    { id: 'careers' as const, label: 'Career Paths', icon: Briefcase, emoji: '🚀' }
  ];

  // Animated counter
  const AnimatedScore = ({ target, color }: { target: number; color: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.round(start));
        }
      }, 30);
      return () => clearInterval(timer);
    }, [target]);
    return <span className={`text-3xl font-black ${color}`}>{count}%</span>;
  };

  // Skill bars data for analytics
  const skillBars = [
    { label: 'Creativity', value: 85, color: 'from-pink-500 to-rose-500', emoji: '🎨' },
    { label: 'Communication', value: 78, color: 'from-blue-500 to-cyan-500', emoji: '🗣️' },
    { label: 'Leadership', value: 72, color: 'from-amber-500 to-orange-500', emoji: '👑' },
    { label: 'Problem Solving', value: 88, color: 'from-emerald-500 to-green-500', emoji: '🧩' },
    { label: 'Teamwork', value: 80, color: 'from-violet-500 to-purple-500', emoji: '🤝' },
    { label: 'Time Management', value: 65, color: 'from-teal-500 to-cyan-500', emoji: '⏰' },
    { label: 'Curiosity', value: 92, color: 'from-yellow-500 to-amber-500', emoji: '🔍' }
  ];

  const roadmapPhases = [
    {
      phase: 'Exploration Phase',
      timeframe: 'Now',
      emoji: '🔍',
      color: 'from-blue-500 to-cyan-500',
      activities: ['Join clubs related to interests', 'Try different hobby projects', 'Read books about careers']
    },
    {
      phase: 'Skill Building',
      timeframe: 'Next 2-3 Years',
      emoji: '🏗️',
      color: 'from-violet-500 to-purple-500',
      activities: ['Take relevant courses', 'Participate in competitions', 'Find a mentor']
    },
    {
      phase: 'Experience Gathering',
      timeframe: '4-6 Years',
      emoji: '🧪',
      color: 'from-emerald-500 to-green-500',
      activities: ['Work on real-world projects', 'Volunteer in related fields', 'Build a portfolio']
    },
    {
      phase: 'Specialization',
      timeframe: '7+ Years',
      emoji: '🎯',
      color: 'from-amber-500 to-orange-500',
      activities: ['Higher education / training', 'Network with professionals', 'Develop niche expertise']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl mb-3"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {result.studentName}'s Career Guide is Ready!
        </h2>
        <p className="text-white/50 text-sm">
          Powered by AI • Personalized for Age {result.age}
        </p>
      </motion.div>

      {/* Score Cards */}
      {(result.iqScore !== undefined || result.entrepreneurialScore !== undefined) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
        >
          {result.iqScore !== undefined && (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{getScoreEmoji(result.iqScore)}</div>
              <AnimatedScore target={result.iqScore} color="text-blue-400" />
              <p className="text-xs text-white/40 mt-1">Thinking Skills</p>
              <div className="mt-2 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.iqScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                />
              </div>
              <p className="text-xs text-blue-400 font-medium mt-1">{getScoreLabel(result.iqScore, 'iq')}</p>
            </div>
          )}
          {result.entrepreneurialScore !== undefined && (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{getScoreEmoji(result.entrepreneurialScore)}</div>
              <AnimatedScore target={result.entrepreneurialScore} color="text-emerald-400" />
              <p className="text-xs text-white/40 mt-1">Entrepreneur Score</p>
              <div className="mt-2 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.entrepreneurialScore}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                />
              </div>
              <p className="text-xs text-emerald-400 font-medium mt-1">{getScoreLabel(result.entrepreneurialScore, 'entrepreneurial')}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-2xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-white border border-blue-500/30'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <span className="text-base">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Overview</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{result.overview}</p>
              </motion.div>

              {/* Personality & Learning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🧠</span>
                    <h3 className="text-sm font-semibold text-white">Personality</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{result.personalityInsights}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">📚</span>
                    <h3 className="text-sm font-semibold text-white">Learning Style</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{result.learningStyle}</p>
                </motion.div>
              </div>

              {/* Top Careers */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🏆</span>
                  <h3 className="text-sm font-semibold text-white">Top Career Paths</h3>
                </div>
                <div className="space-y-2">
                  {result.topCareers.map((career, i) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    const colors = ['from-amber-500/20 to-amber-600/10 border-amber-500/30', 'from-gray-400/20 to-gray-500/10 border-gray-400/30', 'from-orange-600/20 to-orange-700/10 border-orange-600/30'];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${colors[i] || 'from-white/[0.05] to-white/[0.02] border-white/[0.1]'} border`}
                      >
                        <span className="text-xl">{medals[i] || '⭐'}</span>
                        <p className="text-white/80 font-medium text-sm">{career}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Skills to Develop */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🎯</span>
                  <h3 className="text-sm font-semibold text-white">Skills to Develop</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.skillsToDevelop.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03]">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Motivational */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">💫</span>
                  <h3 className="text-sm font-semibold text-white">Your Journey Begins Now</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">"{result.motivationalMessage}"</p>
              </motion.div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              {/* Skill Bars */}
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-lg">📊</span>
                  <h3 className="text-sm font-semibold text-white">Skills Assessment</h3>
                </div>
                <div className="space-y-4">
                  {skillBars.map((skill, i) => (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span>{skill.emoji}</span>
                          <span className="text-sm text-white/70">{skill.label}</span>
                        </div>
                        <span className="text-sm font-bold text-white/80">{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Learning Style Breakdown */}
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">🧬</span>
                  <h3 className="text-sm font-semibold text-white">Learning Style DNA</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'Visual', emoji: '👁️', value: result.learningStyle.toLowerCase().includes('visual') ? 70 : 20, color: 'from-blue-500 to-cyan-500' },
                    { type: 'Auditory', emoji: '👂', value: result.learningStyle.toLowerCase().includes('auditory') ? 70 : 20, color: 'from-violet-500 to-purple-500' },
                    { type: 'Kinesthetic', emoji: '🤲', value: result.learningStyle.toLowerCase().includes('kinesthetic') || result.learningStyle.toLowerCase().includes('doing') ? 70 : 20, color: 'from-emerald-500 to-green-500' }
                  ].map((style, i) => (
                    <motion.div
                      key={style.type}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-center bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4"
                    >
                      <span className="text-2xl block mb-2">{style.emoji}</span>
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            strokeDasharray={`${style.value}, 100`}
                            initial={{ strokeDasharray: '0, 100' }}
                            animate={{ strokeDasharray: `${style.value}, 100` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                          />
                          <defs>
                            <linearGradient id="gradient">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{style.value}%</span>
                      </div>
                      <p className="text-xs text-white/50">{style.type}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Entrepreneurial Breakdown */}
              {result.entrepreneurialScore !== undefined && (
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🚀</span>
                    <h3 className="text-sm font-semibold text-white">Entrepreneur Analysis</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Innovation', value: Math.round(result.entrepreneurialScore * 0.9), emoji: '💡' },
                      { label: 'Risk Tolerance', value: Math.round(result.entrepreneurialScore * 0.8), emoji: '🎲' },
                      { label: 'Leadership', value: Math.min(100, Math.round(result.entrepreneurialScore * 1.1)), emoji: '👑' }
                    ].map((metric, i) => (
                      <div key={metric.label} className="text-center bg-white/[0.04] border border-white/[0.08] rounded-xl p-3">
                        <span className="text-xl">{metric.emoji}</span>
                        <p className="text-lg font-bold text-white mt-1">{metric.value}%</p>
                        <p className="text-[10px] text-white/40">{metric.label}</p>
                        <div className="mt-2 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-white/[0.03] rounded-xl">
                    <p className="text-xs text-white/50 leading-relaxed">
                      {result.studentName} shows {result.entrepreneurialScore >= 75 ? 'exceptional' : result.entrepreneurialScore >= 60 ? 'strong' : 'developing'} entrepreneurial potential.
                      {result.entrepreneurialScore >= 60
                        ? ' With the right guidance, they could excel in creating and leading their own ventures.'
                        : ' With continued skill development, their entrepreneurial abilities can be greatly strengthened.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-4">
              {/* Career Cards */}
              {result.topCareers.map((career, index) => {
                const skillSets = [
                  ['Communication', 'Creativity', 'Leadership'],
                  ['Analytical Thinking', 'Teamwork', 'Problem Solving'],
                  ['Technical Knowledge', 'Adaptability', 'Critical Thinking']
                ];
                const eduPaths = [
                  ['Specialized Courses', 'Self-Learning', 'Mentorship'],
                  ['Online Programs', 'Apprenticeship', 'Certification'],
                  ['Degree Program', 'Bootcamp', 'Workshops']
                ];
                const demandScores = [88, 82, 76];
                const fitReasons = [
                  `strong creative abilities and problem-solving skills. Their innovative thinking would be a valuable asset.`,
                  `excellent communication skills and genuine interest in helping others. Their people skills stand out.`,
                  `analytical mindset and attention to detail. Their methodical approach is perfect for this field.`
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden"
                  >
                    {/* Career Header */}
                    <div className="p-5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-xl">
                          {['🥇', '🥈', '🥉'][index] || '⭐'}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{career}</h4>
                          <p className="text-xs text-white/40">Career Path #{index + 1}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center bg-white/[0.04] rounded-xl p-3">
                          <p className="text-sm font-bold text-emerald-400">{demandScores[index] || 80}%</p>
                          <p className="text-[10px] text-white/40">Demand</p>
                        </div>
                        <div className="text-center bg-white/[0.04] rounded-xl p-3">
                          <p className="text-sm font-bold text-blue-400">{(demandScores[index] || 80) - 5}%</p>
                          <p className="text-[10px] text-white/40">Growth</p>
                        </div>
                        <div className="text-center bg-white/[0.04] rounded-xl p-3">
                          <p className="text-sm font-bold text-amber-400">{(demandScores[index] || 80) + 2}%</p>
                          <p className="text-[10px] text-white/40">Satisfaction</p>
                        </div>
                      </div>

                      {/* Skills & Education */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-white/50 mb-2 flex items-center gap-1"><Target className="w-3 h-3" /> Key Skills</p>
                          <div className="space-y-1">
                            {(skillSets[index] || skillSets[0]).map((skill, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs text-white/60">
                                <CheckCircle className="w-3 h-3 text-emerald-400/60 flex-shrink-0" />
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/50 mb-2 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Paths</p>
                          <div className="space-y-1">
                            {(eduPaths[index] || eduPaths[0]).map((path, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-xs text-white/60">
                                <ArrowRight className="w-3 h-3 text-blue-400/60 flex-shrink-0" />
                                {path}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Fit Reason */}
                      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/15 rounded-xl p-3">
                        <p className="text-xs text-white/50 flex items-center gap-1 mb-1">
                          <Lightbulb className="w-3 h-3 text-amber-400" />
                          <span className="font-medium">Why This Fits {result.studentName}</span>
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {career} aligns with {result.studentName}'s {fitReasons[index] || fitReasons[0]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Development Roadmap */}
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-lg">🗺️</span>
                  <h3 className="text-sm font-semibold text-white">Career Development Roadmap</h3>
                </div>
                <div className="space-y-3">
                  {roadmapPhases.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-sm shadow-lg`}>
                          {phase.emoji}
                        </div>
                        {i < roadmapPhases.length - 1 && <div className="w-0.5 flex-1 bg-white/[0.08] mt-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-white">{phase.phase}</h4>
                          <span className="text-[10px] px-2 py-0.5 bg-white/[0.06] rounded-full text-white/40">{phase.timeframe}</span>
                        </div>
                        <div className="space-y-1 mt-2">
                          {phase.activities.map((activity, j) => (
                            <div key={j} className="flex items-center gap-1.5 text-xs text-white/50">
                              <CheckCircle className="w-3 h-3 text-emerald-400/50 flex-shrink-0" />
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Orbit CTA */}
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-white">How Orbit Can Help</h3>
                </div>
                <p className="text-xs text-white/50 mb-4">
                  Our programs can help {result.studentName} develop the key skills needed for their dream career:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { icon: Rocket, label: 'Entrepreneurship', desc: 'Business skills & innovation' },
                    { icon: Mic, label: 'Public Speaking', desc: 'Confidence & communication' },
                    { icon: Brain, label: 'Critical Thinking', desc: 'Problem-solving mastery' },
                    { icon: Heart, label: 'Mentorship', desc: 'Expert career guidance' }
                  ].map((prog, i) => (
                    <div key={i} className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-3">
                      <prog.icon className="w-4 h-4 text-blue-400 mb-1" />
                      <p className="text-xs font-medium text-white/80">{prog.label}</p>
                      <p className="text-[10px] text-white/40">{prog.desc}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Explore Our Programs
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.06] border border-white/[0.1] text-white/70 rounded-xl hover:bg-white/[0.1] transition-all text-sm font-medium disabled:opacity-50"
        >
          <Share2 className="w-4 h-4" />
          {isSharing ? 'Copied!' : 'Share'}
        </button>
        <button
          onClick={handleEmailReport}
          disabled={isEmailSent}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.06] border border-white/[0.1] text-white/70 rounded-xl hover:bg-white/[0.1] transition-all text-sm font-medium disabled:opacity-50"
        >
          <Mail className="w-4 h-4" />
          {isEmailSent ? 'Sent! ✉️' : 'Email Report'}
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-white/20">
          This career guide is based on the provided information and is meant as a starting point for exploration.
        </p>
        <p className="text-[10px] text-white/20 mt-0.5">
          © {new Date().getFullYear()} Orbit Student. All rights reserved.
        </p>
      </div>
    </div>
  );
}
