import { Artwork } from "../types";

interface CramSheetProps {
  artworks: Artwork[];
}

export function CramSheet({ artworks }: CramSheetProps) {
  if (!artworks.length) {
    return <div className="panel px-6 py-10 text-center text-sm text-slate-300">No artworks match the current filters.</div>;
  }

  const grouped = artworks.reduce<Record<string, Artwork[]>>((accumulator, artwork) => {
    accumulator[artwork.examCategory] ??= [];
    accumulator[artwork.examCategory].push(artwork);
    return accumulator;
  }, {});

  return (
    <section className="space-y-6">
      {Object.entries(grouped).map(([category, categoryArtworks]) => (
        <div key={category} className="space-y-4">
          <div className="panel px-5 py-4 sm:px-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Exam category</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">{category}</h2>
            <p className="mt-2 text-sm text-slate-300">
              {categoryArtworks.length} artwork{categoryArtworks.length === 1 ? "" : "s"} in this section.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {categoryArtworks.map((artwork) => (
              <details key={artwork.id} className="panel group overflow-hidden px-5 py-5 sm:px-6">
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{artwork.examCategory}</div>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">{artwork.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {artwork.artist}
                        {artwork.year ? ` • ${artwork.year}` : ""}
                      </p>
                    </div>
                    <div className="pill transition group-open:bg-slate-900 group-open:text-white">Expand</div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <SummaryBlock title="3 visual clues" content={(artwork.visualClues ?? []).slice(0, 3).join(" • ") || "—"} />
                    <SummaryBlock title="Main theme" content={artwork.themes?.[0] ?? "—"} />
                    <SummaryBlock title="Why it matters" content={artwork.importanceToArtHistory} />
                  </div>
                </summary>

                <div className="mt-5 space-y-4 border-t border-slate-800 pt-5 text-sm leading-6 text-slate-200">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Movement / style</div>
                    <p className="mt-1">{artwork.movementStyle}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Type</div>
                    <p className="mt-1">{artwork.typeOfWork}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">All themes</div>
                    <p className="mt-1">{artwork.themes?.join(" • ") || "—"}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Importance to movement</div>
                    <p className="mt-1">{artwork.importanceToMovement}</p>
                  </div>
                  {artwork.memoryHook ? (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Memory hook</div>
                      <p className="mt-1 font-medium text-slate-100">{artwork.memoryHook}</p>
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function SummaryBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-200">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <p className="mt-2 leading-6">{content}</p>
    </div>
  );
}
