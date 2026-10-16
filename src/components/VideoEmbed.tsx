"use client";

import { useState } from "react";
import DrumHead from "./DrumHead";
import { useLang } from "./LangProvider";

/** Loads the YouTube player only when clicked, so the page stays fast. */
export default function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  const { t } = useLang();

  if (!id) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded bg-wood-deep text-ash/60">
        <DrumHead className="w-16 opacity-40" />
        <span className="text-sm">{t.videoSoon}</span>
      </div>
    );
  }

  if (play) {
    return (
      <iframe
        className="aspect-video w-full rounded"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" onClick={() => setPlay(true)} className="group relative block aspect-video w-full overflow-hidden rounded bg-karanai">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover opacity-80 group-hover:opacity-100" loading="lazy" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-kumkum text-ash shadow-lg">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </span>
      <span className="sr-only">{t.playVideo}: {title}</span>
    </button>
  );
}
