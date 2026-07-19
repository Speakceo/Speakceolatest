import { motion } from 'framer-motion';
import { Rocket, Zap, TrendingUp, Sparkles, Brain, ArrowRight } from 'lucide-react';
import LottieAnimation from '../ui/LottieAnimation';

export default function FounderMindsetSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Build Your Digital Identity',
      description:
        'Create your own business, personal brand, or startup idea. Launch pages, websites, and landing pages that actually convert.',
      highlights: ['Personal Brand', 'Creator Economy', 'Digital Footprint', 'AI-Powered'],
      gradient: 'from-[#1876D2] to-[#00B0FF]',
      number: '01',
    },
    {
      icon: Rocket,
      title: 'Launch a Real Product',
      description:
        "Stop theorizing. Start shipping. Build and launch real products customers actually want. Learn MVP thinking and validate ideas fast.",
      highlights: ['MVP Thinking', 'Product Execution', 'Real Validation', 'Build → Launch'],
      gradient: 'from-[#00B0FF] to-[#40C4FF]',
      number: '02',
    },
    {
      icon: TrendingUp,
      title: 'Master Marketing',
      description:
        'Learn how to market yourself and your ideas. Master storytelling, growth basics, and ethical marketing with social media.',
      highlights: ['Growth Mindset', 'Content Strategy', 'Go-to-Market', 'Attention Economy'],
      gradient: 'from-[#40C4FF] to-[#1876D2]',
      number: '03',
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-o-0 border-o-t">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[45%] rounded-full filter blur-[120px]" style={{ background: 'var(--o-glow-a)' }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] rounded-full filter blur-[100px]" style={{ background: 'var(--o-glow-b)' }} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 'var(--o-grain-opacity)',
          backgroundImage: 'radial-gradient(circle, var(--o-grid-dot) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'var(--o-chip-bg)', border: '1px solid var(--o-border-1)' }}
          >
            <Brain className="h-4 w-4 text-[#00B0FF]" />
            <span className="text-sm font-medium text-o-2">The Future of Learning</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-o-0">Where Students Become </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#40C4FF]">
              Founders — Not Just Learners
            </span>
          </h2>

          <p className="text-lg text-o-2 max-w-2xl mx-auto leading-relaxed">
            Real business starts early. Students don&apos;t just learn concepts — they{' '}
            <span className="text-[#00B0FF] font-medium">build, launch, and market real things</span> using AI and
            modern tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-o relative h-full p-8 overflow-hidden">
                <div className="absolute top-4 right-6 text-6xl font-black text-o-0/5 select-none">{feature.number}</div>

                <div
                  className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-[#1876D2]/10`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-o-0 mb-3">{feature.title}</h3>
                <p className="text-o-2 mb-6 leading-relaxed text-sm">{feature.description}</p>

                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 rounded-md text-o-2 text-[11px] font-medium"
                      style={{ background: 'var(--o-chip-bg)', border: '1px solid var(--o-border-1)' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-24"
        >
          <div className="relative rounded-3xl overflow-hidden border border-[var(--o-border-1)] bg-o-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1876D2]/10 to-[#00B0FF]/5" />
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#1876D2]/10 rounded-full filter blur-[80px]" />

            <div className="relative grid md:grid-cols-2 gap-12 items-center p-10 md:p-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1876D2]/10 border border-[#1876D2]/20 mb-6">
                  <Zap className="h-3.5 w-3.5 text-[#00B0FF]" />
                  <span className="text-xs font-medium text-[#00B0FF]">AI-Native Generation</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold text-o-0 mb-5 leading-tight">
                  Students Use AI as a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                    Co-Builder
                  </span>
                </h3>

                <p className="text-o-2 text-base mb-8 leading-relaxed">
                  We don&apos;t teach AI theory. We teach students to use AI smartly to build real things — from
                  generating ideas to creating content, websites, and communication.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {['AI-First Learning', 'Human + AI Collab', 'Prompt Thinking', 'Future-Ready Skills'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                      style={{ background: 'var(--o-chip-bg)', border: '1px solid var(--o-border-1)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00B0FF]" />
                      <span className="text-o-1 text-xs font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1876D2]/10 rounded-full filter blur-[60px]" />
                  <LottieAnimation
                    src="/animations/robot.json"
                    className="w-full max-w-[300px] h-auto relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative rounded-3xl overflow-hidden border border-[var(--o-border-1)] bg-o-2 p-12 md:p-16">
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold text-o-0 mb-4 leading-tight">
                The Next Generation of Founders
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                  Won&apos;t Wait Till College
                </span>
              </h3>

              <p className="text-o-2 mb-10 max-w-xl mx-auto">
                Confidence is built by doing. OrbitStudent turns curiosity into capability, ideas into execution, and
                students into founders.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
                <button
                  type="button"
                  className="group px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    Start Building Today
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button type="button" className="btn-o btn-o-ghost px-8 py-4 h-auto rounded-xl font-semibold">
                  See Success Stories
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '500+', label: 'Products Launched' },
                  { value: '89%', label: 'Build Real Projects' },
                  { value: '10-18', label: 'Age Range' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                      {s.value}
                    </div>
                    <div className="text-o-3 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
