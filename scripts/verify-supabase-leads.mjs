/**
 * Verify Supabase URL/key from .env and whether `leads` is reachable.
 * Does not print secrets. Run: node scripts/verify-supabase-leads.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDotEnv() {
  const envPath = join(__dirname, '..', '.env');
  if (!existsSync(envPath)) return {};
  const out = {};
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i <= 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

const env = { ...process.env, ...loadDotEnv() };
const url = env.VITE_SUPABASE_URL?.trim();
const key = env.VITE_SUPABASE_ANON_KEY?.trim();

if (!url || !key) {
  console.error('FAIL: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing in .env');
  process.exit(1);
}

if (/your_supabase|placeholder/i.test(url) || key.length < 80) {
  console.error('FAIL: Supabase env looks like a placeholder; set real project URL and anon key.');
  process.exit(1);
}

if (!url.startsWith('https://')) {
  console.error('FAIL: VITE_SUPABASE_URL must be https');
  process.exit(1);
}

const supabase = createClient(url, key);
const host = new URL(url).host;

console.log(`OK: client created (${host})`);

const ping = await supabase.from('profiles').select('id').limit(1);
if (ping.error) {
  console.log(`profiles(select): ERROR — ${ping.error.message} (RLS or table missing is common for anon)`);
} else {
  console.log('profiles(select): OK');
}

const leadsHead = await supabase.from('leads').select('id', { count: 'exact', head: true });

if (leadsHead.error) {
  console.log(`leads(head count): ERROR — ${leadsHead.error.message}`);
  console.log('Hint: apply migration 20260509120000_leads_marketing_capture.sql and check RLS.');
  process.exit(2);
}

console.log(`leads(head count): OK (count=${leadsHead.count ?? 'n/a'})`);

const probe = await supabase
  .from('leads')
  .insert({
    name: 'Connection probe',
    email: `probe-${Date.now()}@verify.local`,
    source: 'website',
    status: 'new',
    notes: 'scripts/verify-supabase-leads.mjs — safe to delete',
  })
  .select('id')
  .single();

if (probe.error) {
  console.log(`leads(insert test): ERROR — ${probe.error.message}`);
  console.log('Hint: ensure RLS allows anon INSERT for source website (see migration).');
  process.exit(3);
}

console.log(`leads(insert test): OK (id=${probe.data?.id})`);

const del = await supabase.from('leads').delete().eq('id', probe.data.id);
if (del.error) {
  console.log(`leads(delete probe): WARN — ${del.error.message} (remove row ${probe.data.id} in dashboard if needed)`);
} else {
  console.log('leads(delete probe): OK');
}

console.log('All checks passed.');
process.exit(0);
