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
import LottieAnimation from '../components/ui/LottieAnimation';
import AnimatedHero3D from '../components/ui/AnimatedHero3D';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import Marquee from '../components/ui/Marquee';
import TextReveal from '../components/ui/TextReveal';

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
        title="Orbit Student — #1 AI Learning Portal for Kids | Courses, AI Tools & Scholarships"
        description="Orbit Student — AI-powered learning portal for kids 8-18. Login to access AI tools, courses, live classes & scholarship prep. Join 2,500+ young entrepreneurs."
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
        {/* ═══ HERO SECTION — Premium Dark with Animated Gradient Mesh ═══ */}
        <section className="relative bg-slate-950 text-white overflow-hidden min-h-[70vh] sm:min-h-screen flex items-center pt-16">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0">
            <div className="absolute top-[-30%] left-[-15%] w-[55%] h-[55%] bg-[#1876D2]/25 rounded-full filter blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
            <div className="absolute bottom-[-25%] right-[-10%] w-[50%] h-[50%] bg-[#00B0FF]/20 rounded-full filter blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]" />
            <div className="absolute top-[40%] right-[30%] w-[25%] h-[25%] bg-[#40C4FF]/10 rounded-full filter blur-[80px] animate-[float_12s_ease-in-out_infinite]" />
          </div>

          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left: Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="text-center lg:text-left z-10"
              >
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-5 sm:mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">Join 2,500+ Young Entrepreneurs</span>
                </motion.div>
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-[1.15] tracking-tight">
                  <TextReveal text="Where Young Minds" className="text-white" delay={0.2} />
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#40C4FF]">
                    <TextReveal text="Become Future Leaders" delay={0.5} staggerDelay={0.06} />
                  </span>
                </h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Transform your child's potential into reality with our immersive 180-day journey. From idea to launch, we guide young entrepreneurs through every step.
                </motion.p>
                
                <motion.div 
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => setShowEnrollment(true)}
                    className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Check Courses
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button
                    onClick={() => setShowCareerGuide(true)}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    Download Free Guide
                  </button>
                </motion.div>

                {/* Stats — animated glass counters */}
                <motion.div variants={fadeIn} className="mt-8 sm:mt-14 grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { value: '2,500+', label: 'Students' },
                    { value: '180', label: 'Day Program' },
                    { value: '98%', label: 'Success Rate' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 sm:p-4 text-center backdrop-blur-sm group hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-500">
                      <AnimatedCounter value={stat.value} className="text-lg sm:text-2xl font-bold text-white" duration={2 + i * 0.3} />
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{stat.label}</div>
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

              {/* Mobile hero — Lottie rocket animation (compact) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-10 lg:hidden flex justify-center -mt-4"
              >
                <LottieAnimation
                  src="/animations/rocket.json"
                  className="w-40 h-40 sm:w-56 sm:h-56"
                />
              </motion.div>
            </div>
        </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
        </section>

        {/* ═══ SCROLLING TRUST MARQUEE ═══ */}
        <section className="py-3 sm:py-5 bg-slate-950 border-y border-white/[0.04] relative overflow-hidden">
          <Marquee speed={25} className="py-2">
            <div className="flex items-center gap-12 px-4">
              {[
                { text: '🏆 Award-Winning Platform', highlight: false },
                { text: '🌍 35+ Countries', highlight: false },
                { text: '⭐ 4.9/5 Parent Rating', highlight: true },
                { text: '🚀 2,500+ Students Enrolled', highlight: false },
                { text: '🎓 $2.9B+ Scholarships Mapped', highlight: true },
                { text: '🤖 100+ AI Tools', highlight: false },
                { text: '📺 500+ Expert-Led Lessons', highlight: false },
                { text: '🔒 30-Day Money-Back Guarantee', highlight: true },
                { text: '💡 180-Day Structured Program', highlight: false },
                { text: '👨‍🏫 Live Mentorship Sessions', highlight: false },
              ].map((item, i) => (
                <span key={i} className={`text-sm font-medium whitespace-nowrap ${item.highlight ? 'text-[#00B0FF]' : 'text-gray-500'}`}>
                  {item.text}
                </span>
              ))}
        </div>
          </Marquee>
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
        <section className="py-16 sm:py-28 bg-[#f8fafb] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
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

            {/* Interactive USP Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {[
                {
                  icon: '🎮',
                  title: '10 Business Games',
                  subtitle: 'Not watching. Playing.',
                  desc: 'From running a lemonade stand to trading across planets — kids learn pricing, investing, budgeting & pitching through addictive mini-games.',
                  stats: '10 games • 500+ XP',
                  color: 'from-violet-500 to-purple-600',
                  bg: 'bg-violet-50',
                  link: '/demo',
                },
                {
                  icon: '👑',
                  title: 'Startup Empire',
                  subtitle: 'Build a $10M company.',
                  desc: 'A full roleplay game with 6 stages, 24 missions — from idea generation to IPO. Real decisions, real consequences. Your child\'s first company starts here.',
                  stats: '6 stages • 24 missions',
                  color: 'from-amber-500 to-orange-600',
                  bg: 'bg-amber-50',
                  link: '/demo',
                },
                {
                  icon: '🤖',
                  title: 'AI Superpowers',
                  subtitle: '100+ AI tools at their fingertips.',
                  desc: 'AI Website Builder, AI Presentation Maker, AI Image Generator, AI Business Plan Writer — your child learns to command AI like a CEO.',
                  stats: '100+ tools • Unlimited use',
                  color: 'from-blue-500 to-cyan-500',
                  bg: 'bg-blue-50',
                  link: '/demo',
                },
                {
                  icon: '🎯',
                  title: '180-Day Curriculum',
                  subtitle: 'Structured. Not random.',
                  desc: 'A proven path from beginner to confident young entrepreneur. Weekly tasks, live classes, mentorship — every day is designed to build real skills.',
                  stats: '180 days • 52 live classes',
                  color: 'from-emerald-500 to-teal-600',
                  bg: 'bg-emerald-50',
                  link: '/courses',
                },
                {
                  icon: '🌍',
                  title: 'Scholarship Database',
                  subtitle: 'Start early. Win big.',
                  desc: '500+ scholarships, competitions, and fellowships mapped for your child — filtered by age, country, and interest. Most parents don\'t know these exist.',
                  stats: '500+ opportunities',
                  color: 'from-blue-600 to-indigo-600',
                  bg: 'bg-indigo-50',
                  link: '/resources',
                },
                {
                  icon: '🏆',
                  title: 'Real Portfolio',
                  subtitle: 'Not certificates. Proof.',
                  desc: 'Your child builds websites, games, pitch decks, and business plans they can actually show to schools, competitions, and future employers.',
                  stats: '10+ portfolio pieces',
                  color: 'from-rose-500 to-pink-600',
                  bg: 'bg-rose-50',
                  link: '/about',
                },
              ].map((usp, i) => (
                <motion.a
                  key={i}
                  href={usp.link}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-3xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${usp.color}`} />
                  
                  <div className="p-7">
                    {/* Icon + stats */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl ${usp.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {usp.icon}
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{usp.stats}</span>
            </div>
            
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{usp.title}</h3>
                    <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${usp.color} mb-3" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }}>
                      {usp.subtitle}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">{usp.desc}</p>
                    
                    {/* Hover arrow */}
                    <div className="mt-5 flex items-center gap-2 text-[#1876D2] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

        {/* ═══ REAL PARENT STORIES — Dark Glass ═══ */}
        <section className="py-16 sm:py-28 bg-slate-950 relative overflow-hidden">
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

            {/* Trust bar — animated counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '2,500+', label: 'Happy Families' },
                { value: '98%', label: 'Parent Satisfaction' },
                { value: '35+', label: 'Countries' },
                { value: 'Forbes', label: 'Featured' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center hover:bg-white/[0.05] transition-all duration-500">
                  <AnimatedCounter value={s.value} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF] mb-1" duration={2} />
                  <div className="text-gray-500 text-xs">{s.label}</div>
                  </div>
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