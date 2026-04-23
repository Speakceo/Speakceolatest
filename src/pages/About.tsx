import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Award, Heart, Shield, Trophy, Zap, Globe2, CheckCircle,
  ArrowRight, Mic, Lightbulb, Sparkles, Quote
} from 'lucide-react';
import EnrollmentPopup from '../components/EnrollmentPopup';
import SEO from '../components/SEO';

const About = () => {
  const [showEnrollment, setShowEnrollment] = useState(false);

  const stats = [
    { label: 'Happy Families', value: '2,500+', icon: Heart, gradient: 'from-rose-400 to-pink-500' },
    { label: 'Success Rate', value: '98%', icon: Trophy, gradient: 'from-amber-400 to-orange-500' },
    { label: 'Countries', value: '35+', icon: Globe2, gradient: 'from-[#1876D2] to-[#00B0FF]' },
    { label: 'Expert Mentors', value: '50+', icon: Users, gradient: 'from-emerald-400 to-teal-500' },
  ];

  const achievements = [
    { title: 'Featured in Forbes', desc: '"Revolutionary approach to youth entrepreneurship"', year: '2024' },
    { title: 'EdTech Innovation Award', desc: 'Best Youth Development Platform', year: '2023' },
    { title: 'Parent Choice Gold', desc: 'Highest rated program for character development', year: '2023' },
  ];

  const parentWorries = [
    { worry: 'Will my child be too young?', answer: 'Our curriculum is designed for ages 8-16 with age-appropriate modules that grow with your child.', icon: Users },
    { worry: 'Is this just screen time?', answer: 'No! We focus on real-world application, hands-on projects, and building genuine confidence.', icon: Zap },
    { worry: 'What if my child is shy?', answer: 'Perfect! Many of our most successful students started as shy kids. We specialize in building confidence gradually.', icon: Heart },
    { worry: 'Is it worth the investment?', answer: 'Parents see results within 2 weeks. Plus, we offer a 30-day money-back guarantee.', icon: Shield },
  ];

  return (
    <>
      <SEO
        title="About Orbit Student | Our Mission to Transform Kids into Future Leaders"
        description="Orbit Student: AI-powered edtech platform for kids 8-18. Learn about our mission, team, and why 2,500+ families trust Orbit Student for entrepreneurship & AI education."
        keywords={['about Orbit Student', 'Orbit Student mission', 'Orbit Student team', 'Orbit Student story', 'who is Orbit Student', 'Orbit Student founder', 'Orbit Student review', 'AI edtech for kids', 'best edtech platform for kids', 'Orbit Student about us']}
        url="https://www.orbitstudent.com/about"
      />

      <div className="min-h-screen bg-white">
        {/* ═══ HERO — Apple dark split ═══ */}
        <section className="pt-28 pb-24 sm:pt-36 sm:pb-32 bg-[#050505] relative overflow-hidden">
          {/* Single restrained glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(24,118,210,0.07) 0%, transparent 100%)' }} />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-center">
              {/* Left — Story */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.25,0.1,0.25,1] }}>
                <p className="section-eyebrow text-[#1876D2] mb-6">The story behind Orbit</p>

                <h1 className="text-[clamp(2.4rem,5vw,4rem)] font-black text-white tracking-[-0.04em] leading-[0.95] mb-8">
                  From one child's<br />question to a<br />
                  <span className="text-[#1876D2]">global movement.</span>
                </h1>

                {/* Quote card — border-only, Apple dark */}
                <div className="card-apple-dark rounded-2xl p-7 mb-8">
                  <Quote className="h-5 w-5 text-[#1876D2] mb-4" />
                  <p className="text-[#6e6e73] text-[14px] mb-3 italic">A curious 12-year-old named Aarav asked:</p>
                  <p className="text-white text-[17px] font-semibold leading-snug mb-4">
                    "Why don't we learn how to speak like leaders or build real businesses in school?"
                  </p>
                  <p className="text-[#6e6e73] text-[14px] leading-[1.7]">
                    That question built Orbit — a platform for kids like Aarav. We believe every child is already a leader. They just need the right space.
                  </p>
                </div>

                {/* Feature grid — 2×2 border-only cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Mic, text: 'Public speaking through games' },
                    { icon: Lightbulb, text: 'Entrepreneurial thinking' },
                    { icon: Sparkles, text: 'AI & branding skills' },
                    { icon: Users, text: 'Real mentorship' },
                  ].map((item, i) => (
                    <div key={i} className="card-apple-dark rounded-xl p-4 flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-[#1876D2] flex-shrink-0" />
                      <span className="text-[#a1a1a6] text-[13px] font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — Image */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.65, ease: [0.25,0.1,0.25,1] }} className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08]">
                  <img
                    src="/images/hero/orbit-kids-banner.jpg"
                    alt="Children learning together at Orbit Student"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero/orbit-kids-laptop.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />
                </div>
                {/* Two small proof cards */}
                <div className="absolute -bottom-5 -right-5 bg-[#0d0d0d] border border-white/[0.10] rounded-2xl px-4 py-3.5">
                  <p className="text-[#1876D2] text-[20px] font-black leading-none">98%</p>
                  <p className="text-[#6e6e73] text-[11px] mt-1">Parent satisfaction</p>
                </div>
                <div className="absolute -top-5 -left-5 bg-[#0d0d0d] border border-white/[0.10] rounded-2xl px-4 py-3.5 flex items-center gap-2.5">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span className="text-white text-[13px] font-semibold">Forbes Featured</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ STATS — Apple light section ═══ */}
        <section className="section-apple bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="section-eyebrow mb-4">By the numbers</p>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#1d1d1f] tracking-[-0.03em] leading-tight">Trusted by families worldwide.</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <div className="card-apple p-7 text-center">
                    <div className={`w-10 h-10 mx-auto bg-gradient-to-br ${s.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <s.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[26px] font-black text-[#1d1d1f] tracking-[-0.02em]">{s.value}</div>
                    <div className="text-[#6e6e73] text-[12px] mt-1 font-medium">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {achievements.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl transition-all duration-500 h-full">
                    <Award className="h-5 w-5 text-[#1876D2] mb-3" />
                    <h3 className="text-base font-bold text-gray-900 mb-1">{a.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{a.desc}</p>
                    <span className="text-[#1876D2] text-xs font-bold">{a.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ MISSION — Dark ═══ */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[150px]" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                Orbit isn't just a class. It's an adventure in confidence.
              </p>
              <p className="text-gray-400 mb-10 leading-relaxed">
                From Delhi to Dubai, from small towns to big cities, our young CEOs are launching bake sales, eco-campaigns, sticker startups, and even podcasts.
              </p>
              <div className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-2xl p-8 text-left">
                <h3 className="text-white font-bold text-lg mb-2">Our mission is simple:</h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  Raise the next generation of speakers, thinkers, and doers — one confident child at a time.
                </p>
                <p className="text-white/70 mt-4 text-sm">
                  If your child has a voice, a dream, or just a spark — Orbit is where it begins.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ PARENT CONCERNS — White ═══ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">We Understand Your Concerns</h2>
              <p className="text-gray-500">Here's how we address what parents worry about most</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {parentWorries.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl transition-all duration-500 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0 shadow-md">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-2">"{item.worry}"</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA — Dark ═══ */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                Ready to Transform Your Child's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Future?</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-10">
                Join 2,500+ families who've already seen the confidence transformation. Your child's journey to leadership starts here.
              </p>
              <button onClick={() => setShowEnrollment(true)} className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.02]">
                Start Your Child's Transformation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-emerald-400/70" /> 30-day money-back guarantee</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-[#00B0FF]/70" /> 2,500+ happy families</span>
                <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-amber-400/70" /> Forbes featured</span>
              </div>
            </motion.div>
          </div>
        </section>

        {showEnrollment && <EnrollmentPopup isOpen={showEnrollment} onClose={() => setShowEnrollment(false)} />}
      </div>
    </>
  );
};

export default About;
