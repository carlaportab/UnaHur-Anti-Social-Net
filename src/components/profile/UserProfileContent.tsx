import { GlitchText } from '../ui/GlitchText';
import { PostFeedItem } from '../posts/PostFeedItem';
import { ProfileHeader } from './ProfileHeader';
import { EmptyState } from '../ui/EmptyState';
import { FeedLayout } from '../feed/FeedLayout';
import { useToast } from '../../context/ToastContext';
import { useUi } from '../../context/UiContext';
import type { User } from '../../types';
import { getPostsByUserId } from '../../data/mockData';

interface UserProfileContentProps {
  user: User;
  isOwnProfile?: boolean;
}

export function UserProfileContent({
  user,
  isOwnProfile = false,
}: UserProfileContentProps) {
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const userPosts = getPostsByUserId(user.id);

  const handleFollow = () => {
    toast(`Ahora seguís a @${user.nickName}. (mock, no pasa nada)`, 'info');
  };

  return (
    <FeedLayout showSidebar={!isOwnProfile}>
      <div>
        <ProfileHeader
          user={user}
          isOwnProfile={isOwnProfile}
          onFollow={handleFollow}
        />

        <GlitchText
          as="h2"
          className="animate-fade-up mb-1 font-mono text-sm text-[var(--green-light)]"
        >
          {terminalMode
            ? isOwnProfile
              ? '> ls ~/posts/'
              : `> ls ~/${user.nickName}/posts/`
            : isOwnProfile
              ? '> mis publicaciones'
              : `> publicaciones de @${user.nickName}`}
        </GlitchText>
        <p className="animate-fade-up mb-4 font-mono text-[0.65rem] text-[var(--text-meta)]">
          {userPosts.length === 0
            ? terminalMode
              ? '// directorio vacío'
              : 'Sin publicaciones todavía'
            : terminalMode
              ? `// ${userPosts.length} archivo(s)`
              : `${userPosts.length} en el historial`}
        </p>

        {userPosts.length === 0 ? (
          <EmptyState
            ascii={terminalMode ? '> ∅' : '> feed vacío'}
            title={
              isOwnProfile
                ? 'No publicaste nada. El silencio también comunica.'
                : `@${user.nickName} no publicó nada. Respeto.`
            }
          />
        ) : (
          <div
            className={`timeline-feed timeline-feed--continuous ${
              terminalMode ? 'timeline-feed--terminal' : ''
            }`}
          >
            {userPosts.map((post, i) => (
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
