"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, Timer, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

const TEXT = {
  fr: {
    // Slogan de marque (identité validée) : "Vos projets en toute sérénité".
    // Statut : PARTIAL — traduction proposée côté EN, pas encore validée par
    // SOPRINA BUILDING comme signature officielle en anglais.
    title: "Vos projets en toute sérénité",
    body:
      "SOPRINA BUILDING accompagne ses clients dans la réalisation de projets de construction performants, de la conception à la livraison — construction, ingénierie, aménagement, installations techniques et maintenance.",
    ctaContact: "Contactez-nous pour votre projet",
    ctaDomains: "Nos domaines d'expertise",
    stats: [
      { icon: ShieldCheck, label: "Qualité & sécurité", value: "À chaque étape" },
      { icon: Wrench, label: "7 domaines", value: "d'expertise intégrés" },
      { icon: Timer, label: "Délais", value: "respectés, engagement tenu" },
    ],
    domainsHref: "/domaines",
    contactHref: "/contact",
  },
  en: {
    title: "Your projects, in complete peace of mind",
    body:
      "SOPRINA BUILDING supports its clients in delivering high-performing construction projects, from design through to handover — construction, engineering, fit-out, technical installations and maintenance.",
    ctaContact: "Contact us about your project",
    ctaDomains: "Our areas of expertise",
    stats: [
      { icon: ShieldCheck, label: "Quality & safety", value: "At every stage" },
      { icon: Wrench, label: "7 areas", value: "of integrated expertise" },
      { icon: Timer, label: "Deadlines", value: "met, as committed" },
    ],
    domainsHref: "/en/domaines",
    contactHref: "/en/contact",
  },
} as const;

export function Hero({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const shouldReduceMotion = useReducedMotion();
  const t = TEXT[locale];

  const container: Variants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? {}
        : { staggerChildren: 0.16, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.75, ease: "easeOut" },
    },
  };

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-sb-navy-deep">
      <motion.div
        className="absolute inset-0"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.07, 1] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 24, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src="/images/p1_hero_top.jpg"
          alt="Tour vitrée — SOPRINA BUILDING"
          fill
          priority
          className="object-cover object-top opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-sb-navy-deep/40 via-sb-navy-deep/70 to-sb-navy-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,178,62,0.15),transparent_45%)]" />

      <div className="container-sb relative z-10 py-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-3xl"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            {t.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {t.body}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <Link href={t.contactHref}>{t.ctaContact}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={t.domainsHref}>{t.ctaDomains}</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-20 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            {t.stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-sb-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-sm text-white/70">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
