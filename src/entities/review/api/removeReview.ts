import { ref, remove } from 'firebase/database';

import { removeReviewImage } from '@/entities/review';
import { database } from '@/shared';

import type { DeleteReviewRequest } from '@/entities/review';

const removeReview = async ({
  contentId,
  reviewId,
  deletedImages,
}: DeleteReviewRequest) => {
  const removeRef = ref(database, `tour/${contentId}/reviews/${reviewId}`);

  if (deletedImages && deletedImages.length > 0) {
    await removeReviewImage({
      contentId,
      reviewId,
      deletedImages,
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
