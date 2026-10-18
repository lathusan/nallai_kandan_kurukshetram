"use client";

import Image from "next/image";
import { useState } from "react";
import type { Arangetram } from "@/lib/store";
import { formatDate, pick } from "@/content/localized";
import { useLang } from "./LangProvider";

/** One student's arangetram: the invitation or photo, with a second photo to switch to. */
function Card({ a }: { a: Arangetram }) {
  const { lang, t } = useLang();
  const photos = [a.image, a.image2].filter(Boolean) as string[];
  const [shown, setShown] = useState(0);
  const name = pick(a, "student", lang);
  const other = lang === "ta" ? a.student : a.studentTa;
  const src = photos[shown] ?? "";
  return (
    <li className="flex flex-col overflow-hidden rounded bg-white shadow-sm ring-1 ring-ash-dark">
      <a href={src} target="_blank" rel="noopener noreferrer" className="relative block aspect-square bg-wood-deep" aria-label={`${name}: ${t.photo} ${shown + 1}`}>
        {src && (
          <Image src={src} alt={name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={src.startsWith("/uploads/")} className="object-contain" />
        )}
      </a>
      {photos.length > 1 && (
        <div className="flex gap-2 bg-wood-deep px-3 pb-3" role="group">
          {photos.map((p, i) => (
            <button key={p} type="button" onClick={() => setShown(i)} aria-pressed={shown === i}
              aria-label={`${t.photo} ${i + 1}`}
              className={`relative h-12 w-16 overflow-hidden rounded-sm ring-2 ${shown === i ? "ring-turmeric" : "ring-transparent opacity-60 hover:opacity-100"}`}>
              <Image src={p} alt="" fill sizes="4rem" unoptimized={p.startsWith("/uploads/")} className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-left font-display text-xl leading-snug text-wood">{name}</p>
        {other && other !== name && <p className="text-sm text-muted">{other}</p>}
        <p className="mt-3 text-left font-semibold text-kumkum">{a.date ? formatDate(a.date, lang) : t.dateNotKnown}</p>
        {pick(a, "place", lang) && <p className="mt-1 text-left text-sm text-muted">{pick(a, "place", lang)}</p>}
      </div>
    </li>
  );
}

export default function ArangetramList({ items }: { items: Arangetram[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <Card key={`${i}-${a.id}`} a={a} />
      ))}
    </ul>
  );
}
