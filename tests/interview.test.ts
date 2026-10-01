import { expect,it } from 'vitest';
import { analyzeOpportunity } from '../src/domain/analyzer';
import { generateInterviewQuestions } from '../src/domain/interview';
it('generates JD-specific Playwright and AI questions',()=>{const job={title:'QA Architect',company:'X',url:'x',description:'Worldwide remote international contractors accepted. Playwright TypeScript AI API CI/CD.'};const qs=generateInterviewQuestions(job,analyzeOpportunity(job));expect(qs.some(q=>q.question.includes('Playwright'))).toBe(true);expect(qs.some(q=>q.category==='AI in QA')).toBe(true)});
