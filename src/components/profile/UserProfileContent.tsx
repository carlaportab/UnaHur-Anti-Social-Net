import { GlitchText } from '../ui/GlitchText';
import { PostFeedItem } from '../posts/PostFeedItem';
import { ProfileHeader } from './ProfileHeader';
import { EmptyState } from '../ui/EmptyState';
import { FeedLayout } from '../feed/FeedLayout';
import { useToast } from '../../context/ToastContext';
import { useUi } from '../../context/UiContext';
import type { User } from '../../types';
import { useEffect, useState } from 'react';
import { getPostsByUserId } from '../../services/postService';
import { SkeletonPost } from '../ui/SkeletonCard';
import type { Post } from '../../types';

interface UserProfileContentProps {
  user: User;
  isOwnProfile?: boolean;
  onLogout?: () => void;
}

export function UserProfileContent({
  user,
  isOwnProfile = false,
  onLogout,
}: UserProfileContentProps) {
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPostsByUserId(user.id)
        .then(setUserPosts)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
  }, [user.id]);

  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes ?? 0), 0);

  const handleFollow = () => {
    toast(`Ahora seguís a @${user.nickName}. (mock, no pasa nada)`, 'info');
  };

  const profileHeader = (
    <ProfileHeader
      user={user}
      isOwnProfile={isOwnProfile}
      onLogout={onLogout}
      onFollow={handleFollow}
      postCount={userPosts.length}
      totalLikes={totalLikes}
    />
  );

  if (loading) {
    return (
      <FeedLayout showSidebar={!isOwnProfile}>
        <div>
          {profileHeader}
          <SkeletonPost />
        </div>
      </FeedLayout>
    );
  }

  if (error) {
    return (
      <FeedLayout showSidebar={!isOwnProfile}>
        <div>
          {profileHeader}
          <EmptyState
            ascii={terminalMode ? '> error' : '> feed roto'}
            title="No se pudieron cargar las publicaciones."
          />
        </div>
      </FeedLayout>
    );
  }

  return (
    <FeedLayout showSidebar={!isOwnProfile}>
      <div>
        {profileHeader}

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