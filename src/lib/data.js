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

export const categories = [
  {
    id: "cat-pasta",
    name: "Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80",
    sort_order: 1,
    status: "active",
  },
  {
    id: "cat-burgers",
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
    sort_order: 2,
    status: "active",
  },
  {
    id: "cat-riceandnoodles",
    name: "Rice & Noodles",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=80",
    sort_order: 3,
    status: "active",
  },
  {
    id: "cat-sandwiches",
    name: "Sandwiches",
    image:
      "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=300&q=80",
    sort_order: 4,
    status: "active",
  },
  {
    id: "cat-pizza",
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
    sort_order: 5,
    status: "active",
  },
  {
    id: "cat-beverages",
    name: "Coffee & Beverages",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&q=80",
    sort_order: 6,
    status: "active",
  },
  {
    id: "cat-shakes",
    name: "Shakes",
    image:
      "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=300&q=80",
    sort_order: 7,
    status: "active",
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80",
    sort_order: 8,
    status: "active",
  },
];

// ----------------------------------------------------------------------------
// Menu items (with variants) — grouped loosely by category above.
// ----------------------------------------------------------------------------

function item({
  id,
  categoryId,
  categoryName,
  name,
  description,
  vegType,
  rating,
  reviewCount,
  image,
  variants,
  status = "active",
}) {
  return {
    id,
    category_id: categoryId,
    categoryName,
    name,
    description,
    veg_type: vegType,
    rating,
    reviewCount,
    images: [image],
    status,
    variants: variants.map((v, i) => ({ ...v, sort_order: i })),
  };
}

export const menuItems = [
  item({
    id: "item-white-sauce-pasta",
    categoryId: "cat-pasta",
    categoryName: "Pasta",
    name: "White Sauce Pasta",
    description: "Creamy white sauce pasta loaded with veggies and herbs.",
    vegType: "veg",
    rating: 4.6,
    reviewCount: 128,
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80",
    variants: [
      { id: "var-wsp-reg", name: "Regular", price: 180 },
      { id: "var-wsp-large", name: "Large", price: 240 },
    ],
  }),
  item({
    id: "item-red-sauce-pasta",
    categoryId: "cat-pasta",
    categoryName: "Pasta",
    name: "Red Sauce Pasta",
    description: "Classic penne tossed in a tangy tomato basil sauce.",
    vegType: "veg",
    rating: 4.4,
    reviewCount: 84,
    image:
      "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=500&q=80",
    variants: [
      { id: "var-rsp-reg", name: "Regular", price: 170 },
      { id: "var-rsp-large", name: "Large", price: 230 },
    ],
  }),
  item({
    id: "item-chicken-burger",
    categoryId: "cat-burgers",
    categoryName: "Burgers",
    name: "Chicken Burger",
    description:
      "Juicy grilled chicken patty, cheese, lettuce & our special sauce.",
    vegType: "non-veg",
    rating: 4.7,
    reviewCount: 203,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    variants: [{ id: "var-cb-reg", name: "Regular", price: 150 }],
  }),
  item({
    id: "item-veg-burger",
    categoryId: "cat-burgers",
    categoryName: "Burgers",
    name: "Crispy Veg Burger",
    description: "Crunchy veg patty with fresh lettuce, tomato and mayo.",
    vegType: "veg",
    rating: 4.3,
    reviewCount: 96,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80",
    variants: [{ id: "var-vb-reg", name: "Regular", price: 120 }],
  }),
  item({
    id: "item-veg-fried-rice",
    categoryId: "cat-riceandnoodles",
    categoryName: "Rice & Noodles",
    name: "Veg Fried Rice",
    description: "Wok-tossed rice with fresh vegetables and a hint of soy.",
    vegType: "veg",
    rating: 4.5,
    reviewCount: 141,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80",
    variants: [
      { id: "var-vfr-reg", name: "Regular", price: 130 },
      { id: "var-vfr-large", name: "Large", price: 180 },
    ],
  }),
  item({
    id: "item-schezwan-noodles",
    categoryId: "cat-riceandnoodles",
    categoryName: "Rice & Noodles",
    name: "Schezwan Noodles",
    description: "Spicy schezwan-tossed noodles with crunchy vegetables.",
    vegType: "veg",
    rating: 4.4,
    reviewCount: 77,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
    variants: [{ id: "var-sn-reg", name: "Regular", price: 140 }],
  }),
  item({
    id: "item-club-sandwich",
    categoryId: "cat-sandwiches",
    categoryName: "Sandwiches",
    name: "Club Sandwich",
    description:
      "Triple-layered sandwich with veggies, cheese and a smoky sauce.",
    vegType: "veg",
    rating: 4.5,
    reviewCount: 68,
    image:
      "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=500&q=80",
    variants: [{ id: "var-cs-reg", name: "Regular", price: 110 }],
  }),
  item({
    id: "item-margherita-pizza",
    categoryId: "cat-pizza",
    categoryName: "Pizza",
    name: "Margherita Pizza",
    description: "Classic cheese pizza on a hand-tossed base.",
    vegType: "veg",
    rating: 4.6,
    reviewCount: 112,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    variants: [
      { id: "var-mp-reg", name: 'Regular (7")', price: 199 },
      { id: "var-mp-large", name: 'Large (10")', price: 349 },
    ],
  }),
  item({
    id: "item-filter-coffee",
    categoryId: "cat-beverages",
    categoryName: "Coffee & Beverages",
    name: "South Indian Filter Coffee",
    description: "Freshly brewed filter coffee, the way it should be.",
    vegType: "veg",
    rating: 4.8,
    reviewCount: 176,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    variants: [{ id: "var-fc-reg", name: "Regular", price: 40 }],
  }),
  item({
    id: "item-cappuccino",
    categoryId: "cat-beverages",
    categoryName: "Coffee & Beverages",
    name: "Cappuccino",
    description: "Rich espresso topped with velvety steamed milk foam.",
    vegType: "veg",
    rating: 4.6,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80",
    variants: [{ id: "var-cap-reg", name: "Regular", price: 90 }],
  }),
  item({
    id: "item-oreo-shake",
    categoryId: "cat-shakes",
    categoryName: "Shakes",
    name: "Oreo Shake",
    description: "Thick and creamy Oreo milkshake topped with cookie crumbs.",
    vegType: "veg",
    rating: 4.7,
    reviewCount: 132,
    image:
      "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&q=80",
    variants: [{ id: "var-os-reg", name: "Regular", price: 110 }],
  }),
  item({
    id: "item-chocolate-brownie",
    categoryId: "cat-desserts",
    categoryName: "Desserts",
    name: "Chocolate Brownie",
    description:
      "Fudgy chocolate brownie served warm with a chocolate drizzle.",
    vegType: "veg",
    rating: 4.8,
    reviewCount: 154,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80",
    variants: [{ id: "var-brw-reg", name: "Regular", price: 120 }],
  }),
];

// ----------------------------------------------------------------------------
// Reviews
// ----------------------------------------------------------------------------

export const overallReviews = [
  {
    id: "rev-1",
    name: "Aravind K.",
    rating: 5,
    comment:
      "Cozy place with amazing food. The pasta and coffee combo is unbeatable!",
    date: "2026-06-12",
  },
  {
    id: "rev-2",
    name: "Priya S.",
    rating: 5,
    comment:
      "Loved the ambience and the chicken burger was so juicy. Will visit again.",
    date: "2026-06-05",
  },
  {
    id: "rev-3",
    name: "Vignesh R.",
    rating: 4,
    comment: "Great taste and quick service. The brownie is a must try!",
    date: "2026-05-28",
  },
  {
    id: "rev-4",
    name: "Divya M.",
    rating: 5,
    comment: "Best filter coffee in Sattur, hands down. Feels like home.",
    date: "2026-05-20",
  },
  {
    id: "rev-5",
    name: "Karthik B.",
    rating: 4,
    comment: "Good portions, fresh ingredients and friendly staff.",
    date: "2026-05-10",
  },
];

export const itemReviews = {
  "item-white-sauce-pasta": [
    {
      id: "irev-1",
      item_id: "item-white-sauce-pasta",
      name: "Meena T.",
      rating: 5,
      comment: "So creamy and flavorful, my favorite pasta in town.",
      date: "2026-06-01",
    },
  ],
  "item-chicken-burger": [
    {
      id: "irev-2",
      item_id: "item-chicken-burger",
      name: "Suresh P.",
      rating: 5,
      comment: "Perfectly grilled and juicy, loved it!",
      date: "2026-05-22",
    },
  ],
};

// ----------------------------------------------------------------------------
// Home banners (auto-scrolling promo carousel)
// ----------------------------------------------------------------------------

export const banners = [
  {
    id: "banner-1",
    image: "/src/assets/13bbf49b-bae3-4bee-86b9-d26ecf619bef.png",
    link: null,
    sort_order: 1,
    status: "active",
  },
  {
    id: "banner-2",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    link: null,
    sort_order: 2,
    status: "active",
  },
  {
    id: "banner-3",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    link: null,
    sort_order: 3,
    status: "active",
  },
];

// ----------------------------------------------------------------------------
// Offers / combo deals
// ----------------------------------------------------------------------------

export const offers = [
  {
    id: "offer-1",
    title: "Burger + Shake Combo",
    description: "Chicken burger paired with a chilled Oreo shake.",
    image: null,
    rate: 220,
    sort_order: 1,
    status: "active",
    products: [
      {
        id: "item-chicken-burger",
        name: "Chicken Burger",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
        quantity: 1,
        variantId: "var-cb-reg",
        variantName: "Regular",
        price: 150,
      },
      {
        id: "item-oreo-shake",
        name: "Oreo Shake",
        image:
          "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&q=80",
        quantity: 1,
        variantId: "var-os-reg",
        variantName: "Regular",
        price: 110,
      },
    ],
    get originalTotal() {
      return this.products.reduce((s, p) => s + p.price * p.quantity, 0);
    },
  },
  {
    id: "offer-2",
    title: "Pasta & Coffee Duo",
    description: "White sauce pasta with a hot filter coffee.",
    image: null,
    rate: 200,
    sort_order: 2,
    status: "active",
    products: [
      {
        id: "item-white-sauce-pasta",
        name: "White Sauce Pasta",
        image:
          "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80",
        quantity: 1,
        variantId: "var-wsp-reg",
        variantName: "Regular",
        price: 180,
      },
      {
        id: "item-filter-coffee",
        name: "South Indian Filter Coffee",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        quantity: 1,
        variantId: "var-fc-reg",
        variantName: "Regular",
        price: 40,
      },
    ],
    get originalTotal() {
      return this.products.reduce((s, p) => s + p.price * p.quantity, 0);
    },
  },
];
