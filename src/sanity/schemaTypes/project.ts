import { defineField, defineType } from "sanity";

// Les 7 domaines d'expertise (src/lib/content.ts → DOMAINS / DOMAINS_EN).
// Dupliqués ici en dur plutôt qu'importés : les fichiers de schéma Sanity
// doivent rester compilables aussi bien par le bundler Next (Studio
// embarqué sur /studio) que par le bundler Vite autonome de `sanity
// deploy`/`sanity build`, qui ne connaît pas l'alias tsconfig "@/*". Les 7
// domaines changent rarement (contrairement aux réalisations) — en cas de
// renommage, mettre à jour cette liste en même temps que content.ts.
const CATEGORY_OPTIONS_FR = [
  "Construction & Génie Civil",
  "Aménagement & Rénovation",
  "Électricité & Énergie",
  "Smart Building & Sécurité",
  "Climatisation & Froid",
  "Maintenance & Facility Solutions",
  "Fourniture de matériaux et équipements professionnels",
];
const CATEGORY_OPTIONS_EN = [
  "Construction & Civil Engineering",
  "Fit-Out & Renovation",
  "Electricity & Power",
  "Smart Building & Security",
  "Air Conditioning & Cold Rooms",
  "Maintenance & Facility Solutions",
  "Professional Materials & Equipment Supply",
];

// Réalisation / projet — contenu destiné à /realisations (et à son aperçu
// sur l'accueil). Statut : IMPLEMENTED (schéma) — migration des données
// codées en dur (src/lib/content.ts → REALISATIONS) non faite : voir
// scripts/sanity-seed.ts et la note de projet pour la marche à suivre.
export const projectType = defineType({
  name: "project",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({
      name: "title_fr",
      title: "Titre (français)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Titre (anglais)",
      type: "string",
      description:
        "Laisser vide pour masquer ce projet sur la version anglaise du site.",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title_fr", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category_fr",
      title: "Domaine (français)",
      type: "string",
      options: { list: CATEGORY_OPTIONS_FR },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category_en",
      title: "Domaine (anglais)",
      type: "string",
      options: { list: CATEGORY_OPTIONS_EN },
    }),
    defineField({
      name: "mainImage",
      title: "Photo principale",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie (avant/après, étapes du chantier)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "video",
      title: "Vidéo (fichier)",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Clip court du chantier (visite, avant/après). Réservé aux fichiers compressés — quelques dizaines de Mo maximum, sinon préférer « Vidéo (lien YouTube) » ci-dessous. Laisser vide si pas de vidéo ou si le lien YouTube est renseigné.",
    }),
    defineField({
      name: "videoUrl",
      title: "Vidéo (lien YouTube)",
      type: "string",
      description:
        "Identifiant ou URL complète d'une vidéo YouTube (ex. https://youtube.com/watch?v=XXXXXXXXXXX ou juste XXXXXXXXXXX). À utiliser pour une vidéo plus longue plutôt que de téléverser un gros fichier ici. Laisser vide si le champ « Vidéo (fichier) » est renseigné.",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description:
        "Facultatif — uniquement si le client a autorisé la mention de son nom.",
    }),
    defineField({
      name: "location",
      title: "Localisation",
      type: "string",
      description: 'Ex. "Bonanjo, Douala"',
    }),
    defineField({
      name: "surface",
      title: "Surface",
      type: "string",
      description: 'Ex. "450 m²" — facultatif.',
    }),
    defineField({
      name: "duration",
      title: "Délai",
      type: "string",
      description: 'Ex. "6 mois" — facultatif.',
    }),
    defineField({
      name: "budget",
      title: "Budget",
      type: "string",
      description:
        "Facultatif — uniquement si SOPRINA BUILDING valide sa publication.",
    }),
    defineField({
      name: "description_fr",
      title: "Description (français)",
      type: "text",
    }),
    defineField({
      name: "description_en",
      title: "Description (anglais)",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit = affiché en premier.",
    }),
  ],
  preview: {
    select: { title: "title_fr", subtitle: "category_fr", media: "mainImage" },
  },
});
