import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, CheckCircle, Sparkles, ArrowRight, Shield, Star, Rocket, Gift } from 'lucide-react';
import { useLeadCapture } from '../../hooks/useLeadCapture';

interface LeadCaptureFormProps {
  source: string;
  ctaType: string;
  title?: string;
  subtitle?: string;
  fields?: ('name' | 'email' | 'phone' | 'message' | 'parentName' | 'studentName' | 'childAge')[];
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

function formatSubmitErr(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message;
  }
  return 'Something went wrong. Please try again.';
}

function isValidOptionalPhone(phone: string): boolean {
  if (!phone.trim()) return true;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

const FloatingInput = memo(function FloatingInput({
  icon: Icon,
  label,
  type = 'text',
  value,
  onChange,
  error,
  name: _name,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative group">
      <div className={`relative rounded-2xl transition-all duration-200 ${
        error ? 'ring-2 ring-red-500/50' : focused ? 'ring-2 ring-[#1876D2]/50' : ''
      }`}>
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          focused ? 'text-[#1876D2]' : 'text-gray-400'
        }`}>
          <Icon className="h-4 w-4" />
        </div>

        <label
          className={`absolute left-11 transition-all duration-200 pointer-events-none ${
            focused || hasValue
              ? 'top-2 text-[10px] font-bold ' + (error ? 'text-red-400' : 'text-[#1876D2]')
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
          }`}
        >
          {label}
        </label>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full pl-11 pr-4 pt-6 pb-2 bg-white/[0.04] border rounded-2xl text-white text-sm font-medium focus:outline-none transition-colors duration-200 ${
            error ? 'border-red-500/50' : 'border-white/[0.08] hover:border-white/[0.15] focus:border-[#1876D2]/50'
          }`}
        />

        <div
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] rounded-full origin-center transition-transform duration-200"
          style={{ transform: focused ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-red-400 text-xs mt-1.5 pl-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

const SuccessParticles = memo(function SuccessParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        i,
        left: `${(i * 17 + 9) % 86 + 7}%`,
        top: `${(i * 23 + 13) % 70 + 8}%`,
        y: -40 - (i % 5) * 12,
        x: ((i % 4) - 1.5) * 28,
        color: ['#1876D2', '#00B0FF', '#FBBF24', '#10B981', '#EC4899'][i % 5],
        delay: i * 0.07,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
          }}
          initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, p.y],
            x: [0, p.x],
          }}
          transition={{
            duration: 1.4,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
});

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  ctaType,
  title = "Get Started Today",
  subtitle = "Fill out the form and we'll get back to you within 24 hours!",
  fields = ['name', 'email', 'phone', 'message'],
  buttonText = "Submit",
  onSuccess,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    parentName: '',
    studentName: '',
    childAge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cloudSyncNote, setCloudSyncNote] = useState<string | null>(null);

  const { captureLead } = useLeadCapture();
  const prefersReducedMotion = useReducedMotion();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (fields.includes('name') && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (fields.includes('email') && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (fields.includes('email') && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (fields.includes('phone') && formData.phone && !isValidOptionalPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (or leave blank)';
    }
    if (fields.includes('parentName') && !formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, _form: '' }));
    setCloudSyncNote(null);
    try {
      const out = await captureLead({
        source,
        ctaType,
        formData: {
          name: formData.name || undefined,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          message: formData.message || undefined,
          parentName: formData.parentName || undefined,
          studentName: formData.studentName || undefined,
          childAge: formData.childAge || undefined
        }
      });

      if (!out?.leadId) {
        setErrors({ _form: 'Could not save your enquiry. Please try again or email contact@orbitstudent.com.' });
        return;
      }

      setIsSubmitted(true);
      setCloudSyncNote(
        out.supabaseOk
          ? null
          : (out.supabaseError ||
              'Saved on this device; the server did not confirm. If you need an immediate reply, email contact@orbitstudent.com.')
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to submit form:', error);
      setErrors({ _form: formatSubmitErr(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Success state — Celebration
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative rounded-3xl overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <SuccessParticles />
        <div className="relative px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/25">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="text-2xl font-bold text-white mb-2">You're In! 🎉</h3>
            <p className="text-gray-400 mb-4">
              Our team will reach out within 24 hours to get {formData.studentName || formData.name || formData.parentName || 'your child'} started on their journey.
            </p>
            {cloudSyncNote ? (
              <p className="text-amber-200/95 text-[13px] mb-6 max-w-md mx-auto bg-amber-500/10 border border-amber-500/25 rounded-xl py-2.5 px-3 leading-snug">
                {cloudSyncNote}
              </p>
            ) : null}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6"
          >
            {[
              { icon: '📞', label: 'Call within 24h' },
              { icon: '📋', label: 'Custom plan' },
              { icon: '🚀', label: 'Start learning' },
            ].map((step, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
                <span className="text-lg block mb-1">{step.icon}</span>
                <span className="text-gray-400 text-[10px] font-medium">{step.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-500 text-xs"
          >
            <Shield className="h-3 w-3 text-emerald-400" />
            <span>100% free consultation • No obligation</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Form
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]" />

      {/* Subtle background mesh */}
      <div className="absolute top-[-20%] right-[-15%] w-[40%] h-[40%] bg-[#1876D2]/8 rounded-full filter blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="relative px-7 py-8">
        {/* Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <Gift className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-bold text-amber-400">FREE Consultation Worth $200</span>
            </div>
          <h3 className="text-xl font-bold text-white mb-1.5">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors._form && (
            <p className="text-sm text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
              {errors._form}
            </p>
          )}
          {fields.includes('parentName') && (
            <FloatingInput icon={User} label="Parent / Guardian Name *" value={formData.parentName}
              onChange={(v) => handleInputChange('parentName', v)} error={errors.parentName} name="parentName" />
          )}

          {fields.includes('name') && (
            <FloatingInput icon={User} label="Your Name *" value={formData.name}
              onChange={(v) => handleInputChange('name', v)} error={errors.name} name="name" />
          )}

          {fields.includes('studentName') && (
            <FloatingInput icon={User} label="Student's Name" value={formData.studentName}
              onChange={(v) => handleInputChange('studentName', v)} name="studentName" />
          )}

          {fields.includes('email') && (
            <FloatingInput icon={Mail} label="Email Address *" type="email" value={formData.email}
              onChange={(v) => handleInputChange('email', v)} error={errors.email} name="email" />
          )}

          {fields.includes('phone') && (
            <FloatingInput icon={Phone} label="Phone Number" type="tel" value={formData.phone}
              onChange={(v) => handleInputChange('phone', v)} error={errors.phone} name="phone" />
          )}

          {fields.includes('childAge') && (
            <div>
              <label className="text-[10px] font-bold text-[#1876D2] mb-1 block pl-1">Child's Age</label>
              <div className="flex gap-2 flex-wrap">
                {['6-8', '9-11', '12-14', '15-17', '18+'].map(age => (
                  <button key={age} type="button" onClick={() => handleInputChange('childAge', age)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      formData.childAge === age
                        ? 'bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white shadow-lg shadow-[#1876D2]/25'
                        : 'bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {age} yrs
                  </button>
                ))}
              </div>
            </div>
          )}

          {fields.includes('message') && (
            <div className="relative">
              <div className="absolute left-4 top-4 text-gray-400">
                <MessageSquare className="h-4 w-4" />
              </div>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={3}
                placeholder="Tell us about your goals..."
                className="w-full pl-11 pr-4 py-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#1876D2]/50 focus:ring-2 focus:ring-[#1876D2]/20 transition-colors duration-200 resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className="relative w-full py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold rounded-2xl shadow-xl shadow-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/40 transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            {!prefersReducedMotion && !isSubmitting ? (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent"
                initial={false}
                animate={{ x: ['-120%', '120%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
              />
            ) : null}

            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5" />
                  <span>{buttonText}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </form>

        {/* Trust footer */}
        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-emerald-400" /> Secure</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" /> 4.9/5 rated</span>
            <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-[#00B0FF]" /> 2,500+ families</span>
          </div>
          <p className="text-[10px] text-gray-600">
            By submitting, you agree to our privacy policy. No spam, ever.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadCaptureForm;
