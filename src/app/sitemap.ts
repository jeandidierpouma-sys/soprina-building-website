import type { MetadataRoute } from "next";

const SITE_URL = "https://www.soprinabuilding.com"; // cf. layout.tsx

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/a-propos", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/domaines", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/secteurs", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/methode", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/devis", priority: 0.9, changeFrequency: "monthly" as const },
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

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
