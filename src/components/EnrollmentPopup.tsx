import React, { useEffect, Suspense, lazy } from 'react';
import { X } from 'lucide-react';

const LeadCaptureForm = lazy(() => import('./forms/LeadCaptureForm'));

interface EnrollmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Lightweight competitor-style lead capture (replaces the old multi-step wizard).
 * Name + WhatsApp + email — sales follows up; age is optional.
 */
export default function EnrollmentPopup({ isOpen, onClose }: EnrollmentPopupProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-title"
    >
      <div className="relative w-full max-w-[340px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white"
          aria-label="Close"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <span id="enrollment-title" className="sr-only">
          Book a free demo
        </span>

        <Suspense
          fallback={
            <div className="rounded-xl border border-white/10 bg-slate-900 px-5 py-10 text-center text-gray-400 text-sm">
              Loading…
            </div>
          }
        >
          <LeadCaptureForm
            source="enrollment_popup"
            ctaType="enrollment_popup_compact"
            title="Book a free demo"
            subtitle="We'll WhatsApp or call within 24 hours"
            fields={['parentName', 'phone', 'email', 'childAge']}
            buttonText="Get free demo"
            onSuccess={() => {
              /* keep success state visible; parent can close */
            }}
            className="w-full"
            compact
          />
        </Suspense>
      </div>
    </div>
  );
}
