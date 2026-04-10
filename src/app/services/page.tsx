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
