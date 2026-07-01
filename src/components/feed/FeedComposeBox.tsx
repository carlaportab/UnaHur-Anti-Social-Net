import { useState, useEffect } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { GlitchLink } from '../ui/GlitchText';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { UserAvatar } from '../ui/UserAvatar';
import { Button } from '../ui/Button';
import { getTags } from '../../services/postService';
import type { Tag } from '../../types';

interface FeedComposeBoxProps {
  onPost?: (text: string, imageUrl?: string, tagIds?: number[]) => void;
}

export function FeedComposeBox({ onPost }: FeedComposeBoxProps) {
  const { user, isAuthenticated } = useAuth();
  const { terminalMode } = useUi();
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    if (isAuthenticated) getTags().then(setTags).catch(() => {});
  }, [isAuthenticated]);

  const toggleTag = (id: number) =>
    setSelectedTags((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);

  const handlePublish = () => {
    const trimmed = text.trim();
    if (!trimmed || !onPost) return;
    onPost(trimmed, imageUrl.trim() || undefined, selectedTags);
    setText('');
    setImageUrl('');
    setShowImage(false);
    setSelectedTags([]);
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

  const tagRow = tags.length > 0 && (
    <div className="flex flex-wrap gap-1.5 pl-10">
      {tags.map((tag) => {
        const sel = selectedTags.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleTag(tag.id)}
            className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider transition-all ${
              sel
                ? 'border-[var(--border-green)] bg-[var(--green-dim)]/40 text-[var(--green-light)]'
                : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-meta)] hover:border-[var(--border-hover)]'
            }`}
          >
            {terminalMode ? `--${tag.name}` : `#${tag.name}`}
          </button>
        );
      })}
    </div>
  );

  if (terminalMode) {
    return (
      <div className="feed-compose-box feed-compose-box--terminal flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <UserAvatar nickName={user.nickName} size="md" className="post-terminal-avatar shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="mb-1 font-mono text-[0.6rem] text-[var(--green-dim)]">{'> echo $? # quick_post'}</p>
            <div className="flex items-center gap-2">
              <span className="shrink-0 font-mono text-sm text-[var(--green-light)]">&gt;_</span>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="stdin..."
                className="feed-compose-input feed-compose-input--terminal font-mono"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlePublish(); } }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowImage((v) => !v)}
            className={`shrink-0 rounded p-1.5 transition-colors ${showImage ? 'text-[var(--green-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            title="Adjuntar imagen"
          >
            <ImagePlus size={14} />
          </button>
          <Button type="button" onClick={handlePublish} className="shrink-0 !px-3 !py-2 font-mono text-xs">
            publish
          </Button>
        </div>
        {tagRow}
        {showImage && (
          <div className="flex w-full items-center gap-2 pl-10">
            <span className="font-mono text-[0.6rem] text-[var(--green-dim)] shrink-0">img[]:</span>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="feed-compose-input feed-compose-input--terminal font-mono flex-1 text-[0.7rem]"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="feed-compose-box flex-col gap-2">
      <div className="flex w-full items-center gap-2">
        <UserAvatar nickName={user.nickName} size="md" />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="> ¿qué estás debuggeando?"
          className="feed-compose-input font-mono"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handlePublish(); } }}
        />
        <button
          type="button"
          onClick={() => setShowImage((v) => !v)}
          className={`shrink-0 rounded p-2 transition-colors ${showImage ? 'text-[var(--green-light)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          title="Adjuntar imagen"
        >
          <ImagePlus size={16} />
        </button>
        <Button type="button" onClick={handlePublish} className="shrink-0 !px-4 !py-2 text-xs">
          Publicar
        </Button>
      </div>
      {tagRow}
      {showImage && (
        <div className="flex items-center gap-2 pl-10">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL de imagen (opcional)"
            className="input-field flex-1 font-mono text-sm"
          />
          {imageUrl && (
            <button type="button" onClick={() => setImageUrl('')} className="text-[var(--text-muted)] hover:text-[var(--red)]">
              <X size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
