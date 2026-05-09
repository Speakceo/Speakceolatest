import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  Star, 
  Award, 
  MessageSquare, 
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Lock,
  Play,
  BrainCircuit,
  Sparkles,
  Video,
  Clock,
  Trophy,
  Mic,
  PenTool,
  DollarSign,
  Rocket,
  ChevronRight,
  X,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Presentation
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import AILearningCoach from './AILearningCoach';
import { useProgressStore, useUserStore } from '../../lib/store';
import ProgressBar from '../ui/ProgressBar';
import MyStartup from './MyStartup';
import LessonViewer from './LessonViewer';
import { setupCourseContentSubscriptions } from '../../lib/stores/progressStore';

export default function LearningJourney() {
  const [step, setStep] = useState(1);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showAICoach, setShowAICoach] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeSlides, setActiveSlides] = useState<{
    id: string;
    title: string;
    type: string;
    url?: string;
    content?: string;
    order: number;
  }[] | null>(null);
  const [activeLessonTitle, setActiveLessonTitle] = useState<string>('');
  
  const { user } = useUserStore();
  const { 
    modules, 
    userProgress, 
    fetchUserProgress,
    getModuleProgress,
    getOverallProgress,
    getNextLesson,
    getLearningStreak,
    refreshModules
  } = useProgressStore();
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      fetchUserProgress(user.id);
      
      // Refresh modules to ensure we have the latest data
      refreshModules();
      
      // Set up real-time subscriptions
      const unsubscribe = setupCourseContentSubscriptions();
      
      // Clean up subscriptions on unmount
      return () => {
        unsubscribe();
      };
    }
  }, [user, fetchUserProgress, refreshModules]);

  // Check if we have module data from navigation
  useEffect(() => {
    if (location.state?.moduleData) {
      const moduleData = location.state.moduleData;
      setActiveLessonTitle(moduleData.title);
      setActiveSlides(moduleData.slides || null);
      
      // Clear the location state to prevent reloading on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const chartOptions = {
    chart: {
      type: 'radar',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    colors: ['#6366f1'],
    fill: {
      opacity: 0.5
    },
    markers: {
      size: 4
    },
    xaxis: {
      categories: ['Leadership', 'Public Speaking', 'Financial Literacy', 'Marketing', 'Business Strategy']
    }
  };

  const series = [{
    name: 'Skill Level',
    data: [65, 45, 30, 20, 40]
  }];
  
  const nextLesson = getNextLesson();
  const overallProgress = getOverallProgress();
  const learningStreak = getLearningStreak();

  const handleLessonComplete = () => {
    // In a real implementation, this would update the user's progress
    setActiveSlides(null);
    
    // Show success message or update progress
    alert('Lesson completed! You earned points for this lesson.');
  };

  return (
    <div className="space-y-6">
      {/* ── Header + XP Ribbon — gamified-app skill pattern ── */}
      <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'var(--od-bg-2)', border: '1px solid var(--od-border-1)' }}>
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-white tracking-[-0.02em]">180-Day CEO Journey</h2>
            <p className="text-[13px] mt-0.5" style={{ color: 'var(--od-text-2)' }}>Your path to entrepreneurial success</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{overallProgress}%</p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--od-text-3)' }}>Progress</p>
            </div>
            <div className="w-px h-8" style={{ background: 'var(--od-border-1)' }} />
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">Day {Math.floor(overallProgress * 1.8)}</p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--od-text-3)' }}>of 180</p>
            </div>
          </div>
        </div>

        {/* XP ribbon — gamified-app level indicator */}
        <div className="level-ribbon mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #1876D2, #00B0FF)' }}>
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white text-[13px] font-bold">LV {Math.max(1, Math.floor(overallProgress / 15))} · {overallProgress < 30 ? 'Starter' : overallProgress < 60 ? 'Builder' : 'Launcher'}</span>
              <span className="text-[11px] font-semibold" style={{ color: 'var(--od-text-2)' }}>{overallProgress * 12} / 1,800 XP</span>
            </div>
            <div className="xp-bar-track">
              <div className="xp-bar-fill" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
          <span className="streak-badge flex-shrink-0">🔥 {getLearningStreak()}d</span>
        </div>

        {/* My Startup Section */}
        <MyStartup />

        {/* Module Timeline */}
        <div className="mt-6">
          <h3 className="text-[14px] font-semibold text-white mb-4">Learning Path</h3>
          <div className="relative">
            {/* Track line */}
            <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: 'var(--od-border-1)' }} />
            <div className="space-y-3">
              {modules.map((module, index) => {
                const prog = getModuleProgress(module.id);
                const isDone = prog >= 100;
                const isActive = prog > 0 && prog < 100;
                return (
                <div
                  key={module.id}
                  className="relative flex items-start gap-4 cursor-pointer"
                  onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                  onMouseEnter={() => setHoveredSection(module.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {/* Node dot */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    isDone ? 'bg-[rgba(16,185,129,0.15)] border border-emerald-500/30' :
                    isActive ? 'bg-[rgba(24,118,210,0.15)] border border-[#1876D2]/30' :
                    'border'
                  }`} style={{ border: isDone || isActive ? undefined : '1px solid var(--od-border-1)', background: isDone || isActive ? undefined : 'var(--od-bg-3)' }}>
                    {isDone ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : prog === 0 && index > 0 ? (
                      <Lock className="h-4 w-4" style={{ color: 'var(--od-text-3)' }} />
                    ) : (
                      <Target className={`h-4 w-4 ${isActive ? 'text-[#00B0FF]' : ''}`} style={{ color: isActive ? undefined : 'var(--od-text-3)' }} />
                    )}
                  </div>

                  <div className="flex-1 rounded-[14px] p-4 mb-1 transition-all duration-150" style={{
                    background: isActive ? 'rgba(24,118,210,0.06)' : 'var(--od-bg-3)',
                    border: `1px solid ${isActive ? 'rgba(24,118,210,0.2)' : 'var(--od-border-0)'}`,
                  }}>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[14px] font-semibold text-white leading-tight">{module.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        isDone ? 'bg-[rgba(16,185,129,0.12)] text-emerald-400' :
                        isActive ? 'bg-[rgba(24,118,210,0.12)] text-[#60a5fa]' :
                        ''
                      }`} style={{ background: isDone || isActive ? undefined : 'rgba(255,255,255,0.05)', color: isDone || isActive ? undefined : 'var(--od-text-3)' }}>
                        {isDone ? 'Done' : isActive ? 'Active' : 'Locked'}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: 'var(--od-text-2)' }}>{module.description}</p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--od-text-3)' }}>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Wk {index + 1}</span>
                        <span className="flex items-center gap-1"><Target className="h-3 w-3" />{module.lessons?.length || 0} lessons</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-20 xp-bar-track">
                          <div className="xp-bar-fill" style={{
                            width: `${prog}%`,
                            background: isDone ? '#10b981' : '#1876D2',
                            boxShadow: isDone ? '0 0 6px rgba(16,185,129,0.35)' : '0 0 6px rgba(24,118,210,0.35)'
                          }} />
                        </div>
                        <span className="text-[10px] font-semibold w-7 text-right" style={{ color: isDone ? '#10b981' : 'var(--od-text-2)' }}>{prog}%</span>
                      </div>
                    </div>

                    {/* Lessons Details */}
                    {(hoveredSection === module.id || selectedModule === module.id) && module.lessons && (
                      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--od-border-0)' }}>
                        <h4 className="text-[12px] font-semibold text-white mb-2.5">Lessons</h4>
                        <div className="space-y-1.5">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-2.5 rounded-[10px] cursor-pointer transition-all duration-150"
                              style={{ background: 'var(--od-bg-2)', border: '1px solid var(--od-border-0)' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--od-bg-3)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'var(--od-bg-2)')}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Navigate to lesson content
                                navigate('/dashboard/journey', { 
                                  state: { 
                                    moduleData: {
                                      ...lesson,
                                      sectionTitle: module.title
                                    }
                                  }
                                });
                              }}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="rounded-lg p-1.5 flex-shrink-0" style={{ background: 'rgba(24,118,210,0.1)' }}>
                                  {lesson.type === 'video' && <Video className="h-3.5 w-3.5 text-[#1876D2]" />}
                                  {lesson.type === 'document' && <FileText className="h-3.5 w-3.5 text-[#1876D2]" />}
                                  {lesson.type === 'quiz' && <BrainCircuit className="h-3.5 w-3.5 text-[#1876D2]" />}
                                  {lesson.type === 'assignment' && <FileText className="h-3.5 w-3.5 text-[#1876D2]" />}
                                  {lesson.type === 'ppt' && <Presentation className="h-3.5 w-3.5 text-[#1876D2]" />}
                                </div>
                                <div>
                                  <p className="text-[13px] font-medium text-white leading-tight">{lesson.title}</p>
                                  <div className="flex items-center text-[11px] mt-0.5" style={{ color: 'var(--od-text-3)' }}>
                                    <Clock className="h-3 w-3 mr-1" />
                                    {lesson.duration}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center flex-shrink-0">
                                {userProgress.completedLessons[lesson.id] ? (
                                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                                ) : (
                                  <ArrowRight className="h-4 w-4" style={{ color: 'var(--od-accent-bright)' }} />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Skills and Progress ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'var(--od-bg-2)', border: '1px solid var(--od-border-1)' }}>
          <h3 className="text-[14px] font-semibold text-white mb-4">Next Up</h3>
          {nextLesson ? (
            <div className="flex items-center justify-between p-3.5 rounded-[12px] gap-4" style={{ background: 'rgba(24,118,210,0.07)', border: '1px solid rgba(24,118,210,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2.5 flex-shrink-0" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <Video className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-[14px] leading-tight">{nextLesson.title}</h4>
                  <div className="flex items-center text-[11px] mt-0.5" style={{ color: 'var(--od-text-2)' }}>
                    <Clock className="h-3 w-3 mr-1" />
                    Next in your journey
                  </div>
                </div>
              </div>
              <button
                className="flex items-center gap-1.5 px-4 py-2 text-white text-[13px] font-semibold rounded-[10px] flex-shrink-0 transition-all"
                style={{ background: '#1876D2' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1464b8')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1876D2')}
                onClick={() => {
                  for (const module of modules) {
                    for (const lesson of module.lessons || []) {
                      if (lesson.id === nextLesson.lessonId) {
                        setActiveLessonTitle(lesson.title);
                        navigate('/dashboard/journey', { state: { moduleData: { ...lesson, sectionTitle: module.title } } });
                        return;
                      }
                    }
                  }
                }}
              >
                <Play className="h-3.5 w-3.5" />
                Start Now
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-[13px]" style={{ color: 'var(--od-text-2)' }}>
              All lessons complete! More content coming soon.
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Skill Radar */}
          <div className="rounded-2xl p-5" style={{ background: 'var(--od-bg-2)', border: '1px solid var(--od-border-1)' }}>
            <h3 className="text-[14px] font-semibold text-white mb-4">Skill Progress</h3>
            <Chart
              options={chartOptions}
              series={series}
              type="radar"
              height={300}
            />
          </div>

          {/* AI Coach — dark card */}
          <div className="rounded-2xl p-5" style={{ background: 'rgba(24,118,210,0.08)', border: '1px solid rgba(24,118,210,0.18)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,176,255,0.15)' }}>
                <Sparkles className="h-4 w-4 text-[#00B0FF]" />
              </div>
              <h3 className="text-[14px] font-semibold text-white">AI Learning Coach</h3>
            </div>
            <p className="text-[12px] leading-relaxed mb-4" style={{ color: 'var(--od-text-2)' }}>
              Get personalized guidance and tips from your AI coach.
            </p>
            <button
              onClick={() => setShowAICoach(true)}
              className="w-full py-2.5 rounded-[10px] text-[13px] font-semibold text-white transition-all"
              style={{ background: '#1876D2' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1464b8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1876D2')}
            >
              Chat with Coach
            </button>
          </div>
        </div>
      </div>

      {/* AI Learning Coach Modal */}
      {showAICoach && <AILearningCoach onClose={() => setShowAICoach(false)} />}

      {/* Lesson Viewer Modal */}
      {activeSlides && (
        <LessonViewer 
          lessonTitle={activeLessonTitle}
          content={activeSlides}
          onClose={() => setActiveSlides(null)}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
}