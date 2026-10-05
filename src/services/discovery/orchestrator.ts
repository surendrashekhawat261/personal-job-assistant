import type {OpportunityInput} from '@/domain/types';
import {discoverFromSearch} from './engine';
import {SerperSearchProvider} from './web-search';
import {targetCompanies} from './companies';
import {crawlTargetCompanies} from './company-crawler';
import {filterSeniorQaOpportunities} from '@/domain/senior-qa-gate';

export type DiscoveryResult={jobs:OpportunityInput[];providers:string[];warnings:string[];companyScan:{targeted:number;successful:number}};

export async function discoverAll():Promise<DiscoveryResult>{
  const warnings:string[]=[];
  const providers:string[]=['100 official company career sites'];
  const enabled=targetCompanies.filter(c=>c.enabled);
  const official=await crawlTargetCompanies(enabled,16);
  const batches:OpportunityInput[][]=[official.jobs];
  if(official.successful===0)warnings.push('Official career scan completed but no senior QA/QE roles could be extracted. Some career sites may require browser-based extraction or ATS-specific adapters.');

  if(process.env.SERPER_API_KEY?.trim()){
    providers.push('Serper fallback');
    try{batches.push(await discoverFromSearch(new SerperSearchProvider(),8,24))}catch(e){warnings.push(`Serper fallback: ${e instanceof Error?e.message:String(e)}`)}
  }

  const deduped=[...new Map(batches.flat().map(j=>[`${j.targetCompany??j.company}|${j.externalId??''}|${j.url}`,j])).values()];
  const jobs=filterSeniorQaOpportunities(deduped);
  return {jobs,providers,warnings,companyScan:{targeted:official.scanned,successful:official.successful}};
}
