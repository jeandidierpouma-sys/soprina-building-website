import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getArticleBySlug } from "@/sanity/lib/queries";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article)
    return pageMetadata({ title: "Article", description: "", path: `/en/actualites/${slug}` });

  const title = article.title_en || article.title_fr;
  return pageMetadata({
    title: `${title} — SOPRINA BUILDING`,
    description: article.excerpt_en || article.excerpt_fr || "",
    path: `/en/actualites/${slug}`,
  });
}

// Statut : IMPLEMENTED (code) — un article sans title_en/body_en s'affiche
// en français (repli volontaire, cf. convention title_en facultatif dans
// le schéma project/article : mieux vaut montrer le contenu FR que rien).
export default async function ArticlePageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const title = article.title_en || article.title_fr;
  const body = article.body_en?.length ? article.body_en : article.body_fr;
  const imgBuilder = article.mainImage ? urlFor(article.mainImage as never) : null;
  const imgSrc = imgBuilder?.width(1200).height(675).url();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author || "SOPRINA BUILDING" },
    ...(imgSrc && { image: imgSrc }),
    ...(article.excerpt_en || article.excerpt_fr
      ? { description: article.excerpt_en || article.excerpt_fr }
      : {}),
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
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-sb max-w-3xl">
          {imgSrc && (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg">
              <Image src={imgSrc} alt={title} fill className="object-cover" />
            </div>
          )}
          <div className="text-sb-body">
            {body && <PortableText value={body} components={portableTextComponents} />}
          </div>
        </div>
      </section>

      <Cta locale="en" />
    </>
  );
}
