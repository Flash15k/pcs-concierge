'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export function usePortalAuth() {
  const router = useRouter();
  const [clientId, setClientId] = useState<string | null>(null);
  const [clientData, setClientData] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/portal/login');
        return;
      }

      const { data: client } = await supabase
        .from('clients')
        .select('*')
        .eq('email', session.user.email)
        .single();

      if (!client) {
        router.push('/portal/login');
        return;
      }

      setClientId(client.id);
      setClientData(client);
      setLoading(false);
    }

    init();
  }, [router]);

  return { clientId, clientData, loading };
}
