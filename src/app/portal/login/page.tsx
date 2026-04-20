'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Invalid email or password. Contact your concierge if you need help.');
      setLoading(false);
      return;
    }

    router.push('/portal/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#0B2545] flex">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-center w-1/2 px-16">
        <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-4">PCS Concierge</p>
        <h1 className="font-serif text-4xl text-white leading-tight mb-6">
          A private portal for your family's move.
        </h1>
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          View your timeline, documents, tasks, and concierge updates in one place.
        </p>
        <div className="flex gap-4">
          {['Secure', 'Organized', 'Personal'].map(tag => (
            <span key={tag} className="px-4 py-2 rounded-full border border-white/20 text-[#C6A65A] text-xs tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="md:hidden text-center mb-8">
            <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-2">PCS Concierge</p>
            <h1 className="font-serif text-2xl text-white">Client Portal</h1>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="font-serif text-2xl text-[#0B2545] mb-1">Client Sign In</h2>
            <p className="text-[#6A7381] text-sm mb-6">Access your personalized PCS portal</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1E2430]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full border border-[#D9DEE6] rounded-2xl px-4 py-3 text-base outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#1E2430]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-[#D9DEE6] rounded-2xl px-4 py-3 text-base outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] transition-all"
                />
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In to Portal'}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-[#D9DEE6] text-center">
              <p className="text-[#6A7381] text-sm">Need help accessing your portal?</p>
              <a href="mailto:info@upcsg.com" className="text-[#C6A65A] text-sm font-semibold hover:underline">
                Contact concierge team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
