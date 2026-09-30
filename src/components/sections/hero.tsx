"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Timer, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";

const STATS = [
  { icon: ShieldCheck, label: "Qualité & sécurité", value: "À chaque étape" },
  { icon: Wrench, label: "7 domaines", value: "d'expertise intégrés" },
  { icon: Timer, label: "Délais", value: "respectés, engagement tenu" },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-sb-navy-deep">
      <Image
        src="/images/p1_hero_top.jpg"
        alt="Tour vitrée — SOPRINA BUILDING"
        fill
        priority
        className="object-cover object-top opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sb-navy-deep/40 via-sb-navy-deep/70 to-sb-navy-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,178,62,0.15),transparent_45%)]" />

      <div className="container-sb relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Vos projets en toute sérénité
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            SOPRINA BUILDING accompagne ses clients dans la réalisation de
            projets de construction performants, de la conception à la
            livraison — construction, ingénierie, aménagement, installations
            techniques et maintenance.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contactez-nous pour votre projet</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/domaines">Nos domaines d&apos;expertise</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
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
      </div>
    </section>
  );
}
