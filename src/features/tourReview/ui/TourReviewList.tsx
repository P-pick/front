import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { tourDetailSVG } from '@/assets';

import { CreateReview, Review } from '@/features/tourReview';
import { reviewOptions } from '@/entities/review';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

interface TourReviewProps {
  contentId: string;
}

export default function TourReviewList({ contentId }: TourReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const { data: reviews } = useSuspenseQuery(
    reviewOptions.getReview({ contentId }),
  );

  const handleOpenReviewModal = () => {
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className="w-full relative">
      {reviews.length !== 0 ? (
        reviews.map(review => (
          <div className="my-3" key={review.id}>
            <Review {...review} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full m-10 text-sm">
          <p>아직 리뷰가 없습니다😭</p>
          <p>
            장소를
            <span className="text-3xl font-bold text-(--color-primary-red)">
              Pick
            </span>
            하고 리뷰를 남겨주세요!❤️
          </p>
          <button
            className="text-(--color-primary-red)"
            onClick={handleOpenReviewModal}
          >
            리뷰 작성하러 가기 ↗️
          </button>
        </div>
      )}
      {auth.currentUser && (
        <div className="fixed bottom-20 right-0 pr-5 z-(--z-layer1)">
          <button
            onClick={handleOpenReviewModal}
            className="bg-(--color-primary) text-white rounded-full flex items-center gap-2 w-12 h-12"
          >
            <tourDetailSVG.EditIcon className="fill-white w-full h-full p-3" />
          </button>
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="review-modal"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 opacity-50 z-(--z-layer1) flex justify-center item-end bg-gradient-to-b from-black/60"
          >
            <CreateReview contentId={contentId} setIsOpen={setIsOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
