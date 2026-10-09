"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { METHOD_STEPS } from "@/lib/content";

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

  return (
    <section className="bg-muted py-24">
      <div className="container-sb">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            Une approche claire, du premier échange à la livraison
          </h2>
        </div>

        <div ref={trackRef}>
          <div className="relative mb-10 hidden h-1 overflow-hidden rounded-full bg-sb-grayline lg:block">
            <motion.div
              style={{ scaleX }}
              className="h-full w-full origin-left rounded-full bg-sb-gold"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {METHOD_STEPS.map((step, i) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-transparent bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-sb-gold/30 hover:shadow-md"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
