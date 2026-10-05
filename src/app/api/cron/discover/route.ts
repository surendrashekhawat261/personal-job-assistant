import {NextRequest,NextResponse} from 'next/server';
import {authorizedCron} from '@/services/scheduler';
import {discoverAll} from '@/services/discovery/orchestrator';
import {store} from '@/lib/store';
export const dynamic='force-dynamic';
export async function POST(req:NextRequest){if(!authorizedCron(req))return NextResponse.json({error:'Unauthorized'},{status:401});try{const result=await discoverAll();const before=store.all().length;store.addMany(result.jobs);return NextResponse.json({discovered:result.jobs.length,added:store.all().length-before,providers:result.providers,warnings:result.warnings,companyScan:result.companyScan})}catch(e){return NextResponse.json({error:String(e)},{status:500})}}
