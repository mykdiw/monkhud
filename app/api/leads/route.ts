import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('leads')
      .insert({
        email: email.toLowerCase().trim(),
        source: source ?? 'api',
      })

    if (error) {
      if (error.code === '23505') {
        // Already subscribed — treat as success
        return NextResponse.json({ message: 'Already in the Order.' })
      }
      throw error
    }

    return NextResponse.json({ message: 'Signal received.' })
  } catch (err) {
    console.error('Lead insert error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
