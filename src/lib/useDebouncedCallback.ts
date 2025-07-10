import { useRef, useEffect, useMemo } from 'react';

export function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  wait: number,
) {
  const argsRef = useRef<A>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  const debouncedCallback = useMemo(() => {
    const fun = (...args: A) => {
      argsRef.current = args;
      cleanup();
      timeout.current = setTimeout(() => {
        if (argsRef.current) {
          callback(...argsRef.current);
        }
      }, wait);
    };
    return fun;
  }, [callback, wait]);

  return debouncedCallback;
}
