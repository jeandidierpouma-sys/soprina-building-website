import type { Metadata } from "next";
import Image from "next/image";
import { Mail, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/site/social-icons";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Version anglaise de la page "en travaux" — voir
// src/app/maintenance/page.tsx pour le détail du fonctionnement
// (rewrite depuis middleware.ts, pas de header/footer/widget WhatsApp).
// Statut : IMPLEMENTED, TESTED — voir claude/decisions-validees.md.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Site under maintenance — SOPRINA BUILDING",
    description:
      "The SOPRINA BUILDING website is currently being updated. Our team remains available — contact us directly.",
    path: "/en/maintenance",
  }),
  robots: { index: false, follow: false },
};

export default function MaintenancePageEn() {
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
        Site under maintenance
      </p>
      <h1 className="mt-3 max-w-xl text-3xl font-bold text-white sm:text-4xl">
        We&apos;re preparing a new version of the site
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-white/70">
        Our team remains available for your projects. Get in touch
        directly — we respond quickly.
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
