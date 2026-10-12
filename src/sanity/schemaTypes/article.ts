import { defineField, defineType } from "sanity";

// Article de blog / actualité — alimente /actualites et /en/actualites
// (pages créées dans cette même livraison, encore vides tant qu'aucun
// article n'est publié). Statut : IMPLEMENTED (schéma + pages de lecture)
// — zéro contenu réel pour l'instant (dépend de la rédaction du client).
export const articleType = defineType({
  name: "article",
  title: "Actualité",
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
        "Laisser vide pour masquer cet article sur la version anglaise du site.",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title_fr", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Actualité de chantier", value: "chantier" },
          { title: "Conseil technique", value: "conseil" },
          { title: "Réalisation", value: "realisation" },
          { title: "Entreprise", value: "entreprise" },
        ],
      },
    }),
    defineField({
      name: "mainImage",
      title: "Photo principale",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt_fr",
      title: "Extrait (français)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "excerpt_en",
      title: "Extrait (anglais)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "body_fr",
      title: "Contenu (français)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "body_en",
      title: "Contenu (anglais)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
      initialValue: "SOPRINA BUILDING",
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Date de publication, plus récent d'abord",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title_fr", subtitle: "category", media: "mainImage" },
  },
});
