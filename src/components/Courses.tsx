import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Star, 
  Award, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Users, 
  Calendar, 
  ArrowRight,
  Brain,
  Mic,
  DollarSign,
  TrendingUp,
  Rocket,
  Clock,
  Trophy,
  Globe2,
  Heart,
  Zap,
  Shield,
  PlayCircle,
  MessageCircle,
  Video,
  Lightbulb,
  Building2,
  Camera,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../lib/contexts/LanguageContext';
import { useUserStore } from '../lib/store';
import EnrollmentPopup from './EnrollmentPopup';
import { motion } from 'framer-motion';
import AnimatedCounter from './ui/AnimatedCounter';
import Typewriter from './ui/Typewriter';
import BounceCardFeatures from './ui/BounceCardFeatures';
import { getSpotsRemainingCopy } from '../utils/cohortDates';

const parentTestimonials = [
  {
    name: "Sarah Chen",
    role: "Mother of Emma (12)",
    initials: "SC",
    color: "from-[#1876D2] to-[#00B0FF]",
    quote: "Emma went from being shy to pitching her business idea to our neighbors! The confidence transformation is incredible.",
    outcome: "Started a pet-sitting business, earning $500/month"
  },
  {
    name: "Michael Rodriguez",
    role: "Father of Diego (14)",
    initials: "MR",
    color: "from-[#00B0FF] to-[#40C4FF]",
    quote: "Diego now thinks like an entrepreneur. He sees opportunities everywhere and has developed incredible leadership skills.",
    outcome: "Led school fundraising, raised $2,000 for charity"
  },
  {
    name: "Jennifer Park",
    role: "Mother of Alex (13)",
    initials: "JP",
    color: "from-emerald-400 to-teal-500",
    quote: "Best investment we ever made. Alex is now mentoring other kids and speaking at school events with confidence!",
    outcome: "Became student council president, launched school app"
  }
];

const transformationOutcomes = [
  {
    before: "Lacks confidence in speaking",
    after: "Confident public speaker",
    icon: Mic,
    color: "from-[#1876D2] to-[#00B0FF]"
  },
  {
    before: "No clear direction or goals",
    after: "Clear vision & purpose",
    icon: Target,
    color: "from-[#00B0FF] to-[#40C4FF]"
  },
  {
    before: "Poor financial awareness",
    after: "Financially responsible",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600"
  },
  {
    before: "Passive screen consumption",
    after: "Creative problem solver",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-600"
  }
];

const successStories = [
  {
    name: "Maya, 12",
    story: "Created an eco-friendly product line",
    achievement: "Sold 500+ items, donated 20% to ocean cleanup",
    badge: "Social Impact Award",
    emoji: "🌊",
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    name: "Jake, 14",
    story: "Developed a mobile app for students",
    achievement: "1,000+ downloads, featured in school newsletter",
    badge: "Tech Innovation Award",
    emoji: "📱",
    gradient: "from-[#1876D2] to-[#00B0FF]"
  },
  {
    name: "Zoe, 13",
    story: "Started a tutoring marketplace",
    achievement: "Connected 50+ tutors with students",
    badge: "Education Leader Award",
    emoji: "🎓",
    gradient: "from-amber-400 to-orange-500"
  }
];

const learningPath = [
  {
    weeks: '1-2',
    title: 'Confidence & Communication',
    description: 'Transform from shy to confident speaker',
    icon: Mic,
    color: 'from-blue-500 to-[#1876D2]',
    parentBenefit: 'Watch your child speak up at family dinners',
    modules: [
      { title: 'Overcoming Speaking Anxiety', icon: Heart, duration: '2h', outcome: 'Confident presentations' },
      { title: 'Storytelling Mastery', icon: BookOpen, duration: '1.5h', outcome: 'Captivating narratives' },
      { title: 'Body Language & Presence', icon: Users, duration: '2h', outcome: 'Leadership presence' },
      { title: 'Persuasion & Influence', icon: Target, duration: '1.5h', outcome: 'Convincing arguments' }
    ]
  },
  {
    weeks: '3-4',
    title: 'Creative Thinking & Innovation',
    description: 'Unlock unlimited creativity and problem-solving',
    icon: Lightbulb,
    color: 'from-[#1876D2] to-[#00B0FF]',
    parentBenefit: 'See them solve problems you never thought of',
    modules: [
      { title: 'Design Thinking Process', icon: Brain, duration: '2h', outcome: 'Creative solutions' },
      { title: 'Innovation Techniques', icon: Sparkles, duration: '1.5h', outcome: 'Original ideas' },
      { title: 'Brand Identity Creation', icon: Star, duration: '2h', outcome: 'Professional branding' },
      { title: 'Marketing Your Ideas', icon: Globe2, duration: '2h', outcome: 'Effective promotion' }
    ]
  },
  {
    weeks: '5-6',
    title: 'Financial Intelligence',
    description: 'Master money, budgeting, and investment basics',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500',
    parentBenefit: 'No more fighting about allowance or spending',
    modules: [
      { title: 'Money Psychology', icon: Brain, duration: '1.5h', outcome: 'Healthy money mindset' },
      { title: 'Smart Budgeting', icon: Target, duration: '2h', outcome: 'Personal finance skills' },
      { title: 'Investment Basics', icon: TrendingUp, duration: '2h', outcome: 'Future wealth building' },
      { title: 'Business Finance', icon: Building2, duration: '1.5h', outcome: 'Profit understanding' }
    ]
  },
  {
    weeks: '7-8',
    title: 'Digital Leadership',
    description: 'Become a responsible digital native and leader',
    icon: Globe2,
    color: 'from-amber-500 to-orange-500',
    parentBenefit: 'Productive screen time, not passive consumption',
    modules: [
      { title: 'Digital Citizenship', icon: Shield, duration: '2h', outcome: 'Online responsibility' },
      { title: 'Content Creation', icon: Camera, duration: '1.5h', outcome: 'Professional content' },
      { title: 'Online Community Building', icon: Users, duration: '2h', outcome: 'Leadership skills' },
      { title: 'Tech for Good', icon: Heart, duration: '1.5h', outcome: 'Positive impact' }
    ]
  },
  {
    weeks: '9-10',
    title: 'Leadership & Team Building',
    description: 'Inspire others and lead with purpose',
    icon: Users,
    color: 'from-amber-400 to-orange-500',
    parentBenefit: 'Natural leader at school and home',
    modules: [
      { title: 'Leadership Styles', icon: Star, duration: '2h', outcome: 'Personal leadership' },
      { title: 'Team Dynamics', icon: Users, duration: '1.5h', outcome: 'Collaboration skills' },
      { title: 'Conflict Resolution', icon: Heart, duration: '2h', outcome: 'Problem solving' },
      { title: 'Inspiring Others', icon: Trophy, duration: '1.5h', outcome: 'Motivational skills' }
    ]
  },
  {
    weeks: '11-12',
    title: 'Real Business Launch',
    description: 'Launch your first real business or social impact project',
    icon: Rocket,
    color: 'from-[#1876D2] to-[#00B0FF]',
    parentBenefit: 'Actual business results you can see',
    modules: [
      { title: 'Business Plan Mastery', icon: Target, duration: '2h', outcome: 'Complete business plan' },
      { title: 'Pitch Deck Creation', icon: Mic, duration: '2h', outcome: 'Investor-ready pitch' },
      { title: 'Launch Strategy', icon: Rocket, duration: '2h', outcome: 'Successful launch' },
      { title: 'Growth & Scale', icon: TrendingUp, duration: '2h', outcome: 'Measurable results' }
    ]
  }
];

export default function Courses() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const spotsCopy = getSpotsRemainingCopy(30);

  return (
    <div className="min-h-screen bg-o-0 text-o-0 overflow-x-hidden">
      {/* ═══ HERO — Orbit dark + typewriter ═══ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-x-0 top-0 h-[600px] glow-o opacity-80" />
        <div className="absolute inset-0 grid-o opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
            <p className="eyebrow-o mb-6">Young CEO · 180 days</p>

            <h1 className="font-display text-[clamp(2.4rem,6.4vw,4.6rem)] text-o-0 mb-5 leading-[1.0]" style={{ letterSpacing: '-0.045em' }}>
              Watch your child become a{' '}
              <span className="text-[#00B0FF]">
                <Typewriter
                  as="span"
                  text={['confident leader', 'young founder', 'public speaker', 'AI-native maker']}
                  speed={55}
                  deleteSpeed={28}
                  waitTime={1500}
                  initialDelay={350}
                  cursorChar="_"
                />
              </span>
            </h1>

            <p className="text-[17px] text-o-2 max-w-[58ch] mx-auto mb-10 leading-[1.6]">
              In 180 days: confidence, communication and an entrepreneurial mindset — live mentors, real projects, scholarship-ready portfolios.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-14">
              <button onClick={() => setShowEnrollment(true)} className="btn-o btn-o-primary btn-o-lg">
                Start free trial
                <span className="btn-o-icon">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-o-3 inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#f59e0b]" />
                {spotsCopy}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {transformationOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.07 }}
                  className="card-o text-left"
                  style={{ padding: '18px' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--o-accent-soft)', border: '1px solid var(--o-accent-ring)' }}>
                    <outcome.icon className="h-4 w-4 text-[#00B0FF]" />
                  </div>
                  <p className="text-[11px] text-o-3 mb-1 line-through">{outcome.before}</p>
                  <p className="text-[14px] font-medium text-o-0 leading-snug">{outcome.after}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BounceCardFeatures
        eyebrow="Curriculum highlights"
        headline={
          <>
            Six modules. <span style={{ color: '#00B0FF' }}>One flagship journey.</span>
          </>
        }
        subcopy="From first pitch to launched venture — games, AI tools, live mentorship and a portfolio that opens doors."
        cta={{ label: 'Reserve a seat', onClick: () => setShowEnrollment(true) }}
        features={[
          {
            title: 'Mindset & speaking',
            description: 'Confidence, storytelling and stage presence through live games.',
            demoLabel: 'Module 01–02',
            span: 'wide',
            icon: <Mic className="w-4 h-4" />,
          },
          {
            title: 'AI + product',
            description: 'Build websites, decks and brands with the Orbit AI studio.',
            demoLabel: 'Module 03–04',
            span: 'lg',
            icon: <Brain className="w-4 h-4" />,
          },
          {
            title: 'Business games',
            description: 'Simulations that teach pricing, markets and decision-making.',
            demoLabel: '10 simulations',
            span: 'md',
            icon: <Target className="w-4 h-4" />,
          },
          {
            title: 'Launch & scale',
            description: 'Pitch night, mentor review and a portfolio that travels with them.',
            demoLabel: 'Module 05–06',
            span: 'md',
            icon: <Rocket className="w-4 h-4" />,
          },
        ]}
      />

      {/* ═══ PARENT TESTIMONIALS ═══ */}
      <section className="section-o border-o-t relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mb-14">
            <p className="eyebrow-o mb-5">Real stories</p>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] mb-4" style={{ letterSpacing: '-0.04em' }}>
              What parents <span style={{ color: '#00B0FF' }}>are saying</span>
            </h2>
            <p className="text-[17px] text-o-2">Real transformations from real families</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parentTestimonials.map((testimonial, index) => (
              <motion.div
              key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-o h-full flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                
                <p className="text-o-1 mb-6 leading-relaxed flex-grow text-[14.5px]">"{testimonial.quote}"</p>
                
                <div className="bg-gradient-to-r from-[rgba(16,185,129,0.12)] to-[rgba(24,118,210,0.12)] rounded-xl px-4 py-2.5 mb-6 border border-[rgba(16,185,129,0.25)]">
                  <p className="text-xs font-semibold text-[#34d399]">🎯 {testimonial.outcome}</p>
                </div>

                {/* Author — gradient initials instead of broken images */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {testimonial.initials}
                  </div>
                    <div>
                    <h4 className="text-sm font-semibold text-o-0">{testimonial.name}</h4>
                    <p className="text-o-3 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS STORIES — Dark, no images (emoji icons instead) ═══ */}
      <section className="section-o border-o-t relative overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[35%] h-[35%] bg-[#1876D2]/10 rounded-full filter blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--o-ghost-bg)] border border-[var(--o-border-1)] mb-6">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-o-2">Student Success</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-o-0 mb-3 tracking-tight">
              Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Success Stories</span>
            </h2>
            <p className="text-o-2 max-w-lg mx-auto">See what your child could achieve</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-o-2 border border-[var(--o-border-1)] rounded-2xl overflow-hidden hover:border-[var(--o-border-2)] transition-all duration-500"
              >
                {/* Top accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${story.gradient}`} />
                
                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {story.emoji}
                    </div>
                    <span className="text-[10px] font-bold text-[#00B0FF] bg-[#00B0FF]/10 px-2.5 py-1 rounded-full">{story.badge}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-o-0 mb-1">{story.name}</h3>
                  <p className="text-o-2 mb-4 text-sm">{story.story}</p>
                  
                  <div className="bg-o-2 rounded-xl px-4 py-3 border border-[var(--o-border-1)]">
                    <p className="text-xs font-medium text-emerald-400">✨ {story.achievement}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEARNING ECOSYSTEM — White, image hidden on mobile ═══ */}
      <section className="section-o border-o-t relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#1876D2]/10 mb-8">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#1876D2]">Complete Learning Ecosystem</span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-o-0">
                AI-Powered Learning
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                  Meets Real Mentorship
                </span>
              </h2>

              <p className="text-o-3 text-lg mb-10 leading-relaxed">
                The perfect blend of cutting-edge AI tools, live mentorship, and interactive simulators — giving your child every advantage.
              </p>
              
              {/* Learning methods — 2x2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Brain, name: 'AI-Powered Tools', desc: '24/7 AI coach & smart analytics', gradient: 'from-[#1876D2] to-[#00B0FF]' },
                  { icon: Users, name: 'Live Expert Classes', desc: 'Interactive sessions with mentors', gradient: 'from-emerald-500 to-teal-600' },
                  { icon: TrendingUp, name: 'Business Simulators', desc: 'Risk-free virtual environments', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
                  { icon: PlayCircle, name: 'Recorded Sessions', desc: '500+ expert-led lessons', gradient: 'from-amber-500 to-orange-500' },
                ].map((m, i) => (
                  <div key={i} className="group bg-o-2 hover:bg-o-3 rounded-xl p-4 border border-[var(--o-border-1)] hover:border-[#1876D2]/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 bg-gradient-to-br ${m.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                        <m.icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-o-0">{m.name}</h3>
                    </div>
                    <p className="text-o-3 text-xs pl-12">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="flex gap-8">
                {[{ v: '100+', l: 'AI Tools' }, { v: '50+', l: 'Live Monthly' }, { v: '500+', l: 'Lessons' }].map((s, i) => (
                  <div key={i}>
                    <AnimatedCounter value={s.v} className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]" />
                    <div className="text-o-2 text-xs">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setShowEnrollment(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    Start Learning Journey
                    <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
            
            {/* Image — HIDDEN on mobile, visible on lg+ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
                <picture>
                  <source srcSet="/images/orbit/workshop-build.webp" type="image/webp" />
                  <img
                    src="/images/orbit/workshop-build.jpg"
                    alt="Orbit Accelerator workshop — students building and shipping ideas"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
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
                className="absolute -bottom-4 -left-4 bg-o-2 rounded-xl shadow-xl border border-[var(--o-border-1)] p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-o-0">Expert-Led</div>
                    <div className="text-[10px] text-o-2">AI-Powered</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 12-WEEK JOURNEY — Dark ═══ */}
      <section className="section-o border-o-t relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-[#1876D2]/8 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[25%] h-[25%] bg-[#00B0FF]/6 rounded-full filter blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--o-ghost-bg)] border border-[var(--o-border-1)] mb-6">
              <Rocket className="h-4 w-4 text-[#00B0FF]" />
              <span className="text-sm font-medium text-o-2">Step-by-Step</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-o-0 mb-3 tracking-tight">
              12-Week <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Transformation Journey</span>
            </h2>
            <p className="text-o-2 max-w-xl mx-auto">Each week builds confidence and skills your child will use for life</p>
          </motion.div>

          <div className="space-y-4">
            {learningPath.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`bg-o-2 border border-[var(--o-border-1)] rounded-2xl p-6 lg:p-8 cursor-pointer hover:bg-o-3 hover:border-[var(--o-border-2)] transition-all duration-500 ${
                  selectedModule === path.title ? 'ring-1 ring-[#00B0FF]/30 bg-o-3' : ''
                }`}
                onClick={() => setSelectedModule(selectedModule === path.title ? null : path.title)}
              >
                <div className="flex items-start gap-5">
                  {/* Week badge */}
                  <div className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${path.color} text-white flex flex-col items-center justify-center shadow-lg`}>
                    <span className="text-[10px] font-medium opacity-80">WEEK</span>
                    <span className="text-lg font-bold">{path.weeks}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold text-o-0">{path.title}</h3>
                        <p className="text-o-2 text-sm">{path.description}</p>
                    </div>
                    <ChevronRight 
                        className={`h-5 w-5 text-[#00B0FF] transform transition-transform flex-shrink-0 ml-4 ${
                        selectedModule === path.title ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-400/10 rounded-lg mt-2">
                      <span className="text-xs font-medium text-emerald-400">👨‍👩‍👧‍👦 {path.parentBenefit}</span>
                    </div>

                    {/* Expanded modules */}
                  {selectedModule === path.title && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6"
                      >
                      {path.modules.map((module, moduleIndex) => (
                        <div
                          key={moduleIndex}
                            className="p-4 rounded-xl bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center shadow`}>
                                <module.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-o-0 text-sm truncate">{module.title}</h4>
                                <div className="flex items-center gap-1 text-o-3 text-xs">
                                  <Clock className="h-3 w-3" />
                                  <span>{module.duration}</span>
                            </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#00B0FF]">
                              <CheckCircle className="h-3 w-3" />
                              <span>{module.outcome}</span>
                            </div>
                        </div>
                      ))}
                      </motion.div>
                  )}
                </div>
              </div>
              </motion.div>
          ))}
        </div>
      </div>
      </section>

      {/* ═══ URGENCY CTA — Deep Dark ═══ */}
      <section className="section-o border-o-t relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(24,118,210,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 mb-8">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Limited — Only 30 Spots Left</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-o-0 mb-6 leading-tight tracking-tight">
              Don't Let Your Child
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400"> Fall Behind</span>
            </h2>
            <p className="text-o-2 mb-10 max-w-2xl mx-auto text-lg">
              While other kids are just playing games, your child could be building confidence, leadership skills, and an entrepreneurial mindset that lasts a lifetime.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
              {[{ v: '30', l: 'Spots Left' }, { v: '7', l: 'Days Left' }, { v: '98%', l: 'Satisfaction' }].map((u, i) => (
                <div key={i} className="bg-o-2 border border-[var(--o-border-1)] rounded-2xl p-5">
                  <AnimatedCounter value={u.v} className="text-2xl font-bold text-amber-400" />
                  <div className="text-o-3 text-[10px] uppercase tracking-wider mt-1">{u.l}</div>
            </div>
          ))}
        </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => setShowEnrollment(true)}
                className="group px-10 py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/40 transition-all duration-500 hover:scale-[1.03]"
              >
                <span className="flex items-center gap-2">
                  Secure Your Child's Spot Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
          </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-o-3">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" /> 30-day money-back guarantee</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-400" /> 4.9/5 parent rating</span>
            </div>
          </motion.div>
        </div>
      </section>

      {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
    </div>
  );
}
