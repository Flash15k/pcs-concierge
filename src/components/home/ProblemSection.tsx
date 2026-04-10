'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (leftContentRef.current) {
      gsap.fromTo(
        leftContentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: false,
            markers: false
          }
        }
      );
    }

    if (rightContentRef.current) {
      gsap.fromTo(
        rightContentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 40%',
            scrub: false,
            markers: false
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={leftContentRef}>
            <div className="mb-4">
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-gold font-body">
                The Reality
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold mb-8">
              PCS Orders Shouldn't Mean Chaos
            </h2>
            <div className="w-16 h-[1px] bg-gold mb-8"></div>
            <p className="text-charcoal/80 text-lg leading-relaxed font-body whitespace-pre-line">
              {`Every year, hundreds of thousands of military families face the overwhelming stress of a Permanent Change of Station. The logistics are relentless \u2014 coordinating housing, utilities, cleaning, inspections, vehicle storage, and a thousand other details \u2014 all while your service member prepares for their next mission.

You shouldn't have to manage a military-grade operation just to move your family.`}
            </p>
          </div>
          <div
            ref={rightContentRef}
            className="aspect-[4/3] bg-navy/5 rounded-none overflow-hidden relative border border-gold/10 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-navy/40 text-sm font-body">Moving boxes image placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
