import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../lib/store';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Loader2, Rocket } from 'lucide-react';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Dashboard Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard Error Details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="text-center p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06] max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Something went wrong</h2>
            <p className="text-gray-400 mb-6 text-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Premium Loading Component
const LoadingSpinner = ({ message = "Loading dashboard..." }: { message?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00B0FF] animate-spin" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1876D2]/20 to-[#00B0FF]/20 flex items-center justify-center">
          <Rocket className="h-6 w-6 text-[#00B0FF]" />
        </div>
      </div>
      <p className="text-gray-400 text-sm font-medium">{message}</p>
    </div>
  </div>
);

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, isHydrated, isInitialized, initializeAuth } = useUserStore();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sidebar state changes
  const handleSidebarStateChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  // Initialize authentication
  useEffect(() => {
    let mounted = true;

    const initializeDashboard = async () => {
      try {
        console.log('DashboardLayout: Starting initialization...');
        setIsLoading(true);
        setError(null);

        // Only initialize if not already done
        if (!isInitialized) {
          console.log('DashboardLayout: Initializing auth...');
          await initializeAuth();
        }

        if (mounted) {
          console.log('DashboardLayout: Initialization complete');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Dashboard initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize dashboard');
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();

    return () => {
      mounted = false;
    };
  }, [initializeAuth, isInitialized]);

  console.log('DashboardLayout render state:', { 
    user: user?.email, 
    isHydrated, 
    isInitialized, 
    isLoading, 
    error 
  });

  // Show loading while auth is initializing
  if (isLoading || !isHydrated || !isInitialized) {
    return <LoadingSpinner message="Initializing your workspace..." />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06]">
          <h2 className="text-xl font-bold text-white mb-3">Connection Error</h2>
          <p className="text-gray-400 mb-6 text-sm">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log('DashboardLayout: No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('DashboardLayout: Rendering dashboard for user:', user.email);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading content..." />}>
        <div className="od-dashboard-shell min-h-screen bg-o-0 flex flex-col">
          <Sidebar onCollapseChange={handleSidebarStateChange} />
          <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isMobile ? (isSidebarCollapsed ? 'ml-20' : 'ml-[260px]') : ''}`}>
            <TopBar />
            <main className="flex-grow overflow-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
