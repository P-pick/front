import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useDragControls,
} from 'framer-motion';
import {
  useEffect,
  type PropsWithChildren,
  Children,
  isValidElement,
} from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  initialY?: string;
}

function BottomSheet({
  isOpen,
  onClose,
  children,
  showOverlay = true,
  initialY = '0%',
}: PropsWithChildren<BottomSheetProps>) {
  const dragControls = useDragControls();

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragControls.start(event, { snapToCursor: false });
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  let content: React.ReactNode = null;
  let footer: React.ReactNode = null;

  Children.forEach(children, child => {
    if (!isValidElement(child)) return;
    if (child.type === BottomSheet.Content) {
      content = child;
    } else if (child.type === BottomSheet.Footer) {
      footer = child;
    }
  });

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
            initial={{ y: '100%' }}
            animate={{ y: initialY }}
            exit={{ y: '100%' }}
            dragElastic={0.2}
            dragControls={dragControls}
            dragListener={false}
            onDragEnd={(_, info) => {
              if (info.point.y > window.innerHeight * 0.8) {
                onClose();
              }
            }}
            dragConstraints={{ top: 0, bottom: 400 }}
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.1,
            }}
            className="fixed bottom-0 left-0 w-full z-[110]"
          >
            <div className="relative flex flex-col items-center w-full">
              <div
                onPointerDown={startDrag}
                className="absolute top-0 left-0 w-full h-10 flex justify-center items-start cursor-grab active:cursor-grabbing"
                style={{ touchAction: 'none' }}
              >
                <div className="mt-1 w-[88px] h-[3px] bg-black rounded-full pointer-events-none" />
              </div>

              {content}
            </div>
            <motion.div style={{ y: 0 }}>{footer}</motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

BottomSheet.Content = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

BottomSheet.Footer = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default BottomSheet;
