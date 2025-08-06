import { ref, update } from 'firebase/database';

import { createReviewImages, removeReviewImage } from '@/entities/review';
import { database } from '@/shared';

import type { UpdateReviewRequest } from '@/entities/review';

const updateReview = async ({
  contentId,
  reviewId,
  contents,
  rating,
  images,
  prevImages,
}: UpdateReviewRequest) => {
  const updateRef = ref(database, `tour/${contentId}/reviews/${reviewId}`);

  if (prevImages && prevImages.length > 0) {
    await removeReviewImage({
      contentId,
      reviewId,
      prevImages,
    });
  }

  const imageUrls = await createReviewImages({
    contentId,
    reviewId,
    images,
  });

  const updateData = {
    contents,
    rating,
    images: imageUrls,
    updatedAt: new Date().toISOString(),
  };
  await update(updateRef, updateData);
};

export default updateReview;
