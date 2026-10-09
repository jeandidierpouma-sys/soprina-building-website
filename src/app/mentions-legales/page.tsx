import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { CONTACT } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

// Statut : TERMINÉ (corrige point 15 de l'audit post-mise en ligne du
// 2026-10-09). RCCM, capital social, NIU et gérant fournis par
// SOPRINA BUILDING le 2026-10-09 — page juridiquement complète.
export const metadata: Metadata = pageMetadata({
  title: "Mentions légales — SOPRINA BUILDING",
  description:
    "Mentions légales de SOPRINA BUILDING : édition du site, hébergement, propriété intellectuelle et conditions d'accès.",
  path: "/mentions-legales",
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

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mentions légales"
        title="Mentions légales"
        description="Informations relatives à l'édition et à l'hébergement du site soprinabuilding.com."
      />

      <section className="bg-white py-20">
        <div className="container-sb max-w-3xl">
          <Section title="Éditeur du site">
            <p>
              Le présent site est édité par <strong>SOPRINA BUILDING SARL</strong>
              , société à responsabilité limitée de droit camerounais.
            </p>
            <p>Siège social : {CONTACT.address}, Cameroun.</p>
            <p>
              Capital social : <em>10 000 000 FCFA</em>.
            </p>
            <p>
              Numéro RCCM : <em>RC/DLA/2022/B/4981</em>.
            </p>
            <p>
              Numéro de contribuable (NIU) :{" "}
              <em>M092217595910L</em>.
            </p>
            <p>
              Représentant légal (gérant) :{" "}
              <em>DJAMPA NANKAP DANY MERVEILLE</em>.
            </p>
            <p>
              Contact : {CONTACT.email} — {CONTACT.phones[0]}.
            </p>
          </Section>

          <Section title="Hébergement">
            <p>
              Le site est hébergé par <strong>Vercel Inc.</strong>, San
              Francisco, Californie, États-Unis —{" "}
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

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes,
              photographies, logo, mise en page) est la propriété de SOPRINA
              BUILDING SARL, sauf mention contraire, et ne peut être reproduit,
              distribué ou réutilisé sans autorisation écrite préalable.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              SOPRINA BUILDING s&apos;efforce d&apos;assurer l&apos;exactitude
              et la mise à jour des informations diffusées sur ce site, sans
              toutefois pouvoir garantir l&apos;absence d&apos;erreur ou
              d&apos;omission. L&apos;utilisation des informations du site se
              fait sous la seule responsabilité de l&apos;utilisateur.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative à ces mentions légales, contactez
              SOPRINA BUILDING à l&apos;adresse {CONTACT.email}.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
