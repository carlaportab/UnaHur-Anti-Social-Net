import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Bell,
  Compass,
  Home,
  LogOut,
  Plus,
  Search,
  Terminal,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { GlitchText } from '../ui/GlitchText';

const navLinks = [
  { to: '/', label: 'Inicio',         terminalLabel: 'inicio',     prefix: '~/', icon: Home,    end: true },
  { to: '/explorar', label: 'Explorar',   terminalLabel: 'explorar',   prefix: '~/', icon: Compass       },
  { to: '/buscar',   label: 'Buscar',     terminalLabel: 'grep',       prefix: '$/', icon: Search        },
  { to: '/perfil',   label: 'Mi perfil',  terminalLabel: 'whoami',     prefix: '~/', icon: User          },
] as const;

export function DesktopSidebar() {
  const { user, logout } = useAuth();
  const { terminalMode, toggleTerminalMode } = useUi();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    if (terminalMode) {
      return `flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] font-mono text-xs transition-colors duration-[var(--transition-fast)] ${
        isActive
          ? 'text-[var(--green-light)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
      }`;
    }
    return `flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] font-medium text-sm transition-colors duration-[var(--transition-fast)] ${
      isActive
        ? 'bg-[rgba(63,184,80,0.1)] text-[var(--green-light)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
    }`;
  };

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col border-r border-[var(--border)] bg-[var(--bg-base)] md:flex"
      aria-label="Navegación principal"
    >
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-5">

        {/* Logo */}
        <Link to="/" className="group mb-5 flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--green)] font-display text-lg font-black text-[var(--bg-base)] shadow-[var(--glow-green)] transition-transform duration-[var(--transition-fast)] group-hover:scale-105 group-active:scale-95">
            A
          </div>
          <div className="leading-tight">
            <GlitchText auto className="font-display text-sm font-bold tracking-widest text-[var(--text-primary)]">
              ANTI·SOCIAL
            </GlitchText>
            <span className="block font-mono text-[0.6rem] text-[var(--text-muted)]">
              by UNAHUR
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : false}
                className={linkClass}
              >
                {terminalMode
                  ? <><span className="text-[var(--green-dim)] select-none">{link.prefix}</span><Icon size={13} strokeWidth={2} /><GlitchText>{link.terminalLabel}</GlitchText></>
                  : <><Icon size={19} strokeWidth={2} /><GlitchText>{link.label}</GlitchText></>
                }
              </NavLink>
            );
          })}

          {/* Notificaciones */}
          <NavLink
            to="/notificaciones"
            className={({ isActive }) => linkClass({ isActive })}
          >
            {terminalMode
              ? <><span className="text-[var(--green-dim)] select-none">!/</span><Bell size={13} strokeWidth={2} /><GlitchText>alerts</GlitchText><span className="ml-auto font-mono text-[0.6rem] bg-[var(--green)] text-[var(--bg-base)] px-1.5 py-0.5 rounded">03</span></>
              : <><Bell size={19} strokeWidth={2} /><GlitchText>Notificaciones</GlitchText><span className="ml-auto text-[0.65rem] font-bold bg-[var(--green)] text-[var(--bg-base)] px-1.5 py-0.5 rounded-full">3</span></>
            }
          </NavLink>
        </nav>

        {/* Botón publicar */}
        <Link
          to="/nuevo-post"
          className={`mt-5 flex w-full items-center justify-center gap-2 bg-[var(--green)] text-[var(--bg-base)] shadow-[var(--glow-green)] transition-all duration-[var(--transition-fast)] hover:opacity-90 active:scale-[0.98] ${
            terminalMode
              ? 'rounded-[var(--radius-sm)] px-3 py-2 font-mono text-xs'
              : 'rounded-full px-4 py-2.5 font-semibold text-sm'
          }`}
        >
          <Plus size={terminalMode ? 13 : 17} strokeWidth={2.5} />
          {terminalMode ? 'git commit -m "nuevo post"' : 'Publicar'}
        </Link>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-[var(--border)] px-3 py-3">
        {user && (
          <div className="flex items-center gap-2 px-1">
            <Link
              to="/perfil"
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-[var(--radius-sm)] px-1.5 py-1.5 transition-colors hover:bg-[var(--bg-surface)]"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--green-dim)] font-mono text-xs font-semibold text-[var(--green-light)]">
                {user.nickName.slice(0, 2).toUpperCase()}
              </div>
              <GlitchText className="truncate font-mono text-xs text-[var(--text-secondary)]">
                @{user.nickName}
              </GlitchText>
            </Link>

            <button
              type="button"
              onClick={toggleTerminalMode}
              className={`tap-target rounded-[var(--radius-sm)] p-1.5 transition-colors ${
                terminalMode ? 'text-[var(--green-light)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
              }`}
              title="Modo terminal"
              aria-pressed={terminalMode}
              aria-label="Modo terminal"
            >
              <Terminal size={15} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="tap-target rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}

        {terminalMode && (
          <p className="mt-2 px-2 font-mono text-[0.6rem] text-[var(--green-dim)]">$ _</p>
        )}
      </div>
    </aside>
  );
}
