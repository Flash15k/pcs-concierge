'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SERVICE_PACKAGES } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function ServiceTiers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: idx * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top 50%',
            scrub: false,
            markers: false
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="uppercase tracking-[0.2em] text-xs font-semibold text-gold font-body">
              Service Packages
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-navy font-bold mb-6">
            Choose Your Level of Support
          </h2>
          <p className="text-slate text-lg font-body max-w-2xl mx-auto">
            Every package lifts the weight of your PCS from your shoulders.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, idx) => {
            const isDark = pkg.dark;
            const isFeatured = pkg.featured;
            return (
              <div
                key={idx}
                ref={el => {
                  if (el) cardsRef.current[idx] = el;
                }}
                className={`relative p-10 transition-all duration-300 ${
                  isDark ? 'bg-navy text-cream' : 'bg-warm-white text-charcoal'
                } ${isFeatured ? 'ring-2 ring-gold' : ''}`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold text-navy px-4 py-1 text-xs uppercase tracking-[0.15em] font-semibold font-body rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="uppercase text-xs tracking-[0.15em] text-gold font-semibold font-body">
                    {pkg.tier}
                  </span>
                </div>
                <h3
                  className={`font-heading text-2xl font-bold mb-2 ${
                    isDark ? 'text-cream' : 'text-navy'
                  }`}
                >
                  {pkg.name}
                </h3>
                <div className="mb-6">
                  <div
                    className={`font-heading text-5xl font-bold ${
                      isDark ? 'text-cream' : 'text-navy'
                    }`}
                  >
                    {pkg.price}
                  </div>
                  <p className={`text-sm font-body ${isDark ? 'text-cream/60' : 'text-slate'}`}>
                    /one-time
                  </p>
                </div>
                <div className={`w-full h-[1px] ${isDark ? 'bg-gold/20' : 'bg-gold/10'} my-6`}></div>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className={`text-sm font-body flex items-start gap-3 ${
                        isDark ? 'text-cream/80' : 'text-charcoal/80'
                      }`}
                    >
                      <span className="text-gold flex-shrink-0 mt-0.5">\u2713</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 font-semibold uppercase tracking-wider text-sm font-body transition-all duration-300 mt-8 ${
                    isDark || isFeatured
                      ? 'bg-gold text-navy hover:brightness-110'
                      : 'border border-navy text-navy hover:bg-navy hover:text-cream'
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
