import React, { useState } from 'react';
import { CheckCircle, Shield, Loader2 } from 'lucide-react';
import { useLeadCapture } from '../../hooks/useLeadCapture';

export type LeadField = 'name' | 'email' | 'phone' | 'message' | 'parentName' | 'studentName' | 'childAge';

interface LeadCaptureFormProps {
  source: string;
  ctaType: string;
  title?: string;
  subtitle?: string;
  /** Defaults to competitor-style: name + phone + email (+ optional age chips) */
  fields?: LeadField[];
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
  /** Tighter padding and placeholder-first controls (modals / LPs) */
  compact?: boolean;
}

function formatSubmitErr(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (e && typeof e === 'object' && 'message' in e && typeof (e as { message: unknown }).message === 'string') {
    return (e as { message: string }).message;
  }
  return 'Something went wrong. Please try again.';
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

const AGE_CHIPS = ['6-8', '9-11', '12-14', '15-17', '18+'] as const;

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  ctaType,
  title = 'Book a free demo',
  subtitle = 'Counsellor calls within 24 hours · No payment',
  fields = ['parentName', 'phone', 'email', 'childAge'],
  buttonText = 'Book free demo',
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
    ? 'w-full h-11 px-3.5 bg-white/[0.06] border border-white/[0.12] rounded-lg text-white text-[16px] sm:text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#00B0FF]/70 focus:ring-1 focus:ring-[#00B0FF]/25'
    : 'w-full min-h-[48px] px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white text-[16px] sm:text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#1876D2]/60 focus:ring-1 focus:ring-[#1876D2]/30';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (fields.includes('name') && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (fields.includes('parentName') && !formData.parentName.trim()) {
      newErrors.parentName = 'Name is required';
    }
    if (fields.includes('email') && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (fields.includes('email') && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    // Phone required in compact/competitor mode when present in fields
    if (fields.includes('phone')) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'WhatsApp / phone is required';
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Enter a valid phone number';
      }
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
            'Could not save. Try again or email hello@orbitstudent.com.',
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
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={`relative overflow-hidden border border-white/[0.08] ${compact ? 'rounded-xl' : 'rounded-2xl'} ${className}`}
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)' }}
      >
        <div className={`relative text-center ${compact ? 'px-4 py-7' : 'px-6 py-10 sm:px-8'}`}>
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Demo requested</h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            We&apos;ll call or WhatsApp within 24 hours
            {formData.parentName || formData.name ? ` — ${formData.parentName || formData.name}` : ''}.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-gray-500 text-[10px]">
            <Shield className="h-3 w-3 text-emerald-400" />
            <span>Free · No payment</span>
          </div>
        </div>
      </div>
    );
  }

  const showAge = fields.includes('childAge');

  return (
    <div
      className={`relative overflow-hidden border border-white/[0.08] ${compact ? 'rounded-xl' : 'rounded-2xl'} ${className}`}
      style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)' }}
    >
      {!compact && <div className="h-0.5 bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]" />}

      <div className={`relative ${compact ? 'px-4 pt-4 pb-4' : 'px-5 py-6 sm:px-7 sm:py-8'}`}>
        <div className={`text-center ${compact ? 'mb-3' : 'mb-6'}`}>
          {!compact && (
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/90 mb-1">
              Free consultation
            </p>
          )}
          <h3 className={`font-bold text-white ${compact ? 'text-[15px] mb-0.5' : 'text-lg sm:text-xl mb-0.5'}`}>
            {title}
          </h3>
          <p className={`text-gray-400 leading-snug ${compact ? 'text-[11px]' : 'text-xs'}`}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className={compact ? 'space-y-2' : 'space-y-3.5'} noValidate>
          {errors._form && (
            <p className="text-[11px] text-red-300 text-center bg-red-500/10 border border-red-500/25 rounded-lg py-1.5 px-2.5">
              {errors._form}
            </p>
          )}

          {/* Competitor-style: stacked placeholders, no label clutter */}
          <div className={compact ? 'space-y-2' : 'space-y-3.5'}>
            {fields.includes('parentName') && (
              <div>
                {!compact && (
                  <label htmlFor="lcf-parent" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Parent name *
                  </label>
                )}
                <input
                  id="lcf-parent"
                  autoComplete="name"
                  placeholder={compact ? 'Parent name *' : undefined}
                  aria-label="Parent name"
                  value={formData.parentName}
                  onChange={(e) => handleField('parentName', e.target.value)}
                  className={inputClass}
                />
                {errors.parentName && <p className="text-red-400 text-[10px] mt-0.5">{errors.parentName}</p>}
              </div>
            )}

            {fields.includes('name') && (
              <div>
                {!compact && (
                  <label htmlFor="lcf-name" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Your name *
                  </label>
                )}
                <input
                  id="lcf-name"
                  autoComplete="name"
                  placeholder={compact ? 'Your name *' : undefined}
                  aria-label="Your name"
                  value={formData.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-0.5">{errors.name}</p>}
              </div>
            )}

            {fields.includes('phone') && (
              <div>
                {!compact && (
                  <label htmlFor="lcf-phone" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    WhatsApp / Phone *
                  </label>
                )}
                <input
                  id="lcf-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={compact ? 'WhatsApp / phone *' : undefined}
                  aria-label="WhatsApp or phone"
                  value={formData.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  className={inputClass}
                />
                {errors.phone && <p className="text-red-400 text-[10px] mt-0.5">{errors.phone}</p>}
              </div>
            )}

            {fields.includes('email') && (
              <div>
                {!compact && (
                  <label htmlFor="lcf-email" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wider">
                    Email *
                  </label>
                )}
                <input
                  id="lcf-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={compact ? 'Email *' : undefined}
                  aria-label="Email"
                  value={formData.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-0.5">{errors.email}</p>}
              </div>
            )}

            {fields.includes('studentName') && (
              <div>
                <input
                  id="lcf-student"
                  placeholder={compact ? 'Child name (optional)' : 'Student name'}
                  aria-label="Student name"
                  value={formData.studentName}
                  onChange={(e) => handleField('studentName', e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>

          {showAge && (
            <div>
              <p className={`text-gray-500 mb-1.5 ${compact ? 'text-[10px]' : 'text-[10px] uppercase tracking-wider font-medium'}`}>
                Child&apos;s age <span className="text-gray-600">(optional)</span>
              </p>
              <div className="flex gap-1 flex-wrap">
                {AGE_CHIPS.map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => handleField('childAge', formData.childAge === age ? '' : age)}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold border transition-colors ${
                      formData.childAge === age
                        ? 'bg-[#1876D2] border-[#1876D2] text-white'
                        : 'bg-white/[0.04] border-white/[0.1] text-gray-400 hover:bg-white/[0.08]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          )}

          {fields.includes('message') && (
            <textarea
              id="lcf-msg"
              rows={2}
              value={formData.message}
              onChange={(e) => handleField('message', e.target.value)}
              placeholder="Anything we should know? (optional)"
              className={`${inputClass} resize-none min-h-[56px] py-2`}
            />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg font-semibold text-white bg-gradient-to-r from-[#1876D2] to-[#00B0FF] hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF]/50 disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              compact ? 'h-11 text-sm mt-1' : 'min-h-[48px] text-[15px] rounded-xl'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Booking…
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>

        <p className={`text-center text-gray-500 ${compact ? 'mt-2 text-[9px]' : 'mt-3 text-[10px]'}`}>
          Free demo · No spam · Reply in 24 hrs
        </p>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
