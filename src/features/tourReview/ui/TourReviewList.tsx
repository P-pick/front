import { getAuth } from 'firebase/auth';
import { useSuspenseQuery } from '@tanstack/react-query';

import { commonSVG } from '@/assets';

import { Review, useCreateReviewMutation } from '@/features/tourReview';
import { reviewOptions } from '@/entities/review';

interface TourReviewProps {
  contentId: string;
}

export default function TourReviewList({ contentId }: TourReviewProps) {
  const { data: reviews } = useSuspenseQuery(
    reviewOptions.getReview({ contentId }),
  );

  const auth = getAuth();

  const mutation = useCreateReviewMutation({ contentId });

  const handleCreateReview = () => {
    if (!auth) {
      alert('로그인이 필요합니다.');
    }
    mutation.mutate({
      user: auth,
      contentId,
      rating: 5,
      contents: 'Great tour!',
      images: [],
    });
  };

  return (
    <div className="p-3 w-full relative">
      {reviews &&
        reviews.map(review => (
          <div className="" key={review.id}>
            <Review {...review} />
          </div>
        ))}
      <div className="fixed bottom-20 right-0 pr-5">
        <button
          onClick={handleCreateReview}
          className="bg-(--color-primary) text-white p-2 rounded-full flex items-center gap-2 w-15 h-15"
        >
          <commonSVG.RightArrowIcon className="fill-white w-full h-full" />
        </button>
      </div>
    </div>
  );
}
