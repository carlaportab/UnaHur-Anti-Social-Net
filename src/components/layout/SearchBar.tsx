import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hash, Search, User } from 'lucide-react';
import { GlitchLink, GlitchText } from '../ui/GlitchText';
import { searchAll } from '../../utils/search';

interface SearchBarProps {
  className?: string;
  onNavigate?: () => void;
}

export function SearchBar({ className = '', onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = query.trim().length >= 2 ? searchAll(query) : null;
  const hasResults =
    results &&
    (results.users.length > 0 || results.posts.length > 0 || results.tags.length > 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const goToSearch = (q: string) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) goToSearch(query.trim());
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="> buscar @user | #tag..."
            className="w-full rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-surface)] py-2 pl-9 pr-3 font-mono text-xs text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--border-green)] focus:outline-none focus:shadow-[var(--glow-green)]"
          />
        </div>
      </form>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)] md:right-auto md:w-80">
          {!hasResults ? (
            <p className="px-4 py-4 font-mono text-xs text-[var(--text-muted)]">
              {'> Sin resultados para "'}{query}{'"'}
            </p>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              {results!.users.length > 0 && (
                <ResultSection title="usuarios">
                  {results!.users.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-[var(--bg-glass)]"
                    >
                      <User size={14} className="text-[var(--green)]" />
                      <GlitchLink
                        to={`/usuario/${u.nickName}`}
                        onClick={() => {
                          setOpen(false);
                          setQuery('');
                          onNavigate?.();
                        }}
                        className="font-mono text-xs text-[var(--cyan)]"
                      >
                        @{u.nickName}
                      </GlitchLink>
                    </div>
                  ))}
                </ResultSection>
              )}
              {results!.tags.length > 0 && (
                <ResultSection title="tags">
                  {results!.tags.map((t) => (
                    <Link
                      key={t.id}
                      to={`/explorar?tag=${encodeURIComponent(t.name)}`}
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                        onNavigate?.();
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 transition-colors hover:bg-[var(--bg-glass)]"
                    >
                      <Hash size={14} className="text-[var(--amber)]" />
                      <GlitchText className="font-mono text-xs text-[var(--text-secondary)]">
                        {t.name}
                      </GlitchText>
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results!.posts.length > 0 && (
                <ResultSection title="posts">
                  {results!.posts.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      to={`/post/${p.id}`}
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                        onNavigate?.();
                      }}
                      className="block px-4 py-2.5 transition-colors hover:bg-[var(--bg-glass)]"
                    >
                      <p className="line-clamp-1 font-mono text-xs text-[var(--text-secondary)]">
                        {p.description}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.6rem] text-[var(--text-muted)]">
                        <GlitchText>@{p.user?.nickName}</GlitchText>
                      </p>
                    </Link>
                  ))}
                </ResultSection>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => goToSearch(query.trim())}
            className="w-full border-t border-[var(--border)] px-4 py-2.5 font-mono text-[0.65rem] text-[var(--green-light)] transition-colors hover:bg-[var(--bg-glass)]"
          >
            Ver todos los resultados →
          </button>
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <p className="px-4 py-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {title}
      </p>
      {children}
    </div>
  );
}
