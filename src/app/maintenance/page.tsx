import type { Metadata } from "next";
import Image from "next/image";
import { Mail, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/site/social-icons";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Page "en travaux" — ajoutée le 2026-10-16 à la demande explicite de
// DESH ("je veux que le site affiche en travaux"). Jamais atteinte
// directement par un visiteur normal : c'est src/middleware.ts qui
// bascule tout le site public dessus (par rewrite, URL inchangée) quand
// la variable d'environnement serveur MAINTENANCE_MODE="true" — voir ce
// fichier pour l'activation/désactivation et le bypass de prévisualisation.
// Volontairement sans header/footer/widget WhatsApp (x-is-maintenance
// dans layout.tsx) : objectif = empêcher la navigation vers une autre
// page pendant les travaux. Les seuls moyens de contact actifs sont ceux
// affichés ci-dessous, repris de CONTACT (lib/content.ts) — aucune
// coordonnée inventée. Statut : IMPLEMENTED, TESTED — voir
// claude/decisions-validees.md.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Site en travaux — SOPRINA BUILDING",
    description:
      "Le site de SOPRINA BUILDING est en cours de mise à jour. Nos équipes restent disponibles : contactez-nous directement.",
    path: "/maintenance",
  }),
  // Page temporaire : ne doit jamais être indexée à la place des vraies
  // pages du site (doublé côté middleware par l'en-tête X-Robots-Tag pour
  // les visites qui atterrissent dessus par rewrite plutôt que sur
  // /maintenance directement).
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sb-navy px-6 py-16 text-center">
      <span className="inline-flex shrink-0 items-center rounded-md bg-white px-4 py-2.5 shadow-sm">
        <Image
          src="/images/brand/logo-full.png"
          alt="SOPRINA BUILDING"
          width={1007}
          height={373}
          className="h-14 w-auto shrink-0"
          priority
        />
      </span>

      <p className="mt-10 text-sm font-semibold uppercase tracking-wide text-sb-gold">
        Site en travaux
      </p>
      <h1 className="mt-3 max-w-xl text-3xl font-bold text-white sm:text-4xl">
        Nous préparons une nouvelle version du site
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-white/70">
        Nos équipes restent disponibles pour vos projets. Contactez-nous
        directement, nous vous répondons rapidement.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon />
            WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}>
            <PhoneCall />
            {CONTACT.phones[0]}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={`mailto:${CONTACT.email}`}>
            <Mail />
            {CONTACT.email}
          </a>
        </Button>
      </div>

      <p className="mt-10 text-xs font-semibold uppercase tracking-wide text-white/40">
        BUILDING • ENGINEERING • SOLUTIONS
      </p>
    </main>
  );
}
