import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' });
}
function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}
function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
function getSupabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

const PACKAGE_NAMES: Record<string, { name: string; price: string; description: string }> = {
  basic: {
    name: 'Basic Coordination',
    price: '$497',
    description: 'Utility setup, custom PCS checklist, move-out prep, one coordination call, and portal onboarding.',
  },
  standard: {
    name: 'Standard PCS Support',
    price: '$997',
    description: 'Comprehensive support including housing search, cleaning coordination, move-out logistics, and arrival preparation.',
  },
  'white-glove': {
    name: 'White Glove PCS Command',
    price: '$1,497',
    description: 'Full-service concierge including storage, vendor scheduling, grocery coordination, weekly updates, and priority communication.',
  },
};

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const resend = getResend();
  const supabase = getSupabase();

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Military Family';
    const customerPhone = session.customer_details?.phone || 'Not provided';
    const packageId = session.metadata?.packageId || 'standard';
    const pkg = PACKAGE_NAMES[packageId] ?? PACKAGE_NAMES['standard'];

    // Save client to database
    const nameParts = customerName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    const packageMap: Record<string, string> = {
      basic: 'essential',
      standard: 'premier',
      'white-glove': 'elite',
    };

    if (customerEmail) {
      const supabaseAdmin = getSupabaseAdmin();

      // Invite user to client portal (sends set-password email)
      const { data: authUser } = await supabaseAdmin.auth.admin.inviteUserByEmail(customerEmail, {
        redirectTo: 'https://upcsg.com/portal/dashboard',
        data: { first_name: firstName, last_name: lastName },
      });

      const { error: dbError } = await supabase.from('clients').upsert({
        email: customerEmail,
        first_name: firstName,
        last_name: lastName,
        phone: customerPhone,
        package: packageMap[packageId] ?? 'premier',
        stripe_session_id: session.id,
        status: 'new',
        user_id: authUser?.user?.id ?? null,
      }, { onConflict: 'email' });

      if (dbError) console.error('Supabase insert error:', dbError);
    }

    // Send confirmation email to client
    if (customerEmail) {
      await resend.emails.send({
        from: 'PCS Concierge <no-reply@upcsg.com>',
        to: customerEmail,
        subject: `Welcome to PCS Concierge — Your ${pkg.name} is Confirmed`,
        html: clientConfirmationEmail(customerName, pkg),
      });
    }

    // Send internal alert to the business
    await resend.emails.send({
      from: 'PCS Concierge Alerts <no-reply@upcsg.com>',
      to: 'info@UPCSG.com',
      subject: `New Purchase — ${pkg.name} (${pkg.price})`,
      html: internalAlertEmail(customerName, customerEmail || 'N/A', customerPhone, pkg),
    });
  }

  return NextResponse.json({ received: true });
}

function clientConfirmationEmail(
  name: string,
  pkg: { name: string; price: string; description: string }
) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0F1A2E 0%,#1B2A4A 100%);padding:48px 40px;text-align:center;">
            <p style="color:#C9A84C;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px 0;font-family:Arial,sans-serif;">PCS Concierge by United PCS Group</p>
            <h1 style="color:#F5F0E8;font-size:32px;margin:0 0 16px 0;font-weight:bold;line-height:1.2;">Welcome to the Family.</h1>
            <div style="width:40px;height:1px;background:#C9A84C;margin:0 auto 16px auto;"></div>
            <p style="color:rgba(245,240,232,0.7);font-size:15px;margin:0;font-family:Arial,sans-serif;">Your purchase is confirmed.</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:48px 40px;">
            <p style="color:#2C3E50;font-size:16px;margin:0 0 24px 0;font-family:Arial,sans-serif;">Dear ${name},</p>
            <p style="color:#2C3E50;font-size:15px;line-height:1.7;margin:0 0 24px 0;font-family:Arial,sans-serif;">
              Thank you for trusting PCS Concierge with your family's move. Your <strong style="color:#0F1A2E;">${pkg.name}</strong> package has been secured at <strong style="color:#C9A84C;">${pkg.price}</strong>.
            </p>

            <!-- Package box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,168,76,0.3);margin:0 0 32px 0;">
              <tr>
                <td style="padding:24px 28px;background:#fdfbf7;">
                  <p style="color:#C9A84C;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px 0;font-family:Arial,sans-serif;">Your Package</p>
                  <p style="color:#0F1A2E;font-size:18px;font-weight:bold;margin:0 0 8px 0;">${pkg.name} — ${pkg.price}</p>
                  <p style="color:#5a6a7a;font-size:14px;margin:0;line-height:1.6;font-family:Arial,sans-serif;">${pkg.description}</p>
                </td>
              </tr>
            </table>

            <!-- Next steps -->
            <p style="color:#C9A84C;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;font-family:Arial,sans-serif;">What Happens Next</p>
            ${[
              ['01', 'Your concierge will call or text you within 10 minutes.'],
              ['02', 'Check your inbox for your welcome packet and intake form.'],
              ['03', 'Complete your intake to schedule your Orientation Call.'],
              ['04', 'Receive your custom PCS Action Plan within 24 hours.'],
            ].map(([num, text]) => `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td width="32" style="vertical-align:top;padding-top:2px;">
                  <span style="color:#C9A84C;font-size:12px;font-weight:bold;font-family:Arial,sans-serif;">${num}</span>
                </td>
                <td style="color:#5a6a7a;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">${text}</td>
              </tr>
            </table>`).join('')}

            <div style="width:40px;height:1px;background:#C9A84C;margin:32px 0;"></div>
            <p style="color:#5a6a7a;font-size:14px;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
              Questions before we reach out? Call or text us at <strong style="color:#0F1A2E;">(910) 412-6900</strong> or reply to this email at <a href="mailto:info@UPCSG.com" style="color:#C9A84C;">info@UPCSG.com</a>.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0F1A2E;padding:32px 40px;text-align:center;">
            <p style="color:rgba(245,240,232,0.5);font-size:12px;margin:0;font-family:Arial,sans-serif;line-height:1.6;">
              PCS Concierge by United PCS Group LLC<br>
              <a href="https://upcsg.com" style="color:#C9A84C;text-decoration:none;">upcsg.com</a> &nbsp;|&nbsp; (910) 412-6900 &nbsp;|&nbsp; info@UPCSG.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalAlertEmail(
  name: string,
  email: string,
  phone: string,
  pkg: { name: string; price: string }
) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:40px 20px;background:#f5f0e8;font-family:Arial,sans-serif;">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;">
    <tr>
      <td style="background:linear-gradient(135deg,#0F1A2E 0%,#1B2A4A 100%);padding:32px 40px;">
        <p style="color:#C9A84C;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 8px 0;">New Purchase Alert</p>
        <h1 style="color:#F5F0E8;font-size:24px;margin:0;">${pkg.name}</h1>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:40px;">
        <p style="color:#C9A84C;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">Client Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d0;">
          <tr style="border-bottom:1px solid #e8e0d0;">
            <td style="padding:12px 16px;background:#fdfbf7;color:#888;font-size:12px;width:120px;">Name</td>
            <td style="padding:12px 16px;color:#0F1A2E;font-size:14px;font-weight:bold;">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8e0d0;">
            <td style="padding:12px 16px;background:#fdfbf7;color:#888;font-size:12px;">Email</td>
            <td style="padding:12px 16px;color:#0F1A2E;font-size:14px;">${email}</td>
          </tr>
          <tr style="border-bottom:1px solid #e8e0d0;">
            <td style="padding:12px 16px;background:#fdfbf7;color:#888;font-size:12px;">Phone</td>
            <td style="padding:12px 16px;color:#0F1A2E;font-size:14px;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;background:#fdfbf7;color:#888;font-size:12px;">Package</td>
            <td style="padding:12px 16px;color:#C9A84C;font-size:14px;font-weight:bold;">${pkg.name} — ${pkg.price}</td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#fdfbf7;border-left:3px solid #C9A84C;">
          <p style="margin:0;color:#0F1A2E;font-size:14px;font-weight:bold;">Action Required: Contact this client within 10 minutes.</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#0F1A2E;padding:24px 40px;text-align:center;">
        <p style="color:rgba(245,240,232,0.5);font-size:12px;margin:0;">PCS Concierge — upcsg.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
