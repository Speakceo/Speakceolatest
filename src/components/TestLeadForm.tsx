import React, { useState } from 'react';
import { useLeadCapture } from '../hooks/useLeadCapture';
import { getAllLeads } from '../lib/offline-auth';

const TestLeadForm: React.FC = () => {
  const [testData, setTestData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    message: 'This is a test lead submission'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string>('');

  const { captureLead } = useLeadCapture();

  const handleTestSubmit = async () => {
    setIsSubmitting(true);
    setResult('');

    try {
      console.log('🧪 Testing lead submission...');
      
      const leadId = await captureLead({
        source: 'test-form',
        ctaType: 'test',
        formData: testData
      });

      if (leadId) {
        setResult(`✅ Success! Lead ID: ${leadId}`);
        
        // Check if lead appears in storage
        const allLeads = getAllLeads();
        const foundLead = allLeads.find(lead => lead.id === leadId);
        
        if (foundLead) {
          setResult(prev => prev + `\n✅ Lead found in storage: ${JSON.stringify(foundLead, null, 2)}`);
        } else {
          setResult(prev => prev + `\n❌ Lead NOT found in storage`);
        }
        
        setResult(prev => prev + `\n📊 Total leads in storage: ${allLeads.length}`);
      } else {
        setResult('❌ Failed to capture lead');
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`);
      console.error('Test submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStorage = () => {
    try {
      const allLeads = getAllLeads();
      const localStorage_leads = localStorage.getItem('speakceo_leads');
      
      setResult(`📊 Storage Check:
Total leads: ${allLeads.length}
LocalStorage raw: ${localStorage_leads ? 'EXISTS' : 'EMPTY'}
LocalStorage size: ${localStorage_leads?.length || 0} characters

Recent leads:
${allLeads.slice(0, 3).map(lead => `- ${lead.formData.name || 'No name'} (${lead.formData.email || 'No email'}) - ${new Date(lead.timestamp).toLocaleString()}`).join('\n')}
      `);
    } catch (error) {
      setResult(`❌ Storage check error: ${error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">🧪 Lead Capture Test</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={testData.name}
            onChange={(e) => setTestData({...testData, name: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={testData.email}
            onChange={(e) => setTestData({...testData, email: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={testData.phone}
            onChange={(e) => setTestData({...testData, phone: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={testData.message}
            onChange={(e) => setTestData({...testData, message: e.target.value})}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleTestSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Testing...' : '🧪 Test Lead Submission'}
        </button>
        
        <button
          onClick={handleCheckStorage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📊 Check Storage
        </button>
      </div>

      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Test Results:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">Debug Instructions:</h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Click "Test Lead Submission" to submit a test lead</li>
          <li>2. Check the console (F12) for any errors</li>
          <li>3. Click "Check Storage" to see what's in localStorage</li>
          <li>4. Go to /admin to see if the lead appears there</li>
          <li>5. If issues persist, check browser console for errors</li>
        </ol>
      </div>
    </div>
  );
};

export default TestLeadForm;
