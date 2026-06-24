import { PostCard } from './PostCard';
import type { Post } from '../../types';

interface PostFeedItemProps {
  post: Post;
  variant?: 'feed' | 'standalone';
  showInlineComments?: boolean;
  className?: string;
}

export function PostFeedItem({
  post,
  variant = 'standalone',
  showInlineComments = false,
  className = '',
}: PostFeedItemProps) {
  return (
    <PostCard
      post={post}
      variant={variant}
      showInlineComments={showInlineComments}
      className={className}
    />
  );
}
