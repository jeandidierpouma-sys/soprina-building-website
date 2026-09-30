import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, NAV_LINKS, SOCIALS } from "@/lib/content";
import { Separator } from "@/components/ui/separator";
import { SOCIAL_ICONS } from "@/components/site/social-icons";

export function SiteFooter() {
  return (
    <footer className="bg-sb-navy-deep text-white/80">
      <div className="container-sb grid gap-10 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image
            src="/images/p1_logo.png"
            alt="SOPRINA BUILDING"
            width={220}
            height={126}
            className="mb-5 h-12 w-auto rounded-md"
          />
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            SOPRINA BUILDING accompagne ses clients dans la réalisation de
            projets de construction performants, de la conception à la
            livraison.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`SOPRINA BUILDING sur ${s.name}`}
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
            Navigation
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((link) => (
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
            Contact
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
        <span>© {new Date().getFullYear()} SOPRINA BUILDING. Tous droits réservés.</span>
        <span>Douala – Bonanjo, Cameroun</span>
      </div>
    </footer>
  );
}
