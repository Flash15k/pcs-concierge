'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Eyebrow animation
    if (eyebrowRef.current) {
      timeline.fromTo(
        eyebrowRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0
      );
    }

    // Headline animation - stagger words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('span');
      timeline.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power2.out'
        },
        0.3
      );
    }

    // Subtext animation
    if (subtextRef.current) {
      timeline.fromTo(
        subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        1
      );
    }

    // Buttons animation
    if (buttonsRef.current) {
      timeline.fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        1.3
      );
    }

    // Scroll indicator - continuous pulse animation
    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0.5, y: 0 },
        { opacity: 1, y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
      );
    }
  }, []);

  // Split headline text into words wrapped in spans for staggered animation
  const headlineWords = [
    'Your',
    'Family',
    'Served',
    'This',
    'Country.',
    'Let',
    'Us',
    'Serve',
    'Your',
    'Next',
    'Move.'
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-deep-navy relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 100%)'
      }}
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6 text-center z-10">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="mb-6 text-gold uppercase tracking-[0.2em] text-xs font-semibold font-body"
        >
          Luxury Military Relocation Concierge
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight"
        >
          {headlineWords.map((word, idx) => (
            <span key={idx} className="inline-block">
              {word}
              {idx < headlineWords.length - 1 && '\u00A0'}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="font-body text-lg text-white/70 max-w-3xl mx-auto mb-12"
        >
          White-glove PCS coordination for military families. Every detail handled. Every deadline
          met. Every transition seamless.
        </p>

        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button className="bg-gold text-navy px-8 py-4 font-semibold uppercase tracking-wider font-body hover:brightness-110 transition-all duration-300">
            Request Your Consultation
          </button>
          <button className="border border-gold text-gold px-8 py-4 font-semibold uppercase tracking-wider font-body hover:bg-gold hover:text-navy transition-all duration-300">
            Explore Our Services
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <p className="text-gold/60 text-xs uppercase tracking-[0.15em] font-body font-semibold">
          Scroll to Discover
        </p>
        <div className="w-[1px] h-6 bg-gradient-to-b from-gold to-gold/0"></div>
      </div>
    </section>
  );
}
