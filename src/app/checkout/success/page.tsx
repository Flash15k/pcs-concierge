import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Purchase Confirmed | PCS Concierge',
  description: 'Thank you for choosing PCS Concierge. Your concierge team will be in touch shortly.',
};

const PACKAGE_NAMES: Record<string, string> = {
  basic: 'Basic Coordination',
  standard: 'Standard PCS Support',
  'white-glove': 'White Glove PCS Command',
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { package?: string; session_id?: string };
}) {
  const packageName = PACKAGE_NAMES[searchParams.package ?? ''] ?? 'Your Package';

  return (
    <main className="min-h-screen bg-deep-navy flex items-center justify-center px-6 py-24"
      style={{ background: 'linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 100%)' }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Emblem */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 opacity-80">
            <Image
              src="/logos/emblem-circle.png"
              alt="PCS Concierge"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Gold divider */}
        <div className="w-12 h-[1px] bg-gold mx-auto mb-8" />

        <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold font-body mb-4">
          Purchase Confirmed
        </p>

        <h1 className="font-heading text-4xl md:text-5xl text-cream font-bold mb-6">
          Welcome to the Family.
        </h1>

        <p className="text-cream/70 font-body text-lg mb-4">
          You&apos;ve secured your{' '}
          <span className="text-gold font-semibold">{packageName}</span>.
        </p>

        <p className="text-cream/60 font-body text-base mb-12">
          Your concierge team will reach out within{' '}
          <span className="text-cream font-semibold">10 minutes</span> to begin
          your intake and get your PCS Action Plan underway.
        </p>

        <div className="w-full h-[1px] bg-gold/20 mb-10" />

        <div className="space-y-4 text-left bg-white/5 border border-gold/10 p-8 mb-10">
          <p className="text-gold uppercase tracking-[0.15em] text-xs font-semibold font-body mb-4">
            What Happens Next
          </p>
          {[
            'Check your email for your welcome packet and intake form.',
            'Your dedicated concierge will call or text within 10 minutes.',
            'Complete your intake form to schedule your Orientation Call.',
            'Receive your custom PCS Action Plan within 24 hours.',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gold font-heading font-bold text-sm mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-cream/70 font-body text-sm">{step}</p>
            </div>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block border border-gold text-gold px-8 py-4 font-semibold uppercase tracking-wider text-sm font-body hover:bg-gold hover:text-navy transition-all duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
