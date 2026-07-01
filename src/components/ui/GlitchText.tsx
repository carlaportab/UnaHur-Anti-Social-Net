import { Link, type LinkProps } from 'react-router-dom';
import type { ElementType, ReactNode } from 'react';

function toGlitchString(value: ReactNode): string {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(toGlitchString).join('');
  return '';
}

interface GlitchTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** auto: glitchea solo cada ~7s sin hover */
  auto?: boolean;
  style?: React.CSSProperties;
}

/** Texto con efecto glitch cian/verde al hover (o automático con auto=true). */
export function GlitchText({ children, as: Tag = 'span', className = '', auto = false, style }: GlitchTextProps) {
  const text = toGlitchString(children);
  const glitchClass = auto ? 'glitch-auto' : 'glitch-hover';

  return (
    <Tag className={`${glitchClass} ${className}`.trim()} data-text={text} style={style}>
      {text}
    </Tag>
  );
}

type GlitchLinkProps = Omit<LinkProps, 'children'> & {
  children: ReactNode;
  auto?: boolean;
};

/** Link con el mismo efecto glitch al hover — ideal para @nickName. */
export function GlitchLink({ children, className = '', auto = false, ...props }: GlitchLinkProps) {
  const text = toGlitchString(children);
  const glitchClass = auto ? 'glitch-auto' : 'glitch-hover';

  return (
    <Link className={`${glitchClass} ${className}`.trim()} data-text={text} {...props}>
      {text}
    </Link>
  );
}
