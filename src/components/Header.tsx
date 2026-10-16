"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { schoolNames } from "@/content/localized";
import DrumHead from "./DrumHead";
import { navItems } from "./nav";
import { useLang } from "./LangProvider";
import LanguageToggle from "./LanguageToggle";

function AdminIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, t } = useLang();
  const other = lang === "ta" ? "en" : "ta";

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="sticky top-0 z-50 border-b border-black/30 bg-wood-deep text-ash">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <DrumHead className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          <span className="min-w-0 leading-tight">
            <span className={`block truncate ${lang === "ta" ? "font-sans text-[0.95rem] font-semibold sm:text-base" : "font-display text-base sm:text-lg"}`}>{schoolNames[lang]}</span>
            <span className="block truncate text-xs text-ash/70" lang={other}>{schoolNames[other]}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden shrink-0 xl:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              const isBook = item.href === "/classes";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded py-2 hover:text-turmeric ${lang === "ta" ? "px-2 text-[0.9rem]" : "px-2.5 text-[0.95rem]"} ${
                      active ? "text-turmeric" : "text-ash/90"
                    } ${isBook ? "ml-1 bg-kumkum text-ash! hover:bg-kumkum/85" : ""}`}
                  >
                    {isBook ? t.navBook : t[item.key]}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2">
              <LanguageToggle />
            </li>
            {site.showAdminLink && (
              <li>
                <Link href="/admin" title={t.admin} className="ml-1 flex rounded p-2 text-ash/60 hover:text-turmeric">
                  <AdminIcon />
                  <span className="sr-only">{t.admin}</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="rounded p-1.5 sm:p-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 xl:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block border-b border-white/10 py-3 text-lg aria-[current=page]:text-turmeric"
                >
                  {t[item.key]}
                </Link>
              </li>
            ))}
            {site.showAdminLink && (
              <li>
                <Link href="/admin" className="flex items-center gap-2 py-3 text-lg text-ash/60">
                  <AdminIcon /> {t.admin}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
