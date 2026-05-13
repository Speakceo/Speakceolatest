import React, { useEffect, useState } from 'react';
import {
  Users,
  BookOpen,
  CheckSquare,
  Video,
  BarChart3,
  LogOut,
  Settings,
} from 'lucide-react';
import { useUserStore } from '../../lib/store';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ADMIN_SESSION_KEY = 'admin_authenticated';

function isAdminKeySession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export default function AdminLayout() {
  const { user, logout } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [keyOk, setKeyOk] = useState(isAdminKeySession);

  useEffect(() => {
    const ok = isAdminKeySession();
    setKeyOk(ok);
    if (!ok) {
      navigate('/admin', { replace: true });
    }
  }, [navigate, location.pathname]);

  if (!keyOk) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-sm">Unlock admin from /admin with your access key…</p>
      </div>
    );
  }

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/admin/courses' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/admin/tasks' },
    { id: 'live-classes', label: 'Live Classes', icon: Video, path: '/admin/live-classes' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const isActiveTab = (tabPath: string) => {
    if (tabPath === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(tabPath);
  };

  const leaveAdmin = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    logout();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <div className="ml-4 text-sm text-gray-500">Manage your startup school platform</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{user?.name || 'Admin'}</span>
                <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  Key session
                </span>
              </div>
              <button
                type="button"
                onClick={leaveAdmin}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Lock / exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {adminTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = isActiveTab(tab.path);
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => navigate(tab.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#E3F2FD] text-indigo-700 border border-indigo-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="text-sm font-medium">124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Courses</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pending Tasks</span>
                  <span className="text-sm font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Live Classes</span>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm min-h-[600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
