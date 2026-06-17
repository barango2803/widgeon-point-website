import { NextRequest, NextResponse } from 'next/server';

const USERS: Record<string, string> = {
  'barango@camptek.ai': '123',
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (USERS[email] === password) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('wp_session', 'authenticated', { httpOnly: true, path: '/', maxAge: 60 * 60 * 8 });
    return res;
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('wp_session');
  return res;
}
