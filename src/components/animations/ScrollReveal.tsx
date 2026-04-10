'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      gsap.set(elementRef.current, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const directionMap = {
      up: { y: distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const startValues = {
      opacity: 0,
      ...directionMap[direction],
    };

    gsap.fromTo(
      elementRef.current,
      startValues,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none none',
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration, distance]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
