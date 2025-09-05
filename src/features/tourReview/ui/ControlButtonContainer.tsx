import { getAuth } from 'firebase/auth';

import { useRemoveReviewMutation } from '@/features/tourReview';
import type { ReviewProps } from '@/features/tourReview';

interface ControlButtonContainerProps extends ReviewProps {
  handleOpenModal: () => void;
}

export default function ControlButtonContainer({
  contentId,
  review,
  handleOpenModal,
}: ControlButtonContainerProps) {
  const auth = getAuth();

  const removeMutate = useRemoveReviewMutation({
    contentId,
    reviewId: review.id,
  });

  const handlerDeleteReview = () => {
    removeMutate.mutate({
      contentId,
      reviewId: review.id,
      deletedImages: review.images,
    });
  };

  if (auth.currentUser?.uid !== review.userId) {
    return null;
  }

  return (
    <div className="flex">
      <button
        className="border-1 border-gray-300 rounded-lg px-2 py-1 mr-2 hover:bg-gray-100"
        onClick={handleOpenModal}
      >
        수정
      </button>
      <button
        className="border-1 border-gray-300 rounded-lg px-2 py-1 hover:bg-gray-100 text-(--color-primary-red)"
        onClick={handlerDeleteReview}
      >
        삭제
      </button>
    </div>
  );
}
