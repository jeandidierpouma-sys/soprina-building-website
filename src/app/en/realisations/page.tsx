import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { RealisationsGrid } from "@/components/sections/realisations-grid";
import { Cta } from "@/components/sections/cta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our projects — SOPRINA BUILDING, Douala",
  description:
    "Real sites led by SOPRINA BUILDING in Douala: construction, fit-out and civil engineering, from design through to handover.",
  path: "/en/realisations",
});

export default function RealisationsPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Projects"
        title="Our projects"
        description="A look at our sites — gallery still growing, with new projects to be added."
      />

      <section className="bg-white py-24">
        <div className="container-sb">
          <RealisationsGrid locale="en" />
        </div>
      </section>

      <Cta locale="en" />
    </>
  );
}
