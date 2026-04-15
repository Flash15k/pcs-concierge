import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Checkout Cancelled | PCS Concierge',
  description: 'Your checkout was cancelled. Return to view our service packages.',
};

export default function CancelPage() {
  return (
    <main
      className="min-h-screen bg-deep-navy flex items-center justify-center px-6 py-24"
      style={{ background: 'linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 100%)' }}
    >
      <div className="max-w-lg w-full text-center">
        {/* Emblem */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 opacity-50">
            <Image
              src="/logos/emblem-circle.png"
              alt="PCS Concierge"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-12 h-[1px] bg-gold mx-auto mb-8" />

        <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold font-body mb-4">
          Checkout Cancelled
        </p>

        <h1 className="font-heading text-4xl md:text-5xl text-cream font-bold mb-6">
          No Worries.
        </h1>

        <p className="text-cream/70 font-body text-lg mb-12">
          Your checkout was cancelled and you have not been charged. Whenever
          you&apos;re ready, we&apos;re here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#pricing"
            className="bg-gold text-navy px-8 py-4 font-semibold uppercase tracking-wider text-sm font-body hover:brightness-110 transition-all duration-300"
          >
            View Packages
          </Link>
          <Link
            href="/"
            className="border border-gold text-gold px-8 py-4 font-semibold uppercase tracking-wider text-sm font-body hover:bg-gold hover:text-navy transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
