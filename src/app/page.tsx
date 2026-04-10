import type { Metadata } from 'next';
import { HeroSection } from 'A/components/home/HeroSection';
import { TrustBar } from '@/components/home/TrustBar';
import { ProblemSection } from '@/components/home/ProblemSection';
import { SolutionSection } from '@/components/home/SolutionSection';
import { ServiceTiers } from '@/components/home/ServiceTiers';
import { ProcessTimeline } from '@/components/home/ProcessTimeline';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { StatsSection } from 'A/components/home/StatsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from 'A/components/home/CTASection';

export const metadata: Metadata = {
  title: 'PCS Concierge | Luxury Military Relocation Services',
  description:
    'Premium PCS coordination for military families. White-glove service for housing, utilities, cleaning & every detail of your move. Serving all U.S. installations.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <section id="problem">
        <ProblemSection />
      </section>
      <section id="solution">
        <SolutionSection />
      </section>
      <section id="pricing">
        <ServiceTiers />
      </section>
      <section id="process">
        <ProcessTimeline />
      </section>
      <TestimonialCarousel />
      <StatsSection />
      <section id="faq">
        <FAQSection />
      </section>
      <CTASection />
    </>
  );
}
