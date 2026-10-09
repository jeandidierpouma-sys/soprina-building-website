import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

// Statut : IMPLEMENTED (corrige point 06 de l'audit post-mise en ligne du
// 2026-10-09). Avant ce fichier, Next.js servait sa page 404 par défaut
// (non brandée, en anglais, sans lien de retour) — le code HTTP 404
// lui-même était déjà correct, seul le contenu affiché était en cause.
export const metadata: Metadata = {
  title: "Page introuvable — SOPRINA BUILDING",
  description:
    "La page que vous recherchez n'existe pas ou a été déplacée. Retrouvez nos domaines d'expertise et nos coordonnées sur la page d'accueil.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white">
      <div className="container-sb flex flex-col items-center gap-6 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-muted text-sb-navy">
          <Compass className="size-7" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-wide text-sb-gold">
          Erreur 404
        </p>
        <h1 className="text-3xl font-bold text-sb-navy sm:text-4xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="max-w-md leading-relaxed text-sb-body">
          Le lien suivi est peut-être incorrect ou la page a été déplacée.
          Retrouvez nos domaines d&apos;expertise ou contactez-nous
          directement pour votre projet.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
