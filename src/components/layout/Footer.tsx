import { ExternalLink } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';

interface FooterProps {
  className?: string;
  variant?: 'full' | 'minimal';
}

export function Footer({ className = '', variant = 'full' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer
        className={`mobile-footer-strip border-t border-[var(--border)] bg-[var(--bg-surface)]/90 py-2.5 backdrop-blur-sm ${className}`}
      >
        <p className="text-center font-mono text-[0.6rem] text-[var(--text-meta)]">
          UNAHUR · <GlitchText>Anti-Social Net</GlitchText> · © {new Date().getFullYear()}
        </p>
      </footer>
    );
  }

  return (
    <footer className={`mt-auto border-t border-[var(--border)] bg-[var(--bg-surface)] ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-xs font-black text-[var(--on-accent)] shadow-[var(--glow-green)]">
                A
              </div>
              <div className="leading-tight text-left">
                <span className="block text-sm font-semibold text-[var(--text-secondary)]">
                  Anti-Social Net
                </span>
                <span className="block font-mono text-[0.6rem] text-[var(--text-muted)]">
                  by UNAHUR
                </span>
              </div>
            </div>
            <p className="max-w-md font-mono text-xs text-[var(--text-meta)]">
              <GlitchText className="text-[var(--text-secondary)]">Anti-Social Net</GlitchText>
              {' — Porque a veces el código es suficiente compañía'}
            </p>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--text-meta)] transition-colors hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
          >
            <ExternalLink size={16} />
            GitHub del proyecto
          </a>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
          <p className="font-mono text-[0.65rem] text-[var(--text-meta)]">
            © {new Date().getFullYear()} UNAHUR · Construcción de Interfaces de Usuario
          </p>
        </div>
      </div>
    </footer>
  );
}
