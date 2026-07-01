import { useEffect, useState, type FormEvent } from 'react';
import { GlitchText } from '../components/ui/GlitchText';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PostDetailView } from '../components/posts/PostDetailView';
import { ErrorPage } from '../components/ui/ErrorPage';
import { SkeletonPost } from '../components/ui/SkeletonCard';
import { useUi } from '../context/UiContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { getPostById, getPostImages, getCommentsByPostId, createComment } from '../services/postService';
import type { Comment, Post } from '../types';

export function PostDetail() {
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) return;
    const postId = Number(id);

    Promise.all([
      getPostById(postId),
      getPostImages(postId),
      getCommentsByPostId(postId),
    ])
      .then(([fetchedPost, images, fetchedComments]) => {
        setPost({ ...fetchedPost, images });
        setComments(fetchedComments);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[680px] px-3 py-4 md:max-w-6xl sm:px-6 sm:py-6">
        <SkeletonPost />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <ErrorPage
        typingMessage="// Error 404: publicación no encontrada en el feed"
        ascii={'> cat post/id\n> No such post'}
        title="Este post se fue. Como tu motivación los lunes."
        backLabel="Volver al feed"
      />
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const created = await createComment({
        content: newComment.trim(),
        userId: user.id,
        postId: post.id,
      });
      // La API no siempre devuelve el User poblado, lo adjuntamos del contexto
      if (!created.user) created.user = user;
      setComments((prev) => [...prev, created]);
      setPost((prev) => prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev);
      setNewComment('');
      toast(
        terminalMode
          ? 'reply sent. exit 0.'
          : 'Comentario enviado. Ignorar es opcional.',
        'success',
      );
    } catch {
      toast('No se pudo enviar el comentario.', 'error');
    }
  };

  const postLabel = terminalMode ? `> cat post/${post.id}` : `> post/${post.id}`;

  return (
    <div className="post-detail-page mx-auto max-w-[680px] px-3 py-4 md:max-w-6xl sm:px-6 sm:py-6">
      <nav
        aria-label="Navegación del post"
        className="animate-fade-up mb-1 flex min-h-[44px] flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-[var(--green-light)]"
        >
          <ArrowLeft size={16} />
          {terminalMode ? 'cd ../feed' : 'volver al feed'}
        </Link>
        <span className="text-[var(--text-meta)]" aria-hidden>
          ›
        </span>
        <GlitchText className="text-[var(--green-light)]">{postLabel}</GlitchText>
      </nav>

      <p className="animate-fade-up mb-4 font-mono text-[0.65rem] text-[var(--text-meta)]">
        {terminalMode
          ? '// thread_view — hilo completo con replies'
          : 'Hilo completo · comentarios y permalink'}
      </p>

      <div
        className={`post-detail-shell animate-fade-up ${
          terminalMode ? 'post-detail-shell--terminal' : ''
        }`}
      >
        <PostDetailView
          post={post}
          comments={comments}
          newComment={newComment}
          onCommentChange={setNewComment}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
