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
export { gsap, ScrollTrigger, ScrollSmoother, SplitText }

/**
 * Common animation presets for PCS Concierge
 */
export const ANIMATION_PRESETS = {
  fadeIn: {
    duration: 0.6,
    opacity: 1,
    ease: 'power2.out',
  },
  slideUp: {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out',
  },
  slideDown: {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out',
  },
  slideLeft: {
    duration: 0.8,
    x: 0,
    opacity: 1,
    ease: 'power2.out',
  },
  slideRight: {
    duration: 0.8,
    x: 0,
    opacity: 1,
    ease: 'power2.out',
  },
  scaleIn: {
    duration: 0.6,
    scale: 1,
    opacity: 1,
    ease: 'back.out',
  },
  staggerChildren: {
    stagger: 0.1,
    duration: 0.6,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
  },
  scrollReveal: {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'power2.out',
  },
} as const

export function initScrollTrigger() {
  if (!ScrollTrigger) {
    console.warn('ScrollTrigger plugin not loaded')
    return
  }
  return ScrollTrigger
}

export function createFadeInOnScroll(element: HTMLElement) {
  if (!ScrollTrigger) {
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

export function createParallaxEffect(element: HTMLElement, speed: number = 0.5) {
  if (!ScrollTrigger) {
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
    y: (i: number, target: HTMLElement) => -(window.innerHeight * speed),
    ease: 'none',
  })
}

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
