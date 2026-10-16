import type { Metadata, Viewport } from "next";
import "@fontsource/rozha-one/400.css";
import "@fontsource/hind-madurai/400.css";
import "@fontsource/hind-madurai/500.css";
import "@fontsource/hind-madurai/600.css";
import "@fontsource/noto-serif-tamil/600.css";
import "@fontsource/noto-serif-tamil/700.css";
import "./globals.css";
import { getLang } from "@/lib/lang";
import { getText, schoolNames } from "@/content/localized";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { site } = getText(lang);
  const school = schoolNames[lang];
  return {
    title: { default: `${school} | ${site.guruName}`, template: `%s | ${school}` },
    description: `${site.guruName}, ${site.guruTitle}, ${site.location}.`,
  };
}

export const viewport: Viewport = { themeColor: "#3d1b0e" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
