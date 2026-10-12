import { groq } from "next-sanity";

import { client } from "@/sanity/lib/client";

export type ArticleListItem = {
  _id: string;
  title_fr: string;
  title_en?: string;
  slug: string;
  category?: string;
  excerpt_fr?: string;
  excerpt_en?: string;
  mainImage?: unknown;
  publishedAt: string;
};

export type ArticleDetail = ArticleListItem & {
  body_fr?: unknown[];
  body_en?: unknown[];
  author?: string;
};

const ARTICLE_LIST_PROJECTION = groq`{
  _id,
  title_fr,
  title_en,
  "slug": slug.current,
  category,
  excerpt_fr,
  excerpt_en,
  mainImage,
  publishedAt
}`;

// Toutes les fonctions ci-dessous retournent un tableau/objet vide plutôt
// que de lever une exception quand Sanity n'est pas configuré (`client`
// est `null` — voir src/sanity/lib/client.ts) : les pages appelantes
// affichent alors leur état "pas encore de contenu" au lieu de planter.
// Statut : IMPLEMENTED (code), NON TESTÉ en conditions réelles — aucun
// projet Sanity existant au moment de cette livraison pour vérifier un
// aller-retour réseau réel (cf. note de projet).

export async function getArticles(): Promise<ArticleListItem[]> {
  if (!client) return [];
  return client.fetch(
    groq`*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${ARTICLE_LIST_PROJECTION}`,
  );
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleDetail | null> {
  if (!client) return null;
  return client.fetch(
    groq`*[_type == "article" && slug.current == $slug][0]{
      ...,
      "slug": slug.current
    }`,
    { slug },
  );
}
