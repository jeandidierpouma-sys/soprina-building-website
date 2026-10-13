"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Slider avant/après — statut : IMPLEMENTED (code), MISSING en données
// (aucune réalisation n'a encore de paire avant/après fournie par DESH —
// voir les champs `beforeImg`/`afterImg`, optionnels, dans content.ts).
//
// Glisser-déposer (souris, tactile) + clavier (flèches gauche/droite) pour
// faire varier le point de comparaison. Aucune dépendance externe : juste
// un clip-path CSS sur l'image "avant", pas de librairie tierce.
//
// Rendu uniquement si une réalisation fournit À LA FOIS `beforeImg` et
// `afterImg` (voir buildMediaItems dans realisation-media.tsx) — tant que
// ces champs restent vides, aucune carte n'affiche ce composant : zéro
// changement visuel sur le site tel qu'il est aujourd'hui.

export function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50); // % depuis la gauche
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`Comparaison avant/après — ${alt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
      }}
      className="focus-ring relative h-full w-full cursor-ew-resize touch-none select-none overflow-hidden"
    >
      {/* Image "après" — pleine largeur, en dessous */}
      <Image
        src={after}
        alt={`${alt} — après`}
        fill
        className="pointer-events-none object-cover"
        draggable={false}
      />
      {/* Image "avant" — rognée au point de comparaison, au-dessus */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${alt} — avant`}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>
      {/* Poignée */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <span className="flex gap-0.5">
            <span className="h-3 w-0.5 rounded bg-sb-navy" />
            <span className="h-3 w-0.5 rounded bg-sb-navy" />
          </span>
        </span>
      </div>
      <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-sb-navy/70 px-2 py-0.5 text-[11px] font-medium text-white">
        Avant
      </span>
      <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-sb-navy/70 px-2 py-0.5 text-[11px] font-medium text-white">
        Après
      </span>
    </div>
  );
}
