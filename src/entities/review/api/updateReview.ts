import { ref, update } from 'firebase/database';

import { createReviewImages, removeReviewImage } from '@/entities/review';
import { database } from '@/shared';

import type { UpdateReviewRequest } from '@/entities/review';

const updateReview = async ({
  contentId,
  reviewId,
  contents,
  rating,
  remainingImages,
  newImages,
  deletedImages,
}: UpdateReviewRequest) => {
  // 1. 새 이미지 업로드
  const uploadedImages = await createReviewImages({
    contentId,
    reviewId,
    images: newImages,
  });

  // 2. Storage에서 삭제
  if (deletedImages && deletedImages.length > 0) {
    await removeReviewImage({
      contentId,
      reviewId,
      deletedImages,
    });
  }

  // 3. 최종 이미지 배열
  const updatedImages = [...remainingImages, ...uploadedImages];

  // 4. DB 업데이트
  await update(ref(database, `tour/${contentId}/reviews/${reviewId}`), {
    contents,
    rating,
    images: updatedImages,
    updatedAt: new Date().toISOString(),
  });
};

export default updateReview;
