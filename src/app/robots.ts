import type { MetadataRoute } from "next";

const SITE_URL = "https://www.soprinabuilding.com"; // cf. layout.tsx

// /studio exclu de l'indexation (2026-10-10, ajout du CMS Sanity) :
// panneau d'administration, aucune valeur pour un visiteur venant de
// Google, et potentiellement sensible (liste des réalisations/témoignages
// avant publication). /api exclu aussi : routes techniques, pas des
// pages. Défense en profondeur avec le `robots: { index: false }` posé
// directement sur la page /studio (voir src/app/studio/[[...tool]]/page.tsx)
// — un lien externe vers /studio resterait non indexable même s'il
// contourne ce robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
