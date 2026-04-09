import { Artwork, QuizNotes, QuizRating } from "../types";
import { ArtworkImage } from "./ArtworkImage";
import { ProgressMeter } from "./ProgressMeter";

interface QuizPanelProps {
  artwork: Artwork;
  notes: QuizNotes;
  revealed: boolean;
  currentRating?: QuizRating;
  reviewOnlyMissed: boolean;
  index: number;
  total: number;
  score: number;
  ratingCounts: Record<QuizRating, number>;
  onNotesChange: (field: keyof QuizNotes, value: string) => void;
  onReveal: () => void;
  onRate: (rating: QuizRating) => void;
  onToggleReviewOnly: (value: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

const ratingLabels: Record<QuizRating, string> = {
  "got-it": "Got it",
  partial: "Partial",
  missed: "Missed it",
};

export function QuizPanel({
  artwork,
  notes,
  revealed,
  currentRating,
  reviewOnlyMissed,
  index,
  total,
  score,
  ratingCounts,
  onNotesChange,
  onReveal,
  onRate,
  onToggleReviewOnly,
  onPrevious,
  onNext,
  onShuffle,
}: QuizPanelProps) {
  const ratingStyles: Record<QuizRating, string> = {
    "got-it": currentRating === "got-it" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700",
    partial: currentRating === "partial" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700",
    missed: currentRating === "missed" ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-700",
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <div className="panel flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {artwork.year ? <div className="pill">{artwork.year}</div> : null}
          <label className="ml-auto flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={reviewOnlyMissed}
              onChange={(event) => onToggleReviewOnly(event.target.checked)}
              className="h-4 w-4 rounded border-stone-300"
            />
            Review only missed cards
          </label>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Prompt</div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{artwork.title}</h2>
            <p className="mt-2 text-base text-slate-600">{artwork.artist}</p>
          </div>
        </div>

        <ArtworkImage src={artwork.image} alt={`${artwork.title} by ${artwork.artist}`} className="max-h-[24rem] bg-stone-200" />

        <ProgressMeter current={index + 1} total={total} label="Quiz progress" />

        <div className="grid gap-3 sm:grid-cols-4">
          <SessionStat label="Score" value={String(score)} />
          <SessionStat label="Got it" value={String(ratingCounts["got-it"])} />
          <SessionStat label="Partial" value={String(ratingCounts.partial)} />
          <SessionStat label="Missed" value={String(ratingCounts.missed)} />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-stone-200 pt-5">
          <button type="button" onClick={onReveal} className="button-primary">
            {revealed ? "Hide answer" : "Reveal answer"}
          </button>
          <button type="button" onClick={onPrevious} className="button-ghost">
            ← Previous
          </button>
          <button type="button" onClick={onNext} className="button-ghost">
            Next →
          </button>
          <button type="button" onClick={onShuffle} className="button-ghost">
            Shuffle
          </button>
        </div>
      </div>

      <div className="panel flex flex-col gap-5 p-5 sm:p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Your recall notes</div>
          <p className="mt-2 text-sm text-slate-600">
            Speak your answer aloud or jot quick notes before revealing the reference answer.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Exam category"
            value={notes.category}
            placeholder="Exam category bucket"
            onChange={(value) => onNotesChange("category", value)}
          />
          <Field
            label="Movement"
            value={notes.movement}
            placeholder="Style / movement"
            onChange={(value) => onNotesChange("movement", value)}
          />
          <Field
            label="Type"
            value={notes.type}
            placeholder="Painting, installation, photo, etc."
            onChange={(value) => onNotesChange("type", value)}
          />
          <Field
            label="Visual clues"
            value={notes.visualClues}
            placeholder="What in the image gives it away?"
            multiline
            onChange={(value) => onNotesChange("visualClues", value)}
          />
          <Field
            label="Theme"
            value={notes.theme}
            placeholder="Main subject or big idea"
            multiline
            onChange={(value) => onNotesChange("theme", value)}
          />
        </div>

        <Field
          label="Importance"
          value={notes.importance}
          placeholder="Why does it matter in art history?"
          multiline
          onChange={(value) => onNotesChange("importance", value)}
        />

        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reference answer</div>
              <p className="mt-1 text-sm text-slate-600">
                {revealed ? "Compare your response, then self-rate." : "Press Space or use the button to reveal."}
              </p>
            </div>
          </div>

          {revealed ? (
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <AnswerRow label="Exam category" content={artwork.examCategory} />
              <AnswerRow label="Movement / style" content={artwork.movementStyle} />
              <AnswerRow label="Type of work" content={artwork.typeOfWork} />
              <AnswerRow label="Visual clues" content={joinList(artwork.visualClues)} />
              <AnswerRow label="Themes" content={joinList(artwork.themes)} />
              <AnswerRow label="Importance to movement" content={artwork.importanceToMovement} />
              <AnswerRow label="Importance to art history" content={artwork.importanceToArtHistory} />
              <AnswerRow label="Main reasons it is important" content={joinList(artwork.mainReasonsImportant)} />
              {artwork.memoryHook ? <AnswerRow label="Memory hook" content={artwork.memoryHook} /> : null}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
              Hidden until you reveal the answer.
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-stone-200 pt-5">
          {(Object.keys(ratingLabels) as QuizRating[]).map((rating) => (
            <button
              key={rating}
              type="button"
              disabled={!revealed}
              onClick={() => onRate(rating)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${ratingStyles[rating]}`}
            >
              {ratingLabels[rating]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SessionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-stone-100 px-4 py-3">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  multiline = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700">
      <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400"
        />
      )}
    </label>
  );
}

function AnswerRow({ label, content }: { label: string; content: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <p>{content}</p>
    </div>
  );
}

function joinList(values?: string[]) {
  return values?.length ? values.join(" • ") : "—";
}
