import { useLayoutEffect, useState } from 'react';

export function useLayoutRect(id: string) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    const el = document.getElementById(id);
    if (el) {
      setRect(el.getBoundingClientRect());
    }
  }, [id]);

  return rect;
}
