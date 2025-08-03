import { onValue, ref } from 'firebase/database';

import { database } from '@/shared';
import type { getReviewRequest } from '../type/request';

async function getTourReviewList({
  contentId,
}: getReviewRequest): Promise<unknown[]> {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  return new Promise((resolve, reject) => {
    onValue(
      reviewRef,
      snapshot => {
        const reviews: unknown[] = [];
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
