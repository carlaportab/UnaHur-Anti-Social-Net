import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { PostFeedItem } from '../components/posts/PostFeedItem';
import { SkeletonPost } from '../components/ui/SkeletonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { FeedLayout } from '../components/feed/FeedLayout';
import { FeedComposeBox } from '../components/feed/FeedComposeBox';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTypingText } from '../hooks/useReducedMotion';
import { GlitchLink, GlitchText } from '../components/ui/GlitchText';
import { useUi } from '../context/UiContext';
import { getPosts, createPost, createPostImage } from '../services/postService';
import type { Post } from '../types';

const TYPING_TEXT = '// La red social para los que prefieren el terminal';

export function Home() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const typedText = useTypingText(TYPING_TEXT, 45);
  const [posts, setPosts] = useState<Post[]>([]);

  const { terminalMode } = useUi();

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('No se pudo cargar el feed.'))
      .finally(() => setLoading(false));
  }, []);

  const handleQuickPost = async (text: string, imageUrl?: string) => {
    const tagIds: number[] = [];
    if (!user) return;
    try {
      const newPost = await createPost({ description: text, userId: user.id, tagIds });
      newPost.user = user;
      if (imageUrl) {
        await createPostImage({ url: imageUrl, postId: newPost.id });
        newPost.images = [imageUrl];
      }
      setPosts((prev) => [newPost, ...prev]);
      toast('Publicado. Nadie lo va a leer, pero quedó online.', 'success');
    } catch {
      toast('Error al publicar. ¿Está el servidor corriendo?', 'error');
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <section className="relative overflow-hidden border-b border-[var(--border)] dot-grid">
          <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="animate-fade-up mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-green)] bg-[var(--bg-glass)] px-3 py-1 font-mono text-xs text-[var(--green-light)]">
                <Terminal size={12} />
                v0.1.0 — shell mode
              </div>
              <GlitchText
                as="h1"
                className="font-display text-3xl font-black tracking-wider text-[var(--text-primary)] sm:text-5xl"
              >
                ANTI·SOCIAL NET
              </GlitchText>
              <p className="typing-cursor mt-4 font-mono text-sm text-[var(--cyan)]">
                {typedText}
              </p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Compartí tus ideas. Ignorá las respuestas. Eso es todo.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#feed">
                  <Button className="!px-5 !py-2 text-sm">Explorar publicaciones</Button>
                </a>
                <Link to="/register">
                  <Button variant="secondary" className="!px-5 !py-2 text-sm">
                    Unirse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`border-b ${terminalMode ? 'border-[var(--border-green)] bg-[var(--green-dim)]/10' : 'border-[var(--border)] bg-[var(--bg-surface)]/30'}`}
        >
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              {terminalMode ? (
                <>
                  {'> whoami → '}
                  <GlitchLink
                    to={`/usuario/${user?.nickName}`}
                    className="text-[var(--green-light)]"
                  >
                    @{user?.nickName}
                  </GlitchLink>
                  {' · '}
                  <GlitchText className="text-[var(--cyan)]">session restored</GlitchText>
                </>
              ) : (
                <>
                  {'> Bienvenide de vuelta, '}
                  <GlitchLink
                    to={`/usuario/${user?.nickName}`}
                    className="text-[var(--green-light)]"
                  >
                    @{user?.nickName}
                  </GlitchLink>
                  {' — tu feed te extrañó. Mentira.'}
                </>
              )}
            </p>
          </div>
        </section>
      )}

      <FeedLayout>
        <div id="feed">
          <GlitchText
            as="h2"
            className="animate-fade-up mb-4 font-mono text-sm text-[var(--green-light)]"
          >
            {terminalMode ? '> tail -f /var/log/timeline' : '> timeline'}
          </GlitchText>

          {loading ? (
            <div
              className={`timeline-feed timeline-feed--continuous ${terminalMode ? 'timeline-feed--terminal' : ''}`}
            >
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </div>
          ) : error ? (
            <EmptyState ascii="> error" title={error} />
          ) : posts.length === 0 ? (
            <EmptyState
              ascii="> feed vacío"
              title="No hay publicaciones aún. Sé el primero. O no. Da igual."
            />
          ) : (
            <div
              className={`timeline-feed timeline-feed--continuous ${terminalMode ? 'timeline-feed--terminal' : ''}`}
            >
              <FeedComposeBox onPost={handleQuickPost} />
              {posts.map((post, i) => (
                <PostFeedItem
                  key={post.id}
                  post={post}
                  variant="feed"
                  showInlineComments
                  className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}
                />
              ))}
            </div>
          )}
        </div>
      </FeedLayout>
    </>
  );
}
