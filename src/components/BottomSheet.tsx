import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import {
  Children,
  isValidElement,
  useEffect,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

function BottomSheetContent({ children }: PropsWithChildren) {
  return <>{children}</>;
}

function BottomSheetFooter({ children }: PropsWithChildren) {
  return (
    <div className="absolute left-1/2 z-1500 bg-gradient-to-t from-white to-white/90 -translate-x-1/2 bottom-0 w-[375px] h-[100px]  flex flex-col items-center justify-center gap-4">
      {children}
    </div>
  );
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  initialY?: string;
  minHeight?: number;
}

function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = true,
  initialY = '0%',
  minHeight = 400,
}: PropsWithChildren<BottomSheetProps>) {
  const dragControls = useDragControls();

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragControls.start(event, { snapToCursor: false });
  };
  const contentChildren: ReactNode[] = [];
  const footerChildren: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === BottomSheet.Footer) {
      footerChildren.push(child);
    } else {
      contentChildren.push(child);
    }
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showOverlay && (
            <motion.div
              className="absolute inset-0 bg-black/30 z-1000"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            dragElastic={0.1}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="absolute bottom-0 left-0 w-full z-1200"
          >
            <motion.div
              drag="y"
              animate={{ y: initialY }}
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
              className="relative flex flex-col items-center w-full z-1100"
            >
              <div
                onPointerDown={startDrag}
                className="absolute top-0 left-0 w-full h-10 flex justify-center items-start cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
              >
                <div className="mt-1 w-[88px] h-[3px] bg-black rounded-full pointer-events-none" />
              </div>
              {contentChildren}
            </motion.div>

            {footerChildren}
            <div className="absolute left-0 bottom-0 inset-x-0 bg-white z-1000 h-50" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

BottomSheet.Content = BottomSheetContent;
BottomSheet.Footer = BottomSheetFooter;

export default BottomSheet;
