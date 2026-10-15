import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VideoEmbed from "@/components/VideoEmbed";
import { lessons, site } from "@/content/site";
import { readContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Lessons & videos" };

export default async function Lessons() {
  const { videos, lessonFiles } = await readContent();
  const levels = Array.from(new Set(lessons.map((l) => l.level)));
  let n = 0;

  return (
    <>
      <PageHeader
        title="Lessons & videos"
        intro="The path his students follow, from the first stroke to playing a solo in concert, with recordings to watch and learn from."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-3xl text-wood sm:text-4xl">The lesson path</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {levels.map((level) => (
            <div key={level}>
              <h3 className="border-b-2 border-kumkum pb-2 text-2xl">{level}</h3>
              <ol className="mt-4 space-y-5">
                {lessons
                  .filter((l) => l.level === level)
                  .map((l) => {
                    n += 1;
                    return (
                      <li key={n} className="grid grid-cols-[2.5rem_1fr] gap-2">
                        <span className="font-display text-2xl text-kumkum" aria-hidden="true">{n}</span>
                        <div>
                          <p className="font-semibold">{l.title}</p>
                          <p className="text-muted">{l.summary}</p>
                        </div>
                      </li>
                    );
                  })}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-10">
          Want to start at lesson one?{" "}
          <Link href="/classes" className="font-semibold text-kumkum underline underline-offset-4">Book a class</Link>
        </p>
      </section>

      {lessonFiles.length > 0 && (
        <section className="border-t border-ash-dark bg-ash-dark/50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <h2 className="text-3xl text-wood sm:text-4xl">Lesson notes</h2>
            <p className="prose-width mt-3 text-muted">Printable notes to practise with at home.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {lessonFiles.map((l) => (
                <li key={l.id} className="flex items-start gap-4 rounded bg-ash p-4">
                  <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-sm bg-kumkum text-xs font-semibold text-ash" aria-hidden="true">
                    PDF
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-sm text-kumkum">{l.level}</p>
                    {l.description && <p className="mt-1 text-sm text-muted">{l.description}</p>}
                    <a href={l.file} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-wood underline underline-offset-4 hover:text-kumkum">
                      Open PDF
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-karanai text-ash">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl">Watch</h2>
            {site.contact.social.youtube && (
              <a href={site.contact.social.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-turmeric underline underline-offset-4 hover:text-ash">
                See all videos on YouTube
              </a>
            )}
          </div>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoEmbed id={v.youtubeId} title={v.title} />
                <p className="mt-3 font-semibold">{v.title}</p>
                <p className="text-sm text-ash/60">{v.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
