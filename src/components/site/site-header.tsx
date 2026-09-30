"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-sb-navy/95 backdrop-blur supports-[backdrop-filter]:bg-sb-navy/80">
      <div className="container-sb flex h-20 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-3">
          <Image
            src="/images/p1_logo.png"
            alt="SOPRINA BUILDING"
            width={200}
            height={80}
            className="h-12 w-auto rounded-md ring-1 ring-white/15"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-sm font-medium text-white/85 transition-colors hover:text-sb-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
            className="focus-ring flex items-center gap-2 text-sm font-medium text-white/85 hover:text-sb-gold"
          >
            <PhoneCall className="size-4 text-sb-gold" />
            {CONTACT.phones[0]}
          </a>
          <Button asChild size="sm">
            <Link href="/contact">Demander un devis</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="focus-ring flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-3 pb-4">
              <Image
                src="/images/p1_logo.png"
                alt="SOPRINA BUILDING"
                width={140}
                height={42}
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring text-lg font-medium text-white/90 hover:text-sb-gold"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                className="focus-ring flex items-center gap-2 text-sm text-white/85"
              >
                <PhoneCall className="size-4 text-sb-gold" />
                {CONTACT.phones[0]}
              </a>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
