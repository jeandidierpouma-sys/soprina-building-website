import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Image Open Graph / Twitter Card partagée par toutes les pages (convention
// App Router : un opengraph-image.tsx à la racine sert de fallback pour
// toute route qui n'en définit pas de spécifique — les 6 pages en profitent
// sans duplication). Statut : IMPLEMENTED.
export const alt = "SOPRINA BUILDING — Construction, ingénierie & facility solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const poppinsBold = readFileSync(
  join(
    process.cwd(),
    "node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff"
  )
);
const poppinsSemibold = readFileSync(
  join(
    process.cwd(),
    "node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff"
  )
);

// Logo réel (fourni par le client) encodé en data URI — remplace le losange
// dessiné à la main utilisé ici auparavant (faute d'un fichier logo
// exploitable à l'époque : le seul PNG disponible avait du texte et un fond
// non détourables, voir git blame). ImageResponse ne peut pas charger une
// URL externe de façon fiable, donc on lit le fichier au build comme pour
// les polices ci-dessus.
//
// Mise à jour 2026-10-13 : nouveau fichier source officiel (logo mis à jour
// par le client, incluant un détail flèche supplémentaire dans le chevron).
// Son ratio réel est 293:324 (≈0,904), différent de l'ancien mark (134:156,
// ≈0,859) — la largeur ci-dessous (46 au lieu de 44) est recalculée pour ce
// nouveau ratio à hauteur égale (51), afin de ne pas déformer l'image.
const logoMarkBase64 = readFileSync(
  join(process.cwd(), "public/images/brand/logo-mark.png")
).toString("base64");
const logoMarkSrc = `data:image/png;base64,${logoMarkBase64}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "linear-gradient(135deg, #0d2148 0%, #0a1a38 55%, #071328 100%)",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse (Satori) requires a plain <img>, not next/image */}
          <img src={logoMarkSrc} width={46} height={51} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 4,
              color: "#f0b23e",
              textTransform: "uppercase",
            }}
          >
            Soprina Building
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 900,
          }}
        >
          Construction, ingénierie &amp; facility solutions
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            maxWidth: 820,
          }}
        >
          De la conception à la livraison — Douala, Cameroun
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsSemibold, weight: 600, style: "normal" },
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
      ],
    }
  );
}
