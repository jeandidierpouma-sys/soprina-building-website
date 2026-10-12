import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ArticlesGrid } from "@/components/sections/articles-grid";
import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";
import { getArticles } from "@/sanity/lib/queries";

export const metadata: Metadata = pageMetadata({
  title: "News — SOPRINA BUILDING, Douala",
  description:
    "Site updates, technical advice and project showcases from SOPRINA BUILDING in Douala.",
  path: "/en/actualites",
});

export default async function ActualitesPageEn() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        locale="en"
        eyebrow="News"
        title="News"
        description="Site updates, technical advice and showcases of our projects."
      />

      <section className="bg-white py-24">
        <div className="container-sb">
          <ArticlesGrid articles={articles} locale="en" />
        </div>
      </section>

      <Cta locale="en" />
    </>
  );
}
