import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    { icon: Mail, title: 'Email Us', details: ['contact@orbitstudent.com', 'support@orbitstudent.com'], gradient: 'from-[#1876D2] to-[#00B0FF]' },
    { icon: Clock, title: 'Response Time', details: ['Within 24 hours', 'Mon–Sat, 9am–6pm IST'], gradient: 'from-[#00B0FF] to-[#40C4FF]' },
    { icon: MapPin, title: 'Headquarters', details: ['Global Remote Team', 'Delhi NCR, India'], gradient: 'from-emerald-400 to-teal-500' },
  ];

  return (
    <>
      <SEO
        title="Contact Orbit Student | Get in Touch — Support & Inquiries"
        description="Contact Orbit Student for support, enrollment, or partnership inquiries. Email hello@orbitstudent.com. We reply within 24 hours."
        keywords={['contact Orbit Student', 'Orbit Student support', 'Orbit Student email', 'Orbit Student phone', 'Orbit Student help', 'Orbit Student enrollment', 'reach Orbit Student', 'Orbit Student customer service']}
        url="https://www.orbitstudent.com/contact"
      />

      <div className="min-h-screen bg-white">
        {/* ═══ HERO — Dark ═══ */}
        <section className="pt-28 pb-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-[#1876D2]/8 rounded-full filter blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <Send className="h-4 w-4 text-[#00B0FF]" />
                <span className="text-sm font-medium text-gray-400">Get in Touch</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Talk</span>
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Have questions about Orbit Student? We're here to help you start your child's entrepreneurial journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ CONTACT CARDS — White ═══ */}
        <section className="py-16 bg-white relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-16 relative z-10">
              {contactCards.map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} mb-4 shadow-md`}>
                      <card.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                    {card.details.map((d, j) => <p key={j} className="text-gray-500 text-sm">{d}</p>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FORM — Light bg ═══ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Send us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">Fill out the form and we'll respond within 24 hours.</p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you — we'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all"
                          placeholder="John Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all"
                          placeholder="john@example.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all">
                        <option value="">Select a subject</option>
                        <option value="enrollment">Program Enrollment</option>
                        <option value="information">General Information</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1876D2]/50 focus:ring-1 focus:ring-[#1876D2]/50 text-sm transition-all resize-none"
                        placeholder="Your message here..." />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] shadow-lg shadow-[#1876D2]/25 hover:shadow-xl hover:shadow-[#1876D2]/40 transition-all duration-300 hover:scale-[1.01] disabled:opacity-50">
                      {isSubmitting ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="h-4 w-4" /> Send Message</>}
                    </button>

                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
