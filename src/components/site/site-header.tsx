"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT } from "@/lib/content";
import { NAV_LINKS_EN } from "@/lib/content.en";

const TEXT = {
  fr: { cta: "Demander un devis", openMenu: "Ouvrir le menu" },
  en: { cta: "Request a quote", openMenu: "Open menu" },
} as const;

// Calcule l'URL équivalente dans l'autre langue à partir du chemin courant,
// en préfixant/retirant simplement "/en" — pas de table de correspondance
// séparée à maintenir : les deux arborescences de pages partagent les mêmes
// segments d'URL (ex. /domaines ↔ /en/domaines).
function otherLocaleHref(pathname: string, locale: "fr" | "en") {
  if (locale === "en") {
    const stripped = pathname.replace(/^\/en/, "") || "/";
    return stripped;
  }
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

export function SiteHeader({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const pathname = usePathname();
  const links = locale === "en" ? NAV_LINKS_EN : NAV_LINKS;
  const t = TEXT[locale];
  const homeHref = locale === "en" ? "/en" : "/";
  const otherHref = otherLocaleHref(pathname, locale);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-sb-navy/95 backdrop-blur supports-[backdrop-filter]:bg-sb-navy/80">
      <div className="container-sb flex h-20 items-center justify-between">
        {/* Logo officiel du client. Mark seul (carte blanche, nécessaire :
            le mark posé directement sur le marine perd son contour à cette
            échelle — vérifié par rendu), sans le nom en toutes lettres ici :
            la barre desktop (8 liens + tél. + FR/EN + CTA) tient déjà tout
            juste dans max-w-7xl (voir le correctif de dépassement 1280-1495
            plus bas) — y ajouter "SOPRINA BUILDING" en texte, même réduit,
            recolle le logo au premier lien de nav à partir de 2xl (mesuré :
            écart nul, testé jusqu'à 1920px). Le nom complet reste affiché en
            texte HTML (net à toute taille, pas en image) dans le menu
            mobile et le footer, qui ont la place. Pourquoi pas une image
            unique mark+nom comme avant : le lockup complet devenait
            illisible une fois réduit à la taille réelle d'affichage
            (~172×72px à 2x) — vérifié par rendu à cette taille exacte le
            2026-10-13, confirmé avec DESH. Voir claude/brand-logo.md. */}
        <Link
          href={homeHref}
          className="focus-ring flex shrink-0 items-center"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
            <Image
              src="/images/brand/logo-mark.png"
              alt="SOPRINA BUILDING"
              width={185}
              height={204}
              className="h-full w-auto"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-3 xl:flex xl:gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring whitespace-nowrap text-sm font-medium text-white/85 transition-colors hover:text-sb-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          {/* Numéro affiché en icône seule (texte retiré le 2026-10-13, à la
              demande du client, pour aérer la barre). Le lien tel: reste
              cliquable et accessible (aria-label porte le numéro complet) ;
              le numéro en toutes lettres reste visible dans le menu mobile,
              le footer et /contact. Ceci rend aussi obsolète l'ancien
              correctif de dépassement 1280–1495px (le texte ne s'affichait
              qu'à partir de 2xl) : plus de risque de dépassement ici. */}
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
            aria-label={`${locale === "fr" ? "Appeler" : "Call"} ${CONTACT.phones[0]}`}
            className="focus-ring flex items-center text-white/85 hover:text-sb-gold"
          >
            <PhoneCall className="size-4 shrink-0 text-sb-gold" />
          </a>
          <Link
            href={otherHref}
            className="focus-ring shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-white/75 transition-colors hover:border-sb-gold/50 hover:text-sb-gold"
            aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </Link>
          <Button asChild size="sm">
            <Link href={locale === "en" ? "/en/devis" : "/devis"}>{t.cta}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="focus-ring flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden"
              aria-label={t.openMenu}
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-2.5 pb-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
                <Image
                  src="/images/brand/logo-mark.png"
                  alt="SOPRINA BUILDING"
                  width={185}
                  height={204}
                  className="h-full w-auto"
                />
              </span>
              <span aria-hidden="true" className="text-base font-bold tracking-wide text-white">
                SOPRINA <span className="text-sb-gold">BUILDING</span>
              </span>
            </div>
            <nav className="flex flex-col gap-5">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring text-lg font-medium text-white/90 hover:text-sb-gold"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                className="focus-ring flex items-center gap-2 text-sm text-white/85"
              >
                <PhoneCall className="size-4 text-sb-gold" />
                {CONTACT.phones[0]}
              </a>
              <SheetClose asChild>
                <Link
                  href={otherHref}
                  className="focus-ring self-start rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-white/75"
                >
                  {locale === "fr" ? "EN" : "FR"}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link href={locale === "en" ? "/en/devis" : "/devis"}>{t.cta}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
