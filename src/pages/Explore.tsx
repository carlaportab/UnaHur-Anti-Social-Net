import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostFeedItem } from '../components/posts/PostFeedItem';
import { FeedLayout } from '../components/feed/FeedLayout';
import { EmptyState } from '../components/ui/EmptyState';
import { filterPostsByTag, mockTags } from '../data/mockData';
import { GlitchText } from '../components/ui/GlitchText';

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  const posts = useMemo(() => filterPostsByTag(activeTag), [activeTag]);

  const setTag = (tag: string | null) => {
    if (tag) setSearchParams({ tag });
    else setSearchParams({});
  };

  return (
    <FeedLayout>
      <div>
        <GlitchText
          as="h1"
          className="animate-fade-up mb-2 font-display text-xl font-bold tracking-wide sm:text-2xl"
        >
          EXPLORAR
        </GlitchText>
        <p className="animate-fade-up mb-4 font-mono text-xs text-[var(--cyan)] sm:text-sm">
          {'// navegá por todos los posts o filtrá por etiqueta'}
        </p>

        <div className="tags-scroll-wrap sticky-tags mb-4 -mx-3 sm:mx-0">
          <div className="tags-scroll-inner flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setTag(null)}
              className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                !activeTag
                  ? 'border-[var(--border-green)] bg-[var(--green-dim)]/40 text-[var(--green-light)] shadow-[var(--glow-green)]'
                  : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-meta)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <GlitchText>#todos</GlitchText>
            </button>
            {mockTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setTag(tag.name)}
                className={`shrink-0 rounded-full border px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTag === tag.name
                    ? 'border-[var(--border-green)] bg-[var(--green-dim)]/40 text-[var(--green-light)] shadow-[var(--glow-green)]'
                    : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-meta)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <GlitchText>{tag.name}</GlitchText>
              </button>
            ))}
          </div>
        </div>

        <p className="mb-4 font-mono text-xs text-[var(--text-muted)]">
          {activeTag
            ? `> ${posts.length} resultados para ${activeTag}`
            : `> ${posts.length} publicaciones en total`}
        </p>

        {posts.length === 0 ? (
          <EmptyState ascii="> 0 results" title="Sin resultados. Probá otro tag.">
            <Link to="/" className="font-mono text-xs text-[var(--green-light)] hover:underline">
              volver al inicio
            </Link>
          </EmptyState>
        ) : (
          <div className="timeline-feed">
            {posts.map((post, i) => (
              <PostFeedItem
                key={post.id}
                post={post}
                variant="feed"
                className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}
              />
            ))}
          </div>
        )}
      </div>
    </FeedLayout>
  );
}
