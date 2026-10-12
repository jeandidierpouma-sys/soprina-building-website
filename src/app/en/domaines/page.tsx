import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { SupplyChain } from "@/components/sections/supply-chain";
import { Cta } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { DOMAINS_EN } from "@/lib/content.en";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Our areas of expertise — SOPRINA BUILDING, Douala",
  description:
    "Construction & civil engineering, fit-out & renovation, electricity & power, smart building & security, air conditioning & cold rooms, maintenance & facility solutions, materials supply — in Douala and Central Africa.",
  path: "/en/domaines",
});

export default function DomainesPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Our expertise"
        title="Our areas of expertise"
        description="Seven integrated areas delivering a comprehensive, coherent response to every project."
      />

      <section className="bg-white py-8">
        <div className="container-sb flex flex-col gap-24 py-16">
          {DOMAINS_EN.map((d, i) => (
            <div
              key={d.n}
              id={`domaine-${d.n}`}
              className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <Reveal
                direction={i % 2 === 1 ? "right" : "left"}
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image src={d.img} alt={d.title} fill className="object-cover" />
              </Reveal>

              <Reveal
                direction={i % 2 === 1 ? "left" : "right"}
                delay={0.1}
                className={i % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sm font-bold text-sb-gold">
                    {d.n}
                  </span>
                  <span className="h-px flex-1 max-w-16 bg-sb-grayline" />
                </div>
                <h2 className="text-2xl font-bold text-sb-navy sm:text-3xl">
                  {d.title}
                </h2>
                <p className="mt-4 leading-relaxed text-sb-body">{d.desc}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-sb-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="container-sb flex justify-center pb-8">
          <Button asChild size="lg">
            <Link href="/en/contact">Talk about your project</Link>
          </Button>
        </div>
      </section>

      <SupplyChain locale="en" />

      <Cta locale="en" />
    </>
  );
}
