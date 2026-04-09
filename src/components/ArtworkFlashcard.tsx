import type { ReactNode } from "react";
import { Artwork, ReviewStatus } from "../types";
import { ArtworkImage } from "./ArtworkImage";
import { ProgressMeter } from "./ProgressMeter";

interface ArtworkFlashcardProps {
  artwork: Artwork;
  flipped: boolean;
  reviewStatus?: ReviewStatus;
  reviewOnlyFlagged: boolean;
  index: number;
  total: number;
  onFlip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onToggleReviewOnly: (value: boolean) => void;
  onReviewStatusChange: (status: ReviewStatus) => void;
}

const statusText: Record<ReviewStatus, string> = {
  "need-review": "Need review",
  confident: "Confident",
};

export function ArtworkFlashcard({
  artwork,
  flipped,
  reviewStatus,
  reviewOnlyFlagged,
  index,
  total,
  onFlip,
  onPrevious,
  onNext,
  onShuffle,
  onToggleReviewOnly,
  onReviewStatusChange,
}: ArtworkFlashcardProps) {
  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)]">
        <div className="border-b border-slate-800 bg-slate-900/70 p-4 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex h-full flex-col gap-5">
            <ArtworkImage
              src={artwork.image}
              alt={`${artwork.title} by ${artwork.artist}`}
              className="max-h-[34rem] w-full bg-slate-800"
            />

            <div className="rounded-3xl bg-slate-950/75 p-5 shadow-sm ring-1 ring-stone-200/70">
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {flipped ? "Answer revealed" : "Answer hidden"}
                </div>
                {reviewStatus ? <div className="pill">{statusText[reviewStatus]}</div> : null}
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{artwork.title}</h2>
              <p className="mt-2 text-base text-slate-300">{artwork.artist}</p>
              {artwork.year ? <p className="mt-2 text-sm font-medium text-slate-400">{artwork.year}</p> : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <PromptCard
                  title="Before you reveal"
                  body="Name the movement/style, type of work, and the strongest visual clues from memory first."
                />
                <PromptCard
                  title="Keyboard"
                  body="Space = hide/show answer, ←/→ = previous/next, S = shuffle."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6 xl:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={onFlip} className="button-primary">
              {flipped ? "Hide answer" : "Show answer"}
            </button>
            <button type="button" onClick={() => onReviewStatusChange("need-review")} className="button-secondary">
              Need review
            </button>
            <button type="button" onClick={() => onReviewStatusChange("confident")} className="button-secondary">
              Confident
            </button>
            <label className="ml-auto flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={reviewOnlyFlagged}
                onChange={(event) => onToggleReviewOnly(event.target.checked)}
                className="h-4 w-4 rounded border-slate-700"
              />
              Review only need review cards
            </label>
          </div>

          <ProgressMeter current={index + 1} total={total} label="Deck progress" />

          {!flipped ? (
            <HiddenAnswerState />
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Exam category</div>
                <p className="mt-1 font-medium">{artwork.examCategory}</p>
              </div>

              <div className="max-h-[42rem] space-y-4 overflow-y-auto pr-1">
                <DetailCard title="Movement / style">
                  <p>{artwork.movementStyle}</p>
                </DetailCard>
                <DetailCard title="Type of painting/work">
                  <p>{artwork.typeOfWork}</p>
                </DetailCard>
                <DetailCard title="Visual clues">
                  <BulletList items={artwork.visualClues} emptyLabel="No visual clues yet." />
                </DetailCard>
                <DetailCard title="Themes">
                  <div className="flex flex-wrap gap-2">
                    {(artwork.themes ?? []).length ? (
                      artwork.themes?.map((theme) => (
                        <span key={theme} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                          {theme}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">No themes yet.</span>
                    )}
                  </div>
                </DetailCard>
                <DetailCard title="Importance to the movement">
                  <p>{artwork.importanceToMovement}</p>
                </DetailCard>
                <DetailCard title="Importance to art history">
                  <p>{artwork.importanceToArtHistory}</p>
                </DetailCard>
                <DetailCard title="Main reasons it is important">
                  <BulletList items={artwork.mainReasonsImportant} emptyLabel="No reasons yet." />
                </DetailCard>
                {artwork.memoryHook ? (
                  <DetailCard title="Memory hook" accent>
                    <p className="font-medium text-slate-100">{artwork.memoryHook}</p>
                  </DetailCard>
                ) : null}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-5">
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
      </div>
    </section>
  );
}

function HiddenAnswerState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950 px-5 py-6 text-sm text-slate-300">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Hide/show answer flow</div>
      <p className="mt-3 leading-7">
        Keep testing yourself before you reveal. Try saying the movement/style, type of work, visual clues, themes, and why it matters.
      </p>
      <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-4 text-slate-200 ring-1 ring-stone-200">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Check yourself after reveal</div>
        <p className="mt-2 leading-7">You will see the exam category, movement/style, type, clues, themes, significance, and memory hook only after revealing the answer.</p>
      </div>
    </div>
  );
}

function PromptCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-200">{body}</p>
    </div>
  );
}

function DetailCard({ title, children, accent = false }: { title: string; children: ReactNode; accent?: boolean }) {
  return (
    <section className={accent ? "rounded-3xl border border-sky-100 bg-sky-50 p-5" : "rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm"}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-slate-200">{children}</div>
    </section>
  );
}

function BulletList({ items, emptyLabel }: { items?: string[]; emptyLabel: string }) {
  if (!items?.length) {
    return <p className="text-sm text-slate-400">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-sky-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
