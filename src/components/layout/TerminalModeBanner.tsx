import { useUi } from '../../context/UiContext';
import { GlitchText } from '../ui/GlitchText';

export function TerminalModeBanner() {
  const { terminalMode } = useUi();
  if (!terminalMode) return null;

  return (
    <div className="terminal-mode-banner border-b border-[var(--border-green)] bg-[var(--green-dim)]/20 px-3 py-2 text-center font-mono text-[0.65rem] text-[var(--green-light)] sm:text-xs">
      <span className="text-[var(--green)]">●</span>
      <GlitchText className="text-[var(--green-light)]"> shell active</GlitchText>
      <span className="mx-2 text-[var(--text-muted)]">|</span>
      {'render: '}
      <GlitchText className="text-[var(--text-primary)]">terminal</GlitchText>
      <span className="mx-2 text-[var(--text-muted)]">|</span>
      <span className="terminal-banner-cursor text-[var(--cyan)]">█</span>
    </div>
  );
}
