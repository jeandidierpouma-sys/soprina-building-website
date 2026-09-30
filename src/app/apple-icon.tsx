import { ImageResponse } from "next/og";

// Icône iOS "Ajouter à l'écran d'accueil" (convention `app/apple-icon.tsx`).
// Statut : IMPLEMENTED — même logique que icon.tsx : un dessin vectoriel
// original (grille de tuiles bleues façon cube + base grise), inspiré du
// motif du logo réel, plutôt qu'un recadrage bitmap du PNG source (qui
// contenait soit le texte "Soprina" en bordure, soit un fond dégradé non
// uniforme impossible à détourer proprement sans risquer d'altérer le
// logo original — voir historique de session pour les tentatives de crop).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const TILE = (
  <div
    style={{
      width: 34,
      height: 34,
      transform: "rotate(45deg) scale(1, 0.62) rotate(-45deg) skewX(20deg)",
      background: "linear-gradient(135deg, #6fa8ff 0%, #2f6fe0 55%, #163e8f 100%)",
      borderRadius: 3,
      border: "2px solid #bcdcff",
    }}
  />
);

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex" }}>
                {TILE}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              width: 92,
              height: 54,
              background: "linear-gradient(160deg, #f4f6f8 0%, #c9d0d8 100%)",
              transform: "skewX(-20deg)",
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
