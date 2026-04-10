// Clean UTF-8 encoding verified
'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = Array.isArray(FAQ_ITEMS) ? FAQ_ITEMS : [];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            COMMON QUESTIONS
          </p>
          <h2 className="font-heading text-4xl text-navy font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gold/10 py-6 cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="font-body text-lg font-semibold text-navy flex-1">
                  {item.q || ''}
                </h3>
                {/* Plus/Minus Icon */}
                <div
                  className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  <span className="text-gold text-2xl font-light">+</span>
                </div>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-400 ${
                  openIndex === index
                    ? 'max-h-[500px] opacity-100 pt-4'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-charcoal/70 text-base leading-relaxed">
                  {item.a || ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
