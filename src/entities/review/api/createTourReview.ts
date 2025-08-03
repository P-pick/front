import type { CreateReviewRequest } from '@/entities/review';
import { database } from '@/shared';
import { push, ref, set } from 'firebase/database';

const createTourReview = async ({
  contentId,
  userId,
  reviewContent,
}: CreateReviewRequest) => {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  const newReviewRef = push(reviewRef);
  await set(newReviewRef, {
    user_id: userId,
    review_contents: reviewContent,
    rating: 5,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

export default createTourReview;
