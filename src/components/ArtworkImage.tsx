import { useState } from 'react';

interface ArtworkImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ArtworkImage({ src, alt, className = '' }: ArtworkImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`flex min-h-[16rem] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800 p-6 text-center text-sm text-slate-400 ${className}`}
      >
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Image unavailable
          </div>
          <p>{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full rounded-2xl object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
