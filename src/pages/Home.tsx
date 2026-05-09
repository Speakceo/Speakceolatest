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

      <div className="min-h-screen text-ed-fg bg-ed-canvas"
        style={{ fontFamily: "'Inter','Inter Variable','Poppins',-apple-system,BlinkMacSystemFont,sans-serif" }}>

        {/* ════════════════════════════════════════════════════════════════
            1 ◆ HERO — Editorial asymmetric layout with REAL hero photo
                       (taste-editorial skill: serif left + photo right)
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-ed-canvas pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-28">
          {/* Magazine masthead */}
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-10 sm:mb-14">
            <div className="ed-divider">
              <span className="ed-divider-label">Issue 03 · Volume 2026 · Orbit Student</span>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-end">

              {/* ── Left 7/12: editorial copy ── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                {/* Eyebrow — mono uppercase */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1876D2] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1876D2]" />
                  </span>
                  <span className="eyebrow-ed">Live Cohort · Ages 8–18 · AI-powered</span>
                </div>

                {/* Mixed serif + sans display headline — taste-editorial signature */}
                <h1 className="hero-ed-h1 mb-7"
                  style={{ fontSize: 'clamp(2.6rem,7.5vw,5.8rem)', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
                  <span className="font-display-serif" style={{ color: '#1c1b1a', fontWeight: 400 }}>Where young minds </span>
                  <span className="font-display-serif-italic" style={{ color: '#1876D2' }}>become leaders.</span>
                </h1>

                {/* Lede paragraph — max 52ch, muted ink */}
                <p className="hero-ed-lede text-[16px] sm:text-[18px] leading-[1.6] text-ed-muted mb-9 sm:mb-10">
                  A 180-day program in entrepreneurship, AI literacy and real-world leadership — taught through
                  live mentorship, business simulations and the kind of projects schools simply don't offer.
                </p>

                {/* CTAs */}
                <div className="flex flex-col xs:flex-row sm:flex-row gap-3 mb-10 sm:mb-12">
                  <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary">
                    Start free trial <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => setShowCareerGuide(true)} className="btn-duo btn-duo-secondary">
                    <PlayCircle className="h-4 w-4 text-[#1876D2]" />
                    Watch the demo
                  </button>
                </div>

                {/* Real student avatars + rating */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <img
                        key={n}
                        src={`/images/avatars/student-${n}.jpg`}
                        alt={`Orbit Student ${n}`}
                        loading="lazy"
                        className="w-10 h-10 rounded-full object-cover ring-[3px] ring-[#FBFBFA] border border-[#e6e4e0]"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-ed-fg text-[14px] font-semibold leading-tight">2,500+ enrolled families</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#1876D2] fill-[#1876D2]" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-ed-muted text-[12.5px] font-medium ml-1.5">4.9 · 612 reviews</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── Right 5/12: REAL hero photo + floating proofs ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                {/* Photo frame — editorial hairline, no shadow */}
                <div className="frame-ed relative">
                  <img
                    src="/images/hero/orbit-kids-laptop.jpg"
                    alt="A young Orbit Student building a project on a laptop"
                    className="w-full h-auto block"
                    width={720}
                    height={780}
                    fetchPriority="high"
                    decoding="async"
                  />

                  {/* Live activity chip — floating top-right inside frame */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-[#e6e4e0] flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58cc02] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#58cc02]" />
                    </span>
                    <span className="text-[10.5px] font-mono-meta font-medium text-ed-fg">live · 1,243 building</span>
                  </motion.div>
                </div>

                {/* Italic caption under photo (editorial signature) */}
                <p className="caption-ed mt-3 max-w-[420px]">
                  Aarav, 13 — building his second e-commerce site in Module 4.
                </p>

                {/* Floating XP card — overlapping bottom-left */}
                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:block absolute -bottom-6 -left-4 lg:-left-10 max-w-[280px]"
                >
                  <div className="card-duo card-duo-blue p-3.5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#1876D2,#00B0FF)' }}>
                        <Rocket className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-extrabold text-ed-fg leading-none">Today's quests</p>
                        <p className="text-[10.5px] text-ed-muted mt-0.5">5 missions · 430 XP</p>
                      </div>
                      <span className="streak-badge-light flex-shrink-0" style={{ padding: '2px 8px', fontSize: 10 }}>
                        <Flame className="w-2.5 h-2.5" /> 12d
                      </span>
                    </div>

                    {/* Level mini-ribbon */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-ed-fg">LV 7 · Young CEO</span>
                      <span className="text-[10px] font-bold text-ed-muted">62%</span>
                    </div>
                    <div className="xp-bar-track-light" style={{ height: 8 }}>
                      <div className="xp-bar-fill-light" style={{ width: '62%' }} />
                    </div>
                  </div>
                </motion.div>

                {/* Floating success badge — top-left overlap */}
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="hidden md:flex absolute -top-5 -left-5 lg:-left-8 items-center gap-2 px-3 py-2 bg-white border border-[#e6e4e0] rounded-xl shadow-sm"
                >
                  <Trophy className="w-4 h-4 text-[#1876D2]" />
                  <div>
                    <p className="text-[11px] font-extrabold text-ed-fg leading-none">98%</p>
                    <p className="text-[9.5px] text-ed-muted mt-0.5">success rate</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            2 ◆ EDITORIAL STATS — huge serif numbers (magazine moment)
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-ed-canvas-2 border-y border-[#e6e4e0]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="ed-divider mb-10 sm:mb-14">
              <span className="ed-divider-label">By the numbers · 2026</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {[
                { num: '2,500', sub: '+', label: 'enrolled families across 35 countries' },
                { num: '180', sub: ' days', label: 'guided curriculum, weekly mentor checkpoints' },
                { num: '98', sub: '%', label: 'finish their first business by Module 4' },
                { num: '4.9', sub: '/5', label: 'parent rating, sustained over 612 reviews' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <p className="bignum-ed">
                    {s.num}<span className="text-[40%] text-ed-muted">{s.sub}</span>
                  </p>
                  <p className="caption-ed mt-3 max-w-[28ch] text-ed-muted" style={{ fontSize: 13 }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Press strip */}
            <div className="mt-14 sm:mt-20 pt-8 border-t border-[#e6e4e0]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
                <p className="eyebrow-ed">Featured in</p>
                <div className="flex flex-wrap items-center gap-x-7 sm:gap-x-10 gap-y-3">
                  {[
                    { name: 'Forbes', cls: 'text-[18px] font-black' },
                    { name: 'TechCrunch', cls: 'text-[14px] font-extrabold tracking-tight' },
                    { name: 'EdTech Review', cls: 'text-[13px] font-bold' },
                    { name: 'Times of India', cls: 'text-[13px] font-bold' },
                    { name: 'YourStory', cls: 'text-[14px] font-extrabold' },
                  ].map((pub, i) => (
                    <span key={i} className={`${pub.cls} text-ed-quiet hover:text-ed-fg transition-colors duration-200 cursor-default`}>
                      {pub.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            3 ◆ HOW IT WORKS — left-aligned editorial header + 4 chunky cards
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16"
            >
              <div className="lg:col-span-5">
                <p className="eyebrow-ed mb-4">§ 01 · How it works</p>
                <h2 className="font-display-serif text-[clamp(2rem,4.2vw,3.2rem)]" style={{ lineHeight: 1.05 }}>
                  Four steps from kid to <span className="font-display-serif-italic" style={{ color: '#1876D2' }}>young CEO</span>.
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-[16px] sm:text-[17px] text-ed-muted leading-[1.65] max-w-[52ch]">
                  No videos to passively watch. Your child plays, builds, launches and wins — guided by mentors,
                  paced over 180 days, with weekly checkpoints that parents can actually see.
                </p>
              </div>
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
            3.5 ◆ FEATURED COURSES — editorial photo grid with real imagery
                  (taste-editorial: asymmetric magazine spread)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-ed-canvas">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 sm:mb-16"
            >
              <div className="lg:col-span-6">
                <p className="eyebrow-ed mb-4">§ 02 · Featured curriculum</p>
                <h2 className="font-display-serif text-[clamp(2rem,4.4vw,3.4rem)]" style={{ lineHeight: 1.05 }}>
                  Four pillars of <span className="font-display-serif-italic" style={{ color: '#1876D2' }}>founder fluency</span>.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="text-[15.5px] sm:text-[16.5px] text-ed-muted leading-[1.65]">
                  Each pillar is a 30–45 day arc with mentor checkpoints, build-along projects and a
                  capstone showcase. Together they form the 180-day journey.
                </p>
              </div>
            </motion.div>

            {/* Asymmetric 12-col grid — feature card is wider */}
            <div className="grid-asymmetric">
              {[
                { img: '/images/courses/startup-fundamentals.jpg', tag: 'Foundations', dur: 'Days 1–45', title: 'Startup Fundamentals', sub: 'How real businesses get born', span: 'span-7', highlight: true },
                { img: '/images/courses/business-planning.jpg', tag: 'Strategy', dur: 'Days 46–90', title: 'Business Planning', sub: 'From notebook idea to board pitch', span: 'span-5', highlight: false },
                { img: '/images/courses/marketing-sales.jpg', tag: 'Growth', dur: 'Days 91–135', title: 'Marketing & Sales', sub: 'Find, win and keep your first 100 customers', span: 'span-5', highlight: false },
                { img: '/images/courses/financial-management.jpg', tag: 'Money', dur: 'Days 136–180', title: 'Financial Management', sub: 'Cash, runway and the math of growing up', span: 'span-7', highlight: false },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  href="/courses"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`${c.span} group block`}
                >
                  <div className="frame-ed mb-4 aspect-[16/10] relative">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    {c.highlight && (
                      <span className="absolute top-3 left-3 chip-duo chip-duo-yellow font-mono-meta" style={{ fontSize: 10, padding: '3px 9px' }}>
                        ★ Most popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <p className="eyebrow-ed">{c.tag}</p>
                    <p className="meta-line">{c.dur}</p>
                  </div>
                  <h3 className="font-display-serif text-[24px] sm:text-[28px] text-ed-fg leading-tight mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-ed-muted leading-[1.55]">
                    {c.sub}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-[13px] font-semibold text-[#1876D2] group-hover:gap-2.5 transition-all">
                    Read syllabus <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.a>
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
            7 ◆ TESTIMONIALS — editorial pull-quote + real student avatars
                  (taste-editorial: hero quote + supporting cards)
        ════════════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 bg-ed-canvas">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            {/* Section header — left-aligned editorial */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 sm:mb-20"
            >
              <div className="lg:col-span-6">
                <p className="eyebrow-ed mb-4">§ 04 · Voices</p>
                <h2 className="font-display-serif text-[clamp(2rem,4.4vw,3.4rem)]" style={{ lineHeight: 1.05 }}>
                  Children change. <span className="font-display-serif-italic" style={{ color: '#1876D2' }}>So do their parents.</span>
                </h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="text-[15.5px] sm:text-[16.5px] text-ed-muted leading-[1.65]">
                  We collected six months of progress — pitched ideas, launched stores, first profits.
                  Below: the quiet revolution parents notice at the dinner table.
                </p>
              </div>
            </motion.div>

            {/* Hero pull-quote — magazine moment */}
            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16 sm:mb-20 items-center"
            >
              <div className="lg:col-span-4 lg:col-start-1">
                <div className="frame-ed aspect-[4/5] max-w-[360px] mx-auto lg:mx-0">
                  <img
                    src="/images/avatars/student-1.jpg"
                    alt="Emma, Orbit Student"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="caption-ed mt-3 max-w-[300px]">
                  Emma, 12 — six months in.
                </figcaption>
              </div>

              <blockquote className="lg:col-span-7 lg:col-start-6">
                <span className="eyebrow-ed mb-5 block">Pull quote · Sarah C., parent</span>
                <p className="pull-quote">
                  "She used to be too shy to order food. Last weekend she pitched her pet-sitting
                  business to four neighbours. <span className="font-display-serif-italic">She's not the same child.</span>"
                </p>
                <div className="flex items-center gap-3 mt-7 pt-7 border-t border-[#e6e4e0]">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 text-[#1876D2] fill-[#1876D2]" />
                    ))}
                  </div>
                  <span className="meta-line">Verified parent · Module 4 graduate · $500/mo business</span>
                </div>
              </blockquote>
            </motion.figure>

            {/* Three supporting story cards — hairline editorial cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Michael Rodriguez', child: 'Diego, 14', img: '/images/avatars/student-2.jpg',
                  quote: 'Diego now thinks like an entrepreneur. He sees opportunities everywhere — even in the school cafeteria queue.',
                  result: 'Led school fundraising · $2,000 raised',
                },
                {
                  name: 'Jennifer Park', child: 'Alex, 13', img: '/images/avatars/student-3.jpg',
                  quote: 'Best investment we ever made. Alex is now mentoring younger kids and speaking at school events without notes.',
                  result: 'Student Council President · launched school app',
                },
                {
                  name: 'Priya Sharma', child: 'Aanya, 11', img: '/images/avatars/student-4.jpg',
                  quote: 'I expected a course. We got a community. Her mentor texts her on Sundays to check on the project.',
                  result: 'Built her own bakery brand · 40 customers',
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="card-ed flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={t.img}
                      alt={t.child}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border border-[#e6e4e0]"
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-ed-fg leading-tight">{t.name}</p>
                      <p className="meta-line mt-0.5">Parent of {t.child}</p>
                    </div>
                  </div>

                  <p className="font-display-serif text-[20px] leading-[1.32] text-ed-fg flex-grow mb-5">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-[#e6e4e0]">
                    <Trophy className="w-3.5 h-3.5 text-[#1876D2] flex-shrink-0" />
                    <p className="meta-line text-ed-muted">{t.result}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            7.5 ◆ SUCCESS STORY BANNER — editorial photo + serif headline
                    Real photography, magazine-grade composition
        ════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-t border-b border-[#e6e4e0]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: real success-story image, full bleed */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative min-h-[360px] lg:min-h-[560px] overflow-hidden"
            >
              <img
                src="/images/hero/success-story.jpg"
                alt="Orbit Student success story"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Tiny mono caption overlay */}
              <span className="absolute bottom-4 left-4 font-mono-meta text-[10.5px] uppercase tracking-[0.14em] text-white/90 bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded">
                Cohort 07 · Mumbai · April 2026
              </span>
            </motion.div>

            {/* Right: editorial story */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 px-5 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 flex flex-col justify-center"
            >
              <p className="eyebrow-ed mb-5">§ 05 · Field report</p>

              <h2 className="font-display-serif text-[clamp(2rem,3.8vw,3rem)] mb-6" style={{ lineHeight: 1.08 }}>
                In 90 days, Aarav went from <span className="font-display-serif-italic">curious</span> to <span style={{ color: '#1876D2' }}>shipping</span>.
              </h2>

              <p className="text-[15.5px] sm:text-[16px] text-ed-muted leading-[1.7] mb-6 max-w-[52ch]">
                Day 1: a notebook idea about reselling stationery. Day 90: a working e-commerce site,
                three paying customers, ₹4,200 in revenue, and a pitch deck that made his Module 4
                mentor reach for the camera. We didn't teach him this — we just got out of his way.
              </p>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-5 sm:gap-8 py-6 border-t border-b border-[#e6e4e0] mb-7">
                {[
                  { n: '90', s: 'days' },
                  { n: '3', s: 'paying customers' },
                  { n: '₹4.2k', s: 'first revenue' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="font-display-serif text-[28px] sm:text-[36px] text-ed-fg leading-none">{s.n}</p>
                    <p className="meta-line mt-2">{s.s}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button onClick={() => setShowEnrollment(true)} className="btn-duo btn-duo-primary">
                  Read the full story <ArrowRight className="h-4 w-4" />
                </button>
                <a href="/blog" className="text-[14px] font-semibold text-ed-fg hover:text-[#1876D2] transition-colors">
                  More success stories →
                </a>
              </div>
            </motion.div>
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
