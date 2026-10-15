import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookCover from "@/components/BookCover";
import { readContent } from "@/lib/store";

export const dynamic = "force-dynamic";
import { whatsappLink } from "@/components/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = { title: "Books" };

export default async function Library() {
  const { books } = await readContent();
  return (
    <>
      <PageHeader
        title="The library"
        intro="Lesson books, writing on Jaffna's percussion traditions, and his autobiography. Ask on WhatsApp to buy a copy."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ul className="divide-y divide-ash-dark">
          {books.map((b, i) => (
            <li key={i} className="grid gap-6 py-10 first:pt-0 sm:grid-cols-[12rem_1fr] sm:gap-10">
              <div className="w-40 sm:w-full">
                <BookCover book={b} index={i} />
              </div>
              <div>
                {b.titleTamil && <p className="text-kumkum">{b.titleTamil}</p>}
                <h2 className="mt-1 text-3xl text-wood sm:text-4xl">{b.title}</h2>
                <p className="mt-2 text-muted">
                  {[b.year, b.language, b.pages].filter(Boolean).join(", ")}
                </p>
                <p className="prose-width mt-4 text-lg">{b.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                {b.pdf && (
                  <a
                    href={b.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-wood px-5 py-2.5 font-semibold text-ash hover:bg-wood-deep"
                  >
                    Download PDF
                  </a>
                )}
                <a
                  href={whatsappLink(`Hello, I would like to buy a copy of "${b.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-wood/30 px-5 py-2.5 font-semibold hover:border-wood"
                >
                  <WhatsAppIcon /> Ask for a copy
                </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
