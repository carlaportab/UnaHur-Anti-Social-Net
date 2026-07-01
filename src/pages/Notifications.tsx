import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Hash, MessageSquare, User } from 'lucide-react';
import { FeedLayout } from '../components/feed/FeedLayout';
import { EmptyState } from '../components/ui/EmptyState';
import { GlitchText } from '../components/ui/GlitchText';
import { mockNotifications } from '../data/mockNotifications';
import { useUi } from '../context/UiContext';
import { formatTimeAgo } from '../utils/time';
import type { AppNotification, NotificationType } from '../types/notification';

type Filter = 'all' | 'unread';

function iconFor(type: NotificationType, size = 18) {
  switch (type) {
    case 'comment':
      return <MessageSquare size={size} className="text-[var(--cyan)]" />;
    case 'follow':
      return <User size={size} className="text-[var(--green)]" />;
    case 'mention':
      return <Hash size={size} className="text-[var(--amber)]" />;
    default:
      return <Bell size={size} className="text-[var(--text-muted)]" />;
  }
}

function terminalTypeLabel(type: NotificationType): string {
  switch (type) {
    case 'comment':
      return 'MSG';
    case 'follow':
      return 'FOLLOW';
    case 'mention':
      return 'MENTION';
    default:
      return 'SYS';
  }
}

export function Notifications() {
  const { terminalMode } = useUi();
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);
  const [filter, setFilter] = useState<Filter>('all');

  const unread = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const filtered = useMemo(
    () => (filter === 'unread' ? notifications.filter((n) => !n.read) : notifications),
    [notifications, filter],
  );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <FeedLayout showSidebar={false}>
      <div className="animate-fade-up">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <GlitchText
              as="h1"
              className="font-display text-xl font-bold tracking-wide sm:text-2xl"
            >
              {terminalMode ? 'SYSLOG' : 'NOTIFICACIONES'}
            </GlitchText>
            <p className="mt-2 font-mono text-xs text-[var(--cyan)] sm:text-sm">
              {terminalMode
                ? `// tail -f /var/log/notifications — ${unread} unread in queue`
                : `// ${unread} sin leer · todo lo que pasó mientras mirabas el techo`}
            </p>
          </div>

          {unread > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-2 font-mono text-xs text-[var(--green-light)] transition-colors hover:border-[var(--border-green)] hover:bg-[var(--green-dim)]/20"
            >
              {terminalMode ? 'mark --all-read' : 'Marcar todas leídas'}
            </button>
          )}
        </div>

        <div className="mb-5 flex gap-2">
          {(['all', 'unread'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full border px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === key
                  ? 'border-[var(--border-green)] bg-[var(--green-dim)]/40 text-[var(--green-light)] shadow-[var(--glow-green)]'
                  : 'border-[var(--border)] bg-[var(--bg-surface-2)] text-[var(--text-meta)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
              }`}
            >
              {terminalMode
                ? key === 'all'
                  ? '--all'
                  : '--unread'
                : key === 'all'
                  ? 'Todas'
                  : 'Sin leer'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            ascii={terminalMode ? '> inbox empty' : '> ∅'}
            title={
              filter === 'unread'
                ? terminalMode
                  ? 'No unread events in buffer. Suspiciously quiet.'
                  : 'No tenés notificaciones sin leer. Qué tranquilidad.'
                : terminalMode
                  ? 'Notification daemon idle. Nothing to report.'
                  : 'Sin notificaciones. El silencio también es una respuesta.'
            }
          />
        ) : terminalMode ? (
          <div className="terminal-panel overflow-hidden">
            <div className="border-b border-[var(--border-green)]/40 px-4 py-2.5 font-mono text-[0.65rem] text-[var(--green-dim)]">
              {'> journalctl -u antisocial-notify --no-pager'}
            </div>
            <ul className="divide-y divide-[var(--border-green)]/20">
              {filtered.map((n) => (
                <li key={n.id}>
                  <Link
                    to={n.link}
                    onClick={() => markRead(n.id)}
                    className={`block px-4 py-3 font-mono text-xs transition-colors hover:bg-[var(--green-dim)]/10 sm:text-sm ${
                      !n.read ? 'bg-[var(--green-dim)]/5' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[var(--green-dim)]">
                        [{String(n.id).padStart(3, '0')}]
                      </span>
                      <span className="text-[var(--amber)]">
                        {terminalTypeLabel(n.type)}
                      </span>
                      <span
                        className={
                          n.read ? 'text-[var(--text-muted)]' : 'text-[var(--green-light)]'
                        }
                      >
                        {n.read ? 'READ' : 'UNREAD'}
                      </span>
                      <span className="ml-auto text-[var(--text-muted)]">
                        {formatTimeAgo(n.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[var(--text-secondary)]">{n.message}</p>
                    <p className="mt-1 text-[var(--text-muted)]">
                      {'→ '}
                      <span className="text-[var(--cyan)]">{n.link}</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--border-green)]/40 px-4 py-2 font-mono text-[0.65rem] text-[var(--green-dim)]">
              {`> EOF — ${filtered.length} event${filtered.length === 1 ? '' : 's'} logged`}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)]/50">
            <ul className="divide-y divide-[var(--border)]">
              {filtered.map((n) => (
                <li key={n.id}>
                  <Link
                    to={n.link}
                    onClick={() => markRead(n.id)}
                    className={`flex gap-3 px-4 py-4 transition-colors hover:bg-[var(--bg-glass)] sm:px-5 sm:py-4 ${
                      !n.read ? 'bg-[var(--green-dim)]/10' : ''
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface-2)]">
                      {iconFor(n.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                        {n.message}
                      </p>
                      <p className="meta-muted mt-1.5 font-mono text-[0.65rem]">
                        {formatTimeAgo(n.createdAt)}
                      </p>
                    </div>
                    {!n.read && (
                      <span
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)]"
                        aria-label="Sin leer"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 font-mono text-[0.65rem] text-[var(--text-muted)]">
          {terminalMode
            ? `> status: ${filtered.length} rows · pid=notifyd`
            : `> ${filtered.length} notificación${filtered.length === 1 ? '' : 'es'}`}
        </p>
      </div>
    </FeedLayout>
  );
}
