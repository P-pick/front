import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import type {
  DeleteReviewRequest,
  ReviewImageRequest,
} from '@/entities/review';

export const createReviewImages = async ({
  contentId,
  reviewId,
  images,
}: ReviewImageRequest) => {
  const storage = getStorage();

  if (!images || images.length === 0) {
    return [];
  }

  const uploadPromises = images.map(async image => {
    const imageRef = ref(
      storage,
      `tour/${contentId}/reviews/${reviewId}/${image.name}`,
    );
    try {
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      return { imageUrl, name: image.name };
    } catch (error) {
      console.error('Error uploading review image:', error);
      throw new Error('Failed to upload review image');
    }
  });

  return Promise.all(uploadPromises);
};

export const removeReviewImage = async ({
  contentId,
  reviewId,
  deletedImages,
}: DeleteReviewRequest) => {
  const storage = getStorage();

  const deletePromises = deletedImages.map(image => {
    const desertRef = ref(
      storage,
      `tour/${contentId}/reviews/${reviewId}/${image.name}`,
    );
    return deleteObject(desertRef).catch(error => {
      console.error('Error deleting review image:', error);
      throw new Error('Failed to delete review image');
    });
  });

  await Promise.all(deletePromises);
};
