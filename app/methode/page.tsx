import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { METHOD_STEPS, ENGAGEMENTS, WHY_US } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Notre méthode de travail — SOPRINA BUILDING",
  description:
    "Écouter, étudier, proposer, réaliser, contrôler — une approche claire, du premier échange à la livraison.",
  path: "/methode",
});

export default function MethodePage() {
  return (
    <>
      <PageHero
        eyebrow="Notre méthode de travail"
        title="Une approche claire, du premier échange à la livraison"
      />

      <section className="bg-white py-24">
        <div className="container-sb">
          <div className="relative flex flex-col gap-10 lg:flex-row lg:gap-6">
            {METHOD_STEPS.map((step, i) => (
              <div key={step.n} className="relative flex-1">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sb-navy text-lg font-bold text-sb-gold">
                    {step.n}
                  </span>
                  <div className="lg:mt-5">
                    <h2 className="text-xl font-bold text-sb-navy">
                      {step.title}
                    </h2>
                  </div>
                </div>
                <p className="mt-3 leading-relaxed text-sb-body lg:pr-4">
                  {step.desc}
                </p>
                {i < METHOD_STEPS.length - 1 && (
                  <span className="absolute top-7 left-14 hidden h-px w-full bg-sb-grayline lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-sb grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/p15_photo.jpg"
              alt="L'équipe SOPRINA BUILDING"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="mb-4 inline-block rounded-full bg-sb-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sb-navy">
              Nos engagements
            </span>
            <div className="grid grid-cols-2 gap-4">
              {ENGAGEMENTS.map((e) => (
                <div key={e.n} className="rounded-2xl bg-sb-navy p-6 text-white">
                  <span className="text-sm font-semibold text-sb-gold">
                    {e.n}
                  </span>
                  <p className="mt-2 text-xl font-bold">{e.title}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {WHY_US.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-sb-navy shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
