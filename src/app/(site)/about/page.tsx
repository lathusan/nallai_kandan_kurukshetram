import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { getDict } from "@/lib/lang";
import { getText } from "@/content/localized";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.biography };
}

export default async function About() {
  const { lang, t } = await getDict();
  const { site, biography } = getText(lang);
  return (
    <>
      <PageHeader title={t.biography} intro={t.biographyIntro(site.guruName)} />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1fr_2fr] md:py-20">
        <aside className="min-w-0 md:sticky md:top-24 md:self-start">
          <Photo src={site.portraitBio || site.portrait} alt={`${t.portraitOf} ${site.guruName}`} className="aspect-[4/5] rounded" priority sizes="(max-width: 768px) 100vw, 33vw" />
          <dl className="mt-6 space-y-3">
            {site.facts.map((f) => (
              <div key={f.label} className="flex flex-wrap items-baseline gap-x-3 border-b border-ash-dark pb-3">
                <dd className="font-display text-2xl text-wood">{f.value}</dd>
                <dt className="text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </aside>

        <article>
          <p className="bio-intro prose-width font-display text-xl leading-snug text-wood sm:text-2xl">{biography.intro}</p>
          <div className="prose-width mt-8 space-y-5 text-lg leading-[1.75]">
            {biography.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mt-16 text-3xl text-wood sm:text-4xl">{t.highlights}</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {biography.highlights.map((h, i) => (
              <li key={i} className="border-l-2 border-kumkum pl-4">
                <p className="font-display text-3xl text-kumkum">{h.value}</p>
                <p className="mt-1">{h.text}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-3xl text-wood sm:text-4xl">{t.positions}</h2>
          <ul className="mt-6 space-y-3">
            {biography.positions.map((a, i) => (
              <li key={i} className="border-b border-ash-dark pb-3">{a}</li>
            ))}
          </ul>

          <div className="mt-16 rounded bg-wood p-8 text-ash">
            <p className="font-display text-2xl">{t.autobiographyNote}</p>
            <Link href="/library" className="mt-4 inline-block font-semibold text-turmeric underline underline-offset-4">
              {t.seeBooks}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
