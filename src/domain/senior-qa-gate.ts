import type {OpportunityInput} from './types';

export type SeniorQaGateResult={accepted:boolean;reasons:string[]};

// This is deliberately strict. Discovery is for a 16+ year QA/QE automation profile,
// not a general software-engineering feed.
const QA_TITLE=/\b(qa|quality(?:\s+assurance|\s+engineering|\s+engineer)?|qe|sdet|test(?:ing)?|software (?:development )?engineer in test|test automation|automation test)\b/i;
const QA_CONTEXT=/\b(quality assurance|quality engineering|qa automation|test automation|automated testing|testing framework|automation framework|sdet|software (?:development )?engineer in test|api testing|ui testing|e2e testing)\b/i;
const SENIOR_TITLE=/\b(senior|sr\.?|lead|principal|staff|architect|manager|head|director|associate director|vp|vice president)\b/i;
const STRONG_QA_LEADERSHIP=/\b(qa|quality|test|sdet|qe)\b.*\b(architect|principal|staff|lead|manager|director|head)\b|\b(architect|principal|staff|lead|manager|director|head)\b.*\b(qa|quality|test|sdet|qe)\b/i;
const JUNIOR=/\b(junior|jr\.?|associate|entry[ -]?level|graduate|intern|trainee|apprentice|level\s*[12]|engineer\s*[12]|engineer\s+i{1,2})\b/i;
const UNRELATED_TITLE=/\b(frontend|front-end|backend|back-end|full[ -]?stack|data engineer|data scientist|product manager|business analyst|devops|site reliability|\bsre\b|security engineer|mobile engineer|android|ios|machine learning|ml engineer|sales|marketing|recruiter)\b/i;
const MANUAL_ONLY=/\b(manual tester|manual testing only|purely manual|manual qa)\b/i;

export function evaluateSeniorQaGate(job:OpportunityInput):SeniorQaGateResult{
  const title=(job.title??'').trim();
  const description=job.description??'';
  const reasons:string[]=[];

  if(!title){return {accepted:false,reasons:['Missing job title.']};}
  if(JUNIOR.test(title)){return {accepted:false,reasons:['Junior/associate/entry-level title is below the target seniority.']};}
  if(UNRELATED_TITLE.test(title) && !QA_TITLE.test(title)){
    return {accepted:false,reasons:['Title belongs to a non-QA engineering/business role.']};
  }

  const qaTitle=QA_TITLE.test(title);
  const qaContext=QA_CONTEXT.test(description);
  if(!qaTitle){
    return {accepted:false,reasons:['Title is not explicitly QA, Quality Engineering, Test Automation, Test, or SDET.']};
  }
  if(!SENIOR_TITLE.test(title) && !STRONG_QA_LEADERSHIP.test(title)){
    return {accepted:false,reasons:['QA role is not senior/lead/staff/principal/architect/manager/director level.']};
  }
  if(MANUAL_ONLY.test(`${title} ${description}`) && !/automation|sdet|framework|api testing|playwright|selenium|cypress/i.test(description)){
    return {accepted:false,reasons:['Role is manual-testing focused without meaningful automation scope.']};
  }

  reasons.push('Explicit QA/QE/Test/SDET role family.');
  reasons.push('Senior-level title aligned to a 16+ year profile.');
  if(qaContext)reasons.push('Description contains QA automation/quality-engineering context.');
  return {accepted:true,reasons};
}

export function isSeniorQaOpportunity(job:OpportunityInput){return evaluateSeniorQaGate(job).accepted;}
export function filterSeniorQaOpportunities(jobs:OpportunityInput[]){return jobs.filter(isSeniorQaOpportunity);}
