import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Mail, Phone, User, Calendar, MapPin, Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { getAllLeads, type Lead } from '../../lib/offline-auth';

const SimpleLeadsViewer: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');
  const [cloudStatus, setCloudStatus] = useState<'synced' | 'syncing' | 'offline'>('offline');
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const allLeads = getAllLeads();
    setLeads(allLeads);
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    if (filter === 'high') return lead.priority === 'high';
    if (filter === 'today') {
      const today = new Date().toDateString();
      return new Date(lead.timestamp).toDateString() === today;
    }
    return true;
  });

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Source', 'Type', 'Name', 'Email', 'Phone', 'Message', 'Priority'].join(','),
      ...filteredLeads.map(lead => [
        new Date(lead.timestamp).toLocaleDateString(),
        lead.source,
        lead.ctaType,
        lead.formData.name || lead.formData.parentName || '',
        lead.formData.email || '',
        lead.formData.phone || '',
        (lead.formData.message || '').replace(/,/g, ';'),
        lead.priority
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Leads</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">Total: {leads.length} leads captured</p>
            
            {/* Cloud Sync Status */}
            <div className="flex items-center space-x-2">
              {cloudStatus === 'synced' && (
                <>
                  <Cloud className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">Cloud Synced</span>
                </>
              )}
              {cloudStatus === 'syncing' && (
                <>
                  <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                  <span className="text-sm text-blue-600">Syncing...</span>
                </>
              )}
              {cloudStatus === 'offline' && (
                <>
                  <CloudOff className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Local Only</span>
                </>
              )}
              {lastSync && (
                <span className="text-xs text-gray-400">
                  Last sync: {lastSync.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
          <div className="text-sm text-gray-600">Total Leads</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {leads.filter(l => l.priority === 'high').length}
          </div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
          </div>
          <div className="text-sm text-gray-600">Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {leads.filter(l => l.formData.phone).length}
          </div>
          <div className="text-sm text-gray-600">With Phone</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All Leads
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-4 py-2 rounded-lg ${filter === 'high' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          High Priority
        </button>
        <button
          onClick={() => setFilter('today')}
          className={`px-4 py-2 rounded-lg ${filter === 'today' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Today
        </button>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No leads found</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lead.formData.name || lead.formData.parentName || 'Anonymous'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(lead.timestamp)}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {lead.source} → {lead.ctaType}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                  {lead.priority} priority
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {lead.formData.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{lead.formData.email}</span>
                  </div>
                )}
                {lead.formData.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{lead.formData.phone}</span>
                  </div>
                )}
                {lead.formData.childAge && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Child: {lead.formData.childAge}</span>
                  </div>
                )}
              </div>

              {lead.formData.studentName && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Student: </span>
                  <span className="text-sm text-gray-600">{lead.formData.studentName}</span>
                </div>
              )}

              {lead.formData.message && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{lead.formData.message}</p>
                </div>
              )}

              {(lead.formData.interests || lead.formData.goals) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {lead.formData.interests && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      Interests: {Array.isArray(lead.formData.interests) ? lead.formData.interests.join(', ') : lead.formData.interests}
                    </span>
                  )}
                  {lead.formData.goals && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      Goals: {Array.isArray(lead.formData.goals) ? lead.formData.goals.join(', ') : lead.formData.goals}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SimpleLeadsViewer;
