"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, dict, type Lang } from "@/content/ui";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export default function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** In browser components: the current language and its wording. */
export function useLang() {
  const lang = useContext(LangContext);
  return { lang, t: dict(lang) };
}
