import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Save, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { getAllLeads, type Lead } from '../../lib/offline-auth';

const LeadBackupManager: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importData, setImportData] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const exportLeads = () => {
    try {
      setIsExporting(true);
      
      const leads = getAllLeads();
      const accounts = localStorage.getItem('speakceo_accounts');
      
      const backupData = {
        leads,
        accounts: accounts ? JSON.parse(accounts) : [],
        exportDate: new Date().toISOString(),
        version: '1.0'
      };

      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `speakceo-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      showMessage('success', `Exported ${leads.length} leads and ${backupData.accounts.length} accounts successfully!`);
      
    } catch (error) {
      console.error('Export error:', error);
      showMessage('error', 'Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsCSV = () => {
    try {
      const leads = getAllLeads();
      
      const csvContent = [
        ['Date', 'Source', 'CTA Type', 'Name', 'Email', 'Phone', 'Parent Name', 'Student Name', 'Child Age', 'Message', 'Priority', 'Status'].join(','),
        ...leads.map(lead => [
          new Date(lead.timestamp).toLocaleDateString(),
          lead.source,
          lead.ctaType,
          lead.formData.name || '',
          lead.formData.email || '',
          lead.formData.phone || '',
          lead.formData.parentName || '',
          lead.formData.studentName || '',
          lead.formData.childAge || '',
          (lead.formData.message || '').replace(/,/g, ';').replace(/\n/g, ' '),
          lead.priority,
          lead.status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `speakceo-leads-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      URL.revokeObjectURL(url);
      showMessage('success', `Exported ${leads.length} leads to CSV successfully!`);
      
    } catch (error) {
      console.error('CSV export error:', error);
      showMessage('error', 'Failed to export CSV. Please try again.');
    }
  };

  const importLeads = () => {
    try {
      setIsImporting(true);
      
      if (!importData.trim()) {
        showMessage('error', 'Please paste your backup data first.');
        return;
      }

      const backupData = JSON.parse(importData);
      
      if (!backupData.leads || !Array.isArray(backupData.leads)) {
        showMessage('error', 'Invalid backup format. Please check your data.');
        return;
      }

      // Import leads
      const existingLeads = JSON.parse(localStorage.getItem('speakceo_leads') || '[]');
      const existingLeadMap = new Map(existingLeads);
      
      let newLeadsCount = 0;
      backupData.leads.forEach((lead: Lead) => {
        if (!existingLeadMap.has(lead.id)) {
          existingLeadMap.set(lead.id, lead);
          newLeadsCount++;
        }
      });
      
      localStorage.setItem('speakceo_leads', JSON.stringify(Array.from(existingLeadMap.entries())));

      // Import accounts if available
      if (backupData.accounts && Array.isArray(backupData.accounts)) {
        const existingAccounts = JSON.parse(localStorage.getItem('speakceo_accounts') || '[]');
        const existingAccountMap = new Map(existingAccounts);
        
        backupData.accounts.forEach((account: any) => {
          if (!existingAccountMap.has(account[0])) {
            existingAccountMap.set(account[0], account[1]);
          }
        });
        
        localStorage.setItem('speakceo_accounts', JSON.stringify(Array.from(existingAccountMap.entries())));
      }

      setImportData('');
      showMessage('success', `Imported ${newLeadsCount} new leads successfully! Refresh the page to see them.`);
      
      // Refresh the page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Import error:', error);
      showMessage('error', 'Failed to import data. Please check the format and try again.');
    } finally {
      setIsImporting(false);
    }
  };

  const copyBackupInstructions = () => {
    const instructions = `
SPEAKCEO LEAD BACKUP INSTRUCTIONS:

1. EXPORT YOUR DATA:
   - Click "Export Full Backup" button
   - Save the .json file to a safe location (Google Drive, Dropbox, etc.)

2. IMPORT ON NEW BROWSER:
   - Open the .json file in a text editor
   - Copy ALL the content
   - Paste it in the "Import Data" box
   - Click "Import Backup"

3. KEEP MULTIPLE BACKUPS:
   - Export weekly to avoid data loss
   - Store in multiple locations
   - Export CSV for spreadsheet use

Your secret admin key: SPEAKCEO_ADMIN_2024_SECURE_ACCESS_KEY_789
`;

    navigator.clipboard.writeText(instructions).then(() => {
      showMessage('success', 'Backup instructions copied to clipboard!');
    });
  };

  const leads = getAllLeads();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Lead Backup Manager</h3>
          <p className="text-sm text-gray-600 mt-1">
            Export your leads to keep them safe across browsers and devices
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Save className="h-4 w-4" />
          <span>{leads.length} leads stored</span>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Important!</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Your leads are stored locally in this browser. If you switch browsers or clear data, 
              your leads will be lost. Export regularly to keep them safe!
            </p>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 mb-4">Export Your Data</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={exportLeads}
            disabled={isExporting}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Full Backup'}</span>
          </button>
          
          <button
            onClick={exportAsCSV}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={copyBackupInstructions}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Instructions</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Import Backup Data</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste your backup data here:
            </label>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste the content of your backup .json file here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          
          <button
            onClick={importLeads}
            disabled={isImporting || !importData.trim()}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="h-4 w-4" />
            <span>{isImporting ? 'Importing...' : 'Import Backup'}</span>
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <p className={`text-sm ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LeadBackupManager;
