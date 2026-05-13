import { useCallback } from 'react';
import { addLead, type Lead } from '../lib/offline-auth';
import { submitMarketingLeadToSupabase, normalizeMarketingLeadSource } from '../lib/marketingLeads';

interface LeadCaptureData {
  source: string;
  ctaType: string;
  formData: Lead['formData'];
}

function buildNotes(data: LeadCaptureData): string {
  const fd = data.formData;
  const lines = [
    data.ctaType && `CTA: ${data.ctaType}`,
    fd.studentName && `Student: ${fd.studentName}`,
    fd.childAge && `Child age: ${fd.childAge}`,
    fd.grade && `Grade: ${fd.grade}`,
    fd.goals?.length && `Goals: ${fd.goals.join(', ')}`,
    fd.timeline && `Timeline: ${fd.timeline}`,
    fd.budget && `Budget: ${fd.budget}`,
    fd.message && `Message: ${fd.message}`,
    fd.experience && `Experience: ${fd.experience}`,
    fd.referralSource && `Referral: ${fd.referralSource}`,
  ].filter(Boolean) as string[];
  return lines.join('\n');
}

async function syncLeadToSupabase(data: LeadCaptureData): Promise<{ ok: boolean; error?: string }> {
  const fd = data.formData;
  const email = fd.email?.trim();
  if (!email) return { ok: false, error: 'Missing email' };

  const name =
    fd.name?.trim() ||
    fd.parentName?.trim() ||
    (fd.studentName ? `Parent of ${fd.studentName}` : '') ||
    'Website visitor';

  const res = await submitMarketingLeadToSupabase({
    name,
    email,
    phone: fd.phone?.trim(),
    source: normalizeMarketingLeadSource(data.source),
    notes: buildNotes(data),
  });
  if (!res.ok) return { ok: false, error: res.error };
  return { ok: true };
}

interface LeadCaptureResult {
  leadId: string;
  supabaseOk: boolean;
  supabaseError?: string;
}

export const useLeadCapture = () => {
  const captureLead = useCallback(async (data: LeadCaptureData): Promise<LeadCaptureResult | null> => {
    let leadId: string;
    try {
      leadId = addLead(data);
    } catch (error) {
      console.error('Failed to save lead locally:', error);
      return null;
    }

    const sync = await syncLeadToSupabase(data);
    if (!sync.ok) {
      console.warn('[leads] Supabase sync failed:', sync.error);
    } else {
      console.log('🎯 Lead synced to Supabase');
    }

    console.log('🎯 Lead captured (local):', leadId);
    return { leadId, supabaseOk: sync.ok, supabaseError: sync.error };
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
    subject?: string;
  }, source: string = 'contact_form') => {
    const { subject, ...rest } = formData;
    const message = [subject && `Subject: ${subject}`, rest.message].filter(Boolean).join('\n\n');
    return captureLead({
      source,
      ctaType: 'contact',
      formData: {
        name: rest.name,
        email: rest.email,
        phone: rest.phone,
        message: message || undefined,
      },
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

export type { LeadCaptureResult };

export default useLeadCapture;
