import Image from "next/image";
import { ShieldCheck, BadgeCheck, Tag, Truck } from "lucide-react";

import { SUPPLY_CHAIN } from "@/lib/content";
import { SUPPLY_CHAIN_EN } from "@/lib/content.en";
import { Reveal } from "@/components/motion/reveal";

const ICONS = [ShieldCheck, BadgeCheck, Tag, Truck];

const ALT = {
  fr: "Conteneurs et approvisionnement international de matériaux",
  en: "Containers and international materials sourcing",
} as const;

export function SupplyChain({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const data = locale === "en" ? SUPPLY_CHAIN_EN : SUPPLY_CHAIN;

  return (
    <section className="bg-muted py-24">
      <div className="container-sb grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal
          direction="left"
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl"
        >
          <Image src={data.img} alt={ALT[locale]} fill className="object-cover" />
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-4 leading-relaxed text-sb-body">{data.text}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {data.badges.map((badge, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={badge}
                  className="flex items-center gap-3 rounded-xl border border-sb-grayline bg-white p-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-semibold text-sb-navy">
                    {badge}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
