// Clean UTF-8 encoding verified
import type { Metadata } from 'next';
import { CTASection } from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'About PCS Concierge | United PCS Group',
  description:
    'PCS Concierge delivers premium military relocation coordination. Learn about our mission to serve military families with white-glove care.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            WHO WE ARE
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            About PCS Concierge
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            A premium concierge operation built exclusively for the families who serve.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            OUR MISSION
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-navy font-bold mb-8">
            Military Precision. Concierge Grace.
          </h2>
          <div className="w-16 h-[1px] bg-gold mb-8" />
          <div className="space-y-6 text-charcoal/80 text-lg leading-relaxed">
            <p>
              PCS Concierge by United PCS Group LLC was founded on a simple conviction: military families deserve better than the chaos of relocation. Every year, hundreds of thousands of service members and their families face the logistical onslaught of a Permanent Change of Station — and too often, they face it alone.
            </p>
            <p>
              We built PCS Concierge to change that. Our organization delivers premium relocation coordination — utilities, housing support, move-out preparation, vendor scheduling, cleaning coordination, and arrival planning — with the precision of a military operation and the warmth of a five-star concierge.
            </p>
            <p>
              We are not a moving company. We are a command center for your family&apos;s transition. Every detail is tracked, every deadline is met, and every family is treated with the respect their service has earned.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-deep-navy py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
              OUR VALUES
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream font-bold">
              What Guides Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: 'Service Before Self',
                desc: 'Your family served this country. We serve your family. Every action we take is measured by one standard: does this make the transition easier for the families who trust us?',
              },
              {
                title: 'Institutional Excellence',
                desc: 'We operate with the standards of an institution, not a startup. Our systems, communications, and processes reflect the premium experience every military family deserves.',
              },
              {
                title: 'Proactive Communication',
                desc: "A family should never have to ask \"what's happening with my move?\" Our operating principle is simple: if the client has to ask, we've already failed.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 border border-gold/30 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gold text-xl">✦</span>
                </div>
                <h3 className="font-heading text-xl text-cream font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="bg-cream py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8" />
          <p className="font-heading text-3xl md:text-4xl text-navy font-bold italic">
            &ldquo;Your PCS Move, Professionally Coordinated.&rdquo;
          </p>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8" />
        </div>
      </section>

      <CTASection />
    </>
  );
}
