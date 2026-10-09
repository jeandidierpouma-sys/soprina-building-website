import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SECTORS } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function SectorsStrip() {
  return (
    <section className="bg-sb-navy py-20">
      <div className="container-sb">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Pour chaque secteur
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-3">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={Math.min(i * 0.05, 0.3)} amount={0.4}>
              <span className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-sb-gold/50 hover:text-sb-gold">
                {s.name}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center" delay={0.2}>
          <Link
            href="/secteurs"
            className="focus-ring group flex items-center gap-1.5 text-sm font-semibold text-sb-gold hover:text-white"
          >
            Voir nos réalisations par secteur
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
