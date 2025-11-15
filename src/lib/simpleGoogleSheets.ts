// Simple Google Sheets integration using Google Forms
// This bypasses Google Apps Script entirely

interface SimpleLeadData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source: string;
  ctaType: string;
}

class SimpleGoogleSheetsService {
  // You'll create a Google Form and get this URL
  private formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
  
  // Form field IDs (you'll get these from your Google Form)
  private fieldIds = {
    name: 'entry.123456789',      // Replace with actual field ID
    email: 'entry.987654321',     // Replace with actual field ID  
    phone: 'entry.555666777',     // Replace with actual field ID
    message: 'entry.111222333',   // Replace with actual field ID
    source: 'entry.444555666',    // Replace with actual field ID
    ctaType: 'entry.777888999'    // Replace with actual field ID
  };

  async submitLead(leadData: SimpleLeadData): Promise<boolean> {
    try {
      // Create form data
      const formData = new FormData();
      
      // Add data to form
      if (leadData.name) formData.append(this.fieldIds.name, leadData.name);
      if (leadData.email) formData.append(this.fieldIds.email, leadData.email);
      if (leadData.phone) formData.append(this.fieldIds.phone, leadData.phone);
      if (leadData.message) formData.append(this.fieldIds.message, leadData.message);
      formData.append(this.fieldIds.source, leadData.source);
      formData.append(this.fieldIds.ctaType, leadData.ctaType);
      
      // Submit to Google Forms
      const response = await fetch(this.formUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Forms
        body: formData
      });

      console.log('✅ Lead submitted to Google Sheets via Form');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to submit to Google Forms:', error);
      
      // Fallback: Store locally
      this.storeLocally(leadData);
      return false;
    }
  }

  private storeLocally(leadData: SimpleLeadData) {
    try {
      const leads = JSON.parse(localStorage.getItem('pending_leads') || '[]');
      leads.push({
        ...leadData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('pending_leads', JSON.stringify(leads));
      console.log('📝 Lead stored locally for later submission');
    } catch (error) {
      console.error('Failed to store lead locally:', error);
    }
  }
}

export const simpleGoogleSheets = new SimpleGoogleSheetsService();
export default simpleGoogleSheets;
