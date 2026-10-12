import { Hero } from "@/components/sections/hero";
import { DomainsPreview } from "@/components/sections/domains-preview";
import { RealisationsPreview } from "@/components/sections/realisations-preview";
import { SectorsStrip } from "@/components/sections/sectors-strip";
import { MethodPreview } from "@/components/sections/method-preview";
import { WhyUs } from "@/components/sections/why-us";
import { Cta } from "@/components/sections/cta";

export default function HomeEn() {
  return (
    <>
      <Hero locale="en" />
      <DomainsPreview locale="en" />
      <RealisationsPreview locale="en" />
      <SectorsStrip locale="en" />
      <MethodPreview locale="en" />
      <WhyUs locale="en" />
      <Cta locale="en" />
    </>
  );
}
