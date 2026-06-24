import { Link } from 'react-router-dom';
import { GlitchLink } from '../ui/GlitchText';
import { LazyImage } from '../ui/LazyImage';
import type { Post } from '../../types';
import { formatTimeAgo } from '../../utils/time';

interface TerminalPostLineProps {
  post: Post;
  className?: string;
}

export function TerminalPostLine({ post, className = '' }: TerminalPostLineProps) {
  const nick = post.user?.nickName ?? 'anon';
  const tags = post.tags.map((t) => t.name).join(' ');
  const time = formatTimeAgo(post.createdAt);

  return (
    <article
      className={`group border-b border-[var(--border)] px-1 py-3 font-mono text-xs transition-colors hover:bg-[var(--bg-glass)] sm:px-2 sm:text-sm ${className}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[var(--text-meta)]">[{time}]</span>
        <GlitchLink to={`/usuario/${nick}`} className="font-semibold text-[var(--cyan)] hover:text-[var(--cyan-light)]">
          @{nick}
        </GlitchLink>
        <span className="text-[var(--green-light)]">&gt;</span>
        <Link to={`/post/${post.id}`} className="min-w-0 flex-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          {post.description}
        </Link>
      </div>
      <div className="mt-1.5 pl-4 text-[0.65rem] text-[var(--text-muted)] sm:text-xs">
        <span className="text-[var(--green-dim)]">└─</span> {post.commentCount} replies
        {tags && <span className="text-[var(--cyan)]/85"> · {tags}</span>}
        {post.likes != null && <span> · ++{post.likes}</span>}
        {post.images && post.images.length > 0 && (
          <span className="text-[var(--amber)]"> · img[{post.images.length}]</span>
        )}
      </div>
      {post.images && post.images.length > 0 && (
        <Link
          to={`/post/${post.id}`}
          className="mt-2 block max-w-md overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border-green)] pl-4"
        >
          <LazyImage
            src={post.images[0]}
            className="max-h-40 w-full object-cover sm:max-h-48"
          />
          {post.images.length > 1 && (
            <span className="block bg-[var(--bg-surface-2)] px-2 py-1 font-mono text-[0.6rem] text-[var(--text-meta)]">
              +{post.images.length - 1} more in ./attachments/
            </span>
          )}
        </Link>
      )}
    </article>
  );
}
