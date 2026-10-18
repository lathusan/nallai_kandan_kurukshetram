"use client";

import Photo from "./Photo";
import { useLang } from "./LangProvider";

const tones = ["bg-kumkum", "bg-wood", "bg-karanai", "bg-[#2f4a3a]"];

/** A book cover photo, or a typeset cover until a photo is added. */
export default function BookCover({
  book,
  index = 0,
}: {
  book: { title: string; titleTamil?: string; cover: string; backCover?: string; year: string };
  index?: number;
}) {
  const { lang, t } = useLang();
  const main = lang === "ta" && book.titleTamil ? book.titleTamil : book.title;
  const second = lang === "ta" ? (book.titleTamil ? book.title : "") : book.titleTamil;

  if (book.cover) {
    // Covers are A4 (210 × 297). With a back cover, front and back sit side by side.
    const sides = book.backCover
      ? [{ src: book.cover, label: t.frontCover }, { src: book.backCover, label: t.backCover }]
      : [{ src: book.cover, label: "" }];
    return (
      <div className={sides.length > 1 ? "grid grid-cols-2 gap-3" : ""}>
        {sides.map((side) => (
          <figure key={side.src}>
            <Photo
              src={side.src}
              alt={`${t.coverOf} ${main}${side.label ? ` (${side.label})` : ""}`}
              className="aspect-[210/297] rounded-sm shadow-md"
              sizes="(max-width: 768px) 45vw, 12rem"
            />
            {side.label && <figcaption className="mt-1.5 text-center text-xs text-muted">{side.label}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  const tone = tones[(book.title.length + index) % tones.length];
  return (
    <div className={`relative flex aspect-[210/297] flex-col justify-between overflow-hidden rounded-sm p-4 text-ash shadow-md ${tone}`}>
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
