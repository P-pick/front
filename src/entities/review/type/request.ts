import type { Auth } from 'firebase/auth';

import type { ImageType } from '@/entities/review';

export interface ReviewRequest {
  contentId: string;
}

export interface getReviewRequest extends ReviewRequest {
  orderBy?: 'createdAt' | 'updatedAt';
}

export interface CreateReviewRequest extends ReviewRequest {
  user: Auth;
  contents: string;
  rating: number;
  images?: File[];
}

export interface ReviewImageRequest extends ReviewRequest {
  reviewId: string;
  images?: File[];
}

export interface UpdateReviewRequest extends ReviewRequest {
  reviewId: string;
  contents?: string;
  rating?: number;
  remainingImages: ImageType[]; // 기존 이미지
  newImages?: File[]; // 새로 추가한 이미지
  deletedImages?: ImageType[];
}

export interface DeleteReviewRequest extends ReviewRequest {
  reviewId: string;
  deletedImages: ImageType[];
}
