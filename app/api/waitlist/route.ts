import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim().toLowerCase()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        { status: 400 }
      )
    }

    const userAgent = request.headers.get('user-agent')
    const referrer = request.headers.get('referer')

    const { error } = await supabase.from('waitlist').insert({
      email,
      source: 'coming_soon',
      user_agent: userAgent,
      referrer: referrer,
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'You are already on the waitlist.',
        })
      }

      console.error('Supabase Error:', error)

      return NextResponse.json(
        {
          success: false,
          message: 'Something went wrong. Please try again.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'You are on the waitlist.',
    })
  } catch (error) {
    console.error('API Error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request.',
      },
      { status: 400 }
    )
  }
}