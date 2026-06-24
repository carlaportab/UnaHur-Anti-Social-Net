import { Link } from 'react-router-dom';
import type { Comment } from '../../types';
import { useUi } from '../../context/UiContext';
import { TerminalCommentLine } from './TerminalCommentLine';
import { GlitchLink } from '../ui/GlitchText';
import { UserAvatar } from '../ui/UserAvatar';

interface CommentItemProps {
  comment: Comment;
  threaded?: boolean;
}

export function CommentItem({ comment, threaded = true }: CommentItemProps) {
  const { terminalMode } = useUi();

  if (terminalMode) {
    return <TerminalCommentLine comment={comment} />;
  }

  const nickName = comment.user?.nickName ?? 'anon';

  return (
    <div
      className={`rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-surface)] p-3 transition-colors hover:border-[var(--border-hover)] sm:p-4 ${
        threaded ? 'comment-thread' : ''
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <Link to={`/usuario/${nickName}`} className="tap-target shrink-0">
          <UserAvatar nickName={nickName} size="sm" showOnline={false} />
        </Link>
        <GlitchLink
          to={`/usuario/${nickName}`}
          className="font-mono text-xs font-semibold text-[var(--cyan)] hover:text-[var(--cyan-light)]"
        >
          @{nickName}
        </GlitchLink>
      </div>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{comment.content}</p>
    </div>
  );
}
