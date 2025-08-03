import type { CreateReviewRequest } from '@/entities/review';
import { database } from '@/shared';
import { push, ref, set } from 'firebase/database';

const createTourReview = async ({
  contentId,
  user,
  content,
}: CreateReviewRequest) => {
  const reviewRef = ref(database, `tour/${contentId}/reviews`);
  const newReviewRef = push(reviewRef);
  const userId = user.currentUser?.uid;

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const newReviewData = {
    user_id: userId,
    user: {
      uid: userId,
      displayName: user.currentUser?.displayName || '',
      email: user.currentUser?.email || '',
      photoURL: user.currentUser?.photoURL || '',
    },
    contents: content,
    rating: 5,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
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
