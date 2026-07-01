import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--green)] text-[var(--on-accent)] hover:bg-[var(--green-hover)] shadow-[var(--glow-green)]',
  secondary:
    'bg-transparent border border-[var(--border-hover)] text-[var(--text-primary)] hover:border-[var(--border-green)] hover:text-[var(--green-light)]',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)]',
  danger:
    'bg-transparent border border-[var(--red)]/40 text-[var(--red)] hover:bg-[var(--red)]/10 hover:border-[var(--red)]',
};

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-semibold transition-all duration-[var(--transition-fast)] disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
