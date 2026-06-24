import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Bell, Hash, MessageSquare, User, X } from 'lucide-react';
import { GlitchText } from '../ui/GlitchText';
import { mockNotifications } from '../../data/mockNotifications';
import { formatTimeAgo } from '../../utils/time';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import type { AppNotification } from '../../types/notification';

function iconFor(type: AppNotification['type']) {
  switch (type) {
    case 'comment':
      return <MessageSquare size={16} className="text-[var(--cyan)]" />;
    case 'follow':
      return <User size={16} className="text-[var(--green)]" />;
    case 'mention':
      return <Hash size={16} className="text-[var(--amber)]" />;
    default:
      return <Bell size={16} className="text-[var(--text-muted)]" />;
  }
}

interface NotificationListProps {
  notifications: AppNotification[];
  unread: number;
  onMarkAllRead: () => void;
  onMarkRead: (id: number) => void;
  onClose: () => void;
  variant: 'dropdown' | 'sheet';
}

function NotificationList({
  notifications,
  unread,
  onMarkAllRead,
  onMarkRead,
  onClose,
  variant,
}: NotificationListProps) {
  const isSheet = variant === 'sheet';

  return (
    <>
      {!isSheet && (
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="font-mono text-xs font-semibold text-[var(--green-light)]">
            {'> notificaciones'}
          </span>
          {unread > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="font-mono text-[0.65rem] text-[var(--text-meta)] transition-colors hover:text-[var(--green-light)]"
            >
              marcar leídas
            </button>
          )}
        </div>
      )}

      <ul
        className={
          isSheet
            ? 'notif-sheet-list min-h-0 flex-1 overflow-y-auto overscroll-contain'
            : 'max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain'
        }
      >
        {notifications.length === 0 ? (
          <li className="px-4 py-10 text-center font-mono text-xs text-[var(--text-meta)]">
            Sin notificaciones. Qué tranquilidad.
          </li>
        ) : (
          notifications.map((n) => (
            <li key={n.id}>
              <Link
                to={n.link}
                onClick={() => {
                  onMarkRead(n.id);
                  onClose();
                }}
                className={`flex gap-3 border-b border-[var(--border)] transition-colors hover:bg-[var(--bg-glass)] active:bg-[var(--bg-glass)] ${
                  isSheet ? 'px-4 py-4' : 'px-4 py-3'
                } ${!n.read ? 'bg-[var(--green-dim)]/10' : ''}`}
              >
                <div
                  className={`flex shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface-2)] ${
                    isSheet ? 'h-10 w-10' : 'mt-0.5 h-auto w-auto bg-transparent'
                  }`}
                >
                  {iconFor(n.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`leading-relaxed text-[var(--text-secondary)] ${
                      isSheet ? 'text-sm' : 'text-xs'
                    }`}
                  >
                    {n.message}
                  </p>
                  <p className="meta-muted mt-1 font-mono text-[0.65rem]">
                    {formatTimeAgo(n.createdAt)}
                  </p>
                </div>
                {!n.read && (
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)]" />
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

function MobileNotificationSheet({
  open,
  onClose,
  unread,
  onMarkAllRead,
  children,
}: {
  open: boolean;
  onClose: () => void;
  unread: number;
  onMarkAllRead: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="notif-sheet-backdrop fixed inset-0 z-[150] bg-black/60 backdrop-blur-[3px] animate-fade-in"
        aria-label="Cerrar notificaciones"
        onClick={onClose}
      />
      <div
        className="notif-sheet fixed inset-x-0 bottom-0 z-[151] flex max-h-[min(88dvh,640px)] flex-col overflow-hidden rounded-t-2xl border border-b-0 border-[var(--border)] bg-[var(--bg-surface)] shadow-[0_-12px_40px_oklch(0%_0_0/0.45)]"
        role="dialog"
        aria-modal="true"
        aria-label="Notificaciones"
      >
        <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 pb-3 pt-2">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--border-hover)]" aria-hidden />
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--green-dim)]/30 text-[var(--green-light)]">
              <Bell size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-base font-bold text-[var(--text-primary)]">
                <GlitchText>Notificaciones</GlitchText>
              </h2>
              {unread > 0 ? (
                <p className="font-mono text-[0.65rem] text-[var(--text-meta)]">
                  {unread} sin leer
                </p>
              ) : (
                <p className="font-mono text-[0.65rem] text-[var(--text-meta)]">Todo al día</p>
              )}
            </div>
            {unread > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] px-2.5 py-1.5 font-mono text-[0.65rem] text-[var(--green-light)] transition-colors hover:border-[var(--border-green)] hover:bg-[var(--green-dim)]/20"
              >
                Marcar leídas
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="tap-target shrink-0 rounded-full p-2 text-[var(--text-meta)] transition-colors hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        {children}
        <div className="shrink-0 bg-[var(--bg-surface)] pb-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>,
    document.body,
  );
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMatchMedia('(max-width: 767px)');

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (isMobile || !open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobile, open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isMobile) setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, isMobile]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="tap-target relative rounded-[var(--radius-sm)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
        aria-label={unread > 0 ? `Notificaciones, ${unread} sin leer` : 'Notificaciones'}
        aria-expanded={open}
        aria-haspopup={isMobile ? 'dialog' : 'true'}
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[var(--red)] px-0.5 font-mono text-[0.55rem] font-bold leading-none text-white ring-2 ring-[var(--bg-base)]">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {isMobile ? (
        <MobileNotificationSheet
          open={open}
          onClose={close}
          unread={unread}
          onMarkAllRead={markAllRead}
        >
          <NotificationList
            notifications={notifications}
            unread={unread}
            onMarkAllRead={markAllRead}
            onMarkRead={markRead}
            onClose={close}
            variant="sheet"
          />
        </MobileNotificationSheet>
      ) : (
        open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]">
            <NotificationList
              notifications={notifications}
              unread={unread}
              onMarkAllRead={markAllRead}
              onMarkRead={markRead}
              onClose={close}
              variant="dropdown"
            />
          </div>
        )
      )}
    </div>
  );
}
