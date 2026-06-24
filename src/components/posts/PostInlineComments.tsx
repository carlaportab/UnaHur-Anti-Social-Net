import { Link } from 'react-router-dom';
import { GlitchLink } from '../ui/GlitchText';
import type { Comment } from '../../types';
import { UserAvatar } from '../ui/UserAvatar';
import { getUserAccentColor } from '../../utils/userAccent';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';

interface PostInlineCommentsProps {
  postId: number;
  comments: Comment[];
  totalCount: number;
}

export function PostInlineComments({ postId, comments, totalCount }: PostInlineCommentsProps) {
  const { user } = useAuth();
  const { terminalMode } = useUi();

  if (comments.length === 0 && !user) return null;

  const hiddenCount = totalCount > 3 ? totalCount - 1 : 0;
  const displayComments =
    totalCount > 3 ? comments.slice(-1) : comments.slice(0, 2);

  if (terminalMode) {
    return (
      <div className="post-inline-comments post-inline-comments--terminal">
        {displayComments.length > 0 && (
          <p className="mb-1.5 font-mono text-[0.6rem] text-[var(--green-dim)]">
            {'> tail -f ./comments.log'}
          </p>
        )}
        {displayComments.map((comment) => {
          const nick = comment.user?.nickName ?? 'anon';
          return (
            <div key={comment.id} className="post-terminal-comment-line font-mono text-[0.6875rem]">
              <span className="text-[var(--green-dim)]">└─</span>{' '}
              <GlitchLink
                to={`/usuario/${nick}`}
                className="font-semibold"
                style={{ color: getUserAccentColor(nick) }}
              >
                @{nick}
              </GlitchLink>
              <span className="text-[var(--text-muted)]">: </span>
              <span className="text-[var(--text-secondary)]">{comment.content}</span>
            </div>
          );
        })}

        {hiddenCount > 0 && (
          <Link
            to={`/post/${postId}`}
            className="post-inline-more-link font-mono hover:text-[var(--green-light)]"
          >
            tail -n+{hiddenCount} /comments →
          </Link>
        )}

        {user && (
          <Link to={`/post/${postId}`} className="post-inline-compose post-inline-compose--terminal">
            <span className="text-[var(--green-light)]">&gt;_</span>
            <span className="post-inline-comment-input font-mono">stdin // escribí reply...</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="post-inline-comments">
      {displayComments.map((comment) => {
        const nick = comment.user?.nickName ?? 'anon';
        return (
          <div key={comment.id} className="post-inline-comment">
            <Link to={`/usuario/${nick}`} className="shrink-0">
              <UserAvatar nickName={nick} size="xs" showOnline={false} />
            </Link>
            <div className="post-inline-comment-bubble">
              <GlitchLink
                to={`/usuario/${nick}`}
                className="font-mono font-semibold"
                style={{ color: getUserAccentColor(nick) }}
              >
                @{nick}
              </GlitchLink>
              <span className="post-inline-comment-text"> {comment.content}</span>
            </div>
          </div>
        );
      })}

      {hiddenCount > 0 && (
        <Link
          to={`/post/${postId}`}
          className="post-inline-more-link font-mono hover:text-[var(--green-light)]"
        >
          ver {hiddenCount} comentarios más →
        </Link>
      )}

      {user && (
        <Link to={`/post/${postId}`} className="post-inline-compose">
          <UserAvatar nickName={user.nickName} size="xs" showOnline={false} />
          <span className="post-inline-comment-input font-mono">// comentá algo...</span>
        </Link>
      )}
    </div>
  );
}
