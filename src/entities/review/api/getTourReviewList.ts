import { onValue, ref } from 'firebase/database';

import { database } from '@/shared';
import type { getReviewRequest } from '../type/request';
import type { ReviewResponse } from '../type/response';

async function getTourReviewList({
  contentId,
}: getReviewRequest): Promise<ReviewResponse[]> {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  return new Promise((resolve, reject) => {
    onValue(
      reviewRef,
      snapshot => {
        const reviews: ReviewResponse[] = [];
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          reviews.push({
            id: childKey,
            ...childData,
          });
        });
        resolve(reviews);
      },
      () => {
        reject([]);
      },
    );
  });
}

export default getTourReviewList;
