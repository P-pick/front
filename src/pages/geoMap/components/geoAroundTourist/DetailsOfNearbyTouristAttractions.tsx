import { AnimatePresence, motion } from 'motion/react';

export default function DetailsOfNearbyTouristAttractions() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-40 flex items-center justify-center z-(--z-layer5)">
      <AnimatePresence>
        <motion.div className="max-w-[375px] w-full h-full bg-black">
          정보
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
