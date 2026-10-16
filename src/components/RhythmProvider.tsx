"use client";

/**
 * Background mridangam rhythm in Adi tala.
 *
 * Browsers only allow sound after the visitor clicks or taps the page, so the rhythm
 * starts on the first click/tap/key press (unless the visitor muted it before),
 * and the mute button remembers their choice.
 *
 * If `rhythmAudio` is set in src/content/site.ts, that recording is streamed and repeated,
 * and the highlight follows the beat times in src/content/rhythm-beats.json.
 * If it is "", the strokes are synthesised in the browser instead.
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import recording from "@/content/rhythm-beats.json";

const BEAT_SECONDS = 0.5; // 120 beats per minute, one Adi tala cycle every 4 seconds
const STORAGE_KEY = "rhythm-sound";

// beat: position in the 8-beat cycle (0–7, or -1 when silent)
// tick: counts every beat played, so animations can react to each new beat
type Ctx = { playing: boolean; beat: number; tick: number; toggle: () => void };
const RhythmContext = createContext<Ctx>({ playing: false, beat: -1, tick: 0, toggle: () => {} });
export const useRhythm = () => useContext(RhythmContext);

/* ---------- Synthesised mridangam strokes ---------- */

type Stroke = "tha" | "dhi" | "nam" | "thom" | "ki" | "gumki";

// Two strokes per beat (second speed). Each beat of the cycle: [on the beat, half beat]
const PATTERN: Stroke[][][] = [
  [["tha", "thom"], ["ki"]], // ta   (clap)
  [["dhi"], ["ki"]], //          ka
  [["thom"], ["nam"]], //        di
  [["dhi"], ["ki"]], //          mi
  [["tha", "thom"], ["ki"]], //  ta   (clap)
  [["nam"], ["gumki"]], //       ka   (wave)
  [["tha", "thom"], ["dhi"]], // jo   (clap)
  [["nam"], ["ki"]], //          nu   (wave)
];

const RIGHT_PITCH = 262; // right head tuned near C (sruti)

function noiseBuffer(ctx: AudioContext) {
  const len = ctx.sampleRate * 0.2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function playStroke(ctx: AudioContext, out: AudioNode, noise: AudioBuffer, stroke: Stroke, t: number, accent = 1) {
  const env = (node: AudioNode, peak: number, decay: number) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak * accent, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    node.connect(g).connect(out);
    return g;
  };
  const tone = (freq: number, peak: number, decay: number, type: OscillatorType = "sine", endFreq?: number) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + decay * 0.8);
    env(o, peak, decay);
    o.start(t);
    o.stop(t + decay + 0.05);
  };
  const click = (freq: number, q: number, peak: number, decay: number) => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    s.connect(f);
    env(f, peak, decay);
    s.start(t);
    s.stop(t + decay + 0.02);
  };

  switch (stroke) {
    case "nam": // ringing stroke on the edge of the right head
      tone(RIGHT_PITCH, 0.35, 0.7);
      tone(RIGHT_PITCH * 2, 0.18, 0.5);
      tone(RIGHT_PITCH * 3.01, 0.08, 0.3);
      click(3200, 1.5, 0.25, 0.03);
      break;
    case "dhi": // open centre stroke, rich and sustained
      tone(RIGHT_PITCH, 0.3, 0.9);
      tone(RIGHT_PITCH * 1.5, 0.12, 0.6);
      tone(RIGHT_PITCH * 2.02, 0.15, 0.7);
      click(1800, 1, 0.2, 0.04);
      break;
    case "tha": // short damped right-hand stroke
      tone(RIGHT_PITCH, 0.3, 0.18);
      tone(RIGHT_PITCH * 2, 0.12, 0.12);
      click(2500, 1.2, 0.35, 0.05);
      break;
    case "thom": // open bass of the left head
      tone(130, 0.7, 0.45, "sine", 72);
      click(300, 1, 0.25, 0.05);
      break;
    case "gumki": // the left-head bass that rises in pitch
      tone(85, 0.6, 0.5, "sine", 150);
      break;
    case "ki": // muted slap on the left head
      click(900, 0.8, 0.4, 0.06);
      tone(180, 0.15, 0.06);
      break;
  }
}

/* ---------- Provider ---------- */

export default function RhythmProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(-1);
  const [tick, setTick] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const outRef = useRef<GainNode | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextTimeRef = useRef(0);
  const stepRef = useRef(0);
  const beatTimeoutsRef = useRef<number[]>([]);

  const stopScheduler = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    beatTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    beatTimeoutsRef.current = [];
  };

  const ensureContext = () => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) {
      const ctx = new AC();
      const out = ctx.createGain();
      out.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      out.connect(comp).connect(ctx.destination);
      ctxRef.current = ctx;
      outRef.current = out;
      noiseRef.current = noiseBuffer(ctx);
    }
    return ctxRef.current;
  };

  const fadeIn = (ctx: AudioContext, level: number) => {
    const out = outRef.current!;
    out.gain.cancelScheduledValues(ctx.currentTime);
    out.gain.setValueAtTime(out.gain.value, ctx.currentTime);
    out.gain.linearRampToValueAtTime(level, ctx.currentTime + 1.2);
  };

  const start = useCallback(async (): Promise<boolean> => {
    // Real recording: streamed (not decoded into memory, so long files are fine on phones),
    // repeated when it ends, with the highlight following his actual beats.
    if (site.rhythmAudio) {
      if (!audioRef.current) {
        const el = new Audio();
        el.preload = "auto";
        el.loop = true;
        el.src = site.rhythmAudio;
        audioRef.current = el;
      }
      const el = audioRef.current;
      el.volume = 0;
      try {
        await el.play();
      } catch {
        return false; // the browser is still waiting for a click or tap
      }
      stopScheduler();
      // gentle fade in
      const target = Math.min(1, Math.max(0, site.rhythmVolume));
      let v = 0;
      const fade = window.setInterval(() => {
        v = Math.min(target, v + target / 20);
        el.volume = v;
        if (v >= target) window.clearInterval(fade);
      }, 60);

      const beats = recording.beats;
      const first = site.rhythmFirstBeat;
      timerRef.current = window.setInterval(() => {
        const t = el.currentTime;
        // binary search for the last beat at or before now
        let lo = 0, hi = beats.length - 1, i = -1;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          if (beats[mid] <= t + 0.02) { i = mid; lo = mid + 1; } else hi = mid - 1;
        }
        // no highlight before the first beat or in long pauses
        if (i < 0 || t - beats[i] > 1.2) setBeat(-1);
        else {
          setBeat((((i - first) % 8) + 8) % 8);
          setTick(i + 1); // the beat number in the recording
        }
      }, 30);
      setPlaying(true);
      return true;
    }

    // Synthesised
    const ctx = ensureContext();
    if (!ctx) return false;
    await ctx.resume();
    if (ctx.state !== "running") return false;
    const out = outRef.current!;
    fadeIn(ctx, 0.45);

    stopScheduler();
    nextTimeRef.current = ctx.currentTime + 0.1;
    stepRef.current = 0;
    const half = BEAT_SECONDS / 2;

    // Look-ahead scheduler: queue strokes a little in advance so timing stays steady.
    const schedule = () => {
      while (nextTimeRef.current < ctx.currentTime + 0.2) {
        const step = stepRef.current;
        const b = Math.floor(step / 2) % 8;
        const strokes = PATTERN[b][step % 2];
        const accent = step % 2 === 0 && (b === 0 || b === 4 || b === 6) ? 1.15 : 0.9;
        strokes.forEach((s) => playStroke(ctx, out, noiseRef.current!, s, nextTimeRef.current, accent));
        if (step % 2 === 0) {
          const delay = Math.max(0, (nextTimeRef.current - ctx.currentTime) * 1000);
          beatTimeoutsRef.current.push(window.setTimeout(() => { setBeat(b); setTick((n) => n + 1); }, delay));
        }
        nextTimeRef.current += half;
        stepRef.current = (step + 1) % 16;
      }
      if (beatTimeoutsRef.current.length > 32) beatTimeoutsRef.current = beatTimeoutsRef.current.slice(-16);
    };
    schedule();
    timerRef.current = window.setInterval(schedule, 50);
    setPlaying(true);
    return true;
  }, []);

  const stop = useCallback(() => {
    stopScheduler();
    const ctx = ctxRef.current;
    const el = audioRef.current;
    if (el && !el.paused) {
      // quick fade out, then pause (keeps its place, so it resumes where it left off)
      const step = el.volume / 6;
      const fade = window.setInterval(() => {
        el.volume = Math.max(0, el.volume - step);
        if (el.volume <= 0.001) { window.clearInterval(fade); el.pause(); }
      }, 40);
    }
    if (ctx && outRef.current) {
      outRef.current.gain.cancelScheduledValues(ctx.currentTime);
      outRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      window.setTimeout(() => ctx.suspend(), 400);
    }
    setPlaying(false);
    setBeat(-1);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      try { sessionStorage.setItem(STORAGE_KEY, "off"); } catch {}
    } else {
      start();
      try { sessionStorage.setItem(STORAGE_KEY, "on"); } catch {}
    }
  }, [playing, start, stop]);

  // Start as soon as the browser allows: straight away if it permits, otherwise on the
  // visitor's first click, tap, key press or scroll. A mute lasts for this visit only;
  // the next visit plays again.
  useEffect(() => {
    let pref: string | null = null;
    try {
      localStorage.removeItem(STORAGE_KEY); // older versions remembered mute for good
      pref = sessionStorage.getItem(STORAGE_KEY);
    } catch {}
    if (pref === "off" || (!site.rhythmOnByDefault && pref !== "on")) return;

    let done = false;
    let trying = false;
    const events = ["pointerdown", "mousedown", "touchstart", "touchend", "keydown", "click", "wheel", "scroll"];
    const remove = () => events.forEach((ev) => window.removeEventListener(ev, attempt, true));
    async function attempt(e?: Event) {
      if (done || trying) return;
      const target = e?.target as HTMLElement | null;
      if (target?.closest?.("[data-rhythm-toggle]")) return; // the speaker button handles itself
      trying = true;
      const ok = await start();
      trying = false;
      if (ok) {
        done = true;
        remove();
      }
    }
    events.forEach((ev) => window.addEventListener(ev, attempt, { capture: true, passive: true }));
    attempt(); // some browsers allow sound right away
    return () => {
      done = true;
      remove();
    };
  }, [start]);

  // Pause while the tab is hidden, resume when visible again.
  const resumeRef = useRef(false);
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        if (playing) {
          resumeRef.current = true;
          stop();
        }
      } else if (resumeRef.current) {
        resumeRef.current = false;
        start();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playing, start, stop]);

  useEffect(() => () => stopScheduler(), []);

  return <RhythmContext.Provider value={{ playing, beat, tick, toggle }}>{children}</RhythmContext.Provider>;
}
