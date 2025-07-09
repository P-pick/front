import { Portal } from '@/components';
import {
  AnimatePresence,
  motion,
  useDragControls,
  type PanInfo,
} from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  bottomSheetHeight?: string;
  children: ReactNode;
}

function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = true,
}: BottomSheetProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const [yPosition, setYPosition] = useState<'0%' | '50%' | '80%'>('80%');
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sheetVariants = {
    initial: { y: '100%' },
    opened: { y: yPosition },
    closed: { y: '100%' },
  };
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offsetY = info.offset.y;

    if (yPosition === '80%') {
      if (offsetY < -50) {
        setYPosition('0%');
      } else if (offsetY < -10) {
        setYPosition('50%');
      }
    } else if (yPosition === '50%') {
      if (offsetY < -10) {
        setYPosition('0%');
      } else if (offsetY > 10) {
        setYPosition('80%');
      }
    }
    if (yPosition === '0%') {
      if (offsetY > 50) {
        setYPosition('80%');
      } else if (offsetY > 10) {
        setYPosition('50%');
      }
    }
  };

  return (
    <Portal containerId="bottomsheet-root">
      <AnimatePresence>
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
              ref={constraintsRef}
              className="absolute w-full h-full left-0 top-0 z-(--z-layer1000)"
            >
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 740 }}
                dragControls={dragControls}
                dragListener={false}
                dragElastic={0}
                dragMomentum={false}
                variants={sheetVariants}
                initial="initial"
                animate="opened"
                exit="closed"
                transition={{ type: 'tween', duration: 0.3 }}
                onDragEnd={handleDragEnd}
                className="h-full"
              >
                <div className="bg-white flex flex-col rounded-t-2xl h-full">
                  <header
                    className="h-[50px] cursor-grab select-none w-full flex items-center justify-center touch-none"
                    onPointerDown={e =>
                      dragControls.start(e, { distanceThreshold: 10 })
                    }
                  >
                    <div className="w-15 h-1 bg-black rounded-full mb-5" />
                  </header>
                  <article className="h-full">{children}</article>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default BottomSheet;
