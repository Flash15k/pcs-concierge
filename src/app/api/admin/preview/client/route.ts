import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const adminSession = req.cookies.get('admin_session');
  const previewClientId = req.cookies.get('admin_preview_client');

  if (adminSession?.value !== 'authenticated' || !previewClientId?.value) {
    return NextResponse.json({ client: null });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', previewClientId.value)
    .single();

  return NextResponse.json({ client: client || null });
}
