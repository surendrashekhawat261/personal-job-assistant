import type { ApplicationStatus, OpportunityInput } from '@/domain/types';
import { analyzeOpportunity } from '@/domain/analyzer';
import { opportunityKey } from '@/domain/dedupe';
import { isVisibleInDiscovery, markApplied } from '@/domain/lifecycle';

type Stored = OpportunityInput & ReturnType<typeof analyzeOpportunity> & { id: string; status: ApplicationStatus; dedupeKey: string; discoveredAt: string };
const seed: OpportunityInput[] = [
 { title:'Test Automation Architect', company:'Example Global', url:'https://example.invalid/jobs/1', location:'Worldwide Remote', description:'B2B international contractors accepted. Lead Playwright with TypeScript automation architecture, API testing, CI/CD, Docker and AWS.', compensation:'$70/hour', source:'demo' },
 { title:'Principal SDET', company:'Example US', url:'https://example.invalid/jobs/2', location:'Remote', description:'Full-time remote role. Playwright, TypeScript, Selenium and API automation. Applicants must reside in the United States and US work authorization required.', compensation:'$150,000', source:'demo' }
];
let rows: Stored[] = seed.map((j,i) => ({...j,...analyzeOpportunity(j), id:`demo-${i+1}`, status:'NEW', dedupeKey:opportunityKey(j), discoveredAt:new Date().toISOString()}));
export const store = {
 all: () => rows,
 discovery: () => rows.filter(r => isVisibleInDiscovery(r.status) && r.indiaEligibility !== 'NOT_ELIGIBLE'),
 add: (j: OpportunityInput) => { const key=opportunityKey(j); const existing=rows.find(r=>r.dedupeKey===key); if(existing) return existing; const r={...j,...analyzeOpportunity(j),id:crypto.randomUUID(),status:'NEW' as const,dedupeKey:key,discoveredAt:new Date().toISOString()}; rows.push(r); return r; },
 apply: (id:string) => { const r=rows.find(x=>x.id===id); if(!r) throw new Error('Opportunity not found'); r.status=markApplied(r.status); return r; },
 setStatus: (id:string,status:ApplicationStatus) => { const r=rows.find(x=>x.id===id); if(!r) throw new Error('Opportunity not found'); r.status=status; return r; }
};
