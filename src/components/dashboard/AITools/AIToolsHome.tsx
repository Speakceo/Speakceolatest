import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Brain, 
  FileEdit, 
  Gamepad2, 
  Presentation, 
  Sparkles, 
  Trophy, 
  Clock, 
  ArrowRight, 
  Star, 
  Zap, 
  Rocket,
  Crown,
  Flame,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore, useProgressStore, useAIToolsStore, useUnifiedProgressStore } from '../../../lib/store';
import confetti from 'canvas-confetti';

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  xpPerUse: number;
  usageCount: number;
  lastUsed?: string;
  tag?: string;
}

export default function AIToolsHome() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { getOverallProgress } = useProgressStore();
  const { getTotalXPEarned, getMostUsedTools, tools: storeTools } = useAIToolsStore();
  const { recordActivity } = useUnifiedProgressStore();
  
  let overallProgress = 0;
  let totalXpEarned = 0;
  let tools: any = {};
  
  try {
    overallProgress = getOverallProgress() || 0;
    totalXpEarned = getTotalXPEarned() || 0;
    tools = storeTools || {};
  } catch (error) {
    console.error('Error loading AI Tools stores:', error);
  }
  
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<string | null>(null);
  
  const toolsConfig: AITool[] = [
    { id: 'speak-smart', name: 'SpeakSmart', description: 'AI Public Speaking & Communication Coach', icon: Mic, path: '/dashboard/ai-tools/speak-smart', color: 'from-blue-500 to-cyan-500', xpPerUse: 25, usageCount: tools['speak-smart']?.usageCount || 0, lastUsed: tools['speak-smart']?.lastUsed, tag: 'Popular' },
    { id: 'math-mentor', name: 'MathMentor', description: 'Smart Math Solver & Business Trainer', icon: Brain, path: '/dashboard/ai-tools/math-mentor', color: 'from-emerald-500 to-teal-500', xpPerUse: 20, usageCount: tools['math-mentor']?.usageCount || 0, lastUsed: tools['math-mentor']?.lastUsed },
    { id: 'write-right', name: 'WriteRight', description: 'Business Writing & Creativity Assistant', icon: FileEdit, path: '/dashboard/ai-tools/write-right', color: 'from-violet-500 to-purple-500', xpPerUse: 15, usageCount: tools['write-right']?.usageCount || 0, lastUsed: tools['write-right']?.lastUsed },
    { id: 'mind-maze', name: 'MindMaze', description: 'Entrepreneurial Strategy Game', icon: Gamepad2, path: '/dashboard/ai-tools/mind-maze', color: 'from-amber-500 to-orange-500', xpPerUse: 30, usageCount: tools['mind-maze']?.usageCount || 0, lastUsed: tools['mind-maze']?.lastUsed, tag: 'Fun' },
    { id: 'pitch-deck', name: 'PitchDeck Creator', description: 'AI Business Presentation Builder', icon: Presentation, path: '/dashboard/ai-tools/pitch-deck', color: 'from-red-500 to-rose-500', xpPerUse: 35, usageCount: tools['pitch-deck']?.usageCount || 0, lastUsed: tools['pitch-deck']?.lastUsed, tag: 'Pro' }
  ];
  
  useEffect(() => {
    const lastProgress = parseInt(localStorage.getItem('lastAIToolsProgress') || '0');
    if (lastProgress < overallProgress) {
      const newlyUnlocked = toolsConfig.find(tool => tool.id === 'pitch-deck' && lastProgress < 40 && overallProgress >= 40);
      if (newlyUnlocked) {
        setRecentlyUnlocked(newlyUnlocked.id);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        try { recordActivity({ type: 'ai-tool', title: `Unlocked ${newlyUnlocked.name}`, xpEarned: 50 }); } catch {}
        setTimeout(() => setRecentlyUnlocked(null), 5000);
      }
    }
    localStorage.setItem('lastAIToolsProgress', overallProgress.toString());
  }, [overallProgress]);
  
  const handleToolClick = (tool: AITool) => {
    try { recordActivity({ type: 'ai-tool', title: `Used ${tool.name}`, xpEarned: 5 }); } catch {}
    navigate(tool.path);
  };
  
  let mostUsedTools: any[] = [];
  try { mostUsedTools = getMostUsedTools().slice(0, 3); } catch {}
  
  return (
    <div className="space-y-6">
      {/* ═══ HERO HEADER ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1a2e] to-[#1a1040] border border-white/[0.04] p-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#1876D2]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">AI Tools Lab</h1>
            </div>
            <p className="text-sm text-gray-400">Supercharge your learning with AI-powered tools</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-[#1876D2]/10 border border-[#1876D2]/20">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#00B0FF]" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">AI Tools XP</p>
                  <p className="text-sm font-bold text-[#00B0FF]">{totalXpEarned} XP</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Streak</p>
                  <p className="text-sm font-bold text-orange-400">3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Unlocked Alert */}
      {recentlyUnlocked && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-r from-[#1876D2] to-[#00B0FF] p-5 border border-white/[0.1]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-white">New AI Tool Unlocked!</h2>
              <p className="text-xs text-blue-100">{toolsConfig.find(t => t.id === recentlyUnlocked)?.name} is now available</p>
            </div>
            <button 
              onClick={() => navigate(toolsConfig.find(t => t.id === recentlyUnlocked)?.path || '')}
              className="px-4 py-2 bg-white text-[#1876D2] rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors"
            >
              Try Now
            </button>
          </div>
        </motion.div>
      )}
      
      {/* ═══ AI TOOLS GRID ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsConfig.map((tool, i) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative text-left rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300 overflow-hidden ${
              recentlyUnlocked === tool.id ? 'ring-1 ring-[#00B0FF]' : ''
            }`}
            onClick={() => handleToolClick(tool)}
          >
            {/* Subtle gradient glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
            
            <div className="relative p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <tool.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  {tool.tag && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                      tool.tag === 'Popular' ? 'bg-blue-500/15 text-blue-400' :
                      tool.tag === 'Fun' ? 'bg-amber-500/15 text-amber-400' :
                      tool.tag === 'Pro' ? 'bg-purple-500/15 text-purple-400' :
                      'bg-gray-500/15 text-gray-400'
                    }`}>
                      {tool.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-500/10">
                    <Zap className="h-2.5 w-2.5 text-emerald-400" />
                    <span className="text-[9px] font-bold text-emerald-400">+{tool.xpPerUse}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#00B0FF] transition-colors">{tool.name}</h3>
              <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">{tool.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500">
                  <Star className="h-3 w-3 text-amber-400" />
                  <span className="text-[10px]">Used {tool.usageCount}x</span>
                </div>
                <div className="flex items-center gap-1 text-[#00B0FF] text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* ═══ MOST USED ═══ */}
      <div className="rounded-2xl border border-white/[0.04] bg-white/[0.02] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.04] flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-400" />
          <h2 className="text-sm font-semibold text-white">Your Top Tools</h2>
        </div>
        
        <div className="p-5">
          {mostUsedTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mostUsedTools.map((tool: any, index: number) => {
                const config = toolsConfig.find(t => t.id === tool.id);
                if (!config) return null;
                const medals = ['🥇', '🥈', '🥉'];
                
                return (
                  <button
                    key={tool.id}
                    onClick={() => navigate(config.path)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all text-left"
                  >
                    <span className="text-xl">{medals[index]}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{tool.name || config.name}</p>
                      <p className="text-[10px] text-gray-500">Used {tool.usageCount}x</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Sparkles className="h-8 w-8 text-gray-600 mx-auto mb-3" />
              <p className="text-xs text-gray-500">Start using AI tools to see your favorites here!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* ═══ BENEFITS BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1876D2]/20 to-[#00B0FF]/10 border border-[#1876D2]/20 p-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="relative">
          <h2 className="text-sm font-bold text-white mb-4">Why AI Tools?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Rocket, title: 'Learn 3× Faster', desc: 'AI-guided feedback' },
              { icon: Brain, title: 'Real Skills', desc: 'Practical application' },
              { icon: Trophy, title: 'Earn XP', desc: 'Gamified learning' },
              { icon: Sparkles, title: 'Be Creative', desc: 'Safe to experiment' },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white/[0.04] border border-white/[0.04] p-3">
                <b.icon className="h-4 w-4 text-[#00B0FF] mb-2" />
                <h3 className="text-xs font-semibold text-white">{b.title}</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
