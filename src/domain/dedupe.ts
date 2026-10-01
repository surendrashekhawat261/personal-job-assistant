import type {OpportunityInput} from './types';
const clean=(s:string)=>s.toLowerCase().replace(/\b(senior|sr\.?|remote|contract|full.?time)\b/g,'').replace(/[^a-z0-9]+/g,' ').trim();
export function opportunityKey(j:OpportunityInput){if(j.externalId)return`${clean(j.company)}::id::${clean(j.externalId)}`;try{const u=new URL(j.url);const path=u.pathname.replace(/\/$/,'');if(path)return`${clean(j.company)}::url::${u.hostname}${path}`}catch{}return`${clean(j.company)}::${clean(j.title)}::${clean(j.location??'')}`}
export function sameOpportunity(a:OpportunityInput,b:OpportunityInput){return opportunityKey(a)===opportunityKey(b)||(clean(a.company)===clean(b.company)&&clean(a.title)===clean(b.title))}
