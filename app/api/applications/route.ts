import { NextRequest, NextResponse } from 'next/server';
import { applications } from '@/lib/data';
import { cookies } from 'next/headers';

async function isAuth() {
  const store = await cookies();
  return store.get('wp_session')?.value === 'authenticated';
}

export async function GET() {
  if (!await isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  if (!await isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const today = new Date();
  const newApp = {
    id: Math.max(...applications.map(a => a.id), 0) + 1,
    submitted_at: today.toISOString().split('T')[0],
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    status: 'submitted' as const,
    is_501c3: String(data.is_501c3) === '1',
    ein: data.ein ?? '',
    org_name: data.org_name ?? '',
    org_state: data.org_state ?? '',
    mission_statement: data.mission_statement ?? '',
    years_in_operation: Number(data.years_in_operation) || 0,
    full_time_staff: Number(data.full_time_staff) || 0,
    part_time_staff: Number(data.part_time_staff) || 0,
    volunteers: Number(data.volunteers) || 0,
    annual_operating_budget: Number(data.annual_operating_budget) || 0,
    total_assets: Number(data.total_assets) || 0,
    outstanding_debts: Number(data.outstanding_debts) || 0,
    submitter_name: data.submitter_name ?? '',
    submitter_street: data.submitter_street ?? '',
    submitter_city: data.submitter_city ?? '',
    submitter_state: data.submitter_state ?? '',
    submitter_zip: data.submitter_zip ?? '',
    submitter_email: data.submitter_email ?? '',
    submitter_phone: data.submitter_phone ?? '',
    submitter_availability: data.submitter_availability ?? '',
    submitter_timezone: data.submitter_timezone ?? 'ET',
    exec_director_name: data.exec_director_name ?? '',
    exec_director_email: data.exec_director_email ?? '',
    exec_director_phone: data.exec_director_phone ?? '',
    website_url: data.website_url ?? '',
    social_media_handles: data.social_media_handles ?? '',
    grant_amount_requested: Number(data.grant_amount_requested) || 0,
    grant_purpose: (data.grant_purpose ?? 'Operations') as 'Operations' | 'Capital Campaign',
    giving_area: (Number(data.giving_area) || 1) as 1|2|3|4|5,
    capital_campaign_doc: data.capital_campaign_doc || null,
    doc_irs_confirmation: '#pending',
    doc_cover_letter: '#pending',
    doc_form_990: null,
    doc_annual_report: null,
    doc_annual_report_url: data.doc_annual_report_url || null,
    doc_budget_prev_year: null,
    doc_budget_next_year: null,
  };
  applications.unshift(newApp as any);
  return NextResponse.json(newApp, { status: 201 });
}
