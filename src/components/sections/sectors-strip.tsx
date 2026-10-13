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

  // Grille 3×3 plutôt que 2 rangées (5+4) : les 2 rangées de longueur
  // différente, chacune centrée indépendamment (flex-wrap justify-center),
  // n'avaient pas leurs bords gauche/droite alignés d'une rangée à l'autre
  // — effet décalé visible, signalé par DESH le 2026-10-13. Avec 9 secteurs
  // qui tombent juste sur 3×3, une grille CSS aligne les colonnes sur les
  // 3 rangées quel que soit le nombre de caractères de chaque étiquette.
  // Sur mobile (<sm), passage à 1 colonne : forcer 3 colonnes sur un écran
  // étroit ferait déborder "Écoles & Universités" (l'étiquette la plus
  // longue) dans sa cellule.
  return (
    <section className="bg-sb-navy py-20">
      <div className="container-sb">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t.title}
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-3xl grid-cols-1 place-items-center gap-3 sm:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.name} delay={Math.min(i * 0.05, 0.3)} amount={0.4}>
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-sb-gold/50 hover:text-sb-gold">
                {s.name}
              </span>
            </Reveal>
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
