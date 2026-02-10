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
  Trophy
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

        {/* Parent Testimonials & Social Proof */}
        <section className="py-20 bg-gradient-to-r from-[#F5F9FC] to-[#E3F2FD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full px-6 py-2 mb-6">
                <span className="text-emerald-700 font-semibold">Real Parent Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                "My Child is a Different Person"
              </h2>
              <p className="text-xl text-gray-600">See the transformations that make parents proud</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah Chen"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=Sarah+Chen&background=e5e7eb&color=374151&size=64';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                    <p className="text-gray-600 text-sm">Mother of Emma (12)</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Emma went from being too shy to order food to confidently pitching business ideas to our neighbors! The transformation is incredible."
                </p>
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-emerald-700">
                    🎯 Result: Started a pet-sitting business, earning $500/month
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src="/images/avatars/student-2.jpg"
                    alt="Michael Rodriguez"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Rodriguez</h4>
                    <p className="text-gray-600 text-sm">Father of Diego (14)</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Diego now thinks like an entrepreneur. He sees opportunities everywhere and has developed incredible leadership skills."
                </p>
                <div className="bg-[#E3F2FD] rounded-xl p-4">
                  <p className="text-sm font-semibold text-[#1876D2]">
                    🎯 Result: Led school fundraising, raised $2,000 for charity
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src="/images/avatars/student-4.jpg"
                    alt="Jennifer Park"
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Jennifer Park</h4>
                    <p className="text-gray-600 text-sm">Mother of Alex (13)</p>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Best investment we ever made. Alex is now mentoring other kids and speaking at school events with confidence!"
                </p>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-700">
                    🎯 Result: Became student council president, launched school app
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#1876D2] mb-2">2,500+</div>
                  <div className="text-gray-600">Happy Families</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Parent Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">35+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600 mb-2">Forbes</div>
                  <div className="text-gray-600">Featured</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider 1 - Hero to Features */}
        <div className="relative w-full overflow-hidden">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f9fafb"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#f9fafb"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f9fafb"></path>
          </svg>
        </div>

        {/* Live Interactive Learning Section */}
        <section className="py-20 bg-gradient-to-br from-[#1876D2] via-[#1565C0] to-[#00B0FF] text-white relative overflow-hidden">
          {/* Background decoration - optimized */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 via-blue-400/10 to-teal-400/10 rounded-full filter blur-3xl opacity-40"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-emerald-300 font-semibold">Complete Learning Ecosystem</span>
                </div>
                
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    AI-Powered Learning
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                      Meets Real Mentorship
                    </span>
              </h2>
                  <p className="text-xl text-white/90 leading-relaxed">
                    Experience the perfect blend of cutting-edge AI tools, on-demand recorded sessions, 
                    interactive business simulators, and live mentorship from industry experts—all designed 
                    to give your child every advantage in their entrepreneurial journey.
              </p>
            </div>
            
                {/* Learning Methods Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                </div>
                      <h3 className="text-lg font-bold text-white">AI-Powered Tools</h3>
                    </div>
                    <p className="text-white/80 text-sm">
                      24/7 AI business coach, pitch deck generator, and smart analytics for instant feedback and guidance.
                    </p>
              </div>
              
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                </div>
                      <h3 className="text-lg font-bold text-white">Live Expert Classes</h3>
                </div>
                    <p className="text-white/80 text-sm">
                      Interactive sessions with successful entrepreneurs, real-time Q&A, and collaborative learning.
                    </p>
                </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#00B0FF] to-[#40C4FF] rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-white" />
                </div>
                      <h3 className="text-lg font-bold text-white">Business Simulators</h3>
                </div>
                    <p className="text-white/80 text-sm">
                      Risk-free virtual environments to practice running businesses, making decisions, and learning from outcomes.
                    </p>
              </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <PlayCircle className="h-6 w-6 text-white" />
                </div>
                      <h3 className="text-lg font-bold text-white">Recorded Sessions</h3>
                </div>
                    <p className="text-white/80 text-sm">
                      Access hundreds of expert-led lessons anytime, with progress tracking and personalized recommendations.
                </p>
                </div>
              </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowEnrollment(true)}
                    className="group relative px-8 py-4 bg-[#1876D2] hover:bg-[#1565C0] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Start Learning Journey
                      <Rocket className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                  <button 
                    className="px-8 py-4 bg-white/10 hover:bg-slate-50/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 ease-out border-2 border-white/30 hover:border-white/50 backdrop-blur-sm hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Download Free Guide
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">100+</div>
                    <div className="text-sm text-white/80">AI-Powered Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-300">50+</div>
                    <div className="text-sm text-white/80">Live Sessions Monthly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-300">500+</div>
                    <div className="text-sm text-white/80">Recorded Lessons</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative">
                  <img 
                    src="/images/hero/journey-map.jpg" 
                    alt="Students collaborating in comprehensive learning environment with AI tools and live mentorship" 
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white/20 backdrop-blur-sm"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#1876D2]/5 to-[#00B0FF]/5"></div>
                  
                  {/* Clean corner accents */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center border border-white/30 hidden lg:flex">
                    <Brain className="h-4 w-4 text-white/80" />
                </div>
                </div>

                {/* Live indicator */}
                <div className="absolute top-6 left-6 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white font-medium text-sm">LIVE NOW</span>
              </div>

                {/* Feature badges */}
                <div className="absolute bottom-6 right-6 space-y-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                    AI-Powered
                </div>
                  <div className="bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                    Expert-Led
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Section Divider 3 - Live Classes to Roadmap */}
        <div className="relative w-full overflow-hidden">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>

        {/* Roadmap Section - Orbit Branding */}
        <section className="py-20 bg-gradient-to-br from-white via-[#F5F9FC] to-[#E3F2FD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Orbit Brand Hero Image */}
            <div className="mb-16 text-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto bg-gradient-to-br from-[#1876D2] to-[#00B0FF] p-1">
                <img 
                  src="/images/hero/orbit-kids-banner.jpg" 
                  alt="Orbit Student - Empowering Kids to Learn AI - orbitstudent.com" 
                  className="w-full h-auto rounded-2xl"
                  width="1200"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-3 rounded-full bg-[#E3F2FD]">
                <span className="text-[#1876D2] font-semibold text-lg">🚀 Step-by-Step Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Your Child's 180-Day Entrepreneurial Adventure
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Step-by-step guidance, from that first spark of an idea to launching a real business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Phase 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-[#1876D2]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discovery</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find your passion, spot opportunities, and dream big.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Problem Identification
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Market Research
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Idea Validation
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Idea to MVP</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Transform your ideas into tangible products or services.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Product Development
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Customer Feedback
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Prototype Testing
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Presentation className="h-8 w-8 text-[#1876D2]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Branding & Storytelling</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Create a unique brand identity and compelling story.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Visual Identity
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Brand Messaging
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Pitch Development
                  </div>
                </div>
              </div>

              {/* Phase 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-8 w-8 text-[#00B0FF]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Speaking & Presence</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Become a confident communicator and presenter.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Speech Techniques
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Presentation Skills
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Confidence Building
                  </div>
                </div>
              </div>

              {/* Phase 5 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Finance & Pitching</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Master money skills and pitch to potential investors.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Financial Planning
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Investor Decks
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Demo Day Preparation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider 3 - Roadmap to Why Choose Us */}
        <div className="relative w-full overflow-hidden bg-white">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0f172a"></path>
          </svg>
        </div>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Parents & Kids Love Orbit Student
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                More than business. We're building confidence, creativity, and a lifelong love of learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Presentation className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-World Confidence</h3>
                <p className="text-white/80">
                  From TED-style talks to investor pitches, kids learn to lead and inspire with confidence.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-[#00B0FF] rounded-xl flex items-center justify-center mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Entrepreneurial Mindset</h3>
                <p className="text-white/80">
                  Solve real problems, build real products, and pitch to real investors with guidance.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Future-Ready Skills</h3>
                <p className="text-white/80">
                  Master AI, money, and marketing—skills for life, not just for school success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider 4 - Why Choose Us to Success Stories */}
        <div className="relative w-full overflow-hidden">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f9fafb"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="#f9fafb"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#f9fafb"></path>
          </svg>
        </div>

        {/* Success Stories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-100">
                <span className="text-emerald-600 font-medium">Success Stories</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What Parents & Kids Are Saying
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of families who've watched their children transform into confident young entrepreneurs.
              </p>
            </div>

            {/* Success Stories Image */}
            <div className="mb-16 text-center">
              <img 
                src="/images/hero/testimonial-bg.jpg" 
                alt="Young entrepreneurs celebrating their success stories" 
                className="rounded-2xl shadow-xl max-w-2xl mx-auto w-full h-auto"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop&crop=face&v=2"
                    alt="Amanda K."
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Amanda K.</div>
                    <div className="text-sm text-gray-500">Mom of 12-year-old Emma</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "My daughter used to be so shy, but after starting her sticker business through Orbit Student, she's presenting to her entire school! The transformation has been incredible."
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="/images/avatars/student-1.jpg"
                    alt="Tyler J."
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Tyler J.</div>
                    <div className="text-sm text-gray-500">10-year-old Entrepreneur</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I never thought I could start my own business at 10, but now I sell my handmade bracelets online! The AI coach helped me figure out pricing and even make a logo."
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="/images/avatars/student-2.jpg"
                    alt="Michael T."
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Michael T.</div>
                    <div className="text-sm text-gray-500">Dad of 14-year-old Jayden</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The gamified lessons kept my son engaged while teaching him real business skills. He's learning concepts I didn't understand until college! Worth every penny."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Opportunities Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 relative overflow-hidden">
          {/* Background Elements - optimized */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#1876D2]/5 rounded-full filter blur-3xl opacity-40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Designed for 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                  Global Dreamers
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We empower students from Class 2nd to 11th with the tools, knowledge, and 
                pathways to thrive on the world stage.
              </p>
            </motion.div>

            {/* Four Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Global Awareness */}
              <motion.div 
                variants={fadeIn}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1876D2] to-[#1565C0] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Global Awareness</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn about international programs & cultures.
                </p>
              </motion.div>

              {/* Opportunity Discovery */}
              <motion.div 
                variants={fadeIn}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Opportunity Discovery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Find scholarships, Olympiads, global universities.
                </p>
              </motion.div>

              {/* Skill Building */}
              <motion.div 
                variants={fadeIn}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#00B0FF] to-[#0091EA] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Rocket className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Skill Building</h3>
                <p className="text-gray-600 leading-relaxed">
                  Build writing, research, critical thinking, communication.
                </p>
              </motion.div>

              {/* Future Roadmaps */}
              <motion.div 
                variants={fadeIn}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Future Roadmaps</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get personalized plans for exams, admissions & more.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Resources Database Section */}
        <section className="py-20 bg-gradient-to-br from-[#1876D2] to-[#00B0FF] text-white relative overflow-hidden">
          {/* Background Effects - optimized */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">Global Resources</span> Database
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                A curated database of opportunities to launch your global journey.
              </p>
            </motion.div>

            {/* Resource Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 ease-out hover:scale-105 flex items-center shadow-md">
                <Award className="h-5 w-5 mr-2" />
                Scholarships
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-slate-50/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 ease-out hover:scale-105 border border-white/30 hover:border-white/50 flex items-center shadow-md hover:shadow-lg">
                <Trophy className="h-5 w-5 mr-2" />
                Competitions
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-slate-50/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 ease-out hover:scale-105 border border-white/30 hover:border-white/50 flex items-center shadow-md hover:shadow-lg">
                <Brain className="h-5 w-5 mr-2" />
                AI Tools
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-slate-50/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 ease-out hover:scale-105 border border-white/30 hover:border-white/50 flex items-center shadow-md hover:shadow-lg">
                <Users className="h-5 w-5 mr-2" />
                Global Fellowships
              </button>
            </div>

            {/* Scholarship Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Row 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Yale YYGS</h3>
                <p className="text-white/80 text-sm">Young Global Scholars program for high school students</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-white mb-2">Rise by Schmidt Futures</h3>
                <p className="text-white/80 text-sm">Global scholarship for exceptional young leaders</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">John Locke Essay</h3>
                <p className="text-white/80 text-sm">International essay competition for young thinkers</p>
              </div>

              {/* Row 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-amber-300 mb-2">Ashoka Youth Ventures</h3>
                <p className="text-white/80 text-sm">Support for young social entrepreneurs worldwide</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-white mb-2">Google Science Fair</h3>
                <p className="text-white/80 text-sm">Global science competition for students aged 13-18</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Conrad Challenge</h3>
                <p className="text-white/80 text-sm">Innovation challenge for students to solve global problems</p>
              </div>
            </div>

            {/* CTA for Database Access */}
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
                <button 
                onClick={() => setShowEnrollment(true)}
                className="group relative px-12 py-5 bg-white text-[#1876D2] font-semibold rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Access Full Database
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              <p className="text-white/70 mt-4 text-sm">
                Join 2,500+ students already accessing global opportunities
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section Divider 5 - Success Stories to Stats */}
        <div className="relative w-full overflow-hidden">
          <svg className="w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#0F172A"></path>
          </svg>
        </div>

        {/* Stats Section */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">2,500+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Young Entrepreneurs</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00B0FF] to-[#40C4FF]">98%</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Parent Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#40C4FF] to-[#1876D2]">180</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Day Program</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">24/7</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section with Urgency */}
        <section className="py-20 bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-900 text-white relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#1876D2]/10 rounded-full filter blur-3xl opacity-30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/10">
                <span className="text-white/90 font-semibold text-sm">Limited Time — Only 30 Spots Left</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                Don't Let Your Child Fall Behind While Others Get Ahead
            </h2>
              
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                While other kids are just consuming content, your child could be building 
                <strong> confidence, leadership skills, and an entrepreneurial mindset</strong> that lasts a lifetime.
              </p>

              {/* Urgency indicators */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">30</div>
                    <div className="text-sm opacity-80">Spots Remaining</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">7</div>
                    <div className="text-sm opacity-80">Days Left</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-300">$200</div>
                    <div className="text-sm opacity-80">Early Bird Savings</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => setShowEnrollment(true)}
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] overflow-hidden"
              >
                  <span className="relative z-10 flex items-center justify-center">
                    Secure Your Child's Spot Now
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
              </button>
                
              <button 
                  className="px-8 py-6 bg-white/10 hover:bg-slate-50/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300 ease-out border-2 border-white/30 hover:border-white/50 backdrop-blur-sm hover:scale-105 shadow-md hover:shadow-lg"
              >
                  Download Free Guide
              </button>
            </div>

              {/* Guarantee & Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm opacity-80">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-emerald-300" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-300" />
                  <span>2,500+ happy families</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-300" />
                  <span>Forbes featured program</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lead Capture CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#F5F9FC] to-[#E3F2FD] dark:from-gray-800 dark:via-gray-900 dark:to-black">
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

        {/* Secondary CTA for Email Signup */}
        <section className="py-16 bg-white dark:bg-gray-900">
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