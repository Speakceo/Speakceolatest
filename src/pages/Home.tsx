import { useState } from 'react';
import {
  ArrowRight,
  Brain,
  Users,
  Rocket,
  CheckCircle,
  Star,
  Target,
  Award,
  PlayCircle,
  Shield,
  Trophy,
  Zap,
  X,
  Clock,
  GraduationCap,
  Gamepad2,
  Crown,
  Flame,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnrollmentPopup from '../components/EnrollmentPopup';
import CareerGuidePopup from '../components/career/CareerGuidePopup';
import SEO from '../components/SEO';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import FounderMindsetSection from '../components/home/FounderMindsetSection';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
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
          'Orbit Student','Orbit Student login','Orbit Student portal','Orbit Student dashboard','Orbit Student app',
          'Orbit Student courses','Orbit Student AI tools','Orbit Student live classes','Orbit Student demo',
          'Orbit Student free trial','Orbit Student review','Orbit Student scholarship','orbitstudent','orbitstudent login',
          'AI learning platform','AI for kids','AI student portal','entrepreneurship for kids','young entrepreneur program',
          'best edtech for kids','future skills for children','business education for children','coding for kids','STEM for kids',
          'public speaking for kids','leadership for kids','scholarship prep for kids','best future plan for kids',
          'online learning for kids','student learning portal','AI powered education','kids business course online',
        ]}
      />

      <div className="min-h-screen bg-white text-[#3c3c3c]"
        style={{ fontFamily: "'Inter Variable','Inter','Poppins',-apple-system,BlinkMacSystemFont,sans-serif" }}>

        {/* ════════════════════════════════════════════════════════════════
            1 ◆ HERO — bright Duolingo-cream with live quest preview card
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-duo-cream pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
          {/* Soft dot grid */}
          <div className="absolute inset-0 duo-dots opacity-60 pointer-events-none" />
          {/* Subtle blue wash bottom-right */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,118,210,0.06) 0%, transparent 70%)' }} />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 sm:gap-14 lg:gap-16 items-center">

              {/* ── Left: copy ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Live signal chip */}
                <div className="inline-flex items-center gap-2 mb-7 chip-duo chip-duo-blue">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1876D2] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1876D2]" />
                  </span>
                  AI-powered · Ages 8–18
                </div>

                <h1 className="duo-display text-[clamp(2.4rem,7vw,5.2rem)] mb-6">
                  Where Young<br />Minds Become<br />
                  <span style={{ color: '#1876D2' }}>Leaders.</span>
                </h1>

                <p className="text-[16px] sm:text-[18px] leading-[1.65] text-[#777] max-w-[480px] mb-8 sm:mb-10">
                  The AI-powered 180-day program transforming kids into confident entrepreneurs — through real games, live projects, and expert mentorship.
                </p>

                {/* CTAs — chunky Duolingo press buttons */}
                <div className="flex flex-col xs:flex-row sm:flex-row gap-3 mb-10 sm:mb-12">
                  <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => setShowCareerGuide(true)} className="btn-duo btn-duo-secondary">
                    <PlayCircle className="h-4 w-4 text-[#1876D2]" />
                    Watch Demo
                  </button>
                </div>

                {/* Avatar stack + rating */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-2">
                    {[
                      { bg: '#1876D2', label: 'SC' },
                      { bg: '#10b981', label: 'MR' },
                      { bg: '#a855f7', label: 'JP' },
                      { bg: '#f59e0b', label: 'AK' },
                    ].map((a, i) => (
                      <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold ring-[3px] ring-white"
                        style={{ background: a.bg }}>
                        {a.label}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#3c3c3c] text-[14px] font-bold leading-tight">2,500+ families</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#ffc800] fill-[#ffc800]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-[#777] text-[12px] font-semibold ml-1.5">4.9/5</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 pl-4 border-l-2 border-[#e5e5e5]">
                    <Shield className="w-3.5 h-3.5 text-[#58cc02]" />
                    <span className="text-[12px] text-[#777] font-semibold">30-day guarantee</span>
                  </div>
                </div>
              </motion.div>

              {/* ── Right: Live quest preview card (Duolingo's signature) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Floating badge — top right */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex absolute -top-3 -right-3 z-10 chip-duo chip-duo-orange items-center gap-1.5 shadow-md"
                >
                  <Flame className="w-3.5 h-3.5" /> 12-day streak
                </motion.div>

                {/* The card */}
                <div className="card-duo card-duo-blue p-5 sm:p-6 max-w-[520px] mx-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#1876D2,#00B0FF)' }}>
                        <Rocket className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#3c3c3c] leading-none">Today's Quests</p>
                        <p className="text-[11px] text-[#777] mt-0.5">Earn 430 XP · 5 missions</p>
                      </div>
                    </div>
                    <span className="streak-badge-light"><Flame className="w-3 h-3" /> 12d</span>
                  </div>

                  {/* Level ribbon */}
                  <div className="bg-[#fefcf6] border-2 border-[#e5e5e5] rounded-2xl p-3 mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] font-bold text-[#3c3c3c]">LV 7 · Young Entrepreneur</span>
                      <span className="text-[11px] font-bold text-[#777]">1,240 / 2,000 XP</span>
                    </div>
                    <div className="xp-bar-track-light">
                      <div className="xp-bar-fill-light" style={{ width: '62%' }} />
                    </div>
                  </div>

                  {/* Quest tiles — 3 in a row */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { emoji: '🏪', xp: '+120', color: 'card-duo-green', done: true },
                      { emoji: '🤖', xp: '+200', color: 'card-duo-blue', done: false },
                      { emoji: '📊', xp: '+350', color: 'card-duo-pink', done: false },
                    ].map((q, i) => (
                      <div key={i} className={`card-duo ${q.color} p-3 text-center`} style={{ paddingTop: 14, paddingBottom: 10 }}>
                        <span className="text-2xl block mb-1.5">{q.emoji}</span>
                        {q.done ? (
                          <CheckCircle className="w-4 h-4 text-[#58cc02] mx-auto" />
                        ) : (
                          <span className="text-[10px] font-bold text-[#1876D2]">{q.xp} XP</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* CTA inside card */}
                  <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary w-full mt-4" style={{ padding: '12px 20px', fontSize: 13 }}>
                    Continue Learning →
                  </button>
                </div>

                {/* Floating proof — bottom left */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex absolute -bottom-4 -left-4 z-10 card-duo card-duo-green items-center gap-2.5 px-3.5 py-2.5"
                  style={{ padding: '10px 14px' }}
                >
                  <div className="w-8 h-8 bg-[#dbf8c5] rounded-lg flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-[#58a700]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-extrabold text-[#3c3c3c] leading-tight">98% Success</p>
                    <p className="text-[10px] text-[#777]">Among enrolled</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            2 ◆ TRUST BAR — clean white with chunky number cards
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-y-2 border-[#e5e5e5]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
              {[
                { value: '2,500+', label: 'Families enrolled' },
                { value: '35+', label: 'Countries' },
                { value: '4.9/5', label: 'Parent rating' },
                { value: '180', label: 'Day program' },
                { value: '98%', label: 'Success rate' },
              ].map((s, i) => (
                <div key={i} className={i === 4 ? 'col-span-2 sm:col-span-1' : ''}>
                  <p className="text-[#3c3c3c] text-[22px] sm:text-[26px] font-extrabold leading-none tracking-[-0.02em]">{s.value}</p>
                  <p className="text-[#777] text-[11px] sm:text-[12px] font-semibold mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Press logos row */}
            <div className="border-t-2 border-[#e5e5e5] mt-8 pt-7">
              <p className="text-center duo-eyebrow mb-5" style={{ color: '#777', letterSpacing: '0.18em' }}>As featured in</p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
                {[
                  { name: 'Forbes', cls: 'text-[19px] font-black' },
                  { name: 'TechCrunch', cls: 'text-[15px] font-extrabold' },
                  { name: 'EdTech Review', cls: 'text-[13px] font-bold tracking-wide' },
                  { name: 'Times of India', cls: 'text-[13px] font-bold' },
                  { name: 'YourStory', cls: 'text-[15px] font-extrabold' },
                ].map((pub, i) => (
                  <span key={i} className={`${pub.cls} text-[#afafaf] hover:text-[#3c3c3c] transition-colors duration-200 cursor-default`}>
                    {pub.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            3 ◆ HOW IT WORKS — 4 chunky cards Play / Build / Launch / Win
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-duo-blue-tint">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="duo-eyebrow mb-4">How it works</p>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                Four steps from kid to <span style={{ color: '#1876D2' }}>young CEO</span>.
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#777] max-w-2xl mx-auto leading-relaxed">
                Real experience, not pre-recorded videos. Your child builds, launches and wins — all in 180 days.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { n: '01', t: 'Play', d: 'Gamified missions & business simulations', icon: Gamepad2, color: 'card-duo-blue', iconColor: '#1876D2', iconBg: '#E3F2FD' },
                { n: '02', t: 'Build', d: 'Real websites, apps & pitch decks with AI', icon: Brain, color: 'card-duo-green', iconColor: '#58a700', iconBg: '#dbf8c5' },
                { n: '03', t: 'Launch', d: 'Mentor feedback & real-world showcases', icon: Rocket, color: 'card-duo-orange', iconColor: '#cc7a00', iconBg: '#ffe8cc' },
                { n: '04', t: 'Win', d: 'Portfolio & scholarship-ready profile', icon: Trophy, color: 'card-duo-pink', iconColor: '#a855f7', iconBg: '#f3e0ff' },
              ].map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className={`card-duo ${s.color}`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: s.iconBg }}>
                    <s.icon className="w-6 h-6" style={{ color: s.iconColor }} />
                  </div>
                  <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase mb-2" style={{ color: s.iconColor }}>{s.n}</p>
                  <p className="text-[18px] font-extrabold text-[#3c3c3c] mb-1.5">{s.t}</p>
                  <p className="text-[13px] text-[#777] leading-relaxed">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            4 ◆ LIVE QUESTS PREVIEW — Duolingo signature gamified strip
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-10 sm:mb-14"
            >
              <p className="duo-eyebrow mb-4">Live in the platform</p>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                Learning that feels like a <span style={{ color: '#58a700' }}>game</span>.
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#777] max-w-2xl mx-auto leading-relaxed">
                XP points, streak rewards, level-ups and quest completion — kids don't want to log off.
              </p>
            </motion.div>

            {/* Big level ribbon — center stage */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="level-ribbon-light">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#1876D2,#00B0FF)' }}>
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-extrabold text-[#3c3c3c]">LV 7 · Young Entrepreneur</span>
                    <span className="text-[12px] font-bold text-[#777]">1,240 / 2,000 XP</span>
                  </div>
                  <div className="xp-bar-track-light">
                    <div className="xp-bar-fill-light" style={{ width: '62%' }} />
                  </div>
                </div>
                <span className="streak-badge-light flex-shrink-0"><Flame className="w-3 h-3" /> 12d</span>
              </div>
            </motion.div>

            {/* Quest grid 3x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10">
              {[
                { emoji: '🏪', title: 'Launch a Pop-up Shop', desc: 'Price products, manage inventory, sell to 10 customers', tag: 'Business', tagColor: 'chip-duo-blue', xp: '+120', cardColor: 'card-duo-blue', done: true },
                { emoji: '🤖', title: 'Build Your AI Website', desc: 'Use Orbit AI Builder to launch a personal website', tag: 'AI Tools', tagColor: 'chip-duo-pink', xp: '+200', cardColor: 'card-duo-pink', done: false },
                { emoji: '📊', title: 'Pitch to the Board', desc: 'Present your startup idea in a 3-minute live pitch', tag: 'Leadership', tagColor: 'chip-duo-orange', xp: '+350', cardColor: 'card-duo-orange', done: false },
                { emoji: '💰', title: 'Stock Market Simulator', desc: 'Invest $1,000 virtual dollars and beat the market', tag: 'Finance', tagColor: 'chip-duo-green', xp: '+180', cardColor: 'card-duo-green', done: false },
                { emoji: '🌍', title: 'Find Your Scholarship', desc: 'Match with 3 scholarships from our global database', tag: 'Resources', tagColor: 'chip-duo-yellow', xp: '+90', cardColor: 'card-duo-yellow', done: true },
                { emoji: '🎤', title: 'Public Speaking Quest', desc: 'Record and submit a 2-minute persuasive speech', tag: 'Confidence', tagColor: 'chip-duo-pink', xp: '+280', cardColor: 'card-duo-pink', done: false },
              ].map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.32 }}
                  className={`quest-tile-light ${q.cardColor}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{q.emoji}</span>
                    <span className={`chip-duo ${q.tagColor}`} style={{ padding: '3px 9px', fontSize: 11 }}>{q.tag}</span>
                  </div>
                  <p className="text-[15px] font-extrabold text-[#3c3c3c] mb-1.5 leading-tight">{q.title}</p>
                  <p className="text-[12.5px] text-[#777] leading-relaxed mb-4">{q.desc}</p>
                  <div className="flex items-center justify-between">
                    {q.done ? (
                      <span className="flex items-center gap-1 text-[12px] font-extrabold text-[#58a700]">
                        <CheckCircle className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="chip-duo chip-duo-green" style={{ padding: '3px 10px', fontSize: 11 }}>{q.xp} XP</span>
                    )}
                    <ArrowRight className="w-4 h-4 text-[#afafaf]" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary">
                <Zap className="w-4 h-4" /> Start earning XP today
              </button>
              <p className="mt-3 text-[12px] text-[#afafaf]">Free trial · No credit card · 180-day program</p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            5 ◆ FOUNDER MINDSET — kept as-is (high converter)
        ════════════════════════════════════════════════════════════════ */}
        <FounderMindsetSection />

        {/* ════════════════════════════════════════════════════════════════
            6 ◆ WHAT YOU GET — colorful bento grid (Duolingo riot of color)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-duo-eel">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="duo-eyebrow mb-4">What your child gets</p>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                Not just learning. <span style={{ color: '#1876D2' }}>Living it.</span>
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#777] max-w-2xl mx-auto leading-relaxed">
                Other platforms give PDFs. We give business games, AI tools, live projects and mentorship schools don't offer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                { icon: Gamepad2, title: '10 Business Games', sub: '500+ XP per level', desc: 'Pricing battles, stock markets, lemonade stands — real entrepreneurship in story-driven games.', card: 'card-duo-blue', chip: 'chip-duo-blue', iconBg: '#E3F2FD', iconColor: '#1876D2', link: '/demo' },
                { icon: Crown, title: 'Startup Empire', sub: '6 stages · 24 missions', desc: 'A full roleplay from idea to IPO. Real decisions, real consequences, real transformation.', card: 'card-duo-pink', chip: 'chip-duo-pink', iconBg: '#f3e0ff', iconColor: '#a855f7', link: '/demo' },
                { icon: Brain, title: 'AI Superpowers', sub: '100+ tools · Unlimited use', desc: 'Website Builder, Pitch Writer, Image Generator — kids command AI like a CEO from day one.', card: 'card-duo-cyan', chip: 'chip-duo-blue', iconBg: '#b3e5fc', iconColor: '#0e95d4', link: '/demo' },
                { icon: Target, title: '180-Day Curriculum', sub: '180 days · 52 live classes', desc: 'Structured, mentor-guided path from beginner to confident young entrepreneur.', card: 'card-duo-green', chip: 'chip-duo-green', iconBg: '#dbf8c5', iconColor: '#58a700', link: '/courses' },
                { icon: GraduationCap, title: 'Scholarship Database', sub: '500+ opportunities', desc: 'Scholarships, competitions and fellowships mapped by age, country and interest area.', card: 'card-duo-orange', chip: 'chip-duo-orange', iconBg: '#ffe8cc', iconColor: '#cc7a00', link: '/resources' },
                { icon: Award, title: 'Real Portfolio', sub: '10+ verified pieces', desc: 'Websites, games, pitch decks, certificates — actual proof for colleges and competitions.', card: 'card-duo-yellow', chip: 'chip-duo-yellow', iconBg: '#fff5cc', iconColor: '#b88500', link: '/about' },
              ].map((u, i) => (
                <motion.a
                  key={i}
                  href={u.link}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`card-duo ${u.card} group flex flex-col`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: u.iconBg }}>
                    <u.icon className="w-6 h-6" style={{ color: u.iconColor }} />
                  </div>
                  <p className="text-[17px] font-extrabold text-[#3c3c3c] mb-1.5">{u.title}</p>
                  <span className={`chip-duo ${u.chip} self-start mb-3`} style={{ fontSize: 10, padding: '3px 9px' }}>{u.sub}</span>
                  <p className="text-[13.5px] text-[#777] leading-relaxed flex-grow mb-4">{u.desc}</p>
                  <div className="flex items-center gap-1.5 text-[13px] font-extrabold" style={{ color: u.iconColor }}>
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            7 ◆ TESTIMONIALS — chunky bordered story cards
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="duo-eyebrow mb-4">Real parent stories</p>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                "My child is a <span style={{ color: '#a855f7' }}>different person</span>"
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#777] max-w-2xl mx-auto leading-relaxed">
                See the transformations that make parents proud.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Sarah Chen', role: 'Mother of Emma (12)', initials: 'SC', avatar: '#1876D2', card: 'card-duo-blue', chip: 'chip-duo-blue',
                  quote: 'Emma went from being too shy to order food to confidently pitching business ideas to our neighbors!',
                  result: 'Started a pet-sitting business · $500/mo'
                },
                {
                  name: 'Michael Rodriguez', role: 'Father of Diego (14)', initials: 'MR', avatar: '#10b981', card: 'card-duo-green', chip: 'chip-duo-green',
                  quote: 'Diego now thinks like an entrepreneur. He sees opportunities everywhere and has developed incredible leadership skills.',
                  result: 'Led school fundraising · $2,000 raised'
                },
                {
                  name: 'Jennifer Park', role: 'Mother of Alex (13)', initials: 'JP', avatar: '#a855f7', card: 'card-duo-pink', chip: 'chip-duo-pink',
                  quote: 'Best investment we ever made. Alex is now mentoring other kids and speaking at school events with confidence!',
                  result: 'Student Council President · launched school app'
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`card-duo ${t.card} flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 text-[#ffc800] fill-[#ffc800]" />
                      ))}
                    </div>
                    <span className="chip-duo chip-duo-green" style={{ fontSize: 10, padding: '3px 9px' }}>✓ Verified</span>
                  </div>

                  <p className="text-[15px] text-[#3c3c3c] leading-relaxed flex-grow mb-5 font-medium">"{t.quote}"</p>

                  <div className={`bg-[#fefcf6] border-2 border-[#e5e5e5] rounded-xl px-3.5 py-2.5 mb-5`}>
                    <p className="text-[12px] font-extrabold text-[#3c3c3c]"><Trophy className="w-3.5 h-3.5 inline mr-1.5 text-[#ffc800]" />{t.result}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[12px] flex-shrink-0"
                      style={{ background: t.avatar }}>{t.initials}</div>
                    <div>
                      <p className="text-[13.5px] font-extrabold text-[#3c3c3c] leading-tight">{t.name}</p>
                      <p className="text-[11.5px] text-[#777]">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            8 ◆ COMPARISON — Orbit vs Other EdTech (single, cohesive)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-duo-yellow-tint">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12 sm:mb-14"
            >
              <p className="duo-eyebrow mb-4" style={{ color: '#cc7a00' }}>Other EdTech vs. Orbit</p>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                Why 2,500+ parents <span style={{ color: '#cc7a00' }}>made the switch</span>.
              </h2>
              <p className="text-[16px] text-[#777] max-w-xl mx-auto leading-relaxed">
                Most platforms ship videos and call it learning. We ship transformation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-10">
              {[
                { other: 'Watch pre-recorded videos', orbit: 'Build real projects & play business games' },
                { other: 'Get a certificate PDF', orbit: 'Build a portfolio of websites, games & pitches' },
                { other: 'Learn theory from slides', orbit: 'Run lemonade stands, trade stocks, pitch live' },
                { other: 'Generic content for all ages', orbit: 'Personalized AI-powered path for ages 8–18' },
                { other: 'No scholarship guidance', orbit: '500+ scholarships & competition database' },
                { other: 'Learning stops at logout', orbit: 'Kids beg to come back every day' },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.32 }}
                  className="card-duo flex flex-col gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#ffe1e1] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-[#ff4b4b]" />
                    </div>
                    <p className="text-[#afafaf] text-[13.5px] line-through leading-snug pt-0.5">{row.other}</p>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2 border-t-2 border-[#e5e5e5]">
                    <div className="w-6 h-6 rounded-full bg-[#dbf8c5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#58a700]" />
                    </div>
                    <p className="text-[#3c3c3c] text-[14px] font-bold leading-snug pt-0.5">{row.orbit}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-streak">
                Try free — see the difference <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            9 ◆ COST OF WAITING — emotional urgency, three age columns
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-12 sm:mb-14"
            >
              <span className="chip-duo chip-duo-orange mb-5"><Clock className="w-3.5 h-3.5" /> The clock is ticking</span>
              <h2 className="duo-display text-[clamp(2rem,4.5vw,3.4rem)] mb-4">
                Every year you wait, your child <span style={{ color: '#ff4b4b' }}>falls behind</span>.
              </h2>
              <p className="text-[16px] text-[#777] max-w-2xl mx-auto leading-relaxed">
                Here's what happens when students start their entrepreneurial journey at different ages.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  age: 'Starts at 8', emoji: '🏆', tag: 'Orbit Early Bird', tagChip: 'chip-duo-green', card: 'card-duo-green', highlight: true,
                  results: ['6 years of portfolio building','10+ competition wins by 14','Full-ride scholarship ready at 16','Published author & speaker','AI-literate since elementary'],
                },
                {
                  age: 'Starts at 14', emoji: '⏰', tag: 'Average Student', tagChip: 'chip-duo-yellow', card: 'card-duo', highlight: false,
                  results: ['2 years of rushed prep','1–2 activities to show','Generic application essays','Playing catch-up with peers','Basic digital skills only'],
                },
                {
                  age: 'Starts at 17', emoji: '😰', tag: 'Too Late', tagChip: 'chip-duo-red', card: 'card-duo', highlight: false,
                  results: ['Too late for most programs','Empty extracurricular section','Panic-mode applications','Missed scholarship windows','Years of regret'],
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`card-duo ${c.card} relative ${c.highlight ? 'ring-2 ring-[#58cc02]/30' : ''}`}
                  style={{ paddingTop: c.highlight ? 28 : 20 }}
                >
                  {c.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip-duo chip-duo-green" style={{ background: '#58cc02', color: '#fff', fontSize: 10, padding: '4px 12px' }}>
                      ★ RECOMMENDED
                    </div>
                  )}
                  <div className="text-center mb-5">
                    <span className="text-4xl block mb-3">{c.emoji}</span>
                    <span className={`chip-duo ${c.tagChip}`} style={{ fontSize: 11, padding: '3px 11px' }}>{c.tag}</span>
                    <h3 className="text-[18px] font-extrabold text-[#3c3c3c] mt-3">{c.age}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {c.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px]">
                        {c.highlight ? (
                          <CheckCircle className="h-4 w-4 text-[#58a700] flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-[#afafaf] flex-shrink-0 mt-0.5" />
                        )}
                        <span className={c.highlight ? 'text-[#3c3c3c] font-semibold' : 'text-[#777]'}>{r}</span>
                      </li>
                    ))}
                  </ul>
                  {c.highlight && (
                    <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-success w-full mt-5" style={{ padding: '12px 20px', fontSize: 13 }}>
                      Start now — it's free
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            10 ◆ FINAL CTA — strategic dark contrast for maximum action
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-28 relative overflow-hidden" style={{ background: '#1f1d1a' }}>
          {/* Subtle soft glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(24,118,210,0.18) 0%, transparent 65%)' }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="chip-duo mb-7 inline-flex" style={{ background: 'rgba(255,200,0,0.15)', color: '#ffc800', border: '2px solid rgba(255,200,0,0.3)' }}>
                <Zap className="w-3.5 h-3.5" /> Limited — only 30 spots left this batch
              </span>

              <h2 className="duo-display text-[clamp(2rem,5vw,4rem)] text-white mb-6">
                Don't let your child fall behind<br />
                <span style={{ color: '#00B0FF' }}>while others get ahead.</span>
              </h2>

              <p className="text-[15px] sm:text-[17px] text-[#afafaf] mb-10 max-w-2xl mx-auto leading-relaxed">
                While other kids watch YouTube, your child could be building businesses, winning scholarships and mastering AI with Orbit Student.
              </p>

              {/* Urgency strip */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-10">
                {[{ v: '30', l: 'Spots Left' }, { v: '7', l: 'Days Left' }, { v: '$200', l: 'You Save' }].map((u, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="rounded-2xl p-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.08)', borderBottomWidth: 4 }}
                  >
                    <div className="text-[26px] font-black text-[#ffc800] leading-none">{u.v}</div>
                    <div className="text-[10px] text-[#afafaf] uppercase tracking-[0.1em] font-bold mt-1.5">{u.l}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary" style={{ padding: '16px 32px', fontSize: 16 }}>
                  Secure your spot now <ArrowRight className="h-5 w-5" />
                </button>
                <button onClick={() => setShowCareerGuide(true)} className="btn-duo" style={{
                  background: 'rgba(255,255,255,0.06)', color: '#fff', border: '2px solid rgba(255,255,255,0.12)',
                  borderBottom: '4px solid rgba(255,255,255,0.12)'
                }}>
                  Download free guide
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-[#777] mb-7">
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#58cc02]" /> 30-day refund</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#00B0FF]" /> 2,500+ families</span>
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-[#ffc800] fill-[#ffc800]" /> 4.9/5 rating</span>
                <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[#a855f7]" /> 35+ countries</span>
              </div>

              {/* Guarantee badge */}
              <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-3"
                style={{ background: 'rgba(88,204,2,0.08)', border: '2px solid rgba(88,204,2,0.2)' }}>
                <Shield className="h-7 w-7 text-[#58cc02]" />
                <div className="text-left">
                  <div className="text-[#58cc02] text-[13px] font-extrabold">100% risk-free guarantee</div>
                  <div className="text-[#afafaf] text-[11px] mt-0.5">Not satisfied? Full refund within 30 days. No questions asked.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            11 ◆ LEAD CAPTURE — kept (high converter), light background
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
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

        {/* ════════════════════════════════════════════════════════════════
            12 ◆ NEWSLETTER (free guide) — soft cream finisher
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-14 bg-duo-cream border-t-2 border-[#e5e5e5]">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8">
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
