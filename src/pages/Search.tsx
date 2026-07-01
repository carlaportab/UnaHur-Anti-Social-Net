import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostFeedItem } from '../components/posts/PostFeedItem';
import { FeedLayout } from '../components/feed/FeedLayout';
import { SearchBar } from '../components/layout/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { GlitchText } from '../components/ui/GlitchText';
import { useUi } from '../context/UiContext';
import { getPosts, getTags } from '../services/postService';
import type { Post, Tag } from '../types';

export function Search() {
  const { terminalMode } = useUi();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPosts(), getTags()])
      .then(([posts, tags]) => { setAllPosts(posts); setAllTags(tags); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { posts: [], tags: [] };
    return {
      posts: allPosts.filter((p) =>
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
        p.user?.nickName.toLowerCase().includes(q)
      ),
      tags: allTags.filter((t) => t.name.toLowerCase().includes(q)),
    };
  }, [query, allPosts, allTags]);

  const total = results.posts.length + results.tags.length;

  return (
    <FeedLayout showSidebar={false}>
      <div>
        <GlitchText as="h1" className="mb-2 font-display text-xl font-bold tracking-wide sm:text-2xl">
          {terminalMode ? 'GREP' : 'BUSCAR'}
        </GlitchText>
        <p className="mb-6 font-mono text-xs text-[var(--text-muted)] sm:text-sm">
          {terminalMode ? '> grep -r #tag | texto | @user...' : '> #tag · texto en posts · @usuario'}
        </p>

        <SearchBar className="mb-6 max-w-md" />

        {loading ? (
          <p className="font-mono text-xs text-[var(--text-muted)]">
            {terminalMode ? '// loading index...' : 'Cargando...'}
          </p>
        ) : !query.trim() ? (
          <EmptyState ascii="> grep ?" title="Escribí algo para buscar. O no. También es válido." />
        ) : total === 0 ? (
          <EmptyState ascii="> 0 matches" title={`Sin resultados para "${query}"`} />
        ) : (
          <>
            <p className="mb-6 font-mono text-xs text-[var(--text-muted)]">
              {`> ${total} resultados para "${query}"`}
            </p>

            {results.tags.length > 0 && (
              <section className="mb-8">
                <GlitchText as="h2" className="mb-3 font-mono text-sm text-[var(--green-light)]">
                  {'> tags'}
                </GlitchText>
                {terminalMode ? (
                  <div className="terminal-panel flex flex-wrap gap-3 p-3 font-mono text-xs">
                    {results.tags.map((t) => (
                      <Link key={t.id} to={`/explorar?tag=${encodeURIComponent(t.name)}`} className="text-[var(--cyan)] hover:text-[var(--cyan-light)]">
                        <GlitchText>{t.name}</GlitchText>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {results.tags.map((t) => (
                      <Link key={t.id} to={`/explorar?tag=${encodeURIComponent(t.name)}`} className="rounded-full border border-[var(--border-green)] bg-[var(--green-dim)]/30 px-4 py-2 font-mono text-xs font-semibold text-[var(--green-light)]">
                        <GlitchText>#{t.name}</GlitchText>
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
                    <PostFeedItem key={post.id} post={post} />
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
