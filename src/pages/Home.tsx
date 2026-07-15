import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Brain, Rocket, CheckCircle, Target, PlayCircle, Shield,
  Trophy, Zap, Clock, GraduationCap, Gamepad2, Sparkles,
  Mic, Users, Globe2, CalendarDays,
} from 'lucide-react';
import { motion } from 'framer-motion';
import EnrollmentPopup from '../components/EnrollmentPopup';
import CareerGuidePopup from '../components/career/CareerGuidePopup';
import SEO from '../components/SEO';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import FounderMindsetSection from '../components/home/FounderMindsetSection';
import {
  getActiveCohortLabel,
  getSpotsRemainingCopy,
  getUpcomingCohortBatches,
  batchStatusLabel,
} from '../utils/cohortDates';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showCareerGuide, setShowCareerGuide] = useState(false);
  const cohortLabel = useMemo(() => getActiveCohortLabel(), []);
  const upcomingBatches = useMemo(() => getUpcomingCohortBatches(), []);
  const spotsCopy = useMemo(() => getSpotsRemainingCopy(30), []);

  return (
    <>
      <SEO
        title="Orbit Student | Live AI & Entrepreneurship Classes for Kids 8–18"
        description="Live 1:1 & cohort classes in AI, entrepreneurship, coding and leadership for ages 8–18. Mentor-led, portfolio outcomes. Free trial — join 2,500+ families."
        showFAQ
        courseData={{
          name: 'Orbit Young CEO Programme — 180-Day Instructor-Led Cohort',
          provider: 'Orbit Student',
          description:
            'Mentor-led cohort programme in AI literacy, entrepreneurship, leadership and real-world projects. Live sessions, gamified dashboard, portfolio outcomes and scholarship roadmap for ages 8–18.',
          duration: 'P180D',
          price: '299',
        }}
        keywords={[
          'AI learning for kids',
          'entrepreneurship for kids',
          'online classes for kids',
          'coding for kids',
          'young CEO program',
          'live classes kids India',
          'Orbit Student',
        ]}
      />

      <div className="min-h-screen bg-o-0 text-o-0">

        {/* ════════════════════════════════════════════════════════════════
            01 · HERO — brand-first, full-bleed visual, no overlays
        ════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden min-h-[100dvh] flex items-end sm:items-center pt-28 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0">
            <img
              src="/images/hero/orbit-kids-laptop.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
              fetchPriority="high"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, rgba(7,8,10,0.94) 0%, rgba(7,8,10,0.82) 42%, rgba(7,8,10,0.45) 68%, rgba(7,8,10,0.55) 100%)',
              }}
            />
            <div className="absolute inset-0 glow-o opacity-80" />
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              className="max-w-2xl"
            >
              <p className="font-display text-[clamp(2.75rem,8vw,5.5rem)] text-o-0 mb-3 sm:mb-4 tracking-tight leading-[0.95]">
                Orbit Student
              </p>
              <h1 className="font-display text-[clamp(1.35rem,3.2vw,2rem)] text-o-1 font-semibold mb-5 sm:mb-6 leading-snug max-w-xl">
                Live AI &amp; entrepreneurship for ages 8–18.
              </h1>
              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-o-2 mb-8 sm:mb-10 max-w-md">
                Mentor-led cohorts. Real projects. Scholarship-ready portfolios — not another video library.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary btn-o-lg">
                  Start free trial
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
                <button onClick={() => setShowCareerGuide(true)} className="btn-o btn-o-ghost btn-o-lg">
                  <PlayCircle className="h-4 w-4 text-[#00B0FF]" />
                  Watch demo
                </button>
              </div>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-o-3">
                {cohortLabel} · 2,500+ families · 35+ countries
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            02 · STATS BAR — confident, restrained, mono labels
        ════════════════════════════════════════════════════════════════ */}
        <section className="border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {[
                { num: '2,500+', label: 'enrolled families' },
                { num: '180', label: 'day curriculum' },
                { num: '98%', label: 'finish module 4' },
                { num: '4.9/5', label: 'parent rating' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease }}
                >
                  <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-o-0 mb-1 tabular-nums">{s.num}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-o-3">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 sm:mt-20 pt-8 border-o-t">
              <p className="eyebrow-o mb-6">What you get on day one</p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {[
                  'Live mentor sessions + replays in your dashboard',
                  'AI studio and 100+ tools for real builds',
                  'Parent visibility into progress and milestones',
                  'Portfolio, certificates and scholarship roadmap',
                ].map((line) => (
                  <span key={line} className="text-[14px] text-o-2 max-w-[34ch] leading-snug">
                    <CheckCircle className="inline h-3.5 w-3.5 text-[#10b981] mr-2 align-[-2px]" aria-hidden />
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            02b · COHORT MODEL — instructor-led + peers (clear IA)
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-12 sm:mb-16"
            >
              <p className="eyebrow-o mb-5">The cohort model</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                Instructor-led. <span style={{ color: '#00B0FF' }}>Peer-powered.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[60ch]">
                Small groups with a dedicated mentor rhythm — questions, accountability and collaboration —
                not solo kids stuck in a video queue.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Mic,
                  title: 'Live interaction',
                  body: 'Real-time classes where students speak, share screens and get feedback — capped cohorts for attention.',
                },
                {
                  icon: Globe2,
                  title: 'Global peers',
                  body: 'Learn alongside curious students across 35+ countries — perspective, empathy and network early.',
                },
                {
                  icon: Users,
                  title: 'Mentor accountability',
                  body: 'Founder-style mentors and office hours keep projects moving — so progress shows up in the portfolio.',
                },
              ].map((b, i) => {
                const IconCohort = b.icon;
                return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="card-o"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-6" style={{ background: 'var(--o-accent-soft)', border: '1px solid var(--o-accent-ring)' }}>
                    <IconCohort className="w-4 h-4 text-[#00B0FF]" />
                  </div>
                  <h3 className="text-[17px] font-medium text-o-0 mb-2" style={{ letterSpacing: '-0.02em' }}>{b.title}</h3>
                  <p className="text-[14px] text-o-2 leading-[1.55]">{b.body}</p>
                </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            02c · PROGRAM DETAILS — pricing clarity + upcoming batches
        ════════════════════════════════════════════════════════════════ */}
        <section id="program-details" className="section-o border-o-t scroll-mt-28">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-12 sm:mb-16"
            >
              <p className="eyebrow-o mb-5">Program details</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                One flagship journey. <span style={{ color: '#00B0FF' }}>Everything in one place.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[60ch]">
                Transparent structure: what live time looks like, what ships in the portfolio, and how cohorts start —
                so parents can decide fast.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-5 card-o">
                <h3 className="text-[18px] font-medium text-o-0 mb-5" style={{ letterSpacing: '-0.02em' }}>Why families choose the full path</h3>
                <ul className="space-y-3.5">
                  {[
                    '52 live mentor-led sessions across 180 days',
                    'Two cohort classes weekly + Sunday office hours',
                    '10+ portfolio-grade projects (sites, games, pitches)',
                    '100+ AI tools and business simulations in-dashboard',
                    'Scholarship & competition database with age-fit filtering',
                    'Gamified streaks, levels and parent progress reports',
                    '30-day satisfaction guarantee',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-o-1 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-[#00B0FF] flex-shrink-0 mt-0.5" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className="card-o h-full relative overflow-hidden p-6 sm:p-8 pt-10 sm:pt-11" style={{ background: 'linear-gradient(165deg, var(--o-bg-3) 0%, var(--o-bg-2) 100%)' }}>
                  <div className="absolute top-0 right-0 px-3 py-1.5 rounded-bl-xl font-mono text-[10px] uppercase tracking-[0.14em]" style={{ background: 'var(--o-accent-soft)', color: '#00B0FF', borderLeft: '1px solid var(--o-accent-ring)', borderBottom: '1px solid var(--o-accent-ring)' }}>
                    Best value
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-o-3 mb-3">Full Young CEO journey</p>
                  <p className="font-display text-[clamp(2rem,3.5vw,2.75rem)] text-o-0 mb-1" style={{ letterSpacing: '-0.03em' }}>
                    $299 <span className="text-[18px] font-normal text-o-2">USD</span>
                  </p>
                  <p className="text-[13px] text-o-3 mb-8">One-time programme access · Instalments and local pricing available at checkout</p>
                  <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary w-full sm:w-auto mb-4">
                    Secure your spot
                    <span className="btn-o-icon">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <p className="text-[12.5px] text-o-3 flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-[#00B0FF] flex-shrink-0 mt-0.5" />
                    Start with a free trial — upgrade only when you&apos;re sure. No surprise charges to explore the dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 card-o" style={{ padding: 0 }}>
              <div className="px-6 py-5 sm:px-8 sm:py-6 border-o-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#00B0FF]" />
                  <h3 className="text-[16px] font-medium text-o-0" style={{ letterSpacing: '-0.02em' }}>Upcoming cohort starts</h3>
                </div>
                <p className="text-[13px] text-o-3 font-mono uppercase tracking-[0.08em]">Times shown in your timezone after signup</p>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--o-border-0)' }}>
                {upcomingBatches.map((row) => (
                  <div key={`${row.dateLabel}-${row.track}`} className="px-6 py-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-[14.5px] font-medium text-o-0">{row.dateLabel}</p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-o-3 mt-0.5">{row.track}</p>
                    </div>
                    <span
                      className={`chip-o self-start sm:self-center ${
                        row.status === 'FULL'
                          ? 'opacity-70'
                          : row.status === 'FILLING'
                            ? 'chip-o-accent'
                            : ''
                      }`}
                      style={
                        row.status === 'OPEN'
                          ? { borderColor: 'rgba(16,185,129,0.35)', color: '#34d399' }
                          : row.status === 'FULL'
                            ? { textDecoration: 'line-through', opacity: 0.65 }
                            : undefined
                      }
                    >
                      {batchStatusLabel(row.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            03 · HOW IT WORKS — 4 hairline cards
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-14 sm:mb-20"
            >
              <p className="eyebrow-o mb-5">01 · How it works</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                Four steps from kid to <span style={{ color: '#00B0FF' }}>young CEO.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[58ch]">
                No videos to passively watch. Your child plays, builds, launches and wins —
                guided by mentors, paced over 180 days.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: '01', t: 'Play', d: 'Gamified missions, business simulations and quest tiles that earn real XP.', icon: Gamepad2 },
                { n: '02', t: 'Build', d: 'Real websites, apps and pitch decks created with the AI builder.', icon: Brain },
                { n: '03', t: 'Launch', d: 'Mentor feedback, live showcases and a 1:1 review every fortnight.', icon: Rocket },
                { n: '04', t: 'Win', d: 'Portfolio shipped, scholarships matched, character compounded.', icon: Trophy },
              ].map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="card-o"
                >
                  <div className="flex items-center justify-between mb-7">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-o-3">{s.n}</span>
                    <s.icon className="w-4 h-4 text-[#00B0FF]" />
                  </div>
                  <p className="text-[18px] font-medium text-o-0 mb-2" style={{ letterSpacing: '-0.01em' }}>{s.t}</p>
                  <p className="text-[14px] text-o-2 leading-[1.55]">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            04 · LIVE CLASSES — second hero image (the only other one)
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="lg:col-span-5"
              >
                <p className="eyebrow-o mb-5">02 · Live classes</p>
                <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                  Real mentors, <span style={{ color: '#00B0FF' }}>not recordings.</span>
                </h2>
                <p className="text-[16px] text-o-2 leading-[1.65] mb-8 max-w-[52ch]">
                  Two live sessions a week with founders, designers and operators who've done it.
                  Cohorts capped at 18 students for genuine attention.
                </p>

                <ul className="space-y-3.5 mb-9">
                  {[
                    'Two 60-minute live sessions per week',
                    'Cohort cap: 18 students for real engagement',
                    'Recorded for replay in your dashboard',
                    'Office hours every Sunday with a founder mentor',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] text-o-1">
                      <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary">
                  Reserve a seat
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <div className="frame-o relative">
                  <img
                    src="/images/hero/orbit-kids-banner.jpg"
                    alt="Orbit live classroom — students engaged with mentors"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {/* Mono caption strip top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="chip-o" style={{ background: 'rgba(13,14,16,0.85)', backdropFilter: 'blur(8px)' }}>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4b4b] opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff4b4b]" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-o-0">Live · 1,243 watching</span>
                    </span>
                    <span className="chip-o" style={{ background: 'rgba(13,14,16,0.85)', backdropFilter: 'blur(8px)' }}>
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-o-1">{cohortLabel}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            05 · FOUNDER MINDSET — kept (high converter)
        ════════════════════════════════════════════════════════════════ */}
        <FounderMindsetSection />

        {/* ════════════════════════════════════════════════════════════════
            06 · WHAT YOU GET — 6 hairline cards on dark
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-14 sm:mb-20"
            >
              <p className="eyebrow-o mb-5">03 · The programme</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                Not just learning. <span style={{ color: '#00B0FF' }}>Living it.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[58ch]">
                Other platforms ship videos. We ship transformation — real games, real AI tools,
                real projects and real mentorship schools never offer.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Gamepad2, title: 'Business games', sub: '10 simulations', desc: 'Pricing battles, stock markets, lemonade stands. Story-driven business mechanics.' },
                { icon: Brain, title: 'AI superpowers', sub: '100+ tools', desc: 'Website Builder, Pitch Writer, Image Generator. Kids command AI from day one.' },
                { icon: Target, title: '180-day path', sub: '52 live classes', desc: 'A structured, mentor-guided path from beginner to confident young entrepreneur.' },
                { icon: GraduationCap, title: 'Scholarship database', sub: '500+ opportunities', desc: 'Scholarships, fellowships and competitions mapped by age, country and interest.' },
                { icon: Trophy, title: 'Real portfolio', sub: '10+ verified pieces', desc: 'Websites, games, pitch decks, certificates — actual proof for colleges & competitions.' },
                { icon: Sparkles, title: 'Founder mentors', sub: '50+ experts', desc: 'Sunday office hours and 1:1 reviews with operators who have shipped real ventures.' },
              ].map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="card-o group"
                >
                  <div className="flex items-center justify-between mb-7">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--o-accent-soft)', border: '1px solid var(--o-accent-ring)' }}>
                      <u.icon className="w-4 h-4 text-[#00B0FF]" />
                    </div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-o-3">{u.sub}</span>
                  </div>
                  <p className="text-[18px] font-medium text-o-0 mb-2" style={{ letterSpacing: '-0.01em' }}>{u.title}</p>
                  <p className="text-[14px] text-o-2 leading-[1.55]">{u.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            07 · TESTIMONIALS — text-only Linear cards (no avatars)
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-14 sm:mb-20"
            >
              <p className="eyebrow-o mb-5">04 · Voices</p>
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-5" style={{ letterSpacing: '-0.04em' }}>
                Children change. <span style={{ color: '#00B0FF' }}>So do their parents.</span>
              </h2>
              <p className="text-[17px] text-o-2 leading-[1.6] max-w-[58ch]">
                Six months of progress — pitched ideas, launched stores, first profits. The quiet
                revolution parents notice at the dinner table.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  quote: 'She used to be too shy to order food. Last weekend she pitched her pet-sitting business to four neighbours. She is not the same child.',
                  name: 'Sarah C.',
                  role: 'Parent · Mumbai',
                  result: 'First business · ₹40k/mo',
                },
                {
                  quote: 'He sees opportunities everywhere — even in the school cafeteria queue. The mindset shift is permanent.',
                  name: 'Michael R.',
                  role: 'Parent · London',
                  result: 'Led school fundraiser · ₹2L raised',
                },
                {
                  quote: 'Best investment we ever made. He is now mentoring younger kids and speaking at school events without notes.',
                  name: 'Jennifer P.',
                  role: 'Parent · San Francisco',
                  result: 'Student council president',
                },
              ].map((t, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="card-o flex flex-col"
                >
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3.5 h-3.5 fill-[#00B0FF]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-[17px] text-o-0 leading-[1.55] flex-grow mb-7" style={{ letterSpacing: '-0.005em' }}>
                    "{t.quote}"
                  </blockquote>

                  <figcaption className="pt-5 border-o-t">
                    <p className="text-[13.5px] font-medium text-o-0 leading-tight">{t.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-o-3 mt-1">{t.role}</p>
                    <p className="font-mono text-[11px] tracking-[0.04em] text-[#00B0FF] mt-2">→ {t.result}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            08 · COMPARISON — Orbit vs other (single dense table)
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-12 sm:mb-16"
            >
              <p className="eyebrow-o mb-5">05 · Why Orbit</p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)]" style={{ letterSpacing: '-0.04em' }}>
                Most platforms ship videos. <span style={{ color: '#00B0FF' }}>We ship transformation.</span>
              </h2>
            </motion.div>

            <div className="card-o overflow-hidden" style={{ padding: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-o-b">
                <div className="p-6 sm:p-8 border-o-b sm:border-b-0 sm:border-r border-[var(--o-border-1)]">
                  <p className="eyebrow-o mb-3" style={{ color: 'var(--o-text-3)' }}>Other edtech</p>
                  <p className="text-[20px] font-medium text-o-2 line-through" style={{ letterSpacing: '-0.01em' }}>Watch and forget.</p>
                </div>
                <div className="p-6 sm:p-8" style={{ background: 'var(--o-accent-soft)' }}>
                  <p className="eyebrow-o mb-3" style={{ color: '#00B0FF' }}>Orbit Student</p>
                  <p className="text-[20px] font-medium text-o-0" style={{ letterSpacing: '-0.01em' }}>Build, ship, become.</p>
                </div>
              </div>
              {[
                ['Pre-recorded videos', 'Live mentor-led classes + simulations'],
                ['Generic content for all ages', 'Personalised AI-powered path for ages 8–18'],
                ['Get a certificate PDF', 'Build a real portfolio of websites, games & pitches'],
                ['No scholarship guidance', '500+ scholarships and competitions database'],
                ['Learning stops at logout', 'Streaks, levels and quests kids ask to come back to'],
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 border-o-b last:border-b-0">
                  <div className="p-5 sm:p-6 border-o-b sm:border-b-0 sm:border-r border-[var(--o-border-1)] flex items-start gap-3">
                    <span className="font-mono text-[10px] text-o-3 mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[14px] text-o-2 line-through leading-relaxed">{row[0]}</p>
                  </div>
                  <div className="p-5 sm:p-6 flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#00B0FF] mt-0.5 flex-shrink-0" />
                    <p className="text-[14px] text-o-0 font-medium leading-relaxed">{row[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            09 · COST OF WAITING — three age columns, restrained
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="max-w-2xl mb-12 sm:mb-16"
            >
              <p className="eyebrow-o mb-5">06 · The clock</p>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3.2rem)]" style={{ letterSpacing: '-0.04em' }}>
                Every year you wait, your child <span style={{ color: '#ff4b4b' }}>falls behind.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  age: 'Starts at 8', tag: 'Early Bird', highlight: true,
                  results: ['6 years of portfolio building', '10+ competition wins by 14', 'Scholarship-ready by 16', 'Published author and speaker', 'AI-literate since elementary'],
                },
                {
                  age: 'Starts at 14', tag: 'Average', highlight: false,
                  results: ['2 years of rushed prep', '1–2 activities to show', 'Generic application essays', 'Playing catch-up with peers', 'Basic digital skills only'],
                },
                {
                  age: 'Starts at 17', tag: 'Too late', highlight: false,
                  results: ['Too late for most programmes', 'Empty extracurricular section', 'Panic-mode applications', 'Missed scholarship windows', 'Years of regret'],
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className={`card-o ${c.highlight ? 'border-2' : ''}`}
                  style={c.highlight ? { borderColor: 'var(--o-accent-ring)', background: 'var(--o-accent-soft)' } : undefined}
                >
                  <div className="flex items-center justify-between mb-7">
                    <span className={`chip-o ${c.highlight ? 'chip-o-accent' : ''}`}>{c.tag}</span>
                    {c.highlight && <Sparkles className="w-4 h-4 text-[#00B0FF]" />}
                  </div>
                  <p className="font-display text-[clamp(1.4rem,2.4vw,2rem)] text-o-0 mb-6" style={{ letterSpacing: '-0.02em' }}>
                    {c.age}
                  </p>
                  <ul className="space-y-3">
                    {c.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13.5px]">
                        {c.highlight ? (
                          <CheckCircle className="h-3.5 w-3.5 text-[#00B0FF] flex-shrink-0 mt-1" />
                        ) : (
                          <span className="font-mono text-[10px] text-o-3 mt-1 flex-shrink-0">—</span>
                        )}
                        <span className={c.highlight ? 'text-o-0' : 'text-o-2'}>{r}</span>
                      </li>
                    ))}
                  </ul>
                  {c.highlight && (
                    <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary w-full mt-7">
                      Start free trial
                      <span className="btn-o-icon">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            10 · FINAL CTA — restrained dark band
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o relative overflow-hidden border-o-t">
          <div className="absolute inset-0 glow-o opacity-80" />
          <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="chip-o chip-o-accent mb-7">
                <Zap className="w-3.5 h-3.5" /> {spotsCopy}
              </span>

              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] mb-6" style={{ letterSpacing: '-0.045em', lineHeight: 1.0 }}>
                Build the year their peers will wish they started.
              </h2>

              <p className="text-[17px] text-o-2 mb-10 leading-[1.6] max-w-xl mx-auto">
                Live mentors. Real projects. A portfolio that opens doors — scholarships, competitions, and confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary btn-o-lg">
                  Secure your spot
                  <span className="btn-o-icon">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
                <button onClick={() => setShowCareerGuide(true)} className="btn-o btn-o-ghost btn-o-lg">
                  Download career guide
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-o-2">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#00B0FF]" /> 30-day refund
                </span>
                <span className="font-mono">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#ff9600]" /> 7 days to enrol
                </span>
                <span className="font-mono">·</span>
                <span>No credit card to trial</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            10b · INTERNAL DISCOVERY — word count, links, clarity for crawlers
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t" aria-labelledby="explore-orbit-heading">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2 id="explore-orbit-heading" className="font-display text-[clamp(1.6rem,3.2vw,2.25rem)] text-o-0 mb-6" style={{ letterSpacing: '-0.035em' }}>
              Explore Orbit Student
            </h2>
            <div className="space-y-4 text-[15px] leading-[1.75] text-o-2">
              <p>
                Orbit is built as one system: a flagship{' '}
                <Link to="/courses" className="text-[#00B0FF] hover:underline underline-offset-2">Young CEO programme</Link>
                {' '}for ages 8–18, live mentorship, and a student dashboard where projects actually ship. If you want the full
                syllabus and module map, start with our{' '}
                <Link to="/courses" className="text-[#00B0FF] hover:underline underline-offset-2">courses overview</Link>
                {' '}— then see how{' '}
                <Link to="/live-classes" className="text-[#00B0FF] hover:underline underline-offset-2">live classes</Link>
                {' '}and office hours fit around school weeks. The{' '}
                <Link to="/community" className="text-[#00B0FF] hover:underline underline-offset-2">community</Link>
                {' '}hub highlights student showcases and challenges.
              </p>
              <p>
                Parents use our{' '}
                <Link to="/faq" className="text-[#00B0FF] hover:underline underline-offset-2">FAQ</Link>
                {' '}for logistics (time zones, refunds, device requirements) and the{' '}
                <Link to="/resources" className="text-[#00B0FF] hover:underline underline-offset-2">resources hub</Link>
                {' '}for essays, guides and downloadable roadmaps. The{' '}
                <Link to="/blog" className="text-[#00B0FF] hover:underline underline-offset-2">blog</Link>
                {' '}covers AI literacy, entrepreneurship and scholarship strategy;{' '}
                <Link to="/testimonials" className="text-[#00B0FF] hover:underline underline-offset-2">family stories</Link>
                {' '}show what changes after a few months inside a cohort.
              </p>
              <p>
                Try the product before you commit: the interactive{' '}
                <Link to="/demo" className="text-[#00B0FF] hover:underline underline-offset-2">demo</Link>
                {' '}and{' '}
                <Link to="/tools" className="text-[#00B0FF] hover:underline underline-offset-2">AI tools</Link>
                {' '}pages explain how students practise safely. For school or brand collaborations, read{' '}
                <Link to="/partnerships" className="text-[#00B0FF] hover:underline underline-offset-2">partnerships</Link>
                {' '}and{' '}
                <Link to="/events" className="text-[#00B0FF] hover:underline underline-offset-2">events</Link>
                . When you are ready to talk to a human,{' '}
                <Link to="/contact" className="text-[#00B0FF] hover:underline underline-offset-2">contact</Link>
                {' '}our team directly. A machine-readable summary of the site for assistants lives at{' '}
                <a href="/llms.txt" className="text-[#00B0FF] hover:underline underline-offset-2">llms.txt</a>.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            11 · LEAD CAPTURE — kept (high converter)
        ════════════════════════════════════════════════════════════════ */}
        <section className="section-o border-o-t">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
            <CTAWithLeadCapture
              source="homepage"
              ctaType="demo"
              buttonText="Book Free Demo"
              title="Ready to transform your child's future?"
              subtitle="Join 2,500+ families who have unlocked their child's entrepreneurial potential."
              formTitle="Book your free demo"
              formSubtitle="Tell us your preferred start window — we confirm cohort availability within 24 hours. No payment required to book."
              fields={['parentName', 'email', 'phone', 'studentName', 'childAge']}
              variant="primary"
              size="lg"
            />
          </div>
        </section>

        {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
        {showCareerGuide && <CareerGuidePopup isOpen={showCareerGuide} onClose={() => setShowCareerGuide(false)} />}
      </div>
    </>
  );
}
