'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONCIERGE_STEPS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const trackWidth = track.scrollWidth;
    const viewportWidth = section.clientWidth;
    const distance = trackWidth - viewportWidth;

    if (distance <= 0) return;

    gsap.to(track, {
      x: -distance,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${distance + 500}`,
        scrub: 1,
        pin: true,
        snap: 1 / 8,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const steps = Array.isArray(CONCIERGE_STEPS) ? CONCIERGE_STEPS : [];
  const letters = ['C', 'O', 'N', 'C', 'I', 'E', 'R', 'G', 'E'];

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            OUR PROVEN PROCESS
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold mb-6">
            The C.O.N.C.I.E.R.G.E. Method™
          </h2>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto mb-8">
            A 9-step operating system that transforms PCS chaos into coordinated calm.
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-[1px] bg-gold" />
          </div>
        </div>
      </div>

      {/* Scrollable Timeline */}
      <div className="overflow-hidden relative min-h-[600px]">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-8 px-6"
          style={{ width: 'fit-content' }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="min-w-[350px] md:min-w-[400px] p-10 bg-white border border-gold/10 relative"
            >
              {/* Watermark Letter */}
              <div className="absolute top-4 right-6 text-[120px] font-heading font-bold text-gold/10 leading-none pointer-events-none">
                {letters[index] || 'E'}
              </div>

              {/* Step Number */}
              <p className="text-gold text-sm uppercase tracking-widest font-semibold mb-2">
                Step {String(index + 1).padStart(2, '0')}
              </p>

              {/* Title */}
              <h3 className="font-heading text-2xl text-navy font-bold mb-4">
                {step.title || ''}
              </h3>

              {/* Description */}
              <p className="text-charcoal/70 text-base leading-relaxed">
                {step.description || ''}
              </p>

              {/* Bottom Line */}
              <div className="w-12 h-[1px] bg-gold mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
