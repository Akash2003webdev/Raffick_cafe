-- ============================================================================
-- Raffick Cafe — Supabase schema
-- Matches every table/column referenced in src/lib/api.js
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- categories
-- ----------------------------------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  image       text,
  sort_order  integer not null default 0,
  status      text not null default 'active' check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- menu_items + menu_item_variants
-- ----------------------------------------------------------------------------
create table if not exists menu_items (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid references categories(id) on delete set null,
  name          text not null,
  description   text,
  images        text[] not null default '{}',
  veg_type      text not null default 'veg' check (veg_type in ('veg', 'non-veg', 'egg')),
  rating        numeric(2,1) default 4.5,
  status        text not null default 'active' check (status in ('active', 'sold_out', 'inactive')),
  created_at    timestamptz not null default now()
);

create table if not exists menu_item_variants (
  id          uuid primary key default gen_random_uuid(),
  item_id     uuid not null references menu_items(id) on delete cascade,
  name        text not null default 'Regular',
  price       numeric(10,2) not null default 0,
  sort_order  integer not null default 0
);

-- ----------------------------------------------------------------------------
-- reviews
-- ----------------------------------------------------------------------------
create table if not exists overall_reviews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  rating      integer not null check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now()
);

create table if not exists item_reviews (
  id          uuid primary key default gen_random_uuid(),
  item_id     uuid not null references menu_items(id) on delete cascade,
  name        text not null,
  rating      integer not null check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- orders
-- ----------------------------------------------------------------------------
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  order_type      text not null check (order_type in ('Takeaway', 'Delivery')),
  table_number    text,
  address         text,
  customer_name   text not null,
  customer_phone  text not null,
  items           jsonb not null default '[]',
  total           numeric(10,2) not null default 0,
  status          text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at      timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- enquiries
-- ----------------------------------------------------------------------------
create table if not exists enquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text not null,
  enquiry_type  text not null default 'General',
  message       text,
  created_at    timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- banners (home page carousel)
-- ----------------------------------------------------------------------------
create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  image       text not null,
  link        text,
  sort_order  integer not null default 0,
  status      text not null default 'active' check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- offers (combo deals) + offer_items
-- ----------------------------------------------------------------------------
create table if not exists offers (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image       text,
  rate        numeric(10,2) not null default 0,
  sort_order  integer not null default 0,
  status      text not null default 'active' check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now()
);

create table if not exists offer_items (
  id          uuid primary key default gen_random_uuid(),
  offer_id    uuid not null references offers(id) on delete cascade,
  item_id     uuid not null references menu_items(id) on delete cascade,
  variant_id  uuid references menu_item_variants(id) on delete set null,
  quantity    integer not null default 1
);

-- ----------------------------------------------------------------------------
-- Indexes
-- ----------------------------------------------------------------------------
create index if not exists idx_menu_items_category on menu_items(category_id);
create index if not exists idx_menu_item_variants_item on menu_item_variants(item_id);
create index if not exists idx_item_reviews_item on item_reviews(item_id);
create index if not exists idx_offer_items_offer on offer_items(offer_id);

-- ----------------------------------------------------------------------------
-- Row Level Security
-- Public (anon) can read active/public content and insert orders/enquiries/
-- reviews. Writes to menu/categories/banners/offers are meant to go through
-- an authenticated admin session (see AdminPage.jsx) — adjust the admin
-- policies below to match how you authenticate the admin panel.
-- ----------------------------------------------------------------------------
alter table categories enable row level security;
alter table menu_items enable row level security;
alter table menu_item_variants enable row level security;
alter table overall_reviews enable row level security;
alter table item_reviews enable row level security;
alter table orders enable row level security;
alter table enquiries enable row level security;
alter table banners enable row level security;
alter table offers enable row level security;
alter table offer_items enable row level security;

-- Public read access
create policy "Public read categories" on categories for select using (true);
create policy "Public read menu_items" on menu_items for select using (true);
create policy "Public read menu_item_variants" on menu_item_variants for select using (true);
create policy "Public read overall_reviews" on overall_reviews for select using (true);
create policy "Public read item_reviews" on item_reviews for select using (true);
create policy "Public read banners" on banners for select using (true);
create policy "Public read offers" on offers for select using (true);
create policy "Public read offer_items" on offer_items for select using (true);

-- Public insert access (guests placing orders, enquiries, reviews)
create policy "Public insert orders" on orders for insert with check (true);
create policy "Public insert enquiries" on enquiries for insert with check (true);
create policy "Public insert overall_reviews" on overall_reviews for insert with check (true);
create policy "Public insert item_reviews" on item_reviews for insert with check (true);

-- Admin write access — replace `authenticated` with your real admin check
-- (e.g. a specific role or a Supabase Auth user) before going to production.
create policy "Admin write categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin write menu_items" on menu_items for all using (auth.role() = 'authenticated');
create policy "Admin write menu_item_variants" on menu_item_variants for all using (auth.role() = 'authenticated');
create policy "Admin write banners" on banners for all using (auth.role() = 'authenticated');
create policy "Admin write offers" on offers for all using (auth.role() = 'authenticated');
create policy "Admin write offer_items" on offer_items for all using (auth.role() = 'authenticated');
create policy "Admin read orders" on orders for select using (auth.role() = 'authenticated');
create policy "Admin read enquiries" on enquiries for select using (auth.role() = 'authenticated');

-- ----------------------------------------------------------------------------
-- Storage buckets (used by uploadCategoryImage / uploadMenuItemImage /
-- uploadBannerImage / uploadOfferImage in src/lib/api.js)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values
  ('category-images', 'category-images', true),
  ('menu-item-images', 'menu-item-images', true),
  ('banner-images', 'banner-images', true),
  ('offer-images', 'offer-images', true)
on conflict (id) do nothing;

create policy "Public read category-images" on storage.objects for select using (bucket_id = 'category-images');
create policy "Public read menu-item-images" on storage.objects for select using (bucket_id = 'menu-item-images');
create policy "Public read banner-images" on storage.objects for select using (bucket_id = 'banner-images');
create policy "Public read offer-images" on storage.objects for select using (bucket_id = 'offer-images');

create policy "Admin upload category-images" on storage.objects for insert with check (bucket_id = 'category-images' and auth.role() = 'authenticated');
create policy "Admin upload menu-item-images" on storage.objects for insert with check (bucket_id = 'menu-item-images' and auth.role() = 'authenticated');
create policy "Admin upload banner-images" on storage.objects for insert with check (bucket_id = 'banner-images' and auth.role() = 'authenticated');
create policy "Admin upload offer-images" on storage.objects for insert with check (bucket_id = 'offer-images' and auth.role() = 'authenticated');
