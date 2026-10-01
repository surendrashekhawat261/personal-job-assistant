import type { OpportunityInput, OpportunityAnalysis } from './types';
export type InterviewQuestion={category:string;priority:'MUST_PREPARE'|'IMPORTANT'|'ADDITIONAL';question:string;why:string};
export function generateInterviewQuestions(job:OpportunityInput,a:OpportunityAnalysis):InterviewQuestion[]{
 const text=job.description.toLowerCase(); const q:InterviewQuestion[]=[];
 if(text.includes('playwright')) q.push({category:'Technical',priority:'MUST_PREPARE',question:'How would you design a scalable Playwright automation framework for this product?',why:'Playwright is explicitly required by the JD.'});
 if(text.includes('typescript')) q.push({category:'Technical',priority:'MUST_PREPARE',question:'Which TypeScript patterns do you use to keep a large test framework maintainable?',why:'TypeScript is explicitly required by the JD.'});
 if(text.includes('api')) q.push({category:'API',priority:'IMPORTANT',question:'How do you design API automation and decide what belongs at API vs UI level?',why:'The JD contains API-testing responsibilities.'});
 if(text.includes('ci/cd')||text.includes('jenkins')) q.push({category:'DevOps',priority:'IMPORTANT',question:'How do you integrate quality gates and automated tests into CI/CD without slowing delivery?',why:'CI/CD integration is part of the role.'});
 if(text.includes('ai')) q.push({category:'AI in QA',priority:'MUST_PREPARE',question:'How have you used AI-assisted testing while validating generated output and controlling hallucinations?',why:'The JD asks for AI-related testing experience.'});
 q.push({category:'Resume',priority:'MUST_PREPARE',question:`Walk us through the experience in your ${a.selectedProfile==='CONTRACT'?'contract':'full-time'} resume that is most relevant to this role.`,why:'Interviewers commonly validate the experience that drove the shortlist.'});
 for(const gap of a.missingSignals.slice(0,2)) q.push({category:'Gap',priority:'ADDITIONAL',question:`What is your experience with ${gap}, and how would you become productive with it quickly?`,why:`This signal is not clearly represented in the JD/resume match analysis.`});
 return q;
}
