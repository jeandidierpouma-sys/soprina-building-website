import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleListItem } from "@/sanity/lib/queries";

const TEXT = {
  fr: {
    empty:
      "Aucun article publié pour l'instant — revenez bientôt pour nos actualités de chantier et nos conseils techniques.",
    readMore: "Lire l'article",
    base: "/actualites",
    dateLocale: "fr-FR",
  },
  en: {
    empty:
      "No articles published yet — check back soon for site updates and technical advice.",
    readMore: "Read article",
    base: "/en/actualites",
    dateLocale: "en-US",
  },
} as const;

// Grille d'articles de blog — même structure visuelle que RealisationsGrid
// (src/components/sections/realisations-grid.tsx) pour rester cohérent
// avec l'existant plutôt que d'inventer un nouveau style de carte.
// Statut : IMPLEMENTED, zéro article réel pour l'instant (état vide
// ci-dessous tant que le client n'a pas publié de contenu).
export function ArticlesGrid({
  articles,
  locale = "fr",
}: {
  articles: ArticleListItem[];
  locale?: "fr" | "en";
}) {
  const t = TEXT[locale];

  if (articles.length === 0) {
    return (
      <p className="mx-auto max-w-lg text-center leading-relaxed text-sb-body">
        {t.empty}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a, i) => {
        const title = (locale === "en" ? a.title_en : a.title_fr) || a.title_fr;
        const excerpt =
          (locale === "en" ? a.excerpt_en : a.excerpt_fr) || a.excerpt_fr;
        const imgBuilder = a.mainImage
          ? urlFor(a.mainImage as never)
          : null;
        const imgSrc = imgBuilder?.width(640).height(400).url();

        return (
          <Reveal key={a._id} delay={Math.min(i * 0.08, 0.3)} amount={0.2}>
            <Link
              href={`${t.base}/${a.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-sb-grayline bg-white shadow-sm transition-all hover:-translate-y-1.5 hover:border-sb-gold/40 hover:shadow-xl"
            >
              <div className="relative aspect-[8/5] w-full overflow-hidden bg-muted">
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <time
                  dateTime={a.publishedAt}
                  className="text-xs font-semibold uppercase tracking-wide text-sb-gold"
                >
                  {new Date(a.publishedAt).toLocaleDateString(t.dateLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <p className="mt-1.5 font-semibold text-sb-navy">{title}</p>
                {excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sb-body">
                    {excerpt}
                  </p>
                )}
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
