"use client";

import { useEffect, useRef, useState } from "react";
import { useRhythm } from "./RhythmProvider";

/**
 * On every beat of the rhythm, a gold music note rises out beside one of the
 * drum's 16 strap holes and fades away. Each beat uses the next hole, so the
 * notes travel round the drum in time with the playing.
 * Sits on top of <DrumHead />, in the same square box.
 */

const HOLES = 16;
const HOLE_R = 46; // % from centre, matches the holes in DrumHead (92 of 200)
const SYMBOLS = ["♪", "♫", "♩", "♬"];

type Note = { id: number; hole: number; symbol: string };

export default function BeatNotes() {
  const { playing, tick } = useRhythm();
  const [notes, setNotes] = useState<Note[]>([]);
  const last = useRef(tick);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!playing || tick === last.current) {
      last.current = tick;
      return;
    }
    last.current = tick;
    const hole = ((tick % HOLES) + HOLES) % HOLES;
    const note: Note = { id: tick, hole, symbol: SYMBOLS[tick % SYMBOLS.length] };
    setNotes((n) => [...n.slice(-6), note]);
    timers.current.push(window.setTimeout(() => setNotes((n) => n.filter((x) => x.id !== note.id)), 1300));
    if (timers.current.length > 20) timers.current = timers.current.slice(-10);
  }, [tick, playing]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  useEffect(() => {
    if (!playing) setNotes([]);
  }, [playing]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {notes.map((n) => {
        // start at the top hole and go clockwise
        const a = -Math.PI / 2 + (n.hole / HOLES) * Math.PI * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        return (
          <span key={n.id}>
            {/* the hole glows for a moment */}
            <span
              className="beat-hole absolute h-[5%] w-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${50 + cos * HOLE_R}%`, top: `${50 + sin * HOLE_R}%` }}
            />
            {/* the note rises out beyond the rim */}
            <span
              className="beat-note absolute -translate-x-1/2 -translate-y-1/2 font-sans text-2xl font-semibold text-turmeric sm:text-3xl"
              style={
                {
                  left: `${50 + cos * 55}%`,
                  top: `${50 + sin * 55}%`,
                  "--dx": `${cos * 28}px`,
                  "--dy": `${sin * 28 - 10}px`,
                } as React.CSSProperties
              }
            >
              {n.symbol}
            </span>
          </span>
        );
      })}
    </div>
  );
}
