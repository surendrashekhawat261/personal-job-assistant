import type { OpportunityInput } from './types';
const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export function opportunityKey(j: OpportunityInput) {
  if (j.externalId) return `${clean(j.company)}:${clean(j.externalId)}`;
  return `${clean(j.company)}:${clean(j.title)}:${clean(j.location ?? '')}`;
}
export function dedupeOpportunities(jobs: OpportunityInput[]) {
  const seen = new Set<string>();
  return jobs.filter(j => { const k = opportunityKey(j); if (seen.has(k)) return false; seen.add(k); return true; });
}
