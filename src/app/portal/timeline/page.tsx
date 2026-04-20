'use client';

import { useEffect, useState } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import AdminPreviewBanner from '@/components/portal/AdminPreviewBanner';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

type Milestone = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  due_label: string;
  sort_order: number;
};

const STATUS_STYLES = {
  completed: { dot: 'bg-[#C6A65A]', badge: 'bg-green-100 text-green-800', label: 'Completed' },
  in_progress: { dot: 'bg-blue-400', badge: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  upcoming: { dot: 'bg-[#D9DEE6]', badge: 'bg-gray-100 text-gray-600', label: 'Upcoming' },
};

export default function PortalTimeline() {
  const { clientId, clientData, isAdminPreview, loading } = usePortalAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    if (!clientId) return;
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase
        .from('milestones')
        .select('*')
        .eq('client_id', clientId)
        .order('sort_order');
      setMilestones(data || []);
    }
    fetchData();
  }, [clientId]);

  if (loading) return <LoadingScreen />;

  const complete = milestones.filter(m => m.status === 'completed').length;
  const progress = milestones.length > 0 ? Math.round((complete / milestones.length) * 100) : 0;

  const intake = clientData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {isAdminPreview && <AdminPreviewBanner clientName={`${intake?.first_name} ${intake?.last_name}`} />}
      <PortalNav />
      <main className={`ml-60 flex-1 p-8 ${isAdminPreview ? 'pt-16' : ''}`}>
        <div className="mb-8">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Your Move</p>
          <h1 className="font-serif text-3xl text-[#0B2545]">My PCS Timeline</h1>
          <p className="text-[#6A7381] text-sm mt-1">Every milestone in one place, with clear ownership and status</p>
        </div>

        {milestones.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9DEE6] shadow-sm">
            <p className="text-[#6A7381]">Your concierge is building your timeline. Check back soon.</p>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-[#D9DEE6] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[#0B2545]">Overall Progress</p>
                <p className="text-sm font-bold text-[#C6A65A]">{complete} of {milestones.length} milestones complete</p>
              </div>
              <div className="h-3 bg-[#F3F6FA] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#C6A65A] to-[#b48d33] rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#D9DEE6]" />
              <div className="flex flex-col gap-4">
                {milestones.map((m) => {
                  const style = STATUS_STYLES[m.status];
                  return (
                    <div key={m.id} className="relative pl-16">
                      <div className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white shadow ${style.dot}`} />
                      <div className="bg-white rounded-2xl p-6 border border-[#D9DEE6] shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-[#6A7381] text-xs font-semibold uppercase tracking-widest mb-1">{m.due_label}</p>
                            <h3 className="font-serif text-lg text-[#0B2545] mb-2">{m.title}</h3>
                            {m.description && <p className="text-[#6A7381] text-sm leading-relaxed">{m.description}</p>}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function LoadingScreen() {
  return <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center"><p className="text-[#6A7381]">Loading…</p></div>;
}
