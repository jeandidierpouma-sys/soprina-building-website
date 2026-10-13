"use client";

import { useId, useMemo, useState } from "react";
import { ArrowRight, Ruler, Clock3 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Calculateur de devis interactif — statut : SCAFFOLD (voir note ci-dessous).
//
// Le cahier des charges demande un "calculateur de devis interactif" capable
// de produire "une estimation indicative" à partir du type de projet et de
// la surface. Ce composant implémente la partie que je peux construire sans
// données du client : sélection du domaine (les 7 domaines réels du
// catalogue, pas des catégories inventées), saisie de la surface et des
// caractéristiques principales, et génération d'une demande de devis
// STRUCTURÉE (pré-remplit le formulaire de contact avec un récapitulatif
// clair plutôt qu'un message libre vague).
//
// Ce que ce composant NE FAIT PAS, et pourquoi : aucune règle de calcul de
// prix n'est câblée. Une estimation chiffrée nécessite la grille tarifaire
// réelle de SOPRINA BUILDING (prix au m² par domaine, majorations selon
// niveau de finition, délais, etc.) — je ne dois jamais inventer un prix de
// construction pour le marché camerounais. Tant que cette grille n'est pas
// fournie et validée par le client, la "zone résultat" affiche un message
// explicite au lieu d'un chiffre, et le seul chemin proposé est la demande
// de devis personnalisé (qui, elle, ne dépend d'aucune règle de calcul —
// conforme au "OU" du cahier des charges : estimation indicative OU devis
// personnalisé).
//
// Pour activer une vraie estimation chiffrée plus tard : ajouter une table
// de règles (ex. src/lib/devis-pricing.ts, { domainSlug, pricePerM2, ... }),
// validée par SOPRINA BUILDING, puis calculer dans handleSubmit ci-dessous
// et remplacer le bloc "estimation à valider" par le résultat réel.

export type DevisDomainOption = {
  slug: string;
  title: string;
};

export type DevisPayload = {
  domainTitle: string;
  surfaceM2: string;
  delai: string;
  details: string;
};

const TEXT = {
  fr: {
    heading: "Estimez votre projet",
    subheading:
      "Sélectionnez votre domaine, indiquez la surface et obtenez une demande de devis déjà structurée — plus rapide à traiter pour notre équipe.",
    domainLabel: "Type de projet *",
    domainPlaceholder: "Choisissez un domaine",
    surfaceLabel: "Surface approximative (m²) *",
    surfacePlaceholder: "Ex. 150",
    delaiLabel: "Délai souhaité",
    delaiOptions: [
      { value: "", label: "Non défini" },
      { value: "urgent", label: "Urgent (moins d'1 mois)" },
      { value: "normal", label: "1 à 3 mois" },
      { value: "flexible", label: "Flexible / à planifier" },
    ],
    detailsLabel: "Précisions utiles (optionnel)",
    detailsPlaceholder:
      "Ex. nombre de niveaux, état actuel, équipements souhaités...",
    errDomain: "Choisissez un type de projet.",
    errSurface: "Indiquez une surface approximative.",
    resultTitle: "Estimation indicative — à valider",
    resultBody:
      "Le calcul automatique d'un prix nécessite la grille tarifaire officielle de SOPRINA BUILDING, pas encore communiquée. Plutôt que d'afficher un chiffre approximatif, nous transmettons votre demande, déjà structurée, à un conseiller pour un chiffrage précis et personnalisé.",
    cta: "Demander mon devis personnalisé",
  },
  en: {
    heading: "Estimate your project",
    subheading:
      "Select your project type, enter the surface area and get a request that's already structured — faster for our team to process.",
    domainLabel: "Project type *",
    domainPlaceholder: "Choose a domain",
    surfaceLabel: "Approximate surface area (m²) *",
    surfacePlaceholder: "E.g. 150",
    delaiLabel: "Desired timeline",
    delaiOptions: [
      { value: "", label: "Not defined" },
      { value: "urgent", label: "Urgent (under 1 month)" },
      { value: "normal", label: "1 to 3 months" },
      { value: "flexible", label: "Flexible / to be planned" },
    ],
    detailsLabel: "Useful details (optional)",
    detailsPlaceholder:
      "E.g. number of levels, current condition, desired equipment...",
    errDomain: "Please choose a project type.",
    errSurface: "Please enter an approximate surface area.",
    resultTitle: "Indicative estimate — pending validation",
    resultBody:
      "Calculating an automatic price requires SOPRINA BUILDING's official rate card, not yet available. Rather than show an approximate figure, we forward your request, already structured, to an advisor for an accurate, personalised quote.",
    cta: "Request my personalised quote",
  },
} as const;

export function DevisCalculator({
  locale = "fr",
  domains,
  onRequestQuote,
}: {
  locale?: "fr" | "en";
  domains: readonly DevisDomainOption[];
  onRequestQuote: (payload: DevisPayload) => void;
}) {
  const t = TEXT[locale];
  const selectId = useId();
  const [domainSlug, setDomainSlug] = useState("");
  const [surface, setSurface] = useState("");
  const [delai, setDelai] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<{ domain?: string; surface?: string }>(
    {}
  );
  const [showResult, setShowResult] = useState(false);

  const selectedDomain = useMemo(
    () => domains.find((d) => d.slug === domainSlug),
    [domains, domainSlug]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { domain?: string; surface?: string } = {};
    if (!selectedDomain) nextErrors.domain = t.errDomain;
    if (!surface.trim()) nextErrors.surface = t.errSurface;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setShowResult(true);
    onRequestQuote({
      domainTitle: selectedDomain!.title,
      surfaceM2: surface.trim(),
      delai,
      details: details.trim(),
    });
  }

  return (
    <div className="rounded-2xl border border-sb-grayline bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-sb-navy">{t.heading}</h3>
      <p className="mt-2 text-sm text-sb-body">{t.subheading}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
        <div>
          <Label htmlFor={`${selectId}-domain`}>{t.domainLabel}</Label>
          <select
            id={`${selectId}-domain`}
            value={domainSlug}
            onChange={(e) => {
              setDomainSlug(e.target.value);
              if (errors.domain) setErrors((prev) => ({ ...prev, domain: undefined }));
            }}
            aria-invalid={Boolean(errors.domain)}
            className="focus-ring h-11 w-full rounded-md border border-sb-grayline bg-white px-3 text-sm text-sb-navy"
          >
            <option value="">{t.domainPlaceholder}</option>
            {domains.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.title}
              </option>
            ))}
          </select>
          {errors.domain && (
            <p className="mt-1.5 text-xs text-destructive">{errors.domain}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor={`${selectId}-surface`}>{t.surfaceLabel}</Label>
            <div className="relative">
              <Ruler className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sb-body/50" />
              <Input
                id={`${selectId}-surface`}
                type="number"
                min={1}
                inputMode="numeric"
                aria-invalid={Boolean(errors.surface)}
                value={surface}
                onChange={(e) => {
                  setSurface(e.target.value);
                  if (errors.surface)
                    setErrors((prev) => ({ ...prev, surface: undefined }));
                }}
                placeholder={t.surfacePlaceholder}
                className="pl-9"
              />
            </div>
            {errors.surface && (
              <p className="mt-1.5 text-xs text-destructive">{errors.surface}</p>
            )}
          </div>

          <div>
            <Label htmlFor={`${selectId}-delai`}>{t.delaiLabel}</Label>
            <div className="relative">
              <Clock3 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sb-body/50" />
              <select
                id={`${selectId}-delai`}
                value={delai}
                onChange={(e) => setDelai(e.target.value)}
                className="focus-ring h-11 w-full rounded-md border border-sb-grayline bg-white pl-9 pr-3 text-sm text-sb-navy"
              >
                {t.delaiOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor={`${selectId}-details`}>{t.detailsLabel}</Label>
          <textarea
            id={`${selectId}-details`}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={t.detailsPlaceholder}
            rows={3}
            className="focus-ring w-full rounded-md border border-sb-grayline bg-white px-3 py-2 text-sm text-sb-navy placeholder:text-sb-body/50"
          />
        </div>

        <Button type="submit" size="lg">
          {t.cta}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      {showResult && (
        <div className="mt-6 rounded-xl border border-sb-gold/30 bg-sb-gold/10 p-4">
          <p className="text-sm font-semibold text-sb-navy">{t.resultTitle}</p>
          <p className="mt-1.5 text-sm text-sb-body">{t.resultBody}</p>
        </div>
      )}
    </div>
  );
}
