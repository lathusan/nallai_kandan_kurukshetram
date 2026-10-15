import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { readContent, sortPosts } from "@/lib/store";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function News() {
  const posts = sortPosts((await readContent()).posts);
  return (
    <>
      <PageHeader title="News" intro="Class openings, festival programmes and school events." />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        {posts.length === 0 ? (
          <p className="text-muted">No news yet. Follow us on WhatsApp for class updates.</p>
        ) : (
          <ul className="space-y-12">
            {posts.map((p) => (
              <li key={p.id} id={p.id} className="scroll-mt-24">
                <article>
                  <p className="text-sm text-muted">
                    {formatDate(p.date)}
                    {p.pinned && <span className="ml-2 rounded bg-turmeric/20 px-2 py-0.5 text-xs font-semibold text-wood">Pinned</span>}
                  </p>
                  <h2 className="mt-1 text-3xl text-wood">{p.title}</h2>
                  {p.image && <Photo src={p.image} alt={p.title} className="mt-5 aspect-[4/3] rounded sm:aspect-[16/10]" sizes="(max-width: 768px) 100vw, 48rem" />}
                  <div className="prose-width mt-5 space-y-4 text-lg leading-[1.75]">
                    {p.body.split(/\n{2,}/).map((para, i) => (
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
