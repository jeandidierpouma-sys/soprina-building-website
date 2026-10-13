import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SECTORS } from "@/lib/content";
import { SECTORS_EN } from "@/lib/content.en";
import { Reveal } from "@/components/motion/reveal";

const TEXT = {
  fr: { title: "Pour chaque secteur", link: "Voir nos réalisations par secteur", href: "/secteurs" },
  en: { title: "For every sector", link: "See our work by sector", href: "/en/secteurs" },
} as const;

export function SectorsStrip({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const sectors = locale === "en" ? SECTORS_EN : SECTORS;
  const t = TEXT[locale];

  // Rangées fixes (5 + 4) plutôt qu'un flex-wrap laissé libre : avec 9
  // secteurs, un flex-wrap simple retombait à la largeur du conteneur (8
  // tags sur la 1ère ligne, le 9e seul et recentré sur la 2e, déséquilibré
  // visuellement — signalé par DESH). Découpage choisi par regroupement
  // logique : secteurs privés/commerciaux sur la 1ère ligne, secteurs
  // publics/institutionnels sur la 2e. Chaque rangée reste elle-même en
  // flex-wrap + justify-center, donc le rendu reste correct sur mobile si
  // une rangée doit encore se replier.
  const row1 = sectors.slice(0, 5);
  const row2 = sectors.slice(5);

  return (
    <section className="bg-sb-navy py-20">
      <div className="container-sb">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h2>
        </Reveal>

        <div className="flex flex-col items-center gap-3">
          {[row1, row2].map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
              {row.map((s, i) => (
                <Reveal
                  key={s.name}
                  delay={Math.min((rowIndex * row1.length + i) * 0.05, 0.3)}
                  amount={0.4}
                >
                  <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-sb-gold/50 hover:text-sb-gold">
                    {s.name}
                  </span>
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center" delay={0.2}>
          <Link
            href={t.href}
            className="focus-ring group flex items-center gap-1.5 text-sm font-semibold text-sb-gold hover:text-white"
          >
            {t.link}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
