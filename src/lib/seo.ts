/**
 * SEO utilities for generating metadata across the PCS Concierge application
 * Handles Open Graph, Twitter Card, and standard meta tags
 */

import { Metadata } from 'next'
import { COMPANY } from './constants'

interface SeoMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  ogUrl?: string
  canonicalUrl?: string
  noindex?: boolean
  robots?: string
}

// COMPANY.domain already includes https://
const BASE_URL = COMPANY.domain

const DEFAULT_KEYWORDS = [
  'PCS concierge',
  'military relocation',
  'military moving service',
  'military family relocation',
  'military household goods',
  'military move coordinator',
  'military relocation service',
  'military family support',
  'military housing assistance',
  'military relocation consultant',
]

const DEFAULT_DESCRIPTION =
  'PCS Concierge by United PCS Group LLC provides luxury military relocation services for military families. Expert coordination for moves, housing, schools, and community integration across 300+ installations.'

export function generateSeoMetadata(props: SeoMetadataProps = {}): Metadata {
  const {
    title = `${COMPANY.name} | Military Relocation Concierge`,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    ogImage = `${BASE_URL}/og-image.jpg`,
    ogType = 'website',
    ogUrl = BASE_URL,
    canonicalUrl = BASE_URL,
    noindex = false,
    robots = noindex ? 'noindex, nofollow' : 'index, follow',
  } = props

  const fullTitle = title.includes(COMPANY.name) ? title : `${title} | ${COMPANY.name}`

  return {
    title: fullTitle,
    description,
    keywords: typeof keywords === 'string' ? keywords : keywords.join(', '),
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: ogType,
      url: ogUrl,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/jpeg',
        },
      ],
      siteName: COMPANY.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@pcsconcierge',
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: COMPANY.name,
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    other: {
      'og:site_name': COMPANY.name,
      'og:type': ogType,
      'twitter:site': '@pcsconcierge',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'theme-color': '#1B2A4A',
    },
  }
}

export const HOME_PAGE_METADATA = generateSeoMetadata({
  title: 'PCS Concierge | Luxury Military Relocation Service',
  description:
    'PCS Concierge provides comprehensive military relocation services for military families. Expert support for housing, schools, utilities, and community integration.',
  keywords: [
    ...DEFAULT_KEYWORDS,
    'military family services',
    'military move coordinator',
    'relocation services',
  ],
})

export const SERVICES_PAGE_METADATA = generateSeoMetadata({
  title: 'Services | Military Relocation Packages',
  description:
    'Explore our military relocation service packages: Basic, Standard, and White Glove. Each designed to meet different needs and budgets.',
  keywords: [
    ...DEFAULT_KEYWORDS,
    'military relocation packages',
    'relocation services',
    'military moving',
  ],
})

export const ABOUT_PAGE_METADATA = generateSeoMetadata({
  title: 'About | PCS Concierge Mission & Values',
  description:
    'Learn about PCS Concierge, our mission to support military families, and the team behind luxury relocation services.',
  keywords: [...DEFAULT_KEYWORDS, 'about us', 'military family support', 'relocation experts'],
})

export const METHOD_PAGE_METADATA = generateSeoMetadata({
  title: 'Our Method | CONCIERGE 9-Step Process',
  description:
    'Discover our proven CONCIERGE method: 9 steps designed to make military relocation effortless and comprehensive.',
  keywords: [...DEFAULT_KEYWORDS, 'relocation process', 'military moving process'],
})

export const TESTIMONIALS_PAGE_METADATA = generateSeoMetadata({
  title: 'Testimonials | Military Families We Have Served',
  description:
    'Read testimonials from military families whose relocations were transformed by PCS Concierge services.',
  keywords: [...DEFAULT_KEYWORDS, 'testimonials', 'military family reviews', 'success stories'],
})

export const FAQS_PAGE_METADATA = generateSeoMetadata({
  title: 'FAQs | Military Relocation Questions Answered',
  description:
    'Frequently asked questions about military relocation services, pricing, process, and coverage.',
  keywords: [...DEFAULT_KEYWORDS, 'FAQ', 'military relocation questions'],
})

export const CONTACT_PAGE_METADATA = generateSeoMetadata({
  title: 'Contact | Get In Touch With PCS Concierge',
  description:
    'Contact PCS Concierge to discuss your military relocation needs. Phone, email, and contact form available.',
  keywords: [...DEFAULT_KEYWORDS, 'contact us', 'military relocation support'],
})

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    alternateName: COMPANY.legal,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      'https://facebook.com/pcsconcierge',
      'https://instagram.com/pcsconcierge',
      'https://linkedin.com/company/pcs-concierge',
      'https://twitter.com/pcsconcierge',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      contactType: 'Customer Service',
      email: COMPANY.email,
      availableLanguage: 'en',
      areaServed: 'US',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'US',
    },
  }
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: COMPANY.name,
    description: DEFAULT_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: COMPANY.legal,
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: BASE_URL,
      servicePhone: COMPANY.phone,
      serviceEmail: COMPANY.email,
    },
  }
}
