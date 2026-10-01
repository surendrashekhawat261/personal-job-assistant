import type { CandidateProfile } from './types';
export function buildSearchQueries(p:CandidateProfile){
 const core=['Playwright TypeScript','QA automation','SDET'];
 const titles=p.targetTitles.slice(0,6);
 const remote=['worldwide remote','international contractor','remote India'];
 return [...new Set(titles.flatMap(t=>remote.map(r=>`"${t}" ${r}`)).concat(core.map(c=>`"${c}" worldwide remote`)))];
}
