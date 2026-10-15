import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { classes, faqs, site } from "@/content/site";

export const metadata: Metadata = { title: "Classes & booking" };

export default function Classes() {
  return (
    <>
      <PageHeader
        title="Classes"
        intro={`Mridangam lessons with ${site.guruName} for children and adults, in ${site.location.split(",")[0]} or online.`}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <ul className="grid gap-px overflow-hidden rounded border border-ash-dark bg-ash-dark sm:grid-cols-2">
          {classes.map((c) => (
            <li key={c.name} className="bg-ash p-6 sm:p-8">
              <h2 className="text-3xl text-wood">{c.name}</h2>
              <p className="mt-1 text-kumkum">{c.who}</p>
              <ul className="mt-4 space-y-1.5">
                {c.details.map((d, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wood" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-semibold">{c.fee}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="book" className="scroll-mt-20 bg-ash-dark/60">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-4xl text-wood sm:text-5xl">Book a class</h2>
            <p className="prose-width mt-4 text-lg">
              Tell him who the lessons are for and when suits you. Your request opens in WhatsApp, and he will reply to confirm a time.
            </p>
            <p className="mt-6 text-muted">{site.contact.hours}</p>
          </div>
          <div className="rounded bg-ash p-5 sm:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="text-3xl text-wood sm:text-4xl">Questions</h2>
        <div className="mt-6 max-w-3xl divide-y divide-ash-dark border-y border-ash-dark">
          {faqs.map((f, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-2xl text-kumkum group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="prose-width mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
