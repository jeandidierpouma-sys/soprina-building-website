import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Statut : PARTIAL/TESTED — PAS AUDITED. Traduction fidèle de la version FR
// (seule version juridiquement engageante, validée par SOPRINA BUILDING le
// 2026-10-09), mais les termes juridiques camerounais (RCCM, NIU, SARL)
// n'ont pas d'équivalent anglais officiel : ils sont ici conservés tels
// quels avec une brève explicitation entre parenthèses plutôt que
// "traduits" — à faire valider par un professionnel du droit avant toute
// publication présentée comme juridiquement opposable en anglais.
export const metadata: Metadata = pageMetadata({
  title: "Legal notice — SOPRINA BUILDING",
  description:
    "Legal notice for SOPRINA BUILDING: site publisher, hosting, intellectual property and terms of access.",
  path: "/en/mentions-legales",
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-sb-grayline py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-sb-navy">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 leading-relaxed text-sb-body">
        {children}
      </div>
    </div>
  );
}

export default function MentionsLegalesPageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Legal notice"
        title="Legal notice"
        description="Information regarding the publication and hosting of the soprinabuilding.com site."
      />

      <section className="bg-white py-20">
        <div className="container-sb max-w-3xl">
          <p className="mb-8 rounded-xl border border-sb-grayline bg-muted px-4 py-3 text-sm text-sb-body">
            This English page is a translation provided for convenience. The{" "}
            <a href="/mentions-legales" className="focus-ring underline underline-offset-2 hover:text-sb-navy">
              French version
            </a>{" "}
            is the sole legally binding version.
          </p>

          <Section title="Site publisher">
            <p>
              This site is published by <strong>SOPRINA BUILDING SARL</strong>, a
              limited liability company (SARL) incorporated under Cameroonian law.
            </p>
            <p>Registered office: {CONTACT.address}, Cameroon.</p>
            <p>
              Share capital: <em>10,000,000 FCFA</em>.
            </p>
            <p>
              Trade and Personal Property Credit Register number (RCCM):{" "}
              <em>RC/DLA/2022/B/4981</em>.
            </p>
            <p>
              Taxpayer identification number (NIU): <em>M092217595910L</em>.
            </p>
            <p>
              Legal representative (manager): <em>DJAMPA NANKAP DANY MERVEILLE</em>.
            </p>
            <p>
              Contact: {CONTACT.email} — {CONTACT.phones[0]}.
            </p>
          </Section>

          <Section title="Hosting">
            <p>
              The site is hosted by <strong>Vercel Inc.</strong>, San Francisco,
              California, United States —{" "}
              <a
                href="https://vercel.com/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring text-sb-navy underline underline-offset-2 hover:text-sb-gold"
              >
                vercel.com/legal
              </a>
              .
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              All content on this site (text, photographs, logo, layout) is the
              property of SOPRINA BUILDING SARL, unless otherwise stated, and may
              not be reproduced, distributed or reused without prior written
              authorization.
            </p>
          </Section>

          <Section title="Liability">
            <p>
              SOPRINA BUILDING strives to ensure the accuracy and currency of the
              information published on this site, without being able to guarantee
              the absence of errors or omissions. Use of the information on this
              site is at the user's own risk.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For any question regarding this legal notice, contact SOPRINA
              BUILDING at {CONTACT.email}.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
