// Clean UTF-8 encoding verified
'use client';

import { useState, useEffect, useRef } from 'react';
import { STATS } from '@/lib/constants';

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startedRef = useRef(false);

  const stats = Array.isArray(STATS) ? STATS : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;

            // Animate counts
            stats.forEach((stat, index) => {
              const element = countRefs.current[index];
              if (!element) return;

              const target = stat.value || 0;
              let current = 0;
              const duration = 2000; // 2 seconds
              const startTime = Date.now();

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                current = Math.floor(progress * target);
                element.textContent = String(current) + (stat.suffix || '');

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              animate();
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [stats]);

  return (
    <section className="bg-cream border-t border-b border-gold/10 py-16 md:py-24">
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            {/* Number with Animation */}
            <div
              ref={(el) => {
                countRefs.current[index] = el;
              }}
              className="font-heading text-4xl md:text-5xl font-bold text-navy"
            >
              0
            </div>

            {/* Label */}
            <p className="text-sm uppercase tracking-widest text-slate/60 font-semibold mt-2">
              {stat.label || ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
