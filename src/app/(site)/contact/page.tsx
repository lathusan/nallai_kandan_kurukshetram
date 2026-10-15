import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/content/site";
import { whatsappLink } from "@/components/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  const { contact } = site;
  const rows: { label: string; value: string; href?: string }[] = [
    { label: "WhatsApp", value: contact.phoneDisplay, href: whatsappLink() },
    { label: "Phone", value: contact.phoneDisplay, href: `tel:+${contact.whatsapp}` },
    ...(contact.email ? [{ label: "Email", value: contact.email, href: `mailto:${contact.email}` }] : []),
    { label: "Address", value: contact.address },
    { label: "Hours", value: contact.hours },
  ];
  return (
    <>
      <PageHeader title="Contact" intro="For classes, concert bookings, or copies of his books." />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
        <div>
          <a
            href={whatsappLink("Hello, I would like to get in touch.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded bg-[#1f8f4e] px-6 py-4 text-lg font-semibold text-white hover:bg-[#187a42]"
          >
            <WhatsAppIcon className="h-6 w-6" /> Message on WhatsApp
          </a>
          <dl className="mt-10 divide-y divide-ash-dark border-y border-ash-dark">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr]">
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
            Booking a class?{" "}
            <Link href="/classes#book" className="font-semibold text-kumkum underline underline-offset-4">Use the booking form</Link>
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
            title={`Map showing ${contact.address}`}
            className="aspect-square w-full rounded border-0 md:aspect-auto md:min-h-[28rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
      </div>
    </>
  );
}
