"use client";

import { useRef, useState } from "react";

import {
  DevisCalculator,
  type DevisDomainOption,
  type DevisPayload,
} from "@/components/forms/devis-calculator";
import { ContactForm } from "@/components/forms/contact-form";

// Assemble le calculateur (devis-calculator.tsx) et le formulaire de
// contact existant : au clic sur "Demander mon devis personnalisé", les
// réponses du calculateur pré-remplissent le sujet/message du formulaire
// puis la page défile jusqu'à lui. Aucune donnée n'est envoyée ici — c'est
// toujours /api/contact (même route, même anti-spam) qui traite l'envoi au
// clic final sur "Envoyer ma demande" dans le formulaire.
//
// `formKey` force React à remonter <ContactForm> avec de nouvelles valeurs
// initiales (sinon le useState interne de ContactForm ne reprendrait les
// nouvelles initialSubject/initialMessage qu'au premier montage).

const SUBJECT_TEXT = {
  fr: (domainTitle: string) => `Demande de devis — ${domainTitle}`,
  en: (domainTitle: string) => `Quote request — ${domainTitle}`,
} as const;

function buildMessage(locale: "fr" | "en", payload: DevisPayload) {
  if (locale === "en") {
    const lines = [
      `Project type: ${payload.domainTitle}`,
      `Approximate surface area: ${payload.surfaceM2} m²`,
      payload.delai ? `Desired timeline: ${payload.delai}` : null,
      payload.details ? `Details: ${payload.details}` : null,
    ];
    return lines.filter(Boolean).join("\n");
  }
  const lines = [
    `Type de projet : ${payload.domainTitle}`,
    `Surface approximative : ${payload.surfaceM2} m²`,
    payload.delai ? `Délai souhaité : ${payload.delai}` : null,
    payload.details ? `Précisions : ${payload.details}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

export function DevisFlow({
  locale = "fr",
  domains,
}: {
  locale?: "fr" | "en";
  domains: readonly DevisDomainOption[];
}) {
  const [prefill, setPrefill] = useState<{ subject: string; message: string } | null>(
    null
  );
  const [formKey, setFormKey] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  function handleRequestQuote(payload: DevisPayload) {
    setPrefill({
      subject: SUBJECT_TEXT[locale](payload.domainTitle),
      message: buildMessage(locale, payload),
    });
    setFormKey((k) => k + 1);
    // Laisse le temps au nouveau contenu de s'afficher avant de défiler.
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div className="flex flex-col gap-8">
      <DevisCalculator
        locale={locale}
        domains={domains}
        onRequestQuote={handleRequestQuote}
      />
      <div
        ref={formRef}
        className="rounded-2xl border border-sb-grayline bg-muted p-6 sm:p-8"
      >
        <ContactForm
          key={formKey}
          locale={locale}
          initialSubject={prefill?.subject}
          initialMessage={prefill?.message}
        />
      </div>
    </div>
  );
}
