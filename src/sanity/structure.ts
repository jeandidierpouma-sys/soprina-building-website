import type { StructureResolver } from "sanity/structure";

// Menu du Studio en français, groupé par usage métier plutôt que l'ordre
// alphabétique par défaut — l'équipe SOPRINA BUILDING n'a que 3 types de
// contenu à gérer, donc un simple regroupement nommé suffit (pas besoin de
// sous-dossiers par domaine à ce stade).
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu SOPRINA BUILDING")
    .items([
      S.listItem()
        .title("Réalisations")
        .schemaType("project")
        .child(S.documentTypeList("project").title("Réalisations")),
      S.listItem()
        .title("Actualités")
        .schemaType("article")
        .child(S.documentTypeList("article").title("Actualités")),
      S.listItem()
        .title("Témoignages")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Témoignages")),
    ]);
