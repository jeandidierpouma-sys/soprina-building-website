import {
  Award,
  Layers,
  ShieldCheck,
  Clock,
  HeartHandshake,
} from "lucide-react";

import { WHY_US, ENGAGEMENTS } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

const ICONS = [Award, Layers, ShieldCheck, Clock, HeartHandshake];

export function WhyUs() {
  return (
    <section className="bg-white py-24">
      <div className="container-sb grid gap-16 lg:grid-cols-2">
        <Reveal direction="left">
          <h2 className="mb-6 text-3xl font-bold text-sb-navy sm:text-4xl">
            Pourquoi choisir SOPRINA BUILDING ?
          </h2>
          <div className="flex flex-col gap-5">
            {WHY_US.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={item} delay={i * 0.08} amount={0.4}>
                  <div className="flex items-center gap-4 rounded-xl border border-sb-grayline p-4 transition-all hover:-translate-y-0.5 hover:border-sb-gold/40 hover:shadow-md">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-semibold text-sb-navy">{item}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        <Reveal direction="right">
          <h2 className="mb-6 text-3xl font-bold text-sb-navy sm:text-4xl">
            Nos engagements
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.n} delay={i * 0.08} amount={0.4}>
                <div className="rounded-2xl bg-sb-navy p-6 text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-sm font-semibold text-sb-gold">
                    {e.n}
                  </span>
                  <p className="mt-2 text-xl font-bold">{e.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
