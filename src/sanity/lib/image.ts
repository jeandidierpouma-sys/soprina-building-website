import createImageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImage } from "sanity";

import { dataset, projectId } from "@/sanity/env";

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

// Retourne un builder d'URL d'image Sanity (chaînable .width()/.height()...)
// ou `null` si Sanity n'est pas configuré. Les appelants doivent gérer le
// cas `null` (cf. isSanityConfigured dans src/sanity/env.ts).
export function urlFor(source: SanityImage) {
  if (!builder) return null;
  return builder.image(source);
}
