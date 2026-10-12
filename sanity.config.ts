"use client";

/**
 * Configuration du Studio Sanity embarqué sur /studio (src/app/studio).
 *
 * Décision (2026-10-10) : Studio embarqué dans l'app Next plutôt que
 * déployé séparément sur <projet>.sanity.studio — même domaine, même
 * déploiement Vercel, pas de CORS/auth supplémentaire à gérer, cohérent
 * avec la convention "pas de service externe non nécessaire" déjà suivie
 * sur ce projet (cf. social-icons.tsx). `sanity.cli.ts` reste présent pour
 * permettre `npx sanity deploy` plus tard si le client préfère malgré tout
 * un Studio sur son propre sous-domaine.
 *
 * Statut : CONTRACT_ONLY tant que NEXT_PUBLIC_SANITY_PROJECT_ID n'est pas
 * défini — /studio affiche un message de configuration au lieu de planter
 * (cf. src/app/studio/[[...tool]]/page.tsx).
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "soprina-building",
  title: "SOPRINA BUILDING — CMS",
  projectId: projectId || "missing-project-id",
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
