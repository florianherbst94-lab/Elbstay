import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe';
import { confirmExtra } from '@/lib/extras/extrasService';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET not set');
    }
    
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    const reservationId = session.metadata?.reservationId;
    const extraTypesString = session.metadata?.extraTypes;
    
    let extraTypes: ('EARLY_CHECKIN' | 'LATE_CHECKOUT')[] = [];
    
    try {
      if (extraTypesString) {
        extraTypes = JSON.parse(extraTypesString);
      } else if (session.metadata?.extraType) {
        // Fallback for older sessions if any exist
        extraTypes = [session.metadata.extraType as 'EARLY_CHECKIN' | 'LATE_CHECKOUT'];
      }
    } catch (e) {
      console.error('Failed to parse extraTypes from metadata', e);
    }

    if (reservationId && extraTypes.length > 0) {
      for (const extraType of extraTypes) {
        try {
          await confirmExtra(reservationId, extraType);
          console.log(`Successfully confirmed ${extraType} for reservation ${reservationId}`);
          // TODO: Here we will later trigger the email to the cleaning team
        } catch (error) {
          console.error(`Failed to confirm extra ${extraType} in database:`, error);
          // We still return 200 to Stripe so they don't retry, but we might want to alert admin
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
