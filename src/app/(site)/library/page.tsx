import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookCover from "@/components/BookCover";
import { readContent } from "@/lib/store";
import { getDict } from "@/lib/lang";
import { pick } from "@/content/localized";

export const dynamic = "force-dynamic";
import { whatsappLink } from "@/components/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.navBooks };
}

export default async function Library() {
  const { books } = await readContent();
  const { lang, t } = await getDict();
  return (
    <>
      <PageHeader
        title={t.library}
        intro={t.libraryIntro}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ul className="divide-y divide-ash-dark">
          {books.map((b, i) => (
            <li key={i} className="grid gap-6 py-10 first:pt-0 md:grid-cols-[24rem_1fr] md:gap-10">
              <div className={b.backCover ? "w-full max-w-sm" : "w-40 md:w-48"}>
                <BookCover book={b} index={i} />
              </div>
              <div>
                {/* Both titles: the chosen language as the heading, the other above it */}
                {lang === "ta"
                  ? <p className="text-kumkum">{b.titleTamil ? b.title : ""}</p>
                  : b.titleTamil && <p className="text-kumkum">{b.titleTamil}</p>}
                <h2 className="mt-1 text-3xl text-wood sm:text-4xl">{lang === "ta" && b.titleTamil ? b.titleTamil : b.title}</h2>
                <p className="mt-2 text-muted">
                  {[b.year, pick(b, "language", lang), pick(b, "pages", lang)].filter(Boolean).join(", ")}
                </p>
                <p className="mt-3">
                  {b.available !== false ? (
                    <span className="rounded bg-[#e3efe6] px-2.5 py-1 text-sm font-semibold text-[#1f5f36]">{t.availableToOrder}</span>
                  ) : (
                    <span className="rounded bg-ash-dark px-2.5 py-1 text-sm font-semibold text-muted">{t.notAvailable}</span>
                  )}
                </p>
                <p className="prose-width mt-4 text-lg">{pick(b, "description", lang)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                {b.pdf && (
                  <a
                    href={b.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-wood px-5 py-2.5 font-semibold text-ash hover:bg-wood-deep"
                  >
                    {t.downloadPdf}
                  </a>
                )}
                {/* Order button only for books that can be ordered */}
                {b.available !== false && (
                  <a
                    href={whatsappLink(t.askCopyMessage(lang === "ta" && b.titleTamil ? b.titleTamil : b.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-[#1f8f4e] px-5 py-2.5 font-semibold text-white hover:bg-[#187a42]"
                  >
                    <WhatsAppIcon /> {t.askCopy}
                  </a>
                )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
