'use client';

import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';

type FormData = {
  clientName: string;
  rank: string;
  phone: string;
  spouseName: string;
  email: string;
  ordersDate: string;
  branch: string;
  currentBase: string;
  currentCityState: string;
  departureDate: string;
  newBase: string;
  newCityState: string;
  arrivalDate: string;
  adults: string;
  children: string;
  pets: string;
  schoolNeeds: string;
  housingPreference: string;
  temporaryHousing: string;
  budgetRange: string;
  bedrooms: string;
  preferredMoveDate: string;
  inspectionDate: string;
  utilities: string;
  storageNeeds: string;
  requests: string;
  contactPreference: string;
};

const initial: FormData = {
  clientName: '', rank: '', phone: '', spouseName: '', email: '',
  ordersDate: '', branch: '', currentBase: '', currentCityState: '',
  departureDate: '', newBase: '', newCityState: '', arrivalDate: '',
  adults: '', children: '', pets: '', schoolNeeds: '',
  housingPreference: '', temporaryHousing: '', budgetRange: '', bedrooms: '',
  preferredMoveDate: '', inspectionDate: '', utilities: '', storageNeeds: '',
  requests: '', contactPreference: '',
};

function RadioGroup({ name, options, value, onChange }: {
  name: keyof FormData;
  options: string[];
  value: string;
  onChange: (name: keyof FormData, val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {options.map(opt => (
        <label key={opt} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(name, opt)}
            className="sr-only"
          />
          <span className={`inline-flex items-center justify-center px-5 py-3 rounded-xl border font-semibold text-sm transition-all ${
            value === opt
              ? 'bg-[rgba(198,166,90,0.14)] border-[#C6A65A] text-[#0B2545] shadow-[0_0_0_3px_rgba(198,166,90,0.18)]'
              : 'border-[#D9DEE6] bg-[#fbfbfb] text-[#1E2430] hover:border-[#C6A65A]'
          }`}>
            {opt}
          </span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-[#1E2430]">
        {label}
        {hint && <span className="ml-1 font-medium text-[#6A7381] text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-[#D9DEE6] bg-[#fbfbfb] rounded-2xl px-4 py-3 text-base text-[#1E2430] outline-none focus:border-[#C6A65A] focus:ring-4 focus:ring-[rgba(198,166,90,0.14)] focus:bg-white transition-all";

export default function IntakePage() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function set(name: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    set(e.target.name as keyof FormData, e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const supabase = getSupabase();
    const nameParts = form.clientName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Upsert client record (in case they haven't purchased yet)
    const { data: clientData } = await supabase
      .from('clients')
      .upsert({ email: form.email, first_name: firstName, last_name: lastName, phone: form.phone, status: 'new' }, { onConflict: 'email' })
      .select('id')
      .single();

    const { error: dbError } = await supabase.from('intake_responses').insert({
      client_id: clientData?.id ?? null,
      responses: form,
    });

    if (dbError) {
      setError('Something went wrong. Please try again or call us at (910) 412-6900.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f3f1eb] to-[#f8f8f8] flex items-center justify-center px-5">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(198,166,90,0.15)] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#C6A65A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase font-semibold mb-3">Intake Received</p>
          <h2 className="font-serif text-3xl text-[#0B2545] mb-4">Thank You, {form.clientName.split(' ')[0]}.</h2>
          <p className="text-[#6A7381] leading-relaxed mb-8">
            Your concierge intake has been submitted. A member of the United PCS Group team will reach out within 10 minutes to begin your personalized relocation plan.
          </p>
          <p className="text-sm text-[#6A7381]">
            Questions? Call or text <strong className="text-[#0B2545]">(910) 412-6900</strong> or email{' '}
            <a href="mailto:info@upcsg.com" className="text-[#C6A65A]">info@upcsg.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3f1eb] to-[#f8f8f8] font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#102f54] to-[#173b63] text-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <p className="text-[#C6A65A] text-xs tracking-widest uppercase mb-3 font-semibold">PCS Concierge by United PCS Group</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">Client Intake Portal</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Tell us about your move and family. Your answers go directly to your dedicated concierge team — no scattered emails, no repeated follow-ups.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            {['Private & Secure', 'Concierge-Reviewed', 'Personalized Response'].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[#f0e6cb] text-xs tracking-widest uppercase backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-5 py-12">
        <form onSubmit={handleSubmit} className="bg-white border border-[rgba(11,37,69,0.07)] rounded-3xl shadow-2xl">

          {/* Section 1 — Contact */}
          <div className="p-8 border-b border-[#D9DEE6]">
            <h2 className="font-serif text-2xl text-[#0B2545] mb-1">Primary Contact Information</h2>
            <p className="text-[#6A7381] text-sm mb-6">We use this to personalize your relocation plan and connect you with the right concierge team.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name">
                <input name="clientName" type="text" placeholder="Enter full name" required value={form.clientName} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Rank" hint="optional">
                <input name="rank" type="text" placeholder="Example: SPC / O-3" value={form.rank} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Primary Phone">
                <input name="phone" type="tel" placeholder="(555) 555-5555" required value={form.phone} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Spouse Name" hint="if applicable">
                <input name="spouseName" type="text" placeholder="Enter spouse name" value={form.spouseName} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Email Address">
                <input name="email" type="email" placeholder="name@example.com" required value={form.email} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="PCS Orders Report Date">
                <input name="ordersDate" type="date" value={form.ordersDate} onChange={handleInput} className={inputClass} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Branch of Service">
                <RadioGroup name="branch" options={['Army', 'Navy', 'Air Force', 'Marines', 'Space Force']} value={form.branch} onChange={set} />
              </Field>
            </div>
          </div>

          {/* Section 2 — Duty Station */}
          <div className="p-8 border-b border-[#D9DEE6]">
            <h2 className="font-serif text-2xl text-[#0B2545] mb-1">Duty Station Details</h2>
            <p className="text-[#6A7381] text-sm mb-6">These details allow us to map timelines, identify installation-specific logistics, and prepare your move strategy.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-lg text-[#0B2545]">Current Duty Station</h3>
                <Field label="Base Name">
                  <input name="currentBase" type="text" placeholder="Example: Fort Liberty" required value={form.currentBase} onChange={handleInput} className={inputClass} />
                </Field>
                <Field label="City / State">
                  <input name="currentCityState" type="text" placeholder="Fayetteville, NC" value={form.currentCityState} onChange={handleInput} className={inputClass} />
                </Field>
                <Field label="Expected Departure Date">
                  <input name="departureDate" type="date" value={form.departureDate} onChange={handleInput} className={inputClass} />
                </Field>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-lg text-[#0B2545]">New Duty Station</h3>
                <Field label="Base Name">
                  <input name="newBase" type="text" placeholder="Example: Joint Base Lewis-McChord" required value={form.newBase} onChange={handleInput} className={inputClass} />
                </Field>
                <Field label="City / State">
                  <input name="newCityState" type="text" placeholder="Tacoma, WA" value={form.newCityState} onChange={handleInput} className={inputClass} />
                </Field>
                <Field label="Expected Arrival Date">
                  <input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleInput} className={inputClass} />
                </Field>
              </div>
            </div>
          </div>

          {/* Section 3 — Family & Housing */}
          <div className="p-8 border-b border-[#D9DEE6]">
            <h2 className="font-serif text-2xl text-[#0B2545] mb-1">Family & Housing Profile</h2>
            <p className="text-[#6A7381] text-sm mb-6">These answers help us personalize housing guidance, vendors, and timeline priorities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Number of Adults">
                <input name="adults" type="text" placeholder="Example: 2" value={form.adults} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Number of Dependents / Children">
                <input name="children" type="text" placeholder="Example: 3" value={form.children} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Pets in Household">
                <input name="pets" type="text" placeholder="Example: 1 dog, 2 cats" value={form.pets} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="School / Childcare Priorities">
                <input name="schoolNeeds" type="text" placeholder="Neighborhoods, school ratings, commute preferences" value={form.schoolNeeds} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Housing Budget Range">
                <input name="budgetRange" type="text" placeholder="Example: $2,200–$2,800" value={form.budgetRange} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Bedrooms Needed">
                <input name="bedrooms" type="text" placeholder="Example: 3+" value={form.bedrooms} onChange={handleInput} className={inputClass} />
              </Field>
            </div>
            <div className="mt-5 flex flex-col gap-5">
              <Field label="Housing Preference">
                <RadioGroup name="housingPreference" options={['On-base', 'Off-base', 'Undecided']} value={form.housingPreference} onChange={set} />
              </Field>
              <Field label="Temporary Housing Needed?">
                <RadioGroup name="temporaryHousing" options={['Yes', 'No']} value={form.temporaryHousing} onChange={set} />
              </Field>
            </div>
          </div>

          {/* Section 4 — Logistics */}
          <div className="p-8 border-b border-[#D9DEE6]">
            <h2 className="font-serif text-2xl text-[#0B2545] mb-1">PCS Logistics & Preferences</h2>
            <p className="text-[#6A7381] text-sm mb-6">These details guide your concierge action plan, vendor scheduling, utility coordination, and move-week support.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Preferred Move Date">
                <input name="preferredMoveDate" type="date" value={form.preferredMoveDate} onChange={handleInput} className={inputClass} />
              </Field>
              <Field label="Known Final Inspection Date" hint="if scheduled">
                <input name="inspectionDate" type="date" value={form.inspectionDate} onChange={handleInput} className={inputClass} />
              </Field>
            </div>
            <div className="mt-5 flex flex-col gap-5">
              <Field label="Utility Connection / Transfer Preferences">
                <textarea name="utilities" placeholder="List preferred providers, account notes, or known utility companies." value={form.utilities} onChange={handleInput} className={`${inputClass} min-h-28 resize-y`} />
              </Field>
              <Field label="Storage / Vehicle / Special Move Support">
                <textarea name="storageNeeds" placeholder="Mention storage, vehicle shipment, arrival support, grocery setup, or specialty requests." value={form.storageNeeds} onChange={handleInput} className={`${inputClass} min-h-28 resize-y`} />
              </Field>
              <Field label="Specific Requests / Concerns">
                <textarea name="requests" placeholder="Tell us what is stressing you most about this move. We use this to personalize your support." value={form.requests} onChange={handleInput} className={`${inputClass} min-h-28 resize-y`} />
              </Field>
              <Field label="Preferred Communication Method">
                <RadioGroup name="contactPreference" options={['Phone', 'Email', 'Either']} value={form.contactPreference} onChange={set} />
              </Field>
            </div>
          </div>

          {/* Submit */}
          <div className="p-8">
            {error && (
              <p className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C6A65A] to-[#b48d33] text-white font-bold text-lg shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit My Intake Form'}
            </button>
            <div className="mt-6 p-5 rounded-2xl bg-[#0B2545] text-white">
              <p className="text-xs tracking-widest uppercase text-[#C6A65A] font-semibold mb-2">Private & Concierge-Managed</p>
              <p className="text-white/80 text-sm leading-relaxed">
                Your information is shared only with your assigned concierge team at United PCS Group. It is never sold, shared with third parties, or used for advertising purposes.
              </p>
            </div>
          </div>

        </form>
      </div>

      <p className="text-center text-[#6A7381] text-sm pb-10">
        © {new Date().getFullYear()} United PCS Group LLC · <a href="https://upcsg.com" className="text-[#C6A65A]">upcsg.com</a>
      </p>
    </div>
  );
}
