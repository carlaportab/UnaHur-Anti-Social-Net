import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PostFeedItem } from '../components/posts/PostFeedItem';
import { SkeletonPost } from '../components/ui/SkeletonCard';
import { FeedLayout } from '../components/feed/FeedLayout';
import { EmptyState } from '../components/ui/EmptyState';
import { GlitchText } from '../components/ui/GlitchText';
import { getPosts, getTags } from '../services/postService';
import type { Post, Tag } from '../types';

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getPosts(), getTags()])
      .then(([fetchedPosts, fetchedTags]) => {
        setPosts(fetchedPosts);
        setTags(fetchedTags);
      })
      .catch(() => setError('No se pudo cargar el contenido.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    const normalized = activeTag.toLowerCase();
    return posts.filter((p) =>
      p.tags.some((t) => t.name.toLowerCase() === normalized),
    );
  }, [posts, activeTag]);

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
            {tags.map((tag) => (
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

        {!loading && !error && (
          <p className="mb-4 font-mono text-xs text-[var(--text-muted)]">
            {activeTag
              ? `> ${filteredPosts.length} resultados para ${activeTag}`
              : `> ${filteredPosts.length} publicaciones en total`}
          </p>
        )}

        {loading ? (
          <div className="timeline-feed">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        ) : error ? (
          <EmptyState ascii="> error" title={error} />
        ) : filteredPosts.length === 0 ? (
          <EmptyState ascii="> 0 results" title="Sin resultados. Probá otro tag.">
            <Link to="/" className="font-mono text-xs text-[var(--green-light)] hover:underline">
              volver al inicio
            </Link>
          </EmptyState>
        ) : (
          <div className="timeline-feed">
            {filteredPosts.map((post, i) => (
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
