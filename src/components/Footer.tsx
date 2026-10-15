import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "./nav";
import { whatsappLink } from "./whatsapp";

export default function Footer() {
  const { contact } = site;
  return (
    <footer className="bg-karanai text-ash/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ash">{site.schoolName}</p>
          <p className="mt-1 text-ash/70">{site.schoolNameTamil}</p>
          <p className="mt-4 max-w-xs">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-semibold text-ash">Pages</p>
          <ul className="grid grid-cols-2 gap-y-2 md:grid-cols-1">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-turmeric">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-semibold text-ash">Get in touch</p>
          <ul className="space-y-2">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">
                WhatsApp {contact.phoneDisplay}
              </a>
            </li>
            <li><a href={`tel:+${contact.whatsapp}`} className="hover:text-turmeric">Call {contact.phoneDisplay}</a></li>
            {contact.email && (
              <li><a href={`mailto:${contact.email}`} className="break-all hover:text-turmeric">{contact.email}</a></li>
            )}
            {contact.social.youtube && (
              <li><a href={contact.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">YouTube</a></li>
            )}
            {contact.social.facebook && (
              <li><a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-turmeric">Facebook</a></li>
            )}
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-ash/50 sm:px-6">
          © {new Date().getFullYear()} {site.schoolName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
