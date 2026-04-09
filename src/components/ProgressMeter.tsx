interface ProgressMeterProps {
  current: number;
  total: number;
  label: string;
}

export function ProgressMeter({ current, total, label }: ProgressMeterProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.max(0, (current / safeTotal) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        <span>{label}</span>
        <span>
          {Math.min(current, total)}/{total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
