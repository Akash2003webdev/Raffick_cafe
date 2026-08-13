# Raffick Cafe SEO deployment checklist

1. Deploy the production build to `https://raffickcafe.com`.
2. Confirm `/robots.txt`, `/sitemap.xml`, `/logo-512.png`, `/og-image.jpg`, and `/site.webmanifest` return HTTP 200.
3. Verify the domain in Google Search Console and submit `https://raffickcafe.com/sitemap.xml`.
4. Request indexing for the home, menu, offers, reviews, and enquiry URLs.
5. Test the home page with Google Rich Results Test and Schema Markup Validator.
6. Keep opening hours, phone, address, menu, and delivery availability identical across the website and Google Business Profile.
7. Add the website URL to the Google Business Profile and collect genuine customer reviews regularly.
8. The build automatically creates a 25-URL sitemap from the bundled categories and menu items. If Supabase items differ, keep `src/lib/data.js` synchronized before deployment or regenerate the sitemap from exported production data.
9. Add verified Google Business Profile, Instagram, and Facebook URLs to the cafe schema `sameAs` only after confirming the exact public links.
10. Add `aggregateRating` only when the rating and review count are genuine, visible on the site, and kept current.

Search position cannot be guaranteed. Local relevance, helpful content, site speed, genuine reviews, backlinks, and Google Business Profile activity affect ranking.
