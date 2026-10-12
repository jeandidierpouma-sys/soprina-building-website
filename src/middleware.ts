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
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
  const isStudio = pathname === "/studio" || pathname.startsWith("/studio/");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-is-studio", isStudio ? "1" : "0");

  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Exclut les assets statiques, l'API et les fichiers (favicon, images, etc.)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.).*)"],
};
