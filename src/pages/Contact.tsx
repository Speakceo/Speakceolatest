import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';

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

      <div className="min-h-screen bg-o-0 text-o-0">
        {/* ═══ HERO — unified Linear dark ═══ */}
        <PageHero
          eyebrow="Contact · Get in touch"
          title="Let's"
          italic="talk."
          subtitle="Have questions about Orbit Student? We reply within 24 hours, Monday–Saturday, 9am–6pm IST."
          align="center"
          size="sm"
        />

        {/* ═══ CONTACT CARDS — unified dark hairline ═══ */}
        <section className="border-o-t bg-o-0">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="card-o"
                >
                  <card.icon className="h-4 w-4 text-[#00B0FF] mb-5" />
                  <p className="text-[15.5px] font-medium text-o-0 mb-2" style={{ letterSpacing: '-0.005em' }}>{card.title}</p>
                  {card.details.map((d, j) => (
                    <p key={j} className="text-[13.5px] text-o-2 leading-[1.6]">{d}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FORM — unified dark ═══ */}
        <section className="section-o border-o-t bg-o-0">
          <div className="max-w-2xl mx-auto px-5 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="card-o" style={{ padding: '32px 32px 36px' }}>
                <p className="eyebrow-o mb-3">Send a message</p>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] text-o-0 mb-2" style={{ letterSpacing: '-0.025em' }}>
                  We'll respond within 24 hours.
                </h2>
                <p className="text-[14px] text-o-2 mb-8">Tell us what you're looking for — we read every message.</p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-5" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                      <CheckCircle className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <p className="text-[18px] font-medium text-o-0 mb-1.5" style={{ letterSpacing: '-0.005em' }}>Message sent.</p>
                    <p className="text-[14px] text-o-2">Thank you — we'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-[12px] font-medium text-o-1 mb-2 font-mono uppercase tracking-[0.08em]">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                          className="w-full h-11 px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-lg text-o-0 placeholder:text-o-3 text-[14px] transition-colors"
                          placeholder="Jane Doe" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[12px] font-medium text-o-1 mb-2 font-mono uppercase tracking-[0.08em]">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                          className="w-full h-11 px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-lg text-o-0 placeholder:text-o-3 text-[14px] transition-colors"
                          placeholder="jane@example.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-[12px] font-medium text-o-1 mb-2 font-mono uppercase tracking-[0.08em]">Subject</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                        className="w-full h-11 px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-lg text-o-0 text-[14px] transition-colors">
                        <option value="">Select a subject</option>
                        <option value="enrollment">Programme enrolment</option>
                        <option value="information">General information</option>
                        <option value="partnership">Partnership inquiry</option>
                        <option value="support">Technical support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[12px] font-medium text-o-1 mb-2 font-mono uppercase tracking-[0.08em]">Message</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                        className="w-full px-3.5 py-3 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-lg text-o-0 placeholder:text-o-3 text-[14px] transition-colors resize-none"
                        placeholder="Tell us what you're looking for..." />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-o btn-o-primary w-full">
                      {isSubmitting ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send message
                        </>
                      )}
                    </button>

                    {submitStatus === 'error' && (
                      <p className="text-[#ff4b4b] text-[13px] text-center">Something went wrong. Please try again.</p>
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
