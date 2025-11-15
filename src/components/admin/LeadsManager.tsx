import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Mail, Phone, Calendar, Star, AlertCircle, CheckCircle, 
  XCircle, Clock, TrendingUp, Filter, Search, Download, Eye,
  MessageSquare, UserCheck, Target, Award
} from 'lucide-react';
import { 
  getAllLeads, 
  getLeadsByStatus, 
  getLeadsByPriority, 
  updateLeadStatus, 
  addLeadNotes, 
  setLeadFollowUp,
  getLeadAnalytics,
  type Lead 
} from '../../lib/offline-auth';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newNotes, setNewNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    loadLeads();
    loadAnalytics();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, filterStatus, filterPriority, searchTerm]);

  const loadLeads = () => {
    const allLeads = getAllLeads();
    setLeads(allLeads);
  };

  const loadAnalytics = () => {
    const stats = getLeadAnalytics();
    setAnalytics(stats);
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filterPriority);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.formData.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.formData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.formData.phone?.includes(searchTerm) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleStatusUpdate = (leadId: string, status: Lead['status']) => {
    updateLeadStatus(leadId, status);
    loadLeads();
    loadAnalytics();
  };

  const handleAddNotes = () => {
    if (selectedLead && newNotes.trim()) {
      addLeadNotes(selectedLead.id, newNotes.trim());
      setNewNotes('');
      loadLeads();
      // Update selected lead
      const updatedLeads = getAllLeads();
      const updatedLead = updatedLeads.find(l => l.id === selectedLead.id);
      if (updatedLead) setSelectedLead(updatedLead);
    }
  };

  const handleSetFollowUp = () => {
    if (selectedLead && followUpDate) {
      setLeadFollowUp(selectedLead.id, followUpDate);
      setFollowUpDate('');
      loadLeads();
      // Update selected lead
      const updatedLeads = getAllLeads();
      const updatedLead = updatedLeads.find(l => l.id === selectedLead.id);
      if (updatedLead) setSelectedLead(updatedLead);
    }
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'contacted': return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      case 'qualified': return <UserCheck className="h-4 w-4 text-purple-500" />;
      case 'converted': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'lost': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportLeads = () => {
    const csvContent = [
      ['ID', 'Date', 'Name', 'Email', 'Phone', 'Source', 'CTA Type', 'Status', 'Priority', 'Notes'].join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        formatDate(lead.timestamp),
        lead.formData.name || '',
        lead.formData.email || '',
        lead.formData.phone || '',
        lead.source,
        lead.ctaType,
        lead.status,
        lead.priority,
        (lead.notes || '').replace(/,/g, ';')
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Manager</h1>
          <p className="text-gray-600">Track and manage all your leads from one place</p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.byStatus.new}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.byPriority.high}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64"
                />
              </div>
            </div>

            <button
              onClick={exportLeads}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.formData.name || lead.formData.parentName || 'Anonymous'}
                        </div>
                        <div className="text-sm text-gray-500">ID: {lead.id.slice(-8)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {lead.formData.email && (
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 mr-1" />
                            {lead.formData.email}
                          </div>
                        )}
                        {lead.formData.phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            {lead.formData.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{lead.source}</div>
                        <div className="text-sm text-gray-500">{lead.ctaType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(lead.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{lead.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lead.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Modal */}
        {showModal && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                {/* Lead Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-2">
                      {selectedLead.formData.name && (
                        <p><strong>Name:</strong> {selectedLead.formData.name}</p>
                      )}
                      {selectedLead.formData.parentName && (
                        <p><strong>Parent Name:</strong> {selectedLead.formData.parentName}</p>
                      )}
                      {selectedLead.formData.email && (
                        <p><strong>Email:</strong> {selectedLead.formData.email}</p>
                      )}
                      {selectedLead.formData.phone && (
                        <p><strong>Phone:</strong> {selectedLead.formData.phone}</p>
                      )}
                      {selectedLead.formData.childAge && (
                        <p><strong>Child Age:</strong> {selectedLead.formData.childAge}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lead Details</h3>
                    <div className="space-y-2">
                      <p><strong>Source:</strong> {selectedLead.source}</p>
                      <p><strong>CTA Type:</strong> {selectedLead.ctaType}</p>
                      <p><strong>Status:</strong> {selectedLead.status}</p>
                      <p><strong>Priority:</strong> {selectedLead.priority}</p>
                      <p><strong>Date:</strong> {formatDate(selectedLead.timestamp)}</p>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedLead.id, status as Lead['status'])}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedLead.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Notes</h3>
                  {selectedLead.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <pre className="whitespace-pre-wrap text-sm">{selectedLead.notes}</pre>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNotes}
                      onChange={(e) => setNewNotes(e.target.value)}
                      placeholder="Add a note..."
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button
                      onClick={handleAddNotes}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Follow-up */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Follow-up</h3>
                  {selectedLead.followUpDate && (
                    <p className="mb-2">
                      <strong>Scheduled:</strong> {formatDate(selectedLead.followUpDate)}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="datetime-local"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    />
                    <button
                      onClick={handleSetFollowUp}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Set Follow-up
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsManager;