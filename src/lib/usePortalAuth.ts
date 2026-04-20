'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export function usePortalAuth() {
  const router = useRouter();
  const [clientId, setClientId] = useState<string | null>(null);
  const [clientData, setClientData] = useState<Record<string, string> | null>(null);
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      // Check for admin preview mode first
      const previewRes = await fetch('/api/admin/preview/client');
      if (previewRes.ok) {
        const { client } = await previewRes.json();
        if (client) {
          setClientId(client.id);
          setClientData(client);
          setIsAdminPreview(true);
          setLoading(false);
          return;
        }
      }

      // Fall back to Supabase auth
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

  return { clientId, clientData, isAdminPreview, loading };
}
