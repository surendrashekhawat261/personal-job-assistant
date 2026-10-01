export type ProfileKind = 'FULL_TIME' | 'CONTRACT';
export type EmploymentType = 'PERMANENT' | 'CONTRACT' | 'B2B' | 'UNKNOWN';
export type Eligibility = 'CONFIRMED' | 'LIKELY' | 'UNKNOWN' | 'NOT_ELIGIBLE';
export type ApplicationStatus = 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'TECHNICAL' | 'FINAL' | 'OFFER' | 'HIRED' | 'REJECTED' | 'WITHDRAWN' | 'CLOSED' | 'NO_RESPONSE' | 'IGNORED';

export interface CandidateProfile {
  kind: ProfileKind;
  name: string;
  location: string;
  openToRemote: boolean;
  summary: string;
  skills: string[];
  domains: string[];
  strengths: string[];
  targetTitles: string[];
}

export interface OpportunityInput {
  externalId?: string;
  title: string;
  company: string;
  url: string;
  location?: string;
  description: string;
  compensation?: string;
  source?: string;
}

export interface OpportunityAnalysis {
  employmentType: EmploymentType;
  selectedProfile: ProfileKind;
  indiaEligibility: Eligibility;
  worldwideRemote: boolean;
  technicalMatch: number;
  responsibilityMatch: number;
  overallMatch: number;
  shortlistLikelihood: 'VERY_HIGH' | 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW';
  shortlistConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
  matchedSkills: string[];
  missingSignals: string[];
  reasons: string[];
  dealBreakers: string[];
}
