"use client";

import { useRhythm } from "./RhythmProvider";
import { useLang } from "./LangProvider";

export function SpeakerIcon({ on, className = "h-5 w-5" }: { on: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
      {on ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a10 10 0 0 1 0 14" />
        </>
      ) : (
        <path d="m16 9 6 6m0-6-6 6" />
      )}
    </svg>
  );
}

/** Round button above the WhatsApp button, on every page. */
export default function SoundToggle() {
  const { playing, toggle } = useRhythm();
  const { t } = useLang();
  return (
    <button
      type="button"
      data-rhythm-toggle
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? t.muteMridangam : t.playMridangam}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-wood-deep text-ash shadow-lg shadow-black/25 ring-1 ring-ash/20 hover:text-turmeric"
    >
      <SpeakerIcon on={playing} className="h-6 w-6" />
      <span className="sr-only">{playing ? t.muteMridangam : t.playMridangam}</span>
    </button>
  );
}
