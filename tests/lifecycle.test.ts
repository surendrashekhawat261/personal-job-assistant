import { describe,it,expect } from 'vitest';
import { isVisibleInDiscovery,markApplied } from '../src/domain/lifecycle';
describe('application lifecycle',()=>{
 it('removes applied jobs from discovery',()=>{expect(isVisibleInDiscovery('NEW')).toBe(true);expect(isVisibleInDiscovery(markApplied('SHORTLISTED'))).toBe(false)});
 it('does not reapply terminal jobs',()=>expect(()=>markApplied('REJECTED')).toThrow());
});
