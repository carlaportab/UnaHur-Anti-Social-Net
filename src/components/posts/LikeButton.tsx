import { useState } from 'react';
import { Star } from 'lucide-react';

interface LikeButtonProps {
  initialCount: number;
}

const LIKE_CHARS = ['+', '>', '#', '!', '++', '^'];
const UNLIKE_CHARS = ['-', '~', 'x', '--'];

interface Particle {
  id: number;
  char: string;
  x: number; // offset % from center
  delay: number;
}

export function LikeButton({ initialCount }: LikeButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleKey, setParticleKey] = useState(0);

  const spawnParticles = (isLike: boolean) => {
    const chars = isLike ? LIKE_CHARS : UNLIKE_CHARS;
    const count = 3 + Math.floor(Math.random() * 2); // 3 or 4
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: particleKey + i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: -30 + Math.random() * 60, // spread -30px to +30px
      delay: i * 60,
    }));
    setParticleKey((k) => k + count);
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  const handleToggle = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));
    setAnimating(true);
    spawnParticles(nextLiked);
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

      {/* Partículas flotantes */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`like-particle pointer-events-none absolute font-mono text-xs font-bold ${
            liked ? 'text-[var(--green-light)]' : 'text-[var(--text-meta)]'
          }`}
          style={{
            left: `calc(50% + ${p.x}px)`,
            animationDelay: `${p.delay}ms`,
          }}
        >
          {p.char}
        </span>
      ))}
    </button>
  );
}
