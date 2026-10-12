import type { Metadata } from "next";

// Déduit automatiquement le chemin équivalent dans l'autre langue à partir
// du chemin courant (même logique que otherLocaleHref dans site-header.tsx)
// : /en/... ↔ /..., sans table de correspondance séparée à maintenir.
function otherLocalePath(path: string): { locale: "fr" | "en"; href: string } {
  if (path === "/en" || path.startsWith("/en/")) {
    const stripped = path.replace(/^\/en/, "") || "/";
    return { locale: "fr", href: stripped };
  }
  return { locale: "en", href: path === "/" ? "/en" : `/en${path}` };
}

// Petit utilitaire pour générer un Metadata Next.js cohérent (title +
// description + openGraph + twitter + canonical + hreflang) sans dupliquer
// le title/description sur chaque page. Statut : IMPLEMENTED.
// hreflang (alternates.languages) déduit automatiquement de `path` : chaque
// page FR déclare son équivalent EN et vice-versa, sans paramètre
// supplémentaire à passer sur les appels existants.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const currentLocale = path === "/en" || path.startsWith("/en/") ? "en" : "fr";
  const other = otherLocalePath(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        [currentLocale]: path,
        [other.locale]: other.href,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      locale: currentLocale === "en" ? "en_US" : "fr_FR",
    },
    twitter: { title, description },
  };
}
