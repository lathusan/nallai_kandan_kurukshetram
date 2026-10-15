"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import DrumHead from "./DrumHead";
import { navItems } from "./nav";


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

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="sticky top-0 z-50 border-b border-black/30 bg-wood-deep text-ash">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <DrumHead className="h-9 w-9 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg">{site.schoolName}</span>
            <span className="block truncate text-xs text-ash/70">{site.schoolNameTamil}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded px-3 py-2 text-[0.95rem] hover:text-turmeric ${
                      active ? "text-turmeric" : "text-ash/90"
                    } ${item.href === "/classes" ? "ml-2 bg-kumkum text-ash! hover:bg-kumkum/85" : ""}`}
                  >
                    {item.href === "/classes" ? "Book a class" : item.label}
                  </Link>
                </li>
              );
            })}
            {site.showAdminLink && (
              <li>
                <Link href="/admin" title="Admin" className="ml-1 flex rounded p-2 text-ash/60 hover:text-turmeric">
                  <AdminIcon />
                  <span className="sr-only">Admin</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded p-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="block border-b border-white/10 py-3 text-lg last:border-0 aria-[current=page]:text-turmeric"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {site.showAdminLink && (
              <li>
                <Link href="/admin" className="flex items-center gap-2 py-3 text-lg text-ash/60">
                  <AdminIcon /> Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}
