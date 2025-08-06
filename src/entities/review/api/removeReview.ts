import { ref, remove } from 'firebase/database';

import { removeReviewImage } from '@/entities/review';
import { database } from '@/shared';

import type { DeleteReviewRequest } from '@/entities/review';

const removeReview = async ({
  contentId,
  reviewId,
  prevImages,
}: DeleteReviewRequest) => {
  const removeRef = ref(database, `tour/${contentId}/reviews/${reviewId}`);

  if (prevImages && prevImages.length > 0) {
    await removeReviewImage({
      contentId,
      reviewId,
      prevImages,
    });
  }
  try {
    await remove(removeRef);
  } catch (error) {
    console.error('Error removing review:', error);
    throw new Error('Failed to remove review');
  }
};

export default removeReview;
