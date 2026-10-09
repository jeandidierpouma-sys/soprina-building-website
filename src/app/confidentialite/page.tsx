import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Statut : IMPLEMENTED (corrige point 14 de l'audit post-mise en ligne du
// 2026-10-09). Décrit fidèlement le traitement réel des données tel
// qu'implémenté dans ce dépôt : formulaire de contact (route /api/contact)
// et, si activé via NEXT_PUBLIC_GA_ID, Google Analytics. Aucune donnée ni
// traitement non implémenté n'est décrit ici.
export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité — SOPRINA BUILDING",
  description:
    "Comment SOPRINA BUILDING traite les données transmises via le formulaire de contact et, si activé, via Google Analytics.",
  path: "/confidentialite",
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

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title="Politique de confidentialité"
        description="Ce que nous collectons, pourquoi, et comment vous pouvez nous contacter à ce sujet."
      />

      <section className="bg-white py-20">
        <div className="container-sb max-w-3xl">
          <Section title="Qui traite vos données">
            <p>
              SOPRINA BUILDING SARL, {CONTACT.address}, Cameroun, est
              responsable du traitement des données décrites ci-dessous.
              Contact : {CONTACT.email}.
            </p>
          </Section>

          <Section title="Formulaire de contact">
            <p>
              Lorsque vous utilisez le formulaire de contact ou de devis, les
              informations saisies (nom, e-mail, message) sont transmises par
              e-mail à SOPRINA BUILDING afin de répondre à votre demande.
              Elles ne sont ni revendues, ni utilisées à des fins publicitaires,
              ni conservées au-delà du temps nécessaire au traitement de votre
              demande.
            </p>
          </Section>

          <Section title="Mesure d'audience (Google Analytics)">
            <p>
              Lorsque la mesure d&apos;audience est activée sur ce site, nous
              utilisons Google Analytics pour comprendre, de façon agrégée et
              anonymisée, comment les visiteurs utilisent le site (pages
              consultées, provenance). Ce service peut déposer des cookies de
              mesure d&apos;audience sur votre navigateur. Vous pouvez vous
              opposer à ce suivi en configurant votre navigateur pour refuser
              les cookies, ou via un module de blocage de traceurs.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément à la réglementation applicable en matière de
              protection des données personnelles, vous disposez d&apos;un
              droit d&apos;accès, de rectification et de suppression des
              données vous concernant. Pour l&apos;exercer, contactez-nous à{" "}
              {CONTACT.email}.
            </p>
          </Section>

          <Section title="Hébergement des données">
            <p>
              Le site est hébergé par Vercel Inc. (États-Unis). Les e-mails
              envoyés via le formulaire de contact transitent, le cas échéant,
              par le service d&apos;envoi d&apos;e-mails utilisé par SOPRINA
              BUILDING pour traiter votre demande.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
