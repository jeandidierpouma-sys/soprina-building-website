import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { SECTORS_EN } from "@/lib/content.en";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Our sector solutions — SOPRINA BUILDING, Douala",
  description:
    "Businesses, banks, hotels, industries, schools & universities, government offices, institutions, retail, medical centers — in Douala and the areas we serve.",
  path: "/en/secteurs",
});

export default function SecteursPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Our solutions"
        title="For every sector"
        description="Solutions tailored to the constraints and uses specific to each type of building."
      />

      <section className="bg-white py-20">
        <div className="container-sb grid grid-cols-2 gap-5 sm:grid-cols-3">
          {SECTORS_EN.map((s, i) => (
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

      <Cta locale="en" />
    </>
  );
}
