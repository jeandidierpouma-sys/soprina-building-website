"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Média(s) d'une carte "Réalisation" : un ou plusieurs éléments (photo
// principale, photos de galerie, clip auto-hébergé ou vidéo YouTube),
// affichés dans une bande défilante horizontalement (swipe tactile sur
// mobile, flèches au survol sur desktop) dès qu'il y en a plus d'un.
// Avec un seul élément (cas actuel des 4 réalisations, aucune n'a encore
// de photo de galerie ou de vidéo — voir content.ts), rendu strictement
// identique à avant : pas de flèches, pas de défilement, juste le visuel.
// Statut : IMPLEMENTED (code), MISSING en données (zéro photo de galerie
// ou vidéo associée à ce jour).
//
// Isolé dans son propre composant client (useState/useRef pour la facade
// YouTube et le défilement) pour que RealisationsGrid reste un composant
// serveur.

export type MediaItem =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string }
  | { kind: "youtube"; id: string };

// Construit la liste ordonnée des médias d'un projet : photo principale,
// puis photos de galerie éventuelles, puis vidéo éventuelle (fichier ou
// YouTube — un seul des deux sur un même projet) en dernier.
export function buildMediaItems(p: {
  img: string;
  gallery?: readonly string[];
  video?: string;
  videoUrl?: string;
}): MediaItem[] {
  const items: MediaItem[] = [{ kind: "image", src: p.img }];
  if (p.gallery) {
    for (const src of p.gallery) items.push({ kind: "image", src });
  }
  if (p.video) items.push({ kind: "video", src: p.video });
  else if (p.videoUrl) items.push({ kind: "youtube", id: p.videoUrl });
  return items;
}

function MediaItemView({
  item,
  alt,
  poster,
}: {
  item: MediaItem;
  alt: string;
  poster: string;
}) {
  const [youtubeActivated, setYoutubeActivated] = useState(false);

  if (item.kind === "video") {
    return (
      <video
        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        poster={poster}
        controls
        preload="none"
        muted
        playsInline
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }

  if (item.kind === "youtube") {
    // Facade cliquable : rien de YouTube (script, iframe, cookies) n'est
    // chargé tant que le visiteur n'a pas explicitement cliqué — important
    // pour la performance mobile et la confidentialité (cf. pages légales).
    // youtube-nocookie.com : domaine "mode confidentialité renforcée" de
    // YouTube, pas de cookie de pistage avant lecture effective.
    if (!youtubeActivated) {
      return (
        <button
          type="button"
          onClick={() => setYoutubeActivated(true)}
          aria-label={`Lire la vidéo — ${alt}`}
          className="focus-ring group/play relative block h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={alt}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-sb-navy/20 transition-colors group-hover/play:bg-sb-navy/35">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover/play:scale-110">
              <Play className="size-7 translate-x-0.5 fill-sb-navy text-sb-navy" />
            </span>
          </span>
        </button>
      );
    }
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={alt}
      fill
      className="object-contain transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export function RealisationMedia({
  img,
  alt,
  gallery,
  video,
  videoUrl,
}: {
  img: string;
  alt: string;
  gallery?: readonly string[];
  video?: string;
  videoUrl?: string;
}) {
  const items = buildMediaItems({ img, gallery, video, videoUrl });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hasMultiple = items.length > 1;

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="group/gallery relative h-full w-full overflow-hidden">
      <div
        ref={scrollerRef}
        className={
          hasMultiple
            ? "flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "h-full w-full"
        }
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={
              hasMultiple
                ? "relative h-full w-full flex-none snap-center"
                : "relative h-full w-full"
            }
          >
            <MediaItemView item={item} alt={alt} poster={img} />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Image précédente"
            className="focus-ring absolute left-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sb-navy opacity-0 shadow-md transition-opacity group-hover/gallery:opacity-100 md:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Image suivante"
            className="focus-ring absolute right-2 top-1/2 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sb-navy opacity-0 shadow-md transition-opacity group-hover/gallery:opacity-100 md:flex"
          >
            <ChevronRight className="size-5" />
          </button>
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-sb-navy/70 px-2 py-0.5 text-[11px] font-medium text-white">
            {items.length} médias
          </span>
        </>
      )}
    </div>
  );
}
