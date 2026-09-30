import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MotionProvider } from "@/components/site/motion-provider";
import { CONTACT, SOCIALS } from "@/lib/content";

// NOTE : nom de domaine PLACEHOLDER (STUB) — aucun domaine n'a encore été
// acheté (voir étude de faisabilité, section coûts/domaine). À remplacer
// par le domaine réel dès son acquisition ; d'ici là, metadataBase sert
// uniquement à générer des URLs absolues valides pour Open Graph/Twitter.
const SITE_URL = "https://www.soprinabuilding.cm";
const SITE_NAME = "SOPRINA BUILDING";
const SITE_TITLE =
  "SOPRINA BUILDING — Construction, ingénierie & facility solutions";
const SITE_DESCRIPTION =
  "SOPRINA BUILDING accompagne ses clients dans la réalisation de projets de construction performants, de la conception à la livraison — Douala, Cameroun.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "SOPRINA BUILDING",
    "construction Cameroun",
    "génie civil Douala",
    "bâtiment industriel",
    "smart building Afrique centrale",
    "climatisation froid Cameroun",
    "maintenance facility solutions",
    "entreprise BTP Douala",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Données structurées JSON-LD (schema.org GeneralContractor / LocalBusiness).
// Statut : IMPLEMENTED, à partir des seules coordonnées réellement fournies
// (CONTACT/SOCIALS dans lib/content.ts) — l'adresse texte du dépliant est
// structurée en PostalAddress ; aucune donnée inventée (pas de géo-coordonnées
// exactes). sameAs : profils réseaux sociaux réels fournis par le client.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/images/p1_logo.png`,
  image: `${SITE_URL}/images/p1_hero_top.jpg`,
  email: CONTACT.email,
  telephone: CONTACT.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bonanjo, près de Kenya Airways",
    addressLocality: "Douala",
    addressRegion: "Littoral",
    addressCountry: "CM",
  },
  areaServed: "Afrique centrale",
  sameAs: SOCIALS.map((s) => s.href),
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
