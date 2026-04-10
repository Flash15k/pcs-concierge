// Clean UTF-8 encoding verified
import type { Metadata } from 'next';
import { ServiceTiers } from '@/components/home/ServiceTiers';
import { CTASection } from '@/components/home/CTASection';
import { SERVICE_PACKAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Military PCS Service Packages',
  description:
    'Choose from Basic ($497), Standard ($997), or White Glove ($1,497) PCS coordination packages. Built exclusively for military families.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            OUR SERVICES
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            Service Packages
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Every package is designed to lift the weight of your PCS from your shoulders. Choose the level of support that fits your family.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <ServiceTiers />

      {/* Comparison Table */}
      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-navy text-center font-bold mb-12">
            Compare Packages
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gold/20">
                  <th className="text-left py-4 px-4 font-body text-sm uppercase tracking-wider text-slate font-semibold">
                    Feature
                  </th>
                  {SERVICE_PACKAGES.map((pkg) => (
                    <th
                      key={pkg.id}
                      className="text-center py-4 px-4 font-heading text-lg text-navy font-bold"
                    >
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Utility Setup / Cancellation', basic: true, standard: true, whiteGlove: true },
                  { feature: 'Custom PCS Checklist', basic: true, standard: true, whiteGlove: true },
                  { feature: 'Move-Out Inspection Prep', basic: true, standard: true, whiteGlove: true },
                  { feature: 'Coordination Call', basic: true, standard: true, whiteGlove: true },
                  { feature: 'Portal Onboarding', basic: true, standard: true, whiteGlove: true },
                  { feature: 'Housing Search Assistance', basic: false, standard: true, whiteGlove: true },
                  { feature: 'Move-Out Cleaning Coordination', basic: false, standard: true, whiteGlove: true },
                  { feature: 'Arrival Preparation Checklist', basic: false, standard: true, whiteGlove: true },
                  { feature: 'Storage Coordination', basic: false, standard: false, whiteGlove: true },
                  { feature: 'Vendor Scheduling Support', basic: false, standard: false, whiteGlove: true },
                  { feature: 'Arrival Grocery Coordination', basic: false, standard: false, whiteGlove: true },
                  { feature: 'Weekly Progress Updates', basic: false, standard: false, whiteGlove: true },
                  { feature: 'Priority Communication', basic: false, standard: false, whiteGlove: true },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gold/10">
                    <td className="py-4 px-4 text-charcoal/80 text-sm">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {row.basic ? (
                        <span className="text-gold text-lg">✓</span>
                      ) : (
                        <span className="text-slate/30">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.standard ? (
                        <span className="text-gold text-lg">✓</span>
                      ) : (
                        <span className="text-slate/30">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.whiteGlove ? (
                        <span className="text-gold text-lg">✓</span>
                      ) : (
                        <span className="text-slate/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
