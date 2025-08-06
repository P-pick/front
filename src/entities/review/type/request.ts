import type { Auth } from 'firebase/auth';

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
  images: File[];
}
