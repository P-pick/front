import { AnimatePresence, motion } from 'framer-motion';

import { DistanceSlider } from '@/features/tourFilter';
import { TouristContentsTypeFilter, useLocalStorage } from '@/shared';
import type { TourInjected } from '@/features/tour/types';
import { useState } from 'react';

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function TourFilterSidebar({
  onClose,
  isOpen,
}: BottomSheetProps) {
  const [tourFilter, setTourFilter] = useLocalStorage('tourInfo', {
    distance: '20000',
    contentTypeId: '12',
  } as TourInjected);

  const [currentTourFilter, setCurrentTourFilter] = useState<TourInjected>({
    distance: tourFilter.distance,
    contentTypeId: tourFilter.contentTypeId,
  });

  const handleSubmit = () => {
    setTourFilter({
      distance: currentTourFilter.distance,
      contentTypeId: currentTourFilter.contentTypeId,
    });
    onClose();
  };

  const handleReset = () => {
    setCurrentTourFilter({
      distance: '20000',
      contentTypeId: '12',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute h-full w-full z-(--z-layer1000)">
          <motion.div
            className="absolute right-0 bg-white h-full flex flex-col w-70 py-5 pl-5 rounded-l-2xl"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <header>
              <button
                onClick={onClose}
                className="cursor-pointer flex items-center gap-1"
              >
                <img src="/common/backIcon.webp" className="w-5 h-5" />
                닫기
              </button>
            </header>
            <main>
              <section className="my-5 py-5 pl-5 rounded-l-xl shadow">
                <label className="block mb-2 text-lg font-semibold text-black">
                  관광 타입
                </label>
                <TouristContentsTypeFilter
                  contentTypeId={currentTourFilter.contentTypeId}
                  setContentTypeId={setCurrentTourFilter}
                />
              </section>
              <section className="my-5 py-5 px-5 rounded-xl shadow mr-3">
                <label className="block mb-2 text-lg font-semibold text-black">
                  거리
                </label>
                <DistanceSlider
                  distance={currentTourFilter.distance}
                  setDistance={setCurrentTourFilter}
                />
              </section>
            </main>
            <footer className="flex gap-3">
              <button
                className="w-30 rounded-2xl bg-gray-300 px-5 py-2 text-black cursor-pointer"
                onClick={handleReset}
              >
                초기화
              </button>
              <button
                className="w-30 rounded-2xl bg-primary-red px-5 py-2 text-white cursor-pointer"
                onClick={handleSubmit}
              >
                적용
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
