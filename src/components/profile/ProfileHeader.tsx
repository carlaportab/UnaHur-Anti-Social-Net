import { Link } from 'react-router-dom';
import { LogOut, Plus, UserPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserAvatar } from '../ui/UserAvatar';
import { GlitchText } from '../ui/GlitchText';
import { useUi } from '../../context/UiContext';
import type { User } from '../../types';
import { getPostsByUserId } from '../../data/mockData';
import { getUserAccentColor } from '../../utils/userAccent';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  onLogout?: () => void;
  onFollow?: () => void;
}

export function ProfileHeader({
  user,
  isOwnProfile = false,
  onLogout,
  onFollow,
}: ProfileHeaderProps) {
  const { terminalMode } = useUi();
  const userPosts = getPostsByUserId(user.id);
  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes ?? 0), 0);
  const accentColor = getUserAccentColor(user.nickName);

  if (terminalMode) {
    return (
      <header className="profile-shell profile-shell--terminal animate-fade-up mb-6">
        <div className="profile-terminal-bar font-mono text-[0.65rem] text-[var(--green-dim)]">
          <span>{'> whoami'}</span>
          <span className="text-[var(--text-muted)]"> · uid:{user.id}</span>
          {isOwnProfile && <span className="text-[var(--cyan)]"> · session:local</span>}
        </div>

        <div className="profile-terminal-body p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <UserAvatar nickName={user.nickName} size="lg" className="post-terminal-avatar" />
              <div className="space-y-1 font-mono text-sm">
                <p>
                  <span className="text-[var(--text-muted)]">user:</span>{' '}
                  <span style={{ color: accentColor }}>
                    <GlitchText className="font-semibold">@{user.nickName}</GlitchText>
                  </span>
                </p>
                {user.career && (
                  <p className="text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--green-dim)]">path:</span>{' '}
                    {user.career.toLowerCase().replace(/\s+/g, '_')}@unahur
                  </p>
                )}
                {user.email && (
                  <p className="text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--green-dim)]">mail:</span> {user.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {isOwnProfile ? (
                <>
                  <Link to="/nuevo-post">
                    <Button className="!px-3 !py-1.5 font-mono text-xs">
                      <Plus size={14} />
                      nuevo_post
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={onLogout} className="!px-3 !py-1.5 font-mono text-xs">
                    <LogOut size={14} />
                    logout
                  </Button>
                </>
              ) : (
                <Button variant="secondary" onClick={onFollow} className="!px-3 !py-1.5 font-mono text-xs">
                  <UserPlus size={14} />
                  follow --mock
                </Button>
              )}
            </div>
          </div>

          <div className="profile-stats profile-stats--terminal mt-4 font-mono text-xs">
            <span>posts:<strong className="text-[var(--green-light)]">{userPosts.length}</strong></span>
            <span>++:<strong className="text-[var(--green-light)]">{totalLikes}</strong></span>
            <span>status:<strong className="text-[var(--cyan)]">online</strong></span>
            <span>peers:<strong className="text-[var(--text-muted)]">0</strong></span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="profile-shell animate-fade-up mb-6 overflow-hidden">
      <div className="profile-cover dot-grid" aria-hidden />

      <div className="profile-hero px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="profile-hero-top flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="profile-avatar-wrap -mt-10 sm:-mt-12">
              <UserAvatar nickName={user.nickName} size="lg" />
            </div>
            <div className="min-w-0 pb-1">
              <span style={{ color: accentColor }}>
                <GlitchText as="h1" className="font-mono text-xl font-bold sm:text-2xl">
                  @{user.nickName}
                </GlitchText>
              </span>
              {user.career && (
                <p className="mt-0.5 font-mono text-[11px] text-[var(--text-muted)]">
                  {user.career} · UNAHUR
                </p>
              )}
              {user.email && (
                <p className="mt-1 font-mono text-xs text-[var(--text-meta)]">{user.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:pb-1">
            {isOwnProfile ? (
              <>
                <Link to="/nuevo-post">
                  <Button className="w-full font-mono text-xs sm:w-auto">
                    <Plus size={16} />
                    Nueva publicación
                  </Button>
                </Link>
                <Button variant="danger" onClick={onLogout} className="w-full font-mono text-xs sm:w-auto">
                  <LogOut size={16} />
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={onFollow} className="w-full font-mono text-xs sm:w-auto">
                <UserPlus size={16} />
                Seguir
              </Button>
            )}
          </div>
        </div>

        <div className="profile-stats mt-4">
          <div className="profile-stat">
            <span className="profile-stat-value">{userPosts.length}</span>
            <span className="profile-stat-label">posts</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value text-[var(--green-light)]">{totalLikes}</span>
            <span className="profile-stat-label">++</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value text-[var(--cyan)]">online</span>
            <span className="profile-stat-label">estado</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">0</span>
            <span className="profile-stat-label">siguiendo</span>
          </div>
        </div>
      </div>
    </header>
  );
}
