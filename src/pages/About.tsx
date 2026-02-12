import React, { useState } from 'react';
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
      />

      <div className="min-h-screen bg-white">
        {/* ═══ HERO — Dark ═══ */}
        <section className="pt-28 pb-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#00B0FF]/6 rounded-full filter blur-[80px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — Story */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                  <Sparkles className="h-4 w-4 text-[#00B0FF]" />
                  <span className="text-sm font-medium text-gray-400">The Story Behind Orbit</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  From One Child's Question to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">A Global Movement</span>
                </h1>

                <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-7 border border-white/[0.06] mb-8">
                  <Quote className="h-6 w-6 text-[#00B0FF] mb-4" />
                  <p className="text-gray-300 italic mb-3">
                    A curious 12-year-old named Aarav asked:
                  </p>
                  <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF] mb-4">
                    "Why don't we learn how to speak like leaders or build real businesses in school?"
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    That spark lit the idea behind Orbit — a platform built just for kids like Aarav. We believe every child is already a leader. All they need is the right space.
                  </p>
                </div>

                {/* What we created */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Mic, text: 'Public speaking through games' },
                    { icon: Lightbulb, text: 'Entrepreneurial thinking' },
                    { icon: Sparkles, text: 'AI & branding skills' },
                    { icon: Users, text: 'Real mentorship' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                      <item.icon className="h-4 w-4 text-[#00B0FF] flex-shrink-0" />
                      <span className="text-gray-400 text-xs">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — Image + floating badges */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="Children learning together"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
                {/* Floating badges */}
                <div className="absolute -bottom-4 -right-4 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-xl p-4 shadow-xl">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">98%</div>
                  <div className="text-gray-400 text-xs">Parent Satisfaction</div>
                </div>
                <div className="absolute -top-4 -left-4 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-xl p-3 shadow-xl flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span className="text-white text-xs font-semibold">Forbes Featured</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ STATS — White ═══ */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">Trusted by Families Worldwide</h2>
              <p className="text-gray-500">Real results that speak for themselves</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-xl hover:border-[#1876D2]/20 transition-all duration-500">
                    <div className={`w-11 h-11 mx-auto bg-gradient-to-br ${s.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                      <s.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{s.label}</div>
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
