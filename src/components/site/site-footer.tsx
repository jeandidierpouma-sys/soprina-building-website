import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/content";
import { NAV_LINKS_EN } from "@/lib/content.en";
import { Separator } from "@/components/ui/separator";
import { SOCIAL_ICONS } from "@/components/site/social-icons";

const TEXT = {
  fr: {
    intro:
      "SOPRINA BUILDING accompagne ses clients dans la réalisation de projets de construction performants, de la conception à la livraison.",
    nav: "Navigation",
    contact: "Contact",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    socialLabel: (name: string) => `SOPRINA BUILDING sur ${name}`,
    legalHref: "/mentions-legales",
    privacyHref: "/confidentialite",
  },
  en: {
    intro:
      "SOPRINA BUILDING supports its clients in delivering high-performing construction projects, from design through to handover.",
    nav: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy",
    socialLabel: (name: string) => `SOPRINA BUILDING on ${name}`,
    legalHref: "/en/mentions-legales",
    privacyHref: "/en/confidentialite",
  },
} as const;

export function SiteFooter({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const links = locale === "en" ? NAV_LINKS_EN : NAV_LINKS;
  const t = TEXT[locale];

  return (
    <footer className="bg-sb-navy-deep text-white/80">
      <div className="container-sb grid gap-10 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          {/* Mark seul (carte blanche) + nom en texte HTML — voir le
              commentaire détaillé dans site-header.tsx. */}
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
              <Image
                src="/images/brand/logo-mark.png"
                alt="SOPRINA BUILDING"
                width={185}
                height={204}
                className="h-full w-auto"
              />
            </span>
            <span aria-hidden="true" className="text-lg font-bold tracking-wide text-white">
              SOPRINA <span className="text-sb-gold">BUILDING</span>
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">{t.intro}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.socialLabel(s.name)}
                  className="focus-ring flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-sb-gold/50 hover:text-sb-gold"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-sb-gold">
            {t.nav}
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring hover:text-sb-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-sb-gold">
            {t.contact}
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sb-gold" />
              <span>{CONTACT.address}</span>
            </li>
            {CONTACT.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-sb-gold" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="focus-ring hover:text-sb-gold">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-sb-gold" />
              <a href={`mailto:${CONTACT.email}`} className="focus-ring hover:text-sb-gold">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="container-sb flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
        <span>© {new Date().getFullYear()} SOPRINA BUILDING. {t.rights}</span>
        <div className="flex items-center gap-4">
          <Link href={t.legalHref} className="focus-ring hover:text-sb-gold">
            {t.legal}
          </Link>
          <Link href={t.privacyHref} className="focus-ring hover:text-sb-gold">
            {t.privacy}
          </Link>
        </div>
        <span>Douala – Bonanjo, Cameroun</span>
      </div>
    </footer>
  );
}
