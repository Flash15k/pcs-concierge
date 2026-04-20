'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

type IntakeRow = {
  id: string;
  submitted_at: string;
  responses: Record<string, string>;
  clients: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    package: string;
    status: string;
  } | null;
};

const VA_OPTIONS = ['Unassigned', 'VA Maria', 'VA Sam', 'VA Jordan', 'VA Taylor'];

const PACKAGE_LABELS: Record<string, string> = {
  essential: 'Basic',
  premier: 'Standard',
  elite: 'White Glove',
};

export default function AdminIntakeQueue() {
  const router = useRouter();
  const [intakes, setIntakes] = useState<IntakeRow[]>([]);
  const [selected, setSelected] = useState<IntakeRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchIntakes();
  }, []);

  async function fetchIntakes() {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('intake_responses')
      .select('*, clients(id, first_name, last_name, email, phone, package, status)')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error(error);
      router.push('/admin/login');
      return;
    }
    setIntakes(data || []);
    setLoading(false);
  }

  async function updateStatus(clientId: string, newStatus: string) {
    const supabase = getSupabase();
    await supabase.from('clients').update({ status: newStatus }).eq('id', clientId);
    setIntakes(prev => prev.map(i =>
      i.clients?.id === clientId ? { ...i, clients: i.clients ? { ...i.clients, status: newStatus } : null } : i
    ));
    if (selected?.clients?.id === clientId) {
      setSelected(prev => prev && prev.clients ? { ...prev, clients: { ...prev.clients, status: newStatus } } : prev);
    }
  }

  function assignVA(intakeId: string, va: string) {
    setAssignments(prev => ({ ...prev, [intakeId]: va }));
  }

  const r = selected?.responses || {};

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0B2545] flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-10">
        <div className="p-6 border-b border-white/10">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">United PCS Group</p>
          <p className="text-white font-serif text-lg">Admin</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <p className="text-white/40 text-xs uppercase tracking-widest px-3 py-2">Operations</p>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/10 text-sm transition-all">
            <span>📋</span> Clients
          </a>
          <a href="/admin/intake" className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold">
            <span>📝</span> Intake Queue
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={async () => { await fetch('/api/admin/auth', { method: 'DELETE' }); router.push('/admin/login'); }}
            className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-all"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#0B2545]">Intake Queue</h1>
            <p className="text-[#6A7381] text-sm mt-1">Recently submitted intake forms — assign to a VA to begin client work</p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-white border border-[#D9DEE6] text-[#0B2545] text-sm font-semibold shadow-sm">
            {intakes.length} submission{intakes.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex gap-6 items-start">
          {/* Queue Table */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#D9DEE6] overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-[#6A7381]">Loading intake submissions…</div>
            ) : intakes.length === 0 ? (
              <div className="p-12 text-center text-[#6A7381]">No intake forms submitted yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#D9DEE6] bg-[#F3F6FA]">
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Client</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Move</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Package</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Assigned VA</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {intakes.map(intake => (
                    <tr
                      key={intake.id}
                      onClick={() => setSelected(intake)}
                      className={`border-b border-[#D9DEE6] cursor-pointer hover:bg-[#F3F6FA] transition-all ${selected?.id === intake.id ? 'bg-[rgba(198,166,90,0.06)]' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#0B2545]">
                          {intake.clients ? `${intake.clients.first_name} ${intake.clients.last_name}` : intake.responses?.clientName || 'Unknown'}
                        </p>
                        <p className="text-[#6A7381] text-xs mt-0.5">{intake.clients?.email || intake.responses?.email || '—'}</p>
                      </td>
                      <td className="px-5 py-4 text-[#1E2430]">
                        <p className="text-xs">{intake.responses?.currentBase || '—'}</p>
                        <p className="text-xs text-[#6A7381]">→ {intake.responses?.newBase || '—'}</p>
                      </td>
                      <td className="px-5 py-4 text-[#1E2430]">
                        {PACKAGE_LABELS[intake.clients?.package || ''] || intake.clients?.package || '—'}
                      </td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <select
                          value={assignments[intake.id] || 'Unassigned'}
                          onChange={e => assignVA(intake.id, e.target.value)}
                          className="border border-[#D9DEE6] rounded-lg px-2 py-1 text-xs outline-none focus:border-[#C6A65A] transition-all"
                        >
                          {VA_OPTIONS.map(va => <option key={va}>{va}</option>)}
                        </select>
                      </td>
                      <td className="px-5 py-4 text-[#6A7381] text-xs">
                        {new Date(intake.submitted_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="w-80 bg-white rounded-2xl shadow-sm border border-[#D9DEE6] flex flex-col">
              <div className="p-5 bg-[#0B2545] rounded-t-2xl">
                <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Intake Detail</p>
                <h3 className="font-serif text-xl text-white">
                  {selected.clients ? `${selected.clients.first_name} ${selected.clients.last_name}` : selected.responses?.clientName || 'Unknown'}
                </h3>
                <p className="text-white/60 text-sm">{selected.responses?.branch || '—'} · {PACKAGE_LABELS[selected.clients?.package || ''] || '—'}</p>
              </div>

              {selected.clients && (
                <div className="p-5 border-b border-[#D9DEE6]">
                  <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-3">Update Status</p>
                  <select
                    value={selected.clients.status}
                    onChange={e => updateStatus(selected.clients!.id, e.target.value)}
                    className="w-full border border-[#D9DEE6] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#C6A65A] transition-all"
                  >
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              <div className="p-5 flex-1 overflow-y-auto max-h-[55vh]">
                <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-4">Full Intake Responses</p>
                <div className="flex flex-col gap-3">
                  {Object.entries(selected.responses).map(([key, val]) => {
                    if (!val) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                    return (
                      <div key={key} className="border-b border-[#F3F6FA] pb-2">
                        <p className="text-[#6A7381] text-xs font-semibold mb-0.5">{label}</p>
                        <p className="text-[#1E2430] text-sm">{val}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selected.clients && (
                <div className="p-5 border-t border-[#D9DEE6] flex flex-col gap-2">
                  <a href={`tel:${selected.clients.phone}`} className="w-full text-center py-2 rounded-xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-sm">
                    Call {selected.clients.phone}
                  </a>
                  <a href={`mailto:${selected.clients.email}`} className="w-full text-center py-2 rounded-xl bg-[#0B2545] text-white font-bold text-sm">
                    Email Client
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
