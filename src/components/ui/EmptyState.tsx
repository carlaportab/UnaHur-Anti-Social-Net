import type { ReactNode } from 'react';

interface EmptyStateProps {
  ascii?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

export function EmptyState({ ascii = '> ∅', title, children, className = '' }: EmptyStateProps) {
  return (
    <div className={`empty-state rounded-[var(--radius-md)] border border-dashed border-[var(--border)] px-6 py-10 text-center ${className}`}>
      <pre className="mb-4 font-mono text-2xl text-[var(--green-dim)]">{ascii}</pre>
      <p className="font-mono text-sm text-[var(--text-muted)]">{title}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
