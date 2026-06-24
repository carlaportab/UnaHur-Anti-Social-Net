/** Acento verde o cyan según nickName (identidad visual por usuario). */
export function getUserAccent(nickName: string): 'green' | 'cyan' {
  let hash = 0;
  for (let i = 0; i < nickName.length; i++) {
    hash = nickName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 2 === 0 ? 'green' : 'cyan';
}

export function getUserAccentColor(nickName: string): string {
  return getUserAccent(nickName) === 'green'
    ? 'var(--green-light)'
    : 'var(--cyan)';
}
