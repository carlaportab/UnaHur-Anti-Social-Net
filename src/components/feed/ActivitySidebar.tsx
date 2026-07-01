import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlitchLink, GlitchText } from '../ui/GlitchText';
import { MessageCircle, Star, User } from 'lucide-react';
import type { Tag, User as UserType } from '../../types';
import { getLatestComments, mockUsers } from '../../data/mockData';
import { getTags } from '../../services/postService';
import { useUi } from '../../context/UiContext';

interface ActivitySidebarProps {
  className?: string;
}

export function ActivitySidebar({ className = '' }: ActivitySidebarProps) {
  const { terminalMode } = useUi();
  const latestComments = getLatestComments(5);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags).catch(() => {});
  }, []);

  if (terminalMode) {
    return (
      <aside className={`space-y-3 font-mono text-xs ${className}`}>

        {/* ps aux — usuarios online */}
        <div className="terminal-panel overflow-hidden">
          <div className="border-b border-[var(--border-green)]/40 px-3 py-2 text-[0.6rem] text-[var(--green-dim)]">
            <GlitchText>{'> ps aux --online'}</GlitchText>
          </div>
          <ul className="divide-y divide-[var(--border-green)]/10">
            {mockUsers.map((u: UserType, i) => (
              <li key={u.id}>
                <Link
                  to={`/usuario/${u.nickName}`}
                  className="flex items-center gap-2 px-3 py-2 transition-colors hover:bg-[var(--green-dim)]/10"
                >
                  <span className="w-5 text-[var(--green-dim)]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[var(--text-muted)]">user</span>
                  <GlitchText className="text-[var(--green-light)]">@{u.nickName}</GlitchText>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--emerald)] shadow-[0_0_4px_var(--emerald)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* tags reales */}
        <div className="terminal-panel overflow-hidden">
          <div className="border-b border-[var(--border-green)]/40 px-3 py-2 text-[0.6rem] text-[var(--green-dim)]">
            <GlitchText>{'> grep -r "#" /tags'}</GlitchText>
          </div>
          <div className="flex flex-wrap gap-1.5 p-3">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/explorar?tag=${encodeURIComponent(tag.name)}`}
                className="text-[var(--cyan)] transition-colors hover:text-[var(--cyan-light)]"
              >
                <GlitchText>--{tag.name}</GlitchText>
              </Link>
            ))}
          </div>
        </div>

        {/* últimos comentarios como log */}
        <div className="terminal-panel overflow-hidden">
          <div className="border-b border-[var(--border-green)]/40 px-3 py-2 text-[0.6rem] text-[var(--green-dim)]">
            <GlitchText>{'> tail -f /var/log/comments'}</GlitchText>
          </div>
          <ul className="divide-y divide-[var(--border-green)]/10">
            {latestComments.map((c, i) => (
              <li key={c.id} className="px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--green-dim)]">[{String(i).padStart(3, '0')}]</span>
                  <GlitchLink
                    to={`/usuario/${c.user?.nickName}`}
                    className="text-[var(--cyan)] hover:text-[var(--cyan-light)]"
                  >
                    @{c.user?.nickName}
                  </GlitchLink>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[var(--text-muted)]">{c.content}</p>
                <Link
                  to={`/post/${c.postId}`}
                  className="text-[0.6rem] text-[var(--green-dim)] hover:text-[var(--green)]"
                >
                  {'→ /post/'}{c.postId}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* stats */}
        <div className="terminal-panel px-3 py-3">
          <GlitchText className="mb-2 text-[0.6rem] text-[var(--green-dim)]">{'> uptime --stats'}</GlitchText>
          <div className="space-y-1 text-[var(--text-muted)]">
            <p><span className="text-[var(--green-dim)]">users:</span> <span className="text-[var(--green-light)]">{mockUsers.length}</span> online</p>
            <p><span className="text-[var(--green-dim)]">tags:</span> <span className="text-[var(--cyan)]">{tags.length}</span> activas</p>
            <p><span className="text-[var(--green-dim)]">friends:</span> <span className="text-[var(--amber)]">0</span> required</p>
          </div>
          <p className="mt-2 text-[0.55rem] text-[var(--green-dim)]/60">// system nominal · no errors</p>
        </div>

      </aside>
    );
  }

  return (
    <aside className={`space-y-4 ${className}`}>
      <Widget title="usuarios_online">
        <ul className="space-y-2">
          {mockUsers.map((u: UserType) => (
            <li key={u.id}>
              <Link
                to={`/usuario/${u.nickName}`}
                className="flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 transition-colors hover:bg-[var(--bg-glass)]"
              >
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--green-dim)] font-mono text-[0.6rem] font-semibold text-[var(--green-light)]">
                  {u.nickName.slice(0, 2).toUpperCase()}
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[var(--bg-surface)] bg-[var(--emerald)]" />
                </span>
                <GlitchText className="font-mono text-xs text-[var(--text-secondary)]">
                  @{u.nickName}
                </GlitchText>
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title="tags_trending">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/explorar?tag=${encodeURIComponent(tag.name)}`}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] px-2.5 py-1 font-mono text-[0.65rem] font-semibold text-[var(--cyan-light)] transition-colors hover:border-[var(--border-green)]"
            >
              <GlitchText>#{tag.name}</GlitchText>
            </Link>
          ))}
        </div>
      </Widget>

      <Widget title="últimos_comentarios">
        <ul className="space-y-3">
          {latestComments.map((c) => (
            <li key={c.id} className="border-l-2 border-[var(--green-dim)] pl-3">
              <GlitchLink
                to={`/usuario/${c.user?.nickName}`}
                className="font-mono text-[0.65rem] font-semibold text-[var(--cyan)] hover:text-[var(--cyan-light)]"
              >
                @{c.user?.nickName}
              </GlitchLink>
              <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text-muted)]">
                {c.content}
              </p>
              <Link
                to={`/post/${c.postId}`}
                className="mt-1 inline-block font-mono text-[0.6rem] text-[var(--green-dim)] hover:text-[var(--green)]"
              >
                ver post →
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title="stats_del_día">
        <div className="space-y-2 font-mono text-xs text-[var(--text-muted)]">
          <p className="flex items-center gap-2">
            <User size={12} className="text-[var(--green)]" />
            {mockUsers.length} usuarios activos
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle size={12} className="text-[var(--cyan)]" />
            {tags.length} tags activas
          </p>
          <p className="flex items-center gap-2">
            <Star size={12} className="text-[var(--amber)]" />
            0 amigos requeridos
          </p>
        </div>
      </Widget>
    </aside>
  );
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-surface)] p-4">
      <GlitchText as="h3" className="mb-3 font-mono text-xs font-semibold text-[var(--green-light)]">
        {'> '}{title}
      </GlitchText>
      {children}
    </div>
  );
}
