import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { WhatsappIcon } from "@/components/site/social-icons";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Contact — SOPRINA BUILDING",
  description:
    "Contact SOPRINA BUILDING about your construction, renovation, equipment or maintenance project — Douala, Bonanjo.",
  path: "/en/contact",
});

// Carte OpenStreetMap en iframe : identique à la version FR (mêmes
// coordonnées, pas de clé API requise) — seul le `title` change de langue.
const OSM_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=9.6850%2C4.0430%2C9.7150%2C4.0630&layer=mapnik&marker=4.0530%2C9.7000";

export default function ContactPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Contact"
        title="Contact us about your project"
        description="Whether it's construction, renovation, equipment or infrastructure, SOPRINA BUILDING is your trusted partner."
        bgImage="/images/p18_photo.jpg"
      />

      <section className="bg-white py-20">
        <div className="container-sb grid gap-14 lg:grid-cols-5">
          <Reveal direction="left" className="lg:col-span-2">
            <h2 className="text-xl font-bold text-sb-navy">Our contact details</h2>

            <div className="mt-6 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy/5 text-sb-navy">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-sb-navy">Address</p>
                  <p className="text-sm text-sb-body">{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy/5 text-sb-navy">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-sb-navy">Phone</p>
                  {CONTACT.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="focus-ring block text-sm text-sb-body hover:text-sb-navy"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy/5 text-sb-navy">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-sb-navy">E-mail</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="focus-ring text-sm text-sb-body hover:text-sb-navy"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy/5 text-sb-navy">
                  <WhatsappIcon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-sb-navy">WhatsApp</p>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm text-sb-body hover:text-sb-navy"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 aspect-square w-full overflow-hidden rounded-2xl border border-sb-grayline">
              <iframe
                title="SOPRINA BUILDING location — Douala, Bonanjo"
                src={OSM_EMBED_SRC}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.1}
            className="rounded-3xl border border-sb-grayline bg-white p-8 shadow-sm lg:col-span-3"
          >
            <ContactForm locale="en" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
