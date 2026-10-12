import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

// Styles minimaux pour le corps d'article — pas de plugin
// @tailwindcss/typography installé sur ce projet (on évite une dépendance
// supplémentaire pour un besoin aussi simple) ; ces composants couvrent le
// strict nécessaire : paragraphes, titres, listes, image inline.
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 leading-relaxed">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-sb-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-bold text-sb-navy">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>
    ),
  },
};

import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getArticleBySlug } from "@/sanity/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return pageMetadata({ title: "Article", description: "", path: `/actualites/${slug}` });

  return pageMetadata({
    title: `${article.title_fr} — SOPRINA BUILDING`,
    description: article.excerpt_fr || "",
    path: `/actualites/${slug}`,
  });
}

// Statut : IMPLEMENTED (code), pas encore testable en conditions réelles
// (aucun article publié — voir /actualites).
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const imgBuilder = article.mainImage ? urlFor(article.mainImage as never) : null;
  const imgSrc = imgBuilder?.width(1200).height(675).url();

  // JSON-LD BlogPosting (2026-10-10) — même logique que le GeneralContractor
  // du layout racine : uniquement des données réellement connues (titre,
  // date, auteur, image), rien d'inventé.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title_fr,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author || "SOPRINA BUILDING" },
    ...(imgSrc && { image: imgSrc }),
    ...(article.excerpt_fr && { description: article.excerpt_fr }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-sb-navy-deep py-20 sm:py-28">
        <div className="container-sb">
          <time
            dateTime={article.publishedAt}
            className="text-sm font-semibold uppercase tracking-wide text-sb-gold"
          >
            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
            {article.title_fr}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-sb max-w-3xl">
          {imgSrc && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image src={imgSrc} alt={article.title_fr} fill className="object-cover" />
            </div>
          )}
          <div className="text-sb-body">
            {article.body_fr && (
              <PortableText value={article.body_fr} components={portableTextComponents} />
            )}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
