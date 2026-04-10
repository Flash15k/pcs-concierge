// Clean UTF-8 encoding verified
'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants';
import { CTASection } from '@/components/home/CTASection';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            QUESTIONS & ANSWERS
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Everything you need to know about PCS Concierge and how we serve military families.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="border-b border-gold/10 py-6 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-body text-lg font-semibold text-navy flex-1 pr-4">
                  {item.q}
                </h2>
                <div
                  className={`flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  <span className="text-gold text-2xl font-light">+</span>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === index
                    ? 'max-h-[500px] opacity-100 pt-4'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-charcoal/70 text-base leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
