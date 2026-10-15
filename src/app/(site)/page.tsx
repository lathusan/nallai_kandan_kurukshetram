import Link from "next/link";
import DrumHead from "@/components/DrumHead";
import Photo from "@/components/Photo";
import BookCover from "@/components/BookCover";
import TalaStrip from "@/components/TalaStrip";
import Kolam from "@/components/Kolam";
import BeatNotes from "@/components/BeatNotes";
import { site, biography, classes } from "@/content/site";
import { readContent, sortPosts } from "@/lib/store";

export const dynamic = "force-dynamic";

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });


export default async function Home() {
  const { programs: allPrograms, books, posts: allPosts } = await readContent();
  const programs = [...allPrograms].sort((a, b) => b.year.localeCompare(a.year));
  const posts = sortPosts(allPosts).slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-wood text-ash">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-20 md:pt-20 lg:max-[1408px]:grid-cols-[8rem_1.1fr_1fr] lg:max-[1408px]:gap-8">
          {/* Gold kolam. Wide screens: in the empty space at the far left of the page. */}
          <Kolam id="kolam-wide" className="pointer-events-none absolute top-1/2 right-full -translate-y-1/2 hidden w-[min(14rem,calc((100vw-100%)/2-1rem))] min-[1408px]:block" />
          {/* Laptop screens: in its own column just before his name. */}
          <Kolam id="kolam-laptop" className="pointer-events-none hidden h-[24rem] w-full lg:max-[1408px]:block" />

          <div className="relative z-10">
            <p className="text-lg text-turmeric">{site.schoolNameTamil}</p>
            <h1 className="mt-3 text-5xl sm:text-7xl">{site.guruName}</h1>
            <p className="mt-4 text-xl text-ash/85">
              {site.guruTitle}, {site.location}
            </p>
            <p className="prose-width mt-5 text-ash/75">{site.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/classes" className="rounded bg-kumkum px-6 py-3 font-semibold hover:bg-kumkum/85">
                Book a class
              </Link>
              <Link href="/about" className="rounded border border-ash/40 px-6 py-3 font-semibold hover:border-turmeric hover:text-turmeric">
                Read his story
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-sm md:max-w-md">
            <DrumHead className="w-full drop-shadow-2xl" />
            <BeatNotes />
            {site.portrait && (
              <div className="absolute inset-[13.5%]">
                <Photo
                  src={site.portrait}
                  alt={`Portrait of ${site.guruName}`}
                  priority
                  className="h-full w-full rounded-full bg-white! ring-2 ring-[#3d1b0e]"
                  sizes="(max-width: 768px) 60vw, 30vw"
                />
              </div>
            )}
          </div>

        </div>

        <TalaStrip />
      </section>

      {/* Facts */}
      <section className="border-b border-ash-dark bg-ash">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          {site.facts.map((f) => (
            <div key={f.label} className="border-l-2 border-kumkum pl-4">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-wood sm:text-4xl">{f.value}</span>
                <span className="text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Latest news from the admin page */}
      {posts.length > 0 && (
        <section className="border-b border-ash-dark">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl text-wood sm:text-4xl">News</h2>
              <Link href="/news" className="font-semibold text-kumkum underline underline-offset-4 hover:text-wood">
                All news
              </Link>
            </div>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.id} className="border-l-2 border-turmeric pl-4">
                  <p className="text-sm text-muted">{formatDate(p.date)}</p>
                  <Link href={`/news#${p.id}`} className="mt-1 block font-display text-xl text-wood hover:text-kumkum">
                    {p.title}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <h2 className="text-4xl text-wood sm:text-5xl">Forty years behind the mridangam</h2>
          <div>
            <p className="prose-width text-lg">{biography.intro}</p>
            <Link href="/about" className="mt-6 inline-block font-semibold text-kumkum underline underline-offset-4 hover:text-wood">
              Read the full biography
            </Link>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="bg-ash-dark/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl text-wood sm:text-5xl">On stage</h2>
            <Link href="/programs" className="font-semibold text-kumkum underline underline-offset-4 hover:text-wood">
              See all programmes
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.slice(0, 3).map((p, i) => (
              <li key={i}>
                <Photo src={p.image} alt={p.title} className="aspect-[4/3] rounded" />
                <p className="mt-3 font-semibold">{p.title}</p>
                <p className="text-muted">{p.place}, {p.year}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Classes */}
      <section className="bg-karanai text-ash">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-4xl sm:text-5xl">Learn the mridangam with him</h2>
            <p className="prose-width mt-5 text-ash/75">
              Private, group and online lessons for children and adults, from the first stroke to arangetram.
              Choose a time and send your request on WhatsApp.
            </p>
            <Link href="/classes" className="mt-8 inline-block rounded bg-kumkum px-6 py-3 font-semibold hover:bg-kumkum/85">
              Book a class
            </Link>
          </div>
          <ul className="divide-y divide-ash/15 border-y border-ash/15">
            {classes.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-4 py-4">
                <span className="font-display text-2xl">{c.name}</span>
                <span className="text-right text-sm text-ash/60">{c.who}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Books */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl text-wood sm:text-5xl">His books</h2>
          <Link href="/library" className="font-semibold text-kumkum underline underline-offset-4 hover:text-wood">
            Visit the library
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {books.map((b, i) => (
            <li key={i}>
              <BookCover book={b} />
              <p className="mt-3 font-semibold leading-snug">{b.title}</p>
              <p className="text-sm text-muted">{b.year}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
