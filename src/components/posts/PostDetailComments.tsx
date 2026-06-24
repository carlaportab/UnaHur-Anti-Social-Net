import { type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Comment } from '../../types';
import { UserAvatar } from '../ui/UserAvatar';
import { getUserAccentColor } from '../../utils/userAccent';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';

interface PostDetailCommentsProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function PostDetailComments({
  comments,
  newComment,
  onCommentChange,
  onSubmit,
}: PostDetailCommentsProps) {
  const { user, isAuthenticated } = useAuth();
  const { terminalMode } = useUi();

  return (
    <section className={`post-detail-comments-panel ${terminalMode ? 'post-detail-comments-panel--terminal' : ''}`}>
      <h2 className="post-detail-comments-title font-mono text-sm text-[var(--green-light)]">
        {terminalMode ? '> tail -f ./comments.log' : `> comentarios (${comments.length})`}
      </h2>

      {comments.length === 0 ? (
        <p className="mb-4 font-mono text-xs text-[var(--text-meta)]">
          {terminalMode ? '// log vacío. sé el primero en escribir.' : 'Nadie comentó aún. Qué sorpresa.'}
        </p>
      ) : terminalMode ? (
        <div className="post-inline-comments--terminal mb-4 space-y-0">
          {comments.map((comment) => {
            const nick = comment.user?.nickName ?? 'anon';
            return (
              <div key={comment.id} className="post-terminal-comment-line font-mono text-[0.6875rem]">
                <span className="text-[var(--green-dim)]">└─</span>{' '}
                <Link
                  to={`/usuario/${nick}`}
                  className="font-semibold hover:underline"
                  style={{ color: getUserAccentColor(nick) }}
                >
                  @{nick}
                </Link>
                <span className="text-[var(--text-muted)]">: </span>
                <span className="text-[var(--text-secondary)]">{comment.content}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="post-detail-comments-list mb-4 space-y-2">
          {comments.map((comment) => {
            const nick = comment.user?.nickName ?? 'anon';
            return (
              <div key={comment.id} className="post-inline-comment">
                <Link to={`/usuario/${nick}`} className="shrink-0">
                  <UserAvatar nickName={nick} size="xs" showOnline={false} />
                </Link>
                <div className="post-inline-comment-bubble">
                  <Link
                    to={`/usuario/${nick}`}
                    className="font-mono font-semibold hover:underline"
                    style={{ color: getUserAccentColor(nick) }}
                  >
                    @{nick}
                  </Link>
                  <span className="post-inline-comment-text"> {comment.content}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isAuthenticated && user ? (
        terminalMode ? (
          <form onSubmit={onSubmit} className="post-inline-compose post-inline-compose--terminal">
            <span className="text-[var(--green-light)]">&gt;_</span>
            <textarea
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              rows={2}
              placeholder="stdin // escribí reply..."
              className="min-w-0 flex-1 resize-none border-none bg-transparent font-mono text-xs text-[var(--text-secondary)] outline-none"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="shrink-0 rounded border border-[var(--border-green)] bg-[var(--green-dim)]/30 px-3 py-1.5 font-mono text-xs text-[var(--green-light)] disabled:opacity-40"
            >
              send
            </button>
          </form>
        ) : (
          <form onSubmit={onSubmit} className="post-detail-comment-form">
            <UserAvatar nickName={user.nickName} size="xs" showOnline={false} />
            <input
              type="text"
              value={newComment}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="// comentá algo..."
              className="post-inline-comment-input font-mono"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="post-detail-comment-submit shrink-0 rounded-[var(--radius-sm)] bg-[var(--green)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--bg-base)] disabled:opacity-40"
            >
              Enviar
            </button>
          </form>
        )
      ) : (
        <p className="font-mono text-xs text-[var(--text-meta)]">
          {terminalMode ? '> auth required — ' : ''}
          <Link to="/login" className="text-[var(--green-light)] hover:underline">
            {terminalMode ? 'login()' : 'Iniciá sesión'}
          </Link>
          {terminalMode ? '' : ' para comentar'}
        </p>
      )}
    </section>
  );
}
