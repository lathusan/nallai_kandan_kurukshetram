"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANG_COOKIE } from "@/content/ui";
import { useLang } from "./LangProvider";

/** தமிழ் / English switch. Remembers the choice for a year. */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, t } = useLang();
  const router = useRouter();
  const [pending, start] = useTransition();
  const other = lang === "ta" ? "en" : "ta";

  return (
    <button
      type="button"
      onClick={() => {
        document.cookie = `${LANG_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
        start(() => router.refresh());
      }}
      lang={other}
      aria-label={t.switchToLabel}
      title={t.switchToLabel}
      className={`shrink-0 rounded border border-ash/30 px-2.5 py-1.5 sm:px-3 text-sm font-semibold hover:border-turmeric hover:text-turmeric disabled:opacity-60 ${className}`}
      disabled={pending}
    >
      {/* Phones: a short label (EN / தமிழ்); larger screens: the full word */}
      <span className="sm:hidden">{other === "en" ? "EN" : t.switchTo}</span>
      <span className="hidden sm:inline">{t.switchTo}</span>
    </button>
  );
}
