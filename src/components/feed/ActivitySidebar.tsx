import { Link } from 'react-router-dom';
import { GlitchLink, GlitchText } from '../ui/GlitchText';
import { MessageCircle, Star, User } from 'lucide-react';
import type { User as UserType } from '../../types';
import { getLatestComments, mockTags, mockUsers } from '../../data/mockData';

interface ActivitySidebarProps {
  className?: string;
}

export function ActivitySidebar({ className = '' }: ActivitySidebarProps) {
  const latestComments = getLatestComments(5);

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
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--green-dim)] font-mono text-[0.6rem] font-semibold text-[var(--green-light)]">
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
          {mockTags.map((tag) => (
            <Link
              key={tag.id}
              to={`/explorar?tag=${encodeURIComponent(tag.name)}`}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-surface-2)] px-2.5 py-1 font-mono text-[0.65rem] font-semibold text-[var(--cyan-light)] transition-colors hover:border-[var(--border-green)]"
            >
              {tag.name}
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
            {latestComments.length}+ comentarios recientes
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
      <h3 className="mb-3 font-mono text-xs font-semibold text-[var(--green-light)]">
        {'> '}{title}
      </h3>
      {children}
    </div>
  );
}
