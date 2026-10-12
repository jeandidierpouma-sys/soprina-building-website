import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Statut : PARTIAL/TESTED — PAS AUDITED. Traduction fidèle de la version FR
// (/confidentialite), qui reste la version de référence. Décrit les mêmes
// traitements réels (formulaire de contact, Google Analytics conditionnel)
// — aucun traitement supplémentaire inventé pour la version EN.
export const metadata: Metadata = pageMetadata({
  title: "Privacy policy — SOPRINA BUILDING",
  description:
    "How SOPRINA BUILDING handles data submitted through the contact form and, if enabled, through Google Analytics.",
  path: "/en/confidentialite",
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

export default function ConfidentialitePageEn() {
  return (
    <>
      <PageHero
        locale="en"
        eyebrow="Privacy"
        title="Privacy policy"
        description="What we collect, why, and how you can reach us about it."
      />

      <section className="bg-white py-20">
        <div className="container-sb max-w-3xl">
          <Section title="Who processes your data">
            <p>
              SOPRINA BUILDING SARL, {CONTACT.address}, Cameroon, is responsible
              for the processing of the data described below. Contact:{" "}
              {CONTACT.email}.
            </p>
          </Section>

          <Section title="Contact form">
            <p>
              When you use the contact or quote-request form, the information you
              enter (name, e-mail, message) is sent by e-mail to SOPRINA BUILDING
              in order to respond to your request. It is never resold, never used
              for advertising purposes, and is not kept beyond the time needed to
              process your request.
            </p>
          </Section>

          <Section title="Audience measurement (Google Analytics)">
            <p>
              When audience measurement is enabled on this site, we use Google
              Analytics to understand, in an aggregated and anonymized way, how
              visitors use the site (pages viewed, traffic sources). This service
              may place audience-measurement cookies in your browser. You can opt
              out of this tracking by configuring your browser to refuse cookies,
              or via a tracker-blocking extension.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              In accordance with applicable personal data protection regulations,
              you have the right to access, rectify and delete data concerning
              you. To exercise this right, contact us at {CONTACT.email}.
            </p>
          </Section>

          <Section title="Data hosting">
            <p>
              The site is hosted by Vercel Inc. (United States). E-mails sent via
              the contact form may pass, where applicable, through the e-mail
              delivery service used by SOPRINA BUILDING to process your request.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
