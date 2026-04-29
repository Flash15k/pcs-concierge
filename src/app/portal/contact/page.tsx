'use client';

import { useState } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import AdminPreviewBanner from '@/components/portal/AdminPreviewBanner';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

export default function PortalContact() {
  const { clientId, clientData, isAdminPreview, loading } = usePortalAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    setSending(true);
    setError('');

    const supabase = createClient();
    const { error: dbError } = await supabase.from('messages').insert({
      client_id: clientId,
      subject,
      body: message,
    });

    if (dbError) {
      setError('Something went wrong. Please call us directly at (910) 412-6900.');
      setSending(false);
      return;
    }

    setSent(true);
    setSending(false);
    setSubject('');
    setMessage('');
  }

  if (loading) return <LoadingScreen />;

  const intake = clientData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {isAdminPreview && <AdminPreviewBanner clientName={`${intake?.first_name} ${intake?.last_name}`} />}
      <PortalNav />
      <main className={`ml-60 flex-1 p-8 ${isAdminPreview ? 'pt-16' : ''}`}>
        <div className="mb-8">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">We're Here</p>
          <h1 className="font-serif text-3xl text-[#0B2545]">Contact My Concierge</h1>
          <p className="text-[#6A7381] text-sm mt-1">Your concierge team responds within 4 business hours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Team card */}
          <div className="bg-[#0B2545] rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-2">Your Concierge Team</p>
              <h2 className="font-serif text-2xl mb-3">PCS Team Atlas</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Primary support for your relocation. We handle the complexity so your family can focus on the transition.
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <p className="text-white/80 text-sm">Response window: under 4 business hours</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              <a href="tel:9104126900" className="w-full text-center py-3 rounded-xl border border-[#C6A65A] text-[#C6A65A] font-semibold text-sm hover:bg-[#C6A65A] hover:text-white transition-all">
                📞 Call (910) 412-6900
              </a>
              <a href="mailto:info@upcsg.com" className="w-full text-center py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all">
                ✉️ info@upcsg.com
              </a>
            </div>
          </div>

          {/* Message form */}
          <div className="bg-white rounded-2xl p-8 border border-[#D9DEE6] shadow-sm">
            <h2 className="font-serif text-xl text-[#0B2545] mb-1">Send a Message</h2>
            <p className="text-[#6A7381] text-sm mb-6">We'll respond to your portal inbox within 4 business hours.</p>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="font-semibold text-[#0B2545] mb-2">Message Sent</p>
                <p className="text-[#6A7381] text-sm">Your concierge team will respond shortly.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-[#C6A65A] text-sm font-semibold hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1E2430]">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    required
                    className="w-full border border-[#D9DEE6] rounded-2xl px-4 py-3 text-base outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1E2430]">Message</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what you need…"
                    required
                    rows={5}
                    className="w-full border border-[#D9DEE6] rounded-2xl px-4 py-3 text-base outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] transition-all resize-none"
                  />
                </div>
                {error && <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Securely'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 max-w-4xl p-5 rounded-2xl bg-red-50 border border-red-200">
          <p className="text-sm font-semibold text-red-800 mb-1">Move-Week Emergency?</p>
          <p className="text-sm text-red-700">For urgent move-day issues, call us directly at <strong>(910) 412-6900</strong>. We prioritize all move-week calls.</p>
        </div>
      </main>
    </div>
  );
}

function LoadingScreen() {
  return <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center"><p className="text-[#6A7381]">Loading…</p></div>;
}
