import Link from "next/link";
import { getDict } from "@/lib/lang";
import { getText, schoolNames } from "@/content/localized";
import { navItems } from "./nav";
import { whatsappLink } from "./whatsapp";

export default async function Footer() {
  const { lang, t } = await getDict();
  const { site } = getText(lang);
  const { contact } = site;
  const other = lang === "ta" ? "en" : "ta";
  return (
    <footer className="bg-karanai text-ash/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ash">{schoolNames[lang]}</p>
          <p className="mt-1 text-ash/70" lang={other}>{schoolNames[other]}</p>
          <p className="mt-4 max-w-xs">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-semibold text-ash">{t.pages}</p>
          <ul className="grid grid-cols-2 gap-y-2 md:grid-cols-1">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-turmeric">{t[n.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-semibold text-ash">{t.getInTouch}</p>
          <ul className="space-y-2">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">
                WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li><a href={`tel:+${contact.whatsapp}`} className="hover:text-turmeric">{t.call} {contact.phoneDisplay}</a></li>
            {contact.email && (
              <li><a href={`mailto:${contact.email}`} className="break-all hover:text-turmeric">{contact.email}</a></li>
            )}
            {contact.social.youtube && (
              <li><a href={contact.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">YouTube</a></li>
            )}
            {contact.social.facebook && (
              <li><a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">Facebook</a></li>
            )}
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5 text-sm text-ash/50 sm:px-6">
          <span>
            © {new Date().getFullYear()} {schoolNames[lang]}. {t.rights}
          </span>
          <span>
            {t.developedBy}{" "}
            <a href={site.developer.url} target="_blank" rel="noopener" className="font-semibold text-ash/80 hover:text-turmeric">
              {site.developer.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
