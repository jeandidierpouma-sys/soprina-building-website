"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

// Carte/zones desservies — statut : PARTIAL.
//
// Une seule localisation est réellement confirmée à ce jour : le siège,
// Douala – Bonanjo (CONTACT.address dans content.ts). Le texte de la FAQ
// existante ("Contactez-nous avec la localisation de votre projet pour
// confirmer notre couverture") indique que la couverture géographique
// précise au-delà de Douala n'est pas encore définie côté client — je ne
// dois donc pas inventer une liste de villes/quartiers supplémentaires.
//
// Implémentation volontairement légère (pas de librairie de cartographie
// externe type Leaflet/Google Maps — éviterait d'ajouter une dépendance,
// une clé API et un coût potentiel sans décision explicite du client) :
// une liste de zones "interactive" (clic/focus pour afficher le détail),
// pas une carte géographique à proprement parler. La page /contact a par
// ailleurs déjà une vraie carte (OpenStreetMap, embed gratuit, sans clé
// API) centrée sur le siège — ce composant la complète, il ne la remplace
// pas.
//
// Pour l'enrichir une fois la liste réelle des zones desservies fournie
// par DESH : ajouter des entrées à `zones` (ci-dessous ou via content.ts).
// Pour une vraie carte multi-points plus tard, deux options à trancher
// avec le client : étendre l'embed OpenStreetMap actuel (gratuit, mais
// limité à un seul marqueur) ou une librairie comme Leaflet/MapLibre
// (gratuite mais nouvelle dépendance) — aucune des deux n'est câblée ici.

export type ServiceZone = {
  name: string;
  detail: string;
  confirmed: boolean;
};

const TEXT = {
  fr: {
    heading: "Zones desservies",
    subheading:
      "Notre siège est à Douala. Contactez-nous avec la localisation de votre projet pour confirmer notre couverture dans votre zone.",
  },
  en: {
    heading: "Areas we serve",
    subheading:
      "Our head office is in Douala. Contact us with your project's location to confirm coverage in your area.",
  },
} as const;

export function ServiceAreaMap({
  locale = "fr",
  zones,
}: {
  locale?: "fr" | "en";
  zones: readonly ServiceZone[];
}) {
  const t = TEXT[locale];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = zones[activeIndex];

  return (
    <div className="rounded-2xl border border-sb-grayline bg-white p-6 sm:p-8">
      <h3 className="text-lg font-bold text-sb-navy">{t.heading}</h3>
      <p className="mt-2 text-sm text-sb-body">{t.subheading}</p>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist">
        {zones.map((zone, i) => (
          <button
            key={zone.name}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={`focus-ring flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              i === activeIndex
                ? "border-sb-navy bg-sb-navy text-white"
                : "border-sb-grayline text-sb-navy hover:border-sb-gold"
            }`}
          >
            <MapPin className="size-3.5" />
            {zone.name}
            {!zone.confirmed && <span className="opacity-60">?</span>}
          </button>
        ))}
      </div>

      {active && (
        <p
          role="tabpanel"
          className="mt-4 rounded-xl bg-muted px-4 py-3 text-sm text-sb-body"
        >
          {active.detail}
        </p>
      )}
    </div>
  );
}
