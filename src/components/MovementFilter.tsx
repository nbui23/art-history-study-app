interface MovementFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export function MovementFilter({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  resultCount,
}: MovementFilterProps) {
  return (
    <section className="panel grid gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:items-end">
      <label className="space-y-2 text-sm font-medium text-slate-200">
        <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Exam category</span>
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium text-slate-200">
        <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Search</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search title, artist, category, or movement"
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500"
        />
      </label>

      <div className="flex items-center justify-between gap-3 lg:justify-end">
        <div className="pill">{resultCount} match{resultCount === 1 ? '' : 'es'}</div>
        {(selectedCategory !== 'All categories' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              onCategoryChange('All categories');
              onSearchChange('');
            }}
            className="button-ghost"
          >
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
