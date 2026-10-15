import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProgramGallery from "@/components/ProgramGallery";
import { site } from "@/content/site";
import { readContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Programmes" };

export default async function Programs() {
  const { programs } = await readContent();
  const sorted = [...programs].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <>
      <PageHeader
        title="Programmes"
        intro={`Photographs from concerts, temple festivals and student recitals. ${site.facts[0].value} ${site.facts[0].label} and counting.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ProgramGallery items={sorted} />
      </div>
    </>
  );
}
