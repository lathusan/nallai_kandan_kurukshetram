import type { Dict } from "@/content/ui";

type NavKey = "navBiography" | "navPrograms" | "navNews" | "navBooks" | "navLessons" | "navClasses" | "navContact";

export const navItems: { href: string; key: NavKey }[] = [
  { href: "/about", key: "navBiography" },
  { href: "/programs", key: "navPrograms" },
  { href: "/news", key: "navNews" },
  { href: "/library", key: "navBooks" },
  { href: "/lessons", key: "navLessons" },
  { href: "/classes", key: "navClasses" },
  { href: "/contact", key: "navContact" },
];

export const navLabel = (t: Dict, key: NavKey) => t[key];
