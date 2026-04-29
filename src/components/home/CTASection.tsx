// Clean UTF-8 encoding verified
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-deep-navy py-24 md:py-32"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="bg-contain bg-center bg-no-repeat w-[600px] h-[600px] opacity-[0.04]"
          style={{
            backgroundImage: "url('/logos/emblem-circle.png')",
            animation: 'spin 60s linear infinite',
          }}
        />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
          YOUR NEXT CHAPTER STARTS HERE
        </p>

        {/* Headline */}
        <h2 className="font-heading text-4xl md:text-5xl text-cream font-bold mb-8">
          Ready for a PCS Experience
          <br />
          Your Family Deserves?
        </h2>

        {/* Gold Divider */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-[1px] bg-gold" />
        </div>

        {/* Body Text */}
        <p className="text-cream/60 text-lg max-w-2xl mx-auto mb-10">
          Limited consultations available each month to ensure every family
          receives our full attention.
        </p>

        {/* CTA Button */}
        <button className="bg-gold text-navy px-10 py-5 text-lg font-semibold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-gold/20">
          Schedule Your Free Consultation
        </button>

        {/* Contact Info */}
        <p className="text-cream/40 text-sm mt-6">
          (910) 412-6900 | info@UPCSG.com
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
