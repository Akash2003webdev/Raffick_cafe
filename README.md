# Raffick Cafe

React + Vite + Tailwind CSS storefront, backed by Supabase.

## 1. Install

```bash
npm install
```

## 2. Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project URL + anon key
(Supabase dashboard → Settings → API):

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> Even without a `.env` file, the app still runs — it falls back to the
> sample data in `src/lib/data.js` for every page. Once real Supabase tables
> have rows, they take over automatically. No code change needed.

## 3. Set up the database (optional, for real data)

Run `supabase/schema.sql` in your Supabase project's SQL editor. It creates
every table `src/lib/api.js` expects (`categories`, `menu_items`,
`menu_item_variants`, `overall_reviews`, `item_reviews`, `orders`,
`enquiries`, `banners`, `offers`, `offer_items`), sets up Row Level Security
policies, and creates the storage buckets used for image uploads
(`category-images`, `menu-item-images`, `banner-images`, `offer-images`).

## 4. Run locally

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## 5. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Notes

- **Splash screen video**: `src/components/SplashScreen.jsx` looks for
  `/splash.mp4` (desktop) and `/splash-mobile.mp4` (mobile) in the `public/`
  folder. Those aren't included — drop your own videos in `public/` with
  those exact names, or the splash screen just skips straight to the app
  after a short delay.
- **Banner/menu images**: currently pulled from Unsplash placeholder URLs in
  `src/lib/data.js`. Replace with your own photos (or upload real ones via
  the Admin panel once Supabase is wired up) whenever you're ready.
- **Admin panel**: long-press the logo in the header (or tap-and-hold ~0.6s)
  to open `AdminPage.jsx`.
