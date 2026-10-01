import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
export async function GET(req: NextRequest) {
  const bucket=req.nextUrl.searchParams.get('bucket');
  return NextResponse.json(bucket==='discovery'?store.discovery():store.all());
}
export async function POST(req: NextRequest) {
  try { return NextResponse.json(store.add(await req.json()), {status:201}); }
  catch(e) { return NextResponse.json({error:e instanceof Error?e.message:'Invalid request'},{status:400}); }
}
