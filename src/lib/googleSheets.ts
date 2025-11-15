// Google Sheets Integration for Lead Capture
// Pushes lead data directly to your Google Sheet

interface LeadData {
  timestamp: string;
  source: string;
  ctaType: string;
  name?: string;
  email?: string;
  phone?: string;
  parentName?: string;
  studentName?: string;
  childAge?: string;
  message?: string;
  interests?: string[];
  grade?: string;
  experience?: string;
  goals?: string[];
  budget?: string;
  timeline?: string;
  referralSource?: string;
}

class GoogleSheetsService {
  private sheetId = '10O-1oe309UkelsUautOLoZFP0Q42AT9obaVvjbHBTQU';
  private sheetName = 'Sheet1'; // Default sheet name
  
  // Google Apps Script Web App URL (you'll need to create this)
  private webAppUrl = 'https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';

  async submitLead(leadData: LeadData): Promise<boolean> {
    try {
      // Format data for Google Sheets
      const formattedData = this.formatLeadData(leadData);
      
      // Method 1: Try Google Apps Script Web App (recommended)
      const success = await this.submitViaWebApp(formattedData);
      if (success) return true;

      // Method 2: Fallback to direct form submission
      return await this.submitViaForm(formattedData);
      
    } catch (error) {
      console.error('Failed to submit to Google Sheets:', error);
      
      // Fallback: Store locally and sync later
      this.storeLocallyForLaterSync(leadData);
      return false;
    }
  }

  private formatLeadData(leadData: LeadData) {
    return {
      timestamp: new Date(leadData.timestamp).toLocaleString(),
      date: new Date(leadData.timestamp).toLocaleDateString(),
      time: new Date(leadData.timestamp).toLocaleTimeString(),
      source: leadData.source,
      ctaType: leadData.ctaType,
      name: leadData.name || leadData.parentName || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      parentName: leadData.parentName || '',
      studentName: leadData.studentName || '',
      childAge: leadData.childAge || '',
      message: leadData.message || '',
      interests: leadData.interests?.join(', ') || '',
      grade: leadData.grade || '',
      experience: leadData.experience || '',
      goals: leadData.goals?.join(', ') || '',
      budget: leadData.budget || '',
      timeline: leadData.timeline || '',
      referralSource: leadData.referralSource || '',
      priority: this.calculatePriority(leadData),
      status: 'New'
    };
  }

  private calculatePriority(leadData: LeadData): string {
    if (leadData.phone || leadData.ctaType === 'demo') return 'High';
    if (leadData.email && leadData.name) return 'Medium';
    return 'Low';
  }

  // Method 1: Submit via Google Apps Script Web App
  private async submitViaWebApp(data: any): Promise<boolean> {
    try {
      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('✅ Lead submitted to Google Sheets via Web App');
      return true;
    } catch (error) {
      console.log('Web App submission failed, trying alternative method');
      return false;
    }
  }

  // Method 2: Submit via Google Forms (if you create a form)
  private async submitViaForm(data: any): Promise<boolean> {
    try {
      // This would use a Google Form if you create one
      // For now, we'll use a direct HTTP request to the sheet
      const formData = new FormData();
      
      // Add all the data fields
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      // Submit to a webhook or form processor
      const response = await fetch(`https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      console.log('✅ Lead submitted to Google Sheets via Form');
      return true;
    } catch (error) {
      console.log('Form submission failed');
      return false;
    }
  }

  // Fallback: Store locally for later sync
  private storeLocallyForLaterSync(leadData: LeadData) {
    try {
      const pendingLeads = JSON.parse(localStorage.getItem('pending_sheets_sync') || '[]');
      pendingLeads.push({
        ...leadData,
        syncAttempts: 0,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('pending_sheets_sync', JSON.stringify(pendingLeads));
      
      console.log('📝 Lead stored locally for later sync to Google Sheets');
      
      // Try to sync pending leads
      this.syncPendingLeads();
    } catch (error) {
      console.error('Failed to store lead locally:', error);
    }
  }

  // Sync pending leads
  async syncPendingLeads() {
    try {
      const pendingLeads = JSON.parse(localStorage.getItem('pending_sheets_sync') || '[]');
      if (pendingLeads.length === 0) return;

      const syncedLeads = [];
      for (const lead of pendingLeads) {
        if (lead.syncAttempts < 3) { // Max 3 attempts
          const success = await this.submitLead(lead);
          if (success) {
            syncedLeads.push(lead);
          } else {
            lead.syncAttempts = (lead.syncAttempts || 0) + 1;
          }
        }
      }

      // Remove successfully synced leads
      const remainingLeads = pendingLeads.filter(lead => !syncedLeads.includes(lead));
      localStorage.setItem('pending_sheets_sync', JSON.stringify(remainingLeads));

      if (syncedLeads.length > 0) {
        console.log(`✅ Synced ${syncedLeads.length} pending leads to Google Sheets`);
      }
    } catch (error) {
      console.error('Failed to sync pending leads:', error);
    }
  }

  // Get pending sync count
  getPendingSyncCount(): number {
    try {
      const pendingLeads = JSON.parse(localStorage.getItem('pending_sheets_sync') || '[]');
      return pendingLeads.length;
    } catch {
      return 0;
    }
  }
}

// Create singleton instance
const googleSheetsService = new GoogleSheetsService();

// Export functions
export const submitLeadToGoogleSheets = async (leadData: LeadData): Promise<boolean> => {
  return await googleSheetsService.submitLead(leadData);
};

export const syncPendingLeads = async (): Promise<void> => {
  return await googleSheetsService.syncPendingLeads();
};

export const getPendingSyncCount = (): number => {
  return googleSheetsService.getPendingSyncCount();
};

export default googleSheetsService;
