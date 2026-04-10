'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface GSAPProviderProps {
  children: React.ReactNode;
  enableSmoothScroll?: boolean;
}

const GSAPProvider: React.FC<GSAPProviderProps> = ({
  children,
  enableSmoothScroll = false,
}) => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Disable all GSAP animations if user prefers reduced motion
      gsap.config({ autoSleep: 120, force3D: false });
      ScrollTrigger.create({
        onUpdate: (self) => {
          gsap.to('*', { overwrite: 'auto', duration: 0 });
        },
      });
    }

    // Optional: Initialize ScrollSmoother if available and enabled
    if (enableSmoothScroll) {
      try {
        const ScrollSmoother = require('gsap/ScrollSmoother').default;
        if (ScrollSmoother) {
          gsap.registerPlugin(ScrollSmoother);
          ScrollSmoother.create({
            smooth: 1,
            effects: true,
          });
        }
      } catch (error) {
        // ScrollSmoother not available or requires Club GreenSock membership
        console.warn('ScrollSmoother not available. Using standard scroll behavior.');
      }
    }

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enableSmoothScroll]);

  return <div className="gsap-provider">{children}</div>;
};

export default GSAPProvider;
