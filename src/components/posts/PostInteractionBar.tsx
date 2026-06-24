import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Star, Terminal } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useUi } from '../../context/UiContext';

interface PostInteractionBarProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

export function PostInteractionBar({
  postId,
  likeCount,
  commentCount,
}: PostInteractionBarProps) {
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likeCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setCount((c) => Math.max(0, c - 1));
    } else {
      setLiked(true);
      setCount((c) => c + 1);
    }
  };

  const handleShare = () => {
    toast(
      terminalMode
        ? 'scp post.tar.gz copiado (mock).'
        : 'Link copiado (mock). Nadie lo va a abrir igual.',
      'info',
    );
  };

  if (terminalMode) {
    return (
      <div className="post-interaction-bar post-interaction-bar--terminal">
        <button
          type="button"
          onClick={toggleLike}
          className={`post-interaction-item post-interaction-item--like ${liked ? 'is-active' : ''}`}
          aria-pressed={liked}
        >
          <Star size={14} className={liked ? 'fill-current' : ''} />
          <span>{'++'}{count}</span>
        </button>

        <span className="post-interaction-divider" aria-hidden />

        <Link to={`/post/${postId}`} className="post-interaction-item post-interaction-item--comment">
          <MessageCircle size={14} />
          <span>reply({commentCount})</span>
        </Link>

        <span className="post-interaction-divider" aria-hidden />

        <button type="button" onClick={handleShare} className="post-interaction-item post-interaction-item--share">
          <Terminal size={14} />
          <span>scp</span>
        </button>
      </div>
    );
  }

  return (
    <div className="post-interaction-bar">
      <button
        type="button"
        onClick={toggleLike}
        className={`post-interaction-item post-interaction-item--like ${liked ? 'is-active' : ''}`}
        aria-pressed={liked}
      >
        <Heart size={16} className={liked ? 'fill-current' : ''} />
        <span>{count}</span>
      </button>

      <span className="post-interaction-divider" aria-hidden />

      <Link to={`/post/${postId}`} className="post-interaction-item post-interaction-item--comment">
        <MessageCircle size={16} />
        <span>{commentCount} comentarios</span>
      </Link>

      <span className="post-interaction-divider" aria-hidden />

      <button type="button" onClick={handleShare} className="post-interaction-item post-interaction-item--share">
        <Share2 size={16} />
        <span>Compartir</span>
      </button>
    </div>
  );
}
