import { useEffect } from "react";

export const SITE_URL = "https://raffickcafe.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

function upsertMeta(selector, attributes) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag.setAttribute(key, value));
}

export function useSEO({ title, description, path = "/", noindex = false, image = DEFAULT_IMAGE, type = "website", structuredData }) {
  const structuredDataJson = structuredData ? JSON.stringify(structuredData) : "";
  useEffect(() => {
    const canonicalUrl = new URL(path || "/", `${SITE_URL}/`).href;
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, nofollow" : INDEX_ROBOTS });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: noindex ? "noindex, nofollow" : INDEX_ROBOTS });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let schema = document.head.querySelector('#page-structured-data');
    if (structuredDataJson) {
      if (!schema) {
        schema = document.createElement("script");
        schema.id = "page-structured-data";
        schema.type = "application/ld+json";
        document.head.appendChild(schema);
      }
      schema.textContent = structuredDataJson;
    } else {
      schema?.remove();
    }
  }, [title, description, path, noindex, image, type, structuredDataJson]);
}
