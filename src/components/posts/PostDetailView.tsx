import { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Comment, Post } from '../../types';
import { Badge } from '../ui/Badge';
import { UserAvatar } from '../ui/UserAvatar';
import { GlitchLink } from '../ui/GlitchText';
import { LazyImage } from '../ui/LazyImage';
import { PostInteractionBar } from './PostInteractionBar';
import { PostDetailComments } from './PostDetailComments';
import { useUi } from '../../context/UiContext';
import { formatTimeAgo } from '../../utils/time';
import { getUserAccentColor } from '../../utils/userAccent';

interface PostDetailViewProps {
  post: Post;
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function PostDetailView({
  post,
  comments,
  newComment,
  onCommentChange,
  onSubmit,
}: PostDetailViewProps) {
  const { terminalMode } = useUi();
  const nickName = post.user?.nickName ?? 'anon';
  const career = post.user?.career;
  const accentColor = getUserAccentColor(nickName);
  const time = formatTimeAgo(post.createdAt);
  const likes = post.likes ?? Math.floor(post.id * 3 + 2);

  return (
    <div
      className={`post-detail-thread ${terminalMode ? 'post-detail-thread--terminal' : ''}`}
    >
      {/* Zona del post — hilo abierto, no card de feed */}
      <article className="post-detail-post">
        <div className="post-detail-permalink font-mono text-[0.65rem] text-[var(--text-meta)]">
          {terminalMode ? (
            <>
              <span className="text-[var(--green-dim)]">permalink:</span> /post/{post.id}
              <span className="mx-2 text-[var(--border)]">|</span>
              <span className="text-[var(--green-dim)]">pid:</span>{post.userId}
            </>
          ) : (
            <>
              Publicación #{post.id}
              <span className="mx-1.5">·</span>
              {time}
            </>
          )}
        </div>

        <div className="post-detail-hero">
          <Link to={`/usuario/${nickName}`} className="tap-target shrink-0 self-start">
            <UserAvatar
              nickName={nickName}
              size="lg"
              className={terminalMode ? 'post-terminal-avatar' : ''}
            />
          </Link>

          <div className="min-w-0 flex-1">
            {terminalMode ? (
              <>
                <GlitchLink
                  to={`/usuario/${nickName}`}
                  className="font-mono text-base font-semibold hover:opacity-90"
                  style={{ color: accentColor }}
                >
                  @{nickName}
                </GlitchLink>
                {career && (
                  <p className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
                    {'// '}{career.toLowerCase().replace(/\s+/g, '_')}@unahur
                  </p>
                )}
              </>
            ) : (
              <>
                <GlitchLink
                  to={`/usuario/${nickName}`}
                  className="font-mono text-lg font-semibold hover:opacity-90"
                  style={{ color: accentColor }}
                >
                  @{nickName}
                </GlitchLink>
                {career && (
                  <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
                    {career} · UNAHUR
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="post-detail-body px-4 pb-4 sm:px-5 sm:pb-5">
          <p className="post-detail-body-text font-mono leading-relaxed text-[var(--text-primary)]">
            <span className="mr-1.5" style={{ color: accentColor }} aria-hidden>
              {terminalMode ? '$' : '>'}
            </span>
            {post.description}
          </p>

          {post.images && post.images.length > 0 && (
            <div className="post-detail-images mt-4 space-y-2">
              {post.images.map((img, i) => (
                <div key={img} className="post-detail-media overflow-hidden">
                  {terminalMode && (
                    <span className="post-terminal-media-label font-mono text-[0.6rem] text-[var(--green-light)]">
                      ./attachments[{i}]
                    </span>
                  )}
                  <LazyImage
                    src={img}
                    wrapperClassName={`post-detail-media-frame h-[220px] sm:h-[260px] ${terminalMode ? 'post-terminal-media-frame' : ''}`}
                    className={`h-[220px] w-full object-cover sm:h-[260px] ${terminalMode ? 'post-terminal-media-img' : ''}`}
                  />
                </div>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {terminalMode ? (
                <p className="font-mono text-xs text-[var(--cyan)]/90">
                  <span className="text-[var(--green-dim)]">tags:</span>{' '}
                  {post.tags.map((t) => t.name).join(' ')}
                </p>
              ) : (
                post.tags.map((tag, i) => (
                  <Link key={tag.id} to={`/explorar?tag=${encodeURIComponent(tag.name)}`}>
                    <Badge variant={i % 2 === 0 ? 'green' : 'cyan'} compact>
                      {tag.name}
                    </Badge>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <PostInteractionBar
          postId={post.id}
          likeCount={likes}
          commentCount={post.commentCount}
        />
      </article>

      {/* Zona de conversación — el foco del detalle */}
      <PostDetailComments
        comments={comments}
        newComment={newComment}
        onCommentChange={onCommentChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
