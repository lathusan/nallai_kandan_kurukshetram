/** Title band at the top of each inner page. */
export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="bg-wood text-ash">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
        <h1 className="text-4xl sm:text-6xl">{title}</h1>
        {intro && <p className="prose-width mt-4 text-lg text-ash/80">{intro}</p>}
      </div>
    </header>
  );
}
