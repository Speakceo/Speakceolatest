import React, { useState, Suspense, lazy, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Shield, Star, Users, Rocket } from 'lucide-react';

const LeadCaptureForm = lazy(() => import('./forms/LeadCaptureForm'));

interface CTAWithLeadCaptureProps {
  source: string;
  ctaType: string;
  buttonText?: string;
  title?: string;
  subtitle?: string;
  formTitle?: string;
  formSubtitle?: string;
  fields?: ('name' | 'email' | 'phone' | 'message' | 'parentName' | 'studentName' | 'childAge')[];
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const CTAWithLeadCapture: React.FC<CTAWithLeadCaptureProps> = ({
  source,
  ctaType,
  buttonText = 'Get Started',
  title = "Ready to Transform Your Child's Future?",
  subtitle = "Join thousands of parents who've unlocked their child's entrepreneurial potential",
  formTitle = 'Get Started Today',
  formSubtitle = "We'll confirm cohort availability within 24 hours.",
  fields = ['parentName', 'email', 'phone', 'childAge'],
  className = '',
  variant = 'primary',
  size: _size = 'md',
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  const isSecondary = variant === 'secondary';

  return (
    <>
      <div className={`relative ${className}`}>
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: isSecondary
              ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
              : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          <div className="relative px-5 py-7 sm:px-8 sm:py-9 text-center">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4"
              style={{
                background: isSecondary ? 'rgba(24,118,210,0.08)' : 'rgba(255,255,255,0.06)',
                border: isSecondary ? '1px solid rgba(24,118,210,0.15)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Sparkles className={`h-3 w-3 ${isSecondary ? 'text-[#1876D2]' : 'text-[#00B0FF]'}`} />
              <span className={`text-[11px] font-medium ${isSecondary ? 'text-[#1876D2]' : 'text-gray-300'}`}>
                Free demo · Limited seats
              </span>
            </div>

            <h2
              className={`text-xl sm:text-2xl font-bold mb-2 tracking-tight leading-snug max-w-lg mx-auto ${
                isSecondary ? 'text-gray-900' : 'text-white'
              }`}
            >
              {title}
            </h2>

            <p className={`max-w-md mx-auto text-sm mb-5 ${isSecondary ? 'text-gray-500' : 'text-gray-400'}`}>
              {subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-5">
              {[
                { icon: Shield, label: '30-day guarantee', color: 'text-emerald-400' },
                { icon: Users, label: '2,500+ families', color: 'text-[#00B0FF]' },
                { icon: Star, label: '4.9/5', color: 'text-amber-400' },
              ].map((trust, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 text-[11px] ${isSecondary ? 'text-gray-500' : 'text-gray-400'}`}
                >
                  <trust.icon className={`h-3 w-3 ${trust.color}`} />
                  <span>{trust.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold text-sm rounded-xl shadow-md shadow-[#1876D2]/20 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF]/50 transition-opacity"
            >
              <Rocket className="h-4 w-4" />
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p className={`text-[10px] mt-3 ${isSecondary ? 'text-gray-400' : 'text-gray-500'}`}>
              No payment to book · Reply within 24 hours
            </p>
          </div>
        </div>
      </div>

      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div className="relative max-w-sm w-full max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <span id="lead-modal-title" className="sr-only">
              {formTitle}
            </span>

            <Suspense
              fallback={
                <div className="rounded-2xl border border-white/10 bg-slate-900 px-6 py-10 text-center text-gray-400 text-sm">
                  Loading…
                </div>
              }
            >
              <LeadCaptureForm
                source={source}
                ctaType={ctaType}
                title={formTitle}
                subtitle={formSubtitle}
                fields={fields}
                buttonText="Book free demo"
                onSuccess={() => {}}
                className="w-full"
                compact
              />
            </Suspense>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CTAWithLeadCapture;
