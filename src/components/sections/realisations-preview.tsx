import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { RealisationsGrid } from "@/components/sections/realisations-grid";
import { Reveal } from "@/components/motion/reveal";

const TEXT = {
  fr: { title: "Nos réalisations", link: "Découvrir nos réalisations", href: "/realisations" },
  en: { title: "Our projects", link: "Discover our projects", href: "/en/realisations" },
} as const;

export function RealisationsPreview({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const t = TEXT[locale];

  return (
    <section className="bg-white py-24">
      <div className="container-sb">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="max-w-xl text-3xl font-bold text-sb-navy sm:text-4xl">
              {t.title}
            </h2>
          </div>
          <Link
            href={t.href}
            className="focus-ring group flex items-center gap-1.5 text-sm font-semibold text-sb-navy hover:text-sb-gold"
          >
            {t.link}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <RealisationsGrid limit={4} locale={locale} variant="carousel" />
      </div>
    </section>
  );
}
