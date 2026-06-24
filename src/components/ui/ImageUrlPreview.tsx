import { LazyImage } from './LazyImage';

function isValidImageUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

interface PreviewTileProps {
  url: string;
  index: number;
}

function PreviewTile({ url, index }: PreviewTileProps) {
  return (
    <div className="image-preview-tile relative shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)]">
      <span className="absolute left-2 top-2 z-10 rounded bg-[var(--bg-base)]/80 px-1.5 py-0.5 font-mono text-[0.6rem] text-[var(--text-muted)]">
        #{index + 1}
      </span>
      <LazyImage
        src={url}
        alt={`Preview ${index + 1}`}
        wrapperClassName="h-28 w-36 sm:h-32 sm:w-40"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

interface ImageUrlPreviewProps {
  urls: string[];
}

export function ImageUrlPreview({ urls }: ImageUrlPreviewProps) {
  const validUrls = urls.map((u) => u.trim()).filter(isValidImageUrl);

  if (validUrls.length === 0) return null;

  return (
    <div className="mt-4 animate-fade-up">
      <p className="mb-2 font-mono text-[0.65rem] text-[var(--text-muted)]">
        {'> preview ('}{validUrls.length}{')'}
      </p>
      <div className="image-preview-strip -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
        {validUrls.map((url, i) => (
          <PreviewTile key={`${url}-${i}`} url={url} index={i} />
        ))}
      </div>
    </div>
  );
}
