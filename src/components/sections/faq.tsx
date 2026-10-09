import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function Faq() {
  return (
    <section className="bg-muted py-24">
      <div className="container-sb grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Reveal direction="left">
          <h2 className="text-3xl font-bold text-sb-navy sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sb-body">
            Une autre question ? Contactez-nous directement, nous vous
            répondons avec plaisir.
          </p>
        </Reveal>

        <Reveal
          direction="right"
          className="rounded-2xl border border-sb-grayline bg-white px-6 sm:px-8"
        >
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
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
