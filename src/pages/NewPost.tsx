import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, Send, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ImageUrlPreview } from '../components/ui/ImageUrlPreview';
import { mockTags } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { GlitchText } from '../components/ui/GlitchText';
import { useUi } from '../context/UiContext';

export function NewPost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { terminalMode } = useUi();
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [descError, setDescError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  const addImageField = () => setImageUrls((prev) => [...prev, '']);

  const removeImageField = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index: number, value: string) => {
    setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setDescError(true);
      toast('La descripción es obligatoria.', 'error');
      return;
    }
    setSubmitted(true);
    toast('Publicación creada (mock). Redirigiendo...', 'success');
    setTimeout(() => navigate('/perfil'), 1500);
  };

  const tagButtons = mockTags.map((tag) => {
    const selected = selectedTags.includes(tag.id);
    return (
      <button
        key={tag.id}
        type="button"
        onClick={() => toggleTag(tag.id)}
        className={`rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-[var(--transition-fast)] sm:py-1.5 ${
          selected
            ? 'border-[var(--border-green)] bg-[var(--green-dim)]/40 text-[var(--green-light)] shadow-[var(--glow-green)]'
            : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-meta)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
        }`}
      >
        {tag.name}
      </button>
    );
  });

  const imageFields = imageUrls.map((url, index) => (
    <div key={index} className="flex gap-2">
      <span className="hidden shrink-0 pt-2.5 font-mono text-xs text-[var(--green-dim)] sm:inline">
        [{index}]
      </span>
      <input
        type="url"
        value={url}
        onChange={(e) => updateImageUrl(index, e.target.value)}
        placeholder="https://picsum.photos/seed/ejemplo/800/500"
        className="input-field min-w-0 flex-1 font-mono text-base sm:text-sm"
      />
      {imageUrls.length > 1 && (
        <button
          type="button"
          onClick={() => removeImageField(index)}
          className="tap-target shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] px-3 text-[var(--text-meta)] transition-colors hover:border-[var(--red)]/40 hover:text-[var(--red)]"
          aria-label="Eliminar URL"
        >
          <X size={16} />
        </button>
      )}
    </div>
  ));

  return (
    <div className="mx-auto max-w-2xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="animate-fade-up">
        {terminalMode ? (
          <>
            <p className="mb-1 font-mono text-xs text-[var(--green-light)]">{'> vim nuevo_post.sh'}</p>
            <GlitchText as="h1" className="mb-2 font-mono text-lg font-bold text-[var(--text-primary)] sm:text-xl">
              compose --full
            </GlitchText>
            <p className="meta-muted mb-6 font-mono text-xs sm:mb-8">
              {'// stdin → stdout. audience: 3 usuarios online.'}
            </p>
          </>
        ) : (
          <>
            <GlitchText as="h1" className="mb-2 font-display text-xl font-bold tracking-wide sm:text-2xl">
              NUEVA PUBLICACIÓN
            </GlitchText>
            <p className="meta-muted mb-6 font-mono text-xs sm:mb-8 sm:text-sm">
              {'> compartí algo con el mundo. O con los 3 usuarios online.'}
            </p>
          </>
        )}

        {submitted ? (
          <div className={terminalMode ? 'terminal-panel p-8 text-center' : 'glass-card p-8 text-center'}>
            <p className="font-mono text-[var(--emerald)]">
              {terminalMode ? 'exit 0 — redirect /perfil' : 'Publicación creada (mock). Redirigiendo al perfil...'}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={
              terminalMode
                ? 'terminal-panel space-y-6 p-4 sm:p-6'
                : 'rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-surface)] p-4 sm:p-8'
            }
          >
            <div>
              <label className="mb-2 block font-mono text-xs text-[var(--text-meta)]">
                {terminalMode ? 'description * (required)' : 'descripción *'}
              </label>
              {terminalMode && (
                <p className="mb-2 font-mono text-[0.65rem] text-[var(--green-dim)]">
                  {'$ cat << EOF'}
                </p>
              )}
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescError(false);
                }}
                rows={6}
                placeholder={
                  terminalMode
                    ? '# escribí acá. sin socializar.'
                    : 'Contá algo técnico, friki o existencial...'
                }
                className={`input-field resize-none font-mono text-base sm:text-sm ${descError ? 'input-error' : ''}`}
              />
              {terminalMode && (
                <p className="mt-1 font-mono text-[0.65rem] text-[var(--green-dim)]">EOF</p>
              )}
              {descError && (
                <p className="mt-1.5 font-mono text-xs text-[var(--red)]">
                  {terminalMode ? 'stderr: description required' : 'La descripción es obligatoria'}
                </p>
              )}
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <label className="font-mono text-xs text-[var(--text-meta)]">
                  {terminalMode ? 'attachments[] (optional)' : 'urls_de_imágenes (opcional)'}
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={addImageField}
                  className="!px-3 !py-2 font-mono text-xs"
                >
                  <ImagePlus size={14} />
                  {terminalMode ? 'push url' : 'Agregar imagen'}
                </Button>
              </div>
              <div className="space-y-2">{imageFields}</div>
              <ImageUrlPreview urls={imageUrls} />
            </div>

            <div>
              <label className="mb-3 block font-mono text-xs text-[var(--text-meta)]">
                {terminalMode ? 'tags --select' : 'etiquetas'}
              </label>
              <div className="flex flex-wrap gap-2">{tagButtons}</div>
            </div>

            <Button type="submit" className="w-full font-mono">
              <Send size={16} />
              {terminalMode ? 'git push origin main' : 'Publicar'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
