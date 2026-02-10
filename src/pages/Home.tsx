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
  Zap
} from 'lucide-react';
import EnrollmentPopup from '../components/EnrollmentPopup';
import CareerGuidePopup from '../components/career/CareerGuidePopup';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import CTAWithLeadCapture from '../components/CTAWithLeadCapture';
import FounderMindsetSection from '../components/home/FounderMindsetSection';
import LottieAnimation from '../components/ui/LottieAnimation';
import AnimatedHero3D from '../components/ui/AnimatedHero3D';

// Optimized animation variants for better performance
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

export default function Home() {
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showCareerGuide, setShowCareerGuide] = useState(false);

  return (
    <>
      <SEO
        title="Orbit Student - Think Future Think Orbit"
        description="Transform your child into a confident leader. Orbit Student teaches entrepreneurship, communication, and leadership skills to young minds through our innovative 180-day curriculum."
        keywords={[
          'orbit student',
          'entrepreneurship education',
          'youth leadership',
          'public speaking for kids',
          'entrepreneurial mindset',
          'future skills',
          'confidence building',
          'youth business education',
          'leadership training',
          'communication skills',
          'AI awareness'
        ]}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 font-[Poppins] overflow-x-hidden">
        {/* ═══ HERO SECTION — Premium Dark with Animated Gradient Mesh ═══ */}
        <section className="relative bg-slate-950 text-white overflow-hidden min-h-screen flex items-center pt-16">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0">
            <div className="absolute top-[-30%] left-[-15%] w-[55%] h-[55%] bg-[#1876D2]/25 rounded-full filter blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-25%] right-[-10%] w-[50%] h-[50%] bg-[#00B0FF]/20 rounded-full filter blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]" />
            <div className="absolute top-[40%] right-[30%] w-[25%] h-[25%] bg-[#40C4FF]/10 rounded-full filter blur-[80px] animate-[float_12s_ease-in-out_infinite]" />
          </div>

          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center lg:text-left z-10"
              >
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300 font-medium">Join 2,500+ Young Entrepreneurs</span>
                </motion.div>
                
                <motion.h1 
                  variants={fadeIn}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
                >
                  <span className="text-white">Where Young Minds</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#40C4FF]">
                    Become Future Leaders
                  </span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed"
                >
                  Transform your child's potential into reality with our immersive 180-day journey. From idea to launch, we guide young entrepreneurs through every step.
                </motion.p>
                
                <motion.div 
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => setShowEnrollment(true)}
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Check Courses
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    onClick={() => setShowCareerGuide(true)}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Download Free Guide
                  </button>
                </motion.div>

                {/* Stats — glass cards */}
                <motion.div variants={fadeIn} className="mt-14 grid grid-cols-3 gap-4">
                  {[
                    { value: '2,500+', label: 'Students' },
                    { value: '180', label: 'Day Program' },
                    { value: '98%', label: 'Success Rate' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              
              {/* Right: Hero visual — Lottie + floating glass cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative z-10 hidden lg:block"
              >
                <div className="relative" style={{ perspective: '1000px' }}>
                  {/* Main image with glass frame */}
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#1876D2]/10">
                    <img
                      src="/images/hero/orbit-kids-laptop.jpg"
                      alt="Orbit students learning with laptop"
                      className="w-full h-auto object-cover"
                      width="800"
                      height="600"
                      fetchpriority="high"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Floating accent card — top right */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-xl p-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-lg flex items-center justify-center">
                        <Rocket className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">AI-Powered</div>
                        <div className="text-gray-400 text-[10px]">Learning</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating accent card — bottom left */}
                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-xl p-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">Real Projects</div>
                        <div className="text-emerald-400 text-[10px]">+127% Growth</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Mobile hero — Lottie rocket animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-10 lg:hidden flex justify-center"
              >
                <LottieAnimation
                  src="/animations/rocket.json"
                  className="w-64 h-64"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
        </section>

        {/* Interactive 3D Experience Section — Lightweight CSS 3D */}
        <section className="py-20 bg-slate-950 relative overflow-hidden">
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
        <section className="py-20 bg-white relative overflow-hidden">
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

        {/* ═══ REAL PARENT STORIES — Dark Glass ═══ */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          {/* Gradient mesh */}
          <div className="absolute top-[-20%] right-[-15%] w-[40%] h-[40%] bg-[#1876D2]/10 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-[#00B0FF]/8 rounded-full filter blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-400">Real Parent Stories</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                "My Child is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Different Person</span>"
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">See the transformations that make parents proud</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { name: 'Sarah Chen', role: 'Mother of Emma (12)', quote: 'Emma went from being too shy to order food to confidently pitching business ideas to our neighbors!', result: 'Started a pet-sitting business, earning $500/month', initials: 'SC', color: 'from-[#1876D2] to-[#00B0FF]' },
                { name: 'Michael Rodriguez', role: 'Father of Diego (14)', quote: 'Diego now thinks like an entrepreneur. He sees opportunities everywhere and has developed incredible leadership skills.', result: 'Led school fundraising, raised $2,000 for charity', initials: 'MR', color: 'from-[#00B0FF] to-[#40C4FF]' },
                { name: 'Jennifer Park', role: 'Mother of Alex (13)', quote: 'Best investment we ever made. Alex is now mentoring other kids and speaking at school events with confidence!', result: 'Became student council president, launched school app', initials: 'JP', color: 'from-emerald-400 to-teal-500' },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    {/* Quote */}
                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow italic">"{t.quote}"</p>
                    {/* Result tag */}
                    <div className="bg-white/[0.04] rounded-lg px-4 py-2.5 mb-6 border border-white/[0.06]">
                      <p className="text-xs font-medium text-[#00B0FF]">{t.result}</p>
                    </div>
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>{t.initials}</div>
                      <div>
                        <div className="text-white text-sm font-semibold">{t.name}</div>
                        <div className="text-gray-500 text-xs">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '2,500+', label: 'Happy Families' },
                { value: '98%', label: 'Parent Satisfaction' },
                { value: '35+', label: 'Countries' },
                { value: 'Forbes', label: 'Featured' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF] mb-1">{s.value}</div>
                  <div className="text-gray-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPLETE LEARNING ECOSYSTEM — White with Glass Cards ═══ */}
        <section className="py-28 bg-white relative overflow-hidden">
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
        <section className="py-28 bg-slate-950 relative overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

        {/* ═══ WHY PARENTS LOVE US — White with Accent Border Cards ═══ */}
        <section className="py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Why Parents & Kids Love <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Orbit Student</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">More than business — we're building confidence, creativity, and a lifelong love of learning.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Presentation, title: 'Real-World Confidence', desc: 'From TED-style talks to investor pitches, kids learn to lead and inspire.', gradient: 'from-[#1876D2] to-[#00B0FF]' },
                { icon: Brain, title: 'Entrepreneurial Mindset', desc: 'Solve real problems, build real products, and pitch to real investors.', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
                { icon: Rocket, title: 'Future-Ready Skills', desc: 'Master AI, money, and marketing — skills for life, not just school.', gradient: 'from-emerald-400 to-teal-500' },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                  <div className="relative rounded-2xl p-8 bg-gray-50 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl transition-all duration-500 h-full">
                    <div className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${p.gradient} mb-6 shadow-lg`}>
                      <p.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SUCCESS STORIES — Dark Masonry ═══ */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[50%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Award className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-gray-400">Success Stories</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                What Parents & Kids <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Are Saying</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">Join thousands of families who've watched their children transform.</p>
            </motion.div>

            {/* Image */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
              <div className="relative rounded-2xl overflow-hidden max-w-2xl mx-auto border border-white/[0.06]">
                <img src="/images/hero/testimonial-bg.jpg" alt="Young entrepreneurs celebrating" className="w-full h-auto" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Amanda K.', role: 'Mom of 12-year-old Emma', quote: 'My daughter used to be so shy, but after starting her sticker business through Orbit Student, she\'s presenting to her entire school!', initials: 'AK', color: 'from-[#1876D2] to-[#00B0FF]' },
                { name: 'Tyler J.', role: '10-year-old Entrepreneur', quote: 'I never thought I could start my own business at 10, but now I sell my handmade bracelets online! The AI coach helped me figure out pricing.', initials: 'TJ', color: 'from-emerald-400 to-teal-500' },
                { name: 'Michael T.', role: 'Dad of 14-year-old Jayden', quote: 'The gamified lessons kept my son engaged while teaching him real business skills. He\'s learning concepts I didn\'t understand until college!', initials: 'MT', color: 'from-[#00B0FF] to-[#40C4FF]' },
              ].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col">
                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>{t.initials}</div>
                      <div>
                        <div className="text-white text-sm font-semibold">{t.name}</div>
                        <div className="text-gray-500 text-xs">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GLOBAL DREAMERS — White with Pillar Cards ═══ */}
        <section className="py-28 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Global Dreamers</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Empowering students from Class 2nd to 11th with tools, knowledge, and pathways to thrive on the world stage.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Globe, title: 'Global Awareness', desc: 'International programs & cultures', gradient: 'from-[#1876D2] to-[#1565C0]' },
                { icon: Target, title: 'Opportunity Discovery', desc: 'Scholarships, Olympiads & more', gradient: 'from-[#1876D2] to-[#00B0FF]' },
                { icon: Rocket, title: 'Skill Building', desc: 'Writing, research & critical thinking', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
                { icon: Target, title: 'Future Roadmaps', desc: 'Personalized plans for admissions', gradient: 'from-emerald-400 to-teal-500' },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group">
                  <div className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl transition-all duration-500 h-full text-center">
                    <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${p.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <p.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-sm">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ GLOBAL RESOURCES — Dark ═══ */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] bg-[#1876D2]/10 rounded-full filter blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Global Resources</span> Database
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">A curated database of opportunities to launch your global journey.</p>
            </motion.div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {[
                { icon: Award, label: 'Scholarships' },
                { icon: Trophy, label: 'Competitions' },
                { icon: Brain, label: 'AI Tools' },
                { icon: Users, label: 'Fellowships' },
              ].map((cat, i) => (
                <button key={i} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${i === 0 ? 'bg-white/10 text-white border border-white/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/[0.06]'}`}>
                  <cat.icon className="h-4 w-4" /> {cat.label}
                </button>
              ))}
            </div>

            {/* Resource cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {[
                { name: 'Yale YYGS', desc: 'Young Global Scholars program', color: 'text-[#00B0FF]' },
                { name: 'Rise by Schmidt Futures', desc: 'Global scholarship for young leaders', color: 'text-white' },
                { name: 'John Locke Essay', desc: 'International essay competition', color: 'text-emerald-400' },
                { name: 'Ashoka Youth Ventures', desc: 'For young social entrepreneurs', color: 'text-amber-400' },
                { name: 'Google Science Fair', desc: 'STEM competition ages 13-18', color: 'text-white' },
                { name: 'Conrad Challenge', desc: 'Innovation for global problems', color: 'text-[#40C4FF]' },
              ].map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                    <h3 className={`text-sm font-bold ${r.color} mb-1`}>{r.name}</h3>
                    <p className="text-gray-500 text-xs">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button onClick={() => setShowEnrollment(true)} className="group px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]">
                <span className="flex items-center gap-2">
                  Access Full Database
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-gray-500 mt-3 text-xs">Join 2,500+ students accessing global opportunities</p>
            </div>
          </div>
        </section>

        {/* ═══ STATS — White Minimal ═══ */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: '2,500+', l: 'Young Entrepreneurs' },
                { v: '98%', l: 'Parent Satisfaction' },
                { v: '180', l: 'Day Program' },
                { v: '24/7', l: 'AI Support' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="text-4xl font-bold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">{s.v}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA — Dark Cinematic ═══ */}
        <section className="py-28 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-[#1876D2]/8 rounded-full filter blur-[150px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-400">Limited — Only 30 Spots Left</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Don't Let Your Child Fall Behind
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">While Others Get Ahead</span>
              </h2>

              <p className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                While other kids are just consuming content, your child could be building confidence, leadership, and an entrepreneurial mindset that lasts a lifetime.
              </p>

              {/* Urgency strip */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
                {[{ v: '30', l: 'Spots Left' }, { v: '7', l: 'Days Left' }, { v: '$200', l: 'Savings' }].map((u, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <div className="text-xl font-bold text-amber-400">{u.v}</div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{u.l}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button onClick={() => setShowEnrollment(true)} className="group px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]">
                  <span className="flex items-center gap-2">
                    Secure Your Child's Spot Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  Download Free Guide
                </button>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" /> 30-day money-back guarantee</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#00B0FF]/70" /> 2,500+ happy families</span>
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-400/70" /> Forbes featured</span>
              </div>
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