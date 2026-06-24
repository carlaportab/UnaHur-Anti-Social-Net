import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PostDetailView } from '../components/posts/PostDetailView';
import { ErrorPage } from '../components/ui/ErrorPage';
import { useUi } from '../context/UiContext';
import { getCommentsByPostId, getPostById } from '../data/mockData';
import { useToast } from '../context/ToastContext';

export function PostDetail() {
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const { id } = useParams<{ id: string }>();
  const post = getPostById(Number(id));
  const comments = post ? getCommentsByPostId(post.id) : [];
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <ErrorPage
        typingMessage="// Error 404: publicación no encontrada en el feed"
        ascii={'> cat post/id\n> No such post'}
        title="Este post se fue. Como tu motivación los lunes."
        backLabel="Volver al feed"
      />
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setNewComment('');
    toast(
      terminalMode
        ? 'reply sent (mock). exit 0.'
        : 'Comentario enviado (mock). Ignorar es opcional.',
      'success',
    );
  };

  return (
    <div className="post-detail-page mx-auto max-w-[680px] px-3 py-4 sm:px-6 sm:py-6">
      <Link
        to="/"
        className="animate-fade-up mb-4 inline-flex min-h-[44px] items-center gap-2 font-mono text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--green-light)]"
      >
        <ArrowLeft size={16} />
        {terminalMode ? 'cd ../feed' : 'volver al feed'}
      </Link>

      <h1 className="animate-fade-up mb-1 font-mono text-sm text-[var(--green-light)]">
        {terminalMode ? `> cat post/${post.id}` : `> post/${post.id}`}
      </h1>
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
