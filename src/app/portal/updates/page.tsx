'use client';

import { useEffect, useState } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import AdminPreviewBanner from '@/components/portal/AdminPreviewBanner';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

type Update = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 1) return `${days} days ago`;
  if (days === 1) return 'Yesterday';
  if (hours > 0) return `${hours}h ago`;
  return 'Today';
}

export default function PortalUpdates() {
  const { clientId, clientData, isAdminPreview, loading } = usePortalAuth();
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    if (!clientId) return;
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase
        .from('updates')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      setUpdates(data || []);
    }
    fetchData();
  }, [clientId]);

  if (loading) return <LoadingScreen />;

  const intake = clientData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {isAdminPreview && <AdminPreviewBanner clientName={`${intake?.first_name} ${intake?.last_name}`} />}
      <PortalNav />
      <main className={`ml-60 flex-1 p-8 ${isAdminPreview ? 'pt-16' : ''}`}>
        <div className="mb-8">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">From Your Concierge</p>
          <h1 className="font-serif text-3xl text-[#0B2545]">My Updates</h1>
          <p className="text-[#6A7381] text-sm mt-1">Every concierge update in one place, written clearly and professionally</p>
        </div>

        {updates.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9DEE6] shadow-sm">
            <p className="text-[#6A7381]">Your concierge will post updates here as your move progresses — vendor confirmations, housing options, and more.</p>
          </div>
        ) : (
          <div className="max-w-2xl flex flex-col gap-4">
            {updates.map((u, i) => (
              <div key={u.id} className="bg-white rounded-2xl p-6 border border-[#D9DEE6] shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0B2545] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#C6A65A] text-sm font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-[#0B2545]">{u.title}</h3>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[#6A7381] text-xs">{timeAgo(u.created_at)}</p>
                        <p className="text-[#6A7381] text-xs">{new Date(u.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                    <p className="text-[#6A7381] text-sm leading-relaxed">{u.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function LoadingScreen() {
  return <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center"><p className="text-[#6A7381]">Loading…</p></div>;
}
