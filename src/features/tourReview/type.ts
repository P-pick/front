import type { ReviewResponse } from '@/entities/review';

export interface ReviewProps {
  contentId: string;
  review: ReviewResponse;
}
