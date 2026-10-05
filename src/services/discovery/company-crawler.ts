import type {OpportunityInput} from '@/domain/types';
import type {TargetCompany} from './companies';
import {extractAtsJobs,extractJobPage} from './extract';
import {isSeniorQaOpportunity} from '@/domain/senior-qa-gate';

const JOB_LINK=/job|career|position|opening|vacanc/i;
const ATS=/greenhouse\.io|lever\.co|ashbyhq\.com|myworkdayjobs\.com|workdayjobs\.com|smartrecruiters\.com/i;

function absolute(base:string,href:string){try{return new URL(href,base).toString()}catch{return''}}
function links(html:string,base:string){const out:string[]=[];for(const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)){const u=absolute(base,m[1]);if(u&&/^https?:/.test(u))out.push(u)}return [...new Set(out)]}
function brand(j:OpportunityInput,c:TargetCompany):OpportunityInput{return {...j,company:c.name,targetCompany:c.name,officialCareerUrl:c.careerUrl,source:`official:${c.name}`}}

export async function crawlCompany(company:TargetCompany):Promise<OpportunityInput[]>{
  try{
    const direct=await extractAtsJobs(company.careerUrl);
    if(direct.length)return direct.filter(isSeniorQaOpportunity).map(j=>brand(j,company));
    const r=await fetch(company.careerUrl,{headers:{'user-agent':'Mozilla/5.0 PersonalJobAssistant/3.0'},signal:AbortSignal.timeout(12000)});
    if(!r.ok)return[];
    const html=await r.text();
    const discovered=links(html,company.careerUrl).filter(u=>ATS.test(u)||JOB_LINK.test(u)).slice(0,60);
    const atsRoots=[...new Set(discovered.filter(u=>ATS.test(u)).map(u=>u.split('?')[0]))].slice(0,8);
    const atsBatches=await Promise.allSettled(atsRoots.map(u=>extractAtsJobs(u)));
    const atsJobs=atsBatches.flatMap(x=>x.status==='fulfilled'?x.value:[]);
    if(atsJobs.length)return atsJobs.filter(isSeniorQaOpportunity).map(j=>brand(j,company));
    const sameHost=new URL(company.careerUrl).hostname.replace(/^www\./,'');
    const jobLinks=discovered.filter(u=>new URL(u).hostname.replace(/^www\./,'')===sameHost&&JOB_LINK.test(u)).slice(0,24);
    const pages=await Promise.allSettled(jobLinks.map(u=>extractJobPage(u,'',`official:${company.name}`)));
    return pages.flatMap(x=>x.status==='fulfilled'&&x.value?[brand(x.value,company)]:[]).filter(isSeniorQaOpportunity);
  }catch{return[]}
}

export async function crawlTargetCompanies(companies:TargetCompany[],concurrency=8):Promise<{jobs:OpportunityInput[];scanned:number;successful:number}>{
  const jobs:OpportunityInput[]=[];let successful=0;
  for(let i=0;i<companies.length;i+=concurrency){
    const batch=companies.slice(i,i+concurrency);
    const result=await Promise.all(batch.map(c=>crawlCompany(c)));
    result.forEach(rows=>{if(rows.length)successful++;jobs.push(...rows)});
  }
  return {jobs:[...new Map(jobs.map(j=>[`${j.company}|${j.externalId??j.url}`,j])).values()],scanned:companies.length,successful};
}
