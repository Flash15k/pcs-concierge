import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import SiteShell from '@/components/layout/SiteShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://upcsg.com'),
  title: {
    default: 'PCS Concierge | Luxury Military Relocation Services',
    template: '%s | PCS Concierge',
  },
  description:
    'Premium PCS relocation concierge for military families. White-glove coordination for housing, utilities, cleaning, and every detail of your Permanent Change of Station. Serving all U.S. military installations.',
  keywords: [
    'PCS concierge',
    'military relocation services',
    'PCS move help',
    'military family moving service',
    'PCS coordination',
    'military moving concierge',
    'white glove military relocation',
    'military PCS assistance',
    'permanent change of station help',
    'military move coordinator',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://upcsg.com',
    siteName: 'PCS Concierge by United PCS Group',
    title: 'PCS Concierge | Your PCS Move, Professionally Coordinated',
    description:
      'Premium white-glove relocation concierge built exclusively for military families.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PCS Concierge - Luxury Military Relocation',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://upcsg.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-body bg-cream text-charcoal antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
