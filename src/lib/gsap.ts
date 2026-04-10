/**
 * GSAP Animation Library Configuration
 * Includes plugins registration and initialization
 *
 * Note: ScrollSmoother and SplitText require GSAP Club membership (paid)
 * or the free Webflow-acquired version of GSAP for production use.
 * The free version of GSAP is available for most animation needs.
 *
 * For production, consider:
 * - Using ScrollTrigger (free in Core GSAP)
 * - Using basic Tween and Timeline animations
 * - Accessing Club plugins via gsap.registerPlugin() after license activation
 */

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Register built-in plugins (free in GSAP Core)
gsap.registerPlugin(useGSAP)

/**
 * ScrollTrigger Plugin
 * Free plugin for scroll-triggered animations
 * Requires: import ScrollTrigger from 'gsap/dist/ScrollTrigger'
 */
let ScrollTrigger: any = null
try {
  ScrollTrigger = require('gsap/dist/ScrollTrigger').default
  gsap.registerPlugin(ScrollTrigger)
} catch (e) {
  console.warn(
    'ScrollTrigger not available. Install gsap/dist/ScrollTrigger for scroll animations.'
  )
}

/**
 * ScrollSmoother Plugin
 * PAID - Requires GSAP Club membership or Webflow license
 * For free alternative: use scroll-behavior: smooth in CSS
 *
 * To use ScrollSmoother in production:
 * 1. Purchase GSAP Club membership: https://gsap.com/club
 * 2. Import: import ScrollSmoother from 'gsap/dist/ScrollSmoother'
 * 3. Register: gsap.registerPlugin(ScrollSmoother)
 * 4. Initialize in layout component
 */
let ScrollSmoother: any = null
try {
  ScrollSmoother = require('gsap/dist/ScrollSmoother')?.default
  if (ScrollSmoother) {
    gsap.registerPlugin(ScrollSmoother)
  }
} catch (e) {
  console.info(
    'ScrollSmoother not available. This is a premium GSAP Club feature. Using CSS scroll-behavior instead.'
  )
}

/**
 * SplitText Plugin
 * PAID - Requires GSAP Club membership or Webflow license
 * Free alternative: Use CSS animations or JavaScript character splitting
 *
 * To use SplitText in production:
 * 1. Purchase GSAP Club membership: https://gsap.com/club
 * 2. Import: import SplitText from 'gsap/dist/SplitText'
 * 3. Register: gsap.registerPlugin(SplitText)
 * 4. Use in components for text animations
 */
let SplitText: any = null
try {
  SplitText = require('gsap/dist/SplitText')?.default
  if (SplitText) {
    gsap.registerPlugin(SplitText)
  }
} catch (e) {
  console.info(
    'SplitText not available. This is a premium GSAP Club feature. Consider CSS text animations as alternative.'
  )
}

/**
 * Export configured GSAP instance and plugins
 */
export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText }

/**
 * Common animation presets for PCS Concierge
 */
export const ANIMATION_PRESETS = {
  /**
   * Fade in animation
   */
  fadeIn: {
    duration: 0.6,
    opacity: 1,
    ease: 'power2.out',
  },

  /**
   * Slide up animation
   */
  slideUp: {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out',
  },

  /**
   * Slide down animation
   */
  slideDown: {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out',
  },

  /**
   * Slide left animation
   */
  slideLeft: {
    duration: 0.8,
    x: 0,
    opacity: 1,
    ease: 'power2.out',
  },

  /**
   * Slide right animation
   */
  slideRight: {
    duration: 0.8,
    x: 0,
    opacity: 1,
    ease: 'power2.out',
  },

  /**
   * Scale and fade animation
   */
  scaleIn: {
    duration: 0.6,
    scale: 1,
    opacity: 1,
    ease: 'back.out',
  },

  /**
   * Stagger children animation
   */
  staggerChildren: {
    stagger: 0.1,
    duration: 0.6,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
  },

  /**
   * Luxury scroll reveal animation
   */
  scrollReveal: {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
  },
} as const

/**
 * Initialize scroll-triggered animations
 * Use this in components with scroll-based animations
 *
 * Example usage in a component:
 * ```tsx
 * import { gsap, ScrollTrigger, initScrollTrigger } from '@/lib/gsap'
 * import { useEffect } from 'react'
 *
 * export default function MyComponent() {
 *   useEffect(() => {
 *     if (ScrollTrigger) {
 *       gsap.registerPlugin(ScrollTrigger)
 *       // Create scroll triggers here
 *     }
 *   }, [])
 *
 *   return <div>Content</div>
 * }
 * ```
 */
export function initScrollTrigger() {
  if (!ScrollTrigger) {
    console.warn('ScrollTrigger plugin not loaded')
    return
  }

  // ScrollTrigger is already registered above
  // This function serves as a safety check and initialization handler
  return ScrollTrigger
}

/**
 * Create a simple fade-in on scroll animation
 * Useful for elements that should reveal as user scrolls
 *
 * Example usage:
 * ```tsx
 * const ref = useRef(null)
 * useEffect(() => {
 *   if (ref.current) {
 *     createFadeInOnScroll(ref.current)
 *   }
 * }, [])
 *
 * return <div ref={ref}>Content</div>
 * ```
 */
export function createFadeInOnScroll(element: HTMLElement) {
  if (!ScrollTrigger) {
    // Fallback: animate without scroll trigger
    gsap.to(element, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    return
  }

  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  })
}

/**
 * Create a parallax effect on scroll
 * Use for background images or hero sections
 *
 * Example usage:
 * ```tsx
 * const bgRef = useRef(null)
 * useEffect(() => {
 *   if (bgRef.current) {
 *     createParallaxEffect(bgRef.current, 0.5)
 *   }
 * }, [])
 *
 * return <div ref={bgRef}>Parallax Background</div>
 * ```
 */
export function createParallaxEffect(element: HTMLElement, speed: number = 0.5) {
  if (!ScrollTrigger) {
    // Fallback: no parallax effect
    return
  }

  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      markers: false,
    },
    y: (i, target) => gsap.getProperty(target, 'offsetHeight') * speed,
    ease: 'none',
  })
}

/**
 * Stagger animation for multiple elements
 * Animate multiple elements with a delay between each
 *
 * Example usage:
 * ```tsx
 * const containerRef = useRef(null)
 * useEffect(() => {
 *   if (containerRef.current) {
 *     createStaggerAnimation(containerRef.current, '.item')
 *   }
 * }, [])
 *
 * return (
 *   <div ref={containerRef}>
 *     <div className="item">Item 1</div>
 *     <div className="item">Item 2</div>
 *     <div className="item">Item 3</div>
 *   </div>
 * )
 * ```
 */
export function createStaggerAnimation(container: HTMLElement, selector: string) {
  const elements = container.querySelectorAll(selector)

  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })
}

/**
 * Pin an element during scroll
 * Element stays fixed while scrolling through its trigger section
 *
 * Requires ScrollTrigger plugin
 */
export function createPinAnimation(element: HTMLElement, duration: number = 3) {
  if (!ScrollTrigger) {
    console.warn('ScrollTrigger required for pin animation')
    return
  }

  const parent = element.parentElement
  if (!parent) return

  gsap.to(element, {
    scrollTrigger: {
      trigger: parent,
      start: 'top top',
      end: 'bottom top',
      pin: element,
      pinSpacing: true,
    },
    duration: duration,
  })
}

/**
 * Configuration and type definitions
 */
export const GSAP_CONFIG = {
  defaults: {
    duration: 0.6,
    ease: 'power2.out',
  },
  colors: {
    navy: '#1B2A4A',
    gold: '#C6A65A',
    cream: '#F7F5EF',
  },
} as const

export type AnimationPreset = keyof typeof ANIMATION_PRESETS
export type GsapConfig = typeof GSAP_CONFIG
