import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

const PACKAGES: Record<string, { name: string; description: string; amount: number }> = {
  basic: {
    name: 'Basic Coordination',
    description: 'Utility setup, custom PCS checklist, move-out prep, one coordination call, and portal onboarding.',
    amount: 49700, // in cents
  },
  standard: {
    name: 'Standard PCS Support',
    description: 'Comprehensive support: housing search, cleaning coordination, move-out logistics, and arrival preparation.',
    amount: 99700,
  },
  'white-glove': {
    name: 'White Glove PCS Command',
    description: 'Full-service concierge: storage, vendor scheduling, grocery coordination, weekly updates, and priority communication.',
    amount: 149700,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { packageId } = await req.json();

    const pkg = PACKAGES[packageId];
    if (!pkg) {
      return NextResponse.json({ error: 'Invalid package selected.' }, { status: 400 });
    }

    const origin = req.headers.get('origin') || req.headers.get('referer')?.replace(/\/$/, '') || 'http://localhost:3000';
    const siteUrl = process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_SITE_URL || origin)
      : origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `PCS Concierge — ${pkg.name}`,
              description: pkg.description,
              images: [`${siteUrl}/images/emblem-circle.png`],
            },
            unit_amount: pkg.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&package=${packageId}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: { packageId },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: {
          message: 'Your concierge team will contact you within 10 minutes of purchase to begin onboarding.',
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 });
  }
}
