'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  speed?: number; // 0-1, default 0.8 (lower = slower parallax)
  priority?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  speed = 0.8,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      return;
    }

    gsap.to(imageRef.current, {
      yPercent: speed * 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  const aspectRatio = (height / width) * 100;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        paddingBottom: `${aspectRatio}%`,
      }}
    >
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: 'translateZ(0)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={75}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
        />
      </div>
    </div>
  );
};

export default ParallaxImage;
