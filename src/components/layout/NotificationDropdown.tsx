import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Hash, MessageSquare, User, X } from 'lucide-react';
import { mockNotifications } from '../../data/mockNotifications';
import { formatTimeAgo } from '../../utils/time';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import type { AppNotification } from '../../types/notification';

function iconFor(type: AppNotification['type']) {
  switch (type) {
    case 'comment':
      return <MessageSquare size={14} className="text-[var(--cyan)]" />;
    case 'follow':
      return <User size={14} className="text-[var(--green)]" />;
    case 'mention':
      return <Hash size={14} className="text-[var(--amber)]" />;
    default:
      return <Bell size={14} className="text-[var(--text-muted)]" />;
  }
}

interface NotificationListProps {
  notifications: AppNotification[];
  unread: number;
  onMarkAllRead: () => void;
  onMarkRead: (id: number) => void;
  onClose: () => void;
}

function NotificationList({
  notifications,
  unread,
  onMarkAllRead,
  onMarkRead,
  onClose,
}: NotificationListProps) {
  return (
    <>
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

      <ul className="max-h-[min(24rem,60vh)] overflow-y-auto overscroll-contain">
        {notifications.length === 0 ? (
          <li className="px-4 py-6 text-center font-mono text-xs text-[var(--text-meta)]">
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
                className={`flex gap-3 border-b border-[var(--border)] px-4 py-3 transition-colors hover:bg-[var(--bg-glass)] ${
                  !n.read ? 'bg-[var(--green-dim)]/10' : ''
                }`}
              >
                <div className="mt-0.5">{iconFor(n.type)}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    {n.message}
                  </p>
                  <p className="meta-muted mt-1 font-mono text-[0.65rem]">
                    {formatTimeAgo(n.createdAt)}
                  </p>
                </div>
                {!n.read && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--green)]" />
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

function SheetShell({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
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

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="notif-sheet-backdrop fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] animate-fade-in"
        aria-label="Cerrar notificaciones"
        onClick={onClose}
      />
      <div
        className="notif-sheet fixed bottom-0 left-0 right-0 z-[61] overflow-hidden rounded-t-[var(--radius-lg)] border border-b-0 border-[var(--border)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]"
        role="dialog"
        aria-modal="true"
        aria-label="Notificaciones"
      >
        <div className="flex justify-center pt-2 pb-1">
          <span className="h-1 w-10 rounded-full bg-[var(--border-hover)]" aria-hidden />
        </div>
        <div className="flex items-center justify-end px-3 pb-1 md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="tap-target rounded-[var(--radius-sm)] p-2 text-[var(--text-meta)] hover:bg-[var(--bg-glass)] hover:text-[var(--text-primary)]"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        {children}
        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMatchMedia('(max-width: 767px)');

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobile]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const close = () => setOpen(false);

  const list = (
    <NotificationList
      notifications={notifications}
      unread={unread}
      onMarkAllRead={markAllRead}
      onMarkRead={markRead}
      onClose={close}
    />
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="tap-target relative rounded-[var(--radius-sm)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
        aria-label="Notificaciones"
        aria-expanded={open}
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--red)] font-mono text-[0.55rem] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {isMobile ? (
        <SheetShell open={open} onClose={close}>
          {list}
        </SheetShell>
      ) : (
        open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] shadow-[var(--shadow-card)]">
            {list}
          </div>
        )
      )}
    </div>
  );
}
