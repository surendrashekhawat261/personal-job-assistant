import { describe,it,expect } from 'vitest';
import { dedupeOpportunities } from '../src/domain/dedupe';
it('deduplicates same company/job/location',()=>{const jobs=[{title:'Principal SDET',company:'Acme',url:'a',location:'Remote',description:'x'},{title:'Principal SDET',company:'Acme',url:'b',location:'Remote',description:'x'}];expect(dedupeOpportunities(jobs)).toHaveLength(1)});
it('uses external job id when available',()=>{const jobs=[{externalId:'123',title:'SDET',company:'Acme',url:'a',description:'x'},{externalId:'123',title:'Different title',company:'Acme',url:'b',description:'x'}];expect(dedupeOpportunities(jobs)).toHaveLength(1)});
