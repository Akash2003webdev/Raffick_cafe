// API layer backed by Supabase. Function names/signatures match what the
// components already call, so no component code had to change.

import { supabase } from "./supabaseClient";
import {
  restaurantInfo,
  categories as sampleCategories,
  menuItems as sampleMenuItems,
  overallReviews as sampleOverallReviews,
  itemReviews as sampleItemReviews,
  banners as sampleBanners,
  offers as sampleOffers,
} from "./data";

// Sample data acts as a fallback while the real Supabase tables are being
// populated — see src/lib/data.js. Once real rows exist, they're used
// automatically and this fallback is never hit.
async function withFallback(queryFn, fallbackValue) {
  try {
    const data = await queryFn();
    if (Array.isArray(data) && data.length === 0) return fallbackValue;
    return data ?? fallbackValue;
  } catch (err) {
    console.warn("Supabase query failed, using sample data:", err?.message || err);
    return fallbackValue;
  }
}

function normalizeItem(row) {
  return {
    ...row,
    images: row.images || [],
    variants: (row.variants || []).slice().sort((a, b) => a.sort_order - b.sort_order),
    categoryName: row.category?.name,
  };
}

function normalizeReview(row) {
  return { ...row, date: row.created_at?.slice(0, 10) };
}

export async function getRestaurantInfo() {
  // Static — not stored in the DB.
  return restaurantInfo;
}

export async function getCategories() {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data || [];
  }, sampleCategories);
}

export async function getCategoryById(id) {
  const fromSample = sampleCategories.find((c) => c.id === id);
  try {
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
    if (error) throw error;
    return data || fromSample;
  } catch (err) {
    if (fromSample) return fromSample;
    throw err;
  }
}

export async function getMenuItems({ categoryId, search } = {}) {
  function filterSample() {
    let items = sampleMenuItems;
    if (categoryId) items = items.filter((i) => i.category_id === categoryId);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
      );
    }
    return items;
  }

  return withFallback(async () => {
    let query = supabase
      .from("menu_items")
      .select("*, variants:menu_item_variants(*), category:categories(name)");
    if (categoryId) query = query.eq("category_id", categoryId);
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    const { data, error } = await query.order("created_at", { ascending: true });
    if (error) throw error;
    return (data || []).map(normalizeItem);
  }, filterSample());
}

export async function getMenuItemById(id) {
  const fromSample = sampleMenuItems.find((i) => i.id === id);
  try {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, variants:menu_item_variants(*), category:categories(name)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data ? normalizeItem(data) : fromSample;
  } catch (err) {
    if (fromSample) return fromSample;
    throw err;
  }
}

export async function getPopularItems(limit = 8) {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, variants:menu_item_variants(*), category:categories(name)")
      .order("rating", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data || []).map(normalizeItem);
  }, sampleMenuItems.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit));
}

export async function getOverallReviews() {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("overall_reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(normalizeReview);
  }, sampleOverallReviews);
}

export async function getItemReviews(itemId) {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("item_reviews")
      .select("*")
      .eq("item_id", itemId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(normalizeReview);
  }, sampleItemReviews[itemId] || []);
}

export async function submitReview({ itemId, name, rating, comment }) {
  const table = itemId ? "item_reviews" : "overall_reviews";
  const payload = itemId ? { item_id: itemId, name, rating, comment } : { name, rating, comment };
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return normalizeReview(data);
}

export async function submitOrder({ cartItems, orderType, tableNumber, address, name, phone, total }) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      order_type: orderType,
      table_number: tableNumber || null,
      address: address || null,
      customer_name: name,
      customer_phone: phone,
      items: cartItems,
      total,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function submitEnquiry({ name, phone, enquiryType, message }) {
  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      name,
      phone,
      enquiry_type: enquiryType || "General",
      message,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getEnquiries() {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

// ----------------------------------------------------------------------------
// Banners (home page auto-scrolling promo carousel — admin managed)
// ----------------------------------------------------------------------------

export async function getBanners() {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data || [];
  }, sampleBanners);
}

export async function getAllBanners() {
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createBanner({ image, link, sortOrder }) {
  const { data, error } = await supabase
    .from("banners")
    .insert({ image, link: link || null, sort_order: sortOrder ?? 0 })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateBanner(id, fields) {
  const { data, error } = await supabase
    .from("banners")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBanner(id) {
  const { error } = await supabase.from("banners").delete().eq("id", id);
  if (error) throw error;
}

export function uploadBannerImage(file) {
  return uploadImage("banner-images", file);
}

// ----------------------------------------------------------------------------
// Offers (dedicated Offers page — admin managed combo deals)
// ----------------------------------------------------------------------------

const OFFER_SELECT =
  "*, offer_items(id, quantity, item:menu_items(id, name, images), variant:menu_item_variants(id, name, price))";

// Turns the raw offer_items join rows into a simple `products` array the UI
// can render directly, and works out the combo's original (pre-discount)
// total so the Offers page can show "You save ₹X".
function normalizeOffer(row) {
  const products = (row.offer_items || [])
    .filter((oi) => oi.item)
    .map((oi) => ({
      id: oi.item.id,
      name: oi.item.name,
      image: oi.item.images?.[0] || null,
      quantity: oi.quantity ?? 1,
      variantId: oi.variant?.id ?? null,
      variantName: oi.variant?.name ?? null,
      price: oi.variant?.price ?? 0,
    }));
  const originalTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const { offer_items, ...offer } = row;
  return { ...offer, products, originalTotal };
}

export async function getOffers() {
  return withFallback(async () => {
    const { data, error } = await supabase
      .from("offers")
      .select(OFFER_SELECT)
      .eq("status", "active")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data || []).map(normalizeOffer);
  }, sampleOffers);
}

export async function getAllOffers() {
  const { data, error } = await supabase
    .from("offers")
    .select(OFFER_SELECT)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map(normalizeOffer);
}

// items: [{ itemId, variantId, quantity }] — the products grouped into this combo.
export async function createOffer({ title, description, image, rate, sortOrder, items }) {
  const { data, error } = await supabase
    .from("offers")
    .insert({
      title,
      description: description || null,
      image: image || null,
      rate: rate ?? 0,
      sort_order: sortOrder ?? 0,
    })
    .select()
    .single();
  if (error) throw error;

  if (items?.length) {
    const rows = items.map((it) => ({
      offer_id: data.id,
      item_id: it.itemId,
      variant_id: it.variantId || null,
      quantity: it.quantity ?? 1,
    }));
    const { error: itemsError } = await supabase.from("offer_items").insert(rows);
    if (itemsError) throw itemsError;
  }

  return data;
}

// `items`, if passed, fully replaces the combo's product list.
export async function updateOffer(id, fields, items) {
  const { data, error } = await supabase
    .from("offers")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;

  if (items) {
    const { error: delError } = await supabase.from("offer_items").delete().eq("offer_id", id);
    if (delError) throw delError;
    if (items.length) {
      const rows = items.map((it) => ({
        offer_id: id,
        item_id: it.itemId,
        variant_id: it.variantId || null,
        quantity: it.quantity ?? 1,
      }));
      const { error: itemsError } = await supabase.from("offer_items").insert(rows);
      if (itemsError) throw itemsError;
    }
  }

  return data;
}

export async function deleteOffer(id) {
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) throw error;
}

export function uploadOfferImage(file) {
  return uploadImage("offer-images", file);
}

// ----------------------------------------------------------------------------
// Image uploads (Supabase Storage)
// ----------------------------------------------------------------------------

async function uploadImage(bucket, file) {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function uploadCategoryImage(file) {
  return uploadImage("category-images", file);
}

export function uploadMenuItemImage(file) {
  return uploadImage("menu-item-images", file);
}

// ----------------------------------------------------------------------------
// Category CRUD (admin)
// ----------------------------------------------------------------------------

export async function createCategory({ name, image }) {
  const { data, error } = await supabase
    .from("categories")
    .insert({ name, image })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCategory(id, fields) {
  const { data, error } = await supabase
    .from("categories")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

// ----------------------------------------------------------------------------
// Menu item CRUD (admin)
// ----------------------------------------------------------------------------

export async function createMenuItem({ categoryId, name, image, vegType, price }) {
  const { data: item, error } = await supabase
    .from("menu_items")
    .insert({
      category_id: categoryId,
      name,
      images: image ? [image] : [],
      veg_type: vegType,
    })
    .select()
    .single();
  if (error) throw error;
  const { error: variantError } = await supabase
    .from("menu_item_variants")
    .insert({ item_id: item.id, name: "Regular", price });
  if (variantError) throw variantError;
  return item;
}

export async function updateMenuItem(id, fields) {
  const { data, error } = await supabase
    .from("menu_items")
    .update(fields)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMenuItem(id) {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw error;
}

export async function updateVariantPrice(variantId, price) {
  const { error } = await supabase
    .from("menu_item_variants")
    .update({ price })
    .eq("id", variantId);
  if (error) throw error;
}
