// Clean UTF-8 encoding verified
'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TESTIMONIALS } from '@/lib/constants';

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = Array.isArray(TESTIMONIALS) ? TESTIMONIALS : [];
  const currentTestimonial = testimonials[activeIndex];

  // Auto-rotation
  useEffect(() => {
    if (isHovering || testimonials.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering, testimonials.length]);

  // Crossfade animation on index change
  useEffect(() => {
    if (!contentRef.current || testimonials.length === 0) return;

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }, [activeIndex, testimonials.length]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  if (!currentTestimonial) {
    return null;
  }

  return (
    <section
      className="bg-deep-navy py-24 md:py-32"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Decorative Quotation Mark */}
        <div className="text-center mb-6">
          <p className="text-[120px] text-gold/20 font-serif leading-none mb-[-40px]">
            “
          </p>
        </div>

        {/* Testimonial Content */}
        <div ref={contentRef} className="text-center">
          <p className="font-heading text-2xl md:text-3xl text-cream italic leading-relaxed max-w-4xl mx-auto mb-8">
            “{currentTestimonial.quote || ''}”
          </p>

          {/* Attribution */}
          <div>
            <p className="text-gold font-semibold text-lg">
              {currentTestimonial.name || ''}
            </p>
            <p className="text-cream/50 text-sm">
              {currentTestimonial.role || ''} • {currentTestimonial.base || ''}
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-3 justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-gold w-8 h-2'
                  : 'bg-cream/30 w-2 h-2 hover:bg-cream/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
