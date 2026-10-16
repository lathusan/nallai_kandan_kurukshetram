/** Picks the Tamil or English version of the site's text. */
import type { Lang } from "./ui";
import { site, biography, lessons, classes, faqs } from "./site";
import { siteTa, biographyTa, lessonsTa, classesTa, faqsTa } from "./site.ta";

export function getText(lang: Lang) {
  if (lang === "en") {
    return { site: { ...site, address: site.contact.address, hours: site.contact.hours }, biography, lessons, classes, faqs };
  }
  return {
    site: {
      ...site,
      guruName: siteTa.guruName,
      guruTitle: siteTa.guruTitle,
      location: siteTa.location,
      tagline: siteTa.tagline,
      facts: siteTa.facts,
      address: siteTa.address,
      hours: siteTa.hours,
    },
    biography: biographyTa,
    lessons: lessonsTa,
    classes: classesTa,
    faqs: faqsTa,
  };
}

/** Both forms of his name, for places that always show both. */
export const names = { ta: siteTa.guruName, en: site.guruName };
export const schoolNames = { ta: siteTa.schoolName, en: site.schoolName };

/**
 * For items added in the admin page: use the Tamil field when the site is in Tamil
 * and it has been filled in, otherwise the English one.
 */
export function pick<T extends object>(item: T, field: keyof T & string, lang: Lang, taField?: string): string {
  const rec = item as Record<string, unknown>;
  const en = String(rec[field] ?? "");
  if (lang !== "ta") return en;
  const ta = String(rec[taField ?? `${field}Ta`] ?? "").trim();
  return ta || en;
}

export function formatDate(d: string, lang: Lang) {
  const date = new Date(d + "T00:00:00");
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(lang === "ta" ? "ta-LK" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}
