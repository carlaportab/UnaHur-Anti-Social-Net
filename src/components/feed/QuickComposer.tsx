import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUi } from '../../context/UiContext';
import { Button } from '../ui/Button';

interface QuickComposerProps {
  onPost?: (text: string) => void;
}

export function QuickComposer({ onPost }: QuickComposerProps) {
  const { user } = useAuth();
  const { terminalMode } = useUi();

  if (!user) return null;

  const handlePublish = () => {
    const el = document.getElementById('quick-composer') as HTMLTextAreaElement | null;
    const value = el?.value.trim();
    if (value && onPost) {
      onPost(value);
      if (el) el.value = '';
    }
  };

  if (terminalMode) {
    return (
      <div className="terminal-panel mb-4 p-3 sm:p-4">
        <p className="mb-2 font-mono text-xs text-[var(--green-light)]">
          {'> echo $? # quick_post'}
        </p>
        <div className="flex gap-2">
          <span className="hidden shrink-0 pt-2.5 font-mono text-sm text-[var(--green-light)] sm:inline">
            &gt;_
          </span>
          <textarea
            id="quick-composer"
            rows={2}
            placeholder="¿Qué está pasando en tu terminal?"
            className="input-field min-w-0 flex-1 resize-none font-mono text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handlePublish();
              }
            }}
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Link to="/nuevo-post" className="flex-1 sm:flex-none">
            <Button variant="ghost" className="w-full !px-3 !py-2 text-xs">
              <Plus size={14} />
              post --full
            </Button>
          </Link>
          <Button
            variant="primary"
            className="flex-1 !px-4 !py-2 text-xs sm:flex-none"
            onClick={handlePublish}
          >
            publish
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] p-3 sm:p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--green)] font-mono text-xs font-bold text-[var(--bg-base)]">
          {user.nickName.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <textarea
            id="quick-composer"
            rows={2}
            placeholder="¿Qué está pasando en tu terminal?"
            className="input-field resize-none text-base sm:text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handlePublish();
              }
            }}
          />
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="hidden font-mono text-[0.65rem] text-[var(--text-muted)] sm:inline">
              Ctrl+Enter para publicar
            </span>
            <div className="flex gap-2">
              <Link to="/nuevo-post" className="flex-1 sm:flex-none">
                <Button variant="ghost" className="w-full !px-3 !py-2.5 text-xs sm:w-auto sm:!py-1.5">
                  <Plus size={14} />
                  <span className="sm:hidden">Más opciones</span>
                  <span className="hidden sm:inline">Post completo</span>
                </Button>
              </Link>
              <Button
                variant="primary"
                className="flex-1 !px-4 !py-2.5 text-xs sm:flex-none sm:!py-1.5"
                onClick={handlePublish}
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
