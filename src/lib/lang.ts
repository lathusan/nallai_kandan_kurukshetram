/** Which language this visitor chose (saved in a cookie). Tamil until they switch. */
import "server-only";
import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, type Lang, dict } from "@/content/ui";

export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === "en" || value === "ta" ? value : DEFAULT_LANG;
}

export async function getDict() {
  const lang = await getLang();
  return { lang, t: dict(lang) };
}
