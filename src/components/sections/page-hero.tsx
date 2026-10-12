"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const TEXT = {
  fr: { home: "Accueil", homeHref: "/", breadcrumb: "Fil d'Ariane" },
  en: { home: "Home", homeHref: "/en", breadcrumb: "Breadcrumb" },
} as const;

// `bgImage` est optionnel : par défaut (toutes les pages existantes), le
// hero reste le dégradé marine uni inchangé. Quand une image est fournie
// (pour l'instant /a-propos et /contact), elle est posée en fond avec un
// voile marine assez opaque pour garder le texte lisible et l'identité de
// marque — jamais l'image seule à pleine opacité.
export function PageHero({
  eyebrow,
  title,
  description,
  locale = "fr",
  bgImage,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  locale?: "fr" | "en";
  bgImage?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const t = TEXT[locale];

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
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sb-navy-deep/90 via-sb-navy-deep/80 to-sb-navy-deep" />
        </>
      )}
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
            aria-label={t.breadcrumb}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-white/50"
          >
            <Link href={t.homeHref} className="focus-ring hover:text-sb-gold">
              {t.home}
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
