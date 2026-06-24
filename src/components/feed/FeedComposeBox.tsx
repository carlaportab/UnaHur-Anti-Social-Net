import { GlitchLink } from '../ui/GlitchText';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { UserAvatar } from '../ui/UserAvatar';
import { Button } from '../ui/Button';

interface FeedComposeBoxProps {
  onPost?: (text: string) => void;
}

export function FeedComposeBox({ onPost }: FeedComposeBoxProps) {
  const { user, isAuthenticated } = useAuth();
  const { terminalMode } = useUi();

  const handlePublish = () => {
    const el = document.getElementById('feed-compose-input') as HTMLInputElement | null;
    const value = el?.value.trim();
    if (value && onPost) {
      onPost(value);
      if (el) el.value = '';
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className={`feed-compose-box ${terminalMode ? 'feed-compose-box--terminal' : ''}`}>
        <p className="font-mono text-xs text-[var(--text-meta)]">
          {terminalMode ? '> auth required — ' : ''}
          <GlitchLink to="/login" className="text-[var(--green-light)]">
            {terminalMode ? 'login()' : 'Iniciá sesión'}
          </GlitchLink>
          {terminalMode ? '' : ' para publicar'}
        </p>
      </div>
    );
  }

  if (terminalMode) {
    return (
      <div className="feed-compose-box feed-compose-box--terminal">
        <UserAvatar nickName={user.nickName} size="md" className="post-terminal-avatar" />
        <div className="min-w-0 flex-1">
          <p className="mb-1 font-mono text-[0.6rem] text-[var(--green-dim)]">
            {'> echo $? # quick_post'}
          </p>
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-sm text-[var(--green-light)]">&gt;_</span>
            <input
              id="feed-compose-input"
              type="text"
              placeholder="stdin..."
              className="feed-compose-input feed-compose-input--terminal font-mono"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePublish();
                }
              }}
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={handlePublish}
          className="shrink-0 !px-3 !py-2 font-mono text-xs"
        >
          publish
        </Button>
      </div>
    );
  }

  return (
    <div className="feed-compose-box">
      <UserAvatar nickName={user.nickName} size="md" />
      <input
        id="feed-compose-input"
        type="text"
        placeholder="> ¿qué estás debuggeando?"
        className="feed-compose-input font-mono"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handlePublish();
          }
        }}
      />
      <Button type="button" onClick={handlePublish} className="shrink-0 !px-4 !py-2 text-xs">
        Publicar
      </Button>
    </div>
  );
}
