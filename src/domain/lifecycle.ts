import type {ApplicationStatus} from './types';
const discovery=new Set<ApplicationStatus>(['NEW','REVIEWED','SHORTLISTED']);
export const isVisibleInDiscovery=(s:ApplicationStatus)=>discovery.has(s);
export function markApplied(s:ApplicationStatus):ApplicationStatus{if(['REJECTED','WITHDRAWN','CLOSED','HIRED'].includes(s))throw new Error(`Cannot apply from ${s}`);return'APPLIED'}
export function canTransition(from:ApplicationStatus,to:ApplicationStatus){if(from===to)return true;if(['REJECTED','WITHDRAWN','CLOSED','HIRED'].includes(from))return false;return true}
