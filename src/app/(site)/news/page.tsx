import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { readContent, sortPosts } from "@/lib/store";
import { getDict } from "@/lib/lang";
import { formatDate, pick } from "@/content/localized";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.news };
}
export const dynamic = "force-dynamic";


export default async function News() {
  const posts = sortPosts((await readContent()).posts);
  const { lang, t } = await getDict();
  return (
    <>
      <PageHeader title={t.news} intro={t.newsIntro} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        {posts.length === 0 ? (
          <p className="text-muted">{t.noNews}</p>
        ) : (
          <ul className="space-y-12">
            {posts.map((p) => (
              <li key={p.id} id={p.id} className="scroll-mt-24">
                <article>
                  <p className="text-sm text-muted">
                    {formatDate(p.date, lang)}
                    {p.pinned && <span className="ml-2 rounded bg-turmeric/20 px-2 py-0.5 text-xs font-semibold text-wood">{t.pinned}</span>}
                  </p>
                  <h2 className="mt-1 text-3xl text-wood">{pick(p, "title", lang)}</h2>
                  {p.image && <Photo src={p.image} alt={pick(p, "title", lang)} className="mt-5 aspect-[4/3] rounded sm:aspect-[16/10]" sizes="(max-width: 768px) 100vw, 48rem" />}
                  <div className="prose-width mt-5 space-y-4 text-lg leading-[1.75]">
                    {pick(p, "body", lang).split(/\n{2,}/).map((para, i) => (
                      <p key={i} className="whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
