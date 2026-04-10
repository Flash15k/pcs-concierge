'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextSplitProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  stagger?: number;
  delay?: number;
}

const TextSplit: React.FC<TextSplitProps> = ({
  children,
  className = '',
  as = 'h2',
  stagger = 0.04,
  delay = 0,
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      return;
    }

    const element = elementRef.current;
    const text = element.innerText || element.textContent || '';
    const words = text.trim().split(/\s+/);

    // Clear and rebuild with word spans
    element.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block transform translate-y-full">${word}</span></span>`)
      .join(' ');

    // Get all word containers and animate them
    const wordElements = element.querySelectorAll('span > span');

    gsap.fromTo(
      wordElements,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [children, stagger, delay]);

  const Component = as as any;

  return (
    <Component ref={elementRef} className={className}>
      {children}
    </Component>
  );
};

export default TextSplit;
