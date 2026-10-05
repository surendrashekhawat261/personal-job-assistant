import type {DiscoveryTrack,EmploymentType,OpportunityInput} from './types';
import {classifyEmployment,evaluateIndiaEligibility} from './analyzer';
const INDIA=/\b(india|bengaluru|bangalore|hyderabad|pune|gurugram|gurgaon|noida|delhi|ncr|chennai|mumbai|jaipur|kolkata|ahmedabad|kochi|cochin)\b/i;
export function discoveryTrack(j:OpportunityInput,employment:EmploymentType=classifyEmployment(j)):DiscoveryTrack{
  if(employment==='B2B'||employment==='CONTRACT')return 'GLOBAL_B2B';
  if(INDIA.test(`${j.location??''} ${j.description}`))return 'INDIA_FULL_TIME';
  const e=evaluateIndiaEligibility(j);
  if((employment==='PERMANENT'||employment==='UNKNOWN')&&(e.worldwide||e.eligibility==='CONFIRMED'||e.eligibility==='LIKELY'))return 'GLOBAL_FULL_TIME';
  return 'OTHER';
}
