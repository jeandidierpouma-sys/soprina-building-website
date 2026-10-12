import { CONTACT } from "@/lib/content";
import { WhatsappIcon } from "@/components/site/social-icons";

// Widget flottant WhatsApp — visible sur toutes les pages (monté dans
// layout.tsx). Statut : NOUVEAU (Lot 1 — évolution premium, audit du
// 2026-10-10). Teinté aux couleurs de marque (navy + or) plutôt qu'au vert
// WhatsApp par défaut, pour rester cohérent avec l'identité SOPRINA BUILDING.
export function WhatsappWidget() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec SOPRINA BUILDING sur WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-sb-navy text-sb-gold shadow-lg ring-1 ring-sb-gold/40 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <WhatsappIcon className="size-7" />
      <span className="sr-only">Contacter SOPRINA BUILDING sur WhatsApp</span>
    </a>
  );
}
