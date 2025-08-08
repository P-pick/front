import { useSuspenseQuery } from '@tanstack/react-query';

import {
  CreateReview,
  NotFoundReview,
  Review,
  ReviewActionModal,
  useReviewModalState,
} from '@/features/tourReview';
import { reviewOptions } from '@/entities/review';

interface TourReviewProps {
  contentId: string;
}

export default function TourReviewList({ contentId }: TourReviewProps) {
  const { data: reviews } = useSuspenseQuery(
    reviewOptions.getReview({ contentId }),
  );

  const { isOpen, setIsOpen, handleOpenModal, handleCloseModal } =
    useReviewModalState();

  return (
    <div className="w-full relative">
      {reviews.length !== 0 ? (
        reviews.map(review => (
          <div className="my-3" key={review.id}>
            <Review contentId={contentId} review={review} />
          </div>
        ))
      ) : (
        <NotFoundReview handleOpenReviewModal={handleOpenModal} />
      )}
      <ReviewActionModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <CreateReview contentId={contentId} setIsOpen={setIsOpen} />
      </ReviewActionModal>
    </div>
  );
}
