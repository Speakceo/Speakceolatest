// Completely offline authentication system for SpeakCEO
// No external dependencies, works 100% locally

interface SpeakCEOAccount {
  speakCeoId: string;
  studentName: string | null;
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
  progress: number;
  points: number;
  // Account-specific data storage
  dashboardData: {
    brandData?: any;
    startupData?: any;
    courseProgress?: any;
    achievements?: any[];
    completedLessons?: { [key: string]: boolean };
    completedTasks?: { [key: string]: boolean };
    quizScores?: { [key: string]: number };
    projectsCompleted?: string[];
    toolsUsed?: string[];
    lastActivity?: string;
    streak?: number;
    totalPoints?: number;
    level?: number;
    xpPoints?: number;
    modules?: any[];
    lessons?: any[];
    userProgress?: {
      completedLessons: { [key: string]: boolean };
      completedTasks: { [key: string]: boolean };
      lastActivity: string;
      streak: number;
      totalPoints: number;
      toolUsage: { [key: string]: number };
    };
  };
}

class OfflineAuthSystem {
  private accounts: Map<string, SpeakCEOAccount> = new Map();
  private currentSession: any = null;

  constructor() {
    this.initializeAccounts();
    this.loadSession();
  }

  // Initialize 300 SpeakCEO accounts
  private initializeAccounts() {
    const existingAccounts = localStorage.getItem('speakceo_accounts');
    
    if (existingAccounts) {
      try {
        const parsed = JSON.parse(existingAccounts);
        this.accounts = new Map(Object.entries(parsed));
        console.log(`✅ Loaded ${this.accounts.size} existing SpeakCEO accounts`);
        return;
      } catch (error) {
        console.log('Creating fresh accounts...');
      }
    }

    // Create 300 fresh accounts
    for (let i = 1; i <= 300; i++) {
      const paddedNumber = i.toString().padStart(3, '0');
      const speakCeoId = `SpeakCEO${paddedNumber}`;
      
      this.accounts.set(speakCeoId, {
        speakCeoId,
        studentName: null,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        progress: 0,
        points: 0,
        dashboardData: {
          brandData: null,
          startupData: null,
          courseProgress: {},
          achievements: [],
          completedLessons: {},
          completedTasks: {},
          quizScores: {},
          projectsCompleted: [],
          toolsUsed: [],
          lastActivity: new Date().toISOString(),
          streak: 0,
          totalPoints: 0,
          level: 1,
          xpPoints: 0,
          modules: [],
          lessons: [],
          userProgress: {
            completedLessons: {},
            completedTasks: {},
            lastActivity: new Date().toISOString(),
            streak: 0,
            totalPoints: 0,
            toolUsage: {}
          }
        }
      });
    }

    this.saveAccounts();
    console.log(`🎉 Created 300 SpeakCEO accounts (SpeakCEO001 to SpeakCEO300)`);
  }

  private saveAccounts() {
    try {
      const accountsObj = Object.fromEntries(this.accounts);
      localStorage.setItem('speakceo_accounts', JSON.stringify(accountsObj));
    } catch (error) {
      console.error('Failed to save accounts:', error);
    }
  }

  private loadSession() {
    try {
      const session = localStorage.getItem('speakceo_session');
      if (session) {
        this.currentSession = JSON.parse(session);
      }
    } catch (error) {
      this.currentSession = null;
    }
  }

  // Login with SpeakCEO ID
  async loginWithSpeakCEOId(speakCeoId: string): Promise<{
    success: boolean;
    speakCeoId: string;
    studentName: string | null;
    isFirstTime: boolean;
  }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const account = this.accounts.get(speakCeoId);
          
          if (!account) {
            reject(new Error('Invalid SpeakCEO ID. Please check your ID and try again.'));
            return;
          }

          // Update last login
          account.lastLogin = new Date().toISOString();
          this.accounts.set(speakCeoId, account);
          this.saveAccounts();

          // Set session
          this.currentSession = {
            speakCeoId: account.speakCeoId,
            studentName: account.studentName,
            loginTime: new Date().toISOString()
          };

          localStorage.setItem('speakceo_session', JSON.stringify(this.currentSession));

          resolve({
            success: true,
            speakCeoId: account.speakCeoId,
            studentName: account.studentName,
            isFirstTime: !account.studentName
          });
        } catch (error: any) {
          reject(new Error(error.message || 'Login failed'));
        }
      }, 500); // Simulate network delay
    });
  }

  // Update student name for first-time users
  async updateStudentName(speakCeoId: string, name: string): Promise<SpeakCEOAccount> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const account = this.accounts.get(speakCeoId);
          
          if (!account) {
            reject(new Error('Account not found'));
            return;
          }

          // Update account
          account.studentName = name;
          account.lastLogin = new Date().toISOString();
          this.accounts.set(speakCeoId, account);
          this.saveAccounts();

          // Update session
          this.currentSession = {
            speakCeoId: account.speakCeoId,
            studentName: account.studentName,
            loginTime: new Date().toISOString()
          };

          localStorage.setItem('speakceo_session', JSON.stringify(this.currentSession));

          resolve(account);
        } catch (error: any) {
          reject(new Error('Failed to update name'));
        }
      }, 300);
    });
  }

  // Get current session
  getCurrentSession() {
    return this.currentSession;
  }

  // Logout
  logout() {
    this.currentSession = null;
    localStorage.removeItem('speakceo_session');
  }

  // Get all accounts (for admin/verification)
  getAllAccounts(): SpeakCEOAccount[] {
    return Array.from(this.accounts.values()).sort((a, b) => 
      a.speakCeoId.localeCompare(b.speakCeoId)
    );
  }

  // Get account by ID
  getAccount(speakCeoId: string): SpeakCEOAccount | undefined {
    return this.accounts.get(speakCeoId);
  }

  // Update account progress/points
  updateProgress(speakCeoId: string, progress: number, points: number) {
    const account = this.accounts.get(speakCeoId);
    if (account) {
      account.progress = progress;
      account.points = points;
      this.accounts.set(speakCeoId, account);
      this.saveAccounts();
    }
  }

  // Get account-specific data
  getAccountData(speakCeoId: string, dataType: string) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return null;
    return account.dashboardData[dataType as keyof typeof account.dashboardData];
  }

  // Save account-specific data
  saveAccountData(speakCeoId: string, dataType: string, data: any) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    account.dashboardData[dataType as keyof typeof account.dashboardData] = data;
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    return true;
  }

  // Save user progress to account
  saveUserProgress(speakCeoId: string, progressData: any) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    // Update progress data
    account.dashboardData.userProgress = {
      ...account.dashboardData.userProgress,
      ...progressData,
      lastActivity: new Date().toISOString()
    };
    
    // Also update top-level progress and points
    account.progress = progressData.progress || account.progress;
    account.points = progressData.totalPoints || account.points;
    account.lastLogin = new Date().toISOString();
    
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    
    console.log(`💾 Progress saved for ${speakCeoId}:`, progressData);
    return true;
  }

  // Get user progress from account
  getUserProgress(speakCeoId: string) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return null;
    
    return account.dashboardData.userProgress || {
      completedLessons: {},
      completedTasks: {},
      lastActivity: new Date().toISOString(),
      streak: 0,
      totalPoints: 0,
      toolUsage: {}
    };
  }

  // Save lesson completion
  saveLessonCompletion(speakCeoId: string, lessonId: string, completed: boolean = true) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    if (!account.dashboardData.userProgress) {
      account.dashboardData.userProgress = {
        completedLessons: {},
        completedTasks: {},
        lastActivity: new Date().toISOString(),
        streak: 0,
        totalPoints: 0,
        toolUsage: {}
      };
    }
    
    account.dashboardData.userProgress.completedLessons[lessonId] = completed;
    account.dashboardData.userProgress.lastActivity = new Date().toISOString();
    
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    
    console.log(`📚 Lesson ${lessonId} ${completed ? 'completed' : 'uncompleted'} for ${speakCeoId}`);
    return true;
  }

  // Save task completion
  saveTaskCompletion(speakCeoId: string, taskId: string, completed: boolean = true) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    if (!account.dashboardData.userProgress) {
      account.dashboardData.userProgress = {
        completedLessons: {},
        completedTasks: {},
        lastActivity: new Date().toISOString(),
        streak: 0,
        totalPoints: 0,
        toolUsage: {}
      };
    }
    
    account.dashboardData.userProgress.completedTasks[taskId] = completed;
    account.dashboardData.userProgress.lastActivity = new Date().toISOString();
    
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    
    console.log(`✅ Task ${taskId} ${completed ? 'completed' : 'uncompleted'} for ${speakCeoId}`);
    return true;
  }

  // Update user points
  updateUserPoints(speakCeoId: string, points: number) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    account.points = points;
    if (account.dashboardData.userProgress) {
      account.dashboardData.userProgress.totalPoints = points;
    }
    
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    
    console.log(`💰 Points updated to ${points} for ${speakCeoId}`);
    return true;
  }

  // Clear account-specific data (for fresh start)
  clearAccountData(speakCeoId: string) {
    const account = this.accounts.get(speakCeoId);
    if (!account) return false;
    
    account.dashboardData = {
      brandData: null,
      startupData: null,
      courseProgress: {},
      achievements: [],
      completedLessons: {},
      completedTasks: {},
      quizScores: {},
      projectsCompleted: [],
      toolsUsed: [],
      lastActivity: new Date().toISOString(),
      streak: 0,
      totalPoints: 0,
      level: 1,
      xpPoints: 0,
      modules: [],
      lessons: [],
      userProgress: {
        completedLessons: {},
        completedTasks: {},
        lastActivity: new Date().toISOString(),
        streak: 0,
        totalPoints: 0,
        toolUsage: {}
      }
    };
    account.progress = 0;
    account.points = 0;
    
    this.accounts.set(speakCeoId, account);
    this.saveAccounts();
    return true;
  }

  // Reset all data (for testing)
  resetAllData() {
    localStorage.removeItem('speakceo_accounts');
    localStorage.removeItem('speakceo_session');
    // Clear all localStorage keys that might contain user data
    const keysToRemove = [
      'user-storage',
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
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    this.accounts.clear();
    this.currentSession = null;
    this.initializeAccounts();
  }
}

// Create singleton instance
const offlineAuth = new OfflineAuthSystem();

// Export functions for use in components
export const loginWithSpeakCEOId = (speakCeoId: string) => 
  offlineAuth.loginWithSpeakCEOId(speakCeoId);

export const updateStudentName = (speakCeoId: string, name: string) => 
  offlineAuth.updateStudentName(speakCeoId, name);

export const getCurrentSession = () => 
  offlineAuth.getCurrentSession();

export const logout = () => 
  offlineAuth.logout();

export const getAllAccounts = () => 
  offlineAuth.getAllAccounts();

export const getAccount = (speakCeoId: string) => 
  offlineAuth.getAccount(speakCeoId);

export const updateProgress = (speakCeoId: string, progress: number, points: number) => 
  offlineAuth.updateProgress(speakCeoId, progress, points);

export const resetAllData = () => 
  offlineAuth.resetAllData();

export const getAccountData = (speakCeoId: string, dataType: string) => 
  offlineAuth.getAccountData(speakCeoId, dataType);

export const saveAccountData = (speakCeoId: string, dataType: string, data: any) => 
  offlineAuth.saveAccountData(speakCeoId, dataType, data);

export const clearAccountData = (speakCeoId: string) => 
  offlineAuth.clearAccountData(speakCeoId);

export const saveUserProgress = (speakCeoId: string, progressData: any) => 
  offlineAuth.saveUserProgress(speakCeoId, progressData);

export const getUserProgress = (speakCeoId: string) => 
  offlineAuth.getUserProgress(speakCeoId);

export const saveLessonCompletion = (speakCeoId: string, lessonId: string, completed: boolean = true) => 
  offlineAuth.saveLessonCompletion(speakCeoId, lessonId, completed);

export const saveTaskCompletion = (speakCeoId: string, taskId: string, completed: boolean = true) => 
  offlineAuth.saveTaskCompletion(speakCeoId, taskId, completed);

export const updateUserPoints = (speakCeoId: string, points: number) => 
  offlineAuth.updateUserPoints(speakCeoId, points);

export default offlineAuth;
