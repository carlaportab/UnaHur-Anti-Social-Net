const AVATAR_COLORS = [
  { bg: 'oklch(40% 0.12 145)', text: 'oklch(72% 0.16 145)' },
  { bg: 'oklch(35% 0.1 210)', text: 'oklch(82% 0.12 210)' },
  { bg: 'oklch(38% 0.12 280)', text: 'oklch(78% 0.14 280)' },
  { bg: 'oklch(40% 0.14 50)', text: 'oklch(80% 0.12 50)' },
  { bg: 'oklch(36% 0.1 330)', text: 'oklch(76% 0.12 330)' },
];

export function getAvatarColor(nickName: string) {
  let hash = 0;
  for (let i = 0; i < nickName.length; i++) {
    hash = nickName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
