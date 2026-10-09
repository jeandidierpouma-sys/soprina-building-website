"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

/**
 * Révèle son contenu quand il entre dans le viewport au scroll (une seule
 * fois — `viewport.once`). Utilisé partout sur le site pour que chaque page,
 * pas seulement /devis, ait un scroll animé cohérent. Respecte
 * `prefers-reduced-motion` : le contenu apparaît alors directement, sans
 * décalage ni fondu.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  amount?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const offset =
    direction === "up"
      ? { y: 36 }
      : direction === "left"
        ? { x: -48 }
        : direction === "right"
          ? { x: 48 }
          : {};

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
