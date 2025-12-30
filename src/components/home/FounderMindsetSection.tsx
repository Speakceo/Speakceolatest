import { motion } from 'framer-motion';
import { Rocket, Zap, TrendingUp, Sparkles, Target, Users, Lightbulb, Brain } from 'lucide-react';

export default function FounderMindsetSection() {
  const features = [
    {
      icon: Sparkles,
      title: "Build Your Digital Identity",
      description: "Create your own business, personal brand, or startup idea. Launch Instagram pages, websites, and landing pages that actually convert.",
      highlights: ["Personal Brand", "Creator Economy", "Digital Footprint", "AI-Powered Building"],
      gradient: "from-[#1876D2] to-[#00B0FF]"
    },
    {
      icon: Rocket,
      title: "Launch a Real Product",
      description: "Stop theorizing. Start shipping. Build and launch real products customers actually want. Learn MVP thinking and validate ideas fast.",
      highlights: ["MVP Thinking", "Product Execution", "Real Validation", "Build → Launch → Learn"],
      gradient: "from-[#00B0FF] to-[#40C4FF]"
    },
    {
      icon: TrendingUp,
      title: "Master Marketing, Not Memorization",
      description: "Learn how to market yourself and your ideas. Use social media with intention. Master storytelling, growth basics, and ethical marketing.",
      highlights: ["Growth Mindset", "Content Strategy", "Go-to-Market", "Attention Economy"],
      gradient: "from-[#40C4FF] to-[#1876D2]"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-[#F5F9FC] to-[#E3F2FD]">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1876D2]/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00B0FF]/5 rounded-full filter blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#1876D2]/20 mb-6">
            <Brain className="h-4 w-4 text-[#1876D2]" />
            <span className="text-sm font-medium text-[#1876D2]">The Future of Learning</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Where Students Become </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#40C4FF]">
              Founders — Not Just Learners
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real business starts early. Students don't just learn concepts — they <span className="font-semibold text-[#1876D2]">build, launch, and market real things</span> using AI and modern tools. No exams. No theory. Just execution.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#E3F2FD] text-[#1876D2] text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1876D2]/0 to-[#00B0FF]/0 group-hover:from-[#1876D2]/5 group-hover:to-[#00B0FF]/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI-First Learning Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-20"
        >
          <div className="bg-gradient-to-br from-[#1876D2] to-[#00B0FF] rounded-3xl p-12 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Zap className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">AI-Native Generation</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Students Use AI as a Co-Builder
                </h3>

                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  We don't teach AI theory. We teach students to <span className="font-semibold">use AI smartly</span> to build real things. From generating ideas to creating content, websites, and communication — AI becomes their superpower, not their crutch.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {["AI-First Learning", "Human + AI Collaboration", "Prompt Thinking", "Future-Ready Skills"].map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                      <span className="text-white text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Visual */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-white" />
                      <div className="flex-1 h-3 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-white" />
                      <div className="flex-1 h-3 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-6 w-6 text-white" />
                      <div className="flex-1 h-3 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <span className="text-white/80 text-sm">AI Literacy + Execution = Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              The Next Generation of Founders
              <br />
              <span className="text-[#1876D2]">Won't Wait Till College</span>
            </h3>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Confidence is built by doing. OrbitStudent turns curiosity into capability, ideas into execution, and students into founders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-[#1876D2] hover:bg-[#00B0FF] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                Start Building Today
              </button>
              <button className="px-8 py-4 bg-white hover:bg-[#E3F2FD] text-[#1876D2] font-semibold rounded-xl transition-all duration-200 border-2 border-[#1876D2]">
                See Success Stories
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-[#1876D2] mb-2">500+</div>
                <div className="text-gray-600 text-sm">Products Launched</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1876D2] mb-2">89%</div>
                <div className="text-gray-600 text-sm">Build Real Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1876D2] mb-2">10-18</div>
                <div className="text-gray-600 text-sm">Age Range</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

