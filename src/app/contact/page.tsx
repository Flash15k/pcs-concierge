'use client';

import { useState } from 'react';
import { COMPANY, BRANCHES } from '@/lib/constants';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-navy pt-44 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            GET IN TOUCH
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Ready to experience a PCS move without the stress? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-cream py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="text-center py-16">
                <span className="text-gold text-5xl block mb-6">✓</span>
                <h2 className="font-heading text-3xl text-navy font-bold mb-4">
                  Thank You
                </h2>
                <p className="text-charcoal/70 text-lg">
                  We&apos;ve received your inquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      Branch of Service
                    </label>
                    <select className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all">
                      <option value="">Select branch</option>
                      {BRANCHES.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      Current Installation
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                      placeholder="e.g., Fort Liberty"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                      PCS Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                    Package Interest
                  </label>
                  <select className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all">
                    <option value="">Select a package</option>
                    <option value="basic">Basic Coordination — $497</option>
                    <option value="standard">Standard PCS Support — $997</option>
                    <option value="white-glove">White Glove PCS Command — $1,497</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gold/20 text-charcoal focus:border-gold focus:ring-1 focus:ring-gold/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your PCS situation and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-navy py-4 font-semibold uppercase tracking-wider text-sm hover:brightness-110 transition-all"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-navy p-10 text-cream">
              <h3 className="font-heading text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-gold text-xs uppercase tracking-wider font-semibold mb-1">
                    Phone
                  </p>
                  <a href={`tel:${COMPANY.phoneTel}`} className="text-cream hover:text-gold transition-colors text-lg">
                    {COMPANY.phone}
                  </a>
                </div>

                <div>
                  <p className="text-gold text-xs uppercase tracking-wider font-semibold mb-1">
                    Email
                  </p>
                  <a href={`mailto:${COMPANY.email}`} className="text-cream hover:text-gold transition-colors text-lg">
                    {COMPANY.email}
                  </a>
                </div>

                <div className="pt-4 border-t border-gold/20">
                  <p className="text-gold text-xs uppercase tracking-wider font-semibold mb-3">
                    Business Hours
                  </p>
                  <p className="text-cream/70 text-sm">{COMPANY.hours.weekday}</p>
                  <p className="text-cream/70 text-sm">{COMPANY.hours.saturday}</p>
                  <p className="text-cream/70 text-sm">{COMPANY.hours.sunday}</p>
                </div>

                <div className="pt-4 border-t border-gold/20">
                  <p className="text-cream/50 text-sm leading-relaxed">
                    We respond to all inquiries within 24 hours. For urgent PCS matters, please call directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
