"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-sb-navy-deep py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(240,178,62,0.12),transparent_50%)]" />
      <div className="container-sb relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <nav aria-label="Fil d'Ariane" className="mb-4 flex items-center gap-2 text-sm font-medium text-white/50">
            <Link href="/" className="focus-ring hover:text-sb-gold">
              Accueil
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-sb-gold">{eyebrow}</span>
          </nav>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-white/70">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
