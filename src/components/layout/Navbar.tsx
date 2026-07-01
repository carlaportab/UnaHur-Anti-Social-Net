import { Link } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { Button } from '../ui/Button';
import { GlitchText } from '../ui/GlitchText';
import { NotificationDropdown } from './NotificationDropdown';

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const { terminalMode, toggleTerminalMode } = useUi();

  return (
    <header className="app-header relative sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-base)]/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-lg font-black text-[var(--on-accent)] shadow-[var(--glow-green)] transition-transform duration-[var(--transition-fast)] group-hover:scale-105 group-active:scale-95">
            A
          </div>
          <div className="hidden leading-tight sm:block">
            <GlitchText className="font-display text-sm font-bold tracking-widest text-[var(--text-primary)]">
              ANTI·SOCIAL
            </GlitchText>
            <span className="block font-mono text-[0.6rem] text-[var(--text-muted)]">
              by UNAHUR
            </span>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/buscar"
            className="tap-target rounded-[var(--radius-sm)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
            aria-label="Buscar"
          >
            <Search size={20} />
          </Link>

          <button
            type="button"
            onClick={toggleTerminalMode}
            className={`tap-target rounded-[var(--radius-sm)] p-2 transition-colors ${
              terminalMode
                ? 'bg-[var(--green-dim)]/40 text-[var(--green-light)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
            }`}
            title="Modo terminal"
            aria-pressed={terminalMode}
            aria-label="Modo terminal"
          >
            <Terminal size={18} />
          </button>

          {isAuthenticated && <NotificationDropdown />}

          {!isAuthenticated && (
            <Link to="/login" className="tap-target">
              <Button variant="secondary" className="!px-3 !py-2 text-xs">
                <GlitchText>Ingresar</GlitchText>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
