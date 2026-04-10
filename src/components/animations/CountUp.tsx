'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  target: number;
  suffix?: string; // e.g., "+", "%", "K"
  prefix?: string; // e.g., "$", "€"
  duration?: number;
  className?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  decimals = 0,
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!elementRef.current || hasAnimated) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animationDuration = prefersReducedMotion ? 0 : duration;

    const counterObject = {
      value: 0,
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        onEnter: () => {
          if (hasAnimated) return;
          setHasAnimated(true);

          gsap.to(counterObject, {
            value: target,
            duration: animationDuration,
            ease: 'power3.out',
            onUpdate: () => {
              if (elementRef.current) {
                const formattedValue = counterObject.value.toFixed(decimals);
                elementRef.current.textContent = `${prefix}${formattedValue}${suffix}`;
              }
            },
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [target, suffix, prefix, duration, decimals, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

export default CountUp;
