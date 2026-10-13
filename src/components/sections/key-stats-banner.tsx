import { Reveal } from "@/components/motion/reveal";

// Bandeau "chiffres clés" — statut : IMPLEMENTED (code), MISSING en données
// — ET NON INTÉGRÉ À AUCUNE PAGE pour l'instant, volontairement.
//
// Pourquoi ce composant n'est pas encore branché sur la page d'accueil :
// je n'ai aucun chiffre réel vérifié (projets livrés, m² construits,
// années d'expérience, clients satisfaits...). Afficher des chiffres
// plausibles mais inventés sur un site en production serait une donnée
// fabriquée présentée comme un fait à de vrais visiteurs — strictement
// interdit par le protocole du projet. Ce composant est donc un squelette
// prêt à l'emploi : aucun nombre par défaut n'existe (les props `stats`
// sont obligatoires, sans valeur de repli), donc il ne peut pas être rendu
// par erreur avec des données inventées.
//
// Pour l'activer une fois les chiffres validés par SOPRINA BUILDING :
// 1. Ajouter les 3-4 chiffres réels dans content.ts (ex. KEY_STATS).
// 2. Importer <KeyStatsBanner stats={KEY_STATS} /> dans src/app/page.tsx
//    (et src/app/en/page.tsx avec la version anglaise des libellés),
//    par exemple juste après le hero ou juste avant la section "Pourquoi
//    nous choisir".

export type KeyStat = {
  value: string;
  label: string;
};

export function KeyStatsBanner({ stats }: { stats: readonly KeyStat[] }) {
  return (
    <section className="border-y border-sb-grayline bg-white py-12">
      <div className="container-sb grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="text-3xl font-extrabold text-sb-navy sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm text-sb-body">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
