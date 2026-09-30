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
          <div
            style={{
              display: "flex",
              width: 30,
              height: 30,
              transform: "rotate(45deg)",
              background:
                "linear-gradient(135deg, #f7c968 0%, #f0b23e 55%, #c98a1f 100%)",
              borderRadius: 6,
            }}
          />
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
