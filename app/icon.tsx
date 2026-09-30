import { ImageResponse } from "next/og";

// Favicon généré dynamiquement (convention App Router `app/icon.tsx`).
// Statut : IMPLEMENTED — emblème original (cube stylisé) inspiré du motif
// du logo SOPRINA BUILDING, redessiné en JSX/CSS plutôt que recadré depuis
// le PNG du dépliant : à 32px un recadrage photo perd en lisibilité et
// traîne des artefacts JPEG ; un tracé vectoriel reste net à toute taille.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d2148",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 18,
            height: 18,
            transform: "rotate(45deg)",
            background: "linear-gradient(135deg, #f7c968 0%, #f0b23e 55%, #c98a1f 100%)",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
