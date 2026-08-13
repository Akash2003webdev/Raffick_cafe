import { writeFile, mkdir } from "node:fs/promises";
import { categories, menuItems } from "../src/lib/data.js";

const site = "https://raffickcafe.com";
const staticRoutes = [
  ["/", "weekly", "1.0"], ["/menu", "daily", "0.9"], ["/offers", "weekly", "0.8"],
  ["/reviews", "weekly", "0.7"], ["/enquiry", "monthly", "0.6"]
];
const dynamicRoutes = [
  ...categories.filter((x) => x.status !== "inactive").map((x) => [`/category/${x.id}`, "weekly", "0.7"]),
  ...menuItems.filter((x) => x.status !== "inactive").map((x) => [`/item/${x.id}`, "weekly", "0.7"])
];
const urls = [...staticRoutes, ...dynamicRoutes].map(([path, freq, priority]) =>
  `  <url><loc>${site}${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
).join("\n");
await mkdir("public", { recursive: true });
await writeFile("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`Generated sitemap with ${staticRoutes.length + dynamicRoutes.length} URLs`);
