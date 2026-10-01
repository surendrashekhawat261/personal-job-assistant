import type { ApplicationStatus } from './types';
const discoveryVisible: ApplicationStatus[] = ['NEW','REVIEWED','SHORTLISTED'];
export const isVisibleInDiscovery = (status: ApplicationStatus) => discoveryVisible.includes(status);
export function markApplied(current: ApplicationStatus): ApplicationStatus {
  if (['REJECTED','WITHDRAWN','CLOSED','HIRED'].includes(current)) throw new Error(`Cannot apply from terminal state ${current}`);
  return 'APPLIED';
}
