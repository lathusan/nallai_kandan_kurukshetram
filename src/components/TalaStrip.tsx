"use client";

import { useRhythm } from "./RhythmProvider";
import { SpeakerIcon } from "./SoundToggle";
import { useLang } from "./LangProvider";

// Adi tala: one laghu of four beats, then two drutams of two.
// The syllables in English letters and Tamil script; marks show how each beat is counted.
const tala = [
  { syl: "ta", ta: "த", mark: "clap" },
  { syl: "ka", ta: "க", mark: "1" },
  { syl: "di", ta: "தி", mark: "2" },
  { syl: "mi", ta: "மி", mark: "3" },
  { syl: "ta", ta: "த", mark: "clap" },
  { syl: "ka", ta: "க", mark: "wave" },
  { syl: "jo", ta: "ஜொ", mark: "clap" },
  { syl: "nu", ta: "ணு", mark: "wave" },
];

export default function TalaStrip() {
  const { playing, beat, toggle } = useRhythm();
  const { t } = useLang();
  const markLabel = (m: string) => (m === "clap" ? t.clap : m === "wave" ? t.wave : m);

  return (
    <div className="border-t border-black/25 bg-wood-deep">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        <div role="img" className={`grid grid-cols-8 text-center ${playing ? "" : "tala"}`} aria-label={`${t.talaCaption}: ${tala.map((b) => b.syl).join(" ")}`}>
          {tala.map((b, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`block border-l border-ash/15 first:border-l-0 ${i === 4 || i === 6 ? "border-ash/50" : ""}`}
            >
              <span
                lang="en"
                style={{ fontWeight: 400, lineHeight: 1.1 }}
                className={`block font-display text-2xl transition-transform duration-75 sm:text-4xl ${
                  playing && beat === i ? "scale-110 text-turmeric" : ""
                }`}
              >
                {b.syl}
              </span>
              <span className="mt-1 block text-[0.7rem] text-ash/50 sm:text-xs">{markLabel(b.mark)}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ash/60">
          <span>{t.talaCaption}</span>
          <button
            type="button"
            data-rhythm-toggle
            onClick={toggle}
            aria-pressed={playing}
            className="inline-flex items-center gap-2 rounded-full border border-ash/25 px-3 py-1 text-ash hover:border-turmeric hover:text-turmeric"
          >
            <SpeakerIcon on={playing} className="h-4 w-4" />
            {playing ? t.talaMute : t.talaPlay}
          </button>
        </div>
      </div>
    </div>
  );
}
