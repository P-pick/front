import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import type {
  DeleteReviewRequest,
  ImageType,
  ReviewImageRequest,
} from '@/entities/review';

export const createReviewImages = async ({
  contentId,
  reviewId,
  images,
}: ReviewImageRequest) => {
  const storage = getStorage();
  const imageUrls: ImageType[] = [];

  if (!images || images.length === 0) {
    return [];
  }

  for (const image of images) {
    const imageRef = ref(
      storage,
      `tour/${contentId}/reviews/${reviewId}/${image.name}`,
    );

    try {
      await uploadBytes(imageRef, image);
    } catch (error) {
      console.error('Error uploading review image:', error);
      throw new Error('Failed to upload review image');
    }

    const imageUrl = await getDownloadURL(imageRef);
    imageUrls.push({ imageUrl, name: image.name });
  }

  return imageUrls;
};

export const removeReviewImage = async ({
  contentId,
  reviewId,
  prevImages,
}: DeleteReviewRequest) => {
  const storage = getStorage();

  for (const image of prevImages) {
    const desertRef = ref(
      storage,
      `tour/${contentId}/reviews/${reviewId}/${image.name}`,
    );
    try {
      await deleteObject(desertRef);
    } catch (error) {
      console.error('Error deleting review image:', error);
      throw new Error('Failed to delete review image');
    }
  }
};
