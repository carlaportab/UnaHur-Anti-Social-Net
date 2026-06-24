import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostFeedItem } from '../components/posts/PostFeedItem';
import { FeedLayout } from '../components/feed/FeedLayout';
import { SearchBar } from '../components/layout/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { UserAvatar } from '../components/ui/UserAvatar';
import { GlitchText } from '../components/ui/GlitchText';
import { useUi } from '../context/UiContext';
import { searchAll } from '../utils/search';

export function Search() {
  const { terminalMode } = useUi();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const results = useMemo(() => searchAll(query), [query]);
  const total = results.users.length + results.posts.length + results.tags.length;

  return (
    <FeedLayout showSidebar={false}>
      <div>
        <GlitchText
          as="h1"
          className="mb-2 font-display text-xl font-bold tracking-wide sm:text-2xl"
        >
          {terminalMode ? 'GREP' : 'BUSCAR'}
        </GlitchText>
        <p className="mb-6 font-mono text-xs text-[var(--text-muted)] sm:text-sm">
          {terminalMode ? '> grep -r @user | #tag | texto...' : '> @usuario · #tag · texto en posts'}
        </p>

        <SearchBar className="mb-6 max-w-md" />

        {!query.trim() ? (
          <EmptyState
            ascii="> grep ?"
            title="Escribí algo para buscar. O no. También es válido."
          />
        ) : total === 0 ? (
          <EmptyState ascii="> 0 matches" title={`Sin resultados para "${query}"`} />
        ) : (
          <>
            <p className="mb-6 font-mono text-xs text-[var(--text-muted)]">
              {`> ${total} resultados para "${query}"`}
            </p>

            {results.users.length > 0 && (
              <section className="mb-8">
                <GlitchText as="h2" className="mb-3 font-mono text-sm text-[var(--green-light)]">
                  {'> usuarios'}
                </GlitchText>
                {terminalMode ? (
                  <div className="terminal-panel space-y-1 p-3 font-mono text-xs sm:text-sm">
                    {results.users.map((u) => (
                      <Link
                        key={u.id}
                        to={`/usuario/${u.nickName}`}
                        className="block py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        <span className="text-[var(--green-dim)]">drwx</span>{' '}
                        <GlitchText className="text-[var(--cyan)]">@{u.nickName}</GlitchText>
                        {u.email && (
                          <span className="text-[var(--text-muted)]"> — {u.email}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.users.map((u) => (
                      <Link
                        key={u.id}
                        to={`/usuario/${u.nickName}`}
                        className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-[var(--border-green)] active:bg-[var(--bg-glass)]"
                      >
                        <UserAvatar nickName={u.nickName} size="md" showOnline={false} />
                        <div>
                          <GlitchText className="font-mono text-sm font-semibold text-[var(--cyan)]">
                            @{u.nickName}
                          </GlitchText>
                          {u.email && (
                            <p className="font-mono text-xs text-[var(--text-muted)]">{u.email}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            )}

            {results.tags.length > 0 && (
              <section className="mb-8">
                <GlitchText as="h2" className="mb-3 font-mono text-sm text-[var(--green-light)]">
                  {'> tags'}
                </GlitchText>
                {terminalMode ? (
                  <div className="terminal-panel flex flex-wrap gap-3 p-3 font-mono text-xs">
                    {results.tags.map((t) => (
                      <Link
                        key={t.id}
                        to={`/explorar?tag=${encodeURIComponent(t.name)}`}
                        className="text-[var(--cyan)] hover:text-[var(--cyan-light)]"
                      >
                        <GlitchText>{t.name}</GlitchText>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {results.tags.map((t) => (
                      <Link
                        key={t.id}
                        to={`/explorar?tag=${encodeURIComponent(t.name)}`}
                        className="rounded-full border border-[var(--border-green)] bg-[var(--green-dim)]/30 px-4 py-2 font-mono text-xs font-semibold text-[var(--green-light)]"
                      >
                        <GlitchText>{t.name}</GlitchText>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            )}

            {results.posts.length > 0 && (
              <section>
                <GlitchText as="h2" className="mb-3 font-mono text-sm text-[var(--green-light)]">
                  {'> posts'}
                </GlitchText>
                <div className="timeline-feed">
                  {results.posts.map((post) => (
                    <PostFeedItem
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </FeedLayout>
  );
}
