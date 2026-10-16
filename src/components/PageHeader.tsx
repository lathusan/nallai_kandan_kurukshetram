/** Title band at the top of each inner page. */
export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="bg-wood text-ash">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        <h1 className="text-3xl sm:text-5xl">{title}</h1>
        {intro && <p className="prose-width mt-2 text-ash/80 sm:text-lg">{intro}</p>}
      </div>
    </header>
  );
}
