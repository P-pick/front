import { useSuspenseQuery } from '@tanstack/react-query';

import {
  CreateReview,
  NotFoundReview,
  Review,
  ReviewActionModal,
} from '@/features/tourReview';
import { reviewOptions } from '@/entities/review';
import { useToggleState } from '@/shared';

interface TourReviewProps {
  contentId: string;
}

export default function TourReviewList({ contentId }: TourReviewProps) {
  const { data: reviews } = useSuspenseQuery(
    reviewOptions.getReview({ contentId }),
  );

  const { isToggle, setIsToggle, enable } = useToggleState();

  return (
    <div className="w-full relative">
      {reviews.length !== 0 ? (
        reviews.map(review => (
          <div className="my-3" key={review.id}>
            <Review contentId={contentId} review={review} />
          </div>
        ))
      ) : (
        <NotFoundReview handleOpenReviewModal={enable} />
      )}
      <ReviewActionModal isOpen={isToggle} setIsOpen={setIsToggle}>
        <CreateReview contentId={contentId} setIsOpen={setIsToggle} />
      </ReviewActionModal>
    </div>
  );
}
