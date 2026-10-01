import {NextRequest,NextResponse} from 'next/server';import {store} from '@/lib/store';
export async function GET(){return NextResponse.json(store.applications())}
export async function POST(req:NextRequest){try{const{opportunityId}=await req.json();return NextResponse.json(store.apply(opportunityId))}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Unable to apply'},{status:400})}}
