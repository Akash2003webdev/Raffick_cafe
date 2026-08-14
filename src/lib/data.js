// ----------------------------------------------------------------------------
// Static + SAMPLE data for Raffick Cafe.
//
// `restaurantInfo` is genuinely static (doesn't need its own DB table).
// Everything else below (categories, menuItems, reviews, banners, offers) is
// SAMPLE/DEMO data used as a fallback in src/lib/api.js — whenever a Supabase
// table is empty or not reachable yet, the UI falls back to this file so the
// app is fully browsable while the real backend is being populated.
//
// Once real rows exist in Supabase (see supabase/schema.sql), they take over
// automatically — nothing else needs to change. Feel free to edit/replace
// this file any time; it's just placeholder content.
// ----------------------------------------------------------------------------

export const restaurantInfo = {
  name: "Raffick Cafe",
  tagline: "Feel Good, Eat Good",
  address: "Railway peedar Road, Sattur, Tamil Nadu 626203",
  phone: "09003788247",
  whatsapp: "919003788247",
  rating: 4.3,
  reviewCount: 51,
  priceRange: "₹1–200 per person",
  hours: "10:00 AM – 11:00 PM",
};

export const orderTypes = ["Takeaway", "Delivery"];

// Four feature highlights shown on the home hero banner.
export const features = [
  { key: "ambience", label: "Cozy Ambience", desc: "Feel at Home" },
  { key: "fresh", label: "Fresh & Tasty", desc: "Made for You" },
  { key: "quality", label: "Quality Food", desc: "Always the Best" },
  { key: "service", label: "Fast Service", desc: "Just for You" },
];

// ----------------------------------------------------------------------------
// Categories
// ----------------------------------------------------------------------------

