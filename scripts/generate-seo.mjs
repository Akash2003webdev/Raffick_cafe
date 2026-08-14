import { writeFile, mkdir } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env vars missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Sitemap will only include static routes."
  );
}

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const { data: categories = [] } = supabase
  ? await supabase.from("categories").select("id, status").eq("status", "active")
  : { data: [] };
const { data: menuItems = [] } = supabase
  ? await supabase.from("menu_items").select("id, status").eq("status", "active")
  : { data: [] };

const site = "https://raffickcafe.com";
const staticRoutes = [
  ["/", "weekly", "1.0"], ["/menu", "daily", "0.9"], ["/offers", "weekly", "0.8"],
  ["/reviews", "weekly", "0.7"], ["/enquiry", "monthly", "0.6"]
];
const dynamicRoutes = [
  ...(categories || []).map((x) => [`/category/${x.id}`, "weekly", "0.7"]),
  ...(menuItems || []).map((x) => [`/item/${x.id}`, "weekly", "0.7"])
];
const urls = [...staticRoutes, ...dynamicRoutes].map(([path, freq, priority]) =>
  `  <url><loc>${site}${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
).join("\n");
await mkdir("public", { recursive: true });
await writeFile("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`Generated sitemap with ${staticRoutes.length + dynamicRoutes.length} URLs`);
