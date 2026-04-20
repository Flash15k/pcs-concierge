import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const adminSession = req.cookies.get('admin_session');
  if (adminSession?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { clientId } = await req.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_preview_client', clientId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 2, // 2 hours
    path: '/',
  });
  return res;
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin', req.url));
  res.cookies.delete('admin_preview_client');
  return res;
}
