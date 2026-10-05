import {describe,it,expect} from 'vitest';
import {evaluateSeniorQaGate,filterSeniorQaOpportunities} from '@/domain/senior-qa-gate';
import type {OpportunityInput} from '@/domain/types';
const j=(title:string,description='Playwright Selenium API testing automation framework CI/CD quality engineering'):OpportunityInput=>({title,company:'Example',url:'https://example.com/job',description,source:'test'});

describe('16+ year senior QA hard gate',()=>{
  it.each([
    'QA Architect','Test Automation Architect','Quality Engineering Manager','Principal SDET','Staff SDET','Senior QA Automation Engineer','QA Automation Lead','Director of Quality Engineering','Senior Test Automation Engineer'
  ])('accepts target senior QA role: %s',(title:string)=>expect(evaluateSeniorQaGate(j(title)).accepted).toBe(true));

  it.each([
    'Software Engineer','Senior Software Engineer','Senior Backend Engineer','DevOps Engineer','Site Reliability Engineer','Product Manager','Data Engineer','QA Analyst','QA Engineer','Junior QA Engineer','Associate QA Engineer','Manual Tester'
  ])('rejects unrelated or below-target role: %s',(title:string)=>expect(evaluateSeniorQaGate(j(title)).accepted).toBe(false));

  it('does not accept a generic senior engineer merely because the JD mentions tests',()=>{
    expect(evaluateSeniorQaGate(j('Senior Software Engineer','Own backend services and write automated tests using Playwright.')).accepted).toBe(false);
  });

  it('filters mixed feeds before persistence/display',()=>{
    expect(filterSeniorQaOpportunities([j('Principal SDET'),j('Senior Backend Engineer'),j('QA Engineer'),j('QA Architect')]).map(x=>x.title)).toEqual(['Principal SDET','QA Architect']);
  });
});
