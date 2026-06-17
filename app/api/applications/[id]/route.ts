import { NextRequest, NextResponse } from 'next/server';
import { applications } from '@/lib/data';
import { cookies } from 'next/headers';

async function isAuth() {
  const store = await cookies();
  return store.get('wp_session')?.value === 'authenticated';
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const idx = applications.findIndex(a => a.id === +id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const patch = await req.json();
  // Whitelist editable fields
  const allowed = [
    'score','status','org_name','ein','is_501c3','org_state',
    'submitter_name','submitter_email','submitter_phone',
    'submitter_street','submitter_city','submitter_state','submitter_zip',
    'submitter_availability','submitter_timezone',
    'exec_director_name','exec_director_email','exec_director_phone',
    'website_url','social_media_handles','mission_statement',
    'years_in_operation','full_time_staff','part_time_staff','volunteers',
    'annual_operating_budget','total_assets','outstanding_debts',
    'grant_amount_requested','grant_purpose','giving_area',
    'doc_annual_report_url',
  ];
  const update: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in patch) update[key] = patch[key];
  }
  applications[idx] = { ...applications[idx], ...update } as typeof applications[number];
  return NextResponse.json(applications[idx]);
}
