import { useState } from 'react';
import { 
  ArrowRight, 
  Brain, 
  Presentation,
  TrendingUp, 
  Users, 
  Lightbulb,
  Rocket,
  Mic, 
  DollarSign, 
  CheckCircle,
  Star,
  Target,
  Award,
  PlayCircle,
  Sparkles,
  Shield,
  Globe,
  Trophy,
  Zap,
  X,
  Clock,
  GraduationCap,
  Heart,
  BarChart3
} from 'lucide-react';
import EnrollmentPopup from '../components/EnrollmentPopup';
import CareerGuidePopup from '../components/career/CareerGuidePopup';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import FounderMindsetSection from '../components/home/FounderMindsetSection';
import AnimatedHero3D from '../components/ui/AnimatedHero3D';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Marquee from '../components/ui/Marquee';

// Optimized animation variants for better performance
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};


export default function Home() {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showCareerGuide, setShowCareerGuide] = useState(false);

  return (
    <>
      <SEO
        title="Orbit Student — #1 AI Learning Portal for Kids | Courses, AI Tools & Scholarships"
        description="Orbit Student — AI-powered learning portal for kids 8-18. Login to access AI tools, courses, live classes & scholarship prep. Join 2,500+ young entrepreneurs."
        showFAQ={true}
        keywords={[
          'Orbit Student',
          'Orbit Student login',
          'Orbit Student portal',
          'Orbit Student dashboard',
          'Orbit Student app',
          'Orbit Student courses',
          'Orbit Student AI tools',
          'Orbit Student live classes',
          'Orbit Student demo',
          'Orbit Student free trial',
          'Orbit Student review',
          'Orbit Student scholarship',
          'orbitstudent',
          'orbitstudent login',
          'AI learning platform',
          'AI for kids',
          'AI student portal',
          'entrepreneurship for kids',
          'young entrepreneur program',
          'best edtech for kids',
          'future skills for children',
          'business education for children',
          'coding for kids',
          'STEM for kids',
          'public speaking for kids',
          'leadership for kids',
          'scholarship prep for kids',
          'best future plan for kids',
          'online learning for kids',
          'student learning portal',
          'AI powered education',
          'kids business course online'
        ]}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 font-[Poppins] overflow-x-hidden">

        {/* ═══ HERO — Centered Billboard (21st.dev style) ═══ */}
        <section className="relative bg-[#020817] text-white overflow-hidden min-h-screen flex flex-col items-center justify-center pt-16">

          {/* ── Layered backgrounds ────────────────────────────── */}
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

          {/* Central spotlight beam from top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[40%] bg-gradient-to-b from-[#00B0FF]/60 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #1876D2 0%, transparent 70%)' }} />

          {/* Side orbs */}
          <div className="absolute top-1/3 left-[-10%] w-[40%] h-[40%] bg-[#1876D2]/15 rounded-full filter blur-[100px] animate-[float_10s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 right-[-10%] w-[35%] h-[35%] bg-[#00B0FF]/10 rounded-full filter blur-[100px] animate-[float_12s_ease-in-out_infinite_reverse]" />

          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '180px 180px' }} />

          {/* ── Content ─────────────────────────────────────────── */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">

            {/* Announcement chip */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.10] bg-white/[0.04] backdrop-blur-sm mb-8 cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B0FF]" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#00B0FF]">New 2026</span>
              <div className="w-[1px] h-3 bg-white/20" />
              <span className="text-xs text-gray-400 font-medium">AI-powered learning platform for kids 8-18</span>
              <ArrowRight className="w-3 h-3 text-gray-600" />
            </motion.div>

            {/* Headline — max impact */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.6rem,7vw,5.5rem)] font-black leading-[1.05] tracking-[-0.03em] mb-6"
            >
              <span className="text-white">Where Young Minds</span>
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#00B0FF] to-[#38bdf8]">
                  Become Leaders
                </span>
                {/* Underline glow */}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00B0FF]/60 to-transparent rounded-full" />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[1.05rem] sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              An AI-powered 180-day program that transforms kids into confident entrepreneurs — through games, real projects, live mentorship, and 100+ AI tools.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <button
                onClick={() => setShowEnrollment(true)}
                className="group relative overflow-hidden px-7 py-4 bg-white text-slate-900 font-bold text-[15px] rounded-2xl shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#1876D2]/10 to-transparent" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Free — Check Courses
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => setShowCareerGuide(true)}
                className="group px-7 py-4 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-[15px] rounded-2xl border border-white/[0.10] hover:border-white/[0.20] transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <PlayCircle className="h-4 w-4 text-[#00B0FF]" />
                  Download Free Guide
                </span>
              </button>
            </motion.div>

            {/* Avatar stack + social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              {/* Avatar circles */}
              <div className="flex -space-x-2.5">
                {[
                  { bg: 'from-[#1876D2] to-[#00B0FF]', label: 'SC' },
                  { bg: 'from-emerald-400 to-teal-500', label: 'MR' },
                  { bg: 'from-violet-500 to-purple-600', label: 'JP' },
                  { bg: 'from-amber-400 to-orange-500', label: 'AK' },
                  { bg: 'from-rose-500 to-pink-600', label: 'LB' },
                ].map((a, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.bg} flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-[#020817]`}>
                    {a.label}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-[#020817]">
                  +
                </div>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Joined by 2,500+ families</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-gray-400 text-xs ml-1">4.9/5</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-white/[0.08]">
                {['✓ Free 7-day trial', '✓ No card needed'].map((t, i) => (
                  <span key={i} className="text-[11px] text-gray-500">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* ── Product Mockup Card ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-4xl"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-b from-[#1876D2]/20 via-[#00B0FF]/10 to-transparent rounded-3xl filter blur-2xl pointer-events-none" />

              {/* Card frame */}
              <div className="relative rounded-2xl border border-white/[0.10] overflow-hidden shadow-2xl shadow-black/60">
                {/* Window chrome bar */}
                <div className="bg-[#0d1527] border-b border-white/[0.06] px-5 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-4 py-1 text-[11px] text-gray-500 font-mono">
                      orbitstudent.com/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard preview */}
                <div className="bg-[#080f1e] p-4 sm:p-6">
                  {/* Top stat strip */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'XP Points', value: '4,820', color: 'from-[#1876D2] to-[#00B0FF]', icon: '⚡' },
                      { label: 'Streak', value: '14 days', color: 'from-emerald-500 to-teal-500', icon: '🔥' },
                      { label: 'Rank', value: 'Level 7', color: 'from-amber-500 to-orange-500', icon: '🏆' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
                        <div className="text-lg mb-1">{s.icon}</div>
                        <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.color}`}>{s.value}</div>
                        <div className="text-[10px] text-gray-600 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Active modules */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Startup Empire', sub: 'Stage 3: Branding your idea', prog: 62, color: 'from-violet-500 to-purple-600', icon: '👑' },
                      { title: 'AI Pitch Simulator', sub: 'Practice investor pitch', prog: 40, color: 'from-[#1876D2] to-[#00B0FF]', icon: '🤖' },
                    ].map((m, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-4 text-left">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="text-xl">{m.icon}</span>
                          <div>
                            <div className="text-white text-xs font-bold">{m.title}</div>
                            <div className="text-gray-600 text-[10px]">{m.sub}</div>
                          </div>
                        </div>
                        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${m.prog}%` }}
                            transition={{ duration: 1.2, delay: 1 + i * 0.2 }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-600 mt-1.5">{m.prog}% complete</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
              </div>

              {/* Floating notification cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-4 sm:-right-8 top-20 bg-[#0d1527] backdrop-blur-xl border border-white/[0.10] rounded-xl p-3 shadow-2xl hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-sm">🎉</div>
                  <div>
                    <div className="text-white text-[11px] font-bold">Achievement Unlocked!</div>
                    <div className="text-emerald-400 text-[10px]">First Business Plan +200 XP</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 sm:-left-8 bottom-20 bg-[#0d1527] backdrop-blur-xl border border-white/[0.10] rounded-xl p-3 shadow-2xl hidden sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-lg flex items-center justify-center text-sm">🚀</div>
                  <div>
                    <div className="text-white text-[11px] font-bold">Live Class in 10 min</div>
                    <div className="text-[#00B0FF] text-[10px]">Pitching to Investors</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom fade to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
        </section>

        {/* ═══ SCROLLING TRUST MARQUEE ═══ */}
        <section className="py-4 bg-[#020817] border-y border-white/[0.05] relative overflow-hidden">
          <Marquee speed={22} className="py-1">
            <div className="flex items-center gap-10 px-4">
              {[
                { text: '🏆 Award-Winning Platform', highlight: false },
                { text: '🌍 35+ Countries', highlight: false },
                { text: '⭐ 4.9/5 Parent Rating', highlight: true },
                { text: '🚀 2,500+ Students', highlight: false },
                { text: '🎓 $2.9B+ Scholarships Mapped', highlight: true },
                { text: '🤖 100+ AI Tools', highlight: false },
                { text: '📺 500+ Expert Lessons', highlight: false },
                { text: '🔒 30-Day Guarantee', highlight: true },
                { text: '💡 180-Day Program', highlight: false },
                { text: '👨‍🏫 Live Mentorship', highlight: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-[13px] font-medium whitespace-nowrap ${item.highlight ? 'text-[#00B0FF]' : 'text-gray-600'}`}>
                    {item.text}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/10 flex-shrink-0" />
                </div>
              ))}
            </div>
          </Marquee>
        </section>

        {/* ═══ AS FEATURED IN — Premium Media Bar ═══ */}
        <section className="py-10 sm:py-14 bg-[#020817] border-b border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[10px] font-bold tracking-[0.25em] uppercase text-gray-700 mb-8">As Seen In &amp; Trusted By</p>
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
              {[
                { name: 'Forbes', size: 'text-xl font-black' },
                { name: 'TechCrunch', size: 'text-base font-bold' },
                { name: 'EdTech Review', size: 'text-sm font-bold tracking-wide' },
                { name: 'Times of India', size: 'text-sm font-semibold tracking-wide' },
                { name: 'YourStory', size: 'text-base font-bold' },
              ].map((pub, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${pub.size} text-gray-600 hover:text-gray-300 transition-colors duration-300 cursor-default select-none`}
                >
                  {pub.name}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive 3D Experience Section — Lightweight CSS 3D */}
        <section className="py-14 sm:py-20 bg-slate-950 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm text-gray-300 font-medium">Interactive Experience</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white tracking-tight">
                Experience the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Learning</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Immerse yourself in our cutting-edge learning environment where education meets innovation
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedHero3D />
            </motion.div>
            </div>
        </section>

        {/* Founder Mindset Section - High Converting */}
        <FounderMindsetSection />

        {/* Orbit Playground Demo Section */}
        <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <div className="inline-block bg-[#E3F2FD] rounded-full px-6 py-2 mb-6">
                <span className="text-[#1876D2] font-semibold text-sm uppercase tracking-wider">Orbit Playground</span>
                </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Watch Your Child 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                Build Anything
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                See how AI empowers your child to create games, websites, and apps with just their imagination. 
                No coding required - just creativity!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Interactive Demo Interface */}
              <motion.div 
                variants={fadeIn}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Demo Header */}
                  <div className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] px-6 py-4 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-white font-semibold">Orbit AI Builder</span>
                </div>
              </div>
              
                  {/* Demo Content */}
                  <div className="p-6">
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        ✨ What do you want to create today?
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Try: 'Create a space adventure game' or 'Build a website about dinosaurs'"
                          className="w-full px-4 py-3 border-2 border-[#E3F2FD] rounded-xl focus:border-[#1876D2] focus:outline-none transition-colors text-gray-700 bg-[#F5F9FC]"
                          defaultValue=""
                        />
                        <button className="absolute right-2 top-2 bg-[#1876D2] hover:bg-[#1565C0] text-white px-4 py-1.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 ease-out hover:scale-105">
                          Create ✨
                        </button>
                </div>
                    </div>

                    {/* Demo Examples */}
                    <div className="space-y-3 mb-6">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Popular Ideas:</div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "🎮 Space Game",
                          "🌐 Pet Care Website", 
                          "📱 Quiz App",
                          "🎨 Art Gallery",
                          "🏪 Online Store"
                        ].map((idea, index) => (
                          <button
                            key={index}
                            className="px-3 py-1.5 bg-[#E3F2FD] text-[#1876D2] rounded-full text-sm font-medium hover:bg-[#00B0FF] hover:text-white transition-all duration-300 transform hover:scale-105"
                          >
                            {idea}
                          </button>
                        ))}
                </div>
              </div>

                    {/* Sample Output */}
                    <div className="bg-gradient-to-br from-gray-50 to-[#E3F2FD] rounded-xl p-4 border border-[#E3F2FD]">
                      <div className="text-sm font-semibold text-gray-600 mb-2">AI Generated Preview:</div>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-lg flex items-center justify-center mr-3">
                            <Rocket className="h-4 w-4 text-white" />
                </div>
                          <div>
                            <div className="font-semibold text-gray-900">Space Explorer Game</div>
                            <div className="text-xs text-gray-500">Created in 30 seconds</div>
                </div>
              </div>
                        <div className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-lg p-3 text-white text-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span>🚀 Score: 1,250</span>
                            <span>❤️ Lives: 3</span>
                </div>
                          <div className="bg-white/20 rounded h-2 mb-2">
                            <div className="bg-yellow-400 h-2 rounded w-3/4"></div>
                </div>
                          <div className="text-center text-yellow-300">Press SPACE to launch! 🌟</div>
              </div>
                </div>
                    </div>
                </div>
              </div>

                {/* Subtle corner accents */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1876D2] rounded-lg shadow-lg flex items-center justify-center hidden lg:flex">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </motion.div>

              {/* Benefits & Features */}
              <motion.div 
                variants={fadeIn}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Your Child Can Build:
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🎮",
                        title: "Interactive Games",
                        description: "From simple puzzles to adventure games - all with AI guidance"
                      },
                      {
                        icon: "🌐",
                        title: "Beautiful Websites",
                        description: "Personal portfolios, hobby sites, or business ideas brought to life"
                      },
                      {
                        icon: "📱",
                        title: "Mobile Apps",
                        description: "Simple apps for organizing, learning, or sharing with friends"
                      },
                      {
                        icon: "🎨",
                        title: "Creative Projects",
                        description: "Digital art galleries, story books, and multimedia presentations"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                      </div>
                    ))}
              </div>
            </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-2xl p-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Ready to See the Magic?</h4>
                  <p className="text-white/90 mb-4 text-sm">
                    Join thousands of kids already building their dreams with AI
                  </p>
                  <button 
                    onClick={() => setShowEnrollment(true)}
                    className="group bg-white hover:bg-slate-50 text-[#1876D2] px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 ease-out hover:scale-105 flex items-center border border-slate-200 shadow-md"
                  >
                    Start Building Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
            </div>
              </motion.div>
          </div>

            {/* Trust Indicators */}
            <motion.div 
              variants={fadeIn}
              className="mt-16 text-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">100% Safe & Secure</span>
        </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">2,500+ Happy Families</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-[#00B0FF]" />
                  <span className="text-sm font-medium">Award-Winning Platform</span>
              </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ WHAT YOUR CHILD GETS — Interactive Visual USP ═══ */}
        <section className="py-16 sm:py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.04]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, #1876D2 0%, transparent 70%)' }} />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#1876D2]/10 mb-8">
                <Sparkles className="h-4 w-4 text-[#1876D2]" />
                <span className="text-sm font-medium text-[#1876D2]">The Orbit Difference</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
                Not Just Learning.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Living It.</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Other platforms give PDFs. We give your child a real experience — building companies, playing business games, pitching to AI investors, and mastering skills that schools don't teach.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 sm:mb-12 bg-white rounded-2xl border border-[#1876D2]/10 shadow-lg shadow-[#1876D2]/5 p-4 sm:p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { k: '01', t: 'Play', d: 'Gamified startup and finance missions' },
                  { k: '02', t: 'Build', d: 'Websites, apps, decks with AI copilots' },
                  { k: '03', t: 'Launch', d: 'Mentor feedback and real-world showcases' },
                  { k: '04', t: 'Win', d: 'Portfolio + scholarship-ready profile' },
                ].map((step) => (
                  <div key={step.k} className="rounded-xl bg-[#f8fbff] border border-[#1876D2]/10 p-4">
                    <div className="text-[10px] font-bold text-[#1876D2] tracking-widest mb-1">STEP {step.k}</div>
                    <div className="text-sm font-bold text-gray-900 mb-1">{step.t}</div>
                    <p className="text-xs text-gray-500">{step.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interactive USP Cards — gradient border (21st.dev style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {[
                {
                  icon: '🎮',
                  title: '10 Business Games',
                  subtitle: 'Not watching. Playing.',
                  desc: 'From running a lemonade stand to trading across planets — kids learn pricing, investing, budgeting & pitching through addictive mini-games.',
                  stats: '10 games · 500+ XP',
                  border: 'from-violet-500/40 via-purple-600/20 to-transparent',
                  glow: 'group-hover:shadow-violet-500/10',
                  accent: 'text-violet-400',
                  link: '/demo',
                },
                {
                  icon: '👑',
                  title: 'Startup Empire',
                  subtitle: 'Build a $10M company.',
                  desc: 'A full roleplay game with 6 stages, 24 missions — from idea generation to IPO. Real decisions, real consequences.',
                  stats: '6 stages · 24 missions',
                  border: 'from-amber-500/40 via-orange-600/20 to-transparent',
                  glow: 'group-hover:shadow-amber-500/10',
                  accent: 'text-amber-400',
                  link: '/demo',
                },
                {
                  icon: '🤖',
                  title: 'AI Superpowers',
                  subtitle: '100+ AI tools. Zero limits.',
                  desc: 'AI Website Builder, AI Presentation Maker, AI Business Plan Writer — your child learns to command AI like a CEO.',
                  stats: '100+ tools · Unlimited',
                  border: 'from-[#1876D2]/40 via-[#00B0FF]/20 to-transparent',
                  glow: 'group-hover:shadow-[#1876D2]/10',
                  accent: 'text-[#00B0FF]',
                  link: '/demo',
                },
                {
                  icon: '🎯',
                  title: '180-Day Curriculum',
                  subtitle: 'Structured. Not random.',
                  desc: 'A proven path from beginner to confident young entrepreneur. Weekly tasks, live classes, mentorship — every day builds real skills.',
                  stats: '180 days · 52 live classes',
                  border: 'from-emerald-500/40 via-teal-600/20 to-transparent',
                  glow: 'group-hover:shadow-emerald-500/10',
                  accent: 'text-emerald-400',
                  link: '/courses',
                },
                {
                  icon: '🌍',
                  title: 'Scholarship Database',
                  subtitle: 'Start early. Win big.',
                  desc: '500+ scholarships, competitions, and fellowships mapped for your child — most parents don\'t even know these exist.',
                  stats: '500+ opportunities',
                  border: 'from-indigo-500/40 via-blue-600/20 to-transparent',
                  glow: 'group-hover:shadow-indigo-500/10',
                  accent: 'text-indigo-400',
                  link: '/resources',
                },
                {
                  icon: '🏆',
                  title: 'Real Portfolio',
                  subtitle: 'Not certificates. Proof.',
                  desc: 'Your child builds websites, games, pitch decks, and business plans they can actually show to schools and competitions.',
                  stats: '10+ portfolio pieces',
                  border: 'from-rose-500/40 via-pink-600/20 to-transparent',
                  glow: 'group-hover:shadow-rose-500/10',
                  accent: 'text-rose-400',
                  link: '/about',
                },
              ].map((usp, i) => (
                <motion.a
                  key={i}
                  href={usp.link}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${usp.border} hover:shadow-2xl ${usp.glow} transition-all duration-500 overflow-hidden`}
                >
                  {/* Inner card */}
                  <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 h-full flex flex-col">
                    {/* Icon row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-3xl">{usp.icon}</span>
                      <span className={`text-[10px] font-bold ${usp.accent} bg-current/5 border border-current/20 px-2.5 py-1 rounded-full opacity-70`}
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <span className={`${usp.accent}`}>{usp.stats}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{usp.title}</h3>
                    <p className={`text-xs font-semibold ${usp.accent} mb-3 tracking-wide`}>{usp.subtitle}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-grow">{usp.desc}</p>

                    {/* Hover CTA */}
                    <div className={`mt-5 flex items-center gap-1.5 ${usp.accent} text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0`}>
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Bottom comparison strip */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Other EdTech vs. Orbit Student</h3>
                <p className="text-gray-400 text-sm">See why 2,500+ parents made the switch</p>
                </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  { other: 'Watch pre-recorded videos', orbit: 'Build real projects & play business games' },
                  { other: 'Get a certificate PDF', orbit: 'Build a portfolio of websites, games & pitches' },
                  { other: 'Learn theory from slides', orbit: 'Run a lemonade stand, trade stocks, pitch to AI investors' },
                  { other: 'Generic content for all ages', orbit: 'Personalized AI-powered path for ages 8-18' },
                  { other: 'No scholarship guidance', orbit: '500+ scholarships & competition database' },
                  { other: 'Learning stops at logout', orbit: 'Kids beg to come back and play more' },
                ].map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-3 h-3 text-red-400" />
                  </div>
                  </div>
                    <div>
                      <p className="text-gray-500 text-xs line-through mb-1">{row.other}</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-white text-sm font-medium">{row.orbit}</p>
                  </div>
                </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button onClick={() => setShowEnrollment(true)} className="group px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all hover:scale-[1.02]">
                  <span className="flex items-center gap-2">
                    Try It Free — See the Difference
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                </div>
            </motion.div>
                  </div>
        </section>

        {/* ═══ REAL PARENT STORIES — 21st.dev glassmorphism cards ═══ */}
        <section className="py-16 sm:py-28 bg-[#020817] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(24,118,210,0.12) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8">
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Real Parent Stories</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                "My Child is a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#00B0FF] to-[#38bdf8]">Different Person</span>"
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">See the transformations that make parents proud</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {[
                { name: 'Sarah Chen', role: 'Mother of Emma (12)', quote: 'Emma went from being too shy to order food to confidently pitching business ideas to our neighbors!', result: '🏆 Started a pet-sitting business, earning $500/month', initials: 'SC', color: 'from-[#1876D2] to-[#00B0FF]' },
                { name: 'Michael Rodriguez', role: 'Father of Diego (14)', quote: 'Diego now thinks like an entrepreneur. He sees opportunities everywhere and has developed incredible leadership skills.', result: '🏆 Led school fundraising, raised $2,000 for charity', initials: 'MR', color: 'from-emerald-400 to-teal-500' },
                { name: 'Jennifer Park', role: 'Mother of Alex (13)', quote: 'Best investment we ever made. Alex is now mentoring other kids and speaking at school events with confidence!', result: '🏆 Became student council president, launched school app', initials: 'JP', color: 'from-violet-500 to-purple-600' },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent hover:from-white/[0.14] transition-all duration-500"
                >
                  <div className="bg-[#080f1e] rounded-2xl p-7 h-full flex flex-col relative overflow-hidden">
                    {/* Subtle glow top-right */}
                    <div className={`absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br ${t.color} opacity-[0.07] rounded-full blur-2xl group-hover:opacity-[0.14] transition-opacity duration-500`} />

                    {/* Stars + badge */}
                    <div className="flex items-center justify-between mb-5 relative">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />)}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/[0.08] border border-emerald-400/20 px-2.5 py-1 rounded-full">
                        ✓ Verified Parent
                      </span>
                    </div>

                    {/* Quote mark */}
                    <div className="text-5xl font-serif text-white/[0.06] leading-none mb-2 select-none relative">"</div>

                    {/* Quote text */}
                    <p className="text-gray-300 leading-relaxed flex-grow text-sm mb-5 relative">{t.quote}</p>

                    {/* Result pill */}
                    <div className="bg-[#1876D2]/[0.08] border border-[#1876D2]/20 rounded-xl px-4 py-2.5 mb-5">
                      <p className="text-xs font-semibold text-[#60a5fa]">{t.result}</p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 relative">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-white/[0.06]`}>{t.initials}</div>
                      <div>
                        <div className="text-white text-sm font-bold">{t.name}</div>
                        <div className="text-gray-600 text-[11px]">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats strip — animated glass counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '2,500+', label: 'Happy Families', icon: '👨‍👩‍👧' },
                { value: '98%', label: 'Parent Satisfaction', icon: '💚' },
                { value: '35+', label: 'Countries', icon: '🌍' },
                { value: 'Forbes', label: 'Featured In', icon: '📰' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center hover:bg-white/[0.05] hover:border-white/[0.10] transition-all duration-400 group"
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <AnimatedCounter value={s.value} className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#00B0FF] block" duration={2} />
                  <div className="text-gray-600 text-xs mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPLETE LEARNING ECOSYSTEM — White with Glass Cards ═══ */}
        <section className="py-16 sm:py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#1876D2]/10 mb-8">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-[#1876D2]">Complete Learning Ecosystem</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
                  AI-Powered Learning
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                    Meets Real Mentorship
                  </span>
              </h2>

                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                  The perfect blend of cutting-edge AI tools, live mentorship, and interactive simulators — giving your child every advantage.
                </p>

                {/* Learning method cards — 2x2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: Brain, name: 'AI-Powered Tools', desc: '24/7 AI coach & smart analytics', gradient: 'from-[#1876D2] to-[#00B0FF]' },
                    { icon: Users, name: 'Live Expert Classes', desc: 'Interactive sessions with mentors', gradient: 'from-emerald-500 to-teal-600' },
                    { icon: TrendingUp, name: 'Business Simulators', desc: 'Risk-free virtual environments', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
                    { icon: PlayCircle, name: 'Recorded Sessions', desc: '500+ expert-led lessons', gradient: 'from-amber-500 to-orange-500' },
                  ].map((m, i) => (
                    <div key={i} className="group bg-gray-50 hover:bg-white rounded-xl p-4 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-9 h-9 bg-gradient-to-br ${m.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                          <m.icon className="h-4 w-4 text-white" />
                  </div>
                        <h3 className="text-sm font-bold text-gray-900">{m.name}</h3>
                  </div>
                      <p className="text-gray-500 text-xs pl-12">{m.desc}</p>
                  </div>
                  ))}
              </div>

                {/* Stats row */}
                <div className="flex gap-8">
                  {[{ v: '100+', l: 'AI Tools' }, { v: '50+', l: 'Live Monthly' }, { v: '500+', l: 'Lessons' }].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">{s.v}</div>
                      <div className="text-gray-400 text-xs">{s.l}</div>
                </div>
                  ))}
                  </div>
              </motion.div>

              {/* Right: Image with overlay */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
                  <img
                    src="/images/hero/journey-map.jpg"
                    alt="Students collaborating with AI tools"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  {/* Live badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white font-medium text-xs">LIVE NOW</span>
                  </div>
                  </div>
            
                {/* Floating stat card */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl border border-gray-100 p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">Expert-Led</div>
                      <div className="text-[10px] text-gray-400">AI-Powered</div>
              </div>
            </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 180-DAY ROADMAP — Dark with Numbered Cards ═══ */}
        <section className="py-16 sm:py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-[#1876D2]/8 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] bg-[#00B0FF]/6 rounded-full filter blur-[80px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Banner image */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
              <div className="relative rounded-2xl overflow-hidden max-w-5xl mx-auto border border-white/[0.06]">
                <img src="/images/hero/orbit-kids-banner.jpg" alt="Orbit Student - Empowering Kids to Learn AI" className="w-full h-auto" width="1200" height="600" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
            </motion.div>

            {/* Section header */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Rocket className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Step-by-Step Journey</span>
                </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Your Child's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">180-Day</span> Adventure
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">From first spark to real business launch — guided every step of the way.</p>
            </motion.div>

            {/* Timeline cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {[
                { icon: Lightbulb, title: 'Discovery', desc: 'Find your passion', items: ['Problem ID', 'Market Research', 'Idea Validation'], num: '01', gradient: 'from-[#1876D2] to-[#00B0FF]' },
                { icon: Rocket, title: 'Idea to MVP', desc: 'Build something real', items: ['Product Dev', 'Customer Feedback', 'Prototype'], num: '02', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
                { icon: Presentation, title: 'Branding', desc: 'Create your identity', items: ['Visual Identity', 'Messaging', 'Pitch Deck'], num: '03', gradient: 'from-[#40C4FF] to-[#1876D2]' },
                { icon: Mic, title: 'Public Speaking', desc: 'Become confident', items: ['Techniques', 'Presentation', 'Confidence'], num: '04', gradient: 'from-[#1876D2] to-emerald-400' },
                { icon: DollarSign, title: 'Finance & Pitch', desc: 'Master money', items: ['Planning', 'Investor Deck', 'Demo Day'], num: '05', gradient: 'from-emerald-400 to-[#00B0FF]' },
              ].map((phase, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="group">
                  <div className="bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-6 h-full transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-3 right-4 text-4xl font-black text-white/[0.03] select-none">{phase.num}</div>
                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${phase.gradient} mb-4 shadow-lg`}>
                      <phase.icon className="h-5 w-5 text-white" />
                </div>
                    <h3 className="text-base font-bold text-white mb-1">{phase.title}</h3>
                    <p className="text-gray-500 text-xs mb-4">{phase.desc}</p>
                <div className="space-y-2">
                      {phase.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" />
                          <span className="text-gray-400 text-xs">{item}</span>
              </div>
                      ))}
                </div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#1876D2]/5 to-[#00B0FF]/5" />
              </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ ORBIT vs. OTHERS — Comparison (slightly lighter dark for visual break) ═══ */}
        <section className="py-16 sm:py-28 bg-[#0c1222] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1876D2]/6 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#00B0FF]/5 rounded-full filter blur-[100px]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
                <BarChart3 className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">See the Difference</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Why Parents Choose{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Orbit Student</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Not all learning platforms are created equal. Here's how Orbit stacks up against traditional edtech.</p>
            </motion.div>

            {/* Comparison — Mobile: stacked cards / Desktop: table */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              {/* Desktop table (hidden on mobile) */}
              <div className="hidden md:block rounded-3xl overflow-hidden border border-white/[0.06]">
                <div className="grid grid-cols-3 bg-white/[0.03]">
                  <div className="p-5 border-b border-r border-white/[0.06]">
                    <span className="text-gray-500 text-sm font-medium">Feature</span>
                  </div>
                  <div className="p-5 border-b border-r border-white/[0.06] text-center">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center">
                        <Rocket className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-white font-bold text-sm">Orbit Student</span>
                    </div>
                  </div>
                  <div className="p-5 border-b border-white/[0.06] text-center">
                    <span className="text-gray-500 text-sm font-medium">Other Edtech</span>
                  </div>
                </div>
                {[
                  { feature: 'Target Age', orbit: 'Ages 8-18 (start early)', other: 'Ages 14+ only' },
                  { feature: 'Learning Approach', orbit: 'Build real businesses & products', other: 'Watch videos & take quizzes' },
                  { feature: 'AI Integration', orbit: '100+ AI tools — create, analyze, pitch', other: 'No AI tools or basic chatbot' },
                  { feature: 'Scholarship Prep', orbit: 'Personalized roadmap from day one', other: 'Not included' },
                  { feature: 'Mentorship', orbit: 'Live 1-on-1 with real entrepreneurs', other: 'Pre-recorded only' },
                  { feature: 'Portfolio Building', orbit: 'AI-powered portfolio + competitions', other: 'Certificate of completion' },
                  { feature: 'Business Simulators', orbit: 'Full pitch, brand, market simulators', other: 'None' },
                  { feature: 'Parental Visibility', orbit: 'Real-time dashboard & reports', other: 'Basic progress email' },
                ].map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white/[0.01]' : 'bg-transparent'} hover:bg-white/[0.03] transition-colors`}>
                    <div className="p-5 border-r border-white/[0.06] flex items-center">
                      <span className="text-gray-300 text-sm font-medium">{row.feature}</span>
                    </div>
                    <div className="p-5 border-r border-white/[0.06] flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-300 text-sm font-medium">{row.orbit}</span>
                    </div>
                    <div className="p-5 flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-400/60 flex-shrink-0" />
                      <span className="text-gray-500 text-sm">{row.other}</span>
                    </div>
                  </motion.div>
                ))}
            </div>

              {/* Mobile cards (hidden on desktop) */}
              <div className="md:hidden space-y-3">
                {[
                  { feature: 'Target Age', orbit: 'Ages 8-18 (start early)', other: 'Ages 14+ only' },
                  { feature: 'Learning Approach', orbit: 'Build real businesses & products', other: 'Watch videos & take quizzes' },
                  { feature: 'AI Integration', orbit: '100+ AI tools — create, analyze, pitch', other: 'No AI tools or basic chatbot' },
                  { feature: 'Scholarship Prep', orbit: 'Personalized roadmap from day one', other: 'Not included' },
                  { feature: 'Mentorship', orbit: 'Live 1-on-1 with real entrepreneurs', other: 'Pre-recorded only' },
                  { feature: 'Portfolio Building', orbit: 'AI-powered portfolio + competitions', other: 'Certificate of completion' },
                  { feature: 'Business Simulators', orbit: 'Full pitch, brand, market simulators', other: 'None' },
                  { feature: 'Parental Visibility', orbit: 'Real-time dashboard & reports', other: 'Basic progress email' },
                ].map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.05] transition-colors">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{row.feature}</div>
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-emerald-300 text-sm font-medium leading-snug">{row.orbit}</span>
            </div>
                    <div className="flex items-start gap-2 pl-6">
                      <X className="h-3.5 w-3.5 text-red-400/50 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-xs line-through leading-snug">{row.other}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom verdict */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-[#1876D2]/10 to-[#00B0FF]/10 border border-[#1876D2]/20">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-amber-400" />
                  <p className="text-white font-medium">Orbit Student wins in <span className="text-[#00B0FF] font-bold">every category</span></p>
                  </div>
                <button onClick={() => setShowEnrollment(true)} className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all">
                  Start Free Trial <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                </div>
            </motion.div>
              </div>
        </section>

        {/* ═══ THE ORBIT ADVANTAGE — Bento Grid ═══ */}
        <section className="py-16 sm:py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                What Makes Orbit{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Unstoppable</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">We don't just teach — we transform. Every feature is designed to give your child an unfair advantage.</p>
            </motion.div>

            {/* Bento Grid — mixed sizes for visual variety */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-auto md:auto-rows-[200px]">
              {/* LARGE — Start at Age 8 (spans 4 cols, 1 row) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group md:col-span-4 relative rounded-3xl p-8 bg-gradient-to-br from-[#1876D2]/5 to-[#00B0FF]/5 border border-[#1876D2]/10 hover:border-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/8 transition-all duration-700 overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#1876D2]/5 rounded-full filter blur-[60px] pointer-events-none" />
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1876D2] to-[#1565C0] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Start at Age 8</h3>
                      <p className="text-gray-500 text-sm">While others wait until high school, Orbit students begin building portfolios from elementary school.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-6">
                  <div>
                    <AnimatedCounter value="6+" className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]" />
                    <span className="text-gray-400 text-xs ml-2 uppercase tracking-wider">years head start</span>
                  </div>
                  <div className="flex gap-1 items-end h-12">
                    {[20, 35, 30, 50, 45, 65, 60, 80, 75, 95, 90, 100].map((h, j) => (
                      <motion.div
                        key={j}
                        className="w-2 bg-gradient-to-t from-[#1876D2] to-[#00B0FF] rounded-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + j * 0.05, duration: 0.4 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* SMALL — AI-First (spans 2 cols, 1 row) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group md:col-span-2 relative rounded-3xl p-7 bg-gradient-to-br from-cyan-50 to-blue-50 border border-[#00B0FF]/10 hover:border-[#00B0FF]/25 hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col justify-between"
              >
                  <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00B0FF] to-[#00BFA5] flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">AI-First Learning</h3>
                  <p className="text-gray-500 text-sm">100+ AI tools no other edtech offers for kids.</p>
                </div>
                <AnimatedCounter value="100+" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00B0FF] to-[#00BFA5]" />
              </motion.div>

              {/* SMALL — Real Outcomes (spans 2 cols, 1 row) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group md:col-span-2 relative rounded-3xl p-7 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/40 hover:border-emerald-300/60 hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-6 w-6 text-white" />
              </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Real Outcomes</h3>
                  <p className="text-gray-500 text-sm">Real businesses, competitions won, scholarships earned.</p>
                </div>
                <AnimatedCounter value="$2.9B+" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500" />
              </motion.div>

              {/* WIDE — Parent-Approved (spans 4 cols, 1 row) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group md:col-span-4 relative rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/40 hover:border-amber-300/60 hover:shadow-2xl transition-all duration-700 overflow-hidden flex items-center gap-8"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Heart className="h-7 w-7 text-white" />
                    </div>
                  <div>
                      <h3 className="text-xl font-bold text-gray-900">Parent-Approved</h3>
                      <p className="text-gray-500 text-sm">98% of parents say Orbit changed their child's confidence forever.</p>
                  </div>
                </div>
              </div>
                <div className="hidden sm:flex items-center gap-2">
                  <AnimatedCounter value="98%" className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500" />
                  <div className="text-gray-400 text-xs uppercase tracking-wider leading-tight">parent<br/>satisfaction</div>
                </div>
                {/* Star ratings visual */}
                <div className="hidden md:flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + j * 0.1, type: 'spring' }}
                    >
                      <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ GLOBAL RESOURCES TEASER — Link to /resources ═══ */}
        <section className="py-14 sm:py-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-[#1876D2]/10 rounded-full filter blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Globe className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Global Opportunities</span>
        </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Global Dreamers</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-10">Scholarships, competitions, AI tools, fellowships — a curated database of opportunities to launch your global journey.</p>
              <a href="/resources" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]">
                Explore Resources & Opportunities
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
                </div>
        </section>

        {/* ═══ SOCIAL PROOF BAR — Animated Counters ═══ */}
        <section className="py-16 bg-slate-950 relative overflow-hidden border-t border-b border-white/[0.04]">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
              {[
                { v: '2,500+', l: 'Students Enrolled', icon: Users },
                { v: '98%', l: 'Parent Satisfaction', icon: Heart },
                { v: '500+', l: 'Scholarships Mapped', icon: GraduationCap },
                { v: '100+', l: 'AI Tools Available', icon: Brain },
                { v: '24/7', l: 'AI Learning Support', icon: Zap },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-[#00B0FF]/20 transition-all duration-500">
                      <s.icon className="h-5 w-5 text-[#00B0FF]" />
              </div>
              </div>
                  <AnimatedCounter value={s.v} className="text-2xl sm:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]" duration={2.5} />
                  <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
              </div>
              </div>
        </section>

        {/* ═══ THE COST OF WAITING — Emotional Urgency ═══ */}
        <section className="py-16 sm:py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/60 mb-8">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">The Clock Is Ticking</span>
        </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Every Year You Wait,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-red-500">Your Child Falls Behind</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">Here's what happens when students start their entrepreneurial journey at different ages.</p>
            </motion.div>

            {/* Timeline comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  start: 'Starts at Age 8',
                  emoji: '🏆',
                  results: ['6 years of portfolio building', '10+ competition wins by 14', 'Full-ride scholarship ready at 16', 'Published author & speaker', 'AI-literate since elementary'],
                  tag: 'Orbit Early Bird',
                  tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                  borderColor: 'border-emerald-200 hover:border-emerald-400',
                  highlight: true,
                },
                {
                  start: 'Starts at Age 14',
                  emoji: '⏰',
                  results: ['2 years of rushed prep', '1-2 activities to show', 'Generic application essays', 'Playing catch-up with peers', 'Basic digital skills only'],
                  tag: 'Average Student',
                  tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
                  borderColor: 'border-gray-200',
                  highlight: false,
                },
                {
                  start: 'Starts at Age 17',
                  emoji: '😰',
                  results: ['Too late for most programs', 'Empty extracurricular section', 'Panic-mode applications', 'Missed $2.9B in scholarships', 'Years of regret for parents'],
                  tag: 'Too Late',
                  tagColor: 'bg-red-50 text-red-600 border-red-200',
                  borderColor: 'border-gray-200',
                  highlight: false,
                },
              ].map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className={`rounded-3xl p-7 border-2 ${col.borderColor} ${col.highlight ? 'bg-emerald-50/30 shadow-xl shadow-emerald-100/50 ring-2 ring-emerald-100' : 'bg-gray-50/50'} transition-all duration-500 h-full relative`}>
                    {col.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white text-xs font-bold rounded-full shadow-lg">
                        RECOMMENDED
              </div>
                    )}

                    <div className="text-center mb-6">
                      <span className="text-4xl mb-3 block">{col.emoji}</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${col.tagColor}`}>{col.tag}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-3">{col.start}</h3>
              </div>

                    <ul className="space-y-3">
                      {col.results.map((r, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm">
                          {col.highlight ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-4 w-4 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={col.highlight ? 'text-gray-700 font-medium' : 'text-gray-500'}>{r}</span>
                        </li>
                      ))}
                    </ul>

                    {col.highlight && (
                      <button onClick={() => setShowEnrollment(true)} className="mt-6 w-full py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl text-sm shadow-lg shadow-[#1876D2]/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                        Start Now — It's Free
                      </button>
                    )}
              </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA — Dark Cinematic with Guarantee ═══ */}
        <section className="py-16 sm:py-32 bg-[#050a18] relative overflow-hidden">
          {/* Animated center glow */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(24,118,210,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-8">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Limited — Only 30 Spots Left This Batch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Don't Let Your Child Fall Behind
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]">While Others Get Ahead</span>
              </h2>

              <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                While other kids are watching YouTube, your child could be building businesses, winning scholarships, and mastering AI with Orbit Student.
              </p>

              {/* Urgency strip */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto mb-8 sm:mb-12">
                {[{ v: '30', l: 'Spots Left' }, { v: '7', l: 'Days Left' }, { v: '$200', l: 'Savings' }].map((u, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
                  >
                    <div className="text-2xl font-bold text-amber-400">{u.v}</div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">{u.l}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <button onClick={() => setShowEnrollment(true)} className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/40 transition-all duration-500 hover:scale-[1.03]">
                  <span className="flex items-center justify-center gap-2">
                    Secure Your Child's Spot Now
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="w-full sm:w-auto px-8 py-4 sm:py-5 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-all duration-300 backdrop-blur-sm">
                  Download Free Guide
                </button>
            </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" /> 30-day money-back guarantee</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#00B0FF]" /> 2,500+ happy families</span>
                <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-400" /> 4.9/5 parent rating</span>
              </div>

              {/* Guarantee badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-400/5 border border-emerald-400/15"
              >
                <Shield className="h-8 w-8 text-emerald-400" />
                <div className="text-left">
                  <div className="text-emerald-400 text-sm font-bold">100% Risk-Free Guarantee</div>
                  <div className="text-gray-500 text-xs">Not satisfied? Full refund within 30 days. No questions asked.</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══ LEAD CAPTURE — White ═══ */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <CTAWithLeadCapture
              source="homepage"
              ctaType="demo"
              buttonText="Book Free Demo"
              title="Ready to Transform Your Child's Future?"
              subtitle="Join 2,500+ families who've unlocked their child's entrepreneurial potential with our proven 180-day program"
              formTitle="Book Your Free Demo"
              formSubtitle="Get a personalized demo and see how Orbit Student can transform your child's future"
              fields={['parentName', 'email', 'phone', 'studentName', 'childAge']}
              variant="primary"
              size="lg"
            />
          </div>
        </section>

        {/* ═══ SECONDARY CTA — Light ═══ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-6">
            <CTAWithLeadCapture
              source="homepage"
              ctaType="newsletter"
              buttonText="Get Free Resources"
              title="Get Our Free Entrepreneurship Guide"
              subtitle="Download our comprehensive guide with activities, worksheets, and tips to start your child's entrepreneurial journey today"
              formTitle="Download Free Guide"
              formSubtitle="Enter your details to get instant access to our exclusive resources"
              fields={['parentName', 'email', 'childAge']}
              variant="secondary"
              size="md"
            />
          </div>
        </section>

        {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
        {showCareerGuide && <CareerGuidePopup isOpen={showCareerGuide} onClose={() => setShowCareerGuide(false)} />}
      </div>
    </>
  );
}