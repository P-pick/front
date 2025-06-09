import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOverlay?: boolean;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = true,
}: BottomSheetProps) {
  const dragControls = useDragControls();

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragControls.start(event, { snapToCursor: false });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
              className="fixed inset-0 bg-black/30 z-[100]"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}

          <motion.div
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            initial={{ y: '100%' }}
            animate={{ y: '50%' }}
            exit={{ y: '100%' }}
            dragConstraints={{ top: 0, bottom: 400 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 w-full z-[110] rounded-t-2xl overflow-hidden flex flex-col items-center"
          >
            <div
              onPointerDown={e => startDrag(e)}
              className="absolute top-0 z-500 left-0 w-full h-10 flex justify-center items-start cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <div className="mt-1 w-[88px] h-[3px] bg-black rounded-full pointer-events-none" />
            </div>
            <div className="select-none pointer-events-none">{children}</div>
          </motion.div>
          <div
            className="absolute bottom-0 w-full h-[300px] bg-white z-[101] pointer-events-none"
            aria-hidden
          />
        </>
      )}
    </AnimatePresence>
  );
}
