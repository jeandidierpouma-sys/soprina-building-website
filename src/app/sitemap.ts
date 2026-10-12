import type { MetadataRoute } from "next";

import { getArticles } from "@/sanity/lib/queries";

const SITE_URL = "https://www.soprinabuilding.com"; // cf. layout.tsx

// Mêmes segments de chemin pour les deux langues (/x et /en/x) : chaque
// route FR a son équivalent EN ajouté avec le même priority/changeFrequency.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/a-propos", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/domaines", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/realisations",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/secteurs", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/methode", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/devis", priority: 0.9, changeFrequency: "monthly" as const },
    // /actualites ajouté avec le CMS Sanity (2026-10-10) — cf. CMS- Sanity.
    {
      path: "/actualites",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/mentions-legales",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/confidentialite",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  const now = new Date();

  const frEntries = routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const enEntries = routes.map((r) => ({
    url: `${SITE_URL}/en${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    // Léger retrait par rapport à l'équivalent FR : version EN secondaire
    // (audience principale FR/Douala), pas un doublon de priorité.
    priority: Math.max(r.priority - 0.1, 0.1),
  }));

  // Articles individuels — liste vide tant qu'aucun article n'est publié
  // dans Sanity (getArticles() gère elle-même ce cas, voir
  // src/sanity/lib/queries.ts), donc aucune entrée en plus pour l'instant.
  const articles = await getArticles();
  const articleEntries = articles.flatMap((a) => [
    {
      url: `${SITE_URL}/actualites/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/en/actualites/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]);

  return [...frEntries, ...enEntries, ...articleEntries];
}
