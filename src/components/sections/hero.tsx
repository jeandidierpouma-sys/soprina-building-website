"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShieldCheck, Timer, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

const STATS = [
  { icon: ShieldCheck, label: "Qualité & sécurité", value: "À chaque étape" },
  { icon: Wrench, label: "7 domaines", value: "d'expertise intégrés" },
  { icon: Timer, label: "Délais", value: "respectés, engagement tenu" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

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
            Vos projets en toute sérénité
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            SOPRINA BUILDING accompagne ses clients dans la réalisation de
            projets de construction performants, de la conception à la
            livraison — construction, ingénierie, aménagement, installations
            techniques et maintenance.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/contact">Contactez-nous pour votre projet</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/domaines">Nos domaines d&apos;expertise</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-20 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            {STATS.map(({ icon: Icon, label, value }) => (
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
