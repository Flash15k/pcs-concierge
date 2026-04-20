'use client';

import { useEffect, useState, useRef } from 'react';
import PortalNav from '@/components/portal/PortalNav';
import AdminPreviewBanner from '@/components/portal/AdminPreviewBanner';
import { usePortalAuth } from '@/lib/usePortalAuth';
import { createClient } from '@/lib/supabase-browser';

type Document = {
  id: string;
  name: string;
  file_type: string;
  category: string;
  storage_path: string;
  uploaded_by: string;
  created_at: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  onboarding: 'bg-blue-100 text-blue-700',
  vendor: 'bg-purple-100 text-purple-700',
  billing: 'bg-green-100 text-green-700',
  personalized: 'bg-[rgba(198,166,90,0.15)] text-[#b48d33]',
  comparison: 'bg-orange-100 text-orange-700',
  reimbursement: 'bg-red-100 text-red-700',
};

export default function PortalDocuments() {
  const { clientId, clientData, isAdminPreview, loading } = usePortalAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!clientId) return;
    fetchDocs();
  }, [clientId]);

  async function fetchDocs() {
    const supabase = createClient();
    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    setDocuments(data || []);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !clientId) return;
    setUploading(true);

    const supabase = createClient();
    const path = `${clientId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('documents').upload(path, file);

    if (!uploadError) {
      await supabase.from('documents').insert({
        client_id: clientId,
        name: file.name,
        file_type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        category: 'reimbursement',
        storage_path: path,
        uploaded_by: 'client',
      });
      await fetchDocs();
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function getUrl(path: string) {
    const supabase = createClient();
    const { data } = await supabase.storage.from('documents').createSignedUrl(path, 3600);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

  if (loading) return <LoadingScreen />;

  const intake = clientData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#F3F6FA] flex">
      {isAdminPreview && <AdminPreviewBanner clientName={`${intake?.first_name} ${intake?.last_name}`} />}
      <PortalNav />
      <main className={`ml-60 flex-1 p-8 ${isAdminPreview ? 'pt-16' : ''}`}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">Your Files</p>
            <h1 className="font-serif text-3xl text-[#0B2545]">My Documents</h1>
            <p className="text-[#6A7381] text-sm mt-1">Everything your family needs, without digging through email threads</p>
          </div>
          <div>
            <input type="file" ref={fileRef} onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-semibold text-sm shadow hover:-translate-y-0.5 transition-all disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : '+ Upload Document'}
            </button>
            <p className="text-[#6A7381] text-xs mt-1 text-right">For PCS reimbursement files</p>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#D9DEE6] shadow-sm">
            <p className="text-[#6A7381]">Your concierge will upload your documents here — action plans, vendor quotes, and more.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl p-5 border border-[#D9DEE6] shadow-sm hover:border-[#C6A65A] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F3F6FA] flex items-center justify-center">
                    <span className="text-lg">📄</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[doc.category] || 'bg-gray-100 text-gray-600'}`}>
                    {doc.category || 'document'}
                  </span>
                </div>
                <p className="font-semibold text-[#0B2545] text-sm mb-1 line-clamp-2">{doc.name}</p>
                <p className="text-[#6A7381] text-xs mb-4">{doc.file_type} · {doc.uploaded_by === 'client' ? 'Uploaded by you' : 'From concierge'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => getUrl(doc.storage_path)}
                    className="flex-1 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-semibold hover:bg-[#163960] transition-all"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => getUrl(doc.storage_path)}
                    className="flex-1 py-2 rounded-xl border border-[#D9DEE6] text-[#0B2545] text-xs font-semibold hover:border-[#C6A65A] transition-all"
                  >
                    Download
                  </button>
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
