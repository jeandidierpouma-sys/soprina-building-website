import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DOMAINS } from "@/lib/content";

export function DomainsPreview() {
  return (
    <section className="bg-white py-24">
      <div className="container-sb">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="max-w-xl text-3xl font-bold text-sb-navy sm:text-4xl">
              Nos domaines d&apos;expertise
            </h2>
          </div>
          <Link
            href="/domaines"
            className="focus-ring group flex items-center gap-1.5 text-sm font-semibold text-sb-navy hover:text-sb-gold"
          >
            Voir les 7 domaines en détail
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((d) => (
            <div
              key={d.n}
              className={`group overflow-hidden rounded-2xl border border-sb-grayline bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-sb-gold/40 hover:shadow-xl ${
                d.n === "07" ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-[558/533] w-full bg-white sm:aspect-auto sm:h-[210px]">
                <Image
                  src={d.icon}
                  alt={d.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-sb-body">
                  {d.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-sb-body"
                    >
                      {tag}
                    </span>
                  ))}
                  {d.tags.length > 3 && (
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-sb-navy">
                      +{d.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
