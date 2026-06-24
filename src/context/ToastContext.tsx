import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Toast, ToastVariant } from '../types/toast';

interface ToastContextType {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="toast-container pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:bottom-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-item pointer-events-auto flex items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl ${
              t.variant === 'success'
                ? 'border-[var(--emerald)]/40 bg-[var(--bg-surface)]'
                : t.variant === 'error'
                  ? 'border-[var(--red)]/40 bg-[var(--bg-surface)]'
                  : 'border-[var(--border-green)] bg-[var(--bg-surface)]'
            }`}
          >
            <span
              className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                t.variant === 'success'
                  ? 'bg-[var(--emerald)]'
                  : t.variant === 'error'
                    ? 'bg-[var(--red)]'
                    : 'bg-[var(--green)]'
              }`}
            />
            <p className="flex-1 font-mono text-xs leading-relaxed text-[var(--text-secondary)]">
              {t.message}
            </p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="font-mono text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
}
