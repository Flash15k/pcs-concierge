import type { Metadata } from 'next';
import { CONCIERGE_STEPS } from '@/lib/constants';
import { CTASection } from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'The CONCIERGE Method | How PCS Concierge Works',
  description:
    'Our proven 9-step C.O.N.C.I.E.R.G.E. Method transforms PCS chaos into coordinated calm. From intake to completion, every step is handled.',
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            OUR PROCESS
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            The C.O.N.C.I.E.R.G.E. Method\u2122
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            A proven 9-step operating system that transforms PCS chaos into coordinated calm.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          {CONCIERGE_STEPS.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start py-12 ${
                i < CONCIERGE_STEPS.length - 1 ? 'border-b border-gold/10' : ''
              }`}
            >
              {/* Step Number & Letter */}
              <div className="flex-shrink-0 md:w-32 text-center md:text-right">
                <span className="font-heading text-7xl md:text-8xl font-bold text-gold/15 leading-none block">
                  {step.letter}
                </span>
                <span className="text-gold text-xs uppercase tracking-widest font-semibold mt-2 block">
                  Step {String(step.step).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-heading text-2xl md:text-3xl text-navy font-bold mb-4">
                  {step.title}
                </h2>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {step.description}
                </p>
                <div className="w-12 h-[1px] bg-gold mt-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
