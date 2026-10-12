import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/content";
import { FAQ_ITEMS_EN } from "@/lib/content.en";
import { Reveal } from "@/components/motion/reveal";

const TEXT = {
  fr: {
    title: "Questions fréquentes",
    support: "Une autre question ? Contactez-nous directement, nous vous répondons avec plaisir.",
  },
  en: {
    title: "Frequently asked questions",
    support: "Another question? Contact us directly — we're glad to help.",
  },
} as const;

export function Faq({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const items = locale === "en" ? FAQ_ITEMS_EN : FAQ_ITEMS;
  const t = TEXT[locale];

  return (
    <section className="bg-muted py-24">
      <div className="container-sb grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Reveal direction="left">
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sb-body">
            {t.support}
          </p>
        </Reveal>

        <Reveal
          direction="right"
          className="rounded-2xl border border-sb-grayline bg-white px-6 sm:px-8"
        >
          <Accordion type="single" collapsible>
            {items.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
