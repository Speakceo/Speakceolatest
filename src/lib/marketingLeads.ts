import { supabase } from './supabase';
import { getUTMParams } from './leads';

function formatPostgrestError(error: {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}): string {
  const parts = [error.code, error.message, error.details, error.hint].filter(
    (x): x is string => typeof x === 'string' && x.trim().length > 0
  );
  return parts.join(' — ') || 'Could not save lead';
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

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

  const row = {
    name: input.name.trim() || 'Unknown',
    email: input.email.trim(),
    phone: input.phone?.trim() || null,
    source,
    status: 'new' as const,
    notes,
  };

  const tryInsert = async (): Promise<
    { ok: true; id: string } | { ok: false; error: string }
  > => {
    try {
      const { data, error } = await supabase.from('leads').insert(row).select('id').single();

      if (error) return { ok: false, error: formatPostgrestError(error) };
      if (!data?.id) return { ok: false, error: 'No lead id returned from server' };
      return { ok: true, id: data.id };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { ok: false, error: msg || 'Network error' };
    }
  };

  let first = await tryInsert();
  if (!first.ok) {
    await sleep(450);
    const second = await tryInsert();
    return second;
  }
  return first;
}
