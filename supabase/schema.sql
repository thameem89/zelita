-- Zelita mock-to-Supabase schema.
-- Run this in the Supabase SQL Editor when you are ready to store catalog data in PostgreSQL.

create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  sku text unique,
  category_id text not null,
  category_name text not null,
  short_description text,
  description text,
  pack_size text,
  status text not null default 'Available',
  availability text,
  minimum_order_quantity text,
  image_url text,
  gallery text[] default '{}',
  brochure_url text,
  safety_sheet_url text,
  featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.enquiries (
  id text primary key,
  enquiry_type text not null default 'Contact',
  customer_name text not null,
  company_name text,
  email text,
  phone text,
  city text,
  product_id text,
  product_name text,
  quantity text,
  subject text,
  message text,
  status text not null default 'New',
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.enquiries enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
on public.categories for select
using (is_active = true);

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products for select
using (is_active = true);

drop policy if exists "Public can create enquiries" on public.enquiries;
create policy "Public can create enquiries"
on public.enquiries for insert
with check (true);

-- During this transition, admin screens still use mock auth.
-- Add authenticated admin policies before using Supabase writes in production.
