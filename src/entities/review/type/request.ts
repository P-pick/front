export interface ReviewRequest {
  contentId: string;
}

export interface getReviewRequest extends ReviewRequest {
  orderBy?: 'createdAt' | 'updatedAt';
}

export interface CreateReviewRequest extends ReviewRequest {
  userId: string;
  reviewContent: string;
  rating: number;
  images?: string[];
}
