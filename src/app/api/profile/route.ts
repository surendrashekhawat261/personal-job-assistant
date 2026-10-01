import { NextResponse } from 'next/server';
import { profiles } from '@/domain/profiles';
export async function GET(){ return NextResponse.json(profiles); }
