import React, { useState } from 'react';
import { CheckCircle, Shield } from 'lucide-react';
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
  /** Tighter padding and smaller controls for modals / homepage CTA */
  compact?: boolean;
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

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  ctaType,
  title = 'Get Started Today',
  subtitle = "We'll get back to you within 24 hours.",
  fields = ['name', 'email', 'phone'],
  buttonText = 'Submit',
  onSuccess,
  className = '',
  compact = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    parentName: '',
    studentName: '',
    childAge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { captureLead } = useLeadCapture();

  const inputClass = compact
    ? 'w-full min-h-[44px] px-3 py-2 bg-white/[0.04] border border-white/[0.1] rounded-lg text-white text-[16px] sm:text-[13px] placeholder:text-gray-500 focus:outline-none focus:border-[#1876D2]/60 focus:ring-1 focus:ring-[#1876D2]/30'
    : 'w-full min-h-[48px] px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-[16px] sm:text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#1876D2]/60 focus:ring-1 focus:ring-[#1876D2]/30';

  const labelClass = 'block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wider';

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
          childAge: formData.childAge || undefined,
        },
      });

      if (!out.leadId || !out.supabaseOk) {
        setErrors({
          _form:
            out.supabaseError ||
            'Could not save to our server. Check your connection and try again, or email contact@orbitstudent.com.',
        });
        return;
      }

      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit form:', error);
      setErrors({ _form: formatSubmitErr(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev, [field]: '' };
        return next;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden border border-white/[0.08] ${className}`}
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        }}
      >
        <div className={`relative text-center ${compact ? 'px-5 py-8' : 'px-6 py-10 sm:px-8'}`}>
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">You&apos;re in</h3>
          <p className="text-gray-400 text-sm mb-4">
            We&apos;ll reach out within 24 hours
            {formData.studentName || formData.name || formData.parentName
              ? ` about ${formData.studentName || formData.name || formData.parentName}`
              : ''}
            .
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-[11px]">
            <Shield className="h-3 w-3 text-emerald-400" />
            <span>Free consultation · No obligation</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-white/[0.08] ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    >
      <div className="h-0.5 bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]" />

      <div className={`relative ${compact ? 'px-4 py-5 sm:px-5' : 'px-5 py-6 sm:px-7 sm:py-8'}`}>
        <div className={`text-center ${compact ? 'mb-4' : 'mb-6'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/90 mb-1">
            Free consultation
          </p>
          <h3 className={`font-bold text-white mb-0.5 ${compact ? 'text-base' : 'text-lg sm:text-xl'}`}>{title}</h3>
          <p className="text-gray-400 text-xs leading-snug">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className={compact ? 'space-y-2.5' : 'space-y-3.5'}>
          {errors._form && (
            <p className="text-xs text-red-300 text-center bg-red-500/10 border border-red-500/25 rounded-lg py-2 px-3">
              {errors._form}
            </p>
          )}

          <div className={compact ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' : 'space-y-3.5'}>
            {fields.includes('parentName') && (
              <div className={!compact ? undefined : undefined}>
                <label htmlFor="lcf-parent" className={labelClass}>
                  Parent name *
                </label>
                <input
                  id="lcf-parent"
                  autoComplete="name"
                  value={formData.parentName}
                  onChange={(e) => handleField('parentName', e.target.value)}
                  className={inputClass}
                />
                {errors.parentName && <p className="text-red-400 text-[10px] mt-0.5">{errors.parentName}</p>}
              </div>
            )}

            {fields.includes('name') && (
              <div>
                <label htmlFor="lcf-name" className={labelClass}>
                  Your name *
                </label>
                <input
                  id="lcf-name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-0.5">{errors.name}</p>}
              </div>
            )}

            {fields.includes('studentName') && (
              <div>
                <label htmlFor="lcf-student" className={labelClass}>
                  Student name
                </label>
                <input
                  id="lcf-student"
                  value={formData.studentName}
                  onChange={(e) => handleField('studentName', e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            {fields.includes('email') && (
              <div className={compact && !fields.includes('studentName') && !fields.includes('name') ? 'sm:col-span-2' : undefined}>
                <label htmlFor="lcf-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="lcf-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
              </div>
            )}

            {fields.includes('phone') && (
              <div>
                <label htmlFor="lcf-phone" className={labelClass}>
                  Phone <span className="font-normal normal-case tracking-normal text-gray-500">(optional)</span>
                </label>
                <input
                  id="lcf-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  className={inputClass}
                />
                {errors.phone && <p className="text-red-400 text-[10px] mt-0.5">{errors.phone}</p>}
              </div>
            )}
          </div>

          {fields.includes('childAge') && (
            <div>
              <span className={labelClass}>Child&apos;s age</span>
              <div className="flex gap-1.5 flex-wrap">
                {['6-8', '9-11', '12-14', '15-17', '18+'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => handleField('childAge', age)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold border transition-colors ${
                      formData.childAge === age
                        ? 'bg-[#1876D2] border-[#1876D2] text-white'
                        : 'bg-white/[0.04] border-white/[0.1] text-gray-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {fields.includes('message') && (
            <div>
              <label htmlFor="lcf-msg" className={labelClass}>
                Message
              </label>
              <textarea
                id="lcf-msg"
                rows={compact ? 2 : 3}
                value={formData.message}
                onChange={(e) => handleField('message', e.target.value)}
                placeholder="Goals, questions…"
                className={`${inputClass} resize-y ${compact ? 'min-h-[64px]' : 'min-h-[96px]'}`}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-xl font-semibold text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] shadow-md shadow-[#1876D2]/20 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF]/50 disabled:opacity-45 disabled:cursor-not-allowed ${
              compact ? 'min-h-[44px] text-sm' : 'min-h-[48px] text-[15px]'
            }`}
          >
            {isSubmitting ? 'Sending…' : buttonText}
          </button>
        </form>

        <p className="mt-3 text-center text-[10px] text-gray-500">Privacy respected · No spam</p>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
