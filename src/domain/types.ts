export type ProfileKind='FULL_TIME'|'CONTRACT';
export type EmploymentType='PERMANENT'|'CONTRACT'|'B2B'|'UNKNOWN';
export type Eligibility='CONFIRMED'|'LIKELY'|'UNKNOWN'|'NOT_ELIGIBLE';
export type ApplicationStatus='NEW'|'REVIEWED'|'SHORTLISTED'|'APPLIED'|'SCREENING'|'INTERVIEW'|'ASSESSMENT'|'TECHNICAL'|'FINAL'|'OFFER'|'HIRED'|'REJECTED'|'WITHDRAWN'|'CLOSED'|'NO_RESPONSE'|'IGNORED';
export type ShortlistLikelihood='VERY_HIGH'|'HIGH'|'MEDIUM'|'LOW'|'VERY_LOW';
export interface CandidateProfile {kind:ProfileKind;name:string;location:string;openToRemote:boolean;summary:string;skills:string[];domains:string[];strengths:string[];targetTitles:string[];yearsExperience:number;resumeFile:string;}
export interface OpportunityInput {externalId?:string;title:string;company:string;url:string;location?:string;description:string;compensation?:string;source?:string;postedAt?:string;contractDuration?:string;timezone?:string;}
export interface OpportunityAnalysis {employmentType:EmploymentType;selectedProfile:ProfileKind;indiaEligibility:Eligibility;worldwideRemote:boolean;technicalMatch:number;responsibilityMatch:number;seniorityMatch:number;resumeEvidence:number;overallMatch:number;shortlistLikelihood:ShortlistLikelihood;shortlistConfidence:'HIGH'|'MEDIUM'|'LOW';matchedSkills:string[];missingSignals:string[];reasons:string[];dealBreakers:string[];}
export interface InterviewQuestion {category:'TECHNICAL'|'ARCHITECTURE'|'SCENARIO'|'LEADERSHIP'|'RESUME'|'GAP'|'CODING'|'BEHAVIORAL';priority:'MUST_PREPARE'|'IMPORTANT'|'ADDITIONAL';question:string;why:string;answerGuide:string[];followUps:string[];}
export interface ApplicationEventInput {type:string;detail:string;evidence?:string;occurredAt?:string;}
export interface MailMessage {id:string;threadId?:string;from:string;subject:string;body:string;receivedAt:string;}
export interface MailClassification {related:boolean;status?:ApplicationStatus;confidence:'HIGH'|'MEDIUM'|'LOW';reason:string;actionRequired?:string;}
