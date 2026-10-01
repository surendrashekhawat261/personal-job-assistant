import type { CandidateProfile } from './types';

export const fullTimeProfile: CandidateProfile = {
  kind: 'FULL_TIME',
  name: 'Surendra Singh Shekhawat',
  location: 'India',
  openToRemote: true,
  summary: 'Senior quality engineering leader focused on enterprise automation strategy, test framework architecture, QA leadership, UI/API/performance testing and remote delivery.',
  skills: ['playwright','typescript','javascript','selenium','java','c#','python','restassured','api testing','jmeter','docker','aws','jenkins','ci/cd','cypress','salesforce','bdd','tdd','testng','junit'],
  domains: ['fintech','e-commerce','manufacturing','saas','financial services'],
  strengths: ['automation strategy','framework architecture','qa leadership','quality engineering','api testing','performance testing','release validation','mentoring','root cause analysis','ci/cd'],
  targetTitles: ['test architect','qa architect','automation architect','quality architect','principal sdet','staff sdet','quality engineering lead','principal quality engineer','qa automation lead','test automation lead']
};

export const contractProfile: CandidateProfile = {
  kind: 'CONTRACT',
  name: 'Surendra Singh Shekhawat',
  location: 'India',
  openToRemote: true,
  summary: 'Remote QA consultant and automation leader with long-term enterprise client engagements, Playwright with TypeScript, AI-assisted testing, automation framework design, API/performance testing and CI/CD.',
  skills: ['playwright','typescript','ai-assisted test automation','ai-powered testing','selenium','java','c#','javascript','restassured','api testing','cypress','jmeter','docker','testcontainers','aws','jenkins','ci/cd','bdd','tdd'],
  domains: ['fintech','e-commerce','financial services','enterprise'],
  strengths: ['qa consulting','automation leadership','framework design','remote client delivery','playwright with typescript','ai-assisted testing','api automation','performance testing','release quality','ci/cd integration'],
  targetTitles: ['test automation architect','qa architect','automation architect','principal sdet','staff sdet','qa consultant','quality engineering consultant','qa automation lead','test automation lead']
};

export const profiles = { FULL_TIME: fullTimeProfile, CONTRACT: contractProfile } as const;
