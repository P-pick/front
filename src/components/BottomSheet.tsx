import { Portal } from '@/components';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { type ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  initialY?: string;
  minHeight?: number;
  children: ReactNode;
}

function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = true,
  initialY = '0%',
  minHeight = 400,
}: BottomSheetProps) {
  const dragControls = useDragControls();

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragControls.start(event, { snapToCursor: false });
  };

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal containerId="bottomsheet-root">
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {showOverlay && (
              <motion.div
                className="fixed left-0 top-0 w-full h-full bg-black/40 z-(--z-layer6)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleOnClick}
              />
            )}

            <motion.div
              key="bottom-sheet"
              drag="y"
              animate={{ y: initialY }}
              initial={{ y: '100%' }}
              dragControls={dragControls}
              dragListener={false}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.point.y > minHeight) {
                  onClose();
                }
              }}
              dragConstraints={{
                top: 0,
                bottom: minHeight,
              }}
              className="relative flex flex-col items-center w-full z-(--z-layer7) pointer-events-auto"
            >
              <div
                onPointerDown={startDrag}
                className="absolute top-0 left-0 w-full h-10 flex justify-center items-start cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
              >
                <div className="mt-1 w-[88px] h-[3px] bg-black rounded-full" />
              </div>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default BottomSheet;
