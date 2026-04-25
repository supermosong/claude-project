import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRO_PRICE_ID } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
    metadata: { user_id: user.id },
    success_url: `${siteUrl}/settings?upgraded=true`,
    cancel_url: `${siteUrl}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
