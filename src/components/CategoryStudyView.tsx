import { Artwork } from "../types";
import { ArtworkImage } from "./ArtworkImage";

interface CategoryStudyViewProps {
  categories: readonly string[];
  selectedCategory: string;
  categoryCounts: Record<string, number>;
  artworks: Artwork[];
  onSelectCategory: (category: string) => void;
  onStudyCategoryOnly: () => void;
}

export function CategoryStudyView({
  categories,
  selectedCategory,
  categoryCounts,
  artworks,
  onSelectCategory,
  onStudyCategoryOnly,
}: CategoryStudyViewProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="panel p-4 sm:p-5">
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Exam categories</div>
          <p className="mt-2 text-sm text-slate-600">Choose a bucket, then jump into flashcards for just that category.</p>
        </div>

        <div className="space-y-2">
          {categories.map((category) => {
            const active = category === selectedCategory;
            const count = categoryCounts[category] ?? 0;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                  active ? "bg-slate-900 text-white" : "bg-stone-100 text-slate-700 hover:bg-stone-200"
                }`}
              >
                <span className="pr-3 font-medium">{category}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs ${active ? "bg-white/15 text-white" : "bg-white text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="space-y-4">
        <div className="panel flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Selected category</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{selectedCategory}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {artworks.length} artwork{artworks.length === 1 ? "" : "s"} in this exam bucket.
            </p>
          </div>
          <button type="button" onClick={onStudyCategoryOnly} className="button-primary">
            Study this category only
          </button>
        </div>

        {artworks.length ? (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {artworks.map((artwork) => (
              <article key={artwork.id} className="panel overflow-hidden">
                <div className="border-b border-stone-200 bg-stone-100/70 p-4">
                  <ArtworkImage src={artwork.image} alt={`${artwork.title} by ${artwork.artist}`} className="max-h-56 w-full bg-stone-200" />
                </div>
                <div className="space-y-3 p-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">{artwork.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{artwork.artist}</p>
                    {artwork.year ? <p className="mt-2 text-sm font-medium text-slate-500">{artwork.year}</p> : null}
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    Flip or reveal in study mode to see the movement, type, visual clues, themes, and why it matters.
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="panel px-6 py-10 text-center text-sm text-slate-600">No artworks are assigned to this exam category yet.</div>
        )}
      </div>
    </section>
  );
}
