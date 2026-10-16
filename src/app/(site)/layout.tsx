// Everything visitors see: menu, footer, background mridangam and WhatsApp button.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RhythmProvider from "@/components/RhythmProvider";
import SoundToggle from "@/components/SoundToggle";
import LangProvider from "@/components/LangProvider";
import { getDict } from "@/lib/lang";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { lang, t } = await getDict();
  return (
    <LangProvider lang={lang}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ash focus:px-4 focus:py-2">
        {t.skip}
      </a>
      <RhythmProvider>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SoundToggle />
        <WhatsAppFloat />
      </RhythmProvider>
    </LangProvider>
  );
}
