import { Link, NavLink } from 'react-router-dom';
import { Search, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { Button } from '../ui/Button';
import { GlitchText } from '../ui/GlitchText';
import { SearchBar } from './SearchBar';
import { NotificationDropdown } from './NotificationDropdown';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/perfil', label: 'Mi perfil' },
  { to: '/nuevo-post', label: 'Nueva publicación' },
];

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { terminalMode, toggleTerminalMode } = useUi();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-[var(--transition-fast)] ${
      isActive
        ? 'text-[var(--green-light)]'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-base)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-lg font-black text-[var(--bg-base)] shadow-[var(--glow-green)] transition-transform duration-[var(--transition-fast)] group-hover:scale-105 group-active:scale-95">
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

        <SearchBar className="hidden min-w-0 flex-1 md:block md:max-w-xs lg:max-w-sm" />

        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {/* Mobile: búsqueda + terminal (la navegación va en bottom nav) */}
          <Link
            to="/buscar"
            className="tap-target rounded-[var(--radius-sm)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] md:hidden"
            aria-label="Buscar"
          >
            <Search size={20} />
          </Link>

          <button
            type="button"
            onClick={toggleTerminalMode}
            className={`tap-target rounded-[var(--radius-sm)] p-2 transition-colors lg:flex ${
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

          {isAuthenticated && (
            <>
              <NotificationDropdown />
              <Link
                to="/perfil"
                className="hidden items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1.5 transition-colors hover:border-[var(--border-green)] md:flex lg:px-3"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--green-dim)] font-mono text-xs font-semibold text-[var(--green-light)]">
                  {user!.nickName.slice(0, 2).toUpperCase()}
                </div>
                <span className="hidden font-mono text-sm text-[var(--text-secondary)] lg:inline">
                  <GlitchText>@{user!.nickName}</GlitchText>
                </span>
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <Link to="/login" className="tap-target md:block">
              <Button variant="secondary" className="!px-3 !py-2 text-xs md:!px-4">
                Ingresar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
