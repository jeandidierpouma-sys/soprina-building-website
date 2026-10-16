import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Détection de langue par préfixe d'URL — AUCUNE réécriture ni redirection :
// /en/... reste /en/... (route réelle de l'arborescence /en créée en
// parallèle de l'arborescence FR existante). Ce middleware se contente de
// transmettre la langue détectée via un header interne, lu ensuite par
// RootLayout (src/app/layout.tsx) pour poser <html lang="en"> plutôt que
// <html lang="fr"> — rien d'autre ne dépend de ce header pour l'instant.
// Statut : IMPLEMENTED.
//
// x-is-studio (ajouté avec le CMS Sanity, 2026-10-10) : signale à
// RootLayout qu'on est sur /studio afin qu'il n'y monte pas le header, le
// footer et le widget WhatsApp du site public — le Studio Sanity a besoin
// de tout le viewport, pas du chrome commercial du site.
//
// Mode maintenance ("site en travaux", ajouté le 2026-10-16 à la demande
// explicite de DESH). Piloté UNIQUEMENT par la variable d'environnement
// serveur MAINTENANCE_MODE (jamais NEXT_PUBLIC : un visiteur ne peut pas la
// lire ni la changer). MAINTENANCE_MODE="true" → tout le site public est
// basculé vers /maintenance (ou /en/maintenance selon la langue détectée)
// par REWRITE, jamais par redirection : l'URL visitée reste affichée dans
// la barre d'adresse, donc aucun lien cassé et aucune chaîne de
// redirection une fois la maintenance levée (MAINTENANCE_MODE retiré/à
// "false"). X-Robots-Tag: noindex, nofollow posé sur la réponse basculée
// pour ne pas laisser Google indexer la page de travaux à la place des
// vraies pages (cf. priorité SEO du brief projet).
// Exclusions :
//  - /studio : jamais basculé. L'équipe doit pouvoir continuer à alimenter
//    le CMS Sanity (contenu, actualités, réalisations) pendant que le site
//    public est en travaux — ce sont deux préoccupations séparées.
//  - /maintenance et /en/maintenance : jamais re-basculés sur eux-mêmes.
//  - Bypass preview : ?preview=<MAINTENANCE_BYPASS_TOKEN> (variable
//    d'environnement serveur distincte) pose un cookie httpOnly sb_bypass
//    valable 7 jours, qui laisse passer le vrai site pour ce visiteur —
//    permet à DESH/l'équipe de vérifier l'avancement sans désactiver la
//    maintenance pour le public. Sans MAINTENANCE_BYPASS_TOKEN défini, ce
//    bypass est désactivé (aucune valeur de ?preview= ne peut matcher
//    undefined).
// Statut : IMPLEMENTED, TESTED — voir claude/decisions-validees.md.
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
const BYPASS_COOKIE = "sb_bypass";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");
  const isMaintenancePath =
    pathname === "/maintenance" || pathname === "/en/maintenance";

  const bypassToken = process.env.MAINTENANCE_BYPASS_TOKEN;
  const previewParam = searchParams.get("preview");
  const hasBypassCookie = request.cookies.get(BYPASS_COOKIE)?.value === "1";
  const grantsBypass =
    !hasBypassCookie && Boolean(bypassToken) && previewParam === bypassToken;
  const bypassed = hasBypassCookie || grantsBypass;

  const servingMaintenance = MAINTENANCE_MODE && !isStudio && !bypassed;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-is-studio", isStudio ? "1" : "0");
  requestHeaders.set(
    "x-is-maintenance",
    servingMaintenance || isMaintenancePath ? "1" : "0"
  );

  let response: NextResponse;
  if (servingMaintenance && !isMaintenancePath) {
    const maintenanceUrl = new URL(
      locale === "en" ? "/en/maintenance" : "/maintenance",
      request.url
    );
    response = NextResponse.rewrite(maintenanceUrl, {
      request: { headers: requestHeaders },
    });
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (grantsBypass) {
    response.cookies.set(BYPASS_COOKIE, "1", {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  return response;
}

// Exclut les assets statiques, l'API et les fichiers (favicon, images, etc.)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)"],
};
