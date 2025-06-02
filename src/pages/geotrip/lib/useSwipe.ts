import { useEffect, useRef, type RefObject } from 'react';

type SwipeDirection = 'left' | 'right' | 'up' | 'down';

type UseSwipeParams = Partial<Record<SwipeDirection, () => void>>;

export function useSwipe<T extends HTMLElement>({
  left,
  right,
  up,
  down,
}: UseSwipeParams): RefObject<T> {
  const ref = useRef<T>(null);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const startXVal = startX.current;
      const startYVal = startY.current;
      const diffX = endX - startXVal;
      const diffY = endY - startYVal;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // 시작 < 끝 => 오른쪽으로 스와이프
        if (startXVal < endX) {
          right?.();
          return;
        }
        // 끝 < 시작 => 왼쪽으로 스와이프
        left?.();
        return;
      }
      // 시작 < 끝 => 위로 스와이프
      if (startYVal < endY) {
        down?.();
        return;
      }
      // 끝 < 시작 => 아래로 스와이프
      up?.();
    };

    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchend', handleTouchEnd);

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
    };
  }, [left, right, up, down]);

  return ref as RefObject<T>;
}
