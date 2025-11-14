import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCurrentSession, logout as speakCeoLogout, clearAccountData } from '../offline-auth';
// Removed Supabase dependency

interface AppUser {
  id: string;
  speakCeoId?: string;
  name: string;
  email: string;
  avatar: string;
  courseType: 'Basic' | 'Premium';
  progress: number;
  points: number;
  role: 'student' | 'admin';
}

interface UserState {
  user: AppUser | null;
  profile: any | null;
  isHydrated: boolean;
  isInitialized: boolean;
  error: string | null;
  setUser: (user: AppUser | null) => void;
  setHydrated: (state: boolean) => void;
  initializeAuth: () => Promise<void>;
  logout: () => void;
  resetProgress: () => void;
  updateUserXP: (xpToAdd: number) => void;
  updateUserProgressValue: (newProgress: number) => void;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  clearUserLocalStorage: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isHydrated: false,
      isInitialized: false,
      error: null,
      setUser: (user) => set({ user }),
      setHydrated: (state) => set({ isHydrated: state }),
      initializeAuth: async () => {
        try {
          console.log('Initializing auth state...');
          
          // Set as initialized immediately to prevent blocking
          set({ 
            isInitialized: true,
            isHydrated: true,
            error: null 
          });
          
          // Check for SpeakCEO session
          const session = getCurrentSession();
          
          if (session && session.studentName) {
            console.log('SpeakCEO session found:', session.speakCeoId);
            
            // Clear any existing localStorage data to ensure fresh start
            get().clearUserLocalStorage();
            
            // Create app user from SpeakCEO session
            const appUser: AppUser = {
              id: session.speakCeoId,
              speakCeoId: session.speakCeoId,
              name: session.studentName,
              email: `${session.speakCeoId.toLowerCase()}@speakceo.com`,
              avatar: '/images/avatars/student-1.jpg',
              courseType: 'Premium',
              progress: 0,
              points: 0,
              role: 'student'
            };
            
            set({
              user: appUser,
              profile: session,
              error: null
            });
            
            return;
          }
          
          console.log('No active session found');
          set({
            user: null,
            profile: null,
            error: null
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
          // Always ensure app can continue
          set({
            user: null,
            profile: null,
            isHydrated: true,
            isInitialized: true,
            error: null
          });
        }
      },
      logout: async () => {
        // Logout SpeakCEO user
        speakCeoLogout();
        
        set({ user: null, profile: null, error: null });
        localStorage.removeItem('user-storage');
        localStorage.removeItem('speakceo_session');
      },
      resetProgress: () => {
        const { user } = get();
        if (!user) return;
        
        // Reset progress in local state
        set({
          user: {
            ...user,
            progress: 0,
            points: 0
          }
        });
        
        // Reset progress in database
        updateUserProgress(user.id, 0);
        updateUserPoints(user.id, 0);
        
        // Clear local storage for simulators
        localStorage.removeItem('simulator-storage');
        localStorage.removeItem('progress-storage');
        localStorage.removeItem('myStartup');
        localStorage.removeItem('brandCreator');
        localStorage.removeItem('speakSmartHistory');
        localStorage.removeItem('mathMentorHistory');
        localStorage.removeItem('writeRightHistory');
        localStorage.removeItem('mindMazeHistory');
        localStorage.removeItem('pitchDeckHistory');
        localStorage.removeItem('unified-progress-storage');
        localStorage.removeItem('ai-tools-storage');
      },
      updateUserXP: (xpToAdd) => {
        const { user } = get();
        if (!user) return;
        
        const newPoints = user.points + xpToAdd;
        
        // Update local state
        set({
          user: {
            ...user,
            points: newPoints
          }
        });
        
        // Update database
        updateUserPoints(user.id, newPoints);
      },
      updateUserProgressValue: (newProgress) => {
        const { user } = get();
        if (!user) return;
        
        // Update local state
        set({
          user: {
            ...user,
            progress: newProgress
          }
        });
        
        // Update database
        updateUserProgress(user.id, newProgress);
      },
      signOut: async () => {
        try {
          console.log('Signing out...');
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          
          set({
            user: null,
            profile: null,
            error: null
          });
          
          console.log('Sign out successful');
        } catch (error) {
          console.error('Sign out error:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to sign out'
          });
        }
      },
      updateProfile: async (updates) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user logged in');
          
          console.log('Updating profile:', updates);
          
          const { data: profile, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();
            
          if (error) throw error;
          
          // Update user state with new profile data
          const updatedUser: AppUser = {
            ...user,
            name: profile.name || user.name,
            avatar: profile.avatar_url || user.avatar,
            courseType: profile.course_type as 'Basic' | 'Premium',
            progress: profile.progress || user.progress,
            points: profile.points || user.points,
            role: profile.role as 'student' | 'admin'
          };
          
          set({ 
            user: updatedUser,
            profile, 
            error: null 
          });
          
          console.log('Profile updated successfully');
        } catch (error) {
          console.error('Profile update error:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to update profile'
          });
        }
      },
      clearUserLocalStorage: () => {
        // Clear all localStorage keys that might contain user data
        const keysToRemove = [
          'progress-storage', 
          'brand-storage',
          'simulator-storage',
          'ai-tools-storage',
          'unified-progress-storage',
          'realtime-progress-storage',
          'myStartup',
          'brandCreator',
          'speakSmartHistory',
          'mathMentorHistory',
          'writeRightHistory',
          'mindMazeHistory',
          'pitchDeckHistory'
        ];
        
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.warn(`Failed to remove localStorage key: ${key}`, error);
          }
        });
        
        console.log('🧹 Cleared user localStorage for fresh account');
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);