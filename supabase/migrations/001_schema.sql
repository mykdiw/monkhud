-- ═══════════════════════════════════════════════════════════════════
-- MONK HUD — Database Schema
-- Migration: 001_schema.sql
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────
-- PRODUCTS (The Companions)
-- ─────────────────────────────────────────────────────────────────
create table public.products (
  id            serial primary key,
  slug          text not null unique,               -- e.g. 'silent-viper'
  name          text not null,                      -- e.g. 'Silent Viper'
  category      text not null,                      -- keyboards | mice | audio | lighting | mounts | accessories
  emoji         text,                               -- temporary until real photos
  price_inr     integer not null,                   -- price in INR (paise-free, whole rupees)
  orig_inr      integer,                            -- original price if on sale
  badge         text,                               -- 'New Drop' | 'Sale' | 'Hot' | 'Bestseller' | null
  badge_type    text,                               -- 'new' | 'sale' | 'hot' | ''
  rating        numeric(2,1) default 0,             -- 0–5, updated from reviews
  review_count  integer default 0,
  description   text not null,                      -- one-sentence companion nature (card copy)
  pick          text,                               -- Monk's Pick reason (modal)
  creature_text text,                               -- The Creature editorial (80–150 words)
  monks_notes   text,                               -- The Monk's Notes (60–80 words)
  specs         jsonb not null default '{}',        -- { Weight: '55g', DPI: '100-26000', ... }
  tags          text[] not null default '{}',       -- ['gamer','creator','builder']
  in_stock      boolean not null default true,
  stock_qty     integer not null default 100,
  is_new        boolean not null default false,
  is_sale       boolean not null default false,
  is_featured   boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- PATHS (The Three Paths — gamer/creator/builder)
-- ─────────────────────────────────────────────────────────────────
create table public.paths (
  id              serial primary key,
  slug            text not null unique,             -- 'quick' | 'still' | 'long'
  name            text not null,                    -- 'The Quick Path'
  subtitle        text not null,                    -- 'Setup of the Shrike'
  archetype       text not null,                    -- 'Shrike'
  archetype_emoji text,
  description     text not null,
  stat_label_1    text, stat_value_1 text,
  stat_label_2    text, stat_value_2 text,
  stat_label_3    text, stat_value_3 text,
  stat_label_4    text, stat_value_4 text,
  product_ids     integer[] not null default '{}',  -- ordered companion ids
  bundle_savings  integer not null default 0,       -- savings in INR
  sort_order      integer not null default 0
);

-- ─────────────────────────────────────────────────────────────────
-- JOURNAL POSTS
-- ─────────────────────────────────────────────────────────────────
create table public.journal_posts (
  id            serial primary key,
  slug          text not null unique,
  title         text not null,
  tag           text not null,                      -- 'Creature Study' | 'The Practice' | etc.
  body          text not null,                      -- full article text (markdown)
  excerpt       text not null,                      -- 2–3 sentence preview for card
  creature      text,                               -- emoji + name e.g. '🦅 Great Hornbill'
  read_time_min integer not null default 3,
  issue_number  integer,                            -- No. 01, No. 02…
  is_published  boolean not null default true,
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- REVIEWS (hidden behind REVIEWS_ENABLED flag until launch)
-- ─────────────────────────────────────────────────────────────────
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  product_id  integer not null references public.products(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null,
  author      text not null,
  rating      integer not null check (rating between 1 and 5),
  body        text not null,
  is_verified boolean not null default false,
  is_approved boolean not null default false,       -- moderation gate
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────────
create type public.order_status as enum (
  'pending_payment',
  'payment_received',
  'processing',
  'dispatched',
  'delivered',
  'cancelled',
  'refunded'
);

create table public.orders (
  id              text primary key,                 -- 'MONKHUD-XXXXXX'
  user_id         uuid references auth.users(id) on delete set null,
  -- Customer contact (duplicated for immutability — even if user deletes account)
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text,
  -- Delivery
  delivery_line1  text not null,
  delivery_line2  text,
  delivery_city   text not null,
  delivery_state  text not null,
  delivery_pin    text not null,
  delivery_country text not null default 'India',
  -- Financials (all in INR)
  subtotal_inr    integer not null,
  shipping_inr    integer not null default 0,
  gst_inr         integer not null default 0,
  total_inr       integer not null,
  -- Items snapshot (frozen at order time — prices may change)
  items           jsonb not null,
  -- Shipping
  shipping_method text not null default 'standard',
  tracking_number text,
  -- Payment
  payment_method  text,
  razorpay_order_id   text,
  razorpay_payment_id text,
  -- Status
  status          public.order_status not null default 'pending_payment',
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- ORDER ITEMS (denormalised for reporting)
-- ─────────────────────────────────────────────────────────────────
create table public.order_items (
  id          serial primary key,
  order_id    text not null references public.orders(id) on delete cascade,
  product_id  integer not null references public.products(id) on delete restrict,
  product_name text not null,                       -- snapshot at time of order
  quantity    integer not null,
  unit_price_inr integer not null,
  total_inr   integer not null
);

-- ─────────────────────────────────────────────────────────────────
-- USER PROFILES (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  first_name    text,
  last_name     text,
  phone         text,
  -- Default delivery address
  default_address jsonb,
  -- Preferences
  path_preference text,                             -- 'quick' | 'still' | 'long'
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- SAVED ADDRESSES
-- ─────────────────────────────────────────────────────────────────
create table public.addresses (
  id          serial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  label       text,                                 -- 'Home', 'Office'
  name        text not null,
  line1       text not null,
  line2       text,
  city        text not null,
  state       text not null,
  pin         text not null,
  phone       text,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- WISHLIST
-- ─────────────────────────────────────────────────────────────────
create table public.wishlist_items (
  id          serial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  integer not null references public.products(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique(user_id, product_id)
);

-- ─────────────────────────────────────────────────────────────────
-- NEWSLETTER LEADS
-- ─────────────────────────────────────────────────────────────────
create table public.leads (
  id          serial primary key,
  email       text not null unique,
  source      text,                                 -- 'homepage_footer' | 'product_page' etc.
  subscribed  boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────────
create index idx_products_category    on public.products(category);
create index idx_products_in_stock    on public.products(in_stock);
create index idx_products_is_featured on public.products(is_featured);
create index idx_products_sort        on public.products(sort_order);
create index idx_reviews_product_id   on public.reviews(product_id);
create index idx_reviews_is_approved  on public.reviews(is_approved);
create index idx_orders_user_id       on public.orders(user_id);
create index idx_orders_status        on public.orders(status);
create index idx_orders_email         on public.orders(customer_email);
create index idx_order_items_order_id on public.order_items(order_id);
create index idx_addresses_user_id    on public.addresses(user_id);
create index idx_wishlist_user_id     on public.wishlist_items(user_id);
create index idx_journal_published    on public.journal_posts(is_published, published_at desc);

-- ─────────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGERS
-- ─────────────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at before update on public.products
  for each row execute function public.handle_updated_at();

create trigger orders_updated_at before update on public.orders
  for each row execute function public.handle_updated_at();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ─────────────────────────────────────────────────────────────────
-- AUTO-CREATE PROFILE ON SIGNUP
-- ─────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────
-- UPDATE PRODUCT RATING WHEN REVIEW APPROVED
-- ─────────────────────────────────────────────────────────────────
create or replace function public.update_product_rating()
returns trigger as $$
begin
  update public.products
  set
    rating       = (select round(avg(rating)::numeric, 1) from public.reviews where product_id = coalesce(new.product_id, old.product_id) and is_approved = true),
    review_count = (select count(*) from public.reviews where product_id = coalesce(new.product_id, old.product_id) and is_approved = true)
  where id = coalesce(new.product_id, old.product_id);
  return coalesce(new, old);
end;
$$ language plpgsql;

create trigger reviews_update_product_rating
  after insert or update or delete on public.reviews
  for each row execute function public.update_product_rating();

-- ─────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────────────────────────

-- Products: public read, admin write only
alter table public.products enable row level security;
create policy "products_public_read"
  on public.products for select using (true);

-- Paths: public read
alter table public.paths enable row level security;
create policy "paths_public_read"
  on public.paths for select using (true);

-- Journal: public read (published only)
alter table public.journal_posts enable row level security;
create policy "journal_public_read"
  on public.journal_posts for select using (is_published = true);

-- Reviews: public read (approved only), authenticated write
alter table public.reviews enable row level security;
create policy "reviews_public_read"
  on public.reviews for select using (is_approved = true);
create policy "reviews_auth_insert"
  on public.reviews for insert with check (auth.uid() = user_id);

-- Orders: users see their own orders only
alter table public.orders enable row level security;
create policy "orders_own_select"
  on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_anon"
  on public.orders for insert with check (true);   -- allow guest checkout

-- Order items: follow parent order
alter table public.order_items enable row level security;
create policy "order_items_own_select"
  on public.order_items for select
  using (order_id in (select id from public.orders where user_id = auth.uid()));

-- Profiles: users see and edit only their own
alter table public.profiles enable row level security;
create policy "profiles_own_select"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles_own_update"
  on public.profiles for update using (auth.uid() = id);

-- Addresses: users see and edit only their own
alter table public.addresses enable row level security;
create policy "addresses_own_all"
  on public.addresses for all using (auth.uid() = user_id);

-- Wishlist: users see and edit only their own
alter table public.wishlist_items enable row level security;
create policy "wishlist_own_all"
  on public.wishlist_items for all using (auth.uid() = user_id);

-- Leads: insert only (no read — protected)
alter table public.leads enable row level security;
create policy "leads_insert"
  on public.leads for insert with check (true);
