// ═══════════════════════════════════════════════════════════════
// MONK HUD — TypeScript Types
// These mirror the Supabase database schema exactly.
// Generated types available via: npx supabase gen types typescript
// ═══════════════════════════════════════════════════════════════

export type ProductCategory =
  | 'keyboards'
  | 'mice'
  | 'audio'
  | 'lighting'
  | 'mounts'
  | 'accessories'

export type PathSlug = 'quick' | 'still' | 'long'

export type OrderStatus =
  | 'pending_payment'
  | 'payment_received'
  | 'processing'
  | 'dispatched'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

// ─────────────────────────────────────────────────────────────
// PRODUCT (Companion)
// ─────────────────────────────────────────────────────────────
export interface Product {
  id:            number
  slug:          string
  name:          string
  category:      ProductCategory
  emoji:         string | null
  price_inr:     number
  orig_inr:      number | null
  badge:         string | null
  badge_type:    string | null
  rating:        number
  review_count:  number
  description:   string        // one-sentence nature — card copy
  pick:          string | null // Monk's Pick reason — modal
  creature_text: string | null // The Creature editorial
  monks_notes:   string | null // The Monk's Notes
  specs:         Record<string, string>
  tags:          string[]
  in_stock:      boolean
  stock_qty:     number
  is_new:        boolean
  is_sale:       boolean
  is_featured:   boolean
  sort_order:    number
  created_at:    string
  updated_at:    string
}

// ─────────────────────────────────────────────────────────────
// PATH
// ─────────────────────────────────────────────────────────────
export interface Path {
  id:              number
  slug:            PathSlug
  name:            string      // 'The Quick Path'
  subtitle:        string      // 'Setup of the Shrike'
  archetype:       string      // 'Shrike'
  archetype_emoji: string | null
  description:     string
  stat_label_1:    string | null
  stat_value_1:    string | null
  stat_label_2:    string | null
  stat_value_2:    string | null
  stat_label_3:    string | null
  stat_value_3:    string | null
  stat_label_4:    string | null
  stat_value_4:    string | null
  product_ids:     number[]
  bundle_savings:  number
  sort_order:      number
}

export interface PathWithProducts extends Path {
  products: Product[]
}

// ─────────────────────────────────────────────────────────────
// JOURNAL
// ─────────────────────────────────────────────────────────────
export interface JournalPost {
  id:            number
  slug:          string
  title:         string
  tag:           string
  body:          string
  excerpt:       string
  creature:      string | null
  read_time_min: number
  issue_number:  number | null
  is_published:  boolean
  published_at:  string
  created_at:    string
}

// ─────────────────────────────────────────────────────────────
// REVIEW
// ─────────────────────────────────────────────────────────────
export interface Review {
  id:          string
  product_id:  number
  user_id:     string | null
  author:      string
  rating:      number
  body:        string
  is_verified: boolean
  is_approved: boolean
  created_at:  string
}

// ─────────────────────────────────────────────────────────────
// ORDER
// ─────────────────────────────────────────────────────────────
export interface OrderItem {
  product_id:    number
  product_name:  string
  quantity:      number
  unit_price_inr: number
  total_inr:     number
}

export interface Order {
  id:              string      // 'MONKHUD-XXXXXX'
  user_id:         string | null
  customer_name:   string
  customer_email:  string
  customer_phone:  string | null
  delivery_line1:  string
  delivery_line2:  string | null
  delivery_city:   string
  delivery_state:  string
  delivery_pin:    string
  delivery_country: string
  subtotal_inr:    number
  shipping_inr:    number
  gst_inr:         number
  total_inr:       number
  items:           OrderItem[]
  shipping_method: string
  tracking_number: string | null
  payment_method:  string | null
  razorpay_order_id:   string | null
  razorpay_payment_id: string | null
  status:          OrderStatus
  notes:           string | null
  created_at:      string
  updated_at:      string
}

// ─────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────
export interface Profile {
  id:               string
  first_name:       string | null
  last_name:        string | null
  phone:            string | null
  default_address:  Address | null
  path_preference:  PathSlug | null
  created_at:       string
  updated_at:       string
}

// ─────────────────────────────────────────────────────────────
// ADDRESS
// ─────────────────────────────────────────────────────────────
export interface Address {
  id?:        number
  user_id?:   string
  label?:     string | null
  name:       string
  line1:      string
  line2?:     string | null
  city:       string
  state:      string
  pin:        string
  phone?:     string | null
  is_default?: boolean
}

// ─────────────────────────────────────────────────────────────
// CART (client-side only — not persisted in DB until checkout)
// ─────────────────────────────────────────────────────────────
export interface CartItem {
  product_id:  number
  name:        string
  slug:        string
  category:    string
  emoji:       string | null
  price_inr:   number
  quantity:    number
}

export interface Cart {
  items:       CartItem[]
  item_count:  number
  subtotal_inr: number
}

// ─────────────────────────────────────────────────────────────
// LEAD
// ─────────────────────────────────────────────────────────────
export interface Lead {
  email:      string
  source?:    string
}

// ─────────────────────────────────────────────────────────────
// API RESPONSE HELPERS
// ─────────────────────────────────────────────────────────────
export interface ApiSuccess<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError
