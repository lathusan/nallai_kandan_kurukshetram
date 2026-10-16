import Link from "next/link";
import DrumHead from "@/components/DrumHead";
import { getDict } from "@/lib/lang";

export default async function NotFound() {
  const { t } = await getDict();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <DrumHead className="w-32" />
      <h1 className="mt-8 text-4xl text-wood">{t.notFound}</h1>
      <p className="mt-3 text-muted">{t.notFoundText}</p>
      <Link href="/" className="mt-8 rounded bg-kumkum px-6 py-3 font-semibold text-ash">{t.goHome}</Link>
    </div>
  );
}
