import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/content";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-sb-navy-deep-2 py-24">
      <Image
        src="/images/p17_photo2.jpg"
        alt=""
        fill
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sb-navy-deep-2 via-sb-navy-deep-2/90 to-transparent" />

      <div className="container-sb relative z-10">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            Votre projet mérite un partenaire à la hauteur
          </h2>
          <p className="mt-4 text-white/70">
            Qu&apos;il s&apos;agisse de construction, rénovation, équipements
            ou infrastructures, SOPRINA BUILDING est votre partenaire de
            confiance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contactez-nous pour votre projet</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-3 text-sm text-white/70 sm:flex-row sm:gap-8">
            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
              className="focus-ring flex items-center gap-2 hover:text-sb-gold"
            >
              <Phone className="size-4 text-sb-gold" />
              {CONTACT.phones[0]}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="focus-ring flex items-center gap-2 hover:text-sb-gold"
            >
              <Mail className="size-4 text-sb-gold" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
