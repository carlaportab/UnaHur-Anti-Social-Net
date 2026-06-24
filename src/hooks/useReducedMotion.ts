import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export function useTypingText(fullText: string, speedMs = 35): string {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(reduced ? fullText : '');

  useEffect(() => {
    if (reduced) {
      setText(fullText);
      return;
    }
    setText('');
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, speedMs);
    return () => clearInterval(id);
  }, [fullText, speedMs, reduced]);

  return text;
}
