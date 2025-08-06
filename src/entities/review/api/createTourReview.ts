import type { CreateReviewRequest } from '@/entities/review';
import { database } from '@/shared';
import { push, ref, set } from 'firebase/database';
import createReviewImages from './createReviewImages';

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

  const reviewId = newReviewRef.key;

  if (!reviewId) {
    throw new Error('리뷰 ID 생성 실패');
  }

  if (!userData) {
    throw new Error('사용자 정보가 없습니다. 로그인이 필요합니다.');
  }

  const imageUrls = await createReviewImages({
    contentId,
    reviewId,
    images,
  });

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
    images: imageUrls,
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
