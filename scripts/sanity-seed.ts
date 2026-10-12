/**
 * Migration ponctuelle des 4 réalisations codées en dur
 * (src/lib/content.ts → REALISATIONS / REALISATIONS_EN) vers Sanity,
 * comme documents `project`.
 *
 * NE REMPLACE RIEN tant que /realisations n'est pas migré vers Sanity
 * (décision volontairement reportée — voir claude/lot3-version-anglaise.md,
 * "Phase 1b") : ce script prépare seulement les données dans le Studio,
 * pour que l'équipe SOPRINA BUILDING puisse les retrouver, les compléter
 * (client, surface, budget...) et en ajouter de nouvelles sans attendre
 * cette migration.
 *
 * Prérequis avant exécution :
 *   1. NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET définis
 *      (.env.local ou export shell).
 *   2. SANITY_API_WRITE_TOKEN défini — un jeton distinct de
 *      SANITY_API_READ_TOKEN, avec permission "Editor" (Sanity Manage →
 *      API → Tokens). Jamais commité, jamais réutilisé pour la lecture
 *      côté site public.
 *
 * Exécution : npm run sanity:seed
 *
 * Statut : IMPLEMENTED, NON EXÉCUTÉ (aucun projet Sanity réel au moment de
 * cette livraison — voir note de projet pour les variables manquantes).
 * Le script est idempotent par slug : relancé plusieurs fois, il met à
 * jour les documents existants (createOrReplace) plutôt que de dupliquer.
 */
import { createClient } from "next-sanity";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "[sanity-seed] NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN " +
      "doivent être définis avant d'exécuter ce script. Voir le commentaire " +
      "en tête de scripts/sanity-seed.ts.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  token,
  useCdn: false,
});

// Copie volontairement en dur (pas d'import de src/lib/content.ts) : ce
// script est un instantané ponctuel de migration, pas une dépendance
// durable au code du site — s'il tourne après que content.ts ait changé,
// on veut la donnée telle qu'elle était au moment de la décision "CMS-
// Sanity" (2026-10-10), pas une version qui aurait dérivé depuis.
const REALISATIONS = [
  {
    slug: "villa-contemporaine",
    title_fr: "Villa contemporaine",
    title_en: "Contemporary villa",
    category_fr: "Construction & Génie Civil",
    category_en: "Construction & Civil Engineering",
    img: "projet-01-villa-contemporaine.jpg",
  },
  {
    slug: "amenagement-cuisine",
    title_fr: "Aménagement intérieur — cuisine & séjour",
    title_en: "Interior fit-out — kitchen & living room",
    category_fr: "Aménagement & Rénovation",
    category_en: "Fit-Out & Renovation",
    img: "projet-02-amenagement-cuisine.jpg",
  },
  {
    slug: "villa-piscine",
    title_fr: "Villa avec piscine",
    title_en: "Villa with pool",
    category_fr: "Construction & Génie Civil",
    category_en: "Construction & Civil Engineering",
    img: "projet-03-villa-piscine.jpg",
  },
  {
    slug: "chantier-genie-civil",
    title_fr: "Chantier en cours",
    title_en: "Site in progress",
    category_fr: "Construction & Génie Civil",
    category_en: "Construction & Civil Engineering",
    img: "projet-04-chantier-genie-civil.jpg",
  },
];

async function uploadImage(filename: string) {
  const filePath = join(process.cwd(), "public/images/realisations", filename);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

async function main() {
  for (const [index, item] of REALISATIONS.entries()) {
    console.log(`[sanity-seed] ${item.slug}: upload image…`);
    const imageAssetId = await uploadImage(item.img);

    console.log(`[sanity-seed] ${item.slug}: createOrReplace document…`);
    await client.createOrReplace({
      _id: `project-${item.slug}`,
      _type: "project",
      title_fr: item.title_fr,
      title_en: item.title_en,
      slug: { _type: "slug", current: item.slug },
      category_fr: item.category_fr,
      category_en: item.category_en,
      mainImage: { _type: "image", asset: { _type: "reference", _ref: imageAssetId } },
      order: index + 1,
    });
  }
  console.log(`[sanity-seed] Terminé — ${REALISATIONS.length} projet(s) migré(s).`);
}

main().catch((err) => {
  console.error("[sanity-seed] Échec :", err);
  process.exit(1);
});
