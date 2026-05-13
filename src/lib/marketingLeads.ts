import { supabase } from './supabase';
import { getUTMParams } from './leads';

export const MARKETING_LEAD_SOURCES = [
  'contact_form',
  'career_guide',
  'website',
  'enrollment_popup',
  'newsletter',
  'demo_request',
  'trial_signup',
  'social_media',
  'paid_ads',
  'organic_search',
  'referral',
] as const;

export type MarketingLeadSource = (typeof MARKETING_LEAD_SOURCES)[number];

export function normalizeMarketingLeadSource(raw: string): MarketingLeadSource {
  const s = (raw || 'website').toLowerCase().replace(/\s+/g, '_');
  if ((MARKETING_LEAD_SOURCES as readonly string[]).includes(s)) return s as MarketingLeadSource;
  return 'website';
}

export interface SubmitMarketingLeadInput {
  name: string;
  email: string;
  phone?: string;
  source: string;
  notes?: string;
}

/** Inserts one row into public.leads (anon-safe when RLS policy is applied). */
export async function submitMarketingLeadToSupabase(
  input: SubmitMarketingLeadInput
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const source = normalizeMarketingLeadSource(input.source);
  const utm = getUTMParams();
  const utmNote =
    [utm.utm_source && `utm_source=${utm.utm_source}`, utm.utm_medium && `utm_medium=${utm.utm_medium}`, utm.utm_campaign && `utm_campaign=${utm.utm_campaign}`]
      .filter(Boolean)
      .join(' · ') || '';

  const notes = [input.notes?.trim(), utmNote && `UTM: ${utmNote}`].filter(Boolean).join('\n\n') || null;

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: input.name.trim() || 'Unknown',
        email: input.email.trim(),
        phone: input.phone?.trim() || null,
        source,
        status: 'new',
        notes,
      })
      .select('id')
      .single();

    if (error) return { ok: false, error: error.message };
    if (!data?.id) return { ok: false, error: 'No lead id returned' };
    return { ok: true, id: data.id };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return { ok: false, error: msg };
  }
}
