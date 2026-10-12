// Variables d'environnement Sanity — jamais de clé en dur dans le code.
//
// NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET sont publiques
// par construction (elles circulent côté client dans next-sanity / le
// Studio embarqué) : ce ne sont pas des secrets, au même titre qu'un
// identifiant Firebase. SANITY_API_READ_TOKEN, lui, est un vrai secret :
// jamais préfixé NEXT_PUBLIC_, donc jamais exposé au bundle frontend ni au
// dépôt — à définir uniquement dans les variables d'environnement Vercel
// (cf. brief : "Ne jamais exposer de secret dans le code frontend ou dans
// le dépôt public"). Il n'est requis que si le dataset Sanity est privé
// (recommandé) ; en dataset public il peut rester vide.
//
// Statut : CONTRACT_ONLY tant que ces variables ne sont pas renseignées —
// isConfigured() le signale, et chaque appelant (pages /actualites,
// /studio, future migration /realisations) doit vérifier ce flag et
// afficher un état de repli plutôt que de planter.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Date de figeage de l'API Sanity (convention du SDK, sans rapport avec la
// date du jour) — fige le comportement de requête pour éviter des
// changements de schéma d'API non maîtrisés en production.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

// Token de lecture serveur (optionnel, requis seulement si dataset privé).
// Jamais NEXT_PUBLIC_ : disponible uniquement côté serveur (Server
// Components, route handlers), jamais dans le bundle client.
export const readToken = process.env.SANITY_API_READ_TOKEN;

export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}
