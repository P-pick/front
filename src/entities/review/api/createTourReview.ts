import type { CreateReviewRequest } from '@/entities/review';
import { database } from '@/shared';
import { push, ref, set } from 'firebase/database';

const createTourReview = async ({
  contentId,
  user,
  contents = '',
  rating = 5,
  images = [],
}: CreateReviewRequest) => {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  const newReviewRef = push(reviewRef);
  const userData = user.currentUser;

  if (!userData) {
    throw new Error('User is not authenticated');
  }

  const newReviewData = {
    userId: userData.uid,
    user: {
      uid: userData.uid,
      displayName: userData.displayName,
      email: userData.email,
      photoURL: userData.photoURL,
    },
    contents,
    rating,
    images,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await set(newReviewRef, newReviewData);
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Failed to create review');
  }
};

export default createTourReview;
