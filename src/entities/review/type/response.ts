import type { User } from '@/entities/auth';

export type ImageType = {
  imageUrl: string;
  name: string;
};

export interface ReviewResponse {
  id: string;
  contents: string;
  userId: string;
  user: User;
  rating: number;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
}
