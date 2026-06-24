import { getAvatarColor } from '../../utils/avatar';

interface UserAvatarProps {
  nickName: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showOnline?: boolean;
  className?: string;
}

const sizes = {
  xs: 'h-[22px] w-[22px] text-[0.5rem]',
  sm: 'h-8 w-8 text-[0.6rem]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-16 w-16 text-lg',
};

export function UserAvatar({
  nickName,
  size = 'md',
  showOnline = true,
  className = '',
}: UserAvatarProps) {
  const colors = getAvatarColor(nickName);
  const dotSize =
    size === 'lg' ? 'h-3.5 w-3.5' : size === 'xs' ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5';

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full font-mono font-bold ${sizes[size]} ${className}`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {nickName.slice(0, 2).toUpperCase()}
      {showOnline && size !== 'xs' && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 ${dotSize} rounded-full border-2 border-[var(--bg-base)] bg-[var(--emerald)]`}
        />
      )}
    </div>
  );
}
