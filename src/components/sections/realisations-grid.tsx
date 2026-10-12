"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { REALISATIONS } from "@/lib/content";
import { REALISATIONS_EN } from "@/lib/content.en";
import { Reveal } from "@/components/motion/reveal";
import { RealisationMedia } from "@/components/sections/realisation-media";

const NAV_LABELS = {
  fr: { prev: "Projet précédent", next: "Projet suivant" },
  en: { prev: "Previous project", next: "Next project" },
} as const;

// Grille de projets réutilisée par la page /realisations et par l'aperçu
// sur la page d'accueil (via la prop `limit`). `locale` sélectionne le jeu
// de libellés (titre/catégorie) ; les images et slugs sont partagés.
//
// `variant` choisit la mise en page :
// - "grid" (défaut, page /realisations) : grille classique 2 colonnes,
//   pensée pour parcourir l'ensemble de la galerie sans interaction.
// - "carousel" (aperçu page d'accueil) : bande défilante horizontalement
//   avec scroll-snap (swipe tactile + flèches), chaque carte étant un
//   élément de largeur fixe. Composant client (useRef pour piloter le
//   défilement) — nécessaire uniquement pour cette variante, mais le
//   composant reste client dans son ensemble pour partager le même code.
export function RealisationsGrid({
  limit,
  locale = "fr",
  variant = "grid",
}: {
  limit?: number;
  locale?: "fr" | "en";
  variant?: "grid" | "carousel";
}) {
  const all = locale === "en" ? REALISATIONS_EN : REALISATIONS;
  const items = limit ? all.slice(0, limit) : all;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const labels = NAV_LABELS[locale];

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth; // 24px = gap-6
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const card = (p: (typeof items)[number], i: number) => (
    <div
      data-card
      className="group h-full overflow-hidden rounded-2xl border border-sb-grayline bg-white shadow-sm transition-all hover:-translate-y-1.5 hover:border-sb-gold/40 hover:shadow-xl"
    >
      {/* object-contain + fond neutre : média(s) affiché(s) en entier,
          sans recadrage, quel que soit le ratio d'origine (bien plus
          large que haut sur ces 4 photos HD). RealisationMedia assemble
          photo principale + galerie + vidéo en une bande défilante
          horizontalement dès qu'il y a plus d'un média (voir
          content.ts) — avec un seul média, rendu identique à avant. */}
      <div className="relative aspect-[12/5] w-full overflow-hidden bg-muted">
        <RealisationMedia
          img={p.img}
          alt={p.title}
          gallery={p.gallery}
          video={p.video}
          videoUrl={p.videoUrl}
        />
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-sb-gold">
          {p.category}
        </span>
        <p className="mt-1.5 font-semibold text-sb-navy">{p.title}</p>
      </div>
    </div>
  );

  if (variant === "carousel") {
    return (
      <div>
        {items.length > 1 && (
          <div className="mb-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={labels.prev}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-sb-grayline text-sb-navy transition-colors hover:border-sb-gold hover:text-sb-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={labels.next}
              className="focus-ring flex size-10 items-center justify-center rounded-full border border-sb-grayline text-sb-navy transition-colors hover:border-sb-gold hover:text-sb-gold"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={Math.min(i * 0.08, 0.3)}
              amount={0.2}
              className="w-[85%] shrink-0 snap-start sm:w-[65%] md:w-[420px]"
            >
              {card(p, i)}
            </Reveal>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={Math.min(i * 0.08, 0.3)} amount={0.2}>
          {card(p, i)}
        </Reveal>
      ))}
    </div>
  );
}
