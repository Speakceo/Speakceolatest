import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Shield, Star, Users, Rocket, CheckCircle } from 'lucide-react';
import LeadCaptureForm from './forms/LeadCaptureForm';

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
  buttonText = "Get Started",
  title = "Ready to Transform Your Child's Future?",
  subtitle = "Join thousands of parents who've unlocked their child's entrepreneurial potential",
  formTitle = "Get Started Today",
  formSubtitle = "Fill out the form below and we'll get back to you within 24 hours!",
  fields = ['parentName', 'email', 'phone', 'studentName', 'childAge'],
  className = "",
  variant = 'primary',
  size = 'md'
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    // Keep modal open to show success state inside the form
  };

  return (
    <>
      {/* CTA Section — Premium Dark Card */}
      <div className={`relative ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: variant === 'secondary'
              ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
              : 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          }}
        >
          {/* Background effects */}
          {variant !== 'secondary' && (
            <>
              <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] bg-[#1876D2]/15 rounded-full filter blur-[80px]" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-[#00B0FF]/10 rounded-full filter blur-[60px]" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            </>
          )}

          <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: variant === 'secondary' ? 'rgba(24,118,210,0.08)' : 'rgba(255,255,255,0.06)',
                border: variant === 'secondary' ? '1px solid rgba(24,118,210,0.15)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Sparkles className={`h-4 w-4 ${variant === 'secondary' ? 'text-[#1876D2]' : 'text-[#00B0FF]'}`} />
              <span className={`text-sm font-medium ${variant === 'secondary' ? 'text-[#1876D2]' : 'text-gray-300'}`}>
                Limited Spots Available
              </span>
            </motion.div>

            {/* Title */}
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight ${
              variant === 'secondary' ? 'text-gray-900' : 'text-white'
            }`}>
              {title}
            </h2>

            {/* Subtitle */}
            <p className={`max-w-2xl mx-auto text-lg mb-10 ${
              variant === 'secondary' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {subtitle}
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { icon: Shield, label: '30-day guarantee', color: 'text-emerald-400' },
                { icon: Users, label: '2,500+ families', color: 'text-[#00B0FF]' },
                { icon: Star, label: '4.9/5 rating', color: 'text-amber-400' },
              ].map((trust, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm ${variant === 'secondary' ? 'text-gray-500' : 'text-gray-400'}`}>
                  <trust.icon className={`h-4 w-4 ${trust.color}`} />
                  <span>{trust.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold text-lg rounded-2xl shadow-xl shadow-[#1876D2]/25 hover:shadow-2xl hover:shadow-[#1876D2]/40 transition-all duration-500"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
              </div>
              <Rocket className="h-5 w-5 relative" />
              <span className="relative">{buttonText}</span>
              <ArrowRight className="h-5 w-5 relative group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <p className={`text-xs mt-4 max-w-lg mx-auto leading-relaxed ${
              variant === 'secondary' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No payment required to book • We confirm cohort seats within 24 hours • Free consultation included
            </p>
          </div>
        </motion.div>
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="relative max-w-md w-full"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white z-10 shadow-xl transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>

              {/* Lead Capture Form */}
              <LeadCaptureForm
                source={source}
                ctaType={ctaType}
                title={formTitle}
                subtitle={formSubtitle}
                fields={fields}
                buttonText="Submit"
                onSuccess={handleSuccess}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CTAWithLeadCapture;
