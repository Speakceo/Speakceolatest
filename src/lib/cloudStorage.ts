// Cloud Storage for Permanent Lead Storage
// Uses JSONBin.io - a free JSON storage service

interface CloudStorageService {
  saveLeads: (leads: any[]) => Promise<boolean>;
  loadLeads: () => Promise<any[]>;
  syncLeads: () => Promise<void>;
}

class JSONBinStorage implements CloudStorageService {
  private binId = 'speakceo-leads-storage';
  private apiKey = 'your-jsonbin-api-key'; // We'll use a public bin for now
  private baseUrl = 'https://api.jsonbin.io/v3/b';
  
  // Public bin ID for SpeakCEO leads (no API key needed)
  private publicBinId = '6751a2b5ad19ca34f8c8f123'; // This will be created

  async saveLeads(leads: any[]): Promise<boolean> {
    try {
      console.log('💾 Saving leads to cloud storage...');
      
      const data = {
        leads: leads,
        lastUpdated: new Date().toISOString(),
        totalCount: leads.length,
        source: 'speakceo-website'
      };

      // Try to update existing bin first
      let response = await fetch(`${this.baseUrl}/${this.publicBinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Bin-Name': 'SpeakCEO Leads Storage'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        // If update fails, create new bin
        response = await fetch(`${this.baseUrl}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Bin-Name': 'SpeakCEO Leads Storage',
            'X-Bin-Private': 'false'
          },
          body: JSON.stringify(data)
        });
      }

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Leads saved to cloud successfully');
        
        // Store the bin ID for future use
        if (result.metadata?.id) {
          localStorage.setItem('cloud_bin_id', result.metadata.id);
        }
        
        return true;
      } else {
        console.error('Failed to save to cloud:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error saving leads to cloud:', error);
      return false;
    }
  }

  async loadLeads(): Promise<any[]> {
    try {
      console.log('📥 Loading leads from cloud storage...');
      
      // Try to get the stored bin ID first
      const storedBinId = localStorage.getItem('cloud_bin_id') || this.publicBinId;
      
      const response = await fetch(`${this.baseUrl}/${storedBinId}/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const leads = result.record?.leads || [];
        console.log(`✅ Loaded ${leads.length} leads from cloud`);
        return leads;
      } else {
        console.log('No cloud data found, starting fresh');
        return [];
      }
    } catch (error) {
      console.error('Error loading leads from cloud:', error);
      return [];
    }
  }

  async syncLeads(): Promise<void> {
    try {
      console.log('🔄 Syncing leads with cloud...');
      
      // Get local leads
      const localLeads = JSON.parse(localStorage.getItem('speakceo_leads') || '[]');
      const localLeadsArray = Array.from(new Map(localLeads).values());
      
      // Get cloud leads
      const cloudLeads = await this.loadLeads();
      
      // Merge leads (local takes priority for duplicates)
      const mergedLeads = new Map();
      
      // Add cloud leads first
      cloudLeads.forEach((lead: any) => {
        mergedLeads.set(lead.id, lead);
      });
      
      // Add/update with local leads
      localLeadsArray.forEach((lead: any) => {
        mergedLeads.set(lead.id, lead);
      });
      
      const finalLeads = Array.from(mergedLeads.values());
      
      // Save merged leads to cloud
      await this.saveLeads(finalLeads);
      
      // Update local storage with merged data
      localStorage.setItem('speakceo_leads', JSON.stringify(Array.from(mergedLeads.entries())));
      
      console.log(`✅ Synced ${finalLeads.length} leads successfully`);
    } catch (error) {
      console.error('Error syncing leads:', error);
    }
  }
}

// Alternative: Simple GitHub Gist Storage
class GitHubGistStorage implements CloudStorageService {
  private gistId = 'your-gist-id';
  private token = 'your-github-token'; // Optional for public gists
  
  async saveLeads(leads: any[]): Promise<boolean> {
    try {
      const data = {
        leads: leads,
        lastUpdated: new Date().toISOString(),
        totalCount: leads.length
      };

      // Create or update gist
      const response = await fetch(`https://api.github.com/gists${this.gistId ? `/${this.gistId}` : ''}`, {
        method: this.gistId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token && { 'Authorization': `token ${this.token}` })
        },
        body: JSON.stringify({
          description: 'SpeakCEO Leads Storage',
          public: false,
          files: {
            'speakceo-leads.json': {
              content: JSON.stringify(data, null, 2)
            }
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (!this.gistId) {
          this.gistId = result.id;
          localStorage.setItem('gist_id', result.id);
        }
        console.log('✅ Leads saved to GitHub Gist');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving to GitHub Gist:', error);
      return false;
    }
  }

  async loadLeads(): Promise<any[]> {
    try {
      if (!this.gistId) {
        this.gistId = localStorage.getItem('gist_id') || '';
        if (!this.gistId) return [];
      }

      const response = await fetch(`https://api.github.com/gists/${this.gistId}`);
      if (response.ok) {
        const gist = await response.json();
        const content = gist.files['speakceo-leads.json']?.content;
        if (content) {
          const data = JSON.parse(content);
          return data.leads || [];
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading from GitHub Gist:', error);
      return [];
    }
  }

  async syncLeads(): Promise<void> {
    // Similar to JSONBin sync logic
    const localLeads = JSON.parse(localStorage.getItem('speakceo_leads') || '[]');
    const localLeadsArray = Array.from(new Map(localLeads).values());
    await this.saveLeads(localLeadsArray);
  }
}

// Create storage instance
const cloudStorage = new JSONBinStorage();

// Export functions
export const saveLeadsToCloud = async (leads: any[]): Promise<boolean> => {
  return await cloudStorage.saveLeads(leads);
};

export const loadLeadsFromCloud = async (): Promise<any[]> => {
  return await cloudStorage.loadLeads();
};

export const syncLeadsWithCloud = async (): Promise<void> => {
  return await cloudStorage.syncLeads();
};

// Auto-sync function that runs periodically
export const startAutoSync = () => {
  // Sync every 5 minutes
  setInterval(async () => {
    try {
      await syncLeadsWithCloud();
      console.log('🔄 Auto-sync completed');
    } catch (error) {
      console.error('Auto-sync failed:', error);
    }
  }, 5 * 60 * 1000);
  
  // Initial sync
  setTimeout(() => {
    syncLeadsWithCloud();
  }, 2000);
};

export default cloudStorage;
