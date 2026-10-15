import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import { site, biography } from "@/content/site";

export const metadata: Metadata = { title: "Biography" };

export default function About() {
  return (
    <>
      <PageHeader title="Biography" intro={`The life and music of ${site.guruName}.`} />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1fr_2fr] md:py-20">
        <aside className="md:sticky md:top-24 md:self-start">
          <Photo src={site.portraitBio || site.portrait} alt={`Portrait of ${site.guruName}`} className="aspect-[4/5] rounded" priority sizes="(max-width: 768px) 100vw, 33vw" />
          <dl className="mt-6 space-y-3">
            {site.facts.map((f) => (
              <div key={f.label} className="flex items-baseline gap-3 border-b border-ash-dark pb-3">
                <dd className="font-display text-2xl text-wood">{f.value}</dd>
                <dt className="text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </aside>

        <article>
          <p className="prose-width font-display text-xl leading-snug text-wood sm:text-2xl">{biography.intro}</p>
          <div className="prose-width mt-8 space-y-5 text-lg leading-[1.75]">
            {biography.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mt-16 text-3xl text-wood sm:text-4xl">Milestones</h2>
          <ol className="mt-8 border-l-2 border-kumkum/40">
            {biography.timeline.map((t, i) => (
              <li key={i} className="relative pb-8 pl-8 last:pb-0">
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-ash bg-kumkum" aria-hidden="true" />
                <p className="font-display text-2xl text-kumkum">{t.year}</p>
                <p className="mt-1">{t.text}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-16 text-3xl text-wood sm:text-4xl">Honours</h2>
          <ul className="mt-6 space-y-3">
            {biography.awards.map((a, i) => (
              <li key={i} className="border-b border-ash-dark pb-3">{a}</li>
            ))}
          </ul>

          <div className="mt-16 rounded bg-wood p-8 text-ash">
            <p className="font-display text-2xl">His autobiography is available in the library.</p>
            <Link href="/library" className="mt-4 inline-block font-semibold text-turmeric underline underline-offset-4">
              See his books
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
