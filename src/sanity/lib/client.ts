import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "@/sanity/env";

// Client Sanity côté serveur. `null` tant que NEXT_PUBLIC_SANITY_PROJECT_ID
// n'est pas défini (pas de projet client existant pour l'instant — cf. le
// brief du site, décision "CMS- Sanity" du 2026-10-10 : le projet Sanity
// doit être créé par le client lui-même, sous son propre compte, je ne
// peux pas le créer à sa place). Chaque appelant doit vérifier `client`
// avant de l'utiliser.
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: readToken,
      // useCdn=false côté serveur : on préfère une donnée toujours à jour
      // (le site est déjà en rendu dynamique `ƒ` depuis l'ajout de
      // headers() au layout racine pour l'i18n — cf. note de projet
      // claude/lot3-version-anglaise.md, VERSION A — donc ce choix n'ajoute
      // pas de coût de fraîcheur supplémentaire).
      useCdn: false,
      perspective: "published",
    })
  : null;
