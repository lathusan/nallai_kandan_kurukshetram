"use client";

import { useState } from "react";
import { getText } from "@/content/localized";
import { whatsappLink } from "./whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import { useLang } from "./LangProvider";

const field = "mt-1 w-full rounded border border-wood/25 bg-white px-3 py-2.5 focus:border-wood";

export default function BookingForm() {
  const { lang, t } = useLang();
  const { classes } = getText(lang);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    if (!name) {
      setError(t.fNameError);
      return;
    }
    setError("");
    const w = t.wa;
    const chosenDays = f.getAll("days").join(", ");
    const lines = [
      w.hello,
      "",
      `${w.student}: ${name}`,
      f.get("age") && `${w.age}: ${f.get("age")}`,
      `${w.cls}: ${f.get("class")}`,
      `${w.mode}: ${f.get("mode")}`,
      `${w.level}: ${f.get("level")}`,
      chosenDays && `${w.days}: ${chosenDays}`,
      f.get("time") && `${w.time}: ${f.get("time")}`,
      f.get("phone") && `${w.phone}: ${f.get("phone")}`,
      f.get("message") && `\n${f.get("message")}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const optional = <span className="font-normal text-muted">{t.optional}</span>;

  return (
    <form key={lang} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">{t.fStudent}</span>
          <input name="name" required autoComplete="name" className={field} aria-invalid={!!error} aria-describedby={error ? "name-error" : undefined} />
          {error && <span id="name-error" className="mt-1 block text-sm text-kumkum">{error}</span>}
        </label>
        <label className="block">
          <span className="font-medium">{t.fAge} {optional}</span>
          <input name="age" inputMode="numeric" className={field} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">{t.fClass}</span>
          <select name="class" className={field} defaultValue={classes[0]?.name}>
            {classes.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-medium">{t.fLevel}</span>
          <select name="level" className={field} defaultValue={t.fLevels[0]}>
            {t.fLevels.map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="font-medium">{t.fMode}</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {t.fModes.map((m, i) => (
            <label key={m} className="flex items-center gap-2">
              <input type="radio" name="mode" value={m} defaultChecked={i === 0} className="h-4 w-4 accent-kumkum" /> {m}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-medium">{t.fDays}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.days.map((d) => (
            <label key={d} className="cursor-pointer">
              <input type="checkbox" name="days" value={d} className="peer sr-only" />
              <span className="block rounded border border-wood/25 bg-white px-3 py-1.5 peer-checked:border-wood peer-checked:bg-wood peer-checked:text-ash peer-focus-visible:outline-3 peer-focus-visible:outline-turmeric">
                {d}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">{t.fTime}</span>
          <select name="time" className={field} defaultValue="">
            {t.fTimes.map((tm, i) => (
              <option key={tm} value={i === 0 ? "" : tm}>{tm}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-medium">{t.fPhone} {optional}</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="font-medium">{t.fMessage} {optional}</span>
        <textarea name="message" rows={3} className={field} />
      </label>

      <button type="submit" className="inline-flex items-center gap-2 rounded bg-[#1f8f4e] px-6 py-3 text-left font-semibold text-white hover:bg-[#187a42]">
        <WhatsAppIcon /> {t.fSubmit}
      </button>

      <p aria-live="polite" className="text-sm">
        {sent ? t.fSent : <span className="text-muted">{t.fNote}</span>}
      </p>
    </form>
  );
}
