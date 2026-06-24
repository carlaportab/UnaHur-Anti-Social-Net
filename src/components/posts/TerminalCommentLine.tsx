import { GlitchLink } from '../ui/GlitchText';
import type { Comment } from '../../types';

interface TerminalCommentLineProps {
  comment: Comment;
}

export function TerminalCommentLine({ comment }: TerminalCommentLineProps) {
  const nick = comment.user?.nickName ?? 'anon';

  return (
    <div className="border-l border-[var(--green-dim)] py-1.5 pl-3 font-mono text-xs sm:text-sm">
      <span className="text-[var(--green-dim)]">└─</span>{' '}
      <GlitchLink
        to={`/usuario/${nick}`}
        className="font-semibold text-[var(--cyan)] hover:text-[var(--cyan-light)]"
      >
        @{nick}
      </GlitchLink>
      <span className="text-[var(--text-secondary)]">: {comment.content}</span>
    </div>
  );
}
