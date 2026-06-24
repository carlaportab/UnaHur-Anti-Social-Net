import { type ReactNode } from 'react';

type BadgeVariant = 'green' | 'cyan' | 'red' | 'amber' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  green: 'bg-[var(--green-dim)]/50 text-[var(--green-light)] border-[var(--border-green)]',
  cyan: 'bg-[var(--cyan)]/15 text-[var(--cyan-light)] border-[var(--cyan)]/40',
  red: 'bg-[var(--red)]/10 text-[var(--red)] border-[var(--red)]/30',
  amber: 'bg-[var(--amber)]/10 text-[var(--amber)] border-[var(--amber)]/30',
  gray: 'bg-[var(--bg-surface-2)] text-[var(--text-muted)] border-[var(--border)]',
};

export function Badge({ variant = 'green', children, className = '', compact = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono font-semibold uppercase tracking-wider ${
        compact
          ? 'px-1.5 py-px text-[0.55rem] sm:text-[0.6rem]'
          : 'px-2.5 py-0.5 text-[0.65rem]'
      } ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
