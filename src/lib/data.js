// ----------------------------------------------------------------------------
// Static config for Raffick Cafe.
//
// Everything here is genuinely static (doesn't need a DB table). All menu
// content — categories, menu items, reviews, banners, offers — now comes
// straight from Supabase (see src/lib/api.js and supabase/schema.sql).
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