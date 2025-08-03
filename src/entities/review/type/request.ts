import type { Auth } from 'firebase/auth';

export interface ReviewRequest {
  contentId: string;
}

export interface getReviewRequest extends ReviewRequest {
  orderBy?: 'createdAt' | 'updatedAt';
}

export interface CreateReviewRequest extends ReviewRequest {
  user: Auth;
  content: string;
  rating: number;
  images?: string[];
}
