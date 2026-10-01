import { describe,it,expect } from 'vitest';
import { analyzeOpportunity, classifyEmployment, evaluateIndiaEligibility } from '../src/domain/analyzer';

describe('employment classification',()=>{
 it('detects B2B',()=>expect(classifyEmployment({title:'QA Architect',company:'X',url:'x',description:'Worldwide remote B2B international contractor'})).toBe('B2B'));
 it('detects permanent',()=>expect(classifyEmployment({title:'SDET',company:'X',url:'x',description:'Full-time permanent role'})).toBe('PERMANENT'));
});

describe('India eligibility',()=>{
 it('rejects misleading US-only remote roles',()=>{const r=evaluateIndiaEligibility({title:'SDET',company:'X',url:'x',location:'Remote',description:'Applicants must reside in the United States. US work authorization required.'});expect(r.eligibility).toBe('NOT_ELIGIBLE')});
 it('confirms worldwide international contract',()=>{const r=evaluateIndiaEligibility({title:'Architect',company:'X',url:'x',location:'Worldwide Remote',description:'International contractors accepted.'});expect(r.eligibility).toBe('CONFIRMED');expect(r.worldwide).toBe(true)});
});

describe('profile selection and scoring',()=>{
 it('uses contract resume for B2B Playwright/AI role',()=>{const r=analyzeOpportunity({title:'Test Automation Architect',company:'X',url:'x',location:'Worldwide Remote',description:'B2B international contractors accepted. Playwright TypeScript AI-assisted test automation API testing CI/CD Docker AWS automation framework design.'});expect(r.selectedProfile).toBe('CONTRACT');expect(r.indiaEligibility).toBe('CONFIRMED');expect(r.overallMatch).toBeGreaterThan(60)});
 it('caps an ineligible role despite technical match',()=>{const r=analyzeOpportunity({title:'Principal SDET',company:'X',url:'x',location:'Remote',description:'Full-time Playwright TypeScript Selenium API CI/CD. Must reside in the United States. US work authorization required.'});expect(r.indiaEligibility).toBe('NOT_ELIGIBLE');expect(r.overallMatch).toBeLessThanOrEqual(49);expect(r.shortlistLikelihood).toBe('VERY_LOW')});
});
