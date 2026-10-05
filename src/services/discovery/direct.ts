import type {OpportunityInput} from '@/domain/types';
import {allSearchQueries} from '@/domain/search';
import {smartRecruitersJobs} from '@/services/ats/smartrecruiters';

/**
 * Credential-free discovery. SmartRecruiters exposes a public jobs API, so this
 * gives the portal useful live results even when no general web-search API key
 * has been configured. Other ATSs are expanded when their board URLs are found
 * by the optional web-search provider.
 */
export async function discoverFromPublicAts(maxQueries=10):Promise<OpportunityInput[]> {
  const plans=allSearchQueries();
  const raw=[...plans.CONTRACT,...plans.FULL_TIME]
    .map(q=>q.replace(/"/g,'').replace(/\b(B2B|remote|worldwide|global|international|contractor|contract|C2C|India)\b/gi,' ').replace(/\s+/g,' ').trim())
    .filter(Boolean);
  const queries=[...new Set(raw)].slice(0,maxQueries);
  const settled=await Promise.allSettled(queries.map(q=>smartRecruitersJobs(q)));
  const jobs=settled.flatMap(x=>x.status==='fulfilled'?x.value:[]);
  return [...new Map(jobs.map(j=>[`${j.source}|${j.externalId??j.url}`,j])).values()];
}
