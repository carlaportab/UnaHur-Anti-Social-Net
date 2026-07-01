import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Post, Comment } from '../../types';
import { Badge } from '../ui/Badge';
import { UserAvatar } from '../ui/UserAvatar';
import { GlitchLink, GlitchText } from '../ui/GlitchText';
import { LazyImage } from '../ui/LazyImage';
import { PostInteractionBar } from './PostInteractionBar';
import { PostInlineComments } from './PostInlineComments';
import { useUi } from '../../context/UiContext';
import { formatTimeAgo } from '../../utils/time';
import { getCommentsByPostId, createComment } from '../../services/postService';
import { useAuth } from '../../context/AuthContext';
import { getUserAccentColor } from '../../utils/userAccent';

interface PostCardProps {
  post: Post;
  variant?: 'feed' | 'standalone';
  showInlineComments?: boolean;
  className?: string;
}

export function PostCard({
  post,
  variant = 'standalone',
  showInlineComments = false,
  className = '',
}: PostCardProps) {
  const { terminalMode } = useUi();
  const { user } = useAuth();
  const nickName = post.user?.nickName ?? 'anon';
  const career = post.user?.career;
  const accentColor = getUserAccentColor(nickName);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const likes = post.likes ?? Math.floor(post.id * 3 + 2);
  const time = formatTimeAgo(post.createdAt);

  useEffect(() => {
    if (!showInlineComments) return;
    getCommentsByPostId(post.id).then(setComments).catch(() => {});
  }, [post.id, showInlineComments]);

  const handleComment = async (content: string) => {
    if (!user) return;
    const created = await createComment({ content, userId: user.id, postId: post.id });
    if (!created.user) created.user = user;
    setComments((prev) => [...prev, created]);
    setCommentCount((n) => n + 1);
  };

  return (
    <article
      className={`post-card group ${variant === 'feed' ? 'post-card--feed' : 'post-card--standalone'} ${
        terminalMode ? 'post-card--terminal' : ''
      } ${className}`}
    >
      {terminalMode && (
        <div className="post-terminal-meta font-mono text-[0.6rem] text-[var(--green-dim)]">
          <span>{'post['}{post.id}{']'}</span>
          <span className="text-[var(--text-muted)]"> · pid:{post.userId}</span>
        </div>
      )}

      <div className="post-card-layout">
        <Link to={`/usuario/${nickName}`} className="post-card-avatar tap-target shrink-0 self-start">
          <UserAvatar nickName={nickName} size="md" className={terminalMode ? 'post-terminal-avatar' : ''} />
        </Link>

        <div className="post-card-content min-w-0 flex-1">
          <header className="post-card-header">
            {terminalMode ? (
              <>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0 font-mono text-xs">
                  <GlitchLink
                    to={`/usuario/${nickName}`}
                    className="font-semibold hover:opacity-90"
                    style={{ color: accentColor }}
                  >
                    @{nickName}
                  </GlitchLink>
                  <span className="text-[var(--green-dim)]">[{time}]</span>
                </div>
                {career && (
                  <p className="mt-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                    {'// '}{career.toLowerCase().replace(/\s+/g, '_')}@unahur
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0">
                  <GlitchLink
                    to={`/usuario/${nickName}`}
                    className="font-mono text-sm font-semibold hover:opacity-90"
                    style={{ color: accentColor }}
                  >
                    @{nickName}
                  </GlitchLink>
                  <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">·</span>
                  <time className="meta-muted font-mono text-[0.65rem]">{time}</time>
                </div>
                {career && (
                  <p className="mt-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                    {career} · UNAHUR
                  </p>
                )}
              </>
            )}
          </header>

          <Link to={`/post/${post.id}`} className="post-card-body-link tap-target block">
            <p className="post-card-body font-mono text-[0.875rem] leading-relaxed text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] sm:text-sm">
              <span className="post-card-prompt mr-1" style={{ color: accentColor }} aria-hidden>
                {terminalMode ? '$' : '>'}
              </span>
              {post.description}
            </p>
          </Link>

          {post.images && post.images.length > 0 && (
            <Link to={`/post/${post.id}`} className="post-card-media tap-target mt-2.5 block overflow-hidden">
              {terminalMode && (
                <span className="post-terminal-media-label font-mono text-[0.6rem] text-[var(--green-light)]">
                  ./attachments[0]{post.images.length > 1 ? ` +${post.images.length - 1}` : ''}
                </span>
              )}
              <LazyImage
                src={post.images[0]}
                wrapperClassName={`h-[150px] ${terminalMode ? 'post-terminal-media-frame' : ''}`}
                className={`post-card-media-img h-[150px] w-full object-cover ${terminalMode ? 'post-terminal-media-img' : ''}`}
              />
            </Link>
          )}

          {post.tags.length > 0 && (
            <div className="post-card-tags mt-2.5 flex flex-wrap gap-1.5">
              {terminalMode ? (
                <p className="font-mono text-[0.65rem] text-[var(--cyan)]/90">
                  <span className="text-[var(--green-dim)]">tags:</span>{' '}
                  {post.tags.map((t) => t.name).join(' ')}
                </p>
              ) : (
                post.tags.map((tag, i) => (
                  <Link key={tag.id} to={`/explorar?tag=${encodeURIComponent(tag.name)}`}>
                    <Badge variant={i % 2 === 0 ? 'green' : 'cyan'} compact>
                      <GlitchText>{tag.name}</GlitchText>
                    </Badge>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <PostInteractionBar
        postId={post.id}
        likeCount={likes}
        commentCount={commentCount}
      />

      {showInlineComments && (
        <PostInlineComments
          postId={post.id}
          comments={comments}
          totalCount={commentCount}
          onComment={handleComment}
        />
      )}
    </article>
  );
}
