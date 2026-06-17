import { NextRequest, NextResponse } from 'next/server';
import { applications } from '@/lib/data';
import { cookies } from 'next/headers';

const VALID = ['submitted', 'under_review', 'approved', 'declined'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const store = await cookies();
  if (store.get('wp_session')?.value !== 'authenticated')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { status } = await req.json();
  if (!VALID.includes(status))
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  const { id } = await params;
  const app = applications.find(a => a.id === Number(id));
  if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  app.status = status;
  return NextResponse.json({ ok: true, id: app.id, status });
}
