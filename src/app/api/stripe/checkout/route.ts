import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { lockExtra } from '@/lib/extras/extrasService';

export async function POST(req: NextRequest) {
  try {
    const { reservationId, extraTypes, returnUrl } = await req.json();

    if (!reservationId || !extraTypes || !Array.isArray(extraTypes) || extraTypes.length === 0 || !returnUrl) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const validExtraTypes = extraTypes.filter(t => t === 'EARLY_CHECKIN' || t === 'LATE_CHECKOUT');
    if (validExtraTypes.length === 0) {
      return NextResponse.json({ error: 'Invalid extraTypes' }, { status: 400 });
    }

    const lineItems = [];
    
    // Lock each extra individually
    for (const extraType of validExtraTypes) {
      const lockedExtra = await lockExtra(reservationId, extraType as any);
      
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: extraType === 'EARLY_CHECKIN' ? 'Early Check-in (13:00 Uhr)' : 'Late Check-out (12:00 Uhr)',
            description: 'Zusatzleistung für Ihren Aufenthalt',
          },
          unit_amount: lockedExtra.priceCent,
        },
        quantity: 1,
      });
    }
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
      metadata: {
        reservationId,
        extraTypes: JSON.stringify(validExtraTypes), // Store as string array for the webhook
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
