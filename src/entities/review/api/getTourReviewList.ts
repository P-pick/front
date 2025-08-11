import { get, ref } from 'firebase/database';

import { database } from '@/shared';
import type { getReviewRequest, ReviewResponse } from '../type';

async function getTourReviewList({
  contentId,
}: getReviewRequest): Promise<ReviewResponse[]> {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  try {
    const snapshot = await get(reviewRef);
    if (!snapshot.exists()) return [];
    const reviews: ReviewResponse[] = [];
    snapshot.forEach(childSnapshot => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      reviews.push({
        id: childKey,
        ...childData,
      });
    });
    return reviews;
  } catch {
    return [];
  }
}

export default getTourReviewList;
