import { useEffect, useRef, useState } from 'react';

export const useEmptyChildElements = () => {
  const childRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const el = childRef.current;
    if (el) {
      setIsEmpty(el.childNodes.length === 0);
    }
  }, []);

  return { childRef, isEmpty };
};
