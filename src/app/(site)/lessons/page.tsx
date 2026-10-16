import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import VideoEmbed from "@/components/VideoEmbed";
import { site } from "@/content/site";
import { getDict } from "@/lib/lang";
import { getText, pick } from "@/content/localized";
import { readContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.lessonsTitle };
}

export default async function Lessons() {
  const { videos, lessonFiles } = await readContent();
  const { lang, t } = await getDict();
  const { lessons } = getText(lang);
  const levels = Array.from(new Set(lessons.map((l) => l.level)));
  let n = 0;

  return (
    <>
      <PageHeader
        title={t.lessonsTitle}
        intro={t.lessonsIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-3xl text-wood sm:text-4xl">{t.lessonPath}</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          {levels.map((level) => (
            <div key={level}>
              <h3 className="border-b-2 border-kumkum pb-2 text-2xl">{t.levels[level] ?? level}</h3>
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
          {t.startLessonOne}{" "}
          <Link href="/classes" className="font-semibold text-kumkum underline underline-offset-4">{t.bookClass}</Link>
        </p>
      </section>

      {lessonFiles.length > 0 && (
        <section className="border-t border-ash-dark bg-ash-dark/50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <h2 className="text-3xl text-wood sm:text-4xl">{t.lessonNotes}</h2>
            <p className="prose-width mt-3 text-muted">{t.lessonNotesIntro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {lessonFiles.map((l) => (
                <li key={l.id} className="flex items-start gap-4 rounded bg-ash p-4">
                  <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-sm bg-kumkum text-xs font-semibold text-ash" aria-hidden="true">
                    PDF
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{pick(l, "title", lang)}</p>
                    <p className="text-sm text-kumkum">{t.levels[l.level] ?? l.level}</p>
                    {pick(l, "description", lang) && <p className="mt-1 text-sm text-muted">{pick(l, "description", lang)}</p>}
                    <a href={l.file} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-wood underline underline-offset-4 hover:text-kumkum">
                      {t.openPdf}
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
            <h2 className="text-3xl sm:text-4xl">{t.watch}</h2>
            {site.contact.social.youtube && (
              <a href={site.contact.social.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-turmeric underline underline-offset-4 hover:text-ash">
                {t.allVideos}
              </a>
            )}
          </div>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoEmbed id={v.youtubeId} title={pick(v, "title", lang)} />
                <p className="mt-3 font-semibold">{pick(v, "title", lang)}</p>
                <p className="text-sm text-ash/60">{pick(v, "note", lang)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
