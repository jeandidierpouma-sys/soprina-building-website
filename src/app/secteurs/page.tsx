import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { SECTORS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Nos solutions par secteur — SOPRINA BUILDING",
  description:
    "Entreprises, banques, hôtels, industries, écoles & universités, administrations, institutions, commerces, centres médicaux.",
  path: "/secteurs",
});

export default function SecteursPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos solutions"
        title="Pour chaque secteur"
        description="Des réponses adaptées aux contraintes et usages propres à chaque type de bâtiment."
      />

      <section className="bg-white py-20">
        <div className="container-sb grid grid-cols-2 gap-5 sm:grid-cols-3">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={Math.min(i * 0.06, 0.3)} amount={0.2}>
              <div className="group relative aspect-[450/232] overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-xl">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
