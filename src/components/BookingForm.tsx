"use client";

import { useState } from "react";
import { classes } from "@/content/site";
import { whatsappLink } from "./whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const field = "mt-1 w-full rounded border border-wood/25 bg-white px-3 py-2.5 focus:border-wood";

export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    if (!name) {
      setError("Enter the student's name so he knows who the booking is for.");
      return;
    }
    setError("");
    const chosenDays = f.getAll("days").join(", ");
    const lines = [
      "Hello, I would like to book a mridangam class.",
      "",
      `Student: ${name}`,
      f.get("age") && `Age: ${f.get("age")}`,
      `Class: ${f.get("class")}`,
      `Lessons: ${f.get("mode")}`,
      `Level: ${f.get("level")}`,
      chosenDays && `Preferred days: ${chosenDays}`,
      f.get("time") && `Preferred time: ${f.get("time")}`,
      f.get("phone") && `Phone: ${f.get("phone")}`,
      f.get("message") && `\n${f.get("message")}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">Student&apos;s name</span>
          <input name="name" required autoComplete="name" className={field} aria-invalid={!!error} aria-describedby={error ? "name-error" : undefined} />
          {error && <span id="name-error" className="mt-1 block text-sm text-kumkum">{error}</span>}
        </label>
        <label className="block">
          <span className="font-medium">Age <span className="font-normal text-muted">(optional)</span></span>
          <input name="age" inputMode="numeric" className={field} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-medium">Class</span>
          <select name="class" className={field} defaultValue={classes[0]?.name}>
            {classes.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="font-medium">Level</span>
          <select name="level" className={field} defaultValue="Complete beginner">
            <option>Complete beginner</option>
            <option>Some experience</option>
            <option>Advanced</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="font-medium">Lessons</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {["In person", "Online"].map((m, i) => (
            <label key={m} className="flex items-center gap-2">
              <input type="radio" name="mode" value={m} defaultChecked={i === 0} className="h-4 w-4 accent-kumkum" /> {m}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-medium">Preferred days</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {days.map((d) => (
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
          <span className="font-medium">Preferred time</span>
          <select name="time" className={field} defaultValue="">
            <option value="">Any time</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
        <label className="block">
          <span className="font-medium">Phone <span className="font-normal text-muted">(optional)</span></span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="font-medium">Anything else <span className="font-normal text-muted">(optional)</span></span>
        <textarea name="message" rows={3} className={field} />
      </label>

      <button type="submit" className="inline-flex items-center gap-2 rounded bg-[#1f8f4e] px-6 py-3 font-semibold text-white hover:bg-[#187a42]">
        <WhatsAppIcon /> Send booking request on WhatsApp
      </button>

      <p aria-live="polite" className="text-sm">
        {sent
          ? "WhatsApp has opened with your request. Press send there, and he will reply to confirm a time."
          : <span className="text-muted">This opens WhatsApp with your details filled in. Nothing is sent until you press send.</span>}
      </p>
    </form>
  );
}
