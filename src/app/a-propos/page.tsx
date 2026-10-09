import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { WhyUs } from "@/components/sections/why-us";
import { Cta } from "@/components/sections/cta";
import { ABOUT_INTRO, AMBITION } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Qui sommes-nous — SOPRINA BUILDING",
  description:
    "SOPRINA BUILDING accompagne ses clients dans la réalisation de projets de construction performants, de la conception à la livraison.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="Qui sommes-nous"
        title="Un partenaire technique, du premier plan à la livraison"
        description="Professionnalisme, expertise et accompagnement durable — au service de chaque chantier."
      />

      <section className="bg-white py-24">
        <div className="container-sb grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="flex flex-col gap-5 text-sb-body">
              {ABOUT_INTRO.paragraphs.map((p) => (
                <p key={p} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ABOUT_INTRO.badges.map((b) => (
                <div
                  key={b.title}
                  className="relative aspect-[819/244] w-full overflow-hidden rounded-xl border border-sb-grayline"
                >
                  <Image
                    src={b.img}
                    alt={b.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/p14_photo.jpg"
                alt="L'équipe SOPRINA BUILDING sur un chantier en cours"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-sb grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal
            direction="left"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl"
          >
            <Image
              src="/images/p3_photo_clean.jpg"
              alt="Hall d'accueil — standing SOPRINA BUILDING"
              fill
              className="object-cover"
            />
          </Reveal>

          <Reveal direction="right" delay={0.1} className="flex flex-col gap-8">
            <div>
              <span className="mb-4 inline-block rounded-full bg-sb-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sb-navy">
                {AMBITION.title}
              </span>
              <p className="text-2xl font-semibold leading-snug text-sb-navy">
                {AMBITION.text}
              </p>
            </div>

            <div className="relative aspect-[769/577] w-full max-w-md overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/p3_promesse.png"
                alt="Notre promesse — Construire, transformer, équiper et maintenir des environnements professionnels avec exigence, innovation et responsabilité."
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <WhyUs />
      <Cta />
    </>
  );
}
