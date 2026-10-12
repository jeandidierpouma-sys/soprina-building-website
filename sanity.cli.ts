import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "@/sanity/env";

// Nécessaire uniquement pour les commandes `npx sanity ...` exécutées en
// local (ex. `sanity schema extract`, ou `sanity deploy` si le client
// préfère un Studio hébergé séparément — voir sanity.config.ts). Le Studio
// embarqué sur /studio (utilisé par défaut) ne passe pas par ce fichier.
export default defineCliConfig({
  api: { projectId: projectId || "missing-project-id", dataset },
});
