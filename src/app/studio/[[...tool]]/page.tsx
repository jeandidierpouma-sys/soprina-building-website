import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-dynamic";

// Défense en profondeur en plus du disallow dans robots.ts (2026-10-10) :
// même si /studio est référencé depuis une page externe non contrôlée
// par ce site, cette balise empêche son indexation.
export const metadata: Metadata = {
  title: "Studio — SOPRINA BUILDING",
  robots: { index: false, follow: false },
};

// Statut : CONTRACT_ONLY tant que NEXT_PUBLIC_SANITY_PROJECT_ID n'est pas
// défini — on affiche un message de configuration plutôt que de monter
// NextStudio avec un projectId factice (qui échouerait au runtime en
// essayant de contacter l'API Sanity). Voir claude/lot3-version-anglaise.md
// pour les variables exactes à renseigner sur Vercel.
export default function StudioPage() {
  if (!isSanityConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sb-navy-deep px-6 text-center">
        <div className="max-w-md">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sb-gold">
            SOPRINA BUILDING — CMS
          </p>
          <h1 className="mb-4 text-xl font-bold text-white">
            Studio pas encore configuré
          </h1>
          <p className="text-sm leading-relaxed text-white/70">
            Il manque la variable d&apos;environnement{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{" "}
            (et{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5">
              NEXT_PUBLIC_SANITY_DATASET
            </code>
            ) sur Vercel. Un projet Sanity doit être créé au préalable sur{" "}
            <span className="text-white">sanity.io/manage</span> — voir les
            instructions fournies pour le détail des étapes.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
