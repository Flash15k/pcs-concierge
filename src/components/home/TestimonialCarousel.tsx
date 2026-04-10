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
  const current = testimonials[activeIndex];
  useEffect(() => { if (isHovering || testimonials.length === 0) return; intervalRef.current = setInterval(() => { setActiveIndex((prev) => (prev + 1) % testimonials.length); }, 8000); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [isHovering, testimonials.length]);
  useEffect(() => { if (!contentRef.current || testimonials.length === 0) return; gsap.fromTo(contentRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }); }, [activeIndex, testimonials.length]);
  if (!current) return null;
  return (<section className="bg-deep-navy py-24 md:py-32" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-6"><p className="text-[120px] text-gold/20 font-serif leading-none mb-[-40px]">"</p></div><div ref={contentRef} className="text-center"><p className="font-heading text-2xl md:text-3xl text-cream italic leading-relaxed max-w-4xl mx-auto mb-8">"{current.quote || ''}"</p><div><p className="text-gold font-semibold text-lg">{current.name || ''}</p><p className="text-cream/50 text-sm">{current.role || ''} • {current.base || ''}</p></div></div><div className="flex gap-3 justify-center mt-8">{testimonials.map((_, index) => (<button key={index} onClick={() => { setActiveIndex(index); if (intervalRef.current) clearInterval(intervalRef.current); }} className={`rounded-full transition-all ${index === activeIndex ? 'bg-gold w-8 h-2' : 'bg-cream/30 w-2 h-2 hover:bg-cream/50'}`} aria-label={`Go to testimonial ${index + 1}`} />))}</div></div></section>);
}
