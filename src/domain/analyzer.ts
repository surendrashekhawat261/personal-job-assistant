import { profiles } from './profiles';
import type { Eligibility, EmploymentType, OpportunityAnalysis, OpportunityInput, ProfileKind } from './types';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#./ -]/g, ' ');
const hasAny = (text: string, terms: string[]) => terms.some(t => text.includes(t));

export function classifyEmployment(job: OpportunityInput): EmploymentType {
  const t = norm(`${job.title} ${job.description}`);
  if (hasAny(t, ['b2b','corp-to-corp','c2c','international contractor','independent contractor','outside ir35'])) return 'B2B';
  if (hasAny(t, ['contract role','contract position','contractor','freelance','consulting engagement','12 month contract','6 month contract'])) return 'CONTRACT';
  if (hasAny(t, ['full-time','full time','permanent employee','permanent role'])) return 'PERMANENT';
  return 'UNKNOWN';
}

export function evaluateIndiaEligibility(job: OpportunityInput): { eligibility: Eligibility; worldwide: boolean; evidence: string[] } {
  const t = norm(`${job.location ?? ''} ${job.description}`);
  const evidence: string[] = [];
  const blocked = ['us residents only','united states only','must reside in the united states','us work authorization required','canada residents only','must reside in canada','uk residents only','eu applicants only','eea only'];
  const confirmed = ['worldwide remote','remote worldwide','work from anywhere','international contractors accepted','international applicants welcome','india eligible','remote - india','remote india'];
  if (hasAny(t, blocked)) {
    evidence.push('A geographic/work-authorization restriction excludes an India-based candidate.');
    return { eligibility: 'NOT_ELIGIBLE', worldwide: false, evidence };
  }
  if (hasAny(t, confirmed)) {
    evidence.push('The description explicitly signals worldwide, India, or international eligibility.');
    return { eligibility: 'CONFIRMED', worldwide: hasAny(t, ['worldwide','work from anywhere','international']), evidence };
  }
  if (t.includes('remote') && hasAny(t, ['apac','asia','international','global'])) {
    evidence.push('Remote role has an APAC/global/international signal but does not explicitly name India.');
    return { eligibility: 'LIKELY', worldwide: t.includes('global') || t.includes('international'), evidence };
  }
  evidence.push('No reliable India eligibility statement was found.');
  return { eligibility: 'UNKNOWN', worldwide: false, evidence };
}

function skillMatches(text: string, skills: string[]) {
  return skills.filter(s => text.includes(norm(s)));
}

function scoreProfile(job: OpportunityInput, kind: ProfileKind) {
  const profile = profiles[kind];
  const text = norm(`${job.title} ${job.description}`);
  const skills = skillMatches(text, profile.skills);
  const strengths = skillMatches(text, profile.strengths);
  const titleHit = profile.targetTitles.some(t => text.includes(t));
  const technical = Math.min(100, Math.round((skills.length / Math.max(6, Math.min(profile.skills.length, 12))) * 100));
  const responsibilities = Math.min(100, strengths.length * 15 + (titleHit ? 25 : 0));
  return { skills, strengths, technical, responsibilities, total: Math.round(technical * 0.6 + responsibilities * 0.4) };
}

export function analyzeOpportunity(job: OpportunityInput): OpportunityAnalysis {
  const employmentType = classifyEmployment(job);
  const eligibility = evaluateIndiaEligibility(job);
  const full = scoreProfile(job, 'FULL_TIME');
  const contract = scoreProfile(job, 'CONTRACT');
  const selectedProfile: ProfileKind = employmentType === 'B2B' || employmentType === 'CONTRACT' ? 'CONTRACT' : employmentType === 'PERMANENT' ? 'FULL_TIME' : contract.total > full.total ? 'CONTRACT' : 'FULL_TIME';
  const score = selectedProfile === 'CONTRACT' ? contract : full;
  const dealBreakers = eligibility.eligibility === 'NOT_ELIGIBLE' ? ['India-based candidate is excluded by the stated geographic/work-authorization rule.'] : [];
  const eligibilityFactor = eligibility.eligibility === 'CONFIRMED' ? 100 : eligibility.eligibility === 'LIKELY' ? 80 : eligibility.eligibility === 'UNKNOWN' ? 55 : 0;
  const overallMatch = dealBreakers.length ? Math.min(score.total, 49) : Math.round(score.total * 0.8 + eligibilityFactor * 0.2);
  const shortlistLikelihood = dealBreakers.length ? 'VERY_LOW' : overallMatch >= 88 ? 'VERY_HIGH' : overallMatch >= 75 ? 'HIGH' : overallMatch >= 60 ? 'MEDIUM' : overallMatch >= 45 ? 'LOW' : 'VERY_LOW';
  const shortlistConfidence = eligibility.eligibility === 'UNKNOWN' ? 'LOW' : score.skills.length >= 4 ? 'HIGH' : 'MEDIUM';
  const text = norm(job.description);
  const missingSignals = ['playwright','typescript','api','ci/cd','aws','docker'].filter(s => !text.includes(s));
  return {
    employmentType, selectedProfile, indiaEligibility: eligibility.eligibility, worldwideRemote: eligibility.worldwide,
    technicalMatch: score.technical, responsibilityMatch: score.responsibilities, overallMatch,
    shortlistLikelihood, shortlistConfidence, matchedSkills: score.skills, missingSignals,
    reasons: [...eligibility.evidence, `Selected ${selectedProfile === 'CONTRACT' ? 'contract/B2B' : 'full-time'} resume profile.`, `${score.skills.length} relevant technical signals found.`],
    dealBreakers
  };
}
