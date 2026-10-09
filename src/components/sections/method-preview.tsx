"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { METHOD_STEPS } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function MethodPreview() {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Les 5 étapes forment une vraie séquence (Écouter → ... → Contrôler) :
  // la ligne se remplit au rythme du scroll de la section plutôt que de
  // jouer une animation déconnectée du geste de l'utilisateur.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const rawScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = shouldReduceMotion ? 1 : rawScaleX;
  // Point lumineux qui voyage le long de la barre — rend la progression
  // beaucoup plus visible qu'un simple remplissage.
  const dotLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-muted py-24">
      <div className="container-sb">
        <Reveal className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            Une approche claire, du premier échange à la livraison
          </h2>
        </Reveal>

        <div ref={trackRef}>
          <div className="relative mb-12 hidden h-1.5 lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-sb-grayline">
              <motion.div
                style={{ scaleX }}
                className="h-full w-full origin-left rounded-full bg-sb-gold"
              />
            </div>
            {!shouldReduceMotion && (
              <motion.div
                style={{ left: dotLeft }}
                className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sb-gold shadow-[0_0_14px_3px_rgba(240,178,62,0.75)]"
              />
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {METHOD_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08} amount={0.3}>
                <div className="relative h-full rounded-2xl border border-transparent bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:scale-[1.02] hover:border-sb-gold/30 hover:shadow-md">
                  <span className="text-4xl font-extrabold text-sb-gold/25">
                    {step.n}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-sb-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sb-body">
                    {step.desc}
                  </p>
                  {i < METHOD_STEPS.length - 1 && (
                    <div className="absolute top-1/2 right-[-1.1rem] hidden h-px w-6 bg-sb-grayline lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
