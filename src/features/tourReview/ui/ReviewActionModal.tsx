import { AnimatePresence, motion } from 'framer-motion';

import type { ReactNode } from 'react';

interface ReviewActionModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewActionModal({
  children,
  isOpen,
  setIsOpen,
}: ReviewActionModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="review-modal"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed flex justify-center item-end inset-0  w-full h-full opacity-50 bg-gradient-to-b from-black/60 z-(--z-layer1)"
          onMouseDown={handleBackdropClick}
        >
          <div
            className="min-w-100 max-h-100"
            onMouseDown={e => e.stopPropagation()}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
