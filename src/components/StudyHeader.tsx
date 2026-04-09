import { StudyMode } from '../types';

export interface CategoryProgressStat {
  category: string;
  total: number;
  reviewed: number;
  needReview: number;
}

interface StudyHeaderProps {
  mode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
  totalCount: number;
  filteredCount: number;
  needReviewCount: number;
  confidentCount: number;
  categoryStats: CategoryProgressStat[];
}

const MODES: { id: StudyMode; label: string; description: string }[] = [
  { id: 'flashcards', label: 'Flashcards', description: 'Spoiler-free fronts, full recall on flip' },
  { id: 'quiz', label: 'Quiz', description: 'Recall, reveal, self-rate' },
  { id: 'categories', label: 'Categories', description: 'Browse the exam outline by bucket' },
  { id: 'compare', label: 'Compare', description: 'Study side by side' },
  { id: 'cram', label: 'Cram sheet', description: 'Compact review summaries' },
];

export function StudyHeader({
  mode,
  onModeChange,
  totalCount,
  filteredCount,
  needReviewCount,
  confidentCount,
  categoryStats,
}: StudyHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="pill">Local-first art history study app</div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Art history exam prep</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Study by exam category first, then flip to reveal movement, type, visual clues, themes, and why each work matters.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="panel px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Visible works</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{filteredCount}</div>
            <p className="text-sm text-slate-500">of {totalCount} total</p>
          </div>
          <div className="panel px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Need review</div>
            <div className="mt-2 text-2xl font-semibold text-amber-600">{needReviewCount}</div>
            <p className="text-sm text-slate-500">flagged for another pass</p>
          </div>
          <div className="panel px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Confident</div>
            <div className="mt-2 text-2xl font-semibold text-emerald-600">{confidentCount}</div>
            <p className="text-sm text-slate-500">ready to explain aloud</p>
          </div>
        </div>
      </div>

      <div className="panel flex flex-col gap-4 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {MODES.map((option) => {
            const active = option.id === mode;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onModeChange(option.id)}
                className={
                  active
                    ? 'rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white'
                    : 'rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-stone-200 hover:text-slate-900'
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-slate-700">{MODES.find((option) => option.id === mode)?.description}</span> • Keyboard:
            Space = flip/reveal, ←/→ = navigate, S = shuffle.
          </p>
          <div className="pill">State is saved in localStorage</div>
        </div>
      </div>

      <section className="panel space-y-4 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Exam category snapshot</div>
            <p className="mt-1 text-sm text-slate-600">Quick progress by exam bucket so you can spot thin areas before the test.</p>
          </div>
          <div className="pill">Reviewed = confident + need review</div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {categoryStats.map((stat) => {
            const percent = stat.total ? Math.round((stat.reviewed / stat.total) * 100) : 0;

            return (
              <article key={stat.category} className="rounded-3xl bg-stone-100 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900">{stat.category}</h3>
                  <div className="text-xs font-medium text-slate-500">
                    {stat.reviewed}/{stat.total}
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${percent}%` }} />
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-white px-2.5 py-1">Reviewed: {stat.reviewed}</span>
                  <span className="rounded-full bg-white px-2.5 py-1">Need review: {stat.needReview}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </header>
  );
}
