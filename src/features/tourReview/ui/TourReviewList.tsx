import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getAuth } from 'firebase/auth';

import { tourDetailSVG } from '@/assets';

import {
  CreateReview,
  NotFoundReview,
  Review,
  ReviewActionModal,
} from '@/features/tourReview';
import { reviewOptions } from '@/entities/review';

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
            <Review contentId={contentId} review={review} />
          </div>
        ))
      ) : (
        <NotFoundReview handleOpenReviewModal={handleOpenReviewModal} />
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
      <ReviewActionModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CreateReview contentId={contentId} setIsOpen={setIsOpen} />
      </ReviewActionModal>
    </div>
  );
}
