import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3,
  LogOut,
  Bell,
  Mail,
  Search,
  RefreshCw,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Settings,
  Activity,
  TrendingUp,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { useUserStore } from '../lib/store';
import SimpleLeadsViewer from '../components/admin/SimpleLeadsViewer';
import AdminKeyAuth from '../components/admin/AdminKeyAuth';
import { getAllLeads } from '../lib/offline-auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  xp_points: number;
  level: number;
  streak_count: number;
  total_tasks_completed: number;
  current_course_id?: string;
  last_active: string;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  enrolled_count: number;
  completion_rate: number;
  created_at: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  activeCourses: number;
  totalLeads: number;
  newLeads: number;
  enrollmentRate: number;
  avgProgress: number;
}

export default function AdminDashboard() {
  const { user, logout } = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  // Data states
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    activeCourses: 0,
    totalLeads: 0,
    newLeads: 0,
    enrollmentRate: 0,
    avgProgress: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadOfflineData();
      // Set up real-time updates every 30 seconds
      const interval = setInterval(loadOfflineData, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab, isAuthenticated]);

  const loadOfflineData = async () => {
    try {
      console.log('Loading offline data...');
      setIsLoading(true);
      
      // Load data from our offline auth system
      const leads = getAllLeads();
      const accounts = JSON.parse(localStorage.getItem('speakceo_accounts') || '[]');
      const accountMap = new Map(accounts);
      
      // Convert accounts to users format
      const offlineUsers: User[] = Array.from(accountMap.values()).map((account: any) => ({
        id: account.speakCeoId,
        name: account.studentName || 'Student',
        email: `${account.speakCeoId.toLowerCase()}@speakceo.com`,
        role: 'student',
        avatar_url: '/images/avatars/student-1.jpg',
        xp_points: account.points || 0,
        level: Math.floor((account.points || 0) / 100) + 1,
        streak_count: 0,
        total_tasks_completed: 0,
        current_course_id: null,
        last_active: account.lastLogin || account.createdAt,
        created_at: account.createdAt,
        updated_at: account.createdAt
      }));

      // Sample courses
      const sampleCourses: Course[] = [
        {
          id: 'course001',
          title: 'Young CEO Fundamentals',
          description: 'Essential entrepreneurship skills for young leaders',
          is_active: true,
          enrolled_count: offlineUsers.length,
          completion_rate: 78,
          created_at: new Date().toISOString()
        },
        {
          id: 'course002',
          title: 'Business Strategy & Planning',
          description: 'Advanced business planning and strategy development',
          is_active: true,
          enrolled_count: Math.floor(offlineUsers.length * 0.7),
          completion_rate: 65,
          created_at: new Date().toISOString()
        }
      ];

      // Update stats
      setStats({
        totalUsers: offlineUsers.length,
        activeUsers: offlineUsers.filter(u => u.last_active && 
          new Date(u.last_active) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length,
        totalCourses: sampleCourses.length,
        activeCourses: sampleCourses.filter(c => c.is_active).length,
        totalLeads: leads.length,
        newLeads: leads.filter(l => 
          new Date(l.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length,
        enrollmentRate: leads.length > 0 ? Math.round((offlineUsers.length / leads.length) * 100) : 0,
        avgProgress: offlineUsers.length > 0 ? 
          Math.round(offlineUsers.reduce((sum, u) => sum + (u.xp_points || 0), 0) / offlineUsers.length) : 0
      });

      setUsers(offlineUsers);
      setCourses(sampleCourses);
      setLastUpdated(new Date());
      
      console.log('✅ Offline data loaded successfully');
    } catch (error) {
      console.error('Error loading offline data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newLeads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center space-x-4">
                <img
                  src={user.avatar_url || '/images/avatars/student-1.jpg'}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {user.xp_points} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Users ({filteredUsers.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  XP Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.avatar_url || '/images/avatars/student-1.jpg'}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.xp_points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.level}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.last_active).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLMS = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Courses ({courses.length})</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{course.enrolled_count} enrolled</span>
                  <span className="text-green-600">{course.completion_rate}% completion</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'lms':
        return renderLMS();
      case 'leads':
        return <SimpleLeadsViewer />;
      default:
        return renderDashboard();
    }
  };

  // Check authentication first
  if (!isAuthenticated) {
    return <AdminKeyAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              {isLoading && (
                <RefreshCw className="ml-4 h-5 w-5 text-gray-400 animate-spin" />
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button
                onClick={loadOfflineData}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Refresh data"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('admin_authenticated');
                  setIsAuthenticated(false);
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <nav className="w-64 bg-white rounded-lg shadow mr-8">
            <div className="p-6">
              <ul className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                  { id: 'users', label: 'Users', icon: Users },
                  { id: 'lms', label: 'Courses', icon: BookOpen },
                  { id: 'leads', label: 'Leads', icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
