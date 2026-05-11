import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Download, FileText, Globe, Target, Rocket, Award, Trophy, Brain,
  ArrowRight, CheckCircle, ExternalLink, Lightbulb, GraduationCap,
  Star, Sparkles, BookOpen, Users, Calendar, MapPin, DollarSign,
  TrendingUp, ChevronRight, Zap, Shield, Clock, Heart, Search,
  Filter, ChevronDown
} from 'lucide-react';
import SEO from '../components/SEO';
import EnrollmentPopup from '../components/EnrollmentPopup';
import PageHero from '../components/common/PageHero';

/* ── DATA ── */
const scholarshipJourney = [
  { age: '8-10', grade: 'Class 2-4', title: 'Discovery Phase', desc: 'Build curiosity, discover passions, start creative projects', icon: Lightbulb, color: '#00B0FF', programs: ['Google CS First', 'NASA STEM', 'National Geographic Explorers'] },
  { age: '10-12', grade: 'Class 5-7', title: 'Foundation Phase', desc: 'Develop core skills, enter local competitions, build a portfolio', icon: BookOpen, color: '#1876D2', programs: ['MathCounts', 'Spelling Bee', 'Science Olympiad Jr'] },
  { age: '12-14', grade: 'Class 7-9', title: 'Acceleration Phase', desc: 'Win national awards, publish work, start a micro-venture', icon: Rocket, color: '#00BFA5', programs: ['Conrad Challenge', 'DECA', 'Diamond Challenge'] },
  { age: '14-16', grade: 'Class 9-11', title: 'Launch Phase', desc: 'Apply for global scholarships, build a public profile, lead teams', icon: Trophy, color: '#FF9100', programs: ['Yale YYGS', 'Rise by Schmidt', 'QuestBridge'] },
  { age: '16-18', grade: 'Class 11-12', title: 'Elite Phase', desc: 'Full-ride scholarships, international fellowships, university admissions', icon: GraduationCap, color: '#7C4DFF', programs: ['Rhodes Prep', 'Ivy League Apps', 'Thiel Fellowship Prep'] },
];

const categories = ['All', 'Scholarships', 'Competitions', 'AI Tools', 'Fellowships'];

const globalOpportunities = [
  { name: 'Yale YYGS', desc: 'Young Global Scholars program for high school students — full funding available', category: 'Scholarships', color: 'from-[#1876D2] to-[#00B0FF]', tag: 'Top Pick', deadline: 'Jan 31', value: '$8,000+' },
  { name: 'Rise by Schmidt Futures', desc: 'Lifetime scholarship and mentorship for exceptional 15-17 year olds', category: 'Scholarships', color: 'from-emerald-400 to-teal-500', tag: 'Full Ride', deadline: 'Feb 15', value: '$500K+' },
  { name: 'QuestBridge Scholarship', desc: 'Full 4-year scholarships to top 50 colleges for outstanding students', category: 'Scholarships', color: 'from-amber-400 to-orange-500', tag: 'Full Ride', deadline: 'Sep 26', value: '$250K+' },
  { name: 'John Locke Essay Competition', desc: 'International essay competition — wins boost Ivy League applications', category: 'Competitions', color: 'from-[#00B0FF] to-[#40C4FF]', tag: 'Portfolio', deadline: 'Jun 30', value: 'Prestige' },
  { name: 'Conrad Challenge', desc: 'NASA-affiliated innovation challenge for students solving global problems', category: 'Competitions', color: 'from-[#40C4FF] to-[#1876D2]', tag: 'STEM', deadline: 'Oct 30', value: '$25K+' },
  { name: 'Diamond Challenge', desc: 'Global entrepreneurship competition by University of Delaware', category: 'Competitions', color: 'from-[#1876D2] to-[#00B0FF]', tag: 'Business', deadline: 'Jan 5', value: '$20K+' },
  { name: 'Google Science Fair', desc: 'Global STEM competition for students aged 13-18', category: 'Competitions', color: 'from-[#1876D2] to-[#1565C0]', tag: 'STEM', deadline: 'Mar 15', value: '$50K' },
  { name: 'Ashoka Youth Ventures', desc: 'Support for young social entrepreneurs making real-world impact', category: 'Fellowships', color: 'from-amber-400 to-orange-500', tag: 'Impact', deadline: 'Rolling', value: 'Mentorship' },
  { name: 'AEOP STEM Programs', desc: 'US Army educational outreach for aspiring scientists and engineers', category: 'Fellowships', color: 'from-emerald-400 to-teal-500', tag: 'STEM', deadline: 'Various', value: 'Stipend' },
  { name: 'ChatGPT & AI Tools', desc: 'Leverage AI for research, writing, presentations and business planning', category: 'AI Tools', color: 'from-[#00B0FF] to-[#40C4FF]', tag: 'AI', deadline: 'Always', value: 'Free' },
  { name: 'Canva for Education', desc: 'Free design tool for creating presentations, brands & visual stories', category: 'AI Tools', color: 'from-[#1876D2] to-[#00B0FF]', tag: 'Design', deadline: 'Always', value: 'Free' },
  { name: 'DECA Competition', desc: 'International business & marketing competition — 200K+ students compete', category: 'Competitions', color: 'from-amber-400 to-orange-500', tag: 'Business', deadline: 'Nov 15', value: '$10K+' },
];

const stats = [
  { num: '$2.9B+', label: 'In scholarships available annually for students under 18', icon: DollarSign },
  { num: '94%', label: 'Of parents wish they started scholarship prep earlier', icon: Clock },
  { num: '47%', label: 'More likely to win scholarships with early portfolio building', icon: TrendingUp },
  { num: '10+', label: 'Years of advantage when you start in middle school', icon: Star },
];

const downloadableResources = [
  { title: 'Scholarship Tracker Template', desc: 'Track deadlines, requirements, and application status', format: 'Excel', size: '1.4 MB', popular: true },
  { title: 'Business Plan Template', desc: 'Comprehensive template for your first venture', format: 'PDF', size: '2.4 MB', popular: true },
  { title: 'Pitch Deck Template', desc: 'Professional slide deck for investors and competitions', format: 'PPTX', size: '5.1 MB', popular: true },
  { title: 'Financial Projections Sheet', desc: 'Easy-to-use Excel template for budgets and forecasting', format: 'Excel', size: '1.8 MB', popular: false },
  { title: 'College Application Planner', desc: 'Month-by-month guide for grades 9–12', format: 'PDF', size: '3.2 MB', popular: true },
  { title: "Young Entrepreneur's Guide", desc: 'Comprehensive ebook covering all aspects of starting up', format: 'PDF', size: '4.5 MB', popular: false },
];

/* ── Animated floating particle background ── */
const ParticleField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-[#00B0FF]/20"
        initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 4 }}
      />
    ))}
  </div>
);

/* ── Animated counter ── */
const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setHasAnimated(true);
        setDisplayed(value);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{displayed}</span>;
};

/* ── MAIN COMPONENT ── */
const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [activeJourneyStep, setActiveJourneyStep] = useState(2);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredOpportunities = activeCategory === 'All'
    ? globalOpportunities
    : globalOpportunities.filter(o => o.category === activeCategory);

  return (
    <>
      <SEO
        title="Orbit Student Resources | Scholarships, Competitions & Opportunities for Kids"
        description="Orbit Student resources: 500+ scholarships worth $2.9B+, competitions, and global opportunities for kids 8-18. Start scholarship prep early with Orbit Student."
        keywords={['Orbit Student resources', 'Orbit Student scholarships', 'scholarships for kids', 'youth competitions', 'student scholarships', 'early scholarship planning', 'global fellowships', 'young entrepreneurs', 'college prep for middle school', 'Orbit Student opportunities', 'best scholarship platform for kids', 'scholarship database for students']}
        url="https://www.orbitstudent.com/resources"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        {/* Unified hero */}
        <PageHero
          eyebrow="Resources · Scholarship & opportunity hub"
          title="The earlier you start,"
          italic="the further you go."
          subtitle="Most students discover scholarships in 11th grade. Our students start in 5th. 500+ scholarships mapped, $2.9B+ in funding available."
          actions={[
            { label: "Start your child's journey", onClick: () => setShowEnrollment(true), primary: true },
            { label: 'Explore scholarships', href: '#scholarship-map' },
          ]}
          align="center"
          size="md"
        />

        {/* keep dummy ref for scroll behaviour (heroY/heroOpacity bindings) */}
        <section ref={heroRef} className="hidden" aria-hidden="true">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} />
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  THE SCHOLARSHIP TIMELINE — Visual Journey Map          ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[10%] right-[-5%] w-[30%] h-[40%] bg-[#1876D2]/5 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[35%] bg-[#00B0FF]/5 rounded-full filter blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
                <MapPin className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">The Scholarship Roadmap</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Every Year Counts.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                  Start Now.
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Most scholarship winners didn't start in high school — they started years earlier. Here's the roadmap we build for every Orbit student.
              </p>
            </motion.div>

            {/* Interactive timeline */}
            <div className="relative">
              {/* Horizontal connector line (desktop) */}
              <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
                {scholarshipJourney.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = activeJourneyStep === i;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveJourneyStep(i)}
                      className="cursor-pointer group relative"
                    >
                      {/* Step node */}
                      <div className="flex flex-col items-center text-center">
                        {/* Circle */}
                        <motion.div
                          className={`relative w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                            isActive
                              ? 'bg-gradient-to-br shadow-lg scale-110'
                              : 'bg-white/[0.03] border border-white/[0.06] group-hover:border-white/[0.12]'
                          }`}
                          style={isActive ? {
                            background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`,
                            borderColor: `${step.color}40`,
                            boxShadow: `0 8px 32px ${step.color}20`
                          } : {}}
                          whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                        >
                          <Icon className="h-7 w-7" style={{ color: isActive ? step.color : '#64748b' }} />
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl"
                              style={{ border: `2px solid ${step.color}30` }}
                              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                          {/* Step number */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-gray-400">{i + 1}</span>
                          </div>
                        </motion.div>

                        {/* Ages */}
                        <div className="mb-2">
                          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: step.color }}>{step.age} yrs</span>
                          <span className="text-gray-600 text-xs ml-2">({step.grade})</span>
                        </div>

                        {/* Title */}
                        <h3 className={`text-base font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-[200px]">
                          {step.desc}
                        </p>

                        {/* Programs */}
                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-1.5"
                            >
                              {step.programs.map((prog, j) => (
                                <motion.div
                                  key={prog}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.1 }}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <CheckCircle className="h-3 w-3 flex-shrink-0" style={{ color: step.color }} />
                                  <span className="text-gray-400">{prog}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom insight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1876D2]/10 to-[#00B0FF]/10 border border-[#1876D2]/20">
                <Zap className="h-5 w-5 text-[#00B0FF]" />
                <p className="text-gray-300 text-sm">
                  <span className="text-white font-semibold">Orbit Students</span> get a personalized scholarship roadmap from day one — not just a list, but a strategy.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  WHY EARLY = EVERYTHING — Stats Section                 ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Starting Early</span> Changes Everything
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">The data is clear: early preparation is the single biggest predictor of scholarship success.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative bg-gray-50/80 rounded-3xl p-8 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl hover:shadow-[#1876D2]/5 transition-all duration-500 text-center h-full">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#1876D2]/10 to-[#00B0FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="h-7 w-7 text-[#1876D2]" />
                      </div>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF] mb-3">
                        <AnimatedCounter value={s.num} />
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Visual comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 sm:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Student Profile at College Application Time</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Without Orbit */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 rounded-full" />
                    <div className="pt-6">
                      <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Typical Student</p>
                      <ul className="space-y-3">
                        {['Good grades, few extracurriculars', 'Started scholarship search in 11th grade', 'Generic application essays', 'No competition wins or publications', 'Limited recommendation network'].map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[8px] text-gray-400">—</span>
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* With Orbit */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-full" />
                    <div className="pt-6">
                      <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF] mb-4 uppercase tracking-wider">Orbit Student</p>
                      <ul className="space-y-3">
                        {['Strong portfolio from age 10+', '3+ competition wins by 10th grade', 'Published essays & startup experience', 'AI literacy + business skills', 'Mentors from Yale, Stanford, MIT'].map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-2.5 w-2.5 text-white" />
                            </div>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  SCHOLARSHIP DATABASE — Interactive Grid                 ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section id="scholarship-map" className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[-5%] left-[20%] w-[40%] h-[30%] bg-[#1876D2]/5 rounded-full filter blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
                <Globe className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Curated Database</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Scholarships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Opportunities</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">Hand-picked programs that Orbit students are prepared for from day one.</p>
            </motion.div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white border-transparent shadow-lg shadow-[#1876D2]/20'
                      : 'bg-white/[0.03] text-gray-400 border-white/[0.06] hover:border-white/[0.12] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Opportunity grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredOpportunities.map((o, i) => (
                  <motion.div
                    key={o.name}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.03 }}
                    layout
                    className="group"
                  >
                    <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 h-full relative overflow-hidden">
                      {/* Hover glow */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${o.color} blur-3xl`} style={{ opacity: 0, mixBlendMode: 'overlay' }} />

                      <div className="relative z-10">
                        {/* Top row: icon + tags */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center shadow-lg`}>
                            <Award className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-white/[0.06] text-[10px] font-bold text-gray-400 uppercase tracking-wider">{o.tag}</span>
                          </div>
                        </div>

                        <h3 className="text-white text-base font-bold mb-1.5 group-hover:text-[#00B0FF] transition-colors">{o.name}</h3>
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{o.desc}</p>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-gray-600" />
                            <span className="text-gray-500 text-xs">{o.deadline}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-3 w-3 text-gray-600" />
                            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">{o.value}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-[#1876D2]/10 text-[#00B0FF] text-[10px] font-medium">{o.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* More CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-gray-500 text-sm mb-3">Orbit students get access to 500+ opportunities with personalized matching</p>
              <button
                onClick={() => setShowEnrollment(true)}
                className="inline-flex items-center gap-2 text-[#00B0FF] hover:text-white text-sm font-medium transition-colors"
              >
                Unlock Full Database <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  HOW ORBIT HELPS — 3 Pillars                            ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                How Orbit Builds{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Scholarship Winners</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">It's not about finding scholarships — it's about building students who scholarships find.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'AI-Powered Portfolio Building',
                  desc: 'Our AI tools help students create businesses, write essays, build brands, and document achievements — all before high school.',
                  features: ['AI Business Builder', 'Essay Writing Coach', 'Brand Creator', 'Portfolio Tracker'],
                  gradient: 'from-[#1876D2] to-[#1565C0]',
                },
                {
                  icon: Target,
                  title: 'Personalized Opportunity Matching',
                  desc: 'We map your child\'s skills, interests, and goals to the perfect scholarships, competitions, and programs worldwide.',
                  features: ['Scholarship Matching', 'Deadline Alerts', 'Application Support', 'Interview Prep'],
                  gradient: 'from-[#00B0FF] to-[#00BFA5]',
                },
                {
                  icon: Users,
                  title: 'Mentor Network & Community',
                  desc: 'Connect with mentors from top universities, successful young entrepreneurs, and a peer community of ambitious students.',
                  features: ['1-on-1 Mentoring', 'Peer Community', 'Alumni Network', 'Live Sessions'],
                  gradient: 'from-[#FF9100] to-[#FF6D00]',
                },
              ].map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="group"
                  >
                    <div className="relative bg-gray-50/50 rounded-3xl p-8 border border-gray-100 hover:border-[#1876D2]/15 hover:shadow-2xl hover:shadow-[#1876D2]/5 transition-all duration-700 h-full">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{pillar.desc}</p>

                      {/* Features */}
                      <ul className="space-y-2.5">
                        {pillar.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2.5 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-[#1876D2] flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  FREE RESOURCES — Downloadable Templates                ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] bg-[#00B0FF]/8 rounded-full filter blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] mb-8">
                <Download className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Free Downloads</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Free Templates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Guides</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">Tools your child can use today to start building their scholarship portfolio.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {downloadableResources.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-bold">{r.title}</h3>
                        <p className="text-gray-500 text-xs">{r.format} · {r.size}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm flex-grow mb-4">{r.desc}</p>
                    <button className="flex items-center gap-2 text-[#00B0FF] hover:text-white text-sm font-medium transition-colors">
                      <Download className="h-4 w-4" /> Download Free
                    </button>
                    {r.popular && (
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">Popular</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════════════╗
            ║  FINAL CTA — Cinematic                                  ║
            ╚══════════════════════════════════════════════════════════╝ */}
        <section className="relative py-32 bg-[#050a18] overflow-hidden">
          {/* Animated glow */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(24,118,210,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-8">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Every semester you wait = opportunities lost</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                Your Child's Future
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]">
                  Starts Today
                </span>
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
                The best scholarships don't go to the smartest students — they go to the most prepared.
                Give your child the unfair advantage of starting early with Orbit.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <button
                  onClick={() => setShowEnrollment(true)}
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/35 transition-all duration-500 hover:scale-[1.03]"
                >
                  Start the Scholarship Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#00B0FF]" />
                  <span>Free to get started</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-[#00B0FF]" />
                  <span>Trusted by 2,500+ families</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#00B0FF]" />
                  <span>4.9/5 parent satisfaction</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
      </div>
    </>
  );
};

export default Resources;
