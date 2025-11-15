import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
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

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  ctaType,
  title = "Get Started Today",
  subtitle = "Fill out the form below and we'll get back to you soon!",
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

  const { captureLead } = useLeadCapture();

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

    if (fields.includes('phone') && formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (fields.includes('parentName') && !formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🎯 Form submission started');
    console.log('Form data:', formData);
    console.log('Required fields:', fields);
    
    if (!validateForm()) {
      console.log('❌ Form validation failed:', errors);
      return;
    }

    console.log('✅ Form validation passed');
    setIsSubmitting(true);

    try {
      // Capture the lead
      console.log('📝 Capturing lead with data:', {
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
      
      const leadId = await captureLead({
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

      if (leadId) {
        console.log('🎉 Lead captured successfully! ID:', leadId);
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            parentName: '',
            studentName: '',
            childAge: ''
          });
        }, 3000);
      } else {
        console.log('❌ Lead capture returned no ID');
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
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

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-lg shadow-lg p-8 text-center ${className}`}
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We've received your information and will get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-lg p-8 ${className}`}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.includes('parentName') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.parentName}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.parentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter parent's name"
              />
            </div>
            {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
          </div>
        )}

        {fields.includes('name') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
        )}

        {fields.includes('studentName') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter student's name"
              />
            </div>
          </div>
        )}

        {fields.includes('email') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        )}

        {fields.includes('phone') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        )}

        {fields.includes('childAge') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Child's Age
            </label>
            <select
              value={formData.childAge}
              onChange={(e) => handleInputChange('childAge', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select age range</option>
              <option value="6-8">6-8 years</option>
              <option value="9-11">9-11 years</option>
              <option value="12-14">12-14 years</option>
              <option value="15-17">15-17 years</option>
              <option value="18+">18+ years</option>
            </select>
          </div>
        )}

        {fields.includes('message') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your goals and interests..."
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              {buttonText}
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </motion.div>
  );
};

export default LeadCaptureForm;
