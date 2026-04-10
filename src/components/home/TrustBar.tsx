'use client';

import { BRANCHES } from '@/lib/constants';

export function TrustBar() {
  return (
    <section className="w-full bg-cream border-t border-b border-gold/10 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Text */}
        <div className="text-center mb-6">
          <p className="uppercase tracking-widest text-xs text-navy/60 font-semibold font-body">
            Proudly Serving Families Across All Branches
          </p>
        </div>

        {/* Branch Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {BRANCHES.map((branch, idx) => (
            <span
              key={idx}
              className="text-xs uppercase text-navy/40 tracking-wider font-body font-semibold px-3 py-2"
            >
              {branch}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
