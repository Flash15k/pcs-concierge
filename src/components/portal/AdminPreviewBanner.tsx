'use client';

import { useRouter } from 'next/navigation';

export default function AdminPreviewBanner({ clientName }: { clientName: string }) {
  const router = useRouter();

  async function exitPreview() {
    await fetch('/api/admin/preview', { method: 'DELETE' });
    router.push('/admin');
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#C6A65A] text-[#0B2545] px-4 py-2 flex items-center justify-between text-sm font-semibold shadow-lg">
      <div className="flex items-center gap-2">
        <span>👁️</span>
        <span>Admin Preview — viewing as <strong>{clientName}</strong></span>
      </div>
      <button
        onClick={exitPreview}
        className="px-4 py-1 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#163960] transition-all"
      >
        Exit Preview → Back to Admin
      </button>
    </div>
  );
}
