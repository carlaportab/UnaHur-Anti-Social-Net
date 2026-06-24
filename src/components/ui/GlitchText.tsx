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
}

/** Texto con efecto glitch cian/verde al hover (como el hero). */
export function GlitchText({ children, as: Tag = 'span', className = '' }: GlitchTextProps) {
  const text = toGlitchString(children);

  return (
    <Tag className={`glitch-hover ${className}`.trim()} data-text={text}>
      {text}
    </Tag>
  );
}

type GlitchLinkProps = Omit<LinkProps, 'children'> & {
  children: ReactNode;
};

/** Link con el mismo efecto glitch al hover — ideal para @nickName. */
export function GlitchLink({ children, className = '', ...props }: GlitchLinkProps) {
  const text = toGlitchString(children);

  return (
    <Link className={`glitch-hover ${className}`.trim()} data-text={text} {...props}>
      {text}
    </Link>
  );
}
