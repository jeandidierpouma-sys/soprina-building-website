import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { WhyUs } from "@/components/sections/why-us";
import { Cta } from "@/components/sections/cta";
import { ABOUT_INTRO_EN, AMBITION_EN } from "@/lib/content.en";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "About us — SOPRINA BUILDING, Douala-based contractor",
  description:
    "SOPRINA BUILDING, based in Douala, supports its clients across Central Africa in delivering high-performing construction projects, from design through to handover.",
  path: "/en/a-propos",
});

export default function AProposPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="About us"
        title="A technical partner, from the first blueprint to handover"
        description="Professionalism, expertise and long-term support — for every project."
        bgImage="/images/p2_photo_clean.jpg"
      />

      <section className="bg-white py-24">
        <div className="container-sb grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="flex flex-col gap-5 text-sb-body">
              {ABOUT_INTRO_EN.paragraphs.map((p) => (
                <p key={p} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ABOUT_INTRO_EN.badges.map((b) => (
                <div
                  key={b.title}
                  className="relative aspect-[819/244] w-full overflow-hidden rounded-xl border border-sb-grayline"
                >
                  <Image src={b.img} alt={b.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/p14_photo.jpg"
                alt="The SOPRINA BUILDING team on an active site"
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
              alt="Reception hall — SOPRINA BUILDING standards"
              fill
              className="object-cover"
            />
          </Reveal>

          <Reveal direction="right" delay={0.1} className="flex flex-col gap-8">
            <div>
              <span className="mb-4 inline-block rounded-full bg-sb-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sb-navy">
                {AMBITION_EN.title}
              </span>
              <p className="text-2xl font-semibold leading-snug text-sb-navy">
                {AMBITION_EN.text}
              </p>
            </div>

            <div className="relative aspect-[769/577] w-full max-w-md overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/p3_promesse.png"
                alt="Our promise — Build, transform, equip and maintain professional environments with rigor, innovation and accountability."
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <WhyUs locale="en" />
      <Cta locale="en" />
    </>
  );
}
