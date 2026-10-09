import {
  Award,
  Layers,
  ShieldCheck,
  Clock,
  HeartHandshake,
} from "lucide-react";

import { WHY_US, ENGAGEMENTS } from "@/lib/content";

const ICONS = [Award, Layers, ShieldCheck, Clock, HeartHandshake];

export function WhyUs() {
  return (
    <section className="bg-white py-24">
      <div className="container-sb grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-sb-navy sm:text-4xl">
            Pourquoi choisir SOPRINA BUILDING ?
          </h2>
          <div className="flex flex-col gap-5">
            {WHY_US.map((item, i) => {
              const Icon = ICONS[i];
              return (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-sb-grayline p-4"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sb-navy text-sb-gold">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-semibold text-sb-navy">{item}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold text-sb-navy sm:text-4xl">
            Nos engagements
          </h2>
          <div className="grid grid-cols-2 gap-5">
            {ENGAGEMENTS.map((e) => (
              <div key={e.n} className="rounded-2xl bg-sb-navy p-6 text-white">
                <span className="text-sm font-semibold text-sb-gold">
                  {e.n}
                </span>
                <p className="mt-2 text-xl font-bold">{e.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
