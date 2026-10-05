import {describe,it,expect,vi,afterEach} from 'vitest';
import {discoverAll} from '@/services/discovery/orchestrator';

describe('company-first discovery orchestrator',()=>{
  afterEach(()=>{vi.unstubAllGlobals();delete process.env.SERPER_API_KEY});
  it('uses the 100 official career sites as primary discovery and does not require Serper',async()=>{
    delete process.env.SERPER_API_KEY;
    vi.stubGlobal('fetch',vi.fn(async()=>new Response('<html></html>',{status:200,headers:{'content-type':'text/html'}})));
    const result=await discoverAll();
    expect(result.providers).toContain('100 official company career sites');
    expect(result.companyScan.targeted).toBe(100);
    expect(result.jobs).toEqual([]);
  });
});
