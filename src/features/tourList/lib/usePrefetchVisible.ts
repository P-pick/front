import { useEffect, useState, useRef } from 'react';

let observer: IntersectionObserver | null = null;
const callbacks = new Map<Element, () => void>();

function initObserver(rootMargin = '300px') {
  if (observer) return observer;

  observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target);
          cb?.();
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      }
    },
    { rootMargin },
  );

  return observer;
}

export function usePrefetchVisible(rootMargin = '300px') {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = initObserver(rootMargin);
    callbacks.set(el, () => setVisible(true));
    observer.observe(el);

    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
    };
  }, [visible, rootMargin]);

  return { ref, visible };
}
