import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Clock, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import PageHero from '../components/common/PageHero';
import { useLeadCapture } from '../hooks/useLeadCapture';

const SUBJECT_OPTIONS = [
  { value: '', label: 'Topic' },
  { value: 'enrollment', label: 'Programme enrolment' },
  { value: 'information', label: 'General question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Technical support' },
  { value: 'other', label: 'Other' },
] as const;

const Contact = () => {
  const { captureContactForm } = useLeadCapture();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const out = await captureContactForm(
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: formData.subject || undefined,
          message: formData.message.trim(),
        },
        'contact_form'
      );

      if (!out?.leadId || !out.supabaseOk) {
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@orbitstudent.com', 'support@orbitstudent.com'],
    },
    {
      icon: Clock,
      title: 'Reply time',
      details: ['Within 24 hours', 'Mon–Sat · 9am–6pm IST'],
    },
    {
      icon: MapPin,
      title: 'Team',
      details: ['Remote-first', 'Delhi NCR, India'],
    },
  ];

  return (
    <>
      <SEO
        title="Contact Orbit Student | Get in Touch — Support & Inquiries"
        description="Contact Orbit Student for support, enrollment, or partnership inquiries. Email hello@orbitstudent.com. We reply within 24 hours."
        keywords={[
          'contact Orbit Student',
          'Orbit Student support',
          'Orbit Student email',
          'Orbit Student phone',
          'Orbit Student help',
          'Orbit Student enrollment',
          'reach Orbit Student',
          'Orbit Student customer service',
        ]}
        url="https://www.orbitstudent.com/contact"
      />

      <div className="min-h-screen bg-o-0 text-o-0">
        <PageHero
          eyebrow="Contact"
          title="Let's"
          italic="talk."
          subtitle="Questions about enrolment or the programme? We read every message."
          align="center"
          size="sm"
        />

        <section className="border-o-t bg-o-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                  className="card-o px-4 py-4 sm:px-5 sm:py-5"
                >
                  <card.icon className="h-4 w-4 text-[#00B0FF] mb-3" />
                  <p className="text-[15px] font-medium text-o-0 mb-1" style={{ letterSpacing: '-0.005em' }}>
                    {card.title}
                  </p>
                  {card.details.map((d, j) => (
                    <p key={j} className="text-[13px] text-o-2 leading-snug">
                      {d}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-o border-o-t bg-o-0 pb-16 sm:pb-24">
          <div className="max-w-lg mx-auto w-full px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="card-o p-5 sm:p-8">
                <p className="eyebrow-o mb-2">Enquiry</p>
                <h2 className="font-display text-[clamp(1.35rem,4.5vw,1.85rem)] text-o-0 mb-1" style={{ letterSpacing: '-0.025em' }}>
                  Quick message
                </h2>
                <p className="text-[13px] sm:text-[14px] text-o-2 mb-6 sm:mb-7">One short form — we’ll reply by email.</p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-8 sm:py-10">
                    <div
                      className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
                    >
                      <CheckCircle className="h-5 w-5 text-[#10b981]" />
                    </div>
                    <p className="text-[17px] font-medium text-o-0 mb-1" style={{ letterSpacing: '-0.005em' }}>
                      You’re all set.
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-o-2">Check your inbox — we’ll follow up within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full min-h-[48px] px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-xl text-o-0 placeholder:text-o-3 text-[16px] sm:text-[15px] transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          inputMode="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full min-h-[48px] px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-xl text-o-0 placeholder:text-o-3 text-[16px] sm:text-[15px] transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
                          Phone <span className="text-o-3 font-normal normal-case tracking-normal">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full min-h-[48px] px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-xl text-o-0 placeholder:text-o-3 text-[16px] sm:text-[15px] transition-colors"
                          placeholder="+91 …"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
                        Topic
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full min-h-[48px] px-3.5 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-xl text-o-0 text-[16px] sm:text-[15px] transition-colors appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238a8f98'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        }}
                      >
                        {SUBJECT_OPTIONS.map((opt) =>
                          opt.value === '' ? (
                            <option key={opt.value} value="">
                              {opt.label}
                            </option>
                          ) : (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[11px] font-medium text-o-1 mb-1.5 font-mono uppercase tracking-[0.08em]">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full min-h-[120px] px-3.5 py-3 bg-o-2 border border-[var(--o-border-1)] hover:border-[var(--o-border-2)] focus:border-[#1876D2] focus:outline-none rounded-xl text-o-0 placeholder:text-o-3 text-[16px] sm:text-[15px] transition-colors resize-y"
                        placeholder="A sentence or two is enough."
                      />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-o btn-o-primary w-full min-h-[52px] text-[15px]">
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send
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
