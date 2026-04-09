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
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-stone-200 bg-stone-100/70 p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <ArtworkImage
            src={artwork.image}
            alt={`${artwork.title} by ${artwork.artist}`}
            className="max-h-[28rem] w-full bg-stone-200"
          />
        </div>

        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {flipped ? "Revealed side" : "Spoiler-free front"}
            </div>
            {reviewStatus ? <div className="pill">{statusText[reviewStatus]}</div> : null}
            <label className="ml-auto flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={reviewOnlyFlagged}
                onChange={(event) => onToggleReviewOnly(event.target.checked)}
                className="h-4 w-4 rounded border-stone-300"
              />
              Study only need review
            </label>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{artwork.title}</h2>
            <p className="mt-2 text-base text-slate-600">{artwork.artist}</p>
            {artwork.year ? <p className="mt-2 text-sm font-medium text-slate-500">{artwork.year}</p> : null}
          </div>

          {!flipped ? (
            <div className="space-y-4 text-sm leading-6 text-slate-600">
              <p>
                Use the front to identify the work from the image alone, then flip to check the exam category,
                movement, type, clues, themes, and significance.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-100 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Recall prompt</div>
                  <p className="mt-2 text-sm text-slate-700">What exam category is it in, and what visual evidence helps you prove it?</p>
                </div>
                <div className="rounded-2xl bg-stone-100 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Study goal</div>
                  <p className="mt-2 text-sm text-slate-700">Keep the front spoiler-free, then explain the work out loud before flipping.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-sm leading-6 text-slate-700">
              <DetailSection title="Exam category">
                <p>{artwork.examCategory}</p>
              </DetailSection>
              <DetailSection title="Movement / style">
                <p>{artwork.movementStyle}</p>
              </DetailSection>
              <DetailSection title="Type of work">
                <p>{artwork.typeOfWork}</p>
              </DetailSection>
              <DetailSection title="Visual clues">
                <ul className="space-y-2">
                  {(artwork.visualClues ?? []).map((clue) => (
                    <li key={clue} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-600" />
                      <span>{clue}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
              <DetailSection title="Themes">
                <div className="flex flex-wrap gap-2">
                  {(artwork.themes ?? []).map((theme) => (
                    <span key={theme} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {theme}
                    </span>
                  ))}
                </div>
              </DetailSection>
              <DetailSection title="Importance to movement">
                <p>{artwork.importanceToMovement}</p>
              </DetailSection>
              <DetailSection title="Importance to art history">
                <p>{artwork.importanceToArtHistory}</p>
              </DetailSection>
              <DetailSection title="Main reasons it is important">
                <ul className="space-y-2">
                  {artwork.mainReasonsImportant.map((reason) => (
                    <li key={reason} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-600" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
              {artwork.memoryHook ? (
                <DetailSection title="Memory hook">
                  <p className="font-medium text-slate-900">{artwork.memoryHook}</p>
                </DetailSection>
              ) : null}
            </div>
          )}

          <ProgressMeter current={index + 1} total={total} label="Deck progress" />

          <div className="flex flex-col gap-3 border-t border-stone-200 pt-5">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={onFlip} className="button-primary">
                {flipped ? "Show front" : "Flip card"}
              </button>
              <button type="button" onClick={() => onReviewStatusChange("need-review")} className="button-secondary">
                Need review
              </button>
              <button type="button" onClick={() => onReviewStatusChange("confident")} className="button-secondary">
                Confident
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
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
      </div>
    </section>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</h3>
      {children}
    </section>
  );
}
