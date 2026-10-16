import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getDict } from "@/lib/lang";
import { getText } from "@/content/localized";
import { whatsappLink } from "@/components/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return { title: t.contact };
}

export default async function Contact() {
  const { lang, t } = await getDict();
  const { site } = getText(lang);
  const { contact } = site;
  const rows: { label: string; value: string; href?: string }[] = [
    { label: "WhatsApp", value: contact.phoneDisplay, href: whatsappLink() },
    { label: t.phone, value: contact.phoneDisplay, href: `tel:+${contact.whatsapp}` },
    ...(contact.email ? [{ label: t.email, value: contact.email, href: `mailto:${contact.email}` }] : []),
    { label: t.address, value: site.address },
    { label: t.hours, value: site.hours },
  ];
  return (
    <>
      <PageHeader title={t.contact} intro={t.contactIntro} />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
        <div>
          <a
            href={whatsappLink(t.getInTouchMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded bg-[#1f8f4e] px-6 py-4 text-lg font-semibold text-white hover:bg-[#187a42]"
          >
            <WhatsAppIcon className="h-6 w-6" /> {t.messageWhatsApp}
          </a>
          <dl className="mt-10 divide-y divide-ash-dark border-y border-ash-dark">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
                <dt className="text-muted">{r.label}</dt>
                <dd className="break-words font-medium">
                  {r.href ? (
                    <a href={r.href} className="hover:text-kumkum" {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {r.value}
                    </a>
                  ) : r.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8">
            {t.bookingQ}{" "}
            <Link href="/classes#book" className="font-semibold text-kumkum underline underline-offset-4">{t.useForm}</Link>
          </p>
          <p className="mt-4 flex gap-5">
            {contact.social.facebook && (
              <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-kumkum">Facebook</a>
            )}
            {contact.social.youtube && (
              <a href={contact.social.youtube} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-kumkum">YouTube</a>
            )}
          </p>
        </div>
        {contact.mapEmbed && (
          <iframe
            src={contact.mapEmbed}
            title={`${t.mapOf} ${site.address}`}
            className="aspect-square w-full rounded border-0 md:aspect-auto md:min-h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </>
  );
}
