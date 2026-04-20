'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

const links = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/portal/timeline', label: 'My PCS Timeline', icon: '📅' },
  { href: '/portal/documents', label: 'My Documents', icon: '📁' },
  { href: '/portal/updates', label: 'My Updates', icon: '🔔' },
  { href: '/portal/tasks', label: 'My Tasks', icon: '✅' },
  { href: '/portal/contact', label: 'Contact My Concierge', icon: '💬' },
];

export default function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/portal/login');
  }

  return (
    <aside className="w-60 bg-[#0B2545] flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-10">
      <div className="p-6 border-b border-white/10">
        <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-1">PCS Concierge</p>
        <p className="text-white font-serif text-lg">Client Portal</p>
      </div>
      <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              pathname === link.href
                ? 'bg-white/10 text-white font-semibold'
                : 'text-white/60 hover:bg-white/06 hover:text-white'
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={signOut}
          className="w-full text-left px-3 py-2 text-white/50 hover:text-white text-sm transition-all"
        >
          🔒 Secure Logout
        </button>
      </div>
    </aside>
  );
}
