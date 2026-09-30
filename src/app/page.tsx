import { Hero } from "@/components/sections/hero";
import { DomainsPreview } from "@/components/sections/domains-preview";
import { SectorsStrip } from "@/components/sections/sectors-strip";
import { MethodPreview } from "@/components/sections/method-preview";
import { WhyUs } from "@/components/sections/why-us";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <DomainsPreview />
      <SectorsStrip />
      <MethodPreview />
      <WhyUs />
      <Cta />
    </>
  );
}
