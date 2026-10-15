import Link from "next/link";
import DrumHead from "@/components/DrumHead";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <DrumHead className="w-32" />
      <h1 className="mt-8 text-4xl text-wood">This page is not here</h1>
      <p className="mt-3 text-muted">The link may be old or mistyped.</p>
      <Link href="/" className="mt-8 rounded bg-kumkum px-6 py-3 font-semibold text-ash">Go to the home page</Link>
    </div>
  );
}
