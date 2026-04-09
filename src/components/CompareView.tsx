import { Artwork } from "../types";
import { ArtworkImage } from "./ArtworkImage";

interface CompareViewProps {
  artworks: Artwork[];
  leftId: string;
  rightId: string;
  onSelectLeft: (id: string) => void;
  onSelectRight: (id: string) => void;
}

export function CompareView({ artworks, leftId, rightId, onSelectLeft, onSelectRight }: CompareViewProps) {
  if (artworks.length < 2) {
    return (
      <div className="panel px-6 py-10 text-center text-sm text-slate-300">
        Need at least two artworks in the current filter to compare side by side.
      </div>
    );
  }

  const left = artworks.find((artwork) => artwork.id === leftId) ?? artworks[0];
  const right = artworks.find((artwork) => artwork.id === rightId) ?? artworks[1];
  const sharedThemes = (left.themes ?? []).filter((theme) => (right.themes ?? []).includes(theme));
  const comparisonPrompts = [
    left.examCategory === right.examCategory
      ? `Shared exam category: ${left.examCategory}`
      : `Exam category contrast: ${left.examCategory} vs ${right.examCategory}`,
    left.movementStyle === right.movementStyle
      ? `Shared movement/style: ${left.movementStyle}`
      : `Movement/style contrast: ${left.movementStyle} vs ${right.movementStyle}`,
    "Use the exam-category placement plus the significance sections to explain how each work matters.",
  ];

  return (
    <section className="space-y-6">
      <div className="panel grid gap-4 px-4 py-4 sm:px-6 lg:grid-cols-2">
        <SelectCard label="Artwork A" value={left.id} artworks={artworks} onChange={onSelectLeft} />
        <SelectCard label="Artwork B" value={right.id} artworks={artworks} onChange={onSelectRight} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <CompareColumn artwork={left} />
        <CompareColumn artwork={right} />
      </div>

      <div className="panel space-y-4 px-5 py-5 sm:px-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Quick compare takeaways</div>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">What connects them?</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InsightCard title="Shared themes" items={sharedThemes.length ? sharedThemes : ["No exact shared theme labels in the current notes."]} />
          <InsightCard title="Comparison prompts" items={comparisonPrompts} />
        </div>
      </div>
    </section>
  );
}

function SelectCard({
  label,
  value,
  artworks,
  onChange,
}: {
  label: string;
  value: string;
  artworks: Artwork[];
  onChange: (id: string) => void;
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-200">
      <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100"
      >
        {artworks.map((artwork) => (
          <option key={artwork.id} value={artwork.id}>
            {artwork.examCategory} — {artwork.artist} — {artwork.title}
          </option>
        ))}
      </select>
    </label>
  );
}

function CompareColumn({ artwork }: { artwork: Artwork }) {
  return (
    <article className="panel overflow-hidden">
      <div className="border-b border-slate-800 bg-slate-900/70 p-4 sm:p-5">
        <ArtworkImage src={artwork.image} alt={`${artwork.title} by ${artwork.artist}`} className="max-h-[18rem] bg-slate-800" />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <div className="pill">{artwork.examCategory}</div>
          {artwork.year ? <div className="pill">{artwork.year}</div> : null}
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-50">{artwork.title}</h3>
          <p className="mt-2 text-slate-300">{artwork.artist}</p>
        </div>

        <CompareRow label="Movement / style" value={artwork.movementStyle} />
        <CompareRow label="Type" value={artwork.typeOfWork} />
        <CompareRow label="Visual clues" value={joinList(artwork.visualClues)} />
        <CompareRow label="Themes" value={joinList(artwork.themes)} />
        <CompareRow label="Importance to movement" value={artwork.importanceToMovement} />
        <CompareRow label="Importance to art history" value={artwork.importanceToArtHistory} />
        <CompareRow label="Main reasons important" value={joinList(artwork.mainReasonsImportant)} />
      </div>
    </article>
  );
}

function CompareRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 text-sm leading-6 text-slate-200">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <p>{value}</p>
    </div>
  );
}

function InsightCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-slate-800 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function joinList(values?: string[]) {
  return values?.length ? values.join(" • ") : "—";
}
