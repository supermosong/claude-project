import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fake mode — swap this for real Stripe billing portal when ready
  return NextResponse.redirect(new URL('/fake-portal', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'))
}
