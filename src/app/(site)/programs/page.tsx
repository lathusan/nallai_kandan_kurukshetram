import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProgramGallery from "@/components/ProgramGallery";
import { getDict } from "@/lib/lang";

import { readContent, sortArangetrams } from "@/lib/store";
import ArangetramList from "@/components/ArangetramList";
import { site } from "@/content/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.programmes };
}

export default async function Programs() {
  const { programs, arangetrams } = await readContent();
  const { lang, t } = await getDict();
  const sorted = [...programs].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <>
      <PageHeader
        title={t.programmes}
        intro={t.programmesIntro}
      />
      {arangetrams.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-16">
          <h2 className="text-3xl text-wood sm:text-4xl">{t.arangetramsTitle}</h2>
          <p className="prose-width mt-2 text-muted">{t.arangetramsIntro}</p>
          <div className="mt-8">
            <ArangetramList items={sortArangetrams(arangetrams)} />
          </div>
        </section>
      )}
      {site.showOtherProgrammes ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          {arangetrams.length > 0 && <h2 className="mb-6 text-3xl text-wood sm:text-4xl">{t.otherProgrammes}</h2>}
          <ProgramGallery items={sorted} />
        </section>
      ) : (
        <div className="pb-12 md:pb-16" />
      )}
    </>
  );
}
