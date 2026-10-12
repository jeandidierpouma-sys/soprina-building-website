import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

import { LandingHero } from "@/components/sections/landing-hero";
import { DomainsPreview } from "@/components/sections/domains-preview";
import { SectorsStrip } from "@/components/sections/sectors-strip";
import { MethodPreview } from "@/components/sections/method-preview";
import { WhyUs } from "@/components/sections/why-us";
import { Faq } from "@/components/sections/faq";
import { ContactForm } from "@/components/forms/contact-form";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Request your quote — SOPRINA BUILDING",
  description:
    "Describe your construction, fit-out, electrical, air conditioning or maintenance project in Douala. SOPRINA BUILDING will propose a tailored solution.",
  path: "/en/devis",
});

export default function DevisPageEn() {
  return (
    <>
      <LandingHero locale="en" />
      <DomainsPreview locale="en" />
      <SectorsStrip locale="en" />
      <MethodPreview locale="en" />
      <WhyUs locale="en" />
      <Faq locale="en" />

      <section id="devis-form" className="bg-white py-24">
        <div className="container-sb grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <Reveal direction="left">
            <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
              Describe your project
            </h2>
            <p className="mt-4 text-sb-body">
              Fill in the form and we'll get back to you to discuss your
              needs. You can also contact us directly.
            </p>

            <div className="mt-8 flex flex-col gap-4 text-sm">
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                className="focus-ring flex items-center gap-3 font-medium text-sb-navy hover:text-sb-gold"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                  <Phone className="size-4" />
                </span>
                {CONTACT.phones[0]}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex items-center gap-3 font-medium text-sb-navy hover:text-sb-gold"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                  <MessageCircle className="size-4" />
                </span>
                WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="focus-ring flex items-center gap-3 font-medium text-sb-navy hover:text-sb-gold"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                  <Mail className="size-4" />
                </span>
                {CONTACT.email}
              </a>
              <div className="flex items-center gap-3 font-medium text-sb-navy">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                  <MapPin className="size-4" />
                </span>
                {CONTACT.address}
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.1}
            className="rounded-2xl border border-sb-grayline bg-muted p-6 sm:p-8"
          >
            <ContactForm locale="en" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
