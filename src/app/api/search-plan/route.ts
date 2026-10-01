import {NextResponse} from 'next/server';import {allSearchQueries} from '@/domain/search';export async function GET(){return NextResponse.json(allSearchQueries())}
