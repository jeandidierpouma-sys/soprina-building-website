"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion ? {} : { staggerChildren: 0.12 },
    },
  };
  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-sb-navy-deep py-20 sm:py-28">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(240,178,62,0.12),transparent_50%)]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="container-sb relative z-10">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.nav
            variants={item}
            aria-label="Fil d'Ariane"
            className="mb-4 flex items-center gap-2 text-sm font-medium text-white/50"
          >
            <Link href="/" className="focus-ring hover:text-sb-gold">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-sb-gold">{eyebrow}</span>
          </motion.nav>
          <motion.h1
            variants={item}
            className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={item} className="mt-4 max-w-xl text-white/70">
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
