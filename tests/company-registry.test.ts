import {describe,expect,it} from 'vitest';
import {targetCompanies,isRealTargetCompanyName} from '@/services/discovery/companies';

describe('target company registry',()=>{
  it('contains a broad deduplicated registry of real employers',()=>{
    expect(targetCompanies.length).toBeGreaterThan(130);
    expect(targetCompanies.every(c=>c.enabled&&c.careerUrl.startsWith('https://'))).toBe(true);
  });
  it('has normalized unique company names',()=>{
    const normalize=(s:string)=>s.toLowerCase().replace(/\b(india|systems|technologies|technology|inc|ltd|limited|corporation|corp|co)\b/g,'').replace(/[^a-z0-9]+/g,' ').trim();
    expect(new Set(targetCompanies.map(c=>normalize(c.name))).size).toBe(targetCompanies.length);
  });
  it('includes new real companies requested by the user',()=>{
    for(const name of ['Apple','Meta','Intel','Qualcomm','Samsung R&D Institute India','GlobalLogic','L&T Technology Services','3i Infotech','Sify Technologies'])
      expect(targetCompanies.some(c=>c.name===name)).toBe(true);
  });
  it('rejects generated TechCorp placeholder rows',()=>{
    expect(isRealTargetCompanyName('TechCorp Systems Enterprise Ltd. Unit-51')).toBe(false);
    expect(isRealTargetCompanyName('Microsoft India')).toBe(true);
    expect(targetCompanies.some(c=>/^TechCorp Systems Enterprise Ltd\. Unit-/i.test(c.name))).toBe(false);
  });
});
