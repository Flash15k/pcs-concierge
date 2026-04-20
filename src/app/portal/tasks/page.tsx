'use client';

import { useEffect, useState } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import AdminPreviewBanner from '@/components/portal/AdminPreviewBanner';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

type Task = {
  id: string;
  title: string;
  due_date: string;
  priority: 'high' | 'medium' | 'low';
  action_type: string;
  completed: boolean;
};

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const ACTION_LABELS: Record<string, string> = {
  approve: 'Approve',
  upload: 'Upload Document',
  confirm: 'Confirm',
  review: 'Review',
};

export default function PortalTasks() {
  const { clientId, clientData, isAdminPreview, loading } = usePortalAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!clientId) return;
    fetchTasks();
  }, [clientId]);

  async function fetchTasks() {
    const supabase = createClient();
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('client_id', clientId)
      .order('due_date');
    setTasks(data || []);
  }

  async function toggleComplete(task: Task) {
    const supabase = createClient();
    await supabase.from('tasks').update({ completed: !task.completed }).eq('id', task.id);
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  }

  if (loading) return <LoadingScreen />;

  const pending = tasks.filter(t => !t.completed);
  const done = tasks.filter(t => t.completed);

  const intake = clientData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {isAdminPreview && <AdminPreviewBanner clientName={`${intake?.first_name} ${intake?.last_name}`} />}
      <PortalNav />
      <main className={`ml-60 flex-1 p-8 ${isAdminPreview ? 'pt-16' : ''}`}>
        <div className="mb-8">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Action Required</p>
          <h1 className="font-serif text-3xl text-[#0B2545]">My Tasks</h1>
          <p className="text-[#6A7381] text-sm mt-1">Concise approvals and action items for your family</p>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9DEE6] shadow-sm">
            <p className="text-[#6A7381]">No tasks yet. Your concierge will add action items here as your move progresses.</p>
          </div>
        ) : (
          <div className="max-w-2xl flex flex-col gap-6">
            {pending.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-3">Pending ({pending.length})</p>
                <div className="flex flex-col gap-3">
                  {pending.map(task => (
                    <TaskRow key={task.id} task={task} onToggle={toggleComplete} />
                  ))}
                </div>
              </div>
            )}
            {done.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6A7381] font-semibold mb-3">Completed ({done.length})</p>
                <div className="flex flex-col gap-3 opacity-60">
                  {done.map(task => (
                    <TaskRow key={task.id} task={task} onToggle={toggleComplete} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function TaskRow({ task, onToggle }: { task: Task; onToggle: (t: Task) => void }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border shadow-sm flex items-center gap-4 transition-all ${task.completed ? 'border-[#D9DEE6]' : 'border-[#D9DEE6] hover:border-[#C6A65A]'}`}>
      <button
        onClick={() => onToggle(task)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${task.completed ? 'bg-[#C6A65A] border-[#C6A65A]' : 'border-[#D9DEE6] hover:border-[#C6A65A]'}`}
      >
        {task.completed && <span className="text-white text-xs">✓</span>}
      </button>
      <div className="flex-1">
        <p className={`font-semibold text-sm ${task.completed ? 'line-through text-[#6A7381]' : 'text-[#0B2545]'}`}>{task.title}</p>
        {task.due_date && (
          <p className="text-[#6A7381] text-xs mt-0.5">Due {new Date(task.due_date).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PRIORITY_STYLES[task.priority]}`}>
          {task.priority}
        </span>
        {!task.completed && task.action_type && (
          <span className="px-3 py-1 rounded-xl bg-[#0B2545] text-white text-xs font-semibold">
            {ACTION_LABELS[task.action_type] || task.action_type}
          </span>
        )}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center"><p className="text-[#6A7381]">Loading…</p></div>;
}
