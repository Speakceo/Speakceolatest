import { motion } from 'framer-motion';
import { Rocket, Brain, Lightbulb, TrendingUp, Globe, Zap, Code, Sparkles } from 'lucide-react';

/**
 * Premium CSS-only 3D animated hero — replaces heavy Spline 3D (saves ~4MB JS)
 * Inspired by uprio.com's aesthetic: floating glass cards, gradient mesh, depth
 */
export default function AnimatedHero3D() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-slate-950">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#1876D2]/30 rounded-full filter blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00B0FF]/25 rounded-full filter blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-[#40C4FF]/15 rounded-full filter blur-[80px] animate-[float_12s_ease-in-out_infinite]" />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Floating glass cards — 3D perspective */}
      <div className="absolute inset-0" style={{ perspective: '1200px' }}>
        {/* Card 1 — AI Learning */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[12%] left-[8%] md:left-[12%]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-5 shadow-2xl w-[180px] md:w-[220px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-xl flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">AI Coach</div>
                <div className="text-gray-400 text-[10px]">Personalized Learning</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              <div className="text-[10px] text-gray-500 flex justify-between">
                <span>Progress</span>
                <span className="text-[#00B0FF]">85%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2 — Website Builder */}
        <motion.div
          animate={{ y: [10, -10, 10], rotateY: [3, -3, 3], rotateX: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[8%] right-[5%] md:right-[10%]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-5 shadow-2xl w-[200px] md:w-[240px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00B0FF] to-[#40C4FF] rounded-xl flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Website Builder</div>
                <div className="text-gray-400 text-[10px]">AI-Powered Creation</div>
              </div>
            </div>
            {/* Mini code preview */}
            <div className="bg-black/30 rounded-lg p-2.5 font-mono text-[9px] leading-relaxed">
              <div><span className="text-[#00B0FF]">{'<'}</span><span className="text-[#40C4FF]">div</span> <span className="text-gray-500">class=</span><span className="text-emerald-400">"hero"</span><span className="text-[#00B0FF]">{'>'}</span></div>
              <div className="pl-3"><span className="text-[#00B0FF]">{'<'}</span><span className="text-[#40C4FF]">h1</span><span className="text-[#00B0FF]">{'>'}</span><span className="text-white">My Business</span><span className="text-[#00B0FF]">{'</'}</span><span className="text-[#40C4FF]">h1</span><span className="text-[#00B0FF]">{'>'}</span></div>
              <div><span className="text-[#00B0FF]">{'</'}</span><span className="text-[#40C4FF]">div</span><span className="text-[#00B0FF]">{'>'}</span></div>
            </div>
          </div>
        </motion.div>

        {/* Card 3 — Stats / Growth */}
        <motion.div
          animate={{ y: [-12, 12, -12], rotateY: [-1, 1, -1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[15%] left-[5%] md:left-[18%]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-5 shadow-2xl w-[190px] md:w-[210px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Growth</div>
                <div className="text-emerald-400 text-xs font-bold">+127%</div>
              </div>
            </div>
            {/* Mini chart */}
            <div className="flex items-end gap-1 h-10">
              {[30, 45, 35, 55, 48, 62, 58, 75, 70, 85, 80, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500/60 to-emerald-400/30 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 4 — Game Dev */}
        <motion.div
          animate={{ y: [8, -8, 8], rotateY: [2, -2, 2], rotateX: [1, -1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[8%] md:right-[14%]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-5 shadow-2xl w-[180px] md:w-[200px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Game Creator</div>
                <div className="text-gray-400 text-[10px]">Build & Play</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {['🚀', '🎯', '⭐', '🏆', '🎮', '💡', '🔥', '✨'].map((e, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 rounded-md p-1.5 text-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center orb — focal point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
            transition={{ scale: { duration: 4, repeat: Infinity }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
            className="w-20 h-20 md:w-28 md:h-28 relative"
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-[#1876D2]/30 animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#00B0FF] rounded-full" />
            </div>
            {/* Inner ring */}
            <div className="absolute inset-3 rounded-full border border-[#00B0FF]/20 animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-[#40C4FF] rounded-full" />
            </div>
            {/* Core */}
            <div className="absolute inset-6 md:inset-8 rounded-full bg-gradient-to-br from-[#1876D2] to-[#00B0FF] shadow-lg shadow-[#1876D2]/40 flex items-center justify-center">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Floating micro particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00B0FF]/40 rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}
