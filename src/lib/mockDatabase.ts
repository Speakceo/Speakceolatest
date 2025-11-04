// Mock database for ORBIT system when Supabase is not available
// This allows the system to work locally without external dependencies

interface OrbitAccount {
  orbit_id: string;
  student_name: string | null;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

interface UserProgress {
  orbit_id: string;
  completed_lessons: Record<string, any>;
  completed_tasks: Record<string, any>;
  last_activity: string;
  streak: number;
  total_points: number;
  tool_usage: Record<string, any>;
}

interface Profile {
  orbit_id: string;
  email: string;
  display_name: string | null;
  progress: number;
  points: number;
  xp_points: number;
  level: number;
  streak_count: number;
  total_tasks_completed: number;
  updated_at: string;
}

class MockDatabase {
  private orbitAccounts: Map<string, OrbitAccount> = new Map();
  private userProgress: Map<string, UserProgress> = new Map();
  private profiles: Map<string, Profile> = new Map();

  constructor() {
    this.initializeAccounts();
  }

  private initializeAccounts() {
    // Create 300 ORBIT accounts if they don't exist
    const existingAccounts = localStorage.getItem('orbit_accounts');
    if (existingAccounts) {
      const accounts = JSON.parse(existingAccounts);
      accounts.forEach((account: OrbitAccount) => {
        this.orbitAccounts.set(account.orbit_id, account);
      });
    } else {
      // Create fresh accounts
      for (let i = 1; i <= 300; i++) {
        const orbitId = `Orbit1000${i.toString().padStart(2, '0')}`;
        const account: OrbitAccount = {
          orbit_id: orbitId,
          student_name: null,
          is_active: true,
          created_at: new Date().toISOString(),
          last_login: null
        };
        this.orbitAccounts.set(orbitId, account);
      }
      this.saveToLocalStorage();
    }

    // Load other data
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('orbit_accounts', JSON.stringify(Array.from(this.orbitAccounts.values())));
    localStorage.setItem('orbit_user_progress', JSON.stringify(Array.from(this.userProgress.values())));
    localStorage.setItem('orbit_profiles', JSON.stringify(Array.from(this.profiles.values())));
  }

  private loadFromLocalStorage() {
    const progressData = localStorage.getItem('orbit_user_progress');
    if (progressData) {
      const progress = JSON.parse(progressData);
      progress.forEach((p: UserProgress) => {
        this.userProgress.set(p.orbit_id, p);
      });
    }

    const profileData = localStorage.getItem('orbit_profiles');
    if (profileData) {
      const profiles = JSON.parse(profileData);
      profiles.forEach((p: Profile) => {
        this.profiles.set(p.orbit_id, p);
      });
    }
  }

  async getOrbitAccount(orbitId: string): Promise<OrbitAccount | null> {
    return this.orbitAccounts.get(orbitId) || null;
  }

  async createOrbitAccount(orbitId: string): Promise<OrbitAccount> {
    const account: OrbitAccount = {
      orbit_id: orbitId,
      student_name: null,
      is_active: true,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    this.orbitAccounts.set(orbitId, account);

    // Create associated records
    const progress: UserProgress = {
      orbit_id: orbitId,
      completed_lessons: {},
      completed_tasks: {},
      last_activity: new Date().toISOString(),
      streak: 0,
      total_points: 0,
      tool_usage: {}
    };

    const profile: Profile = {
      orbit_id: orbitId,
      email: `${orbitId.toLowerCase()}@orbitstudent.com`,
      display_name: null,
      progress: 0,
      points: 0,
      xp_points: 0,
      level: 1,
      streak_count: 0,
      total_tasks_completed: 0,
      updated_at: new Date().toISOString()
    };

    this.userProgress.set(orbitId, progress);
    this.profiles.set(orbitId, profile);
    this.saveToLocalStorage();

    return account;
  }

  async updateStudentName(orbitId: string, studentName: string): Promise<boolean> {
    const account = this.orbitAccounts.get(orbitId);
    if (!account) return false;

    account.student_name = studentName;
    account.last_login = new Date().toISOString();
    this.orbitAccounts.set(orbitId, account);

    const profile = this.profiles.get(orbitId);
    if (profile) {
      profile.display_name = studentName;
      profile.updated_at = new Date().toISOString();
      this.profiles.set(orbitId, profile);
    }

    this.saveToLocalStorage();
    return true;
  }

  async getAllAccounts(): Promise<OrbitAccount[]> {
    return Array.from(this.orbitAccounts.values());
  }

  async clearAllData(): Promise<void> {
    this.orbitAccounts.clear();
    this.userProgress.clear();
    this.profiles.clear();
    localStorage.removeItem('orbit_accounts');
    localStorage.removeItem('orbit_user_progress');
    localStorage.removeItem('orbit_profiles');
    this.initializeAccounts();
  }
}

// Singleton instance
const mockDB = new MockDatabase();

// Mock implementations of Supabase functions
export async function loginWithOrbitId(orbitId: string) {
  try {
    console.log('Mock: Attempting login with ORBIT ID:', orbitId);
    
    let orbitAccount = await mockDB.getOrbitAccount(orbitId);
    
    if (!orbitAccount) {
      // Create new account if it doesn't exist and is in valid range
      const idNumber = parseInt(orbitId.replace('Orbit1000', ''));
      if (idNumber >= 1 && idNumber <= 300) {
        orbitAccount = await mockDB.createOrbitAccount(orbitId);
      } else {
        throw new Error('Invalid ORBIT ID. Must be between Orbit100001 and Orbit100300');
      }
    }

    // Set session
    localStorage.setItem('orbit_session', JSON.stringify({
      orbitId: orbitAccount.orbit_id,
      studentName: orbitAccount.student_name,
      createdAt: orbitAccount.created_at
    }));

    return {
      isFirstTime: !orbitAccount.student_name,
      orbitId: orbitAccount.orbit_id,
      studentName: orbitAccount.student_name,
      account: orbitAccount
    };
  } catch (error: any) {
    console.error('Mock: ORBIT login error:', error);
    throw new Error(error.message || 'Login failed');
  }
}

export async function createOrbitAccount(orbitId: string) {
  return await mockDB.createOrbitAccount(orbitId);
}

export async function updateStudentName(orbitId: string, studentName: string) {
  const success = await mockDB.updateStudentName(orbitId, studentName);
  if (!success) {
    throw new Error('Failed to update student name');
  }

  // Update session
  localStorage.setItem('orbit_session', JSON.stringify({
    orbitId: orbitId,
    studentName: studentName,
    updatedAt: new Date().toISOString()
  }));

  return true;
}

export async function getCurrentOrbitUser() {
  try {
    const session = localStorage.getItem('orbit_session');
    if (!session) return null;

    const { orbitId } = JSON.parse(session);
    return await mockDB.getOrbitAccount(orbitId);
  } catch (error) {
    console.error('Mock: Error getting current ORBIT user:', error);
    return null;
  }
}

export async function logoutOrbitUser() {
  try {
    localStorage.removeItem('orbit_session');
    console.log('Mock: ORBIT user logged out');
    return true;
  } catch (error) {
    console.error('Mock: Error logging out ORBIT user:', error);
    return false;
  }
}

export async function createOrbitAccountSeries() {
  try {
    console.log('Mock: Creating ORBIT account series (1-300)...');
    
    // Clear existing data and recreate
    await mockDB.clearAllData();
    
    console.log('Mock: ✅ All 300 ORBIT accounts created successfully');
    return true;
  } catch (error: any) {
    console.error('Mock: Error creating ORBIT account series:', error);
    throw new Error(error.message || 'Failed to create account series');
  }
}

// Test function
export async function testMockDatabase() {
  try {
    const accounts = await mockDB.getAllAccounts();
    console.log(`Mock DB: ${accounts.length} accounts available`);
    
    // Test login with first account
    const result = await loginWithOrbitId('Orbit100001');
    console.log('Mock DB: Test login successful:', result.orbitId);
    
    return { success: true, accountCount: accounts.length };
  } catch (error: any) {
    console.error('Mock DB: Test failed:', error);
    return { success: false, error: error.message };
  }
}
