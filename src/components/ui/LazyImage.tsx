import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);

    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      if (img.naturalWidth > 0) setLoaded(true);
      else setError(true);
    }
  }, [src]);

  return (
    <div
      className={`lazy-image-wrap relative overflow-hidden bg-[var(--bg-surface-2)] ${
        !loaded && !error ? 'min-h-[8rem]' : ''
      } ${wrapperClassName}`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-shimmer" aria-hidden />
      )}
      {error ? (
        <div className="flex min-h-[8rem] w-full flex-col items-center justify-center gap-2 p-4">
          <ImageOff size={20} className="text-[var(--text-muted)]" />
          <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">img load error</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  );
}
