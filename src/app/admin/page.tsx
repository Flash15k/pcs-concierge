'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

type Client = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  package: string;
  status: string;
  created_at: string;
  intake_responses: { responses: Record<string, string>; submitted_at: string }[];
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

const PACKAGE_LABELS: Record<string, string> = {
  essential: 'Basic',
  premier: 'Standard',
  elite: 'White Glove',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [selected, setSelected] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('clients')
      .select('*, intake_responses(responses, submitted_at)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      router.push('/admin/login');
      return;
    }
    setClients(data || []);
    setLoading(false);
  }

  async function updateStatus(clientId: string, newStatus: string) {
    setUpdatingStatus(true);
    const supabase = getSupabase();
    await supabase.from('clients').update({ status: newStatus }).eq('id', clientId);
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, status: newStatus } : c));
    if (selected?.id === clientId) setSelected(prev => prev ? { ...prev, status: newStatus } : prev);
    setUpdatingStatus(false);
  }

  async function signOut() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  const filtered = clients.filter(c => {
    const name = `${c.first_name} ${c.last_name}`.toLowerCase();
    const matchSearch = name.includes(search.toLowerCase()) || c.email.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: clients.length,
    new: clients.filter(c => c.status === 'new').length,
    inProgress: clients.filter(c => c.status === 'in_progress').length,
    completed: clients.filter(c => c.status === 'completed').length,
  };

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
          <a href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold">
            <span>📋</span> Clients
          </a>
          <a href="/intake" className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:bg-white/06 text-sm transition-all">
            <span>📝</span> Intake Form
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={signOut} className="w-full text-left px-3 py-2 text-white/60 hover:text-white text-sm transition-all">
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#0B2545]">Admin Intake Dashboard</h1>
            <p className="text-[#6A7381] text-sm mt-1">All clients and intake submissions</p>
          </div>
          <a href="/intake" target="_blank" className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-sm font-semibold hover:bg-[#163960] transition-all">
            View Intake Form ↗
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Clients', value: stats.total, note: 'All time' },
            { label: 'New', value: stats.new, note: 'Awaiting review' },
            { label: 'In Progress', value: stats.inProgress, note: 'Active concierge' },
            { label: 'Completed', value: stats.completed, note: 'Move complete' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-[#D9DEE6]">
              <p className="text-[#6A7381] text-xs uppercase tracking-widest font-semibold">{s.label}</p>
              <p className="text-4xl font-bold text-[#0B2545] my-2">{s.value}</p>
              <p className="text-[#6A7381] text-xs">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6 items-start">
          {/* Client Table */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#D9DEE6] overflow-hidden">
            <div className="p-5 border-b border-[#D9DEE6] flex gap-3 items-center">
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 border border-[#D9DEE6] rounded-xl px-4 py-2 text-sm outline-none focus:border-[#C6A65A] transition-all"
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border border-[#D9DEE6] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#C6A65A] transition-all"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {loading ? (
              <div className="p-12 text-center text-[#6A7381]">Loading clients…</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-[#6A7381]">No clients found.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#D9DEE6] bg-[#F3F6FA]">
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Client</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Package</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Status</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-[#6A7381] font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(client => (
                    <tr
                      key={client.id}
                      onClick={() => setSelected(client)}
                      className={`border-b border-[#D9DEE6] cursor-pointer hover:bg-[#F3F6FA] transition-all ${selected?.id === client.id ? 'bg-[rgba(198,166,90,0.06)]' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#0B2545]">{client.first_name} {client.last_name}</p>
                        <p className="text-[#6A7381] text-xs mt-0.5">{client.email}</p>
                      </td>
                      <td className="px-5 py-4 text-[#1E2430]">{PACKAGE_LABELS[client.package] || client.package || '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${STATUS_COLORS[client.status] || 'bg-gray-100 text-gray-700'}`}>
                          {client.status?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#6A7381] text-xs">
                        {new Date(client.created_at).toLocaleDateString()}
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
              <div className="p-5 border-b border-[#D9DEE6] bg-[#0B2545] rounded-t-2xl">
                <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Client Detail</p>
                <h3 className="font-serif text-xl text-white">{selected.first_name} {selected.last_name}</h3>
                <p className="text-white/60 text-sm">{selected.email}</p>
              </div>

              <div className="p-5 border-b border-[#D9DEE6]">
                <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-3">Update Status</p>
                <select
                  value={selected.status}
                  onChange={e => updateStatus(selected.id, e.target.value)}
                  disabled={updatingStatus}
                  className="w-full border border-[#D9DEE6] rounded-xl px-3 py-2 text-sm outline-none focus:border-[#C6A65A] transition-all"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="p-5 flex-1 overflow-y-auto max-h-[60vh]">
                <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-4">Intake Responses</p>
                {selected.intake_responses?.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {Object.entries(selected.intake_responses[0].responses).map(([key, val]) => {
                      if (!val) return null;
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
                      return (
                        <div key={key}>
                          <p className="text-[#6A7381] text-xs font-semibold mb-0.5">{label}</p>
                          <p className="text-[#1E2430] text-sm">{val}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[#6A7381] text-sm">No intake form submitted yet.</p>
                )}
              </div>

              <div className="p-5 border-t border-[#D9DEE6] flex flex-col gap-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="w-full text-center py-2 rounded-xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-sm"
                >
                  Call {selected.phone}
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="w-full text-center py-2 rounded-xl bg-[#0B2545] text-white font-bold text-sm"
                >
                  Email Client
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
