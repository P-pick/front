import { useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onHeightChange?: (height: number) => void;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  onHeightChange,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(300); // 초기 높이

  const startY = useRef<number>(0);
  const startHeight = useRef<number>(300);

  // 드래그 시작
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startHeight.current = height;

    window.addEventListener('mousemove', handleDragMove as any);
    window.addEventListener('touchmove', handleDragMove as any);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
  };

  // 드래그 중
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    const clientY =
      'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    const delta = clientY - startY.current;
    const newHeight = Math.max(100, startHeight.current - delta); // 최소 100px 보장

    setHeight(newHeight);
    onHeightChange?.(newHeight);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    window.removeEventListener('mousemove', handleDragMove as any);
    window.removeEventListener('touchmove', handleDragMove as any);
    window.removeEventListener('mouseup', handleDragEnd);
    window.removeEventListener('touchend', handleDragEnd);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[100]" onClick={onClose} />
      <div
        ref={sheetRef}
        style={{ height }}
        className="fixed bottom-0 left-0 w-full z-[110] bg-white rounded-t-2xl overflow-hidden transition-all duration-200"
      >
        <div
          className="w-full flex justify-center pt-3 cursor-row-resize active:cursor-grabbing touch-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="bg-black w-[88px] h-[3px] rounded-full" />
        </div>

        <div>{children}</div>
      </div>
    </>
  );
}
