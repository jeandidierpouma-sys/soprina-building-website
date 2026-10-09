import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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

// Domaine réel SOPRINA BUILDING, acheté et connecté sur Vercel (DNS LWS).
// Anciennement un stub .cm (placeholder avant achat) — corrigé le 2026-10-09
// (audit post-mise en ligne, point 11/20) : toutes les URLs absolues
// (metadataBase, Open Graph, Twitter, JSON-LD) utilisaient encore le mauvais
// domaine, cassant les aperçus de partage, robots.txt et sitemap.xml.
const SITE_URL = "https://www.soprinabuilding.com";
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
  // Point 19 (Search Console) : prêt à recevoir le code de vérification
  // "balise HTML" fourni par Google une fois la propriété ajoutée sur
  // search.google.com/search-console — variable GOOGLE_SITE_VERIFICATION
  // dans Vercel. Tant qu'elle est absente, aucune balise n'est émise.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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

// Statut : IMPLEMENTED côté code, CONTRACT_ONLY tant que NEXT_PUBLIC_GA_ID
// n'est pas défini dans les variables d'environnement Vercel (corrige
// point 18 de l'audit post-mise en ligne du 2026-10-09). Pour activer :
// Project Settings → Environment Variables → NEXT_PUBLIC_GA_ID = G-XXXXXXX
// (identifiant de mesure GA4), puis redéployer. Sans cette variable, le
// composant ne s'affiche pas et n'alourdit pas le site inutilement.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
