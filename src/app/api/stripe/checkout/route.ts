import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { lockExtra } from '@/lib/extras/extrasService';

export async function POST(req: NextRequest) {
  try {
    const { reservationId, extraType, returnUrl } = await req.json();

    if (!reservationId || !extraType || !returnUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    if (extraType !== 'EARLY_CHECKIN' && extraType !== 'LATE_CHECKOUT') {
      return NextResponse.json({ error: 'Invalid extraType' }, { status: 400 });
    }

    // Lock the extra (returns 500/throws if conflict exists or already booked)
    // We lock it BEFORE generating the payment link, so nobody else can take it while they are paying.
    // The lock is temporary in our DB (PENDING status). If they don't pay, it stays PENDING until we write a cleanup script later.
    const lockedExtra = await lockExtra(reservationId, extraType);

    const priceAmount = lockedExtra.priceCent;
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: extraType === 'EARLY_CHECKIN' ? 'Early Check-in (13:00 Uhr)' : 'Late Check-out (12:00 Uhr)',
              description: 'Zusatzleistung für Ihren Aufenthalt',
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        reservationId,
        extraType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
