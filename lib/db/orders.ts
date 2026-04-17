import { createClient } from '@/lib/supabase/server'
import type { Order, OrderItem } from '@/lib/types'

function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `MONKHUD-${timestamp}${random}`
}

export async function createOrder(
  payload: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>
): Promise<Order> {
  const supabase = await createClient()
  const orderId = generateOrderId()

  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...payload,
      id: orderId,
      status: 'pending_payment',
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create order: ${error.message}`)

  // Insert order items
  const items: Omit<OrderItem & { order_id: string }, 'id'>[] = payload.items.map(item => ({
    order_id:      orderId,
    product_id:    item.product_id,
    product_name:  item.product_name,
    quantity:      item.quantity,
    unit_price_inr: item.unit_price_inr,
    total_inr:     item.total_inr,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(items)
  if (itemsError) console.error('Failed to insert order items:', itemsError.message)

  return data as Order
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(`Failed to fetch order: ${error.message}`)
  }
  return data as Order
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch user orders: ${error.message}`)
  return data as Order[]
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  extras?: { tracking_number?: string; razorpay_payment_id?: string }
): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status, ...extras })
    .eq('id', orderId)

  if (error) throw new Error(`Failed to update order status: ${error.message}`)
}
