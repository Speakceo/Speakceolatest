import React, { Suspense, useEffect, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Context Providers
import { LanguageProvider } from './lib/contexts/LanguageContext'
import { UserProgressProvider } from './contexts/UserProgressContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Performance Monitoring
import WebVitals from './components/common/WebVitals'

// Store
import { useUserStore } from './lib/store'

// ═══ Only Home is eagerly loaded (landing page). Everything else is lazy ═══
import Home from './pages/Home'

// Lazy-loaded pages — split into separate chunks for faster initial load
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Courses = lazy(() => import('./pages/Courses'))
const Tools = lazy(() => import('./pages/Tools'))
const Community = lazy(() => import('./pages/Community'))
const LiveClasses = lazy(() => import('./pages/LiveClasses'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Events = lazy(() => import('./pages/Events'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const Resources = lazy(() => import('./pages/Resources'))
const Partnerships = lazy(() => import('./pages/Partnerships'))
const Demo = lazy(() => import('./pages/Demo'))
const CompareSlugPage = lazy(() => import('./pages/Compare'))
const CompareHub = lazy(() =>
  import('./pages/Compare').then((m) => ({ default: m.CompareHub }))
)
const GuideSlugPage = lazy(() => import('./pages/Guides'))
const GuidesHub = lazy(() =>
  import('./pages/Guides').then((m) => ({ default: m.GuidesHub }))
)
const LandingSlugPage = lazy(() => import('./pages/Landing'))
const LandingHub = lazy(() =>
  import('./pages/Landing').then((m) => ({ default: m.LandingHub }))
)

// Legal Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const SetupSpeakCEO = lazy(() => import('./components/admin/SetupSpeakCEO'))
const TestLeadForm = lazy(() => import('./components/TestLeadForm'))

// Auth Components
const SpeakCEOLogin = lazy(() => import('./components/auth/SpeakCEOLogin'))
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'))

// Dashboard Components
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'))
const Overview = lazy(() => import('./components/dashboard/Overview'))
const LearningJourney = lazy(() => import('./components/dashboard/LearningJourney'))
const MyCourses = lazy(() => import('./components/dashboard/MyCourses'))
const DashboardLiveClasses = lazy(() => import('./components/dashboard/LiveClasses'))
const TasksAssignments = lazy(() => import('./components/dashboard/TasksAssignments'))
const BusinessSimulation = lazy(() => import('./components/dashboard/BusinessSimulation'))
const AITools = lazy(() => import('./components/dashboard/AITools'))
const Achievements = lazy(() => import('./components/dashboard/Achievements'))
const Analytics = lazy(() => import('./components/dashboard/Analytics'))
const Messages = lazy(() => import('./components/dashboard/Messages'))
const Quiz = lazy(() => import('./components/dashboard/Quiz'))
const UserProfile = lazy(() => import('./components/dashboard/UserProfile'))
const BusinessInsights = lazy(() => import('./components/dashboard/BusinessInsights'))
const StartupEmpire = lazy(() => import('./components/dashboard/StartupEmpire'))
const GameZone = lazy(() => import('./components/dashboard/GameZone'))
const Help = lazy(() => import('./components/dashboard/Help'))

// Admin Components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const UsersPage = lazy(() => import('./components/admin/UsersPage'))
const CoursesPage = lazy(() => import('./components/admin/CoursesPage'))
const LessonPlannerDashboard = lazy(() => import('./components/admin/LessonPlannerDashboard'))
const TasksPage = lazy(() => import('./components/admin/TasksPage'))
const AdminLiveClassesPage = lazy(() => import('./components/admin/LiveClassesPage'))
const CommunityModeration = lazy(() => import('./components/admin/CommunityModeration'))
const AnalyticsPage = lazy(() => import('./components/admin/AnalyticsPage'))
const PaymentsPage = lazy(() => import('./components/admin/PaymentsPage'))
const SupportPage = lazy(() => import('./components/admin/SupportPage'))
const SettingsPage = lazy(() => import('./components/admin/SettingsPage'))

// Common Components
import Navbar from './components/Navbar'
import Footer from './components/common/Footer'
import SEO from './components/SEO'
import LoadingFallback from './components/common/LoadingFallback'

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Soft-404 prevention: never let an error shell look like an indexable homepage.
      if (typeof document !== 'undefined') {
        let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'robots';
          document.head.appendChild(meta);
        }
        meta.content = 'noindex, nofollow';
      }
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              We&apos;re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>
            <p className="text-xs text-gray-500 mb-4 font-mono break-all">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#1876D2]/30 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Footer conditional component
const ConditionalFooter = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Hide footer on dashboard and admin pages, or when user is logged in
  if (isDashboardPage || isAdminPage || user) {
    return null;
  }
  
  return <Footer />;
}

// Navbar conditional component
const ConditionalNavbar = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Hide navbar on dashboard and admin pages
  if (isDashboardPage || isAdminPage) {
    return null;
  }
  
  return <Navbar />;
}

// Scroll to Top Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top on route change with a small delay to ensure content is rendered
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const { initializeAuth, isInitialized } = useUserStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Do not block marketing/legal routes on auth bootstrap.
   * A global gate meant every URL returned the same loading shell first — crawlers
   * then saw duplicate titles, duplicate meta, and no route H1 across ~40 URLs.
   * Dashboard still waits until initializeAuth finishes.
   */
  const path = location.pathname;
  const waitForAuthBootstrap = path.startsWith('/dashboard');

  if (waitForAuthBootstrap && !isInitialized) {
    return <LoadingFallback />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-o-0">
      <ConditionalNavbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/compare" element={<CompareHub />} />
            <Route path="/compare/:slug" element={<CompareSlugPage />} />
            <Route path="/guides" element={<GuidesHub />} />
            <Route path="/guides/:slug" element={<GuideSlugPage />} />
            <Route path="/lp" element={<LandingHub />} />
            <Route path="/lp/:slug" element={<LandingSlugPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/live-classes" element={<LiveClasses />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/partnerships" element={<Partnerships />} />
            
            {/* Legal Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            
            {/* Debug Route */}
            <Route path="/test-leads" element={<TestLeadForm />} />

            {/* Auth Routes */}
            <Route path="/login" element={<SpeakCEOLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/setup" element={<SetupSpeakCEO />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="journey" element={<LearningJourney />} />
              <Route path="courses" element={<MyCourses />} />
              <Route path="live-classes" element={<DashboardLiveClasses />} />
              <Route path="tasks" element={<TasksAssignments />} />
              <Route path="business-lab" element={<BusinessSimulation />} />
              <Route path="ai-tools/*" element={<AITools />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="messages" element={<Messages />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="insights" element={<BusinessInsights />} />
              <Route path="startup-empire" element={<StartupEmpire />} />
              <Route path="games" element={<GameZone />} />
              <Route path="help" element={<Help />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>
      <ConditionalFooter />
    </div>
  );
}

export default function App() {
  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
          <LanguageProvider>
              <UserProgressProvider>
                <WebVitals />
                <ScrollToTop />
            <AppContent />
              </UserProgressProvider>
            </LanguageProvider>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}