import { useSuspenseQuery } from '@tanstack/react-query';

import { reviewOptions } from '@/entities/review';
import { useCreateReviewMutation } from '../model';
import { getAuth } from 'firebase/auth';

interface TourReviewProps {
  contentId: string;
}

export default function TourReview({ contentId }: TourReviewProps) {
  const { data: reviews } = useSuspenseQuery(
    reviewOptions.getReview({ contentId }),
  );

  const auth = getAuth();

  const mutation = useCreateReviewMutation({ contentId });

  const handleCreateReview = () => {
    mutation.mutate({
      contentId,
      userId: auth.currentUser!.uid,
      rating: 5,
      reviewContent: 'Great tour!',
      images: [],
    });
  };

  console.log('Tour reviews:', reviews);

  return (
    <div className="text-black px-5 pb-6">
      <h2 className="text-lg font-bold mb-4">Tour Review</h2>
      <p className="text-sm">
        This is where the tour reviews will be displayed for content ID:{' '}
        {contentId}.
      </p>
      <button onClick={handleCreateReview}>Submit Review</button>
    </div>
  );
}
