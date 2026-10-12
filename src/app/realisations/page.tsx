import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { RealisationsGrid } from "@/components/sections/realisations-grid";
import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nos réalisations — SOPRINA BUILDING, Douala",
  description:
    "Chantiers réels menés par SOPRINA BUILDING à Douala : construction, aménagement et génie civil, de la conception à la livraison.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos réalisations"
        description="Un aperçu de nos chantiers — galerie en cours d'enrichissement, de nouveaux projets viendront s'ajouter."
      />

      <section className="bg-white py-24">
        <div className="container-sb">
          <RealisationsGrid />
        </div>
      </section>

      <Cta />
    </>
  );
}
