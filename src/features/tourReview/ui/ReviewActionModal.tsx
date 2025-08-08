import { AnimatePresence, motion } from 'framer-motion';

import { tourDetailSVG } from '@/assets';

import type { ReactNode } from 'react';

interface ReviewActionModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export default function ReviewActionModal({
  children,
  isOpen,
  handleOpenModal,
  handleCloseModal,
}: ReviewActionModalProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="review-modal"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed flex justify-center item-end inset-0  w-full h-full opacity-50 bg-gradient-to-b from-black/60 z-(--z-layer1)"
            onMouseDown={handleCloseModal}
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
      <div className="fixed bottom-20 right-0 pr-5 z-(--z-layer1)">
        <button
          onClick={handleOpenModal}
          className="bg-(--color-primary) text-white rounded-full flex items-center gap-2 w-12 h-12"
        >
          <tourDetailSVG.EditIcon className="fill-white w-full h-full p-3" />
        </button>
      </div>
    </>
  );
}
