import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  // TODO: verify webhook signature and handle events
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  //
  // const supabase = createServiceClient() // needs service role key to update users
  //
  // if (event.type === 'checkout.session.completed') {
  //   const session = event.data.object as Stripe.Checkout.Session
  //   const userId = session.metadata?.user_id!
  //   await supabase.auth.admin.updateUserById(userId, { user_metadata: { plan: 'pro' } })
  //   await supabase.from('subscriptions').upsert({
  //     user_id: userId,
  //     stripe_customer_id: session.customer as string,
  //     stripe_subscription_id: session.subscription as string,
  //     status: 'active',
  //     plan: 'pro',
  //   })
  // }
  //
  // if (event.type === 'customer.subscription.deleted') {
  //   const sub = event.data.object as Stripe.Subscription
  //   const { data } = await supabase
  //     .from('subscriptions')
  //     .select('user_id')
  //     .eq('stripe_subscription_id', sub.id)
  //     .single()
  //   if (data) {
  //     await supabase.auth.admin.updateUserById(data.user_id, { user_metadata: { plan: 'free' } })
  //     await supabase.from('subscriptions').update({ status: 'canceled', plan: 'free' }).eq('stripe_subscription_id', sub.id)
  //   }
  // }

  return NextResponse.json({ error: 'Stripe not configured' }, { status: 501 })
}
