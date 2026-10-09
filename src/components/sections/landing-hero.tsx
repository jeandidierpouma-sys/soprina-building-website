"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, Layers, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

const TRUST = [
  {
    icon: Layers,
    label: "7 domaines d'expertise",
    value: "construction, ingénierie, maintenance...",
  },
  {
    icon: MapPin,
    label: "Basés à Douala",
    value: "Bonanjo, près de Kenya Airways",
  },
  {
    icon: MessageCircle,
    label: "Échange direct",
    value: "téléphone, WhatsApp ou e-mail",
  },
];

export function LandingHero() {
  const shouldReduceMotion = useReducedMotion();

  // Le bloc d'accroche apparaît en cascade (eyebrow → titre → texte → CTA →
  // réassurance) plutôt que d'un seul bloc : chaque enfant hérite du stagger
  // du parent via `variants`, sans dupliquer les transitions partout.
  // Amplitude volontairement plus marquée (retour utilisateur) : plus de
  // distance parcourue, plus de délai entre enfants.
  const container: Variants = {
    hidden: {},
    show: {
      transition: shouldReduceMotion
        ? {}
        : { staggerChildren: 0.16, delayChildren: 0.2 },
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
  // Le CTA se distingue du reste de la cascade par un léger effet ressort
  // (scale + y) au lieu d'un simple fondu, pour être le point le plus visible.
  const ctaItem: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.85 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden bg-sb-navy-deep">
      <motion.div
        className="absolute inset-0"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src="/images/p14_photo.jpg"
          alt="L'équipe SOPRINA BUILDING sur un chantier à Douala"
          fill
          priority
          className="object-cover object-[75%_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-sb-navy-deep via-sb-navy-deep/85 to-sb-navy-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-sb-navy-deep via-transparent to-transparent" />

      <div className="container-sb relative z-10 py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="text-sm font-semibold uppercase tracking-wide text-sb-gold"
          >
            Demande de devis
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-3 text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
          >
            Parlez-nous de votre projet, recevons une solution adaptée
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/75"
          >
            SOPRINA BUILDING accompagne ses clients de la conception à la
            livraison — construction, ingénierie, aménagement, installations
            techniques et maintenance.
          </motion.p>

          <motion.div variants={ctaItem} className="mt-10">
            <Button asChild size="lg">
              <a href="#devis-form">Demander mon devis</a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 grid max-w-lg grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
            {TRUST.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-sb-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/70">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
