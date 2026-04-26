import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase/service'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode !== 'subscription') break

      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      await supabaseAdmin.from('subscriptions').upsert({
        user_id: session.metadata?.user_id,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: sub.id,
        plan: 'pro',
        status: sub.status,
        current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
      }, { onConflict: 'stripe_customer_id' })
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const plan = sub.status === 'active' ? 'pro' : 'free'
      await supabaseAdmin.from('subscriptions').update({
        plan,
        status: sub.status,
        current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
      }).eq('stripe_subscription_id', sub.id)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabaseAdmin.from('subscriptions').update({
        plan: 'free',
        status: 'canceled',
      }).eq('stripe_subscription_id', sub.id)
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await supabaseAdmin.from('subscriptions').update({
        status: 'past_due',
      }).eq('stripe_customer_id', invoice.customer as string)
      break
    }
  }

  return NextResponse.json({ received: true })
}
