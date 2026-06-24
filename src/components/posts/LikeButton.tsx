import { useState } from 'react';
import { Star } from 'lucide-react';

interface LikeButtonProps {
  initialCount: number;
}

export function LikeButton({ initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [floatKey, setFloatKey] = useState(0);
  const [floatDelta, setFloatDelta] = useState<1 | -1>(1);

  const handleToggle = () => {
    if (liked) {
      setLiked(false);
      setCount((c) => Math.max(0, c - 1));
      setFloatDelta(-1);
      setFloatKey((k) => k + 1);
      setAnimating(true);
      window.setTimeout(() => setAnimating(false), 450);
      return;
    }

    setLiked(true);
    setCount((c) => c + 1);
    setFloatDelta(1);
    setAnimating(true);
    setFloatKey((k) => k + 1);
    window.setTimeout(() => setAnimating(false), 450);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`like-btn action-btn tap-target relative flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-2 font-mono text-xs transition-all active:scale-95 ${
        liked
          ? 'text-[var(--green-light)]'
          : 'text-[var(--text-muted)] hover:bg-[var(--bg-glass)] hover:text-[var(--green-light)]'
      } ${animating ? (liked ? 'like-btn-pop' : 'like-btn-unpop') : ''}`}
      aria-pressed={liked}
      aria-label={liked ? 'Quitar ++' : 'Dar ++'}
    >
      <Star
        size={16}
        className={`shrink-0 transition-all ${liked ? 'fill-[var(--green)] text-[var(--green-light)]' : ''}`}
      />
      <span className={animating ? 'like-count-bump' : ''}>{count}</span>
      {animating && (
        <span
          key={floatKey}
          className={`like-float pointer-events-none absolute -top-1 left-1/2 font-mono text-xs font-bold ${
            floatDelta > 0 ? 'text-[var(--green-light)]' : 'text-[var(--text-meta)]'
          }`}
        >
          {floatDelta > 0 ? '+1' : '-1'}
        </span>
      )}
    </button>
  );
}
