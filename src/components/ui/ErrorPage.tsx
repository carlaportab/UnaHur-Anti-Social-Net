import { Link } from 'react-router-dom';
import { GlitchText } from './GlitchText';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { usePrefersReducedMotion, useTypingText } from '../../hooks/useReducedMotion';

interface ErrorPageProps {
  code?: string;
  typingMessage: string;
  ascii: string;
  title: string;
  backTo?: string;
  backLabel?: string;
}

export function ErrorPage({
  code = '404',
  typingMessage,
  ascii,
  title,
  backTo = '/',
  backLabel = 'Volver al feed',
}: ErrorPageProps) {
  const reducedMotion = usePrefersReducedMotion();
  const typedText = useTypingText(typingMessage);

  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 py-12 dot-grid-dark sm:min-h-[60vh] sm:py-16">
      <div className="animate-fade-up max-w-md text-center">
        <GlitchText
          as="h1"
          className="font-display text-5xl font-black text-[var(--text-primary)] sm:text-7xl"
        >
          {code}
        </GlitchText>
        <p
          className={`mt-6 font-mono text-sm text-[var(--cyan)] ${
            reducedMotion ? '' : 'typing-cursor'
          }`}
        >
          {typedText}
        </p>
        <EmptyState ascii={ascii} title={title} className="mt-8">
          <Link to={backTo}>
            <Button>{backLabel}</Button>
          </Link>
        </EmptyState>
      </div>
    </div>
  );
}
