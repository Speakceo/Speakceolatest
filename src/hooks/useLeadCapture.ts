import { useCallback } from 'react';
import { addLead, type Lead } from '../lib/offline-auth';
import { submitLeadToGoogleSheets } from '../lib/googleSheets';

interface LeadCaptureData {
  source: string;
  ctaType: string;
  formData: Lead['formData'];
}

export const useLeadCapture = () => {
  const captureLead = useCallback(async (data: LeadCaptureData) => {
    try {
      // Store lead locally in our offline system
      const leadId = addLead(data);
      
      // Show success notification
      console.log('🎯 Lead captured successfully:', leadId);
      console.log('📊 Lead stored in admin panel - accessible via /admin');
      
      // Optional: Show user feedback
      if (typeof window !== 'undefined') {
        console.log('Thank you! We\'ll be in touch soon.');
      }
      
      return leadId;
    } catch (error) {
      console.error('Failed to capture lead:', error);
      return null;
    }
  }, []);

  const captureEmailSignup = useCallback((email: string, source: string = 'unknown') => {
    return captureLead({
      source,
      ctaType: 'email_signup',
      formData: { email }
    });
  }, [captureLead]);

  const captureContactForm = useCallback((formData: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }, source: string = 'contact_form') => {
    return captureLead({
      source,
      ctaType: 'contact',
      formData
    });
  }, [captureLead]);

  const captureDemoRequest = useCallback((formData: {
    parentName: string;
    email: string;
    phone?: string;
    studentName?: string;
    childAge?: string;
    interests?: string[];
  }, source: string = 'demo_request') => {
    return captureLead({
      source,
      ctaType: 'demo',
      formData
    });
  }, [captureLead]);

  const captureTrialSignup = useCallback((formData: {
    name: string;
    email: string;
    phone?: string;
    grade?: string;
    experience?: string;
  }, source: string = 'trial_signup') => {
    return captureLead({
      source,
      ctaType: 'trial',
      formData
    });
  }, [captureLead]);

  return {
    captureLead,
    captureEmailSignup,
    captureContactForm,
    captureDemoRequest,
    captureTrialSignup
  };
};

export default useLeadCapture;
