import type { Metadata, Viewport } from "next";
import "@fontsource/rozha-one/400.css";
import "@fontsource/hind-madurai/400.css";
import "@fontsource/hind-madurai/500.css";
import "@fontsource/hind-madurai/600.css";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${site.schoolName} | Mridangam, ${site.location}`, template: `%s | ${site.schoolName}` },
  description: `${site.guruName}, ${site.guruTitle.toLowerCase()} in ${site.location}. Concerts, books, lessons and mridangam classes.`,
};

export const viewport: Viewport = { themeColor: "#3d1b0e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
