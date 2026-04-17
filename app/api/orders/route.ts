import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `MONKHUD-${timestamp}${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customer_name, customer_email, customer_phone,
      delivery_line1, delivery_line2,
      delivery_city, delivery_state, delivery_pin,
      subtotal_inr, shipping_inr = 0, gst_inr = 0, total_inr,
      items, payment_method, user_id,
    } = body

    // Basic validation
    if (!customer_name || !customer_email || !delivery_line1 ||
        !delivery_city || !delivery_state || !delivery_pin ||
        !items?.length || !total_inr) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()
    const orderId = generateOrderId()

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        user_id: user_id ?? null,
        customer_name,
        customer_email,
        customer_phone: customer_phone ?? null,
        delivery_line1,
        delivery_line2: delivery_line2 ?? null,
        delivery_city,
        delivery_state,
        delivery_pin,
        delivery_country: 'India',
        subtotal_inr,
        shipping_inr,
        gst_inr,
        total_inr,
        items,
        payment_method: payment_method ?? null,
        status: 'pending_payment',
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Insert order items
    const orderItems = items.map((item: {
      product_id: number
      product_name: string
      quantity: number
      unit_price_inr: number
      total_inr: number
    }) => ({
      order_id: orderId,
      ...item,
    }))

    await supabase.from('order_items').insert(orderItems)

    return NextResponse.json({ order_id: orderId, order })
  } catch (err) {
    console.error('Order creation error:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('id')

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json({ order: data })
}
