"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import type { Program } from "@/lib/store";


export default function ProgramGallery({ items }: { items: Program[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const shown = filter === "All" ? items : items.filter((p) => p.category === filter);
  const current = openIndex !== null ? shown[openIndex] : null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (current && !d.open) d.showModal();
    if (!current && d.open) d.close();
  }, [current]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, shown.length]);

  return (
    <>
      <div role="group" aria-label="Filter programmes" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${
              filter === c ? "border-wood bg-wood text-ash" : "border-wood/30 hover:border-wood"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "programme" : "programmes"}
      </p>

      <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={`${i}-${p.title}`}>
            <button type="button" onClick={() => setOpenIndex(i)} className="group block w-full text-left">
              <Photo src={p.image} alt={p.title} className="aspect-[4/3] rounded" />
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-semibold group-hover:text-kumkum">{p.title}</span>
                <span className="shrink-0 font-display text-lg text-kumkum">{p.year}</span>
              </span>
              <span className="block text-muted">{p.place}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => e.target === dialogRef.current && setOpenIndex(null)}
        className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none bg-transparent p-0 backdrop:bg-black/95"
      >
        {current && (
          <figure className="text-ash">
            <Photo src={current.image} alt={current.title} className="aspect-[4/3] max-h-[75vh] w-full rounded sm:aspect-[16/10]" sizes="100vw" />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span>
                <span className="block font-semibold">{current.title}</span>
                <span className="text-ash/70">{current.place}, {current.year}</span>
                {current.link && (
                  <a href={current.link} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-turmeric underline underline-offset-4">
                    Watch or read more
                  </a>
                )}
              </span>
              <span className="flex gap-2">
                <button type="button" className="rounded border border-ash/40 px-3 py-1.5" onClick={() => setOpenIndex((i) => ((i ?? 0) - 1 + shown.length) % shown.length)}>Previous</button>
                <button type="button" className="rounded border border-ash/40 px-3 py-1.5" onClick={() => setOpenIndex((i) => ((i ?? 0) + 1) % shown.length)}>Next</button>
                <button type="button" className="rounded bg-ash px-3 py-1.5 text-karanai" onClick={() => setOpenIndex(null)}>Close</button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
