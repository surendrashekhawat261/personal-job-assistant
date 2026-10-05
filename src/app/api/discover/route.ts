import {NextResponse} from 'next/server';
import {discoverAll} from '@/services/discovery/orchestrator';
import {store} from '@/lib/store';
import {filterSeniorQaOpportunities} from '@/domain/senior-qa-gate';

export const dynamic='force-dynamic';
export async function POST(){
  try{
    const result=await discoverAll();
    const before=store.all().length;
    // Final safety gate: unrelated or junior jobs can never enter persistence.
    const accepted=filterSeniorQaOpportunities(result.jobs);
    store.addMany(accepted);
    return NextResponse.json({discovered:accepted.length,added:store.all().length-before,total:store.all().length,providers:result.providers,warnings:result.warnings,companyScan:result.companyScan});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Discovery failed'},{status:500})}
}
