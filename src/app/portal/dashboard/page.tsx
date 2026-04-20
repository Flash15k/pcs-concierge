'use client';

import { useEffect, useState } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

const PACKAGE_LABELS: Record<string, string> = {
  essential: 'Basic PCS Support',
  premier: 'Standard PCS Support',
  elite: 'White Glove PCS Command',
};

export default function PortalDashboard() {
  const { clientId, clientData, loading } = usePortalAuth();
  const [nextMilestone, setNextMilestone] = useState<{ title: string; due_label: string } | null>(null);
  const [recentUpdates, setRecentUpdates] = useState<{ title: string; body: string; created_at: string }[]>([]);
  const [pendingTasks, setPendingTasks] = useState<{ title: string; priority: string }[]>([]);
  const [milestoneCount, setMilestoneCount] = useState({ complete: 0, total: 0 });

  useEffect(() => {
    if (!clientId) return;
    async function fetchData() {
      const supabase = createClient();
      const [{ data: milestones }, { data: updates }, { data: tasks }] = await Promise.all([
        supabase.from('milestones').select('*').eq('client_id', clientId).order('sort_order'),
        supabase.from('updates').select('*').eq('client_id', clientId).order('created_at', { ascending: false }).limit(3),
        supabase.from('tasks').select('*').eq('client_id', clientId).eq('completed', false).order('due_date').limit(3),
      ]);

      if (milestones) {
        const next = milestones.find(m => m.status !== 'completed');
        setNextMilestone(next || null);
        setMilestoneCount({
          complete: milestones.filter(m => m.status === 'completed').length,
          total: milestones.length,
        });
      }
      setRecentUpdates(updates || []);
      setPendingTasks(tasks || []);
    }
    fetchData();
  }, [clientId]);

  if (loading) return <LoadingScreen />;

  const intake = clientData as Record<string, string>;
  const firstName = intake?.first_name || 'Client';
  const lastName = intake?.last_name || '';
  const pkg = PACKAGE_LABELS[intake?.package] || intake?.package || '';

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      <PortalNav />
      <main className="ml-60 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Welcome back</p>
          <h1 className="font-serif text-3xl text-[#0B2545]">The {lastName} Family</h1>
          <p className="text-[#6A7381] text-sm mt-1">{pkg}</p>
        </div>

        {/* Next milestone alert */}
        {nextMilestone && (
          <div className="bg-[#0B2545] rounded-2xl p-5 mb-6 flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-[#C6A65A] mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Next Milestone · {nextMilestone.due_label}</p>
              <p className="text-white font-semibold">{nextMilestone.title}</p>
            </div>
          </div>
        )}

        {/* Status cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Move Date', value: intake?.preferredMoveDate || '—', note: 'Preferred date' },
            { label: 'Current Status', value: intake?.status?.replace('_', ' ') || 'New', note: 'Concierge active' },
            { label: 'Milestones', value: `${milestoneCount.complete} of ${milestoneCount.total}`, note: 'Complete' },
            { label: 'Avg Response', value: '< 4 hrs', note: 'Business hours' },
          ].map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#D9DEE6]">
              <p className="text-[#6A7381] text-xs uppercase tracking-widest font-semibold">{card.label}</p>
              <p className="text-xl font-bold text-[#0B2545] my-1 capitalize">{card.value}</p>
              <p className="text-[#6A7381] text-xs">{card.note}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent updates */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#D9DEE6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-[#0B2545]">Recent Updates</h2>
              <a href="/portal/updates" className="text-[#C6A65A] text-xs font-semibold hover:underline">View all</a>
            </div>
            {recentUpdates.length === 0 ? (
              <p className="text-[#6A7381] text-sm">No updates yet. Your concierge will post here soon.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {recentUpdates.map((u, i) => (
                  <div key={i} className="border-l-2 border-[#C6A65A] pl-4">
                    <p className="font-semibold text-[#0B2545] text-sm">{u.title}</p>
                    <p className="text-[#6A7381] text-xs mt-0.5">{u.body.slice(0, 80)}{u.body.length > 80 ? '…' : ''}</p>
                    <p className="text-[#6A7381] text-xs mt-1">{new Date(u.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action items */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#D9DEE6] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-[#0B2545]">Your Action Items</h2>
              <a href="/portal/tasks" className="text-[#C6A65A] text-xs font-semibold hover:underline">View all</a>
            </div>
            {pendingTasks.length === 0 ? (
              <p className="text-[#6A7381] text-sm">No pending tasks. You're all caught up!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {pendingTasks.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F3F6FA]">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.priority === 'high' ? 'bg-red-400' : t.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                    <p className="text-sm text-[#1E2430] flex-1">{t.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { href: '/portal/timeline', label: 'Open Timeline', icon: '📅' },
            { href: '/portal/documents', label: 'View Documents', icon: '📁' },
            { href: '/portal/contact', label: 'Message Team', icon: '💬' },
            { href: '/portal/tasks', label: 'My Tasks', icon: '✅' },
          ].map(link => (
            <a key={link.href} href={link.href} className="bg-white rounded-2xl p-4 shadow-sm border border-[#D9DEE6] flex items-center gap-3 hover:border-[#C6A65A] transition-all">
              <span className="text-xl">{link.icon}</span>
              <span className="text-sm font-semibold text-[#0B2545]">{link.label}</span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center">
      <p className="text-[#6A7381]">Loading your portal…</p>
    </div>
  );
}
