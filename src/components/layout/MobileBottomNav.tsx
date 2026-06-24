import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Home, Plus, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/explorar', label: 'Explorar', icon: Compass },
  { to: '__fab__', label: 'Nuevo', icon: Plus },
  { to: '/buscar', label: 'Buscar', icon: Search },
  { to: '/perfil', label: 'Perfil', icon: User },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-base)]/95 backdrop-blur-xl md:hidden"
      aria-label="Navegación principal"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 items-end px-1 pb-[env(safe-area-inset-bottom,0px)]">
        {tabs.map((tab) => {
          if (tab.to === '__fab__') {
            return (
              <div key={tab.to} className="flex justify-center pb-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    isAuthenticated ? navigate('/nuevo-post') : navigate('/login')
                  }
                  className="fab-btn flex h-12 w-12 -translate-y-2 items-center justify-center rounded-full bg-[var(--green)] font-bold text-[var(--bg-base)] shadow-[var(--glow-green)] transition-all duration-150 active:scale-90 active:shadow-none"
                  aria-label="Nueva publicación"
                >
                  <Plus size={22} strokeWidth={2.5} />
                </button>
              </div>
            );
          }

          const path = tab.to === '/perfil' && !isAuthenticated ? '/login' : tab.to;
          const active =
            isActive(tab.to === '/perfil' ? '/perfil' : tab.to) ||
            (tab.to === '/perfil' && location.pathname.startsWith('/usuario'));

          return (
            <Link
              key={tab.to}
              to={path}
              className={`nav-tab tap-target relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] py-2 font-mono text-[0.6rem] transition-all duration-150 ${
                active
                  ? 'nav-tab-active text-[var(--green-light)]'
                  : 'text-[var(--text-muted)] active:scale-95'
              }`}
            >
              <span className={`nav-tab-icon inline-flex transition-transform duration-150 ${active ? 'scale-110' : ''}`}>
                <tab.icon size={20} strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={active ? 'font-semibold' : ''}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
