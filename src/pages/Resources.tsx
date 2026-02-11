import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Video, Book, Presentation, Globe, Target, Rocket, Award, Trophy, Brain, Users, ArrowRight, CheckCircle, ExternalLink, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import EnrollmentPopup from '../components/EnrollmentPopup';

const categories = ['All', 'Scholarships', 'Competitions', 'AI Tools', 'Fellowships', 'Templates', 'Guides'];

const globalOpportunities = [
  { name: 'Yale YYGS', desc: 'Young Global Scholars program for high school students', category: 'Scholarships', color: 'from-[#1876D2] to-[#00B0FF]' },
  { name: 'Rise by Schmidt Futures', desc: 'Global scholarship for exceptional young leaders', category: 'Scholarships', color: 'from-emerald-400 to-teal-500' },
  { name: 'John Locke Essay Competition', desc: 'International essay competition for young thinkers', category: 'Competitions', color: 'from-[#00B0FF] to-[#40C4FF]' },
  { name: 'Ashoka Youth Ventures', desc: 'Support for young social entrepreneurs worldwide', category: 'Fellowships', color: 'from-amber-400 to-orange-500' },
  { name: 'Google Science Fair', desc: 'Global STEM competition for students aged 13-18', category: 'Competitions', color: 'from-[#1876D2] to-[#1565C0]' },
  { name: 'Conrad Challenge', desc: 'Innovation challenge for students solving global problems', category: 'Competitions', color: 'from-[#40C4FF] to-[#1876D2]' },
  { name: 'Diamond Challenge', desc: 'Global entrepreneurship competition for high school students', category: 'Competitions', color: 'from-[#1876D2] to-[#00B0FF]' },
  { name: 'AEOP STEM Programs', desc: 'Army Educational Outreach Program for aspiring scientists', category: 'Fellowships', color: 'from-emerald-400 to-teal-500' },
  { name: 'ChatGPT for Students', desc: 'AI-powered writing, research and brainstorming assistant', category: 'AI Tools', color: 'from-[#00B0FF] to-[#40C4FF]' },
  { name: 'Canva for Education', desc: 'Free design tool for creating presentations and brands', category: 'AI Tools', color: 'from-[#1876D2] to-[#00B0FF]' },
  { name: 'DECA Competition', desc: 'International business and marketing competition for students', category: 'Competitions', color: 'from-amber-400 to-orange-500' },
  { name: 'QuestBridge Scholarship', desc: 'Full scholarships for outstanding low-income students', category: 'Scholarships', color: 'from-emerald-400 to-teal-500' },
];

const downloadableResources = [
  { title: 'Business Plan Template', desc: 'Comprehensive template for your first venture', type: 'template', format: 'PDF', size: '2.4 MB', popular: true },
  { title: 'Financial Projections Spreadsheet', desc: 'Easy-to-use Excel template for budgets', type: 'template', format: 'Excel', size: '1.8 MB', popular: true },
  { title: 'Marketing Strategy Guide', desc: 'Create and execute an effective marketing plan', type: 'guide', format: 'PDF', size: '3.2 MB', popular: false },
  { title: 'Pitch Deck Template', desc: 'Professional slide deck for investors', type: 'presentation', format: 'PPTX', size: '5.1 MB', popular: true },
  { title: 'Social Media Content Calendar', desc: 'Plan and organize your social media', type: 'template', format: 'Excel', size: '1.2 MB', popular: false },
  { title: "Young Entrepreneur's Guide", desc: 'Comprehensive ebook covering all aspects of starting up', type: 'ebook', format: 'PDF', size: '4.5 MB', popular: true },
];

const pillars = [
  { icon: Globe, title: 'Global Awareness', desc: 'International programs & cultures', gradient: 'from-[#1876D2] to-[#1565C0]' },
  { icon: Target, title: 'Opportunity Discovery', desc: 'Scholarships, Olympiads & more', gradient: 'from-[#1876D2] to-[#00B0FF]' },
  { icon: Rocket, title: 'Skill Building', desc: 'Writing, research & critical thinking', gradient: 'from-[#00B0FF] to-[#40C4FF]' },
  { icon: Lightbulb, title: 'Future Roadmaps', desc: 'Personalized plans for admissions', gradient: 'from-emerald-400 to-teal-500' },
];

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showEnrollment, setShowEnrollment] = useState(false);

  const filteredOpportunities = activeCategory === 'All'
    ? globalOpportunities
    : globalOpportunities.filter(o => o.category === activeCategory);

  return (
    <>
      <SEO
        title="Global Resources & Opportunities | Orbit Student"
        description="Access scholarships, competitions, AI tools, fellowships, and free templates to launch your global entrepreneurial journey."
        keywords={['scholarships for students', 'youth competitions', 'AI tools for students', 'business templates', 'global fellowships', 'young entrepreneurs']}
      />

      <div className="min-h-screen bg-white">
        {/* ═══ HERO — Dark ═══ */}
        <section className="pt-28 pb-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#00B0FF]/6 rounded-full filter blur-[80px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Globe className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Global Opportunities</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
                Designed for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Global Dreamers</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-14">
                Empowering students from Class 2nd to 11th with tools, knowledge, and pathways to thrive on the world stage.
              </p>

              {/* Pillar cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {pillars.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="group">
                    <div className="bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-6 text-center transition-all duration-500 h-full">
                      <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${p.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <p.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white text-sm font-bold mb-1">{p.title}</h3>
                      <p className="text-gray-500 text-xs">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ GLOBAL OPPORTUNITIES — White ═══ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Global Resources</span> Database
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">A curated database of opportunities to launch your global journey.</p>
            </motion.div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.filter(c => !['Templates', 'Guides'].includes(c)).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white border-transparent shadow-lg shadow-[#1876D2]/20'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#1876D2]/30 hover:text-[#1876D2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Opportunity cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOpportunities.map((o, i) => (
                <motion.div key={o.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="group">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#1876D2]/20 hover:shadow-xl transition-all duration-500 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${o.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">{o.name}</h3>
                        <p className="text-gray-500 text-sm">{o.desc}</p>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#1876D2]/5 text-[#1876D2] text-xs font-medium">{o.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ DOWNLOADABLE RESOURCES — Dark ═══ */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] bg-[#00B0FF]/8 rounded-full filter blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Download className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Free Downloads</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Templates & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Guides</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">Free tools to help you start and grow your entrepreneurial journey.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {downloadableResources.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1876D2] to-[#00B0FF] flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-bold">{r.title}</h3>
                        <p className="text-gray-500 text-xs">{r.format} · {r.size}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm flex-grow mb-4">{r.desc}</p>
                    <button className="flex items-center gap-2 text-[#00B0FF] hover:text-white text-sm font-medium transition-colors">
                      <Download className="h-4 w-4" /> Download
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

        {/* ═══ CTA ═══ */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #1876D2 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Need More Resources?</h2>
              <p className="text-gray-500 max-w-xl mx-auto mb-8">Check out our premium resources and tools available to enrolled students.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setShowEnrollment(true)} className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl shadow-lg shadow-[#1876D2]/25 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Get Full Access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-[#1876D2]/30 transition-all duration-300">
                  <ExternalLink className="h-4 w-4" /> Explore Courses
                </a>
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
