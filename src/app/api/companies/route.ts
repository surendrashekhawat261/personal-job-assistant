import {NextResponse} from 'next/server';
import {targetCompanies} from '@/services/discovery/companies';
export async function GET(){return NextResponse.json({count:targetCompanies.length,companies:targetCompanies})}
