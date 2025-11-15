import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
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

  const getButtonClasses = () => {
    const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-offset-2";
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
    
    const variantClasses = {
      primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 focus:ring-green-500 shadow-lg hover:shadow-xl",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500"
    };
    
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  const handleSuccess = () => {
    setShowModal(false);
    
    // Optional: Redirect or show additional success message
    // window.location.href = '/thank-you';
  };

  return (
    <>
      {/* CTA Section */}
      <div className={`text-center ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <button
            onClick={() => setShowModal(true)}
            className={getButtonClasses()}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            {buttonText}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-md w-full"
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

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
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CTAWithLeadCapture;
