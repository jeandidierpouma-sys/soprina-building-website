"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  return (
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden bg-sb-navy-deep">
      <Image
        src="/images/p14_photo.jpg"
        alt="L'équipe SOPRINA BUILDING sur un chantier à Douala"
        fill
        priority
        className="object-cover object-[75%_30%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sb-navy-deep via-sb-navy-deep/85 to-sb-navy-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-sb-navy-deep via-transparent to-transparent" />

      <div className="container-sb relative z-10 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-sb-gold">
            Demande de devis
          </span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
            Parlez-nous de votre projet, recevons une solution adaptée
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            SOPRINA BUILDING accompagne ses clients de la conception à la
            livraison — construction, ingénierie, aménagement, installations
            techniques et maintenance.
          </p>

          <div className="mt-10">
            <Button asChild size="lg">
              <a href="#devis-form">Demander mon devis</a>
            </Button>
          </div>

          <div className="mt-16 grid max-w-lg grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {TRUST.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-sb-gold" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/70">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
