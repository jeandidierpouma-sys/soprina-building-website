import { defineField, defineType } from "sanity";

// Témoignage client — schéma prêt, AUCUNE donnée à l'intérieur : le brief
// est explicite ("intégrer des avis authentiques... Ne jamais inventer de
// témoignages") et le client a dit "on reviendra dessus" sur ce sujet.
// consentGiven impose, au niveau du schéma (pas seulement procédural), la
// règle "photo uniquement si le client a donné son accord" : la validation
// refuse une photo tant que la case consentement n'est pas cochée.
// Statut : CONTRACT_ONLY (schéma seul, zéro témoignage saisi).
export const testimonialType = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom du client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Fonction / Société",
      type: "string",
      description: 'Ex. "Directeur général, Société X"',
    }),
    defineField({
      name: "quote_fr",
      title: "Témoignage (français)",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote_en",
      title: "Témoignage (anglais)",
      type: "text",
    }),
    defineField({
      name: "consentGiven",
      title: "Le client a donné son accord écrit pour publier ce témoignage",
      type: "boolean",
      initialValue: false,
      validation: (rule) =>
        rule.custom((value) => {
          if (value !== true) {
            return "Un témoignage ne peut pas être publié sans accord explicite du client — cocher cette case uniquement après confirmation écrite.";
          }
          return true;
        }),
    }),
    defineField({
      name: "photo",
      title: "Photo du client",
      type: "image",
      options: { hotspot: true },
      description: "Uniquement si le client a explicitement autorisé sa photo.",
      validation: (rule) =>
        rule.custom((value, context) => {
          const consent = (context.document as { consentGiven?: boolean })
            ?.consentGiven;
          if (value && consent !== true) {
            return "Impossible d'ajouter une photo sans avoir coché l'accord du client (consentGiven).";
          }
          return true;
        }),
    }),
    defineField({
      name: "project",
      title: "Réalisation associée",
      type: "reference",
      to: [{ type: "project" }],
      description: "Facultatif — relie le témoignage à un chantier précis.",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
