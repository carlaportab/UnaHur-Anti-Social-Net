import { useUi } from '../../context/UiContext';

export function TerminalModeBanner() {
  const { terminalMode } = useUi();
  if (!terminalMode) return null;

  return (
    <div className="terminal-mode-banner border-b border-[var(--border-green)] bg-[var(--green-dim)]/20 px-3 py-2 text-center font-mono text-[0.65rem] text-[var(--green-light)] sm:text-xs">
      <span className="text-[var(--green)]">●</span>
      {' shell active'}
      <span className="mx-2 text-[var(--text-muted)]">|</span>
      {'render: terminal'}
      <span className="mx-2 text-[var(--text-muted)]">|</span>
      <span className="terminal-banner-cursor text-[var(--cyan)]">█</span>
    </div>
  );
}
