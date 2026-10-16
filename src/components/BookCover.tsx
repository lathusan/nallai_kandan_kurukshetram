"use client";

import Photo from "./Photo";
import { useLang } from "./LangProvider";

const tones = ["bg-kumkum", "bg-wood", "bg-karanai", "bg-[#2f4a3a]"];

/** A book cover photo, or a typeset cover until a photo is added. */
export default function BookCover({
  book,
  index = 0,
}: {
  book: { title: string; titleTamil?: string; cover: string; year: string };
  index?: number;
}) {
  const { lang, t } = useLang();
  const main = lang === "ta" && book.titleTamil ? book.titleTamil : book.title;
  const second = lang === "ta" ? (book.titleTamil ? book.title : "") : book.titleTamil;

  if (book.cover) {
    return <Photo src={book.cover} alt={`${t.coverOf} ${main}`} className="aspect-[2/3] rounded-sm shadow-md" sizes="(max-width: 768px) 50vw, 25vw" />;
  }
  const tone = tones[(book.title.length + index) % tones.length];
  return (
    <div className={`relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-sm p-4 text-ash shadow-md ${tone}`}>
      <div className="absolute inset-y-0 left-0 w-2 bg-black/25" aria-hidden="true" />
      <div className="pl-2">
        {second && <p className="text-sm leading-snug text-turmeric">{second}</p>}
        <p className="mt-2 font-display text-lg leading-tight sm:text-2xl">{main}</p>
      </div>
      <div className="flex items-end justify-between pl-2">
        <span className="text-xs text-ash/60">{book.year}</span>
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx="20" cy="20" r="8" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
