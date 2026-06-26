import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, Star, Trophy, X, ChevronRight, GraduationCap, Target, Brain,
  Sparkles, Mic, DollarSign, Users, Calendar, Lightbulb, TrendingUp,
  Heart, Gift, Clock, CheckCircle, ArrowRight, Phone, Mail, MapPin, User, Shield, Gamepad2, Zap
} from 'lucide-react';
import { createLead, LeadSource, getUTMParams } from '../lib/leads';
import { motion, AnimatePresence } from 'framer-motion';
import { getNextBatchStartLabel } from '../utils/cohortDates';

interface EnrollmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Confetti for success state
function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: '-5%',
            backgroundColor: ['#1876D2', '#00B0FF', '#FBBF24', '#10B981', '#EC4899', '#8B5CF6'][i % 6],
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [(Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: i * 0.06,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

export default function EnrollmentPopup({ isOpen, onClose }: EnrollmentPopupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    parentName: '',
    age: '',
    email: '',
    phone: '',
    city: '',
    interests: [] as string[],
    aspirations: '',
    urgency: '',
    previousExperience: '',
    hearAboutUs: '',
    preferredContact: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  // Track time
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => setTimeSpent(prev => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const interests = [
    { id: 'business', label: 'Starting a Business', emoji: '🚀', color: 'from-[#1876D2] to-[#00B0FF]' },
    { id: 'leadership', label: 'Leadership Skills', emoji: '⭐', color: 'from-amber-400 to-orange-500' },
    { id: 'public-speaking', label: 'Public Speaking', emoji: '🎤', color: 'from-violet-500 to-purple-600' },
    { id: 'finance', label: 'Money Management', emoji: '💰', color: 'from-emerald-400 to-teal-500' },
    { id: 'innovation', label: 'Innovation & AI', emoji: '🧠', color: 'from-blue-400 to-indigo-500' },
    { id: 'tech', label: 'Technology & Apps', emoji: '💻', color: 'from-cyan-400 to-blue-500' },
    { id: 'marketing', label: 'Marketing & Sales', emoji: '📈', color: 'from-rose-400 to-pink-500' },
    { id: 'games', label: 'Business Games', emoji: '🎮', color: 'from-green-400 to-emerald-500' },
  ];

  const nextBatchLabel = getNextBatchStartLabel();

  const urgencyOptions = [
    { id: 'immediate', label: '🔥 Start This Week', subtext: `Next intake ${nextBatchLabel} — spots are limited`, tag: 'BEST VALUE', tagColor: 'bg-emerald-500' },
    { id: 'month', label: '📅 Within a Month', subtext: 'Planning and preparing to begin', tag: 'POPULAR', tagColor: 'bg-[#1876D2]' },
    { id: 'quarter', label: '⏰ Next 3 Months', subtext: 'Exploring options carefully' },
    { id: 'explore', label: '🔍 Just Exploring', subtext: 'Gathering information for now' },
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: {[key: string]: string} = {};
    if (currentStep === 1) {
      if (!formData.childName.trim()) newErrors.childName = "Your child's name is required";
      if (!formData.parentName.trim()) newErrors.parentName = 'Your name is required';
      if (!formData.age) newErrors.age = 'Age is required';
    }
    if (currentStep === 2) {
      if (formData.interests.length === 0) newErrors.interests = 'Pick at least one interest';
    }
    if (currentStep === 4) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.urgency) newErrors.urgency = 'Please select when to start';
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
      if (formData.phone && !/^[\+\(\)\s\-\d]{10,}$/.test(formData.phone)) newErrors.phone = 'Enter a valid phone';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateStep(step)) setStep(step + 1); };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    try {
      const utmParams = getUTMParams();
      await createLead({
        email: formData.email,
        name: formData.parentName,
        phone: formData.phone,
        child_name: formData.childName,
        child_age: parseInt(formData.age) || undefined,
        source: LeadSource.ENROLLMENT_POPUP,
        ...utmParams,
        notes: `CHILD: ${formData.childName} (Age ${formData.age}) | PARENT: ${formData.parentName} | CITY: ${formData.city} | INTERESTS: ${formData.interests.join(', ')} | ASPIRATIONS: ${formData.aspirations} | URGENCY: ${formData.urgency} | EXPERIENCE: ${formData.previousExperience} | HEARD: ${formData.hearAboutUs} | CONTACT: ${formData.preferredContact} | TIME: ${timeSpent}s`
      });
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          event_category: 'enrollment',
          event_label: 'enhanced_form_completion',
          value: 1,
        });
      }
      setStep(5);
    } catch (error) {
      console.error('Failed to submit enrollment:', error);
      alert('Something went wrong. Please try again or contact hello@orbitstudent.com');
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  const stepTitles = [
    '', // placeholder
    `Tell Us About Your Future CEO`,
    `What Excites ${formData.childName || 'Your Child'}?`,
    `${formData.childName || 'Your Child'}'s Dreams`,
    `Almost There! Let's Connect`,
    `Welcome to Orbit!`,
  ];

  const stepSubtitles = [
    '',
    "Let's personalize their entrepreneurial journey",
    "We'll customize learning based on their passions",
    'Understanding goals helps us build the perfect path',
    `We're excited to welcome ${formData.childName || 'your child'} to 2,500+ young entrepreneurs!`,
    '',
  ];

  const stepIcons = ['', '🎓', '🎯', '✨', '🚀', '🎉'];
  const stepColors = [
    '',
    'from-[#1876D2] to-[#00B0FF]',
    'from-violet-500 to-purple-600',
    'from-emerald-400 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-emerald-400 to-teal-500',
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Bg effects */}
          <div className="absolute top-[-15%] right-[-10%] w-[35%] h-[35%] bg-[#1876D2]/10 rounded-full filter blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#00B0FF]/8 rounded-full filter blur-[60px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {step === 5 && <Confetti />}

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1876D2] via-[#00B0FF] to-[#00BFA5]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Close */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white z-20 transition-colors"
          >
            <X className="h-4 w-4" />
          </motion.button>

          {/* Step indicators */}
          {step < 5 && (
            <div className="flex justify-center gap-2 pt-8 pb-2 relative z-10">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`flex items-center gap-1.5 ${i <= step ? '' : 'opacity-30'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    i < step ? 'bg-emerald-500 text-white' :
                    i === step ? 'bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white shadow-lg shadow-[#1876D2]/25' :
                    'bg-white/[0.06] text-gray-500'
                  }`}>
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                  </div>
                  {i < 4 && <div className={`w-6 h-[2px] rounded-full ${i < step ? 'bg-emerald-500' : 'bg-white/[0.06]'}`} />}
                </div>
              ))}
            </div>
          )}

          <div className="relative z-10 px-6 sm:px-10 pb-8 pt-3">
            <AnimatePresence mode="wait">
              {/* ═══ Step Header (shared) ═══ */}
              {step <= 5 && (
                <motion.div
                  key={`header-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {step < 5 && (
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.4 }}
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stepColors[step]} mb-5 shadow-xl`}
                      >
                        <span className="text-3xl">{stepIcons[step]}</span>
                      </motion.div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{stepTitles[step]}</h2>
                      <p className="text-gray-400 text-sm max-w-md mx-auto">{stepSubtitles[step]}</p>
                    </div>
                  )}

                  {/* ═══ STEP 1: Child Info ═══ */}
                  {step === 1 && (
                    <div className="space-y-5 max-w-md mx-auto">
                      {/* Free badge */}
                      <div className="flex justify-center mb-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                          <Gift className="h-3.5 w-3.5 text-amber-400" />
                          <span className="text-xs font-bold text-amber-400">FREE Consultation Worth $200</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">Child's Name *</label>
                          <input type="text" placeholder="e.g. Alex" value={formData.childName}
                            onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-white/[0.04] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                              errors.childName ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] focus:ring-[#1876D2]/30 focus:border-[#1876D2]/50'
                            }`}
                          />
                          {errors.childName && <p className="text-red-400 text-xs mt-1">{errors.childName}</p>}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">Age *</label>
                          <select value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className={`w-full px-4 py-3.5 bg-white/[0.04] border rounded-xl text-white text-sm focus:outline-none focus:ring-2 transition-all appearance-none ${
                              errors.age ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] focus:ring-[#1876D2]/30 focus:border-[#1876D2]/50'
                            } ${!formData.age ? 'text-gray-500' : ''}`}
                          >
                            <option value="">Select</option>
                            {Array.from({ length: 13 }, (_, i) => i + 6).map(age => (
                              <option key={age} value={age}>{age} years</option>
                            ))}
                          </select>
                          {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">Your Name *</label>
                        <input type="text" placeholder="Parent / Guardian name" value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          className={`w-full px-4 py-3.5 bg-white/[0.04] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.parentName ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] focus:ring-[#1876D2]/30 focus:border-[#1876D2]/50'
                          }`}
                        />
                        {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">City</label>
                        <input type="text" placeholder="Your city" value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1876D2]/30 focus:border-[#1876D2]/50 transition-all"
                        />
                      </div>

                      {/* Social proof */}
                      <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/[0.04]">
                        {[
                          { value: '2,500+', label: 'Students', icon: Users },
                          { value: '98%', label: 'Satisfaction', icon: Heart },
                          { value: '4.9/5', label: 'Rating', icon: Star },
                        ].map((s, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">{s.value}</div>
                            <div className="text-[9px] text-gray-500 uppercase tracking-wider">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ═══ STEP 2: Interests ═══ */}
                  {step === 2 && (
                    <div className="space-y-5 max-w-lg mx-auto">
                      <div className="grid grid-cols-2 gap-3">
                        {interests.map((interest, i) => {
                          const isSelected = formData.interests.includes(interest.id);
                          return (
                            <motion.button
                              key={interest.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                const newInterests = isSelected
                                  ? formData.interests.filter(id => id !== interest.id)
                                  : [...formData.interests, interest.id];
                                setFormData({ ...formData, interests: newInterests });
                              }}
                              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                                isSelected
                                  ? 'bg-gradient-to-br from-[#1876D2]/20 to-[#00B0FF]/10 border-[#1876D2]/50 shadow-lg shadow-[#1876D2]/10'
                                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.1]'
                              }`}
                            >
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1876D2] flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                              <span className="text-2xl block mb-2">{interest.emoji}</span>
                              <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{interest.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="text-center">
                        <span className="text-xs text-gray-500">{formData.interests.length} selected • Pick as many as you like</span>
                      </div>
                      {errors.interests && <p className="text-red-400 text-xs text-center">{errors.interests}</p>}
                    </div>
                  )}

                  {/* ═══ STEP 3: Goals ═══ */}
                  {step === 3 && (
                    <div className="space-y-5 max-w-md mx-auto">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">
                          What does {formData.childName || 'your child'} dream of achieving?
                        </label>
                        <textarea
                          placeholder="e.g. Start their own app company, win a business competition, get into a top university..."
                          value={formData.aspirations}
                          onChange={(e) => setFormData({ ...formData, aspirations: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all resize-none"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">
                          Previous entrepreneurship experience?
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { val: 'none', label: '🆕 Complete beginner', desc: 'No experience yet — perfect!' },
                            { val: 'school', label: '📚 School projects', desc: 'Done some school-level activities' },
                            { val: 'small', label: '🍋 Small ventures', desc: 'Lemonade stand, crafts sales, etc.' },
                            { val: 'programs', label: '🎓 Other programs', desc: 'Attended camps or courses' },
                            { val: 'advanced', label: '🚀 Already building!', desc: 'Has a running business' },
                          ].map(opt => (
                            <button key={opt.val}
                              onClick={() => setFormData({ ...formData, previousExperience: opt.val })}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                                formData.previousExperience === opt.val
                                  ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                              }`}
                            >
                              <span className="text-lg shrink-0">{opt.label.split(' ')[0]}</span>
                              <div className="min-w-0">
                                <p className={`text-sm font-medium ${formData.previousExperience === opt.val ? 'text-white' : 'text-gray-300'}`}>
                                  {opt.label.substring(opt.label.indexOf(' ') + 1)}
                                </p>
                                <p className="text-[10px] text-gray-500">{opt.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">How did you find us?</label>
                        <select value={formData.hearAboutUs}
                          onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                          className="w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all appearance-none"
                        >
                          <option value="">Select an option</option>
                          <option value="google">Google Search</option>
                          <option value="social">Social Media</option>
                          <option value="friend">Friend / Family</option>
                          <option value="school">School / Teacher</option>
                          <option value="ad">Online Ad</option>
                          <option value="event">Event / Workshop</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* ═══ STEP 4: Contact & Urgency ═══ */}
                  {step === 4 && (
                    <div className="space-y-6 max-w-md mx-auto">
                      {/* Contact fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input type="email" placeholder="your@email.com" value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                                errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] focus:ring-amber-500/30 focus:border-amber-500/50'
                              }`}
                            />
                          </div>
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 mb-1 block pl-1 uppercase tracking-wider">Phone *</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <input type="tel" placeholder="+1 (555) 123-4567" value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={`w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                                errors.phone ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/[0.08] focus:ring-amber-500/30 focus:border-amber-500/50'
                              }`}
                            />
                          </div>
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Preferred contact */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block pl-1 uppercase tracking-wider">Preferred contact method</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'phone', label: 'Phone Call', icon: Phone, emoji: '📞' },
                            { id: 'email', label: 'Email', icon: Mail, emoji: '✉️' },
                          ].map(m => (
                            <button key={m.id}
                              onClick={() => setFormData({ ...formData, preferredContact: m.id })}
                              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                                formData.preferredContact === m.id
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                  : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:bg-white/[0.05]'
                              }`}
                            >
                              <span className="text-lg">{m.emoji}</span>
                              <span className="text-sm font-medium">{m.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* When to start */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 mb-2 block pl-1 uppercase tracking-wider">When would you like to start? *</label>
                        <div className="space-y-2">
                          {urgencyOptions.map(opt => (
                            <motion.button key={opt.id}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setFormData({ ...formData, urgency: opt.id })}
                              className={`relative w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                                formData.urgency === opt.id
                                  ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/5'
                                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                              }`}
                            >
                              {opt.tag && (
                                <span className={`absolute top-2 right-2 ${opt.tagColor} text-white text-[9px] font-bold px-2 py-0.5 rounded-full`}>{opt.tag}</span>
                              )}
                              <div>
                                <p className={`text-sm font-semibold ${formData.urgency === opt.id ? 'text-white' : 'text-gray-300'}`}>{opt.label}</p>
                                <p className="text-[10px] text-gray-500">{opt.subtext}</p>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        {errors.urgency && <p className="text-red-400 text-xs mt-1">{errors.urgency}</p>}
                      </div>
                    </div>
                  )}

                  {/* ═══ STEP 5: Success ═══ */}
                  {step === 5 && (
                    <div className="text-center py-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                      >
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/25">
                          <CheckCircle className="h-10 w-10 text-white" />
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Orbit! 🎉</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                          We're thrilled to have {formData.childName || 'your child'} join 2,500+ young entrepreneurs! Our team will reach out soon.
                        </p>
                      </motion.div>

                      {/* What's next */}
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 mb-8"
                      >
                        <h3 className="text-white font-bold mb-4">What Happens Next?</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { icon: '📞', step: '1', title: 'Personal Call', desc: 'Within 24 hours' },
                            { icon: '📋', step: '2', title: 'Custom Plan', desc: `For ${formData.childName || 'your child'}` },
                            { icon: '🚀', step: '3', title: 'Start Learning', desc: 'Begin the journey' },
                          ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.15 }}
                              className="text-center"
                            >
                              <span className="text-2xl block mb-2">{s.icon}</span>
                              <p className="text-white text-xs font-bold">{s.title}</p>
                              <p className="text-gray-500 text-[10px]">{s.desc}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                        className="space-y-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => navigate('/demo')}
                          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold rounded-2xl shadow-xl shadow-[#1876D2]/25 transition-all"
                        >
                          <Gamepad2 className="h-5 w-5" />
                          Try Our Interactive Demo
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                          Close this window
                        </button>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══ Navigation Buttons ═══ */}
            {step < 5 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center justify-between"
              >
                <button
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    step === 1
                      ? 'opacity-0 cursor-default'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  ← Back
                </button>

                <span className="text-[10px] text-gray-600">Step {step} of 4</span>

                <motion.button
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => step === 4 ? handleSubmit() : handleNext()}
                  disabled={isSubmitting}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-bold rounded-xl shadow-lg shadow-[#1876D2]/20 hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      <span className="text-sm">Submitting...</span>
                    </>
                  ) : step === 4 ? (
                    <>
                      <span className="text-sm">Submit</span>
                      <Trophy className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm">Continue</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
