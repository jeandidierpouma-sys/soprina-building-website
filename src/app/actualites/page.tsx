import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ArticlesGrid } from "@/components/sections/articles-grid";
import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";
import { getArticles } from "@/sanity/lib/queries";

export const metadata: Metadata = pageMetadata({
  title: "Actualités — SOPRINA BUILDING, Douala",
  description:
    "Actualités de chantier, conseils techniques et présentations de réalisations de SOPRINA BUILDING à Douala.",
  path: "/actualites",
});

// Statut : IMPLEMENTED (page + requête Sanity), CONTRACT_ONLY côté contenu
// (aucun article publié tant que le client n'a pas écrit et validé de
// texte — cf. brief : "sans publier de contenu uniquement pour simuler de
// la fraîcheur").
export default async function ActualitesPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Actualités"
        description="Actualités de chantier, conseils techniques et présentations de nos réalisations."
      />

      <section className="bg-white py-24">
        <div className="container-sb">
          <ArticlesGrid articles={articles} locale="fr" />
        </div>
      </section>

      <Cta />
    </>
  );
}
