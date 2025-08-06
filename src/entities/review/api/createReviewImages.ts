import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import type { ReviewImageRequest } from '../type';

const createReviewImages = async ({
  contentId,
  reviewId,
  images,
}: ReviewImageRequest) => {
  const storage = getStorage();
  const imageUrls: string[] = [];

  if (images.length === 0) {
    throw new Error('이미지가 없습니다.');
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
    imageUrls.push(imageUrl);
  }

  return imageUrls;
};

export default createReviewImages;
