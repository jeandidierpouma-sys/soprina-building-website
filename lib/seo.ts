import type { Metadata } from "next";

// Petit utilitaire pour générer un Metadata Next.js cohérent (title +
// description + openGraph + twitter + canonical) sans dupliquer le
// title/description sur chaque page. Statut : IMPLEMENTED.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}
