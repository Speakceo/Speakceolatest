import React, { useState, useEffect } from 'react';
import { 
  X, ArrowRight, ArrowLeft, Rocket, Target, Brain, Sparkles, 
  CheckCircle, RefreshCw, Lightbulb, Zap, Star, Heart, Trophy,
  Compass, GraduationCap, Gamepad2, Palette, Code, Mic, BookOpen,
  Users, Building2, Stethoscope, Pencil, FlaskConical, Monitor
} from 'lucide-react';
import CareerGuideResult from './CareerGuideResult';
import { generateCareerGuide } from '../../lib/api/career';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerGuidePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  studentName: string;
  age: string;
  grade: string;
  parentEmail: string;
  parentPhone: string;
  interests: string[];
  creativity: number;
  confidence: number;
  communication: number;
  leadership: number;
  problemSolving: number;
  teamwork: number;
  timeManagement: number;
  curiosity: number;
  futureAspiration: string;
  workEnvironment: 'indoors' | 'outdoors' | 'both';
  workStyle: 'with people' | 'alone' | 'both';
  problemApproach: 'building' | 'fixing' | 'both';
  learningStyle: string;
  favoriteSubject: string;
  challengingSubject: string;
  hasSoldCreated: boolean;
  excitedForCompany: boolean;
  invention: string;
  friendsDescription: string;
  riskTaking: string;
  problemSolvingApproach: string;
  iqQuestions: {
    patternRecognition: string;
    logicalReasoning: string;
    spatialAwareness: string;
    wordProblem: string;
  };
  careerMatches: string[];
  morningExcitement: string;
  adultUnderstanding: string;
  additionalInfo: string;
}

const interestsOptions = [
  { id: 'puzzles', label: 'Logic & Puzzles', emoji: '🧩', icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { id: 'art', label: 'Art & Stories', emoji: '🎨', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 'helping', label: 'Helping Others', emoji: '🤝', icon: Heart, color: 'from-emerald-500 to-green-500' },
  { id: 'selling', label: 'Business & Sales', emoji: '💰', icon: Building2, color: 'from-amber-500 to-orange-500' },
  { id: 'tech', label: 'Tech & Coding', emoji: '💻', icon: Code, color: 'from-violet-500 to-purple-500' },
  { id: 'speaking', label: 'Speaking & Debate', emoji: '🎤', icon: Mic, color: 'from-red-500 to-pink-500' },
  { id: 'content', label: 'Content Creation', emoji: '📱', icon: Monitor, color: 'from-teal-500 to-cyan-500' },
  { id: 'reading', label: 'Reading & Writing', emoji: '📚', icon: BookOpen, color: 'from-indigo-500 to-blue-500' }
];

const careers = [
  { id: 'entrepreneur', label: 'Entrepreneur', emoji: '🚀', desc: 'Starting & running businesses', icon: Rocket },
  { id: 'engineer', label: 'Engineer', emoji: '⚙️', desc: 'Building & designing things', icon: Building2 },
  { id: 'doctor', label: 'Doctor', emoji: '🩺', desc: 'Helping people stay healthy', icon: Stethoscope },
  { id: 'artist', label: 'Artist', emoji: '🎨', desc: 'Creating beautiful things', icon: Palette },
  { id: 'scientist', label: 'Scientist', emoji: '🔬', desc: 'Discovering how things work', icon: FlaskConical },
  { id: 'teacher', label: 'Teacher', emoji: '📖', desc: 'Helping others learn', icon: GraduationCap },
  { id: 'programmer', label: 'Programmer', emoji: '💻', desc: 'Creating apps & websites', icon: Code },
  { id: 'designer', label: 'Designer', emoji: '✏️', desc: 'Making things look good', icon: Pencil },
  { id: 'writer', label: 'Writer', emoji: '📝', desc: 'Sharing stories & ideas', icon: BookOpen },
  { id: 'marketer', label: 'Marketer', emoji: '📢', desc: 'Helping people find products', icon: Target }
];

const stepMeta = [
  { title: "Let's Begin!", subtitle: 'Tell us about the young dreamer', emoji: '👋', icon: Star },
  { title: 'Superpower Discovery', subtitle: 'What lights up their world?', emoji: '⚡', icon: Zap },
  { title: 'Skill Scanner', subtitle: 'Rate their amazing abilities', emoji: '📊', icon: Target },
  { title: 'Dream Builder', subtitle: "What's their ideal future?", emoji: '🌟', icon: Compass },
  { title: 'Learning DNA', subtitle: 'How do they learn best?', emoji: '🧬', icon: Brain },
  { title: 'Entrepreneur Check', subtitle: 'Is there a founder inside?', emoji: '💡', icon: Lightbulb },
  { title: 'Personality Radar', subtitle: 'What makes them unique?', emoji: '🎯', icon: Heart },
  { title: 'Brain Challenge', subtitle: 'Fun puzzles to solve!', emoji: '🧠', icon: Gamepad2 },
  { title: 'Career Explorer', subtitle: 'Which paths excite them?', emoji: '🗺️', icon: Rocket },
  { title: 'Final Spark', subtitle: 'Last thoughts before the magic!', emoji: '✨', icon: Trophy }
];

const initialFormData: FormData = {
  studentName: '', age: '', grade: '', parentEmail: '', parentPhone: '',
  interests: [],
  creativity: 3, confidence: 3, communication: 3, leadership: 3,
  problemSolving: 3, teamwork: 3, timeManagement: 3, curiosity: 3,
  futureAspiration: '', workEnvironment: 'both', workStyle: 'both', problemApproach: 'both',
  learningStyle: '', favoriteSubject: '', challengingSubject: '',
  hasSoldCreated: false, excitedForCompany: false, invention: '',
  friendsDescription: '', riskTaking: '', problemSolvingApproach: '',
  iqQuestions: { patternRecognition: '', logicalReasoning: '', spatialAwareness: '', wordProblem: '' },
  careerMatches: [],
  morningExcitement: '', adultUnderstanding: '', additionalInfo: ''
};

// Confetti component
function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {Array.from({ length: 40 }).map((_, i) => (
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
            y: [0, 600],
            x: [(Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: Math.random() * 2 + 2, delay: i * 0.05, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

// Skill slider with emoji feedback
function SkillSlider({ id, label, emoji, value, onChange }: { id: string; label: string; emoji: string; value: number; onChange: (v: number) => void }) {
  const feedbackEmoji = ['😕', '🙂', '😊', '😄', '🤩'];
  const feedbackLabel = ['Needs Work', 'Getting There', 'Good', 'Great', 'Amazing!'];
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-emerald-400'];

  return (
    <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 hover:bg-white/[0.08] transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <span className="text-sm font-medium text-white/90">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{feedbackEmoji[value - 1]}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[value - 1]} text-white`}>
            {feedbackLabel[value - 1]}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`flex-1 h-3 rounded-full transition-all duration-300 ${
              v <= value
                ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30'
                : 'bg-white/[0.1]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CareerGuidePopup({ isOpen, onClose }: CareerGuidePopupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 10;
  const currentMeta = stepMeta[step - 1] || stepMeta[0];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!formData.studentName.trim()) newErrors.studentName = 'Please enter student name';
        if (!formData.age.trim()) newErrors.age = 'Please enter age';
        if (!formData.grade.trim()) newErrors.grade = 'Please enter grade';
        if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Please enter parent email';
        else if (!/^\S+@\S+\.\S+$/.test(formData.parentEmail)) newErrors.parentEmail = 'Please enter a valid email';
        break;
      case 2:
        if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
        break;
      case 4:
        if (!formData.futureAspiration.trim()) newErrors.futureAspiration = 'Please enter future aspiration';
        break;
      case 5:
        if (!formData.learningStyle.trim()) newErrors.learningStyle = 'Please select a learning style';
        if (!formData.favoriteSubject.trim()) newErrors.favoriteSubject = 'Please enter favorite subject';
        break;
      case 6:
        if (!formData.invention.trim()) newErrors.invention = 'Please enter an invention idea';
        break;
      case 7:
        if (!formData.friendsDescription.trim()) newErrors.friendsDescription = 'Please enter how friends describe them';
        if (!formData.riskTaking) newErrors.riskTaking = 'Please select risk-taking preference';
        if (!formData.problemSolvingApproach) newErrors.problemSolvingApproach = 'Please select problem-solving approach';
        break;
      case 9:
        if (formData.careerMatches.length === 0) newErrors.careerMatches = 'Please select at least one career';
        break;
      case 10:
        if (!formData.morningExcitement.trim()) newErrors.morningExcitement = 'Please enter what excites them';
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const guideResult = await generateCareerGuide(formData);
      setResult(guideResult);
      setShowConfetti(true);
      await storeCareerGuideData(formData, guideResult);
      setStep(totalSteps + 1);
    } catch (error) {
      console.error('Error submitting career guide:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const storeCareerGuideData = async (formData: FormData, result: any) => {
    try {
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: formData.studentName,
          email: formData.parentEmail,
          phone: formData.parentPhone,
          source: 'career_guide',
          status: 'new',
          notes: `Age: ${formData.age}, Grade: ${formData.grade}, Career Guide Completed`
        })
        .select()
        .single();

      if (leadError) throw leadError;

      const { error: responseError } = await supabase
        .from('career_guide_responses')
        .insert({
          lead_id: leadData.id,
          student_name: formData.studentName,
          age: formData.age,
          grade: formData.grade,
          interests: formData.interests,
          self_assessment: {
            creativity: formData.creativity,
            confidence: formData.confidence,
            communication: formData.communication,
            leadership: formData.leadership,
            problemSolving: formData.problemSolving,
            teamwork: formData.teamwork,
            timeManagement: formData.timeManagement,
            curiosity: formData.curiosity
          },
          future_preferences: {
            futureAspiration: formData.futureAspiration,
            workEnvironment: formData.workEnvironment,
            workStyle: formData.workStyle,
            problemApproach: formData.problemApproach
          },
          learning_style: {
            style: formData.learningStyle,
            favoriteSubject: formData.favoriteSubject,
            challengingSubject: formData.challengingSubject
          },
          entrepreneurial_thinking: {
            hasSoldCreated: formData.hasSoldCreated,
            excitedForCompany: formData.excitedForCompany,
            invention: formData.invention
          },
          personality_type: {
            friendsDescription: formData.friendsDescription,
            riskTaking: formData.riskTaking,
            problemSolvingApproach: formData.problemSolvingApproach
          },
          additional_info: {
            morningExcitement: formData.morningExcitement,
            adultUnderstanding: formData.adultUnderstanding,
            additionalInfo: formData.additionalInfo,
            iqQuestions: formData.iqQuestions,
            careerMatches: formData.careerMatches
          },
          generated_report: result
        });

      if (responseError) throw responseError;
    } catch (error) {
      console.error('Error storing career guide data:', error);
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleCareerToggle = (careerId: string) => {
    setFormData(prev => ({
      ...prev,
      careerMatches: prev.careerMatches.includes(careerId)
        ? prev.careerMatches.filter(id => id !== careerId)
        : [...prev.careerMatches, careerId]
    }));
  };

  const stepVariants = {
    enter: { opacity: 0, x: 50, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.98 }
  };

  // Static label above field — floating labels + placeholders overlapped on mobile
  const FloatingInput = ({ id, label, type = 'text', value, onChange, error, placeholder }: any) => (
    <div>
      <label htmlFor={id} className="block text-[11px] font-medium text-white/50 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full min-h-[48px] px-4 py-3 bg-white/[0.06] border ${error ? 'border-red-400/60' : 'border-white/[0.1]'} rounded-2xl text-white text-[16px] sm:text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all`}
      />
      {error && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><span>⚠️</span>{error}</p>}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Free Personalized Career Guide
              </div>
              <p className="text-white/50 text-sm">
                We'll create a detailed career roadmap powered by AI — completely free!
              </p>
            </div>

            <FloatingInput
              id="studentName"
              label="Child's Name"
              value={formData.studentName}
              onChange={(e: any) => setFormData({ ...formData, studentName: e.target.value })}
              error={errors.studentName}
              placeholder="What's their name?"
            />

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                id="age"
                label="Age"
                value={formData.age}
                onChange={(e: any) => setFormData({ ...formData, age: e.target.value })}
                error={errors.age}
                placeholder="10-18"
              />
              <FloatingInput
                id="grade"
                label="Grade / Class"
                value={formData.grade}
                onChange={(e: any) => setFormData({ ...formData, grade: e.target.value })}
                error={errors.grade}
                placeholder="e.g. 8th"
              />
            </div>

            <FloatingInput
              id="parentEmail"
              label="Parent's Email"
              type="email"
              value={formData.parentEmail}
              onChange={(e: any) => setFormData({ ...formData, parentEmail: e.target.value })}
              error={errors.parentEmail}
              placeholder="parent@email.com"
            />

            <FloatingInput
              id="parentPhone"
              label="Parent's Phone (optional)"
              type="tel"
              value={formData.parentPhone}
              onChange={(e: any) => setFormData({ ...formData, parentPhone: e.target.value })}
              placeholder="+91 98765 43210"
            />

            <div className="flex items-center gap-2 text-xs text-white/30 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400/60" />
              <span>Your data is 100% secure and never shared with third parties</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <p className="text-white/50 text-sm text-center">
              Pick all the things that make {formData.studentName || 'them'} excited! ✨
            </p>
            {errors.interests && (
              <p className="text-center text-xs text-red-400 flex items-center justify-center gap-1"><span>⚠️</span>{errors.interests}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {interestsOptions.map((interest) => {
                const isSelected = formData.interests.includes(interest.id);
                return (
                  <motion.button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 text-left ${
                      isSelected
                        ? 'bg-gradient-to-r ' + interest.color + ' border-transparent shadow-lg shadow-blue-500/20 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.08] text-white/80'
                    }`}
                  >
                    <span className="text-2xl">{interest.emoji}</span>
                    <span className="text-sm font-medium">{interest.label}</span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <p className="text-center text-white/30 text-xs">
              Selected: {formData.interests.length} / {interestsOptions.length}
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-3">
            <p className="text-white/50 text-sm text-center mb-4">
              Tap the bars to rate {formData.studentName || 'their'} skills from 1 to 5
            </p>
            <SkillSlider id="creativity" label="Creativity" emoji="🎨" value={formData.creativity} onChange={(v) => setFormData({ ...formData, creativity: v })} />
            <SkillSlider id="confidence" label="Confidence" emoji="💪" value={formData.confidence} onChange={(v) => setFormData({ ...formData, confidence: v })} />
            <SkillSlider id="communication" label="Communication" emoji="🗣️" value={formData.communication} onChange={(v) => setFormData({ ...formData, communication: v })} />
            <SkillSlider id="leadership" label="Leadership" emoji="👑" value={formData.leadership} onChange={(v) => setFormData({ ...formData, leadership: v })} />
            <SkillSlider id="problemSolving" label="Problem Solving" emoji="🧩" value={formData.problemSolving} onChange={(v) => setFormData({ ...formData, problemSolving: v })} />
            <SkillSlider id="teamwork" label="Teamwork" emoji="🤝" value={formData.teamwork} onChange={(v) => setFormData({ ...formData, teamwork: v })} />
            <SkillSlider id="timeManagement" label="Time Management" emoji="⏰" value={formData.timeManagement} onChange={(v) => setFormData({ ...formData, timeManagement: v })} />
            <SkillSlider id="curiosity" label="Curiosity" emoji="🔍" value={formData.curiosity} onChange={(v) => setFormData({ ...formData, curiosity: v })} />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <FloatingInput
              id="futureAspiration"
              label="What does your child want to be?"
              value={formData.futureAspiration}
              onChange={(e: any) => setFormData({ ...formData, futureAspiration: e.target.value })}
              error={errors.futureAspiration}
              placeholder="Astronaut, CEO, Doctor..."
            />

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">Where do they love working?</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'indoors', label: 'Indoors', emoji: '🏠' },
                  { id: 'outdoors', label: 'Outdoors', emoji: '🌳' },
                  { id: 'both', label: 'Both', emoji: '🌍' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, workEnvironment: opt.id as any })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      formData.workEnvironment === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-xl block mb-1">{opt.emoji}</span>
                    <span className="text-xs font-medium">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">Work style preference?</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'with people', label: 'With Team', emoji: '👥' },
                  { id: 'alone', label: 'Solo', emoji: '🧘' },
                  { id: 'both', label: 'Both', emoji: '🔄' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, workStyle: opt.id as any })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      formData.workStyle === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-xl block mb-1">{opt.emoji}</span>
                    <span className="text-xs font-medium">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">What excites them more?</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'building', label: 'Building New', emoji: '🏗️' },
                  { id: 'fixing', label: 'Fixing Things', emoji: '🔧' },
                  { id: 'both', label: 'Both', emoji: '⚡' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, problemApproach: opt.id as any })}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      formData.problemApproach === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-xl block mb-1">{opt.emoji}</span>
                    <span className="text-xs font-medium">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-white/70 mb-3">How does {formData.studentName || 'your child'} learn best?</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'visual', label: 'By Seeing', desc: 'Pictures, videos, diagrams', emoji: '👁️', color: 'from-blue-500 to-cyan-500' },
                  { id: 'auditory', label: 'By Hearing', desc: 'Listening, discussions, podcasts', emoji: '👂', color: 'from-violet-500 to-purple-500' },
                  { id: 'kinesthetic', label: 'By Doing', desc: 'Hands-on activities, experiments', emoji: '🤲', color: 'from-emerald-500 to-green-500' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({ ...formData, learningStyle: opt.id })}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
                      formData.learningStyle === opt.id
                        ? `bg-gradient-to-r ${opt.color} border-transparent text-white shadow-lg`
                        : 'bg-white/[0.05] border-white/[0.1] text-white/70 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className={`text-xs ${formData.learningStyle === opt.id ? 'text-white/80' : 'text-white/40'}`}>{opt.desc}</p>
                    </div>
                    {formData.learningStyle === opt.id && <CheckCircle className="w-5 h-5 ml-auto" />}
                  </motion.button>
                ))}
              </div>
              {errors.learningStyle && <p className="mt-1 text-xs text-red-400">⚠️ {errors.learningStyle}</p>}
            </div>

            <FloatingInput
              id="favoriteSubject"
              label="Favorite subject in school?"
              value={formData.favoriteSubject}
              onChange={(e: any) => setFormData({ ...formData, favoriteSubject: e.target.value })}
              error={errors.favoriteSubject}
              placeholder="Math, Science, Art..."
            />

            <FloatingInput
              id="challengingSubject"
              label="Most challenging subject? (optional)"
              value={formData.challengingSubject}
              onChange={(e: any) => setFormData({ ...formData, challengingSubject: e.target.value })}
              placeholder="The tough one..."
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-white/70 mb-3">
                Has {formData.studentName || 'your child'} ever sold or created something? 🛍️
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: true, label: 'Yes!', emoji: '🎉' },
                  { id: false, label: 'Not yet', emoji: '🌱' }
                ].map((opt) => (
                  <motion.button
                    key={String(opt.id)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, hasSoldCreated: opt.id })}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      formData.hasSoldCreated === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">
                Excited about starting a company someday? 🏢
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: true, label: 'Absolutely!', emoji: '🚀' },
                  { id: false, label: 'Maybe later', emoji: '🤔' }
                ].map((opt) => (
                  <motion.button
                    key={String(opt.id)}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, excitedForCompany: opt.id })}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      formData.excitedForCompany === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{opt.emoji}</span>
                    <span className="text-sm font-medium">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-2">
                If they could invent ANYTHING, what would it be? 💡
              </p>
              <textarea
                value={formData.invention}
                onChange={(e) => setFormData({ ...formData, invention: e.target.value })}
                className={`w-full px-4 py-3 bg-white/[0.06] border ${errors.invention ? 'border-red-400/60' : 'border-white/[0.1]'} rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none`}
                rows={3}
                placeholder="A flying car? A mind-reading app? Dream big! 🌈"
              />
              {errors.invention && <p className="text-xs text-red-400">⚠️ {errors.invention}</p>}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-white/70 mb-2">
                How would friends describe {formData.studentName || 'them'}? 🗨️
              </p>
              <textarea
                value={formData.friendsDescription}
                onChange={(e) => setFormData({ ...formData, friendsDescription: e.target.value })}
                className={`w-full px-4 py-3 bg-white/[0.06] border ${errors.friendsDescription ? 'border-red-400/60' : 'border-white/[0.1]'} rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none`}
                rows={2}
                placeholder="Funny, creative, kind, leader..."
              />
              {errors.friendsDescription && <p className="text-xs text-red-400">⚠️ {errors.friendsDescription}</p>}
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">How do they feel about trying new things?</p>
              <div className="space-y-2">
                {[
                  { id: 'I love trying new things!', label: 'Adventure seeker!', emoji: '🦸', desc: 'Loves jumping into the unknown' },
                  { id: 'I like to try new things sometimes', label: 'Careful explorer', emoji: '🧭', desc: 'Tries new things with some caution' },
                  { id: 'I prefer sticking to what I know', label: 'Comfort zone champ', emoji: '🏡', desc: 'Prefers familiar territory' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({ ...formData, riskTaking: opt.id })}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      formData.riskTaking === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-white/40">{opt.desc}</p>
                    </div>
                    {formData.riskTaking === opt.id && <CheckCircle className="w-4 h-4 ml-auto text-blue-400" />}
                  </motion.button>
                ))}
              </div>
              {errors.riskTaking && <p className="text-xs text-red-400 mt-1">⚠️ {errors.riskTaking}</p>}
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-3">When facing a problem, they usually...</p>
              <div className="space-y-2">
                {[
                  { id: 'Try to solve it myself', label: 'DIY problem solver', emoji: '🔨', desc: 'Tackles challenges head-on' },
                  { id: 'Ask for help right away', label: 'Team player', emoji: '🤝', desc: 'Knows when to ask for support' },
                  { id: 'Avoid the problem', label: 'Strategic waiter', emoji: '⏳', desc: 'Takes time to process' }
                ].map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({ ...formData, problemSolvingApproach: opt.id })}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                      formData.problemSolvingApproach === opt.id
                        ? 'bg-blue-500/20 border-blue-500/40 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-white/40">{opt.desc}</p>
                    </div>
                    {formData.problemSolvingApproach === opt.id && <CheckCircle className="w-4 h-4 ml-auto text-blue-400" />}
                  </motion.button>
                ))}
              </div>
              {errors.problemSolvingApproach && <p className="text-xs text-red-400 mt-1">⚠️ {errors.problemSolvingApproach}</p>}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-5">
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs">
                <Gamepad2 className="w-3 h-3" /> No pressure — just for fun!
              </div>
            </div>

            {/* Pattern Recognition */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-sm font-medium text-white/90 mb-3">
                🔢 What comes next? <span className="text-blue-400 font-mono">2, 5, 11, 23, ?</span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {['30', '32', '47', '46'].map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, iqQuestions: { ...formData.iqQuestions, patternRecognition: opt } })}
                    className={`py-3 rounded-xl border text-center font-mono font-bold transition-all ${
                      formData.iqQuestions.patternRecognition === opt
                        ? 'bg-blue-500/30 border-blue-500/50 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Logical Reasoning */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-sm font-medium text-white/90 mb-3">
                🐱 All cats have tails. Fluffy is a cat. What about Fluffy?
              </p>
              <div className="space-y-2">
                {[
                  'Fluffy might have a tail',
                  'Fluffy definitely has a tail',
                  'We cannot tell if Fluffy has a tail',
                  'Fluffy has no tail'
                ].map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({ ...formData, iqQuestions: { ...formData.iqQuestions, logicalReasoning: opt } })}
                    className={`w-full p-3 rounded-xl border text-left text-sm transition-all ${
                      formData.iqQuestions.logicalReasoning === opt
                        ? 'bg-violet-500/20 border-violet-500/40 text-white'
                        : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:bg-white/[0.06]'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Spatial */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-sm font-medium text-white/90 mb-3">
                📐 A large triangle is split into smaller ones inside. How many triangles total?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {['3', '4', '5', '6'].map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, iqQuestions: { ...formData.iqQuestions, spatialAwareness: opt } })}
                    className={`py-3 rounded-xl border text-center font-mono font-bold transition-all ${
                      formData.iqQuestions.spatialAwareness === opt
                        ? 'bg-emerald-500/30 border-emerald-500/50 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Word Problem */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5">
              <p className="text-sm font-medium text-white/90 mb-3">
                🍎 You have 8 apples. You give half to a friend, then eat 1. How many left?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {['3', '4', '7', '14'].map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFormData({ ...formData, iqQuestions: { ...formData.iqQuestions, wordProblem: opt } })}
                    className={`py-3 rounded-xl border text-center font-mono font-bold transition-all ${
                      formData.iqQuestions.wordProblem === opt
                        ? 'bg-amber-500/30 border-amber-500/50 text-white'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-5">
            <p className="text-white/50 text-sm text-center">
              Which careers make {formData.studentName || 'their'} eyes light up? Pick all! 🌟
            </p>
            {errors.careerMatches && (
              <p className="text-center text-xs text-red-400">⚠️ {errors.careerMatches}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {careers.map((career) => {
                const isSelected = formData.careerMatches.includes(career.id);
                const IconComp = career.icon;
                return (
                  <motion.button
                    key={career.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCareerToggle(career.id)}
                    className={`relative flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-blue-500/20 border-blue-500/40 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-white/[0.05] border-white/[0.1] text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-2xl mb-1">{career.emoji}</span>
                    <p className="text-sm font-semibold">{career.label}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{career.desc}</p>
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl mb-2"
              >
                🎬
              </motion.div>
              <p className="text-white/50 text-sm">
                Almost done! Just a few final thoughts...
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-2">
                What gets {formData.studentName || 'them'} excited to wake up? ☀️
              </p>
              <textarea
                value={formData.morningExcitement}
                onChange={(e) => setFormData({ ...formData, morningExcitement: e.target.value })}
                className={`w-full px-4 py-3 bg-white/[0.06] border ${errors.morningExcitement ? 'border-red-400/60' : 'border-white/[0.1]'} rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none`}
                rows={2}
                placeholder="Playing games, learning new things, meeting friends..."
              />
              {errors.morningExcitement && <p className="text-xs text-red-400">⚠️ {errors.morningExcitement}</p>}
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-2">
                What should adults understand better about them? (optional) 💭
              </p>
              <textarea
                value={formData.adultUnderstanding}
                onChange={(e) => setFormData({ ...formData, adultUnderstanding: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                rows={2}
                placeholder="Any insights to help us understand them better..."
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white/70 mb-2">
                Anything else you'd like to share? (optional) 📝
              </p>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                rows={2}
                placeholder="Special talents, hobbies, anything..."
              />
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
              <p className="text-sm text-white/70">
                🎯 Click <span className="text-blue-400 font-semibold">Submit & Generate</span> to get your personalized AI-powered career guide!
              </p>
            </div>
          </div>
        );

      case totalSteps + 1:
        return <CareerGuideResult result={result} onClose={onClose} />;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(15,20,40,0.98) 0%, rgba(10,10,30,0.98) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 120px rgba(24,118,210,0.1)'
            }}
          >
            {showConfetti && <Confetti />}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center transition-all group"
            >
              <X className="w-4 h-4 text-white/60 group-hover:text-white" />
            </button>

            {/* Header with step info */}
            {step <= totalSteps && (
              <div className="px-6 pt-6 pb-4">
                {/* Progress dots */}
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i + 1 === step
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-cyan-400'
                          : i + 1 < step
                          ? 'w-3 bg-blue-500/60'
                          : 'w-3 bg-white/[0.1]'
                      }`}
                    />
                  ))}
                </div>

                {/* Step title */}
                <div className="text-center">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{currentMeta.emoji}</span>
                      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                        {currentMeta.title}
                      </h2>
                    </div>
                    <p className="text-white/40 text-sm">{currentMeta.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-white/30">Step {step}/{totalSteps}</span>
                      <div className="w-20 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(step / totalSteps) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="px-6 pb-4 max-h-[55vh] overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            {step <= totalSteps && (
              <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                {step > 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all text-sm font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                ) : (
                  <div />
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-white transition-all ${
                    isSubmitting
                      ? 'bg-white/[0.1] cursor-not-allowed'
                      : step === totalSteps
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating your guide...
                    </>
                  ) : step === totalSteps ? (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Submit & Generate
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
