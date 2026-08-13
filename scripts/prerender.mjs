import { readFile, writeFile, mkdir } from "node:fs/promises";
import { categories, menuItems } from "../src/lib/data.js";

const site = "https://raffickcafe.com";
const base = await readFile("dist/index.html", "utf8");
const escape = (s = "") => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const routes = [
  ["menu", "Raffick Cafe Menu | Coffee, Fast Food & Desserts in Sattur", "Explore coffee, burgers, pasta, pizza, rice, noodles, shakes and desserts at Raffick Cafe in Sattur."],
  ["offers", "Cafe Offers & Combo Deals | Raffick Cafe Sattur", "View current cafe offers, combo deals and discounts at Raffick Cafe in Sattur."],
  ["reviews", "Customer Reviews | Raffick Cafe Sattur", "Read customer experiences and reviews for Raffick Cafe in Sattur."],
  ["enquiry", "Cafe Enquiry & Bulk Orders | Raffick Cafe Sattur", "Contact Raffick Cafe in Sattur for cafe enquiries, catering and bulk orders."],
  ...categories.map((x) => [`category/${x.id}`, `${x.name} in Sattur | Raffick Cafe`, `Explore ${x.name} at Raffick Cafe, Sattur.`]),
  ...menuItems.map((x) => [`item/${x.id}`, `${x.name} in Sattur | Raffick Cafe`, `${x.description} View price and order from Raffick Cafe, Sattur.`])
];
for (const [route, title, description] of routes) {
  const url = `${site}/${route}`;
  let html = base
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escape(description)}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${url}" />`)
    .replace('<div id="root"></div>', `<div id="root"></div><noscript><h1>${escape(title)}</h1><p>${escape(description)}</p><p><a href="${site}/menu">View Raffick Cafe menu</a></p></noscript>`);
  const dir = `dist/${route}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}
console.log(`Pre-rendered ${routes.length} SEO routes`);
