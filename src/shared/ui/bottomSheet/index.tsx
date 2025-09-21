import { Portal } from '@/shared/ui';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useDragControls,
  type PanInfo,
} from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { getNextYPosition, shouldClose, type YPosition } from './utils';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  bottomSheetHeight?: string;
  children: ReactNode;
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = false,
}: BottomSheetProps) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  const [yPosition, setYPosition] = useState<YPosition>('80%');
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

    if (shouldClose(yPosition, offsetY)) {
      onClose();
    } else {
      const nextY = getNextYPosition(yPosition, offsetY);
      setYPosition(nextY);
    }
  };

  const className = clsx(
    'absolute w-full h-full left-0 top-0 z-(--z-layer1000)',
    showOverlay && 'bg-black/40',
  );

  const isDragStyle = clsx(
    'bg-white flex flex-col rounded-t-2xl',
    yPosition === '0%' && 'h-full overflow-y-auto',
  );

  return (
    <Portal containerId="bottomsheet-root">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              ref={constraintsRef}
              className={className}
              onClick={handleOnClick}
              data-testid="bottomsheet-overlay"
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
                <div className={isDragStyle}>
                  <header
                    data-testid="bottomsheet-header"
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
