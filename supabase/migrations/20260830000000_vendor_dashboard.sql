create extension if not exists pgcrypto;

-- Tiffin vendors are real accounts (auth.users), not static listings.
create table vendors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  business_name text not null,
  area text,
  price text,
  info text,
  delivery_days text[] not null default '{}',
  delivery_areas text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table vendors enable row level security;

create policy "Public read access" on vendors for select using (true);
create policy "Vendors manage their own listing" on vendors for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- A vendor's own customer record book. Not customer logins.
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  name text not null,
  plan text,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table subscribers enable row level security;

create policy "Vendors manage their own subscribers" on subscribers for all
  using (vendor_id in (select id from vendors where user_id = auth.uid()))
  with check (vendor_id in (select id from vendors where user_id = auth.uid()));

-- Daily delivery record per subscriber.
create table orders (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references vendors(id) on delete cascade,
  subscriber_id uuid references subscribers(id) on delete set null,
  delivery_date date not null default current_date,
  status text not null default 'pending' check (status in ('pending', 'delivered', 'skipped')),
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Vendors manage their own orders" on orders for all
  using (vendor_id in (select id from vendors where user_id = auth.uid()))
  with check (vendor_id in (select id from vendors where user_id = auth.uid()));

-- Superseded by vendors: the seed rows were fake demo data, not real accounts.
drop table if exists tiffin;
