'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B2545] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/05 mb-4">
            <span className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold">United PCS Group</span>
          </div>
          <h1 className="font-serif text-3xl text-white">Admin Portal</h1>
          <p className="text-white/50 text-sm mt-2">Restricted access</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col gap-2 mb-5">
            <label className="text-sm font-bold text-[#1E2430]">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full border border-[#D9DEE6] rounded-2xl px-4 py-3 text-base outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] transition-all"
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
