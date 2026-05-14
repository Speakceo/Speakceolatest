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
  formSubtitle = "Fill out the form below and we'll get back to you within 24 hours!",
  fields = ['parentName', 'email', 'phone', 'studentName', 'childAge'],
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

  return (
    <>
      <div className={`relative ${className}`}>
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              variant === 'secondary'
                ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: variant === 'secondary' ? 'rgba(24,118,210,0.08)' : 'rgba(255,255,255,0.06)',
                border:
                  variant === 'secondary' ? '1px solid rgba(24,118,210,0.15)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Sparkles className={`h-4 w-4 ${variant === 'secondary' ? 'text-[#1876D2]' : 'text-[#00B0FF]'}`} />
              <span className={`text-sm font-medium ${variant === 'secondary' ? 'text-[#1876D2]' : 'text-gray-300'}`}>
                Limited spots available
              </span>
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight ${
                variant === 'secondary' ? 'text-gray-900' : 'text-white'
              }`}
            >
              {title}
            </h2>

            <p
              className={`max-w-2xl mx-auto text-lg mb-10 ${
                variant === 'secondary' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { icon: Shield, label: '30-day guarantee', color: 'text-emerald-400' },
                { icon: Users, label: '2,500+ families', color: 'text-[#00B0FF]' },
                { icon: Star, label: '4.9/5 rating', color: 'text-amber-400' },
              ].map((trust, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-sm ${variant === 'secondary' ? 'text-gray-500' : 'text-gray-400'}`}
                >
                  <trust.icon className={`h-4 w-4 ${trust.color}`} />
                  <span>{trust.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold text-lg rounded-2xl shadow-lg shadow-[#1876D2]/20 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B0FF]/50 transition-opacity"
            >
              <Rocket className="h-5 w-5" />
              <span>{buttonText}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <p
              className={`text-xs mt-4 max-w-lg mx-auto leading-relaxed ${
                variant === 'secondary' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              No payment required to book · We confirm cohort seats within 24 hours · Free consultation included
            </p>
          </div>
        </div>
      </div>

      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div className="relative max-w-md w-full">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute -top-2 -right-2 z-10 w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <span id="lead-modal-title" className="sr-only">
              {formTitle}
            </span>

            <Suspense
              fallback={
                <div className="rounded-2xl border border-white/10 bg-slate-900 px-8 py-16 text-center text-gray-400 text-sm">
                  Loading form…
                </div>
              }
            >
              <LeadCaptureForm
                source={source}
                ctaType={ctaType}
                title={formTitle}
                subtitle={formSubtitle}
                fields={fields}
                buttonText="Submit"
                onSuccess={() => {}}
                className="w-full"
              />
            </Suspense>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CTAWithLeadCapture;
