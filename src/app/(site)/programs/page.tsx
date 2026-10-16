import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProgramGallery from "@/components/ProgramGallery";
import { getDict } from "@/lib/lang";

import { readContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.programmes };
}

export default async function Programs() {
  const { programs } = await readContent();
  const { lang, t } = await getDict();
  const sorted = [...programs].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <>
      <PageHeader
        title={t.programmes}
        intro={t.programmesIntro}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ProgramGallery items={sorted} />
      </div>
    </>
  );
}
