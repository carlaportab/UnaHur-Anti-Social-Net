import type { ReactNode, FormEvent } from 'react';
import type { Comment, Post } from '../../types';
import { formatTimeAgo } from '../../utils/time';
import { TerminalCommentLine } from './TerminalCommentLine';
import { GlitchLink } from '../ui/GlitchText';
import { LikeButton } from './LikeButton';
import { LazyImage } from '../ui/LazyImage';

interface TerminalPostDetailProps {
  post: Post;
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  commentFormMobile?: ReactNode;
}

export function TerminalPostDetail({
  post,
  comments,
  newComment,
  onCommentChange,
  onSubmit,
}: TerminalPostDetailProps) {
  const nick = post.user?.nickName ?? 'anon';
  const tags = post.tags.map((t) => t.name).join(' ');
  const time = formatTimeAgo(post.createdAt);

  const commentForm = (
    <form onSubmit={onSubmit} className="comment-form-inner">
      <p className="mb-2 font-mono text-xs text-[var(--green-light)]">{'> echo $? # nuevo_comentario'}</p>
      <div className="flex gap-2">
        <span className="hidden shrink-0 pt-2.5 font-mono text-sm text-[var(--green-light)] sm:inline">
          &gt;_
        </span>
        <textarea
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          rows={2}
          placeholder="escribí algo... o /dev/null"
          className="input-field min-h-[44px] flex-1 resize-none font-mono text-sm"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="tap-target shrink-0 self-end rounded-[var(--radius-sm)] border border-[var(--border-green)] bg-[var(--green-dim)]/30 px-3 py-2 font-mono text-xs text-[var(--green-light)] disabled:opacity-40"
        >
          send
        </button>
      </div>
    </form>
  );

  return (
    <div className="terminal-panel font-mono text-sm">
      <p className="mb-4 text-xs text-[var(--green-light)]">{'> cat post/'}{post.id}</p>

      <div className="mb-4 space-y-2 border-b border-[var(--border)] pb-4">
        <p>
          <span className="text-[var(--text-meta)]">[{time}]</span>{' '}
          <GlitchLink to={`/usuario/${nick}`} className="text-[var(--cyan)] hover:text-[var(--cyan-light)]">
            @{nick}
          </GlitchLink>
          <span className="text-[var(--green-light)]"> &gt;</span>
        </p>
        <p className="leading-relaxed text-[var(--text-secondary)]">{post.description}</p>
        {tags && (
          <p className="text-xs text-[var(--text-muted)]">
            <span className="text-[var(--green-dim)]">tags:</span>{' '}
            <span className="text-[var(--cyan)]/80">{tags}</span>
          </p>
        )}
        {post.images && post.images.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-[var(--text-muted)]">
              <span className="text-[var(--green-dim)]">attachments:</span> {post.images.length}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {post.images.map((img) => (
                <LazyImage
                  key={img}
                  src={img}
                  wrapperClassName="max-h-48 rounded-[var(--radius-sm)] border border-[var(--border)]"
                  className="max-h-48 w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <LikeButton initialCount={post.likes ?? post.id * 3 + 2} />
          <span className="text-xs text-[var(--text-muted)]">
            replies: {post.commentCount}
          </span>
        </div>
      </div>

      <p className="mb-3 text-xs text-[var(--green-light)]">{'> tail -f comments.log'}</p>
      <div className="post-detail-comments-list mb-4 space-y-1">
        {comments.map((c) => (
          <TerminalCommentLine key={c.id} comment={c} />
        ))}
      </div>

      <div className="hidden border-t border-[var(--border)] pt-4 sm:block">{commentForm}</div>

      <div className="comment-bar-mobile fixed left-0 right-0 z-40 border-t border-[var(--border)] bg-[var(--bg-base)]/95 p-3 backdrop-blur-xl md:hidden">
        {commentForm}
      </div>
    </div>
  );
}
